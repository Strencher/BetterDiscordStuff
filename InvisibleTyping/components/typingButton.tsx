import { Components, ContextMenu, Hooks, UI, Webpack } from "@api";
import { Settings } from "@common/Settings";
import { Channel } from "@vencord/discord-types";
import React from "react";

import { buildClassName, startTyping, stopTyping } from "../modules/shared";
import Keyboard from "./icons/keyboard";
import styles from "./typingButton.scss";

const ChatButton: React.ComponentType<any> = (
    Webpack.getBySource("CHAT_INPUT_BUTTON_NOTIFICATION", "animated.div") as any
)?.A;

function InvisibleTypingContextMenu(props: BetterDiscord.MenuRenderProps) {
    const enabled = Hooks.useStateFromStores([Settings] as any, () => Settings.get("autoEnable", true));
    const hasExcluded = Hooks.useStateFromStores(
        [Settings] as any,
        () => Settings.get<string[]>("exclude", []).length > 0
    );

    return (
        <ContextMenu.Menu {...props}>
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
                disabled={!hasExcluded}
                id="reset-config"
                action={() => {
                    Settings.set("exclude", []);
                    UI.showToast("Successfully reset config for all channels.", { type: "success" });
                }}
            />
        </ContextMenu.Menu>
    );
}

export default function InvisibleTypingButton({ channel, isEmpty }: { channel: Channel; isEmpty: boolean }) {
    const enabled = Hooks.useStateFromStores([Settings] as any, () => InvisibleTypingButton.getState(channel.id));

    const handleClick = React.useCallback(() => {
        const excludeList = Settings.get<string[]>("exclude", []);

        Settings.set(
            "exclude",
            excludeList.includes(channel.id)
                ? excludeList.filter(id => id !== channel.id)
                : [...excludeList, channel.id]
        );

        if (!enabled && !isEmpty) startTyping(channel.id);
        else stopTyping(channel.id);
    }, [enabled, channel.id, isEmpty]);

    const handleContextMenu = React.useCallback((event: React.MouseEvent<Element, MouseEvent>) => {
        ContextMenu.open(event.nativeEvent, InvisibleTypingContextMenu);
    }, []);

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
    const isExcluded = Settings.get<string[]>("exclude", []).includes(channelId);

    return isGlobal !== isExcluded;
};
