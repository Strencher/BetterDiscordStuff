import {useStateFromStores, useStateFromStoresArray} from "@discord/flux";
import {Status} from "@discord/stores";
import {WebpackModules} from "@zlibrary";
import styles from "./user.scss";
import {Popout} from "@discord/components";
import Settings from "../settings";

const UserUtils = WebpackModules.getByProps("useUserNickAndColor");
const {AnimatedAvatar, Sizes} = WebpackModules.getByProps("AnimatedAvatar") ?? {};
const WindowStore = WebpackModules.getByProps("isFocused", "_dispatchToken");
const UserPopoutContainer = WebpackModules.getModule(m => m.type?.displayName === "UserPopoutContainer");
const RoleIconUtils = WebpackModules.getByProps("useRoleIcon");
const DiscordRoleIcon = WebpackModules.getByDisplayName("RoleIcon");

export function RoleIcon({member, channel, className}) {
    const shouldShow = useStateFromStores([Settings], () => Settings.get("showRoleIcon", true));
    const roleIcon = RoleIconUtils.useRoleIcon({roleId: member.iconRoleId, guildId: channel.guild_id, size: 16});
    
    if (!roleIcon || !shouldShow) return null;

    return (
        <DiscordRoleIcon {...roleIcon} className={className} />
    );
}

export default function TypingUser({channel, user}) {
    const [colorizeName, showAvatar] = useStateFromStoresArray([Settings], () => [
        Settings.get("colorizeName", true),
        Settings.get("showAvatar", true)
    ]);
    const isFocused = useStateFromStores([WindowStore], () => WindowStore.isFocused());
    const member = UserUtils.useUserNickAndColor(user, channel);
    const status = useStateFromStores([Status], () => Status.getStatus(user.id));
    
    return (
        <Popout
            animation={Popout.Animation.TRANSLATE}
            position={Popout.Positions.TOP}
            align={Popout.Align.CENTER}
            renderPopout={props => (
                <UserPopoutContainer
                    {...props}
                    channelId={channel.id}
                    guildId={channel.guild_id}
                    userId={user.id}
                    position="top"
                />
            )}
        >
            {props => (
                <div {...props} className={styles.user}>
                    {showAvatar && <AnimatedAvatar className={styles.avatar} src={user.getAvatarURL(channel.guild_id, 16, isFocused)} size={Sizes.SIZE_16} status={status} isMobile={Status.isMobileOnline(user.id)} />}
                    <span className={styles.name} style={{color: colorizeName && member.colorString}}>{member.nick}</span>
                    <RoleIcon className={styles.roleIcon} channel={channel} member={member} key="role-icon" />
                </div>
            )}
        </Popout>
    );
}