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
import {Members, Users, Activities, SelectedChannels, SelectedGuilds} from "@discord/stores";
import SuppressError from "common/util/noerror";
import {Messages} from "@discord/i18n";
import Logger from "./modules/logger";
import MutualServers from "./modules/apis/mutualServers";
import * as Stores from "./modules/stores";
import Strings from "./modules/strings";
import {Dispatcher} from "@discord/modules";

const getClass = (props = [], items = props, exclude = [], selector = false) => {
    const module = WebpackModules.find(m => m && props.every(prop => m[prop] !== undefined) && exclude.every(e => m[e] == undefined));
    if (!module) return "";
    return (selector ? "." : "") + items.map(item => module[item]).join(selector ? "." : " ");
};

export default class Plugin extends BasePlugin {
    get Stores() {return Stores;}

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
        Strings.init();

        // Patches
        this.patchUserPopout();
        this.patchUserProfile();
        this.patchMemberListItem();
        this.patchUserActivityStatus();
        this.patchAccountSection();

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
            const tree = Utilities.findInReactTree(returnValue, e => e?.className?.indexOf("headerText") > -1);
            if (!Array.isArray(tree?.children) || !user) return;

            tree.children.push(<ErrorBoundary key="UserPopoutHeader" id="UserPopoutHeader" mini>
                <div className={Utilities.joinClassNames(dateStyles.container, Settings.get("useIcons", true) ? dateStyles.icons : dateStyles.text)}>
                    {Settings.get("created_show_up", true) && <CreatedAt userId={user.id} key="created-date" />}
                    {Settings.get("joined_show_up", true) && <JoinedAt userId={user.id} key="joined-date" />}
                    {Settings.get("lastmessage_show_up", true) && <LastMessage user={user} key="lastmessage-date" />}
                </div>
            </ErrorBoundary>);
        });

        Patcher.after(UserPopoutBody, "default", (_, [{user}], returnValue) => {
            if (this.promises.cancelled) return;
            if (!Array.isArray(returnValue?.props?.children) || returnValue.props.children.some(child => child?.type === ErrorBoundary)) return returnValue;

            returnValue.props.children.unshift(
                <ErrorBoundary id="UserPopoutBody" mini key="connections">
                    <UserConnections user={user} />
                </ErrorBoundary>,
                <ErrorBoundary id="UserPopoutBody" mini key="mutual_servers">
                    <MutualServers user={user} />
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

                    return (
                        <div className={dateStyles.wrapper}>
                            {ret}
                            <ErrorBoundary id="UserProfile" mini>
                                <div className={Utilities.joinClassNames(dateStyles.container, dateStyles.userProfile, Settings.get("useIcons", true) ? dateStyles.icons : dateStyles.text)}>
                                    {Settings.get("created_show_profile", true) && <CreatedAt userId={user.id} key="created-at" />}
                                    {Settings.get("joined_show_profile", true) && <JoinedAt userId={user.id} key="joined-at" />}
                                    {Settings.get("lastmessage_show_profile", true) && <LastMessage user={user} key="last-message" />}
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

    async patchAccountSection() {
        const classes = WebpackModules.getByProps("copySuccess", "container");
        const AccountSection = await ReactComponents.getComponentByName("Account", `.${classes.container}`);
        const UserPopoutContainer = WebpackModules.getModule(m => m.type.displayName === "UserPopoutContainer");
        const Popout = WebpackModules.getByDisplayName("Popout");

        Patcher.after(AccountSection.component.prototype, "render", (_this, _, res) => {
            if (this.promises.cancelled) return;
            if (!_this.state.hasOwnProperty("showUserPopout")) _this.state.showUserPopout = false;

            res.props.onClick = res.props.onContextMenu = function (e) {
                if (Settings.get("panelPopoutType", "click") !== e.type) return;

                e.preventDefault();
                e.stopPropagation();

                if (e.target?.classList?.contains(classes.container) || e.target?.parentElement?.classList?.contains(classes.nameTag)) {
                    this.setState({
                        showUserPopout: !_this.state.showUserPopout
                    });
                }
            }.bind(_this);

            return (
                <ErrorBoundary id="AccountSection">
                    <Popout
                        child={res} // Keep this for other plugins so they can inject into it too.
                        shouldShow={_this.state.showUserPopout && Settings.get("showPanelPopout", true)}
                        animation={Popout.Animation.TRANSLATE}
                        onRequestClose={() => _this.setState({showUserPopout: false})}
                        position={Popout.Positions.TOP}
                        align={Popout.Align.CENTER}
                        renderPopout={props => (
                            <ErrorBoundary id="UserPopoutContainer">
                                <UserPopoutContainer
                                    {...props}
                                    channelId={SelectedChannels.getChannelId()}
                                    guildId={SelectedGuilds.getGuildId()}
                                    userId={Users.getCurrentUser().id}
                                    position="top"
                                />
                            </ErrorBoundary>
                        )}
                    >{() => res}</Popout>
                </ErrorBoundary>
            );
        });

        AccountSection.forceUpdateAll();
    }

    destroyStore(dispatchToken) {
        Dispatcher._dependencyGraph.removeNode(dispatchToken);
        Dispatcher._invalidateCaches();
    }

    onStop() {
        // Remove strings
        Strings.shutdown();

        // Unpatch
        Patcher.unpatchAll();

        // Remove styles
        stylesheet.remove();

        // Cancel promises
        this.promises.cancel();

        // Unregister commands
        Commands.unregisterAllCommands(this.getName());

        // Destroy stores
        this.destroyStore(Stores.JoinedAt.getDispatchToken());
        this.destroyStore(Stores.LastMessage.getDispatchToken());
    }
}