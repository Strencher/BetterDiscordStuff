import { DOM, Patcher, ReactUtils, Utils, Webpack } from "@api";
import showChangelog from "@common/Changelog";
import ErrorBoundary from "@common/ErrorBoundary";
import { Settings } from "@common/Settings";
import manifest from "@manifest";
import Styles from "@styles";
import React from "react";

import StatusIndicators from "./components/indicators";
import SettingsPanel from "./components/settings";
import StatusIndicator, { getUserIdFromAvatar } from "./components/statusIndicator";
import { findInReactTree } from "./modules/utils";

export default class PlatformIndicators {
    getSettingsPanel() {
        return <SettingsPanel />;
    }

    start() {
        Styles.load();
        showChangelog(manifest);
        this.patchDMList();
        this.patchFavorites();
        this.patchStatusIndicator();
        this.patchMemberList();
        this.patchChat();
        this.patchBadges();
        this.patchFriendList();
    }

    async patchDMList() {
        const UserContext = React.createContext(null);
        const ChannelWrapper = Webpack.getWithKey(Webpack.Filters.byStrings("isMobileOnline", "getAnyStreamForUser"), {
            target: await Webpack.waitForModule(Webpack.Filters.bySource("isMobile", 'location:"PrivateChannel"'))
        });
        const NameWrapper = Webpack.getWithKey(m => m?.displayName === "AvatarWithText", {
            target: await Webpack.waitForModule(Webpack.Filters.bySource("AvatarWithText"))
        });
        const ChannelClasses = await Webpack.waitForModule(Webpack.Filters.byKeys("channel", "decorator"));

        let patchedChannelWrapper;
        Patcher.after(...ChannelWrapper, (_, __, res) => {
            if (!patchedChannelWrapper) {
                const originalChannelWrapper = res.type;
                patchedChannelWrapper = function PlatformIndicatorsChannelWrapper(props) {
                    const ret = originalChannelWrapper(props);
                    if (!Settings.get("showInDmsList", true)) return ret;
                    if (!props.user) return ret; // Its a group DM
                    if (Settings.get("ignoreBots", true) && props.user.bot) return ret;

                    return <UserContext.Provider value={props.user}>{ret}</UserContext.Provider>;
                };
            }
            res.type = patchedChannelWrapper;
        });

        const ChannelWrapperElement = document.querySelector(`h2 + .${ChannelClasses.channel}`);
        if (ChannelWrapperElement) {
            const ChannelWrapperInstance = ReactUtils.getOwnerInstance(ChannelWrapperElement);
            if (ChannelWrapperInstance) ChannelWrapperInstance.forceUpdate();
        }

        Patcher.after(...NameWrapper, (_, __, res) => {
            if (!Settings.get("showInDmsList", true)) return;

            const user = React.useContext(UserContext);
            if (!user) return;

            const child = Utils.findInTree(res, e => e?.className?.includes("nameAndDecorators"), {
                walkable: ["children", "props"]
            });
            if (!child) return;

            child.style = { width: "fit-content" };
            child.children.push(<StatusIndicators userId={user.id} type="DMs" />);
        });
    }

    async patchFavorites() {
        const ChannelItem = Webpack.getWithKey(
            Webpack.Filters.byStrings("channelTypeOverride", "isFavoriteSuggestion"),
            {
                target: await Webpack.waitForModule(
                    Webpack.Filters.bySource("channelTypeOverride", "isFavoriteSuggestion", "channel_item")
                )
            }
        );

        const isNameElement = e => e?.props?.children?.props?.channel && "name" in e.props.children.props;

        Patcher.after(...ChannelItem, (_, [{ channel }], res) => {
            if (!Settings.get("showInFavorites", true)) return;
            if (!channel.isDM()) return;

            const name = Utils.findInTree(res, isNameElement, { walkable: ["children", "props"] });
            if (!name) return;

            name.props.children = [
                name.props.children,
                <StatusIndicators userId={channel.getRecipientId()} type="Favorites" />
            ];
        });
    }

