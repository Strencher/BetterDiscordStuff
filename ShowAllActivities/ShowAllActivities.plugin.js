/**
 * @name ShowAllActivities
 * @version 1.1.1
 * @description See every status a user has enabled. Original made by Juby210#0577.
 * @github https://github.com/Strencher/BetterDiscordStuff/tree/master/ShowAllActivities
 * @github_raw https://raw.githubusercontent.com/Strencher/BetterDiscordStuff/master/ShowAllActivities/ShowAllActivities.plugin.js
 * @invite gvA2ree
 * @changelogImage https://cdn.discordapp.com/attachments/672786846018961418/1053059354552696932/20th-century-fox-intro.png
 * @changelogDate 2022-12-15T23:00:00.000Z
 * @author Strencher, Juby210
 */

'use strict';

/* @module @manifest */
const config = {
    "name": "ShowAllActivities",
    "version": "1.1.1",
    "authors": [{
            "name": "Strencher",
            "discord_id": "415849376598982656",
            "github_username": "Strencher",
            "twitter_username": "Strencher3"
        },
        {
            "name": "Juby210",
            "discord_id": "324622488644616195",
            "github_username": "Juby210"
        }

    ],
    "description": "See every status a user has enabled. Original made by Juby210#0577.",
    "github": "https://github.com/Strencher/BetterDiscordStuff/tree/master/ShowAllActivities",
    "github_raw": "https://raw.githubusercontent.com/Strencher/BetterDiscordStuff/master/ShowAllActivities/ShowAllActivities.plugin.js",
    "invite": "gvA2ree",
    "changelogImage": "https://cdn.discordapp.com/attachments/672786846018961418/1053059354552696932/20th-century-fox-intro.png",
    "changelogDate": "2022-12-15T23:00:00.000Z",
    "changelog": [{
        "title": "Fixes",
        "type": "fixed",
        "items": [
            "After a very, very long time, this plugin has returned. If you notice any bugs, please file an issue on my github or create a forum post in my server about it!"
        ]
    }]
};

/*@end */

/* @module @api */
const { Data, Patcher, DOM, ReactUtils, Utils, Webpack: Webpack$2, UI, ContextMenu } = new BdApi(config.name);
/*@end */

var Api = /*#__PURE__*/ Object.freeze({
    __proto__: null,
    ContextMenu: ContextMenu,
    DOM: DOM,
    Data: Data,
    Patcher: Patcher,
    ReactUtils: ReactUtils,
    UI: UI,
    Utils: Utils,
    Webpack: Webpack$2
});

/* @module webpack.js */
const { Webpack, Webpack: { Filters } } = Api;
const getByProps = (...props) => {
    return Webpack.getModule(Filters.byProps(...props));
};
const getBulk = (...queries) => {
    return Webpack.getBulk.apply(null, queries.map((q) => typeof q === "function" ? { filter: q } : q));
};
const getByPrototypeFields = (...fields) => {
    return Webpack.getModule(Filters.byPrototypeFields(...fields));
};
const getStore = (name) => {
    return Webpack.getModule((m) => m?._dispatchToken && m.getName?.() === name);
};
const getMangled = function*(filter, target = null) {
    yield target = getModule((m) => Object.values(m).some(filter), { searchExports: false });
    yield target && Object.keys(target).find((k) => filter(target[k]));
};
const getModule = Webpack.getModule;
var Webpack$1 = {
    ...Webpack,
    getByPrototypeFields,
    getMangled,
    getByProps,
    getStore,
    getBulk
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

/* @module settings.js */
const Settings = {
    _listeners: /* @__PURE__ */ new Set(),
    _settings: Data.load("settings") ?? {},
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
    }
};

/*@end */

/* @module settings.jsx */
const SwitchItemComponent = Webpack$1.getModule((m) => typeof m === "function" && m.toString().includes("tooltipNote"), { searchExports: true });
const SwitchItem = (props) => {
    const [value, setValue] = React.useState(props.value);
    return /* @__PURE__ */ React.createElement(
        SwitchItemComponent, {
            ...props,
            value,
            onChange: (val) => (setValue(val), props.onChange(val))
        }
    );
};
const Items = [{
    id: "showAlways",
    name: "Show Always",
    note: "Shows the controls bar even if only one activity is present.",
    value: false
}];

