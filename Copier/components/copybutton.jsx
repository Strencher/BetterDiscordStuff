import {MessageCopyOptions} from "../menus/message";
import Formatter from "../modules/formatter";
import Settings from "../modules/settings";
import {copy, useKeyState, useStateFromStores} from "../modules/utils";
import Webpack, {Tooltip} from "../modules/webpack";
import CopyIcon from "./icons/copy";
import React from "react";

const className = Webpack.getByProps("dangerous", "button")?.button ?? "buttonUndefined";

export default function CopyButton(props) {
    const shouldShow = useStateFromStores([Settings], () => Settings.get("showButton", true));
    const active = useKeyState();
    const {message} = props;
    
    if (!shouldShow) return null;

    const handleClick = () => {
        switch (active) {
            case "none":
                copy(message.content);
                break;
            case "shift":
            case "ctrl":
            case "both":
                copy(
                    Formatter.formatString(
                        Settings.get("messageCustom"),
                        MessageCopyOptions.reduce((options, option) => {
                            options[option.name] = option.getValue({message});
                            return options;
                        }, {})
                    )
                );
                break;
        }
    };

    return (
        <Tooltip text={active === "none" ? "Copy RAW Message" : "Copy Message (Custom)"}>
            {props => (
                <div {...props} className={className} onClick={handleClick}>
                    <CopyIcon fill={active === "none" ? "currentColor" : "#0870f3"} />
                </div>
            )}
        </Tooltip>
    );
}
