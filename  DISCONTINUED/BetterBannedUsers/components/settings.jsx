import createUpdateWrapper from "common/hooks/createUpdateWrapper"
import {WebpackModules} from "@zlibrary";
import Settings from "../settings";
import _ from "lodash";

const SwitchItem = createUpdateWrapper(WebpackModules.getByDisplayName("SwitchItem"));

const settings = {
    quickUnban: {
        value: true,
        note: "Adds a quick unban button (X) to the card."
    },
    showReason: {
        value: true,
        note: "Shows the reason right inside the card."
    }
}

export default function SettingsPanel() {
    return (
        <>
            {
                Object.keys(settings).map(id => {
                    return (
                        <SwitchItem
                            children={_.upperFirst(id)}
                            note={settings[id].note}
                            value={Settings.get(id, settings[id].value)}
                            onChange={value => Settings.set(id, value)}
                        />
                    )
                })
            }
        </>
    )
}