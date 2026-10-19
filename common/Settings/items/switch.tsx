import { Components, Hooks } from "@api";
import ErrorBoundary from "@common/ErrorBoundary";
import React from "react";

import Settings from "../store";
import type { SettingsItemForType } from "../types";
import { getItemLabels } from "./shared";

const { SettingItem, SwitchInput } = Components;

export function SwitchItem({ isBeta = false, disabled = false, warning, ...props }: SettingsItemForType<"switch">) {
    const stored = Hooks.useStateFromStores([Settings] as any, () => Settings.get(props.id, props.value));
    const value = disabled ? false : stored;

    return (
        <ErrorBoundary id={props.id}>
            <SettingItem {...props} {...getItemLabels({ ...props, isBeta, warning })} inline={true}>
                <SwitchInput value={value} disabled={disabled} onChange={v => Settings.set(props.id, v)} />
            </SettingItem>
        </ErrorBoundary>
    );
}
