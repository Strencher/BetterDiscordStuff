import React from "react";

import { DropdownItem } from "./items/dropdown";
import { SliderItem } from "./items/slider";
import { SwitchItem } from "./items/switch";
import type { AnySettingsItem, SettingsItem } from "./types";

interface SettingsPanelProps {
    items: Array<SettingsItem | AnySettingsItem>;
    components?: Record<string, React.FC<any>>;
}

export default function SettingsPanel({ items, components: customComponents }: SettingsPanelProps) {
    const ComponentMap: Record<string, React.FC<any>> = {
        dropdown: DropdownItem,
        switch: SwitchItem,
        slider: SliderItem,
        ...customComponents
    };

    return items.map(item => {
        const Component = ComponentMap[item.type];
        return Component ? <Component key={item.id} {...item} /> : null;
    });
}
