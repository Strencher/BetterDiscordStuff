import {UI, ContextMenu} from "@api";
import Webpack, {GuildStore} from "../modules/webpack";
import {copy, int2hex, int2rgb} from "../modules/utils";
import React from "react";
import Formatter from "../modules/formatter";

import "./label.css";

const SelectedGuildStore = Webpack.getStore("SelectedGuildStore");

const RoleColoredLabel = ({color, label}) => (
    <div className="copier-roleColoredItem">
        <span style={{backgroundColor: color}}></span>
        <div>{label}</div>
    </div>
);

export const RoleCopyOptions = [
    {
        name: "colorHEX",
        getValue: (_, colors) => colors.hex,
        description: "Will be replaced with the role color in HEX format."
    },
    {
        name: "colorRGB",
        getValue: (_, colors) => colors.rgb,
        description: "Will be replaced with the role color in RGB format."
    },
    {
        name: "colorINT",
        getValue: (_, colors) => colors.int.toString(),
        description: "Will be replaced with the role color in INT format."
    },
    {
        name: "name",
        getValue: role => role.name,
        description: "Will be replaced with the role name."
    },
    {
        name: "id",
        getValue: role => role.id,
        description: "Will be replaced with the role id."
    },
    {
        name: "position",
        getValue: role => role.position.toString(),
        description: "Will be replaced with the role position."
    }
];

export default function () {
    const patches = new Set([]);

    const patch = (res, props) => {
        const handleClose = () => {
            res?.props?.onClose();
        };
        
        const role = props.role || (() => {
            const guild = GuildStore.getGuild(SelectedGuildStore.getGuildId());
            if (!guild) return handleClose();

            const role = guild.getRole(props.id);

            if (!role) return handleClose();

            return role;
        })();

        const colors = {
            hex: int2hex(role.color),
            int: role.color,
            rgb: int2rgb(role.color)
        };

        console.log(colors);

        if (!Array.isArray(res.props.children)) {
            res.props.children = [res.props.children];
        }

        res.props.children = res.props.children.filter(e => e && e?.props?.id !== "devmode-copy-id");

        res.props.children.push(
            ContextMenu.buildMenuChildren([
                {
                    label: "Copy",
                    id: "copy-role",
                    type: "submenu",
                    action: () => {
                        copy(props.id);
                    },
                    items: [
                        {
                            label: "RoleId",
                            id: "copy-role-id",
                            action: () => {
                                copy(role.id);
                                UI.showToast("Copied role id.", {type: "success"});
                            }
                        },
                        {
                            label: "Name",
                            id: "copy-role-name",
                            action: () => {
                                copy(role.name);
                                UI.showToast("Copied role name.", {type: "success"});
                            }
                        },
                        {
                            label: "Custom Format",
                            id: "copy-role-custom-format",
                            action: () => {
                                copy(
                                    Formatter.formatString(
                                        Settings.get("roleCustom"),
                                        RoleCopyOptions.reduce((options, option) => {
                                            options[option.name] = option.getValue(role, colors);
                                            return options;
                                        }, {})
                                    )
                                );
                                UI.showToast("Copied role with custom format.", {type: "success"});
                            }
                        },
                        {
                            label: "Mention",
                            id: "copy-role-mention",
                            action: () => {
                                copy(`<@&${role.id}>`);
                                UI.showToast("Copied role mention. (<&roleId>)", {type: "success"});
                            }
                        },
                        {
                            label: "Color",
                            id: "copy-role-color",
                            type: "submenu",
                            disabled: !role.color,
                            items: [
                                {
                                    label: () => (
                                        <RoleColoredLabel color={colors.hex} label="RGB" />
                                    ),
                                    id: "copy-role-color-rgb",
                                    action: () => {
                                        copy(colors.rgb);
                                        UI.showToast(`Copied role color in RGB format.`, {type: "success"});
                                    }
                                },
                                {
                                    label: () => (
                                        <RoleColoredLabel color={colors.hex} label="HEX" />
                                    ),
                                    id: "copy-role-color-hex",
                                    action: () => {
                                        copy(colors.hex);
                                        UI.showToast(`Copied role color in HEX format.`, {type: "success"});
                                    }
                                },
                                {
                                    label: () => (
                                        <RoleColoredLabel color={colors.hex} label="INT" />
                                    ),
                                    id: "copy-role-color-int",
                                    action: () => {
                                        copy(colors.int.toString());
                                        UI.showToast(`Copied role color in INT format.`, {type: "success"});
                                    }
                                }
                            ]
                        }
                    ]
                }
            ])
        )
    };

    patches.add(ContextMenu.patch("dev-context", patch));
    patches.add(ContextMenu.patch("guild-settings-role-context", patch));

    return () => patches.forEach(p => p());
}
