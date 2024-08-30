import React from "react";
import { Components, ContextMenu, UI, Webpack } from "@api";
import Keyboard from "./icons/keyboard";
import styles from "./typingButton.scss";
import Settings from "../modules/settings";
import { buildClassName, TypingModule, useStateFromStores } from "../modules/shared";

const ChatBarClasses = Webpack.getByKeys("channelTextArea", "button");

const removeItem = function (array: any[], item: any) {
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
        })
    }, [enabled]);

    return (
        <div
            style={{ marginRight: "2.5px" }}
            className={ChatBarClasses.buttons}
        >
            <Components.Tooltip text={enabled ? "Typing Enabled" : "Typing Disabled"}>
                {props => (
                    <button
                        {...props}
                        className={
                            buildClassName(styles.invisibleTypingButton, {
                                enabled,
                                disabled: !enabled
                            })

                        }
                        onClick={handleClick}
                        onContextMenu={handleContextMenu}
                    >
                        <Keyboard disabled={!enabled} />
                    </button>
                )}
            </Components.Tooltip>
        </div>
    );
}

InvisibleTypingButton.getState = function (channelId: string) {
    const isGlobal = Settings.get<boolean>("autoEnable", true);
    const isExcluded = Settings.get("exclude", []).includes(channelId);

    if (isGlobal && isExcluded) return false;
    if (isExcluded && !isGlobal) return true;

    return isGlobal;
};