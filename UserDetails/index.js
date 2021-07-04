/// <reference path="../bdbuilder/typings/main.d.ts" />

import stylesheet from "styles";
import React from "react";
import UserConnections from "./modules/apis/connections";
import CreatedAt from "./modules/apis/creationDate";
import JoinedAt from "./modules/apis/joinedDate";
import LastMessage from "./modules/apis/lastMessage";
import Utilities from "./modules/Utilities";
import Settings from "./modules/Settings";
import SettingsPanel from "./modules/components/settings/index";
import ErrorBoundary from "./modules/components/errorboundary";
import BasePlugin from "@zlibrary/plugin";
import {WebpackModules, Patcher, ReactComponents, ColorConverter} from "@zlibrary";
import dateStyles from "./modules/apis/dates.scss";
import Activity, {ActivitiesFilter} from "./modules/components/activity";
import {ActivityTypes} from "@discord/constants";
import Gamepad from "./modules/components/icons/gamepad";
import {connectStores, useStateFromStores} from "@discord/flux";
import Headphones from "./modules/components/icons/headphones";
import Commands from "common/apis/commands";
import Clyde from "common/apis/clyde";
import {Members, Users, Activities} from "@discord/stores";
import Strings from "./modules/data/translations/index.js";
import LocaleManager from "common/apis/strings";
import SuppressError from "common/util/noerror";
import {Messages} from "@discord/i18n";
import Logger from "./modules/logger";

const getClass = (props = [], items = props, exclude = [], selector = false) => {
    const module = WebpackModules.find(m => m && props.every(prop => m[prop] !== undefined) && exclude.every(e => m[e] == undefined));
    if (!module) return "";
    return (selector ? "." : "") + items.map(item => module[item]).join(selector ? "." : " ");
};

export default class Plugin extends BasePlugin {
    promises = {
        cancelled: false,
        cancel() {this.cancelled = true;}
    };

    getSettingsPanel() {
        return <SettingsPanel />;
    }

    onStart() {
        // Bind stylesheet
        stylesheet.inject();

        // Load Strings
        LocaleManager.addStringsObject(Strings);

        // Api's
        this.createdApi = new CreatedAt(this);
        this.joinedApi = new JoinedAt(this);
        this.lastMessageApi = new LastMessage(this);
        this.connectionsApi = new UserConnections(this);

        // Patches
        this.patchUserPopout();
        this.patchUserProfile();
        this.patchMemberListItem();
        this.patchUserActivityStatus();

        // Commands
        Commands.registerCommand(this.getName(), {
            id: "user-info",
            name: "userinfo",
            get description() {return Messages.USERINFO_CMD_DESC},
            predicate: () => true,
            execute: (props, {channel, guild}) => {
                const users = props.user.map(e => Users.getUser(e.userId)).filter(e => e);

                if (!users.length) return Clyde.sendMessage(channel.id, {content: "Sorry, but i can't resolve that user."});
                Clyde.sendMessage(channel.id, {
                    content: "That's what i've found so far:",
                    embeds: users.map(user => this.createEmbedForUser(user, guild, channel))
                });
            },
            options: [
                {name: "user", type: 6, description: "The user"}
            ],
            type: 3
        });
    }

    createEmbedForUser(user, guild, channel) {
        const member = Members.getMember(guild.id, user.id);

        const largeUrl = user.getAvatarURL().split("?size")[0] + "?size=2048";
        const activities = Activities.getActivities(user.id);

        return {
            color: member?.colorString ? ColorConverter.hex2int(member.colorString) : void 0,
            author: {
                name: user.tag,
                icon_url: user.getAvatarURL(),
                proxy_icon_url: user.getAvatarURL()
            },
            thumbnail: {
                height: 128,
                proxy_url: largeUrl,
                url: largeUrl,
                width: 128
            },
            footer: {
                text: "ID: " + user.id,
            },
            timestamp: new Date().toISOString(),
            type: "rich",
            description: `<@!${user.id}>`,
            fields: [
                {
                    name: "Creation Date",
                    inline: true,
                    value: this.createdApi.extractDate(user.id).toGMTString()
                },
                member && {
                    name: "Joined Date",
                    inline: true,
                    value: new Date(member.joinedAt).toGMTString()
                },
                member && {
                    name: "Roles [" + member.roles.length + "]",
                    value: member.roles.map(role => `<@&${role}>`).join(" | ")
                },
                activities.length && {
                    name: "Activities",
                    value: activities.map(ac => `- **${ac.name}**: \`${ac.state}\``).join("\n")
                }
            ].filter(e => e)
        };
    }
    
