/**
* @name QuickMuteChannels
* @displayName QuickMuteChannels
* @authorId 415849376598982656
* @invite gvA2ree
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
            name: "QuickMuteChannels",
            authors: [
                {
                    name: "Strencher",
                    discord_id: "415849376598982656",
                    github_username: "Strencher",
                    twitter_username: "Strencher3"
                }
            ],
            version: "1.0.3",
            description: "Adds an Speaker to channels to Quickly mute/unmute them.",
            github: "https://github.com/Strencher/BetterDiscordStuff/blob/master/QuickMuteChannels/QuickMuteChannels.plugin.js",
            github_raw: "https://raw.githubusercontent.com/Strencher/BetterDiscordStuff/master/QuickMuteChannels/QuickMuteChannels.plugin.js"
        },
        changelog: [
            {
                title: 'fixed',
                type: 'fixed',
                items: [
                    'Fixed the last update of discord. take 4.'
                ]
            }
        ]
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

            const {DiscordModules: {React}, WebpackModules, Toasts, Utilities, PluginUtilities, DiscordModules, Patcher} = Api;
            const MuteChannelModule = WebpackModules.getByProps("updateChannelOverrideSettings");
            const ToolTip = WebpackModules.getByDisplayName("Tooltip");
            const classes = Object(WebpackModules.getByProps("iconItem"));
            const joinClass = (...classNames) => classNames.filter(Boolean).join(" ");
            class MuteIcon extends React.Component {
                render() {
                    return React.createElement(ToolTip, {
                        text: this.props.muted ? "Unmute": "Mute",
                        position: "top",
                        color: "black"
                    }, _props => React.createElement("div", {
                        className: joinClass("muteChannelIcon", classes.iconItem),
                    }, React.createElement("svg", {
                        ..._props,
                        width: "25",
                        height: "25",
                        viewBox: "0 0 25 25",
                        className: classes.actionIcon,
                        "aria-hidden": false,
                        onClick: this.props.onClick,
                        children: React.createElement("path", {
                           d: "M11.383 3.07904C11.009 2.92504 10.579 3.01004 10.293 3.29604L6 8.00204H3C2.45 8.00204 2 8.45304 2 9.00204V15.002C2 15.552 2.45 16.002 3 16.002H6L10.293 20.71C10.579 20.996 11.009 21.082 11.383 20.927C11.757 20.772 12 20.407 12 20.002V4.00204C12 3.59904 11.757 3.23204 11.383 3.07904ZM14 5.00195V7.00195C16.757 7.00195 19 9.24595 19 12.002C19 14.759 16.757 17.002 14 17.002V19.002C17.86 19.002 21 15.863 21 12.002C21 8.14295 17.86 5.00195 14 5.00195ZM14 9.00195C15.654 9.00195 17 10.349 17 12.002C17 13.657 15.654 15.002 14 15.002V13.002C14.551 13.002 15 12.553 15 12.002C15 11.451 14.551 11.002 14 11.002V9.00195Z",
                           fill: this.props.muted ? "#f04747" : "currentColor",
                        })
                    })))
                }
            }
            return class QuickMuteChannels extends Plugin {
                constructor() {
                    super();
                }

                css = `
                .muteChannelIcon {
                    display: none;
                    cursor: pointer;
                } 
                .iconVisibility-1bOqu7:hover .muteChannelIcon {
                    display: block;
                    cursor: pointer;
                }
                .muteChannelIcon {
                    z-index: 999999;
                }`;

                onStart() {
                    PluginUtilities.addStyle(config.info.name, this.css);
                    Utilities.suppressErrors(this.patchChannelItem.bind(this), "ChannelItem Patch")();
                }

                patchChannelItem() {
                    const ChannelItem = WebpackModules.getModule(m => Object(m.default).displayName === "ChannelItem");
                    if("default" in ChannelItem) Patcher.after(ChannelItem, "default", (_, [props], ret) => {
                        if(!("channel" in props)) return ret;
                        if(props.channel.type === DiscordModules.DiscordConstants.ChannelTypes.GUILD_VOICE) return ret;
                        const children = Utilities.getNestedProp(props, "children");
                        if(!Array.isArray(children)) return ret;
                        if(children.find(e => e && e.type === MuteIcon)) return ret;
                        children.unshift(React.createElement(MuteIcon, {
                            muted: props.muted,
                            onClick: () => {
                                MuteChannelModule.updateChannelOverrideSettings(props.channel.guild_id, props.channel.id, {
                                    muted: !props.muted
                                });
                                Toasts.success(`${props.muted ? "Unmuted" : "Muted"} #${props.channel.name}`);
                            }
                        }));
                        return ret;
                    });
                }

                onStop() {
                    Patcher.unpatchAll()
                    PluginUtilities.removeStyle(config.info.name)
                }

            }

        };
        return plugin(Plugin, Api);
    })(global.ZeresPluginLibrary.buildPlugin(config));
})();
/*@end@*/
