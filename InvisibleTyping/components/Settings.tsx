import { Button, Flex } from "@discord/components";
import { useStateFromStores } from "@discord/flux";
import {WebpackModules} from "@zlibrary";
import createUpdateWrapper from "common/hooks/createUpdateWrapper";
import React from "react";
import Settings from "../settings";
import styles from "./settings.scss";

const SwitchItem = createUpdateWrapper(WebpackModules.getByDisplayName("SwitchItem"));

export default function SettingsPanel() {
    const disabledChannels = useStateFromStores([Settings], () => Settings.get("exclude", []))

    return <React.Fragment>
        <SwitchItem
            note="Automatically enables the typing indicator for each channel that isn't manually disabled."
            value={Settings.get("autoEnable", true)}
            onChange={value => Settings.set("autoEnable", value)}
        >Automatically enable</SwitchItem>

        <Flex justify={Flex.Justify.END} direction={Flex.Direction.VERTICAL}>
            <p className={styles.panel}>Current disabled channels: {disabledChannels.length}</p>
            <Button
                look={Button.Looks.OUTLINED}
                color={Button.Colors.RED}
                disabled={!Boolean(disabledChannels.length)}
                size={Button.Sizes.SMALL}
                onClick={() => {
                    Settings.set("exclude", []);
                }}
            >Reset</Button>
        </Flex>
    </React.Fragment>
}