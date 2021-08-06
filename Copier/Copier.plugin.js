/**
* @name Copier
* @displayName Copier
* @authorId 415849376598982656
* @invite gvA2ree
*/
/*@cc_on
@if (@_jscript)
    
    // Offer to self-install for clueless users that try to run this directly.
    var shell = WScript.CreateObject("WScript.Shell");
    var fs = new ActiveXObject("Scripting.FileSystemObject");
    var pathPlugins = shell.ExpandEnvironmentStrings("%APPDATA%\BetterDiscord\plugins");
    var pathSelf = WScript.ScriptFullName;
    // Put the user at ease by addressing them in the first person
    shell.Popup("It looks like you've mistakenly tried to run me directly. \n(Don't do that!)", 0, "I'm a plugin for BetterDiscord", 0x30);
    if (fs.GetParentFolderName(pathSelf) === fs.GetAbsolutePathName(pathPlugins)) {
        shell.Popup("I'm in the correct folder already.", 0, "I'm already installed", 0x40);
    } else if (!fs.FolderExists(pathPlugins)) {
        shell.Popup("I can't find the BetterDiscord plugins folder.\nAre you sure it's even installed?", 0, "Can't install myself", 0x10);
    } else if (shell.Popup("Should I copy myself to BetterDiscord's plugins folder for you?", 0, "Do you need some help?", 0x34) === 6) {
        fs.CopyFile(pathSelf, fs.BuildPath(pathPlugins, fs.GetFileName(pathSelf)), true);
        // Show the user where to put plugins in the future
        shell.Exec("explorer " + pathPlugins);
        shell.Popup("I'm installed!", 0, "Successfully installed", 0x40);
    }
    WScript.Quit();

@else@*/
// <reference path="../" />

const config = {
    info: {
        name: "Copier",
        authors: [
            {
                name: "Strencher",
                discord_id: "415849376598982656",
                github_username: "Strencher",
                twitter_username: "Strencher3"
            }
        ],
        version: "1.1.1",
        description: "Allows you to copy certain stuff with custom options.",
        github: "https://github.com/Strencher/BetterDiscordStuff/blob/master/Copier/Copier.plugin.js",
        github_raw: "https://raw.githubusercontent.com/Strencher/BetterDiscordStuff/master/Copier/Copier.plugin.js"
    },
    changelog: [
        {
            type: "added",
            title: "Added",
            items: [
                "Added copy button for About Me.",
                "Added context menu entry to copy dm channel id."
            ]
        }
    ]
};

const MessageCopyOptions = [
    {
        name: "author",
        getValue: ({message}) => message.author.username,
        description: "Will be replaced with the message author's username."
    },
    {
        name: "authorId",
        getValue: ({message}) => message.author.id,
        description: "Will be replaced with the message author's userId."
    },
    {
        name: "authorTag",
        getValue: ({message}) => message.author.tag,
        description: "Will be replace with the message author's tag. (Username#1234)"
    },
    {
        name: "authorMention",
        getValue: ({message}) => `<@!${message.author.id}>`,
        description: "Will be replaced with the mention of the message author. (<@!userId>)"
    },
    {
        name: "message",
        getValue: ({message}) => message.content,
        description: "Will be replaced with the message content."
    },
    {
        name: "id",
        getValue: ({message}) => message.id,
        description: "Will be replaced with the message id."
    },
    {
        name: "timestamp",
        getValue: ({message}, {Formatter}) => Formatter.formatDate(message.timestamp),
        description: "Will be replaced with the creation timestamp of the message."
    },
    {
        name: "channelId",
        getValue: ({message}) => message.channel_id,
        description: "Will be replaced with the channel id where the message was sent."
    },
    {
        name: "channelMention",
        getValue: ({message}) => `<#${message.channel_id}>`,
        description: "Will be replaced with the mention of the channel where the nessage was sent."
    }
];

const ChannelCopyOptions = [
    {
        name: "id",
        getValue: ({channel}) => channel.id,
        description: "Will be replaced with the id of the channel."
    },
    {
        name: "name",
        getValue: ({channel}) => channel.name,
        description: "Will be replaced with the name of the channel.",
    },
    {
        name: "type",
        getValue: ({channel}, {Formatter}) => Formatter.formatChannelType(channel.type),
        description: "Will be replaced with the type of the channel."
    },
    {
        name: "server",
        getValue: ({guild}) => guild.name,
        description: "Will be replaced with the server name."
    },
    {
        name: "serverId",
        getValue: ({guild}) => guild.id,
        description: "Will be replaced with the server id."
    },
    {
        name: "creation",
        getValue: ({channel}, {Formatter}) => Formatter.parseSnowFlake(channel.id).toLocaleString(),
        description: "Will be replaced with the creation date of the channel."
    },
    {
        name: "channelMention",
        getValue: ({channel}) => `<#${channel.id}>`,
        description: "Will be replaced with the mention of the channel."
    }
];

