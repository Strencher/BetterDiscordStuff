import { Hooks } from "@api";
import { Settings } from "@common/Settings";

import { LocalActivityStore, PresenceStore, SessionsStore, UserStore } from "./shared";

interface PlatformStoreState {
    iconStates: Record<string, boolean>;
    shouldShow: boolean;
    clients: Record<string, string>;
    user: any;
}

const isStreaming = (): boolean => LocalActivityStore.getActivities().some((e: { type: number }) => e.type === 1);

export default function usePlatformStores(userId: string, location: string): PlatformStoreState {
    const user = Hooks.useStateFromStores([UserStore] as any, () => UserStore.getUser(userId));
    const sessions = Hooks.useStateFromStores([SessionsStore] as any, () => SessionsStore.getSessions());

    const iconStates: Record<string, boolean> = Settings.get("icons", {});
    const shownInArea: boolean = Settings.get("showIn" + location, true);
    const ignoreBots: boolean = Settings.get("ignoreBots", true) && (user?.bot ?? false);

    const shouldShow = shownInArea && !ignoreBots;

    const clients = ((): Record<string, string> => {
        if (user?.id !== UserStore.getCurrentUser()?.id) return PresenceStore.getState().clientStatuses[user?.id] ?? {};
        if (!sessions) return {};

        return Object.entries(sessions).reduce<Record<string, string>>((acc, [, sessionData]: [string, any]) => {
            const client = sessionData.clientInfo.client;
            acc[client] = isStreaming() ? "streaming" : sessionData.status;
            return acc;
        }, {});
    })();

    return { iconStates, shouldShow, clients, user };
}
