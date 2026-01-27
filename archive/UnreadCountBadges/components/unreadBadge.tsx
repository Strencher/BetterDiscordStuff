import { Colors } from "@discord/constants";
import { useStateFromStores } from "@discord/flux";
import { WebpackModules } from "@zlibrary";
import Settings from "../settings";
import styles from "../badge.scss";

const Badges = WebpackModules.getByProps("NumberBadge");
const UnreadStore = WebpackModules.getByProps("getUnreadCount");
const MutedStore = WebpackModules.getByProps("getMutedChannels");

export const isChannelMuted = function (guildId: string, channelId: string) {return MutedStore.getMutedChannels(guildId).has(channelId);}

export function ConnectedUnreadBadge(props) {
    const color = useStateFromStores([Settings], () => Settings.get(props.color, "#5865F2"));

    return (
        <Badges.NumberBadge {...props} color={color} />
    );
};

export default function ChannelUnreadBadge({channelId, guildId, selected}) {
    const unreadCount = useStateFromStores([UnreadStore, Settings], () => {
        if (!UnreadStore.hasUnread(channelId)) return 0;
        if (!Settings.get("showOnChannels", true)) return 0;
        if ((!Settings.get("showMutedChannelUnread", false) && isChannelMuted(guildId, channelId)) && Settings.get("showMutedChannelWhenSelected", true) ? !selected : false) return 0;
        
        return UnreadStore.getUnreadCount(channelId);
    });
    if (unreadCount === 0) return null;

    return (
        <ConnectedUnreadBadge color="channelColor" count={unreadCount} className={styles.channelUnread} />
    );
}