const VoiceChannelCopyOptions = [
    {
        name: "id",
        getValue: ({channel}) => channel.id,
        description: "Will be replaced with the id of the voice channel."
    },
    {
        name: "name",
        getValue: ({channel}) => channel.name,
        description: "Will be replaced with the name of the voice channel."
    },
    {
        name: "type",
        getValue: ({channel}, {Formatter}) => Formatter.parseSnowFlake(channel.id).toLocaleString(),
        description: "Will be replaced with the type of the voice channel."
    },
    {
        name: "server",
        getValue: ({guild}) => guild.name,
        description: "Will be replaced with the server name."
    },
    {
        name: "serverId",
        getValue: ({guild}) => guild.id,
        description: "Will be replaced with the server id."
    },
    {
        name: "creation",
        getValue: ({channel}, {Formatter}) => Formatter.parseSnowFlake(channel.id).toLocaleString(),
        description: "Will be replaced with the creation date of the channel."
    },
    {
        name: "usersConnected",
        getValue: ({channel}, {VoiceStatesStore}) => Object.keys(VoiceStatesStore.getVoiceStatesForChannel(channel.id)).length,
        description: "Will be replaced with the amount of users that are connected to the voice channel."
    },
    {
        name: "channelMention",
        getValue: ({channel}) => `<#${channel.id}>`,
        description: "Will be replaced with the mention of the voice channel."
    }
];

const GuildCopyOptions = [
    {
        name: "id",
        getValue: guild => guild.id,
        description: "Will be replaced with the server id."
    },
    {
        name: "name",
        getValue: guild => guild.name,
        description: "Will be replaced with the server name."
    },
    {
        name: "icon",
        getValue: guild => guild.getIconURL(),
        description: "will be replaced with the server icon url."
    },
    {
        name: "region",
        getValue: guild => guild.region,
        description: "Will be replaced with the server region."
    },
    {
        name: "members",
        getValue: (guild, {MemberCountStore}) => MemberCountStore.getMemberCount(guild.id),
        description: "Will be replaced with the member count of the server."
    },
    {
        name: "creation",
        getValue: (guild, {Formatter}) => Formatter.parseSnowFlake(guild.id).toLocaleString(),
        description: "Will be replaced with the creation date of the server."
    }
];

const UserCopyOptions = [
    {
        name: "id",
        getValue: user => user.id,
        description: "Will be replaced with the id of the user."
    },
    {
        name: "name",
        getValue: user => user.username,
        description: "Will be replaced with the name of the user."
    },
    {
        name: "tag",
        getValue: user => user.tag,
        description: "Will be replaced with the tag of the user."
    },
    {
        name: "discriminator",
        getValue: user => user.discriminator,
        description: "Will be replaced with the discriminator of the user."
    },
    {
        name: "creation",
        getValue: (user, {Formatter}) => Formatter.parseSnowFlake(user.id).toLocaleString(),
        description: "Will be replaced with creation date of the user."
    },
    {
        name: "avatar",
        getValue: user => user.getAvatarURL("gif"),
        description: "Will be replaced with the avatar url of the user."
    }
];

const RoleCopyOptions = [
    {
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
        getValue: role => role.name,
        description: "Will be replaced with the role name."
    },
    {
        name: "id",
        getValue: role => role.id,
        description: "Will be replaced with the role id."
    },
    {
        name: "position",
        getValue: role => role.position.toString(),
        description: "Will be replaced with the role position."
    }
];

const ChannelCategoryCopyOptions = [
    {
        name: "id",
        getValue: ({channel}) => channel.id,
        description: "Will be replaced with the id of the category."
    },
    {
        name: "name",
        getValue: ({channel}) => channel.name,
        description: "Will be replaced with the name of the category.",
    },
    {
        name: "type",
        getValue: ({channel}, {Formatter}) => Formatter.formatChannelType(channel.type),
        description: "Will be replaced with the type of the category."
    },
    {
        name: "server",
        getValue: ({guild}) => guild.name,
        description: "Will be replaced with the server name."
    },
    {
        name: "serverId",
        getValue: ({guild}) => guild.id,
        description: "Will be replaced with the server id."
    },
    {
        name: "creation",
        getValue: ({channel}, {Formatter}) => Formatter.parseSnowFlake(channel.id).toLocaleString(),
        description: "Will be replaced with the creation date of the category."
    },
    {
        name: "channelMention",
        getValue: ({channel}) => `<#${channel.id}>`,
        description: "Will be replaced with the mention of the category."
    },
    {
        name: "channelsCount",
        getValue: ({channel}, {ChannelsStore}) => {
            const channels = Object.values(ChannelsStore.getMutableGuildChannels()).filter(child => child.parent_id === channel.id);

            return channels.length;
        },
        description: "Will be replaced with the children channels count of that category."
    }
];

/**
 * @param {[ZeresPluginLibrary.BasePlugin, ZeresPluginLibrary.PluginApi]} param0 
 * @returns 
 */
