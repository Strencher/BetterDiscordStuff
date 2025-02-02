import React from "react";
import { Components } from "@api";

import Settings from "../modules/settings";
import { useStateFromStores } from "../modules/shared";
import { getStatusColor } from "../modules/utils";

import * as Icons from "./icons/Icons";
import { Checkbox } from "./icons/checkbox";
import SettingsItems from "./settings.json";
import Styles from "./settings.scss";

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

function SmartDisable(props) {
    const iconSize = 26;
    const [states, setStates] = React.useState(Settings.get(props.id, Object.fromEntries(props.items.map(item => [item.id, item.value]))));

    const handleClick = id => {
        states[id] = !states[id];
        Settings.set(props.id, states);

        setStates(Object.assign({}, states));
    }

    return (
        <div className={Styles.PIsettingsSmartDisable}>
            <h1 className={Styles.PIsettingsTitle}>{props.name}</h1>
            <div className={Styles.body}>
                {props.items.map(item => (
                    <div key={item.id} className={Styles.item} onClick={() => handleClick(item.id)}>
                        {["online", "dnd", "idle", "offline"].map(status =>
                            React.createElement(Icons[item.icon], {
                                style: { color: getStatusColor(status) },
                                width: iconSize,
                                height: iconSize
                            })
                        )}
                        <Checkbox width={iconSize} height={iconSize} checked={!!states[item.id]} color="var(--brand-500)" />
                    </div>
                ))}
            </div>
        </div>
    );
}

function renderItems(items) {
    return items.map(item => {
        switch (item.type) {
            case "switch": return <SwitchItem {...item} />;
            case "smart-disable": return <SmartDisable {...item} />;
            default: return null;
        }
    });
}

export default function SettingsPanel() {
    return (
        <div>
            <h1 className={Styles.PIsettingsTitle}>General Settings</h1>
            {renderItems(SettingsItems)}
        </div>
    );
}
