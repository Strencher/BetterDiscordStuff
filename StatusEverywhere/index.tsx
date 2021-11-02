/// <reference path="../bdbuilder/typings/main.d.ts" />

import { Patcher, Utilities, WebpackModules, Logger, ReactComponents } from "@zlibrary"
import BasePlugin from "@zlibrary/plugin"
import StatusAvatar from "./components/avatar";
import stylesheet from "styles";
import React from "react";
import SettingsPanel from "./components/settings";
import _ from "lodash";
import Settings from "./settings";
import { joinClassNames, useForceUpdate } from "@discord/utils";
import { ChannelTypes } from "@discord/constants";
import { Channels, Users } from "@discord/stores";
import {useStateFromStores} from "@discord/flux";
import config from "./package.json";
import settings from "./components/settings.json";

const VoiceState = WebpackModules.getByProps("isSoundSharing", "isSpeaking");

// Basically "Patcher" but garbage collector friendly version.
const lazyPatch = function (module: any, functionName: string, callback: (args: IArguments, returnValue: any) => any, id?: string) {
    if (!module || !functionName || typeof(module[functionName]) !== "function") return;
    const original = module[functionName];

    const unpatch = function () {
        module[functionName] = original;
    };

    module[functionName] = function () {
        const returnValue: any = Reflect.apply(original, this, arguments);

        try {
            const tempReturn = Reflect.apply(callback, this, [
                arguments,
                returnValue
            ]);

            return typeof (tempReturn) === "undefined" ? returnValue : tempReturn;
        } catch (error) {
            Logger.error(`Lazy patch ${id} failed!`, error);
        }

        return returnValue;
    };

    Object.assign(module[functionName], {
        _originalFunction: original,
        patchedBy: config.info.name,
        unpatch
    });

    return unpatch;
};

export default class StatusEverywhere extends BasePlugin {
    public get StatusAvatar() { return StatusAvatar; }

    public getSettingsPanel() {
        const Panel = SettingsPanel as React.FunctionComponent<{}>;

        return (
            <Panel />
        );
    }

    public createTimeLog(label: string): { end: () => void, start: number } {
        const start: number = Date.now();

        const end = function () {
            const current: number = Date.now();

            Logger.log(label.replace(/%s/g, (current - start).toFixed()));
        };

        return { start, end };
    }

    public async onStart(): Promise<void> {
        const time = this.createTimeLog("Started StatusEverywhere in %sms.");
        const methods = Object.keys(Object.getOwnPropertyDescriptors(this.constructor.prototype));

        for (let i = 0; i < methods.length; i++) {
            if (!methods[i].startsWith("patch") || typeof(this[methods[i]]) !== "function") continue;

            Utilities.suppressErrors(this[methods[i]].bind(this), `${this.constructor.name}.${methods[i]}`)();
        }

        time.end();

        stylesheet.inject();
    }

    private async patchColorModule(): Promise<void> {
        const StatusModule = WebpackModules.getByProps("getStatusColor");

        Patcher.after(StatusModule, "getStatusColor", (_, [status]) => {
            switch (status) {
                case "dnd":
                    return Settings.get("dndColor", "#ED4245");
                case "idle":
                    return Settings.get("idleColor", "#FAA81A");
                case "online":
                    return Settings.get("onlineColor", "#3BA55D");
                case "streaming":
                    return Settings.get("streamingColor", "#593695");
                case "offline":
                    return Settings.get("offlineColor", "#747F8D");
                default:
                    return "#747F8D";
            }
        });
    }

