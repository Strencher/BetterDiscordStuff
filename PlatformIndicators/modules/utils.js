import {Utils} from "@api";
import {Messages} from "./shared";

export const findInReactTree = (tree, filter) => Utils.findInTree(tree, filter, {walkable: ["props", "children", "type"]});

function upperFirst(string) {return string.charAt(0).toUpperCase() + string.slice(1);}

export function getStatusText(key, status) {
    return upperFirst(key) + ": " + Messages[`STATUS_${(status == "mobile" ? "mobile_online" : status).toUpperCase()}`];
}

export function getStatusColor(status) {
    const {StatusTypes} = ModulesLibrary;

    switch (status) {
        case StatusTypes.ONLINE:
            return Colors.Color.GREEN_360;
        case StatusTypes.IDLE:
            return Colors.Color.YELLOW_300;
        case StatusTypes.DND:
            return Colors.Color.RED_400;
        case StatusTypes.STREAMING:
            return Colors.Color.TWITCH;
        case StatusTypes.INVISIBLE:
        case StatusTypes.UNKNOWN:
        case StatusTypes.OFFLINE:
        default:
            return Colors.Color.PRIMARY_400
    }
}