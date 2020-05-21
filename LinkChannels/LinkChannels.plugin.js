//META{"name":"LinkChannels","displayName":"LinkChannels", "invite": "gvA2ree", "authorId": "415849376598982656"}*//
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

var LinkChannels = (() => {
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
            version: "0.0.5",
            description: "Adds an Icon to channels that copys <#channelId>. (channelId is replaced) Shift + Click to insert the channel in the textarea.",
            github: "https://github.com/Strencher/BetterDiscordStuff/LinkChannels/LinkChannels.plugin.js",
            github_raw: "https://raw.githubusercontent.com/Strencher/BetterDiscordStuff/master/LinkChannels/LinkChannels.plugin.js"
        },
        changelog: [
            {
                title: "smol",
                type: "added",
                items: ["Added toasts when copying a channel tag."]
            },
            {
                title: "improvements",
                type: "improved",
                items: ["Some small fixes & the name of the channel is no longer cuttet off."]
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
            const { WebpackModules, PluginUtilities, DiscordModules, ReactComponents, Patcher, DiscordSelectors, Utilities, Toasts } = Api;
            const { React } = DiscordModules;
            const ToolTip = WebpackModules.getByDisplayName("Tooltip");
            const insertText = e => WebpackModules.getByProps("ComponentDispatch").ComponentDispatch.dispatchToLastSubscribed("INSERT_TEXT", {content: e})
            class linkIcon extends React.Component {
                render() {
                    return React.createElement(ToolTip, {
                        text: "Link Channel",
                        position: "top",
                        color: "black"
                    }, e => React.createElement("svg", {
                            className: "linkChannels icon-3Gkjwa",
                            width: "25",
                            height: "25",
                            viewBox: "0 0 25 25",
                            onMouseEnter: e.onMouseEnter, 
                            onMouseLeave: e.onMouseLeave,
                            onClick: this.props.onClick,
                            children: React.createElement("path", {
                                    fill: "#8e9297",
                                    d: "M10.59 13.41c.41.39.41 1.03 0 1.42-.39.39-1.03.39-1.42 0a5.003 5.003 0 0 1 0-7.07l3.54-3.54a5.003 5.003 0 0 1 7.07 0 5.003 5.003 0 0 1 0 7.07l-1.49 1.49c.01-.82-.12-1.64-.4-2.42l.47-.48a2.982 2.982 0 0 0 0-4.24 2.982 2.982 0 0 0-4.24 0l-3.53 3.53a2.982 2.982 0 0 0 0 4.24zm2.82-4.24c.39-.39 1.03-.39 1.42 0a5.003 5.003 0 0 1 0 7.07l-3.54 3.54a5.003 5.003 0 0 1-7.07 0 5.003 5.003 0 0 1 0-7.07l1.49-1.49c-.01.82.12 1.64.4 2.43l-.47.47a2.982 2.982 0 0 0 0 4.24 2.982 2.982 0 0 0 4.24 0l3.53-3.53a2.982 2.982 0 0 0 0-4.24.973.973 0 0 1 0-1.42z"
                            })
                        })
                    )
                }
            }
            return class linkChannels extends Plugin {
                constructor() {
                    super();
                }

                async onStart() {
                    const channel = await ReactComponents.getComponentByName("TextChannel", DiscordSelectors.ChannelList.containerDefault)
                    PluginUtilities.addStyle(config.info.name, 
                    `.linkChannels {
                        display: none;
                    }   
                    .containerDefault-1ZnADq:hover .linkChannels {
                        display: block;
                        cursor: pointer;
                    }`) 
                    this.unpatch = Patcher.after(channel.component.prototype, "render", ({props}, _, react) => {
                        const children = Utilities.getNestedProp(react, "props.children.props.children")
                        if(!children || !Array.isArray(children)) return;
                        if(!children.find(e=>e && e.props && e.props.displayName == "LinkChannels")) children.unshift(
                            React.createElement(linkIcon, {
                                displayName: "LinkChannels",
                                onClick: e => {
                                    if(e.shiftKey) insertText("<#"+props.channel.id+">")
                                    else {
                                        DiscordModules.ElectronModule.copy("<#"+props.channel.id+">");
                                         Toasts.success("Copied link for #"+props.channel.name)
                                    }
                                }
                            })
                        );
                    });
                }
                onStop() {
                    PluginUtilities.removeStyle(config.info.name);
                    this.unpatch()
                }

            }

        };
        return plugin(Plugin, Api);
    })(global.ZeresPluginLibrary.buildPlugin(config));
})();