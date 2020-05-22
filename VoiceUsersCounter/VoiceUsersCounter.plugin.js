/**
* @name VoiceUsersCounter
* @displayName VoiceUsersCounter
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

const VoiceUsersCounter = (() => {
    const config = {
        info: {
            name: "VoiceUsersCounter",
            authors: [
                {
                    name: "Strencher",
                    discord_id: "415849376598982656",
                    github_username: "Strencher",
                    twitter_username: "Strencher3"
                }
            ],
            version: "0.0.5",
            description: "Adds a count of users they're connected to a VoiceChannel. Customize the Color of the count in the SettingsPanel.",
            github: "https://github.com/Strencher/BetterDiscordStuff/blob/master/VoiceUsersCounter/VoiceUsersCounter.plugin.js",
            github_raw: "https://raw.githubusercontent.com/Strencher/BetterDiscordStuff/master/VoiceUsersCounter/VoiceUsersCounter.plugin.js"
        },
        changelog: [
            {
                title: "fixed",
                type: "fixed",
                items: ["the counter no longer overlaps the other buttons."]
            }
        ],
        defaultConfig: [
            {
                type: "color",
                id: "color",
                value: "#7289DA",
                name: "NumberColor",
                note: "Customize the color of the number when you are in the VoiceChannel"
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

            const { WebpackModules, DiscordAPI, Utilities, PluginUtilities, DiscordModules, ReactComponents, Patcher, DiscordSelectors, ReactTools } = Api;
            const { React } = DiscordModules;
            const Tooltip = WebpackModules.getByDisplayName("Tooltip");
            class VoiceCount extends React.Component {
                render() {
                    return React.createElement(Tooltip, {
                        text: "Connected Users: "+this.props.count,
                        position: "top",
                        color: "black"
                    }, e => React.createElement("span", Object.assign({
                        className: "voiceCounter", 
                        onMouseEnter: e.onMouseEnter, 
                        onMouseLeave: e.onMouseLeave
                    }, this.props.options), this.props.count))
                }
            }
            return class VoiceUsersCounter extends Plugin {
                constructor() {
                    super();
                }
                getSettingsPanel() {
                    const panel = this.buildSettingsPanel();
                    panel.addListener(() => {
                        document.querySelectorAll(DiscordSelectors.ChannelList.containerDefault).forEach(e=> {
                            ReactTools.getOwnerInstance(e).forceUpdate();
                        });
                    });
                    return panel.getElement();
                }
                async onStart() {
                    PluginUtilities.addStyle(config.info.name, 
                    `.iconVisibility-1bOqu7[aria-label*="voice"] .children-Bmpf2Q {
                        position: relative;
                        right: 15px;
                    }
                    .voiceCounter {
                        color: var(--channels-default);
                        position: absolute;
                        top: 9px;
                        right: 11px;
                        font-weight: bold; 
                    }`);                    
                    const VoiceChannelComponent = await ReactComponents.getComponentByName("VoiceChannel", DiscordSelectors.ChannelList.containerDefault);
                    this.unpatch = Patcher.after(VoiceChannelComponent.component.prototype, "render", ({props}, _, ret) => {
                        let childs = Utilities.getNestedProp(ret, "props.children");
                        let children = Utilities.getNestedProp(ret, "props.children.props.children");
                        const Counter = React.createElement(VoiceCount, {
                            options: props.voiceStates && Array.isArray(props.voiceStates) && props.voiceStates.find(e=> e.user.id == DiscordAPI.currentUser.id) ? {
                                style: {
                                    color: this.settings.color || "var(--blurple)",
                                    display: props.channel.userLimit > 0 ? "none" : "block"
                                }
                            } : {style: {display: props.channel.userLimit > 0 ? "none" : "block"}},
                            count: props.voiceStates && Array.isArray(props.voiceStates) ? props.voiceStates.length : "0"
                        })
                        if(childs && Array.isArray(childs)) childs.push(Counter) 
                        else if (children && Array.isArray(children)) children.push(Counter);
                    });
                    VoiceChannelComponent.forceUpdateAll();
                }
                onStop() {
                    PluginUtilities.removeStyle(config.info.name);
                    this.unpatch();
                }

            }

        };
        return plugin(Plugin, Api);
    })(global.ZeresPluginLibrary.buildPlugin(config));
})();