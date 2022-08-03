import LocaleManager from "@discord/i18n";

// import { Dispatcher } from "@discord/modules";
import { WebpackModules } from "@zlibrary";
const Dispatcher = WebpackModules.getByProps('dispatch', 'subscribe');

import Languages, { Keys } from "./locales";

export default class Strings {
    static _strings: any;

    public static init(): void {
        this.setLanguage(LocaleManager.getLocale());

        Dispatcher.subscribe("USER_SETTINGS_UPDATE", this.handleLocaleChange);
    }

    static handleLocaleChange = () => {
        this.setLanguage(LocaleManager.getLocale());
    }
    
    public static shutdown(): void {
        Dispatcher.unsubscribe("USER_SETTINGS_UPDATE", this.handleLocaleChange);
    }

    public static setLanguage(lang: string) {
        this._strings = Languages[lang] ?? Languages["en-US"];
    }

    public static hasString(key: any): boolean {
        return this._strings[key] != null || Languages["en-US"][key] != null;
    }

    public static get(key: keyof Keys): string {
        return this._strings[key] ?? Languages["en-US"][key] ?? "String not found.";
    }
};