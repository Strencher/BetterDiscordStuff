//META{"name":"BetterQuoter","displayName":"BetterQuoter"}*//
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
                title: "Fix",
                type: "fixed",
                items: [
                    "Fixed Styling issue with the new Discord Update."
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

            const { PluginUtilities, ReactTools, EmulatedTooltip, Settings, WebpackModules } = Api;
            const { SettingGroup } = Settings;
            const { ComponentActions: Actions } = WebpackModules.getByProps('ComponentActions');
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
                getSettingsPanel() {
                    this.loadSettings()
                    let form = document.createElement("form");
                    new SettingGroup("Custom Quotation", { shown: true }).appendTo(form)
                        .append(
                            $(`<textarea type="text" class="bq-input inputDefault-_djjkz input-cIJ7To da-inputDefault da-input textArea-1Lj-Ns da-textArea scrollbarDefault-3COgCQ scrollbar-3dvm_9 da-scrollbarDefault da-scrollbar" placeholder="" maxlength="512" rows="2" style="padding-right: 31.69px;"></textarea>`)[0]
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
                decom(name, msg, time, link) {
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
                addbutton(e) {
                    var a = e.querySelector(".wrapper-2aW0bm");
                    if (a) {
                        if (!a.querySelector(".Quote-btn")) {
                            a.insertAdjacentHTML("afterbegin", `<div tabindex="0" class="button-1ZiXG9 Quote-btn" aria-controls="popout_161" aria-expanded="false" role="button"><img src="https://image.flaticon.com/icons/svg/59/59149.svg" class="Quote-icon"></div>`);
                            new EmulatedTooltip(a.querySelector(".Quote-btn"), document.documentElement.lang == "de" ? "Zitieren" : "Quote", { side: 'top' });
                            a.querySelector(".Quote-btn").addEventListener("click", (f) => {
                                let props = ReactTools.getOwnerInstance(f.target.parentElement.parentElement.parentElement.parentElement.parentElement.querySelector(".container-1ov-mD"));
                                let name = props.props.message.author.username;
                                let msg = props.props.message.content;
                                let timeStamp = props.props.message.timestamp._d.toString().split(" ");
                                let time = `${timeStamp[2]} ${timeStamp[1]} ${timeStamp[3]}, ${timeStamp[4]}`;
                                let msgLink = location.href + "/" + props.props.message.id;
                                Dispatcher.dispatchToLastSubscribed(Actions.INSERT_TEXT, { content: this.decom(name, msg, time, msgLink) });
                            });
                        }
                    }
                };
                onStart() {
                    this.observer = new MutationObserver(changes => {
                        for (let a = 0; a < changes.length; a++) {
                            changes[a].addedNodes.forEach(e => {
                                if (e != undefined && e.classList && e.classList.contains("buttonContainer-DHceWr")) {
                                    if (e != undefined) {
                                        this.addbutton(e)
                                    }
                                }
                            })
                        }
                    });
                    this.observer.observe(document.body, {
                        childList: true,
                        subtree: true
                    });
                    this.style = `
                    .Quote-icon {
                        width: 20px;
                        height: 20px;
                        filter: invert(97%);
                        opacity: 0.8;
                    }
                    .Quote-btn:hover > .Quote-icon {
                        opacity: 1;
                    }
                    .bq-input {
                       height: 140px;
                    }`
                    PluginUtilities.addStyle("BetterQuoter", this.style);
                }
                onStop() {
                    this.observer.disconnect()
                    document.querySelectorAll(".Quote-btn").forEach(element => {
                        element.parentElement.remove();
                    });
                    PluginUtilities.removeStyle("BetterQuoter");
                }
                onUnload() {
                    this.onStop();
                }

            }

        };
        return plugin(Plugin, Api);
    })(global.ZeresPluginLibrary.buildPlugin(config));
})();
