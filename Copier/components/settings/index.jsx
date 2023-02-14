import React from "react";
import SettingsItem from "./item";
import ToggleItem from "./toggle";
import TextBox from "./textbox";
import ProTip from "../protip";
import {fmt} from "../../modules/utils";
import "./index.scss";
import Replacement from "./replacement";
import {UserCopyOptions} from "../../menus/user";
import {MessageCopyOptions} from "../../menus/message";
import {GuildCopyOptions} from "../../menus/guild";
import {ChannelCategoryCopyOptions, ChannelCopyOptions, VoiceChannelCopyOptions} from "../../menus/channel";
import {RoleCopyOptions} from "../../menus/dev";
import Settings from "../../modules/settings";

const Dynamic = ({component: Type, ...props}) => <Type {...props} />;

const optionsText = "{s} Options";

/**
 * @type {Array<{id: string, type: "toggle" | "text" | "replacement", name: string | React.ReactElement, note: string | React.ReactElement}>}
 */
const settings = [
    {
        id: "showButton",
        type: "toggle",
        name: "Toolbar Button",
        note: (
            <span>
                Shows a button in the message toolbar to copy a message with two formats.
                <br/>
                <ProTip/> Hold <span className="copier-key">Ctrl</span> or <span className="copier-key">Shift</span> to use MessageCustom options.
            </span>
        )
    },
    {
        id: "userCustom",
        name: fmt(optionsText, "UserCopy"),
        type: "replacement",
        options: UserCopyOptions
    },
    {
        id: "messageCustom",
        name: fmt(optionsText, "MessageCopy"),
        type: "replacement",
        options: MessageCopyOptions
    },
    {
        id: "guildCustom",
        name: fmt(optionsText, "GuildCopy"),
        type: "replacement",
        options: GuildCopyOptions
    },
    {
        id: "channelCustom",
        name: fmt(optionsText, "ChannelCopy"),
        type: "replacement",
        options: ChannelCopyOptions
    },
    {
        id: "categoryCustom",
        name: fmt(optionsText, "ChannelCategoryCopy"),
        type: "replacement",
        options: ChannelCategoryCopyOptions
    },
    {
        id: "voiceCustom",
        name: fmt(optionsText, "VoiceChannelCopy"),
        type: "replacement",
        options: VoiceChannelCopyOptions
    },
    {
        id: "roleCustom",
        name: fmt(optionsText, "RoleCopy"),
        type: "replacement",
        options: RoleCopyOptions
    }
];

const componentMap = {
    toggle: ToggleItem,
    text: TextBox,
    replacement: Replacement
};

export default function SettingsPanel() {
    const [selected, setSelected] = React.useState(null);

    return (
        <div className="copier-settings-container">
            {settings.map(p => (
                <SettingsItem {...p} key={p.id} onSelect={() => setSelected(selected === p.id ? null : p.id)} opened={selected === p.id}>
                    <Dynamic
                        component={componentMap[p.type]}
                        {...p}
                        value={Settings.get(p.id)}
                        onChange={val => Settings.set(p.id, val)}
                    />
                </SettingsItem>
            ))}
        </div>
    );
}
