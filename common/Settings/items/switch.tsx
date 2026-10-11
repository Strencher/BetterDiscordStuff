import { Components, Hooks } from "@api";
import ErrorBoundary from "@common/ErrorBoundary";
import React from "react";

import Settings from "../store";
import type { SettingsItemForType } from "../types";

const { SettingItem, SwitchInput } = Components;

function BetaTag() {
    return (
        <span
            style={{
                marginLeft: 8,
                padding: "0 6px",
                borderRadius: 16,
                background: "var(--brand-500, #5865f2)",
                color: "#fff",
                fontSize: 12,
                fontWeight: 700,
                lineHeight: "16px",
                textTransform: "uppercase",
                verticalAlign: "middle"
            }}
        >
            Beta
        </span>
    );
}

export function SwitchItem({ isBeta = false, ...props }: SettingsItemForType<"switch">) {
    const value = Hooks.useStateFromStores([Settings] as any, () => Settings.get(props.id, props.value));
    const name = isBeta ? (
        <>
            {props.name}
            <BetaTag />
        </>
    ) : (
        props.name
    );

    return (
        <ErrorBoundary id={props.id}>
            <SettingItem {...props} name={name as any} inline={true}>
                <SwitchInput value={value} onChange={v => Settings.set(props.id, v)} />
            </SettingItem>
        </ErrorBoundary>
    );
}
