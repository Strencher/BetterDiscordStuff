/**
 * @name InvisibleTyping
 * @version 1.5.1
 * @author Strencher
 * @authorId 415849376598982656
 * @description Enhanced version of silent typing.
 * @source https://github.com/Strencher/BetterDiscordStuff/blob/master/InvisibleTyping/InvisibleTyping.plugin.js
 * @invite gvA2ree
 */

'use strict';

/* @manifest */
const manifest = {
    "$schema": "../common/Schemas/manifest.schema.json",
    "name": "InvisibleTyping",
    "version": "1.5.1",
    "author": "Strencher",
    "authorId": "415849376598982656",
    "description": "Enhanced version of silent typing.",
    "source": "https://github.com/Strencher/BetterDiscordStuff/blob/master/InvisibleTyping/InvisibleTyping.plugin.js",
    "invite": "gvA2ree",
    "changelog": [{
            "title": "Plugin works again",
            "type": "fixed",
            "items": [
                "Updated the filter for the latest Discord Update."
            ]
        },
        {
            "title": "New Keyboard Icon",
            "type": "improved",
            "items": [
                "Updated the Keyboard Icon to match with the new Discord design."
            ]
        }
    ],
    "changelogDate": "2026-07-03"
};

/* @api */
const {
    Components,
    ContextMenu,
    Data,
    DOM,
    Hooks,
    Patcher,
    UI,
    Webpack
} = new BdApi(manifest.name);

/* @styles */

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

/* ../common/Changelog/style.scss */
Styles.sheets.push("/* ../common/Changelog/style.scss */", `.Changelog-Title-Wrapper {
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
  margin-bottom: 16px;
}
.Changelog-Item .Changelog-Header {
  display: flex;
  text-transform: uppercase;
  font-weight: 700;
  align-items: center;
  margin-bottom: 10px;
}
.Changelog-Item .Changelog-Header.added {
  color: #45ba6a;
}
.Changelog-Item .Changelog-Header.changed {
  color: #f0b232;
}
.Changelog-Item .Changelog-Header.fixed {
  color: #ec4245;
}
.Changelog-Item .Changelog-Header.improved {
  color: #5865f2;
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
}`);

/* react */
var React = BdApi.React;

/* ../common/Changelog/index.tsx */
function showChangelog(manifest) {
    if (Data.load("lastVersion") === manifest.version) return;
    if (!manifest.changelog.length) return;
    const i18n = Webpack.getByKeys("getLocale");
    const formatter = new Intl.DateTimeFormat(i18n.getLocale(), {
        month: "long",
        day: "numeric",
        year: "numeric"
    });
    const title = React.createElement("div", {
        className: "Changelog-Title-Wrapper"
    }, React.createElement("h1", null, "What's New - ", manifest.name), React.createElement("div", null, formatter.format(new Date(manifest.changelogDate)), " - v", manifest.version));
    const items = manifest.changelog.map((item) => React.createElement("div", {
        className: "Changelog-Item"
    }, React.createElement("h4", {
        className: `Changelog-Header ${item.type}`
    }, item.title), item.items.map((item2) => React.createElement("span", null, item2))));
    "changelogImage" in manifest && items.unshift(React.createElement("img", {
        className: "Changelog-Banner",
        src: manifest.changelogImage
    }));
    UI.alert(title, items);
    Data.save("lastVersion", manifest.version);
}

/* ../common/ErrorBoundary/style.scss */
Styles.sheets.push("/* ../common/ErrorBoundary/style.scss */", `.errorBoundary {
  align-items: center;
  background: #473c41;
  border: 2px solid #f04747;
  border-radius: 5px;
  padding: 5px;
  margin: 10px;
  color: #fff;
  font-size: 16px;
}
.errorBoundary .errorText {
  display: flex;
  flex-direction: column;
  gap: 5px;
}`);

