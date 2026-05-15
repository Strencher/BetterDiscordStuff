import { Components, Hooks, Webpack } from "@api";
import ErrorBoundary from "@common/ErrorBoundary";
import { Select as SelectType, SelectOption, Slider as SliderType } from "@vencord/discord-types";
import React from "react";

import Settings from "./store";
import type { SettingsItem, SettingsItemForType } from "./types";

const { SettingItem, SwitchInput } = Components;
const Select: SelectType = Webpack.getByStrings('selectionMode:"single",onSelectionChange:', "isSelected:", {
    searchExports: true
});
const Slider: SliderType = Webpack.getByStrings("stickToMarkers");

function DropdownItem(props: SettingsItemForType<"dropdown">) {
    return (
        <ErrorBoundary key={props.id} id={props.id}>
            <SettingItem {...props}>
                <Select
                    closeOnSelect={true}
                    options={props.options as SelectOption[]}
                    serialize={v => String(v)}
                    select={v => Settings.set(props.id, v)}
                    isSelected={v => Settings.get(props.id, props.value) === v}
                />
            </SettingItem>
        </ErrorBoundary>
    );
}

function SwitchItem(props: SettingsItemForType<"switch">) {
    const value = Hooks.useStateFromStores([Settings], () => Settings.get(props.id, props.value));
    return (
        <ErrorBoundary key={props.id} id={props.id}>
            <SettingItem {...props} inline={true}>
                <SwitchInput value={value} onChange={v => Settings.set(props.id, v)} />
            </SettingItem>
        </ErrorBoundary>
    );
}

function SliderItem(props: SettingsItemForType<"slider">) {
    if (!Slider) return null;
    const value = Hooks.useStateFromStores([Settings], () => Settings.get(props.id, props.value));
    return (
        <ErrorBoundary key={props.id} id={props.id}>
            <SettingItem {...props}>
                <Slider
                    {...props}
                    handleSize={10}
                    initialValue={value}
                    defaultValue={props.defaultValue}
                    minValue={props.minValue}
                    maxValue={props.maxValue}
                    onValueChange={(value: number) => Settings.set(props.id, Math.round(value))}
                    onValueRender={(value: number) => Math.round(value)}
                />
            </SettingItem>
        </ErrorBoundary>
    );
}

export default function SettingsPanel(props: { items: SettingsItem[] }) {
    const ComponentMap: Record<SettingsItem["type"], React.FC<any>> = {
        dropdown: DropdownItem,
        switch: SwitchItem,
        slider: SliderItem
    };

    return props.items.map(item => {
        const Component = ComponentMap[item.type];
        return Component ? <Component {...item} /> : null;
    });
}
