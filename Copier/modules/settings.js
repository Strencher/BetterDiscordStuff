import {Data} from "@api";

const Settings = {
    _listeners: new Set,
    _settings: Object.assign({}, {
        messageCustom: "`$author` **$timestamp**\n> $message",
        channelCustom: "#$name in **$server**",
        categoryCustom: "$name with $channelsCount channels",
        voiceCustom: "**#$name** in **$server** with `$usersConnected` connected users.",
        guildCustom: "**$name** with `$members`",
        userCustom: "**$name** - Created at: `$creation`",
        roleCustom: "**$name** - `$colorHEX`",
        showButton: true
    }, Data.load("settings")),
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
        this._listeners.forEach(l => l());
    }
}

export default Settings;
