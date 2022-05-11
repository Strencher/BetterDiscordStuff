/**
 * @name BetterBannedUsers
 * @version 1.2.2
 * @description Enhances the banned users page.
 * @author Strencher
 * @source https://github.com/Strencher/BetterDiscordStuff/BetterBannedUsers
 * @updateUrl https://raw.githubusercontent.com/Strencher/BetterDiscordStuff/master/BetterBannedUsers/BetterBannedUsers.plugin.js
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
		"name": "BetterBannedUsers",
		"version": "1.2.2",
		"description": "Enhances the banned users page.",
		"authors": [{
			"name": "Strencher",
			"discord_id": "415849376598982656",
			"github_username": "Strencher"
		}],
		"github": "https://github.com/Strencher/BetterDiscordStuff/BetterBannedUsers",
		"github_raw": "https://raw.githubusercontent.com/Strencher/BetterDiscordStuff/master/BetterBannedUsers/BetterBannedUsers.plugin.js"
	},
	"changelog": [{
		"type": "fixed",
		"title": "Fixed - 1.2.2",
		"items": [
			"Fixes for the latest discord update.",
			"Fixed search bar not allowing to search."
		]
	}],
	"build": {
		"zlibrary": true,
		"copy": true,
		"production": false,
		"scssHash": false,
		"alias": {
			"components": "components/index.js"
		},
		"release": {
			"source": true,
			"readme": true,
			"public": true,
			"previews": [{
					"name": "Banned Users Page",
					"src": "assets/preview.png"
				},
				{
					"name": "Settings Panel",
					"src": "assets/settings.png"
				},
				{
					"name": "Commands API",
					"src": "assets/commands.png"
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
			465: (module, __webpack_exports__, __webpack_require__) => {
				__webpack_require__.d(__webpack_exports__, {
					Z: () => __WEBPACK_DEFAULT_EXPORT__
				});
				var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(645);
				var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = __webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
				var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()((function(i) {
					return i[1];
				}));
				___CSS_LOADER_EXPORT___.push([module.id, ".BetterBannedUsers-banned-remove{display:none;position:absolute;top:-15px;right:-30px}.bannedUser-26qsXF::before{background-color:rgba(32,34,37,.3);border-color:#202225}.bannedUser-26qsXF .bannedUser-26qsXF{white-space:nowrap;padding-left:0}.bannedUser-26qsXF:hover .BetterBannedUsers-banned-remove{display:flex}.BetterBannedUsers-banned-banReason{text-overflow:ellipsis;color:var(--interactive-normal);overflow:hidden;white-space:nowrap;padding-bottom:1px;max-width:600px;display:inline-block;align-items:center}.BetterBannedUsers-banned-wrapper{margin-left:10px;z-index:10}.BetterBannedUsers-banned-container{margin-bottom:20px}.BetterBannedUsers-banned-search{margin-top:10px}.BetterBannedUsers-banned-disabled{pointer-events:none}", ""]);
				___CSS_LOADER_EXPORT___.locals = {
					remove: "BetterBannedUsers-banned-remove",
					banReason: "BetterBannedUsers-banned-banReason",
					wrapper: "BetterBannedUsers-banned-wrapper",
					container: "BetterBannedUsers-banned-container",
					search: "BetterBannedUsers-banned-search",
					disabled: "BetterBannedUsers-banned-disabled"
				};
				StyleLoader.append(module.id, ___CSS_LOADER_EXPORT___.toString());
				const __WEBPACK_DEFAULT_EXPORT__ = Object.assign(___CSS_LOADER_EXPORT___, ___CSS_LOADER_EXPORT___.locals);
			},
			894: (module, __webpack_exports__, __webpack_require__) => {
				__webpack_require__.d(__webpack_exports__, {
					Z: () => __WEBPACK_DEFAULT_EXPORT__
				});
				var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(645);
				var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = __webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
				var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()((function(i) {
					return i[1];
				}));
				___CSS_LOADER_EXPORT___.push([module.id, ".BetterBannedUsers-select-container{background:var(--background-secondary);border:1px solid var(--background-tertiary);border-radius:4px}.BetterBannedUsers-select-container .BetterBannedUsers-select-option{padding:7px 10px;color:#ddd;text-align:center}.BetterBannedUsers-select-container .BetterBannedUsers-select-option.BetterBannedUsers-select-selected{background:var(--background-secondary-alt);color:#fff}.BetterBannedUsers-select-container .BetterBannedUsers-select-option:not(.BetterBannedUsers-select-selected):hover{color:#fff;cursor:pointer;background:var(--background-modifier-hover)}.BetterBannedUsers-select-selectedText{margin:0 5px}.BetterBannedUsers-select-select{cursor:pointer}", ""]);
				___CSS_LOADER_EXPORT___.locals = {
					container: "BetterBannedUsers-select-container",
					option: "BetterBannedUsers-select-option",
					selected: "BetterBannedUsers-select-selected",
					selectedText: "BetterBannedUsers-select-selectedText",
					select: "BetterBannedUsers-select-select"
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
				default: () => BetterBannedUsers
			});
			const external_BasePlugin_namespaceObject = BasePlugin;
			var external_BasePlugin_default = __webpack_require__.n(external_BasePlugin_namespaceObject);
			const external_PluginApi_namespaceObject = PluginApi;
			var banned = __webpack_require__(465);
			const external_StyleLoader_namespaceObject = StyleLoader;
			var external_StyleLoader_default = __webpack_require__.n(external_StyleLoader_namespaceObject);
			const package_namespaceObject = JSON.parse('{"um":{"u2":"BetterBannedUsers"}}');
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
			const Settings = new SettingsManager(package_namespaceObject.um.u2);
			const settings = Settings;
			const stores_namespaceObject = Modules["@discord/stores"];
			const external_window_namespaceObject = window._;
			var external_window_default = __webpack_require__.n(external_window_namespaceObject);
			const components_namespaceObject = Modules["@discord/components"];
			const i18n_namespaceObject = Modules["@discord/i18n"];
			var external_BdApi_React_ = __webpack_require__(113);
			var components_select = __webpack_require__(894);
			const utils_namespaceObject = Modules["@discord/utils"];
			var React = __webpack_require__(113);
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
			const Popout = external_PluginApi_namespaceObject.WebpackModules.getByDisplayName("Popout");
			const Caret = external_PluginApi_namespaceObject.WebpackModules.getByDisplayName("Caret");
			const Text = external_PluginApi_namespaceObject.WebpackModules.getByDisplayName("LegacyText");
			function Select({
				value,
				options,
				label,
				onChange
			}) {
				const [selected, setSelected] = (0, external_BdApi_React_.useState)(value);
				return React.createElement(Popout, {
					renderPopout: props => React.createElement("div", _extends({}, props, {
						className: components_select.Z.container
					}), options.map(((option, index) => React.createElement("div", {
						className: (0, utils_namespaceObject.joinClassNames)(components_select.Z.option, {
							[components_select.Z.selected]: selected?.value === option.value
						}),
						key: index,
						onClick: () => {
							setSelected(option);
							onChange(option);
							props.closePopout();
						}
					}, option.label)))),
					align: "center",
					animation: Popout.Animation.FADE,
					position: "bottom"
				}, (props => React.createElement(components_namespaceObject.Flex, {
					className: components_select.Z.select,
					shrink: 0,
					grow: 0,
					align: components_namespaceObject.Flex.Align.CENTER,
					justify: components_namespaceObject.Flex.Justify.END,
					onClick: props.onClick
				}, React.createElement(Text, {
					color: Text.Colors.MUTED
				}, label), React.createElement(Text, {
					className: components_select.Z.selectedText,
					color: Text.Colors.INTERACTIVE_NORMAL
				}, selected?.label), React.createElement(Caret, {
					direction: Caret.Directions.DOWN,
					className: Text.Colors.INTERACTIVE_NORMAL
				}))));
			}
			var createUpdateWrapper_React = __webpack_require__(113);
			function createUpdateWrapper_extends() {
				createUpdateWrapper_extends = Object.assign || function(target) {
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
			var settings_React = __webpack_require__(113);
			const SwitchItem = hooks_createUpdateWrapper(external_PluginApi_namespaceObject.WebpackModules.getByDisplayName("SwitchItem"));
			const settings_settings = {
				quickUnban: {
					value: true,
					note: "Adds a quick unban button (X) to the card."
				},
				showReason: {
					value: true,
					note: "Shows the reason right inside the card."
				}
			};
			function SettingsPanel() {
				return settings_React.createElement(settings_React.Fragment, null, Object.keys(settings_settings).map((id => settings_React.createElement(SwitchItem, {
					children: external_window_default().upperFirst(id),
					note: settings_settings[id].note,
					value: settings.get(id, settings_settings[id].value),
					onChange: value => settings.set(id, value)
				}))));
			}
			function preventPropagation(func) {
				return function(event) {
					event.preventDefault?.();
					event.stopPropagation?.();
					return func.apply(this, arguments);
				};
			}
			const constants_namespaceObject = Modules["@discord/constants"];
			const DiscordCommands = BdApi.findModuleByProps("BUILT_IN_COMMANDS");
			const DiscordCommandTypes = BdApi.findModuleByProps("ApplicationCommandType");
			const Types = DiscordCommandTypes.ApplicationCommandType;
			const OptionTypes = DiscordCommandTypes.ApplicationCommandOptionType;
			const PermissionTypes = DiscordCommandTypes.ApplicationCommandPermissionType;
			if (!DiscordCommands.BUILT_IN_SECTIONS["betterdiscord"]) DiscordCommands.BUILT_IN_SECTIONS["betterdiscord"] = {
				icon: "https://github.com/BetterDiscord.png",
				id: "betterdiscord",
				name: "BetterDiscord",
				type: 0
			};
			function registerCommand(caller, options) {
				const cmd = Object.assign({}, options, {
					__registerId: caller,
					applicationId: "betterdiscord",
					type: Types.BOT,
					target: 1
				});
				DiscordCommands.BUILT_IN_COMMANDS.push(cmd);
				return () => {
					const index = DiscordCommands.BUILT_IN_COMMANDS.indexOf(cmd);
					if (index < 0) return false;
					DiscordCommands.BUILT_IN_COMMANDS.splice(index, 1);
				};
			}
			function unregisterAllCommands(caller) {
				let index = DiscordCommands.BUILT_IN_COMMANDS.findIndex((cmd => cmd.__registerId === caller));
				while (index > -1) {
					DiscordCommands.BUILT_IN_COMMANDS.splice(index, 1);
					index = DiscordCommands.BUILT_IN_COMMANDS.findIndex((cmd => cmd.__registerId === caller));
				}
			}
			const Commands = {
				registerCommand,
				unregisterAllCommands
			};
			const commands = Commands;
			const DefaultMessage = {
				state: "SENT",
				author: {
					avatar: "betterdiscord",
					id: "81388395867156480",
					bot: true,
					discriminator: "5000",
					username: "BetterDiscord"
				},
				content: "Hello <:zere_zoom:477825238172958730>"
			};
			const MessageCreators = BdApi.findModuleByProps("createBotMessage");
			const MessageActions = BdApi.findModuleByProps("receiveMessage");
			const AvatarDefaults = BdApi.findModuleByProps("BOT_AVATARS");
			if (AvatarDefaults?.BOT_AVATARS && !AvatarDefaults.BOT_AVATARS.betterdiscord) AvatarDefaults.BOT_AVATARS.betterdiscord = "https://github.com/BetterDiscord.png";
			function sendMessage(channelId, message) {
				MessageActions.receiveMessage(channelId, Object.assign({}, MessageCreators.createBotMessage(channelId, message?.content), DefaultMessage, message));
			}
			const Clyde = {
				sendMessage,
				DefaultMessage
			};
			const clyde = Clyde;
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
			var BetterBannedUsers_React = __webpack_require__(113);
			function BetterBannedUsers_defineProperty(obj, key, value) {
				if (key in obj) Object.defineProperty(obj, key, {
					value,
					enumerable: true,
					configurable: true,
					writable: true
				});
				else obj[key] = value;
				return obj;
			}
			const RemoveButton = external_PluginApi_namespaceObject.WebpackModules.getByDisplayName("RemoveButton");
			const GuildActions = external_PluginApi_namespaceObject.WebpackModules.getByProps("unbanUser");
			const SearchBar = external_PluginApi_namespaceObject.WebpackModules.getByDisplayName("SearchBar");
			const GuildSettings = external_PluginApi_namespaceObject.WebpackModules.getByProps("updateMemberRoles");
			const Util = external_PluginApi_namespaceObject.WebpackModules.getByProps("cachedFunction");
			const APIErrors = {
				UNKOWN_USER: 10013,
				MISSING_PERMISSIONS: 50013
			};
			const getLazy = function(filter) {
				const fromCache = external_PluginApi_namespaceObject.WebpackModules.getModule(filter);
				if (fromCache) return Promise.resolve(fromCache);
				return new Promise((resolve => {
					const cancel = external_PluginApi_namespaceObject.WebpackModules.addListener((m => {
						const matches = [m, m?.default];
						for (let i = 0; i < matches.length; i++) {
							const match = filter(matches[i]);
							if (!match) continue;
							resolve(matches[i]);
							cancel();
							break;
						}
					}));
				}));
			};
			class BetterBannedUsers extends(external_BasePlugin_default()) {
				constructor(...args) {
					super(...args);
					BetterBannedUsers_defineProperty(this, "promises", {
						cancelled: false,
						cancel() {
							this.cancelled = true;
						}
					});
					BetterBannedUsers_defineProperty(this, "regex", {
						userId: /^\d{15}/
					});
				}
				async banUserWithCommand(guild, userId, reason) {
					try {
						await GuildActions.banUser(guild.id, userId, void 0, `${stores_namespaceObject.Users.getCurrentUser().tag}: ${reason ? reason : "No reason provided."}`);
					} catch (error) {
						external_PluginApi_namespaceObject.Logger.error(`Failed to ban ${userId}:\n`, error);
						return switchCase(error?.body?.code, [
							[APIErrors.MISSING_PERMISSIONS, "Sorry, but you don't have enough power to perform that action. 😕"],
							[APIErrors.UNKOWN_USER, "Sorry, but i couldn't find that user. Are you sure it's their user id? 🤔"]
						], "Something when wrong when i tried to ban them. Check your console for more details.");
					}
					return `Banned <@!${userId}> from this server. 🔨`;
				}
				async unbanUserWithCommand(guild, userId) {
					try {
						await GuildActions.unbanUser(guild.id, userId);
					} catch (error) {
						external_PluginApi_namespaceObject.Logger.error(`Failed to unban ${userId}:\n`, error);
						return switchCase(error?.body?.code, [
							[APIErrors.MISSING_PERMISSIONS, "Sorry, but you don't have enough power to perform that action. 😕"],
							[APIErrors.UNKOWN_USER, "Sorry, but i couldn't find that user. Are you sure it's their user id? 🤔"]
						], "Something when wrong when i tried to unban them. Check your console for more details.");
					}
					return `Unbanned <@!${userId}> from this server. ✅`;
				}
				async onStart() {
					external_StyleLoader_default().inject();
					this.registerCommands();
					this.patchBannedUsers();
					this.patchBannedUser();
				}
				registerCommands() {
					commands.registerCommand(this.getName(), {
						id: "ban-user",
						name: "ban",
						predicate: ({
							guild
						}) => modules_namespaceObject.PermissionUtils.can(constants_namespaceObject.Permissions.BAN_MEMBERS, stores_namespaceObject.Guilds.getGuild(guild?.id), stores_namespaceObject.Users.getCurrentUser()),
						description: "Ban someone from this guild. Click the options to choose which method you want.",
						execute: (props, {
							guild,
							channel
						}) => {
							const userId = props.userId ? props.userId[0].text : props.mention?.[0]?.userId;
							if (!this.regex.userId.test(userId?.trim?.())) return clyde.sendMessage(channel.id, {
								content: "You must specify a user!"
							});
							this.banUserWithCommand(guild, userId, props.reason?.[0]?.text).then((message => {
								clyde.sendMessage(channel.id, {
									content: message
								});
							}));
						},
						options: [{
							type: OptionTypes.USER,
							name: "mention",
							description: "The user mention from chat.",
							required: false
						}, {
							type: OptionTypes.STRING,
							name: "userId",
							description: "The user id string.",
							required: false
						}, {
							type: OptionTypes.STRING,
							name: "reason",
							description: "Select a reason why you want to ban them.",
							required: false
						}]
					});
					commands.registerCommand(this.getName(), {
						id: "unban-user",
						name: "unban",
						description: "Unbans a user by id or mention from this guild. Click the options to choose the method you want.",
						predicate: ({
							guild
						}) => modules_namespaceObject.PermissionUtils.can(constants_namespaceObject.Permissions.BAN_MEMBERS, stores_namespaceObject.Guilds.getGuild(guild?.id), stores_namespaceObject.Users.getCurrentUser()),
						execute: (props, {
							guild,
							channel
						}) => {
							const userId = props.userId ? props.userId[0].text : props.mention?.[0]?.userId;
							if (!this.regex.userId.test(userId?.trim?.())) return clyde.sendMessage(channel.id, {
								content: "You must specify a user!"
							});
							this.unbanUserWithCommand(guild, userId, props.reason?.[0]?.text).then((message => {
								clyde.sendMessage(channel.id, {
									content: message
								});
							}));
						},
						options: [{
							type: OptionTypes.USER,
							name: "mention",
							description: "The user mention from chat."
						}, {
							type: OptionTypes.STRING,
							name: "userId",
							description: "The user id string."
						}]
					});
				}
				getSettingsPanel() {
					return BetterBannedUsers_React.createElement(SettingsPanel, null);
				}
				getSingleClass(...props) {
					return "." + external_PluginApi_namespaceObject.WebpackModules.getByProps(...props)?.[props[0]];
				}
				async patchBannedUser() {
					const classes = await getLazy(external_PluginApi_namespaceObject.Filters.byProperties(["bannedUser"]));
					const BannedUser = await external_PluginApi_namespaceObject.ReactComponents.getComponentByName("BannedUser", `.${classes.bannedUser}`);
					if (this.promises.cancelled) return;
					external_PluginApi_namespaceObject.Patcher.after(BannedUser.component.prototype, "render", ((that, _, res) => {
						if (this.promises.cancelled) return;
						if (!Array.isArray(res?.props?.children)) return;
						const {
							guild,
							user,
							ban
						} = that.props;
						const name = res.props.children.pop();
						res.props.children.push(BetterBannedUsers_React.createElement("div", {
							className: banned.Z.wrapper
						}, name, settings.get("showReason", true) ? BetterBannedUsers_React.createElement("span", {
							className: banned.Z.banReason
						}, ban.reason ?? i18n_namespaceObject.Messages.NO_BAN_REASON) : null), settings.get("quickUnban", true) ? BetterBannedUsers_React.createElement(RemoveButton, {
							className: banned.Z.remove,
							onClick: preventPropagation((() => {
								this.unbanUser(guild.id, user);
							}))
						}) : null);
					}));
					BannedUser.forceUpdateAll();
				}
				async patchBannedUsers() {
					const GuildSettingsBans = await getLazy(external_PluginApi_namespaceObject.Filters.byDisplayName("FluxContainer(GuildSettingsBans)"));
					const BannedUsers = GuildSettingsBans.prototype.render.call({
						memoizedGetStateFromStores: constants_namespaceObject.NOOP
					}).type;
					if (this.promises.cancelled) return;
					external_PluginApi_namespaceObject.Patcher.before(BannedUsers.prototype, "render", (that => {
						if (this.promises.cancelled) return;
						const order = settings.get("order", {
							value: "descending",
							label: "Descending"
						});
						const sort = settings.get("sort", {
							value: "username",
							label: "Name"
						});
						that.getSortedBans = Util.cachedFunction(((bans, searchQuery) => {
							if (!bans) return [];
							const userIds = external_window_default()(bans).keys();
							if (~userIds.indexOf(searchQuery)) return [stores_namespaceObject.Users.getUser(searchQuery)];
							let users = userIds.map(stores_namespaceObject.Users.getUser);
							const tester = new RegExp(`^${external_window_default().escape(searchQuery)}`, "i");
							if (searchQuery) users = users.filter((user => tester.test(user?.username) || tester.test(bans[user.id]?.reason)));
							users = users.sortBy((e => "username" === sort.value ? e.username.toLowerCase() : bans[e.id]?.reason?.length ?? 0));
							if ("ascending" === order.value) users = users.reverse();
							return users.value();
						}));
						const original = that.renderSection;
						that.renderSection = function() {
							const res = original(...arguments);
							const message = res.props.children[0].props.children[0];
							res.props.children[0] = BetterBannedUsers_React.createElement(components_namespaceObject.Flex, {
								direction: components_namespaceObject.Flex.Direction.VERTICAL,
								className: banned.Z.container
							}, message, BetterBannedUsers_React.createElement(components_namespaceObject.Flex, {
								direction: components_namespaceObject.Flex.Direction.HORIZONTAL,
								justify: components_namespaceObject.Flex.Justify.END
							}, BetterBannedUsers_React.createElement(Select, {
								label: "Order",
								value: order,
								options: [{
									label: "Ascending",
									value: "ascending"
								}, {
									label: "Descending",
									value: "descending"
								}],
								onChange: value => {
									that.forceUpdate();
									settings.set("order", value);
								}
							}), BetterBannedUsers_React.createElement(Select, {
								label: "Sort by",
								value: sort,
								options: [{
									label: "Name",
									value: "username"
								}, {
									label: "Reason length",
									value: "reason_length"
								}],
								onChange: value => {
									that.forceUpdate();
									settings.set("sort", value);
								}
							})), Object.keys(Object(that.props.bans)).length ? BetterBannedUsers_React.createElement(SearchBar, {
								onQueryChange: value => {
									GuildSettings.setSearchQuery(value);
								},
								onClear: () => GuildSettings.setSearchQuery(""),
								placeholder: i18n_namespaceObject.Messages.BANS_SEARCH_PLACEHOLDER,
								size: SearchBar.Sizes.LARGE,
								query: that.props.searchQuery,
								className: banned.Z.search
							}) : null);
							return res;
						};
					}));
				}
				async unbanUser(guildId, user) {
					await GuildActions.unbanUser(guildId, user.id);
					external_PluginApi_namespaceObject.Toasts.success(`Unbanned <span style="color: #5865f2;">${user.tag}</span>!`);
				}
				onStop() {
					external_StyleLoader_default().remove();
					external_PluginApi_namespaceObject.Patcher.unpatchAll();
					commands.unregisterAllCommands(this.getName());
					this.promises.cancel();
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