/// <reference path="../bdbuilder/typings/main.d.ts" />

import { Logger, Patcher, ReactComponents, ReactTools, Utilities, WebpackModules } from "@zlibrary";
import BasePlugin from "@zlibrary/plugin";
import React from "react";
import { animated, Controller } from "react-spring";
import styles from "./badge.scss";
import stylesheet from "styles";
import Settings from "./settings";
import { ChannelTypes } from "@discord/constants";
import { useStateFromStores } from "@discord/flux";
import ChannelUnreadBadge, {ConnectedUnreadBadge} from "./components/unreadBadge";
import BlobContainer from "./components/blobContainer";
import SettingsPanel from "./components/Settings";
import { Guilds, Users } from "@discord/stores";
import {Dispatcher} from "@discord/modules";
import { ActionTypes } from "@discord/constants";

const MutedStore = WebpackModules.getByProps("isMuted");
const UnreadStore = WebpackModules.getByProps("getUnreadCount");
const ChannelsStore = WebpackModules.getByProps("getChannels");
const Badges = WebpackModules.getByProps("NumberBadge");
const GuildChannelsStore = WebpackModules.getByProps("getMutableGuildChannels");
const FolderStatesStore = WebpackModules.getByProps("isFolderExpanded");

/* Thanks to lighty for figuring this out */
function BlobMaskWrapper(props) {
    const {collector, maskType, shouldShow, color} = props;

    const unreadCount = useStateFromStores([Settings, MutedStore, UnreadStore], collector.bind(null, props));

    const isActive = shouldShow(unreadCount, props);

    props.unreadBadge = isActive ? <ConnectedUnreadBadge color={color} count={unreadCount} /> : null;
    props.unreadBadgeWidth = isActive ? Badges.getBadgeWidthForValue(unreadCount) : null;
    
    return React.createElement(maskType, props);
};

export default class UnreadCountBadges extends BasePlugin {
    guildsClasses: any;

    constructor() {
        super();

        this.guildsClasses = WebpackModules.getByProps("downloadProgressCircle", "guilds");
    }

    updateHomeIcon: Function;
    id = Math.random().toString().slice(2, 10); // :tm:
    settings = Settings;

    getSettingsPanel() {
        const Panel = SettingsPanel as () => JSX.Element;

        return (
            <Panel />
        );
    }

    onStart() {
        stylesheet.inject();
        
        if (!Users.getCurrentUser()) Dispatcher.subscribe(ActionTypes.CONNECTION_OPEN, this.patchAll);
        else this.patchAll(false);
    }

    patchAll = (unsubscribe: boolean) => {
        this.patchBlobMask();
        this.patchGuild();
        this.patchChannelItem();
        this.patchFolder();
        this.patchHomeIcon();

        if (unsubscribe !== false) {
            Dispatcher.unsubscribe(ActionTypes.CONNECTION_OPEN, this.patchAll);
        }
    };

    async patchChannelItem() {
        const ChannelItem = WebpackModules.getModule(m => m?.default?.displayName === "ChannelItem");

        Patcher.after(ChannelItem, "default", (_, [{channel, children, muted, selected}]) => {
            if (!Array.isArray(children) || channel.type == ChannelTypes.GUILD_VOICE) return;
            
            children.push(
                <ChannelUnreadBadge channelId={channel.id} guildId={channel.guild_id} selected={selected} />
            );
        });
    }