    async patchStatusIndicator() {
        const AvatarModule = await Webpack.waitForModule(Webpack.Filters.bySource("AvatarImg", "getMaskId()"));
        const staticAvatarFilter = Webpack.Filters.byStrings("getMaskId()", "statusBackdropColor");
        const StaticAvatar = Object.values(AvatarModule).find(staticAvatarFilter);
        const AnimatedAvatar = Object.values(AvatarModule).find(m =>
            Webpack.Filters.byStrings("fromIsMobile")(m?.type)
        );

        const replaceStatus = (props, res) => {
            if (!Settings.get("showOnAvatars", true)) return;
            if (props.isTyping) return;
            if (res?.props?.children?.type !== "svg") return;

            const userId = getUserIdFromAvatar(props);
            if (!userId) return;

            res.props.children = (
                <ErrorBoundary id="StatusIndicator" mini>
                    <StatusIndicator userId={userId} svg={res.props.children} />
                </ErrorBoundary>
            );
        };

        const AvatarWithStatus = function PlatformIndicatorsAvatarWithStatus(props) {
            const res = StaticAvatar(props);
            replaceStatus(props, res);
            return res;
        };

        const PatchedAvatar = function PlatformIndicatorsAvatar(props) {
            return (
                <ErrorBoundary id="PatchedAvatar" mini>
                    <AvatarWithStatus {...props} />
                </ErrorBoundary>
            );
        };

        Patcher.after(...Webpack.getWithKey(staticAvatarFilter, { target: AvatarModule }), (_, [props], res) =>
            replaceStatus(props, res)
        );

        Patcher.after(AnimatedAvatar, "type", (_, __, res) => {
            if (!Settings.get("showOnAvatars", true)) return;
            res.type = PatchedAvatar;
        });
    }

    async patchMemberList() {
        const MemberItem = Webpack.getWithKey(Webpack.Filters.byStrings("selectedClassName", "listitem"), {
            target: await Webpack.waitForModule(Webpack.Filters.bySource("nameplate:", ".MEMBER_LIST", "listitem"))
        });

        Patcher.after(...MemberItem, (_, [props], ret) => {
            const user = props.avatar.props.user;
            if (ret?.props?.className?.includes("placeholder")) return;
            if (!Settings.get("showInMemberList", true)) return;
            if (Settings.get("ignoreBots", true) && user.bot) return;
            const child = findInReactTree(ret, e => e?.className?.includes("username"));
            if (user && child) {
                child.children = [child.children, <StatusIndicators userId={user.id} type="MemberList" />];
            }
        });
    }

    async patchChat() {
        const ChatUsername = Webpack.getWithKey(Webpack.Filters.byStrings("decorations", "withMentionPrefix"), {
            target: await Webpack.waitForModule(Webpack.Filters.bySource(".guildMemberAvatar&&null!="))
        });

        Patcher.before(...ChatUsername, (_, props) => {
            const mainProps = props[0];
            if (!Settings.get("showInChat", true)) return;
            if (Settings.get("ignoreBots", true) && mainProps?.author?.bot) return;
            if (!mainProps?.decorations) return;
            const target = mainProps.decorations?.[1];
            if (!Array.isArray(target)) mainProps.decorations[1] = target ? [target] : [];
            mainProps.decorations[1].unshift(<StatusIndicators userId={mainProps.message.author.id} type="Chat" />);
        });
    }

    async patchBadges() {
        const BadgeList = Webpack.getWithKey(Webpack.Filters.byStrings("displayProfile", "UserProfileBadgeListRows"), {
            target: await Webpack.waitForModule(Webpack.Filters.bySource("badges", "badgeClassName", ".BADGE"))
        });

        Patcher.after(...BadgeList, (_, [{ displayProfile }], res) => {
            if (!Settings.get("showInBadges", true)) return;
            if (Settings.get("ignoreBots", true) && displayProfile?.application) return;
            if (!displayProfile?.userId) return;
            res?.props.children.push(<StatusIndicators userId={displayProfile.userId} type="Badge" separator />);
        });
    }

    async patchFriendList() {
        const UserInfo = Webpack.getWithKey(
            Webpack.Filters.byStrings("showAccountIdentifier", "overrideDiscriminator"),
            {
                target: await Webpack.waitForModule(
                    Webpack.Filters.bySource("user", "showAccountIdentifier", "overrideDiscriminator")
                )
            }
        );
        const FriendListClasses = await Webpack.waitForModule(Webpack.Filters.byKeys("userInfo", "hovered"));

        if (!Settings.get("showInFriendsList", true)) return;

        DOM.addStyle(
            "PlatformIndicators",
            `
            .${FriendListClasses.discriminator} { display: none; }
            .${FriendListClasses.hovered} .${FriendListClasses.discriminator} { display: unset; }
        `
        );

        Patcher.after(...UserInfo, (_, [{ showAccountIdentifier, user }], res) => {
            // Don't ask me why, but this is only true on the friends list
            if (!showAccountIdentifier) return;
            Patcher.after(res, "type", (_, __, res) => {
                res.props.children.push(<StatusIndicators userId={user.id} type="FriendList" />);
            });
        });
    }

    stop() {
        Patcher.unpatchAll();
        DOM.removeStyle("PlatformIndicators");
        Styles.unload();
    }
}