/* ../common/ErrorBoundary/index.tsx */
const ErrorIcon = (props) => React.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "#ddd",
    width: "24",
    height: "24",
    ...props
}, React.createElement("path", {
    d: "M0 0h24v24H0z",
    fill: "none"
}), React.createElement("path", {
    d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"
}));
class ErrorBoundary extends React.Component {
    state = {
        hasError: false,
        error: null,
        info: null
    };
    componentDidCatch(error, info) {
        this.setState({
            error,
            info,
            hasError: true
        });
        console.error(
            `[ErrorBoundary:${this.props.id}] HI OVER HERE!! SHOW THIS SCREENSHOT TO THE DEVELOPER.
`,
            error
        );
    }
    render() {
        if (this.state.hasError) {
            return this.props.mini ? React.createElement(ErrorIcon, {
                fill: "#f04747"
            }) : React.createElement("div", {
                className: "errorBoundary"
            }, React.createElement("div", {
                className: "errorText"
            }, React.createElement("span", null, "An error has occured while rendering ", this.props.id, "."), React.createElement("span", null, "Open console (", React.createElement("code", null, "CTRL + SHIFT + i / CMD + SHIFT + i"), ') - Select the "Console" tab and screenshot the big red error.')));
        } else return this.props.children;
    }
}

/* ../common/Settings/store.ts */
const Dispatcher = Webpack.getByKeys("dispatch", "subscribe", {
    searchExports: true
});
const Flux = Webpack.getByKeys("Store");
const Settings = new class Settings2 extends Flux.Store {
    constructor() {
        super(Dispatcher, {});
    }
    _settings = Data.load("settings") ?? {};
    get(key, def = null) {
        return this._settings[key] ?? def;
    }
    set(key, value) {
        this._settings[key] = value;
        Data.save("settings", this._settings);
        this.emitChange();
    }
}();

/* ../common/Settings/items/dropdown.tsx */
const {
    SettingItem: SettingItem$2
} = Components;
const Select = Webpack.getByStrings('selectionMode:"single",onSelectionChange:', "isSelected:", {
    searchExports: true
});

function DropdownItem(props) {
    return React.createElement(ErrorBoundary, {
        id: props.id
    }, React.createElement(SettingItem$2, {
        ...props
    }, React.createElement(
        Select, {
            closeOnSelect: true,
            options: props.options,
            serialize: (v) => String(v),
            select: (v) => Settings.set(props.id, v),
            isSelected: (v) => Settings.get(props.id, props.value) === v
        }
    )));
}

/* ../common/Settings/items/slider.tsx */
const {
    SettingItem: SettingItem$1
} = Components;
const Slider = Webpack.getByStrings("stickToMarkers");

function SliderItem(props) {
    const value = Hooks.useStateFromStores([Settings], () => Settings.get(props.id, props.value));
    return React.createElement(ErrorBoundary, {
        id: props.id
    }, React.createElement(SettingItem$1, {
        ...props
    }, React.createElement(
        Slider, {
            ...props,
            handleSize: 10,
            initialValue: value,
            defaultValue: props.defaultValue,
            minValue: props.minValue,
            maxValue: props.maxValue,
            onValueChange: (value2) => Settings.set(props.id, Math.round(value2)),
            onValueRender: (value2) => Math.round(value2)
        }
    )));
}

/* ../common/Settings/items/switch.tsx */
const {
    SettingItem,
    SwitchInput
} = Components;

function SwitchItem(props) {
    const value = Hooks.useStateFromStores([Settings], () => Settings.get(props.id, props.value));
    return React.createElement(ErrorBoundary, {
        id: props.id
    }, React.createElement(SettingItem, {
        ...props,
        inline: true
    }, React.createElement(SwitchInput, {
        value,
        onChange: (v) => Settings.set(props.id, v)
    })));
}

/* ../common/Settings/panel.tsx */
function SettingsPanel({
    items,
    components: customComponents
}) {
    const ComponentMap = {
        dropdown: DropdownItem,
        switch: SwitchItem,
        slider: SliderItem,
        ...customComponents
    };
    return items.map((item) => {
        const Component = ComponentMap[item.type];
        return Component ? React.createElement(Component, {
            key: item.id,
            ...item
        }) : null;
    });
}

