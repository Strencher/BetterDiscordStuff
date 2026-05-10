import { Data, Webpack } from "@api";
import type { Flux as FluxType, FluxDispatcher } from "@vencord/discord-types";

const Dispatcher: FluxDispatcher = Webpack.getByKeys("dispatch", "subscribe", { searchExports: true });
const Flux: FluxType = Webpack.getByKeys("Store");

const Settings = new (class Settings extends Flux.Store {
    constructor() {
        super(Dispatcher, {});
    }
    _settings = Data.load("settings") ?? {};

    get(key: string, def: unknown = null) {
        return this._settings[key] ?? def;
    }

    set(key: string, value: unknown) {
        this._settings[key] = value;
        Data.save("settings", this._settings);
        this.emitChange();
    }
})();

export default Settings;
