import {WebpackModules} from "@zlibrary";
import Constants from "../data/constants";
import {default as Settings} from "../modules/settings";
import React from "react";
import Category from "common/components/category";
import createUpdateWrapper from "common/hooks/createUpdateWrapper";
import {FormItem, FormText} from "@discord/forms";

const SwitchItem = createUpdateWrapper(WebpackModules.getByDisplayName("SwitchItem"));
const NotificationSetting = createUpdateWrapper(WebpackModules.getByDisplayName("NotificationSettings"), "position", "onChange", 1);

export const otherSettings = {
    ignoreSelf: {
        value: false,
        note: "Defines if logs about your own actions should be ignored.",
        name: "Ignore yourself"
    },
    suppressInDnd: {
        value: true,
        note: "Suppress desktop notifications in DND, this automatically enables the In-App notification api.",
        name: "Suppress in DND"
    },
    notifications: {
        value: true,
        note: "Defines if notifications should be shown when an event happens in your current call.",
        name: "Notifications"
    }
};

export default function SettingsPanel() {
    return (
        <div>
            <Category label="General" look={Category.Looks.COMPACT}>
                {
                    Object.keys(otherSettings).map(key => (
                        <SwitchItem
                            {...otherSettings[key]}
                            value={Settings.get(key, otherSettings[key].value)}
                            onChange={value => {Settings.set(key, value);}}
                        >{otherSettings[key].name}</SwitchItem>
                    ))
                }
                <FormItem title="InApp Notifications">
                    <NotificationSetting position={Settings.get("inappPosition", "topleft")} onChange={value => Settings.set("inappPosition", value)} />
                    <FormText type="description">Defines if notifications should be shown when an event happens in your current call.</FormText>
                </FormItem>
            </Category>
            <Category label="Voice Updates" look={Category.Looks.COMPACT}>
                {
                    Object.keys(Constants.VOICE_STATES).reduce((items, key) => {
                        items.push(<SwitchItem
                            value={Settings.get(key, true)}
                            onChange={value => {
                                Settings.set(key, value);
                            }}
                            note={Constants.VOICE_STATES[key].description}
                        >{_.upperFirst(key)}</SwitchItem>)

                        return items;
                    }, [])
                }
            </Category>
        </div>
    );
}