    private async patchRTCConnectionUsers() {
        return; // TODO: Fix this later.
        const RTCConnectionVoiceUsers = WebpackModules.getModule(m => m?.default?.displayName === "RTCConnectionVoiceUsers");

        function PatchedRTCUser(props) {
            const ret = props.__originalType(props);
            const isSpeaking = useStateFromStores([VoiceState], () => VoiceState.isSpeaking(props.user.id) || VoiceState.isSoundSharing(props.user.id))
        
            try {
                const org = ret.props.children;
                ret.props.children = e => {
                    const ret = org(e);
                    try {
                        const org2 = ret.props.children;
                        ret.props.children = tooltipProps => {
                            const ret = org2(tooltipProps);
                            
                            // try {
                            //     const overlay = 
                            // } catch (error) {
                                
                            // }

                            return ret;
                        };
                    } catch (error) {
                        Logger.error("Error in PatchedRTCUser:", error);
                    }

                    return ret;
                };
            } catch (error) {
                Logger.error("Error in PatchedRTCUser:", error);
            }

            return ret;
        }

        Patcher.after(RTCConnectionVoiceUsers, "default", (_, __, res) => {
            const list = Utilities.findInReactTree(res, e => e?.role === "group" && Array.isArray(e.children));
            if (!list) return;
            const users = list.children[0];
            if (!users?.length) return;

            for (const user of users) {
                if (typeof user?.type !== "function" || user.type === PatchedRTCUser) continue;
                const original = user.type;

                user.props.__originalType = original;
                user.type = PatchedRTCUser;
            }
        });
    }

