import {Patcher, WebpackModules} from "@zlibrary";
import BasePlugin from "@zlibrary/plugin";
import InvisibleTypingButton from "./components/typingbutton";
import Settings from "./settings";
import Utilities from "./utilities";
import styles from "styles";

export default class InvisibleTyping extends BasePlugin {
    onStart() {
        styles.inject();

        Utilities.suppressErrors(this.patchTextAreaButtons.bind(this), "textarea buttons patch")();
        Utilities.suppressErrors(this.patchStartTyping.bind(this), "start typing patch")();
    }

    async patchTextAreaButtons() {
        const ChannelTextAreaContainer = WebpackModules.find(m => m?.type?.render?.displayName === "ChannelTextAreaContainer")?.type;
        
        Patcher.after(ChannelTextAreaContainer, "render", (_, [{channel, textValue}], returnValue) => {
            const tree = Utilities.findInReactTree(returnValue, e => e?.className?.indexOf("buttons-") > -1);
            if(!Array.isArray(tree?.children)) return returnValue;

            tree.children.unshift(<InvisibleTypingButton channel={channel} textValue={textValue} />);
        });
    }

    async patchStartTyping() {
        const TypingModule = WebpackModules.getByProps("startTyping");

        Patcher.instead(TypingModule, "startTyping", (_, [channelId], originalMethod) => {
            if(~Settings.get("exclude", []).indexOf(channelId) || Settings.get("autoEnable", false)) originalMethod(channelId);
        });
    }

    onStop() {
        Patcher.unpatchAll();
        styles.remove();
    }
}