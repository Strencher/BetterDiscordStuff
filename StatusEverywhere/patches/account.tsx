import {Users} from "@discord/stores";
import {Logger, Patcher, ReactComponents, Utilities, WebpackModules} from "@zlibrary";
import React from "react";
import StatusAvatar from "../components/avatar";
import settings from "../components/settings.json";

export default async function patchAccountSection() {
    const accountSelector = `.${WebpackModules.getByProps("container", "avatar", "redIcon").container}`;
    const userSettingsSelector = `.${WebpackModules.getByProps("contentColumnDefault").contentColumnDefault + " > div"}`;
    
    ReactComponents.getComponentByName("Account", accountSelector).then(Account => {
        Patcher.after(Account.component.prototype, "render", (_, __, res) => {
            const tree = Utilities.findInReactTree(res, e => e?.renderPopout && !e.child);
            if (!tree) return res;
            const old: Function = tree.children;
            
            tree.children = (e: any) => {
                const ret = old(e);
                if (!ret) return ret;
                const props = ret.props.children.props;
                if (ret.props.children.toString().indexOf("avatarWrapper") < 0) {
                    try {
                        const tree = Utilities.findInReactTree(ret, e => typeof (e?.children) === "function" && "renderPopout" in e);
                        const original: Function = tree.children;
                        
                        tree.children = (props: any) => {
                            const ret = original(props);
                            const isSpeaking = !!ret.props.children?.props?.isSpeaking;
                            ret.props.children = (
                                <StatusAvatar
                                    {...props}
                                    user={Users.getCurrentUser()}
                                    shouldWatch={false}
                                    radial={{id: "accountSettingsRadialStatus", value: false}}
                                    isSpeaking={isSpeaking}
                                    resolution={{id: "accountSectionAvatarResolution", value: settings.accounts.accountSectionAvatarResolution.value}}
                                    size={StatusAvatar.Sizes.SIZE_32}
                                />
                            );

                            return ret;
                        }
                    } catch (error) {
                        Logger.error("Error in AccountSection patch:", error);
                    }
                } else {
                    ret.props.children = (
                        <StatusAvatar
                            {...props}
                            user={Users.getCurrentUser()}
                            shouldWatch={false}
                            radial={{id: "accountSettingsRadialStatus", value: false}}
                            resolution={{id: "accountSectionAvatarResolution", value: settings.accounts.accountSectionAvatarResolution.value}}
                            size={StatusAvatar.Sizes.SIZE_32}
                        />
                    );
                }
                
                return ret;
            };
        });

        Account.forceUpdateAll();
    });

    function PatchedUserSettingsAccountProfileCard(params: { __originalType: Function }) {
        const { __originalType, ...props } = params;
        const ret = __originalType(props);
        
        try {
            const avatar = Utilities.findInReactTree(ret, e => e?.props?.status);
            if (!avatar) return ret;

            Object.assign(avatar.props, {
                user: Users.getCurrentUser(),
                shouldWatch: false,
                size: StatusAvatar.Sizes.SIZE_120,
                animated: true,
                className: Utilities.className(avatar.props.className, "accountSettingsAvatar"),
                radial: {
                    id: "accountSettingsRadialStatus",
                    value: false
                },
                resolution: {
                    id: "accountSettingsAvatarResolution",
                    value: settings.accounts.accountSettingsAvatarResolution.value
                }
            });

            avatar.type = StatusAvatar;
        } catch (error) {
            Logger.error("Error in UserSettingsAccountCard:", error);
            return ret;
        }

        return ret;
    }

    ReactComponents.getComponentByName("UserSettingsAccount", userSettingsSelector).then(UserSettingsAccount => {
        Patcher.after(UserSettingsAccount.component.prototype, "renderAccountSettings", (_, __, res) => {
            const tree: Array<any> = Utilities.findInReactTree(res, e => Array.isArray(e) && e.some(e => e?.type?.displayName === "UserSettingsAccountProfileCard"));
            if (!tree) return;
            const index: number = tree.findIndex(e => e?.type?.displayName === "UserSettingsAccountProfileCard");
            const element = tree[index];

            tree[index] = React.createElement(PatchedUserSettingsAccountProfileCard, {
                __originalType: element.type
            });
        });

        UserSettingsAccount.forceUpdateAll();
    });
}