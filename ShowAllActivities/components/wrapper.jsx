import styles from "./wrapper.scss";
import Caret from "./icons/caret";
import React from "react";
import {Utils} from "@api";
import ActivityColors from "./colors.json";
import Settings from "../settings";
import Webpack from "../modules/webpack";

const ActivityTypes = {
    0: "PLAYING",
    1: "STREAMING",
    2: "LISTENING",
    3: "WATCHING",
    4: "CUSTOM_STATUS",
    5: "COMPETING",
    COMPETING: 5,
    CUSTOM_STATUS: 4,
    LISTENING: 2,
    PLAYING: 0,
    STREAMING: 1,
    WATCHING: 3
};

const {useCallback, useMemo, useState} = React;

const useStateFromStores = Webpack.getModule(m => m?.toString?.().includes("useStateFromStores"), {searchExports: true});
const useStateFromStoresArray = useStateFromStores;
const {Messages} = Webpack.getModule(m => m?.Messages?.MEMBER_LIST_SHOWN);
const PresenceStore = Webpack.getStore("PresenceStore");
const Tooltip = BdApi.Components.Tooltip


export const [UserActivity, UserActivityTypes] = (() => {
    const module = Webpack.getModule(m => Object.values(m).some(e => e?.USER_POPOUT_V2));

    return [
        module.Z,
        module[Object.keys(module).find(e => module[e]?.USER_POPOUT_V2)]
    ];
})();

const classes = Webpack.getByProps("activity", "buttonColor") ?? {};

export default function ActivityWrapper({user, activityType: ActivityType = UserActivity, whatever: WhateverWrapper, ...props}) {
    const activities = useStateFromStoresArray([PresenceStore], () => {
        // @ts-ignore
        return PresenceStore.getActivities(user.id).filter(ac => ac.type !== 4);
    });
    const [activityIndex, setActivityIndex] = useState(0);
    const currentActivity = useMemo(() => activities[activityIndex], [activityIndex, activities]);
    const shouldShowControls = useStateFromStores([Settings], () => {
        return activities.length > 1 || Settings.get("showAlways", false);
    }, [activities]);
    
    const canGo = type => {
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
    
    const handleSelectNext = type => useCallback(() => {
        if (!canGo(type)) return;

        let index; switch (type) {
            case "backward":
                index = activityIndex - 1;
                break;
            case "forward":
                index = activityIndex + 1;
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

    const style = {
        "--dot-color": ActivityColors[Object.keys(ActivityColors).find(e => currentActivity.id?.includes(e) || currentActivity.application_id === e || currentActivity.type === ActivityTypes[e])]
    };
    
    return (
        <WhateverWrapper>
            <div className={Utils.className(styles.wrapper, {
                [styles.spotify]: currentActivity.id?.startsWith("spotify")
            })} style={style}>
                <ActivityType
                    __SAA
                    {...props}
                    user={user}
                    activity={currentActivity}
                    type={UserActivityTypes.USER_POPOUT_V2}
                    key={currentActivity.application_id}
                    className={Utils.className(classes.activity)}
                    source="Profile Popout"
                    actionColor={classes.buttonColor}
                    openAction={props.onClose}
                    onOpenGameProfile={props.onClose}
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
                                className={Utils.className(styles.caret, {
                                    [styles.disabled]: !canGo("backward")
                                })}
                                onClick={goBackward}
                            >
                                <Caret direction="left" />
                            </div>
                        )}
                    </Tooltip>
                    
                    <div className={styles.carosell}>
                        {activities.map((_, i) => (
                            <div
                                key={"dot--" + i}
                                onClick={() => setActivityIndex(i)}
                                className={Utils.className(styles.dot, {
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
                                className={Utils.className(styles.caret, {
                                    [styles.disabled]: !canGo("forward")
                                })}
                                onClick={goForward}
                            >
                                <Caret direction="right" />
                            </div>
                        )}
                    </Tooltip>
                </div>}
            </div>
        </WhateverWrapper>
    );
}
