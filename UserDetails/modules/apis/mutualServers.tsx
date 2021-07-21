/// <reference path="../../../bdbuilder/typings/main.d.ts" />

import { GuildActions, ProfileActions } from "@discord/actions";
import { TooltipContainer as Tooltip } from "@discord/components";
import { useStateFromStores } from "@discord/flux";
import { Messages } from "@discord/i18n";
import { UserProfile, Users } from "@discord/stores";
import { joinClassNames } from "@discord/utils";
import { Logger, WebpackModules } from "@zlibrary";
import { useEffect, useState } from "react";
import Error from "../components/icons/error";
import Settings from "../Settings";
import ApiModule from "./api";
import styles from "./mutualServers.scss";

const FriendsStore = WebpackModules.getByProps("getMutualGuilds");
const Header = WebpackModules.getByDisplayName("Header");
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
                    src={guild.getIconURL(isMouseOver && isWindowFocused)}
                    onClick={() => onClick(guild.id)}
                />
                : <div className={styles.guildAcronym} onClick={() => onClick(guild.id)}>{guild.acronym}</div>
            }
        </Tooltip>
    );
};

export default class MutualServers extends ApiModule {
    get currentUserId() { return Users.getCurrentUser().id;}

    transitionToGuild(guildId: string) {
        GuildActions.transitionToGuildSync(guildId);
    }

    task(user) {
        return () => {
            if (!Settings.get("showMutualGuilds", true) || (Settings.get("hideMutualGuildsCurrentUser", true) && user.id === this.currentUserId)) return null;
            const mutualGuilds = useStateFromStores([FriendsStore], () => FriendsStore.getMutualGuilds(user.id));
            const [message, setMessage] = useState("");

            useEffect(() => {
                if (Array.isArray(mutualGuilds) || UserProfile.isFetching(user.id)) return;
                ProfileActions.fetchProfile(user.id)
                    .catch(error => {
                        if (~error?.message?.indexOf("Already dispatching")) return;
                        Logger.error(`Failed to fetch profile for ${user.id}:\n`, error);
                        setMessage(Messages.FAILED_TO_FETCH);
                    });
            }, []);

            return Array.isArray(mutualGuilds)
                ? (Settings.get("showEmptyMutualGuilds", true) && !mutualGuilds.length)
                    ? null
                    : <div className={styles.body}>
                        <Header size={Header.Sizes.SIZE_12} className={styles.header} uppercase muted>{Messages.MUTUAL_GUILDS}</Header>
                        <div className={joinClassNames(styles.guilds, Settings.get("stackMutualServers", true) && styles.stack)}>
                            {
                                mutualGuilds.map(props => <MutualServer {...props} onClick={this.transitionToGuild} />)
                            }
                        </div>
                    </div>
                : [
                    <Header size={Header.Sizes.SIZE_12} className={styles.header} uppercase muted>{message ? Messages.NO_MUTUAL_GUILDS : Messages.LOADING_MUTUAL_GUILDS}</Header>,
                    message ? (
                        <Tooltip text={message} position="top">
                            <Error />
                        </Tooltip>
                    ) : null
                ].filter(e => e)
        };
    }
}