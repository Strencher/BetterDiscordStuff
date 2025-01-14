import React from "react";
import { ContextMenu, Patcher, UI, Utils, Webpack } from "@api";
import manifest from "@manifest";
import Styles from "@styles";

import showChangelog from "../common/Changelog";

import PronounInputModal from "./components/pronounsModal";
import PronounsTag from "./components/pronounsTag";
import SettingsPanel from "./components/settings";
import Settings from "./modules/settings";
import PronounsDB from "./modules/database";

export default class PronounDB {
    start() {
        Styles.load();
        showChangelog(manifest);
        this.patchMessageTimestamp();
        this.patchUserProfile();
        this.patchContextMenu()
    }
    stop() {
        Styles.unload();
        Patcher.unpatchAll();
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

    patchUserProfile() {
        const [Module, Key] = Webpack.getWithKey(Webpack.Filters.byStrings("UserProfileUsername"))
        Patcher.after(Module, Key, (_, [{ user }], res) => {
            const [pronouns, setPronouns] = React.useState({ type: "", pronouns: "" });
            const tooltip = Utils.findInTree(res, x => x.className?.includes("pronounsTooltip"), { walkable: ["children", "props"] });
            const children = Utils.findInTree(res, x => x.className?.includes("pronounsText_"), { walkable: ["children", "props"] });

            PronounsDB.getPronouns(user.id)
                .then(pronouns => setPronouns(pronouns));

            if (!tooltip && !children) return;
            tooltip.text = pronouns.type;
            children.children = pronouns.pronouns;
        })
    }

    patchContextMenu() {
        ContextMenu.patch("user-context", (res, props) => {
            res.props.children.push(
                ContextMenu.buildItem({ type: "separator" })
            );
            res.props.children.push(
                ContextMenu.buildItem({
                    type: "button",
                    label: "Set Custom Pronouns",
                    onClick: () => {
                        const oldPronouns = Settings.get("customPronouns")?.[props.user.id];
                        UI.showConfirmationModal(
                            `Set Pronouns for ${props.user.username}`,
                            <PronounInputModal
                                userId={props.user.id}
                            />, {
                            onCancel: () => {
                                if (!oldPronouns) PronounsDB.removePronoun(props.user.id);
                                else PronounsDB.setPronouns(props.user.id, oldPronouns);
                            }
                        }
                        );
                    }
                })
            );
        });
    }

    getSettingsPanel() {
        return <SettingsPanel />;
    }
}