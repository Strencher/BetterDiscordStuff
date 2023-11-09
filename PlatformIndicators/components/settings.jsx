import Settings from "../modules/settings";
import {Colors, Flux, ModulesLibrary, buildClassName} from "../modules/shared";
import * as Icons from "./icons/Icons";
import Styles from "./settings.scss";
import {Webpack} from "@api";
import React from "react";
import SettingsItems from "./settings.json";
import {Checkbox} from "./icons/checkbox";

const {FormSwitch} = Webpack.getByKeys("FormSwitch");

function SwitchItem(props) {
    const value = Flux.useStateFromStores([Settings], () => Settings.get(props.id, props.value));

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
                                style: {color: Colors.ColorDetails[ModulesLibrary.getStatusColor(status)]?.hex},
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
