import {Data} from "@api";

const Settings = {
    _listeners: new Set,
    _settings: Data.load("settings") ?? {},
    addReactChangeListener(listener) {
        Settings._listeners.add(listener);
    },
    removeReactChangeListener(listener) {
        Settings._listeners.delete(listener);
    },
    get(key, def) {
        return Settings._settings[key] ?? def;
    },
    set(key, value) {
        Settings._settings[key] = value;
        Data.save("settings", Settings._settings);
    }
}

export default Settings;
