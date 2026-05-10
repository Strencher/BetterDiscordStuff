import { Components, ContextMenu, Hooks, UI, Webpack } from "@api";
import { Settings } from "@common/Settings";
import { Channel } from "@vencord/discord-types";
import React from "react";

import { buildClassName, TypingModule } from "../modules/shared";
import Keyboard from "./icons/keyboard";
import styles from "./typingButton.scss";

const ChatButton: React.ComponentType<any> = (
    Webpack.getBySource("CHAT_INPUT_BUTTON_NOTIFICATION", "animated.div") as any
)?.A;

const removeItem = (array: any[], item: any) => {
    while (array.includes(item)) {
        array.splice(array.indexOf(item), 1);
    }

    return array;
};

function InvisibleTypingContextMenu() {
    const enabled = Hooks.useStateFromStores([Settings], () => Settings.get("autoEnable", true));

    return (
        <ContextMenu.Menu navId="invisible-typing-context-menu" onClose={ContextMenu.close}>
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

export default function InvisibleTypingButton(this: any, { channel, isEmpty }: { channel: Channel; isEmpty: boolean }) {
    const enabled = Hooks.useStateFromStores([Settings], InvisibleTypingButton.getState.bind(this, channel.id));

    const handleClick = React.useCallback(() => {
        const excludeList: string[] = [...Settings.get("exclude", [])];

        if (excludeList.includes(channel.id)) {
            removeItem(excludeList, channel.id);
            TypingModule.stopTyping(channel.id);
        } else {
            excludeList.push(channel.id);
            if (!isEmpty) TypingModule.startTyping(channel.id);
        }

        Settings.set("exclude", excludeList);
    }, [enabled]);

    const handleContextMenu = React.useCallback(
        (event: React.MouseEvent<Element, MouseEvent>) => {
            ContextMenu.open(event, () => {
                return <InvisibleTypingContextMenu />;
            });
        },
        [enabled]
    );

    return (
        <Components.Tooltip text={enabled ? "Typing Enabled" : "Typing Disabled"}>
            {(
                props: React.JSX.IntrinsicAttributes &
                    React.ClassAttributes<HTMLDivElement> &
                    React.HTMLAttributes<HTMLDivElement>
            ) => (
                <div {...props} onClick={handleClick} onContextMenu={handleContextMenu}>
                    <ChatButton
                        className={buildClassName(styles.invisibleTypingButton, { enabled, disabled: !enabled })}
                    >
                        <Keyboard disabled={!enabled} />
                    </ChatButton>
                </div>
            )}
        </Components.Tooltip>
    );
}

InvisibleTypingButton.getState = (channelId: string) => {
    const isGlobal: boolean = Settings.get("autoEnable", true);
    const isExcluded = Settings.get("exclude", []).includes(channelId);

    if (isGlobal && isExcluded) return false;
    if (isExcluded && !isGlobal) return true;

    return isGlobal;
};
