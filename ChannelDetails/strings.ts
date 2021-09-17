import { ActionTypes } from "@discord/constants";
import LocaleManager from "@discord/i18n";
import { Dispatcher } from "@discord/modules";
import Languages, { Keys } from "./data/translations";

export default class Strings {
    static _strings: any;

    public static init(): void {
        this.setLanguage(LocaleManager.getLocale());

        Dispatcher.subscribe(ActionTypes.USER_SETTINGS_UPDATE, this.handleLocaleChange);
    }

    static handleLocaleChange = () => {
        this.setLanguage(LocaleManager.getLocale());
    }
    
    public static shutdown(): void {
        Dispatcher.unsubscribe(ActionTypes.USER_SETTINGS_UPDATE, this.handleLocaleChange);
    }

    public static setLanguage(lang: string) {
        this._strings = Languages[lang] ?? Languages["en-US"];
    }

    public static get(key: keyof Keys): string {
        return this._strings[key] ?? Languages["en-US"][key] ?? "String not found.";
    }
};