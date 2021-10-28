/**
 * @name MiniThemes
 * @version 2.0.0
 * @author Strencher
 * @description Adds user status everywhere Discord doesn't.
 * @source https://github.com/Strencher/BetterDiscordStuff/tree/master/MiniThemes
 * @updateUrl https://raw.githubusercontent.com/Strencher/BetterDiscordStuff/master/MiniThemes/MiniThemes.plugin.js
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
/* Generated Code */
const config = {
	"info": {
		"name": "MiniThemes",
		"version": "2.0.0",
		"authors": [{
			"name": "Strencher",
			"discord_id": "415849376598982656",
			"github_username": "Strencher",
			"twitter_username": "Strencher3"
		}],
		"description": "Adds user status everywhere Discord doesn't.",
		"github": "https://github.com/Strencher/BetterDiscordStuff/tree/master/MiniThemes",
		"github_raw": "https://raw.githubusercontent.com/Strencher/BetterDiscordStuff/master/MiniThemes/MiniThemes.plugin.js"
	},
	"build": {
		"zlibrary": true,
		"copy": true,
		"production": false,
		"scssHash": false,
		"alias": {
			"icons": "components/icons",
			"stores": "./modules/stores"
		},
		"release": {
			"public": true,
			"source": true,
			"readme": true
		}
	}
};
function buildPlugin([BasePlugin, PluginApi]) {
	const module = {
		exports: {}
	};
	(() => {
		"use strict";
		class StyleLoader {
			static styles = "";
			static element = null;
			static append(module, css) {
				this.styles += `/* ${module} */\n${css}`;
			}
			static inject(name = config.info.name) {
				if (this.element) this.element.remove();
				this.element = document.head.appendChild(Object.assign(document.createElement("style"), {
					id: name,
					textContent: this.styles
				}));
			}
			static remove() {
				if (this.element) {
					this.element.remove();
					this.element = null;
				}
			}
		}
		function ___createMemoize___(instance, name, value) {
			value = value();
			Object.defineProperty(instance, name, {
				value,
				configurable: true
			});
			return value;
		};
		const Modules = {
			get 'react-spring'() {
				return ___createMemoize___(this, 'react-spring', () => BdApi.findModuleByProps('useSpring'))
			},
			'@discord/utils': {
				get 'joinClassNames'() {
					return ___createMemoize___(this, 'joinClassNames', () => BdApi.findModule(m => typeof m?.default?.default === 'function')?.default)
				},
				get 'useForceUpdate'() {
					return ___createMemoize___(this, 'useForceUpdate', () => BdApi.findModuleByProps('useForceUpdate')?.useForceUpdate)
				},
				get 'Logger'() {
					return ___createMemoize___(this, 'Logger', () => BdApi.findModuleByProps('setLogFn')?.default)
				},
				get 'Navigation'() {
					return ___createMemoize___(this, 'Navigation', () => BdApi.findModuleByProps('replaceWith'))
				}
			},
			'@discord/components': {
				get 'Tooltip'() {
					return ___createMemoize___(this, 'Tooltip', () => BdApi.findModuleByDisplayName('Tooltip'))
				},
				get 'TooltipContainer'() {
					return ___createMemoize___(this, 'TooltipContainer', () => BdApi.findModuleByProps('TooltipContainer')?.TooltipContainer)
				},
				get 'TextInput'() {
					return ___createMemoize___(this, 'TextInput', () => BdApi.findModuleByDisplayName('TextInput'))
				},
				get 'SlideIn'() {
					return ___createMemoize___(this, 'SlideIn', () => BdApi.findModuleByDisplayName('SlideIn'))
				},
				get 'SettingsNotice'() {
					return ___createMemoize___(this, 'SettingsNotice', () => BdApi.findModuleByDisplayName('SettingsNotice'))
				},
				get 'TransitionGroup'() {
					return ___createMemoize___(this, 'TransitionGroup', () => BdApi.findModuleByDisplayName('TransitionGroup'))
				},
				get 'Button'() {
					return ___createMemoize___(this, 'Button', () => BdApi.findModuleByProps('DropdownSizes'))
				},
				get 'Flex'() {
					return ___createMemoize___(this, 'Flex', () => BdApi.findModuleByDisplayName('Flex'))
				},
				get 'Text'() {
					return ___createMemoize___(this, 'Text', () => BdApi.findModuleByDisplayName('Text'))
				},
				get 'Card'() {
					return ___createMemoize___(this, 'Card', () => BdApi.findModuleByDisplayName('Card'))
				}
			},
			'@discord/modules': {
				get 'Dispatcher'() {
					return ___createMemoize___(this, 'Dispatcher', () => BdApi.findModuleByProps('dirtyDispatch', 'subscribe'))
				},
				get 'EmojiUtils'() {
					return ___createMemoize___(this, 'EmojiUtils', () => BdApi.findModuleByProps('uploadEmoji'))
				},
				get 'PermissionUtils'() {
					return ___createMemoize___(this, 'PermissionUtils', () => BdApi.findModuleByProps('computePermissions'))
				},
				get 'DMUtils'() {
					return ___createMemoize___(this, 'DMUtils', () => BdApi.findModuleByProps('openPrivateChannel'))
				}
			},
			'@discord/stores': {
				get 'Messages'() {
					return ___createMemoize___(this, 'Messages', () => BdApi.findModuleByProps('getMessage', 'getMessages'))
				},
				get 'Channels'() {
					return ___createMemoize___(this, 'Channels', () => BdApi.findModuleByProps('getChannel'))
				},
				get 'Guilds'() {
					return ___createMemoize___(this, 'Guilds', () => BdApi.findModuleByProps('getGuild'))
				},
				get 'SelectedGuilds'() {
					return ___createMemoize___(this, 'SelectedGuilds', () => BdApi.findModuleByProps('getGuildId', 'getLastSelectedGuildId'))
				},
				get 'SelectedChannels'() {
					return ___createMemoize___(this, 'SelectedChannels', () => BdApi.findModuleByProps('getChannelId', 'getLastSelectedChannelId'))
				},
				get 'Info'() {
					return ___createMemoize___(this, 'Info', () => BdApi.findModuleByProps('getSessionId'))
				},
				get 'Status'() {
					return ___createMemoize___(this, 'Status', () => BdApi.findModuleByProps('getStatus'))
				},
				get 'Users'() {
					return ___createMemoize___(this, 'Users', () => BdApi.findModuleByProps('getUser', 'getCurrentUser'))
				},
				get 'SettingsStore'() {
					return ___createMemoize___(this, 'SettingsStore', () => BdApi.findModuleByProps('afkTimeout', 'status'))
				},
				get 'UserProfile'() {
					return ___createMemoize___(this, 'UserProfile', () => BdApi.findModuleByProps('getUserProfile'))
				},
				get 'Members'() {
					return ___createMemoize___(this, 'Members', () => BdApi.findModuleByProps('getMember'))
				},
				get 'Activities'() {
					return ___createMemoize___(this, 'Activities', () => BdApi.findModuleByProps('getActivities'))
				},
				get 'Games'() {
					return ___createMemoize___(this, 'Games', () => BdApi.findModuleByProps('getGame'))
				},
				get 'Auth'() {
					return ___createMemoize___(this, 'Auth', () => BdApi.findModuleByProps('getId', 'isGuest'))
				},
				get 'TypingUsers'() {
					return ___createMemoize___(this, 'TypingUsers', () => BdApi.findModuleByProps('isTyping'))
				}
			},
			'@discord/actions': {
				get 'ProfileActions'() {
					return ___createMemoize___(this, 'ProfileActions', () => BdApi.findModuleByProps('fetchProfile'))
				},
				get 'GuildActions'() {
					return ___createMemoize___(this, 'GuildActions', () => BdApi.findModuleByProps('requestMembersById'))
				}
			},
			get '@discord/i18n'() {
				return ___createMemoize___(this, '@discord/i18n', () => BdApi.findModuleByProps('getLocale'))
			},
			get '@discord/constants'() {
				return ___createMemoize___(this, '@discord/constants', () => BdApi.findModuleByProps('API_HOST'))
			},
			get '@discord/contextmenu'() {
				return ___createMemoize___(this, '@discord/contextmenu', () => {
					const ctx = Object.assign({}, BdApi.findModuleByProps('openContextMenu'), BdApi.findModuleByProps('MenuItem'));
					ctx.Menu = ctx.default;
					return ctx;
				})
			},
			get '@discord/forms'() {
				return ___createMemoize___(this, '@discord/forms', () => BdApi.findModuleByProps('FormItem'))
			},
			get '@discord/scrollbars'() {
				return ___createMemoize___(this, '@discord/scrollbars', () => BdApi.findModuleByProps('ScrollerAuto'))
			},
			get '@discord/native'() {
				return ___createMemoize___(this, '@discord/native', () => BdApi.findModuleByProps('requireModule'))
			},
			get '@discord/flux'() {
				return ___createMemoize___(this, '@discord/flux', () => Object.assign({}, BdApi.findModuleByProps('useStateFromStores').default, BdApi.findModuleByProps('useStateFromStores')))
			},
			get '@discord/modal'() {
				return ___createMemoize___(this, '@discord/modal', () => Object.assign({}, BdApi.findModuleByProps('ModalRoot'), BdApi.findModuleByProps('openModal')))
			},
			get '@discord/connections'() {
				return ___createMemoize___(this, '@discord/connections', () => BdApi.findModuleByProps('get', 'isSupported', 'map'))
			},
			get '@discord/sanitize'() {
				return ___createMemoize___(this, '@discord/sanitize', () => BdApi.findModuleByProps('stringify', 'parse', 'encode'))
			},
			get '@discord/icons'() {
				return ___createMemoize___(this, '@discord/icons', () => BdApi.findAllModules(m => m.displayName && ~m.toString().indexOf('currentColor')).reduce((icons, icon) => (icons[icon.displayName] = icon, icons), {}))
			},
			'@discord/classes': {
				get 'Timestamp'() {
					return ___createMemoize___(this, 'Timestamp', () => BdApi.findModuleByPrototypes('toDate', 'month'))
				},
				get 'Message'() {
					return ___createMemoize___(this, 'Message', () => BdApi.findModuleByPrototypes('getReaction', 'isSystemDM'))
				},
				get 'User'() {
					return ___createMemoize___(this, 'User', () => BdApi.findModuleByPrototypes('tag'))
				},
				get 'Channel'() {
					return ___createMemoize___(this, 'Channel', () => BdApi.findModuleByPrototypes('isOwner', 'isCategory'))
				}
			}
		};
		var __webpack_modules__ = {
			434: (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
				__webpack_require__.r(__webpack_exports__);
				__webpack_require__.d(__webpack_exports__, {
					default: () => MiniThemes
				});
				const external_BasePlugin_namespaceObject = BasePlugin;
				var external_BasePlugin_default = __webpack_require__.n(external_BasePlugin_namespaceObject);
				const external_PluginApi_namespaceObject = PluginApi;
				const utils_namespaceObject = Modules["@discord/utils"];
				const external_window_namespaceObject = window._;
				var external_window_default = __webpack_require__.n(external_window_namespaceObject);
				var external_BdApi_React_ = __webpack_require__(832);
				var external_BdApi_React_default = __webpack_require__.n(external_BdApi_React_);
				var React = __webpack_require__(832);
				function _extends() {
					_extends = Object.assign || function(target) {
						for (var i = 1; i < arguments.length; i++) {
							var source = arguments[i];
							for (var key in source)
								if (Object.prototype.hasOwnProperty.call(source, key)) target[key] = source[key];
						}
						return target;
					};
					return _extends.apply(this, arguments);
				}
				function Library(props) {
					return React.createElement("svg", _extends({
						width: "24",
						height: "24",
						viewBox: "0 0 24 24"
					}, props), React.createElement("g", {
						fill: "none",
						"fill-rule": "evenodd"
					}, React.createElement("path", {
						fill: "currentColor",
						d: "M17,13.6 L17.3999992,13.6 C19.0406735,13.6 20.496781,12.8097754 21.4084757,11.5891722 L21.8198761,18.8298199 C21.913864,20.4840062 20.6490733,21.9011814 18.994887,21.9951692 C18.9382174,21.9983891 18.8814679,22 18.8247069,22 L5.1752931,22 C3.51843885,22 2.1752931,20.6568542 2.1752931,19 C2.1752931,18.943239 2.17690401,18.8864895 2.18012387,18.8298199 L2.59152425,11.5891732 C3.503219,12.8097758 4.95932613,13.6 6.6,13.6 L7,13.6 L7,15 L9,15 L9,13.6 L15,13.6 L15,15 L17,15 L17,13.6 Z M7,16 L7,18 L9,18 L9,16 L7,16 Z M15,16 L17,16 L17,18 L15,18 L15,16 Z M15,11.6 L9,11.6 L9,9 L7,9 L7,11.6 L6.6,11.6 C4.94314575,11.6 3.6,10.2568542 3.6,8.6 L3.6,5 C3.6,3.34314575 4.94314575,2 6.6,2 L17.3999992,2 C19.0568535,2 20.3999992,3.34314575 20.3999992,5 L20.3999992,8.6 C20.3999992,10.2568542 19.0568535,11.6 17.3999992,11.6 L17,11.6 L17,9 L15,9 L15,11.6 Z"
					})));
				}
				var store_React = __webpack_require__(832);
				function store_extends() {
					store_extends = Object.assign || function(target) {
						for (var i = 1; i < arguments.length; i++) {
							var source = arguments[i];
							for (var key in source)
								if (Object.prototype.hasOwnProperty.call(source, key)) target[key] = source[key];
						}
						return target;
					};
					return store_extends.apply(this, arguments);
				}
				function Store(props) {
					return store_React.createElement("svg", store_extends({
						width: "24",
						height: "24",
						viewBox: "0 0 616 512"
					}, props), store_React.createElement("path", {
						fill: "currentColor",
						d: "M602 118.6L537.1 15C531.3 5.7 521 0 510 0H106C95 0 84.7 5.7 78.9 15L14 118.6c-33.5 53.5-3.8 127.9 58.8 136.4 4.5.6 9.1.9 13.7.9 29.6 0 55.8-13 73.8-33.1 18 20.1 44.3 33.1 73.8 33.1 29.6 0 55.8-13 73.8-33.1 18 20.1 44.3 33.1 73.8 33.1 29.6 0 55.8-13 73.8-33.1 18.1 20.1 44.3 33.1 73.8 33.1 4.7 0 9.2-.3 13.7-.9 62.8-8.4 92.6-82.8 59-136.4zM529.5 288c-10 0-19.9-1.5-29.5-3.8V384H116v-99.8c-9.6 2.2-19.5 3.8-29.5 3.8-6 0-12.1-.4-18-1.2-5.6-.8-11.1-2.1-16.4-3.6V480c0 17.7 14.3 32 32 32h448c17.7 0 32-14.3 32-32V283.2c-5.4 1.6-10.8 2.9-16.4 3.6-6.1.8-12.1 1.2-18.2 1.2z"
					}));
				}
				function _defineProperty(obj, key, value) {
					if (key in obj) Object.defineProperty(obj, key, {
						value,
						enumerable: true,
						configurable: true,
						writable: true
					});
					else obj[key] = value;
					return obj;
				}
				class ErrorBoundary extends external_BdApi_React_default().Component {
					constructor(...args) {
						super(...args);
						_defineProperty(this, "state", {
							hasError: false,
							error: null,
							info: null,
							didFallbackError: false
						});
					}
					componentDidCatch(error, info) {
						this.setState({
							hasError: true,
							didFallbackError: false,
							info,
							error
						});
						console.error(`[ErrorBoundary:${this.props.id}] HI OVER HERE!! SHOW THIS SCREENSHOT TO THE DEVELOPER.\n`, error);
					}
					render() {
						const {
							fallback: Fallback
						} = this.props;
						if (this.state.hasError && "function" === typeof this.props.fallback && !this.state.didFallbackError) return external_BdApi_React_default().createElement(Fallback, {
							error: this.state.error,
							info: this.state.info
						});
						else if ("function" !== typeof this.props.fallback && this.state.hasError) return external_BdApi_React_default().createElement("div", null, "Component Error");
						else if (this.state.didFallbackError && this.state.hasError) return external_BdApi_React_default().createElement("div", null, "Double Crashed.");
						return this.props.children;
					}
					static from(Component, name, fallback) {
						const id = name ?? Component.displayName ?? Component.name;
						const Element = external_BdApi_React_default().memo((props => external_BdApi_React_default().createElement(ErrorBoundary, {
							id,
							fallback
						}, external_BdApi_React_default().createElement(Component, props))));
						Object.assign(Element, Component);
						return Element;
					}
				}
				var settings = __webpack_require__(827);
				const flux_namespaceObject = Modules["@discord/flux"];
				const modules_namespaceObject = Modules["@discord/modules"];
				const external_require_https_namespaceObject = require("https");
				var external_require_https_default = __webpack_require__.n(external_require_https_namespaceObject);
				function github_defineProperty(obj, key, value) {
					if (key in obj) Object.defineProperty(obj, key, {
						value,
						enumerable: true,
						configurable: true,
						writable: true
					});
					else obj[key] = value;
					return obj;
				}
				const handleData = function(event) {
					snippets = event.data;
				};
				let snippets = [];
				const GithubStore = new class extends flux_namespaceObject.Store {
					constructor() {
						super(modules_namespaceObject.Dispatcher, {
							MINI_THEMES_RECEIVE_DATA: handleData
						});
						github_defineProperty(this, "API_URL", "https://raw.githubusercontent.com/Strencher/BD-MiniThemes/main/snippets.json");
					}
					getState() {
						return snippets;
					}
					async fetchData() {
						external_require_https_default().get(this.API_URL, (res => {
							const data = [];
							res.on("data", (chunk => data.push(chunk)));
							res.on("end", (() => {
								modules_namespaceObject.Dispatcher.dirtyDispatch({
									type: "MINI_THEMES_RECEIVE_DATA",
									data: JSON.parse(data.join(""))
								});
							}));
							res.on("error", (error => {
								external_PluginApi_namespaceObject.Logger.error(error);
								external_PluginApi_namespaceObject.Toasts.error("Failed to fetch MiniThemes API.");
							}));
						}));
					}
				};
				const github = GithubStore;
				const components_namespaceObject = Modules["@discord/components"];
				const modal_namespaceObject = Modules["@discord/modal"];
				const stores_namespaceObject = Modules["@discord/stores"];
				var card = __webpack_require__(582);
				var calendar_React = __webpack_require__(832);
				function calendar_extends() {
					calendar_extends = Object.assign || function(target) {
						for (var i = 1; i < arguments.length; i++) {
							var source = arguments[i];
							for (var key in source)
								if (Object.prototype.hasOwnProperty.call(source, key)) target[key] = source[key];
						}
						return target;
					};
					return calendar_extends.apply(this, arguments);
				}
				function Calendar(props) {
					return calendar_React.createElement("svg", calendar_extends({}, props, {
						xmlns: "http://www.w3.org/2000/svg",
						height: "24",
						viewBox: "0 0 24 24",
						width: "24"
					}), calendar_React.createElement("path", {
						d: "M0 0h24v24H0z",
						fill: "none"
					}), calendar_React.createElement("path", {
						fill: "currentColor",
						d: "M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"
					}));
				}
				var cube_React = __webpack_require__(832);
				function cube_extends() {
					cube_extends = Object.assign || function(target) {
						for (var i = 1; i < arguments.length; i++) {
							var source = arguments[i];
							for (var key in source)
								if (Object.prototype.hasOwnProperty.call(source, key)) target[key] = source[key];
						}
						return target;
					};
					return cube_extends.apply(this, arguments);
				}
				function Cube(props) {
					return cube_React.createElement("svg", cube_extends({}, props, {
						width: "24",
						height: "24",
						xmlns: "http://www.w3.org/2000/svg",
						viewBox: "0 0 36 36"
					}), cube_React.createElement("path", {
						fill: "currentColor",
						d: "M36 32c0 2.209-1.791 4-4 4H4c-2.209 0-4-1.791-4-4V4c0-2.209 1.791-4 4-4h28c2.209 0 4 1.791 4 4v28z"
					}));
				}
				const icons_namespaceObject = Modules["@discord/icons"];
				const external_path_namespaceObject = require("path");
				var external_path_default = __webpack_require__.n(external_path_namespaceObject);
				const package_namespaceObject = JSON.parse('{"u":{"u2":"MiniThemes"}}');
				function injector_defineProperty(obj, key, value) {
					if (key in obj) Object.defineProperty(obj, key, {
						value,
						enumerable: true,
						configurable: true,
						writable: true
					});
					else obj[key] = value;
					return obj;
				}
				const SnippetsInjector = new class extends flux_namespaceObject.Store {
					constructor() {
						super(modules_namespaceObject.Dispatcher, {});
						injector_defineProperty(this, "styleId", package_namespaceObject.u.u2 + "-snippets");
						injector_defineProperty(this, "config", external_PluginApi_namespaceObject.PluginUtilities.loadSettings(package_namespaceObject.u.u2, {
							codes: {}
						}));
					}
					has(url) {
						return Boolean(this.config.codes[url]);
					}
					get css() {
						let css = "",
							values = Object.values(this.config.codes).sort((a => ~a.css.indexOf("@import")));
						for (let i = 0; i < values.length; i++) css += `\n${values[i].css}\n`;
						return css;
					}
					add(url, code, manifestUrl) {
						if (this.config.codes[url]) return;
						this.config.codes[url] = {
							manifestUrl,
							css: code
						};
						this.save();
						this.reload();
					}
					save() {
						external_PluginApi_namespaceObject.PluginUtilities.saveSettings(package_namespaceObject.u.u2, this.config);
					}
					remove(url) {
						delete this.config.codes[url];
						this.save();
						this.reload();
					}
					reload() {
						this.stop();
						this.init();
						this.emitChange();
					}
					stop() {
						BdApi.clearCSS(this.styleId);
					}
					init() {
						BdApi.injectCSS(this.styleId, this.css);
					}
				};
				const injector = SnippetsInjector;
				var github_React = __webpack_require__(832);
				function github_extends() {
					github_extends = Object.assign || function(target) {
						for (var i = 1; i < arguments.length; i++) {
							var source = arguments[i];
							for (var key in source)
								if (Object.prototype.hasOwnProperty.call(source, key)) target[key] = source[key];
						}
						return target;
					};
					return github_extends.apply(this, arguments);
				}
				function Github(props) {
					return github_React.createElement("svg", github_extends({
						viewBox: "0 0 24 24",
						width: "24",
						height: "24"
					}, props), github_React.createElement("path", {
						fill: "currentColor",
						d: "m12 .5c-6.63 0-12 5.28-12 11.792 0 5.211 3.438 9.63 8.205 11.188.6.111.82-.254.82-.567 0-.28-.01-1.022-.015-2.005-3.338.711-4.042-1.582-4.042-1.582-.546-1.361-1.335-1.725-1.335-1.725-1.087-.731.084-.716.084-.716 1.205.082 1.838 1.215 1.838 1.215 1.07 1.803 2.809 1.282 3.495.981.108-.763.417-1.282.76-1.577-2.665-.295-5.466-1.309-5.466-5.827 0-1.287.465-2.339 1.235-3.164-.135-.298-.54-1.497.105-3.121 0 0 1.005-.316 3.3 1.209.96-.262 1.98-.392 3-.398 1.02.006 2.04.136 3 .398 2.28-1.525 3.285-1.209 3.285-1.209.645 1.624.24 2.823.12 3.121.765.825 1.23 1.877 1.23 3.164 0 4.53-2.805 5.527-5.475 5.817.42.354.81 1.077.81 2.182 0 1.578-.015 2.846-.015 3.229 0 .309.21.678.825.56 4.801-1.548 8.236-5.97 8.236-11.173 0-6.512-5.373-11.792-12-11.792z"
					}));
				}
				var card_React = __webpack_require__(832);
				function card_extends() {
					card_extends = Object.assign || function(target) {
						for (var i = 1; i < arguments.length; i++) {
							var source = arguments[i];
							for (var key in source)
								if (Object.prototype.hasOwnProperty.call(source, key)) target[key] = source[key];
						}
						return target;
					};
					return card_extends.apply(this, arguments);
				}
				function card_defineProperty(obj, key, value) {
					if (key in obj) Object.defineProperty(obj, key, {
						value,
						enumerable: true,
						configurable: true,
						writable: true
					});
					else obj[key] = value;
					return obj;
				}
				const sleep = delay => new Promise((resolve => setTimeout(resolve, delay)));
				const randomWidths = [100, 80, 75, 90, 120];
				class Queue {
					constructor(handler, delay = 1e3) {
						card_defineProperty(this, "handler", void 0);
						card_defineProperty(this, "delay", void 0);
						card_defineProperty(this, "queue", []);
						card_defineProperty(this, "running", false);
						this.handler = handler;
						this.delay = delay;
					}
					add(item) {
						if (this.has(item)) return;
						this.queue.push(item);
						if (!this.running) this.runCallbacks();
					}
					has(item) {
						return Boolean(~this.queue.indexOf(item));
					}
					async runCallbacks() {
						this.running = true;
						let item;
						while (item = this.queue.shift()) {
							await this.handler(item);
							await sleep(this.delay);
						}
						this.running = false;
					}
				}
				const cache = {};
				const fetchQueue = new Queue((e => e()), 1e3);
				const AsyncActions = external_PluginApi_namespaceObject.WebpackModules.getByProps("getUser", "acceptAgreements");
				const ImageModal = external_PluginApi_namespaceObject.WebpackModules.getByDisplayName("ImageModal");
				const MaskedLink = external_PluginApi_namespaceObject.WebpackModules.getByDisplayName("MaskedLink");
				const ModalClasses = external_PluginApi_namespaceObject.WebpackModules.find((e => "object" === typeof e && 2 === Object.keys(e).length && e.modal && e.image));
				const joinLink = function(link, path) {
					return link + (string => "/" === string[0] ? string : "/" + string)(path.startsWith("./") ? path.slice(2) : path);
				};
				const showImageModal = async function(src, original = src, width, height, animated, children, placeholder) {
					const bounds = await new Promise((resolve => {
						Object.assign(new Image, {
							src,
							onload: ({
								target
							}) => {
								resolve({
									width: target.naturalWidth,
									height: target.naturalHeight
								});
							},
							onerror: () => resolve({
								width,
								height
							})
						});
					}));
					(0, modal_namespaceObject.openModal)((props => card_React.createElement(modal_namespaceObject.ModalRoot, card_extends({}, props, {
						className: ModalClasses.modal,
						size: modal_namespaceObject.ModalSize.DYNAMIC
					}), card_React.createElement(ImageModal, card_extends({
						src,
						original
					}, bounds, {
						animated,
						children,
						renderLinkComponent: props => card_React.createElement(MaskedLink, props),
						placeholder,
						className: ModalClasses.image,
						shouldAnimate: external_PluginApi_namespaceObject.DiscordModules.WindowInfo.isFocused()
					})))));
				};
				const extractGithubAuthor = function(link) {
					return link.split("/")[3].trim();
				};
				function useFetchAuthor(userId, url = "") {
					const [author, setAuthor] = (0, external_BdApi_React_.useState)({
						username: extractGithubAuthor(url),
						getAvatarURL: () => `https://github.com/${extractGithubAuthor(url)}.png`,
						type: "unresolved"
					});
					(0, external_BdApi_React_.useEffect)((() => {
						if (!url || !userId) return;
						if (stores_namespaceObject.Users.getUser(userId)) setAuthor(stores_namespaceObject.Users.getUser(userId));
						else AsyncActions.getUser(userId).then((res => setAuthor(res))).catch((() => {}));
					}), [url, userId]);
					return url ? author : null;
				}
				function useFetchManifest(manifestUrl) {
					const [manifest, setManifest] = (0, external_BdApi_React_.useState)(cache[manifestUrl]);
					(0, external_BdApi_React_.useEffect)((() => {
						if (manifest) return;
						fetchQueue.add((() => {
							fetch(manifestUrl).then((res => res.json()), console.error).then((res => {
								cache[manifestUrl] = res;
								setManifest(res);
							}), console.error);
						}));
					}), [manifestUrl]);
					return manifest ?? {};
				}
				function SwitchableBanner({
					previews
				}) {
					if (!previews) previews = [];
					const [index, setIndex] = (0, external_BdApi_React_.useState)(0);
					const showBanner = () => {
						if (!previews.length) return;
						showImageModal(previews[index], previews[index], 0, 0, previews[index]?.endsWith(".gif"), null, previews[index]);
					};
					return card_React.createElement("div", {
						className: card.Z.BannerViewer
					}, card_React.createElement(components_namespaceObject.Tooltip, null, (props => {
						const disabled = previews.length < 2 || 0 === index;
						return !disabled ? card_React.createElement(components_namespaceObject.Button, card_extends({}, props, {
							className: (0, utils_namespaceObject.joinClassNames)(card.Z.NavigateButton, card.Z.NavigateButtonLeft),
							look: components_namespaceObject.Button.Looks.BLANK,
							size: components_namespaceObject.Button.Sizes.NONE,
							disabled,
							onClick: () => setIndex((index => index - 1))
						}), card_React.createElement(icons_namespaceObject.Arrow, {
							direction: icons_namespaceObject.Arrow.Directions.LEFT
						})) : null;
					})), card_React.createElement("div", {
						onClick: showBanner,
						className: card.Z.Banner,
						style: {
							backgroundImage: `url(${previews?.[index] ?? "https://betterdiscord.app/resources/store/missing.svg"})`
						}
					}), card_React.createElement(components_namespaceObject.Tooltip, null, (props => {
						const disabled = index >= previews.length - 1 || previews.length < 2;
						return !disabled ? card_React.createElement(components_namespaceObject.Button, card_extends({}, props, {
							className: (0, utils_namespaceObject.joinClassNames)(card.Z.NavigateButton, card.Z.NavigateButtonRight),
							look: components_namespaceObject.Button.Looks.BLANK,
							size: components_namespaceObject.Button.Sizes.NONE,
							disabled,
							onClick: () => setIndex((index => index + 1))
						}), card_React.createElement(icons_namespaceObject.Arrow, {
							direction: icons_namespaceObject.Arrow.Directions.RIGHT
						})) : null;
					})));
				}
				function Card({
					url
				}) {
					const manifest = useFetchManifest(url);
					const author = useFetchAuthor(manifest?.authorId, url);
					const link = joinLink(external_path_default().dirname(url), manifest?.main ?? "");
					const hasSnippet = (0, flux_namespaceObject.useStateFromStores)([injector], (() => injector.has(link)));
					return card_React.createElement("div", {
						className: (0, utils_namespaceObject.joinClassNames)(card.Z.CardItem, null == manifest && card.Z.Fetching)
					}, card_React.createElement("div", {
						className: card.Z.Header
					}, card_React.createElement(SwitchableBanner, {
						previews: manifest?.previews
					}), card_React.createElement(components_namespaceObject.TooltipContainer, {
						text: author.username,
						position: "top",
						className: card.Z.AvatarContainer
					}, card_React.createElement("img", {
						className: card.Z.Avatar,
						src: author.getAvatarURL()
					})), card_React.createElement("div", {
						className: card.Z.ToolsContainer
					}, null == manifest ? card_React.createElement(Cube, {
						className: card.Z.Loading
					}) : card_React.createElement(components_namespaceObject.Tooltip, {
						text: "Added: " + new Date(manifest.added).toLocaleString(),
						tooltipClassName: card.Z.dateTooltip
					}, (props => card_React.createElement(Calendar, props))))), card_React.createElement("div", {
						className: card.Z.Body
					}, card_React.createElement("div", {
						className: card.Z.Name
					}, null == manifest ? card_React.createElement("div", {
						className: card.Z.Bubble,
						style: {
							width: randomWidths[Math.floor(Math.random() * randomWidths.length)]
						}
					}) : manifest.name), card_React.createElement("div", {
						className: card.Z.Description
					}, null == manifest ? [...new Array(Math.floor(4 * Math.random()) || 2)].map(((_, i) => card_React.createElement("div", {
						className: card.Z.Bubble,
						key: i,
						style: {
							width: 2 * randomWidths[Math.floor(Math.random() * randomWidths.length)]
						}
					}))) : manifest.description)), card_React.createElement("div", {
						className: card.Z.Footer
					}, card_React.createElement("div", null, manifest?.github && ((name, url, icon) => card_React.createElement(components_namespaceObject.Tooltip, {
						text: name
					}, (props => card_React.createElement(components_namespaceObject.Button, card_extends({}, props, {
						className: card.Z.LinkButton,
						size: components_namespaceObject.Button.Sizes.NONE,
						look: components_namespaceObject.Button.Looks.BLANK,
						onClick: () => open(url, "_blank")
					}), icon))))("Github", manifest.github, card_React.createElement(Github, null))), card_React.createElement("div", null, card_React.createElement(components_namespaceObject.Button, {
						size: components_namespaceObject.Button.Sizes.SMALL,
						disabled: null == manifest,
						color: hasSnippet ? components_namespaceObject.Button.Colors.RED : components_namespaceObject.Button.Colors.BRAND,
						onClick: () => {
							const action = {
								install: () => {
									try {
										fetch(link).then((res => res.text()), console.error).then((text => {
											injector.add(link, text, url);
										}));
									} catch (error) {
										external_PluginApi_namespaceObject.Logger.error("Failed to add snippet:\n", error);
									}
								},
								remove: () => {
									injector.remove(link);
								}
							} [hasSnippet ? "remove" : "install"];
							action();
						}
					}, hasSnippet ? "Uninstall" : "Install"))));
				}
				const SearchBar = external_PluginApi_namespaceObject.WebpackModules.getByDisplayName("SearchBar");
				const classes = external_PluginApi_namespaceObject.WebpackModules.getByProps("desaturate", "searchResultsWrap");
				function InstalledSnippets({
					query
				}) {
					const codes = (0, flux_namespaceObject.useStateFromStoresObject)([injector], (() => {
						console.log("load");
						return external_window_default().cloneDeep(injector.config.codes);
					}));
					const snippets = (() => {
						let state = external_window_default()(Object.values(codes).map((e => e.manifestUrl)));
						const tester = new RegExp(external_window_default().escape(query), "i");
						if (query) state = state.filter((link => cache[link] ? tester.test(cache[link].name) || tester.test(cache[link].description) : true));
						return state.value();
					})();
					return snippets.length ? snippets.map((url => external_BdApi_React_default().createElement(Card, {
						url,
						key: url
					}))) : external_BdApi_React_default().createElement("div", {
						className: (0, utils_namespaceObject.joinClassNames)(classes.emptyResultsContent, settings.Z.noResult)
					}, external_BdApi_React_default().createElement("div", {
						className: (0, utils_namespaceObject.joinClassNames)(classes.desaturate, classes.noResultsImage)
					}), external_BdApi_React_default().createElement("div", {
						className: (0, utils_namespaceObject.joinClassNames)(classes.emptyResultsText, classes.noResults)
					}, query ? "No results found for query '" + query + "'" : "You didn't install any snippets yet."));
				}
				function ExploreSnippets({
					query
				}) {
					const snippets = (0, flux_namespaceObject.useStateFromStoresArray)([github], (() => {
						let state = external_window_default()(github.getState());
						if (!state.size()) github.fetchData();
						const tester = new RegExp(external_window_default().escape(query), "i");
						if (query) state = state.filter((link => cache[link] ? tester.test(cache[link].name) || tester.test(cache[link].description) : true));
						return state.value();
					}), [query]);
					return snippets.length ? snippets.map((url => external_BdApi_React_default().createElement(Card, {
						url,
						key: url
					}))) : external_BdApi_React_default().createElement("div", {
						className: (0, utils_namespaceObject.joinClassNames)(classes.emptyResultsContent, settings.Z.noResult)
					}, external_BdApi_React_default().createElement("div", {
						className: (0, utils_namespaceObject.joinClassNames)(classes.desaturate, classes.noResultsImage)
					}), external_BdApi_React_default().createElement("div", {
						className: (0, utils_namespaceObject.joinClassNames)(classes.emptyResultsText, classes.noResults)
					}, query ? "No results found for query '" + query + "'" : "There aren't any snippets yet."));
				}
				const Tabs = {
					explore: {
						Component: ExploreSnippets,
						icon: Store
					},
					installed: {
						Component: InstalledSnippets,
						icon: Library
					}
				};
				function TabItem({
					label,
					onClick,
					selected = false,
					icon = null
				}) {
					return external_BdApi_React_default().createElement("div", {
						className: (0, utils_namespaceObject.joinClassNames)(settings.Z.TabItem, selected && settings.Z.Selected),
						onClick
					}, icon && external_BdApi_React_default().createElement("div", {
						className: settings.Z.IconContainer
					}, icon), external_BdApi_React_default().createElement("div", {
						className: settings.Z.Name
					}, label));
				}
				function MiniThemesSettings() {
					const [selectedTab, setTab] = (0, external_BdApi_React_.useState)("installed");
					const Component = (0, external_BdApi_React_.useMemo)((() => Tabs[selectedTab].Component ?? (() => null)), [selectedTab, Tabs]);
					const [query, setQuery] = (0, external_BdApi_React_.useState)("");
					return external_BdApi_React_default().createElement("div", {
						className: settings.Z.ContentPage
					}, external_BdApi_React_default().createElement("div", {
						className: settings.Z.Title
					}, "Mini Themes"), external_BdApi_React_default().createElement("div", {
						className: settings.Z.HeaderBar
					}, Object.keys(Tabs).map((tabId => external_BdApi_React_default().createElement(TabItem, {
						selected: selectedTab === tabId,
						icon: Tabs[tabId].Icon,
						onClick: setTab.bind(null, tabId),
						label: external_window_default().upperFirst(tabId),
						key: tabId
					}))), external_BdApi_React_default().createElement(SearchBar, {
						onChange: setQuery,
						onClear: setQuery.bind(null, ""),
						placeholder: "Search Snippets...",
						query,
						size: SearchBar.Sizes.SMALL,
						className: settings.Z.SearchBar
					})), external_BdApi_React_default().createElement("div", {
						className: settings.Z.TabContent
					}, external_BdApi_React_default().createElement(ErrorBoundary, {
						id: "MiniThemes"
					}, external_BdApi_React_default().createElement(Component, {
						query
					}))));
				}
				const external_StyleLoader_namespaceObject = StyleLoader;
				var external_StyleLoader_default = __webpack_require__.n(external_StyleLoader_namespaceObject);
				var MiniThemes_React = __webpack_require__(832);
				class MiniThemes extends(external_BasePlugin_default()) {
					onStart() {
						this.patchSettingsView();
						external_StyleLoader_default().inject();
						injector.init();
					}
					async patchSettingsView() {
						const SettingsView = external_PluginApi_namespaceObject.WebpackModules.getByDisplayName("SettingsView");
						external_PluginApi_namespaceObject.Patcher.after(SettingsView.prototype, "getPredicateSections", ((_this, _, res) => {
							if (!Array.isArray(res) || !res.some((s => "changelog" === s?.section?.toLowerCase())) || res.some((s => "mini-themes" === s.id))) return;
							const index = res.findIndex((s => "changelog" === s.section.toLowerCase())) - 1;
							if (index < 0) return;
							res.splice(index, 0, {
								id: "mini-themes",
								section: "MiniThemes",
								label: "MiniThemes",
								className: "mini-themes-tab",
								element: () => MiniThemes_React.createElement(MiniThemesSettings, null)
							});
						}));
					}
					destroyStore(dispatchToken) {
						modules_namespaceObject.Dispatcher._dependencyGraph.removeNode(dispatchToken);
						modules_namespaceObject.Dispatcher._invalidateCaches();
					}
					onStop() {
						external_StyleLoader_default().remove();
						external_PluginApi_namespaceObject.Patcher.unpatchAll();
						injector.stop();
						this.destroyStore(injector.getDispatchToken());
						this.destroyStore(github.getDispatchToken());
					}
				}
			},
			246: module => {
				module.exports = function(cssWithMappingToString) {
					var list = [];
					list.toString = function() {
						return this.map((function(item) {
							var content = cssWithMappingToString(item);
							if (item[2]) return "@media ".concat(item[2], " {").concat(content, "}");
							return content;
						})).join("");
					};
					list.i = function(modules, mediaQuery, dedupe) {
						if ("string" === typeof modules) modules = [
							[null, modules, ""]
						];
						var alreadyImportedModules = {};
						if (dedupe)
							for (var i = 0; i < this.length; i++) {
								var id = this[i][0];
								if (null != id) alreadyImportedModules[id] = true;
							}
						for (var _i = 0; _i < modules.length; _i++) {
							var item = [].concat(modules[_i]);
							if (dedupe && alreadyImportedModules[item[0]]) continue;
							if (mediaQuery)
								if (!item[2]) item[2] = mediaQuery;
								else item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
							list.push(item);
						}
					};
					return list;
				};
			},
			582: (module, __webpack_exports__, __webpack_require__) => {
				__webpack_require__.d(__webpack_exports__, {
					Z: () => __WEBPACK_DEFAULT_EXPORT__
				});
				var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(246);
				var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = __webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
				var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()((function(i) {
					return i[1];
				}));
				___CSS_LOADER_EXPORT___.push([module.id, '.MiniThemes-card-CardItem{color:#ddd;display:flex;flex-direction:column;height:320px;border-radius:8px;position:relative;overflow:hidden;--background: var(--background-secondary-alt);background:var(--background);transition:box-shadow .2s ease-out,transform .2s ease-out,background .2s ease-out,opacity .2s ease-in,-webkit-box-shadow .2s ease-out,-webkit-transform .2s ease-out}.MiniThemes-card-CardItem:hover{transform:translateY(-1px);box-shadow:var(--elevation-high);--background: var(--background-tertiary)}.MiniThemes-card-CardItem:hover .MiniThemes-card-NavigateButton{opacity:1 !important}.MiniThemes-card-CardItem .MiniThemes-card-Header{position:relative;height:125px}.MiniThemes-card-CardItem .MiniThemes-card-Header .MiniThemes-card-NavigateButton{transition:opacity .4s;opacity:0;position:absolute;top:0}.MiniThemes-card-CardItem .MiniThemes-card-Header .MiniThemes-card-NavigateButtonRight{right:0}.MiniThemes-card-CardItem .MiniThemes-card-Header .MiniThemes-card-NavigateButtonLeft{left:0}.MiniThemes-card-CardItem .MiniThemes-card-Header .MiniThemes-card-Banner{cursor:pointer;width:100%;height:100px;background-size:cover;background-repeat:no-repeat}.MiniThemes-card-CardItem .MiniThemes-card-Header .MiniThemes-card-ToolsContainer{position:absolute;right:10px;bottom:-15px}.MiniThemes-card-CardItem .MiniThemes-card-Header .MiniThemes-card-AvatarContainer{transition:box-shadow .2s ease-out,transform .2s ease-out,background .2s ease-out,opacity .2s ease-in,-webkit-box-shadow .2s ease-out,-webkit-transform .2s ease-out;transform:translate(20px, -35px);width:50px;height:50px;display:flex;align-items:center;justify-content:center;background:var(--background);padding:5px;border-radius:8px}.MiniThemes-card-CardItem .MiniThemes-card-Header .MiniThemes-card-AvatarContainer .MiniThemes-card-Avatar{border-radius:8px;width:42px;height:42px}.MiniThemes-card-CardItem .MiniThemes-card-Body{padding:0 10px;display:block}.MiniThemes-card-CardItem .MiniThemes-card-Body .MiniThemes-card-Name{font-weight:700}.MiniThemes-card-CardItem .MiniThemes-card-Body .MiniThemes-card-Description{font-size:12px;margin-top:10px;border-top:thin solid var(--background-modifier-accent);padding-top:10px}.MiniThemes-card-CardItem .MiniThemes-card-Body .MiniThemes-card-Description .MiniThemes-card-Bubble{margin:10px 0}.MiniThemes-card-CardItem .MiniThemes-card-Footer{padding:10px;margin-top:auto;display:block;display:flex;align-items:center;justify-content:space-between}.MiniThemes-card-CardItem .MiniThemes-card-Footer .MiniThemes-card-LinkButton{color:#ddd}.MiniThemes-card-CardItem.MiniThemes-card-Fetching{content:""}.MiniThemes-card-CardItem:not(:first-child){margin-top:10px}.MiniThemes-card-dateTooltip{max-width:250px}.MiniThemes-card-Bubble{width:100px;height:15px;background:var(--background-primary);border-radius:10px;animation:MiniThemes-card-BubbleBubble ease-in-out 2s infinite}.MiniThemes-card-Loading{color:var(--background-primary);animation:MiniThemes-card-BubbleBubble ease-in-out 2s infinite}@keyframes MiniThemes-card-BubbleBubble{0%{opacity:.6}50%{opacity:.3}100%{opacity:.6}}', ""]);
				___CSS_LOADER_EXPORT___.locals = {
					CardItem: "MiniThemes-card-CardItem",
					NavigateButton: "MiniThemes-card-NavigateButton",
					Header: "MiniThemes-card-Header",
					NavigateButtonRight: "MiniThemes-card-NavigateButtonRight",
					NavigateButtonLeft: "MiniThemes-card-NavigateButtonLeft",
					Banner: "MiniThemes-card-Banner",
					ToolsContainer: "MiniThemes-card-ToolsContainer",
					AvatarContainer: "MiniThemes-card-AvatarContainer",
					Avatar: "MiniThemes-card-Avatar",
					Body: "MiniThemes-card-Body",
					Name: "MiniThemes-card-Name",
					Description: "MiniThemes-card-Description",
					Bubble: "MiniThemes-card-Bubble",
					Footer: "MiniThemes-card-Footer",
					LinkButton: "MiniThemes-card-LinkButton",
					Fetching: "MiniThemes-card-Fetching",
					dateTooltip: "MiniThemes-card-dateTooltip",
					BubbleBubble: "MiniThemes-card-BubbleBubble",
					Loading: "MiniThemes-card-Loading"
				};
				StyleLoader.append(module.id, ___CSS_LOADER_EXPORT___.toString());
				const __WEBPACK_DEFAULT_EXPORT__ = Object.assign(___CSS_LOADER_EXPORT___, ___CSS_LOADER_EXPORT___.locals);
			},
			827: (module, __webpack_exports__, __webpack_require__) => {
				__webpack_require__.d(__webpack_exports__, {
					Z: () => __WEBPACK_DEFAULT_EXPORT__
				});
				var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(246);
				var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = __webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
				var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()((function(i) {
					return i[1];
				}));
				___CSS_LOADER_EXPORT___.push([module.id, ".MiniThemes-settings-ContentPage{color:#ddd;display:block}.MiniThemes-settings-ContentPage .MiniThemes-settings-Title{margin-bottom:20px;font-weight:bold;font-size:25px;font-family:var(--font-display)}.MiniThemes-settings-ContentPage .MiniThemes-settings-TabContent{margin-top:20px}.MiniThemes-settings-ContentPage .MiniThemes-settings-HeaderBar{display:flex;border-bottom:2px solid var(--background-modifier-active)}.MiniThemes-settings-ContentPage .MiniThemes-settings-HeaderBar>:first-child{padding-left:0 !important;margin-left:0 !important}.MiniThemes-settings-ContentPage .MiniThemes-settings-HeaderBar>:first-child .MiniThemes-settings-Name{padding-left:8px}.MiniThemes-settings-ContentPage .MiniThemes-settings-HeaderBar .MiniThemes-settings-TabItem{position:relative;bottom:-2px;padding:10px 8px;margin:0 5px;cursor:pointer;transition:.3s;border-bottom:2px solid transparent}.MiniThemes-settings-ContentPage .MiniThemes-settings-HeaderBar .MiniThemes-settings-TabItem .MiniThemes-settings-IconContainer{margin-right:5px;width:20px;height:20px}.MiniThemes-settings-ContentPage .MiniThemes-settings-HeaderBar .MiniThemes-settings-TabItem .MiniThemes-settings-Name{font-weight:500}.MiniThemes-settings-ContentPage .MiniThemes-settings-HeaderBar .MiniThemes-settings-TabItem.MiniThemes-settings-Selected{color:var(--interactive-active);border-bottom-color:var(--brand-experiment)}.MiniThemes-settings-ContentPage .MiniThemes-settings-HeaderBar .MiniThemes-settings-SearchBar{margin-left:auto;height:25px;max-width:200px;bottom:-5px;position:relative}", ""]);
				___CSS_LOADER_EXPORT___.locals = {
					ContentPage: "MiniThemes-settings-ContentPage",
					Title: "MiniThemes-settings-Title",
					TabContent: "MiniThemes-settings-TabContent",
					HeaderBar: "MiniThemes-settings-HeaderBar",
					Name: "MiniThemes-settings-Name",
					TabItem: "MiniThemes-settings-TabItem",
					IconContainer: "MiniThemes-settings-IconContainer",
					Selected: "MiniThemes-settings-Selected",
					SearchBar: "MiniThemes-settings-SearchBar"
				};
				StyleLoader.append(module.id, ___CSS_LOADER_EXPORT___.toString());
				const __WEBPACK_DEFAULT_EXPORT__ = Object.assign(___CSS_LOADER_EXPORT___, ___CSS_LOADER_EXPORT___.locals);
			},
			832: module => {
				module.exports = BdApi.React;
			}
		};
		var __webpack_module_cache__ = {};
		function __webpack_require__(moduleId) {
			var cachedModule = __webpack_module_cache__[moduleId];
			if (void 0 !== cachedModule) return cachedModule.exports;
			var module = __webpack_module_cache__[moduleId] = {
				id: moduleId,
				exports: {}
			};
			__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
			return module.exports;
		}
		(() => {
			__webpack_require__.n = module => {
				var getter = module && module.__esModule ? () => module["default"] : () => module;
				__webpack_require__.d(getter, {
					a: getter
				});
				return getter;
			};
		})();
		(() => {
			__webpack_require__.d = (exports, definition) => {
				for (var key in definition)
					if (__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) Object.defineProperty(exports, key, {
						enumerable: true,
						get: definition[key]
					});
			};
		})();
		(() => {
			__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop);
		})();
		(() => {
			__webpack_require__.r = exports => {
				if ("undefined" !== typeof Symbol && Symbol.toStringTag) Object.defineProperty(exports, Symbol.toStringTag, {
					value: "Module"
				});
				Object.defineProperty(exports, "__esModule", {
					value: true
				});
			};
		})();
		var __webpack_exports__ = __webpack_require__(434);
		module.exports.LibraryPluginHack = __webpack_exports__;
	})();
	const PluginExports = module.exports.LibraryPluginHack;
	return PluginExports?.__esModule ? PluginExports.default : PluginExports;
}
module.exports = window.hasOwnProperty("ZeresPluginLibrary") ?
	buildPlugin(window.ZeresPluginLibrary.buildPlugin(config)) :
	class {
		getName() {
			return config.info.name;
		}
		getAuthor() {
			return config.info.authors.map(a => a.name).join(", ");
		}
		getDescription() {
			return `${config.info.description}. __**ZeresPluginLibrary was not found! This plugin will not work!**__`;
		}
		getVersion() {
			return config.info.version;
		}
		load() {
			BdApi.showConfirmationModal(
				"Library plugin is needed",
				[`The library plugin needed for ${config.info.name} is missing. Please click Download to install it.`], {
					confirmText: "Download",
					cancelText: "Cancel",
					onConfirm: () => {
						require("request").get("https://rauenzi.github.io/BDPluginLibrary/release/0PluginLibrary.plugin.js", async (error, response, body) => {
							if (error) return require("electron").shell.openExternal("https://betterdiscord.net/ghdl?url=https://raw.githubusercontent.com/rauenzi/BDPluginLibrary/master/release/0PluginLibrary.plugin.js");
							await new Promise(r => require("fs").writeFile(require("path").join(BdApi.Plugins.folder, "0PluginLibrary.plugin.js"), body, r));
						});
					}
				}
			);
		}
		start() {}
		stop() {}
	};
/*@end@*/