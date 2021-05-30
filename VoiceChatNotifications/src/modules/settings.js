import {PluginUtilities} from "@zlibrary";
import pkg from "../package.json";

export default class Settings {
    static settings = PluginUtilities.loadSettings(pkg.info.name, {});

    static get = (key, defaultValue) => {
        return this.settings[key] ?? defaultValue;
    }

    static set = (key, value) => {
        this.settings[key] = value;
        this.saveState();
    }
    
    static saveState() {
        PluginUtilities.saveSettings(pkg.info.name, this.settings);
    }
}