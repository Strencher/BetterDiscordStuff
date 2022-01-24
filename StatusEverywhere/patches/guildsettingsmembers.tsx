import {Patcher, ReactComponents, Utilities, WebpackModules} from "@zlibrary";
import StatusAvatar from "../components/avatar";
import settings from "../components/settings.json";
import {lazyPatch} from "../util";

export default async function patchGuildSettingsMembers(): Promise<void> {
    const classes = WebpackModules.getByProps("member", "avatar");
    const Member = await ReactComponents.getComponentByName("Member", `.${classes.member}`);
    
    Patcher.after(Member.component.prototype, "render", (_this, _, returnValue) => {
        const avatar = Utilities.findInReactTree(returnValue, e => e?.props?.className === classes.avatar);
        if (!avatar || typeof avatar.type !== "function") return;
        
        Object.assign(avatar.props, {
            user: _this.props.user
        });
        
        lazyPatch(avatar, "type", props => (
            <StatusAvatar
                {...props[0]}
                showTyping={{id: "showGuildSettingsShowTyping", value: true}}
                radial={{id: "guildSettingsRadialStatus", value: false}}
                resolution={{id: "guildSettingsAvatarResolution", value: settings.guild_settings.guildSettingsAvatarResolution.value}}
            />
        ));
    });

    Member.forceUpdateAll();
}