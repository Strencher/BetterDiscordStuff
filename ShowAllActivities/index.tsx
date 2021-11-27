/// <reference path="../types/main.d.ts" />

import {Patcher, WebpackModules} from "@zlibrary";
import BasePlugin from "@zlibrary/plugin";
import Styles from "styles";
import SettingsPanel from "./components/settings";
import ActivityWrapper from "./components/wrapper";

export default class ShowAllActivities extends BasePlugin {
    getSettingsPanel() {
        return (
            <SettingsPanel />
        );
    }

    onStart(): void {
        Styles.inject();

        this.patchUserActivityContainer();
    }

    patchUserActivityContainer() {
        const UserActivityModule = WebpackModules.getModule(m => m?.default?.displayName === "UserActivityContainer");

        Patcher.after(UserActivityModule, "default", (_, [props]) => {
            if (props.type !== UserActivityModule.UserActivityTypes.USER_POPOUT || props.__SAA) return;

            return (
                <ActivityWrapper user={props.user} {...props} />
            );
        });
    }

    onStop(): void {
        Styles.remove();
        Patcher.unpatchAll();
    }
}