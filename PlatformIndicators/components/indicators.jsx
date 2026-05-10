import { Components } from "@api";
import React from "react";

import { buildClassName } from "../modules/shared";
import usePlatformStores from "../modules/usePlatformStores";
import { getStatusColor, getStatusText } from "../modules/utils";
import * as Icons from "./icons/Icons";
import Styles from "./indicators.scss";

export default function StatusIndicators({ type, userId, size = 18, separator = false }) {
    const state = usePlatformStores(userId, type);

    if (!Object.keys(state.clients).length || !state.shouldShow) return null;

    return (
        <React.Fragment>
            {separator && <span className={Styles.badge_separator} />}
            <div className={buildClassName(Styles.indicatorContainer, Styles["type_" + type])} data-id={userId}>
                {Object.entries(state.clients)
                    .filter(([key]) => (state.iconStates[key] ?? true) && key in Icons)
                    .map(([key, status]) => {
                        const Icon = Icons[key];

                        return (
                            <Components.Tooltip text={getStatusText(key, status)}>
                                {props => (
                                    <Icon
                                        text={getStatusText(key, status)}
                                        style={{ color: getStatusColor(status) }}
                                        width={size}
                                        height={size}
                                        data-status={status}
                                        {...props}
                                    />
                                )}
                            </Components.Tooltip>
                        );
                    })}
            </div>
        </React.Fragment>
    );
}
