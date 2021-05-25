import {Logger} from "@zlibrary";
import Dexie from "dexie";
import https from "https";
import {useEffect, useReducer, useState} from "react";
import {Endpoints} from "../data/constants";
import Settings from "./settings";
const db = new Dexie("Pronouns");
import pkg from "../package.json";
const dispatcher = Dexie.Events(null, "update");

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
    
            Logger.debug("Performing fetch for [", idsMap.join(", ") + " ]");

            https.get({
                href: Endpoints.LOOKUP_BULK.format({userIds: idsMap.join(",")}),
                headers: {
                    "User-Agent": "BetterDiscord PronounDB Plugin v" + pkg.info.version
                }
            }, res => {
                let chunks = [];
                res.on("data", chunk => chunks.push(chunk));
                res.on("end", () => {
                    try {
                        const allUsers = BdApi.testJSON(chunks.join(""));
                        if (!allUsers || Object.keys(allUsers).length === 0) return; //TODO: show error log

                        let users = userIds.map(e => ({
                            id: e,
                            expiresAt: Date.now() + (30 * 60e3),
                            pronouns: allUsers[e] ?? null
                        }));

                        db.pronouns.bulkPut(users);
                        
                        for (const {id} of users) {
                            if (!allUsers[id]) continue;
                            Logger.info("Updating for", id);
                            dispatcher.update.fire(id);
                        }

                        resolve(users);
                    } catch (error) {
                        Logger.error("Fetch error: ",  error);   
                    }
                });
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

    static async getPronouns(userId, request = true) {
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

    static async setPronouns(userId, pronouns) {
        await db.pronouns.put({
            id: userId,
            expiresAt: 0,
            pronouns
        });
        dispatcher.update.fire(userId);
        Settings.set("customPronouns", Object.assign({}, Settings.get("customPronouns"), {[userId]: pronouns}));
    }

    static async removePronoun(userId) {
        await db.pronouns.delete(userId);
        dispatcher.update.fire(userId);
    }

    static connect(Component) {
        return props => {
            const [data, setData] = useState(null);

            useEffect(() => {
                const handler = userId => {
                    if (userId !== props.userId) return;
                    this.getPronouns(userId).then(data => {
                        setData(data);
                    }).catch(Logger.error);
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