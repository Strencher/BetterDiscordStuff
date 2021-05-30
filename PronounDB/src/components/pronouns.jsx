import Settings from "../modules/settings";
import {Pronouns} from "../data/constants";
import PronounsDB from "../modules/database";
import styles from "./pronouns.scss";

export default Settings.connectStore(PronounsDB.connect(function Pronoun({data, render, type}) {
    if (!Settings.get(type)) return null;
    const pronoun = Pronouns.hasOwnProperty(data) ? Pronouns[data] : data;
    if (typeof render === "function") return render(pronoun);
    
    if (!pronoun) return null;

    return (
        <span className={styles.text}> • {pronoun}</span>
    );
}));