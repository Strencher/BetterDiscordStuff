import { useStateFromStoresArray } from "@discord/flux";
import React, { useEffect, useState } from "react";
import { Logger, Popouts } from "@zlibrary";
import { TypingUsers, Status, SelectedChannels, SelectedGuilds } from "@discord/stores";
import { WebpackModules } from "@zlibrary";
import { ComponentActions, AVATAR_SIZE, MEDIA_PROXY_SIZES } from "@discord/constants";
import { joinClassNames } from "@discord/utils";
import { WarningCircle } from "@discord/icons";
import styles from "./avatar.scss";
import Settings from "../settings";
import _ from "lodash";
// @ts-ignore
import ErrorBoundary from "common/components/errorboundary";
import { TooltipContainer } from "@discord/components";

type ComponentDispatcher = {
    subscribe(event: string, listener: (...args: any[]) => any): void;
    unsubscribe(event: string, listener: (...args: any[]) => any): void;
};

const { ComponentDispatch }: { ComponentDispatch: ComponentDispatcher } = WebpackModules.getByProps("ComponentDispatch");
const { Sizes: AvatarSizes, AnimatedAvatar } = WebpackModules.getByProps("AnimatedAvatar");
const { useContextMenuUser } = WebpackModules.getByProps("useContextMenuUser") ?? { useContextMenuUser: () => void 0 };
const StatusModule = WebpackModules.getByProps("getStatusColor");
const Members = WebpackModules.getByProps("subscribeMembers");
const ActivityUtils = WebpackModules.getByProps("isStreaming");
const Popout = WebpackModules.getByDisplayName("Popout");
const UserPopoutContainer = WebpackModules.getModule(m => m.type?.displayName === "UserPopoutContainer");
const ActivityStore = WebpackModules.getByProps("getActivities");

function isStreaming(userId: string) {
    const activities = ActivityStore.getActivities(userId);

    return ActivityUtils.isStreaming(activities);
};

let guilds = {};
function reloadSubscriptions(guildId: string, userId: string, type = "add") {
    if (type === "add" && guilds[guildId].has(userId)) return;
    
    _.forEach(guilds, (users: Set<string>, guildId: string) => {
        if (!users.size) return;
        Members.unsubscribeMembers(guildId, Array.from(users));
    });
    
    if (type === "add") {
        guilds[guildId].add(userId);
    } else if (type === "remove") {
        guilds[guildId].delete(userId);
    }

    if (type === "add") _.forEach(guilds, (users: Set<string>, guildId: string) => {
        if (!users.size) return;
        Members.subscribeMembers(guildId, Array.from(users));
    });
}

function useSubscribeGuildMembers(guildId: string, userId: string, shouldWatch: boolean) {
    if (!guilds[guildId]) guilds[guildId] = new Set();
    
    useEffect(() => {
        if (!shouldWatch) return;

        reloadSubscriptions(guildId, userId, "add");

        const remove = function () {
            reloadSubscriptions(guildId, userId, "remove");
        };

        return remove;
    }, [guildId, userId, shouldWatch]);
}

const classes = {
    ...WebpackModules.getByProps("sizeEmoji", "avatar")
};

type StatusAvatarProps = {
    type: "chat" | "voice-user" | "user-popout"
    animated: boolean,
    user: UserObject,
    channel_id: string,
    size: string | {
        value: string;
        id: string;
    };
    showTyping: {
        value: boolean;
        id: string;
    },
    radial: {
        value: boolean;
        id: string;
    }
    resolution?: {
        value: number;
        id: string;
    }
    shouldWatch: boolean;
    AvatarComponent: any;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
    shouldShowUserPopout?: boolean;
};

