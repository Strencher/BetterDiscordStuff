/**
 * @name LinkChannels
 * @displayName LinkChannels
 * @invite gv2ree
 * @authorId 415849376598982656
 */
/*@cc_on
@if (@_jscript)
    
    // Offer to self-install for clueless users that try to run this directly.
    var shell = WScript.CreateObject("WScript.Shell");
    var fs = new ActiveXObject("Scripting.FileSystemObject");
    var pathPlugins = shell.ExpandEnvironmentStrings("%APPDATA%\BetterDiscord\plugins");
    var pathSelf = WScript.ScriptFullName;
    // Put the user at ease by addressing them in the first person
    shell.Popup("It looks like you've mistakenly tried to run me directly. \n(Don't do that!)", 0, "I'm a plugin for BetterDiscord", 0x30);
    if (fs.GetParentFolderName(pathSelf) === fs.GetAbsolutePathName(pathPlugins)) {
        shell.Popup("I'm in the correct folder already.", 0, "I'm already installed", 0x40);
    } else if (!fs.FolderExists(pathPlugins)) {
        shell.Popup("I can't find the BetterDiscord plugins folder.\nAre you sure it's even installed?", 0, "Can't install myself", 0x10);
    } else if (shell.Popup("Should I copy myself to BetterDiscord's plugins folder for you?", 0, "Do you need some help?", 0x34) === 6) {
        fs.CopyFile(pathSelf, fs.BuildPath(pathPlugins, fs.GetFileName(pathSelf)), true);
        // Show the user where to put plugins in the future
        shell.Exec("explorer " + pathPlugins);
        shell.Popup("I'm installed!", 0, "Successfully installed", 0x40);
    }
    WScript.Quit();

@else@*/

