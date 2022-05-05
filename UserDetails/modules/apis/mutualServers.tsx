/// <reference path="../../../types/main.d.ts" />

import {GuildActions, ProfileActions} from "@discord/actions";
import {TooltipContainer as Tooltip} from "@discord/components";
import {useStateFromStores} from "@discord/flux";
import {Messages} from "@discord/i18n";
import {Dispatcher} from "@discord/modules";
import {UserProfile, Users} from "@discord/stores";
import {joinClassNames} from "@discord/utils";
import {Logger, WebpackModules} from "@zlibrary";
import React, {useEffect, useState} from "react";
import Error from "../components/icons/error";
import Strings from "../strings";
import styles from "./mutualServers.scss";
import {useSettings} from "./util";

const FriendsStore = WebpackModules.getByProps("getMutualGuilds");
const {Heading} = WebpackModules.getByProps("Heading") ?? {Heading: () => null};
const WindowStore = WebpackModules.getByProps("isFocused");

export function MutualServer({guild, nick, onClick}) {
    const [isMouseOver, setMouseOver] = useState(false);
    const isWindowFocused = useStateFromStores([WindowStore], () => WindowStore.isFocused());

    return (
        <Tooltip key={guild.id} text={nick ? `${guild.name} (${nick})` : guild.name} position="top" className={styles.mutualGuild}>
            {guild.icon
                ? <img
                    onMouseOver={() => setMouseOver(true)}
                    onMouseLeave={() => setMouseOver(false)}
                    src={guild.getIconURL(128, isMouseOver && isWindowFocused)}
                    onClick={() => onClick(guild.id)}
                />
                : <div className={styles.guildAcronym} onClick={() => onClick(guild.id)}>{guild.acronym}</div>
            }
        </Tooltip>
    );
};

export default function MutualServers({user}) {
    const settings = useSettings({
        showMutualGuilds: true,
        hideMutualGuildsCurrentUser: true,
        stackMutualServers: false,
        showEmptyMutualGuilds: true
    });

    if (!settings.showMutualGuilds || (settings.hideMutualGuildsCurrentUser && user.id === Users.getCurrentUser().id)) return null;
    
    const mutualGuilds = useStateFromStores([FriendsStore], () => FriendsStore.getMutualGuilds(user.id));
    const [message, setMessage] = useState("");

    useEffect(() => {
        if (Array.isArray(mutualGuilds) || UserProfile.isFetching(user.id)) return;

        Dispatcher.wait(() => {
            ProfileActions.fetchProfile(user.id)
                .catch(error => {
                    if (~error?.message?.indexOf("Already dispatching")) return;
                    Logger.error(`Failed to fetch profile for ${user.id}:\n`, error);
                    setMessage(Strings.get("FAILED_TO_FETCH"));
                });
        });
    }, []);

    return Array.isArray(mutualGuilds)
        ? mutualGuilds.length
            ? (
                <div className={styles.body}>
                    <Heading level={3} variant="eyebrow" className={styles.header} uppercase muted>{Messages.MUTUAL_GUILDS}</Heading>
                    <div className={joinClassNames(styles.guilds, settings.stackMutualServers && styles.stack)}>
                        {
                            mutualGuilds.map(props => <MutualServer {...props} onClick={GuildActions.transitionToGuildSync} />)
                        }
                    </div>
                </div>
            )
            : settings.showEmptyMutualGuilds && (
                <Heading level={3} variant="eyebrow" className={styles.header} uppercase muted>
                    {Strings.get("NO_MUTUAL_GUILDS")}
                </Heading>
            )
        : (
            <React.Fragment>
                <Heading level={3} variant="eyebrow" className={styles.header} uppercase muted>
                    {Strings.get(message ? "NO_MUTUAL_GUILDS" : "LOADING_MUTUAL_GUILDS")}
                </Heading>
                {message && (
                    <Tooltip text={message} position="top">
                        <Error />
                    </Tooltip>
                )}
            </React.Fragment>
        );
};