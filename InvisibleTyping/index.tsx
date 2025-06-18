import React from "react";
import { Patcher, Webpack } from "@api";
import manifest from "@manifest";
import Styles from "@styles";

import showChangelog from "../common/Changelog";

import InvisibleTypingButton from "./components/typingButton";
import SettingsPanel from "./components/settings";
import Settings from "./modules/settings";
import { TypingModule } from "./modules/shared";

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
        const excludeList = [...Settings.get<string[]>("exclude", [])];

        if (value) {
            if (!excludeList.includes(channelId))
                excludeList.push(channelId);
        } else {
            excludeList.splice(excludeList.indexOf(channelId), 1);
            TypingModule.stopTyping(channelId);
        }
        Settings.set("exclude", excludeList);
    }

    patchTyping() {
        Patcher.instead(TypingModule, "startTyping", (_, [channelId]: [string], originalMethod) => {
            const globalTypingEnabled = Settings.get("autoEnable", true);
            const excludeList: string[] = Settings.get("exclude", []);
            const shouldType = globalTypingEnabled ? !excludeList.includes(channelId) : excludeList.includes(channelId);
            if (!shouldType) return;
            originalMethod(channelId);
        });
    }

    patchChannelTextArea() {
        const ChatButtonsGroup = Webpack.getBySource("\"ChannelTextAreaButtons\"").Z;

        Patcher.after(ChatButtonsGroup, "type", (_, args, res) => {
            if (args.length == 2 && !args[0].disabled && args[0].type.analyticsName == "normal" && res.props.children && Array.isArray(res.props.children)) {
                res.props.children.unshift(<InvisibleTypingButton channel={args[0].channel} isEmpty={!Boolean(args[0].textValue)} />);
            }
        });
    }

    getSettingsPanel() {
        return <SettingsPanel />;
    }
}
