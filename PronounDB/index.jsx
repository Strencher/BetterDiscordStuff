import {ContextMenu, Patcher, UI, Webpack} from "@api";
import manifest from "@manifest";
import Styles from "@styles";

import PronounsTag from "./components/pronouns";
import SettingsPanel from "./components/settings";
import Settings from "./modules/settings";

import "./changelog.scss";
import {FlexModule, ModalComponents, ModalsModule, Pronouns} from "./data/constants";
import {db} from "./modules/database";

const React = BdApi.React
const {useState} = React

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
        const [Module, Key] = Webpack.getWithKey(Webpack.Filters.byStrings("isInteractionPlaceholder",".application.id"))
        Patcher.after(Module, Key, (_, __, res) => {
            const unpatch = Patcher.after(res, "type", (_, [{ message: { author }}], res) => {
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
                    this.openPronounModal(props.user.id);
                }
            });
            const Separator = ContextMenu.buildItem({ type: "separator" });
            res.props.children.push(Separator);
            res.props.children.push(SetCustomPronouns);
        });
    }

    openPronounModal(userId) {
        ModalsModule.openModal((props) => (
            <PronounInputModal userId={userId} props={props} />
        ));
    }

    getSettingsPanel() {
        return <SettingsPanel />;
    }
}

const PronounInputModal = ({ userId, props }) => {
    const [pronouns, setPronouns] = useState("");

    const savePronouns = () => {
        db.pronouns.put({ id: userId, pronouns });
        UI.alert("Success", `Pronouns for user ${userId} have been set to "${pronouns}".`);
        ModalComponents.closeAll();
    };

    const clearPronouns = () => {
        setPronouns("");
        db.pronouns.delete(userId);
        UI.alert("Pronouns removed", `Pronouns for user ${userId} have been removed.`);
        ModalComponents.closeAll();
    };

    return (
        <ModalComponents.ModalRoot {...props} size={ModalComponents.ModalSize.MEDIUM}>
            <ModalComponents.ModalHeader>
                <h2 style={{ color: "white" }}>Set Pronouns for User</h2>
            </ModalComponents.ModalHeader>

            <ModalComponents.ModalContent>
                <div>
                    <ModalComponents.TextInput
                        type="text"
                        placeholder="Enter pronouns (e.g., they/them)"
                        value={pronouns}
                        onChange={(e) => setPronouns(e.target.value)}
                    />
                </div>

                <div style={{display: "flex", justifyContent: "flex-end", marginTop: "16px"}}>
                    <ModalComponents.Button
                        onClick={savePronouns}
                        style={{backgroundColor: '#7289da', color: 'white', marginRight: '8px'}}
                    >
                        Save Pronouns
                    </ModalComponents.Button>

                    <ModalComponents.Button
                        onClick={clearPronouns}
                        style={{backgroundColor: '#dc3545', color: 'white'}}
                    >
                        Clear Pronouns
                    </ModalComponents.Button>
                </div>
            </ModalComponents.ModalContent>
        </ModalComponents.ModalRoot>
    );
};