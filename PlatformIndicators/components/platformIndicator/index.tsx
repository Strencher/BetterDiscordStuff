import { Components } from "@api";
import React from "react";

import usePlatformStores from "../../modules/usePlatformStores";
import { getStatusText } from "../../modules/utils";
import * as Icons from "../icons";
import PlatformIcon, { Platform } from "../platformIcon";
import Styles from "./style.scss";

interface PlatformIndicatorProps {
    location: string;
    userId: string;
    size?: number;
    separator?: boolean;
}

export default function PlatformIndicator({ location, userId, size = 18, separator = false }: PlatformIndicatorProps) {
    const state = usePlatformStores(userId, location);

    if (!Object.keys(state.clients).length || !state.shouldShow) return null;

    return (
        <React.Fragment>
            {separator && <span className={Styles.badge_separator} />}
            <div className={Styles.platformIndicator} data-location={location.toLowerCase()} data-id={userId}>
                {Object.entries(state.clients)
                    .filter(([key]) => (state.iconStates[key] ?? true) && key in Icons)
                    .map(([key, status]) => (
                        <Components.Tooltip key={key} text={getStatusText(key, status)}>
                            {(props: any) => (
                                <PlatformIcon
                                    platform={key as Platform}
                                    status={status}
                                    text={getStatusText(key, status)}
                                    data-location={location.toLowerCase()}
                                    width={size}
                                    height={size}
                                    {...props}
                                />
                            )}
                        </Components.Tooltip>
                    ))}
            </div>
        </React.Fragment>
    );
}
