/**
 * @name InvisibleTyping
 * @version 1.5.3
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
    "version": "1.5.3",
    "author": "Strencher",
    "authorId": "415849376598982656",
    "description": "Enhanced version of silent typing.",
    "source": "https://github.com/Strencher/BetterDiscordStuff/blob/master/InvisibleTyping/InvisibleTyping.plugin.js",
    "invite": "gvA2ree",
    "changelog": {
        "date": "2026-10-03",
        "changes": [{
            "title": "Better stability against Discord updates",
            "type": "improved",
            "blurb": "Thanks to [Skamt](https://betterdiscord.app/developers/Skamt) and [Arven](https://betterdiscord.app/developers/Arven)",
            "items": [
                "The plugin has been updated to be more resilient against changes in Discord's internal code, reducing the likelihood of breaking with future updates"
            ]
        }]
    }
};

/* @api */
const {
    Components,
    ContextMenu,
    Data,
    DOM,
    Hooks,
    Logger,
    Patcher,
    UI,
    Webpack
} = new BdApi(manifest.name);

/* react */
var React = BdApi.React;

/* ../common/Changelog/footer.tsx */
const {
    Text
} = Components;

function Footer({
    manifest
}) {
    if (!manifest.invite && !manifest.source) return null;
    let issuesUrl;
    if (manifest.source) {
        const url = new URL(manifest.source);
        const [, owner, repo] = url.pathname.split("/");
        url.pathname = `/${owner}/${repo}/issues`;
        issuesUrl = url.toString();
    }
    return React.createElement(Text, null, "Need support?", " ", manifest.invite && React.createElement(React.Fragment, null, "Join the", " ", React.createElement("a", {
        onClick: () => UI.showInviteModal(manifest.invite),
        style: {
            textDecoration: "underline"
        }
    }, "Discord Server"), manifest.source && " or "), manifest.source && React.createElement(React.Fragment, null, "Check for Issues on", " ", React.createElement("a", {
        href: issuesUrl,
        target: "_blank",
        rel: "noreferrer",
        style: {
            textDecoration: "underline"
        }
    }, "GitHub")));
}

/* ../common/Changelog/index.tsx */
function showChangelog(manifest) {
    if (Data.load("lastVersion") === manifest.version) return;
    if (!manifest.changelog) return;
    const {
        date,
        title,
        subtitle,
        ...changelog
    } = manifest.changelog;
    if (!changelog.changes?.length && !changelog.blurb && !changelog.video && !changelog.banner) return;
    const i18n = Webpack.getByKeys("getLocale");
    const formatter = new Intl.DateTimeFormat(i18n.getLocale(), {
        month: "long",
        day: "numeric",
        year: "numeric"
    });
    UI.showChangelogModal({
        title: title ?? `What's New - ${manifest.name}`,
        subtitle: subtitle ?? `${date ? formatter.format(new Date(date)) + " - " : ""}v${manifest.version}`,
        ...changelog,
        footer: React.createElement(Footer, {
            manifest
        })
    });
    Data.save("lastVersion", manifest.version);
}

/* @styles */


const STYLE_ID = manifest.name + "-popout-styles";

