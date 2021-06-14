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

export const otherSettings = {
    ignoreSelf: {
        value: false,
        note: "Defines if logs about your own actions should be ignored.",
        name: "Ignore yourself"
    },
    supressInDnd: {
        value: true,
        note: "Suppress desktop notifications in DND, this automatically enables the In-App notification api.",
        name: "Suppress in DND"
    },
    inppNotifications: {
        value: true,
        note: "Shows In-App Notifications instead of desktop notifications.",
        name: "In-App Notifications"
    },
    notifications: {
        value: true,
        note: "Defines if notifications should be shown when an event happens in your current call.",
        name: "Notifications"
    }
};

export default function SettingsPanel() {
    return (
        <div>
            {
                Object.keys(otherSettings).map(key => (
                    <SwitchItem
                        {...otherSettings[key]}
                        value={Settings.get(key, otherSettings[key].value)}
                        onChange={value => {Settings.set(key, value);}}
                    >{otherSettings[key].name}</SwitchItem>
                ))
            }
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