declare module "@api" {
    import {
        Tooltip,
        ContextMenu,
        Data,
        DOM,
        Net,
        BoundPatcher,
        ReactUtils,
        UI,
        Utils,
        Webpack
    } from "betterdiscord";

    export const Components: { Tooltip: Tooltip; };
    export const ContextMenu: ContextMenu;
    export const Data: Data;
    export const DOM: DOM;
    export const Net: Net;
    export const Patcher: BoundPatcher;
    export const Plugins: any;
    export const ReactUtils: ReactUtils;
    export const Themes: any;
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
        type: "added" | "fixed" | "improved";
        items: string[];
    }

    interface Manifest {
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
