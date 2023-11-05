import {Dispatcher, Flux} from "./shared";
import config from "@manifest";
import {Data} from "@api";

const Settings = new class Settings extends Flux.Store {
    constructor() {super(Dispatcher, {});}
    _settings = Data.load("settings") ?? {};

    get(key, def) {
        return this._settings[key] ?? def;
    }

    set(key, value) {
        this._settings[key] = value;
        Data.save("settings", this._settings);
        this.emitChange();
    }
};

export default Settings;
