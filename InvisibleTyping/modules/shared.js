import { Webpack } from "@api";

export const Dispatcher = Webpack.getByKeys('dispatch', 'register', { searchExports: true });
export const Flux = Webpack.getByKeys("Store");
export const TypingModule = Webpack.getByKeys("startTyping");
export const useStateFromStores = Webpack.getByStrings("useStateFromStores", { searchExports: true });

export const buildClassName = (...args) => {
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