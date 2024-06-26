import {Patcher, Webpack, Utils} from "@api";
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
        //this.patchUserPopout();

        Styles.load();
    }

    patchDMs() {
        const UserContext = React.createContext(null);
        const [ChannelWrapper, Key_CW] = Webpack.getWithKey(Webpack.Filters.byStrings("isGDMFacepileEnabled"));
        const [NameWrapper, Key_NW] = Webpack.getWithKey(Webpack.Filters.byStrings(".nameAndDecorators"));

        Patcher.after(ChannelWrapper, Key_CW, (_, __, res) => {
            Patcher.after(res, "type", (_, [props], res) => {
                return (
                    <UserContext.Provider value={props.user}>
                        {res}
                    </UserContext.Provider>
                  );
            });
        });

        Patcher.after(NameWrapper, Key_NW, (_, __, res) => {
            const user = React.useContext(UserContext);
            if (!user) return;
            const child = Utils.findInTree(res, e => e?.className?.includes("nameAndDecorators"));
            if (!child) return;
            child.children.push(
                <StatusIndicators
                    userId={user.id}
                    type="MemberList"
                />
            );
        });
    }

    patchMemberList() {
        const [MemberItem, key] = Webpack.getWithKey(Webpack.Filters.byStrings(".jXE.MEMBER_LIST"));
        
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

    /*patchUserPopout() {
        const UserPopoutModule = Webpack.getByKeys("UserPopoutBadgeList");

        function PatchedBadgesList({__PI_ORIGINAL, ...props}) {
            const res = __PI_ORIGINAL(props);

            try {
                if (Array.isArray(res?.props?.children)) {
                    res.props.children.push(
                        <StatusIndicators
                            userId={props.user.id}
                            type="Tags"
                            size="22"
                            separator={!!res.props.children.length}
                        />
                    );
                }
            } catch (error) {
                console.error(error);
            }

            return res;
        }

        Patcher.after(UserPopoutModule, "default", (_, [props], ret) => {
            const vnode = findInReactTree(ret, e => e?.type === UserPopoutModule.UserPopoutBadgeList.__originalFunction);

            if (vnode) {
                vnode.type = UserPopoutModule.UserPopoutBadgeList;
            }
        });

        Patcher.after(UserPopoutModule, "UserPopoutBadgeList", (_, [props], ret) => {
            const vnode = ret.props.children[1];
            vnode.props.__PI_ORIGINAL = vnode.type;

            vnode.type = PatchedBadgesList;
        });
    }*/

    stop() {
        Patcher.unpatchAll();
        Styles.unload();
    }
}
