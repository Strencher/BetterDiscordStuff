/**
* @name PlatformIndicators
* @displayName PlatformIndicators
* @authorId 415849376598982656
* @invite gvA2ree
* @version 1.1.3
*/
/*@cc_on
@if (@_jscript)
    
    // Offer to self-install for clueless users that try to run this directly.
    var shell = WScript.CreateObject("WScript.Shell");
    var fs = new ActiveXObject("Scripting.FileSystemObject");
    var pathPlugins = shell.ExpandEnvironmentStrings("%APPDATA%\BetterDiscord\plugins");
    var pathSelf = WScript.ScriptFullName;
    // Put the user at ease by addressing them in the first person
    shell.Popup("It looks like you"ve mistakenly tried to run me directly. \n(Don"t do that!)", 0, "I"m a plugin for BetterDiscord", 0x30);
    if (fs.GetParentFolderName(pathSelf) === fs.GetAbsolutePathName(pathPlugins)) {
        shell.Popup("I"m in the correct folder already.", 0, "I"m already installed", 0x40);
    } else if (!fs.FolderExists(pathPlugins)) {
        shell.Popup("I can"t find the BetterDiscord plugins folder.\nAre you sure it"s even installed?", 0, "Can"t install myself", 0x10);
    } else if (shell.Popup("Should I copy myself to BetterDiscord"s plugins folder for you?", 0, "Do you need some help?", 0x34) === 6) {
        fs.CopyFile(pathSelf, fs.BuildPath(pathPlugins, fs.GetFileName(pathSelf)), true);
        // Show the user where to put plugins in the future
        shell.Exec("explorer " + pathPlugins);
        shell.Popup("I"m installed!", 0, "Successfully installed", 0x40);
    }
    WScript.Quit();
@else@*/

