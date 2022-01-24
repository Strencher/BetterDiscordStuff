import {Channels} from "@discord/stores";
import {Logger, Patcher, Utilities, WebpackModules} from "@zlibrary";
import StatusAvatar from "../components/avatar";
import settings from "../components/settings.json";

export default async function patchHeaderPlaying(): Promise<void> {
    const NowPlayingHeader = WebpackModules.getModule(m => m?.default?.displayName === "NowPlayingHeader");
        
    Patcher.after(NowPlayingHeader, "default", (_, __, res: any) => {
        const original = res.type;
        
        res.type = function ({ priorityUser: { user } }) {
            const ret = original.apply(this, arguments);
            
            try {
                const avatar = Utilities.findInReactTree(ret, e => e?.props?.status);
                if (!avatar) return ret;

                avatar.props = Object.assign({}, {
                    user,
                    size: StatusAvatar.Sizes.SIZE_32,
                    shouldWatch: false,
                    channel_id: Channels.getDMFromUserId(user.id),
                    radial: {
                        id: "friendsPageRadialStatus",
                        value: false
                    },
                    showTyping: {
                        id: "showFriendsPageTyping",
                        value: true
                    },
                    resolution: {
                        id: "friendsPageAvatarResolution",
                        value: settings.friends_page.friendsPageAvatarResolution.value
                    }
                });
                avatar.type = StatusAvatar;
            } catch (error) {
                Logger.error("Error in NowPlayHeader patch:\n", error);
            }
            
            return ret;
        }
    });
}