var Styles = {
    sheets: [],
    _element: null,
    _listener: null,
    get _store() {
        return Webpack.getStore("PopoutWindowStore");
    },
    _forEachPopout(cb) {
        if (!this._store) return;
        for (const key of this._store.getWindowKeys()) {
            const doc = this._store.getWindow(key)?.document;
            if (doc) cb(doc);
        }
    },
    _injectPopouts() {
        const css = this.sheets.join("\n");
        this._forEachPopout(doc => {
            if (doc.getElementById(STYLE_ID)) return;
            doc.head.append(DOM.createElement("style", {
                id: STYLE_ID
            }, css));
        });
    },
    load() {
        DOM.addStyle(this.sheets.join("\n"));
        if (!this._store) return;
        this._listener = () => this._injectPopouts();
        this._store.addChangeListener(this._listener);
        this._injectPopouts();
    },
    unload() {
        DOM.removeStyle();
        if (!this._store) return;
        if (this._listener) this._store.removeChangeListener(this._listener);
        this._listener = null;
        this._forEachPopout(doc => doc.getElementById(STYLE_ID)?.remove());
    }
};

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
        Logger.error(`[ErrorBoundary:${this.props.id}] HI OVER HERE!! SHOW THIS SCREENSHOT TO THE DEVELOPER.
`, error);
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
const Dispatcher$1 = Webpack.getByKeys("dispatch", "subscribe", {
    searchExports: true
});
const Flux = Webpack.getByKeys("Store");
const Settings = new class Settings2 extends Flux.Store {
    constructor() {
        super(Dispatcher$1, {});
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

/* ../common/Settings/items/shared.tsx */
function BetaTag() {
    return React.createElement(
        "span", {
            style: {
                display: "inline-flex",
                alignItems: "center",
                height: 16,
                marginLeft: "var(--space-4)",
                padding: "0 var(--space-8)",
                borderRadius: "var(--radius-round)",
                background: "var(--badge-primary-background)",
                color: "var(--badge-primary-text)",
                fontSize: 12,
                fontWeight: 600,
                lineHeight: "16px",
                textTransform: "uppercase"
            }
        },
        "Beta"
    );
}

function Warning({
    children
}) {
    return React.createElement(
        "div", {
            style: {
                marginTop: 8,
                padding: "6px 10px",
                borderRadius: 4,
                border: "1px solid var(--border-feedback-warning)",
                background: "var(--background-feedback-warning)",
                color: "var(--text-default)",
                fontSize: 14,
                lineHeight: "18px"
            }
        },
        children
    );
}

function getItemLabels({
    name,
    note,
    isBeta,
    warning
}) {
    return {
        name: isBeta ? React.createElement(React.Fragment, null, name, React.createElement(BetaTag, null)) : name,
        note: warning ? React.createElement(React.Fragment, null, note, React.createElement(Warning, null, warning)) : note
    };
}

/* ../common/Settings/items/dropdown.tsx */
const {
    SettingItem: SettingItem$2
} = Components;
const Select = Webpack.getByStrings('selectionMode:"single",onSelectionChange:', "clear:()=>", {
    searchExports: true
});

function DropdownItem({
    isBeta,
    warning,
    ...props
}) {
    const value = Hooks.useStateFromStores([Settings], () => Settings.get(props.id, props.value));
    const options = props.options.map(
        (option) => typeof option === "string" ? {
            label: option,
            value: option
        } : option
    );
    return React.createElement(ErrorBoundary, {
        id: props.id
    }, React.createElement(SettingItem$2, {
        ...props,
        ...getItemLabels({
            ...props,
            isBeta,
            warning
        }),
        inline: true
    }, React.createElement("div", {
        style: {
            width: 200,
            flexShrink: 0
        }
    }, React.createElement(
        Select, {
            closeOnSelect: true,
            options,
            value,
            onChange: (v) => Settings.set(props.id, v),
            renderOptionLabel: (option) => option.label
        }
    ))));
}

/* ../common/Settings/items/slider.tsx */
const {
    SettingItem: SettingItem$1
} = Components;
const Slider = Webpack.getByStrings("stickToMarkers", "moveStaggered", {
    searchExports: true
});

function SliderItem({
    isBeta,
    warning,
    ...props
}) {
    const value = Hooks.useStateFromStores([Settings], () => Settings.get(props.id, props.value));
    return React.createElement(ErrorBoundary, {
        id: props.id
    }, React.createElement(SettingItem$1, {
        ...props,
        ...getItemLabels({
            ...props,
            isBeta,
            warning
        })
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

function SwitchItem({
    isBeta = false,
    disabled = false,
    warning,
    ...props
}) {
    const stored = Hooks.useStateFromStores([Settings], () => Settings.get(props.id, props.value));
    const value = disabled ? false : stored;
    return React.createElement(ErrorBoundary, {
        id: props.id
    }, React.createElement(SettingItem, {
        ...props,
        ...getItemLabels({
            ...props,
            isBeta,
            warning
        }),
        inline: true
    }, React.createElement(SwitchInput, {
        value,
        disabled,
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
const Dispatcher = Webpack.getByKeys("dispatch", "register", {
    searchExports: true
});
Webpack.getByKeys("Store");
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
const stopTyping = (channelId) => Dispatcher.dispatch({
    type: "TYPING_STOP_LOCAL",
    channelId
});
const startTyping = (channelId) => Dispatcher.dispatch({
    type: "TYPING_START_LOCAL",
    channelId
});

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
  color: var(--interactive-icon-default);
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
  color: var(--interactive-icon-hover);
}

.invisibleTypingTooltip {
  display: inline-flex;
}`);
var styles = {
    "invisibleTypingButton": "invisibleTypingButton"
};

/* components/typingButton.tsx */
const ChatButton = Webpack.getBySource("CHAT_INPUT_BUTTON_NOTIFICATION", "animated.div")?.A;

function InvisibleTypingContextMenu(props) {
    const enabled = Hooks.useStateFromStores([Settings], () => Settings.get("autoEnable", true));
    const hasExcluded = Hooks.useStateFromStores(
        [Settings],
        () => Settings.get("exclude", []).length > 0
    );
    return React.createElement(ContextMenu.Menu, {
        ...props
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
            disabled: !hasExcluded,
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
    const enabled = Hooks.useStateFromStores([Settings], () => InvisibleTypingButton.getState(channel.id));
    const handleClick = React.useCallback(() => {
        const excludeList = Settings.get("exclude", []);
        Settings.set(
            "exclude",
            excludeList.includes(channel.id) ? excludeList.filter((id) => id !== channel.id) : [...excludeList, channel.id]
        );
        if (!enabled && !isEmpty) startTyping(channel.id);
        else stopTyping(channel.id);
    }, [enabled, channel.id, isEmpty]);
    const handleContextMenu = React.useCallback((event) => {
        ContextMenu.open(event.nativeEvent, InvisibleTypingContextMenu);
    }, []);
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
    return isGlobal !== isExcluded;
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
    removeInterceptor = null;
    start() {
        Styles.load();
        showChangelog(manifest);
        this.removeInterceptor = this.patchTyping();
        this.patchChannelTextArea();
    }
    stop() {
        Styles.unload();
        Patcher.unpatchAll();
        this.removeInterceptor?.();
        this.removeInterceptor = null;
    }
    getState(channelId) {
        return InvisibleTypingButton.getState(channelId);
    }
    setState(channelId, value) {
        const isGlobal = Settings.get("autoEnable", true);
        const excludeList = Settings.get("exclude", []).filter((id) => id !== channelId);
        if (value !== isGlobal) excludeList.push(channelId);
        Settings.set("exclude", excludeList);
        if (!value) stopTyping(channelId);
    }
    patchTyping() {
        function interceptor({
            type,
            channelId
        }) {
            if (type !== "TYPING_START_LOCAL") return;
            return !InvisibleTypingButton.getState(channelId);
        }
        Dispatcher.addInterceptor(interceptor);
        return () => {
            const index = Dispatcher._interceptors.indexOf(interceptor);
            if (index !== -1) Dispatcher._interceptors.splice(index, 1);
        };
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