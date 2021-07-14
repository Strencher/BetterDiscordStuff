import {Patcher, WebpackModules, Utilities} from "@zlibrary";
import BasePlugin from "@zlibrary/plugin";
import InvisibleTypingButton from "./components/typingbutton";
import Settings from "./settings";
import styles from "styles";
import SettingsPanel from "./components/Settings";

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
        
        Patcher.after(ChannelTextAreaContainer, "render", (_, [{channel, textValue}], returnValue) => {
            const tree = Utilities.findInReactTree(returnValue, e => e?.className?.includes("buttons-"));
            if (!Array.isArray(tree?.children) || tree.children.some((child: any) => child?.type === InvisibleTyping)) return returnValue;

            tree.children.unshift(<InvisibleTypingButton channel={channel} textValue={textValue} />);
        });
    }

    async patchStartTyping() {
        const TypingModule = WebpackModules.getByProps("startTyping");

        Patcher.instead(TypingModule, "startTyping", (_, [channelId], originalMethod) => {
            if (Settings.get("exclude", []).includes(channelId) || Settings.get("autoEnable", true)) originalMethod(channelId);
        });
    }

    onStop() {
        Patcher.unpatchAll();
        styles.remove();
    }
}