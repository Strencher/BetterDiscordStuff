import {Store} from "@discord/flux";
// import {Dispatcher} from "@discord/modules";
import {PluginUtilities, WebpackModules} from "@zlibrary";
import React from "react";
import config from "../package.json";

const Dispatcher = WebpackModules.getByProps('dispatch', 'subscribe');

const SnippetsInjector = new class SnippetsInjector extends Store {
    constructor() {
        super(Dispatcher, {});
    }

    styleId = config.info.name + "-snippets";

    config: any = PluginUtilities.loadSettings(config.info.name, {
        codes: {}
    });

    has(url: string): boolean {return Boolean(this.config.codes[url]);}

    get css() {
        let css = "", values: any[] = Object.values(this.config.codes).sort((a: any) => ~a.css.indexOf("@import"));

        for (let i = 0; i < values.length; i++) {
            css += `\n${values[i].css}\n`;
        }

        return css;
    }

    add(url: string, code: string, manifestUrl: string): void {
        if (this.config.codes[url]) return;

        this.config.codes[url] = {
            manifestUrl,
            css: code
        };

        this.save();
        this.reload();
    }

    save(): void {
        PluginUtilities.saveSettings(config.info.name, this.config);
    }

    remove(url: string): void {
        delete this.config.codes[url];

        this.save();
        this.reload();
    }

    reload() {
        this.stop();
        this.init();
        this.emitChange();
    }

    stop() {
        BdApi.clearCSS(this.styleId);
    }

    init() {
        BdApi.injectCSS(this.styleId, this.css);
    }
}

export default SnippetsInjector;