function SettingsPanel() {
    return /* @__PURE__ */ React.createElement(React.Fragment, null, Items.map((item) => /* @__PURE__ */ React.createElement(
        SwitchItem, {
            ...item,
            value: Settings.get(item.id, item.value),
            onChange: (value) => Settings.set(item.id, value)
        },
        item.name
    )));
}

/*@end */

/* @module wrapper.scss */
Styles.sheets.push("/* wrapper.scss */", `.wrapper {
  display: flex;
  flex-direction: column;
}
.wrapper .controls {
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px;
  background: var(--background-secondary-alt);
  border-radius: 3px;
  flex: 1 0;
  margin-top: 10px;
}
.wrapper .controls .caret {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 3px;
  background-color: rgba(255, 255, 255, 0.3);
}
.wrapper .controls .caret.disabled {
  cursor: not-allowed;
  opacity: 0.3;
}
.wrapper .controls .caret:hover:not(.disabled) {
  background: var(--background-modifier-accent);
}
.wrapper .controls .carosell {
  display: flex;
  align-items: center;
}
.wrapper .controls .carosell .dot {
  margin: 0 4px;
  width: 10px;
  cursor: pointer;
  height: 10px;
  border-radius: 100px;
  background: var(--interactive-muted);
  transition: background 0.3s;
  opacity: 0.6;
}
.wrapper .controls .carosell .dot:hover:not(.selected) {
  opacity: 1;
}
.wrapper .controls .carosell .dot.selected {
  opacity: 1;
  background: var(--dot-color, var(--brand-experiment));
}

.tooltip {
  --background-floating: var(--background-secondary);
}`);
var styles$1 = {
    "wrapper": "wrapper",
    "controls": "controls",
    "caret": "caret",
    "disabled": "disabled",
    "carosell": "carosell",
    "dot": "dot",
    "selected": "selected",
    "tooltip": "tooltip"
};
/*@end */

/* @module caret.scss */
Styles.sheets.push("/* caret.scss */", `.SAA-caret {
  color: #ddd;
}
.SAA-caret.right {
  transform: rotate(-90deg);
}
.SAA-caret.left {
  transform: rotate(90deg);
}`);
var styles = {
    "SAACaret": "SAA-caret",
    "right": "right",
    "left": "left"
};
/*@end */

/* @module caret.jsx */
function Caret({ direction, ...props }) {
    return /* @__PURE__ */ React.createElement("svg", { className: "SAA-caret " + styles[direction.toLowerCase()], width: "24", height: "24", viewBox: "0 0 24 24", ...props }, /* @__PURE__ */ React.createElement("path", { fill: "currentColor", fillRule: "evenodd", clipRule: "evenodd", d: "M16.59 8.59004L12 13.17L7.41 8.59004L6 10L12 16L18 10L16.59 8.59004Z" }));
}

/*@end */

/* @module colors.json */
var spotify = "#1db954";
var STREAMING = "#593695";
var ActivityColors = {
    spotify: spotify,
    "363445589247131668": "#ff0000",
    "463097721130188830": "#d9252a",
    "802958789555781663": "#593695",
    STREAMING: STREAMING,
    "562286213059444737": "#3a004b",
    "83226320970055681": "#889afb",
    "782685898163617802": "#889afb",
    "356869127241072640": "#112120",
    "367827983903490050": "#e5649d"
};

/*@end */

