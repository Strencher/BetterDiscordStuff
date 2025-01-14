import React from "react";
import { Logger, Patcher, UI, Utils, Webpack } from "@api";
import manifest from "@manifest";
import Styles from "@styles";

import InvisibleTypingButton from "./components/typingButton";
import SettingsPanel from "./components/settings";
import Settings from "./modules/settings";
import { TypingModule } from "./modules/shared";

import "./changelog.scss";

export default class InvisibleTyping {
    start() {
        Styles.load();
        this.showChangelog();
        this.patchTyping();
        this.patchChannelTextArea();
    }
    stop() {
        Styles.unload();
        Patcher.unpatchAll();
    }

    showChangelog() {
        if (
            !manifest?.changelog?.length ||
            Settings.get("lastVersion") === manifest.version
        ) return;

        const i18n = Webpack.getByKeys("getLocale");
        const formatter = new Intl.DateTimeFormat(i18n.getLocale(), {
            month: "long",
            day: "numeric",
            year: "numeric"
        });

        const title = (
            <div className="Changelog-Title-Wrapper">
                <h1>What's New - {manifest.name}</h1>
                <div>{formatter.format(new Date(manifest.changelogDate))} - v{manifest.version}</div>
            </div>
        )

        const items = manifest?.changelog?.map(item => (
            <div className="Changelog-Item">
                <h4 className={`Changelog-Header ${item.type}`}>{item.title}</h4>
                {item.items.map(item => (
                    <span>{item}</span>
                ))}
            </div>
        ));

        "changelogImage" in manifest && items.unshift(
            <img className="Changelog-Banner" src={manifest.changelogImage} />
        );

        Settings.set("lastVersion", manifest.version);

        UI.alert(title as unknown as string, items);
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
            const chatBar = Utils.findInTree(res, e => Array.isArray(e?.children) && e.children.some(c => c?.props?.className?.startsWith("attachButton")), { walkable: ["children", "props"] });
            if (!chatBar) return Logger.error("[InvisibleTyping] Failed to find ChatBar");

            const textAreaState = Utils.findInTree(chatBar, e => e?.props?.channel, { walkable: ["children"] });
            if (!textAreaState) return Logger.error("[InvisibleTyping] Failed to find textAreaState");

            chatBar.children.splice(-1, 0, <InvisibleTypingButton channel={textAreaState?.props?.channel} isEmpty={!Boolean(textAreaState?.props?.editorTextContent)} />);
        });
    }

    getSettingsPanel() {
        return <SettingsPanel />;
    }
}
