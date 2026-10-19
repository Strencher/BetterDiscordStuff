import { Themes, Webpack } from "@api";
import type { PresenceStore as PresenceStoreType, UserStore as UserStoreType } from "@vencord/discord-types";

// Stores
export const LocalActivityStore = Webpack.getStore("LocalActivityStore") as unknown as {
    getActivities: () => Array<{ type: number }>;
};
export const SessionsStore = Webpack.getStore("SessionsStore") as unknown as {
    getSessions: () => Record<string, { clientInfo: { client: string }; status: string }>;
};
export const UserStore = Webpack.getStore("UserStore") as unknown as UserStoreType;
export const PresenceStore = Webpack.getStore("PresenceStore") as unknown as PresenceStoreType;

export const isRadialStatusEnabled = (): boolean => !!Themes.isEnabled("RadialStatus");

// Other modules
export const { useSyncExternalStore: useStateFromStoresObject } = Webpack.getByKeys("useSyncExternalStore") as any;
export const Dispatcher = (UserStore as any)._dispatcher;

export const Flux = Webpack.getByKeys("Store");

export const { useStatusFillColor } = Webpack.getMangled(["STATUS_ONLINE_MOBILE", ".hex"], {
    useStatusFillColor: Webpack.Filters.byStrings(".hex")
}) as { useStatusFillColor: (status: string) => string };

export const Intl: { intl: { formatToMarkdownString: (key: string) => string }; t: Record<string, string> } =
    Webpack.getModule((x: any) => x.intl)!;

const formatMessage = (key: string): string => Intl.intl.formatToMarkdownString(Intl.t[key]);

export const Messages: Record<string, string> = {
    STATUS_DND: formatMessage("jaNpQH"),
    STATUS_OFFLINE: formatMessage("Vv0abJ"),
    STATUS_ONLINE: formatMessage("WbGtnH"),
    STATUS_STREAMING: formatMessage("XKYej5"),
    STATUS_IDLE: formatMessage("qWbtVU"),
    STATUS_MOBILE: formatMessage("5LMZtY")
};

export const buildClassName = (...args: unknown[]): string => {
    return args
        .reduce<string[]>((classNames, arg) => {
            if (!arg) return classNames;

            if (typeof arg === "string" || typeof arg === "number") {
                classNames.push(String(arg));
            } else if (Array.isArray(arg)) {
                const nestedClassNames = buildClassName(...arg);
                if (nestedClassNames) classNames.push(nestedClassNames);
            } else if (typeof arg === "object") {
                Object.keys(arg as object).forEach(key => {
                    if ((arg as Record<string, unknown>)[key]) classNames.push(key);
                });
            }

            return classNames;
        }, [])
        .join(" ");
};
