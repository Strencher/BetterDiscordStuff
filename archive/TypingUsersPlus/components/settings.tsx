import React from "react";
import Settings from "../settings";
import createUpdateWrapper from "common/hooks/createUpdateWrapper";
import {WebpackModules} from "@zlibrary";

const SwitchItem = createUpdateWrapper(WebpackModules.getByDisplayName("SwitchItem"));
const SettingsOptions = [
    {
        id: "showRoleIcon",
        name: "Show Role Icon",
        note: "Shows the user's role icon next to their name.",
        value: true
    },
    {
        id: "showAvatar",
        name: "Show Avatar",
        note: "Shows the user's avatar next to their name.",
        value: true
    },
    {
        id: "colorizeName",
        name: "Colorize Name",
        note: "Colorizes the name with their role color.",
        value: true
    }
];

export default function SettingsPanel() {
    return (
        <React.Fragment>
            {SettingsOptions.map(setting => (
                <SwitchItem
                    {...setting}
                    children={setting.name}
                    value={Settings.get(setting.id, setting.value)}
                    onChange={value => Settings.set(setting.id, value)}
                /> 
            ))}
        </React.Fragment>
    );
};