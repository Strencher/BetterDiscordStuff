import ApiModule from "./api";
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
import { useStateFromStores } from "@discord/flux";
import { Messages } from "@discord/i18n";

export default class JoinedAt extends ApiModule {
    get api() {return this.constructor.name;}
    get format() { return Settings.get("joined_format", "Joined At: $hour:$minute:$second, $day.$month.$year $daysago days");}

    task(userId) {
        return React.memo(() => {
            const guildId = SelectedGuilds.getGuildId();
            const joined: JoinedAtType = useStateFromStores([JoinedAtStore], () => JoinedAtStore.getDate(guildId, userId));
            const [message, setMessage] = useState("");
            
            useEffect(() => {
                if (JoinedAtStore.has(guildId, userId) || JoinedAtStore.isFetching(guildId, userId)) return void 0;
                if (!guildId) return void setMessage(Messages.FAILED_TO_FETCH);
                
                JoinedAtStore.fetch(guildId, userId);
            }, []);

            const useIcons = Settings.get("useIcons", true);
            const isFailed = !joined || joined.status === "failure";

            return !isFailed
                ? useIcons
                    ? <Tooltip text={this.parseTime(this.format, joined.data)}><Calendar /></Tooltip>
                    : <TextScroller>{this.parseTime(this.format, joined.data)}</TextScroller>
                : message || (isFailed && Messages[joined?.data as string])
                    ? useIcons
                        ? <Tooltip text={message || Messages[joined.data as string]}><Error className={styles.errorIcon} /></Tooltip>
                        : <TextScroller style={{color: "red"}}>{message || Messages[joined.data as string]}</TextScroller>
                    : <Tooltip text={Messages.LOADING_JOINED_AT}>
                        {
                            useIcons 
                                ? <Cube className={styles.loading} />
                                : <LoadingText />
                        }
                    </Tooltip>;
        });
    }
}