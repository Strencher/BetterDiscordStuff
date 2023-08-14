/**
 * @name BetterUserDates
 * @donate https://paypal.me/RealStrencher
 * @version 1.0.0
 * @description Makes member dates show up as real discord timestamps.
 * @github https://github.com/Strencher/BetterDiscordStuff/blob/master/BetterUserDates/BetterUserDates.plugin.js
 * @github_raw https://raw.githubusercontent.com/Strencher/BetterDiscordStuff/master/BetterUserDates/BetterUserDates.plugin.js
 * @changelogImage https://cdn.discordapp.com/attachments/672786846018961418/1053059354552696932/20th-century-fox-intro.png
 * @changelogDate 2023-08-14T19:12:56.405Z
 * @author Strencher
 */

'use strict';

/* @module @manifest */
const manifest = {
    "name": "BetterUserDates",
    "authors": [{
        "name": "Strencher",
        "discord_id": "415849376598982656",
        "github_username": "Strencher",
        "twitter_username": "Strencher3"
    }],
    "donate": "https://paypal.me/RealStrencher",
    "version": "1.0.0",
    "description": "Makes member dates show up as real discord timestamps.",
    "github": "https://github.com/Strencher/BetterDiscordStuff/blob/master/BetterUserDates/BetterUserDates.plugin.js",
    "github_raw": "https://raw.githubusercontent.com/Strencher/BetterDiscordStuff/master/BetterUserDates/BetterUserDates.plugin.js",
    "changelogImage": "https://cdn.discordapp.com/attachments/672786846018961418/1053059354552696932/20th-century-fox-intro.png",
    "changelogDate": "2023-08-14T19:12:56.405Z",
    "changelog": [{
        "type": "added",
        "title": "Release",
        "items": [
            "The plugin was released."
        ]
    }]
};

/*@end */

/* @module @api */
const { Data, Patcher, DOM, ReactUtils, Utils, Webpack, UI, ContextMenu } = new BdApi(manifest.name);
/*@end */

/* @module react */
var React = BdApi.React;
/*@end */

/* @module index.jsx */
const { useMemo } = React;
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
    const [{ type: Timestamp }] = SimpleMarkdown.parseTopic("<t:1539813600:D>");
    SimpleMarkdown = null;
    return function Date2({ date }) {
        const parsed = moment(date);
        const node = useMemo(() => ({
            format: "D",
            formatted: formatter.format(date),
            full: parsed.format("LLLL"),
            timestamp: String(Math.floor(date / 1e3)),
            type: "timestamp",
            parsed
        }));
        return /* @__PURE__ */ React.createElement(Timestamp, { node });
    };
})();
class BetterUserDates {
    start() {
        this.patchDates();
    }
    walkReact(tree, filter, { maxResults = 1, maxKeys = 500, whitelist = /* @__PURE__ */ new Set(["props", "children"]) } = {}) {
        const stack = [tree],
            res = [];
        for (let current = stack.shift(), i = 0; i < maxKeys || current != null; current = stack.shift(), i++) {
            if (filter(current)) {
                if (maxResults === 1)
                    return current;
                else if (res.indexOf(current) < 0)
                    res.push(current);
                if (res.length === maxResults)
                    return res;
            }
            if (Array.isArray(current))
                stack.push.apply(stack, current);
            if (typeof current === "object" || typeof current === "function") {
                for (let i2 = 0, keys = Object.keys(current); i2 < keys.length; i2++) {
                    if (whitelist.size && !whitelist.has(keys[i2]))
                        continue;
                    if (current[keys[i2]] == null)
                        continue;
                    stack.push(current[keys[i2]]);
                }
            }
        }
        return maxResults <= 1 ? null : res;
    }
    patchDates() {
        const [Module, key] = Webpack.getWithKey((m) => typeof m === "function" && m.toString().includes("USER_PROFILE_MEMBER_SINCE"));
        Patcher.after(Module, key, (_, [props], res) => {
            if (props.guildMember) {
                const [createdAt, joinedAt] = this.walkReact(res, (m) => m?.className === props?.textClassName && m?.variant, { maxResults: 2 });
                const createdAtDate = UserStore.getUser(props.userId)?.createdAt;
                const joinedAtDate = new Date(props.guildMember?.joinedAt);
                if (createdAtDate && createdAt)
                    this.injectDate(createdAt, createdAtDate);
                if (joinedAtDate && joinedAt)
                    this.injectDate(joinedAt, joinedAtDate);
            } else {
                const element = this.walkReact(res, (m) => m?.className === props?.textClassName && m?.variant);
                const createdAtDate = UserStore.getUser(props.userId)?.createdAt;
                if (element && createdAtDate)
                    this.injectDate(element, createdAtDate);
            }
        });
    }
    injectDate(element, date) {
        element.children = /* @__PURE__ */ React.createElement(DateComponent, { date });
    }
    stop() {
        Patcher.unpatchAll();
    }
}

/*@end */

module.exports = BetterUserDates;
