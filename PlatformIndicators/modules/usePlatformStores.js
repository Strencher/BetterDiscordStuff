import Settings from "./settings";
import {Flux, LocalActivityStore, PresenceStore, SessionsStore, UserStore} from "./shared";

const isStreaming = () => LocalActivityStore.getActivities().some(e => e.type === 1);

/**@returns {{iconStates: any, shouldShow: boolean, clients: any, user: any}} */
export default function usePlatformStores(userId, type) {
    return Flux.useStateFromStoresObject([Settings, PresenceStore, UserStore, SessionsStore], () => {
        const user = UserStore.getUser(userId);
        return {
            iconStates: Settings.get("icons", {}),
            shouldShow: (() => {
                const shownInArea = Settings.get("showIn" + type, true);
                const isBot = Settings.get("ignoreBots", true) && (user?.bot ?? false);

                return shownInArea && !isBot;
            })(),
            clients: (() => {
                if (user?.id === UserStore.getCurrentUser()?.id) return SessionsStore.getSession() ? {
                    [SessionsStore.getSession().clientInfo.client]: isStreaming() ? "streaming" : SessionsStore.getSession().status
                } : {};

                return PresenceStore.getState().clientStatuses[user?.id] ?? {};
            })(),
            user
        };
    });
}
