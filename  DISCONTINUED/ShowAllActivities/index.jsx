import {UI, Patcher} from "@api";
import Webpack from "./modules/webpack";
import Styles from "@styles";
import React from "react";
import SettingsPanel from "./components/settings";
import ActivityWrapper from "./components/wrapper";
import config from "@manifest";
import Settings from "./settings";

import "./changelog.css";

export default class ShowAllActivities {
    maybeShowChangelog() {
        if (config.version === Settings.get("latestUsedVersion")) return;

        const items = config.changelog.map(item => (
            <div className={"SAA-changelog-item " + "item-changelog-" + item.type}>
                <h4 className="SAA-changelog-header">{item.type}</h4>
                <span>{item.items}</span>
            </div>
        ));

        "changelogImage" in config && items.unshift(
            <img className="SAA-changelog-banner" src={config.changelogImage} />
        );

        Settings.set("latestUsedVersion", config.version);

        const formatter = new Intl.DateTimeFormat(document.documentElement.lang, {month: "long", day: "numeric", year: "numeric"});
        UI.alert(<div className="SAA-title-wrap">
            <h1>What's New - {config.name}</h1>
            <span>{formatter.format(new Date(config.changelogDate))}</span>
        </div>, items);
    }

    getSettingsPanel() {
        return (
            <SettingsPanel />
        );
    }

    start() {
        Styles.load();

        this.patchUserActivityContainer();
        this.maybeShowChangelog();
    }

    patchUserActivityContainer() {
        const [UserActivityModule, method] = Webpack.getMangled(m => m?.toString?.().includes("onOpenGameProfile:"));

        Patcher.after(UserActivityModule, method, (_, [props], res) => {
            if (/*(props.type !== UserActivityTypes.USER_POPOUT && props.type !== UserActivityTypes.USER_POPOUT_V2) || */props.__SAA) return;
            const youTellMe = res.type;
            const ActivityType = res?.props?.children?.type;

            if (typeof youTellMe !== "function" || typeof ActivityType !== "function") return;

            return (
                <ActivityWrapper activityType={ActivityType} whatever={youTellMe} user={props.user} {...props} />
            );
        });
    }

    stop() {
        Styles.unload();
        Patcher.unpatchAll();
    }
}
