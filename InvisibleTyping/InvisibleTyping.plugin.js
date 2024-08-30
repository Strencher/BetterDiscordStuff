/**
 * @name InvisibleTyping
 * @version 1.3.5
 * @author Strencher
 * @authorId 415849376598982656
 * @description Enhanced version of silent typing.
 * @source https://github.com/Strencher/BetterDiscordStuff/blob/master/InvisibleTyping/InvisibleTyping.plugin.js
 * @invite gvA2ree
 * @changelogDate 2024-08-29
 */

'use strict';

/* @module react */
const React = BdApi.React;
/*@end */

/* @module @manifest */
var manifest = {
    "name": "InvisibleTyping",
    "version": "1.3.5",
    "author": "Strencher",
    "authorId": "415849376598982656",
    "description": "Enhanced version of silent typing.",
    "source": "https://github.com/Strencher/BetterDiscordStuff/blob/master/InvisibleTyping/InvisibleTyping.plugin.js",
    "invite": "gvA2ree",
    "changelog": [{
        "title": "Fixed",
        "type": "fixed",
        "items": [
            "The Plugin works again",
            "Fixed some logic issues",
            "Fixed sticky button"
        ]
    }],
    "changelogDate": "2024-08-29"
};
/*@end */

/* @module @api */
const {
    Components,
    ContextMenu,
    Data,
    DOM,
    Net,
    Patcher,
    Plugins,
    ReactUtils,
    Themes,
    UI,
    Utils,
    Webpack
} = new BdApi(manifest.name);
/*@end */

/* @module @styles */

var Styles = {
    sheets: [],
    _element: null,
    load() {
        DOM.addStyle(this.sheets.join("\n"));
    },
    unload() {
        DOM.removeStyle();
    }
};
/*@end */

/* @module typingButton.scss */
Styles.sheets.push("/* typingButton.scss */", `.invisibleTypingButton svg {
  color: var(--interactive-normal);
  overflow: visible;
  margin-top: 2.5px;
}

.invisibleTypingButton .disabledStrokeThrough {
  position: absolute;
  transform: translateX(-15px) translateY(530px) rotate(-45deg);
}

.invisibleTypingButton {
  background: transparent;
}
.invisibleTypingButton:hover:not(.disabled) svg {
  color: var(--interactive-hover);
}

.invisibleTypingTooltip {
  display: inline-flex;
}`);
var InvisibleTypingButton = {
    "invisibleTypingButton": "invisibleTypingButton",
    "disabledStrokeThrough": "disabledStrokeThrough",
    "disabled": "disabled",
    "invisibleTypingTooltip": "invisibleTypingTooltip"
};
/*@end */

/* @module shared.js */
const Dispatcher = Webpack.getByKeys("_dispatch");
const Flux = Webpack.getByKeys("Store");
const TypingModule = Webpack.getByKeys("startTyping");
const useStateFromStores = Webpack.getByStrings("useStateFromStores", {
    searchExports: true
});

/*@end */

/* @module settings.js */
const Settings = new class Settings2 extends Flux.Store {
    constructor() {
        super(Dispatcher, {});
    }
    _settings = Data.load("settings") ?? {};
    get(key, def) {
        return this._settings[key] ?? def;
    }
    set(key, value) {
        this._settings[key] = value;
        Data.save("settings", this._settings);
        this.emitChange();
    }
}();

/*@end */

/* @module settings.json */
var SettingsItems = [{
    type: "switch",
    name: "Automatically enable",
    note: "Automatically enables the typing indicator for each channel that isn't manually disabled",
    id: "autoEnable",
    value: true
}];
/*@end */

/* @module settings.jsx */
const {
    FormSwitch
} = Webpack.getByKeys("FormSwitch");

function SwitchItem(props) {
    const value = useStateFromStores([Settings], () => Settings.get(props.id, props.value));
    return React.createElement(
        FormSwitch, {
            ...props,
            value,
            children: props.name,
            onChange: (value2) => {
                Settings.set(props.id, value2);
            }
        }
    );
}

function renderItems(items) {
    return items.map((item) => {
        switch (item.type) {
            case "switch":
                return React.createElement(SwitchItem, {
                    ...item
                });
            default:
                return null;
        }
    });
}

