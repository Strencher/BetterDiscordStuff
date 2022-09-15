/**
* @name PlatformIndicators
* @displayName PlatformIndicators
* @authorId 415849376598982656
* @invite gvA2ree
* @version 1.3.0
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
            version: "1.3.0",
            description: "Adds indicators for every platform that the user is using. Source code available on the repo in the 'src' folder.",
            github: "https://github.com/Strencher/BetterDiscordStuff/blob/master/PlatformIndicators/APlatformIndicators.plugin.js",
            github_raw: "https://raw.githubusercontent.com/Strencher/BetterDiscordStuff/master/PlatformIndicators/APlatformIndicators.plugin.js"
        },
        changelog: [
            {
                title: "v1.3.0",
                type: "fixed",
                items: [
                    "Fixed new platform for console sessions. They'll have a gamepad show up called \"embedded\"."
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
                    },
                    {
                        type: "switch",
                        name: "Embedded Icon",
                        note: "Show the Embedded icon.",
                        id: "embedded",
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
        getName() {return config.info.name;}
        getAuthor() {return config.info.authors.map(a => a.name).join(", ");}
        getDescription() {return config.info.description;}
        getVersion() {return config.info.version;}
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
        start() {}
        stop() {}
    } : (([Plugin, Api]) => {
        const plugin = (Plugin, Api) => {
            const {ReactComponents, Utilities, WebpackModules, PluginUtilities, ReactTools, Patcher, Logger, DiscordModules: {React, UserStatusStore, UserStore, Dispatcher}} = Api;
            const {TooltipContainer: Tooltip} = WebpackModules.getByProps("TooltipContainer");
            const h = React.createElement;
            const StatusModule = WebpackModules.getByProps("Status", "getStatusMask");
            const Flux = Object.assign({}, WebpackModules.getByProps("Store", "connectStores"), WebpackModules.getByProps("useStateFromStores"));
            const {Messages} = WebpackModules.getModule(m => "Messages" in m && "setLocale" in m && m.Messages.CLOSE);
            const AuthStore = WebpackModules.getByProps("getId", "getEmail");
            const SessionsStore = WebpackModules.getByProps("getSessions", "_dispatchToken");
            const friendsRowClasses = WebpackModules.getByProps("hovered", "discriminator");

            class StringUtils {
                static upperFirst(string) {return string.charAt(0).toUpperCase() + string.slice(1);}
            }

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

            function EmbeddedIcon(props) {
                return h("svg", Object.assign({className: "PI-icon_embedded", width: "24", height: "24"}, props, {viewBox: "0 -2.5 28 28"}),
                    h("path", {
                        fill: "currentColor",
                        d: "M5.79335761,5 L18.2066424,5 C19.7805584,5 21.0868816,6.21634264 21.1990185,7.78625885 L21.8575059,17.0050826 C21.9307825,18.0309548 21.1585512,18.9219909 20.132679,18.9952675 C20.088523,18.9984215 20.0442685,19 20,19 C18.8245863,19 17.8000084,18.2000338 17.5149287,17.059715 L17,15 L7,15 L6.48507125,17.059715 C6.19999155,18.2000338 5.1754137,19 4,19 C2.97151413,19 2.13776159,18.1662475 2.13776159,17.1377616 C2.13776159,17.0934931 2.1393401,17.0492386 2.1424941,17.0050826 L2.80098151,7.78625885 C2.91311838,6.21634264 4.21944161,5 5.79335761,5 Z M14.5,10 C15.3284271,10 16,9.32842712 16,8.5 C16,7.67157288 15.3284271,7 14.5,7 C13.6715729,7 13,7.67157288 13,8.5 C13,9.32842712 13.6715729,10 14.5,10 Z M18.5,13 C19.3284271,13 20,12.3284271 20,11.5 C20,10.6715729 19.3284271,10 18.5,10 C17.6715729,10 17,10.6715729 17,11.5 C17,12.3284271 17.6715729,13 18.5,13 Z M6,9 L4,9 L4,11 L6,11 L6,13 L8,13 L8,11 L10,11 L10,9 L8,9 L8,7 L6,7 L6,9 Z"
                    })
                );
            }

            function DesktopIcon(props) {
                return h("svg", Object.assign({className: "PI-icon_desktop", width: "24", height: "24"}, props, {viewBox: "0 -2.5 28 28"}),
                    h("path", {
                        fill: "currentColor",
                        d: "M4 2.5C2.897 2.5 2 3.397 2 4.5V15.5C2 16.604 2.897 17.5 4 17.5H11V19.5H7V21.5H17V19.5H13V17.5H20C21.103 17.5 22 16.604 22 15.5V4.5C22 3.397 21.103 2.5 20 2.5H4ZM20 4.5V13.5H4V4.5H20Z"
                    })
                );
            };

            function WebIcon(props) {
                return h("svg", Object.assign({className: "PI-icon_web", width: "24", height: "24"}, props, {viewBox: "0 -2.5 28 28"}),
                    h("path", {
                        fill: "currentColor",
                        d: "M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM11 19.93C7.05 19.44 4 16.08 4 12C4 11.38 4.08 10.79 4.21 10.21L9 15V16C9 17.1 9.9 18 11 18V19.93ZM17.9 17.39C17.64 16.58 16.9 16 16 16H15V13C15 12.45 14.55 12 14 12H8V10H10C10.55 10 11 9.55 11 9V7H13C14.1 7 15 6.1 15 5V4.59C17.93 5.78 20 8.65 20 12C20 14.08 19.2 15.97 17.9 17.39Z"
                    })
                );
            };

            function MobileIcon(props) {
                return h("svg", Object.assign({className: "PI-icon_mobile", width: "24", height: "24", transform: "scale(0.9)"}, props, {viewBox: "0 -2.5 32 44"}),
                    h("path", {
                        fill: "currentColor",
                        d: "M 2.882812 0.246094 C 1.941406 0.550781 0.519531 2.007812 0.230469 2.953125 C 0.0585938 3.542969 0 7.234375 0 17.652344 L 0 31.554688 L 0.5 32.558594 C 1.117188 33.769531 2.152344 34.5625 3.519531 34.847656 C 4.210938 35 7.078125 35.058594 12.597656 35 C 20.441406 34.941406 20.691406 34.925781 21.441406 34.527344 C 22.347656 34.054688 23.078125 33.3125 23.578125 32.386719 C 23.921875 31.761719 23.941406 30.964844 24 18.085938 C 24.039062 8.503906 24 4.167969 23.847656 3.464844 C 23.558594 2.121094 22.75 1.097656 21.519531 0.492188 L 20.5 0 L 12.039062 0.0195312 C 6.402344 0.0390625 3.328125 0.113281 2.882812 0.246094 Z M 20.382812 14.582031 L 20.382812 22.917969 L 3.652344 22.917969 L 3.652344 6.25 L 20.382812 6.25 Z M 13.789062 27.539062 C 14.5 28.296875 14.597656 29.035156 14.132812 29.925781 C 13.308594 31.496094 10.671875 31.421875 9.902344 29.8125 C 9.539062 29.054688 9.539062 28.730469 9.902344 28.011719 C 10.691406 26.535156 12.632812 26.308594 13.789062 27.539062 Z M 13.789062 27.539062 ",
                    })
                );
            }

            const Icons = {
                mobile: MobileIcon,
                web: WebIcon,
                desktop: DesktopIcon,
                embedded: EmbeddedIcon
            };
            const getClass = (props = [], items = props, exclude = [], selector = false) => {
                const module = WebpackModules.getModule(m => m && props.every(prop => m[prop] !== undefined) && exclude.every(e => m[e] == undefined));
                if (!module)
                    return "";
                return (selector ? "." : "") + items.map(item => module[item]).join(selector ? "." : " ");
            };

            const StatusIndicators = function StatusIndicators(props) {
                const iconStates = Flux.useStateFromStoresObject([Settings], () => Settings.get("icons", {}));
                const user = Flux.useStateFromStores([UserStore], () => {
                    const userId = props.userId ?? props.user?.id;
                    return UserStore.getUser(userId);
                });

                const shouldShow = Flux.useStateFromStores([Settings], () => {
                    const shownInArea = Settings.get("showIn" + props.type, true);
                    const isBot = Settings.get("ignoreBots", true) && (user?.bot ?? false);

                    return shownInArea && !isBot;
                });

                const clients = Flux.useStateFromStoresObject([UserStatusStore], () => {
                    if (user?.id === AuthStore.getId()) return SessionsStore.getSession() ? {
                        [SessionsStore.getSession().clientInfo.client]: SessionsStore.getSession().status
                    } : {};

                    return UserStatusStore.getState().clientStatuses[user?.id] ?? {};
                });

                if (!Object.keys(clients).length || !shouldShow || !user) return null;

                return h("div", {
                    className: Utilities.className("PI-indicatorContainer", "PI-type_" + props.type),
                    children: Object.entries(clients)
                        .filter(([key]) => iconStates[key] ?? true)
                        .map(([key, status]) => h(Tooltip, {
                            key,
                            text: StringUtils.upperFirst(key) + ": " + Messages[`STATUS_${(status == "mobile" ? "mobile_online" : status).toUpperCase()}`],
                            position: "top",
                            children: h(Icons[key] ?? (() => null), {
                                style: {color: StatusModule.getStatusColor(status)},
                                width: 18,
                                height: 18,
                                "data-status": status
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

                css = `
                    .PI-indicatorContainer {
                        display: inline-flex;
                        vertical-align: bottom;
                    }

                    .PI-indicatorContainer svg {
                        margin-left: -2px;
                    }

                    .PI-indicatorContainer div:first-child svg {
                        margin-left: 2px;
                    }

                    .PI-container {
                        display: flex;
                    }

                    .PI-type_Chat {margin-bottom: -3px;}

                    .${friendsRowClasses.userInfo} .PI-indicatorContainer > div {display: inline-flex;}

                    .${friendsRowClasses.userInfo} .${friendsRowClasses.discriminator} {
                        display: none;
                        visibility: visible;
                    }

                    .${friendsRowClasses.hovered} .${friendsRowClasses.discriminator} {display: block;}
                `;

                getClients(userId) {
                    const isSelf = userId == AuthStore.getId();
                    const status = isSelf ? currentClientStatus : UserStatusStore.getState().clientStatuses[userId];
                    return status !== null && status !== void 0 ? status : {};
                }

                onStart() {
                    PluginUtilities.addStyle(config.info.name, this.css);
                    Utilities.suppressErrors(this.patchMessageHeader.bind(this), "MessageHeaderPatch")();
                    Utilities.suppressErrors(this.patchMemberListItem.bind(this))();
                    Utilities.suppressErrors(this.patchDmList.bind(this))();
                    Utilities.suppressErrors(this.patchDiscordTag.bind(this))();
                }

                async patchMemberListItem() {
                    const classes = WebpackModules.getByProps("member", "lostPermission");
                    const MemberListItem = await ReactComponents.getComponentByName("MemberListItem", `.${classes.member}`);

                    Patcher.after(MemberListItem.component.prototype, "renderDecorators", ({props}, _, returnValue) => {
                        try {
                            const tree = returnValue?.props?.children;
                            if (!Array.isArray(tree)) return;

                            tree.unshift(
                                h(StatusIndicators, {
                                    user: props.user,
                                    type: "MemberList"
                                })
                            );
                        }
                        catch (error) {
                            Logger.error("Error while patching MemberListItem:", error);
                        }
                    });

                    MemberListItem.forceUpdateAll();
                }

                patchMessageHeader() {
                    const MessageHeader = WebpackModules.getModule(m => m?.default?.toString().indexOf("showTimestampOnHover") > -1);

                    Patcher.after(MessageHeader, "default", (_, [props], returnValue) => {
                        try {
                            const tree = Utilities.getNestedProp(returnValue, "props.username.props.children");
                            if (!Array.isArray(tree)) return;
                            tree.splice(2, 0, h(StatusIndicators, {user: props.message.author, type: "Chat"}));
                        }
                        catch (error) {
                            Logger.error("Error while patching MessageTimestamp:", error);
                        }
                    });
                }

                patchDmList() {
                    const UserContext = React.createContext();
                    const AvatarWithText = WebpackModules.getModule(m => m?.default?.displayName === "AvatarWithText");
                    const {default: PrivateChannel} = WebpackModules.getByProps("DirectMessage");

                    Patcher.after(PrivateChannel.prototype, "render", (_this, _, ret) => {
                        return h(UserContext.Provider, {
                            value: _this.props.user
                        }, ret);
                    });

                    Patcher.before(AvatarWithText, "default", (_, [props]) => {
                        if (!props) return;

                        props.decorators = [
                            props.decorators,
                            h(UserContext.Consumer, {
                                children: user => {
                                    if (!user) return null;

                                    return h(StatusIndicators, {
                                        userId: user.id,
                                        type: "DmsList",
                                        key: `status-indicators-${user.id}`
                                    });
                                }
                            })
                        ];
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
                    Patcher.after(DiscordTag, "default", (_, [{user}], ret) => {
                        return h(UserContext.Provider, {value: user}, ret);
                    });

                    function IndicatorsWrapper() {
                        const user = React.useContext(UserContext);

                        return h(StatusIndicators, {
                            user,
                            type: "Tags"
                        });
                    }

                    Patcher.after(NameTag, "default", (_, [args], ret) => {
                        const tree = ret?.props;
                        if (!Array.isArray(tree.children)) return;

                        try {
                            tree.children.push(h(IndicatorsWrapper, {}));
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
                }
            };
        };
        return plugin(Plugin, Api);
        //@ts-ignore
    })(global.ZeresPluginLibrary.buildPlugin(config));
})();
/*@end@*/