module.exports = (() => {
    const config = {
        info: {
            name: "LinkChannels",
            authors: [
                {
                    name: "Strencher",
                    discord_id: "415849376598982656",
                    github_username: "Strencher",
                    twitter_username: "Strencher3"
                }
            ],
            version: "1.1.0",
            description: "Adds an Icon to channels that copies <#channelId>. Shift + Click to insert the channel in the textarea.",
            github: "https://github.com/Strencher/BetterDiscordStuff/blob/master/LinkChannels/LinkChannels.plugin.js",
            github_raw: "https://raw.githubusercontent.com/Strencher/BetterDiscordStuff/master/LinkChannels/LinkChannels.plugin.js"
        },
        changelog: [
            {
                title: "added",
                type: "added",
                items: [
                    "Added support for voice channels.",
                    "Added translations!"
                ]
            },
            {
                title: "fixed",
                type: "fixed",
                items: [
                    "Fixed the weird issue when several link icons appeared.",
                    "Channels should be properly updated after the first start."
                ]
            },
            {
                title: "Improved",
                type: "improved",
                items: [
                    "Improved the tooltips",
                ]
            }
        ],
        strings: {
            // rаd#0001
            en: {
                LINK_CHANNEL: "Link Channel",
                COPIED_LINK: "Copied the link for ${name}"
            },
            // SteffoSpieler#1868
            de: {
                LINK_CHANNEL: "Kanal verlinken",
                COPIED_LINK: "Link für ${name} kopiert"
            },
            // LemCent321#1663
            fr: {
                LINK_CHANNEL: "Lien du salon",
                COPIED_LINK: "Lien copié pour ${name}"
            },
            // Dominic#1111
            pt: {
                LINK_CHANNEL: "Link do Canal",
                COPIED_LINK: "Link copiado para ${name}"
            },
            // IMaWeeb#6931
            tr: {
                LINK_CHANNEL: "Kanalı etiketle",
                COPIED_LINK: "Bu kanal için etiketi kopyaladım: ${name}"
            },
            // MH#5893
            vi: {
                LINK_CHANNEL: "Đường dẫn kênh",
                COPIED_LINK: "Sao chép đường dẫn cho ${name}"
            }
        }
    };
    return !global.ZeresPluginLibrary ? class {
        constructor() { this._config = config; }
        getName() { return config.info.name; }
        getAuthor() { return config.info.authors.map(a => a.name).join(", "); }
        getDescription() { return config.info.description; }
        getVersion() { return config.info.version; }
        load() {
            BdApi.showConfirmationModal("Library plugin is needed", 
                [`The library plugin needed for ${config.info.name} is missing. Please click Download Now to install it.`], {
                    confirmText: "Download",
                    cancelText: "Cancel",
                    onConfirm: () => {
                        require("request").get("https://rauenzi.github.io/BDPluginLibrary/release/0PluginLibrary.plugin.js", async (error, response, body) => {
                            if (error) return require("electron").shell.openExternal("https://betterdiscord.net/ghdl?url=https://raw.githubusercontent.com/rauenzi/BDPluginLibrary/master/release/0PluginLibrary.plugin.js");
                            await new Promise(r => require("fs").writeFile(require("path").join(BdApi.Plugins.folder, "0PluginLibrary.plugin.js"), body, r));
                        });
                    }
                });
        }
        start() { }
        stop() { }
    } : (([Plugin, Api]) => {
        const plugin = (Plugin, Api) => {
            const {Components, DiscordModules: {React, UserSettingsStore}, WebpackModules, PluginUtilities, DiscordModules, Patcher, Utilities, Toasts} = Api;
            const {TooltipContainer} = WebpackModules.getByProps("TooltipContainer") ?? {};
            const {ComponentDispatch: ComponentDispatcher} = WebpackModules.getByProps("ComponentDispatch") ?? {};
            const insertText = (text) => ComponentDispatcher.dispatchToLastSubscribed("INSERT_TEXT", {content: text});
            const classes = Object(WebpackModules.getByProps("iconItem"));
            const joinClass = (...classNames) => classNames.filter(Boolean).join(" ");

            class Strings {
                static format(string, variables) {
                    return string.replace(/\$\{([^{}]+)\}/g, (_, e) => {
                        return variables[e];
                    });
                }

                static get(key, variables) {
                    const string = config.strings[UserSettingsStore.locale.split("-")[0]]?.[key] ?? config.strings["en"][key] ?? "String not found.";

                    return this.format(string, variables ?? {});
                }
            }

            class LinkIcon extends React.Component {
                render() {
                    const {onClick} = this.props;
                    
                    return React.createElement(TooltipContainer, {
                        text: Strings.get("LINK_CHANNEL"),
                        position: "top",
                        className: joinClass("linkChannels", classes.iconItem)
                    }, React.createElement("svg", {
                        className: classes.actionIcon,
                        width: "25",
                        height: "25",
                        viewBox: "0 0 25 25",
                        onClick: onClick,
                        children: React.createElement("path", {
                            d: "M10.59 13.41c.41.39.41 1.03 0 1.42-.39.39-1.03.39-1.42 0a5.003 5.003 0 0 1 0-7.07l3.54-3.54a5.003 5.003 0 0 1 7.07 0 5.003 5.003 0 0 1 0 7.07l-1.49 1.49c.01-.82-.12-1.64-.4-2.42l.47-.48a2.982 2.982 0 0 0 0-4.24 2.982 2.982 0 0 0-4.24 0l-3.53 3.53a2.982 2.982 0 0 0 0 4.24zm2.82-4.24c.39-.39 1.03-.39 1.42 0a5.003 5.003 0 0 1 0 7.07l-3.54 3.54a5.003 5.003 0 0 1-7.07 0 5.003 5.003 0 0 1 0-7.07l1.49-1.49c-.01.82.12 1.64.4 2.43l-.47.47a2.982 2.982 0 0 0 0 4.24 2.982 2.982 0 0 0 4.24 0l3.53-3.53a2.982 2.982 0 0 0 0-4.24.973.973 0 0 1 0-1.42z",
                            fill: "currentColor"
                        })
                    }));
                }
            }
            return class linkChannels extends Plugin {
                css = `
                .linkChannels {
                    display: none;
                }   
                .iconVisibility-1bOqu7:hover .linkChannels {
                    display: block;
                    cursor: pointer;
                }
                .linkChannels {
                    z-index: 999;
                }`;
                onStart() {
                    PluginUtilities.addStyle(config.info.name, this.css) 
                    Utilities.suppressErrors(this.patchChannelItem.bind(this), "ChannelItem patch")();
                }

                patchChannelItem() {
                    const ChannelItem = WebpackModules.getModule((m) => m?.default?.displayName === "ChannelItem");

                    if ("default" in ChannelItem) Patcher.after(ChannelItem, "default", (_, [props], ret) => {
                        if (!("channel" in props)) return ret;
                        const children = Utilities.getNestedProp(props, "children");
                        if (!Array.isArray(children)) return ret;
                        if (children.some((e) => e?.type === LinkIcon)) return ret;

                        children.unshift(
                            React.createElement(Components.ErrorBoundary, {
                                key: "link-icon-errorboundary",
                                errorChildren: React.createElement("svg", {
                                    width: 16,
                                    height: 16,
                                    viewBox: "0 0 20 20",
                                    children: React.createElement("path", {
                                        d: "M10 0C4.486 0 0 4.486 0 10C0 15.515 4.486 20 10 20C15.514 20 20 15.515 20 10C20 4.486 15.514 0 10 0ZM9 4H11V11H9V4ZM10 15.25C9.31 15.25 8.75 14.691 8.75 14C8.75 13.31 9.31 12.75 10 12.75C10.69 12.75 11.25 13.31 11.25 14C11.25 14.691 10.69 15.25 10 15.25Z",
                                        fillRule: "evenodd",
                                        clipRule: "evenodd",
                                        fill: "#ed4245"
                                    })
                                }),
                                children: React.createElement(LinkIcon, {
                                    key: "link-icon",
                                    onClick: (e) => {
                                        if (e.shiftKey) insertText("<#" + props.channel.id + ">")
                                        else {
                                            DiscordModules.ElectronModule.copy("<#" + props.channel.id + ">");
                                            Toasts.success(Strings.get("COPIED_LINK", {name: "#" + props.channel.name}));
                                        }
                                    }
                                })
                            })
                        );

                        return ret;
                    });

                    this.forceUpdate();
                }

                forceUpdate() {
                    const channels = document.getElementsByClassName(classes.containerDefault);

                    for (let i = 0; i < channels.length; i++) {
                        if (!channels[i]) continue;
                        if ("forceUpdate" in channels[i]) channels[i].forceUpdate();
                    }
                }

                onStop() {
                    PluginUtilities.removeStyle(config.info.name);
                    Patcher.unpatchAll();
                    this.forceUpdate();
                }

            }

        };
        return plugin(Plugin, Api);
    })(global.ZeresPluginLibrary.buildPlugin(config));
})();
/*@end@*/
