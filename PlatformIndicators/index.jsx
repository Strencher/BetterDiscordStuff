import React from "react";
import { DOM, Patcher, ReactUtils, Webpack, Utils } from "@api";
import manifest from "@manifest";
import Styles from "@styles";

import showChangelog from "../common/Changelog";

import StatusIndicators from "./components/indicators";
import SettingsPanel from "./components/settings";
import Settings from "./modules/settings";
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

    patchDMList() {
        const UserContext = React.createContext(null);
        const ChannelWrapper = Webpack.getBySource("activities", "isMultiUserDM", "isMobile");
        const [NameWrapper, Key_NW] = Webpack.getWithKey(
            Webpack.Filters.byStrings("MEMBER_LIST", "listitem", "avatar", "decorators")
        );
        const ChannelClasses = Webpack.getByKeys("channel", "decorator");
        const nameAndDecoratorsClass = Webpack.getByKeys('nameAndDecorators').nameAndDecorators;

        Patcher.after(ChannelWrapper, "Ay", (_, __, res) => {
            if(!Settings.get("showInDmsList", true)) return;
            Patcher.after(res, "type", (_, [props], res) => {
                if(!props.user) return; // Its a group DM
                if(Settings.get("ignoreBots", true) && props.user.bot) return;

                return (
                    <UserContext.Provider value={props.user}>
                        {res}
                    </UserContext.Provider>
                );
            });
        });

        const ChannelWrapperElement = document.querySelector(`h2 + .${ChannelClasses.channel}`);
        if(ChannelWrapperElement) {
            const ChannelWrapperInstance = ReactUtils.getOwnerInstance(ChannelWrapperElement);
            if(ChannelWrapperInstance) ChannelWrapperInstance.forceUpdate();
        }

        Patcher.after(NameWrapper, Key_NW, (_, __, res) => {
            if(!Settings.get("showInDmsList", true)) return;

            const user = React.useContext(UserContext);
            if(!user) return;

            const child = Utils.findInTree(res, e => e?.className?.includes(nameAndDecoratorsClass), { walkable: ["children", "props"] });
            if(!child) return;

            child.style = { justifyContent: "unset" };
            child.children.push(
                <StatusIndicators
                    userId={user.id}
                    type="DMs"
                />
            );
        });
    }

    patchMemberList() {
        const [MemberItem, key] = Webpack.getWithKey(Webpack.Filters.byStrings("location:\"MemberListItem\""));
        const MemberListClasses = Webpack.getByKeys("member", "memberInner");

        Patcher.after(MemberItem, key, (_, [props], ret) => {
            if(ret?.props?.className?.includes("placeholder")) return;
            if(!Settings.get("showInMemberList", true)) return;
            if(Settings.get("ignoreBots", true) && props?.user.bot) return;
            const children = ret.props.children();
            const user = findInReactTree(children, e => e?.avatar && e?.name);
            let childs = children?.props?.name?.props?.children;
            if(user && childs) {
                children.props.name.props.children = [
                    childs,
                    <StatusIndicators
                        userId={props.user.id}
                        type="MemberList"
                    />
                ];
            }
            ret.props.children = () => children;
        });

        const MemberListUserElement = document.querySelector(`.${MemberListClasses.member}`);
        if(MemberListUserElement) {
            const MemberListUserInstance = ReactUtils.getOwnerInstance(MemberListUserElement);
            if(MemberListUserInstance) MemberListUserInstance.forceUpdate();
        }
    }

    patchChat() {
        const [ChatUsername, key] = Webpack.getWithKey(Webpack.Filters.byStrings(".guildMemberAvatar&&null!="));

        Patcher.before(ChatUsername, key, (_, props) => {
            const mainProps = props[0];
            if(!Settings.get("showInChat", true)) return;
            if(Settings.get("ignoreBots", true) && mainProps?.author?.bot) return;
            if(!mainProps?.decorations) return;
            const target = mainProps.decorations?.[1];
            if(!Array.isArray(target)) mainProps.decorations[1] = target ? [target] : [];
            mainProps.decorations[1].unshift(
                <StatusIndicators
                    userId={mainProps.message.author.id}
                    type="Chat"
                />
            );
        });
    }

    patchBadges() {
        const [BadgeList, Key_BL] = Webpack.getWithKey(Webpack.Filters.byStrings("badges", "badgeClassName", ".BADGE"));

        Patcher.after(BadgeList, Key_BL, (_, [{ displayProfile }], res) => {
            if(!Settings.get("showInBadges", true)) return;
            if(Settings.get("ignoreBots", true) && displayProfile?.application) return;
            if(!displayProfile?.userId) return;
            res.props.children.push(
                <StatusIndicators
                    userId={displayProfile.userId}
                    type="Badge"
                    separator
                />
            );
        });
    }

    patchFriendList() {
        const [UserInfo, key] = Webpack.getWithKey(Webpack.Filters.byStrings("user", "subText", "showAccountIdentifier"));
        const FriendListClasses = Webpack.getByKeys("userInfo", "hovered");

        DOM.addStyle("PlatformIndicators", `
            .${FriendListClasses.discriminator} { display: none; }
            .${FriendListClasses.hovered} .${FriendListClasses.discriminator} { display: unset; }
        `);

        Patcher.after(UserInfo, key, (_, __, res) => {
            if(!Settings.get("showInFriendsList", true)) return;
            const unpatch = Patcher.after(res.props.children[1].props.children[0], "type", (_, [props], res) => {
                unpatch();
                const unpatch_ = Patcher.after(res, "type", (_, __, res) => {
                    unpatch_();
                    res.props.children.push(
                        <StatusIndicators
                            userId={props.user.id}
                            type="FriendList"
                        />
                    );
                });
            });
        });
    }

    stop() {
        Patcher.unpatchAll();
        DOM.removeStyle("PlatformIndicators");
        Styles.unload();
    }
}
