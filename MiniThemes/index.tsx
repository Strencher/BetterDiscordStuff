/// <reference path="../types/main.d.ts" />

import BasePlugin from "@zlibrary/plugin";
import {Patcher, WebpackModules} from "@zlibrary";
import MiniThemesSettings from "./components/settings";
import styles from "styles";
import SnippetsInjector from "./managers/injector";
import GithubStore from "./managers/github";

// import {Dispatcher} from "@discord/modules";
const Dispatcher = WebpackModules.getByProps('dispatch', 'subscribe');

export default class MiniThemes extends BasePlugin {
    onStart() {
        this.patchSettingsView();
        styles.inject();

        SnippetsInjector.init();
    }

    async patchSettingsView() {
        const SettingsView = WebpackModules.getByDisplayName("SettingsView");

        Patcher.after(SettingsView.prototype, "getPredicateSections", (_this, _, res) => {
            if (!Array.isArray(res) || !res.some(s => s?.section?.toLowerCase() === "changelog") || res.some(s => s.id === "mini-themes")) return;

            const index = res.findIndex(s => s.section.toLowerCase() === "changelog") - 1;
            if (index < 0) return;

            res.splice(index, 0, {
                id: "mini-themes",
                section: "MiniThemes",
                label: "MiniThemes",
                className: "mini-themes-tab",
                element: () => <MiniThemesSettings />
            });
        });
    }

    destroyStore(dispatchToken) {
        Dispatcher._dependencyGraph.removeNode(dispatchToken);
        Dispatcher._invalidateCaches();
    }
    
    onStop() {
        
        styles.remove();
        Patcher.unpatchAll();
        SnippetsInjector.stop();
        this.destroyStore(SnippetsInjector.getDispatchToken());
        this.destroyStore(GithubStore.getDispatchToken());
    }
}