import React from "react";
import { ContextMenu, UI, Webpack } from "@api";
import styles from "./typingButton.scss";

import Keyboard from "./icons/keyboard";

import Settings from "../modules/settings";
import { TypingModule, useStateFromStores } from "../modules/shared";

const ChatBarButton = Webpack.getBySource("tooltipText", "renderButtonContents")?.A;

const removeItem = function(array: any[], item: any) {
    while (array.includes(item)) {
        array.splice(array.indexOf(item), 1);
    }

    return array;
};

function InvisibleTypingContextMenu() {
    const enabled = useStateFromStores([Settings], () => Settings.get("autoEnable", true));

    return (
        <ContextMenu.Menu
            navId="invisible-typing-context-menu"
            onClose={ContextMenu.close}
        >
            <ContextMenu.Item
                id="globally-disable-or-enable-typing"
                label={enabled ? "Disable Globally" : "Enable Globally"}
                action={() => {
                    Settings.set("autoEnable", !enabled);
                }}
            />
            <ContextMenu.Item
                color="danger"
                label="Reset Config"
                disabled={!Settings.get("exclude", []).length}
                id="reset-config"
                action={() => {
                    Settings.set("exclude", []);
                    UI.showToast("Successfully reset config for all channels.", { type: "success" });
                }}
            />
        </ContextMenu.Menu>
    );
}

export default function InvisibleTypingButton({ channel, isEmpty }) {
    const enabled = useStateFromStores([Settings], InvisibleTypingButton.getState.bind(this, channel.id));

    const handleClick = React.useCallback(() => {
        const excludeList = [...Settings.get<string[]>("exclude", [])];

        if (excludeList.includes(channel.id)) {
            removeItem(excludeList, channel.id);
            TypingModule.stopTyping(channel.id);
        } else {
            excludeList.push(channel.id);
            if (!isEmpty) TypingModule.startTyping(channel.id);
        }

        Settings.set("exclude", excludeList);
    }, [enabled]);

    const handleContextMenu = React.useCallback(event => {
        ContextMenu.open(event, () => {
            return <InvisibleTypingContextMenu />;
        });
    }, [enabled]);

    return (
        <ChatBarButton
            tooltipText={enabled ? "Typing Enabled" : "Typing Disabled"}
            active={!enabled}
            onClick={handleClick}
            onContextMenu={handleContextMenu}
            className={styles.invisibleTypingButton}
            renderButtonContents={() => <Keyboard disabled={!enabled} />}
        />
    );
}

InvisibleTypingButton.getState = function(channelId: string) {
    const isGlobal = Settings.get<boolean>("autoEnable", true);
    const isExcluded = Settings.get("exclude", []).includes(channelId);

    if (isGlobal && isExcluded) return false;
    if (isExcluded && !isGlobal) return true;

    return isGlobal;
};
