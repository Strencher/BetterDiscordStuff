import ApiModule from "./api";
import React, {useState, useEffect} from "react";
import TextScroller from "../components/textscroller";
import TextBubble from "../components/icons/textbubble";
import Cube from "../components/blankslates/cube";
import Error from "../components/icons/error";
import Eventhandler from "../eventhandler";
import {WebpackModules, DiscordModules} from "@zlibrary";
import Settings from "../Settings";
import styles from "./dates.scss";
import {TooltipContainer as Tooltip} from "@discord/components";
import {SelectedChannels, SelectedGuilds} from "@discord/stores";
import LoadingText from "../components/loadingtext";

const ChannelTransitioner = WebpackModules.getByProps("jumpToMessage");
const {stringify} = WebpackModules.getByProps("stringify", "parse", "encode");
const constants = DiscordModules.DiscordConstants;

export default class LastMessage extends ApiModule {
    get api() {return this.constructor.name;}

    task(user) {
        return React.memo(() => {
            const [lastMessage, setLastMessage] = useState({messageId: null, channelId: null, date: null});
            const [errorMessage, setErrorMessage] = useState("");

            useEffect(() => {
                if (user.bot && user.discriminator === "0000") return setLastMessage({
                    date: "Last Message: --- --- ---"
                });
                const roomId = SelectedGuilds.getGuildId() || SelectedChannels.getChannelId();
                const isGuild = Boolean(SelectedGuilds.getGuildId());
                if (!roomId) return setLastMessage({
                    date: "Last Message: --- --- ---"
                });

                const event = new Eventhandler();

                event
                    .on("done", data => {
                        if (data && data.body?.messages?.length) {
                            const message = data.body.messages[0].find(e => e.hit && e.author.id === user.id);
                            if (message) {
                                return setLastMessage({
                                    messageId: message.id,
                                    channelId: message.channel_id,
                                    returnMessageId: null,
                                    flash: true,
                                    isPreload: void 0,
                                    date: this.parseTime(
                                        Settings.get(
                                            "lastmessage_format",
                                            "Last Message: $hour:$minute:$second, $day.$month.$year $daysago days"
                                        ), new Date(message.timestamp)
                                    )
                                });
                            }
                        }
                        setLastMessage({
                            date: "Last Message: --- --- ---"
                        });
                    })
                    .on("error", error => {
                        setErrorMessage("Failed to fetch data.");
                        this.error(error);
                    });

                this.get({
                    url: isGuild ? constants.Endpoints.SEARCH_GUILD(roomId) : constants.Endpoints.SEARCH_CHANNEL(roomId),
                    query: stringify({author_id: user.id})
                }, roomId, user.id, event);


                return () => event.cancel();
            }, [true]);

            const transitionToMessage = () => {
                if (!lastMessage.channelId || !lastMessage.messageId) return;
                ChannelTransitioner.jumpToMessage(lastMessage);
            }

            return lastMessage
                ? Settings.get("useIcons", true)
                    ? <Tooltip text={lastMessage?.date}>
                        <TextBubble onClick={transitionToMessage} />
                    </Tooltip>
                    : <TextScroller onClick={transitionToMessage}>{lastMessage?.date}</TextScroller>
                : errorMessage
                    ? <Tooltip text={errorMessage}><Error className={styles.errorIcon} /></Tooltip>
                    : <Tooltip text="Loading Last Message...">
                        {
                            Settings.get("useIcons", true) 
                                ? <Cube className={styles.loading} />
                                : <LoadingText />
                        }
                    </Tooltip> 
        });
    }
}