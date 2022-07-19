/**
 * @name ChannelDms
 * @version 1.2.1
 * @author Strencher
 * @description Allows you to open popout chats of direct messages inside servers.
 * @source https://github.com/Strencher/BetterDiscordStuff/tree/master/ChannelDms
 * @updateUrl https://raw.githubusercontent.com/Strencher/BetterDiscordStuff/master/ChannelDms/ChannelDms.plugin.js
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
		"name": "ChannelDms",
		"version": "1.2.1",
		"authors": [{
			"name": "Strencher",
			"discord_id": "415849376598982656",
			"github_username": "Strencher",
			"twitter_username": "Strencher3"
		}],
		"description": "Allows you to open popout chats of direct messages inside servers.",
		"github": "https://github.com/Strencher/BetterDiscordStuff/tree/master/ChannelDms",
		"github_raw": "https://raw.githubusercontent.com/Strencher/BetterDiscordStuff/master/ChannelDms/ChannelDms.plugin.js"
	},
	"changelog": [{
		"title": "Bug Fixes",
		"type": "fixed",
		"items": [
			"Fixed for the latest discord update."
		]
	}],
	"build": {
		"zlibrary": true,
		"copy": true,
		"production": false,
		"alias": {},
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
					return ___createMemoize___(this, 'joinClassNames', () => BdApi.findModule(e => e.toString().indexOf('return e.join(" ")') > 200))
				},
				get 'useForceUpdate'() {
					return ___createMemoize___(this, 'useForceUpdate', () => BdApi.findModuleByProps('useForceUpdate')?.useForceUpdate)
				},
				get 'Logger'() {
					return ___createMemoize___(this, 'Logger', () => BdApi.findModuleByProps('setLogFn')?.default)
				},
				get 'Navigation'() {
					return ___createMemoize___(this, 'Navigation', () => BdApi.findModuleByProps('replaceWith', 'currentRouteIsPeekView'))
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
					return ___createMemoize___(this, 'Button', () => BdApi.findModule(m => 'DropdownSizes' in m && typeof(m) === 'function'))
				},
				get 'Popout'() {
					return ___createMemoize___(this, 'Popout', () => BdApi.findModuleByDisplayName('Popout'))
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
				get 'ComponentDispatcher'() {
					return ___createMemoize___(this, 'ComponentDispatcher', () => BdApi.findModuleByProps('ComponentDispatch')?.ComponentDispatch)
				},
				get 'EmojiUtils'() {
					return ___createMemoize___(this, 'EmojiUtils', () => BdApi.findModuleByProps('uploadEmoji'))
				},
				get 'PermissionUtils'() {
					return ___createMemoize___(this, 'PermissionUtils', () => BdApi.findModuleByProps('computePermissions', 'canManageUser'))
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
					return ___createMemoize___(this, 'Channels', () => BdApi.findModuleByProps('getChannel', 'getDMFromUserId'))
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
					return ___createMemoize___(this, 'Status', () => BdApi.findModuleByProps('getStatus', 'getActivities', 'getState'))
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
					return ___createMemoize___(this, 'Games', () => BdApi.findModuleByProps('getGame', 'games'))
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
				return ___createMemoize___(this, '@discord/i18n', () => BdApi.findModule(m => m.Messages?.CLOSE && typeof(m.getLocale) === 'function'))
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
				return ___createMemoize___(this, '@discord/modal', () => Object.assign({}, BdApi.findModuleByProps('ModalRoot'), BdApi.findModuleByProps('openModal', 'closeAllModals')))
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
			781: (module, __webpack_exports__, __webpack_require__) => {
				__webpack_require__.d(__webpack_exports__, {
					Z: () => __WEBPACK_DEFAULT_EXPORT__
				});
				var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(645);
				var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = __webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
				var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()((function(i) {
					return i[1];
				}));
				___CSS_LOADER_EXPORT___.push([module.id, ".ChannelDms-channelmembers-wrap{display:flex;flex-direction:column}.ChannelDms-channelmembers-wrap .ChannelDms-channelmembers-header{text-transform:none;padding:10px 0;align-items:center;justify-content:center;font-family:var(--font-primary);border-bottom:thin solid var(--background-modifier-accent);--background-modifier-selected: var(--background-accent);background:var(--background-mobile-secondary)}.ChannelDms-channelmembers-wrap .container-2o3qEW{max-height:calc(100% - 45px)}", ""]);
				___CSS_LOADER_EXPORT___.locals = {
					wrap: "ChannelDms-channelmembers-wrap",
					header: "ChannelDms-channelmembers-header"
				};
				StyleLoader.append(module.id, ___CSS_LOADER_EXPORT___.toString());
				const __WEBPACK_DEFAULT_EXPORT__ = Object.assign(___CSS_LOADER_EXPORT___, ___CSS_LOADER_EXPORT___.locals);
			},
			290: (module, __webpack_exports__, __webpack_require__) => {
				__webpack_require__.d(__webpack_exports__, {
					Z: () => __WEBPACK_DEFAULT_EXPORT__
				});
				var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(645);
				var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = __webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
				var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()((function(i) {
					return i[1];
				}));
				___CSS_LOADER_EXPORT___.push([module.id, ".ChannelDms-channelpopout-popout{color:#ddd;background:var(--background-primary);width:400px;height:600px;position:relative;box-shadow:var(--elevation-high)}.ChannelDms-channelpopout-popout.ChannelDms-channelpopout-collapsed{width:100px}.ChannelDms-channelpopout-popout .ChannelDms-channelpopout-content{overflow:hidden;border-radius:8px}.ChannelDms-channelpopout-popout .ChannelDms-channelpopout-content>section{height:561px}.ChannelDms-channelpopout-popout .ChannelDms-channelpopout-content>section>div{height:100%}.ChannelDms-channelpopout-popout .ChannelDms-channelpopout-removeButton{position:absolute;top:-12px;right:-12px}.ChannelDms-channelpopout-popout .ChannelDms-channelpopout-collapseButton{position:absolute;left:-20px;top:50px;background:var(--background-secondary-alt);border-radius:100px;z-index:999999}.ChannelDms-channelpopout-popout .ChannelDms-channelpopout-header{padding:6px;box-shadow:var(--elevation-low);background:var(--background-secondary);display:flex;align-items:center;justify-content:space-between}.ChannelDms-channelpopout-popout .ChannelDms-channelpopout-header .ChannelDms-channelpopout-headerTag{display:flex}.ChannelDms-channelpopout-popout .ChannelDms-channelpopout-header .ChannelDms-channelpopout-headerTag .ChannelDms-channelpopout-channelIcon{display:flex;align-items:center;margin:0 5px;color:var(--text-muted)}.ChannelDms-channelpopout-popout .ChannelDms-channelpopout-header .ChannelDms-channelpopout-headerTag .ChannelDms-channelpopout-headerName{display:inline-flex;align-items:center;font-size:20px;font-weight:600;white-space:nowrap;text-overflow:ellipsis;overflow:hidden;max-width:270px}.ChannelDms-channelpopout-popout .ChannelDms-channelpopout-header .ChannelDms-channelpopout-headerTag .ChannelDms-channelpopout-headerStatus{display:flex;align-items:center;margin-left:5px}.ChannelDms-channelpopout-popout .ChannelDms-channelpopout-header .ChannelDms-channelpopout-buttons{display:flex;align-items:center}.ChannelDms-channelpopout-unread{display:flex;align-items:center}", ""]);
				___CSS_LOADER_EXPORT___.locals = {
					popout: "ChannelDms-channelpopout-popout",
					collapsed: "ChannelDms-channelpopout-collapsed",
					content: "ChannelDms-channelpopout-content",
					removeButton: "ChannelDms-channelpopout-removeButton",
					collapseButton: "ChannelDms-channelpopout-collapseButton",
					header: "ChannelDms-channelpopout-header",
					headerTag: "ChannelDms-channelpopout-headerTag",
					channelIcon: "ChannelDms-channelpopout-channelIcon",
					headerName: "ChannelDms-channelpopout-headerName",
					headerStatus: "ChannelDms-channelpopout-headerStatus",
					buttons: "ChannelDms-channelpopout-buttons",
					unread: "ChannelDms-channelpopout-unread"
				};
				StyleLoader.append(module.id, ___CSS_LOADER_EXPORT___.toString());
				const __WEBPACK_DEFAULT_EXPORT__ = Object.assign(___CSS_LOADER_EXPORT___, ___CSS_LOADER_EXPORT___.locals);
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
			},
			113: module => {
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
		var __webpack_exports__ = {};
		(() => {
			__webpack_require__.r(__webpack_exports__);
			__webpack_require__.d(__webpack_exports__, {
				default: () => ChannelDms
			});
			const external_PluginApi_namespaceObject = PluginApi;
			const external_BasePlugin_namespaceObject = BasePlugin;
			var external_BasePlugin_default = __webpack_require__.n(external_BasePlugin_namespaceObject);
			const external_StyleLoader_namespaceObject = StyleLoader;
			var external_StyleLoader_default = __webpack_require__.n(external_StyleLoader_namespaceObject);
			var external_BdApi_React_ = __webpack_require__(113);
			var external_BdApi_React_default = __webpack_require__.n(external_BdApi_React_);
			const ChannelInfoContext = external_BdApi_React_default().createContext({
				shouldShow: false,
				selectedChannelId: "",
				setSelectedChannelId: () => {}
			});
			const context = ChannelInfoContext;
			const components_namespaceObject = Modules["@discord/components"];
			const stores_namespaceObject = Modules["@discord/stores"];
			var React = __webpack_require__(113);
			function _extends() {
				_extends = Object.assign ? Object.assign.bind() : function(target) {
					for (var i = 1; i < arguments.length; i++) {
						var source = arguments[i];
						for (var key in source)
							if (Object.prototype.hasOwnProperty.call(source, key)) target[key] = source[key];
					}
					return target;
				};
				return _extends.apply(this, arguments);
			}
			function AsyncComponent({
				promise,
				fallback,
				...props
			}) {
				const [Component, setComponent] = (0, external_BdApi_React_.useState)((() => fallback));
				(0, external_BdApi_React_.useEffect)((() => {
					Promise.resolve(promise).then((comp => {
						setComponent((() => comp));
					}));
				}), [promise]);
				return React.createElement(Component, props);
			}
			function wrapPromise(promise, fallback) {
				return props => React.createElement(AsyncComponent, _extends({
					promise,
					fallback
				}, props));
			}
			var channelpopout = __webpack_require__(290);
			const icons_namespaceObject = Modules["@discord/icons"];
			const constants_namespaceObject = Modules["@discord/constants"];
			const flux_namespaceObject = Modules["@discord/flux"];
			const modules_namespaceObject = Modules["@discord/modules"];
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
			class SettingsManager extends flux_namespaceObject.Store {
				constructor(pluginName, defaultSettings = {}) {
					super(modules_namespaceObject.Dispatcher, {});
					_defineProperty(this, "settings", void 0);
					_defineProperty(this, "pluginName", void 0);
					_defineProperty(this, "get", ((key, defaultValue) => this.settings[key] ?? defaultValue));
					_defineProperty(this, "set", ((key, value) => {
						this.settings[key] = value;
						external_PluginApi_namespaceObject.PluginUtilities.saveSettings(this.pluginName, this.settings);
						this.emitChange();
						return value;
					}));
					this.pluginName = pluginName;
					this.settings = external_PluginApi_namespaceObject.PluginUtilities.loadSettings(pluginName, defaultSettings);
				}
			}
			const package_namespaceObject = JSON.parse('{"um":{"u2":"ChannelDms"}}');
			const Settings = new SettingsManager(package_namespaceObject.um.u2);
			const settings = Settings;
			function createStore(state) {
				const listeners = new Set;
				const api = {
					getState() {
						return state;
					},
					setState(partial) {
						const partialState = "function" === typeof partial ? partial(state) : partial;
						state = Object.assign({}, state, partialState);
						listeners.forEach((listener => {
							listener(state);
						}));
					},
					get listeners() {
						return listeners;
					},
					on(listener) {
						if (listeners.has(listener)) return;
						listeners.add(listener);
						return () => listeners.delete(listener);
					},
					off(listener) {
						return listeners.delete(listener);
					}
				};
				return [function(collector = (_ => _)) {
					const forceUpdate = (0, external_BdApi_React_.useReducer)((e => e + 1), 0)[1];
					(0, external_BdApi_React_.useEffect)((() => {
						const handler = () => forceUpdate();
						listeners.add(handler);
						return () => listeners.delete(handler);
					}), []);
					return collector(api.getState());
				}, api];
			}
			function channelpopout_extends() {
				channelpopout_extends = Object.assign ? Object.assign.bind() : function(target) {
					for (var i = 1; i < arguments.length; i++) {
						var source = arguments[i];
						for (var key in source)
							if (Object.prototype.hasOwnProperty.call(source, key)) target[key] = source[key];
					}
					return target;
				};
				return channelpopout_extends.apply(this, arguments);
			}
			const classes = external_PluginApi_namespaceObject.WebpackModules.getByProps("chatContent");
			const ChannelChat = wrapPromise(external_PluginApi_namespaceObject.ReactComponents.getComponentByName("ChannelChat", "." + classes?.chatContent).then((res => res.component)), (() => external_BdApi_React_default().createElement("p", null, "Loading...")));
			const ChannelContext = external_BdApi_React_default().createContext(null);
			const {
				ChatInputTypes
			} = external_PluginApi_namespaceObject.WebpackModules.getByProps("ChatInputTypes") ?? {};
			const StatusIcon = external_PluginApi_namespaceObject.WebpackModules.getByDisplayName("FluxContainer(Status)");
			const CallButtons = external_PluginApi_namespaceObject.WebpackModules.getByDisplayName("ConnectedPrivateChannelCallButtonSubscribed") ?? external_PluginApi_namespaceObject.WebpackModules.getByDisplayName("ConnectedPrivateChannelCallButton");
			const FormatPlaceholder = external_PluginApi_namespaceObject.WebpackModules.getModule((m => m?.toString().indexOf("TEXTAREA_PLACEHOLDER") > -1));
			const RemoveButton = external_PluginApi_namespaceObject.WebpackModules.getByDisplayName("RemoveButton");
			const ChannelNameUtils = external_PluginApi_namespaceObject.WebpackModules.getByProps("computeChannelName");
			const RepliesStore = external_PluginApi_namespaceObject.WebpackModules.getByProps("getPendingReply");
			const Button = external_PluginApi_namespaceObject.WebpackModules.getModule((e => "DropdownSizes" in e && "function" === typeof e));
			const join = (...classNames) => classNames.filter(Boolean).join(" ");
			const [useCollapsedStore, Api] = createStore({
				collapsed: {}
			});
			function HeaderBar() {
				const channel = (0, external_BdApi_React_.useContext)(ChannelContext);
				return external_BdApi_React_default().createElement("div", {
					className: channelpopout.Z.header
				}, external_BdApi_React_default().createElement("div", {
					className: channelpopout.Z.headerTag
				}, external_BdApi_React_default().createElement("div", {
					className: channelpopout.Z.channelIcon
				}, channel.type === constants_namespaceObject.ChannelTypes.GROUP_DM ? external_BdApi_React_default().createElement(icons_namespaceObject.People, null) : external_BdApi_React_default().createElement(icons_namespaceObject.At, null)), external_BdApi_React_default().createElement("div", {
					className: channelpopout.Z.headerName
				}, channel.type === constants_namespaceObject.ChannelTypes.GROUP_DM ? ChannelNameUtils.default(channel) : stores_namespaceObject.Users.getUser(channel.getRecipientId())?.username), channel.type !== constants_namespaceObject.ChannelTypes.GROUP_DM && external_BdApi_React_default().createElement(StatusIcon, {
					size: 10,
					userId: channel.getRecipientId(),
					position: "bottom",
					isMobile: stores_namespaceObject.Status.isMobileOnline(channel.getRecipientId()),
					className: channelpopout.Z.headerStatus
				})), external_BdApi_React_default().createElement("div", {
					className: channelpopout.Z.buttons
				}, external_BdApi_React_default().createElement(CallButtons, {
					channel
				})));
			}
			function CollapseButton({
				state,
				onClick
			}) {
				return external_BdApi_React_default().createElement(components_namespaceObject.Tooltip, {
					text: state ? "Expand" : "Collapse",
					position: "top"
				}, (props => external_BdApi_React_default().createElement(Button, channelpopout_extends({}, props, {
					look: Button.Looks.BLANK,
					size: Button.Sizes.ICON,
					className: channelpopout.Z.collapseButton,
					onClick
				}), external_BdApi_React_default().createElement(icons_namespaceObject.Caret, {
					direction: state ? icons_namespaceObject.Caret.Directions.LEFT : icons_namespaceObject.Caret.Directions.RIGHT
				}))));
			}
			function ChannelPopout({
				channel,
				onClose
			}) {
				const guild = (0, external_BdApi_React_.useMemo)((() => stores_namespaceObject.Guilds.getGuild(channel?.guild_id)), [channel]);
				const ref = (0, external_BdApi_React_.useRef)();
				const pendingReply = (0, flux_namespaceObject.useStateFromStores)([RepliesStore], (() => RepliesStore.getPendingReply(channel.id)));
				const closeOnOuterClick = (0, flux_namespaceObject.useStateFromStores)([settings], (() => settings.get("closeOnOuterClick", true)));
				const isCollapsed = useCollapsedStore((state => Boolean(state.collapsed[channel.id])));
				const collapse = (0, external_BdApi_React_.useCallback)((value => {
					Api.setState((state => {
						if (value) state.collapsed[channel.id] = true;
						else delete state.collapsed[channel.id];
						return {
							...state
						};
					}));
				}), [isCollapsed]);
				(0, external_BdApi_React_.useEffect)((() => {
					const listener = event => {
						if (!event.target || !ref.current || !closeOnOuterClick) return;
						if (event.target === ref.current || ref.current.contains(event.target)) return;
						onClose();
					};
					document.body.classList.add("mouse-mode");
					document.addEventListener("click", listener);
					return () => {
						document.body.classList.remove("mouse-mode");
						document.removeEventListener("click", listener);
					};
				}), [ref, closeOnOuterClick]);
				return external_BdApi_React_default().createElement(ChannelContext.Provider, {
					value: channel
				}, external_BdApi_React_default().createElement("div", {
					className: join(channelpopout.Z.popout, isCollapsed && channelpopout.Z.collapsed),
					ref
				}, external_BdApi_React_default().createElement(RemoveButton, {
					onClick: onClose,
					className: channelpopout.Z.removeButton
				}), external_BdApi_React_default().createElement(CollapseButton, {
					state: isCollapsed,
					onClick: () => {
						collapse(!isCollapsed);
					}
				}), external_BdApi_React_default().createElement("div", {
					className: channelpopout.Z.content
				}, external_BdApi_React_default().createElement(HeaderBar, null), external_BdApi_React_default().createElement(ChannelChat, {
					channel,
					guild,
					chatInputType: ChatInputTypes.SIDEBAR,
					placeholder: FormatPlaceholder(channel),
					pendingReply
				}))));
			}
			var createUpdateWrapper_React = __webpack_require__(113);
			function createUpdateWrapper_extends() {
				createUpdateWrapper_extends = Object.assign ? Object.assign.bind() : function(target) {
					for (var i = 1; i < arguments.length; i++) {
						var source = arguments[i];
						for (var key in source)
							if (Object.prototype.hasOwnProperty.call(source, key)) target[key] = source[key];
					}
					return target;
				};
				return createUpdateWrapper_extends.apply(this, arguments);
			}
			const createUpdateWrapper = (Component, valueProp = "value", changeProp = "onChange", valueIndex = 0) => props => {
				const [value, setValue] = createUpdateWrapper_React.useState(props[valueProp]);
				return createUpdateWrapper_React.createElement(Component, createUpdateWrapper_extends({}, props, {
					[valueProp]: value,
					[changeProp]: (...args) => {
						const value = args[valueIndex];
						if ("function" === typeof props[changeProp]) props[changeProp](value);
						setValue(value);
					}
				}));
			};
			const hooks_createUpdateWrapper = createUpdateWrapper;
			const SwitchItem = hooks_createUpdateWrapper(external_PluginApi_namespaceObject.WebpackModules.getByDisplayName("SwitchItem"));
			const SettingsItems = [{
				name: "Close on outer click",
				note: "Closes the popout when clicking outside of it.",
				id: "closeOnOuterClick",
				value: true
			}];
			function SettingsPanel() {
				return external_BdApi_React_default().createElement(external_BdApi_React_default().Fragment, null, SettingsItems.map((item => external_BdApi_React_default().createElement(SwitchItem, {
					key: item.id,
					note: item.note,
					children: item.name,
					value: settings.get(item.id, item.value),
					onChange: value => {
						settings.set(item.id, value);
					}
				}))));
			}
			var unreadbadge_React = __webpack_require__(113);
			const Badges = external_PluginApi_namespaceObject.WebpackModules.getByProps("NumberBadge");
			const UnreadStore = external_PluginApi_namespaceObject.WebpackModules.getByProps("getUnreadCount");
			const MutedStore = external_PluginApi_namespaceObject.WebpackModules.getByProps("getMutedChannels");
			const isChannelMuted = function(guildId, channelId) {
				return MutedStore.getMutedChannels(guildId).has(channelId);
			};
			function UnreadBadge({
				channel
			}) {
				const unreadCount = (0, flux_namespaceObject.useStateFromStores)([UnreadStore, MutedStore], (() => {
					if (isChannelMuted(channel.guild_id, channel.id)) return 0;
					return UnreadStore.getMentionCount(channel.id);
				}));
				if (unreadCount < 1) return null;
				return unreadbadge_React.createElement(Badges.NumberBadge, {
					count: unreadCount,
					color: "#ed4245"
				});
			}
			function useSubscribe(store) {
				const [, forceUpdate] = (0, external_BdApi_React_.useReducer)((n => !n), false);
				(0, external_BdApi_React_.useEffect)((() => {
					store.subscribe(forceUpdate);
					return () => void store.unsubscribe(forceUpdate);
				}), []);
			}
			function store_createStore({
				handler,
				initialState
			}) {
				let state = initialState;
				const store = {
					useStore: factory => {
						useSubscribe(store);
						return factory(state);
					},
					getState: (factory = (_ => _)) => factory(state),
					_listeners: new Set,
					subscribe: listener => {
						store._listeners.add(listener);
					},
					unsubscribe: listener => store._listeners.delete(listener),
					dispatch: event => {
						const listeners = [...store._listeners];
						const data = handler(event, state);
						if (false === data) return;
						if (!Array.isArray(data)) Object.assign(state, data);
						for (let i = 0; i < listeners.length; i++) listeners[i](event);
					}
				};
				return store;
			}
			var channelmembers = __webpack_require__(781);
			const PrivateChannelsConnected = external_PluginApi_namespaceObject.WebpackModules.getByDisplayName("PrivateChannelsConnected");
			const [useChannelStore, privatechannels_Api] = createStore({
				shouldShow: true,
				selectedChannelId: ""
			});
			const original = Symbol("original");
			function NestedPrivateChannels(props) {
				const res = props[original](props);
				try {
					const items = res?.props?.children?.[1]?.props?.children;
					if (Array.isArray(items))
						while (items.length) items.pop();
				} catch (error) {
					external_PluginApi_namespaceObject.Logger.error("Failed to patch NestedPrivateChannels:", error);
				}
				return res;
			}
			function PrivateChannelsPatched(props) {
				const ret = PrivateChannelsConnected(props);
				try {
					ret.props.showNitroTab = false;
					ret.props.showLibrary = false;
					ret.props.homeLink = "";
					ret.props[original] = ret.type;
					ret.type = NestedPrivateChannels;
				} catch (error) {
					external_PluginApi_namespaceObject.Logger.error(`Failed to set properties on PrivateChannels:`, error);
				}
				return ret;
			}
			function PrivateChannels() {
				const {
					selectedChannelId
				} = useChannelStore();
				const setSelectedChannelId = (0, external_BdApi_React_.useCallback)((id => {
					privatechannels_Api.setState({
						selectedChannelId: id
					});
				}), [selectedChannelId]);
				return external_BdApi_React_default().createElement(external_PluginApi_namespaceObject.Components.ErrorBoundary, null, external_BdApi_React_default().createElement(context.Provider, {
					value: {
						shouldShow: true,
						selectedChannelId,
						setSelectedChannelId
					}
				}, external_BdApi_React_default().createElement(PrivateChannelsPatched, null)));
			}
			var channelmembers_React = __webpack_require__(113);
			function channelmembers_extends() {
				channelmembers_extends = Object.assign ? Object.assign.bind() : function(target) {
					for (var i = 1; i < arguments.length; i++) {
						var source = arguments[i];
						for (var key in source)
							if (Object.prototype.hasOwnProperty.call(source, key)) target[key] = source[key];
					}
					return target;
				};
				return channelmembers_extends.apply(this, arguments);
			}
			const TabBar = external_PluginApi_namespaceObject.WebpackModules.getByProps("Item", "Header");
			var Tabs;
			(function(Tabs) {
				Tabs[Tabs["MEMBERS"] = 0] = "MEMBERS";
				Tabs[Tabs["DMS"] = 1] = "DMS";
			})(Tabs || (Tabs = {}));
			var Events;
			(function(Events) {
				Events[Events["SELECT"] = 0] = "SELECT";
			})(Events || (Events = {}));
			const Store = store_createStore({
				initialState: {
					tab: Tabs.MEMBERS
				},
				handler(event, state) {
					switch (event.type) {
						case Events.SELECT:
							if (!Tabs[event.id]) return false;
							state.tab = event.id;
							return state;
					}
				}
			});
			function renderList({
				tab,
				MemberList,
				memberListProps
			}) {
				switch (tab) {
					case Tabs.MEMBERS:
						return channelmembers_React.createElement(MemberList, channelmembers_extends({}, memberListProps, {
							__IS_PLUGIN: true,
							key: "MEMBERS"
						}));
					case Tabs.DMS:
						return channelmembers_React.createElement(PrivateChannels, {
							key: "DMS"
						});
					default:
						return channelmembers_React.createElement("p", null, "Uh.");
				}
			}
			function ChannelMembers({
				original: MemberList,
				memberListProps
			}) {
				const tab = Store.useStore((s => s.tab));
				const handleSelect = function(id) {
					Store.dispatch({
						type: Events.SELECT,
						id
					});
				};
				return channelmembers_React.createElement("div", {
					className: channelmembers.Z.wrap,
					"data-tab": Tabs[tab]
				}, channelmembers_React.createElement(TabBar.Header, {
					className: external_PluginApi_namespaceObject.Utilities.className(channelmembers.Z.header, TabBar.Types.TOP_PILL),
					key: "TAB_BAR"
				}, channelmembers_React.createElement(TabBar.Item, {
					selectedItem: tab,
					id: Tabs.MEMBERS,
					type: TabBar.Types.TOP,
					onClick: handleSelect.bind(null, Tabs.MEMBERS)
				}, "Members"), channelmembers_React.createElement(TabBar.Item, {
					selectedItem: tab,
					id: Tabs.DMS,
					onClick: handleSelect.bind(null, Tabs.DMS)
				}, "DMs")), renderList({
					tab,
					memberListProps,
					MemberList
				}));
			}
			function ChannelDms_extends() {
				ChannelDms_extends = Object.assign ? Object.assign.bind() : function(target) {
					for (var i = 1; i < arguments.length; i++) {
						var source = arguments[i];
						for (var key in source)
							if (Object.prototype.hasOwnProperty.call(source, key)) target[key] = source[key];
					}
					return target;
				};
				return ChannelDms_extends.apply(this, arguments);
			}
			class ChannelDms extends(external_BasePlugin_default()) {
				onStart() {
					external_StyleLoader_default().inject();
					this.patchChannelMembers();
					this.patchListItem();
					this.patchPrivateChannel();
				}
				getSettingsPanel() {
					return external_BdApi_React_default().createElement(SettingsPanel, null);
				}
				async patchChannelMembers() {
					const DefaultChannelMembers = external_PluginApi_namespaceObject.WebpackModules.getModule((m => m.default && "ConnectedChannelMembers" === m.default.displayName));
					external_PluginApi_namespaceObject.Patcher.instead(DefaultChannelMembers, "default", ((_, [props], original) => {
						if (props?.__IS_PLUGIN) return;
						return external_BdApi_React_default().createElement(ChannelMembers, {
							original,
							memberListProps: props,
							key: "CHANNEL_MEMBERS"
						});
					}));
				}
				async patchPrivateChannel() {
					const classes = external_PluginApi_namespaceObject.WebpackModules.getByProps("channel", "closeButton");
					const PrivateChannel = await external_PluginApi_namespaceObject.ReactComponents.getComponentByName("PrivateChannel", "." + classes?.channel);
					external_PluginApi_namespaceObject.Patcher.after(PrivateChannel.component.prototype, "render", ((_this, _, ret) => {
						if (!ret?.props) return;
						const props = external_PluginApi_namespaceObject.Utilities.findInReactTree(ret, (e => "function" === typeof e?.children));
						if (!props) return;
						const original = props.children;
						props.children = id => {
							const returnValue = Reflect.apply(original, null, [id]);
							try {
								Object.assign(returnValue.props, {
									channel: _this.props.channel
								});
							} catch (error) {
								external_PluginApi_namespaceObject.Logger.error("Failed to assign props to nested element:", error);
							}
							return returnValue;
						};
					}));
					PrivateChannel.forceUpdateAll();
				}
				patchListItem() {
					const regex = /focusProps.*"li"/is;
					const ListItem = external_PluginApi_namespaceObject.WebpackModules.getModule((e => regex.test(e?.render?.toString())));
					const InteractiveClasses = external_PluginApi_namespaceObject.WebpackModules.getByProps("interactiveSelected", "interactive");
					function PatchedNestedRoute({
						__original,
						...props
					}) {
						const ret = Reflect.apply(__original.render, this, [props]);
						try {
							delete ret.props.href;
							ret.props.onClick = props.onSelect;
						} catch (error) {
							external_PluginApi_namespaceObject.Logger.error("Error in PatchedNestedRoute:", error);
						}
						return ret;
					}
					function PatchedRoute({
						__original,
						...props
					}) {
						const ret = Reflect.apply(__original.render, this, [props]);
						try {
							const originalConsumer = ret.props.children;
							ret.props.children = props2 => {
								const returnValue = Reflect.apply(originalConsumer, null, [props2]);
								try {
									const original = returnValue.type;
									returnValue.type = PatchedNestedRoute;
									returnValue.props.__original = original;
									returnValue.props.onSelect = props.onSelect;
								} catch (error) {
									external_PluginApi_namespaceObject.Logger.error("Error while injecting PatchedNestedRoute:", error);
								}
								return returnValue;
							};
						} catch (error) {
							external_PluginApi_namespaceObject.Logger.error("Error in Route patch:", error);
						}
						return ret;
					}
					function PatchedListItem({
						children,
						channel
					}) {
						const {
							selectedChannelId,
							shouldShow,
							setSelectedChannelId
						} = (0, external_BdApi_React_.useContext)(context);
						if (!shouldShow) return children;
						const selected = (0, external_BdApi_React_.useMemo)((() => selectedChannelId === channel.id), [selectedChannelId]);
						const child = external_BdApi_React_default().cloneElement(children.props.children);
						const route = external_PluginApi_namespaceObject.Utilities.findInReactTree(children, (e => e?.type?.render));
						try {
							const interactive = external_PluginApi_namespaceObject.Utilities.findInReactTree(child, (e => "Interactive" === e?.type?.displayName));
							if (route) {
								if (selected)
									if (interactive) interactive.props.className += ` ${InteractiveClasses.interactiveSelected}`;
								route.props.__original = route.type;
								route.props.onSelect = event => {
									event.preventDefault();
									event.stopPropagation();
									setSelectedChannelId(selected ? "" : channel.id);
								};
								route.type = PatchedRoute;
							}
							const close = interactive?.props?.children?.[1];
							if (close) interactive.props.children[1] = external_BdApi_React_default().createElement("div", {
								className: "ChannelDms-channelpopout-unread"
							}, external_BdApi_React_default().createElement(UnreadBadge, {
								channel
							}), close);
						} catch (error) {
							external_PluginApi_namespaceObject.Logger.error("Error in ListItem patch:", error);
						}
						return external_BdApi_React_default().createElement(components_namespaceObject.Popout, {
							shouldShow: selected,
							spacing: 25,
							position: components_namespaceObject.Popout.Positions.LEFT,
							animation: components_namespaceObject.Popout.Animation.TRANSLATE,
							renderPopout: props => external_BdApi_React_default().createElement(ChannelPopout, ChannelDms_extends({
								channel
							}, props, {
								onClose: () => setSelectedChannelId("")
							}))
						}, (() => child));
					}
					external_PluginApi_namespaceObject.Patcher.after(ListItem, "render", ((_, [props], ret) => {
						if (!Reflect.has(props, "channel")) return;
						return external_BdApi_React_default().createElement(PatchedListItem, ChannelDms_extends({}, props, {
							children: ret
						}));
					}));
				}
				onStop() {
					external_PluginApi_namespaceObject.Patcher.unpatchAll();
					external_StyleLoader_default().remove();
				}
			}
		})();
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