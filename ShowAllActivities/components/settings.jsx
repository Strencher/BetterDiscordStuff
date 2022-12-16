import React from "react";
import Webpack from "../modules/webpack";
import Settings from "../settings";

const SwitchItemComponent = Webpack.getModule(m => typeof m === "function" && m.toString().includes("helpdeskArticleId"), {searchExports: true});
const SwitchItem = props => {
    const [value, setValue] = React.useState(props.value);

    return (
        <SwitchItemComponent
            {...props}
            value={value}
            onChange={val => (setValue(val), props.onChange(val))}
        />
    );
};

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
