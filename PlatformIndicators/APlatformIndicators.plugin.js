/**
 * @name APlatformIndicators
 * @version 1.6.4
 * @author Strencher
 * @authorId 415849376598982656
 * @description Adds indicators for every platform that the user is using.
 * @source https://github.com/Strencher/BetterDiscordStuff/blob/master/PlatformIndicators/APlatformIndicators.plugin.js
 * @invite gvA2ree
 */

'use strict';

/* @manifest */
const manifest = {
    "$schema": "../common/Schemas/manifest.schema.json",
    "name": "APlatformIndicators",
    "version": "1.6.4",
    "author": "Strencher",
    "authorId": "415849376598982656",
    "description": "Adds indicators for every platform that the user is using.",
    "source": "https://github.com/Strencher/BetterDiscordStuff/blob/master/PlatformIndicators/APlatformIndicators.plugin.js",
    "invite": "gvA2ree",
    "changelog": [{
        "title": "Fixed Crash when streaming to Twitch",
        "type": "fixed",
        "items": [
            "PlatformIndicator will no longet crash when you start streaming to Twitch"
        ]
    }],
    "changelogDate": "2026-05-24"
};

/* @api */
const {
    Components,
    Data,
    DOM,
    Hooks,
    Patcher,
    ReactUtils,
    UI,
    Utils,
    Webpack
} = new BdApi(manifest.name);

/* @styles */

