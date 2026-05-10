import { Patcher, Webpack } from "@api";
import showChangelog from "@common/Changelog";
import { Settings, SettingsItem, SettingsPanel } from "@common/Settings";
import manifest from "@manifest";
import Styles from "@styles";
import React from "react";

import InvisibleTypingButton from "./components/typingButton";
import { TypingModule } from "./modules/shared";
import SettingsItems from "./settings.json";
import { ChatButtonsArgs } from "./types";

export default class InvisibleTyping {
    start() {
        Styles.load();
        showChangelog(manifest);
        this.patchTyping();
        this.patchChannelTextArea();
    }

    stop() {
        Styles.unload();
        Patcher.unpatchAll();
    }

    getState(channelId: string) {
        return InvisibleTypingButton.getState(channelId);
    }

    setState(channelId: string, value: boolean) {
        const excludeList: string[] = [...Settings.get("exclude", [])];

        if (value) {
            if (!excludeList.includes(channelId)) excludeList.push(channelId);
        } else {
            excludeList.splice(excludeList.indexOf(channelId), 1);
            TypingModule.stopTyping(channelId);
        }
        Settings.set("exclude", excludeList);
    }

    patchTyping() {
        Patcher.instead(TypingModule, "startTyping", (_, args, originalMethod) => {
            const [channelId] = args as [string];
            const globalTypingEnabled = Settings.get("autoEnable", true);
            const excludeList: string[] = Settings.get("exclude", []);
            const shouldType = globalTypingEnabled ? !excludeList.includes(channelId) : excludeList.includes(channelId);
            if (!shouldType) return;
            originalMethod(channelId);
        });
    }

    patchChannelTextArea() {
        const ChatButtonsGroup: React.MemoExoticComponent<React.ComponentType<any>> = (
            Webpack.getBySource("showAllButtons", "promotionsByType") as any
        )?.A;

        Patcher.after(ChatButtonsGroup, "type", (_, methodArgs, res) => {
            const args = methodArgs as ChatButtonsArgs;
            if (
                args.length == 2 &&
                !args[0].disabled &&
                args[0].type.analyticsName == "normal" &&
                res.props.children &&
                Array.isArray(res.props.children)
            ) {
                res.props.children.unshift(
                    <InvisibleTypingButton channel={args[0].channel} isEmpty={!args[0].textValue} />
                );
            }
        });
    }

    getSettingsPanel() {
        return <SettingsPanel items={SettingsItems.items as SettingsItem[]} />;
    }
}