/* @module wrapper.jsx */
const ActivityTypes = {
    0: "PLAYING",
    1: "STREAMING",
    2: "LISTENING",
    3: "WATCHING",
    4: "CUSTOM_STATUS",
    5: "COMPETING",
    COMPETING: 5,
    CUSTOM_STATUS: 4,
    LISTENING: 2,
    PLAYING: 0,
    STREAMING: 1,
    WATCHING: 3
};
const { useCallback, useMemo, useState } = React;
const useStateFromStores = Webpack$1.getModule((m) => m?.toString?.().includes("useStateFromStores"), { searchExports: true });
const useStateFromStoresArray = useStateFromStores;
const { Messages } = Webpack$1.getModule((m) => m?.Messages?.MEMBER_LIST_SHOWN);
const PresenceStore = Webpack$1.getStore("PresenceStore");
const Tooltip = BdApi.Components.Tooltip;
const [UserActivity, UserActivityTypes] = (() => {
    const module = Webpack$1.getModule((m) => Object.values(m).some((e) => e?.USER_POPOUT_V2));
    return [
        module.Z,
        module[Object.keys(module).find((e) => module[e]?.USER_POPOUT_V2)]
    ];
})();
const classes = Webpack$1.getByProps("activity", "buttonColor") ?? {};

function ActivityWrapper({ user, activityType: ActivityType = UserActivity, whatever: WhateverWrapper, ...props }) {
    const activities = useStateFromStoresArray([PresenceStore], () => {
        return PresenceStore.getActivities(user.id).filter((ac) => ac.type !== 4);
    });
    const [activityIndex, setActivityIndex] = useState(0);
    const currentActivity = useMemo(() => activities[activityIndex], [activityIndex, activities]);
    const shouldShowControls = useStateFromStores([Settings], () => {
        return activities.length > 1 || Settings.get("showAlways", false);
    }, [activities]);
    const canGo = (type) => {
        if (activityIndex === -1 || activities.length === 0 || activityIndex > activities.length - 1)
            return false;
        switch (type) {
            case "backward": {
                return activityIndex > 0;
            }
            case "forward": {
                return activityIndex !== activities.length - 1 && activityIndex < activities.length - 1;
            }
        }
    };
    const handleSelectNext = (type) => useCallback(() => {
        if (!canGo(type))
            return;
        let index;
        switch (type) {
            case "backward":
                index = activityIndex - 1;
                break;
            case "forward":
                index = activityIndex + 1;
                break;
        }
        if (index < 0 || index > activities.length)
            return;
        setActivityIndex(index);
    }, [activities, activityIndex, user]);
    const goForward = handleSelectNext("forward");
    const goBackward = handleSelectNext("backward");
    if (!activities.length)
        return null;
    if (!currentActivity) {
        setActivityIndex(0);
        return null;
    }
    const style = {
        "--dot-color": ActivityColors[Object.keys(ActivityColors).find((e) => currentActivity.id?.includes(e) || currentActivity.application_id === e || currentActivity.type === ActivityTypes[e])]
    };
    return /* @__PURE__ */ React.createElement(WhateverWrapper, null, /* @__PURE__ */ React.createElement("div", {
        className: Utils.className(styles$1.wrapper, {
            [styles$1.spotify]: currentActivity.id?.startsWith("spotify")
        }),
        style
    }, /* @__PURE__ */ React.createElement(
        ActivityType, {
            __SAA: true,
            ...props,
            user,
            activity: currentActivity,
            type: UserActivityTypes.USER_POPOUT_V2,
            key: currentActivity.application_id,
            className: Utils.className(classes.activity),
            source: "Profile Popout",
            actionColor: classes.buttonColor,
            openAction: props.onClose,
            onOpenGameProfile: props.onClose
        }
    ), shouldShowControls && /* @__PURE__ */ React.createElement("div", { className: styles$1.controls }, /* @__PURE__ */ React.createElement(
        Tooltip, {
            key: "LEFT",
            text: Messages.PAGINATION_PREVIOUS,
            tooltipClassName: styles$1.tooltip,
            spacing: 14
        },
        (props2) => /* @__PURE__ */ React.createElement(
            "div", {
                ...props2,
                className: Utils.className(styles$1.caret, {
                    [styles$1.disabled]: !canGo("backward")
                }),
                onClick: goBackward
            },
            /* @__PURE__ */
            React.createElement(Caret, { direction: "left" })
        )
    ), /* @__PURE__ */ React.createElement("div", { className: styles$1.carosell }, activities.map((_, i) => /* @__PURE__ */ React.createElement(
        "div", {
            key: "dot--" + i,
            onClick: () => setActivityIndex(i),
            className: Utils.className(styles$1.dot, {
                [styles$1.selected]: i === activityIndex
            })
        }
    ))), /* @__PURE__ */ React.createElement(
        Tooltip, {
            key: "RIGHT",
            text: Messages.PAGINATION_NEXT,
            tooltipClassName: styles$1.tooltip,
            spacing: 14
        },
        (props2) => /* @__PURE__ */ React.createElement(
            "div", {
                ...props2,
                className: Utils.className(styles$1.caret, {
                    [styles$1.disabled]: !canGo("forward")
                }),
                onClick: goForward
            },
            /* @__PURE__ */
            React.createElement(Caret, { direction: "right" })
        )
    ))));
}

