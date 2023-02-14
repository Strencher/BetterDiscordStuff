import {ContextMenu, UI} from "@api";
import {copy} from "../modules/utils";
import Formatter from "../modules/formatter";
import Settings from "../modules/settings";
import {ChannelStore} from "../modules/webpack";

export const UserCopyOptions = [
    {
        name: "id",
        getValue: user => user.id,
        description: "Will be replaced with the id of the user."
    },
    {
        name: "name",
        getValue: user => user.username,
        description: "Will be replaced with the name of the user."
    },
    {
        name: "tag",
        getValue: user => user.tag,
        description: "Will be replaced with the tag of the user."
    },
    {
        name: "discriminator",
        getValue: user => user.discriminator,
        description: "Will be replaced with the discriminator of the user."
    },
    {
        name: "creation",
        getValue: (user, {Formatter}) => Formatter.parseSnowFlake(user.id).toLocaleString(),
        description: "Will be replaced with creation date of the user."
    },
    {
        name: "avatar",
        getValue: user => user.getAvatarURL("gif"),
        description: "Will be replaced with the avatar url of the user."
    }
];

export default function () {
    const patches = new Set();

    const buildMenu = (user, isDM = false) => ContextMenu.buildMenuChildren([
        {type: "separator"},
        {
            type: "submenu",
            id: "copier",
            label: "Copy",
            action() {
                copy(user.id);            
            },
            items: [
                {
                    label: "Username",
                    id: "copy-user-name",
                    action() {
                        copy(user.username);
                        UI.showToast("Copied Username.", {type: "success"});
                    }
                },
                {
                    label: "Custom Format",
                    id: "copy-user-custom",
                    action() {
                        const options = UserCopyOptions.reduce((options, option) => {
                            options[option.name] = option.getValue(user);
                            return options;
                        }, {});
    
                        copy(
                            Formatter.formatString(Settings.get("userCustom"), options)
                        );
    
                        UI.showToast("Copied user with custom format.", {type: "success"});
                    }
                },
                {
                    label: "UserId",
                    id: "copy-user-id",
                    action: () => {
                        copy(user.id);
                        UI.showToast("Copied user id.", {type: "success"});
                    }
                },
                {
                    label: "Avatar Url",
                    id: "copy-user-avatar",
                    action: () => {
                        copy(user.getAvatarURL("gif"));
                        UI.showToast("Copied user avatar url.", {type: "success"});
                    }
                },
                isDM && {
                    label: "DM Id",
                    id: "copy-dm-id",
                    action: () => {
                        copy(ChannelStore.getDMFromUserId(user.id));
                        UI.showToast("Copied dm channelId of user.", {type: "success"});
                    }
                }
            ].filter(Boolean)
        }
    ]);

    patches.add(ContextMenu.patch("user-context", (res, props) => {
        const tree = res?.props?.children;

        if (!Array.isArray(tree)) return console.log("Not an array.", tree);

        tree.splice(-1, 0, buildMenu(props.user, !!props.channel));
    }));

    return () => patches.forEach(p => p());
}
