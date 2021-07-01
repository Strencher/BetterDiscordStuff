import React from "react";
import createUpdateWrapper from "common/hooks/createUpdateWrapper";
import { WebpackModules } from "@zlibrary";
import Settings from "../settings";

const SwitchItem = createUpdateWrapper(WebpackModules.getByDisplayName("SwitchItem"));

export default function SettingsPanel() {
    return (
        <React.Fragment>
            <SwitchItem
                note="Shows the user typing status in chat."
                value={Settings.get("showTyping", true)}
                onChange={value => Settings.set("showTyping", value)}
            >Typing</SwitchItem>
        </React.Fragment>
    )
}