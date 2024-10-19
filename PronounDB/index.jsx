import React from "react";
import { ContextMenu, Patcher, UI, Webpack } from "@api";
import manifest from "@manifest";
import Styles from "@styles";

import PronounInputModal from "./components/pronounsModal";
import PronounsTag from "./components/pronounsTag";
import SettingsPanel from "./components/settings";
import Settings from "./modules/settings";

import "./changelog.scss";
import PronounsDB from "./modules/database";

export default class PronounDB {
    start() {
        Styles.load();
        this.showChangelog();
        this.patchMessageTimestamp();
        this.patchContextMenu()
    }
    stop() {
        Styles.unload();
        Patcher.unpatchAll();
    }

    showChangelog() {
        if (
            !manifest?.changelog?.length ||
            Settings.get("lastVersion") === manifest.version
        ) return;

        const i18n = Webpack.getByKeys("getLocale");
        const formatter = new Intl.DateTimeFormat(i18n.getLocale(), {
            month: "long",
            day: "numeric",
            year: "numeric"
        });

        const title = (
            <div className="Changelog-Title-Wrapper">
                <h1>What's New - {manifest.name}</h1>
                <div>{formatter.format(new Date(manifest.changelogDate))} - v{manifest.version}</div>
            </div>
        )

        const items = manifest?.changelog?.map(item => (
            <div className="Changelog-Item">
                <h4 className={`Changelog-Header ${item.type}`}>{item.title}</h4>
                {item.items.map(item => (
                    <span>{item}</span>
                ))}
            </div>
        ));

        "changelogImage" in manifest && items.unshift(
            <img className="Changelog-Banner" src={manifest.changelogImage} />
        );

        Settings.set("lastVersion", manifest.version);

        UI.alert(title, items);
    }

    patchMessageTimestamp() {
        const [Module, Key] = Webpack.getWithKey(Webpack.Filters.byStrings("isInteractionPlaceholder", ".application.id"))
        Patcher.after(Module, Key, (_, __, res) => {
            const unpatch = Patcher.after(res, "type", (_, [{ message: { author } }], res) => {
                unpatch();
                const children = res.props.children[1].props.children;

                children.push(
                    <PronounsTag userId={author.id} type="showOnTimestamp" />
                )
            })
        })
    }

    patchContextMenu() {
        ContextMenu.patch("user-context", (res, props) => {
            const SetCustomPronouns = ContextMenu.buildItem({
                type: "button",
                label: "Set Custom Pronouns",
                onClick: () => {
                    const oldPronouns = Settings.get("customPronouns")[props.user.id] || "";
                    UI.showConfirmationModal(
                        `Set Pronouns for ${props.user.username}`,
                        <PronounInputModal
                            userId={props.user.id}
                        />, {
                            onCancel: () => PronounsDB.setPronouns(props.user.id, oldPronouns)
                        }
                    );
                }
            });
            const Separator = ContextMenu.buildItem({ type: "separator" });
            res.props.children.push(Separator);
            res.props.children.push(SetCustomPronouns);
        });
    }

    getSettingsPanel() {
        return <SettingsPanel />;
    }
}