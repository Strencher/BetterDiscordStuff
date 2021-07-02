/// <reference path="../bdbuilder/typings/main.d.ts" />

import { Patcher, Utilities, WebpackModules, DiscordModules } from "@zlibrary"
import BasePlugin from "@zlibrary/plugin"
import StatusAvatar from "./components/avatar";
import stylesheet from "styles";
import React from "react";
import SettingsPanel from "./components/settings";

export default class StatusEverywhere extends BasePlugin {
    getSettingsPanel() {
        return (
            <SettingsPanel />
        );
    }

    onStart(): void {
        this.patchChatAvatar();
        this.patchChannelMessage();

        stylesheet.inject();

        // @ts-ignore
        if (!DiscordModules.UserPopout) {
            Object.defineProperty(DiscordModules, "UserPopout", {
                configurable: true,
                value: WebpackModules.getModule(m => m.type.displayName === "UserPopoutContainer")
            })
        }
    }

    async patchChatAvatar(): Promise<void> {
        const ChatMessage = WebpackModules.getModule(m => m?.default?.toString?.().indexOf("ANIMATE_CHAT_AVATAR") > -1)

        type PatchArgs = {
            user: UserObject,
            subscribeToGroupId: string;
            message: any;
        };

        Patcher.after(ChatMessage, "default", (_, [props]: PatchArgs[], res) => {
            const tree = Utilities.findInReactTree(res, e => e?.renderPopout);
            const user = props?.message?.author;
            if (!user || !tree?.children || tree.children.__patched || (user.bot && user.discriminator === "0000")) return;
            
            tree.children = () => <StatusAvatar {...props} />;

            tree.children.__patched = true;
        });
    }

    async patchChannelMessage(): Promise<void> {
        const ChannelMessage = WebpackModules.getModule(m => m.type.displayName === "ChannelMessage");

        const cancelPatch = Patcher.after(ChannelMessage, "type", (_, __, res) => {
            const tree = Utilities.findInReactTree(res, e => e?.childrenHeader);
            if (!tree) return;

            Patcher.after(tree.childrenHeader.type, "type", (_, [props], res) => {
                res.props.children[0] = <StatusAvatar {...props} />
            });

            cancelPatch();
        });
    }

    onStop(): void {
        Patcher.unpatchAll();

        stylesheet.remove();
    }
}