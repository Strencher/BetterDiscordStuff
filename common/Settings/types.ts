export interface BasicSettingsItem {
    id: string;
    name: string;
    note?: string;
}

export interface DropdownSettingsItem extends BasicSettingsItem {
    type: "dropdown";
    options: { label: string; value: string }[] | string[];
    value: string;
}

export interface SwitchSettingsItem extends BasicSettingsItem {
    type: "switch";
    value: boolean;
}

export interface SliderSettingsItem extends BasicSettingsItem {
    type: "slider";
    value: number;
    defaultValue?: number;
    minValue: number;
    maxValue: number;
    markers?: number[];
    stickToMarkers?: boolean;
}

export type SettingsItem = DropdownSettingsItem | SwitchSettingsItem | SliderSettingsItem;
export type SettingsItemForType<T extends SettingsItem["type"]> = Extract<SettingsItem, { type: T }>;
export type AnySettingsItem = BasicSettingsItem & { type: string; [key: string]: unknown };
