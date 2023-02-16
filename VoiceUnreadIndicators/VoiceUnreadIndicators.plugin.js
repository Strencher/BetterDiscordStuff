/**
 * @name VoiceUnreadIndicators
 * @version 1.0.0
 * @description Shows unread indicators on voice channels for their chats.
 * @github https://github.com/Strencher/BetterDiscordStuff/tree/development/VoiceUnreadIndicators
 * @github_raw https://raw.githubusercontent.com/Strencher/BetterDiscordStuff/master/VoiceUnreadIndicators/VoiceUnreadIndicators.plugin.js
 * @invite gvA2ree
 * @changelogImage https://cdn.discordapp.com/attachments/631074312828485652/1075901308701265960/face-with-party-horn-and-party-hat_1f973.png
 * @changelogDate 2023-02-16T22:08:18.958Z
 * @author Strencher
 */

'use strict';

/* @module @manifest */
const config = {
    "name": "VoiceUnreadIndicators",
    "version": "1.0.0",
    "authors": [{
        "name": "Strencher",
        "discord_id": "415849376598982656",
        "github_username": "Strencher",
        "twitter_username": "Strencher3"
    }],
    "description": "Shows unread indicators on voice channels for their chats.",
    "github": "https://github.com/Strencher/BetterDiscordStuff/tree/development/VoiceUnreadIndicators",
    "github_raw": "https://raw.githubusercontent.com/Strencher/BetterDiscordStuff/master/VoiceUnreadIndicators/VoiceUnreadIndicators.plugin.js",
    "invite": "gvA2ree",
    "changelogImage": "https://cdn.discordapp.com/attachments/631074312828485652/1075901308701265960/face-with-party-horn-and-party-hat_1f973.png",
    "changelogDate": "2023-02-16T22:08:18.958Z",
    "changelog": [{
        "title": "Release",
        "type": "added",
        "items": [
            "The Plugin was released!"
        ]
    }]
};

/*@end */

/* @module @api */
const { Data, Patcher, DOM, ReactUtils, Utils, Webpack, UI, ContextMenu } = new BdApi(config.name);
/*@end */

/* @module settings.js */
const Settings = {
    _listeners: /* @__PURE__ */ new Set(),
    _settings: Object.assign({}, {}, Data.load("settings")),
    addReactChangeListener(listener) {
        Settings._listeners.add(listener);
    },
    removeReactChangeListener(listener) {
        Settings._listeners.delete(listener);
    },
    get(key, def) {
        return Settings._settings[key] ?? def;
    },
    set(key, value) {
        Settings._settings[key] = value;
        Data.save("settings", Settings._settings);
        this._listeners.forEach((l) => l());
    }
};

/*@end */

/* @module @styles */
var Styles = {
    sheets: [],
    _element: null,
    load() {
        if (this._element) return;
        this._element = Object.assign(document.createElement("style"), {
            textContent: this.sheets.join("\n"),
            id: config.name
        });
        document.head.appendChild(this._element);
    },
    unload() {
        this._element?.remove();
        this._element = null;
    }
};
/*@end */

/* @module react */
var React = BdApi.React;
/*@end */

/* @module changelog.css */
Styles.sheets.push("/* changelog.css */", `.vui-changelog-item {
    color: #ddd;
}

.vui-changelog-header {
    text-transform: uppercase;
    font-weight: 700;
    display: flex;
    align-items: center;
    margin-bottom: 10px;
}

.item-changelog-added .vui-changelog-header {
    color: #45BA6A;
}
.item-changelog-fixed .vui-changelog-header {
    color: #EC4245;
}
.item-changelog-improved .vui-changelog-header {
    color: #5865F2;
}

.vui-changelog-header::after {
    content: "";
    flex-grow: 1;
    height: 1px;
    background: currentColor;
    margin-left: 7px;
}

.vui-changelog-item span {
    display: list-item;
    margin-left: 5px;
    list-style: inside;
}

.vui-changelog-item span::marker {
    color: var(--background-accent);
}
.vui-changelog-banner {
    width: 405px;
    border-radius: 8px;
    margin-bottom: 20px;
}

.vui-title-wrap {
    font-size: 18px;
}

.vui-title-wrap span {
    font-size: 12px;
    color: var(--text-muted);
    font-family: var(--font-primary);
}
`); /*@end */

/* @module index.jsx */
const VOICE_CHANNEL_TYPE = 2;
const ReadStateStore = Webpack.getModule((m) => m?._dispatchToken && m?.getName?.() === "ReadStateStore");
class VoiceUnreadIndicators {
    maybeShowChangelog() {
        if (config.version === Settings.get("latestUsedVersion"))
            return;
        const items = config.changelog.map((item) => /* @__PURE__ */ React.createElement("div", { className: "vui-changelog-item item-changelog-" + item.type }, /* @__PURE__ */ React.createElement("h4", { className: "vui-changelog-header" }, item.type), item.items.map((i) => /* @__PURE__ */ React.createElement("span", null, i))));
        "changelogImage" in config && items.unshift(
            /* @__PURE__ */
            React.createElement("img", { className: "vui-changelog-banner", src: config.changelogImage })
        );
        Settings.set("latestUsedVersion", config.version);
        const formatter = new Intl.DateTimeFormat(document.documentElement.lang, { month: "long", day: "numeric", year: "numeric" });
        UI.alert( /* @__PURE__ */ React.createElement("div", { className: "vui-title-wrap" }, /* @__PURE__ */ React.createElement("h1", null, "What's New - ", config.name), /* @__PURE__ */ React.createElement("span", null, formatter.format(new Date(config.changelogDate)))), items);
    }
    start() {
        Styles.load();
        this.patchChannelItem();
        try {
            this.maybeShowChangelog();
        } catch {}
    }
    patchChannelItem() {
        const [ChannelItem, moduleKey] = function*() {
            let matchIndex = -1;
            let keys = [];
            const module = Webpack.getModule((m) => {
                keys = Object.keys(m);
                matchIndex = keys.findIndex((k) => typeof m[k] === "function" && ~m[k].toString().indexOf("UNREAD_HIGHLIGHT"));
                return matchIndex > -1;
            });
            yield module;
            yield keys[matchIndex];
        }();
        Patcher.before(ChannelItem, moduleKey, (_, [props]) => {
            const { channel } = props;
            if (channel.type !== VOICE_CHANNEL_TYPE)
                return;
            props.canHaveDot = true;
            props.relevant = props.unread = ReadStateStore.hasUnread(channel.id);
        });
    }
    stop() {
        Styles.unload();
        Patcher.unpatchAll();
    }
}

/*@end */

module.exports = VoiceUnreadIndicators;
