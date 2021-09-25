/// <reference path="../../../bdbuilder/typings/main.d.ts" />

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
import LastMessage, {LastMessageResponse} from "../stores/lastMessage";
import {useStateFromStores} from "@discord/flux";
import Strings from "../strings";
import {Keys} from "../locales";
import {Logger} from "@zlibrary";
import {parseTime} from "./util";

export const DEFAULT_FORMAT = "Last Message: $hour:$minute:$second, $day.$month.$year $daysago days";

export default function LastMessageDate({user}) {
    const format = Settings.get("lastmessage_format", DEFAULT_FORMAT);
    const roomId = SelectedGuilds.getGuildId() || SelectedChannels.getChannelId();
    const isGuild = Boolean(SelectedGuilds.getGuildId());
    const lastMessage: LastMessageResponse = useStateFromStores([LastMessage], () => LastMessage.get(user.id, roomId));
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        if (LastMessage.isFetching(user.id, roomId) || LastMessage.has(user.id, roomId)) return;

        if (!roomId) return setErrorMessage("Cannot resolve channel/guild id.");
    
        LastMessage.fetch(user.id, roomId, isGuild)
            .catch(error => {
                Logger.error(`Failed to fetch LastMessage from ${user.tag}:\n`, error);
            });
    }, []);

    const transitionToMessage = () => {
        if (!lastMessage.channelId || !lastMessage.messageId) return;
        Navigation.replaceWith(isGuild
            ? `/channels/${SelectedGuilds.getGuildId()}/${lastMessage.channelId}/${lastMessage.messageId}`
            : `/channels/@me/${lastMessage.channelId}/${lastMessage.messageId}`
        );
    };
    
    const failed = lastMessage?.status === "failure";
    const shouldUseIcon = Settings.get("useIcons", true);

    return lastMessage?.data && !failed
        ? shouldUseIcon
            ? (
                <Tooltip text={parseTime(format, lastMessage.data)}>
                    <TextBubble onClick={transitionToMessage} />
                </Tooltip>
            )
            : (
                <TextScroller onClick={transitionToMessage}>{parseTime(format, lastMessage.data)}</TextScroller>
            )
        : errorMessage || (failed && Strings.hasString(lastMessage.data))
            ? shouldUseIcon
                ? (
                    <Tooltip text={errorMessage || Strings.get(lastMessage.data as keyof Keys)}>
                        <Error className={styles.errorIcon} />
                    </Tooltip>
                )
                : (
                    <TextScroller style={{color: "red"}}>
                        {errorMessage || Strings.get(lastMessage.data as keyof Keys)}
                    </TextScroller>
                )
            : (
                <Tooltip text={Strings.get("LOADING_LAST_MESSAGE")}>
                    {
                        shouldUseIcon
                            ? (
                                <Cube className={styles.loading} />
                            )
                            : (
                                <LoadingText />
                            )
                    }
                </Tooltip>
            )
};