import React from "react";
import Styles from "./indicators.scss";
import {ModulesLibrary, buildClassName} from "../modules/shared";
import usePlatformStores from "../modules/usePlatformStores";
import * as Icons from "./icons/Icons";
import {getStatusText, getStatusColor} from "../modules/utils";

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
                                        style={{color: getStatusColor(status)}}
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
