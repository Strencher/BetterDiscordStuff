import React from "react";

import type { BasicSettingsItem } from "../types";

export function BetaTag() {
    return (
        <span
            style={{
                display: "inline-flex",
                alignItems: "center",
                height: 16,
                marginLeft: "var(--space-4)",
                padding: "0 var(--space-8)",
                borderRadius: "var(--radius-round)",
                background: "var(--badge-primary-background)",
                color: "var(--badge-primary-text)",
                fontSize: 12,
                fontWeight: 600,
                lineHeight: "16px",
                textTransform: "uppercase"
            }}
        >
            Beta
        </span>
    );
}

export function Warning({ children }: { children: React.ReactNode }) {
    return (
        <div
            style={{
                marginTop: 8,
                padding: "6px 10px",
                borderRadius: 4,
                border: "1px solid var(--border-feedback-warning)",
                background: "var(--background-feedback-warning)",
                color: "var(--text-default)",
                fontSize: 14,
                lineHeight: "18px"
            }}
        >
            {children}
        </div>
    );
}

export function getItemLabels({ name, note, isBeta, warning }: BasicSettingsItem) {
    return {
        name: (isBeta ? (
            <>
                {name}
                <BetaTag />
            </>
        ) : (
            name
        )) as any,
        note: (warning ? (
            <>
                {note}
                <Warning>{warning}</Warning>
            </>
        ) : (
            note
        )) as any
    };
}
