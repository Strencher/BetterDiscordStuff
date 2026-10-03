import { Patcher, Webpack } from "@api";
import showChangelog from "@common/Changelog";
import { Settings, SettingsItem, SettingsPanel } from "@common/Settings";
import manifest from "@manifest";
import Styles from "@styles";
import React from "react";

import InvisibleTypingButton from "./components/typingButton";
import { Dispatcher, stopTyping } from "./modules/shared";
import SettingsItems from "./settings.json";
import { ChatButtonsArgs } from "./types";

export default class InvisibleTyping {
    removeInterceptor: (() => void) | null = null;

    start() {
        Styles.load();
        showChangelog(manifest);
        this.removeInterceptor = this.patchTyping();
        this.patchChannelTextArea();
    }

    stop() {
        Styles.unload();
        Patcher.unpatchAll();
        this.removeInterceptor?.();
        this.removeInterceptor = null;
    }

    getState(channelId: string) {
        return InvisibleTypingButton.getState(channelId);
    }

    setState(channelId: string, value: boolean) {
        const isGlobal = Settings.get("autoEnable", true);
        const excludeList = Settings.get<string[]>("exclude", []).filter(id => id !== channelId);

        if (value !== isGlobal) excludeList.push(channelId);
        Settings.set("exclude", excludeList);

        if (!value) stopTyping(channelId);
    }

    patchTyping() {
        function interceptor({ type, channelId }: { type: string; channelId: string }) {
            if (type !== "TYPING_START_LOCAL") return;
            return !InvisibleTypingButton.getState(channelId);
        }

        Dispatcher.addInterceptor(interceptor);

        return () => {
            const index = Dispatcher._interceptors.indexOf(interceptor);
            if (index !== -1) Dispatcher._interceptors.splice(index, 1);
        };
    }

    patchChannelTextArea() {
        // eslint-disable-next-line no-unused-vars
        const ChatButtonsGroup: { type: (...args: any[]) => any } = (
            Webpack.getBySource("isSubmitButtonEnabled", ".A.getActiveOption(") as any
        )?.A;

        Patcher.after(ChatButtonsGroup, "type", (_, methodArgs, res) => {
            const [args] = methodArgs as ChatButtonsArgs;
            if (
                !args.disabled &&
                ["normal", "sidebar"].includes(args.type.analyticsName) &&
                Array.isArray(res.props?.children)
            ) {
                res.props.children.unshift(<InvisibleTypingButton channel={args.channel} isEmpty={!args.textValue} />);
            }
        });
    }

    getSettingsPanel() {
        return <SettingsPanel items={SettingsItems.items as SettingsItem[]} />;
    }
}
