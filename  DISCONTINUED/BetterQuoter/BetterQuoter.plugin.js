//META{"name":"BetterQuoter","displayName":"BetterQuoter", "invite": "gvA2ree", "authorId": "415849376598982656"}*//
/*@cc_on
@if (@_jscript)
	
	// Offer to self-install for clueless users that try to run this directly.
	var shell = WScript.CreateObject("WScript.Shell");
	var fs = new ActiveXObject("Scripting.FileSystemObject");
	var pathPlugins = shell.ExpandEnvironmentStrings("%APPDATA%\\BetterDiscord\\plugins");
	var pathSelf = WScript.ScriptFullName;
	// Put the user at ease by addressing them in the first person
	shell.Popup("It looks like you've mistakenly tried to run me directly. \\n(Don't do that!)", 0, "I'm a plugin for BetterDiscord", 0x30);
	if (fs.GetParentFolderName(pathSelf) === fs.GetAbsolutePathName(pathPlugins)) {
		shell.Popup("I'm in the correct folder already.", 0, "I'm already installed", 0x40);
	} else if (!fs.FolderExists(pathPlugins)) {
		shell.Popup("I can't find the BetterDiscord plugins folder.\\nAre you sure it's even installed?", 0, "Can't install myself", 0x10);
	} else if (shell.Popup("Should I copy myself to BetterDiscord's plugins folder for you?", 0, "Do you need some help?", 0x34) === 6) {
		fs.CopyFile(pathSelf, fs.BuildPath(pathPlugins, fs.GetFileName(pathSelf)), true);
		// Show the user where to put plugins in the future
		shell.Exec("explorer " + pathPlugins);
		shell.Popup("I'm installed!", 0, "Successfully installed", 0x40);
	}
	WScript.Quit();

@else@*/