const buildPlugin = ([Plugin, Api]) => {

    const {ColorConverter, Logger, Toasts, Utilities, WebpackModules, PluginUtilities, ReactComponents, Patcher} = Api;
    const {React, React: {useEffect, useState}, ElectronModule, GuildStore, ChannelStore, DiscordConstants: {ChannelTypes}, SelectedGuildStore} = Api.DiscordModules;
    const {MenuItem, MenuGroup} = WebpackModules.getByProps("MenuItem");
    const findWithDefault = filter => WebpackModules.getModule(m => m && m.default && filter(m.default));
    const DatesModule = WebpackModules.getByProps("dateFormat", "calendarFormat");
    const MemberCountStore = WebpackModules.getByProps("getMemberCount");
    const {TooltipContainer: Tooltip, TooltipColors} = WebpackModules.getByProps("TooltipContainer");
    const MiniPopover = findWithDefault(m => m.displayName == "MiniPopover");
    const {Routes} = WebpackModules.getByProps("Routes");
    const VoiceStatesStore = WebpackModules.getByProps("getVoiceStatesForChannel");
    const ChannelsStore = WebpackModules.getByProps("getMutableGuildChannels");
    const Button = WebpackModules.getByProps("DropdownSizes");
    const CopyIcon = props => React.createElement("svg", {height: 24, width: 24, viewBox: "0 0 24 24", fill: "currentColor", ...props}, React.createElement("path", {fill: "none", d: "M0 0h24v24H0z"}), React.createElement("path", {d: "M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"}));

    const createUpdateWrapper = component => props => {
        const {onChange = () => {}} = props;
        const [value, setValue] = useState(props.value);

        return React.createElement(component, {
            ...props,
            value,
            onChange: value => {
                onChange(value);
                setValue(value);
            }
        });
    };

    const TextInput = createUpdateWrapper(WebpackModules.getByDisplayName("TextInput"));
    const SwitchItem = createUpdateWrapper(WebpackModules.getByDisplayName("SwitchItem"));

    class Settings {
        static settings = PluginUtilities.loadSettings(config.info.name, {
            messageCustom: "`$author` **$timestamp**\n> $message",
            channelCustom: "#$name in **$server**",
            categoryCustom: "$name with $channelsCount channels",
            voiceCustom: "**$name** in **$server** with `$usersConnected` connected users.",
            guildCustom: "**$name** with `$members`",
            userCustom: "**$name** - Created at: `$creation`",
            roleCustom: "**$name** - `$colorHEX`",
            showButton: true
        });

        static getSetting(id) {
            return this.settings[id];
        }

        static setSetting(id, value) {
            this.settings[id] = value;
            PluginUtilities.saveSettings(config.info.name, this.settings);
        }
    }

    class Formatter {
        static formatString(string, options) {
            for (const option in options) {
                string = string.replace(new RegExp(`\\$${option}`, "g"), options[option]);
            }

            return string;
        }

        static formatDate(date) {
            return DatesModule.calendarFormat(date);
        }

        static parseSnowFlake(id) {
            return new Date((id / 4194304) + 1420070400000);
        }

        static formatChannelType(type) {
            const string = ChannelTypes[type] ?? "";

            return string.split("_").map(e => e[0].toUpperCase() + e.slice(1)).join(" ");
        }
    }

    class ContextMenu {
        static buildItem(item) {
            if (item.children) {
                if (Array.isArray(item.children)) item.children = this.buildItems(item.children);
                else item.children = this.buildItem(item.children);
            }

            return React.createElement(MenuItem, {
                ...item,
                id: (item.id ? item.id : item.label.toLowerCase().replace(/ /g, "-"))
                    + (item.children ? "" : "-submenu"),
            });
        }

        static buildItems(items) {
            return items.map(e => this.buildItem(e));
        }

        static buildMenu(items) {
            return React.createElement(
                MenuGroup,
                null,
                this.buildItems(items)
            );
        }
    }

    function useKeyState() {
        const [active, setActive] = useState("none");
        useEffect(() => {
            const handleChange = e => {
                setActive(
                    e.ctrlKey && e.shiftKey
                        ? "both"
                        : e.ctrlKey
                            ? "ctrl"
                            : e.shiftKey
                                ? "shift"
                                : "none"
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

    function CopyButton(props) {
        const active = useKeyState();
        const {message} = props;

        return React.createElement(Tooltip, {
            text: active === "none" ? "Copy RAW Message" : "Copy Message (Custom)"
        },
            React.createElement(MiniPopover.Button, {
                onClick: () => {
                    switch (active) {
                        case "none":
                            ElectronModule.copy(message.content);
                            break;
                        case "shift":
                        case "ctrl":
                        case "both":
                            ElectronModule.copy(
                                Formatter.formatString(
                                    Settings.getSetting("messageCustom"),
                                    MessageCopyOptions.reduce((options, option) => {
                                        options[option.name] = option.name === "timestamp"
                                            ? Formatter.formatDate(message.timestamp)
                                            : Utilities.getNestedProp(message, option.prop);
                                        return options;
                                    }, {})
                                )
                            );
                            break;
                    }
                }
            },
                React.createElement(CopyIcon, {
                    fill: active === "none" ? "currentColor" : "#0870f3"
                })
            ));
    }

    function RoleColoredLabel(props) {
        const {color, label} = props;

        return React.createElement("div", {
            className: "roleColoredItem",
            children: [
                React.createElement("span", {
                    style: {background: color},
                }),
                React.createElement("div", {}, label)
            ]
        })
    }

    const Modules = {MemberCountStore, Formatter, VoiceStatesStore, GuildStore, ChannelsStore};

    return class Copier extends Plugin {
        hasCanaryLinks = false;
        css = `
            .roleColoredItem {
                display: flex;
                align-items: center;
            }

            .roleColoredItem span {
                border: 1px solid var(--interactive-muted);
                border-radius: 50%;
                width: 12px;
                height: 12px;
                margin-right: 8px;
            }

            .copr-header {
                display: flex;
                align-items: center;
                color: var(--interactive-normal);
            }
            
            .copr-caret {
                transform: rotate(180deg);
                transition: transform .6s;
                width: 15px;
                height: 20px; 
            }
            
            .copr-caret.opened {
                transform: rotate(270deg);
            }
            
            .copr-contentWrapper {
                padding-top: 5px;
                padding-left: 20px;
            }
            
            .copr-label {
                font-size: 13px;
                text-transform: uppercase;
                font-weight: 700;
                margin-left: 3px;
            }
            
            .copr-replacement {
                display: flex;
                color: #ddd;
            }
            
            .copr-description {
                margin-left: 5px;
            }

            .copr-separator {
                margin: 10px 0;
                background: var(--background-modifier-accent);
                width: 100%;
                height: 1px;
            }

            .copr-button {
                color: #0870f3;
                display: inline-flex;
                margin-left: 5px;
                margin-top: -9px;
            }

            .cpr-buttonContainer {
                display: flex;
                align-items: center;
            }
        `;

        onStart() {
            PluginUtilities.addStyle(config.info.name, this.css);

            Utilities.suppressErrors(this.checkForCanaryLinks.bind(this), "canary links check")();
            Utilities.suppressErrors(this.patchMessageContextMenu.bind(this), "MessageContextMenu patch")();
            Utilities.suppressErrors(this.patchMessageToolbar.bind(this), "MessageToolbar patch")();
            Utilities.suppressErrors(this.patchChannelContextMenu.bind(this), "ChannelContextMenu patch")();
            Utilities.suppressErrors(this.patchCopyIdItem.bind(this), "CopyIdItem patch")();
            Utilities.suppressErrors(this.patchGuildContextMenu.bind(this), "GuildContextMenu patch")();
            Utilities.suppressErrors(this.patchUserContextMenu.bind(this), "UserContextMenu patch")();
            Utilities.suppressErrors(this.patchDeveloperContextMenu.bind(this), "DeveloperContextMenu patch")();
            Utilities.suppressErrors(this.patchUserPopoutProfileText.bind(this), "UserPopoutProfileText patch")();
        }

        checkForCanaryLinks() {
            if (this.hasCanaryLinks) return;
            if (BdApi.Plugins.isEnabled("CanaryLinks")) {
                Logger.log("CanaryLinks plugin found... Use copy method of that.");
                this.hasCanaryLinks = true;
                const oCopyMessageLink = this.copyMessageLink;

                this.copyMessageLink = (guildId, channel, message) => {
                    try {
                        BdApi.Plugins.get("CanaryLinks").instance.copyLink(channel, message);
                    } catch (error) {
                        Logger.error("Failed to use CanaryLinks.copyLink method! Using fallback...\n", error);
                        if (!BdApi.Plugins.isEnabled("CanaryLinks")) this.hasCanaryLinks = false;
                        oCopyMessageLink(guildId, channel, message);
                    }
                }
            }
        }

        patchMessageContextMenu() {
            const MessageContextMenu = findWithDefault(m => m.displayName === "MessageContextMenu");

            Patcher.after(MessageContextMenu, "default", (_, [{message}], ret) => {
                const children = Utilities.getNestedProp(ret, "props.children");
                if (!Array.isArray(children)) return;

                children.splice(4, 0,
                    ContextMenu.buildMenu([
                        {
                            id: "copy-message",
                            label: "Copy",
                            action: () => {
                                ElectronModule.copy(message.id);
                            },
                            children: [
                                {
                                    label: "RAW Content",
                                    id: "copy-message-raw",
                                    action: () => {
                                        ElectronModule.copy(message.content);
                                        Toasts.success("Copied raw message content.");
                                    }
                                },
                                {
                                    label: "Custom Format",
                                    id: "copy-message-custom-format",
                                    action: () => {
                                        ElectronModule.copy(
                                            Formatter.formatString(
                                                Settings.getSetting("messageCustom"),
                                                MessageCopyOptions.reduce((options, option) => {
                                                    options[option.name] = option.getValue({message}, Modules);
                                                    return options;
                                                }, {})
                                            )
                                        );
                                        Toasts.success("Copied message with custom format.");
                                    }
                                },
                                {
                                    label: "Message Link",
                                    id: "copy-message-link",
                                    action: () => {
                                        const channel = ChannelStore.getChannel(message.channel_id);
                                        if (!channel) {
                                            Logger.error("Failed to copy message link!\n", "Message channel cannot be found!");
                                            return Toasts.error("Failed to copy message link!");
                                        }
                                        this.checkForCanaryLinks();
                                        this.copyMessageLink(channel.guild_id, channel, message);
                                        Toasts.success("Copied message link.");
                                    }
                                },
                                {
                                    label: "Id",
                                    id: "copy-message-id",
                                    action: () => {
                                        ElectronModule.copy(message.id);
                                        Toasts.success("Copied message id.");
                                    }
                                }
                            ]
                        }
                    ])
                );
            });
        }

        patchCopyIdItem() {
            const useCopyIdItem = findWithDefault(m => m.displayName === "useCopyIdItem");
            Patcher.after(useCopyIdItem, "default", () => true); // Remove it globally, add it later.

            const useCopyMessageLink = findWithDefault(m => m.displayName === "useMessageCopyLinkItem");
            Patcher.after(useCopyMessageLink, "default", () => null); // Remove it, add it back to custom menu.
        }

        patchMessageToolbar() {
            Patcher.after(MiniPopover, "default", (_, [args], ret) => {
                if (!Settings.getSetting("showButton")) return;
                const props = Utilities.findInTree(args, e => e && e.message);
                if (!props) return;
                const children = Utilities.getNestedProp(ret, "props.children");
                if (!Array.isArray(children)) return;

                const lastChild = children[children.length - 1];
                if (!lastChild || lastChild.type.__patched) return;
                const originalType = lastChild.type;

                lastChild.type = function () {
                    const ret = originalType.apply(this, arguments);

                    try {
                        ret.props.children.unshift(
                            React.createElement(
                                CopyButton,
                                props
                            )
                        );
                    } catch (error) {
                        Logger.error("Could not inject CopyButton:", error);
                    }

                    return ret;
                }

                lastChild.type.__patched = true;
                lastChild._originalFunction = originalType;
            });
        }

        patchChannelContextMenu() {
            const [ChannelListTextChannelContextMenu, , CategoryContextMenu] = WebpackModules.findAll(m => m.default && m.default.displayName === "ChannelListTextChannelContextMenu");
            const ChannelListVoiceChannelContextMenu = findWithDefault(m => m.displayName === "ChannelListVoiceChannelContextMenu");

            Patcher.after(CategoryContextMenu, "default", (_, [props], ret) => {
                const children = Utilities.getNestedProp(ret, "props.children");
                if (!Array.isArray(children)) return;

                const {channel} = props;

                children.splice(
                    children.length - 2,
                    0,
                    ContextMenu.buildMenu([
                        {
                            label: "Copy",
                            id: "copy-category",
                            action: () => {
                                ElectronModule.copy(channel.id);
                            },
                            children: [
                                {
                                    label: "Name",
                                    id: "copy-category-name",
                                    action: () => {
                                        ElectronModule.copy(channel.name);
                                        Toasts.success("Copied category name.");
                                    }
                                },
                                {
                                    label: "Custom Format",
                                    id: "copy-category-custom",
                                    action: () => {
                                        ElectronModule.copy(
                                            Formatter.formatString(
                                                Settings.getSetting("categoryCustom"),
                                                ChannelCategoryCopyOptions.reduce((options, option) => {
                                                    options[option.name] = option.getValue(props, Modules);
                                                    return options;
                                                }, {})
                                            )
                                        );
                                        Toasts.success("Copied category with custom format.");
                                    }
                                },
                                {
                                    label: "Id",
                                    id: "copy-category-id",
                                    action: () => {
                                        ElectronModule.copy(channel.id);
                                        Toasts.success("Copied channel id.");
                                    }
                                }
                            ]
                        }
                    ])
                );
            });

            Patcher.after(ChannelListTextChannelContextMenu, "default", (_, [props], ret) => {
                const children = Utilities.getNestedProp(ret, "props.children");
                if (!Array.isArray(children)) return;

                const {channel} = props;

                children.splice(
                    6,
                    0,
                    ContextMenu.buildMenu([
                        {
                            label: "Copy",
                            id: "copy-channel",
                            action: () => {
                                ElectronModule.copy(channel.id);
                            },
                            children: [
                                {
                                    label: "Name",
                                    id: "copy-channel-name",
                                    action: () => {
                                        ElectronModule.copy(channel.name);
                                        Toasts.success("Copied channel name.");
                                    }
                                },
                                {
                                    label: "Custom Format",
                                    id: "copy-channel-custom",
                                    action: () => {
                                        ElectronModule.copy(
                                            Formatter.formatString(
                                                Settings.getSetting("channelCustom"),
                                                ChannelCopyOptions.reduce((options, option) => {
                                                    options[option.name] = option.getValue(props, Modules);
                                                    return options;
                                                }, {})
                                            )
                                        );
                                        Toasts.success("Copied channel with custom format.");
                                    }
                                },
                                {
                                    label: "Id",
                                    id: "copy-channel-id",
                                    action: () => {
                                        ElectronModule.copy(channel.id);
                                        Toasts.success("Copied channel id.");
                                    }
                                },
                                {
                                    label: "Mention",
                                    id: "copy-channel-mention",
                                    action: () => {
                                        ElectronModule.copy(`<#${channel.id}>`);
                                        Toasts.success("Copied channel mention. (<#channelId>)");
                                    }
                                }
                            ]
                        }
                    ])
                );
            });

            Patcher.after(ChannelListVoiceChannelContextMenu, "default", (_, [props], ret) => {
                const children = Utilities.getNestedProp(ret, "props.children");
                if (!Array.isArray(children)) return;

                const {channel} = props;

                children.push(
                    ContextMenu.buildMenu([
                        {
                            label: "Copy",
                            id: "copy-voice-channel",
                            action: () => {
                                ElectronModule.copy(channel.id);
                            },
                            children: [
                                {
                                    label: "Name",
                                    id: "copy-voice-channel-name",
                                    action: () => {
                                        ElectronModule.copy(channel.name);
                                        Toasts.success("Copied voice channel name.");
                                    }
                                },
                                {
                                    label: "Id",
                                    id: "copy-voice-channel-id",
                                    action: () => {
                                        ElectronModule.copy(channel.id);
                                        Toasts.success("Copied voice channel id.");
                                    }
                                },
                                {
                                    label: "Mention",
                                    id: "copy-voice-channel-mention",
                                    action: () => {
                                        ElectronModule.copy(`<#${channel.id}>`);
                                        Toasts.success("Copied voice channel mention. (<#channelId>)");
                                    }
                                },
                                {
                                    label: "Custom Format",
                                    id: "copy-voice-channel-custom",
                                    action: () => {
                                        ElectronModule.copy(
                                            Formatter.formatString(
                                                Settings.getSetting("voiceCustom"),
                                                VoiceChannelCopyOptions.reduce((options, option) => {
                                                    options[option.name] = option.getValue(props, Modules);
                                                    return options;
                                                }, {})
                                            )
                                        );
                                        Toasts.success("Copied voice channel with custom format.");
                                    }
                                }
                            ]
                        }
                    ])
                );
            });
        }

        copyMessageLink(guild_id, channel, message) {
            ElectronModule.copy(location.protocol + "//" + location.host + Routes.CHANNEL(guild_id, channel.id, message.id));
        }

        patchGuildContextMenu() {
            const GuildContextMenu = findWithDefault(m => m.displayName === "GuildContextMenu");

            Patcher.after(GuildContextMenu, "default", (_, [props], ret) => {
                const children = Utilities.getNestedProp(ret, "props.children");
                if (!Array.isArray(children)) return;

                const {guild} = props;

                children.splice(
                    5,
                    0,
                    ContextMenu.buildMenu([
                        {
                            label: "Copy",
                            id: "copy-guild",
                            action: () => {
                                ElectronModule.copy(guild.id);
                            },
                            children: [
                                {
                                    label: "Name",
                                    id: "copy-guild-name",
                                    action: () => {
                                        ElectronModule.copy(guild.name);
                                        Toasts.success("Copied server name.");
                                    }
                                },
                                {
                                    label: "Custom Format",
                                    id: "copy-guild-custom",
                                    action: () => {
                                        ElectronModule.copy(
                                            Formatter.formatString(
                                                Settings.getSetting("guildCustom"),
                                                GuildCopyOptions.reduce((options, option) => {
                                                    options[option.name] = option.getValue(guild, Modules);
                                                    return options;
                                                }, {})
                                            )
                                        );
                                        Toasts.success("Copied server with custom format.");
                                    }
                                },
                                {
                                    label: "Id",
                                    id: "copy-guild-id",
                                    action: () => {
                                        ElectronModule.copy(guild.id);
                                        Toasts.success("Copied server id.");
                                    }
                                },
                                {
                                    label: "Icon",
                                    id: "copy-guild-icon",
                                    action: () => {
                                        ElectronModule.copy(guild.getIconURL());
                                        Toasts.success("Copied server icon url.");
                                    }
                                }
                            ]
                        }
                    ])
                );
            });
        }

        patchUserContextMenu() {
            const Menus = WebpackModules.findAll(m => m.default?.displayName?.search(/user.*contextmenu/i) > -1);

            for (const Menu of Menus) Patcher.after(Menu, "default", (_, [props], ret) => {
                const children = Utilities.getNestedProp(ret, "props.children.props.children");
                if (!Array.isArray(children)) return;

                const {user} = props;

                children.splice(
                    7,
                    0,
                    ContextMenu.buildMenu([
                        {
                            label: "Copy",
                            id: "copy-user",
                            action: () => {
                                ElectronModule.copy(user.id);
                            },
                            children: [
                                {
                                    label: "Name",
                                    id: "copy-user-name",
                                    action: () => {
                                        ElectronModule.copy(user.username);
                                        Toasts.success("Copied username.");
                                    }
                                },
                                {
                                    label: "Custom Format",
                                    id: "copy-user-custom",
                                    action: () => {
                                        ElectronModule.copy(
                                            Formatter.formatString(
                                                Settings.getSetting("userCustom"),
                                                UserCopyOptions.reduce((options, option) => {
                                                    options[option.name] = option.getValue(user, Modules);
                                                    return options;
                                                }, {})
                                            )
                                        );
                                        Toasts.success("Copied user with custom format.");
                                    }
                                },
                                {
                                    label: "Id",
                                    id: "copy-user-id",
                                    action: () => {
                                        ElectronModule.copy(user.id);
                                        Toasts.success("Copied user id.");
                                    }
                                },
                                {
                                    label: "Avatar Url",
                                    id: "copy-user-avatar",
                                    action: () => {
                                        ElectronModule.copy(user.getAvatarURL("gif"));
                                        Toasts.success("Copied user avatar url.");
                                    }
                                },
                                Menu.default.displayName === "DMUserContextMenu" && {
                                    label: "DM Id",
                                    id: "copy-dm-id",
                                    action: () => {
                                        ElectronModule.copy(ChannelStore.getDMFromUserId(user.id));
                                        Toasts.success("Copied dm channelId of user.");
                                    }
                                }
                            ].filter(Boolean)
                        }
                    ])
                );
            });
        }

        patchDeveloperContextMenu() {
            const Menus = [
                findWithDefault(m => m.displayName === "DeveloperContextMenu"),
                findWithDefault(m => m.displayName === "GuildSettingsRoleContextMenu")
            ];

            for (const ContextMenuType of Menus) Patcher.after(ContextMenuType, "default", (_, [props], ret) => {
                const handleClose = () => {
                    ret?.props?.onClose();
                };

                const role = props.role || (() => {
                    const guild = GuildStore.getGuild(SelectedGuildStore.getGuildId());
                    if (!guild) return handleClose();

                    const role = guild.getRole(props.id);

                    if (!role) return handleClose();

                    return role;
                })();

                const colors = {
                    hex: ColorConverter.int2hex(role.color),
                    int: role.color,
                    rgb: ColorConverter.int2rgba(role.color)
                };

                if (!Array.isArray(ret.props.children)) ret.props.children = [
                    ret.props.children
                ].filter(e => e);

                ret.props.children.push(ContextMenu.buildMenu([
                    {
                        label: "Copy",
                        id: "copy-role",
                        action: () => {
                            ElectronModule.copy(props.id);
                        },
                        children: [
                            {
                                label: "Id",
                                id: "copy-role-id",
                                action: () => {
                                    ElectronModule.copy(role.id);
                                    Toasts.success("Copied role id.");
                                }
                            },
                            {
                                label: "Name",
                                id: "copy-role-name",
                                action: () => {
                                    ElectronModule.copy(role.name);
                                    Toasts.success("Copied role name.");
                                }
                            },
                            {
                                label: "Custom Format",
                                id: "copy-role-custom-format",
                                action: () => {
                                    ElectronModule.copy(
                                        Formatter.formatString(
                                            Settings.getSetting("roleCustom"),
                                            RoleCopyOptions.reduce((options, option) => {
                                                options[option.name] = option.getValue(role, colors);
                                                return options;
                                            }, {})
                                        )
                                    );
                                    Toasts.success("Copied role with custom format.");
                                }
                            },
                            {
                                label: "Mention",
                                id: "copy-role-mention",
                                action: () => {
                                    ElectronModule.copy(`<@&${role.id}>`);
                                    Toasts.success("Copied role mention. (<&roleId>)");
                                }
                            },
                            {
                                label: "Color",
                                id: "copy-role-color",
                                disabled: !role.color,
                                children: [
                                    {
                                        label: () => React.createElement(RoleColoredLabel, {
                                            color: colors.hex,
                                            label: "RGB"
                                        }),
                                        id: "copy-role-color-rgb",
                                        action: () => {
                                            ElectronModule.copy(colors.rgb);
                                            Toasts.success(`Copied role color in <b><span style="color: ${colors.hex}">RGB</span></b> format.`);
                                        }
                                    },
                                    {
                                        label: () => React.createElement(RoleColoredLabel, {
                                            color: colors.hex,
                                            label: "HEX"
                                        }),
                                        id: "copy-role-color-hex",
                                        action: () => {
                                            ElectronModule.copy(colors.hex);
                                            Toasts.success(`Copied role color in <b><span style="color: ${colors.hex}">HEX</span></b> format.`);
                                        }
                                    },
                                    {
                                        label: () => React.createElement(RoleColoredLabel, {
                                            color: colors.hex,
                                            label: "INT"
                                        }),
                                        id: "copy-role-color-int",
                                        action: () => {
                                            ElectronModule.copy(colors.int.toString());
                                            Toasts.success(`Copied role color in <b><span style="color: ${colors.hex}">INT</span></b> format.`);
                                        }
                                    }
                                ]
                            }
                        ]
                    }
                ]));
            });
        }

        patchUserPopoutProfileText() {
            const UserPopoutComponents = WebpackModules.getByProps("UserPopoutProfileText");

            Patcher.after(UserPopoutComponents, "UserPopoutProfileText", (_, [props], ret) => {
                if (!props.userBio) return;
                const header = Utilities.findInReactTree(ret, e => e?.props?.className?.indexOf("aboutMeTitle") > -1);
                if (!header) return;

                const originalType = header.type;
                header.type = (...args) => {
                    const originalChildren = originalType(...args);

                    return React.createElement("div", {
                        className: "cpr-buttonContainer",
                        children: [
                            originalChildren,
                            React.createElement(Tooltip, {
                                className: "copr-button",
                                text: "Copy About me",
                                position: "top",
                                color: TooltipColors.BRAND
                            }, React.createElement(Button, {
                                look: Button.Looks.BLANK,
                                size: Button.Sizes.NONE,
                                onClick: () => {
                                    ElectronModule.copy(props.userBio);
                                    Toasts.success("Successfully copied user bio.");
                                }
                            }, React.createElement(CopyIcon, {
                                width: 14,
                                height: 14
                            })))
                        ]
                    });
                };

            });
        }

        getSettingsPanel() {
            const Caret = props => React.createElement("svg", {...props, viewBox: "0 0 256 512", width: 20, height: 25}, React.createElement("path", {fill: "currentColor", d: "M31.7 239l136-136c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9L127.9 256l96.4 96.4c9.4 9.4 9.4 24.6 0 33.9L201.7 409c-9.4 9.4-24.6 9.4-33.9 0l-136-136c-9.5-9.4-9.5-24.6-.1-34z"}));

            function CollapseCategory(props) {
                const {label, children, opened = false} = props;
                const [isOpened, setOpened] = useState(opened);

                return React.createElement("div", {
                    className: "copr-collapse",
                    children: [
                        React.createElement("div", {
                            className: "copr-header",
                            onClick: () => {
                                setOpened(!isOpened);
                            },
                            children: [
                                Caret({
                                    className: Utilities.className("copr-caret", isOpened && "opened"),
                                }),
                                React.createElement("div", {
                                    className: "copr-label"
                                }, label)
                            ]
                        }),
                        isOpened && React.createElement("div", {
                            className: "copr-contentWrapper"
                        }, children)
                    ]
                });
            }

            const makeCategory = props => {
                const {name, settingsId, customOptions} = props;

                return React.createElement(CollapseCategory, {
                    label: name,
                    key: settingsId,
                    children: [
                        React.createElement(TextInput, {
                            value: Settings.getSetting(settingsId),
                            placeholder: name,
                            onChange: value => {
                                Settings.setSetting(settingsId, value);
                            }
                        }),
                        React.createElement("div", {className: "copr-separator"}),
                        React.createElement(CollapseCategory, {
                            key: settingsId + "-replacements",
                            label: "Show Replacements",
                            children: customOptions.map(opt => [
                                React.createElement("div", {
                                    className: "copr-replacement",
                                    children: [
                                        React.createElement("b", {
                                            className: "copr-name"
                                        }, "$" + opt.name),
                                        React.createElement("div", {
                                            className: "copr-description"
                                        }, opt.description)
                                    ]
                                }),
                                React.createElement("div", {className: "copr-separator"})
                            ])
                        })
                    ]
                });
            };

            function SettingsPanel() {
                return [
                    React.createElement(CollapseCategory, {
                        label: "General",
                        children: [
                            React.createElement(SwitchItem, {
                                note: "Shows a button in the message toolbar to copy a message with two formats.",
                                value: Settings.getSetting("showButton"),
                                onChange: value => {
                                    Settings.setSetting("showButton", value);
                                }
                            }, "Show Button")
                        ]
                    }),
                    React.createElement("div", {className: "copr-separator"}),
                    makeCategory({
                        name: "UserCopy",
                        settingsId: "userCustom",
                        customOptions: UserCopyOptions
                    }),
                    React.createElement("div", {className: "copr-separator"}),
                    makeCategory({
                        name: "MessageCopy",
                        settingsId: "messageCustom",
                        customOptions: MessageCopyOptions
                    }),
                    React.createElement("div", {className: "copr-separator"}),
                    makeCategory(({
                        name: "GuildCopy",
                        settingsId: "guildCustom",
                        customOptions: GuildCopyOptions
                    })),
                    React.createElement("div", {className: "copr-separator"}),
                    makeCategory({
                        name: "ChannelCopy",
                        settingsId: "channelCustom",
                        customOptions: ChannelCopyOptions
                    }),
                    React.createElement("div", {className: "copr-separator"}),
                    makeCategory({
                        name: "ChannelCategoryCopy",
                        settingsId: "categoryCustom",
                        customOptions: ChannelCategoryCopyOptions
                    }),
                    React.createElement("div", {className: "copr-separator"}),
                    makeCategory({
                        name: "VoiceChannelCopy",
                        settingsId: "voiceCustom",
                        customOptions: VoiceChannelCopyOptions
                    }),
                    React.createElement("div", {className: "copr-separator"}),
                    makeCategory({
                        name: "RoleCopy",
                        settingsId: "roleCustom",
                        customOptions: RoleCopyOptions
                    })
                ];
            };

            return React.createElement(SettingsPanel, {});
        }

        onStop() {
            Patcher.unpatchAll();
            PluginUtilities.removeStyle(config.info.name);
        }
    }
};

module.exports = window.hasOwnProperty("ZeresPluginLibrary")
    ? buildPlugin(window.ZeresPluginLibrary.buildPlugin(config))
    : class {
        getName() {return config.info.name;}
        getAuthor() {return config.info.authors.map(a => a.name).join(", ");}
        getDescription() {return `${config.info.description}. __**ZeresPluginLibrary was not found! This plugin will not work!**__`;}
        getVersion() {return config.info.version;}
        load() {
            BdApi.showConfirmationModal(
                "Library plugin is needed",
                [`The library plugin needed for ${config.info.name} is missing. Please click Download Now to install it.`],
                {
                    confirmText: "Download",
                    cancelText: "Cancel",
                    onConfirm: () => {
                        require("request").get("https://rauenzi.github.io/BDPluginLibrary/release/0PluginLibrary.plugin.js", async (error, response, body) => {
                            if (error) return require("electron").shell.openExternal("https://betterdiscord.net/ghdl?url=https://raw.githubusercontent.com/rauenzi/BDPluginLibrary/master/release/0PluginLibrary.plugin.js");
                            await new Promise(r => require("fs").writeFile(require("path").join(BdApi.Plugins.folder, "0PluginLibrary.plugin.js"), body, r));
                        });
                    }
                }
            );
        }
        start() {}
        stop() {}
    };
/*@end@*/
