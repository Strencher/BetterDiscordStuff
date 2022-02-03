import {Patcher, Utilities, WebpackModules} from "@zlibrary";
import StatusAvatar from "../components/avatar";
import settings from "../components/settings.json";

export default function patchUserPopout(): void {
    const UserPopoutComponents = WebpackModules.getByProps("UserPopoutAvatar");

    Patcher.after(UserPopoutComponents, "UserPopoutAvatar", (_, [props], res) => {
        const tree = Utilities.findInReactTree(res, e => e?.className?.indexOf("avatarHoverTarget") > -1);
        if (!tree) return;
        const Component = tree.children.type;

        const WrappedAvatar = ({className, ...props}) => (
            <Component className={Utilities.className(className, tree?.props?.className)} {...props} />
        );

        tree.children = (
            <StatusAvatar
                {...props}
                shouldWatch={false}
                type="user-popout"
                animated
                size={StatusAvatar.Sizes.SIZE_80}
                AvatarComponent={WrappedAvatar}
                radial={{ id: "userPopoutRadialStatus", value: false }}
                showTyping={{id: "showUserPopoutTyping", value: true}}
                resolution={{id: "userPopoutAvatarResolution", value: settings.user_popout.userPopoutAvatarResolution.value}}
            />
        );
    });
}