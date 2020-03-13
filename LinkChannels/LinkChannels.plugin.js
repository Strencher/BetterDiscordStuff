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
            version: "0.0.2",
            description: "Adds an Icon to channels that copys <#channelId>. (channelId is replaced) Shift + Click to insert the channel in the textarea.",
            github: "https://github.com/Strencher/BetterDiscordStuff/LinkChannels/LinkChannels.plugin.js",
            github_raw: "https://raw.githubusercontent.com/Strencher/BetterDiscordStuff/master/LinkChannels/LinkChannels.plugin.js"
        },
        changelog: [
            {
                title: "Yeah",
                type: "added",
                items: ["The plugin exist"]
            },
            {
                title: "Quick",
                type: "added",
                items: ["Added shift + click to insert in the textarea."]
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

            const { WebpackModules, PluginUtilities, DiscordModules, ReactComponents, Patcher, DiscordSelectors } = Api;
            const { React } = DiscordModules;
            return class  extends Plugin {
                constructor() {
                    super();
                }

                async onStart() {
                    const channel = await ReactComponents.getComponentByName("TextChannel", DiscordSelectors.ChannelList.containerDefault)
                    PluginUtilities.addStyle("LinkChannels", 
                    `
                    .linkChannels {
                        width: 17px;
                        height: 17px;
                        filter: invert(70%);
                        visibility: hidden;
                        cursor: pointer;
                    }   
                    .containerDefault-1ZnADq:hover .linkChannels {
                        visibility: visible;
                    }
                    `) 
                    Patcher.after(channel.component.prototype, "render", ({props}, _, react)=>{
                        react.props.children.props.children.unshift(
                            React.createElement("img", {
                                className: "linkChannels",
                                src: "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJMYXllcl8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCINCgkgdmlld0JveD0iMCAwIDUxMi4wOTIgNTEyLjA5MiIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNTEyLjA5MiA1MTIuMDkyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+DQo8Zz4NCgk8Zz4NCgkJPHBhdGggZD0iTTMxMi40NTMsMTk5LjYwMWMtNi4wNjYtNi4xMDItMTIuNzkyLTExLjUxMS0yMC4wNTMtMTYuMTI4Yy0xOS4yMzItMTIuMzE1LTQxLjU5LTE4Ljg1OS02NC40MjctMTguODU5DQoJCQljLTMxLjY5Ny0wLjA1OS02Mi4xMDYsMTIuNTM1LTg0LjQ4LDM0Ljk4N0wzNC45NDksMzA4LjIzYy0yMi4zMzYsMjIuMzc5LTM0Ljg5LDUyLjctMzQuOTEsODQuMzE4DQoJCQljLTAuMDQyLDY1Ljk4LDUzLjQxLDExOS41MDEsMTE5LjM5LDExOS41NDNjMzEuNjQ4LDAuMTEsNjIuMDI5LTEyLjQyNCw4NC4zOTUtMzQuODE2bDg5LjYtODkuNg0KCQkJYzEuNjI4LTEuNjE0LDIuNTM3LTMuODE2LDIuNTI0LTYuMTA4Yy0wLjAyNy00LjcxMy0zLjg3LTguNTExLTguNTgzLTguNDg0aC0zLjQxM2MtMTguNzIsMC4wNjYtMzcuMjczLTMuNTI5LTU0LjYxMy0xMC41ODENCgkJCWMtMy4xOTUtMS4zMTUtNi44NjctMC41NzMtOS4zMDEsMS44NzdsLTY0LjQyNyw2NC41MTJjLTIwLjAwNiwyMC4wMDYtNTIuNDQyLDIwLjAwNi03Mi40NDgsMA0KCQkJYy0yMC4wMDYtMjAuMDA2LTIwLjAwNi01Mi40NDIsMC03Mi40NDhsMTA4Ljk3MS0xMDguODg1YzE5Ljk5LTE5Ljk2NSw1Mi4zNzMtMTkuOTY1LDcyLjM2MywwDQoJCQljMTMuNDcyLDEyLjY3OSwzNC40ODYsMTIuNjc5LDQ3Ljk1NywwYzUuNzk2LTUuODAxLDkuMzEtMTMuNDk1LDkuODk5LTIxLjY3NUMzMjIuOTc2LDIxNi4xMDgsMzE5LjM3MSwyMDYuNTM1LDMxMi40NTMsMTk5LjYwMXoiDQoJCQkvPg0KCTwvZz4NCjwvZz4NCjxnPg0KCTxnPg0KCQk8cGF0aCBkPSJNNDc3LjA2MSwzNC45OTNjLTQ2LjY1Ny00Ni42NTctMTIyLjMwMy00Ni42NTctMTY4Ljk2LDBsLTg5LjUxNSw4OS40MjljLTIuNDU4LDIuNDctMy4xNjcsNi4xODUtMS43OTIsOS4zODcNCgkJCWMxLjM1OSwzLjIxMSw0LjUzNSw1LjI3Miw4LjAyMSw1LjIwNWgzLjE1N2MxOC42OTgtMC4wMzQsMzcuMjIxLDMuNTg5LDU0LjUyOCwxMC42NjdjMy4xOTUsMS4zMTUsNi44NjcsMC41NzMsOS4zMDEtMS44NzcNCgkJCWw2NC4yNTYtNjQuMTcxYzIwLjAwNi0yMC4wMDYsNTIuNDQyLTIwLjAwNiw3Mi40NDgsMGMyMC4wMDYsMjAuMDA2LDIwLjAwNiw1Mi40NDIsMCw3Mi40NDhsLTgwLjA0Myw3OS45NTdsLTAuNjgzLDAuNzY4DQoJCQlsLTI3Ljk4OSwyNy44MTljLTE5Ljk5LDE5Ljk2NS01Mi4zNzMsMTkuOTY1LTcyLjM2MywwYy0xMy40NzItMTIuNjc5LTM0LjQ4Ni0xMi42NzktNDcuOTU3LDANCgkJCWMtNS44MzMsNS44NDUtOS4zNSwxMy42MDYtOS44OTksMjEuODQ1Yy0wLjYyNCw5Ljc3NSwyLjk4MSwxOS4zNDgsOS44OTksMjYuMjgzYzkuODc3LDkuOTE5LDIxLjQzMywxOC4wMDgsMzQuMTMzLDIzLjg5Mw0KCQkJYzEuNzkyLDAuODUzLDMuNTg0LDEuNTM2LDUuMzc2LDIuMzA0YzEuNzkyLDAuNzY4LDMuNjY5LDEuMzY1LDUuNDYxLDIuMDQ4YzEuNzkyLDAuNjgzLDMuNjY5LDEuMjgsNS40NjEsMS43OTJsNS4wMzUsMS4zNjUNCgkJCWMzLjQxMywwLjg1Myw2LjgyNywxLjUzNiwxMC4zMjUsMi4xMzNjNC4yMTQsMC42MjYsOC40NTgsMS4wMjUsMTIuNzE1LDEuMTk1aDUuOTczaDAuNTEybDUuMTItMC41OTcNCgkJCWMxLjg3Ny0wLjA4NSwzLjg0LTAuNTEyLDYuMDU5LTAuNTEyaDIuOTAxbDUuODg4LTAuODUzbDIuNzMxLTAuNTEybDQuOTQ5LTEuMDI0aDAuOTM5YzIwLjk2MS01LjI2NSw0MC4xMDEtMTYuMTE4LDU1LjM4MS0zMS40MDMNCgkJCWwxMDguNjI5LTEwOC42MjlDNTIzLjcxOCwxNTcuMjk2LDUyMy43MTgsODEuNjUsNDc3LjA2MSwzNC45OTN6Ii8+DQoJPC9nPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPC9zdmc+DQo=",
                                onClick: (e) => {
                                    if(e.shiftKey) {
                                        WebpackModules.getByProps("ComponentDispatch").ComponentDispatch.dispatchToLastSubscribed("INSERT_TEXT", {content: "<#"+props.channel.id+">"})
                                    }
                                    DiscordModules.ElectronModule.copy("<#"+props.channel.id+">");
                                }
                        })
                        );
                    });
                }
                onStop() {
                    PluginUtilities.removeStyle("LinkChannels");
                    Patcher.unpatchAll();
                }

            }

        };
        return plugin(Plugin, Api);
    })(global.ZeresPluginLibrary.buildPlugin(config));
})();
