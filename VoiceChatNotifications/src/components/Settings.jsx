import {WebpackModules} from "@zlibrary";
import Constants from "../data/constants";
import {default as Settings} from "../modules/settings";
import React from "react";

const createUpdateWrapper = (Component, valueProp = "value", changeProp = "onChange") => props => {
    const [value, setValue] = React.useState(props[valueProp]);

    return <Component 
        {...{
            ...props,
            [valueProp]: value,
            [changeProp]: value => {
                if (typeof props[changeProp] === "function") props[changeProp](value);
                setValue(value);
            }
        }}
    />;
};

const SwitchItem = createUpdateWrapper(WebpackModules.getByDisplayName("SwitchItem"));

export default function SettingsPanel() {
    return (
        <div>
            <SwitchItem
                note="Defines if logs about your own actions should be shown."
                value={Settings.get("ignoreSelf", false)}
                onChange={value => {Settings.set("ignoreSelf", value);}}
            >Log yourself</SwitchItem>
            {
                Object.keys(Constants.VOICE_STATES).reduce((items, key) => {
                    items.push(<SwitchItem
                        value={Settings.get(key, true)}
                        onChange={value => {
                            Settings.set(key, value);
                        }}
                        note={Constants.VOICE_STATES[key].description}
                    >{_.upperFirst(key)}</SwitchItem>)

                    return items;
                }, [])   
            }
        </div>  
    );
}