import {Utilities, WebpackModules} from "@zlibrary";

export default class ContextMenu {
    static flush = new Set;

    static filterContext(name) {
        const shouldInclude = ["page", "section", "objectType"];
        const notInclude = ["use", "root"];
        const isRegex = name instanceof RegExp;

        return (module) => {
            const string = module.toString({});
            const getDisplayName = () => Utilities.getNestedProp(module({}), "props.children.type.displayName");

            return !~string.indexOf("return function")
                && shouldInclude.every(s => ~string.indexOf(s))
                && !notInclude.every(s => ~string.indexOf(s))
                && (isRegex ? name.test(getDisplayName()) : name === getDisplayName())
        }
    }

    static async findContextMenu(displayName, filter = _ => true) {
        const regex = new RegExp(displayName, "i");
        const normalFilter = (exports) => exports && exports.default && regex.test(exports.default.displayName) && filter(exports.default);
        const nestedFilter = (module) => regex.test(module.toString());

        {
            const normalCache = WebpackModules.getModule(normalFilter((e) => filter(e.default)));
            if (normalCache) return {type: "normal", module: normalCache};
        }

        {
            const webpackId = Object.keys(WebpackModules.require.m).find(id => nestedFilter(WebpackModules.require.m[id]));
            const nestedCache = webpackId !== undefined && WebpackModules.getByIndex(webpackId);
            if (nestedCache && filter(nestedCache?.default)) return {type: "nested", module: nestedCache};
        }

        return new Promise((resolve) => {
            const cancel = () => WebpackModules.removeListener(listener);
            const listener = (exports, module) => {
                const normal = normalFilter(exports);
                const nested = nestedFilter(module);

                if ((!nested && !normal) || !filter(exports?.default)) return;

                resolve({type: normal ? "normal" : "nested", module: exports});
                WebpackModules.removeListener(listener);
                ContextMenu.flush.delete(cancel);
            };

            WebpackModules.addListener(listener);
            ContextMenu.flush.add(cancel);
        });
    }
}