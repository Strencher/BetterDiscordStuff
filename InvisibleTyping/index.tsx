import React from "react";
import { Logger, Patcher, Utils, Webpack } from "@api";
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
        const ChannelTextArea = Webpack.getModule(m => m?.type?.render?.toString?.()?.includes?.("CHANNEL_TEXT_AREA"))

        Patcher.after(ChannelTextArea.type, "render", (_, __, res) => {
            const isProfilePopout = Utils.findInTree(res, e => Array.isArray(e?.value) && e.value.some(v => v === "bite size profile popout"), { walkable: ["children", "props"] });
            if (isProfilePopout) return;

            const chatBar = Utils.findInTree(res, e => Array.isArray(e?.children) && e.children.some(c => c?.props?.className?.startsWith("attachButton")), { walkable: ["children", "props"] });
            if (!chatBar) return Logger.error("Failed to find ChatBar");

            const textAreaState = Utils.findInTree(chatBar, e => e?.props?.channel, { walkable: ["children"] });
            if (!textAreaState) return Logger.error("Failed to find textAreaState");

            chatBar.children.splice(-1, 0, <InvisibleTypingButton channel={textAreaState?.props?.channel} isEmpty={!Boolean(textAreaState?.props?.editorTextContent)} />);
        });
    }

    getSettingsPanel() {
        return <SettingsPanel />;
    }
}
