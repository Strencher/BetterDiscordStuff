import {useStateFromStores} from "@discord/flux";
import {Activities, Games} from "@discord/stores";
import Spotify from "./icons/spotify";
import Twitch from "./icons/twitch";
import Youtube from "./icons/youtube";
import Gamepad from "./icons/gamepad";
import {useMemo} from "react";
import styles from "./activity.scss";
import {TooltipContainer as Tooltip} from "@discord/components";
import Settings from "../Settings";
import GoogleChrome from "./icons/googleChrome";
import Connections from "@discord/connections";

export const byName = [
    [/spotify/i, Spotify],
    [/youtube/i, () => <img src={Connections.get("youtube").icon.color} width="20" height="20" />],
    [/twitch/i, Twitch],
    [/google\schrome/i, GoogleChrome] // for green
];

export function ActivityIcon({activity}) {
    const {game, showGamepad} = useStateFromStores([Games, Settings], () => ({
        showGamepad: Settings.get("showGamepad", true), 
        game: Games.getGame(activity.application_id)
    }), null, _.isEqual);
    const icon = useMemo(() => byName.find(([regex]) => regex.test(activity.name || activity.id)), [game]);

    if (icon) {
        const Icon = icon[1];
        return (
            <Icon />
        );
    };

    if (game && game.getIconURL()) {
        return (
            <img src={game.getIconURL()} width="20" height="20"/>
        );
    }

    return showGamepad 
        ? (
            <Gamepad />
        ) 
        : null;
}

export function noopNull() {return null;}

export function ActivitiesFilter(activity, index, target) {
    if (activity?.type === 4) return false;
    
    return target.indexOf(activity) === index;
};

export default function Activity({user}) {
    const {activity, showActivityIcons} = useStateFromStores([Activities, Settings], () => ({
        activity: Activities.getActivities(user.id).filter(ActivitiesFilter)[0],
        showActivityIcons: Settings.get("activityIcons", true)
    }), null, _.isEqual);
    
    if (!showActivityIcons || !activity) return null;

    return (
        <Tooltip text={activity.name} className={styles.container} position="left">
            <ActivityIcon className={styles.icon} activity={activity} />
        </Tooltip>
    );
};