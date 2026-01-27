// @ts-nocheck
import { Button, TooltipContainer } from "@discord/components";
import { ChannelTypes } from "@discord/constants";
import { Menu, MenuGroup, MenuItem } from "@discord/contextmenu";
import { useStateFromStores } from "@discord/flux";
import { FormItem, FormText } from "@discord/forms";
import { ModalCloseButton, ModalContent, ModalHeader } from "@discord/modal";
import { Channels, Guilds, Members, Users } from "@discord/stores";
import { Logger, Utilities, WebpackModules } from "@zlibrary";
import { ElectronModule } from "@zlibrary/discord";
import _ from "lodash";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Keys } from "../data/translations";
import Strings from "../strings";
import { extractDate, getPermissionOverrides } from "../util";
import Copy from "./icons/copy";
import Dropper from "./icons/dropper";
import OverflowMenu from "./icons/overflowMenu";
import Tick from "./icons/tick";
import styles from "./modal.scss";

const Markdown = WebpackModules.getByProps("parseTopic");
const Popout = WebpackModules.getByDisplayName("Popout");
const UnreadStore = WebpackModules.getByProps("getUnreadCount");

export function SpringButton({ children, timeout = 1000 }) {
    const [active, setActive] = useState(false);
    const timeoutRef = useRef(null);

    useEffect(() => {
        if (!active) return;
        if (timeoutRef.current) clearTimeout(timeoutRef.current);

        timeoutRef.current = setTimeout(() => {
            setActive(false);
        }, timeout);
    }, [active, timeoutRef]);

    return children({
        active,
        onClick: setActive.bind(null, true)
    });
};

const renderPermissionItem = function (id: string, guild: GuildObject, type: "user" | "role") {
    const props = {
        user: Users.getUser(id),
        role: guild.getRole(id)
    }[type];

    if (!props) return null;

    const isSelf = type === "role" ? ~Members.getMember(guild.id, Users.getCurrentUser().id)?.roles.indexOf(props.id) : Users.getCurrentUser().id === props.id;

    const renderMoreActionsMenu = function (popoutProps) {
        let ref = null;
        const callback = function ({ target }) {
            if (!ref || ref.contains(target)) return;

            popoutProps.closePopout();
            ref = null;
        };

        const setRef = element => {
            if (!element) document.removeEventListener("click", callback);
            else {
                ref = element;
                setTimeout(() => {
                    document.addEventListener("click", callback);
                }, 100);
            }
        };
        
        return (
            <div ref={setRef}>
                <Menu navId="more-options" onClose={popoutProps.closePopout} style="styleFlexible">
                    <MenuGroup>
                        {type === "role" && props.colorString && <MenuItem
                            icon={() => <Dropper width="14" height="14" />}
                            label={Strings.get("COPY_COLOR")}
                            id="copy-role-color"
                            action={() => ElectronModule.copy(props.colorString)}
                        />}
                        <MenuItem
                            icon={() => <Copy width="18" height="18" />}
                            label={Strings.get("COPY_NAME")}
                            id="copy-name"
                            action={() => ElectronModule.copy(props[type === "user" ? "username" : "name"])}
                        />
                    </MenuGroup>
                </Menu>
            </div>
        );
    };

    return (
        <div className={Utilities.className(styles.permissionItem, isSelf && styles.self)} aria-type={type} style={{ "--color": props.colorString}}>
            <div className={styles.iconContainer}>
                {type === "user"
                    ? <img src={props.getAvatarURL(true, true)} className={styles.avatar} />
                    : <div className={styles.roleCircle} />
                }
                {isSelf && <Tick />}
            </div>
            <div className={styles.name}>{props[type === "user" ? "username" : "name"]}{type === "user" && "#" + props.discriminator}</div>
            {type === "role" && (
                <Popout
                        renderPopout={renderMoreActionsMenu}
                        align="top"
                        spacing={8}
                        position="left"
                        animation="2"
                        onRequestClose={() => true}
                    >
                        {props => (
                            <TooltipContainer className={styles.tooltip} text={Strings.get("MORE_OPTIONS")} position="left">
                                <Button size={Button.Sizes.NONE} look={Button.Looks.BLANK} className={styles.colorCopy} {...props}>
                                    <OverflowMenu />
                                </Button>
                            </TooltipContainer>
                        )}
                    </Popout>
            )}
        </div>
    );
}

