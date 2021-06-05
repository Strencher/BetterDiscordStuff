import {PluginUtilities} from "@zlibrary";
import pkg from "../package.json";
import Updater from "common/classes/updater";
import React, {useEffect} from "react";
import Utilities from "./Utilities";
import {Dispatcher} from "@discord/modules";
import {Store} from "@discord/flux";

export default new class Settings extends Store {
    constructor() {
        super(Dispatcher, {});
    }

    settings = PluginUtilities.loadSettings(pkg.info.name, {});

    get = (key, defaultValue) => {
        return this.settings[key] ?? defaultValue;
    }

    set = (key, value) => {
        this.settings[key] = value;
        PluginUtilities.saveSettings(pkg.info.name, this.settings);
        this.emitChange();
    }
}