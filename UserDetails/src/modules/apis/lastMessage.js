import ApiModule from "./api";
import React, {useState, useEffect} from "react";
import TextScroller from "../components/textscroller";
import TextBubble from "../components/icons/textbubble";
import Cube from "../components/blankslates/cube";
import Error from "../components/icons/error";
import Eventhandler from "../eventhandler";
import {WebpackModules, DiscordModules, Logger} from "@zlibrary";
import Settings from "../Settings";
import styles from "./dates.scss";
import {TooltipContainer as Tooltip} from "@discord/components";
import {SelectedChannels, SelectedGuilds} from "@discord/stores";
import LoadingText from "../components/loadingtext";
import {APIModule} from "@zlibrary/discord";
import {Navigation} from "@discord/utils";

const {stringify} = WebpackModules.getByProps("stringify", "parse", "encode");
const constants = DiscordModules.DiscordConstants;

export default class LastMessage extends ApiModule {
    get api() {return this.constructor.name;}

    task(user) {
        return () => {
            const [lastMessage, setLastMessage] = useState({messageId: null, channelId: null, date: null});
            const [errorMessage, setErrorMessage] = useState("");
            const isGuild = Boolean(SelectedGuilds.getGuildId());

            useEffect(() => {
                if (user.bot && user.discriminator === "0000") return setLastMessage({
                    date: "Last Message: --- --- ---"
                });
                const roomId = SelectedGuilds.getGuildId() || SelectedChannels.getChannelId();
                if (!roomId) return setLastMessage({
                    date: "Last Message: --- --- ---"
                });

                const byCache = this.getByCache(roomId, user.id);
                if (byCache) {
                    const message = byCache.body.messages[0].find(e => e.hit && e.author.id === user.id);
                    setLastMessage({
                        messageId: message.id,
                        channelId: message.channel_id,
                        date: this.parseTime(
                            Settings.get(
                                "lastmessage_format",
                                "Last Message: $hour:$minute:$second, $day.$month.$year $daysago days"
                            ), new Date(message.timestamp)
                        )
                    }); 
                }

                APIModule.get({
                    url: isGuild ? constants.Endpoints.SEARCH_GUILD(roomId) : constants.Endpoints.SEARCH_CHANNEL(roomId),
                    query: stringify({author_id: user.id})
                }).then(data => {
            	    if (data?.body?.messages?.length) {
                        const message = data.body.messages[0].find(e => e.hit && e.author.id === user.id);
                        if (message) {
                            const data = {
                                messageId: message.id,
                                channelId: message.channel_id,
                                date: this.parseTime(
                                    Settings.get(
                                        "lastmessage_format",
                                        "Last Message: $hour:$minute:$second, $day.$month.$year $daysago days"
                                    ), new Date(message.timestamp)
                                )
                            };
                            this.setCache(roomId, user.id, {
                                data: {
                                    body: {messages: [[message]]}
                                }
                            });
                            setLastMessage(data);
                        }
                    } else setLastMessage({
                        date: "Last Message: --- --- ---"
                    });
                }).catch(error => {
                    setErrorMessage("Failed to fetch!");
                    this.error(`Fetch for ${userId} failed!\n`, error);
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
        };
    }
}