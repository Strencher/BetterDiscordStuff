import { Tooltip } from "@discord/components";
import { Guilds } from "@discord/stores";
import { DCM, Logger, Patcher, ReactComponents, Utilities, WebpackModules } from "@zlibrary";
import BasePlugin from "@zlibrary/plugin";
import ChannelTooltip from "./components/tooltip";
import Strings from "./strings";
import { getPermissionOverrides } from "./util";
import styles from "styles";
import style from "./components/tooltip.scss";
import { ModalRoot, openModal } from "@discord/modal";
import ChannelDetailsModal from "./components/modal";
import { MenuGroup, MenuItem, MenuSeparator } from "@discord/contextmenu";
import { Keys } from "./data/translations";
import { useStateFromStoresArray } from "@discord/flux";
import _ from "lodash";
import { ChannelTypes, Permissions } from "@discord/constants";
import { PermissionTypes } from "./data/constants";

const GuildPermissions = WebpackModules.getByProps("getGuildPermissions");

const shouldShowPermissions = function (channel) {
    if (!channel) return false;
    const overrides = getPermissionOverrides(channel);
    return overrides?.roles?.length > 0 || overrides?.users?.length > 0;
}

export default class ChannelDetails extends BasePlugin {
    public onStart(): void {
        this.patchTextChannel();
        this.patchChannelContextMenu();
        this.patchActiveThreadsPopout();
        this.patchVoiceChannel();
        this.patchVoiceChannelActivities();

        Strings.init();
        styles.inject();
    }

    async patchVoiceChannelActivities() {
        const Scroller = WebpackModules.getByProps("thin", "scrollerBase");
        const ActivityPopout = WebpackModules.getByProps("partyMembers", "container", "activity");
        const VoiceChannelActivities = WebpackModules.getModule(m => m?.default?.displayName === "VoiceChannelActivities");

        Patcher.after(VoiceChannelActivities, "default", (_, [props], ret) => {
            if (!props.channel) return;
            const overrides = getPermissionOverrides(props.channel);
            if (!Object.values(PermissionTypes).some(prop => overrides[prop]?.length > 0)) return ret;

            if (ret) {
                ret.props.children.unshift(
                    <ChannelTooltip overrides={overrides} guild={Guilds.getGuild(props.channel.guild_id)} className="voiceActivities" />,
                    <div className={style.divider} />
                );
            } else {
                return (
                    <div className={`${ActivityPopout.container} ${Scroller.thin}`}>
                        <ChannelTooltip overrides={overrides} guild={Guilds.getGuild(props.channel.guild_id)} className="voiceActivities" />
                    </div>
                );
            }
        });
    }

    async patchVoiceChannel() {
        const selector = `.${WebpackModules.getByProps("containerDefault", "containerDragAfter")?.containerDefault}`
        const VoiceChannel = await ReactComponents.getComponentByName("VoiceChannel", selector);

        Patcher.after(VoiceChannel.component.prototype, "render", (_this, _, returnValue) => {
            const shouldShow = shouldShowPermissions(_this.props.channel);
            const props = Utilities.findInReactTree(returnValue, e => e?.renderPopout);
            
            if (shouldShow) {
                returnValue.props.onMouseEnter = _this.handleMouseEnter;
                returnValue.props.onMouseLeave = _this.handleMouseLeave;
            }

            if (_this.state.shouldShowActivities && shouldShow) {
                if (props) props.shouldShow = true;
            }
        });

        VoiceChannel.forceUpdateAll();
    }

    async patchTextChannel(): Promise<void> {
        const selector = `.${WebpackModules.getByProps("containerDefault", "containerDragAfter")?.containerDefault}`
        const TextChannel = await ReactComponents.getComponentByName("TextChannel", selector);

        Patcher.after(TextChannel.component.prototype, "render", (_this, _, returnValue) => {
            const shouldShow = shouldShowPermissions(_this.props.channel);
            
            if (shouldShow) {
                returnValue.props.onMouseEnter = _this.handleMouseEnter;
                returnValue.props.onMouseLeave = _this.handleMouseLeave;
            }

            if (_this.state.shouldShowThreadsPopout && shouldShow) {
                returnValue.props.children.props.shouldShow = true;
            }
        });

        TextChannel.forceUpdateAll();
    }

    async patchActiveThreadsPopout() {
        const ActiveThreadsPopout = WebpackModules.getModule(m => m?.default?.displayName === "ActiveThreadsPopout");
        const UnreadStore = WebpackModules.getByProps("getUnreadCount");
        const ThreadsStore = WebpackModules.getByProps("getActiveUnjoinedThreadsForParent");
        const SnowflakeUtils = WebpackModules.getByProps("extractTimestamp");

        function useActiveThreads(channel) {
            if (channel.type === ChannelTypes.GUILD_VOICE) return [];

            return useStateFromStoresArray([UnreadStore, ThreadsStore, GuildPermissions], () => {
                return _(ThreadsStore.getActiveUnjoinedThreadsForParent(channel.guild_id, channel.id))
                    .values()
                    .filter(thread => GuildPermissions.can(Permissions.VIEW_CHANNEL, thread))
                    .sort((a, b) => {
                        const lastMessageInA = UnreadStore.lastMessageId(a.id);
                        const lastMessageInB = UnreadStore.lastMessageId(b.id);

                        return SnowflakeUtils.compare(lastMessageInA, lastMessageInB);
                    }).reverse().value();
            });
        }

        function PatchedThreadsPopout(props) {
            const { children, className, channel } = props;
            const threads = useActiveThreads(channel);

            const ret = (
                <div className={className}>
                    {shouldShowPermissions(channel) && <ChannelTooltip overrides={getPermissionOverrides(channel)} guild={Guilds.getGuild(channel.guild_id)} className="threads" />}
                    {threads.length ? <>{children}</> : null}
                </div>
            );
            // console.log(ret);
            return ret;
        };

        Patcher.after(ActiveThreadsPopout, "default", (_, [props], ret) => {
            ret.type = PatchedThreadsPopout;
            Object.assign(ret.props, props);
        });
    }

    public openModal(channel: ChannelObject, type: keyof Keys) {
        openModal(props => (
            <ModalRoot {...props} size="medium">
                <ChannelDetailsModal channelId={channel.id} onClose={props.onClose} type={type} />
            </ModalRoot>
        ));
    }

    async patchChannelContextMenu() {
        const ChannelEditItem = await DCM.getDiscordMenu("useChannelEditItem");

        const getType = function (channel: ChannelObject): "CATEGORY_DETAILS" | "CHANNEL_DETAILS" {
            switch (channel.type) {
                case ChannelTypes.GUILD_CATEGORY: return "CATEGORY_DETAILS";

                default: return "CHANNEL_DETAILS";
            }
        };

        Patcher.after(ChannelEditItem, "default", (_, [channel], ret) => {
            const type = getType(channel);

            return [
                <MenuItem
                    key={type}
                    id="channel-details"
                    label={Strings.get(type)}
                    action={() => {
                        this.openModal(channel, type);
                    }}
                />,
                ret
            ];
        });
    }
    
    public onStop(): void {
        Strings.shutdown();
        styles.remove();
        Patcher.unpatchAll();
    }
}