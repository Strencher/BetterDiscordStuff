import {WebpackModules} from "@zlibrary";
import createUpdateWrapper from "common/hooks/createUpdateWrapper";
import React from "react";
import Settings from "../settings";

const SwitchItem = createUpdateWrapper(WebpackModules.getByDisplayName("SwitchItem"));

const Items = [
    {
        id: "showAlways",
        name: "Show Always",
        note: "Shows the controls bar even if only one activity is present.",
        value: false
    }
];

export default function SettingsPanel() {
    return (
        <React.Fragment>
            {Items.map(item => (
                <SwitchItem
                    {...item}
                    value={Settings.get(item.id, item.value)}
                    onChange={value => Settings.set(item.id, value)}
                >{item.name}</SwitchItem>
            ))}
        </React.Fragment>
    );
}