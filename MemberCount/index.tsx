import { Patcher, ReactTools, WebpackModules } from "@zlibrary";
import BasePlugin from "@zlibrary/plugin";
import MemberCountDisplay from "./components/memberCount";
import MemberCountStore from "./stores/memberCount";
import stylesheet from "styles";
import { SelectedGuilds } from "@discord/stores";
import Settings from "./modules/Settings";
import SettingsPanel from "./components/Settings";

export default class MemberCount extends BasePlugin {
    get settings() { return Settings; }

    onStart() {
        this.patchChannelMembers();
        stylesheet.inject();
    }

    getSettingsPanel() {
        return (
            <SettingsPanel />
        );
    }

    async patchChannelMembers() {
        const { ListThin } = WebpackModules.getByProps("ListThin");

        Patcher.after(ListThin, "render", (_, [{className}], res) => {
            if (className?.indexOf?.("member") < 0) return;
            
            const guildId = SelectedGuilds.getGuildId();

            if (Array.isArray(res)) {
                const firstChild = res[0];
                if (firstChild) {
                    if (typeof firstChild.props.children === "function") {
                        const original = firstChild.props.children;

                        firstChild.props.children = (...args) => [
                            <MemberCountDisplay guildId={guildId} />,
                            original(...args)
                        ];
                    } else {
                        firstChild.props.children = [
                            <MemberCountDisplay guildId={guildId} />,
                            firstChild.props.children
                        ]
                    }
                } 
            } else if(res.props?.children) {
                res.props.children = [
                    <MemberCountDisplay guildId={guildId} />,
                    res.props.children
                ];
            }
        });

        const [node] = document.getElementsByClassName(WebpackModules.getByProps("membersWrap")?.membersWrap ?? "");
        if (node) {
            const instance = ReactTools.getOwnerInstance(node);
            if (typeof instance.forceUpdate === "function") instance.forceUpdate();
        }
    }

    onStop() {
        MemberCountStore.destroy();
        Patcher.unpatchAll();
        stylesheet.remove();
    }
}