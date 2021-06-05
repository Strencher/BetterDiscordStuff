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
import {WebpackModules, Patcher, ReactComponents} from "@zlibrary";
import dateStyles from "./modules/apis/dates.scss";
import Activity, {ActivitiesFilter} from "./modules/components/activity";
import {ActivityTypes} from "@discord/constants";
import Gamepad from "./modules/components/icons/gamepad";
import {connectStores, useStateFromStores} from "@discord/flux";
import Headphones from "./modules/components/icons/headphones";

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
        return <SettingsPanel />;
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
        this.patchMemberListItem();
        this.patchUserActivityStatus();
    }

    async patchUserPopout() {
        const UserPopout = await ReactComponents.getComponentByName("UserPopout", getClass(["userPopout"], ["userPopout"], [], true));
        const UserPopoutInfo = WebpackModules.getModule(m => m.default?.displayName === "UserPopoutInfo");
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

        Patcher.after(UserPopoutHeader, "default", (_, [{user}], returnValue) => {
            if (this.promises.cancelled) return;
            const tree = Utilities.findInReactTree(returnValue, m => m?.className?.indexOf("headerTop") > -1);
            if (!Array.isArray(tree?.children)) return;

            patch(user, tree, "PopoutHeader");
        });

        Patcher.after(UserPopoutInfo, "default", (_, [{user}],  returnValue) => {
            if (this.promises.cancelled) return;
            if (!Array.isArray(returnValue?.props?.children) || !user) return;
            patch(user, returnValue.props, "PopoutInfoHeader");
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
                <ErrorBoundary id="UserPopoutBody" mini key="connections">
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
        const RichActivity = WebpackModules.getModule(m => m.default.displayName === "RichActivity");
    
        Patcher.after(RichActivity, "default", (_, [props]) => {
            const shouldShow = useStateFromStores([Settings], () => Settings.get("activityIconState", 0));
            switch (shouldShow) {
                case 1: return;
                case 2: return null;
            }
            
            switch(props.type) {
                case ActivityTypes.PLAYING: return <Gamepad {...props}/>;
                case ActivityTypes.LISTENING: return <Headphones {...props}/>;
            }
        });
    }

    onStop() {
        // Unpatch
        Patcher.unpatchAll();

        // Remove styles
        stylesheet.remove();

        this.promises.cancel();
    }
}