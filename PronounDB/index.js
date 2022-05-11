/// <reference path="../types/main.d.ts" />

import {DCM, Patcher, Utilities, WebpackModules, Modals, ReactComponents, Components} from "@zlibrary";
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
import createUpdateWrapper from "common/hooks/createUpdateWrapper";
import {Users} from "@discord/stores";
import ContextMenu from "./modules/contextmenu";

const SelectInput = createUpdateWrapper(WebpackModules.getByProps("SingleSelect").SingleSelect);
const TextInput = createUpdateWrapper(WebpackModules.getByDisplayName("TextInput"));
const {Heading} = WebpackModules.getByProps("Heading") ?? {Heading: () => null};

export default class PronounDB extends BasePlugin {
    patches = [];
    promises = {
        cancelled: false,
        cancel() {this.cancelled = true;}
    }

    onStart() {
        style.inject();

        Utilities.suppressErrors(this.patchMessageTimestamp.bind(this), "MessageHeader patch")();
        Utilities.suppressErrors(this.patchUserContextMenus.bind(this), "UserContextMenu patch")();
        Utilities.suppressErrors(this.patchUserPopout.bind(this), "UserPopout patch")();
    }

    getSettingsPanel() {
        return (
            <SettingsPanel />
        );
    }

    async patchMessageTimestamp() {
        const OriginalMessageTimestamp = WebpackModules.getModule(m => m?.default?.toString().indexOf("showTimestampOnHover") > -1);
        
        function PatchedMessageHeader({__PDB_original__, user, ...props}) {
            const rendered = __PDB_original__.call(this, props);

            try {
                const children = rendered?.props?.children?.[1]?.props?.children;
                if (Array.isArray(children)) {
                    children.push(
                        <PronounTag userId={user.id} type="showOnTimestamp" />
                    );
                }
            } catch (error) {
                Logger.error("Failed to inject pronoun tag in chat:", error);
            }

            return rendered;
        }

        this.patches.push(Patcher.after(OriginalMessageTimestamp, "default", (_, [{message: {author: user}}], ret) => {
            Object.assign(ret.props, {
                __PDB_original__: ret.type,
                user
            });

            ret.type = PatchedMessageHeader;
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

        const wrap = (func, fallback) => {
            return (...args) => {
                try {return func.apply(null, args);}
                catch {return fallback;}
            }
        };

        this.patches.push(Patcher.after(UserPopoutBody, "default", (_, [{user}], res) => {
            if (this.promises.cancelled) return;
            if (!Array.isArray(res?.props?.children) || res.props.children.some(s => s?.type === PronounTag)) return;

            const renderPronoun = wrap(data => {
                if (!data) return data;

                return (
                    <Components.ErrorBoundary>
                        <div className={styles.container}>
                            <Heading level={3} variant="eyebrow" className={styles.header} uppercase muted>Pronouns</Heading>
                            <div className={styles.tag}>{data}</div>
                        </div>
                    </Components.ErrorBoundary>
                );
            }, null);

            res.props.children.unshift(
                <PronounTag userId={user.id} render={renderPronoun} type="showInUserPopout" />
            );
        }));
    }

    async patchUserContextMenus() {
        const SelectOptions = Object.entries(Pronouns).reduce((items, [key, value]) => {
            items.push({
                label: value ?? key,
                value: key
            });

            return items;
        }, []);

        const openModal = (user) => {
            let value = "";
            Modals.showModal("Set local Pronoun", [
                <FormItem title="Pronoun">
                    <SelectInput value={value} options={SelectOptions} onChange={val => value = val} />
                    <FormText type="description">This will be displayed as your local pronoun. Only you will see this.</FormText>
                    <FormText>OR</FormText>
                    <TextInput value={value} onChange={val => {
                        value = val;
                    }} placeholder="Custom Pronoun" />
                </FormItem>
            ], {
                onConfirm: () => {
                    PronounsDB.setPronouns(user.id, value);
                },
            });
        };

        const buildUserContextMenu = (user) => {
            const localOverride = Settings.get("customPronouns")[user.id];
            return DCM.buildMenuChildren([
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
                                } else openModal(user);
                            }
                        },
                        localOverride && {
                            id: "edit-pronoun",
                            label: "Edit Pronoun",
                            action: () => openModal(user)
                        }
                    ].filter(Boolean)
                }
            ]);
        }

        const patched = new WeakSet();
        const REGEX = /user.*contextmenu/i;
        const filter = ContextMenu.filterContext(REGEX);
        const loop = async () => {
            const UserContextMenu = await DCM.getDiscordMenu(m => {
                if (patched.has(m)) return false;
                if (m.displayName != null) return REGEX.test(m.displayName);

                return filter(m);
            });

            if (this.promises.cancelled) return;
            if (UserContextMenu.default.displayName) {
                Patcher.after(UserContextMenu, "default", (_, [props], ret) => {
                    const children = Utilities.findInReactTree(ret, Array.isArray)
                    if (!Array.isArray(children)) return;
    
                    const {user} = props;
    
                    children.splice(
                        7,
                        0,
                        buildUserContextMenu(user)
                    );
                });
            } else {
                let original = null;
                function wrapper(props) {
                    const rendered = original.call(this, props);

                    try {
                        const childs = Utilities.findInReactTree(rendered, Array.isArray);
                        const user = props.user || UserStore.getUser(props.channel?.getRecipientId?.());
                        if (!childs || !user || childs.some(c => c && c.key === "copy-user")) return rendered;
                        childs.push(buildUserContextMenu(user)); 
                    } catch (error) {
                        cancel();
                        Logger.error("Error in context menu patch:", error);
                    }

                    return rendered;
                }

                const cancel = Patcher.after(UserContextMenu, "default", (...args) => {
                    const [, , ret] = args;
                    const contextMenu = Utilities.getNestedProp(ret, "props.children");
                    if (!contextMenu || typeof contextMenu.type !== "function") return;

                    original ??= contextMenu.type;
                    wrapper.displayName ??= original.displayName;
                    contextMenu.type = wrapper;
                });
            }

            patched.add(UserContextMenu.default);
            loop();
        };

        loop();
    }

    onStop() {
        for (const unpatch of this.patches) unpatch();
        Patcher.unpatchAll();
        style.remove();
        this.promises.cancel();
    }
}
