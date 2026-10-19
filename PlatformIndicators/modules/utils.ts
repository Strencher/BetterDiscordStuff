import { Utils } from "@api";

import { Messages } from "./shared";

export const findInReactTree = (tree: any, filter: (e: any) => boolean): any =>
    Utils.findInTree(tree, filter, { walkable: ["props", "children", "type"] });

const upperFirst = (string: string): string => string.charAt(0).toUpperCase() + string.slice(1);

export function getStatusText(key: string, status: string): string {
    return (
        (key === "vr" ? "VR" : upperFirst(key)) +
        ": " +
        Messages[`STATUS_${(status === "mobile" ? "mobile_online" : status).toUpperCase()}`]
    );
}