function SettingsPanel() {
    return React.createElement("div", null, renderItems(SettingsItems));
}

/*@end */

/* @module changelog.scss */
Styles.sheets.push("/* changelog.scss */", `.Changelog-Title-Wrapper {
  font-size: 20px;
  font-weight: 600;
  font-family: var(--font-display);
  color: var(--header-primary);
  line-height: 1.2;
}
.Changelog-Title-Wrapper div {
  font-size: 12px;
  font-weight: 400;
  font-family: var(--font-primary);
  color: var(--primary-300);
  line-height: 1.3333333333;
}

.Changelog-Banner {
  width: 405px;
  border-radius: 8px;
  margin-bottom: 20px;
}

.Changelog-Item {
  color: #c4c9ce;
}
.Changelog-Item .Changelog-Header {
  display: flex;
  text-transform: uppercase;
  font-weight: 700;
  align-items: center;
  margin-bottom: 10px;
}
.Changelog-Item .Changelog-Header.added {
  color: #45BA6A;
}
.Changelog-Item .Changelog-Header.fixed {
  color: #EC4245;
}
.Changelog-Item .Changelog-Header.improved {
  color: #5865F2;
}
.Changelog-Item .Changelog-Header::after {
  content: "";
  flex-grow: 1;
  height: 1px;
  margin-left: 7px;
  background: currentColor;
}
.Changelog-Item span {
  display: list-item;
  list-style: inside;
  margin-left: 5px;
}
.Changelog-Item span::marker {
  color: var(--background-accent);
}`); /*@end */

/* @module index.tsx */
class InvisibleTyping {
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
        if (!manifest?.changelog?.length || Settings.get("lastVersion") === manifest.version) return;
        const i18n = Webpack.getByKeys("getLocale");
        const formatter = new Intl.DateTimeFormat(i18n.getLocale(), {
            month: "long",
            day: "numeric",
            year: "numeric"
        });
        const title = React.createElement("div", {
            className: "Changelog-Title-Wrapper"
        }, React.createElement("h1", null, "What's New - ", manifest.name), React.createElement("div", null, formatter.format(new Date(manifest.changelogDate)), " - v", manifest.version));
        const items = manifest?.changelog?.map((item) => React.createElement("div", {
            className: "Changelog-Item"
        }, React.createElement("h4", {
            className: `Changelog-Header ${item.type}`
        }, item.title), item.items.map((item2) => React.createElement("span", null, item2))));
        "changelogImage" in manifest && items.unshift(
            React.createElement("img", {
                className: "Changelog-Banner",
                src: manifest.changelogImage
            })
        );
        Settings.set("lastVersion", manifest.version);
        UI.alert(title, items);
    }
    patchTyping() {
        Patcher.instead(TypingModule, "startTyping", (_, [channelId], originalMethod) => {
            const globalTypingEnabled = Settings.get("autoEnable", true);
            const excludeList = Settings.get("exclude", []);
            const shouldType = globalTypingEnabled ? !excludeList.includes(channelId) : excludeList.includes(channelId);
            if (!shouldType) return;
            originalMethod(channelId);
        });
    }
    patchChannelTextArea() {
        const ChannelTextArea = Webpack.getModule((m) => m?.type?.render?.toString?.()?.includes?.("CHANNEL_TEXT_AREA"));
        Patcher.after(ChannelTextArea.type, "render", (_, __, res) => {
            const chatBar = Utils.findInTree(res, (e) => Array.isArray(e?.children) && e.children.some((c) => c?.props?.className?.startsWith("attachButton")), {
                walkable: ["children", "props"]
            });
            if (!chatBar) return console.error("[InvisibleTyping] Failed to find ChatBar");
            const textAreaState = Utils.findInTree(chatBar, (e) => e?.props?.channel, {
                walkable: ["children"]
            });
            if (!textAreaState) return console.error("[InvisibleTyping] Failed to find textAreaState");
            chatBar.children.splice(-1, 0, React.createElement(InvisibleTypingButton, {
                channel: textAreaState?.props?.channel,
                isEmpty: !Boolean(textAreaState?.props?.editorTextContent)
            }));
        });
    }
    getSettingsPanel() {
        return React.createElement(SettingsPanel, null);
    }
}

/*@end */

module.exports = InvisibleTyping;