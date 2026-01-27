import React from "react";
import createUpdateWrapper from "common/hooks/createUpdateWrapper";
import {WebpackModules} from "@zlibrary";
import Settings from "../settings";

const SwitchItem = createUpdateWrapper(WebpackModules.getByDisplayName("SwitchItem"));

const SettingsItems = [
    {
        name: "Close on outer click",
        note: "Closes the popout when clicking outside of it.",
        id: "closeOnOuterClick",
        value: true
    }
];

export default function SettingsPanel() {
    return (
        <React.Fragment>
            {SettingsItems.map((item) => (
                <SwitchItem
                    key={item.id}
                    note={item.note}
                    children={item.name}
                    value={Settings.get(item.id, item.value)}
                    onChange={(value: boolean) => {
                        Settings.set(item.id, value);
                    }}
                />
            ))}
        </React.Fragment>
    );
}