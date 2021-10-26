import {useStateFromStoresObject} from "@discord/flux";
import {Games, Status} from "@discord/stores";
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
    [/youtube/i, () => <img src={Connections.get("youtube").icon.darkSVG} width="20" height="20" />],
    [/twitch/i, Twitch],
    [/google\schrome/i, GoogleChrome] // for green
];

export function ActivityIcon({activity}) {
    const {game, showGamepad} = useStateFromStoresObject([Games, Settings], () => ({
        showGamepad: Settings.get("showGamepad", true), 
        game: Games.getGame(activity.application_id)
    }), [activity]);
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
        ? <Gamepad />
        : null;
}
        
export function noopNull() {return null;}
        
export function ActivitiesFilter(activity, index, target) {
    if (activity?.type === 4) return false;
    
    return target.indexOf(activity) === index;
};

export default function Activity({user}) {
    const {activity, showActivityIcons, disabled} = useStateFromStoresObject([Status, Settings], () => ({
        activity: Status.getActivities(user.id).filter(ActivitiesFilter)[0],
        showActivityIcons: Settings.get("activityIcons", true),
        disabled: (user?.bot && Settings.get("disableIconsForBots", true))
    }), [user]);
    
    if (!showActivityIcons || !activity || disabled) return null;

    return (
        <Tooltip text={activity.name} className={styles.container} position="left">
            <ActivityIcon className={styles.icon} activity={activity} />
        </Tooltip>
    );
};