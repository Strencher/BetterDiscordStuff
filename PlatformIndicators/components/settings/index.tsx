import { Settings, SettingsPanel as _SettingsPanel } from "@common/Settings";
import React from "react";

import { getStatusColor } from "../../modules/utils";
import SettingsItems from "../../settings.json";
import * as Icons from "../icons";
import { Checkbox } from "../icons/checkbox";
import Styles from "./style.scss";

type IconKey = keyof typeof Icons;

interface SmartDisableItem {
    id: string;
    value: boolean;
    icon: IconKey;
}

interface SmartDisableProps {
    id: string;
    name: string;
    items: SmartDisableItem[];
}

function SmartDisable({ id, name, items }: SmartDisableProps) {
    const iconSize = 25;
    const [states, setStates] = React.useState<Record<string, boolean>>(
        Settings.get(id, Object.fromEntries(items.map(item => [item.id, item.value])))
    );

    const handleClick = (itemId: string) => {
        states[itemId] = !states[itemId];
        Settings.set(id, states);
        setStates(Object.assign({}, states));
    };

    return (
        <div className={Styles.SmartDisable}>
            <h1 className={Styles.title}>{name}</h1>
            <div className={Styles.body}>
                {items.map(item => (
                    <div key={item.id} className={Styles.item} onClick={() => handleClick(item.id)}>
                        {(["online", "dnd", "idle", "offline"] as const).map(status =>
                            React.createElement(Icons[item.icon], {
                                key: status,
                                style: { color: getStatusColor(status) },
                                width: iconSize,
                                height: iconSize
                            })
                        )}
                        <Checkbox
                            width={iconSize}
                            height={iconSize}
                            checked={!!states[item.id]}
                            color="var(--brand-500)"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default function SettingsPanel() {
    return <_SettingsPanel items={SettingsItems.items} components={{ "smart-disable": SmartDisable }} />;
}
