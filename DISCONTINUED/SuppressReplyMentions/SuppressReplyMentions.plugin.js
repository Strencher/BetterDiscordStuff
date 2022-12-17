/**
* @name SuppressReplyMentions
* @displayName SuppressReplyMentions
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
            name: "SuppressReplyMentions",
            authors: [
                {
                    name: "Strencher",
                    discord_id: "415849376598982656",
                    github_username: "Strencher",
                    twitter_username: "Strencher3"
                }
            ],
            version: "0.0.4",
            description: "Suppresses mentions from Replied messages and when replying to someone else.",
            github: "https://github.com/Strencher/BetterDiscordStuff/blob/master/SuppressReplyMentions/SuppressReplyMentions.plugin.js",
            github_raw: "https://raw.githubusercontent.com/Strencher/BetterDiscordStuff/master/SuppressReplyMentions/SuppressReplyMentions.plugin.js"
        },
        changelog: [
            {
                title: "New Features",
                type: "added",
                items: ["Added option to change the appearance of the Replies", "Added option to allow manual Pings"]
            }
        ],
        defaultConfig: [
            {
                type: "switch",
                id: "autoDisableMention",
                name: "Disable Mention",
                note: "Automatically disables the 'Mention' option when replying to someone else.",
                value: true
            },
            {
                type: "dropdown",
                id: "mentionSettings",
                name: "Mention Settings for Replies",
                value: 1,
                options: [
                    { label: "Default", value: 0 },
                    { label: "Suppress Mentions", value: 1 },
                    { label: "Force Mentions", value: 2 },
                ]
            },
            {
                type: "switch",
                id: "allowManualPing",
                name: "Allow Manual Ping",
                note: "Allow manual pings to mention even if they are in replies.",
                value: false
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

            const {PluginUtilities, Utilities, WebpackModules, DiscordModules, Patcher, DiscordModules: {React}} = Api;
            const suppressed = [];
            const UserUtils = WebpackModules.getByProps("getCurrentUser");
            const Tooltip = WebpackModules.getByDisplayName("Tooltip");

            return class SuppressReplyMentions extends Plugin {
                constructor() {
                    super();
                }

                onStart() {
                    PluginUtilities.addStyle(config.info.name, this.css);
                    this.patchMessageCreate();
                    this.patchRepliedMessage();
                    this.patchCreateReply();
                }

                css = `
                    .suppressedMention {color: var(--text-muted);}
                `;

                patchMessageCreate() {
                    Patcher.before(DiscordModules.Dispatcher, "_dispatch", (_, [{message, type}]) => {
                        if (type != "MESSAGE_CREATE") return;
                        const currentUser = UserUtils.getCurrentUser();
                        if (!currentUser || !Array.isArray(message.mentions) || !message.referenced_message) return;

                        if(this.settings.allowManualPing) {
                            const manualPing = "<@" + currentUser.id + ">";
                            if(message.content.includes(manualPing)) return;
                        }

                        const mentionIndex = message.mentions.findIndex(e => e.id === currentUser.id);

                        if (this.settings.mentionSettings == 1) {
                            if (message.referenced_message.author.id === currentUser.id && mentionIndex > -1) {
                                message.mentions.splice(mentionIndex, 1);
                                suppressed.push(message.id);
                            }

                        } else if (this.settings.mentionSettings == 2) {
                            if (message.referenced_message.author.id === currentUser.id && mentionIndex === -1) {
                                message.mentions.push(currentUser);
                            }
                        }
                    });
                }

                /* Full Credits go to somebody#001 for this idea. */
                patchCreateReply() {
                    Patcher.before(WebpackModules.getByProps("createPendingReply"), "createPendingReply", (_, [args]) => {
                        if (!this.settings.autoDisableMention) return;
                        args.shouldMention = false;
                    });
                }

                patchRepliedMessage() {
                    Patcher.after(ZLibrary.WebpackModules.getModule(m => m && m.default && m.default.displayName == "RepliedMessage"), "default", (_, [args], returnValue) => {
                        if (!args || !args.baseMessage || suppressed.indexOf(args.baseMessage.id) < 0) return;

                        const message = Utilities.findInReactTree(returnValue, e => e && e.props && e.props.compact != undefined);
                        if (!message) return;

                        const unpatch = Patcher.after(message, "type", (_, __, returnValue) => {
                            unpatch();
                            if (!returnValue || !returnValue.props || !Array.isArray(returnValue.props.children)) return;

                            returnValue.props.children.unshift(React.createElement(Tooltip, {
                                text: "Mention Suppressed",
                                position: "top"
                            }, props => React.createElement("span", Object.assign(props, {
                                className: "suppressedMention"
                            }), "@")));
                        })
                    });
                }
                
                onStop() {
                    PluginUtilities.removeStyle(config.info.name);
                    Patcher.unpatchAll();
                }

                getSettingsPanel() {
                    return this.buildSettingsPanel().getElement();
                }

            }

        };
        return plugin(Plugin, Api);
    })(global.ZeresPluginLibrary.buildPlugin(config));
})();
/*@end@*/
