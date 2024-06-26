import {Webpack} from "@api";

// Stores
export const LocalActivityStore = Webpack.getStore("LocalActivityStore");
export const SessionsStore = Webpack.getStore("SessionsStore");
export const UserStore = Webpack.getStore("UserStore");
export const PresenceStore = Webpack.getStore("PresenceStore");

// Other modules
export const {useSyncExternalStore: useStateFromStoresObject} = Webpack.getByKeys("useSyncExternalStore");
export const Dispatcher = UserStore._dispatcher;

export const Flux = Webpack.getByKeys("Store");
export const ModulesLibrary = Webpack.getByKeys("Anchor");
export const Colors = Webpack.getByKeys("RED_400");

export const {Messages} = Webpack.getModule(m => m?.Messages?.STATUS_DND);
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
