/// <reference path="../types/main.d.ts" />

import { Logger, Patcher, ReactComponents, ReactTools, Utilities, WebpackModules } from "@zlibrary";
import BasePlugin from "@zlibrary/plugin";
import React from "react";
import { animated, Controller } from "react-spring";
import styles from "./badge.scss";
import stylesheet from "styles";
import Settings from "./settings";
import { ChannelTypes } from "@discord/constants";
import { useStateFromStores } from "@discord/flux";
import ChannelUnreadBadge, {ConnectedUnreadBadge, isChannelMuted} from "./components/unreadBadge";
import BlobContainer from "./components/blobContainer";
import SettingsPanel from "./components/Settings";
import { Guilds, Users } from "@discord/stores";
import {Dispatcher} from "@discord/modules";
import { ActionTypes } from "@discord/constants";

const MutedStore = WebpackModules.getByProps("getMutedChannels");
const UnreadStore = WebpackModules.getByProps("getUnreadCount");
const ChannelsStore = WebpackModules.getByProps("getChannels");
const Badges = WebpackModules.getByProps("NumberBadge");
const GuildChannelsStore = WebpackModules.getByProps("getMutablePrivateChannels");
const FolderStatesStore = WebpackModules.getByProps("isFolderExpanded");
const GuildsBar = WebpackModules.getModule(m => m.default?.type?.toString().indexOf("guildsnav") > -1);

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

        Patcher.before(ChannelItem, "default", (_, [{channel, children, muted, selected}]) => {
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
                    width={(_this.props.unreadBadgeWidth ?? 0) + 8}
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
            if (!UnreadStore.hasUnread(channel.id)) return count;
            if (!includeMutedChannels && isChannelMuted(channel.guild_id, channel.id)) return count;
            if (!includeMutedChannels && (channel.parent_id && isChannelMuted(guildId, channel.parent_id))) return count;

            return count += UnreadStore.getUnreadCount(channel.id);
        }, 0);
    }

    updateGuilds(effect = () => {}) {
        GuildsBar.default = Object.assign({}, GuildsBar.default);

        effect();

        const SettingsStore = WebpackModules.getByProps("getUserAgnosticState", "accessibilitySupportEnabled");
        const desc = Object.getOwnPropertyDescriptor(SettingsStore.constructor.prototype, "darkSidebar");
        const scrollerHook = (() => {
            const values = ["keyboardModeEnabled", "return", "orientation", "scrollToEnd"];
            return WebpackModules.getModule(m => {
                if (typeof m.default !== "function") return false;
                let lastIndex = 0;
                const string = m.default.toString();

                return values.every(str => (lastIndex = string.indexOf(str, lastIndex)) > -1);
            });
        })();
        if (!scrollerHook) return Logger.warn("Could not force update guilds.");
        
        Object.defineProperty(SettingsStore.constructor.prototype, "darkSidebar", {
            ...desc,
            get() {return !desc.get();}
        });


        const original = scrollerHook.default;
        scrollerHook.default = () => ({containerProps: {}});

        SettingsStore.emitChange();

        setTimeout(() => {
            Object.defineProperty(SettingsStore.constructor.prototype, "darkSidebar", desc);
            
            scrollerHook.default = original;
            SettingsStore.emitChange();
        });
    }

    async patchGuild() {
        const Guild = WebpackModules.getModule(m => m?.default?.type?.toString().indexOf("guildJoinRequestStatus") > -1);
        let GuildNode = null;
        let OriginalGuildNode = null;

        const PatchedGuild = (props) => {
            const res = Reflect.apply(OriginalGuildNode, this, [props]);

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

        this.updateGuilds(() => {
            Patcher.after(Guild.default, "type", (_, __, ret) => {
                GuildNode ??= React.memo(PatchedGuild, ret.type.compare);
                OriginalGuildNode ??= ret.type.type;

                ret.type = GuildNode;
            });

            Guild.default = Object.assign({}, Guild.default);
        });
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
                        if (Settings.get("includeDmsInTotal", true) && channel.type === ChannelTypes.DM && (Settings.get("includeMutedDms", false) ? !isChannelMuted(channel.guild_id, channel.id) : true)) {
                            count += UnreadStore.getUnreadCount(channel.id);
                        }
                        if (!Settings.get("includeGroupsInTotal", true) && channel.type === ChannelTypes.GROUP_DM && (Settings.get("includeMutedGroups", false) ? !isChannelMuted(channel.guild_id, channel.id) : true)) {
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
        const FolderHeader = WebpackModules.find(m => m.default && m.default.displayName === "FolderHeader");

        Patcher.after(FolderHeader, "default", (_, [props], res) => {
            Object.assign(res.props, {
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
                maskType: res.type,
                guildIds: props.folderNode?.children?.map(e => e.id) ?? [],
                shouldShow: (unread: number, props: any) => unread > 0 && (props.isFolderExpanded ? Settings.get("showOnExpandedFolders", true) : true),
                isFolderExpanded: FolderStatesStore.isFolderExpanded(props.folderId)
            });

            res.type = BlobMaskWrapper;
        });
    }

    onStop() {
        stylesheet.remove();
        Patcher.unpatchAll();
        if (typeof this.updateGuilds === "function") this.updateGuilds();
        if (typeof this.updateHomeIcon === "function") this.updateHomeIcon();
    }
}