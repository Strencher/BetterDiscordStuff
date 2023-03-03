/**
 * @name Copier
 * @version 1.6.1
 * @description Allows you to copy certain stuff with custom options.
 * @github https://github.com/Strencher/BetterDiscordStuff/blob/master/Copier/Copier.plugin.js
 * @github_raw https://raw.githubusercontent.com/Strencher/BetterDiscordStuff/master/Copier/Copier.plugin.js
 * @changelogImage https://cdn.discordapp.com/attachments/672786846018961418/1053059354552696932/20th-century-fox-intro.png
 * @changelogDate 2023-02-11T17:25:37.796Z
 * @author Strencher
 */

'use strict';

/* @module @manifest */
const config = {
    "name": "Copier",
    "authors": [{
        "name": "Strencher",
        "discord_id": "415849376598982656",
        "github_username": "Strencher",
        "twitter_username": "Strencher3"
    }],
    "version": "1.6.1",
    "description": "Allows you to copy certain stuff with custom options.",
    "github": "https://github.com/Strencher/BetterDiscordStuff/blob/master/Copier/Copier.plugin.js",
    "github_raw": "https://raw.githubusercontent.com/Strencher/BetterDiscordStuff/master/Copier/Copier.plugin.js",
    "changelogImage": "https://cdn.discordapp.com/attachments/672786846018961418/1053059354552696932/20th-century-fox-intro.png",
    "changelogDate": "2023-02-11T17:25:37.796Z",
    "changelog": [{
        "type": "fixed",
        "title": "Bug Fixes",
        "items": [
            "The plugin has returned."
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

/* @module react */
var React = BdApi.React;
/*@end */

/* @module utils.js */
function copy(text) {
    DiscordNative.clipboard.copy(text);
}

function int2rgb(int) {
    int >>>= 0;
    const b = int & 255;
    const g = (int & 65280) >>> 8;
    const r = (int & 16711680) >>> 16;
    return "rgb(" + [r, g, b].join(", ") + ")";
}

function int2hex(int) {
    return "#" + int.toString(16).padStart(6, "0");
}

function findInTree(res, filter) {
    return Utils.findInTree(res, filter, { walkable: ["props", "children", "type"] });
}
const onceAdded = (selector, callback, signal) => {
    let directMatch;
    if (directMatch = document.querySelector(selector)) {
        callback(directMatch);
        return () => null;
    }
    const cancel = () => observer.disconnect();
    const observer = new MutationObserver((changes) => {
        for (const change of changes) {
            if (!change.addedNodes.length)
                continue;
            for (const node of change.addedNodes) {
                if (node.nodeType === Node.TEXT_NODE)
                    continue;
                const match = node.matches(selector) && node || node.querySelector(selector);
                if (!match)
                    continue;
                cancel();
                signal.removeEventListener("abort", cancel);
                callback(match);
            }
        }
    });
    observer.observe(document.body, { childList: true, subtree: true });
    signal.addEventListener("abort", cancel);
};

function useKeyState() {
    const [active, setActive] = React.useState("none");
    React.useEffect(() => {
        const handleChange = (e) => {
            setActive(
                e.ctrlKey && e.shiftKey ? "both" : e.ctrlKey ? "ctrl" : e.shiftKey ? "shift" : "none"
            );
        };
        window.addEventListener("keydown", handleChange);
        window.addEventListener("keyup", handleChange);
        return () => {
            window.removeEventListener("keydown", handleChange);
            window.removeEventListener("keyup", handleChange);
        };
    }, [true]);
    return active;
}
const useStateFromStores = (stores, factory) => {
    const [state, setState] = React.useState(factory());
    React.useEffect(() => {
        const listener = () => setState(factory());
        for (const store of stores) {
            store.addReactChangeListener(listener);
        }
        return () => stores.forEach((store) => store.removeReactChangeListener());
    });
    return state;
};
const fmt = (str, ...strings) => {
    let i = 0;
    return str.replaceAll("{s}", () => strings[i++]);
};

/*@end */

/* @module channeltypes.js */
const ChannelTypes = {
    0: "GUILD_TEXT",
    1: "DM",
    2: "GUILD_VOICE",
    3: "GROUP_DM",
    4: "GUILD_CATEGORY",
    5: "GUILD_ANNOUNCEMENT",
    6: "GUILD_STORE",
    10: "ANNOUNCEMENT_THREAD",
    11: "PUBLIC_THREAD",
    12: "PRIVATE_THREAD",
    13: "GUILD_STAGE_VOICE",
    14: "GUILD_DIRECTORY",
    15: "GUILD_FORUM",
    1e4: "UNKNOWN",
    ANNOUNCEMENT_THREAD: 10,
    DM: 1,
    GROUP_DM: 3,
    GUILD_ANNOUNCEMENT: 5,
    GUILD_CATEGORY: 4,
    GUILD_DIRECTORY: 14,
    GUILD_FORUM: 15,
    GUILD_STAGE_VOICE: 13,
    GUILD_STORE: 6,
    GUILD_TEXT: 0,
    GUILD_VOICE: 2,
    PRIVATE_THREAD: 12,
    PUBLIC_THREAD: 11,
    UNKNOWN: 1e4
};

/*@end */

/* @module formatter.js */
let Formatter$1 = class Formatter {
    static formatString(string, options) {
        for (const option in options) {
            string = string.replace(new RegExp(`\\$${option}`, "g"), options[option]);
        }
        return string;
    }
    static formatDate(date) {
        const formatter = new Intl.DateTimeFormat(document.documentElement.lang, {
            dateStyle: "full",
            timeStyle: "short"
        });
        return formatter.format(date);
    }
    static parseSnowFlake(id) {
        return new Date(id / 4194304 + 14200704e5);
    }
    static formatChannelType(type) {
        const string = ChannelTypes[type] ?? "";
        return string.split("_").map((e) => e[0].toUpperCase() + e.slice(1)).join(" ");
    }
};

/*@end */

/* @module settings.js */
const Settings$1 = {
    _listeners: /* @__PURE__ */ new Set(),
    _settings: Object.assign({}, {
        messageCustom: "`$author` **$timestamp**\n> $message",
        channelCustom: "#$name in **$server**",
        categoryCustom: "$name with $channelsCount channels",
        voiceCustom: "**#$name** in **$server** with `$usersConnected` connected users.",
        guildCustom: "**$name** with `$members`",
        userCustom: "**$name** - Created at: `$creation`",
        roleCustom: "**$name** - `$colorHEX`",
        showButton: true
    }, Data.load("settings")),
    addReactChangeListener(listener) {
        Settings$1._listeners.add(listener);
    },
    removeReactChangeListener(listener) {
        Settings$1._listeners.delete(listener);
    },
    get(key, def) {
        return Settings$1._settings[key] ?? def;
    },
    set(key, value) {
        Settings$1._settings[key] = value;
        Data.save("settings", Settings$1._settings);
        this._listeners.forEach((l) => l());
    }
};

/*@end */

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
const ChannelStore = getStore("ChannelStore");
const GuildStore = getStore("GuildStore");
const Tooltip = BdApi.Components.Tooltip;

/*@end */

/* @module user.js */
const UserCopyOptions = [{
        name: "id",
        getValue: (user) => user.id,
        description: "Will be replaced with the id of the user."
    },
    {
        name: "name",
        getValue: (user) => user.username,
        description: "Will be replaced with the name of the user."
    },
    {
        name: "tag",
        getValue: (user) => user.tag,
        description: "Will be replaced with the tag of the user."
    },
    {
        name: "discriminator",
        getValue: (user) => user.discriminator,
        description: "Will be replaced with the discriminator of the user."
    },
    {
        name: "creation",
        getValue: (user, { Formatter: Formatter2 }) => Formatter2.parseSnowFlake(user.id).toLocaleString(),
        description: "Will be replaced with creation date of the user."
    },
    {
        name: "avatar",
        getValue: (user) => user.getAvatarURL("gif"),
        description: "Will be replaced with the avatar url of the user."
    }
];

function user() {
    const patches = /* @__PURE__ */ new Set();
    const buildMenu = (user, isDM = false) => ContextMenu.buildMenuChildren([
        { type: "separator" },
        {
            type: "submenu",
            id: "copier",
            label: "Copy",
            action() {
                copy(user.id);
            },
            items: [{
                    label: "Username",
                    id: "copy-user-name",
                    action() {
                        copy(user.username);
                        UI.showToast("Copied Username.", { type: "success" });
                    }
                },
                {
                    label: "Custom Format",
                    id: "copy-user-custom",
                    action() {
                        const options = UserCopyOptions.reduce((options2, option) => {
                            options2[option.name] = option.getValue(user);
                            return options2;
                        }, {});
                        copy(
                            Formatter$1.formatString(Settings$1.get("userCustom"), options)
                        );
                        UI.showToast("Copied user with custom format.", { type: "success" });
                    }
                },
                {
                    label: "UserId",
                    id: "copy-user-id",
                    action: () => {
                        copy(user.id);
                        UI.showToast("Copied user id.", { type: "success" });
                    }
                },
                {
                    label: "Avatar Url",
                    id: "copy-user-avatar",
                    action: () => {
                        copy(user.getAvatarURL("gif"));
                        UI.showToast("Copied user avatar url.", { type: "success" });
                    }
                },
                isDM && {
                    label: "DM Id",
                    id: "copy-dm-id",
                    action: () => {
                        copy(ChannelStore.getDMFromUserId(user.id));
                        UI.showToast("Copied dm channelId of user.", { type: "success" });
                    }
                }
            ].filter(Boolean)
        }
    ]);
    patches.add(ContextMenu.patch("user-context", (res, props) => {
        const tree = res?.props?.children;
        if (!Array.isArray(tree))
            return console.log("Not an array.", tree);
        tree.splice(-1, 0, buildMenu(props.user, !!props.channel));
    }));
    return () => patches.forEach((p) => p());
}

/*@end */

/* @module channel.js */
const SortedVoiceStateStore = Webpack$1.getStore("SortedVoiceStateStore");
const GuildChannelStore = Webpack$1.getStore("GuildChannelStore");
const ChannelCopyOptions = [{
        name: "id",
        getValue: ({ channel }) => channel.id,
        description: "Will be replaced with the id of the channel."
    },
    {
        name: "name",
        getValue: ({ channel }) => channel.name,
        description: "Will be replaced with the name of the channel."
    },
    {
        name: "type",
        getValue: ({ channel }) => Formatter$1.formatChannelType(channel.type),
        description: "Will be replaced with the type of the channel."
    },
    {
        name: "serverId",
        getValue: ({ guild }) => guild.id,
        description: "Will be replaced with the server id."
    },
    {
        name: "server",
        getValue: ({ guild }) => guild.name,
        description: "Will be replaced with the server name."
    },
    {
        name: "creation",
        getValue: ({ channel }) => Formatter$1.parseSnowFlake(channel.id).toLocaleString(),
        description: "Will be replaced with the creation date of the channel."
    },
    {
        name: "channelMention",
        getValue: ({ channel }) => `<#${channel.id}>`,
        description: "Will be replaced with the mention of the channel."
    }
];
const VoiceChannelCopyOptions = [{
        name: "id",
        getValue: ({ channel }) => channel.id,
        description: "Will be replaced with the id of the voice channel."
    },
    {
        name: "name",
        getValue: ({ channel }) => channel.name,
        description: "Will be replaced with the name of the voice channel."
    },
    {
        name: "type",
        getValue: ({ channel }) => Formatter$1.formatChannelType(channel.type),
        description: "Will be replaced with the type of the voice channel."
    },
    {
        name: "serverId",
        getValue: ({ guild }) => guild.id,
        description: "Will be replaced with the server id."
    },
    {
        name: "server",
        getValue: ({ guild }) => guild.name,
        description: "Will be replaced with the server name."
    },
    {
        name: "creation",
        getValue: ({ channel }) => Formatter$1.parseSnowFlake(channel.id).toLocaleString(),
        description: "Will be replaced with the creation date of the channel."
    },
    {
        name: "usersConnected",
        getValue: ({ channel }) => Object.keys(SortedVoiceStateStore.getVoiceStatesForChannel(channel)).length,
        description: "Will be replaced with the amount of users that are connected to the voice channel."
    },
    {
        name: "channelMention",
        getValue: ({ channel }) => `<#${channel.id}>`,
        description: "Will be replaced with the mention of the voice channel."
    }
];
const ChannelCategoryCopyOptions = [{
        name: "id",
        getValue: ({ channel }) => channel.id,
        description: "Will be replaced with the id of the category."
    },
    {
        name: "name",
        getValue: ({ channel }) => channel.name,
        description: "Will be replaced with the name of the category."
    },
    {
        name: "type",
        getValue: ({ channel }) => Formatter$1.formatChannelType(channel.type),
        description: "Will be replaced with the type of the category."
    },
    {
        name: "serverId",
        getValue: ({ guild }) => guild.id,
        description: "Will be replaced with the server id."
    },
    {
        name: "server",
        getValue: ({ guild }) => guild.name,
        description: "Will be replaced with the server name."
    },
    {
        name: "creation",
        getValue: ({ channel }) => Formatter$1.parseSnowFlake(channel.id).toLocaleString(),
        description: "Will be replaced with the creation date of the category."
    },
    {
        name: "channelMention",
        getValue: ({ channel }) => `<#${channel.id}>`,
        description: "Will be replaced with the mention of the category."
    },
    {
        name: "channelsCount",
        getValue: ({ channel }) => {
            const channels = Object.values(GuildChannelStore.getSelectableChannels(channel.guild_id)).filter((child) => child.parent_id === channel.id);
            return channels.length;
        },
        description: "Will be replaced with the children channels count of that category."
    }
];
const buildTextChannelMenu = function(channel) {
    const guild = GuildStore.getGuild(channel.guild_id);
    return ContextMenu.buildMenuChildren([
        { type: "separator" },
        {
            label: "Copy",
            id: "copy-channel",
            action: () => {
                copy(channel.id);
            },
            type: "submenu",
            items: [{
                    label: "Name",
                    id: "copy-channel-name",
                    action: () => {
                        copy(channel.name);
                        UI.showToast("Copied channel name.", { type: "success" });
                    }
                },
                {
                    label: "Custom Format",
                    id: "copy-channel-custom",
                    action: () => {
                        copy(
                            Formatter$1.formatString(
                                Settings$1.get("channelCustom"),
                                ChannelCopyOptions.reduce((options, option) => {
                                    options[option.name] = option.getValue({ channel, guild });
                                    return options;
                                }, {})
                            )
                        );
                        UI.showToast("Copied channel with custom format.", { type: "success" });
                    }
                },
                {
                    label: "ChannelId",
                    id: "copy-channel-id",
                    action: () => {
                        copy(channel.id);
                        UI.showToast("Copied channel id.", { type: "success" });
                    }
                },
                {
                    label: "Mention",
                    id: "copy-channel-mention",
                    action: () => {
                        copy(`<#${channel.id}>`);
                        UI.showToast("Copied channel mention. (<#channelId>)", { type: "success" });
                    }
                }
            ]
        }
    ]);
};
const buildVoiceChannelMenu = function(channel) {
    const guild = GuildStore.getGuild(channel.guild_id);
    return ContextMenu.buildMenuChildren([
        { type: "separator" },
        {
            label: "Copy",
            id: "copy-voice-channel",
            action: () => {
                copy(channel.id);
            },
            type: "submenu",
            items: [{
                    label: "Name",
                    id: "copy-voice-channel-name",
                    action: () => {
                        copy(channel.name);
                        UI.showToast("Copied voice channel name.", { type: "success" });
                    }
                },
                {
                    label: "ChannelId",
                    id: "copy-voice-channel-id",
                    action: () => {
                        copy(channel.id);
                        UI.showToast("Copied voice channel id.", { type: "success" });
                    }
                },
                {
                    label: "Mention",
                    id: "copy-voice-channel-mention",
                    action: () => {
                        copy(`<#${channel.id}>`);
                        UI.showToast("Copied voice channel mention. (<#channelId>)", { type: "success" });
                    }
                },
                {
                    label: "Custom Format",
                    id: "copy-voice-channel-custom",
                    action: () => {
                        copy(
                            Formatter$1.formatString(
                                Settings$1.get("voiceCustom"),
                                VoiceChannelCopyOptions.reduce((options, option) => {
                                    options[option.name] = option.getValue({ guild, channel });
                                    return options;
                                }, {})
                            )
                        );
                        UI.showToast("Copied voice channel with custom format.", { type: "success" });
                    }
                }
            ]
        }
    ]);
};
const buildCategoryMenu = function(channel) {
    const guild = GuildStore.getGuild(channel.guild_id);
    return ContextMenu.buildMenuChildren([
        { type: "separator" },
        {
            label: "Copy",
            id: "copy-category",
            action: () => {
                copy(channel.id);
            },
            type: "submenu",
            items: [{
                    label: "Name",
                    id: "copy-category-name",
                    action: () => {
                        copy(channel.name);
                        UI.showToast("Copied category name.", { type: "success" });
                    }
                },
                {
                    label: "Custom Format",
                    id: "copy-category-custom",
                    action: () => {
                        copy(
                            Formatter$1.formatString(
                                Settings$1.get("categoryCustom"),
                                ChannelCategoryCopyOptions.reduce((options, option) => {
                                    options[option.name] = option.getValue({ channel, guild });
                                    return options;
                                }, {})
                            )
                        );
                        UI.showToast("Copied category with custom format.", { type: "success" });
                    }
                },
                {
                    label: "CategoryId",
                    id: "copy-category-id",
                    action: () => {
                        copy(channel.id);
                        UI.showToast("Copied channel id.", { type: "success" });
                    }
                }
            ]
        }
    ]);
};

function channel() {
    const builders = {
        [ChannelTypes.GUILD_STAGE_VOICE]: buildVoiceChannelMenu,
        [ChannelTypes.GUILD_CATEGORY]: buildCategoryMenu,
        [ChannelTypes.GUILD_VOICE]: buildVoiceChannelMenu,
        [ChannelTypes.GUILD_TEXT]: buildTextChannelMenu
    };
    return ContextMenu.patch("channel-context", (res, props) => {
        const { channel } = props;
        if (!channel || !Array.isArray(res?.props?.children))
            return res;
        const menu = (builders[channel.type] ?? buildTextChannelMenu)(channel);
        res.props.children.splice(-1, 0, menu);
    });
}

/*@end */

/* @module guild.js */
const GuildMemberCountStore = Webpack$1.getStore("GuildMemberCountStore");
const GuildCopyOptions = [{
        name: "id",
        getValue: (guild) => guild.id,
        description: "Will be replaced with the server id."
    },
    {
        name: "name",
        getValue: (guild) => guild.name,
        description: "Will be replaced with the server name."
    },
    {
        name: "icon",
        getValue: (guild) => guild.getIconURL(),
        description: "will be replaced with the server icon url."
    },
    {
        name: "region",
        getValue: (guild) => guild.region,
        description: "Will be replaced with the server region."
    },
    {
        name: "members",
        getValue: (guild) => GuildMemberCountStore.getMemberCount(guild.id),
        description: "Will be replaced with the member count of the server."
    },
    {
        name: "creation",
        getValue: (guild) => Formatter$1.parseSnowFlake(guild.id).toLocaleString(),
        description: "Will be replaced with the creation date of the server."
    }
];

function guild() {
    return ContextMenu.patch("guild-context", (res, props) => {
        const { guild } = props;
        if (!guild || !Array.isArray(res?.props?.children))
            return res;
        const menu = ContextMenu.buildMenuChildren([
            { type: "separator" },
            {
                label: "Copy",
                id: "copy-guild",
                type: "submenu",
                action: () => {
                    copy(guild.id);
                },
                items: [{
                        label: "Name",
                        id: "copy-guild-name",
                        action: () => {
                            copy(guild.name);
                            UI.showToast("Copied server name.", { type: "success" });
                        }
                    },
                    {
                        label: "Custom Format",
                        id: "copy-guild-custom",
                        action: () => {
                            copy(
                                Formatter$1.formatString(
                                    Settings$1.get("guildCustom"),
                                    GuildCopyOptions.reduce((options, option) => {
                                        options[option.name] = option.getValue(guild, Modules);
                                        return options;
                                    }, {})
                                )
                            );
                            UI.showToast("Copied server with custom format.", { type: "success" });
                        }
                    },
                    {
                        label: "GuildId",
                        id: "copy-guild-id",
                        action: () => {
                            copy(guild.id);
                            UI.showToast("Copied server id.", { type: "success" });
                        }
                    },
                    {
                        label: "Icon",
                        id: "copy-guild-icon",
                        action: () => {
                            copy(guild.getIconURL());
                            UI.showToast("Copied server icon url.", { type: "success" });
                        }
                    }
                ]
            }
        ]);
        res.props.children.splice(5, 0, menu);
    });
}

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

/* @module label.css */
Styles.sheets.push("/* label.css */", `.copier-roleColoredItem {
    display: flex;
    align-items: center;
}
.copier-roleColoredItem span {
    border: 1px solid var(--interactive-muted);
    border-radius: 50%;
    width: 12px;
    height: 12px;
    margin-right: 8px;
}
`); /*@end */

/* @module dev.jsx */
const SelectedGuildStore = Webpack$1.getStore("SelectedGuildStore");
const RoleColoredLabel = ({ color, label }) => /* @__PURE__ */ React.createElement("div", { className: "copier-roleColoredItem" }, /* @__PURE__ */ React.createElement("span", { style: { backgroundColor: color } }), /* @__PURE__ */ React.createElement("div", null, label));
const RoleCopyOptions = [{
        name: "colorHEX",
        getValue: (_, colors) => colors.hex,
        description: "Will be replaced with the role color in HEX format."
    },
    {
        name: "colorRGB",
        getValue: (_, colors) => colors.rgb,
        description: "Will be replaced with the role color in RGB format."
    },
    {
        name: "colorINT",
        getValue: (_, colors) => colors.int.toString(),
        description: "Will be replaced with the role color in INT format."
    },
    {
        name: "name",
        getValue: (role) => role.name,
        description: "Will be replaced with the role name."
    },
    {
        name: "id",
        getValue: (role) => role.id,
        description: "Will be replaced with the role id."
    },
    {
        name: "position",
        getValue: (role) => role.position.toString(),
        description: "Will be replaced with the role position."
    }
];

function dev() {
    const patches = /* @__PURE__ */ new Set([]);
    const patch = (res, props) => {
        const handleClose = () => {
            res?.props?.onClose();
        };
        const role = props.role || (() => {
            const guild = GuildStore.getGuild(SelectedGuildStore.getGuildId());
            if (!guild)
                return handleClose();
            const role2 = guild.getRole(props.id);
            if (!role2)
                return handleClose();
            return role2;
        })();
        const colors = {
            hex: int2hex(role.color),
            int: role.color,
            rgb: int2rgb(role.color)
        };
        console.log(colors);
        if (!Array.isArray(res.props.children)) {
            res.props.children = [res.props.children];
        }
        res.props.children = res.props.children.filter((e) => e && e?.props?.id !== "devmode-copy-id");
        res.props.children.push(
            ContextMenu.buildMenuChildren([{
                label: "Copy",
                id: "copy-role",
                type: "submenu",
                action: () => {
                    copy(props.id);
                },
                items: [{
                        label: "RoleId",
                        id: "copy-role-id",
                        action: () => {
                            copy(role.id);
                            UI.showToast("Copied role id.", { type: "success" });
                        }
                    },
                    {
                        label: "Name",
                        id: "copy-role-name",
                        action: () => {
                            copy(role.name);
                            UI.showToast("Copied role name.", { type: "success" });
                        }
                    },
                    {
                        label: "Custom Format",
                        id: "copy-role-custom-format",
                        action: () => {
                            copy(
                                Formatter.formatString(
                                    Settings.get("roleCustom"),
                                    RoleCopyOptions.reduce((options, option) => {
                                        options[option.name] = option.getValue(role, colors);
                                        return options;
                                    }, {})
                                )
                            );
                            UI.showToast("Copied role with custom format.", { type: "success" });
                        }
                    },
                    {
                        label: "Mention",
                        id: "copy-role-mention",
                        action: () => {
                            copy(`<@&${role.id}>`);
                            UI.showToast("Copied role mention. (<&roleId>)", { type: "success" });
                        }
                    },
                    {
                        label: "Color",
                        id: "copy-role-color",
                        type: "submenu",
                        disabled: !role.color,
                        items: [{
                                label: () => /* @__PURE__ */ React.createElement(RoleColoredLabel, { color: colors.hex, label: "RGB" }),
                                id: "copy-role-color-rgb",
                                action: () => {
                                    copy(colors.rgb);
                                    UI.showToast(`Copied role color in RGB format.`, { type: "success" });
                                }
                            },
                            {
                                label: () => /* @__PURE__ */ React.createElement(RoleColoredLabel, { color: colors.hex, label: "HEX" }),
                                id: "copy-role-color-hex",
                                action: () => {
                                    copy(colors.hex);
                                    UI.showToast(`Copied role color in HEX format.`, { type: "success" });
                                }
                            },
                            {
                                label: () => /* @__PURE__ */ React.createElement(RoleColoredLabel, { color: colors.hex, label: "INT" }),
                                id: "copy-role-color-int",
                                action: () => {
                                    copy(colors.int.toString());
                                    UI.showToast(`Copied role color in INT format.`, { type: "success" });
                                }
                            }
                        ]
                    }
                ]
            }])
        );
    };
    patches.add(ContextMenu.patch("dev-context", patch));
    patches.add(ContextMenu.patch("guild-settings-role-context", patch));
    return () => patches.forEach((p) => p());
}

/*@end */

/* @module message.js */
const getMessageLink = (guildId, channelId, messageId, isDM = !!guildId) => isDM ? `https://${GLOBAL_ENV.RELEASE_CHANNEL}.discord.com/channels/@me/${channelId}/${messageId}` : `https://${GLOBAL_ENV.RELEASE_CHANNEL}.discord.com/channels/${guildId}/${channelId}/${messageId}`;
const MessageCopyOptions = [{
        name: "authorId",
        getValue: ({ message }) => message.author.id,
        description: "Will be replaced with the message author's userId."
    },
    {
        name: "authorTag",
        getValue: ({ message }) => message.author.tag,
        description: "Will be replace with the message author's tag. (Username#1234)"
    },
    {
        name: "authorMention",
        getValue: ({ message }) => `<@!${message.author.id}>`,
        description: "Will be replaced with the mention of the message author. (<@!userId>)"
    },
    {
        name: "author",
        getValue: ({ message }) => message.author.username,
        description: "Will be replaced with the message author's username."
    },
    {
        name: "message",
        getValue: ({ message }) => message.content,
        description: "Will be replaced with the message content."
    },
    {
        name: "id",
        getValue: ({ message }) => message.id,
        description: "Will be replaced with the message id."
    },
    {
        name: "timestamp",
        getValue: ({ message }) => Formatter$1.formatDate(message.timestamp),
        description: "Will be replaced with the creation timestamp of the message."
    },
    {
        name: "channelId",
        getValue: ({ message }) => message.channel_id,
        description: "Will be replaced with the channel id where the message was sent."
    },
    {
        name: "channelMention",
        getValue: ({ message }) => `<#${message.channel_id}>`,
        description: "Will be replaced with the mention of the channel where the message was sent."
    }
];

function message() {
    return ContextMenu.patch("message", (res, props) => {
        const { message } = props;
        if (!message || !Array.isArray(res?.props?.children))
            return res;
        res.props.children.splice(
            4,
            0,
            ContextMenu.buildMenuChildren([
                { type: "separator" },
                {
                    id: "copy-message",
                    label: "Copy",
                    type: "submenu",
                    action: () => {
                        copy(message.id);
                    },
                    items: [{
                            label: "RAW Content",
                            id: "copy-message-raw",
                            action: () => {
                                copy(message.content);
                                UI.showToast("Copied raw message content.", { type: "success" });
                            }
                        },
                        {
                            label: "Custom Format",
                            id: "copy-message-custom-format",
                            action: () => {
                                copy(
                                    Formatter$1.formatString(
                                        Settings$1.get("messageCustom"),
                                        MessageCopyOptions.reduce((options, option) => {
                                            options[option.name] = option.getValue({ message });
                                            return options;
                                        }, {})
                                    )
                                );
                                UI.showToast("Copied message with custom format.", { type: "success" });
                            }
                        },
                        {
                            label: "Message Link",
                            id: "copy-message-link",
                            action: () => {
                                const channel = ChannelStore.getChannel(message.channel_id);
                                if (!channel) {
                                    console.error("Failed to copy message link!\n", "Message channel cannot be found!");
                                    return UI.showToast("Failed to copy message link!", { type: "error" });
                                }
                                copy(getMessageLink(channel.guild_id, channel.id, message.id));
                                UI.showToast("Copied message link.", { type: "success" });
                            }
                        },
                        {
                            label: "MessageId",
                            id: "copy-message-id",
                            action: () => {
                                copy(message.id);
                                UI.showToast("Copied message id.", { type: "success" });
                            }
                        }
                    ].filter(Boolean)
                }
            ])
        );
    });
}

/*@end */

/* @module index.js */

/*@end */

var ContextMenus = /*#__PURE__*/ Object.freeze({
    __proto__: null,
    ChannelContextMenu: channel,
    DeveloperContextMenu: dev,
    GuildContextMenu: guild,
    MessageContextMenu: message,
    UserContextMenu: user
});

/* @module copy.jsx */
function CopyIcon(props) {
    return /* @__PURE__ */ React.createElement("svg", { height: "24", width: "24", viewBox: "0 0 24 24", ...props }, /* @__PURE__ */ React.createElement("path", { fill: props.fill ?? "currentColor", d: "M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" }));
}

/*@end */

/* @module button.css */
Styles.sheets.push("/* button.css */", `.copier-button {
    background: transparent;
    border: none;
    outline: none;
    cursor: pointer;
    justify-content: center;
    align-items: center;
    display: flex;
    color: #0870f3;
}

.copier-tooltip {
    --background-floating: var(--background-secondary);
}
`); /*@end */

/* @module changelog.css */
Styles.sheets.push("/* changelog.css */", `.copier-changelog-item {
    color: #ddd;
}

.copier-changelog-header {
    text-transform: uppercase;
    font-weight: 700;
    display: flex;
    align-items: center;
    margin-bottom: 10px;
}

.item-changelog-added .copier-changelog-header {
    color: #45BA6A;
}
.item-changelog-fixed .copier-changelog-header {
    color: #EC4245;
}
.item-changelog-improved .copier-changelog-header {
    color: #5865F2;
}

.copier-changelog-header::after {
    content: "";
    flex-grow: 1;
    height: 1px;
    background: currentColor;
    margin-left: 7px;
}

.copier-changelog-item span {
    display: list-item;
    margin-left: 5px;
    list-style: inside;
}

.copier-changelog-item span::marker {
    color: var(--background-accent);
}
.copier-changelog-banner {
    width: 405px;
    border-radius: 8px;
    margin-bottom: 20px;
}

.copier-title-wrap {
    font-size: 18px;
}

.copier-title-wrap span {
    font-size: 12px;
    color: var(--text-muted);
    font-family: var(--font-primary);
}
`); /*@end */

/* @module copybutton.jsx */
const className = Webpack$1.getByProps("dangerous", "button")?.button ?? "buttonUndefined";

function CopyButton(props) {
    const shouldShow = useStateFromStores([Settings$1], () => Settings$1.get("showButton", true));
    const active = useKeyState();
    const { message } = props;
    if (!shouldShow)
        return null;
    const handleClick = () => {
        switch (active) {
            case "none":
                copy(message.content);
                break;
            case "shift":
            case "ctrl":
            case "both":
                copy(
                    Formatter$1.formatString(
                        Settings$1.get("messageCustom"),
                        MessageCopyOptions.reduce((options, option) => {
                            options[option.name] = option.getValue({ message });
                            return options;
                        }, {})
                    )
                );
                break;
        }
    };
    return /* @__PURE__ */ React.createElement(Tooltip, { text: active === "none" ? "Copy RAW Message" : "Copy Message (Custom)" }, (props2) => /* @__PURE__ */ React.createElement("div", { ...props2, className, onClick: handleClick }, /* @__PURE__ */ React.createElement(CopyIcon, { fill: active === "none" ? "currentColor" : "#0870f3" })));
}

/*@end */

/* @module item.scss */
Styles.sheets.push("/* item.scss */", `.copier-settings-item {
  padding: 15px;
  border-radius: 8px;
  background: var(--background-tertiary);
  cursor: pointer;
  color: #fff;
  border: thin solid var(--background-modifier-hover);
}
.copier-settings-item .copier-settings-item-header .copier-settings-name {
  display: flex;
  align-items: center;
  font-weight: 500;
  font-size: 20px;
  color: var(--header-primary);
}
.copier-settings-item .copier-settings-item-header .copier-settings-name .copier-settings-icon-box {
  color: vaR(--header-secondary);
  margin-right: 5px;
}
.copier-settings-item.item-opened .copier-settings-item-header {
  border-bottom: thin solid var(--background-modifier-accent);
  margin-bottom: 7px;
  padding-bottom: 7px;
}
.copier-settings-item + .copier-settings-item {
  margin-top: 10px;
}
.copier-settings-item .copier-settings-note {
  color: var(--header-secondary);
}
.copier-settings-item.item-opened .copier-settings-children {
  margin-top: 10px;
}`); /*@end */

/* @module tune.jsx */
function Tune(props) {
    return /* @__PURE__ */ React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", height: "24", viewBox: "0 0 24 24", width: "24", ...props }, /* @__PURE__ */ React.createElement("path", { d: "M3 17v2h6v-2H3zM3 5v2h10V5H3zm10 16v-2h8v-2h-8v-2h-2v6h2zM7 9v2H3v2h4v2h2V9H7zm14 4v-2H11v2h10zm-6-4h2V7h4V5h-4V3h-2v6z", fill: "currentColor" }));
}

/*@end */

/* @module item.jsx */
function SettingsItem({ name, note, children, icon, opened = false, onSelect }) {
    return /* @__PURE__ */ React.createElement("div", { className: Utils.className("copier-settings-item", opened && "item-opened"), onClick: onSelect }, /* @__PURE__ */ React.createElement("div", { className: "copier-settings-item-header" }, /* @__PURE__ */ React.createElement("div", { className: "copier-settings-name" }, /* @__PURE__ */ React.createElement("div", { className: "copier-settings-icon-box" }, /* @__PURE__ */ React.createElement(Tune, null)), name), !opened && /* @__PURE__ */ React.createElement("div", { className: "copier-settings-note" }, note)), /* @__PURE__ */ React.createElement("div", { className: "copier-settings-children" }, opened && children));
}

/*@end */

/* @module tick.jsx */
function Tick(props) {
    return /* @__PURE__ */ React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", height: "48", width: "48", ...props }, /* @__PURE__ */ React.createElement("path", { fill: "currentColor", d: "M18.9 35.7 7.7 24.5l2.15-2.15 9.05 9.05 19.2-19.2 2.15 2.15Z" }));
}

/*@end */

/* @module toggle.scss */
Styles.sheets.push("/* toggle.scss */", `.copier-toggle {
  position: relative;
}
.copier-toggle .copier-toggle-name {
  font-size: 16px;
  font-weight: 500;
}
.copier-toggle .copier-toggle-value {
  position: absolute;
  right: 0;
  top: 0;
  width: 30px;
  height: 30px;
  border-radius: 100px;
  border: thin solid var(--background-modifier-accent);
}
.copier-toggle .copier-toggle-value svg {
  fill: #fff;
  transform: scale(0.5);
  left: -8px;
  top: -7px;
  position: relative;
}
.copier-toggle .copier-toggle-value.copier-checked {
  background: var(--status-positive);
}
.copier-toggle .copier-toggle-note {
  margin-top: 10px;
  font-size: 14px;
  color: var(--text-muted);
}`); /*@end */

/* @module toggle.jsx */
function ToggleItem({ name, note, value, onChange }) {
    const [checked, toggle] = React.useReducer((n) => !n, value);
    return /* @__PURE__ */ React.createElement("div", { className: "copier-toggle" }, /* @__PURE__ */ React.createElement("div", { className: "copier-header copier-toggle-name" }, name), /* @__PURE__ */ React.createElement(
        "div", {
            onClick: (e) => {
                onChange(!checked);
                toggle();
                e.stopPropagation();
            },
            className: Utils.className("copier-toggle-value", { "copier-checked": checked })
        },
        checked && /* @__PURE__ */ React.createElement(Tick, null)
    ), note && /* @__PURE__ */ React.createElement("div", { className: "copier-toggle-note" }, note));
}

/*@end */

/* @module textbox.scss */
Styles.sheets.push("/* textbox.scss */", `.copier-textbox .copier-textbox-note {
  font-size: 14px;
  color: var(--text-muted);
}
.copier-textbox .copier-text-input {
  background: var(--background-secondary-alt);
  border: thin solid var(--background-modifier-hover);
  border-radius: 4px;
  width: -webkit-fill-available;
  margin: 8px 0;
  color: #ddd;
  font-size: 16px;
  padding: 8px;
}
.copier-textbox .copier-text-input:focus {
  border-color: var(--brand-experiment);
}`); /*@end */

/* @module textbox.jsx */
function TextBox({ name, note, value, onChange, placeholder }) {
    const [currentValue, setValue] = React.useState(value);
    return /* @__PURE__ */ React.createElement("div", { className: "copier-textbox" }, /* @__PURE__ */ React.createElement("div", { className: "copier-header copier-textbox-name" }, name), /* @__PURE__ */ React.createElement(
        "input", {
            className: "copier-text-input",
            defaultValue: currentValue,
            onInput: ({ target }) => (onChange(target.value), setValue(target.value)),
            placeholder,
            onClick: (e) => e.stopPropagation()
        }
    ), note && /* @__PURE__ */ React.createElement("div", { className: "copier-textbox-note" }, note));
}

/*@end */

/* @module protip.css */
Styles.sheets.push("/* protip.css */", `.copier-pro-tip {
    color: var(--text-positive);
    font-weight: 700;
    font-size: 12px;
    display: inline;
}
`); /*@end */

/* @module protip.jsx */
function ProTip() {
    return /* @__PURE__ */ React.createElement("span", { className: "copier-pro-tip" }, "PROTIP:");
}

/*@end */

/* @module index.scss */
Styles.sheets.push("/* index.scss */", `.copier-settings-container {
  display: flex;
  flex-direction: column;
}

.copier-key {
  box-shadow: inset 0 -4px 0 var(--primary-dark-660);
  color: var(--primary-dark-100);
  background-color: var(--background-accent);
  border: 1px solid var(--background-primary);
  display: inline-flex;
  padding: 3px 6px 4px;
  border-radius: 4px;
  cursor: default;
  min-width: 10px;
  text-align: center;
  vertical-align: middle;
  font-size: 10px;
  height: 11px;
}

.copier-header {
  font-weight: 500;
  font-size: 18px;
  font-family: var(--font-display);
}`); /*@end */

/* @module replacement.scss */
Styles.sheets.push("/* replacement.scss */", `.copier-variable {
  display: flex;
  align-items: center;
  margin-top: 5px;
}
.copier-variable .copier-variable-name {
  background: var(--primary-dark-560);
  font-weight: 700;
  padding: 3px;
  border-radius: 4px;
  margin-right: 5px;
}
.copier-variable .copier-variable-description {
  color: var(--header-secondary);
}`); /*@end */

/* @module replacement.jsx */
function Variable({ name, description }) {
    return /* @__PURE__ */ React.createElement("div", { className: "copier-variable" }, /* @__PURE__ */ React.createElement("span", { className: "copier-variable-name" }, "$", name), /* @__PURE__ */ React.createElement("div", { className: "copier-variable-description" }, description));
}

function Replacement({ options, id, name }) {
    return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(TextBox, { name: "Configure", onChange: (value) => Settings$1.set(id, value), placeholder: name, value: Settings$1.get(id) }), /* @__PURE__ */ React.createElement("div", { className: "copier-header copier-settings-name" }, "Available Variables:"), options.map((option) => /* @__PURE__ */ React.createElement(Variable, { key: option.name, name: option.name, description: option.description })));
}

/*@end */

/* @module index.jsx */
const Dynamic = ({ component: Type, ...props }) => /* @__PURE__ */ React.createElement(Type, { ...props });
const optionsText = "{s} Options";
const settings = [{
        id: "showButton",
        type: "toggle",
        name: "Toolbar Button",
        note: /* @__PURE__ */ React.createElement("span", null, "Shows a button in the message toolbar to copy a message with two formats.", /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement(ProTip, null), " Hold ", /* @__PURE__ */ React.createElement("span", { className: "copier-key" }, "Ctrl"), " or ", /* @__PURE__ */ React.createElement("span", { className: "copier-key" }, "Shift"), " to use MessageCustom options.")
    },
    {
        id: "userCustom",
        name: fmt(optionsText, "UserCopy"),
        type: "replacement",
        options: UserCopyOptions
    },
    {
        id: "messageCustom",
        name: fmt(optionsText, "MessageCopy"),
        type: "replacement",
        options: MessageCopyOptions
    },
    {
        id: "guildCustom",
        name: fmt(optionsText, "GuildCopy"),
        type: "replacement",
        options: GuildCopyOptions
    },
    {
        id: "channelCustom",
        name: fmt(optionsText, "ChannelCopy"),
        type: "replacement",
        options: ChannelCopyOptions
    },
    {
        id: "categoryCustom",
        name: fmt(optionsText, "ChannelCategoryCopy"),
        type: "replacement",
        options: ChannelCategoryCopyOptions
    },
    {
        id: "voiceCustom",
        name: fmt(optionsText, "VoiceChannelCopy"),
        type: "replacement",
        options: VoiceChannelCopyOptions
    },
    {
        id: "roleCustom",
        name: fmt(optionsText, "RoleCopy"),
        type: "replacement",
        options: RoleCopyOptions
    }
];
const componentMap = {
    toggle: ToggleItem,
    text: TextBox,
    replacement: Replacement
};

function SettingsPanel() {
    const [selected, setSelected] = React.useState(null);
    return /* @__PURE__ */ React.createElement("div", { className: "copier-settings-container" }, settings.map((p) => /* @__PURE__ */ React.createElement(SettingsItem, { ...p, key: p.id, onSelect: () => setSelected(selected === p.id ? null : p.id), opened: selected === p.id }, /* @__PURE__ */ React.createElement(
        Dynamic, {
            component: componentMap[p.type],
            ...p,
            value: Settings$1.get(p.id),
            onChange: (val) => Settings$1.set(p.id, val)
        }
    ))));
}

/*@end */

/* @module index.jsx */
class Copier {
    flush = /* @__PURE__ */ new Set();
    maybeShowChangelog() {
        if (config.version === Settings$1.get("latestUsedVersion"))
            return;
        const items = config.changelog.map((item) => /* @__PURE__ */ React.createElement("div", { className: "copier-changelog-item item-changelog-" + item.type }, /* @__PURE__ */ React.createElement("h4", { className: "copier-changelog-header" }, item.type), item.items.map((i) => /* @__PURE__ */ React.createElement("span", null, i))));
        "changelogImage" in config && items.unshift(
            /* @__PURE__ */
            React.createElement("img", { className: "copier-changelog-banner", src: config.changelogImage })
        );
        Settings$1.set("latestUsedVersion", config.version);
        const formatter = new Intl.DateTimeFormat(document.documentElement.lang, { month: "long", day: "numeric", year: "numeric" });
        UI.alert( /* @__PURE__ */ React.createElement("div", { className: "copier-title-wrap" }, /* @__PURE__ */ React.createElement("h1", null, "What's New - ", config.name), /* @__PURE__ */ React.createElement("span", null, formatter.format(new Date(config.changelogDate)))), items);
    }
    getSettingsPanel() {
        return /* @__PURE__ */ React.createElement(SettingsPanel, null);
    }
    start() {
        this.controller = new AbortController();
        Styles.load();
        for (const id in ContextMenus) {
            try {
                const unpatch = ContextMenus[id]();
                this.flush.add(unpatch);
            } catch (error) {
                console.error("[Copier] Could not initialize patch for", id, ":", error);
            }
        }
        this.patchAboutMe();
        this.patchToolbar();
        this.maybeShowChangelog();
    }
    patchAboutMe() {
        const [module, key] = Webpack$1.getMangled((m) => m?.toString?.().includes("USER_POPOUT_ABOUT_ME"));
        const CopyButton2 = React.memo(({ onClick }) => /* @__PURE__ */ React.createElement(Tooltip, { text: "Copy About Me", tooltipClassName: "copier-tooltip", position: "top" }, (props) => /* @__PURE__ */ React.createElement("button", { ...props, className: "copier-button", onClick }, /* @__PURE__ */ React.createElement(CopyIcon, { width: "14", height: "14" }))));
        Patcher.after(module, key, (_, [{ bio }], res) => {
            const title = findInTree(res, (e) => e?.variant && Array.isArray(e.children));
            if (!title)
                return res;
            title.children.push(
                /* @__PURE__ */
                React.createElement(CopyButton2, { onClick: () => copy(bio) })
            );
        });
    }
    async patchToolbar() {
        const { buttons } = Webpack$1.getByProps("messageListItem", "buttons") ?? {};
        const buttonsContainer = await new Promise((resolve) => {
            onceAdded("." + buttons, (node) => {
                const instance = ReactUtils.getInternalInstance(node);
                if (!instance)
                    return;
                for (let curr = instance, max = 100; curr != null && max--; curr = curr?.return) {
                    max < 5 && console.log(curr);
                    if ((node = curr?.memoizedProps?.children?.type) && node?.$$typeof) {
                        resolve(node);
                        break;
                    }
                }
            }, this.controller.signal);
        });
        if (!buttonsContainer)
            return;
        const ToolbarButtonPatch = ({ __COP_ORIGINAL, ...props }) => {
            if (!__COP_ORIGINAL)
                return null;
            const res = __COP_ORIGINAL.call(null, props);
            try {
                res?.props?.children?.unshift?.(
                    /* @__PURE__ */
                    React.createElement(CopyButton, { message: props.message })
                );
            } catch (error) {
                console.error("[Copier] Fatal error:", error);
            }
            return res;
        };
        Patcher.after(buttonsContainer, "type", (_, __, res) => {
            const el = findInTree(res, (e) => e?.props?.message);
            if (!el)
                return;
            el.props.__COP_ORIGINAL = el.type;
            el.type = ToolbarButtonPatch;
        });
    }
    stop() {
        Styles.unload();
        Patcher.unpatchAll();
        this.flush.forEach((f) => f());
        this.flush.clear();
        this.controller.abort();
    }
}

/*@end */

module.exports = Copier;
