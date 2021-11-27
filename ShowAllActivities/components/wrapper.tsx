import styles from "./wrapper.scss";
import {Caret} from "@discord/icons";
import {useCallback, useMemo, useState} from "react";
import {useStateFromStores, useStateFromStoresArray} from "@discord/flux";
import {Utilities, WebpackModules} from "@zlibrary";
import {Status} from "@discord/stores";
import {Tooltip} from "@discord/components";
import {Messages} from "@discord/i18n";
import ActivityColors from "./colors.json";
import {ActivityTypes} from "@discord/constants";
import Settings from "../settings";

const {default: UserActivity, UserActivityTypes} = WebpackModules.getModule(m => m?.default?.displayName === "UserActivityContainer");
const classes = WebpackModules.getByProps("activity", "rolesList");

export default function ActivityWrapper({user, ...props}) {
    const activities = useStateFromStoresArray([Status], () => {
        // @ts-ignore
        return Status.getActivities(user.id).filter(ac => ac.type !== 4);
    });
    const [activityIndex, setActivityIndex] = useState(0);
    const currentActivity = useMemo(() => activities[activityIndex], [activityIndex, activities]);
    const shouldShowControls = useStateFromStores([Settings], () => {
        return activities.length > 1 || Settings.get("showAlways", false);
    }, [activities]);
    
    const canGo = (type: "forward" | "backward") => {
        if (activityIndex === -1 || activities.length === 0 || activityIndex > (activities.length - 1)) return false;
        
        switch (type) {
            case "backward": {
                return activityIndex > 0;
            };     
            case "forward": {
                return activityIndex !== (activities.length -1) && activityIndex < (activities.length - 1);
            };
        }
    };
    
    const handleSelectNext = (type: "forward" | "backward") => useCallback(() => {
        if (!canGo(type)) return;

        switch (type) {
            case "backward":
                var index = activityIndex - 1;
                break;
            case "forward":
                var index = activityIndex + 1;
                break;
        }

        if (index < 0 || index > activities.length) return;
        
        setActivityIndex(index);
    }, [activities, activityIndex, user]);

    const goForward = handleSelectNext("forward");
    const goBackward = handleSelectNext("backward");

    if (!activities.length) return null;
    if (!currentActivity) {
        setActivityIndex(0);
        return null;
    }

    const style: any = {
        "--dot-color": ActivityColors[Object.keys(ActivityColors).find(e => currentActivity.id?.includes(e) || currentActivity.application_id === e || currentActivity.type === ActivityTypes[e])]
    };

    return (
        <div className={Utilities.className(styles.wrapper, {
            [styles.spotify]: currentActivity.id?.startsWith("spotify")
        })} style={style}>
            <UserActivity
                __SAA
                {...props}
                user={user}
                activity={currentActivity}
                type={UserActivityTypes.USER_POPOUT}
                key={currentActivity.application_id}
                className={Utilities.className(classes.activity, "newPopoutActivityStyles")}
            />
            {shouldShowControls && <div className={styles.controls}>
                <Tooltip
                    key="LEFT"
                    text={Messages.PAGINATION_PREVIOUS}
                    tooltipClassName={styles.tooltip}
                    spacing={14}
                >
                    {props => (
                        <div
                            {...props}
                            className={Utilities.className(styles.caret, {
                                [styles.disabled]: !canGo("backward")
                            })}
                            onClick={goBackward}
                        >
                            <Caret direction={Caret.Directions.LEFT} />
                        </div>
                    )}
                </Tooltip>
                
                <div className={styles.carosell}>
                    {activities.map((_, i) => (
                        <div
                            key={"dot--" + i}
                            onClick={() => setActivityIndex(i)}
                            className={Utilities.className(styles.dot, {
                                [styles.selected]: i === activityIndex
                            })}
                        />
                    ))}
                </div>
                <Tooltip
                    key="RIGHT"
                    text={Messages.PAGINATION_NEXT}
                    tooltipClassName={styles.tooltip}
                    spacing={14}
                >
                    {props => (
                        <div
                            {...props}
                            className={Utilities.className(styles.caret, {
                                [styles.disabled]: !canGo("forward")
                            })}
                            onClick={goForward}
                        >
                            <Caret direction={Caret.Directions.RIGHT} />
                        </div>
                    )}
                </Tooltip>
            </div>}
        </div>
    );
}