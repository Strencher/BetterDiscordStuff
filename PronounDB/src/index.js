import {DCM, Patcher, Utilities, WebpackModules, Modals, ReactComponents} from "@zlibrary";
import BasePlugin from "@zlibrary/plugin";
import PronounTag from "./components/pronouns";
import Settings from "./modules/settings";
import PronounsDB from "./modules/database";
import style from "styles";
import styles from "./style.scss";
import React, {useState} from "react";
import {FormItem, FormText} from "@discord/forms";
import {Pronouns} from "./data/constants";
import SettingsPanel from "./components/Settings";
import createUpdateWrapper from "../../common/hooks/createUpdateWrapper";


const SelectInput = createUpdateWrapper(WebpackModules.getByProps("SingleSelect").SingleSelect);
const TextInput = createUpdateWrapper(WebpackModules.getByDisplayName("TextInput"));
const Header = WebpackModules.getByDisplayName("Header");

export default class PronounDB extends BasePlugin {
    promises = {
        cancelled: false,
        cancel() {this.cancelled = true;}
    }
    patches = [];

    onStart() {
        style.inject();

        Utilities.suppressErrors(this.patchMessageTimestamp.bind(this), "MessageHeader patch")();
        Utilities.suppressErrors(this.patchUserContextMenus.bind(this), "UserContextMenu patch")();
        Utilities.suppressErrors(this.patchUserPopout.bind(this), "UserPopout patch")();
    }

    getSettingsPanel() {
        return (
            <SettingsPanel />
        )
    }

    async patchMessageTimestamp() {
        const OriginalMessageTimestamp = WebpackModules.getModule(m => m?.default?.toString().indexOf("showTimestampOnHover") > -1);

        this.patches.push(Patcher.after(OriginalMessageTimestamp, "default", (_, [{message: {author: user}}], ret) => {
            const children = Utilities.getNestedProp(ret, "props.children.1.props.children");
            if (!Array.isArray(children)) return;

            children.push(
                <PronounTag userId={user.id} type="showOnTimestamp" />
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

    async patchUserPopout() {
        const UserPopoutBody = WebpackModules.getModule(m => m.default.displayName === "UserPopoutBody");

        this.patches.push(Patcher.after(UserPopoutBody, "default", (_, [{user}], res) => {
            if (this.promises.cancelled) return;
            if (!Array.isArray(res?.props?.children) || res.props.children.some(s => s?.type === PronounTag)) return;

            const renderPronoun = data => {
                if (!data) return data;

                return (
                    <div className={styles.container}>
                        <Header className={styles.header} size={Header.Sizes.SIZE_12} uppercase muted>Pronouns</Header>
                        <div className={styles.tag}>{data}</div>
                    </div>
                );
            };

            res.props.children.unshift(
                <PronounTag userId={user.id} render={renderPronoun} type="showInUserPopout" />
            );
        }));
    }

    async patchUserContextMenus() {
        const Menus = WebpackModules.findAll(m => m.default?.displayName?.search(/user.*contextmenu/i) > -1);

        const SelectOptions = Object.entries(Pronouns).reduce((items, [key, value]) => {
            items.push({
                label: value ?? key,
                value: key
            });
            return items;
        }, []);

        for (const Menu of Menus) this.patches.push(
            Patcher.after(Menu, "default", (_, [{user}], ret) => {
                const children = Utilities.getNestedProp(ret, "props.children.props.children");
                if (!Array.isArray(children)) return;

                const localOverride = Settings.get("customPronouns")[user.id];

                const openModal = () => {
                    let value = "";
                    Modals.showModal("Set local Pronoun", [
                        <FormItem title="Pronoun">
                            <SelectInput value={value} options={SelectOptions} onChange={val => value = val} />
                            <FormText type="description">This will be displayed as your local pronoun. Only you will see this.</FormText>
                            <FormText>OR</FormText>
                            <TextInput value={value} onChange={val => value = val} placeholder="Custom Pronoun" />
                        </FormItem>
                    ], {
                        onConfirm: () => {
                            PronounsDB.setPronouns(user.id, value);
                        },
                    });
                };

                children.push(DCM.buildMenuChildren([
                    {
                        type: "submenu",
                        id: "pronoun-db",
                        label: "PronounDB",
                        items: [
                            {
                                id: "remove-or-add-pronoun",
                                label: localOverride ? "Remove Pronoun" : "Add Pronoun",
                                danger: Boolean(localOverride),
                                action: () => {
                                    if (localOverride) {
                                        delete Settings.get("customPronouns")[user.id];
                                        Settings.saveState();
                                        PronounsDB.removePronoun(user.id);
                                    } else openModal();
                                }
                            },
                            localOverride && {
                                id: "edit-pronoun",
                                label: "Edit Pronoun",
                                action: () => openModal()
                            }
                        ].filter(Boolean)
                    }
                ]));
            })
        );
    }

    onStop() {
        for (const unpatch of this.patches) unpatch();
        Patcher.unpatchAll();
        style.remove();
        this.promises.cancel();
    }
}