    async patchBlobMask() {
        const BlobMask = WebpackModules.getByDisplayName("BlobMask");
        
        const configs = {
            in: {
                friction: 30,
                tension: 900,
                mass: 1
            },
            out: {
                duration: 150,
                friction: 10,
                tension: 100,
                mass: 1
            }
        };

        const ensureMask = _this => {
            if (!_this.state || _this.state.unreadBadgeMask) return;

            _this.state.unreadBadgeMask = new Controller({
                spring: 0
            });
        };

        Patcher.after(BlobMask, "getDerivedStateFromProps", (_, [props, state], res) => {
            if (!props.unreadBadge) return;
            if (!res) res = {
                hasRenderedBadge: false,
                lowerBadgeMask: state.lowerBadgeMask 
                    ? state.lowerBadgeMask.update({spring: props.lowerBadge ? 1 : 0, immediate: true})
                    : new Controller({spring: props.lowerBadge ? 1 : 0, immediate: true}),
                upperBadgeMask: state.upperBadgeMask 
                    ? state.upperBadgeMask.update({spring: props.upperBadge ? 1 : 0, immediate: true})
                    : new Controller({spring: props.upperBadge ? 1 : 0, immediate: true}),
                unreadBadgeMask: null,
                borderRadiusMask: state.borderRadiusMask || new Controller({spring: 0}),
                renderComplex: false
            };
            
            if (!res.unreadBadgeMask) res.unreadBadgeMask = state.unreadBadgeMask ?? new Controller({
                spring: props.unreadBadge ? 1 : 0
            });
            
            if (!res.hasRenderedBadge) {
                res.hasRenderedBadge = Boolean(props.unreadBadge);
                if (!res.renderComplex) res.renderComplex = Boolean(props.unreadBadge);
            }
            
            return res;
        });

        Patcher.after(BlobMask.prototype, "componentDidMount", _this => {
            ensureMask(_this);
            if (_this.state.unreadBadgeMask) {
                _this.state.unreadBadgeMask.update({
                    spring: _this.props.unreadBadge ? 1 : 0,
                    immediate: !document.hasFocus()
                }).start();
            }
        });

        Patcher.after(BlobMask.prototype, "componentDidUpdate", (_this, [prevProps]) => {
            ensureMask(_this);

            if (_this.props.unreadBadge && !prevProps.unreadBadge) {
                if (_this.state.unreadBadgeMask) _this.state.unreadBadgeMask.update({
                    spring: 1,
                    immediate: !document.hasFocus(),
                    config: configs.in
                }).start();
            } else if (!_this.props.unreadBadge && prevProps.unreadBadge) {
                if (_this.state.unreadBadgeMask) _this.state.unreadBadgeMask.update({
                    spring: 0,
                    immediate: !document.hasFocus(),
                    config: configs.out
                }).start();
            }
            // TODO: Checkout if i need to implement that
            // if (_this.state.renderComplex || props.hasOwnProperty("unreadBadge") || !_this.timeout.isStarted())
        });

        Patcher.after(BlobMask.prototype, "componentWillUnmount", _this => {
            if (_this.state.unreadBadgeMask) {
                _this.state.unreadBadgeMask.dispose();
            }
        });


        Patcher.after(BlobMask.prototype, "render", function BlobMaskPatch (_this, _, res) {
            ensureMask(_this);
            if (!_this.state.renderComplex) return;
            const [defs, {props: {children: [, masks]}}, stroke] = Utilities.findInReactTree(res, e => e?.overflow)?.children || [];
            const childTree = Utilities.findInReactTree(res, e => e?.hasOwnProperty?.("transitionAppear"));
            if (!defs || !masks || !stroke || !childTree) return;
            
            const useElement = (
                <use href={"#" + _this.state.maskId + "-unreadBadge"} fill="black" />
            );
                
            const spring = _this.state.unreadBadgeMask.springs.spring;

            const badgeStyle = {
                opacity: spring.to([0, 0.5, 1], [0, 0, 1]),
                transform: spring.to(e => `translate(${26 - 16 * e}px, ${16 - 15 * e})`)
            };

            defs.props.children.push(
                <animated.rect
                    id={_this.state.maskId + "-unreadBadge"}
                    x="-5"
                        y="28"
                        width={_this.props.unreadBadgeWidth + 8}
                        height="24"
                        rx="12"
                        ry="12"
                        transform={_this.getBadgePositionInterpolation(_this.state.unreadBadgeMask)}
                />
            );

            masks.props.children.push(useElement);
            stroke.props.children.push(useElement);
            
            childTree.children.push(_this.props.unreadBadge ? (
                <BlobContainer className={styles.unread} animatedStyle={badgeStyle} key="unreadBadge">
                    {_this.props.unreadBadge}
                </BlobContainer>
            ) : null);
        });
    }

    checkCount(count: number): number {
        return count > 1000
            ? Math.floor(count / 1000) * 1000
            : count;
    }

    getUnreadCountForGuild(guildId: string, includeMutedChannels: boolean): number {
        const channels = ChannelsStore.getChannels(guildId) as {
            SELECTABLE: Array<any>
        };
        if (!Array.isArray(channels.SELECTABLE)) return 0;

        return channels.SELECTABLE.reduce<number>((count, {channel}) => {
            if (!includeMutedChannels && MutedStore.isChannelMuted(channel.guild_id, channel.id)) return count;
            if (!includeMutedChannels && (channel.parent_id && MutedStore.isChannelMuted(guildId, channel.parent_id))) return count;

            return count += UnreadStore.getUnreadCount(channel.id);
        }, 0);
    }

    updateGuilds() {
        const [guilds] = document.getElementsByClassName(this.guildsClasses.guilds);
        if (!guilds) return;
        const instance = ReactTools.getOwnerInstance(guilds);
        if (!instance || !instance.forceUpdate) return;

        instance.forceUpdate();
    }

