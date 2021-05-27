import Settings from "../settings";
import {useState, useCallback} from "react";
import {WebpackModules} from "@zlibrary";
import Utilities from "../utilities";
import Keyboard from "./icons/keyboard";
import styles from "./typingButton.scss";

const TypingModule = WebpackModules.getByProps("startTyping");
const {TooltipContainer: Tooltip} = WebpackModules.getByProps("TooltipContainer");

export default function SilentTypingButton({channel, textValue}) {
    const [enabled, setEnabled] = useState(Settings.get("exclude", []).indexOf(channel.id) > -1);
    
    const handleClick = useCallback(() => {
        if (enabled) {
            Settings.removeFromArray("exclude", channel.id);
            TypingModule.stopTyping(channel.id);
            setEnabled(false);
        } else {
            Settings.appendToArray("exclude", channel.id);
            if (textValue) TypingModule.startTyping(channel.id);
            setEnabled(true);
        }
    }, [enabled]);

    return (
        <Tooltip text={enabled ? "Typing Enabled" : "Typing Disabled"} position="top" className={styles.silentTypingTooltip}>
            <button className={Utilities.joinClassNames(styles.silentTypingButton, {enabled, disabled: !enabled})} onClick={handleClick}>
                <Keyboard disabled={!enabled}/>
            </button>
        </Tooltip>
    );
};