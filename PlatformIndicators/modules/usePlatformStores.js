import Settings from "./settings";
import {LocalActivityStore, PresenceStore, SessionsStore, UserStore} from "./shared";

const isStreaming = () => LocalActivityStore.getActivities().some(e => e.type === 1);

/**@returns {{iconStates: any, shouldShow: boolean, clients: any, user: any}} */
export default function usePlatformStores(userId, type) {
    const user = UserStore.getUser(userId);

    const iconStates = Settings.get("icons", {});
    const shownInArea = Settings.get("showIn" + type, true);
    const isBot = Settings.get("ignoreBots", true) && (user?.bot ?? false);

    const shouldShow = shownInArea && !isBot;

    const clients = (() => {
        if (user?.id === UserStore.getCurrentUser()?.id) {
            const sessions = SessionsStore.getSessions();
            if (sessions) {
                const clientStatuses = Object.entries(sessions).reduce((acc, [, sessionData]) => {
                    const client = sessionData.clientInfo.client;
                    const status = isStreaming() ? "streaming" : sessionData.status;
                    acc[client] = status;
                    return acc;
                }, {});
                return clientStatuses;
            }
            return {};
        }
        return PresenceStore.getState().clientStatuses[user?.id] ?? {};
    })();

    return {
        iconStates,
        shouldShow,
        clients,
        user
    };
}