/* modules/shared.ts */
Webpack.getByKeys("dispatch", "register", {
    searchExports: true
});
Webpack.getByKeys("Store");
const TypingModule = Webpack.getByKeys("startTyping");
const buildClassName = (...args) => {
    return args.reduce((classNames, arg) => {
        if (!arg) return classNames;
        if (typeof arg === "string" || typeof arg === "number") {
            classNames.push(String(arg));
        } else if (Array.isArray(arg)) {
            const nestedClassNames = buildClassName(...arg);
            if (nestedClassNames) classNames.push(nestedClassNames);
        } else if (typeof arg === "object") {
            for (const key in arg) {
                if (Object.prototype.hasOwnProperty.call(arg, key) && arg[key]) {
                    classNames.push(key);
                }
            }
        }
        return classNames;
    }, []).join(" ");
};

/* components/icons/keyboard.tsx */
function Keyboard({
    disabled,
    ...props
}) {
    return React.createElement("svg", {
        ...props,
        width: "22.5",
        height: "22.5",
        viewBox: "0 0 24 24"
    }, React.createElement(
        "path", {
            mask: disabled ? "url(#invisible-typing-mask)" : void 0,
            fill: "currentColor",
            fillRule: "evenodd",
            d: "M4 4a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h16a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H4Zm-.5 3a.5.5 0 0 0-.5.5v1c0 .28.22.5.5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1Zm4 0a.5.5 0 0 0-.5.5v1c0 .28.22.5.5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1ZM7 11.5c0-.28.22-.5.5-.5h1c.28 0 .5.22.5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1ZM3.5 11a.5.5 0 0 0-.5.5v1c0 .28.22.5.5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1ZM11 7.5c0-.28.22-.5.5-.5h1c.28 0 .5.22.5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Zm.5 3.5a.5.5 0 0 0-.5.5v1c0 .28.22.5.5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1ZM15 7.5c0-.28.22-.5.5-.5h1c.28 0 .5.22.5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Zm.5 3.5a.5.5 0 0 0-.5.5v1c0 .28.22.5.5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1ZM19 7.5c0-.28.22-.5.5-.5h1c.28 0 .5.22.5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Zm.5 3.5a.5.5 0 0 0-.5.5v1c0 .28.22.5.5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1ZM7 15.5c0-.28.22-.5.5-.5h9c.28 0 .5.22.5.5v1a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5v-1Z"
        }
    ), React.createElement("mask", {
        id: "invisible-typing-mask"
    }, React.createElement("path", {
        fill: "#fff",
        d: "M0 0h24v24H0Z"
    }), React.createElement("path", {
        stroke: "#000",
        strokeWidth: "5.99068",
        d: "M0 24 24 0"
    })), disabled ? React.createElement("path", {
        fill: "currentColor",
        d: "M22.7 2.7a1 1 0 0 0-1.4-1.4l-20 20a1 1 0 1 0 1.4 1.4Z"
    }) : null);
}

/* components/typingButton.scss */
Styles.sheets.push("/* components/typingButton.scss */", `.invisibleTypingButton svg {
  color: var(--interactive-normal);
  overflow: visible;
}

.invisibleTypingButton {
  box-sizing: border-box;
  padding: 0;
  margin-inline: 0;
  min-height: var(--space-32);
  min-width: var(--space-32);
}
.invisibleTypingButton:hover:not(.disabled) svg {
  color: var(--interactive-hover);
}

.invisibleTypingTooltip {
  display: inline-flex;
}`);
var styles = {
    "invisibleTypingButton": "invisibleTypingButton"
};

/* components/typingButton.tsx */
const ChatButton = Webpack.getBySource("CHAT_INPUT_BUTTON_NOTIFICATION", "animated.div")?.A;
const removeItem = (array, item) => {
    while (array.includes(item)) {
        array.splice(array.indexOf(item), 1);
    }
    return array;
};

