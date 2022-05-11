import {Utilities} from "@zlibrary";

export default class ContextMenu {
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
}