import { Utils, Webpack } from "@api";

import { Messages } from "./shared";

export const findInReactTree = (tree: any, filter: (e: any) => boolean): any =>
    Utils.findInTree(tree, filter, { walkable: ["props", "children", "type"] });

const findClassName = (module: Record<string, unknown>, name: string): string | undefined => {
    const value = Object.values(module).find(v => typeof v === "string" && v.startsWith(`${name}_`));
    return (value as string | undefined)?.split(" ")[0];
};

// Discord now exports CSS module classes under mangled keys, so match them by their values instead.
export function getClasses<T extends string>(...names: T[]): Record<T, string> | null {
    const byKeys = Webpack.getByKeys<Record<T, string>>(...names);
    if (byKeys) return byKeys;

    const module = Webpack.getModule<Record<string, unknown>>(
        m => m != null && typeof m === "object" && names.every(name => findClassName(m, name))
    );
    if (!module) return null;

    return Object.fromEntries(names.map(name => [name, findClassName(module, name)])) as Record<T, string>;
}

const upperFirst = (string: string): string => string.charAt(0).toUpperCase() + string.slice(1);

export function getStatusText(key: string, status: string): string {
    return (
        (key === "vr" ? "VR" : upperFirst(key)) +
        ": " +
        Messages[`STATUS_${(status === "mobile" ? "mobile_online" : status).toUpperCase()}`]
    );
}
