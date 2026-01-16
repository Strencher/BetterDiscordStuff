import {Webpack} from "@api";

// Stores
export const LocalActivityStore = Webpack.getStore("LocalActivityStore");
export const SessionsStore = Webpack.getStore("SessionsStore");
export const UserStore = Webpack.getStore("UserStore");
export const PresenceStore = Webpack.getStore("PresenceStore");

// Other modules
export const {useSyncExternalStore: useStateFromStoresObject} = Webpack.getByKeys("useSyncExternalStore");
export const useStateFromStores = BdApi.Hooks.useStateFromStores
export const Dispatcher = UserStore._dispatcher;

export const Flux = Webpack.getByKeys("Store");
export const StatusTypes = Webpack.getModule(x => x.DND && x.OFFLINE, {searchExports: true})
export const Colors = Webpack.getByKeys("unsafe_rawColors")?.unsafe_rawColors;
export const Intl = Webpack.getModule(x => x.intl)

const formatMessage = (key) => Intl.intl.formatToMarkdownString(Intl.t[key]);
// this takes the current locale and never changes. unless someone is messing with locale or firs time discord user, updating this doesnt really matter.

export const Messages = {
    "STATUS_DND": formatMessage('jaNpQH'),
    "STATUS_OFFLINE": formatMessage('Vv0abJ'),
    "STATUS_ONLINE": formatMessage('WbGtnH'),
    "STATUS_STREAMING": formatMessage('XKYej5'),
    "STATUS_IDLE": formatMessage('qWbtVU'),
    "STATUS_MOBILE": formatMessage('5LMZtY')
};

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