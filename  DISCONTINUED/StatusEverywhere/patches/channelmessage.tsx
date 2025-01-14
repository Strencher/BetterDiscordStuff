import {Patcher, Utilities, WebpackModules} from "@zlibrary";
import React from "react";
import StatusAvatar from "../components/avatar";
import settings from "../components/settings.json";

export default function patchChannelMessage(): void {
    const Patched = Symbol("__StatusEverywhere_patched__");
    const ChannelMessage = WebpackModules.getModule(m => m.type.displayName === "ChannelMessage");
    
    Patcher.after(ChannelMessage, "type", function (_, __, res) {
        const tree = Utilities.findInReactTree(res, e => e?.childrenHeader);
        if (!tree) return;

        Patcher.after(tree.childrenHeader.type, "type", (_, [props], res) => {
            const user = props?.message?.author;
            const channel_id = props?.message?.channel_id;

            res.props.avatar = <StatusAvatar
                {...props}
                type="chat"
                user={user}
                channel_id={channel_id}
                shouldShowUserPopout
                showTyping={{ id: "chatShowTyping", value: true }}
                radial={{ id: "chatRadialStatus", value: false }}
                resolution={{id: "chatAvatarResolution", value: settings.chat.chatAvatarResolution.value}}
            />
        });

        tree.childrenHeader.type[Patched] = true;

        this.unpatch();
    });
}