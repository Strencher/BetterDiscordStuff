import {ContextMenu, UI} from "@api";
import Formatter from "../modules/formatter";
import Webpack, {GuildStore} from "../modules/webpack";
import ChannelTypes from "../data/channeltypes";
import {copy} from "../modules/utils";
import Settings from "../modules/settings";

const SortedVoiceStateStore = Webpack.getStore("SortedVoiceStateStore");
const GuildChannelStore = Webpack.getStore("GuildChannelStore");

export const ChannelCopyOptions = [
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
        getValue: ({channel}) => Formatter.formatChannelType(channel.type),
        description: "Will be replaced with the type of the channel."
    },
    {
        name: "serverId",
        getValue: ({guild}) => guild.id,
        description: "Will be replaced with the server id."
    },
    {
        name: "server",
        getValue: ({guild}) => guild.name,
        description: "Will be replaced with the server name."
    },
    {
        name: "creation",
        getValue: ({channel}) => Formatter.parseSnowFlake(channel.id).toLocaleString(),
        description: "Will be replaced with the creation date of the channel."
    },
    {
        name: "channelMention",
        getValue: ({channel}) => `<#${channel.id}>`,
        description: "Will be replaced with the mention of the channel."
    }
];

export const VoiceChannelCopyOptions = [
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
        getValue: ({channel}) => Formatter.formatChannelType(channel.type),
        description: "Will be replaced with the type of the voice channel."
    },
    {
        name: "serverId",
        getValue: ({guild}) => guild.id,
        description: "Will be replaced with the server id."
    },
    {
        name: "server",
        getValue: ({guild}) => guild.name,
        description: "Will be replaced with the server name."
    },
    {
        name: "creation",
        getValue: ({channel}) => Formatter.parseSnowFlake(channel.id).toLocaleString(),
        description: "Will be replaced with the creation date of the channel."
    },
    {
        name: "usersConnected",
        getValue: ({channel}) => Object.keys(SortedVoiceStateStore.getVoiceStatesForChannel(channel)).length,
        description: "Will be replaced with the amount of users that are connected to the voice channel."
    },
    {
        name: "channelMention",
        getValue: ({channel}) => `<#${channel.id}>`,
        description: "Will be replaced with the mention of the voice channel."
    }
];

export const ChannelCategoryCopyOptions = [
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
        getValue: ({channel}) => Formatter.formatChannelType(channel.type),
        description: "Will be replaced with the type of the category."
    },
    {
        name: "serverId",
        getValue: ({guild}) => guild.id,
        description: "Will be replaced with the server id."
    },
    {
        name: "server",
        getValue: ({guild}) => guild.name,
        description: "Will be replaced with the server name."
    },
    {
        name: "creation",
        getValue: ({channel}) => Formatter.parseSnowFlake(channel.id).toLocaleString(),
        description: "Will be replaced with the creation date of the category."
    },
    {
        name: "channelMention",
        getValue: ({channel}) => `<#${channel.id}>`,
        description: "Will be replaced with the mention of the category."
    },
    {
        name: "channelsCount",
        getValue: ({channel}) => {
            const channels = Object.values(GuildChannelStore.getSelectableChannels(channel.guild_id)).filter(child => child.parent_id === channel.id);

            return channels.length;
        },
        description: "Will be replaced with the children channels count of that category."
    }
];

const buildTextChannelMenu = function (channel) {
    const guild = GuildStore.getGuild(channel.guild_id);

    return ContextMenu.buildMenuChildren([
        {type: "separator"},
        {
            label: "Copy",
            id: "copy-channel",
            action: () => {
                copy(channel.id);
            },
            type: "submenu",
            items: [
                {
                    label: "Name",
                    id: "copy-channel-name",
                    action: () => {
                        copy(channel.name);
                        UI.showToast("Copied channel name.", {type: "success"});
                    }
                },
                {
                    label: "Custom Format",
                    id: "copy-channel-custom",
                    action: () => {
                        copy(
                            Formatter.formatString(
                                Settings.get("channelCustom"),
                                ChannelCopyOptions.reduce((options, option) => {
                                    options[option.name] = option.getValue({channel, guild});
                                    return options;
                                }, {})
                            )
                        );
                        UI.showToast("Copied channel with custom format.", {type: "success"});
                    }
                },
                {
                    label: "ChannelId",
                    id: "copy-channel-id",
                    action: () => {
                        copy(channel.id);
                        UI.showToast("Copied channel id.", {type: "success"});
                    }
                },
                {
                    label: "Mention",
                    id: "copy-channel-mention",
                    action: () => {
                        copy(`<#${channel.id}>`);
                        UI.showToast("Copied channel mention. (<#channelId>)", {type: "success"});
                    }
                }
            ]
        }
    ]);
};

