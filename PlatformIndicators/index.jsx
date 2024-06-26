import {DOM, Patcher, ReactUtils, Webpack, Utils} from "@api";
import Styles from "@styles";
import React from "react";
import {findInReactTree} from "./modules/utils";
import StatusIndicators from "./components/indicators";
import SettingsPanel from "./components/settings";

export default class PlatformIndicators {
    getSettingsPanel() {
        return <SettingsPanel />;
    }

    start() {
        this.patchDMs();
        this.patchMemberList();
        this.patchUsername();
        this.patchBadges();
        this.patchFriendList();
        Styles.load();
    }

    patchDMs() {
        const UserContext = React.createContext(null);
        const [ChannelWrapper, Key_CW] = Webpack.getWithKey(Webpack.Filters.byStrings("isGDMFacepileEnabled"));
        const [NameWrapper, Key_NW] = Webpack.getWithKey(Webpack.Filters.byStrings(".nameAndDecorators"));
        const ChannelClasses = Webpack.getByKeys("channel", "decorator");

        Patcher.after(ChannelWrapper, Key_CW, (_, __, res) => {
            Patcher.after(res, "type", (_, [props], res) => {
                return (
                    <UserContext.Provider value={props.user}>
                        {res}
                    </UserContext.Provider>
                  );
            });
        });

        const ChannelWrapperElement = document.querySelector(`h2 + .${ChannelClasses.channel}`);
        if (ChannelWrapperElement) {
            const ChannelWrapperInstance = ReactUtils.getOwnerInstance(ChannelWrapperElement);
            if (ChannelWrapperInstance) ChannelWrapperInstance.forceUpdate();
        }

        Patcher.after(NameWrapper, Key_NW, (_, __, res) => {
            const user = React.useContext(UserContext);
            if (!user) return;
            const child = Utils.findInTree(res, e => e?.className?.includes("nameAndDecorators"));
            if (!child) return;
            child.children.push(
                <StatusIndicators
                    userId={user.id}
                    type="DMs"
                />
            );
        });
    }

    patchMemberList() {
        const [MemberItem, key] = Webpack.getWithKey(Webpack.Filters.byStrings(".jXE.MEMBER_LIST"));
        const MemberListClasses = Webpack.getByKeys("member", "memberInner");

        Patcher.after(MemberItem, key, (_, [props], ret) => {
            const children = ret.props.children();
            const obj = findInReactTree(children, e => e?.avatar && e?.name);
            if (obj)
                children.props.decorators?.props?.children.push(
                    <StatusIndicators
                        userId={props.user.id}
                        type="MemberList"
                    />
                );
            // discord made it a method to return the children :(
            ret.props.children = () => children;
        });

        const MemberListUserElement = document.querySelector(`.${MemberListClasses.member}`);
        if (MemberListUserElement) {
            const MemberListUserInstance = ReactUtils.getOwnerInstance(MemberListUserElement);
            if (MemberListUserInstance) MemberListUserInstance.forceUpdate();
        }
    }

    patchUsername() {
        const [ChatUsername, key] = Webpack.getWithKey(Webpack.Filters.byStrings(".guildMemberAvatar&&null!="));
        Patcher.before(ChatUsername, key, (_, props) => {
            const mainProps = props[0];
            if (!Array.isArray(mainProps?.decorations[1]) && mainProps && mainProps?.decorations) mainProps.decorations[1] = [];
            // for some reason props just won't exist.
            mainProps?.decorations[1]?.unshift(
                <StatusIndicators
                    userId={mainProps.message.author.id}
                    type="Chat"
                />
            );
        })
    }

    patchBadges() {
        const UserContext = React.createContext(null);
        const [ProfileInfoRow, KEY_PIR] = Webpack.getWithKey(Webpack.Filters.byStrings("user", "profileType"));
        const [BadgeList, Key_BL] = Webpack.getWithKey(Webpack.Filters.byStrings(".PROFILE_USER_BADGES"));
        
        Patcher.after(ProfileInfoRow, KEY_PIR, (_, [props], res) => {
            return (
                <UserContext.Provider value={props.user}>
                    {res}
                </UserContext.Provider>
              );
        });

        Patcher.after(BadgeList, Key_BL, (_, __, res) => {
            const user = React.useContext(UserContext);
            if (!user) return;
            res.props.children.push(
                <StatusIndicators
                    userId={user.id}
                    type="Badge"
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
            Patcher.after(res.props.children[1].props.children[0], "type", (_, [props], res) => {
                Patcher.after(res, "type", (_, __, res) => {
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