var Styles$2 = {
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
Styles$2.sheets.push("/* ../common/Changelog/style.scss */", `.Changelog-Title-Wrapper {
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
Styles$2.sheets.push("/* ../common/ErrorBoundary/style.scss */", `.errorBoundary {
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
function SettingsPanel$1({
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
const LocalActivityStore = Webpack.getStore("LocalActivityStore");
const SessionsStore = Webpack.getStore("SessionsStore");
const UserStore = Webpack.getStore("UserStore");
const PresenceStore = Webpack.getStore("PresenceStore");
Webpack.getByKeys("useSyncExternalStore");
Webpack.getByKeys("Store");
const StatusTypes = Webpack.getModule((x) => x.DND && x.OFFLINE, {
    searchExports: true
});
const Colors = Webpack.getByKeys("unsafe_rawColors")?.unsafe_rawColors;
const Intl$1 = Webpack.getModule((x) => x.intl);
const formatMessage = (key) => Intl$1.intl.formatToMarkdownString(Intl$1.t[key]);
const Messages = {
    STATUS_DND: formatMessage("jaNpQH"),
    STATUS_OFFLINE: formatMessage("Vv0abJ"),
    STATUS_ONLINE: formatMessage("WbGtnH"),
    STATUS_STREAMING: formatMessage("XKYej5"),
    STATUS_IDLE: formatMessage("qWbtVU"),
    STATUS_MOBILE: formatMessage("5LMZtY")
};
const buildClassName = (...args) => {
    return args.reduce((classNames, arg) => {
        if (!arg) return classNames;
        if (typeof arg === "string" || typeof arg === "number") {
            classNames.push(String(arg));
        } else if (Array.isArray(arg)) {
            const nestedClassNames = buildClassName(...arg);
            if (nestedClassNames) classNames.push(nestedClassNames);
        } else if (typeof arg === "object") {
            Object.keys(arg).forEach((key) => {
                if (arg[key]) classNames.push(key);
            });
        }
        return classNames;
    }, []).join(" ");
};

/* modules/usePlatformStores.ts */
const isStreaming = () => LocalActivityStore.getActivities().some((e) => e.type === 1);

function usePlatformStores(userId, type) {
    const user = Hooks.useStateFromStores([UserStore], () => UserStore.getUser(userId));
    const sessions = Hooks.useStateFromStores([SessionsStore], () => SessionsStore.getSessions());
    const iconStates = Settings.get("icons", {});
    const shownInArea = Settings.get("showIn" + type, true);
    const ignoreBots = Settings.get("ignoreBots", true) && (user?.bot ?? false);
    const shouldShow = shownInArea && !ignoreBots;
    const clients = (() => {
        if (user?.id === UserStore.getCurrentUser()?.id) {
            if (sessions) {
                return Object.entries(sessions).reduce(
                    (acc, [, sessionData]) => {
                        const client = sessionData.clientInfo.client;
                        acc[client] = isStreaming() ? "streaming" : sessionData.status;
                        return acc;
                    }, {}
                );
            }
            return {};
        }
        return PresenceStore.getState().clientStatuses[user?.id] ?? {};
    })();
    return {
        iconStates,
        shouldShow,
        clients,
        user
    };
}

/* modules/utils.ts */
const findInReactTree = (tree, filter) => Utils.findInTree(tree, filter, {
    walkable: ["props", "children", "type"]
});
const upperFirst = (string) => string.charAt(0).toUpperCase() + string.slice(1);

function getStatusText(key, status) {
    return (key === "vr" ? "VR" : upperFirst(key)) + ": " + Messages[`STATUS_${(status === "mobile" ? "mobile_online" : status).toUpperCase()}`];
}

function getStatusColor(status) {
    switch (status) {
        case StatusTypes.ONLINE:
            return Colors.GREEN_360?.css;
        case StatusTypes.IDLE:
            return Colors.YELLOW_300?.css;
        case StatusTypes.DND:
            return Colors.RED_400?.css;
        case StatusTypes.STREAMING:
            return Colors.PLATFORM_TWITCH?.css;
        case StatusTypes.INVISIBLE:
        case StatusTypes.UNKNOWN:
        case StatusTypes.OFFLINE:
        default:
            return Colors.PRIMARY_400?.css;
    }
}

/* components/icons/desktop.tsx */
function Desktop(props) {
    return React.createElement("svg", {
        className: "PI-icon_desktop",
        width: "24",
        height: "24",
        viewBox: "0 -2.5 28 28",
        ...props
    }, React.createElement(
        "path", {
            fill: "currentColor",
            d: "M4 2.5C2.897 2.5 2 3.397 2 4.5V15.5C2 16.604 2.897 17.5 4 17.5H11V19.5H7V21.5H17V19.5H13V17.5H20C21.103 17.5 22 16.604 22 15.5V4.5C22 3.397 21.103 2.5 20 2.5H4ZM20 4.5V13.5H4V4.5H20Z"
        }
    ));
}

/* components/icons/embedded.tsx */
function Embedded(props) {
    return React.createElement("svg", {
        className: "PI-icon_embedded",
        width: "24",
        height: "24",
        viewBox: "0 -2.5 28 28",
        ...props
    }, React.createElement(
        "path", {
            fill: "currentColor",
            d: "M5.79335761,5 L18.2066424,5 C19.7805584,5 21.0868816,6.21634264 21.1990185,7.78625885 L21.8575059,17.0050826 C21.9307825,18.0309548 21.1585512,18.9219909 20.132679,18.9952675 C20.088523,18.9984215 20.0442685,19 20,19 C18.8245863,19 17.8000084,18.2000338 17.5149287,17.059715 L17,15 L7,15 L6.48507125,17.059715 C6.19999155,18.2000338 5.1754137,19 4,19 C2.97151413,19 2.13776159,18.1662475 2.13776159,17.1377616 C2.13776159,17.0934931 2.1393401,17.0492386 2.1424941,17.0050826 L2.80098151,7.78625885 C2.91311838,6.21634264 4.21944161,5 5.79335761,5 Z M14.5,10 C15.3284271,10 16,9.32842712 16,8.5 C16,7.67157288 15.3284271,7 14.5,7 C13.6715729,7 13,7.67157288 13,8.5 C13,9.32842712 13.6715729,10 14.5,10 Z M18.5,13 C19.3284271,13 20,12.3284271 20,11.5 C20,10.6715729 19.3284271,10 18.5,10 C17.6715729,10 17,10.6715729 17,11.5 C17,12.3284271 17.6715729,13 18.5,13 Z M6,9 L4,9 L4,11 L6,11 L6,13 L8,13 L8,11 L10,11 L10,9 L8,9 L8,7 L6,7 L6,9 Z"
        }
    ));
}

/* components/icons/mobile.tsx */
function Mobile(props) {
    return React.createElement("svg", {
        className: "PI-icon_mobile",
        width: "24",
        height: "24",
        transform: "scale(0.9)",
        viewBox: "0 -2.5 32 44",
        ...props
    }, React.createElement(
        "path", {
            fill: "currentColor",
            d: "M 2.882812 0.246094 C 1.941406 0.550781 0.519531 2.007812 0.230469 2.953125 C 0.0585938 3.542969 0 7.234375 0 17.652344 L 0 31.554688 L 0.5 32.558594 C 1.117188 33.769531 2.152344 34.5625 3.519531 34.847656 C 4.210938 35 7.078125 35.058594 12.597656 35 C 20.441406 34.941406 20.691406 34.925781 21.441406 34.527344 C 22.347656 34.054688 23.078125 33.3125 23.578125 32.386719 C 23.921875 31.761719 23.941406 30.964844 24 18.085938 C 24.039062 8.503906 24 4.167969 23.847656 3.464844 C 23.558594 2.121094 22.75 1.097656 21.519531 0.492188 L 20.5 0 L 12.039062 0.0195312 C 6.402344 0.0390625 3.328125 0.113281 2.882812 0.246094 Z M 20.382812 14.582031 L 20.382812 22.917969 L 3.652344 22.917969 L 3.652344 6.25 L 20.382812 6.25 Z M 13.789062 27.539062 C 14.5 28.296875 14.597656 29.035156 14.132812 29.925781 C 13.308594 31.496094 10.671875 31.421875 9.902344 29.8125 C 9.539062 29.054688 9.539062 28.730469 9.902344 28.011719 C 10.691406 26.535156 12.632812 26.308594 13.789062 27.539062 Z M 13.789062 27.539062 "
        }
    ));
}

/* components/icons/vr.tsx */
function VR(props) {
    return React.createElement("svg", {
        className: "PI-icon_vr",
        width: "24",
        height: "24",
        viewBox: "0 -2.5 28 28",
        ...props
    }, React.createElement(
        "path", {
            fill: "currentColor",
            d: "M8.46 8.64a1 1 0 0 1 1 1c0 .44-.3.8-.72.92l-.11.07c-.08.06-.2.19-.2.41a.99.99 0 0 1-.98.86h-.06a1 1 0 0 1-.94-1.05l.02-.32c.05-1.06.92-1.9 1.99-1.9Z"
        }
    ), React.createElement(
        "path", {
            fill: "currentColor",
            fillRule: "evenodd",
            clipRule: "evenodd",
            d: "M15.55 5a5.5 5.5 0 0 1 5.15 3.67h.3a2 2 0 0 1 2 2v3.18a2 2 0 0 1-2 1.99h-.2A4.54 4.54 0 0 1 16.55 19a4.45 4.45 0 0 1-3.6-1.83 1.2 1.2 0 0 0-1.9 0 4.44 4.44 0 0 1-3.9 1.82 4.54 4.54 0 0 1-3.94-3.15H3a2 2 0 0 1-2-2v-3.18c0-1.1.9-1.99 2-1.99h.3A5.5 5.5 0 0 1 8.46 5h7.09Zm-7.1 2C6.6 7 5.06 8.5 4.97 10.41l-.02.66v3.18c0 1.43 1.05 2.66 2.34 2.74.85.06 1.63-.32 2.14-1.01a3.2 3.2 0 0 1 2.57-1.3c1 0 1.97.48 2.57 1.3.5.69 1.3 1.08 2.14 1.01 1.3-.08 2.34-1.31 2.34-2.74l-.02-3.84a3.54 3.54 0 0 0-3.49-3.43H8.45Z"
        }
    ));
}

/* components/icons/web.tsx */
function Web(props) {
    return React.createElement("svg", {
        className: "PI-icon_web",
        width: "24",
        height: "24",
        viewBox: "0 -2.5 28 28",
        ...props
    }, React.createElement(
        "path", {
            fill: "currentColor",
            d: "M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM11 19.93C7.05 19.44 4 16.08 4 12C4 11.38 4.08 10.79 4.21 10.21L9 15V16C9 17.1 9.9 18 11 18V19.93ZM17.9 17.39C17.64 16.58 16.9 16 16 16H15V13C15 12.45 14.55 12 14 12H8V10H10C10.55 10 11 9.55 11 9V7H13C14.1 7 15 6.1 15 5V4.59C17.93 5.78 20 8.65 20 12C20 14.08 19.2 15.97 17.9 17.39Z"
        }
    ));
}

/* components/icons/index.ts */

var Icons = /*#__PURE__*/ Object.freeze({
    __proto__: null,
    desktop: Desktop,
    embedded: Embedded,
    mobile: Mobile,
    vr: VR,
    web: Web
});

/* components/indicators/style.scss */
Styles$2.sheets.push("/* components/indicators/style.scss */", `.indicatorContainer {
  display: inline-flex;
  vertical-align: bottom;
  margin-left: 5px;
}
.indicatorContainer svg {
  margin-left: -2px;
}
.indicatorContainer div:first-child svg {
  margin-left: 2px;
}
.indicatorContainer.type_Chat {
  margin-right: -6px;
  margin-top: 2px;
  vertical-align: top;
}
.indicatorContainer.type_FriendList {
  align-self: center;
  margin-left: 12px;
}
.indicatorContainer.type_FriendList svg {
  height: 22px;
  width: 22px;
}

.PI-icon_mobile {
  position: relative;
  top: 1px;
}

.badge_separator {
  margin-right: 2px;
  padding-right: 2px;
  border-right: thin solid var(--background-modifier-hover);
  height: 14px;
}

div[id*=message-reply] .indicatorContainer.type_Chat {
  margin-left: 0;
  margin-right: 2px;
}`);
var Styles$1 = {
    "indicatorContainer": "indicatorContainer",
    "type_Chat": "type_Chat",
    "type_FriendList": "type_FriendList",
    "PIIcon_mobile": "PI-icon_mobile",
    "badge_separator": "badge_separator"
};

/* components/indicators/index.tsx */
function StatusIndicators({
    type,
    userId,
    size = 18,
    separator = false
}) {
    const state = usePlatformStores(userId, type);
    if (!Object.keys(state.clients).length || !state.shouldShow) return null;
    return React.createElement(React.Fragment, null, separator && React.createElement("span", {
        className: Styles$1.badge_separator
    }), React.createElement("div", {
        className: buildClassName(Styles$1.indicatorContainer, Styles$1["type_" + type]),
        "data-id": userId
    }, Object.entries(state.clients).filter(([key]) => (state.iconStates[key] ?? true) && key in Icons).map(([key, status]) => {
        const Icon = Icons[key];
        return React.createElement(Components.Tooltip, {
            key,
            text: getStatusText(key, status)
        }, (props) => React.createElement(
            Icon, {
                text: getStatusText(key, status),
                style: {
                    color: getStatusColor(status)
                },
                width: size,
                height: size,
                "data-status": status,
                ...props
            }
        ));
    })));
}

/* settings.json */
var items = [{
        type: "switch",
        name: "Show in Friendslist",
        note: "Shows the platform indicators in the friendslist",
        id: "showInFriendsList",
        value: true
    },
    {
        type: "switch",
        name: "Show in Memberlist",
        note: "Shows the platform indicators in the memberlist",
        id: "showInMemberList",
        value: true
    },
    {
        type: "switch",
        name: "Show next to username",
        note: "Shows the platform indicators next the username in messages.",
        id: "showInChat",
        value: true
    },
    {
        type: "switch",
        name: "Show in DMs list",
        note: "Shows the platform indicators in the dm list.",
        id: "showInDmsList",
        value: true
    },
    {
        type: "switch",
        name: "Show in Discord Badges",
        note: "Shows the platform indicators right next to the discord badges.",
        id: "showInBadges",
        value: true
    },
    {
        type: "switch",
        name: "Ignore Bots",
        note: "Ignores the status of bots which is always web anyways.",
        id: "ignoreBots",
        value: true
    },
    {
        type: "smart-disable",
        name: "Disable individual icons",
        id: "icons",
        items: [{
                id: "web",
                value: true,
                icon: "web"
            },
            {
                id: "desktop",
                value: true,
                icon: "desktop"
            },
            {
                id: "mobile",
                value: true,
                icon: "mobile"
            },
            {
                id: "embedded",
                value: true,
                icon: "embedded"
            },
            {
                id: "vr",
                value: true,
                icon: "vr"
            }
        ]
    }
];
var SettingsItems = {
    items: items
};

/* components/icons/checkbox.tsx */
function CheckboxEnabled({
    color,
    ...props
}) {
    return React.createElement("svg", {
        width: "24",
        height: "24",
        viewBox: "0 0 24 24",
        ...props
    }, React.createElement(
        "path", {
            fillRule: "evenodd",
            clipRule: "evenodd",
            fill: color ?? "currentColor",
            d: "M5.37499 3H18.625C19.9197 3 21.0056 4.08803 21 5.375V18.625C21 19.936 19.9359 21 18.625 21H5.37499C4.06518 21 3 19.936 3 18.625V5.375C3 4.06519 4.06518 3 5.37499 3Z"
        }
    ), React.createElement(
        "path", {
            fill: "#fff",
            d: "M9.58473 14.8636L6.04944 11.4051L4.50003 12.9978L9.58473 18L19.5 8.26174L17.9656 6.64795L9.58473 14.8636Z"
        }
    ));
}

function CheckboxDisabled(props) {
    return React.createElement("svg", {
        width: "24",
        height: "24",
        viewBox: "0 0 24 24",
        ...props
    }, React.createElement(
        "path", {
            fillRule: "evenodd",
            clipRule: "evenodd",
            fill: "currentColor",
            d: "M18.625 3H5.375C4.06519 3 3 4.06519 3 5.375V18.625C3 19.936 4.06519 21 5.375 21H18.625C19.936 21 21 19.936 21 18.625V5.375C21.0057 4.08803 19.9197 3 18.625 3ZM19 19V5H4.99999V19H19Z"
        }
    ));
}

function Checkbox({
    checked,
    ...props
}) {
    return checked ? React.createElement(CheckboxEnabled, {
        ...props
    }) : React.createElement(CheckboxDisabled, {
        ...props
    });
}

/* components/settings/style.scss */
Styles$2.sheets.push("/* components/settings/style.scss */", `.SmartDisable {
  color: #fff;
}
.SmartDisable .title {
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 20px;
}
.SmartDisable .body {
  display: grid;
  grid-template-columns: 160px 160px 160px;
  grid-template-rows: auto auto auto;
  column-gap: 15px;
  row-gap: 15px;
}
.SmartDisable .body .item {
  display: flex;
  align-items: center;
  cursor: pointer;
  border-radius: 8px;
  background: var(--primary-630);
  padding: 10px 15px;
}
.SmartDisable .body .item:hover {
  background: var(--primary-500);
}`);
var Styles = {
    "SmartDisable": "SmartDisable",
    "title": "title",
    "body": "body",
    "item": "item"
};

/* components/settings/index.tsx */
function SmartDisable({
    id,
    name,
    items
}) {
    const iconSize = 25;
    const [states, setStates] = React.useState(
        Settings.get(id, Object.fromEntries(items.map((item) => [item.id, item.value])))
    );
    const handleClick = (itemId) => {
        states[itemId] = !states[itemId];
        Settings.set(id, states);
        setStates(Object.assign({}, states));
    };
    return React.createElement("div", {
        className: Styles.SmartDisable
    }, React.createElement("h1", {
        className: Styles.title
    }, name), React.createElement("div", {
        className: Styles.body
    }, items.map((item) => React.createElement("div", {
        key: item.id,
        className: Styles.item,
        onClick: () => handleClick(item.id)
    }, ["online", "dnd", "idle", "offline"].map(
        (status) => React.createElement(Icons[item.icon], {
            key: status,
            style: {
                color: getStatusColor(status)
            },
            width: iconSize,
            height: iconSize
        })
    ), React.createElement(
        Checkbox, {
            width: iconSize,
            height: iconSize,
            checked: !!states[item.id],
            color: "var(--brand-500)"
        }
    )))));
}

function SettingsPanel() {
    return React.createElement(SettingsPanel$1, {
        items: SettingsItems.items,
        components: {
            "smart-disable": SmartDisable
        }
    });
}

/* index.jsx */
class PlatformIndicators {
    getSettingsPanel() {
        return React.createElement(SettingsPanel, null);
    }
    start() {
        Styles$2.load();
        showChangelog(manifest);
        this.patchDMList();
        this.patchMemberList();
        this.patchChat();
        this.patchBadges();
        this.patchFriendList();
    }
    async patchDMList() {
        const UserContext = React.createContext(null);
        const ChannelWrapper = await Webpack.waitForModule(
            Webpack.Filters.bySource('location:"PrivateChannel",', "isMobile")
        );
        const NameWrapper = (await Webpack.waitForModule(Webpack.Filters.bySource("AvatarWithText"))).A;
        const ChannelClasses = await Webpack.waitForModule(Webpack.Filters.byKeys("channel", "decorator"));
        Patcher.after(ChannelWrapper, "Ay", (_, __, res) => {
            if (!Settings.get("showInDmsList", true)) return;
            Patcher.after(res, "type", (_2, [props], res2) => {
                if (!props.user) return;
                if (Settings.get("ignoreBots", true) && props.user.bot) return;
                return React.createElement(UserContext.Provider, {
                    value: props.user
                }, res2);
            });
        });
        const ChannelWrapperElement = document.querySelector(`h2 + .${ChannelClasses.channel}`);
        if (ChannelWrapperElement) {
            const ChannelWrapperInstance = ReactUtils.getOwnerInstance(ChannelWrapperElement);
            if (ChannelWrapperInstance) ChannelWrapperInstance.forceUpdate();
        }
        Patcher.after(NameWrapper, "render", (_, __, res) => {
            if (!Settings.get("showInDmsList", true)) return;
            const user = React.useContext(UserContext);
            if (!user) return;
            const child = Utils.findInTree(res, (e) => e?.className?.includes("nameAndDecorators"), {
                walkable: ["children", "props"]
            });
            if (!child) return;
            child.style = {
                justifyContent: "unset"
            };
            child.children.push(React.createElement(StatusIndicators, {
                userId: user.id,
                type: "DMs"
            }));
        });
    }
    async patchMemberList() {
        const [MemberItem, key] = Webpack.getWithKey(() => true, {
            target: await Webpack.waitForModule(Webpack.Filters.bySource("nameplate:", ".MEMBER_LIST", "listitem"))
        });
        Patcher.after(MemberItem, key, (_, [props], ret) => {
            const user = props.avatar.props.user;
            if (ret?.props?.className?.includes("placeholder")) return;
            if (!Settings.get("showInMemberList", true)) return;
            if (Settings.get("ignoreBots", true) && user.bot) return;
            const child = findInReactTree(ret, (e) => e?.className?.includes("username"));
            if (user && child) {
                child.children = [child.children, React.createElement(StatusIndicators, {
                    userId: user.id,
                    type: "MemberList"
                })];
            }
        });
    }
    async patchChat() {
        const [ChatUsername, key] = Webpack.getWithKey(() => true, {
            target: await Webpack.waitForModule(Webpack.Filters.bySource(".guildMemberAvatar&&null!="))
        });
        Patcher.before(ChatUsername, key, (_, props) => {
            const mainProps = props[0];
            if (!Settings.get("showInChat", true)) return;
            if (Settings.get("ignoreBots", true) && mainProps?.author?.bot) return;
            if (!mainProps?.decorations) return;
            const target = mainProps.decorations?.[1];
            if (!Array.isArray(target)) mainProps.decorations[1] = target ? [target] : [];
            mainProps.decorations[1].unshift(React.createElement(StatusIndicators, {
                userId: mainProps.message.author.id,
                type: "Chat"
            }));
        });
    }
    async patchBadges() {
        const [BadgeList, Key_BL] = Webpack.getWithKey(() => true, {
            target: await Webpack.waitForModule(Webpack.Filters.bySource("badges", "badgeClassName", ".BADGE"))
        });
        Patcher.after(BadgeList, Key_BL, (_, [{
            displayProfile
        }], res) => {
            if (!Settings.get("showInBadges", true)) return;
            if (Settings.get("ignoreBots", true) && displayProfile?.application) return;
            if (!displayProfile?.userId) return;
            res.props.children.push(React.createElement(StatusIndicators, {
                userId: displayProfile.userId,
                type: "Badge",
                separator: true
            }));
        });
    }
    async patchFriendList() {
        const [UserInfo, key] = Webpack.getWithKey(() => true, {
            target: await Webpack.waitForModule(
                Webpack.Filters.bySource("user", "showAccountIdentifier", "overrideDiscriminator")
            )
        });
        const FriendListClasses = await Webpack.waitForModule(Webpack.Filters.byKeys("userInfo", "hovered"));
        if (!Settings.get("showInFriendsList", true)) return;
        DOM.addStyle(
            "PlatformIndicators",
            `
            .${FriendListClasses.discriminator} { display: none; }
            .${FriendListClasses.hovered} .${FriendListClasses.discriminator} { display: unset; }
        `
        );
        Patcher.after(UserInfo, key, (_, [{
            showAccountIdentifier,
            user
        }], res) => {
            if (!showAccountIdentifier) return;
            Patcher.after(res, "type", (_2, __, res2) => {
                res2.props.children.push(React.createElement(StatusIndicators, {
                    userId: user.id,
                    type: "FriendList"
                }));
            });
        });
    }
    stop() {
        Patcher.unpatchAll();
        DOM.removeStyle("PlatformIndicators");
        Styles$2.unload();
    }
}

module.exports = PlatformIndicators;