    async patchUserPopout() {
        const UserPopoutInfo = WebpackModules.getByProps("UserPopoutInfo");
        const UserPopoutBody = WebpackModules.getModule(m => m.default.displayName === "UserPopoutBody");

        Patcher.after(UserPopoutInfo, "UserPopoutInfo", (_, [{user}], returnValue) => {
            if (this.promises.cancelled) return;
            const tree = Utilities.findInReactTree(returnValue, SuppressError(e => e.className.indexOf("headerText") > -1));
            if (!Array.isArray(tree?.children) || !user) return;
            const WrappedJoinedAt = this.joinedApi.task(user.id);
            const WrappedCreatedAt = this.createdApi.task(user.id);
            const WrappedLastMessage = this.lastMessageApi.task(user);

            tree.children.push(<ErrorBoundary key="UserPopoutHeader" id="UserPopoutHeader" mini>
                <div className={Utilities.joinClassNames(dateStyles.container, Settings.get("useIcons", true) ? dateStyles.icons : dateStyles.text)}>
                    {Settings.get("created_show_up", true) && <WrappedCreatedAt key="created-date" />}
                    {Settings.get("joined_show_up", true) && <WrappedJoinedAt key="joined-date" />}
                    {Settings.get("lastmessage_show_up", true) && <WrappedLastMessage key="lastmessage-date" />}
                </div>
            </ErrorBoundary>);
        });

        Patcher.after(UserPopoutBody, "default", (_, [{user}], returnValue) => {
            if (this.promises.cancelled) return;
            if (!Array.isArray(returnValue?.props?.children)) return returnValue;
            const Connections = this.connectionsApi.task(user);
            returnValue.props.children.unshift(
                <ErrorBoundary id="UserPopoutBody" mini key="connections">
                    <Connections />
                </ErrorBoundary>
            );
        });
    }

    async patchUserProfile() {
        const UserProfileModalHeader = WebpackModules.getModule(m => m.default.displayName === "UserProfileModalHeader");

        Patcher.after(UserProfileModalHeader, "default", (_, [{user}], res) => {
            if (this.promises.cancelled) return;
            const tree = Utilities.findInReactTree(res, SuppressError(res => res.type.displayName === "DiscordTag"));

            if (!tree || tree.type?.__patched) return;

            const original = tree.type;
            tree.type = (...args) => {
                const ret = original.apply(this, args);
                
                try {
                    const WrappedJoinedAt = this.joinedApi.task(user.id);
                    const WrappedCreatedAt = this.createdApi.task(user.id);
                    const WrappedLastMessage = this.lastMessageApi.task(user);

                    return (
                        <div className={dateStyles.wrapper}>
                            {ret}
                            <ErrorBoundary id="UserProfile" mini>
                                <div className={Utilities.joinClassNames(dateStyles.container, dateStyles.userProfile, Settings.get("useIcons", true) ? dateStyles.icons : dateStyles.text)}>
                                    {Settings.get("created_show_profile", true) && <WrappedCreatedAt />}
                                    {Settings.get("joined_show_profile", true) && <WrappedJoinedAt />}
                                    {Settings.get("lastmessage_show_profile", true) && <WrappedLastMessage />}
                                </div>
                            </ErrorBoundary>
                        </div>
                    );
                } catch (error) {
                    Logger.error("Failed to inject into ProfileModal:", error);
                }

                return ret;
            };

            tree.type.__patched = true;
            tree.name = "DiscordTag";
        });
    }

    async patchMemberListItem() {
        const MemberListItem = await ReactComponents.getComponentByName("MemberListItem", getClass(["member", "activity"], ["member"], [], true));
        const ActivityStatus = WebpackModules.getModule(m => m.default.displayName === "ActivityStatus");

        const ConnectedActivity = connectStores([Settings], e => e)(Activity);
        Patcher.after(MemberListItem.component.prototype, "render", (that, _, res) => {
            if (this.promises.cancelled) return;
            if (!Settings.get("activityIcon", true)) return;

            res.props.children = (
                <ConnectedActivity user={that.props.user} />
            );
        });

        Patcher.after(ActivityStatus, "default", (_, [{activities}], res) => {
            const element = res?.props?.children?.[2];

            if (!element) return;

            Object.assign(element.props, {
                type: activities.filter(ActivitiesFilter)[0].type
            });
        });

        MemberListItem.forceUpdateAll();
    }

    async patchUserActivityStatus() {
        const RichActivity = WebpackModules.getModule(m => m?.default?.displayName === "RichActivity");

        Patcher.after(RichActivity, "default", (_, [props]) => {
            const shouldShow = useStateFromStores([Settings], () => Settings.get("activityIconState", 0));
            switch (shouldShow) {
                case 1: return;
                case 2: return null;
            }

            switch (props.type) {
                case ActivityTypes.PLAYING: return <Gamepad {...props} />;
                case ActivityTypes.LISTENING: return <Headphones {...props} />;
            }
        });
    }

    onStop() {
        // Remove strings
        LocaleManager.removeStringsObject(Strings);

        // Unpatch
        Patcher.unpatchAll();

        // Remove styles
        stylesheet.remove();

        // Cancel promises
        this.promises.cancel();

        // Unregister commands
        Commands.unregisterAllCommands(this.getName());
    }
}