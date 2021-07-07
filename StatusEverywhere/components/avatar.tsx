import { useStateFromStoresArray } from "@discord/flux";
import React, { useEffect, useState } from "react";
import { Logger, Popouts } from "@zlibrary";
import { TypingUsers, Status } from "@discord/stores";
import { WebpackModules } from "@zlibrary";
import { ComponentActions } from "@discord/constants";
import { joinClassNames } from "@discord/utils";
import styles from "./avatar.scss";
import Settings from "../settings";

type ComponentDispatcher = {
    subscribe(event: string, listener: (...args: any[]) => any): void;
    unsubscribe(event: string, listener: (...args: any[]) => any): void;
};

const { ComponentDispatch }: { ComponentDispatch: ComponentDispatcher } = WebpackModules.getByProps("ComponentDispatch");
const { Sizes: AvatarSizes, AnimatedAvatar } = WebpackModules.getByProps("AnimatedAvatar");
const { useContextMenuUser } = WebpackModules.getByProps("useContextMenuUser") ?? {useContextMenuUser: () => void 0};

const classes = {
    ...WebpackModules.getByProps("sizeEmoji", "avatar")
};

export default function StatusAvatar(props) {
    const { message: {author: user, channel_id} }: {message: { channel_id: string, author: UserObject }} = props;
    const [shouldAnimate, setAnimate] = useState(false);
    const [status, isMobile, isTyping, shouldShowTyping] = useStateFromStoresArray([TypingUsers, Status, Settings], () => [
        Status.getStatus(user.id),
        Status.isMobileOnline(user.id),
        TypingUsers.isTyping(channel_id, user.id),
        Settings.get("showTyping", true)
    ]);
    
    useEffect(() => {
        const id = ComponentActions.ANIMATE_CHAT_AVATAR(`${props.subscribeToGroupId}:${user.id}`);
        ComponentDispatch.subscribe(id, setAnimate);
        return () => void ComponentDispatch.unsubscribe(id, setAnimate);
    }, [user, props.subscribeToGroupId]);
    
    return (
        <div className="avatarWrapper" data-status={status} data-mobile={isMobile} data-typing={isTyping} data-user-id={user.id}>
            <AnimatedAvatar
                className={joinClassNames(styles.chatAvatar, classes.avatar, classes.clickable)}
                status={status}
                isTyping={shouldShowTyping && isTyping}
                isMobile={isMobile}
                size={AvatarSizes.SIZE_40}
                src={user.getAvatarURL(props.guildId, shouldAnimate)}
                onClick={event => {
                    try {
                        Popouts.showUserPopout(event.target, user);
                    } catch (error) {
                        Logger.error("Failed to open UserPopout:", error);
                    }
                }}
                onContextMenu={useContextMenuUser(user.id, channel_id)}
            />
        </div>
    );
}