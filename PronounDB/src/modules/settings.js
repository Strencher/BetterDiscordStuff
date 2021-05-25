import {PluginUtilities} from "@zlibrary"
import pkg from "../package.json";

export default class Settings {
    static settings = PluginUtilities.loadSettings(pkg.info.name, {customPronouns: {}});

    static get(id) {
        return this.settings[id];
    }

    static set(id, value) {
        this.settings[id] = value;
        this.saveState();
    }

    static saveState() {return PluginUtilities.saveSettings(pkg.info.name, this.settings);}
}