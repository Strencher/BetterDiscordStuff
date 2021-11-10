import {useStateFromStores} from "@discord/flux";
import {WebpackModules} from "@zlibrary";

const Badges = WebpackModules.getByProps("NumberBadge");
const UnreadStore = WebpackModules.getByProps("getUnreadCount");
const MutedStore = WebpackModules.getByProps("getMutedChannels");

export const isChannelMuted = function (guildId: string, channelId: string) {return MutedStore.getMutedChannels(guildId).has(channelId);}

export default function UnreadBadge({channel}) {
    const unreadCount = useStateFromStores([UnreadStore, MutedStore], () => {
        if (isChannelMuted(channel.guild_id, channel.id)) return 0;

        return UnreadStore.getMentionCount(channel.id);
    });
    
    if (unreadCount < 1) return null;

    return (
        <Badges.NumberBadge count={unreadCount} color="#ed4245" />
    );
}