const pages = [
    {
        id: "GENERAL",
        name: "GENERAL",
        render: ({ channel, type }: { channel: ChannelOject, type: keyof Keys }) => {
            const renderItem = function (prop: string, value: React.ReactElement | string, copy: string) {
                const title = [
                    prop,
                    copy != null && <SpringButton>
                        {props => {
                            return (
                                <TooltipContainer text={props.active ? Strings.get("COPIED") : Strings.get("COPY")} className={styles.tooltip} hideOnClick={false} color={props.active ? "green" : void 0}>
                                    <Button className={styles.copy} size={Button.Sizes.NONE} look={Button.Looks.BLANK} onClick={_.flow(ElectronModule.copy.bind(ElectronModule, copy), props.onClick)}>
                                        <Copy />
                                    </Button>
                                </TooltipContainer>
                            );
                        }}
                    </SpringButton>
                ];

                return (
                    <FormItem title={title} className={styles.item} key={prop}>
                        <FormText>
                            {typeof value === "string" ? Markdown.parse(value) : value}
                        </FormText>
                    </FormItem>
                );
            };

            const channelType = ChannelTypes[channel.type].split("_").map(_.flow(_.lowerCase, _.upperFirst)).join(" ");
            let lastMessage = extractDate(UnreadStore.lastMessageId(channel.id));
            
            return [
                renderItem(Strings.get("NAME"), channel.name, channel.name),
                renderItem(Strings.get("ID"), channel.id, channel.id),
                type !== "CATEGORY_DETAILS" && renderItem(Strings.get("MENTION"), `<#${channel.id}>`, `<#${channel.id}>`),
                renderItem(Strings.get("CREATED_AT"), `<t:${Math.floor(extractDate(channel.id) / 1000)}:R>`, extractDate(channel.id).toLocaleString()),
                renderItem(Strings.get("POSITION"), channel.position, channel.position),
                type !== "CATEGORY_DETAILS" && renderItem(
                    Strings.get("CATEGORY"),
                    channel.parent_id ? `<#${channel.parent_id}>` : Strings.get("NOT_SPECIFIED") ,
                    channel.parent_id && `<#${channel.parent_id}>`
                ),
                renderItem(Strings.get("NSFW"), channel.nsfw ? Strings.get("YES") : Strings.get("NO"), null),
                type !== "CATEGORY_DETAILS" && channel.type !== ChannelTypes.GUILD_VOICE && renderItem(
                    Strings.get("LAST_MESSAGE_AT"),
                    lastMessage || isNaN(lastMessage) ? `<t:${Math.floor(lastMessage / 1000)}:R>` : Strings.get("NOT_FOUND"),
                    (lastMessage && !isNaN(lastMessage)) && lastMessage.toLocaleString()
                ),
                renderItem(Strings.get("TYPE"), channelType, channelType),
                renderItem(Strings.get("TOPIC"), channel.topic || Strings.get("NOT_SPECIFIED"), channel.topic || null)
            ].filter(Boolean);
        }
    },
    {
        id: "PERMITTED",
        name: "PERMITTED",
        render: ({ channel }) => {
            const overrides = getPermissionOverrides(channel);
            const permitted = [...overrides.users, ...overrides.roles].filter(e => e.can).sort((a, b) => a.type == "user" ? 0 : -1);

            const renderedEnemies = permitted.map(enemy => renderPermissionItem(enemy.id, Guilds.getGuild(channel.guild_id), enemy.type));

            return renderedEnemies.length 
                ? renderedEnemies
                : <p>{Strings.get("NOONE_PERMITTED")}</p>
        }
    },
    {
        id: "DENIED",
        name: "DENIED",
        render: ({ channel }) => {
            const overrides = getPermissionOverrides(channel);
            const permitted = [...overrides.users, ...overrides.roles].filter(e => !e.can).sort(a => a.type == "user" ? 0 : -1);
            const renderedEnemies = permitted.map(enemy => renderPermissionItem(enemy.id, Guilds.getGuild(channel.guild_id), enemy.type));

            return renderedEnemies.length 
                ? renderedEnemies
                : <p>{Strings.get("NOONE_DENIED")}</p>
        }
    }
];

export default function ChannelAccessibilityModal({channelId, onClose, type}) {
    
    const channel: ChannelOject = useStateFromStores([Channels], () => Channels.getChannel(channelId), [channelId]);
    const [selected, setSelected] = useState(pages[0].id);

    const handleChannelSelect = useCallback(id => {
        setSelected(id);
    }, [selected, channel, onClose]);

    const element = useMemo(() => {
        try {
            return pages.find(e => e.id === selected).render({ channel, type });
        } catch (err) {
            Logger.stacktrace(`Failed to render page "${selected}":`, err);
            return "Component Error";
        }
    }, [selected, channel, onClose]);
    
    return (
        <div className={styles.content}>
            <ModalHeader className={styles.header}>
                <div className={styles.title}>
                    <h2>{Strings.get(type)}</h2>
                    <div className={styles.channelName}>{channel.name}</div>
                    <ModalCloseButton onClick={onClose} className={styles.closeButton} />    
                </div>
                <div className={styles.tabItems}>
                    {pages.map(page => (
                        <div className={Utilities.className(styles.tabItem, page.id === selected && styles.selected)} key={page.id} onClick={handleChannelSelect.bind(null, page.id)}>
                            {Strings.get(page.name)}
                        </div>
                    ))}
                </div>
            </ModalHeader>
            <ModalContent className={styles.scroller}>
                {element}
            </ModalContent>
        </div>
    );
}