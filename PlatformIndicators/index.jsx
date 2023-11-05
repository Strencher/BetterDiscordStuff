import {Patcher, Webpack} from "@api";
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
        this.patchUserPopout();

        Styles.load();
    }

    patchDMs() {
        const HomeComponents = Webpack.getByKeys("CloseButton", "LinkButton");

        function PatchedDMs({__PI_ORIGINAL, ...props}) {
            const res = __PI_ORIGINAL(props);
            try {
                const originalChildren = res.props.children;

                res.props.children = e => {
                    const ret = originalChildren(e);

                    try {
                        const obj = findInReactTree(ret, e => e?.avatar && e?.name);
                        if (!obj) return ret;

                        obj.decorators = [
                            obj.decorators,
                            <StatusIndicators
                                userId={props.user.id}
                                type="MemberList"
                            />
                        ];
                    } catch (error) {
                        console.error(error);
                    }

                    return ret;
                }
            } catch (error) {
                console.error(error);
            }

            return res;
        }

        Patcher.after(HomeComponents, "default", (_, __, res) => {
            if (res.type === PatchedDMs) return;
            res.props.__PI_ORIGINAL = res.type;

            res.type = PatchedDMs;
        });
    }

    patchMemberList() {
        const MemberItem = Webpack.getByKeys("AVATAR_DECORATION_PADDING");

        Patcher.after(MemberItem, "default", (_, [props], ret) => {
            const obj = findInReactTree(ret, e => e?.avatar && e?.name);

            if (obj) {
                obj.decorators = [
                    obj.decorators,
                    <StatusIndicators
                        userId={props.user.id}
                        type="MemberList"
                    />
                ];
            }
        });
    }

    patchUsername() {
        const ChatUsername = Webpack.getByKeys("UsernameDecorationTypes");

        Patcher.before(ChatUsername, "default", (_, [props]) => {
            if (!Array.isArray(props.decorations[1])) props.decorations[1] = [];
            props.decorations[1].unshift(
                <StatusIndicators
                    userId={props.message.author.id}
                    type="Chat"
                />
            );
        })
    }

    patchUserPopout() {
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
    }

    stop() {
        Patcher.unpatchAll();
        Styles.unload();
    }
}
