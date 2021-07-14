import { joinClassNames } from "@discord/utils";
import { TooltipContainer as Tooltip } from "@discord/components";
import { Toasts, WebpackModules } from "@zlibrary";
import React, { useCallback } from "react";
import Settings from "../settings";
import Keyboard from "./icons/keyboard";
import styles from "./typingButton.scss";
import { useStateFromStores } from "@discord/flux";
import { openContextMenu, Menu, MenuItem, closeContextMenu } from "@discord/contextmenu";

const TypingModule = WebpackModules.getByProps("startTyping");

const removeItem = function (array: any[], item: any) {
    while (array.includes(item)) {
        array.splice(array.indexOf(item), 1);
    }

    return array;
};

function InvisibleTypingContextMenu({ channelId }) {
    const enabled = useStateFromStores([Settings], () => Settings.get<boolean>("autoEnable", true));

    return (
        <Menu navId="invisible-typing-context-menu" onClose={closeContextMenu}>
            <MenuItem
                id="globally-disable-or-enable-typing"
                label={enabled ? "Disable Globally" : "Enable Globally"}
                action={() => {
                    Settings.set("autoEnable", !enabled);
                }}
            />
            <MenuItem
                color="colorDanger"
                label="Reset Config"
                disabled={!Settings.get("exclude", []).length}
                id="reset-config"
                action={() => {
                    Settings.set("exclude", []);
                    Toasts.success("Successfully reset config for all channels.");
                }}
            />
        </Menu>
    );
}

export default function InvisibleTypingButton({ channel, textValue }) {
    const enabled = useStateFromStores([Settings], () => {
        if (Settings.get("exclude", []).includes(channel.id)) return true;
        if (Settings.get<boolean>("autoEnable", true)) return true;

        return false;
    });
    
    const handleClick = useCallback(() => {
        const excludeList = [...Settings.get<string[]>("exclude")];

        if (enabled) {
            removeItem(excludeList, channel.id);
            TypingModule.stopTyping(channel.id);
        } else {
            excludeList.push(channel.id);
            if (textValue) TypingModule.startTyping(channel.id);
        }

        Settings.set("exclude", excludeList);
    }, [enabled]);

    const handleContextMenu = useCallback(event => {
        openContextMenu(event, () => {
            return <InvisibleTypingContextMenu channelId={channel.id} />;
        })
    }, [enabled]);
    
    return (
        <Tooltip text={enabled ? "Typing Enabled" : "Typing Disabled"} position="top" className={styles.invisibleTypingTooltip}>
            <button className={joinClassNames(styles.invisibleTypingButton, {enabled, disabled: !enabled})} onClick={handleClick} onContextMenu={handleContextMenu}>
                <Keyboard disabled={!enabled}/>
            </button>
        </Tooltip>
    );
};