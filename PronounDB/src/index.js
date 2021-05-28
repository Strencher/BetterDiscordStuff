import {DCM, Patcher, Utilities, WebpackModules, Modals, ReactTools, Settings as ZSettings, ReactComponents} from "@zlibrary";
import BasePlugin from "@zlibrary/plugin";
import PronounTag from "./components/pronouns";
import Settings from "./modules/settings";
import PronounsDB from "./modules/database";
import style from "styles";
import styles from "./style.scss";

export default class PronounDB extends BasePlugin {
    patches = [];

    onStart() {
        style.inject();

        Utilities.suppressErrors(this.patchMessageTimestamp.bind(this), "MessageHeader patch")();
        Utilities.suppressErrors(this.patchUserContextMenus.bind(this), "UserContextMenu patch")();
        Utilities.suppressErrors(this.patchUserPopout.bind(this), "UserPopout patch")();
    }

    async patchMessageTimestamp() {
        const OriginalMessageTimestamp = WebpackModules.getModule(m => m?.default?.toString().indexOf("showTimestampOnHover") > -1);

        this.patches.push(Patcher.after(OriginalMessageTimestamp, "default", (_, [{message: {author: user}}], ret) => {
            const children = Utilities.getNestedProp(ret, "props.children.1.props.children");
            if (!Array.isArray(children)) return;

            children.push(
                <PronounTag userId={user.id} />
            );
        }));

        // Thanks discord.
        const Modules = WebpackModules.findAll(m => ~["ChannelMessage", "InboxMessage"].indexOf(m?.type?.displayName));

        for (const Module of Modules) {
            const unpatch = Patcher.after(Module, "type", (_, __, ret) => {
                const tree = Utilities.findInReactTree(ret, m => m?.childrenHeader);
                if (!tree) return;
                const originalType = tree.childrenHeader.type.type;
                tree.childrenHeader.type.type = OriginalMessageTimestamp.default;
                this.patches.push(() => {
                    tree.childrenHeader.type.type = originalType;
                });
                unpatch();
            });
            this.patches.push(unpatch);
        }
    }

    getSingleClass(className, isSelector = false) {
        const selector = className.split(" ");
        const module = WebpackModules.findByUniqueProperties(selector);
        if (!module) return "";

        return (isSelector ? "." : "") + module[selector.shift()];
    }

    async patchUserPopout() {
        const UserPopout = await ReactComponents.getComponentByName("UserPopout", this.getSingleClass("userPopout", true));

        this.patches.push(Patcher.after(UserPopout.component.prototype, "renderBody", (thisObject, _, res) => {
            const children = Utilities.getNestedProp(res, "props.children.props.children");

            if (!Array.isArray(children)) return;

            const renderPronoun = data => {
                if (!data) return data;

                return (
                    <div className={styles.container}>
                        <div className={styles.header}>Pronouns</div>
                        <div className={styles.tag}>{data}</div>
                    </div>
                );
            };

            children.unshift(<PronounTag userId={thisObject.props.userId} render={renderPronoun} />);
        }));

        UserPopout.forceUpdateAll();
    }

    async patchUserContextMenus() {
        const Menus = WebpackModules.findAll(m => m.default?.displayName?.search(/user.*contextmenu/i) > -1);

        for (const Menu of Menus) this.patches.push(
            Patcher.after(Menu, "default", (_, [{user}], ret) => {
                const children = Utilities.getNestedProp(ret, "props.children.props.children");
                if (!Array.isArray(children)) return;

                const localOverride = Settings.get("customPronouns")[user.id];

                children.push(DCM.buildMenuChildren([
                    {
                        label: localOverride ? "Remove Pronoun" : "Add Pronoun",
                        action: () => {
                            if (localOverride) {
                                delete Settings.get("customPronouns")[user.id];
                                PronounsDB.removePronoun(user.id);
                            } else {
                                let value = "";
                                Modals.showModal("Set Local Pronoun", [
                                    ReactTools.createWrappedElement([
                                        new ZSettings.Textbox("Pronoun", "This will be displayed as your local pronoun. Only you will see this.", "hh or He/Him", val => {
                                            value = val;
                                        }).getElement()
                                    ])
                                ], {
                                    onConfirm: () => {
                                        PronounsDB.setPronouns(user.id, value);
                                    },
                                });
                            }
                        }
                    }
                ]))
                if (localOverride){
                    children.push(DCM.buildMenuChildren([
                        {
                            label: "Edit Pronoun",
                            action: () => {
                                let value = Settings.get("customPronouns")[user.id];
                                Modals.showModal("Set Local Pronoun", [
                                    ReactTools.createWrappedElement([
                                        new ZSettings.Textbox("Pronoun", "This will be displayed as your local pronoun. Only you will see this.", value, val => {
                                            value = val;
                                        }).getElement()
                                    ])
                                ], {
                                    onConfirm: () => {
                                        PronounsDB.setPronouns(user.id, value);
                                    },
                                });
                            }
                        }
                    ]))
                }
            })
        );
    }

    onStop() {
        for (const unpatch of this.patches) unpatch();
        Patcher.unpatchAll();
        style.remove();
    }
}