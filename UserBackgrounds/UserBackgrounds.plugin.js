/**
 * @name UserBackgrounds
 * @version 1.3.0
 * @description A database of custom user requested backgrounds designed for BetterDiscord and Powercord.
 * @author Strencher, Tropical
 * @source https://github.com/Strencher/BetterDiscordStuff/tree/development/UserBackgrounds
 * @updateUrl https://raw.githubusercontent.com/Strencher/BetterDiscordStuff/master/UserBackgrounds/UserBackgrounds.plugin.js
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
/* Generated Code */
const config = {
	"info": {
		"name": "UserBackgrounds",
		"version": "1.3.0",
		"description": "A database of custom user requested backgrounds designed for BetterDiscord and Powercord.",
		"authors": [{
				"name": "Strencher",
				"discord_id": "415849376598982656",
				"github_username": "Strencher",
				"twitter_username": "Strencher3"
			},
			{
				"name": "Tropical",
				"discord_id": "254362351170617345",
				"github_username": "Tropix126"
			}
		],
		"github": "https://github.com/Strencher/BetterDiscordStuff/tree/development/UserBackgrounds",
		"github_raw": "https://raw.githubusercontent.com/Strencher/BetterDiscordStuff/master/UserBackgrounds/UserBackgrounds.plugin.js",
		"invite": "gvA2ree"
	},
	"changelog": [{
		"type": "fixed",
		"title": "fixed",
		"items": [
			"Fixed loading native banners."
		]
	}],
	"build": {
		"zlibrary": true,
		"copy": true,
		"production": false,
		"alias": {
			"components": "components/index.js"
		},
		"release": {
			"source": true,
			"readme": true,
			"contributors": [{
					"name": "Tropical",
					"github": "https://github.com/Tropix126"
				},
				{
					"name": "_david_",
					"github": "https://github.com/dav1312"
				}
			]
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
			440: (module, __webpack_exports__, __webpack_require__) => {
				__webpack_require__.d(__webpack_exports__, {
					Z: () => __WEBPACK_DEFAULT_EXPORT__
				});
				var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(645);
				var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = __webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
				var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()((function(i) {
					return i[1];
				}));
				___CSS_LOADER_EXPORT___.push([module.id, ".UserBackgrounds-banner-arrow{position:absolute;top:0;z-index:99;padding-top:20px;padding-bottom:20px}.UserBackgrounds-banner-arrow svg{color:var(--interactive-normal)}.UserBackgrounds-banner-arrow.UserBackgrounds-banner-left{left:0}.UserBackgrounds-banner-arrow.UserBackgrounds-banner-right{right:0}.UserBackgrounds-banner-container{display:flex;position:relative}.UserBackgrounds-banner-badge{position:absolute;bottom:10px;right:10px;z-index:99}.accountProfileCard-1XCH88>.UserBackgrounds-banner-container{height:100px}.accountProfileCard-1XCH88 .UserBackgrounds-banner-badge+div,.accountProfileCard-1XCH88 .UserBackgrounds-banner-left+div{width:100%;background:center/cover}", ""]);
				___CSS_LOADER_EXPORT___.locals = {
					arrow: "UserBackgrounds-banner-arrow",
					left: "UserBackgrounds-banner-left",
					right: "UserBackgrounds-banner-right",
					container: "UserBackgrounds-banner-container",
					badge: "UserBackgrounds-banner-badge"
				};
				StyleLoader.append(module.id, ___CSS_LOADER_EXPORT___.toString());
				const __WEBPACK_DEFAULT_EXPORT__ = Object.assign(___CSS_LOADER_EXPORT___, ___CSS_LOADER_EXPORT___.locals);
			},
			699: (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
				__webpack_require__.r(__webpack_exports__);
				__webpack_require__.d(__webpack_exports__, {
					default: () => UserBackgrounds
				});
				const external_BasePlugin_namespaceObject = BasePlugin;
				var external_BasePlugin_default = __webpack_require__.n(external_BasePlugin_namespaceObject);
				const external_PluginApi_namespaceObject = PluginApi;
				const flux_namespaceObject = Modules["@discord/flux"];
				const modules_namespaceObject = Modules["@discord/modules"];
				const external_require_https_namespaceObject = require("https");
				const utils_namespaceObject = Modules["@discord/utils"];
				const extractRegex = /data-user-id="(.+)"/g;
				class Converter {
					static extractUserIds(selector) {
						const map = selector.split(",").map((attr => {
							const result = extractRegex.exec(attr);
							if (!result?.[1]) return null;
							return result[1];
						})).filter((e => e));
						return [...new Set(map)];
					}
					static async convert(css) {
						const start = Date.now();
						let output = new Map;
						const sheet = new CSSStyleSheet({
							media: "print"
						});
						const style = await sheet.replace(css);
						for (const cssRule of [...style.cssRules]) {
							const userIds = this.extractUserIds(cssRule.selectorText);
							for (const id of userIds) {
								const bgData = {
									background: cssRule.style.getPropertyValue("--user-background").slice(5, -2)
								};
								if (cssRule.style.getPropertyValue("--")) bgData.orientation = cssRule.style.getPropertyValue("--user-popout-position");
								output.set(id, bgData);
							}
						}
						external_PluginApi_namespaceObject.Logger.log(`Compiled database (css -> json) in ${(Date.now() - start).toFixed(0)}ms.`);
						return output;
					}
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
				let banners = new Map;
				const bannerStore = new class extends flux_namespaceObject.Store {
					constructor() {
						super(modules_namespaceObject.Dispatcher, {});
						_defineProperty(this, "logger", new utils_namespaceObject.Logger(this.constructor.name));
						_defineProperty(this, "intervalTimer", 36e5);
						_defineProperty(this, "_interval", void 0);
						_defineProperty(this, "API_URL", "https://black-cube-web.vercel.app/api/css");
						_defineProperty(this, "fetchBanners", (() => {
							(0, external_require_https_namespaceObject.get)(this.API_URL, (res => {
								const chunks = [];
								res.on("data", (chunk => chunks.push(chunk)));
								res.on("end", (async () => {
									try {
										banners = await Converter.convert(chunks.join(""));
										this.emitChange();
									} catch (error) {
										this.logger.error(error);
									}
								}));
								res.on("error", (error => this.logger.error(error)));
							}));
						}));
					}
					destroy() {
						if (!this._initialized) return;
						clearInterval(this._interval);
					}
					getState() {
						return banners;
					}
					initialize() {
						this._initialized = true;
						this._interval = setInterval(this.fetchBanners, this.intervalTimer);
						this.fetchBanners();
					}
					getBannerURL(userId) {
						return banners.get(userId)?.background;
					}
					getBanner(userId) {
						return banners.get(userId);
					}
					hasBanner(userId) {
						return banners.has(userId);
					}
				};
				function settings_defineProperty(obj, key, value) {
					if (key in obj) Object.defineProperty(obj, key, {
						value,
						enumerable: true,
						configurable: true,
						writable: true
					});
					else obj[key] = value;
					return obj;
				}
				class SettingsManager extends flux_namespaceObject.Store {
					constructor(pluginName, defaultSettings = {}) {
						super(modules_namespaceObject.Dispatcher, {});
						settings_defineProperty(this, "settings", void 0);
						settings_defineProperty(this, "pluginName", void 0);
						settings_defineProperty(this, "get", ((key, defaultValue) => this.settings[key] ?? defaultValue));
						settings_defineProperty(this, "set", ((key, value) => {
							this.settings[key] = value;
							external_PluginApi_namespaceObject.PluginUtilities.saveSettings(this.pluginName, this.settings);
							this.emitChange();
							return value;
						}));
						this.pluginName = pluginName;
						this.settings = external_PluginApi_namespaceObject.PluginUtilities.loadSettings(pluginName, defaultSettings);
					}
				}
				const package_namespaceObject = JSON.parse('{"um":{"u2":"UserBackgrounds"}}');
				const Settings = new SettingsManager(package_namespaceObject.um.u2);
				const settings = Settings;
				const external_window_namespaceObject = window._;
				var external_window_default = __webpack_require__.n(external_window_namespaceObject);
				function switchCase(caze, cases, defaultValue) {
					for (const caseTest of cases)
						if (Array.isArray(caseTest)) {
							const [tester, value] = caseTest;
							if ("function" === typeof tester) {
								if (tester(caze)) {
									if ("function" === typeof value) return value(caze);
									return value;
								}
							} else if (Object.is(caze, tester)) {
								if ("function" === typeof value) return value(caze);
								return value;
							}
						} else if ("object" === typeof caseTest)
						if ("function" === typeof caseTest.test) {
							if (caseTest.test(caze)) return caseTest.value;
						} else if (Object.is(caze, caseTest.test)) return caseTest.value;
					return defaultValue;
				}
				const external_BdApi_React_namespaceObject = BdApi.React;
				var external_BdApi_React_default = __webpack_require__.n(external_BdApi_React_namespaceObject);
				function errorboundary_defineProperty(obj, key, value) {
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
						errorboundary_defineProperty(this, "state", {
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
				var UserBackgrounds_banner = __webpack_require__(440);
				const external_StyleLoader_namespaceObject = StyleLoader;
				var external_StyleLoader_default = __webpack_require__.n(external_StyleLoader_namespaceObject);
				const components_namespaceObject = Modules["@discord/components"];
				const constants_namespaceObject = Modules["@discord/constants"];
				const contextmenu_namespaceObject = Modules["@discord/contextmenu"];
				const modal_namespaceObject = Modules["@discord/modal"];
				function UserBackgrounds_defineProperty(obj, key, value) {
					if (key in obj) Object.defineProperty(obj, key, {
						value,
						enumerable: true,
						configurable: true,
						writable: true
					});
					else obj[key] = value;
					return obj;
				}
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
				const Arrow = ErrorBoundary.from(external_PluginApi_namespaceObject.WebpackModules.getByDisplayName("Arrow"), "Arrow");
				const TextBadge = ErrorBoundary.from(external_PluginApi_namespaceObject.WebpackModules.getByProps("TextBadge")?.TextBadge);
				const ImageModal = ErrorBoundary.from(external_PluginApi_namespaceObject.WebpackModules.getByDisplayName("ImageModal"));
				const MaskedLink = ErrorBoundary.from(external_PluginApi_namespaceObject.WebpackModules.getByDisplayName("MaskedLink"));
				const ModalClasses = external_PluginApi_namespaceObject.WebpackModules.find((e => "object" === typeof e && 2 === Object.keys(e).length && e.modal && e.image));
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
					(0, modal_namespaceObject.openModal)((props => external_BdApi_React_default().createElement(modal_namespaceObject.ModalRoot, _extends({}, props, {
						className: ModalClasses.modal,
						size: modal_namespaceObject.ModalSize.DYNAMIC
					}), external_BdApi_React_default().createElement(ImageModal, _extends({
						src,
						original
					}, bounds, {
						animated,
						children,
						renderLinkComponent: props => external_BdApi_React_default().createElement(MaskedLink, props),
						placeholder,
						className: ModalClasses.image,
						shouldAnimate: external_PluginApi_namespaceObject.DiscordModules.WindowInfo.isFocused()
					})))));
				};
				class UserBackgrounds extends(external_BasePlugin_default()) {
					constructor(...args) {
						super(...args);
						UserBackgrounds_defineProperty(this, "Store", bannerStore);
					}
					onStart() {
						external_StyleLoader_default().inject();
						bannerStore.initialize();
						external_PluginApi_namespaceObject.Utilities.suppressErrors(this.patchBanners.bind(this), "UserBanner.default patch")();
						external_PluginApi_namespaceObject.Utilities.suppressErrors(this.patchUserPopout.bind(this), "UserPopoutContainer.type patch")();
					}
					shouldShow(type) {
						return switchCase(type, [
							[0, settings.get("showInPopout", true)],
							[1, settings.get("showInProfile", true)]
						], false);
					}
					async patchUserPopout() {
						const UserPopout = external_PluginApi_namespaceObject.WebpackModules.getByProps("UserPopoutAvatar");
						const classes = external_PluginApi_namespaceObject.WebpackModules.getByProps("avatarPositionNormal");
						external_PluginApi_namespaceObject.Patcher.after(UserPopout, "UserPopoutAvatar", ((_, [{
							user
						}], res) => {
							const props = res?.props?.children?.props;
							if (!props || props.className?.indexOf?.(classes.avatarPositionPremium) > -1 || !bannerStore.hasBanner(user.id)) return;
							props.className = props.className.replace(classes.avatarPositionNormal, classes.avatarPositionPremium);
						}));
					}
					async patchBanners() {
						const BannerClasses = external_PluginApi_namespaceObject.WebpackModules.getByProps("banner", "popoutBanner");
						const UserBanner = external_PluginApi_namespaceObject.WebpackModules.getModule((m => "UserBanner" === m.default.displayName));
						function BannerContainer({
							user,
							bannerType,
							children
						}) {
							const banner = (0, flux_namespaceObject.useStateFromStores)([bannerStore], (() => bannerStore.getBanner(user.id)), null, external_window_default().isEqual);
							const [selection, setSelection] = (0, external_BdApi_React_namespaceObject.useState)(null == banner ? 1 : 0);
							const ref = (0, external_BdApi_React_namespaceObject.useRef)(null);
							const currentBanner = (0, external_BdApi_React_namespaceObject.useMemo)((() => 1 === selection || null == banner ? user.getBannerURL(void 0, true) : banner?.background), [banner, user, selection]);
							const currentOrientation = (0, external_BdApi_React_namespaceObject.useMemo)((() => null != banner && 0 === selection ? banner.orientation : void 0), [banner, selection]);
							if (!user.banner && !banner) return children;
							children.props["data-user-id"] = user.id;
							children.props.className = switchCase(bannerType, [
								[0, (0, utils_namespaceObject.joinClassNames)("user-background", BannerClasses.banner, BannerClasses.popoutBannerPremium)],
								[1, (0,
									utils_namespaceObject.joinClassNames)("user-background", BannerClasses.banner, BannerClasses.profileBannerPremium)]
							]);
							children.ref = ref;
							children.key = selection;
							children.props.style = {
								backgroundImage: `url(${currentBanner})`,
								backgroundPosition: currentOrientation
							};
							if (children.props.children[0]) children.props.children[0] = null;
							return external_BdApi_React_default().createElement("div", {
								className: UserBackgrounds_banner.Z.container,
								onContextMenu: event => {
									const width = ref.current?.offsetWidth;
									const height = ref.current?.offsetHeight;
									(0, contextmenu_namespaceObject.openContextMenu)(event, (() => external_BdApi_React_default().createElement(contextmenu_namespaceObject.Menu, {
										navId: "banner-context",
										onClose: contextmenu_namespaceObject.closeContextMenu
									}, external_BdApi_React_default().createElement(contextmenu_namespaceObject.MenuItem, {
										id: "view-banner",
										label: "View Banner",
										key: "view-banner",
										action: () => {
											showImageModal(currentBanner, currentBanner, width, height, currentBanner?.endsWith(".gif"), null, currentBanner);
										}
									}))));
								}
							}, external_BdApi_React_default().createElement(TextBadge, {
								color: constants_namespaceObject.Colors.BRAND_NEW_500,
								text: 0 === selection ? "USRBG" : "NATIVE",
								className: UserBackgrounds_banner.Z.badge
							}), null != banner && null != user.banner && external_BdApi_React_default().createElement(components_namespaceObject.Button, {
								className: (0, utils_namespaceObject.joinClassNames)(UserBackgrounds_banner.Z.arrow, UserBackgrounds_banner.Z.left),
								key: "left",
								look: components_namespaceObject.Button.Looks.BLANK,
								size: components_namespaceObject.Button.Sizes.TINY,
								onClick: setSelection.bind(null, 0),
								disabled: 0 === selection || null == user.banner
							}, external_BdApi_React_default().createElement(Arrow, {
								direction: Arrow.Directions.LEFT
							})), children, null != banner && null != user.banner && external_BdApi_React_default().createElement(components_namespaceObject.Button, {
								className: (0, utils_namespaceObject.joinClassNames)(UserBackgrounds_banner.Z.arrow, UserBackgrounds_banner.Z.right),
								key: "right",
								look: components_namespaceObject.Button.Looks.BLANK,
								size: components_namespaceObject.Button.Sizes.TINY,
								onClick: setSelection.bind(null, 1),
								disabled: 1 === selection || null == banner
							}, external_BdApi_React_default().createElement(Arrow, {
								direction: Arrow.Directions.RIGHT,
								key: "right"
							})));
						}
						external_PluginApi_namespaceObject.Patcher.after(UserBanner, "default", ((__, [props], res) => external_BdApi_React_default().createElement(BannerContainer, _extends({}, props, {
							children: res,
							key: props.user.id
						}))));
					}
					onStop() {
						external_StyleLoader_default().remove();
						external_PluginApi_namespaceObject.Patcher.unpatchAll();
						bannerStore.destroy();
					}
				}
			},
			645: module => {
				module.exports = function(cssWithMappingToString) {
					var list = [];
					list.toString = function toString() {
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
		var __webpack_exports__ = __webpack_require__(699);
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
