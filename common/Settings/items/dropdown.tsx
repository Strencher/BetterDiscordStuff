import { Components, Webpack } from "@api";
import ErrorBoundary from "@common/ErrorBoundary";
import { Select as SelectType, SelectOption } from "@vencord/discord-types";
import React from "react";

import Settings from "../store";
import type { SettingsItemForType } from "../types";
import { getItemLabels } from "./shared";

const { SettingItem } = Components;
const Select: SelectType = Webpack.getByStrings('selectionMode:"single",onSelectionChange:', "isSelected:", {
    searchExports: true
})!;

export function DropdownItem({ isBeta, warning, ...props }: SettingsItemForType<"dropdown">) {
    return (
        <ErrorBoundary id={props.id}>
            <SettingItem {...props} {...getItemLabels({ ...props, isBeta, warning })}>
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