    async patchGuild() {
        const GuildComponents = WebpackModules.getByProps("HubGuild");

        const PatchedGuild = ({__originalType, ...props}) => {
            const res = Reflect.apply(__originalType, this, [props]);

            try {
                const mask = Utilities.findInReactTree(res, m => m?.props?.hasOwnProperty("lowerBadgeWidth"));
                if (!mask || mask.type === BlobMaskWrapper) return res;

                Object.assign(mask.props, {
                    maskType: mask.type,
                    shouldShow: (unread: number) => unread > 0,
                    collector: ({guildId}) => {
                        if (!Settings.get("showOnGuilds", true)) return 0;
                        if (!Settings.get("showMutedGuildUnread", false) && MutedStore.isMuted(guildId)) return 0;
                
                        return this.checkCount(
                            this.getUnreadCountForGuild(guildId, Settings.get("includeMutedInGuild", false))
                        );
                    },
                    color: "guildColor",
                    guildId: props.guild.id
                });

                mask.type = BlobMaskWrapper;
            } catch (error) {
                Logger.error(error);
            }

            return res;
        }

        Patcher.after(GuildComponents, "default", (_this, __, res) => {
            if (!res || !res.props) return;

            const original = res.type;
            res.props.__originalType = original;
            res.type = PatchedGuild;
        });

        this.updateGuilds();
    }

    async patchHomeIcon() {
        const selector = `.${WebpackModules.getByProps("wrapper", "childWrapper")?.childWrapper}`;
        const TutorialIndicator = await ReactComponents.getComponentByName("TutorialIndicator", selector);
        
        Patcher.after(TutorialIndicator.component.prototype, "render", (_this, _, res) => {
            if (_this.props.tutorialId !== "friends-list") return;

            const mask = Utilities.findInReactTree(res, m => m?.props?.hasOwnProperty("lowerBadgeWidth"));
            if (!mask || mask.type === BlobMaskWrapper) return;

            Object.assign(mask.props, {
                collector: () => {
                    if (!Settings.get("showTotalUnreadCount", true)) return 0;
                    
                    const guilds = Object.values(Guilds.getGuilds()).reduce<number>((count, guild) => {
                        if (!Settings.get("includeMutedGuildsInTotal", false) && MutedStore.isMuted(guild.id)) return count;
    
                        return count += this.getUnreadCountForGuild(guild.id, Settings.get("includeMutedChannelsInTotal", false));
                    }, 0);
    
                    const dms = Object.values(GuildChannelsStore.getMutablePrivateChannels()).reduce((count, channel: any) => {
                        if (Settings.get("includeDmsInTotal", true) && channel.type === ChannelTypes.DM && (Settings.get("includeMutedDms", false) ? !MutedStore.isChannelMuted(channel.guild_id, channel.id) : true)) {
                            count += UnreadStore.getUnreadCount(channel.id);
                        }
                        if (!Settings.get("includeGroupsInTotal", true) && channel.type === ChannelTypes.GROUP_DM && (Settings.get("includeMutedGroups", false) ? !MutedStore.isChannelMuted(channel.guild_id, channel.id) : true)) {
                            count += UnreadStore.getUnreadCount(channel.id);
                        }
                        
                        return count;
                    }, 0) as number;

                    return this.checkCount(guilds + dms);
                },
                color: "totalColor",
                maskType: mask.type,
                shouldShow: (unread: number) => unread > 0
            });

            mask.type = BlobMaskWrapper;
        });

        this.updateHomeIcon = () => TutorialIndicator.forceUpdateAll();
        
        TutorialIndicator.forceUpdateAll();
    }

    async patchFolder() {
        const FolderIcon = WebpackModules.getModule(m => m?.type?.render?.toString().indexOf("folderColor") > -1).type;

        Patcher.after(FolderIcon, "render", (_, [props], res) => {
            const mask = Utilities.findInReactTree(res, e => e?.props?.hasOwnProperty("lowerBadgeWidth"));
            if (!mask || mask.type === BlobMaskWrapper) return;
            
            Object.assign(mask.props, {
                collector: ({ guildIds }) => {
                    if (!Settings.get("showOnFolders", true)) return 0;

                    return this.checkCount(
                        guildIds.reduce((count: number, id: string) => {
                            if (!Settings.get("includeMutedGuildsInFolders", false) && MutedStore.isMuted(id)) return count;
    
                            return count += this.getUnreadCountForGuild(id, Settings.get("includeMutedChannelsInFolders", false));
                        }, 0)
                    );
                },
                color: "folderColor",
                maskType: mask.type,
                guildIds: props.guildIds,
                shouldShow: (unread: number, props: any) => unread > 0 && (props.isFolderExpanded ? Settings.get("showOnExpandedFolders", true) : true),
                isFolderExpanded: FolderStatesStore.isFolderExpanded(props.folderId)
            });

            mask.type = BlobMaskWrapper;
        });
    }

    onStop() {
        stylesheet.remove();
        Patcher.unpatchAll();
        if (typeof this.updateGuilds === "function") this.updateGuilds();
        if (typeof this.updateHomeIcon === "function") this.updateHomeIcon();
    }
}