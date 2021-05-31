import React, {useState, useEffect} from "react";
import Badge from "../components/badge";
import defaultconnections from "../data/defaultConnections";
import ApiModule from "./api";
import Circle from "../components/blankslates/circle";
import Error from "../components/icons/error";
import Eventhandler from "../eventhandler";
import {DiscordModules} from "@zlibrary";
import Utilities from "../Utilities";
import Settings from "../Settings";
import styles from "./connections.scss";
import {TooltipContainer as Tooltip} from "@discord/components";

const constants = DiscordModules.DiscordConstants;

export default class Userconnections extends ApiModule {
    get api() {return this.constructor.name;}

    get shownConnections() {
        const connections = Settings.get("shownConnections", defaultconnections);

        return Object.keys(connections).reduce((items, curr) => (items[curr] = Boolean(connections[curr]), items), {});
    }

    get shownConnectionsAsArray() {
        const connections = this.shownConnections;
        return Object.keys(connections).reduce((items, item, _) => {
            if (connections[item]) items.push(item);
            return items;
        }, []);
    }

    task(user) {
        return React.memo(({titleClassName}) => {
            if (!this.shownConnectionsAsArray.length || user.bot) return null;
            const [connections, setConnections] = useState(null);
            const [message, setMessage] = useState("");

            useEffect(() => {
                const event = new Eventhandler();
                event
                    .on("done", data => {
                        if (!data || !Array.isArray(data.body?.connected_accounts)) return setConnections([]);
                        const shown = this.shownConnections;
                        const connections = data.body.connected_accounts.filter(e => shown[e.type]);
                        setConnections(connections);
                    })
                    .on("error", error => {
                        let text = "Failed to fetch data.";
                        if (error.body?.code === 50001) text = "Cannot access Profile";
                        setMessage(text + ".");
                        this.error(text + " from \"" + user.id + "\"");
                    });
                    
                this.get({
                    url: constants.Endpoints.USER_PROFILE(user.id)
                }, user.id, user.id, event);

                return () => event.cancel();
            }, [true]);

            return <div className={styles.connectionsBody}>
                <div className={Utilities.joinClassNames(titleClassName, styles.container)}>{connections?.length ? "connections" : "no connections"}</div>
                {
                    Array.isArray(connections)
                        ? connections.length ? <div className={styles.connections}>{connections.map(badge => <Badge {...badge} />)}</div> : null
                        : message
                            ? <Tooltip text={message}><Error className={styles.errorIcon} /></Tooltip>
                            : <Tooltip text="Loading Connections...">{this.shownConnectionsAsArray.map(() => <Circle className={styles.loading} />)}</Tooltip>
                }
            </div>;
        });
    }
}