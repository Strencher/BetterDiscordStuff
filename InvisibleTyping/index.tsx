import {Patcher, WebpackModules, Utilities, Logger} from "@zlibrary";
import BasePlugin from "@zlibrary/plugin";
import InvisibleTypingButton from "./components/typingbutton";
import styles from "styles";
import SettingsPanel from "./components/Settings";
import {PermissionUtils} from "@discord/modules";
import {ChannelTypes, Permissions} from "@discord/constants";
import {Users} from "@discord/stores";

const DMChannels = [ChannelTypes.DM, ChannelTypes.GROUP_DM];
const canViewChannel = function (channel: Channel): boolean {
    if (!channel) return false;
    if (DMChannels.includes(channel.type)) return true;

    try {
        return PermissionUtils.can(Permissions.SEND_MESSAGES, channel, Users.getCurrentUser());
    } catch (error) {
        Logger.error("Failed to request permissions:", error);
        return true;
    }
};

export default class InvisibleTyping extends BasePlugin {
    onStart() {
        styles.inject();

        Utilities.suppressErrors(() => {this.patchTextAreaButtons();}, "textarea buttons patch")();
        Utilities.suppressErrors(() => {this.patchStartTyping();}, "start typing patch")();
    }

    getSettingsPanel() {
        return <SettingsPanel />;
    }

    async patchTextAreaButtons() {
        const ChannelTextAreaContainer = WebpackModules.find(m => m?.type?.render?.displayName === "ChannelTextAreaContainer")?.type;
        
        Patcher.after(ChannelTextAreaContainer, "render", (_, [{channel, textValue, type}], returnValue) => {
            const tree = Utilities.findInReactTree(returnValue, e => e?.className?.includes("buttons-"));
            if (type === "profile_bio_input" || !Array.isArray(tree?.children) || tree.children.some((child: any) => child?.type === InvisibleTyping) || !canViewChannel(channel)) return returnValue;

            tree.children.unshift(<InvisibleTypingButton channel={channel} textValue={textValue} />);
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
    }
}