import { Components, Hooks, Webpack } from "@api";
import ErrorBoundary from "@common/ErrorBoundary";
import { Slider as SliderType } from "@vencord/discord-types";
import React from "react";

import Settings from "../store";
import type { SettingsItemForType } from "../types";

const { SettingItem } = Components;
const Slider: SliderType = Webpack.getByStrings("stickToMarkers");

export function SliderItem(props: SettingsItemForType<"slider">) {
    const value = Hooks.useStateFromStores([Settings], () => Settings.get(props.id, props.value));
    return (
        <ErrorBoundary id={props.id}>
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
