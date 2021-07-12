import { FormDivider, FormItem, FormText } from "@discord/forms";
import React from "react";
import Settings from "../settings";
import ColorPicker, { defaultColors, resolveColor } from "./colorPicker";
import _ from "lodash";
// @ts-ignore
import Category from "common/components/category";
import createUpdateWrapper from "common/hooks/createUpdateWrapper";
import { WebpackModules } from "@zlibrary";

const SwitchItem = createUpdateWrapper(WebpackModules.getByDisplayName("SwitchItem"));

function SwitchSetting({ id, name, note, defaultValue }) {
    return (
        <SwitchItem
            note={note}
            value={Settings.get(id, defaultValue)}
            onChange={value => Settings.set(id, value)}
        >{name}</SwitchItem>
    );
};

function ColorSetting({ id, name, note, defaultValue }) {
    return (
        <FormItem title={name}>
            <ColorPicker
                value={resolveColor(Settings.get(id, defaultValue))}
                defaultValue={defaultValue}
                onChange={_.debounce(color => Settings.set(id, resolveColor(color)), 300)}
                colors={defaultColors}
            />
            <FormText type="description">{note}</FormText>
            <FormDivider />
        </FormItem>
    );
}

const settingsItems = {
    total: {
        totalColor: {
            name: "Total Unread Color",
            type: "color",
            defaultValue: "#5865F2",
            note: "Color of the unread badge on the home icon."
        },
        showTotalUnreadCount: {
            type: "switch",
            name: "Total Unreads",
            note: "Shows a unread counter of your total unread messages in the dm icon.",
            defaultValue: true
        },
        includeMutedGuildsInTotal: {
            type: "switch",
            name: "Include Muted Guilds",
            note: "Includes the muted count of a guild in the unread count calculation.",
            defaultValue: false
        },
        includeMutedChannelsInTotal: {
            type: "switch",
            name: "Include Muted Channels of Guilds",
            note: "Includes muted channels inside guilds in the unread count calculation.",
            defaultValue: false
        },
        includeDmsInTotal: {
            type: "switch",
            name: "Include DMS",
            note: "Includes direct messages in the unread count calculation.",
            defaultValue: true
        },
        includeGroupsInTotal: {
            type: "switch",
            name: "Include Groups",
            note: "Includes groups in the unread count calculation.",
            defaultValue: true
        },
        includeMutedDms: {
            type: "switch",
            name: "Include Muted DMS",
            note: "Includes muted dms in the unread count calculation.",
            defaultValue: false
        },
        includeMutedGroups: {
            type: "switch",
            name: "Include Muted groups of Guilds",
            note: "Includes muted groups in the unread count calculation.",
            defaultValue: false
        }
    },
    guilds: {
        guildColor: {
            name: "Guild Unread Color",
            type: "color",
            defaultValue: "#5865F2",
            note: "Color of the unread badge on the guild icon."
        },
        showOnGuilds: {
            type: "switch",
            name: "Show on Guilds",
            note: "Shows a unread counter of unread messages on guilds.",
            defaultValue: true
        },
        showMutedGuildUnread: {
            type: "switch",
            name: "Include Muted Guilds",
            note: "Show a unread counter on muted guilds.",
            defaultValue: false
        },
        includeMutedInGuild: {
            type: "switch",
            name: "Include Muted Channels in Guild",
            note: "Includes muted channels inside the guild in the unread count calculation.",
            defaultValue: false
        }
    },
    channels: {
        channelColor: {
            name: "Channel Unread Color",
            type: "color",
            defaultValue: "#5865F2",
            note: "Color of the unread badge on the channel item."
        },
        showOnChannels: {
            type: "switch",
            name: "Show on Channels",
            note: "Shows a unread counter of unread messages on channel items.",
            defaultValue: true
        },
        showMutedChannelUnread: {
            type: "switch",
            name: "Include Muted Channels",
            note: "Show a unread counter on channel items.",
            defaultValue: false
        },
        showMutedChannelWhenSelected: {
            type: "switch",
            name: "Show when selected",
            note: "Shows the unread counter no matter if the channel is muted when it's selected.",
            defaultValue: true
        }
    },
    folders: {
        folderColor: {
            name: "Folder Unread Color",
            type: "color",
            defaultValue: "#5865F2",
            note: "Color of the unread badge on the folders."
        },
        showOnFolders: {
            type: "switch",
            name: "Show on Folders",
            note: "Shows a unread counter of unread messages on folders.",
            defaultValue: true
        },
        includeMutedGuildsInFolders: {
            type: "switch",
            name: "Include Muted Guilds",
            note: "Includes the muted count of a guild in the unread count calculation.",
            defaultValue: false
        },
        includeMutedChannelsInFolders: {
            type: "switch",
            name: "Include Muted Channels of Guilds",
            note: "Includes muted channels inside guilds in the unread count calculation.",
            defaultValue: false
        }
    }
};

export default function SettingsPanel(): React.ReactNode {
    return Object.entries(settingsItems).map(([key, items]) => (
        <Category
            look={Category.Looks.COMPACT}
            label={_.upperFirst(key)}
            key={key}
        >
            {
                Object.entries(items).map(([id, props]) => {
                    switch (props.type) {
                        case "switch": return <SwitchSetting {...props} id={id} key={id} />;
                        case "color": return <ColorSetting {...props} id={id} key={id} />
                    }
                })
            }
        </Category>
    ));
}