module.exports = (() => {
    const config = {
        info: {
            name: "PlatformIndicators",
            authors: [
                {
                    name: "Strencher",
                    discord_id: "415849376598982656",
                    github_username: "Strencher",
                    twitter_username: "Strencher3"
                }
            ],
            version: "1.1.3",
            description: "Adds indicators for every platform that the user is using. Source code available on the repo in the 'src' folder.",
            github: "https://github.com/Strencher/BetterDiscordStuff/blob/master/PlatformIndicators/APlatformIndicators.plugin.js",
            github_raw: "https://raw.githubusercontent.com/Strencher/BetterDiscordStuff/master/PlatformIndicators/APlatformIndicators.plugin.js"
        },
        changelog: [
            {
                title: "v1.1.3",
                type: "fixed",
                items: [
                    "Fixed indicators showing in the dms list."
                ]
            },
        ],
        defaultConfig: [
            {
                type: "switch",
                name: "Show in MemberList",
                note: "Shows the platform indicators in the memberlist",
                id: "showInMemberList",
                value: true
            },
            {
                type: "switch",
                name: "Show next to username",
                note: "Shows the platform indicators next the username in messages.",
                id: "showInChat",
                value: true
            },
            {
                type: "switch",
                name: "Show in DMs List",
                note: "Shows the platform indicators in the dm list.",
                id: "showInDmsList",
                value: true
            },
            {
                type: "switch",
                name: "Show next to discord tags",
                note: "Shows the platform indicators right next to the discord tag.",
                id: "showInTags",
                value: true
            },
            {
                type: "switch",
                name: "Ignore Bots",
                note: "Ignores the status of bots which is always web anyways.",
                id: "ignoreBots",
                value: true
            },
            {
                type: "category",
                name: "icons",
                id: "icons",
                settings: [
                    {
                        type: "switch",
                        name: "Web Icon",
                        note: "Show the Web icon.",
                        id: "web",
                        value: true
                    },
                    {
                        type: "switch",
                        name: "Desktop Icon",
                        note: "Show the Desktop icon.",
                        id: "desktop",
                        value: true
                    },
                    {
                        type: "switch",
                        name: "Mobile Icon",
                        note: "Show the Mobile icon.",
                        id: "mobile",
                        value: true
                    }
                ]
            }
        ]
    };
    //@ts-ignore
    const BdApi = window.BdApi;
    // @ts-ignore
    return !global.ZeresPluginLibrary ? class {
        constructor() {
            this._config = config;
        }
        getName() { return config.info.name; }
        getAuthor() { return config.info.authors.map(a => a.name).join(", "); }
        getDescription() { return config.info.description; }
        getVersion() { return config.info.version; }
        load() {
            BdApi.showConfirmationModal("Library plugin is needed", [`The library plugin needed for ${config.info.name} is missing. Please click Download Now to install it.`], {
                confirmText: "Download",
                cancelText: "Cancel",
                onConfirm: () => {
                    require("request").get("https://rauenzi.github.io/BDPluginLibrary/release/0PluginLibrary.plugin.js", async (error, response, body) => {
                        if (error)
                            return require("electron").shell.openExternal("https://betterdiscord.net/ghdl?url=https://raw.githubusercontent.com/rauenzi/BDPluginLibrary/master/release/0PluginLibrary.plugin.js");
                        await new Promise(r => require("fs").writeFile(require("path").join(BdApi.Plugins.folder, "0PluginLibrary.plugin.js"), body, r));
                    });
                }
            });
        }
        start() { }
        stop() { }
    } : (([Plugin, Api]) => {
        const plugin = (Plugin, Api) => {
            const { Utilities, WebpackModules, PluginUtilities, ReactTools, Patcher, Logger, DiscordModules: { React, UserStatusStore, UserStore, Dispatcher, DiscordConstants: { ActionTypes } } } = Api;
            const { TooltipContainer: Tooltip } = WebpackModules.getByProps("TooltipContainer");
            const StatusModule = WebpackModules.getByProps("Status", "getStatusMask");
            const Flux = Object.assign({}, WebpackModules.getByProps("Store", "connectStores"), WebpackModules.getByProps("useStateFromStores"));
            const {Messages} = WebpackModules.getModule(m => "Messages" in m && "setLocale" in m && m.Messages.CLOSE);
            const AuthStore = WebpackModules.getByProps("getId", "getEmail");
            const SessionsStore = WebpackModules.getByProps("getSessions", "_dispatchToken");
            const Utils = Object.assign(Utilities, {
                joinClassNames: (...classNames) => classNames.filter(Boolean).join(" "),
                capFirst(text) {
                    return text[0].toUpperCase() + text.slice(1);
                }
            });

            const Settings = new class Settings extends Flux.Store {
                constructor() {super(Dispatcher, {});}
                _settings = PluginUtilities.loadSettings(config.info.name, {});

                get(key, def) {
                    return this._settings[key] ?? def;
                }

                set(key, value) {
                    this._settings[key] = value;
                    this.emitChange();
                }
            };

            function DesktopIcon(props) {
                return React.createElement("svg", Object.assign({className: "PI-icon_desktop", width: "24", height: "24"}, props, {viewBox: "0 0 24 24"}),
                    React.createElement("path", {fill: "currentColor", d: "M4 2.5C2.897 2.5 2 3.397 2 4.5V15.5C2 16.604 2.897 17.5 4 17.5H11V19.5H7V21.5H17V19.5H13V17.5H20C21.103 17.5 22 16.604 22 15.5V4.5C22 3.397 21.103 2.5 20 2.5H4ZM20 4.5V13.5H4V4.5H20Z"}));
            };

            function WebIcon(props) {
                return React.createElement("svg", Object.assign({className: "PI-icon_web", width: "24", height: "24"}, props, {viewBox: "0 0 24 24"}),
                    React.createElement("path", {fill: "currentColor", d: "M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM11 19.93C7.05 19.44 4 16.08 4 12C4 11.38 4.08 10.79 4.21 10.21L9 15V16C9 17.1 9.9 18 11 18V19.93ZM17.9 17.39C17.64 16.58 16.9 16 16 16H15V13C15 12.45 14.55 12 14 12H8V10H10C10.55 10 11 9.55 11 9V7H13C14.1 7 15 6.1 15 5V4.59C17.93 5.78 20 8.65 20 12C20 14.08 19.2 15.97 17.9 17.39Z"}));
            };

            function MobileIcon(props) {
                return React.createElement("svg", Object.assign({className: "PI-icon_mobile", width: "24", height: "24"}, props, {viewBox: "0 0 24 24"}),
                    React.createElement("g", {fill: "none"},
                        React.createElement("path", {fill: "currentColor", d: "M15.5 1h-8C6.12 1 5 2.12 5 3.5v17C5 21.88 6.12 23 7.5 23h8c1.38 0 2.5-1.12 2.5-2.5v-17C18 2.12 16.88 1 15.5 1zm-4 21c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm4.5-4H7V4h9v14z"})));
            };

            const Icons = {
                mobile: MobileIcon,
                web: WebIcon,
                desktop: DesktopIcon
            };
            const getClass = (props = [], items = props, exclude = [], selector = false) => {
                const module = WebpackModules.getModule(m => m && props.every(prop => m[prop] !== undefined) && exclude.every(e => m[e] == undefined));
                if (!module)
                    return "";
                return (selector ? "." : "") + items.map(item => module[item]).join(selector ? "." : " ");
            };
            let currentClientStatus = SessionsStore.getSession() ? {
                [SessionsStore.getSession().clientInfo.client]: SessionsStore.getSession().status
            } : {};
            
            const StatusIndicators = function StatusIndicators(props) {
                const user = Flux.useStateFromStores([UserStore], () => {
                    const userId = props.userId ?? props.user?.id;
                    return UserStore.getUser(userId);
                });
                const shouldShow = Flux.useStateFromStores([Settings], () => Settings.get("showIn" + props.type, true) && (Settings.get("ignoreBots", true) ? !user?.bot : true));
                const iconStates = Flux.useStateFromStoresObject([Settings], () => Settings.get("icons", {}));
                const clients = Flux.useStateFromStoresObject([UserStatusStore], () => {
                    if (user?.id === AuthStore.getId()) return currentClientStatus;

                    return UserStatusStore.getState().clientStatuses[user?.id] ?? {};
                });
                if (!_.size(clients) || !shouldShow || !user) return null;

                return React.createElement("div", {
                    className: Utilities.className("PI-indicatorContainer", "PI-type_" + props.type),
                    children: Object.entries(clients)
                        .filter(([key]) => iconStates[key] ?? true)
                        .map(([key, status]) => React.createElement(Tooltip, {
                            text: Utils.capFirst(key) + ": " + Messages[`STATUS_${(status == "mobile" ? "mobile_online" : status).toUpperCase()}`],
                            position: "top",
                            children: React.createElement(Icons[key], {
                                style: {color: StatusModule.getStatusColor(status)},
                                width: 18,
                                height: 18
                            })
                        }))
                });
            };

            return class PlatformIndicators extends Plugin {
                getSettingsPanel() {
                    const panel = this.buildSettingsPanel();
                    
                    // Very dirty
                    panel.addListener(() => {
                        Settings._settings = {...this.settings};
                        Settings.emitChange();
                    });

                    return panel.getElement();
                }

                ON_PRESENCE_UPDATE = ({ user, clientStatus }) => {
                    if (user.id !== AuthStore.getId()) return;
                    currentClientStatus = clientStatus;
                    UserStatusStore.emitChange();
                }

                css = `
                    .PI-indicatorContainer {
                        display: inline-flex;
                        vertical-align: bottom;
                    }

                    .PI-indicatorContainer svg {
                        margin-left: 2px;
                    }

                    .PI-container {
                        display: flex;
                    }

                    .PI-type_Chat {margin-bottom: -3px;}
                `;

                getClients(userId) {
                    const isSelf = userId == AuthStore.getId();
                    const status = isSelf ? currentClientStatus : UserStatusStore.getState().clientStatuses[userId];
                    return status !== null && status !== void 0 ? status : {};
                }

                onStart() {
                    PluginUtilities.addStyle(config.info.name, this.css);
                    Utils.suppressErrors(this.patchMessageHeader.bind(this), "MessageHeaderPatch")();
                    Utils.suppressErrors(this.patchMemberListItem.bind(this))();
                    Utils.suppressErrors(this.patchDmList.bind(this))();
                    Utils.suppressErrors(this.patchDiscordTag.bind(this))();
                    Dispatcher.subscribe(ActionTypes.PRESENCE_UPDATE, this.ON_PRESENCE_UPDATE);
                }

                async patchMemberListItem() {
                    const MemberListItem = WebpackModules.getByDisplayName("MemberListItem");
                    Patcher.after(MemberListItem.prototype, "renderDecorators", ({ props }, _, returnValue) => {
                        try {
                            const tree = returnValue?.props?.children;
                            if (!Array.isArray(tree)) return;

                            tree.unshift(
                                React.createElement(StatusIndicators, {
                                    user: props.user,
                                    type: "MemberList"
                                })
                            );
                        }
                        catch (error) {
                            Logger.error("Error while patching MemberListItem:", error);
                        }
                    });

                    this.forceUpdate(getClass(["member"], ["member"], [], true));
                }

                patchMessageHeader() {
                    const MessageHeader = WebpackModules.getModule(m => m?.default?.toString().indexOf("showTimestampOnHover") > -1);

                    Patcher.after(MessageHeader, "default", (_, [props], returnValue) => {
                        try {
                            const tree = Utils.getNestedProp(returnValue, "props.children.1.props.children");
                            if (!Array.isArray(tree)) return;
                            tree.splice(2, 0, React.createElement(StatusIndicators, {user: props.message.author, type: "Chat"}));
                        }
                        catch (error) {
                            Logger.error("Error while patching MessageTimestammp:", error);
                        }
                    });
                }

                patchDmList() {
                    const ListItem = WebpackModules.getModule(m => m?.render?.toString().indexOf("nameAndDecorators") > -1);
                    const {default: PrivateChannel} = WebpackModules.getByProps("DirectMessage");

                    Patcher.after(PrivateChannel.prototype, "render", (_this, _, ret) => {
                        const children = ret.props.children;

                        ret.props.children = (props) => {
                            const ret = children(props);
                            Object.assign(ret.props, _this.props);
                            return ret;
                        };
                    });

                    Patcher.after(ListItem, "render", (_1, [props], ret) => {
                        try {
                            const tree = Utilities.findInReactTree(ret, e => e?.className?.indexOf("nameAndDecorators") > -1);
                            if (!Array.isArray(tree?.children) || !props.channel || !props.channel.isDM()) return ret;

                            tree.children.push(
                                React.createElement(StatusIndicators, {
                                    userId: props.channel.getRecipientId(),
                                    type: "DmsList",
                                    key: `status-indicators-${props.channel.getRecipientId()}`
                                })
                            );
                        } catch (error) {
                            Logger.error("Failed to inject StatusIndicators in DMs:", error);
                        }
                    });

                    this.forceUpdate(getClass(["privateChannels"], ["privateChannels"], [], true));
                }

                forceUpdate(selector) {
                    const nodes = document.querySelectorAll(selector);

                    for (const node of nodes) {
                        const instance = ReactTools.getOwnerInstance(node);
                        if (!instance) return;
                        instance.forceUpdate();
                    }
                }

                patchDiscordTag() {
                    const UserContext = React.createContext();
                    const DiscordTag = WebpackModules.getModule(m => m.default?.displayName === "DiscordTag");
                    const NameTag = WebpackModules.getModule(m => m.default?.displayName === "NameTag");

                    // weSmart
                    Patcher.after(DiscordTag, "default", (_, [{ user }], ret) => {
                        return React.createElement(UserContext.Provider, {value: user}, ret);
                    });

                    function IndicatorsWrapper() {
                        const user = React.useContext(UserContext);
                        
                        return React.createElement(StatusIndicators, {
                            user,
                            type: "Tags"
                        });
                    }

                    Patcher.after(NameTag, "default", (_, [args], ret) => {
                        const tree = ret?.props;
                        if (!Array.isArray(tree.children)) return;

                        try {
                            tree.children.push(React.createElement(IndicatorsWrapper, {}));
                        }
                        catch (error) {
                            Logger.error("Failed to inject into NameTag:\n", error);
                        }
                        return ret;
                    });
                }
                onStop() {
                    Patcher.unpatchAll();
                    PluginUtilities.removeStyle(config.info.name);
                    Dispatcher.unsubscribe(ActionTypes.PRESENCE_UPDATE, this.ON_PRESENCE_UPDATE);
                }
            };
        };
        return plugin(Plugin, Api);
        //@ts-ignore
    })(global.ZeresPluginLibrary.buildPlugin(config));
})();
/*@end@*/ 
