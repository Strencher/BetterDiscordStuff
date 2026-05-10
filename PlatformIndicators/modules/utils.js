import { Utils } from "@api";

import { Messages } from "./shared";
import { Colors, StatusTypes } from "./shared";

export const findInReactTree = (tree, filter) =>
    Utils.findInTree(tree, filter, { walkable: ["props", "children", "type"] });

const upperFirst = string => string.charAt(0).toUpperCase() + string.slice(1);

export function getStatusText(key, status) {
    return (
        (key === "vr" ? "VR" : upperFirst(key)) +
        ": " +
        Messages[`STATUS_${(status === "mobile" ? "mobile_online" : status).toUpperCase()}`]
    );
}

export function getStatusColor(status) {
    switch (status) {
        case StatusTypes.ONLINE:
            return Colors.GREEN_360.css;
        case StatusTypes.IDLE:
            return Colors.YELLOW_300.css;
        case StatusTypes.DND:
            return Colors.RED_400.css;
        case StatusTypes.STREAMING:
            return Colors.TWITCH.css;
        case StatusTypes.INVISIBLE:
        case StatusTypes.UNKNOWN:
        case StatusTypes.OFFLINE:
        default:
            return Colors.PRIMARY_400.css;
    }
}
