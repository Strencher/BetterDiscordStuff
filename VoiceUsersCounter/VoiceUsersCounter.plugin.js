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

module.exports = (() => {
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
            version: "0.0.6",
            description: "Adds a count of users they're connected to a VoiceChannel. Customize the Color of the count in the SettingsPanel.",
            github: "https://github.com/Strencher/BetterDiscordStuff/blob/master/VoiceUsersCounter/VoiceUsersCounter.plugin.js",
            github_raw: "https://raw.githubusercontent.com/Strencher/BetterDiscordStuff/master/VoiceUsersCounter/VoiceUsersCounter.plugin.js"
        },
        changelog: [
            {
                title: "Rewrite",
                type: "added",
                items: ["The Plugin got rewritten."]
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

            const { WebpackModules, PluginUtilities, DiscordModules, Patcher, DiscordSelectors, ReactTools } = Api;
            const { React } = DiscordModules;
            const Tooltip = WebpackModules.getByDisplayName("Tooltip");
            const { getVoiceChannelId } = WebpackModules.getByProps('getVoiceChannelId');
            class VoiceCount extends React.Component {
                render() {
                    return React.createElement(Tooltip, {
                        text: "Connected Users: " + this.props.count,
                        position: "top",
                        color: "black"
                    }, e => React.createElement("span", Object.assign({
                        ...e,
                        className: "voiceCounter",
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
                        document.querySelectorAll(DiscordSelectors.ChannelList.containerDefault).forEach(e => {
                            ReactTools.getOwnerInstance(e).forceUpdate();
                        });
                    });
                    return panel.getElement();
                }
                onStart() {
                    PluginUtilities.addStyle(config.info.name,
                        `.voiceCounter {
                            color: var(--channels-default);
                            font-weight: bold; 
                            margin-left: 5px;
                        }`
                    );
                    this.unpatch = Patcher.after(WebpackModules.getByDisplayName("ChannelItem").prototype, "renderIcons", (_, __, e) => {
                        const { props: { channel, userCount }} = e.props.children.find(e => e && e.props && e.props.hasOwnProperty("userCount")) || {props: {}};
                        if(!channel || channel.type !== 2) return e;
                        if(channel.userLimit > 0) return;
                        e.props.children.push(
                            React.createElement(VoiceCount, {
                                count: userCount,
                                options: {
                                    style: channel.id == getVoiceChannelId() ? {
                                        color: this.settings.color || "var(--blurple)",
                                        display: userCount == 0 ? "none" : "block"
                                    } : {
                                        display: userCount == 0 ? "none" : "block"
                                    }
                                }
                            })
                        );
                        return e;
                    });
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