function StatusAvatar(props) {
    const {
        type,
        animated = false,
        size = AvatarSizes.SIZE_40,
        user,
        channel_id = SelectedChannels.getChannelId(),
        radial: radialConfig,
        showTyping,
        shouldWatch = true,
        AvatarComponent = AnimatedAvatar,
        onMouseEnter,
        onMouseLeave,
        shouldShowUserPopout,
        resolution
    }: StatusAvatarProps = props;
    if (!user) {
        Logger.warn("No user provided");
        return null;
    }
    const [shouldAnimate, setAnimate] = useState(animated);
    const [hasUserPopout, setUserPopout] = useState(false);
    const streaming = isStreaming(user.id);
    const [status, isMobile, isTyping, statusColor, radial, forceLoadStatus, res] = useStateFromStoresArray([TypingUsers, Status, Settings], () => [
        streaming ? "streaming" : Status.getStatus(user.id),
        Status.isMobileOnline(user.id),
        TypingUsers.isTyping(channel_id, user.id) && Settings.get(showTyping?.id, showTyping?.value ?? false) && showTyping,
        StatusModule.getStatusColor(streaming ? "streaming" : Status.getStatus(user.id)),
        Settings.get(radialConfig?.id, radialConfig?.value),
        Settings.get("forceLoadStatus", true),
        Settings.get(resolution?.id, resolution?.value) ?? 56
    ]);

    try {
        useSubscribeGuildMembers(SelectedGuilds.getGuildId(), user.id, SelectedGuilds.getGuildId() != null && shouldWatch && forceLoadStatus);
    } catch (error) {
        Logger.error("Error while subscribing to guild member events:\n", error);
    }
    
    useEffect(() => {
        if (shouldAnimate === animated) return;

        try {
            setAnimate(animated);
        } catch (error) {
            Logger.error("Error while setting 'animated' state:\n", error);
        }
    }, [animated]);

    useEffect(() => {
        if (props.type !== "chat") return;
        try {
            const id = ComponentActions.ANIMATE_CHAT_AVATAR(`${props.subscribeToGroupId}:${user.id}`);
            ComponentDispatch.subscribe(id, setAnimate);
            return () => void ComponentDispatch.unsubscribe(id, setAnimate);
        } catch (error) {
            Logger.error("Error while subscribing to ChatAvatarAnimate:\n", error);
        }
    }, [user, props.subscribeToGroupId]);

    const onContextMenu = useContextMenuUser(user.id, channel_id);
    
    return (
        // @ts-ignore
        <div onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} className={joinClassNames("avatarWrapper", {[styles.radial]: radial, [styles.userPopout]: type === "user-popout"})} data-status={status} data-mobile={isMobile} data-typing={isTyping} data-user-id={user.id} style={{
            // @ts-ignore
            "--status-color": statusColor
        }}>
            <Popout
                renderPopout={props => (
                    <UserPopoutContainer
                        {...props}
                        userId={user.id}
                        channelId={channel_id}
                        guildId={SelectedGuilds.getGuildId()}
                    />
                )}
                animation={Popout.Animation.TRANSLATE}
                position={Popout.Positions.RIGHT}
                shouldShow={hasUserPopout && shouldShowUserPopout}
                onRequestOpen={() => setUserPopout(true)}
                onRequestClose={() => setUserPopout(false)}
            >
                {popoutProps => (
                    <AvatarComponent
                        {...popoutProps}
                        onClick={setUserPopout.bind(null, !hasUserPopout)}
                        statusTooltip
                        statusColor={statusColor}
                        className={joinClassNames(styles.chatAvatar, type === "chat" ? [classes.avatar, classes.clickable] : null, props.className, {
                            [styles.speaking]: props.isSpeaking,
                        })}
                        status={status}
                        isTyping={isTyping}
                        isMobile={isMobile}
                        size={size}
                        src={user.getAvatarURL(props.guildId, res, shouldAnimate)}
                        onContextMenu={onContextMenu}
                    />
                )}
            
            </Popout>
        </div>
    );
};

StatusAvatar.Sizes = AvatarSizes;

export default ErrorBoundary.from(StatusAvatar, "StatusEverywhere", () => (
    <TooltipContainer text="Component Error">
        <WarningCircle color="#f04747" />
    </TooltipContainer>
));