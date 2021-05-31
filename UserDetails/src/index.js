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
import {WebpackModules, Patcher, ReactComponents, Logger} from "@zlibrary";
import dateStyles from "./modules/apis/dates.scss";
import {Dispatcher} from "@discord/modules";

/// <reference path="../../typings/zlib.d.ts" />

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
        const ConnectedSettings = Settings.connectStore(SettingsPanel);
        return <ConnectedSettings />;
    }

    onStart() {
        // Bind stylesheet
        stylesheet.inject();

        // Api's
        this.createdApi = new CreatedAt(this);
        this.joinedApi = new JoinedAt(this);
        this.lastMessageApi = new LastMessage(this);
        this.connectionsApi = new UserConnections(this);

        // Patches
        this.patchUserPopout();
        this.patchUserProfile();

        // Subscribe to message events
        Dispatcher.subscribe("MESSAGE_CREATE", this.onMessage);        
        Dispatcher.subscribe("MESSAGE_DELETE", this.onMessageDelete);
    }

    onMessage = ({channelId, message}) => {
        try {
            const roomId = message.guild_id ? message.guild_id : channelId;
            
            if (!this.lastMessageApi.cache[roomId]) this.lastMessageApi.cache[roomId] = {};

            this.lastMessageApi.cache[roomId][message.author.id] = {
                data: {
                    body: {
                        messages: [
                            [{...message, hit: true}]
                        ]
                    }
                },
                fetch: Date.now()
            };
            
        } catch (error) {
            Logger.error(error);
        }
    }

    onMessageDelete = ({channelId, messageId}) => {
        try {
            
            if (!this.lastMessageApi.cache[channelId]) return;

            const userIds = Object.keys(this.lastMessageApi.cache[channelId]);

            for (const userId of userIds) {
                const chunk = this.lastMessageApi.cache[channelId][userId];
                const index = chunk?.data?.body?.messages.findIndex(e => e?.[0]?.id === messageId);

                if (~index) {
                    chunk.data.body.messages.splice(index, 1);
                }
            }
        } catch (error) {
            Logger.error("Error in MessageDelete event:\n", error);
        }
    }

    async patchUserPopout() {
        const UserPopout = await ReactComponents.getComponentByName("UserPopout", getClass(["userPopout"], ["userPopout"], [], true));
        const UserPopoutHeader = WebpackModules.getModule(m => m.default?.displayName === "UserPopoutHeader");

        const patch = (user, tree, type) => {
            const WrappedJoinedAt = this.joinedApi.task(user.id);
            const WrappedCreatedAt = this.createdApi.task(user.id);
            const WrappedLastMessage = this.lastMessageApi.task(user);

            tree.children.splice(2, 0, <ErrorBoundary key={type} id="UserPopoutHeader" mini>
                <div className={Utilities.joinClassNames(dateStyles.container, Settings.get("useIcons", true) ? dateStyles.icons : dateStyles.text)}>
                    {Settings.get("created_show_up", true) && <WrappedCreatedAt key="created-date"/>}
                    {Settings.get("joined_show_up", true) && <WrappedJoinedAt key="joined-date"/>}
                    {Settings.get("lastmessage_show_up", true) && <WrappedLastMessage key="lastmessage-date"/>}
                </div>
            </ErrorBoundary>);
        };

        Patcher.after(UserPopoutHeader, "default", (_, [{user}],  returnValue) => {
            if (this.promises.cancelled) return;
            const tree = Utilities.findInReactTree(returnValue, m => m?.className?.indexOf("headerTop") > -1);
            if (!Array.isArray(tree?.children) || !user) return;
            patch(user, tree, "PopoutHeader");
        });

        Patcher.after(UserPopout.component.prototype, "renderHeader", (thisObject, _, returnValue) => {
            const tree = Utilities.findInReactTree(returnValue, e => e && e.direction);
            if (!Array.isArray(tree?.children) || !thisObject.props.user) return returnValue;
            patch(thisObject.props.user, tree, "RenderHeader");
        });

        const titleClassName = getClass(["bodyTitle"], ["bodyTitle"]);

        Patcher.after(UserPopout.component.prototype, "renderBody", (thisObject, _, returnValue) => {
            if (this.promises.cancelled) return;
            const tree = Utilities.findInReactTree(returnValue, e => e?.className && Array.isArray(e.children));
            if (!Array.isArray(tree?.children)) return returnValue;
            const Connections = this.connectionsApi.task(thisObject.props.user);

            tree.children.unshift(
                <ErrorBoundary id="UserPopoutBody" mini>
                    <Connections titleClassName={titleClassName} />
                </ErrorBoundary>
            );
        });

        UserPopout.forceUpdateAll();
    }

    async patchUserProfile() {
        const UserProfile = await ReactComponents.getComponentByName("UserProfileBody", getClass(["root", "topSectionNormal", "topSectionStreaming"], ["root"], [], true));
    
        Patcher.after(UserProfile.component.prototype, "renderHeader", (thisObject, _, returnValue) => {
            if (this.promises.cancelled) return;
            const tree = Utilities.findInReactTree(returnValue, n => n?.className?.indexOf("headerInfo") > -1);
            if (!tree) return;
            if (!thisObject.props.user) return;

            const WrappedJoinedAt = this.joinedApi.task(thisObject.props.user.id);
            const WrappedCreatedAt = this.createdApi.task(thisObject.props.user.id);
            const WrappedLastMessage = this.lastMessageApi.task(thisObject.props.user);
            
            tree.children.push(<ErrorBoundary id="UserProfile" mini>
                <div className={Utilities.joinClassNames(dateStyles.container, dateStyles.userProfile, Settings.get("useIcons", true) ? dateStyles.icons : dateStyles.text)}>
                    {Settings.get("created_show_profile", true) && <WrappedCreatedAt />}
                    {Settings.get("joined_show_profile", true) && <WrappedJoinedAt />}
                    {Settings.get("lastmessage_show_profile", true) && <WrappedLastMessage />}
                </div>
            </ErrorBoundary>);
         });

        UserProfile.forceUpdateAll();
    }

    onStop() {
        // Unpatch
        Patcher.unpatchAll();

        // Unsubscribe from message events
        Dispatcher.unsubscribe("MESSAGE_CREATE", this.onMessage);
        Dispatcher.unsubscribe("MESSAGE_DELETE", this.onMessageDelete);

        // Remove styles
        stylesheet.remove();

        this.promises.cancel();
    }
}