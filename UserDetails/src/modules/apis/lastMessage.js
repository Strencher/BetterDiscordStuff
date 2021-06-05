import ApiModule from "./api";
import React, {useState, useEffect} from "react";
import TextScroller from "../components/textscroller";
import TextBubble from "../components/icons/textbubble";
import Cube from "../components/blankslates/cube";
import Error from "../components/icons/error";
import Settings from "../Settings";
import styles from "./dates.scss";
import {TooltipContainer as Tooltip} from "@discord/components";
import {SelectedChannels, SelectedGuilds} from "@discord/stores";
import LoadingText from "../components/loadingtext";
import {Navigation} from "@discord/utils";
import LastMessage from "../stores/lastMessage";
import {useStateFromStores} from "@discord/flux";

export default class LastMessageApi extends ApiModule {
    get api() {return this.constructor.name;}
    get format() {return Settings.get("lastmessage_format", "Last Message: $hour:$minute:$second, $day.$month.$year $daysago days");}

    task(user) {
        return () => {
            const roomId = SelectedGuilds.getGuildId() || SelectedChannels.getChannelId();
            const isGuild = Boolean(SelectedGuilds.getGuildId());
            const lastMessage = useStateFromStores([LastMessage], () => LastMessage.get(user.id, roomId));
            const [errorMessage, setErrorMessage] = useState("");

            useEffect(() => {
                if (LastMessage.isFetching(user.id)) return;

                if (!roomId) return setErrorMessage("Cannot resolve channel/guild id.");
            
                LastMessage.fetch(user.id, roomId, isGuild)
                    .catch(error => {
                        this.error(`Failed to fetch LastMessage from ${user.tag}:\n`, error);
                    });
            }, [true]);

            const transitionToMessage = () => {
                if (!lastMessage.channelId || !lastMessage.messageId) return;
                Navigation.replaceWith(isGuild 
                    ? `/channels/${SelectedGuilds.getGuildId()}/${lastMessage.channelId}/${lastMessage.messageId}` 
                    : `/channels/@me/${lastMessage.channelId}/${lastMessage.messageId}`
                );
            }

            return lastMessage?.date
                ? Settings.get("useIcons", true)
                    ? <Tooltip text={this.parseTime(this.format, lastMessage.date)}>
                        <TextBubble onClick={transitionToMessage} />
                    </Tooltip>
                    : <TextScroller onClick={transitionToMessage}>{this.parseTime(this.format, lastMessage.date)}</TextScroller>
                : errorMessage
                    ? <Tooltip text={errorMessage}><Error className={styles.errorIcon} /></Tooltip>
                    : <Tooltip text="Loading Last Message...">
                        {
                            Settings.get("useIcons", true) 
                                ? <Cube className={styles.loading} />
                                : <LoadingText />
                        }
                    </Tooltip> 
        };
    }
}