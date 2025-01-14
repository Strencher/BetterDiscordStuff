declare module "@api" {
    import {
        AddonAPI,
        BoundData,
        BoundDOM,
        BoundLogger,
        BoundPatcher,
        Components,
        ContextMenu,
        Net,
        Plugin,
        ReactUtils,
        UI,
        Utils,
        Webpack
    } from "betterdiscord";

    export const Components: Components;
    export const ContextMenu: ContextMenu;
    export const Data: BoundData;
    export const DOM: BoundDOM;
    export const Logger: BoundLogger;
    export const Net: Net;
    export const Patcher: BoundPatcher;
    export const Plugins: AddonAPI<Plugin>;
    export const ReactUtils: ReactUtils;
    export const Themes: AddonAPI<Plugin>; // Has the same methods as Plugins
    export const UI: UI;
    export const Utils: Utils;
    export const Webpack: Webpack;
}

declare module "@styles" {
    const styles: {
        load(): void;
        unload(): void;
        sheets: string[];
        _element: HTMLElement | null;
    };
    export default styles;
}

declare module "@manifest" {
    interface ChangelogItem {
        title: string;
        type: "added" | "changed" | "fixed" | "improved";
        items: string[];
    }

    export interface Manifest {
        name: string;
        version: string;
        description: string;
        author: string;
        authorId: string;
        invite: string;
        donate: string;
        source: string;
        changelog: ChangelogItem[];
        changelogDate: string;
        changelogImage?: string;
    }

    const manifest: Manifest;
    export default manifest;
}