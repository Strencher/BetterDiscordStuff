import { Components, Hooks } from "@api";
import ErrorBoundary from "@common/ErrorBoundary";
import React from "react";

import Settings from "../store";
import type { SettingsItemForType } from "../types";

const { SettingItem, SwitchInput } = Components;

export function SwitchItem(props: SettingsItemForType<"switch">) {
    const value = Hooks.useStateFromStores([Settings], () => Settings.get(props.id, props.value));
    return (
        <ErrorBoundary id={props.id}>
            <SettingItem {...props} inline={true}>
                <SwitchInput value={value} onChange={v => Settings.set(props.id, v)} />
            </SettingItem>
        </ErrorBoundary>
    );
}
