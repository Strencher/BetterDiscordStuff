import { Hooks } from "@api";
import { Settings } from "@common/Settings";

import { isRadialStatusEnabled, LocalActivityStore, PresenceStore, SessionsStore, UserStore } from "./shared";

interface PlatformStoreState {
    iconStates: Record<string, boolean>;
    shouldShow: boolean;
    clients: Record<string, string>;
    user: any;
}

const NO_OVERRIDES: Record<string, boolean> = Object.freeze({});
const ICON_SETTINGS: Record<string, string> = { Avatar: "avatarIcons", Badge: "badgeIcons" };
const LOCATION_SETTINGS: Record<string, string> = {
    Avatar: "showOnAvatars",
    Badge: "showInBadges",
    Chat: "showInChat",
    DMs: "showInDmsList",
    Favorites: "showInFavorites",
    FriendList: "showInFriendsList",
    MemberList: "showInMemberList"
};

const isStreaming = (): boolean => LocalActivityStore.getActivities().some((e: { type: number }) => e.type === 1);

export default function usePlatformStores(userId: string, location: string): PlatformStoreState {
    const user = Hooks.useStateFromStores([UserStore] as any, () => UserStore.getUser(userId));
    const sessions = Hooks.useStateFromStores([SessionsStore] as any, () => SessionsStore.getSessions());

    const { iconStates, shownInArea, ignoreBots } = Hooks.useStateFromStores(
        [Settings] as any,
        () => ({
            iconStates: Settings.get(ICON_SETTINGS[location] ?? "icons", NO_OVERRIDES),
            shownInArea: Settings.get(LOCATION_SETTINGS[location], true),
            ignoreBots: Settings.get("ignoreBots", true)
        }),
        undefined,
        true
    );

    const shouldShow = shownInArea && !(ignoreBots && user?.bot) && !(location === "Avatar" && isRadialStatusEnabled());

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
