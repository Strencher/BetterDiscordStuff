import React from "react";
import { Webpack } from "@api";
import Settings from "../modules/settings";
import { useStateFromStores } from "../modules/shared";
import SettingsItems from "./settings.json";

const FormSwitch = Webpack.getByStrings('.labelRow', 'useId', 'DESCRIPTION', { searchExports: true });

function SwitchItem(props) {
    const value = useStateFromStores([Settings], () => Settings.get(props.id, props.value));

    return (
        <FormSwitch
            {...props}
            value={value}
            children={props.name}
            onChange={value => {
                Settings.set(props.id, value);
            }}
        />
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
