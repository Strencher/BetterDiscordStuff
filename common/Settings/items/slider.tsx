import { Components, Hooks, Webpack } from "@api";
import ErrorBoundary from "@common/ErrorBoundary";
import { Slider as SliderType } from "@vencord/discord-types";
import React from "react";

import Settings from "../store";
import type { SettingsItemForType } from "../types";
import { getItemLabels } from "./shared";

const { SettingItem } = Components;
const Slider: SliderType = Webpack.getByStrings("stickToMarkers", "moveStaggered", { searchExports: true })!;

export function SliderItem({ isBeta, warning, ...props }: SettingsItemForType<"slider">) {
    const value = Hooks.useStateFromStores([Settings] as any, () =>
        Settings.get(props.id, props.value ?? props.defaultValue)
    );
    return (
        <ErrorBoundary id={props.id}>
            <SettingItem {...props} {...getItemLabels({ ...props, isBeta, warning })}>
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
