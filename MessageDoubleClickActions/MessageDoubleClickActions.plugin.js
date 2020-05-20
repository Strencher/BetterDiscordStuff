/**
* @name MessageDoubleClickActions
* @displayName MessageDoubleClickActions
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

const MessageDoubleClickActions = (() => {
    const config = {
        info: {
            name: "MessageDoubleClickActions",
            authors: [
                {
                    name: "Strencher",
                    discord_id: "415849376598982656",
                    github_username: "Strencher",
                    twitter_username: "Strencher3"
                }
            ],
            version: "0.0.3",
            description: "Adds an Action by Double Clicking a message.",
            github: "https://github.com/Strencher/BetterDiscordStuff/MessageDoubleClickActions/MessageDoubleClickActions.plugin.js",
            github_raw: "https://raw.githubusercontent.com/Strencher/BetterDiscordStuff/master/MessageDoubleClickActions/MessageDoubleClickActions.plugin.js"
        },
        changelog: [
            {
                type: "added",
                title: "New Stuff",
                items: [
                    "Added Add Reaction to messag, only works with unicodeemojis",
                    "Added Multiple actions when you double click",
                    "Some functions may not work together, look into the settingspanel for more infos.",
                ]
            },
            {
                type: "fixed",
                title: "fixed",
                items: [
                    "fixed throwing errors when dbl clicking messages."
                ]
            }
        ],
        defaultConfig: [
            {
                type: "switch",
                name: "Edit Message",
                value: true,
                id: "edit",
                note: "It does not work when you have Delete Message enabled!"
            },
            {
                type: "switch",
                name: "Delete Message",
                value: true,
                id: "delete",
                note: "It does not work when you have Edit Message, Add Reaction or Copy MessageLink enabled!"
            },
            {
                type: "switch",
                name: "Copy Message Content",
                value: true,
                id: "copy_content"
            },
            {
                type: "switch",
                name: "Copy MessageLink",
                value: true,
                id: "copy_link",
                note: "It does not work when you have Delete Message enabled!"
            },
            {
                type: "switch",
                name: "Add Reaction to Message",
                value: true,
                id: "add_reaction",
                note: "It does not work when you have DeleteMessage enabled!"
            },
            {
                type: "textbox",
                value: "🔴",
                name: "Reaction",
                placeholder: "Reaction UNICode",
                id: "reaction",
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
                        await new Promise(r => require("fs").writeFile(require("path").join(ContentManager.pluginsFolder, "0PluginLibrary.plugin.js"), body, r));
                        });
                    }
                });
        }
        start() { }
        stop() { }
    } : (([Plugin, Api]) => {
        const plugin = (Plugin, Api) => {

            const { WebpackModules, ReactTools, DiscordAPI, DiscordModules, Toasts } = Api, { ElectronModule } = DiscordModules;
            return class MessageDoubleClickActions extends Plugin {
                constructor() {
                    super();
                }
                onStart() {
                    document.addEventListener("dblclick", this.event = e => {
                        if(e.target && e.target.className  && typeof e.target.className == "string" && e.target.className.indexOf("markup-2BOw-j") !== -1) {
                            const { props } = ReactTools.getOwnerInstance(e.target.parentElement.parentElement.querySelector('.container-1ov-mD'));
                            if(props && this.settings.edit && !this.settings.delete && props.message.author.id == DiscordAPI.currentUser.id) {
                                WebpackModules.getByProps("startEditMessage").startEditMessage(props.message.channel_id, props.message.id, props.message.content)
                            };
                            if(props && this.settings.delete && !this.settings.edit && !this.settings.copy_link && !this.settings.add_reaction) {
                                WebpackModules.getByProps("deleteMessage").deleteMessage(props.message.channel_id, props.message.id);
                            };
                            if(props && this.settings.copy_link && !this.settings.delete) {
                                ElectronModule.copy(`https://discordapp.com/channels/${props.channel.guild_id}/${props.channel.id}/${props.message.id}`);
                                Toasts.success("Copied Message Link");
                            };
                            if(props && this.settings.copy_content) {
                                ElectronModule.copy(props.message.content);
                                Toasts.success("Copied Message Content");
                            };
                            if(props && this.settings.add_reaction && !this.settings.delete) {
                                WebpackModules.getByProps("addReaction").addReaction(props.message.channel_id, props.message.id, {name: this.settings.reaction})
                            }
                        }
                    })
                }
                onStop() {
                    document.removeEventListener("dblclick", this.event);
                }
                getSettingsPanel() {
                    return this.buildSettingsPanel().getElement();
                }

            }

        };
        return plugin(Plugin, Api);
    })(global.ZeresPluginLibrary.buildPlugin(config));
})();