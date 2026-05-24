import { Utils } from "@api";

import { Colors, Messages, StatusTypes } from "./shared";

// eslint-disable-next-line no-unused-vars
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

export function getStatusColor(status: string): string {
    switch (status) {
        case StatusTypes.ONLINE:
            return Colors.GREEN_360?.css;
        case StatusTypes.IDLE:
            return Colors.YELLOW_300?.css;
        case StatusTypes.DND:
            return Colors.RED_400?.css;
        case StatusTypes.STREAMING:
            return Colors.PLATFORM_TWITCH?.css;
        case StatusTypes.INVISIBLE:
        case StatusTypes.UNKNOWN:
        case StatusTypes.OFFLINE:
        default:
            return Colors.PRIMARY_400?.css;
    }
}
