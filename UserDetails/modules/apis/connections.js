/// <reference path="../../../../typings/discord.d.ts" />
import React, {useState, useEffect} from "react";
import Badge from "../components/badge";
import ApiModule from "./api";
import Circle from "../components/blankslates/circle";
import Error from "../components/icons/error";
import Settings from "../Settings";
import {WebpackModules} from "@zlibrary";
import styles from "./connections.scss";
import {TooltipContainer as Tooltip} from "@discord/components";
import {useStateFromStores} from "@discord/flux";
import {UserProfile} from "@discord/stores";
import {ProfileActions} from "@discord/actions";
import {Logger} from "@zlibrary";
import Connections from "@discord/connections";

const Header = WebpackModules.getByDisplayName("Header");
export default class Userconnections extends ApiModule {
    get api() {return this.constructor.name;}

    task(user) {
        return () => {
            if (!Connections.filter(c => Settings.get("shownConnections", {})[c.type]).length || user.bot) return null;
            const connections = useStateFromStores([UserProfile], () => UserProfile.getUserProfile(user.id)?.connectedAccounts);
            const [message, setMessage] = useState("");
            
            useEffect(() => {
                if (UserProfile.isFetching(user.id)) return;
                ProfileActions.fetchProfile(user.id)
                    .catch(error => {
                        if (~error?.message?.indexOf("Already dispatching")) return;
                        Logger.error(`Failed to fetch profile for ${user.id}:\n`, error);
                        setMessage("Failed to fetch!");
                    });
            }, [true]);

            return <div className={styles.connectionsBody}>
                {   
                    (!connections?.length && Settings.get("showEmptyConnections", true)) || connections?.length
                        ? <Header className={styles.container} size={Header.Sizes.SIZE_12} className={styles.header} uppercase muted>{connections?.length ? "connections" : "no connections"}</Header>
                        : null
                }
                {
                    Array.isArray(connections)
                        ? connections?.length 
                            ? <div className={styles.connections}>
                                {
                                    connections
                                        .filter(e => Settings.get("shownConnections")[e.type])
                                        .map(badge => <Badge item={badge} key={badge.type} />)
                                }
                                </div> 
                            : null
                        : message
                            ? <Tooltip text={message}><Error className={styles.errorIcon} /></Tooltip>
                            : <Tooltip text="Loading Connections...">{Connections.filter(e => Settings.get("shownConnections")[e.type]).map(() => <Circle className={styles.loading} />)}</Tooltip>
                }
            </div>;
        };
    }
}