    private async patchAccountSection() {
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
                                
                                ret.props.children = (
                                    <StatusAvatar
                                        {...props}
                                        user={Users.getCurrentUser()}
                                        shouldWatch={false}
                                        radial={{id: "accountSettingsRadialStatus", value: false}}
                                        resolution={{id: "accountSectionAvatarResolution", value: settings.accounts_section.accountSectionAvatarResolution.value}}
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
                                resolution={{id: "accountSectionAvatarResolution", value: settings.accounts_section.accountSectionAvatarResolution.value}}
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
                    className: joinClassNames(avatar.props.className, "accountSettingsAvatar"),
                    radial: {
                        id: "accountSettingsRadialStatus",
                        value: false
                    },
                    resolution: {
                        id: "accountSectionAvatarResolution",
                        value: settings.accounts_section.accountSectionAvatarResolution.value
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

    private async patchPartyMembers() {
        const classes = {
            ...Object(WebpackModules.getByProps("partyMember")),
            ...Object(WebpackModules.getByProps("container", "activity", "partyAvatar"))
        };
        const selector = "." + Object.values(_.pick(classes, ["partyMember", "partyAvatar"]))
            .map(e => e.split(" ").join("."))
            .join(", .");
        const VoiceUserSummaryItem = WebpackModules.getByDisplayName("VoiceUserSummaryItem");
        const UserSummaryItem = WebpackModules.getByDisplayName("UserSummaryItem");
        const PartyMember = await ReactComponents.getComponentByName("PartyMember", selector);
        
        Patcher.before(VoiceUserSummaryItem.prototype, "render", _this => {
            if (_this.props.__patched) return;
            _this.props.__patched = true;

            const original = _this.props.renderUser;

            _this.props.renderUser = (props: any, ...args: any[]) => {
                const user: UserObject | void = props?.user ?? props;
                const ret = original ? original.apply(null, [props].concat(args)) : null;
                if (!user) return ret;

                return (
                    <StatusAvatar
                        {...props}
                        user={user}
                        shouldWatch={false}
                        size={_this.props.size ?? StatusAvatar.Sizes.SIZE_16}
                        showTyping={{ id: "showChatTyping", value: true }}
                        radial={{ id: "chatRadialStatus", value: false }}
                        shouldShowUserPopout
                    />
                );
            };
        });

        Patcher.after(PartyMember.component.prototype, "render", (_this, _, ret) => {
            const { member: { user } } = _this.props;
            
            ret.props.children = (props: JSX.IntrinsicAttributes) => (
                <StatusAvatar
                    {...props}
                    user={user}
                    shouldWatch={false}
                    size={StatusAvatar.Sizes.SIZE_16}
                    showTyping={{id: "showChatTyping", value: true}}
                    radial={{ id: "chatRadialStatus", value: false }}
                    shouldShowUserPopout
                />
            );
        });

        Patcher.after(UserSummaryItem.prototype, "renderUsers", _this => {
            return _this.props.users.map((user: UserObject) => (
                <StatusAvatar
                    user={user}
                    className="avatarContainer-3CQrif"
                    type="voice-user"
                    size={StatusAvatar.Sizes.SIZE_24}
                    showTyping={{id: "showVoiceChatTyping", value: true}}
                    resolution={{id: "voiceChatAvatarResolution", value: 56}}
                />
            ));
        });

        PartyMember.forceUpdateAll();
    }

    private async patchPrivateChannel(): Promise<void> {
        const PrivateChannel = WebpackModules.getByDisplayName("PrivateChannel");

        Patcher.after(PrivateChannel.prototype, "renderAvatar", (_this, _, res) => {
            if (_this.props.pinned || _this.props.channel.type === ChannelTypes.GROUP_DM) return;

            return (
                <StatusAvatar
                    user={_this.props.user}
                    shouldWatch={false}
                    channel_id={_this.props.channel.id}
                    type="direct-message"
                    showTyping={{ id: "showDirectMessagesTyping", value: true }}
                    radial={{id: "directMessagesRadialStatus", value: false}}
                    resolution={{id: "dmAvatarResolution", value: settings.direct_messages.dmAvatarResolution.value}}
                    size={StatusAvatar.Sizes.SIZE_32}
                />
            );
        });
    }

    private async patchHeaderPlaying(): Promise<void> {
        const NowPlayingHeader = WebpackModules.getModule(m => m?.default?.displayName === "NowPlayingHeader");

        Patcher.after(NowPlayingHeader, "default", (_, __, res: any) => {
            const original = res.type;
            
            res.type = function ({ priorityUser: { user } }) {
                const ret = original.apply(this, arguments);
                
                try {
                    const avatar = Utilities.findInReactTree(ret, e => e?.props?.status);
                    if (!avatar) return ret;

                    avatar.props = Object.assign({}, {
                        user,
                        size: StatusAvatar.Sizes.SIZE_32,
                        shouldWatch: false,
                        channel_id: Channels.getDMFromUserId(user.id),
                        radial: {
                            id: "friendsPageRadialStatus",
                            value: false
                        },
                        showTyping: {
                            id: "showFriendsPageTyping",
                            value: true
                        },
                        resolution: {
                            id: "friendsPageAvatarResolution",
                            value: settings.friends_page.friendsPageAvatarResolution.value
                        }
                    });
                    avatar.type = StatusAvatar;
                } catch (error) {
                    Logger.error("Error in NowPlayHeader patch:\n", error);
                }
                
                return ret;
            }
        });
    }

    private async patchAvatar(): Promise<void> {
        const Avatars = WebpackModules.getModules(m => m?.type?.toString().includes("GuildIDContext"));

        for (const Avatar of Avatars) Patcher.after(Avatar, "type", (_, [props]) => {
            return (
                <StatusAvatar
                    {...props}
                    animated={props.src?.includes(".gif")}
                    shouldWatch={false}
                    channel_id={Channels.getDMFromUserId(props.user.id)}
                    showTyping={{ id: "showFriendsPageTyping", value: true }}
                    radial={{id: "friendsPageRadialStatus", value: false}}
                    resolution={{id: "friendsPageAvatarResolution", value: settings.friends_page.friendsPageAvatarResolution.value}}
                />
            );
        });
    }

    private async patchUserProfile(): Promise<void> {
        const UserProfileModalHeader = WebpackModules.getModule(m => m?.default?.displayName === "UserProfileModalHeader");
        const classes = WebpackModules.getByProps("header", "headerTop");

        Patcher.after(UserProfileModalHeader, "default", (_, [props], res) => {
            const avatar = Utilities.findInReactTree(res, e => e?.props?.statusTooltip);
            if (!avatar) return;

            avatar.props = Object.assign({}, props, {
                className: classes.avatar,
                animated: true,
                shouldWatch: false,
                radial: {
                    id: "userProfileRadialStatus",
                    value: false
                },
                showTyping: {
                    id: "showUserProfileTyping",
                    value: true
                },
                resolution: {
                    id: "userProfileAvatarResolution",
                    value: settings.user_profile.userProfileAvatarResolution.value
                },
                size: StatusAvatar.Sizes.SIZE_120
            });
            avatar.type = StatusAvatar;
        });
    }

    private async patchUserPopout(): Promise<void> {
        const UserPopoutComponents = WebpackModules.getByProps("UserPopoutAvatar");

        Patcher.after(UserPopoutComponents, "UserPopoutAvatar", (_, [props], res) => {
            const tree = Utilities.findInReactTree(res, e => e?.className?.includes("avatarWrapper"));
            if (!tree) return;
            const Component = tree.children[0].type;

            const WrappedAvatar = ({ className, ...props }) => (
                <Component className={joinClassNames(className, tree?.props?.className)} {...props} />
            );

            tree.children[0] = (
                <StatusAvatar
                    {...props}
                    shouldWatch={false}
                    type="user-popout"
                    animated
                    size={StatusAvatar.Sizes.SIZE_80}
                    AvatarComponent={WrappedAvatar}
                    radial={{ id: "userPopoutRadialStatus", value: false }}
                    showTyping={{id: "showUserPopoutTyping", value: true}}
                    resolution={{id: "userPopoutAvatarResolution", value: settings.user_popout.userPopoutAvatarResolution.value}}
                />
            );
        });
    }

    private async patchMemberListItem(): Promise<void> {
        const MemberListItem = WebpackModules.getByDisplayName("MemberListItem");
        
        Patcher.after(MemberListItem.prototype, "renderAvatar", _this => {
            return (
                <StatusAvatar
                    {..._this.props}
                    type="member-list"
                    shouldWatch={false}
                    animated={_this.state?.hovered || _this.props.selected}
                    size={StatusAvatar.Sizes.SIZE_32}
                    showTyping={{id: "showMemberlistTyping", value: true}}
                    radial={{id: "memberlistRadialStatus", value: false}}
                    resolution={{id: "memberListAvatarResolution", value: settings.member_list.memberListAvatarResolution.value}}
                />
            );
        });
    }

    private async patchChatAvatar(): Promise<void> {
        const ChatMessage = WebpackModules.getModule(m => m?.default?.toString?.().indexOf("ANIMATE_CHAT_AVATAR") > -1);

        type PatchArgs = {
            user: UserObject,
            subscribeToGroupId: string;
            message: any;
        };

        Patcher.after(ChatMessage, "default", (_, [props]: PatchArgs[], res) => {
            const tree = Utilities.findInReactTree(res, e => e?.renderPopout);
            const user = props?.message?.author;
            const channel_id = props?.message?.channel_id;
            if (!user || !tree?.children || tree.children?.__patched || (user.bot && user.discriminator === "0000")) return;
            // var o = tree.children;
            tree.children = (_props) => {
                return (
                    <StatusAvatar
                        {...props}
                        type="chat"
                        user={user}
                        channel_id={channel_id}
                        shouldShowUserPopout
                        showTyping={{ id: "showChatTyping", value: true }}
                        radial={{ id: "chatRadialStatus", value: false }}
                        size={StatusAvatar.Sizes.SIZE_40}
                        resolution={{id: "chatAvatarResolution", value: settings.chat.chatAvatarResolution.value}}
                    />
                );
            };

            tree.children.__patched = true;
        });
    }

    private async patchChannelMessage(): Promise<void> {
        const ChannelMessage = WebpackModules.getModule(m => m.type.displayName === "ChannelMessage");

        Patcher.after(ChannelMessage, "type", function(_, __, res) {
            const tree = Utilities.findInReactTree(res, e => e?.childrenHeader);
            if (!tree) return;

            Patcher.after(tree.childrenHeader.type, "type", (_, [props], res) => {
                const user = props?.message?.author;
                const channel_id = props?.message?.channel_id;
                res.props.children[0] = (
                    <StatusAvatar
                        {...props}
                        type="chat"
                        user={user}
                        channel_id={channel_id}
                        shouldShowUserPopout
                        showTyping={{ id: "chatShowTyping", value: true }}
                        radial={{ id: "chatRadialStatus", value: false }}
                        resolution={{id: "chatAvatarResolution", value: settings.chat.chatAvatarResolution.value}}
                    />
                );
            });

            tree.childrenHeader.type.__patched_status_everywhere = true;

            this.unpatch();
        });
    }

    private async patchVoiceUser(): Promise<void> {
        const VoiceUser = WebpackModules.getByDisplayName("VoiceUser");
        const classes = WebpackModules.getByProps("avatarContainer", "avatarSmall");
        const classNames = ["avatarContainer", "avatarSmall", "avatar"].map(cl => classes[cl]).join(" ");

        type VoiceUserProps = {
            speaking: boolean;
            user: UserObject;
        };

        Patcher.after(VoiceUser.prototype, "renderAvatar", (_this: {props: VoiceUserProps}) => {
            return (
                <StatusAvatar
                    {..._this.props}
                    className={classNames}
                    isSpeaking={_this.props.speaking}
                    type="voice-user"
                    size={StatusAvatar.Sizes.SIZE_24}
                    showTyping={{id: "showVoiceChatTyping", value: true}}
                    resolution={{id: "voiceChatAvatarResolution", value: settings.voice_chat.voiceChatAvatarResolution.value}}
                />
            );
        });
    }

    private async patchAuditlog(): Promise<void> {
        const AuditLog = WebpackModules.getByDisplayName("GuildSettingsAuditLogEntry");
        const classes = WebpackModules.getByProps("desaturate", "auditLog", "avatar");
        
        Patcher.after(AuditLog.prototype, "render", (_this, _, res) => {
            const originalChildren: Function | void = res?.props?.children;
            if (typeof originalChildren !== "function") return;
            if (!_this.props.log?.user) return;

            lazyPatch(res?.props, "children", (_, ret) => {
                const popout = Utilities.findInReactTree(ret, e => e?.renderPopout);
                if (!popout) return;
                
                lazyPatch(popout, "children", props => (
                    <StatusAvatar
                        {...props[0]}
                        user={_this.props.log.user}
                        showTyping={{id: "showGuildSettingsShowTyping", value: true}}
                        radial={{id: "guildSettingsRadialStatus", value: false}}
                        resolution={{id: "guildSettingsAvatarResolution", value: settings.guild_settings.guildSettingsAvatarResolution.value}}
                        className={classes.avatar}
                    />
                ));
            });
        });
    }

    private async patchGuildSettingsMembers(): Promise<void> {
        const classes = WebpackModules.getByProps("member", "avatar");
        const Member = await ReactComponents.getComponentByName("Member", `.${classes.member}`);

        Patcher.after(Member.component.prototype, "render", (_this, _, returnValue) => {
            const avatar = Utilities.findInReactTree(returnValue, e => e?.props?.className === classes.avatar);
            if (!avatar || typeof avatar.type !== "function") return;
            
            Object.assign(avatar.props, {
                user: _this.props.user
            });
            
            lazyPatch(avatar, "type", props => (
                <StatusAvatar
                    {...props[0]}
                    showTyping={{id: "showGuildSettingsShowTyping", value: true}}
                    radial={{id: "guildSettingsRadialStatus", value: false}}
                    resolution={{id: "guildSettingsAvatarResolution", value: settings.guild_settings.guildSettingsAvatarResolution.value}}
                />
            ));
        });

        Member.forceUpdateAll();
    }

    onStop(): void {
        Patcher.unpatchAll();
        stylesheet.remove();
    }
}