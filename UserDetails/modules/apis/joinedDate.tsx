import React, {useState, useEffect} from "react";
import TextScroller from "../components/textscroller";
import Calendar from "../components/icons/calendar";
import Cube from "../components/blankslates/cube";
import Error from "../components/icons/error";
import Settings from "../Settings";
import styles from "./dates.scss";
import {TooltipContainer as Tooltip} from "@discord/components";
import {SelectedGuilds} from "@discord/stores";
import LoadingText from "../components/loadingtext";
import JoinedAtStore, { JoinedAtType } from "../stores/joinedAt";
import {useStateFromStores} from "@discord/flux";
import Strings from "../strings";
import type {Keys} from "../locales";
import {parseTime} from "./util";

export const DEFAULT_FORMAT = "Joined At: $hour:$minute:$second, $day.$month.$year $daysago days";

export default function JoinedAtDate({userId}: {userId: string}) {
    const format = Settings.get("joined_format", DEFAULT_FORMAT);
    const guildId = SelectedGuilds.getGuildId();
    const joined: JoinedAtType = useStateFromStores([JoinedAtStore], () => JoinedAtStore.getDate(guildId, userId));
    const [message, setMessage] = useState("");
    
    useEffect(() => {
        if (JoinedAtStore.has(guildId, userId) || JoinedAtStore.isFetching(guildId, userId)) return void 0;
        if (!guildId) return void setMessage(Strings.get("FAILED_TO_FETCH"));
        
        JoinedAtStore.fetch(guildId, userId);
    }, []);

    const useIcons = Settings.get("useIcons", true);
    const isFailed = !joined || joined.status === "failure";

    return !isFailed
        ? useIcons
            ? <Tooltip text={parseTime(format, joined.data)}><Calendar /></Tooltip>
            : <TextScroller>{parseTime(format, joined.data)}</TextScroller>
        : message || (isFailed && Strings.hasString(joined?.data))
            ? useIcons
                ? <Tooltip text={message || Strings.get(joined.data as keyof Keys)}><Error className={styles.errorIcon} /></Tooltip>
                : <TextScroller style={{color: "red"}}>{message || Strings.get(joined.data as keyof Keys)}</TextScroller>
            : <Tooltip text={Strings.get("LOADING_JOINED_AT")}>
                {
                    useIcons 
                        ? <Cube className={styles.loading} />
                        : <LoadingText />
                }
            </Tooltip>;
}