var BetterQuoter = (() => {
    const config = {
        info: {
            name: "BetterQuoter",
            authors: [
                {
                    name: "Strencher",
                    discord_id: "415849376598982656",
                    github_username: "Strencher",
                    twitter_username: "Strencher3"
                }
            ],
            version: "0.0.3",
            description: "A cool Quoter to Citate users.",
            github: "https://github.com/Strencher/BetterDiscordStuff/BetterQuoter.plugin.js",
            github_raw: "https://raw.githubusercontent.com/Strencher/BetterDiscordStuff/master/BetterQuoter/BetterQuoter.plugin.js"
        },
        changelog: [
            {
                title: "What\'s new?",
                type: "added",
                items: [
                    "Rewrite in React & now Patches also the Discord Quote function."
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

            const { PluginUtilities, DiscordModules, ReactTools, EmulatedTooltip, Settings, WebpackModules, Patcher } = Api;
            const { SettingGroup } = Settings;
            const { React } = DiscordModules;
            const Tooltip = WebpackModules.getByDisplayName("Tooltip");
            const { ComponentDispatch: Dispatcher } = WebpackModules.getByProps('ComponentDispatch');
            return class BetterQuoter extends Plugin {
                constructor() {
                    super();
                }
                get defaultSettings() {
                    return {
                        replacem: "%name%\n%codeblock%fix\n%msg%\n%codeblock%\n",
                        lastestUsedVersion: "0.0.0"
                    }
                };
                saveSettings() {
                    PluginUtilities.saveSettings("BetterQuoter", this.settings);
                };
                loadSettings() {
                    this.settings = PluginUtilities.loadSettings("BetterQuoter", this.defaultSettings);
                };
                onLoad() {
                    this.loadSettings()
                }
                getSettingsPanel() {
                    this.loadSettings()
                    let form = document.createElement("form");
                    new SettingGroup("Custom Quotation", { shown: true }).appendTo(form)
                        .append(
                            $(`<textarea style="height: 140px;" type="text" class="bq-input inputDefault-_djjkz input-cIJ7To da-inputDefault da-input textArea-1Lj-Ns da-textArea scrollbarDefault-3COgCQ scrollbar-3dvm_9 da-scrollbarDefault da-scrollbar" placeholder="" maxlength="512" rows="2" style="padding-right: 31.69px;"></textarea>`)[0]
                        )
                    setTimeout(() => {
                        let input = document.querySelector(".bq-input");
                        input.value = this.settings.replacem;
                        input.addEventListener("change", (e) => {
                            this.settings.replacem = e.target.value;
                            this.saveSettings()
                        })
                    }, 600);

                    new SettingGroup("Custom Variables", { shown: false }).appendTo(form)
                        .append($(`<div><strong>%name%</strong><div>Will replace the name</div>\n\n<strong>%msg%</strong><div>Will replace the message</div>\n<strong>%codeblock%</strong><div>Will build a CodeBlock</div>\n<strong>%bold%</strong><div>Makes the message Bold</div>\n<strong>%italic%</strong><div>Makes the message Italic</div>\n<strong>%underline%</strong><div>Underlines the message</div>\n<strong>%code%</strong><div>Makes the message look like code</div>\n<strong>%quote%</strong><div>Makes the message look like QuoteBlock</div>\n<strong>%bold%</strong><div>Makes the message Bold</div>\n<strong>%italic%</strong><div>Makes the message Italic</div>\n<strong>%underline%</strong><div>Underlines the message</div>\n<strong>%code%</strong><div>Makes the message look like code</div>\n<strong>%timestamp%</strong><div>Adds a timestamp from message to Quotation.</div>\n<strong>%msg-link%</strong><div>Adds the MessageLink from the message that you Quoted.</div></div>`)[0])
                    return form;
                };
                parseMessage(name, msg, time, link) {
                    this.loadSettings()
                    var b = this.settings.replacem;
                    var a = b.replace(/%codeblock%/g, `${'```'}`)
                        .replace(/%msg%/g, msg)
                        .replace(/%name%/g, name)
                        .replace(/%timestamp%/g, time)
                        .replace(/%bold%/g, `${'**'}`)
                        .replace(/%italic%/g, `${'*'}`)
                        .replace(/%code%/g, `${'`'}`)
                        .replace(/%underline%/g, `${'__'}`)
                        .replace(/%quote%/g, `${'> '}`)
                        .replace(/%msg-link%/g, link);
                    return a;
                }
                patchMessageToolBar() {
                    Patcher.after(WebpackModules.getByIndex(WebpackModules.getIndex(e => e.default && e.default.displayName === 'MiniPopover')), "default", (_, args, react) => {
                        const _this = args[0]['children'][args[0].children.length-1]['props'];
                        const timeStamp = _this.message.timestamp._d.toString().split(" ");
                        const time = `${timeStamp[2]} ${timeStamp[1]} ${timeStamp[3]}, ${timeStamp[4]}`;
                        const msgLink = location.href + "/" + _this.message.id;
                        react.props.children.unshift(
                            React.createElement(Tooltip, {
                                text: document.documentElement.lang == "de" ? "Zitieren" : "Quote",
                                position: "top",
                                color: "black",
                            }, e => React.createElement("div", {
                                    onMouseEnter: e.onMouseEnter, 
                                    onMouseLeave: e.onMouseLeave,
                                    className: "button-1ZiXG9",
                                    onClick: () => {
                                        Dispatcher.dispatchToLastSubscribed("INSERT_TEXT", {content: this.parseMessage(_this.message.author.username, _this.message.content, time, msgLink)+"\n"})
                                    }, 
                                        children: React.createElement("svg", {
                                        className: "icon-3Gkjwa",
                                        width: "26",
                                        height: "26",
                                        children: React.createElement("path", {
                                            fill: "currentColor",
                                            d: "M19.8401 5.39392C20.1229 4.73405 19.6389 4 18.921 4H17.1231C16.7417 4 16.3935 4.21695 16.2254 4.55933L13.3297 10.4581C13.195 10.7324 13.125 11.0339 13.125 11.3394V19C13.125 19.5523 13.5727 20 14.125 20H20C20.5523 20 21 19.5523 21 19V12.875C21 12.3227 20.5523 11.875 20 11.875H17.8208C17.4618 11.875 17.2198 11.508 17.3612 11.178L19.8401 5.39392ZM9.71511 5.39392C9.99791 4.73405 9.51388 4 8.79596 4H6.99809C6.61669 4 6.2685 4.21695 6.10042 4.55933L3.20466 10.4581C3.07001 10.7324 3 11.0339 3 11.3394V19C3 19.5523 3.44772 20 4 20H9.875C10.4273 20 10.875 19.5523 10.875 19V12.875C10.875 12.3227 10.4273 11.875 9.875 11.875H7.69577C7.33681 11.875 7.0948 11.508 7.2362 11.178L9.71511 5.39392Z"
                                        })
                                    })
                                })
                            )
                        )
                    })
                }
                patchQuoteFunction() {
                    Patcher.instead(WebpackModules.getByProps("createQuotedText"), "createQuotedText", (_, props) => {
                        const message = props[0];
                        const timeStamp = message.timestamp._d.toString().split(" ");
                        const time = `${timeStamp[2]} ${timeStamp[1]} ${timeStamp[3]}, ${timeStamp[4]}`;
                        const msgLink = location.href + "/" + message.id;
                        return this.parseMessage(message.author.username, message.content, time, msgLink)+"\n";
                    })
                }
                onStart() {
                    this.patchMessageToolBar();
                    this.patchQuoteFunction();
                }
                onStop() {
                    Patcher.unpatchAll();
                }

            }

        };
        return plugin(Plugin, Api);
    })(global.ZeresPluginLibrary.buildPlugin(config));
})();
