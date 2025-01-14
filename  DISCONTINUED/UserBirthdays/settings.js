import {PluginUtilities} from "@zlibrary";
import pkg from "./package.json";
import Eventhandler from "./eventhandler";
import React, {useEffect, useReducer} from "react";

export function useForceUpdate() {
    return useReducer(n => n + 1, 0)[1];
}

export default class Settings {
    static updater = new Eventhandler();

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
        this.updater.emit("update");
    }

    static connectStore(Component) {
        return props => {

            if (!props.getSetting) Object.assign(props, {
                getSetting: this.get,
                updateSetting: this.set,
                toggleSetting: id => {
                    this.set(!this.get(id));
                }
            })

            const forceUpdate = useForceUpdate();

            useEffect(() => {
                this.updater.on("update", forceUpdate);

                return () => this.updater.off("update", forceUpdate);
            }, []);

            return <Component {...props}/>;
        }
    }
}