import {Patcher, Webpack} from "@api"
import React from "react";

const {useMemo} = React;
const UserStore = Webpack.getStore("UserStore");
const i18n = Webpack.getByKeys("getLocale");
const moment = Webpack.getByPrototypeKeys("toDate", "month");

const formatter = new Intl.DateTimeFormat(i18n.getLocale(), {
    month: "short",
    day: "numeric",
    year: "numeric"
});

const DateComponent = (() => {
    let SimpleMarkdown = Webpack.getByKeys("parseTopic");
    const [{type: Timestamp}] = SimpleMarkdown.parseTopic("<t:1539813600:D>");

    SimpleMarkdown = null;

    return function Date({date}) {
        const parsed = moment(date);
        
        const node = useMemo(() => ({
            format: "D",
            formatted: formatter.format(date),
            full: parsed.format("LLLL"),
            timestamp: String(Math.floor(date / 1000)),
            type: "timestamp",
            parsed,
        }));

        return (
            <Timestamp node={node} />
        );
    }
})();

export default class BetterUserDates {
    start() {
        this.patchDates();
    }

    walkReact(tree, filter, {maxResults = 1, maxKeys = 500, whitelist = new Set(["props", "children"])} = {}) {
        const stack = [tree], res = [];

        for (let current = stack.shift(), i = 0; i < maxKeys || current != null; current = stack.shift(), i++) {
            if (filter(current)) {
                if (maxResults === 1) return current;
                else if (res.indexOf(current) < 0) res.push(current);

                if (res.length === maxResults) return res;
            }

            if (Array.isArray(current)) stack.push.apply(stack, current);
            if (typeof current === "object" || typeof current === "function") {
                for (let i = 0, keys = Object.keys(current); i < keys.length; i++) {
                    if (whitelist.size && !whitelist.has(keys[i])) continue;
                    if (current[keys[i]] == null) continue;

                    stack.push(current[keys[i]]);
                }
            }
        }

        return maxResults <= 1 ? null : res;
    }

    patchDates() {
        const [Module, key] = Webpack.getWithKey(m => typeof m === "function" && m.toString().includes("USER_PROFILE_MEMBER_SINCE"));

        Patcher.after(Module, key, (_, [props], res) => {
            if (props.guildMember) {
                const [createdAt, joinedAt] = this.walkReact(res, m => m?.className === props?.textClassName && m?.variant, {maxResults: 2});
                const createdAtDate = UserStore.getUser(props.userId)?.createdAt;
                const joinedAtDate = new Date(props.guildMember?.joinedAt);

                if (createdAtDate && createdAt) this. injectDate(createdAt, createdAtDate);
                if (joinedAtDate && joinedAt) this.injectDate(joinedAt, joinedAtDate);
            } else {
                const element = this.walkReact(res, m => m?.className === props?.textClassName && m?.variant);
                const createdAtDate = UserStore.getUser(props.userId)?.createdAt;

                if (element && createdAtDate) this.injectDate(element, createdAtDate);
            }
        });
    }

    injectDate(element, date) {
        element.children = <DateComponent date={date} />
    }

    stop() {
        Patcher.unpatchAll();
    }
}
