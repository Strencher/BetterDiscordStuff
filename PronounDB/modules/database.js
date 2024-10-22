import Dexie from "dexie";
import React from "react";
import { Net, Webpack } from "@api";

import { Endpoints, Pronouns } from "../data/constants";
import pkg from "../package.json";
import Settings from "./settings";
import { formatString } from "./shared";

const db = new Dexie("Pronouns");
const dispatcher = Dexie.Events(null, "update");

const UserProfileStore = Webpack.getStore("UserProfileStore");

db.version(1).stores({
    pronouns: "id, pronouns, expiresAt"
});

db.open();

const users = [], customPronouns = Settings.get("customPronouns");
for (const userId in customPronouns) {
    users.push({
        id: userId,
        pronouns: customPronouns[userId],
        expiresAt: 0
    });
}

db.pronouns.bulkPut(users);

let tmp = [], timeout = null;
export default class PronounsDB {
    static bulkLoad(userIds) {
        return new Promise(resolve => {
            const idsMap = userIds.reduce((users, userId) => {
                if (users.indexOf(userId) > -1) return users;
                users.push(userId);
                return users;
            }, []);
            console.debug(`[${pkg.name}] Performing fetch for [${idsMap.join(", ")}]`);

            Net.fetch(formatString(Endpoints.LOOKUP_BULK, { userIds: idsMap.join(",") }), {
                headers: {
                    "User-Agent": "BetterDiscord PronounDB Plugin v" + pkg.version
                }
            })
                .then(res => res.json())
                .then(allUsers => {
                    if (!allUsers || Object.keys(allUsers).length === 0) return;

                    let users = userIds.map(e => {
                        const user = allUsers[e];
                        let pronouns;

                        if (!user || !user.sets?.en || user.sets?.en?.length === 0)
                            pronouns = Pronouns.unspecified;
                        else if (user.sets.en.length > 1)
                            pronouns = user.sets.en.map(p => p[0].toUpperCase() + p.slice(1)).join("/");
                        else pronouns = Pronouns[user.sets.en[0]];

                        return {
                            id: e,
                            pronouns,
                            expiresAt: Date.now() + (30 * 60e3)
                        };
                    });

                    db.pronouns.bulkPut(users);

                    for (const { id } of users) {
                        if (!allUsers[id]) continue;
                        console.debug(`[${pkg.name}] Updating for`, id);
                        dispatcher.update.fire(id);
                    }

                    resolve(users);
                })
                .catch(error => {
                    console.error(`[${pkg.name}] Fetch error: `, error);
                });
        });
    }

    static async fetchPronouns(userId) {
        if (~tmp.indexOf(userId)) return null;

        if (!timeout) {
            timeout = setTimeout(() => {
                timeout = null;
                this.bulkLoad(tmp);
                tmp = [];
            }, 100);
        }

        tmp.push(userId);
        return null;
    }

    static async getPronounsFromDB(userId, request = true) {
        const user = await db.pronouns.get(userId);
        if (!user && request) {
            return this.fetchPronouns(userId);
        }
        if (!user) return null;

        if (Date.now() >= user.expiresAt && user.expiresAt !== 0) {
            return this.fetchPronouns(userId);
        }
        return user.pronouns;
    }

    static async getPronouns(userId) {
        try {
            const UserProfile = UserProfileStore.getUserProfile(userId);
            const localPronouns = Settings.get("customPronouns")?.[userId];
            const discordPronouns = UserProfile?.pronouns;
            const pronounDB_Pronouns = await this.getPronounsFromDB(userId);

            const preferDiscordPronouns = Settings.get("preferDiscordPronouns", true);
            let pronouns, type;

            if (localPronouns) {
                pronouns = localPronouns;
                type = "Local Pronouns";
            } else if (preferDiscordPronouns) {
                pronouns = discordPronouns || pronounDB_Pronouns;
                type = discordPronouns ? "Discord Pronouns" : "PronounDB Pronouns";
            } else {
                pronouns = pronounDB_Pronouns || discordPronouns;
                type = pronounDB_Pronouns ? "PronounDB Pronouns" : "Discord Pronouns";
            }

            console.debug(`[${pkg.name}] Pronouns for ${userId}:`, pronouns, type);
            return { pronouns, type, userId };
        } catch (error) {
            console.error(`[${pkg.name}] An error occured while trying to get the Pronouns: `, error);
        }
    }

    static async setPronouns(userId, pronouns) {
        await db.pronouns.put({
            id: userId,
            expiresAt: 0,
            pronouns
        });
        dispatcher.update.fire(userId);
        Settings.set("customPronouns", Object.assign({}, Settings.get("customPronouns"), { [userId]: pronouns }));
    }

    static async removePronoun(userId) {
        const { [userId]: _, ...customPronouns } = Settings.get("customPronouns");
        Settings.set("customPronouns", customPronouns);
        await db.pronouns.delete(userId);
        dispatcher.update.fire(userId);
    }

    static connect(Component) {
        return props => {
            const [data, setData] = React.useState(null);

            React.useEffect(() => {
                const handler = async userId => {
                    if (userId !== props.userId) return;
                    const pronouns = await PronounsDB.getPronouns(userId);
                    setData(pronouns);
                };

                handler(props.userId);

                dispatcher("update", handler);

                return () => dispatcher.update.unsubscribe(handler);
            }, []);

            return React.createElement(Component, {
                ...props,
                data
            });
        };
    }
}