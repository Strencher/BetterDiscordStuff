/**
* @name RelationshipCounter
* @displayName RelationshipCounter
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

const RelationshipCounter = (() => {
    const config = {
        info: {
            name: "RelationshipCounter",
            authors: [
                {
                    name: "Strencher",
                    discord_id: "415849376598982656",
                    github_username: "Strencher",
                    twitter_username: "Strencher3"
                }
            ],
            version: "0.0.2",
            description: "Counts your'e Friends, blocked users & pending friends",
            github: "https://github.com/Strencher/BetterDiscordStuff/RelationshipCounter/RelationshipCounter.plugin.js",
            github_raw: "https://raw.githubusercontent.com/Strencher/BetterDiscordStuff/master/RelationshipCounter/RelationshipCounter.plugin.js"
        },
        changelog: [
            {
                title: "Yeah",
                type: "added",
                items: ["**Added Incoming & Outgoing friend\'s Badges, Enable / Disable in the SettingsPanel**"]
            }
        ],
        defaultConfig: [
            {
                type: "switch",
                name: "incoming",
                note: "Show incoming friend request\'s",
                id: "in",
                value: true
            },
            {
                type: "switch",
                name: "outgoing",
                note: "Show outgoing friend request\'s",
                id: "out",
                value: true
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

            const { DiscordModules, ReactComponents, Patcher, ReactTools } = Api;
            const { React } = DiscordModules;
            class Icon extends React.Component {
                render() {
                    return React.createElement("span", {
                        children: this.props.count,
                        className: "relCount",
                        style: {
                            color: "white", 
                            height: "20px",
                            width: "20px", 
                            backgroundColor: "red", 
                            borderRadius: "50%", 
                            position: "relative", 
                            fontSize: "12px", 
                            fontWeight: "bold",
                            left: this.props.left ? this.props.left : "5px"
                        }
                    })
                }
            }
            return class RelationshipCounter extends Plugin {
                constructor() {
                    super();
                }
                getSettingsPanel() {
                    const panel = this.buildSettingsPanel()
                    panel.addListener(() => {
                        if(document.querySelector(".tabBar-ZmDY9v")) ReactTools.getOwnerInstance(document.querySelector(".tabBar-ZmDY9v")).forceUpdate()
                    })
                    return panel.getElement();
                }
                async onStart() { 
                    
                    const tag = await ReactComponents.getComponentByName("TabBar", ".tabBar-ZmDY9v");
                    Patcher.after(tag.component.prototype, "render", (e, _, react) => {
                        if(e.props.className && e.props.className.indexOf("tabBar-ZmDY9v") !== -1) {
                            let friends = 0, blockedUsers = 0, incomingFriends = 0, outgoingFriends = 0;
                            Object.values(DiscordModules.RelationshipStore.getRelationships()).forEach(e=> {
                                if(e == 1) friends += 1;
                                if(e == 2) blockedUsers += 1;
                                if(e == 3) incomingFriends += 1;
                                if(e == 4) outgoingFriends += 1;
                            })
                            react.props.children.forEach((value, index) => {
                                if(value.props.id == "ALL") {
                                    const friendsLabel = react.props.children[index].props.children;
                                    react.props.children[index].props.children = []
                                    react.props.children[index].props.children.push(
                                        friendsLabel, 
                                        React.createElement(Icon, {
                                            count: friends
                                        })
                                    )
                                }
                                if(value.props.id == "PENDING") {
                                    const pendingLabel = react.props.children[index].props.children;
                                    react.props.children[index].props.children = []
                                    react.props.children[index].props.children.push(
                                        this.settings.in ? React.createElement(Icon, {count: incomingFriends, left: "-5px"}) : "",
                                        this.settings.in ? "<= " : "",
                                        pendingLabel,
                                        this.settings.out ? " =>": "",
                                        this.settings.out ? React.createElement(Icon, {count: outgoingFriends}) : ""
                                        )
                                }
                                if(value.props.id == "BLOCKED") {
                                    const blockedLabel = react.props.children[index].props.children;
                                    react.props.children[index].props.children = []
                                    react.props.children[index].props.children.push(
                                        blockedLabel, 
                                        React.createElement(Icon, {
                                            count: blockedUsers
                                        })
                                    )
                                }
                            })
                        }
                    })
                }
                onStop() {
                    Patcher.unpatchAll();
                    if(document.querySelector(".relCount")) document.querySelectorAll(".relCount").forEach(e=>e.remove())
                }

            }

        };
        return plugin(Plugin, Api);
    })(global.ZeresPluginLibrary.buildPlugin(config));
})();

                    