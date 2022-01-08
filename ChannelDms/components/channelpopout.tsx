import {Guilds, Users, Status} from "@discord/stores";
import {ReactComponents, WebpackModules} from "@zlibrary";
import React, {useCallback, useContext, useEffect, useMemo, useRef} from "react";
import wrapPromise from "./asynccomponent";
import styles from "./channelpopout.scss";
import {At, People, Caret} from "@discord/icons";
import {ChannelTypes} from "@discord/constants";
import Settings from "../settings";
import {useStateFromStores} from "@discord/flux";
import createStore from "common/hooks/zustand";
import {Tooltip} from "@discord/components";

const classes = WebpackModules.getByProps("chatContent");
const ChannelChat = wrapPromise(
    ReactComponents.getComponentByName("ChannelChat", "." + classes?.chatContent).then(res => res.component),
    () => <p>Loading...</p>
);
const ChannelContext = React.createContext(null);
const StatusIcon = WebpackModules.getByDisplayName("FluxContainer(Status)");
const CallButtons = WebpackModules.getByDisplayName("ConnectedPrivateChannelCallButtonSubscribed") ?? WebpackModules.getByDisplayName("ConnectedPrivateChannelCallButton");
const FormatPlaceholder = WebpackModules.getModule(m => m?.toString().indexOf("TEXTAREA_PLACEHOLDER") > -1);
const RemoveButton = WebpackModules.getByDisplayName("RemoveButton");
const ChannelNameUtils = WebpackModules.getByProps("computeChannelName");
const RepliesStore = WebpackModules.getByProps("getPendingReply");
const Button = WebpackModules.getModule(e => "DropdownSizes" in e && typeof (e) === "function");
const join = (...classNames) => classNames.filter(Boolean).join(" ");

const [useCollapsedStore, Api] = createStore({collapsed: {}}); 

export function HeaderBar() {
    const channel: Channel = useContext(ChannelContext);

    return (
        <div className={styles.header}>
            <div className={styles.headerTag}>
                <div className={styles.channelIcon}>
                    {channel.type === ChannelTypes.GROUP_DM
                        ? <People />
                        : <At />
                    }
                </div>
                <div className={styles.headerName}>
                    {channel.type === ChannelTypes.GROUP_DM
                        ? ChannelNameUtils.default(channel)
                        : Users.getUser(channel.getRecipientId() as string)?.username
                    }
                </div>
                {channel.type !== ChannelTypes.GROUP_DM && (
                    <StatusIcon size={10} userId={channel.getRecipientId()} position="bottom" isMobile={Status.isMobileOnline(channel.getRecipientId() as string)} className={styles.headerStatus} />
                )}
            </div>
            <div className={styles.buttons}>
                <CallButtons channel={channel} />
            </div>
        </div>
    );
};

export function CollapseButton({state, onClick}) {
    
    return (
        <Tooltip text={state ? "Expand" : "Collapse"} position="top">
            {props => (
                <Button {...props} look={Button.Looks.BLANK} size={Button.Sizes.ICON} className={styles.collapseButton} onClick={onClick}>
                    <Caret direction={state ? Caret.Directions.LEFT : Caret.Directions.RIGHT} />
                </Button>
            )}
        </Tooltip>
    );
};

export default function ChannelPopout({channel, onClose}) {
    const guild = useMemo(() => Guilds.getGuild(channel?.guild_id), [channel]);
    const ref = useRef<HTMLDivElement>();
    const pendingReply = useStateFromStores([RepliesStore], () => RepliesStore.getPendingReply(channel.id));
    const closeOnOuterClick = useStateFromStores([Settings], () => Settings.get("closeOnOuterClick", true));
    const isCollapsed = useCollapsedStore(state => Boolean(state.collapsed[channel.id]));

    const collapse = useCallback((value: boolean) => {
        Api.setState(state => {
            if (value) {
                state.collapsed[channel.id] = true;
            } else {
                delete state.collapsed[channel.id];
            }

            return {...state};
        });
    }, [isCollapsed]);

    useEffect(() => {
        const listener = (event: any) => {
            if (!event.target || !ref.current || !closeOnOuterClick) return;
            if (event.target === ref.current || ref.current.contains(event.target)) return;

            onClose();
        };
        document.body.classList.add("mouse-mode");
        document.addEventListener("click", listener);

        return () => {
            document.body.classList.remove("mouse-mode");
            document.removeEventListener("click", listener);
        };
    }, [ref, closeOnOuterClick]);

    return (
        <ChannelContext.Provider value={channel}>
            <div className={join(styles.popout, isCollapsed && styles.collapsed)} ref={ref}>
                <RemoveButton
                    onClick={onClose}
                    className={styles.removeButton}
                />
                <CollapseButton state={isCollapsed} onClick={() => {
                    collapse(!isCollapsed);
                }} />
                <div className={styles.content}>
                    <HeaderBar />
                    <ChannelChat
                        channel={channel}
                        guild={guild}
                        textareaType="sidebar"
                        placeholder={FormatPlaceholder(channel)}
                        pendingReply={pendingReply}
                    />
                </div>
            </div>
        </ChannelContext.Provider>
    );
};