function InvisibleTypingContextMenu() {
    const enabled = Hooks.useStateFromStores([Settings], () => Settings.get("autoEnable", true));
    return React.createElement(ContextMenu.Menu, {
        navId: "invisible-typing-context-menu",
        onClose: ContextMenu.close
    }, React.createElement(
        ContextMenu.Item, {
            id: "globally-disable-or-enable-typing",
            label: enabled ? "Disable Globally" : "Enable Globally",
            action: () => {
                Settings.set("autoEnable", !enabled);
            }
        }
    ), React.createElement(
        ContextMenu.Item, {
            color: "danger",
            label: "Reset Config",
            disabled: !Settings.get("exclude", []).length,
            id: "reset-config",
            action: () => {
                Settings.set("exclude", []);
                UI.showToast("Successfully reset config for all channels.", {
                    type: "success"
                });
            }
        }
    ));
}

function InvisibleTypingButton({
    channel,
    isEmpty
}) {
    const enabled = Hooks.useStateFromStores([Settings], InvisibleTypingButton.getState.bind(this, channel.id));
    const handleClick = React.useCallback(() => {
        const excludeList = [...Settings.get("exclude", [])];
        if (excludeList.includes(channel.id)) {
            removeItem(excludeList, channel.id);
            TypingModule.stopTyping(channel.id);
        } else {
            excludeList.push(channel.id);
            if (!isEmpty) TypingModule.startTyping(channel.id);
        }
        Settings.set("exclude", excludeList);
    }, [enabled]);
    const handleContextMenu = React.useCallback(
        (event) => {
            ContextMenu.open(event, () => {
                return React.createElement(InvisibleTypingContextMenu, null);
            });
        },
        [enabled]
    );
    return React.createElement(Components.Tooltip, {
        text: enabled ? "Typing Enabled" : "Typing Disabled"
    }, (props) => React.createElement("div", {
        ...props,
        onClick: handleClick,
        onContextMenu: handleContextMenu
    }, React.createElement(
        ChatButton, {
            className: buildClassName(styles.invisibleTypingButton, {
                enabled,
                disabled: !enabled
            })
        },
        React.createElement(Keyboard, {
            disabled: !enabled
        })
    )));
}
InvisibleTypingButton.getState = (channelId) => {
    const isGlobal = Settings.get("autoEnable", true);
    const isExcluded = Settings.get("exclude", []).includes(channelId);
    if (isGlobal && isExcluded) return false;
    if (isExcluded && !isGlobal) return true;
    return isGlobal;
};

/* settings.json */
var items = [{
    type: "switch",
    name: "Automatically enable",
    note: "Automatically enables the typing indicator for each channel that isn't manually disabled",
    id: "autoEnable",
    value: true
}];
var SettingsItems = {
    items: items
};

/* index.tsx */
class InvisibleTyping {
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
    getState(channelId) {
        return InvisibleTypingButton.getState(channelId);
    }
    setState(channelId, value) {
        const excludeList = [...Settings.get("exclude", [])];
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
            const [channelId] = args;
            const globalTypingEnabled = Settings.get("autoEnable", true);
            const excludeList = Settings.get("exclude", []);
            const shouldType = globalTypingEnabled ? !excludeList.includes(channelId) : excludeList.includes(channelId);
            if (!shouldType) return;
            originalMethod(channelId);
        });
    }
    patchChannelTextArea() {
        const ChatButtonsGroup = Webpack.getBySource("isSubmitButtonEnabled", ".A.getActiveOption(")?.A;
        Patcher.after(ChatButtonsGroup, "type", (_, methodArgs, res) => {
            const [args] = methodArgs;
            if (!args.disabled && ["normal", "sidebar"].includes(args.type.analyticsName) && Array.isArray(res.props?.children)) {
                res.props.children.unshift(React.createElement(InvisibleTypingButton, {
                    channel: args.channel,
                    isEmpty: !args.textValue
                }));
            }
        });
    }
    getSettingsPanel() {
        return React.createElement(SettingsPanel, {
            items: SettingsItems.items
        });
    }
}

module.exports = InvisibleTyping;