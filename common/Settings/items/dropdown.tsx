import { Components, Hooks, Webpack } from "@api";
import ErrorBoundary from "@common/ErrorBoundary";
import { SelectOption } from "@vencord/discord-types";
import React from "react";

import Settings from "../store";
import type { SettingsItemForType } from "../types";
import { getItemLabels } from "./shared";

const { SettingItem } = Components;
const Select: React.ComponentType<{
    options: SelectOption[];
    value: string;
    onChange(value: string): void;
    closeOnSelect?: boolean;
    renderOptionLabel?(option: SelectOption): React.ReactNode;
}> = Webpack.getByStrings('selectionMode:"single",onSelectionChange:', "clear:()=>", {
    searchExports: true
})!;

export function DropdownItem({ isBeta, warning, ...props }: SettingsItemForType<"dropdown">) {
    const value = Hooks.useStateFromStores([Settings] as any, () => Settings.get(props.id, props.value));
    const options = props.options.map(option =>
        typeof option === "string" ? { label: option, value: option } : option
    ) as SelectOption[];

    return (
        <ErrorBoundary id={props.id}>
            <SettingItem {...props} {...getItemLabels({ ...props, isBeta, warning })} inline={true}>
                <div style={{ width: 200, flexShrink: 0 }}>
                    <Select
                        closeOnSelect={true}
                        options={options}
                        value={value}
                        onChange={v => Settings.set(props.id, v)}
                        renderOptionLabel={option => option.label}
                    />
                </div>
            </SettingItem>
        </ErrorBoundary>
    );
}
