import { Webpack } from "@api";
import { Flux as FluxType, FluxDispatcher } from "@vencord/discord-types";

import { ClassValue } from "../types";

export const Dispatcher: FluxDispatcher = Webpack.getByKeys("dispatch", "register", { searchExports: true });
export const Flux: FluxType = Webpack.getByKeys("Store");
export const TypingModule: { startTyping: Function; stopTyping: Function } = Webpack.getByKeys("startTyping");

export const buildClassName = (...args: ClassValue[]): string => {
    return args
        .reduce<string[]>((classNames, arg) => {
            if (!arg) return classNames;

            if (typeof arg === "string" || typeof arg === "number") {
                classNames.push(String(arg));
            } else if (Array.isArray(arg)) {
                const nestedClassNames = buildClassName(...arg);
                if (nestedClassNames) classNames.push(nestedClassNames);
            } else if (typeof arg === "object") {
                for (const key in arg) {
                    if (Object.prototype.hasOwnProperty.call(arg, key) && arg[key]) {
                        classNames.push(key);
                    }
                }
            }

            return classNames;
        }, [])
        .join(" ");
};
