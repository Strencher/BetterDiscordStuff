import { Webpack } from "@api";

export const Dispatcher = Webpack.getByKeys("_dispatch");
export const Flux = Webpack.getByKeys("Store");
export const useStateFromStores = Webpack.getByStrings("useStateFromStores", { searchExports: true });

/*
 * Taken from ZeresPluginLibrary
 * https://github.com/zerebos/BDPluginLibrary/blob/3f321f9a3b21f3829277870068b98673ffd5c869/src/modules/utilities.js#L104-L120
 */

/**
 * Format strings with placeholders (`{{placeholder}}`) into full strings.
 * Quick example: `formatString("Hello, {{user}}", {user: "Zerebos"})`
 * would return "Hello, Zerebos".
 * @param {string} string - string to format
 * @param {object} values - object literal of placeholders to replacements
 * @returns {string} the properly formatted string
 */
export function formatString(string, values) {
    for (const val in values) {
        let replacement = values[val];
        if (Array.isArray(replacement)) replacement = JSON.stringify(replacement);
        if (typeof (replacement) === "object" && replacement !== null) replacement = replacement.toString();
        string = string.replace(new RegExp(`{{${val}}}`, "g"), replacement);
    }
    return string;
}