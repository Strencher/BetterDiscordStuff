/**
 * @name SuppressUserMentionsRedux
 * @displayName SuppressUserMentionsRedux
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

var SuppressUserMentionsRedux = (() => {
    const config = {
        info: {
            name: "SuppressUserMentionsRedux",
            authors: [
                {
                    name: "Strencher",
                    discord_id: "415849376598982656",
                    github_username: "Strencher",
                    twitter_username: "Strencher3"
                }
            ],
            version: "0.0.1",
            description: "Suppress mentions from users",
            github: "https://github.com/Strencher/BetterDiscordStuff/SuppressUserMentionsRedux/SuppressUserMentionsRedux.plugin.js",
            github_raw: "https://raw.githubusercontent.com/Strencher/BetterDiscordStuff/master/SuppressUserMentionsRedux/SuppressUserMentionsRedux.plugin.js"
        },
        changelog: [
            {
                title: "Yeah",
                type: "added",
                items: ["The plugin exist"]
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
            const title = "Library Missing";
            const ModalStack = BdApi.findModuleByProps("push", "update", "pop", "popWithKey");
            const TextElement = BdApi.findModuleByProps("Sizes", "Weights");
            const ConfirmationModal = BdApi.findModule(m => m.defaultProps && m.key && m.key() == "confirm-modal");
            if (!ModalStack || !ConfirmationModal || !TextElement) return BdApi.alert(title, `The library plugin needed for ${config.info.name} is missing.<br /><br /> <a href="https://betterdiscord.net/ghdl?url=https://raw.githubusercontent.com/rauenzi/BDPluginLibrary/master/release/0PluginLibrary.plugin.js" target="_blank">Click here to download the library!</a>`);
            ModalStack.push(function (props) {
                return BdApi.React.createElement(ConfirmationModal, Object.assign({
                    header: title,
                    children: [BdApi.React.createElement(TextElement, { color: TextElement.Colors.PRIMARY, children: [`The library plugin needed for ${config.info.name} is missing. Please click Download Now to install it.`] })],
                    red: false,
                    confirmText: "Download Now",
                    cancelText: "Cancel",
                    onConfirm: () => {
                        require("request").get("https://rauenzi.github.io/BDPluginLibrary/release/0PluginLibrary.plugin.js", async (error, response, body) => {
                            if (error) return require("electron").shell.openExternal("https://betterdiscord.net/ghdl?url=https://raw.githubusercontent.com/rauenzi/BDPluginLibrary/master/release/0PluginLibrary.plugin.js");
                            await new Promise(r => require("fs").writeFile(require("path").join(ContentManager.pluginsFolder, "0PluginLibrary.plugin.js"), body, r));
                        });
                    }
                }, props));
            });
        }
        start() { }
        stop() { }
    } : (([Plugin, Api]) => {
        const plugin = (Plugin, Api) => {

            const { WebpackModules, PluginUtilities, DiscordModules, Patcher, DiscordAPI } = Api, { React } = DiscordModules;
            return class SuppressUserMentionsRedux extends Plugin {
                constructor() {
                    super();
                }
                get defaultSettings() {
                    return {
                        users: [ ]
                    }
                }
                loadSettings() {
                    this.settings = PluginUtilities.loadSettings('SuppressUserMentionsRedux', this.defaultSettings)
                }
                saveSettings() {
                    PluginUtilities.saveSettings('SuppressUserMentionsRedux', this.settings)
                }
                patchMessages() {
                    WebpackModules.getByProps("dispatch")._orderedActionHandlers.MESSAGE_CREATE.unshift({
                        actionHandler: ({message})=> {
                            if(Array.isArray(message.mentions)) message.mentions.forEach((e,index)=> {
                                if(e.id == DiscordAPI.currentUser.id && this.settings.users.find(f => f == message.author.id)) {
                                    message.mentions.splice(index, 1)
                                }
                            })
                        },
                        storeDidChange: () => false,
                        __Patch: {by: 'SuppressUserMentionsRedux'} 
                    })
                }
                patchContextMenu() {
                    Patcher.after(WebpackModules.getByIndex(WebpackModules.getIndex(e => e.default && e.default.toString().search(/case \w.ContextMenuTypes.USER_CHANNEL_MESSAGE/) !== -1)), "default", (_, [props], ret)=> {
                        if(!ret.props.children.props.children.props.children) return;
                        if(this.settings.users.find(g=> g == props.user.id)) {
                            ret.props.children.props.children.props.children.unshift(
                                React.createElement(DiscordModules.ContextMenuItem, {
                                    action: () => {
                                        this.settings.users.find((g, index) => {
                                            if(g == props.user.id) {
                                                this.settings.users.splice(index, 1);
                                                this.saveSettings();
                                                DiscordModules.ContextMenuActions.closeContextMenu();
                                            }
                                        })
                                    }, 
                                    label: "UnSuppress User Mention", 
                                    danger: true
                                })
                            )
                        } else {
                            ret.props.children.props.children.props.children.unshift(
                                React.createElement(DiscordModules.ContextMenuItem, {
                                    action: () => {
                                        this.settings.users.find(g => {
                                            if(!(g == props.user.id)) {
                                                this.settings.users.push(props.user.id);
                                                this.saveSettings();
                                                DiscordModules.ContextMenuActions.closeContextMenu();
                                            }
                                        })
                                    }, 
                                    label: "Suppress User Mention", 
                                    danger: false
                                })
                            )
                        }
                    })
                }
                onStart() { 
                    this.loadSettings()
                    this.patchMessages()
                    this.patchContextMenu()
                }
                onStop() {
                    Patcher.unpatchAll()
                    WebpackModules.getByProps("dispatch")._orderedActionHandlers.MESSAGE_CREATE.forEach((e, index, _this)=> {
                        if(e && e['__Patch']) {
                            _this.splice(index, 1);
                        }
                    })
                }

            }

        };
        return plugin(Plugin, Api);
    })(global.ZeresPluginLibrary.buildPlugin(config));
})();
