import {UI, Patcher, Webpack} from "@api";
import Settings from "./modules/settings";
import config from "@manifest";
import Styles from "@styles";
import React from "react";
import "./changelog.css";

const VOICE_CHANNEL_TYPE = 2;
const ReadStateStore = Webpack.getModule(m => m?._dispatchToken && m?.getName?.() === "ReadStateStore");

export default class VoiceUnreadIndicators {
    maybeShowChangelog() {
        if (config.version === Settings.get("latestUsedVersion")) return;

        const items = config.changelog.map(item => (
            <div className={"vui-changelog-item " + "item-changelog-" + item.type}>
                <h4 className="vui-changelog-header">{item.type}</h4>
                {item.items.map(i => <span>{i}</span>)}
            </div>
        ));

        "changelogImage" in config && items.unshift(
            <img className="vui-changelog-banner" src={config.changelogImage} />
        );

        Settings.set("latestUsedVersion", config.version);

        const formatter = new Intl.DateTimeFormat(document.documentElement.lang, {month: "long", day: "numeric", year: "numeric"});
        UI.alert(<div className="vui-title-wrap">
            <h1>What's New - {config.name}</h1>
            <span>{formatter.format(new Date(config.changelogDate))}</span>
        </div>, items);
    }

    start() {
        Styles.load();
        this.patchChannelItem();

        try {this.maybeShowChangelog()} catch {};
    }

    patchChannelItem() {
        const [ChannelItem, moduleKey] = (function* () {
            let matchIndex = -1;
            let keys = [];
            const module = Webpack.getModule(m => {
                keys = Object.keys(m);
                matchIndex = keys.findIndex(k => typeof m[k] === "function" && ~m[k].toString().indexOf("UNREAD_HIGHLIGHT"));
                    
                return matchIndex > -1;
            });

            yield module;
            yield keys[matchIndex];
        })();

        Patcher.before(ChannelItem, moduleKey, (_, [props]) => {
            const {channel} = props;

            if (channel.type !== VOICE_CHANNEL_TYPE) return;

            props.canHaveDot = true;
            props.relevant = props.unread = ReadStateStore.hasUnread(channel.id);
        });
    }

    stop() {
        Styles.unload();
        Patcher.unpatchAll();
    }
}
