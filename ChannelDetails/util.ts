import { ChannelTypes, Permissions } from "@discord/constants";
import { Messages } from "@discord/stores";
import { WebpackModules } from "@zlibrary";
import { PermissionTypes } from "./data/constants";

const BigIntUtils = WebpackModules.getByProps("deserialize", "invert", "has");

export type PermissionId = "CREATE_INSTANT_INVITE" | "KICK_MEMBERS" | "BAN_MEMBERS" | "ADMINISTRATOR" | "MANAGE_CHANNELS" | "MANAGE_GUILD" | "CHANGE_NICKNAME" | "MANAGE_NICKNAMES" | "MANAGE_ROLES" | "MANAGE_WEBHOOKS" | "MANAGE_EMOJIS_AND_STICKERS" | "VIEW_AUDIT_LOG" | "VIEW_CHANNEL" | "VIEW_GUILD_ANALYTICS" | "SEND_MESSAGES" | "SEND_TTS_MESSAGES" | "MANAGE_MESSAGES" | "EMBED_LINKS" | "ATTACH_FILES" | "READ_MESSAGE_HISTORY" | "MENTION_EVERYONE" | "USE_EXTERNAL_EMOJIS" | "ADD_REACTIONS" | "USE_APPLICATION_COMMANDS" | "MANAGE_THREADS" | "USE_PUBLIC_THREADS" | "USE_PRIVATE_THREADS" | "USE_EXTERNAL_STICKERS" | "CONNECT" | "SPEAK" | "MUTE_MEMBERS" | "DEAFEN_MEMBERS" | "MOVE_MEMBERS" | "USE_VAD" | "PRIORITY_SPEAKER" | "STREAM" | "REQUEST_TO_SPEAK" | "MANAGE_EVENTS";

export const hasPermissionOverride = function (perms: {allow: bigint, deny: bigint}, permission: PermissionId) {
    return BigIntUtils.has(perms.allow, Permissions[permission]) || BigIntUtils.has(perms.deny, Permissions[permission]);
};

export const can = function (permissions: bigint, permission: PermissionId) {
    // @ts-ignore
    return ((permissions & Permissions[permission]) == Permissions[permission]) == 1;
};

export const isVoiceChannel = function (channel): boolean {
    return Boolean(~[ChannelTypes.GUILD_VOICE, ChannelTypes.GUILD_STAGE_VOICE].indexOf(channel.type))
};

export const getPermissionOverrides = function (channel: ChannelOject): any {
    // @ts-ignore
    const overrides = channel.permissionOverwrites;
    return Object.keys(overrides)
        .reduce((map, id) => {
            const override = overrides[id];

            if (!hasPermissionOverride(override, "VIEW_CHANNEL")) return map;

            map[PermissionTypes[override.type]].push({
                id: id,
                can: can(override.allow, isVoiceChannel(channel) ? "CONNECT" : "VIEW_CHANNEL"),
                type: PermissionTypes[override.type].slice(0, -1)
            });

            return map;
        }, Object.fromEntries(
            Object.values(PermissionTypes).map(e => [e, []])
        ));
};

export const extractDate = function (id: any): Date | unknown {
    return new Date((id / 4194304) + 1420070400000);
};

export const getLastChannelMessageDate = function (channelId: string) {
    return extractDate(Messages.getMessages(channelId)._array.slice(-1)[0]?.id);
};