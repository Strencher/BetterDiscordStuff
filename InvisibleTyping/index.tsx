import {Patcher, WebpackModules, Utilities, Logger} from "@zlibrary";
import BasePlugin from "@zlibrary/plugin";
import InvisibleTypingButton from "./components/typingbutton";
import styles from "styles";
import SettingsPanel from "./components/Settings";
import {PermissionUtils} from "@discord/modules";
import {ChannelTypes, Permissions} from "@discord/constants";
import {Users} from "@discord/stores";

const ChannelTextAreaContainer = WebpackModules.find(m => m?.type?.render?.displayName === "ChannelTextAreaContainer")?.type;
const ChannelTextAreaButtons = WebpackModules.find(m => m.type && m.type.displayName === "ChannelTextAreaButtons");

const DMChannels = [ChannelTypes.DM, ChannelTypes.GROUP_DM];
const canViewChannel = function (channel: ChannelObject): boolean {
    if (!channel) return false;
    if (DMChannels.includes(channel.type as (1 | 3))) return true;

    try {
        return PermissionUtils.can(Permissions.SEND_MESSAGES, channel, Users.getCurrentUser());
    } catch (error) {
        Logger.error("Failed to request permissions:", error);
        return true;
    }
};

export default class InvisibleTyping extends BasePlugin {
    static _updating = false;

    static setUpdating(state: boolean) {
        this._updating = state;
    }

    onStart() {
        styles.inject();

        Utilities.suppressErrors(this.patchTextAreaButtons.bind(this), "textarea buttons patch")();
        Utilities.suppressErrors(this.patchStartTyping.bind(this), "start typing patch")();
    }

    getSettingsPanel() {
        return <SettingsPanel />;
    }

    async patchTextAreaButtons() {
        type TextAreaButtonsProps = {type: string, channel: ChannelObject, disabled: boolean, handleSubmit: Function, isEmpty: boolean};

        const shouldShow = function (children: any[], props: TextAreaButtonsProps) {
            if (props.type.analyticsName === "profile_bio_input") return false;
            if (!Array.isArray(children)) return false;
            if (children.some(child => child && child.type === InvisibleTyping)) return false;
            if (!canViewChannel(props.channel)) return false;

            return true;
        };

        if (ChannelTextAreaButtons) {
            Patcher.after(ChannelTextAreaButtons, "type", (_, [props]: TextAreaButtonsProps[], returnValue) => {
                const children: any[] = returnValue && returnValue.props && returnValue.props.children;
                if (!shouldShow(children, props)) return;

                children.unshift(
                    <InvisibleTypingButton {...props} />
                );
            });

            this.forceUpdate();
        } else {
            Patcher.after(ChannelTextAreaContainer, "render", (_, [props], returnValue) => {
                    const tree = Utilities.findInReactTree(returnValue, e => e?.className?.indexOf("buttons-") > -1);
                if (!tree || !shouldShow(tree.children, props)) return returnValue;
    
                tree.children.unshift(
                    <InvisibleTypingButton {...props} isEmpty={!!props.textValue} />
                );
            });
        }
    }

    forceUpdate() {
        if (InvisibleTyping._updating) return;
        InvisibleTyping.setUpdating(true);

        Patcher.after(ChannelTextAreaContainer, "render", function () {
            const [, , returnValue] = arguments;
            
            this.unpatch();
            InvisibleTyping.setUpdating(false);
            const buttons = Utilities.findInReactTree(returnValue, e => e && e.type === ChannelTextAreaButtons);
            if (!buttons) return;
            
            // Make react forceUpdate it.
            buttons.key = Math.random().toString();
        });
    }

    async patchStartTyping() {
        const TypingModule = WebpackModules.getByProps("startTyping");

        Patcher.instead(TypingModule, "startTyping", (_, [channelId], originalMethod) => {
            if (InvisibleTypingButton.getState(channelId)) originalMethod(channelId);
        });
    }

    onStop() {
        Patcher.unpatchAll();
        styles.remove();

        if (ChannelTextAreaButtons) this.forceUpdate();
    }
}