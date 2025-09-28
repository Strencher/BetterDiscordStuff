/**
 * @name APlatformIndicators
 * @version 1.5.18
 * @author Strencher
 * @authorId 415849376598982656
 * @description Adds indicators for every platform that the user is using.
 * @source https://github.com/Strencher/BetterDiscordStuff/blob/master/PlatformIndicators/APlatformIndicators.plugin.js
 * @invite gvA2ree
 * @changelogDate 2025-09-28
 */

'use strict';

/* react */
const React = BdApi.React;

/* @manifest */
var manifest = {
    "name": "APlatformIndicators",
    "version": "1.5.18",
    "author": "Strencher",
    "authorId": "415849376598982656",
    "description": "Adds indicators for every platform that the user is using.",
    "source": "https://github.com/Strencher/BetterDiscordStuff/blob/master/PlatformIndicators/APlatformIndicators.plugin.js",
    "invite": "gvA2ree",
    "changelog": [{
        "title": "Fixed",
        "type": "fixed",
        "items": [
            "Fix console spamming"
        ]
    }],
    "changelogDate": "2025-09-28"
};

/* @api */
const {
    Components,
    ContextMenu,
    Data,
    DOM,
    Logger,
    Net,
    Patcher,
    Plugins,
    ReactUtils,
    Themes,
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
.Changelog-Item .Changelog-Header.changed {
  color: #F0B232;
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
}`);

/* ../common/Changelog/index.tsx */
function showChangelog(manifest) {
    if (Data.load("lastVersion") === manifest.version) return;
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
    "changelogImage" in manifest && items.unshift(
        React.createElement("img", {
            className: "Changelog-Banner",
            src: manifest.changelogImage
        })
    );
    UI.alert(title, items);
    Data.save("lastVersion", manifest.version);
}

/* components/icons/desktop.jsx */
function Desktop(props) {
    return React.createElement("svg", {
        class: "PI-icon_desktop",
        width: "24",
        height: "24",
        viewBox: "0 -2.5 28 28",
        ...props
    }, React.createElement("path", {
        fill: "currentColor",
        d: "M4 2.5C2.897 2.5 2 3.397 2 4.5V15.5C2 16.604 2.897 17.5 4 17.5H11V19.5H7V21.5H17V19.5H13V17.5H20C21.103 17.5 22 16.604 22 15.5V4.5C22 3.397 21.103 2.5 20 2.5H4ZM20 4.5V13.5H4V4.5H20Z"
    }));
}

/* components/icons/mobile.jsx */
function Mobile(props) {
    return React.createElement("svg", {
        class: "PI-icon_mobile",
        width: "24",
        height: "24",
        transform: "scale(0.9)",
        viewBox: "0 -2.5 32 44",
        ...props
    }, React.createElement("path", {
        fill: "currentColor",
        d: "M 2.882812 0.246094 C 1.941406 0.550781 0.519531 2.007812 0.230469 2.953125 C 0.0585938 3.542969 0 7.234375 0 17.652344 L 0 31.554688 L 0.5 32.558594 C 1.117188 33.769531 2.152344 34.5625 3.519531 34.847656 C 4.210938 35 7.078125 35.058594 12.597656 35 C 20.441406 34.941406 20.691406 34.925781 21.441406 34.527344 C 22.347656 34.054688 23.078125 33.3125 23.578125 32.386719 C 23.921875 31.761719 23.941406 30.964844 24 18.085938 C 24.039062 8.503906 24 4.167969 23.847656 3.464844 C 23.558594 2.121094 22.75 1.097656 21.519531 0.492188 L 20.5 0 L 12.039062 0.0195312 C 6.402344 0.0390625 3.328125 0.113281 2.882812 0.246094 Z M 20.382812 14.582031 L 20.382812 22.917969 L 3.652344 22.917969 L 3.652344 6.25 L 20.382812 6.25 Z M 13.789062 27.539062 C 14.5 28.296875 14.597656 29.035156 14.132812 29.925781 C 13.308594 31.496094 10.671875 31.421875 9.902344 29.8125 C 9.539062 29.054688 9.539062 28.730469 9.902344 28.011719 C 10.691406 26.535156 12.632812 26.308594 13.789062 27.539062 Z M 13.789062 27.539062 "
    }));
}

/* components/icons/embedded.jsx */
function Embedded(props) {
    return React.createElement("svg", {
        class: "PI-icon_embedded",
        width: "24",
        height: "24",
        viewBox: "0 -2.5 28 28",
        ...props
    }, React.createElement("path", {
        fill: "currentColor",
        d: "M5.79335761,5 L18.2066424,5 C19.7805584,5 21.0868816,6.21634264 21.1990185,7.78625885 L21.8575059,17.0050826 C21.9307825,18.0309548 21.1585512,18.9219909 20.132679,18.9952675 C20.088523,18.9984215 20.0442685,19 20,19 C18.8245863,19 17.8000084,18.2000338 17.5149287,17.059715 L17,15 L7,15 L6.48507125,17.059715 C6.19999155,18.2000338 5.1754137,19 4,19 C2.97151413,19 2.13776159,18.1662475 2.13776159,17.1377616 C2.13776159,17.0934931 2.1393401,17.0492386 2.1424941,17.0050826 L2.80098151,7.78625885 C2.91311838,6.21634264 4.21944161,5 5.79335761,5 Z M14.5,10 C15.3284271,10 16,9.32842712 16,8.5 C16,7.67157288 15.3284271,7 14.5,7 C13.6715729,7 13,7.67157288 13,8.5 C13,9.32842712 13.6715729,10 14.5,10 Z M18.5,13 C19.3284271,13 20,12.3284271 20,11.5 C20,10.6715729 19.3284271,10 18.5,10 C17.6715729,10 17,10.6715729 17,11.5 C17,12.3284271 17.6715729,13 18.5,13 Z M6,9 L4,9 L4,11 L6,11 L6,13 L8,13 L8,11 L10,11 L10,9 L8,9 L8,7 L6,7 L6,9 Z"
    }));
}

/* components/icons/web.jsx */
function Web(props) {
    return React.createElement("svg", {
        class: "PI-icon_web",
        width: "24",
        height: "24",
        viewBox: "0 -2.5 28 28",
        ...props
    }, React.createElement("path", {
        fill: "currentColor",
        d: "M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM11 19.93C7.05 19.44 4 16.08 4 12C4 11.38 4.08 10.79 4.21 10.21L9 15V16C9 17.1 9.9 18 11 18V19.93ZM17.9 17.39C17.64 16.58 16.9 16 16 16H15V13C15 12.45 14.55 12 14 12H8V10H10C10.55 10 11 9.55 11 9V7H13C14.1 7 15 6.1 15 5V4.59C17.93 5.78 20 8.65 20 12C20 14.08 19.2 15.97 17.9 17.39Z"
    }));
}

/* components/icons/Icons.js */

var Icons = /*#__PURE__*/ Object.freeze({
    __proto__: null,
    desktop: Desktop,
    embedded: Embedded,
    mobile: Mobile,
    web: Web
});

/* components/indicators.scss */
Styles$2.sheets.push("/* components/indicators.scss */", `.indicatorContainer {
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
    "PIIcon_mobile": "PI-icon_mobile",
    "badge_separator": "badge_separator"
};

/* modules/shared.js */
const LocalActivityStore = Webpack.getStore("LocalActivityStore");
const SessionsStore = Webpack.getStore("SessionsStore");
const UserStore = Webpack.getStore("UserStore");
const PresenceStore = Webpack.getStore("PresenceStore");
Webpack.getByKeys("useSyncExternalStore");
const useStateFromStores = Webpack.getByStrings("useStateFromStores", {
    searchExports: true
});
const Dispatcher = UserStore._dispatcher;
const Flux = Webpack.getByKeys("Store");
const StatusTypes = Webpack.getModule((x) => x.DND && x.OFFLINE, {
    searchExports: true
});
const Colors = Webpack.getByKeys("RED_400");
const Messages = {
    "STATUS_DND": "Do Not Disturb",
    "STATUS_OFFLINE": "Offline",
    "STATUS_ONLINE": "Online",
    "STATUS_STEAMING": "Streaming",
    "STATUS_IDLE": "Idle",
    "STATUS_MOBILE": "Mobile"
};
const buildClassName = (...args) => {
    return args.reduce((classNames, arg) => {
        if (!arg) return classNames;
        if (typeof arg === "string" || typeof arg === "number") {
            classNames.push(arg);
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

/* modules/settings.js */
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

/* modules/usePlatformStores.js */
const isStreaming = () => LocalActivityStore.getActivities().some((e) => e.type === 1);

function usePlatformStores(userId, type) {
    const user = UserStore.getUser(userId);
    const iconStates = Settings.get("icons", {});
    const shownInArea = Settings.get("showIn" + type, true);
    const isBot = Settings.get("ignoreBots", true) && (user?.bot ?? false);
    const shouldShow = shownInArea && !isBot;
    const clients = (() => {
        if (user?.id === UserStore.getCurrentUser()?.id) {
            const sessions = SessionsStore.getSessions();
            if (sessions) {
                const clientStatuses = Object.entries(sessions).reduce((acc, [, sessionData]) => {
                    const client = sessionData.clientInfo.client;
                    const status = isStreaming() ? "streaming" : sessionData.status;
                    acc[client] = status;
                    return acc;
                }, {});
                return clientStatuses;
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

/* modules/utils.js */
const findInReactTree = (tree, filter) => Utils.findInTree(tree, filter, {
    walkable: ["props", "children", "type"]
});

function upperFirst(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function getStatusText(key, status) {
    return upperFirst(key) + ": " + Messages[`STATUS_${(status === "mobile" ? "mobile_online" : status).toUpperCase()}`];
}

function getStatusColor(status) {
    switch (status) {
        case StatusTypes.ONLINE:
            return Colors.GREEN_360;
        case StatusTypes.IDLE:
            return Colors.YELLOW_300;
        case StatusTypes.DND:
            return Colors.RED_400;
        case StatusTypes.STREAMING:
            return Colors.TWITCH;
        case StatusTypes.INVISIBLE:
        case StatusTypes.UNKNOWN:
        case StatusTypes.OFFLINE:
        default:
            return Colors.PRIMARY_400;
    }
}

/* components/indicators.jsx */
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

/* components/icons/checkbox.jsx */
function CheckboxEnabled(props) {
    return React.createElement("svg", {
        width: "24",
        height: "24",
        viewBox: "0 0 24 24",
        ...props
    }, React.createElement("path", {
        fillRule: "evenodd",
        clipRule: "evenodd",
        fill: props.color ?? "currentColor",
        d: "M5.37499 3H18.625C19.9197 3 21.0056 4.08803 21 5.375V18.625C21 19.936 19.9359 21 18.625 21H5.37499C4.06518 21 3 19.936 3 18.625V5.375C3 4.06519 4.06518 3 5.37499 3Z"
    }), React.createElement("path", {
        fill: "#fff",
        d: "M9.58473 14.8636L6.04944 11.4051L4.50003 12.9978L9.58473 18L19.5 8.26174L17.9656 6.64795L9.58473 14.8636Z"
    }));
}

function CheckboxDisabled(props) {
    return React.createElement("svg", {
        width: "24",
        height: "24",
        viewBox: "0 0 24 24",
        ...props
    }, React.createElement("path", {
        fillRule: "evenodd",
        clipRule: "evenodd",
        fill: "currentColor",
        d: "M18.625 3H5.375C4.06519 3 3 4.06519 3 5.375V18.625C3 19.936 4.06519 21 5.375 21H18.625C19.936 21 21 19.936 21 18.625V5.375C21.0057 4.08803 19.9197 3 18.625 3ZM19 19V5H4.99999V19H19Z"
    }));
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

/* components/settings.json */
var SettingsItems = [{
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
            }
        ]
    }
];

/* components/settings.scss */
Styles$2.sheets.push("/* components/settings.scss */", `.PIsettingsSmartDisable {
  color: #fff;
}
.PIsettingsSmartDisable .body {
  display: grid;
  grid-template-columns: 160px 160px;
  grid-template-rows: auto auto;
  column-gap: 15px;
  row-gap: 15px;
}
.PIsettingsSmartDisable .body .item {
  display: flex;
  align-items: center;
  cursor: pointer;
  border-radius: 8px;
  background: var(--primary-630);
  padding: 10px 15px;
}
.PIsettingsSmartDisable .body .item:hover {
  background: var(--primary-500);
}

.PIsettingsTitle {
  color: #fff;
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 20px;
}`);
var Styles = {
    "PIsettingsSmartDisable": "PIsettingsSmartDisable",
    "body": "body",
    "item": "item",
    "PIsettingsTitle": "PIsettingsTitle"
};

/* components/settings.jsx */
const {
    SettingItem,
    SwitchInput
} = Components;

function SwitchItem(props) {
    const value = useStateFromStores([Settings], () => Settings.get(props.id, props.value));
    return React.createElement(
        SettingItem, {
            ...props,
            inline: true
        },
        React.createElement(
            SwitchInput, {
                value,
                onChange: (v) => {
                    Settings.set(props.id, v);
                }
            }
        )
    );
}

function SmartDisable(props) {
    const iconSize = 26;
    const [states, setStates] = React.useState(Settings.get(props.id, Object.fromEntries(props.items.map((item) => [item.id, item.value]))));
    const handleClick = (id) => {
        states[id] = !states[id];
        Settings.set(props.id, states);
        setStates(Object.assign({}, states));
    };
    return React.createElement("div", {
        className: Styles.PIsettingsSmartDisable
    }, React.createElement("h1", {
        className: Styles.PIsettingsTitle
    }, props.name), React.createElement("div", {
        className: Styles.body
    }, props.items.map((item) => React.createElement("div", {
        key: item.id,
        className: Styles.item,
        onClick: () => handleClick(item.id)
    }, ["online", "dnd", "idle", "offline"].map(
        (status) => React.createElement(Icons[item.icon], {
            style: {
                color: getStatusColor(status)
            },
            width: iconSize,
            height: iconSize
        })
    ), React.createElement(Checkbox, {
        width: iconSize,
        height: iconSize,
        checked: !!states[item.id],
        color: "var(--brand-500)"
    })))));
}

function renderItems(items) {
    return items.map((item) => {
        switch (item.type) {
            case "switch":
                return React.createElement(SwitchItem, {
                    ...item
                });
            case "smart-disable":
                return React.createElement(SmartDisable, {
                    ...item
                });
            default:
                return null;
        }
    });
}

function SettingsPanel() {
    return React.createElement("div", null, React.createElement("h1", {
        className: Styles.PIsettingsTitle
    }, "General Settings"), renderItems(SettingsItems));
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
    patchDMList() {
        const UserContext = React.createContext(null);
        const ChannelWrapper = Webpack.getBySource("isGDMFacepileEnabled");
        const [NameWrapper, Key_NW] = Webpack.getWithKey((x) => x.toString().includes(".nameAndDecorators") && !x.toString().includes('"listitem"'));
        const ChannelClasses = Webpack.getByKeys("channel", "decorator");
        Patcher.after(ChannelWrapper, "ZP", (_, __, res) => {
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
        Patcher.after(NameWrapper, Key_NW, (_, __, res) => {
            if (!Settings.get("showInDmsList", true)) return;
            const user = React.useContext(UserContext);
            if (!user) return;
            const child = Utils.findInTree(res, (e) => e?.className?.includes("nameAndDecorators"), {
                walkable: ["children", "props"]
            });
            if (!child) return;
            child.children.push(
                React.createElement(
                    StatusIndicators, {
                        userId: user.id,
                        type: "DMs"
                    }
                )
            );
        });
    }
    patchMemberList() {
        const [MemberItem, key] = Webpack.getWithKey(Webpack.Filters.byStrings('location:"MemberListItem"'));
        const MemberListClasses = Webpack.getByKeys("member", "memberInner");
        Patcher.after(MemberItem, key, (_, [props], ret) => {
            if (!Settings.get("showInMemberList", true)) return;
            if (Settings.get("ignoreBots", true) && props?.user.bot) return;
            const children = ret.props.children();
            const user = findInReactTree(children, (e) => e?.avatar && e?.name);
            let childs = children?.props?.name?.props?.children;
            if (user && childs) {
                children.props.name.props.children = [
                    childs,
                    React.createElement(
                        StatusIndicators, {
                            userId: props.user.id,
                            type: "MemberList"
                        }
                    )
                ];
            }
            ret.props.children = () => children;
        });
        const MemberListUserElement = document.querySelector(`.${MemberListClasses.member}`);
        if (MemberListUserElement) {
            const MemberListUserInstance = ReactUtils.getOwnerInstance(MemberListUserElement);
            if (MemberListUserInstance) MemberListUserInstance.forceUpdate();
        }
    }
    patchChat() {
        const [ChatUsername, key] = Webpack.getWithKey(Webpack.Filters.byStrings(".guildMemberAvatar&&null!="));
        Patcher.before(ChatUsername, key, (_, props) => {
            const mainProps = props[0];
            if (!Settings.get("showInChat", true)) return;
            if (Settings.get("ignoreBots", true) && mainProps?.author?.bot) return;
            if (!mainProps?.decorations) return;
            const target = mainProps.decorations?.[1];
            if (!Array.isArray(target)) mainProps.decorations[1] = target ? [target] : [];
            mainProps.decorations[1].unshift(
                React.createElement(
                    StatusIndicators, {
                        userId: mainProps.message.author.id,
                        type: "Chat"
                    }
                )
            );
        });
    }
    patchBadges() {
        const [BadgeList, Key_BL] = Webpack.getWithKey(Webpack.Filters.byStrings("badges", "badgeClassName", ".BADGE"));
        Patcher.after(BadgeList, Key_BL, (_, [{
            displayProfile
        }], res) => {
            if (!Settings.get("showInBadges", true)) return;
            if (Settings.get("ignoreBots", true) && displayProfile?.application) return;
            if (!displayProfile?.userId) return;
            res.props.children.push(
                React.createElement(
                    StatusIndicators, {
                        userId: displayProfile.userId,
                        type: "Badge",
                        separator: true
                    }
                )
            );
        });
    }
    patchFriendList() {
        const [UserInfo, key] = Webpack.getWithKey(Webpack.Filters.byStrings("user", "subText", "showAccountIdentifier"));
        const FriendListClasses = Webpack.getByKeys("userInfo", "hovered");
        DOM.addStyle("PlatformIndicators", `
            .${FriendListClasses.discriminator} { display: none; }
            .${FriendListClasses.hovered} .${FriendListClasses.discriminator} { display: unset; }
        `);
        Patcher.after(UserInfo, key, (_, __, res) => {
            if (!Settings.get("showInFriendsList", true)) return;
            const unpatch = Patcher.after(res.props.children[1].props.children[0], "type", (_2, [props], res2) => {
                unpatch();
                const unpatch_ = Patcher.after(res2, "type", (_3, __2, res3) => {
                    unpatch_();
                    res3.props.children.push(
                        React.createElement(
                            StatusIndicators, {
                                userId: props.user.id,
                                type: "FriendList"
                            }
                        )
                    );
                });
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
