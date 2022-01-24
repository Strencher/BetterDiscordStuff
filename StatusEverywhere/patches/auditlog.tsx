import {Patcher, Utilities, WebpackModules} from "@zlibrary";
import StatusAvatar from "../components/avatar";
import settings from "../components/settings.json";
import {lazyPatch} from "../util";

export default function patchAuditLog(): void {
    const AuditLog = WebpackModules.getByDisplayName("GuildSettingsAuditLogEntry");
    const classes = WebpackModules.getByProps("desaturate", "auditLog", "avatar");
    Utilities
    Patcher.after(AuditLog.prototype, "render", (_this, _, res) => {
        const originalChildren: Function | void = res?.props?.children;
        if (typeof originalChildren !== "function") return;
        if (!_this.props.log?.user) return;

        lazyPatch(res?.props, "children", (_, ret) => {
            const popout = Utilities.findInReactTree(ret, e => e?.renderPopout);
            if (!popout) return;
            
            lazyPatch(popout, "children", props => (
                <StatusAvatar
                    {...props[0]}
                    user={_this.props.log.user}
                    showTyping={{id: "showGuildSettingsShowTyping", value: true}}
                    radial={{id: "guildSettingsRadialStatus", value: false}}
                    resolution={{id: "guildSettingsAvatarResolution", value: settings.guild_settings.guildSettingsAvatarResolution.value}}
                    className={classes.avatar}
                />
            ));
        });
    });
}