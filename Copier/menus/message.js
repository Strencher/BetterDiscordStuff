import {UI, ContextMenu} from "@api";
import Formatter from "../modules/formatter";
import Settings from "../modules/settings";
import {ChannelStore} from "../modules/webpack";
import {copy} from "../modules/utils";

const getMessageLink = (guildId, channelId, messageId, isDM = !!guildId) => 
    isDM
        ? `https://${GLOBAL_ENV.RELEASE_CHANNEL}.discord.com/channels/@me/${channelId}/${messageId}`
        : `https://${GLOBAL_ENV.RELEASE_CHANNEL}.discord.com/channels/${guildId}/${channelId}/${messageId}`    

export const MessageCopyOptions = [
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
        name: "author",
        getValue: ({message}) => message.author.username,
        description: "Will be replaced with the message author's username."
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
        getValue: ({message}) => Formatter.formatDate(message.timestamp),
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
        description: "Will be replaced with the mention of the channel where the message was sent."
    }
];

export default function () {
    return ContextMenu.patch("message", (res, props) => {
        const {message} = props;
        if (!message || !Array.isArray(res?.props?.children)) return res;

        res.props.children.splice(4, 0,
            ContextMenu.buildMenuChildren([
                {type: "separator"},
                {
                    id: "copy-message",
                    label: "Copy",
                    type: "submenu",
                    action: () => {
                        copy(message.id);
                    },
                    items: [
                        // embed && {
                        //     label: "Copy RAW Embed",
                        //     id: "copy-embed-raw",
                        //     action: () => {
                        //         copy(JSON.stringify(embed, null, "\t"));
                        //         UI.showToast("Copied raw embed.", {type: "success"});
                        //     }
                        // },
                        {
                            label: "RAW Content",
                            id: "copy-message-raw",
                            action: () => {
                                copy(message.content);
                                UI.showToast("Copied raw message content.", {type: "success"});
                            }
                        },
                        {
                            label: "Custom Format",
                            id: "copy-message-custom-format",
                            action: () => {
                                copy(
                                    Formatter.formatString(
                                        Settings.get("messageCustom"),
                                        MessageCopyOptions.reduce((options, option) => {
                                            options[option.name] = option.getValue({message});
                                            return options;
                                        }, {})
                                    )
                                );
                                UI.showToast("Copied message with custom format.", {type: "success"});
                            }
                        },
                        {
                            label: "Message Link",
                            id: "copy-message-link",
                            action: () => {
                                const channel = ChannelStore.getChannel(message.channel_id);
                                if (!channel) {
                                    console.error("Failed to copy message link!\n", "Message channel cannot be found!");
                                    return UI.showToast("Failed to copy message link!", {type: "error"});
                                }

                                copy(getMessageLink(channel.guild_id, channel.id, message.id));
                                UI.showToast("Copied message link.", {type: "success"});
                            }
                        },
                        {
                            label: "MessageId",
                            id: "copy-message-id",
                            action: () => {
                                copy(message.id);
                                UI.showToast("Copied message id.", {type: "success"});
                            }
                        }
                    ].filter(Boolean)
                }
            ])
        );
    });
}
