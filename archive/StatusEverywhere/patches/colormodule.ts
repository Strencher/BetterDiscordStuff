import {Patcher, WebpackModules} from "@zlibrary";
import Settings from "../settings";

export default function patchColorModule() {
    const StatusModule = WebpackModules.getByProps("getStatusColor");
    
    Patcher.after(StatusModule, "getStatusColor", (_, [status]) => {
        switch (status) {
            case "dnd":
                return Settings.get("dndColor", "#ED4245");
            case "idle":
                return Settings.get("idleColor", "#FAA81A");
            case "online":
                return Settings.get("onlineColor", "#3BA55D");
            case "streaming":
                return Settings.get("streamingColor", "#593695");
            case "offline":
                return Settings.get("offlineColor", "#747F8D");
            default:
                return "#747F8D";
        }
    });
};