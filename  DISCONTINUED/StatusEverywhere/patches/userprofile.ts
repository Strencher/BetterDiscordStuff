import {Patcher, Utilities, WebpackModules} from "@zlibrary";
import StatusAvatar from "../components/avatar";
import settings from "../components/settings.json";

export default async function patchUserProfile(flush: Function[]): Promise<void> {
    const UserProfileModalHeader = await new Promise(resolve => {
        const filter = m => m?.default?.displayName === "UserProfileModalHeader";
        const cancel = () => WebpackModules.removeListener(listener);

        {
            const fromCache = WebpackModules.getModule(filter);
            if (fromCache) return resolve(fromCache);
        }
        
        const listener = module => {
            if (!filter(module)) return;

            resolve(module);
            cancel();
        };

        WebpackModules.addListener(listener);
        flush.push(cancel);
    });
    const classes = Object.assign({},
        WebpackModules.getByProps("avatarSpeaking", "wrapper"),
        WebpackModules.getByProps("header", "headerTop")
    );
    
    Patcher.after(UserProfileModalHeader, "default", (_, [props], res) => {
        const avatar = Utilities.findInReactTree(res, e => e?.props?.statusTooltip != null);
        
        if (!avatar) return;
        // const component = 

        avatar.props = Object.assign({}, props, {
            className: Utilities.className(classes.avatar, classes.wrapper),
            animated: true,
            shouldWatch: false,
            borderBox: false,
            radial: {
                id: "userProfileRadialStatus",
                value: false
            },
            showTyping: {
                id: "showUserProfileTyping",
                value: true
            },
            resolution: {
                id: "userProfileAvatarResolution",
                value: settings.user_profile.userProfileAvatarResolution.value
            },
            size: StatusAvatar.Sizes.SIZE_120
        });
        avatar.type = StatusAvatar;
    });
}