const buildVoiceChannelMenu = function (channel) {
    const guild = GuildStore.getGuild(channel.guild_id);

    return ContextMenu.buildMenuChildren([
        {type: "separator"},
        {
            label: "Copy",
            id: "copy-voice-channel",
            action: () => {
                copy(channel.id);
            },
            type: "submenu",
            items: [
                {
                    label: "Name",
                    id: "copy-voice-channel-name",
                    action: () => {
                        copy(channel.name);
                        UI.showToast("Copied voice channel name.", {type: "success"});
                    }
                },
                {
                    label: "ChannelId",
                    id: "copy-voice-channel-id",
                    action: () => {
                        copy(channel.id);
                        UI.showToast("Copied voice channel id.", {type: "success"});
                    }
                },
                {
                    label: "Mention",
                    id: "copy-voice-channel-mention",
                    action: () => {
                        copy(`<#${channel.id}>`);
                        UI.showToast("Copied voice channel mention. (<#channelId>)", {type: "success"});
                    }
                },
                {
                    label: "Custom Format",
                    id: "copy-voice-channel-custom",
                    action: () => {
                        copy(
                            Formatter.formatString(
                                Settings.get("voiceCustom"),
                                VoiceChannelCopyOptions.reduce((options, option) => {
                                    options[option.name] = option.getValue({guild, channel});
                                    return options;
                                }, {})
                            )
                        );
                        UI.showToast("Copied voice channel with custom format.", {type: "success"});
                    }
                }
            ]
        }
    ]);
};

const buildCategoryMenu = function (channel) {
    const guild = GuildStore.getGuild(channel.guild_id);

    return ContextMenu.buildMenuChildren([
        {type: "separator"},
        {
            label: "Copy",
            id: "copy-category",
            action: () => {
                copy(channel.id);
            },
            type: "submenu",
            items: [
                {
                    label: "Name",
                    id: "copy-category-name",
                    action: () => {
                        copy(channel.name);
                        UI.showToast("Copied category name.", {type: "success"});
                    }
                },
                {
                    label: "Custom Format",
                    id: "copy-category-custom",
                    action: () => {
                        copy(
                            Formatter.formatString(
                                Settings.get("categoryCustom"),
                                ChannelCategoryCopyOptions.reduce((options, option) => {
                                    options[option.name] = option.getValue({channel, guild});
                                    return options;
                                }, {})
                            )
                        );
                        UI.showToast("Copied category with custom format.", {type: "success"});
                    }
                },
                {
                    label: "CategoryId",
                    id: "copy-category-id",
                    action: () => {
                        copy(channel.id);
                        UI.showToast("Copied channel id.", {type: "success"});
                    }
                }
            ]
        }
    ]);
};

export default function () {
    const builders = {
        [ChannelTypes.GUILD_STAGE_VOICE]: buildVoiceChannelMenu,
        [ChannelTypes.GUILD_CATEGORY]: buildCategoryMenu,
        [ChannelTypes.GUILD_VOICE]: buildVoiceChannelMenu,
        [ChannelTypes.GUILD_TEXT]: buildTextChannelMenu
    };

    return ContextMenu.patch("channel-context", (res, props) => {
        const {channel} = props;

        if (!channel || !Array.isArray(res?.props?.children)) return res;
        
        const menu = (builders[channel.type] ?? buildTextChannelMenu)(channel);
        res.props.children.splice(-1, 0, menu);
    });
}
