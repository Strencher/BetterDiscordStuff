import {Pronouns} from "../data/constants";
import PronounsDB from "../modules/database";
import styles from "./pronouns.scss";

export default PronounsDB.connect(function Pronoun({data, render}) {
    const pronoun = Pronouns.hasOwnProperty(data) ? Pronouns[data] : data;
    if (typeof render === "function") return render(pronoun);
    
    if (!pronoun) return null;

    return (
        <span className={styles.text}> • {pronoun}</span>
    );
});