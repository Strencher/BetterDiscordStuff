/// <reference path="../types/main.d.ts" />

import BasePlugin from "@zlibrary/plugin";
import {WebpackModules, Patcher} from "@zlibrary";
import stylesheet from "styles";
import CharCounterElement from "./components/counter";

export default class CharCounter extends BasePlugin {
    onStart() {
        stylesheet.inject();
        this.patchSlateCharCount();
    }

    patchSlateCharCount() {
        const SlateCharacterCount = WebpackModules.getModule(m => m.default.displayName === "SlateCharacterCount");

        Patcher.after(SlateCharacterCount, "default", (_, [{currentLength, maxCharacterCount}], res) => {
            if (!Array.isArray(res?.props?.children)) return;

            res.props.children.push(
                <CharCounterElement currentLength={currentLength} maxCharacterCount={maxCharacterCount} />
            );
            return res;
        });
    }
    
    onStop() {
        stylesheet.remove();
        Patcher.unpatchAll();
    }
}