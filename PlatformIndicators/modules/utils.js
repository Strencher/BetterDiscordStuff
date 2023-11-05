import {Utils} from "@api";
import {Messages} from "./shared";

export const findInReactTree = (tree, filter) => Utils.findInTree(tree, filter, {walkable: ["props", "children", "type"]});

function upperFirst(string) {return string.charAt(0).toUpperCase() + string.slice(1);}

export function getStatusText(key, status) {
    return upperFirst(key) + ": " + Messages[`STATUS_${(status == "mobile" ? "mobile_online" : status).toUpperCase()}`];
}
