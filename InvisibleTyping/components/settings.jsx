import React from "react";
import { Components } from "@api";

import SettingsItems from "./settings.json";

import Settings from "../modules/settings";
import { useStateFromStores } from "../modules/shared";

const { SettingItem, SwitchInput } = Components;

function SwitchItem(props) {
    const value = useStateFromStores([Settings], () => Settings.get(props.id, props.value));
    return (
        <SettingItem
            {...props}
            inline={true}
        >
            <SwitchInput
                value={value}
                onChange={v => {
                    Settings.set(props.id, v);
                }}
            />
        </SettingItem>
    );
}

function renderItems(items) {
    return items.map(item => {
        switch (item.type) {
            case "switch":
                return <SwitchItem {...item} />;
            default:
                return null;
        }
    });
}

export default function SettingsPanel() {
    return (
        <div>
            {renderItems(SettingsItems)}
        </div>
    );
}
