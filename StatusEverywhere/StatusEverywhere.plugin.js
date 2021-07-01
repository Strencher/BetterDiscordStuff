/**
 * @name StatusEverywhere
 * @version 1.0.0
 * @author Strencher, Zerebos
 * @description Adds user status everywhere Discord doesn't.
 * @source https://github.com/Strencher/BetterDiscordStuff/tree/master/StatusEverywhere
 * @updateUrl https://raw.githubusercontent.com/Strencher/BetterDiscordStuff/master/StatusEverywhere/StatusEverywhere.plugin.js
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
		"name": "StatusEverywhere",
		"version": "1.0.0",
		"authors": [{
				"name": "Strencher",
				"discord_id": "415849376598982656",
				"github_username": "Strencher",
				"twitter_username": "Strencher3"
			},
			{
				"name": "Zerebos",
				"discord_id": "249746236008169473",
				"github_username": "rauenzi",
				"twitter_username": "ZackRauen"
			}
		],
		"description": "Adds user status everywhere Discord doesn't.",
		"github": "https://github.com/Strencher/BetterDiscordStuff/tree/master/StatusEverywhere",
		"github_raw": "https://raw.githubusercontent.com/Strencher/BetterDiscordStuff/master/StatusEverywhere/StatusEverywhere.plugin.js"
	},
	"changelog": [],
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
					return ___createMemoize___(this, 'Users', () => BdApi.findModuleByProps('getUser'))
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
			435: (module, __webpack_exports__, __webpack_require__) => {
				__webpack_require__.d(__webpack_exports__, {
					Z: () => __WEBPACK_DEFAULT_EXPORT__
				});
				var _bdbuilder_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(118);
				var _bdbuilder_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = __webpack_require__.n(_bdbuilder_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
				var ___CSS_LOADER_EXPORT___ = _bdbuilder_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()((function(i) {
					return i[1];
				}));
				___CSS_LOADER_EXPORT___.push([module.id, ".StatusEverywhere-avatar-chatAvatar{overflow:visible !important}", ""]);
				___CSS_LOADER_EXPORT___.locals = {
					chatAvatar: "StatusEverywhere-avatar-chatAvatar"
				};
				StyleLoader.append(module.id, ___CSS_LOADER_EXPORT___.toString());
				const __WEBPACK_DEFAULT_EXPORT__ = Object.assign(___CSS_LOADER_EXPORT___, ___CSS_LOADER_EXPORT___.locals);
			},
			530: (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
				__webpack_require__.r(__webpack_exports__);
				__webpack_require__.d(__webpack_exports__, {
					default: () => StatusEverywhere
				});
				const external_PluginApi_namespaceObject = PluginApi;
				const external_BasePlugin_namespaceObject = BasePlugin;
				var external_BasePlugin_default = __webpack_require__.n(external_BasePlugin_namespaceObject);
				const flux_namespaceObject = Modules["@discord/flux"];
				var external_BdApi_React_ = __webpack_require__(832);
				var external_BdApi_React_default = __webpack_require__.n(external_BdApi_React_);
				const stores_namespaceObject = Modules["@discord/stores"];
				const constants_namespaceObject = Modules["@discord/constants"];
				const utils_namespaceObject = Modules["@discord/utils"];
				var avatar = __webpack_require__(435);
				const package_namespaceObject = JSON.parse('{"um":{"u2":"StatusEverywhere"}}');
				const modules_namespaceObject = Modules["@discord/modules"];
				function _nullishCoalesce(lhs, rhsFn) {
					if (null != lhs) return lhs;
					else return rhsFn();
				}
				class SettingsManager extends flux_namespaceObject.Store {
					constructor(pluginName) {
						super(modules_namespaceObject.Dispatcher, {});
						SettingsManager.prototype.__init.call(this);
						SettingsManager.prototype.__init2.call(this);
						this.pluginName = pluginName;
						this.settings = external_PluginApi_namespaceObject.PluginUtilities.loadSettings(pluginName, {});
					}
					__init() {
						this.get = (key, defaultValue) => _nullishCoalesce(this.settings[key], (() => defaultValue));
					}
					__init2() {
						this.set = (key, value) => {
							this.settings[key] = value;
							external_PluginApi_namespaceObject.PluginUtilities.saveSettings(this.pluginName, this.settings);
							this.emitChange();
							return value;
						};
					}
				}
				const Settings = new SettingsManager(package_namespaceObject.um.u2);
				const settings = Settings;
				const {
					ComponentDispatch
				} = external_PluginApi_namespaceObject.WebpackModules.getByProps("ComponentDispatch");
				const {
					Sizes: AvatarSizes,
					AnimatedAvatar
				} = external_PluginApi_namespaceObject.WebpackModules.getByProps("AnimatedAvatar");
				const classes = {
					...external_PluginApi_namespaceObject.WebpackModules.getByProps("sizeEmoji", "avatar")
				};
				function StatusAvatar(props) {
					const {
						message: {
							author: user,
							channel_id
						}
					} = props;
					const [shouldAnimate, setAnimate] = (0, external_BdApi_React_.useState)(false);
					const [status, isMobile, isTyping, shouldShowTyping] = (0, flux_namespaceObject.useStateFromStoresArray)([stores_namespaceObject.TypingUsers, stores_namespaceObject.Status, settings], (() => [stores_namespaceObject.Status.getStatus(user.id), stores_namespaceObject.Status.isMobileOnline(user.id), stores_namespaceObject.TypingUsers.isTyping(channel_id, user.id), settings.get("showTyping", true)]));
					(0, external_BdApi_React_.useEffect)((() => {
						const id = constants_namespaceObject.ComponentActions.ANIMATE_CHAT_AVATAR(`${props.subscribeToGroupId}:${user.id}`);
						ComponentDispatch.subscribe(id, setAnimate);
						return () => void ComponentDispatch.unsubscribe(id, setAnimate);
					}), []);
					return external_BdApi_React_default().createElement("div", {
						className: "avatarWrapper",
						"data-status": status,
						"data-mobile": isMobile,
						"data-typing": isTyping,
						"data-user-id": user.id
					}, external_BdApi_React_default().createElement(AnimatedAvatar, {
						className: (0, utils_namespaceObject.joinClassNames)(avatar.Z.chatAvatar, classes.avatar, classes.clickable),
						status,
						isTyping: shouldShowTyping && isTyping,
						isMobile,
						size: AvatarSizes.SIZE_40,
						src: user.getAvatarURL(props.guildId, shouldAnimate),
						onClick: event => {
							try {
								external_PluginApi_namespaceObject.Popouts.showUserPopout(event.target, user);
							} catch (error) {
								external_PluginApi_namespaceObject.Logger.error("Failed to open UserPopout:", error);
							}
						}
					}));
				}
				const external_StyleLoader_namespaceObject = StyleLoader;
				var external_StyleLoader_default = __webpack_require__.n(external_StyleLoader_namespaceObject);
				var React = __webpack_require__(832);
				const createUpdateWrapper = (Component, valueProp = "value", changeProp = "onChange", valueIndex = 0) => props => {
					const [value, setValue] = React.useState(props[valueProp]);
					return React.createElement(Component, {
						...{
							...props,
							[valueProp]: value,
							[changeProp]: (...args) => {
								const value = args[valueIndex];
								if ("function" === typeof props[changeProp]) props[changeProp](value);
								setValue(value);
							}
						}
					});
				};
				const hooks_createUpdateWrapper = createUpdateWrapper;
				const SwitchItem = hooks_createUpdateWrapper(external_PluginApi_namespaceObject.WebpackModules.getByDisplayName("SwitchItem"));
				function SettingsPanel() {
					return external_BdApi_React_default().createElement(external_BdApi_React_default().Fragment, null, external_BdApi_React_default().createElement(SwitchItem, {
						note: "Shows the user typing status in chat.",
						value: settings.get("showTyping", true),
						onChange: value => settings.set("showTyping", value)
					}, "Typing"));
				}
				function _optionalChain(ops) {
					let lastAccessLHS;
					let value = ops[0];
					let i = 1;
					while (i < ops.length) {
						const op = ops[i];
						const fn = ops[i + 1];
						i += 2;
						if (("optionalAccess" === op || "optionalCall" === op) && null == value) return;
						if ("access" === op || "optionalAccess" === op) {
							lastAccessLHS = value;
							value = fn(value);
						} else if ("call" === op || "optionalCall" === op) {
							value = fn(((...args) => value.call(lastAccessLHS, ...args)));
							lastAccessLHS = void 0;
						}
					}
					return value;
				}
				class StatusEverywhere extends(external_BasePlugin_default()) {
					getSettingsPanel() {
						return external_BdApi_React_default().createElement(SettingsPanel, null);
					}
					onStart() {
						this.patchChatAvatar();
						this.patchChannelMessage();
						external_StyleLoader_default().inject();
						if (!external_PluginApi_namespaceObject.DiscordModules.UserPopout) Object.defineProperty(external_PluginApi_namespaceObject.DiscordModules, "UserPopout", {
							configurable: true,
							value: external_PluginApi_namespaceObject.WebpackModules.getModule((m => "UserPopoutContainer" === m.type.displayName))
						});
					}
					async patchChatAvatar() {
						const ChatMessage = external_PluginApi_namespaceObject.WebpackModules.getModule((m => _optionalChain([m, "optionalAccess", _2 => _2.default, "optionalAccess", _3 => _3.toString, "optionalCall", _4 => _4(), "access", _5 => _5.indexOf, "call", _6 => _6("ANIMATE_CHAT_AVATAR")]) > -1));
						external_PluginApi_namespaceObject.Patcher.after(ChatMessage, "default", ((_, [props], res) => {
							const tree = external_PluginApi_namespaceObject.Utilities.findInReactTree(res, (e => _optionalChain([e, "optionalAccess", _7 => _7.renderPopout])));
							if (!_optionalChain([tree, "optionalAccess", _8 => _8.children]) || tree.children.__patched) return;
							tree.children = () => external_BdApi_React_default().createElement(StatusAvatar, {
								...props
							});
							tree.children.__patched = true;
						}));
					}
					async patchChannelMessage() {
						const ChannelMessage = external_PluginApi_namespaceObject.WebpackModules.getModule((m => "ChannelMessage" === m.type.displayName));
						const cancelPatch = external_PluginApi_namespaceObject.Patcher.after(ChannelMessage, "type", ((_, __, res) => {
							const tree = external_PluginApi_namespaceObject.Utilities.findInReactTree(res, (e => _optionalChain([e, "optionalAccess", _9 => _9.childrenHeader])));
							if (!tree) return;
							external_PluginApi_namespaceObject.Patcher.after(tree.childrenHeader.type, "type", ((_, [props], res) => {
								res.props.children[0] = external_BdApi_React_default().createElement(StatusAvatar, {
									...props
								});
							}));
							cancelPatch();
						}));
					}
					onStop() {
						external_PluginApi_namespaceObject.Patcher.unpatchAll();
						external_StyleLoader_default().remove();
					}
				}
			},
			118: module => {
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
		var __webpack_exports__ = __webpack_require__(530);
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