import React from "react";
import { Webpack } from "@api";

import Settings from "../modules/settings";
import PronounsDB from "../modules/database";

const { TextInput } = Webpack.getByKeys("ModalContent");

export default function PronounInputModal({ userId }) {
    const initialPronouns = Settings.get("customPronouns")?.[userId] || "";
    const [pronouns, setPronouns] = React.useState(initialPronouns);

    React.useEffect(() => {
        if (pronouns.trim().length === 0) PronounsDB.removePronoun(userId);
        else if (pronouns.trim() !== initialPronouns) PronounsDB.setPronouns(userId, pronouns);
    }, [pronouns]);

    return (
        <TextInput
            type="text"
            value={pronouns}
            placeholder="Enter pronouns (e.g., they/them)"
            onChange={v => setPronouns(v)}
        />
    );
}