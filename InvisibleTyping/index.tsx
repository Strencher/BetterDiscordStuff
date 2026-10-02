import { Patcher, Webpack } from "@api";
import showChangelog from "@common/Changelog";
import { Settings, SettingsItem, SettingsPanel } from "@common/Settings";
import manifest from "@manifest";
import Styles from "@styles";
import React from "react";

import InvisibleTypingButton from "./components/typingButton";
import { stopTyping } from "./modules/shared";
import SettingsItems from "./settings.json";
import { ChatButtonsArgs } from "./types";


export default class InvisibleTyping {
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
        const excludeList: string[] = [...Settings.get("exclude", [])];

        if (value) {
            if (!excludeList.includes(channelId)) excludeList.push(channelId);
        } else {
            excludeList.splice(excludeList.indexOf(channelId), 1);
            stopTyping(channelId);
        }
        Settings.set("exclude", excludeList);
    }

    patchTyping() {
    	function interceptor({type, channelId}) {
			if (type !== "TYPING_START_LOCAL") return;
			
            const globalTypingEnabled = Settings.get("autoEnable", true);
            const excludeList = Settings.get("exclude", []);
            const shouldType = globalTypingEnabled ? !excludeList.includes(channelId) : excludeList.includes(channelId);
			return !shouldType;
		}
		
		Dispatcher.addInterceptor(interceptor);
		return () => {
			const index = Dispatcher._interceptors.indexOf(interceptor);
			Dispatcher._interceptors.splice(index, 1);
		}
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
