import {Utils} from "@api";

import {Messages} from "./shared";

export const findInReactTree = (tree, filter) => Utils.findInTree(tree, filter, {walkable: ["props", "children", "type"]});

function upperFirst(string) {return string.charAt(0).toUpperCase() + string.slice(1);}

export function getStatusText(key, status) {
    const label = key === "vr" ? "VR" : upperFirst(key);
    const messageKey = `STATUS_${status.toUpperCase()}`;
    return label + ": " + (Messages[messageKey] ?? upperFirst(status));
}

export function getStatusColor(status) {
    switch (status) {
        case "online":    return "#23a55a";
        case "idle":      return "#f0b232";
        case "dnd":       return "#f23f43";
        case "streaming": return "#593695";
        default:          return "#80848e";
    }
}
