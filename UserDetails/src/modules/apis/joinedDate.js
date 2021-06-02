import ApiModule from "./api";
import React, {useState, useEffect, useLayoutEffect, useMemo} from "react";
import TextScroller from "../components/textscroller";
import Calendar from "../components/icons/calendar";
import Cube from "../components/blankslates/cube";
import Error from "../components/icons/error";
import {WebpackModules} from "@zlibrary";
import Settings from "../Settings";
import styles from "./dates.scss";
import {TooltipContainer as Tooltip} from "@discord/components";
import {SelectedGuilds} from "@discord/stores";
import LoadingText from "../components/loadingtext";
import {Dispatcher} from "@discord/modules";

const GuildActions = WebpackModules.getByProps("requestMembersById");

export default class JoinedAt extends ApiModule {
    get api() {return this.constructor.name;}

    task(userId) {
        return () => {
            const settingsFormat = Settings.get("joined_format", "Joined At: $hour:$minute:$second, $day.$month.$year $daysago days");
            const guildId = SelectedGuilds.getGuildId();
            const byCache = this.getByCache(guildId, userId);
            const [joined, setJoined] = useState(byCache ? this.parseTime(settingsFormat, byCache) : null);
            const [message, setMessage] = useState("");

            useEffect(() => {
                if (joined) return void 0;
                if (!guildId) return void setJoined("Joined At: --- --- ---");
                GuildActions.requestMembersById(guildId, userId);

                const callback = chunk => {
                    if (chunk?.guildId === guildId) {
                        const member = chunk.members?.find(member => member?.user?.id === userId);
                        if (!member) {
                            setMessage("Member was not found!");
                            this.error(`Member "${userId}" was not found on guild "${guildId}"`);
                            this.setCache(guildId, userId, {
                                data: null,
                                fetch: Date.now()
                            })
                        } else if (!~chunk.notFound?.indexOf(userId)) {
                            setJoined(this.parseTime(settingsFormat, new Date(member.joined_at)));
                            this.setCache(guildId, userId, {
                                data: new Date(member.joined_at),
                                fetch: Date.now()
                            });
                        }

                        Dispatcher.unsubscribe("GUILD_MEMBERS_CHUNK", callback);
                    }
                }

                Dispatcher.subscribe("GUILD_MEMBERS_CHUNK", callback);
            }, []);

            const useIcons = Settings.get("useIcons", true);

            return joined
                ? useIcons
                    ? <Tooltip text={joined}><Calendar /></Tooltip>
                    : <TextScroller>{joined}</TextScroller>
                : message
                    ? useIcons
                        ? <Tooltip text={message}><Error className={styles.errorIcon} /></Tooltip>
                        : <TextScroller style={{color: "red"}}>{message}</TextScroller>
                    : <Tooltip text="Loading JoinedAt...">
                        {
                            useIcons 
                                ? <Cube className={styles.loading} />
                                : <LoadingText />
                        }
                    </Tooltip>;
        };
    }
}