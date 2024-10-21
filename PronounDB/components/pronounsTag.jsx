import React from "react";

import { Pronouns } from "../data/constants";
import PronounsDB from "../modules/database";
import Settings from "../modules/settings";
import Styles from "./pronouns.scss";

export default PronounsDB.connect(function Pronoun({ data, render, type }) {
    if (!Settings.get(type, true)) return null;
    const pronoun = Pronouns.hasOwnProperty(data) ? Pronouns[data] : data;
    if (typeof render === "function") return render(pronoun);
    if (!pronoun || !pronoun.pronouns) return null;

    return (
        <span
            key={pronoun.userId}
            className={Styles.timestamp}
        >
            <span className="pronoun-db-dot">•</span> {pronoun.pronouns}
        </span>
    );
});