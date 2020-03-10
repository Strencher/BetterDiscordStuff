//META{"name":"AutoCorrectV2","displayName":"AutoCorrectV2", "invite": "gvA2ree"}*//
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

var AutoCorrectV2 = (() => {
    const config = {
        info: {
            name: "AutoCorrectV2",
            authors: [
                {
                    name: "Strencher",
                    discord_id: "415849376598982656",
                    github_username: "Strencher",
                    twitter_username: "Strencher3"
                },
                {
                    name: "l0c4lh057", 
                    github_username: "l0c4lh057", 
                    twitter_username: "l0c4lh057", 
                    discord_id: "226677096091484160"
                },

            ],
            version: "0.0.1",
            description: "Corrects your message when you send it.",
            github: "https://github.com/Strencher/BetterDiscordStuff/AutoCorrectV2/AutoCorrectV2.plugin.js",
            github_raw: "https://raw.githubusercontent.com/Strencher/BetterDiscordStuff/master/AutoCorrectV2/AutoCorrectV2.plugin.js"
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
            const log = e => {console.log(`%c[AutoCorrectV2]%c ${e}`, "color: #1ad;", "")}
            const { PluginUtilities, DiscordModules, Patcher, Settings } = Api;
            return class AutoCorrectV2 extends Plugin {
                constructor() {
                    super();
                }

                onStart() {
                    this.loadSettings()
                    Patcher.after(DiscordModules.MessageActions, "sendMessage", (_, [, message]) => {
                        message.content = this.createMessage(message.content);
                    })
                }
                get defaultSettings() {
                    return {
                        punctuate: true,
                        capitalize: true,
                        words: {
                            idk: "i dont know",
                            wdym: "what do you mean"
                        }
                    }
                }
                onStop() {
                    Patcher.unpatchAll()
                }
                get name() {return "AutoCorrectV2"}
                loadSettings() {
                    this.settings = PluginUtilities.loadSettings(this.name, this.defaultSettings)
                }
                saveSettings() {
                    PluginUtilities.saveSettings("AutoCorrectV2", this.settings)
                }
                createMessage(e) {
                    this.loadSettings()
                    var msg = e;
                    Object.entries(this.settings.words).forEach(([key, value])=> {
                        msg = msg.replace(new RegExp(key, "gi"), value);
                    })
                    if(this.settings.capitalize && !(msg.startsWith("http"))) msg = msg[0].toUpperCase() + msg.substring(1);
                    if(this.settings.punctuate && !(msg.startsWith("http") || msg.endsWith(":") || msg.endsWith(".") || msg.endsWith("!") || msg.endsWith("?"))) msg += ".";
                    return msg;
                }
                getSettingsPanel() {
                    this.loadSettings()
                    let pn = document.createElement("form");
                    pn.style.width = "100%"
                    pn.style.height = "100%";
                    new Settings.SettingGroup("General Settings", {shown: true}).appendTo(pn)
                    .append(
                        new Settings.Switch("Automatically punctuate", "Automatically punctuate\'s at the end of the message.", this.settings.punctuate, e => {
                            this.settings.punctuate = e;
                            log("Punctuate: "+e)
                            this.saveSettings()
                        })
                    )
                    .append(
                        new Settings.Switch("Automatically Capitalize", "Capitalize the first letter of every sentence", this.settings.capitalize, e => {
                            this.settings.capitalize = e;
                            log("Capitalize: "+e)
                            this.saveSettings()
                        })
                    );
                    let grp = new Settings.SettingGroup("Replacements", {shown: false}).appendTo(pn)
                    const addWordSetting = ([key, value])=>{
                        let btn = document.createElement("button");
                        btn.className = "colorRed-1TFJan button-38aScr lookFilled-1Gx00P colorBrand-3pXr91 sizeMedium-1AC_Sl grow-q77ONN"
                        btn.innerText = "Remove Word";
                        btn.addEventListener("click", e => {
                            e.preventDefault();
                            delete this.settings.words[key];
                            this.saveSettings();
                            BdApi.showToast("Removed word", {type: "success"})
                        })
                        new Settings.SettingGroup("Word", {shown:false}).appendTo(grp)
                        .append(
                            new Settings.Textbox("Word to Replace", "", key, newKey => {
                                if(typeof this.settings.words[newKey] === "string") return;
                                this.settings.words[newKey] = value;
                                delete this.settings.words[key];
                                key = newKey;
                                this.saveSettings()
                                log(`Set: ${key}`)
                            })
                        )
                        .append(
                            new Settings.Textbox("Word that will replaced", "", value, newValue => {
                                this.settings.words[key] = newValue;
                                value = newValue;
                                this.saveSettings();
                                log(`Set: ${key}`)
                            })
                        )
                        .append(btn)
                    };
                    
                    Object.entries(this.settings.words).forEach(addWordSetting);
                    let btn = document.createElement("button");
                    btn.className = "button-38aScr lookFilled-1Gx00P colorBrand-3pXr91 sizeMedium-1AC_Sl grow-q77ONN";
                    btn.innerText = "New Word";
                    btn.addEventListener("click", e => {
                        e.preventDefault();
                        if(typeof this.settings.words[""] === "string") return;
                        this.settings.words[""] = "";
                        this.saveSettings();
                        addWordSetting(["", ""]);
                    });
                    pn.append(btn);
                    return pn;
                }

            }

        };
        return plugin(Plugin, Api);
    })(global.ZeresPluginLibrary.buildPlugin(config));
})();
