import {Channels} from "@discord/stores";
import {Patcher, WebpackModules} from "@zlibrary";
import StatusAvatar from "../components/avatar";
import settings from "../components/settings.json";

export default function patchAvatar(): void {
    const Avatars = WebpackModules.getModules(m => m?.type?.toString().includes("GuildIDContext"));
    
    const patch: any = (_, [props]) => {
        return (
            <StatusAvatar
                {...props}
                animated={props.src?.includes(".gif")}
                shouldWatch={false}
                channel_id={Channels.getDMFromUserId(props.user.id)}
                showTyping={{id: "showFriendsPageTyping", value: true}}
                radial={{id: "friendsPageRadialStatus", value: false}}
                resolution={{id: "friendsPageAvatarResolution", value: settings.friends_page.friendsPageAvatarResolution.value}}
            />
        );
    };

    for (const Avatar of Avatars) Patcher.after(Avatar, "type", patch);
}