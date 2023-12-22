import React from "react";
import Styles from "./indicators.scss";
import {Colors, ModulesLibrary, buildClassName} from "../modules/shared";
import usePlatformStores from "../modules/usePlatformStores";
import * as Icons from "./icons/Icons";
import {getStatusText} from "../modules/utils";

export function getStatusColor(status) {
    const {StatusTypes} = ModulesLibrary;

    switch (status) {
        case StatusTypes.ONLINE:
            return Colors.Color.GREEN_360;
        case StatusTypes.IDLE:
            return Colors.Color.YELLOW_300;
        case StatusTypes.DND:
            return Colors.Color.RED_400;
        case StatusTypes.STREAMING:
            return Colors.Color.TWITCH;
        case StatusTypes.INVISIBLE:
        case StatusTypes.UNKNOWN:
        case StatusTypes.OFFLINE:
        default:
            return Colors.Color.PRIMARY_400
    }
}

export default function StatusIndicators({type, userId, size = 18, separator = false}) {
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
                            <ModulesLibrary.Tooltip text={getStatusText(key, status)}>
                                {props => (
                                    <Icon
                                        text={getStatusText(key, status)}
                                        style={{color: Colors.ColorDetails[getStatusColor(status)]?.hex}}
                                        width={size}
                                        height={size}
                                        data-status={status}
                                        {...props}
                                    />
                                )}
                            </ModulesLibrary.Tooltip>
                        );
                    })
                }
            </div>
        </React.Fragment>
    );
}
