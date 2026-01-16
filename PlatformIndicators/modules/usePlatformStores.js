import Settings from "./settings";
import { LocalActivityStore, PresenceStore, SessionsStore, UserStore, useStateFromStores } from "./shared";

const isStreaming = () => LocalActivityStore.getActivities().some(e => e.type === 1);

/**@returns {{iconStates: any, shouldShow: boolean, clients: any, user: any}} */
export default function usePlatformStores(userId, type) {
    const user = useStateFromStores([UserStore], () => UserStore.getUser(userId));
    const sessions = useStateFromStores([SessionsStore], () => SessionsStore.getSessions())

    const iconStates = Settings.get("icons", {});
    const shownInArea = Settings.get("showIn" + type, true);
    const ignoreBots = Settings.get("ignoreBots", true) && (user?.bot ?? false);

    const shouldShow = shownInArea && !ignoreBots;

    const clients = (() => {
        if (user?.id === UserStore.getCurrentUser()?.id) {
            if (sessions) {
                const clientStatuses = Object.entries(sessions).reduce((acc, [, sessionData]) => {
                    const client = sessionData.clientInfo.client;
                    acc[client] = isStreaming() ? "streaming" : sessionData.status;
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
