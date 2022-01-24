import {Patcher, Utilities, WebpackModules} from "@zlibrary";
import StatusAvatar from "../components/avatar";
import settings from "../components/settings.json";

export default function patchUserProfile(): void {
    const UserProfileModalHeader = WebpackModules.getModule(m => m?.default?.displayName === "UserProfileModalHeader");
    const classes = WebpackModules.getByProps("header", "headerTop");

    Patcher.after(UserProfileModalHeader, "default", (_, [props], res) => {
        const avatar = Utilities.findInReactTree(res, e => e?.props?.statusTooltip);
        if (!avatar) return;

        avatar.props = Object.assign({}, props, {
            className: classes.avatar,
            animated: true,
            shouldWatch: false,
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