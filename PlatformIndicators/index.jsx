import { DOM, Patcher, ReactUtils, Utils, Webpack } from "@api";
import showChangelog from "@common/Changelog";
import { Settings } from "@common/Settings";
import manifest from "@manifest";
import Styles from "@styles";
import React from "react";

import StatusIndicators from "./components/indicators";
import SettingsPanel from "./components/settings";
import { findInReactTree } from "./modules/utils";

export default class PlatformIndicators {
    getSettingsPanel() {
        return <SettingsPanel />;
    }

    start() {
        Styles.load();
        showChangelog(manifest);
        this.patchDMList();
        this.patchMemberList();
        this.patchChat();
        this.patchBadges();
        this.patchFriendList();
    }

    async patchDMList() {
        const UserContext = React.createContext(null);
        const ChannelWrapper = await Webpack.waitForModule(
            Webpack.Filters.bySource('location:"PrivateChannel",', "isMobile")
        );
        const NameWrapper = (await Webpack.waitForModule(Webpack.Filters.bySource("AvatarWithText"))).A;
        const ChannelClasses = await Webpack.waitForModule(Webpack.Filters.byKeys("channel", "decorator"));

        Patcher.after(ChannelWrapper, "Ay", (_, __, res) => {
            if (!Settings.get("showInDmsList", true)) return;
            Patcher.after(res, "type", (_, [props], res) => {
                if (!props.user) return; // Its a group DM
                if (Settings.get("ignoreBots", true) && props.user.bot) return;

                return <UserContext.Provider value={props.user}>{res}</UserContext.Provider>;
            });
        });

        const ChannelWrapperElement = document.querySelector(`h2 + .${ChannelClasses.channel}`);
        if (ChannelWrapperElement) {
            const ChannelWrapperInstance = ReactUtils.getOwnerInstance(ChannelWrapperElement);
            if (ChannelWrapperInstance) ChannelWrapperInstance.forceUpdate();
        }

        Patcher.after(NameWrapper, "render", (_, __, res) => {
            if (!Settings.get("showInDmsList", true)) return;

            const user = React.useContext(UserContext);
            if (!user) return;

            const child = Utils.findInTree(res, e => e?.className?.includes("nameAndDecorators"), {
                walkable: ["children", "props"]
            });
            if (!child) return;

            child.style = { justifyContent: "unset" };
            child.children.push(<StatusIndicators userId={user.id} type="DMs" />);
        });
    }

    async patchMemberList() {
        const [MemberItem, key] = Webpack.getWithKey(() => true, {
            target: await Webpack.waitForModule(Webpack.Filters.bySource("nameplate:", ".MEMBER_LIST", "listitem"))
        });

        Patcher.after(MemberItem, key, (_, [props], ret) => {
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
        const [ChatUsername, key] = Webpack.getWithKey(() => true, {
            target: await Webpack.waitForModule(Webpack.Filters.bySource(".guildMemberAvatar&&null!="))
        });

        Patcher.before(ChatUsername, key, (_, props) => {
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
        const [BadgeList, Key_BL] = Webpack.getWithKey(() => true, {
            target: await Webpack.waitForModule(Webpack.Filters.bySource("badges", "badgeClassName", ".BADGE"))
        });

        Patcher.after(BadgeList, Key_BL, (_, [{ displayProfile }], res) => {
            if (!Settings.get("showInBadges", true)) return;
            if (Settings.get("ignoreBots", true) && displayProfile?.application) return;
            if (!displayProfile?.userId) return;
            res.props.children.push(<StatusIndicators userId={displayProfile.userId} type="Badge" separator />);
        });
    }

    async patchFriendList() {
        const [UserInfo, key] = Webpack.getWithKey(() => true, {
            target: await Webpack.waitForModule(
                Webpack.Filters.bySource("user", "showAccountIdentifier", "overrideDiscriminator")
            )
        });
        const FriendListClasses = await Webpack.waitForModule(Webpack.Filters.byKeys("userInfo", "hovered"));

        if (!Settings.get("showInFriendsList", true)) return;

        DOM.addStyle(
            "PlatformIndicators",
            `
            .${FriendListClasses.discriminator} { display: none; }
            .${FriendListClasses.hovered} .${FriendListClasses.discriminator} { display: unset; }
        `
        );

        Patcher.after(UserInfo, key, (_, [{ showAccountIdentifier, user }], res) => {
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
