import {PluginUtilities} from "@zlibrary"
import EventEmitter from "events";
import pkg from "../package.json";
import React, {useReducer, useEffect} from "react";

const useForceUpdate = () => useReducer(n => n + 1, 0)[1];

export default class Settings {
    static updater = new EventEmitter();

    static settings = PluginUtilities.loadSettings(pkg.info.name, {customPronouns: {}, showOnTimestamp: true, showInUserPopout: true});

    static get(id) {
        return this.settings[id];
    }

    static set(id, value) {
        this.settings[id] = value;
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