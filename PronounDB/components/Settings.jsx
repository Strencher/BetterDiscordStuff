import {WebpackModules} from "@zlibrary";
import React from "react";
import Settings from "../modules/settings";

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
                note="Shows the pronoun right next to the message timestamp."
                value={Settings.get("showOnTimestamp")}
                onChange={value => Settings.set("showOnTimestamp", value)}
            >Message Timestamp</SwitchItem>
            <SwitchItem
                note="Shows the pronoun in the user popout body."
                value={Settings.get("showInUserPopout")}
                onChange={value => Settings.set("showInUserPopout", value)}
            >User Popout</SwitchItem>
        </div>
    )
}