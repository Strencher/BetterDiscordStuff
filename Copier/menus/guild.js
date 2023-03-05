import {UI, ContextMenu} from "@api";
import Formatter from "../modules/formatter";
import {copy} from "../modules/utils";
import Webpack from "../modules/webpack";
import Settings from "../modules/settings";

const GuildMemberCountStore = Webpack.getStore("GuildMemberCountStore");

export const GuildCopyOptions = [
    {
        name: "id",
        getValue: guild => guild.id,
        description: "Will be replaced with the server id."
    },
    {
        name: "name",
        getValue: guild => guild.name,
        description: "Will be replaced with the server name."
    },
    {
        name: "icon",
        getValue: guild => guild.getIconURL(),
        description: "will be replaced with the server icon url."
    },
    {
        name: "members",
        getValue: guild => GuildMemberCountStore.getMemberCount(guild.id),
        description: "Will be replaced with the member count of the server."
    },
    {
        name: "creation",
        getValue: guild => Formatter.parseSnowFlake(guild.id).toLocaleString(),
        description: "Will be replaced with the creation date of the server."
    }
];

export default function () {
    return ContextMenu.patch("guild-context", (res, props) => {
        const {guild} = props;

        if (!guild || !Array.isArray(res?.props?.children)) return res;

        const menu = ContextMenu.buildMenuChildren([
            {type: "separator"},
            {
                label: "Copy",
                id: "copy-guild",
                type: "submenu",
                action: () => {
                    copy(guild.id);
                },
                items: [
                    {
                        label: "Name",
                        id: "copy-guild-name",
                        action: () => {
                            copy(guild.name);
                            UI.showToast("Copied server name.", {type: "success"});
                        }
                    },
                    {
                        label: "Custom Format",
                        id: "copy-guild-custom",
                        action: () => {
                            copy(
                                Formatter.formatString(
                                    Settings.get("guildCustom"),
                                    GuildCopyOptions.reduce((options, option) => {
                                        options[option.name] = option.getValue(guild);
                                        return options;
                                    }, {})
                                )
                            );
                            UI.showToast("Copied server with custom format.", {type: "success"});
                        }
                    },
                    {
                        label: "GuildId",
                        id: "copy-guild-id",
                        action: () => {
                            copy(guild.id);
                            UI.showToast("Copied server id.", {type: "success"});
                        }
                    },
                    {
                        label: "Icon",
                        id: "copy-guild-icon",
                        action: () => {
                            copy(guild.getIconURL());
                            UI.showToast("Copied server icon url.", {type: "success"});
                        }
                    }
                ]
            }
        ]);

        res.props.children.splice(5, 0, menu);
    });
}
