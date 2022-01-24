import {Users} from "@discord/stores";
import {Patcher, ReactComponents, WebpackModules} from "@zlibrary";
import BasePlugin from "@zlibrary/plugin";
import styles from "styles";
import TypingUser from "./components/user";
import SettingsPanel from "./components/settings";

const FriendsStore = WebpackModules.getByProps("isBlocked", "_dispatchToken");

export default class TypingUsersPlus extends BasePlugin {
    onStart() {
        styles.inject();
        this.patchTypingUsers();
    }

    getSettingsPanel() {
        return (
            <SettingsPanel />
        );
    }

    async patchTypingUsers() {
        const classes = WebpackModules.getByProps("typing");
        const TypingUsers = await ReactComponents.getComponentByName("TypingUsers", `.${classes.typing.split(" ").join(".")}`);

        Patcher.after(TypingUsers.component.prototype, "render", (_this, __, ret) => {
            const me = Users.getCurrentUser();

            const typingUsers = Object.keys(_this.props.typingUsers ?? {})
                .map(Users.getUser)
                .filter(user => {
                    return user && user.id !== me.id && !FriendsStore.isBlocked(user.id);
                });
            
            const tree = ret?.props?.children?.[1]?.props?.children;
            if (!tree || !typingUsers.length) return;

            for (const [index, user] of typingUsers.entries()) {
                const child = tree[index * 2];

                if (!Array.isArray(child?.props?.children)) continue;

                child.props.children = (
                    <TypingUser channel={_this.props.channel} user={user} />
                );
            }
        });

        TypingUsers.forceUpdateAll();
    }

    onStop() {
        styles.remove();
        Patcher.unpatchAll();
    }
}