/*@end */

/* @module changelog.css */
Styles.sheets.push("/* changelog.css */", `.SAA-changelog-item {
    color: #ddd;
}

.SAA-changelog-header {
    text-transform: uppercase;
    font-weight: 700;
    display: flex;
    align-items: center;
    margin-bottom: 10px;
}

.item-changelog-added .SAA-changelog-header {
    color: #45BA6A;
}
.item-changelog-fixed .SAA-changelog-header {
    color: #EC4245;
}
.item-changelog-improved .SAA-changelog-header {
    color: #5865F2;
}

.SAA-changelog-header::after {
    content: "";
    flex-grow: 1;
    height: 1px;
    background: currentColor;
    margin-left: 7px;
}

.SAA-changelog-item span {
    display: list-item;
    margin-left: 5px;
    list-style: inside;
}

.SAA-changelog-item span::marker {
    color: var(--background-accent);
}
.SAA-changelog-banner {
    width: 405px;
    border-radius: 8px;
    margin-bottom: 20px;
}

.SAA-title-wrap {
    font-size: 18px;
}

.SAA-title-wrap span {
    font-size: 12px;
    color: var(--text-muted);
    font-family: var(--font-primary);
}
`); /*@end */

/* @module index.jsx */
class ShowAllActivities {
    maybeShowChangelog() {
        if (config.version === Settings.get("latestUsedVersion"))
            return;
        const items = config.changelog.map((item) => /* @__PURE__ */ React.createElement("div", { className: "SAA-changelog-item item-changelog-" + item.type }, /* @__PURE__ */ React.createElement("h4", { className: "SAA-changelog-header" }, item.type), /* @__PURE__ */ React.createElement("span", null, item.items)));
        "changelogImage" in config && items.unshift(
            /* @__PURE__ */
            React.createElement("img", { className: "SAA-changelog-banner", src: config.changelogImage })
        );
        Settings.set("latestUsedVersion", config.version);
        const formatter = new Intl.DateTimeFormat(document.documentElement.lang, { month: "long", day: "numeric", year: "numeric" });
        UI.alert( /* @__PURE__ */ React.createElement("div", { className: "SAA-title-wrap" }, /* @__PURE__ */ React.createElement("h1", null, "What's New - ", config.name), /* @__PURE__ */ React.createElement("span", null, formatter.format(new Date(config.changelogDate)))), items);
    }
    getSettingsPanel() {
        return /* @__PURE__ */ React.createElement(SettingsPanel, null);
    }
    start() {
        Styles.load();
        this.patchUserActivityContainer();
        this.maybeShowChangelog();
    }
    patchUserActivityContainer() {
        const [UserActivityModule, method] = Webpack$1.getMangled((m) => m?.toString?.().includes("onOpenGameProfile:"));
        Patcher.after(UserActivityModule, method, (_, [props], res) => {
            if (props.__SAA)
                return;
            const youTellMe = res.type;
            const ActivityType = res?.props?.children?.type;
            if (typeof youTellMe !== "function" || typeof ActivityType !== "function")
                return;
            return /* @__PURE__ */ React.createElement(ActivityWrapper, { activityType: ActivityType, whatever: youTellMe, user: props.user, ...props });
        });
    }
    stop() {
        Styles.unload();
        Patcher.unpatchAll();
    }
}

/*@end */

module.exports = ShowAllActivities;
