import { Webpack } from "@api";

// Stores
export const LocalActivityStore = Webpack.getStore("LocalActivityStore");
export const SessionsStore = Webpack.getStore("SessionsStore");
export const UserStore = Webpack.getStore("UserStore");
export const PresenceStore = Webpack.getStore("PresenceStore");

// Other modules
export const { useSyncExternalStore: useStateFromStoresObject } = Webpack.getByKeys("useSyncExternalStore");
export const useStateFromStores = BdApi.Hooks.useStateFromStores
export const Dispatcher = UserStore._dispatcher;

export const Flux = Webpack.getByKeys("Store");
export const Intl = Webpack.getModule(x => x.intl)

export const Messages = (() => {
    if (!Intl?.t || !Intl?.intl) return {};
    const candidates = {
        STATUS_DND:       ["jaNpQH"],
        STATUS_OFFLINE:   ["Vv0abJ"],
        STATUS_ONLINE:    ["WbGtnH"],
        STATUS_STREAMING: ["XKYej5"],
        STATUS_IDLE:      ["qWbtVU"],
        STATUS_MOBILE:    ["5LMZtY"]
    };
    const registeredKeys = new Set(Reflect.ownKeys(Intl.t));
    const result = {};
    for (const [msgKey, keys] of Object.entries(candidates)) {
        const key = keys.find(k => registeredKeys.has(k));
        if (!key) continue;
        let stale = false;
        const origWarn = console.warn;
        console.warn = () => { stale = true; };
        try {
            const formatted = Intl.intl.formatToMarkdownString(Intl.t[key]);
            if (!stale && typeof formatted === "string" && formatted.length) result[msgKey] = formatted;
        } catch { /* formatting failed, skip */ } finally {
            console.warn = origWarn;
        }
    }
    return result;
})();

export const buildClassName = (...args) => { // yeah, yk... I couldnt find a working string for this so I just remade it ;-;
    return args.reduce((classNames, arg) => {
        if (!arg) return classNames;

        if (typeof arg === "string" || typeof arg === "number") {
            classNames.push(arg);
        } else if (Array.isArray(arg)) {
            const nestedClassNames = buildClassName(...arg);
            if (nestedClassNames) classNames.push(nestedClassNames);
        } else if (typeof arg === "object") {
            Object.keys(arg).forEach(key => {
                if (arg[key]) classNames.push(key);
            });
        }

        return classNames;
    }, []).join(" ");
}