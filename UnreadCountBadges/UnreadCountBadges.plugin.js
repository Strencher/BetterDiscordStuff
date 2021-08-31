/**
 * @name UnreadCountBadges
 * @version 1.0.2
 * @author Strencher, Metalloriff
 * @description Adds unread badges to guilds, channels & more.
 * @source https://github.com/Strencher/BetterDiscordStuff/tree/master/UnreadCountBadges
 * @updateUrl https://raw.githubusercontent.com/Strencher/BetterDiscordStuff/master/UnreadCountBadges/UnreadCountBadges.plugin.js
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
		"name": "UnreadCountBadges",
		"version": "1.0.2",
		"authors": [{
				"name": "Strencher",
				"discord_id": "415849376598982656",
				"github_username": "Strencher",
				"twitter_username": "Strencher3"
			},
			{
				"name": "Metalloriff",
				"discord_id": "264163473179672576",
				"github_username": "metalloriff",
				"twitter_username": "Metalloriff"
			}
		],
		"description": "Adds unread badges to guilds, channels & more.",
		"github": "https://github.com/Strencher/BetterDiscordStuff/tree/master/UnreadCountBadges",
		"github_raw": "https://raw.githubusercontent.com/Strencher/BetterDiscordStuff/master/UnreadCountBadges/UnreadCountBadges.plugin.js"
	},
	"changelog": [{
		"type": "fixed",
		"title": "Fixes",
		"items": [
			"Fixed excluding muted categories."
		]
	}],
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
			185: (module, __webpack_exports__, __webpack_require__) => {
				__webpack_require__.d(__webpack_exports__, {
					Z: () => __WEBPACK_DEFAULT_EXPORT__
				});
				var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(645);
				var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = __webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
				var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()((function(i) {
					return i[1];
				}));
				___CSS_LOADER_EXPORT___.push([module.id, ".UnreadCountBadges-badge-channelUnread{margin-left:3px}.UnreadCountBadges-badge-unread{left:0;position:absolute;bottom:0}", ""]);
				___CSS_LOADER_EXPORT___.locals = {
					channelUnread: "UnreadCountBadges-badge-channelUnread",
					unread: "UnreadCountBadges-badge-unread"
				};
				StyleLoader.append(module.id, ___CSS_LOADER_EXPORT___.toString());
				const __WEBPACK_DEFAULT_EXPORT__ = Object.assign(___CSS_LOADER_EXPORT___, ___CSS_LOADER_EXPORT___.locals);
			},
			927: (module, __webpack_exports__, __webpack_require__) => {
				__webpack_require__.d(__webpack_exports__, {
					Z: () => __WEBPACK_DEFAULT_EXPORT__
				});
				var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(645);
				var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = __webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
				var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()((function(i) {
					return i[1];
				}));
				___CSS_LOADER_EXPORT___.push([module.id, ".UnreadCountBadges-Settings-divider{margin:20px 0}", ""]);
				___CSS_LOADER_EXPORT___.locals = {
					divider: "UnreadCountBadges-Settings-divider"
				};
				StyleLoader.append(module.id, ___CSS_LOADER_EXPORT___.toString());
				const __WEBPACK_DEFAULT_EXPORT__ = Object.assign(___CSS_LOADER_EXPORT___, ___CSS_LOADER_EXPORT___.locals);
			},
			605: (module, __webpack_exports__, __webpack_require__) => {
				__webpack_require__.d(__webpack_exports__, {
					Z: () => __WEBPACK_DEFAULT_EXPORT__
				});
				var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(645);
				var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = __webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
				var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()((function(i) {
					return i[1];
				}));
				___CSS_LOADER_EXPORT___.push([module.id, ".UnreadCountBadges-colorPicker-inputContainer{position:relative;display:inline-table}.UnreadCountBadges-colorPicker-inputContainer svg{position:absolute;top:5px;right:5px}.UnreadCountBadges-colorPicker-colorInput{outline:none;width:70px;border:none;height:54px;margin-top:1px;border-radius:4px;cursor:pointer}.UnreadCountBadges-colorPicker-colorInput::-webkit-color-swatch{border:none}.UnreadCountBadges-colorPicker-controls{padding-left:1px;padding-top:2px;display:flex}.UnreadCountBadges-colorPicker-colorSwatch{cursor:pointer;border-radius:4px;width:23px;height:23px;margin:4px;display:flex;align-items:center;justify-content:center}.UnreadCountBadges-colorPicker-colorSwatches{align-content:flex-start;margin-left:5px !important;max-width:340px}.UnreadCountBadges-colorPicker-defaultColor{cursor:pointer;width:72px;height:54px;border-radius:4px;margin-right:9px;display:flex;align-items:center;justify-content:center;margin-top:1px}", ""]);
				___CSS_LOADER_EXPORT___.locals = {
					inputContainer: "UnreadCountBadges-colorPicker-inputContainer",
					colorInput: "UnreadCountBadges-colorPicker-colorInput",
					controls: "UnreadCountBadges-colorPicker-controls",
					colorSwatch: "UnreadCountBadges-colorPicker-colorSwatch",
					colorSwatches: "UnreadCountBadges-colorPicker-colorSwatches",
					defaultColor: "UnreadCountBadges-colorPicker-defaultColor"
				};
				StyleLoader.append(module.id, ___CSS_LOADER_EXPORT___.toString());
				const __WEBPACK_DEFAULT_EXPORT__ = Object.assign(___CSS_LOADER_EXPORT___, ___CSS_LOADER_EXPORT___.locals);
			},
			911: (module, __webpack_exports__, __webpack_require__) => {
				__webpack_require__.d(__webpack_exports__, {
					Z: () => __WEBPACK_DEFAULT_EXPORT__
				});
				var _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(645);
				var _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = __webpack_require__.n(_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
				var ___CSS_LOADER_EXPORT___ = _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()((function(i) {
					return i[1];
				}));
				___CSS_LOADER_EXPORT___.push([module.id, ".UnreadCountBadges-category-category.UnreadCountBadges-category-compact{position:inherit}.UnreadCountBadges-category-category.UnreadCountBadges-category-compact .UnreadCountBadges-category-header{display:flex;align-items:center;justify-content:space-between;padding:2px;padding-left:10px;text-transform:uppercase;font-weight:600;font-size:.9rem}.UnreadCountBadges-category-category.UnreadCountBadges-category-compact .UnreadCountBadges-category-header .UnreadCountBadges-category-caret{float:right;display:inline-flex;color:var(--interactive-normal)}.UnreadCountBadges-category-category.UnreadCountBadges-category-compact .UnreadCountBadges-category-header .UnreadCountBadges-category-stroke{background-color:var(--background-modifier-accent);height:2px;flex:1;margin:0 5px 0 10px}.UnreadCountBadges-category-category.UnreadCountBadges-category-compact .UnreadCountBadges-category-header .UnreadCountBadges-category-label{color:var(--interactive-normal)}.UnreadCountBadges-category-category.UnreadCountBadges-category-compact .UnreadCountBadges-category-content{padding-left:20px;width:calc(100% - 40px)}.UnreadCountBadges-category-category.UnreadCountBadges-category-default{background:rgba(32,34,37,.3);border:1px solid #202225;margin:5px;cursor:pointer;border-radius:3px;--color: var(--interactive-normal)}.UnreadCountBadges-category-category.UnreadCountBadges-category-default:hover{--color: var(--interactive-hover)}.UnreadCountBadges-category-category.UnreadCountBadges-category-default .UnreadCountBadges-category-header{padding-right:5px;padding:10px 15px;padding-bottom:0;display:flex;align-items:center;justify-content:space-between}.UnreadCountBadges-category-category.UnreadCountBadges-category-default .UnreadCountBadges-category-header .UnreadCountBadges-category-stroke{display:none}.UnreadCountBadges-category-category.UnreadCountBadges-category-default .UnreadCountBadges-category-header .UnreadCountBadges-category-divider{position:relative}.UnreadCountBadges-category-category.UnreadCountBadges-category-default .UnreadCountBadges-category-header .UnreadCountBadges-category-label{font-size:1rem;font-weight:600;color:#fff;text-transform:uppercase}.UnreadCountBadges-category-category.UnreadCountBadges-category-default .UnreadCountBadges-category-header .UnreadCountBadges-category-caret{color:var(--color);transition:color .3s}.UnreadCountBadges-category-category.UnreadCountBadges-category-default.UnreadCountBadges-category-opened .UnreadCountBadges-category-content{padding:8px}.UnreadCountBadges-category-category.UnreadCountBadges-category-default.UnreadCountBadges-category-opened .UnreadCountBadges-category-header{background:rgba(32,34,37,.6)}", ""]);
				___CSS_LOADER_EXPORT___.locals = {
					category: "UnreadCountBadges-category-category",
					compact: "UnreadCountBadges-category-compact",
					header: "UnreadCountBadges-category-header",
					caret: "UnreadCountBadges-category-caret",
					stroke: "UnreadCountBadges-category-stroke",
					label: "UnreadCountBadges-category-label",
					content: "UnreadCountBadges-category-content",
					default: "UnreadCountBadges-category-default",
					divider: "UnreadCountBadges-category-divider",
					opened: "UnreadCountBadges-category-opened"
				};
				StyleLoader.append(module.id, ___CSS_LOADER_EXPORT___.toString());
				const __WEBPACK_DEFAULT_EXPORT__ = Object.assign(___CSS_LOADER_EXPORT___, ___CSS_LOADER_EXPORT___.locals);
			},
			842: (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
				__webpack_require__.r(__webpack_exports__);
				__webpack_require__.d(__webpack_exports__, {
					default: () => UnreadCountBadges
				});
				const external_PluginApi_namespaceObject = PluginApi;
				const external_BasePlugin_namespaceObject = BasePlugin;
				var external_BasePlugin_default = __webpack_require__.n(external_BasePlugin_namespaceObject);
				var external_BdApi_React_ = __webpack_require__(832);
				var external_BdApi_React_default = __webpack_require__.n(external_BdApi_React_);
				const external_Modules_react_spring_namespaceObject = Modules["react-spring"];
				var badge = __webpack_require__(185);
				const external_StyleLoader_namespaceObject = StyleLoader;
				var external_StyleLoader_default = __webpack_require__.n(external_StyleLoader_namespaceObject);
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
				const package_namespaceObject = JSON.parse('{"um":{"u2":"UnreadCountBadges"}}');
				const Settings = new SettingsManager(package_namespaceObject.um.u2);
				const settings = Settings;
				const constants_namespaceObject = Modules["@discord/constants"];
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
				const Badges = external_PluginApi_namespaceObject.WebpackModules.getByProps("NumberBadge");
				const UnreadStore = external_PluginApi_namespaceObject.WebpackModules.getByProps("getUnreadCount");
				const MutedStore = external_PluginApi_namespaceObject.WebpackModules.getByProps("isMuted");
				function ConnectedUnreadBadge(props) {
					const color = (0, flux_namespaceObject.useStateFromStores)([settings], (() => settings.get(props.color, "#5865F2")));
					return React.createElement(Badges.NumberBadge, _extends({}, props, {
						color
					}));
				}
				function ChannelUnreadBadge({
					channelId,
					guildId,
					selected
				}) {
					const unreadCount = (0, flux_namespaceObject.useStateFromStores)([UnreadStore, settings], (() => {
						if (!settings.get("showOnChannels", true)) return 0;
						if (!settings.get("showMutedChannelUnread", false) && MutedStore.isChannelMuted(guildId, channelId) && settings.get("showMutedChannelWhenSelected", true) ? !selected : false) return 0;
						return UnreadStore.getUnreadCount(channelId);
					}));
					if (0 === unreadCount) return null;
					return React.createElement(ConnectedUnreadBadge, {
						color: "channelColor",
						count: unreadCount,
						className: badge.Z.channelUnread
					});
				}
				function blobContainer_defineProperty(obj, key, value) {
					if (key in obj) Object.defineProperty(obj, key, {
						value,
						enumerable: true,
						configurable: true,
						writable: true
					});
					else obj[key] = value;
					return obj;
				}
				class BlobContainer extends external_BdApi_React_default().Component {
					constructor(...args) {
						super(...args);
						blobContainer_defineProperty(this, "timeoutId", void 0);
					}
					componentDidMount() {
						this.forceUpdate();
					}
					componentWillAppear(start) {
						start();
					}
					componentWillEnter(start) {
						start();
					}
					componentWillLeave(start) {
						this.timeoutId = setTimeout(start, 300);
					}
					componentWillUnmount() {
						clearInterval(this.timeoutId);
					}
					render() {
						const {
							className,
							animatedStyle,
							children
						} = this.props;
						return external_BdApi_React_default().createElement(external_Modules_react_spring_namespaceObject.animated.div, {
							className,
							style: animatedStyle
						}, children);
					}
				}
				const forms_namespaceObject = Modules["@discord/forms"];
				const components_namespaceObject = Modules["@discord/components"];
				var colorPicker = __webpack_require__(605);
				function colorPicker_extends() {
					colorPicker_extends = Object.assign || function(target) {
						for (var i = 1; i < arguments.length; i++) {
							var source = arguments[i];
							for (var key in source)
								if (Object.prototype.hasOwnProperty.call(source, key)) target[key] = source[key];
						}
						return target;
					};
					return colorPicker_extends.apply(this, arguments);
				}
				const Checkmark = external_BdApi_React_default().memo((props => external_BdApi_React_default().createElement("svg", colorPicker_extends({
					width: "16",
					height: "16",
					viewBox: "0 0 24 24"
				}, props), external_BdApi_React_default().createElement("path", {
					fillRule: "evenodd",
					clipRule: "evenodd",
					fill: props.color ?? "#ddd",
					d: "M8.99991 16.17L4.82991 12L3.40991 13.41L8.99991 19L20.9999 7.00003L19.5899 5.59003L8.99991 16.17Z"
				}))));
				const Dropper = external_BdApi_React_default().memo((props => external_BdApi_React_default().createElement("svg", colorPicker_extends({
					width: "14",
					height: "14",
					viewBox: "0 0 16 16"
				}, props), external_BdApi_React_default().createElement("g", {
					fill: "none"
				}, external_BdApi_React_default().createElement("path", {
					d: "M-4-4h24v24H-4z"
				}), external_BdApi_React_default().createElement("path", {
					fill: props.color ?? "#ddd",
					d: "M14.994 1.006C13.858-.257 11.904-.3 10.72.89L8.637 2.975l-.696-.697-1.387 1.388 5.557 5.557 1.387-1.388-.697-.697 1.964-1.964c1.13-1.13 1.3-2.985.23-4.168zm-13.25 10.25c-.225.224-.408.48-.55.764L.02 14.37l1.39 1.39 2.35-1.174c.283-.14.54-.33.765-.55l4.808-4.808-2.776-2.776-4.813 4.803z"
				})))));
				const defaultColors = [1752220, 3066993, 3447003, 10181046, 15277667, 15844367, 15105570, 15158332, 9807270, 6323595, 1146986, 2067276, 2123412, 7419530, 11342935, 12745742, 11027200, 10038562, 9936031, 5533306];
				const resolveColor = (color, hex = true) => {
					switch (typeof color) {
						case hex && "number":
							return external_PluginApi_namespaceObject.ColorConverter.int2hex(color);
						case !hex && "string":
							return external_PluginApi_namespaceObject.ColorConverter.hex2int(color);
						case !hex && "number":
							return color;
						case hex && "string":
							return color;
						default:
							return color;
					}
				};
				const ColorPicker = ({
					value,
					defaultValue,
					onChange,
					colors = defaultColors
				}) => {
					const [color, setColor] = (0, external_BdApi_React_.useState)(resolveColor(value));
					const intValue = (0, external_BdApi_React_.useMemo)((() => resolveColor(color, false)), [color]);
					const handleChange = (0, external_BdApi_React_.useCallback)((({
						target: {
							value
						}
					}) => {
						setColor(value);
						onChange(resolveColor(value));
					}), []);
					return external_BdApi_React_default().createElement(components_namespaceObject.Flex, {
						direction: components_namespaceObject.Flex.Direction.HORIZONTAL
					}, external_BdApi_React_default().createElement("div", {
						className: colorPicker.Z.controls
					}, external_BdApi_React_default().createElement(components_namespaceObject.Tooltip, {
						text: "Default",
						position: "bottom"
					}, (props => external_BdApi_React_default().createElement("div", colorPicker_extends({}, props, {
						className: colorPicker.Z.defaultColor,
						style: {
							backgroundColor: resolveColor(defaultValue)
						},
						onClick: () => handleChange({
							target: {
								value: defaultValue
							}
						})
					}), intValue === resolveColor(defaultValue, false) ? external_BdApi_React_default().createElement(Checkmark, {
						width: "25",
						height: "25"
					}) : null))), external_BdApi_React_default().createElement(components_namespaceObject.Tooltip, {
						text: "Custom Color",
						position: "bottom"
					}, (props => external_BdApi_React_default().createElement("div", {
						className: colorPicker.Z.inputContainer
					}, external_BdApi_React_default().createElement(Dropper, null), external_BdApi_React_default().createElement("input", colorPicker_extends({}, props, {
						style: {
							backgroundColor: resolveColor(color)
						},
						type: "color",
						className: colorPicker.Z.colorInput,
						value: resolveColor(color),
						onChange: handleChange
					})))))), external_BdApi_React_default().createElement(components_namespaceObject.Flex, {
						wrap: components_namespaceObject.Flex.Wrap.WRAP,
						className: colorPicker.Z.colorSwatches
					}, colors.map(((int, index) => external_BdApi_React_default().createElement("div", {
						key: index,
						className: colorPicker.Z.colorSwatch,
						style: {
							backgroundColor: resolveColor(int)
						},
						onClick: () => handleChange({
							target: {
								value: int
							}
						})
					}, intValue === int ? external_BdApi_React_default().createElement(Checkmark, null) : null)))));
				};
				const components_colorPicker = ColorPicker;
				const external_window_namespaceObject = window._;
				var external_window_default = __webpack_require__.n(external_window_namespaceObject);
				const icons_namespaceObject = Modules["@discord/icons"];
				const utils_namespaceObject = Modules["@discord/utils"];
				var category = __webpack_require__(911);
				function Category({
					label,
					children,
					className,
					look = Category.Looks.DEFAULT
				}) {
					const [opened, toggle] = (0, external_BdApi_React_.useState)(false);
					const isCompact = look === category.Z.compact;
					return external_BdApi_React_default().createElement("div", {
						className: (0, utils_namespaceObject.joinClassNames)(className, look, category.Z.category, {
							[category.Z.opened]: opened
						})
					}, external_BdApi_React_default().createElement("div", {
						className: category.Z.header,
						onClick: () => toggle(!opened)
					}, external_BdApi_React_default().createElement("div", {
						className: category.Z.label
					}, label), isCompact ? external_BdApi_React_default().createElement("div", {
						className: category.Z.stroke
					}) : null, external_BdApi_React_default().createElement(icons_namespaceObject.Caret, {
						direction: opened ? icons_namespaceObject.Caret.Directions.DOWN : isCompact ? icons_namespaceObject.Caret.Directions.LEFT : icons_namespaceObject.Caret.Directions.RIGHT,
						className: category.Z.caret
					})), !isCompact ? external_BdApi_React_default().createElement("div", {
						className: category.Z.divider
					}) : null, external_BdApi_React_default().createElement("div", {
						className: category.Z.content
					}, opened ? children : null));
				}
				Category.Looks = {
					COMPACT: category.Z.compact,
					DEFAULT: category.Z.default
				};
				var createUpdateWrapper_React = __webpack_require__(832);
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
				var components_Settings = __webpack_require__(927);
				function Settings_extends() {
					Settings_extends = Object.assign || function(target) {
						for (var i = 1; i < arguments.length; i++) {
							var source = arguments[i];
							for (var key in source)
								if (Object.prototype.hasOwnProperty.call(source, key)) target[key] = source[key];
						}
						return target;
					};
					return Settings_extends.apply(this, arguments);
				}
				const SwitchItem = hooks_createUpdateWrapper(external_PluginApi_namespaceObject.WebpackModules.getByDisplayName("SwitchItem"));
				function SwitchSetting({
					id,
					name,
					note,
					defaultValue
				}) {
					return external_BdApi_React_default().createElement(SwitchItem, {
						note,
						value: settings.get(id, defaultValue),
						onChange: value => settings.set(id, value)
					}, name);
				}
				function ColorSetting({
					id,
					name,
					note,
					defaultValue
				}) {
					return external_BdApi_React_default().createElement(forms_namespaceObject.FormItem, {
						title: name
					}, external_BdApi_React_default().createElement(components_colorPicker, {
						value: resolveColor(settings.get(id, defaultValue)),
						defaultValue,
						onChange: external_window_default().debounce((color => settings.set(id, resolveColor(color))), 300),
						colors: defaultColors
					}), external_BdApi_React_default().createElement(forms_namespaceObject.FormText, {
						type: "description"
					}, note), external_BdApi_React_default().createElement(forms_namespaceObject.FormDivider, {
						className: components_Settings.Z.divider
					}));
				}
				const settingsItems = {
					total: {
						totalColor: {
							name: "Total Unread Color",
							type: "color",
							defaultValue: "#5865F2",
							note: "Color of the unread badge on the home icon."
						},
						showTotalUnreadCount: {
							type: "switch",
							name: "Total Unreads",
							note: "Shows a unread counter of your total unread messages in the dm icon.",
							defaultValue: true
						},
						includeMutedGuildsInTotal: {
							type: "switch",
							name: "Include Muted Guilds",
							note: "Includes the muted count of a guild in the unread count calculation.",
							defaultValue: false
						},
						includeMutedChannelsInTotal: {
							type: "switch",
							name: "Include Muted Channels of Guilds",
							note: "Includes muted channels inside guilds in the unread count calculation.",
							defaultValue: false
						},
						includeDmsInTotal: {
							type: "switch",
							name: "Include DMS",
							note: "Includes direct messages in the unread count calculation.",
							defaultValue: true
						},
						includeGroupsInTotal: {
							type: "switch",
							name: "Include Groups",
							note: "Includes groups in the unread count calculation.",
							defaultValue: true
						},
						includeMutedDms: {
							type: "switch",
							name: "Include Muted DMS",
							note: "Includes muted dms in the unread count calculation.",
							defaultValue: false
						},
						includeMutedGroups: {
							type: "switch",
							name: "Include Muted groups of Guilds",
							note: "Includes muted groups in the unread count calculation.",
							defaultValue: false
						}
					},
					guilds: {
						guildColor: {
							name: "Guild Unread Color",
							type: "color",
							defaultValue: "#5865F2",
							note: "Color of the unread badge on the guild icon."
						},
						showOnGuilds: {
							type: "switch",
							name: "Show on Guilds",
							note: "Shows a unread counter of unread messages on guilds.",
							defaultValue: true
						},
						showMutedGuildUnread: {
							type: "switch",
							name: "Include Muted Guilds",
							note: "Show a unread counter on muted guilds.",
							defaultValue: false
						},
						includeMutedInGuild: {
							type: "switch",
							name: "Include Muted Channels in Guild",
							note: "Includes muted channels inside the guild in the unread count calculation.",
							defaultValue: false
						}
					},
					channels: {
						channelColor: {
							name: "Channel Unread Color",
							type: "color",
							defaultValue: "#5865F2",
							note: "Color of the unread badge on the channel item."
						},
						showOnChannels: {
							type: "switch",
							name: "Show on Channels",
							note: "Shows a unread counter of unread messages on channel items.",
							defaultValue: true
						},
						showMutedChannelUnread: {
							type: "switch",
							name: "Include Muted Channels",
							note: "Show a unread counter on channel items.",
							defaultValue: false
						},
						showMutedChannelWhenSelected: {
							type: "switch",
							name: "Show when selected",
							note: "Shows the unread counter no matter if the channel is muted when it's selected.",
							defaultValue: true
						}
					},
					folders: {
						folderColor: {
							name: "Folder Unread Color",
							type: "color",
							defaultValue: "#5865F2",
							note: "Color of the unread badge on the folders."
						},
						showOnFolders: {
							type: "switch",
							name: "Show on Folders",
							note: "Shows a unread counter of unread messages on folders.",
							defaultValue: true
						},
						includeMutedGuildsInFolders: {
							type: "switch",
							name: "Include Muted Guilds",
							note: "Includes the muted count of a guild in the unread count calculation.",
							defaultValue: false
						},
						includeMutedChannelsInFolders: {
							type: "switch",
							name: "Include Muted Channels of Guilds",
							note: "Includes muted channels inside guilds in the unread count calculation.",
							defaultValue: false
						}
					}
				};
				function SettingsPanel() {
					return Object.entries(settingsItems).map((([key, items]) => external_BdApi_React_default().createElement(Category, {
						look: Category.Looks.COMPACT,
						label: external_window_default().upperFirst(key),
						key
					}, Object.entries(items).map((([id, props]) => {
						switch (props.type) {
							case "switch":
								return external_BdApi_React_default().createElement(SwitchSetting, Settings_extends({}, props, {
									id,
									key: id
								}));
							case "color":
								return external_BdApi_React_default().createElement(ColorSetting, Settings_extends({}, props, {
									id,
									key: id
								}));
						}
					})))));
				}
				const stores_namespaceObject = Modules["@discord/stores"];
				function UnreadCountBadges_defineProperty(obj, key, value) {
					if (key in obj) Object.defineProperty(obj, key, {
						value,
						enumerable: true,
						configurable: true,
						writable: true
					});
					else obj[key] = value;
					return obj;
				}
				const UnreadCountBadges_MutedStore = external_PluginApi_namespaceObject.WebpackModules.getByProps("isMuted");
				const UnreadCountBadges_UnreadStore = external_PluginApi_namespaceObject.WebpackModules.getByProps("getUnreadCount");
				const ChannelsStore = external_PluginApi_namespaceObject.WebpackModules.getByProps("getChannels");
				const UnreadCountBadges_Badges = external_PluginApi_namespaceObject.WebpackModules.getByProps("NumberBadge");
				const GuildChannelsStore = external_PluginApi_namespaceObject.WebpackModules.getByProps("getMutableGuildChannels");
				const FolderStatesStore = external_PluginApi_namespaceObject.WebpackModules.getByProps("isFolderExpanded");
				function BlobMaskWrapper(props) {
					const {
						collector,
						maskType,
						shouldShow,
						color
					} = props;
					const unreadCount = (0, flux_namespaceObject.useStateFromStores)([settings, UnreadCountBadges_MutedStore, UnreadCountBadges_UnreadStore], collector.bind(null, props));
					const isActive = shouldShow(unreadCount, props);
					props.unreadBadge = isActive ? external_BdApi_React_default().createElement(ConnectedUnreadBadge, {
						color,
						count: unreadCount
					}) : null;
					props.unreadBadgeWidth = isActive ? UnreadCountBadges_Badges.getBadgeWidthForValue(unreadCount) : null;
					return external_BdApi_React_default().createElement(maskType, props);
				}
				class UnreadCountBadges extends(external_BasePlugin_default()) {
					constructor(...args) {
						super(...args);
						UnreadCountBadges_defineProperty(this, "updateGuilds", void 0);
						UnreadCountBadges_defineProperty(this, "updateHomeIcon", void 0);
						UnreadCountBadges_defineProperty(this, "id", Math.random().toString().slice(2, 10));
						UnreadCountBadges_defineProperty(this, "settings", settings);
					}
					getSettingsPanel() {
						return external_BdApi_React_default().createElement(SettingsPanel, null);
					}
					onStart() {
						external_StyleLoader_default().inject();
						this.patchBlobMask();
						this.patchGuild();
						this.patchChannelItem();
						this.patchFolder();
						this.patchHomeIcon();
					}
					async patchChannelItem() {
						const ChannelItem = external_PluginApi_namespaceObject.WebpackModules.getModule((m => "ChannelItem" === m?.default?.displayName));
						external_PluginApi_namespaceObject.Patcher.after(ChannelItem, "default", ((_, [{
							channel,
							children,
							muted,
							selected
						}]) => {
							if (!Array.isArray(children) || channel.type == constants_namespaceObject.ChannelTypes.GUILD_VOICE) return;
							children.push(external_BdApi_React_default().createElement(ChannelUnreadBadge, {
								channelId: channel.id,
								guildId: channel.guild_id,
								selected
							}));
						}));
					}
					async patchBlobMask() {
						const BlobMask = external_PluginApi_namespaceObject.WebpackModules.getByDisplayName("BlobMask");
						const configs = {
							in: {
								friction: 30,
								tension: 900,
								mass: 1
							},
							out: {
								duration: 150,
								friction: 10,
								tension: 100,
								mass: 1
							}
						};
						const ensureMask = _this => {
							if (!_this.state || _this.state.unreadBadgeMask) return;
							_this.state.unreadBadgeMask = new external_Modules_react_spring_namespaceObject.Controller({
								spring: 0
							});
						};
						external_PluginApi_namespaceObject.Patcher.after(BlobMask, "getDerivedStateFromProps", ((_, [props, state], res) => {
							if (!props.unreadBadge) return;
							if (!res) res = {
								hasRenderedBadge: false,
								lowerBadgeMask: state.lowerBadgeMask ? state.lowerBadgeMask.update({
									spring: props.lowerBadge ? 1 : 0,
									immediate: true
								}) : new external_Modules_react_spring_namespaceObject.Controller({
									spring: props.lowerBadge ? 1 : 0,
									immediate: true
								}),
								upperBadgeMask: state.upperBadgeMask ? state.upperBadgeMask.update({
									spring: props.upperBadge ? 1 : 0,
									immediate: true
								}) : new external_Modules_react_spring_namespaceObject.Controller({
									spring: props.upperBadge ? 1 : 0,
									immediate: true
								}),
								unreadBadgeMask: null,
								borderRadiusMask: state.borderRadiusMask || new external_Modules_react_spring_namespaceObject.Controller({
									spring: 0
								}),
								renderComplex: false
							};
							if (!res.unreadBadgeMask) res.unreadBadgeMask = state.unreadBadgeMask ?? new external_Modules_react_spring_namespaceObject.Controller({
								spring: props.unreadBadge ? 1 : 0
							});
							if (!res.hasRenderedBadge) {
								res.hasRenderedBadge = Boolean(props.unreadBadge);
								if (!res.renderComplex) res.renderComplex = Boolean(props.unreadBadge);
							}
							return res;
						}));
						external_PluginApi_namespaceObject.Patcher.after(BlobMask.prototype, "componentDidMount", (_this => {
							ensureMask(_this);
							if (_this.state.unreadBadgeMask) _this.state.unreadBadgeMask.update({
								spring: _this.props.unreadBadge ? 1 : 0,
								immediate: !document.hasFocus()
							}).start();
						}));
						external_PluginApi_namespaceObject.Patcher.after(BlobMask.prototype, "componentDidUpdate", ((_this, [prevProps]) => {
							ensureMask(_this);
							if (_this.props.unreadBadge && !prevProps.unreadBadge) {
								if (_this.state.unreadBadgeMask) _this.state.unreadBadgeMask.update({
									spring: 1,
									immediate: !document.hasFocus(),
									config: configs.in
								}).start();
							} else if (!_this.props.unreadBadge && prevProps.unreadBadge)
								if (_this.state.unreadBadgeMask) _this.state.unreadBadgeMask.update({
									spring: 0,
									immediate: !document.hasFocus(),
									config: configs.out
								}).start();
						}));
						external_PluginApi_namespaceObject.Patcher.after(BlobMask.prototype, "componentWillUnmount", (_this => {
							if (_this.state.unreadBadgeMask) _this.state.unreadBadgeMask.dispose();
						}));
						external_PluginApi_namespaceObject.Patcher.after(BlobMask.prototype, "render", (function(_this, _, res) {
							ensureMask(_this);
							if (!_this.state.renderComplex) return;
							const [defs, {
								props: {
									children: [, masks]
								}
							}, stroke] = external_PluginApi_namespaceObject.Utilities.findInReactTree(res, (e => e?.overflow))?.children || [];
							const childTree = external_PluginApi_namespaceObject.Utilities.findInReactTree(res, (e => e?.hasOwnProperty?.("transitionAppear")));
							if (!defs || !masks || !stroke || !childTree) return;
							const useElement = external_BdApi_React_default().createElement("use", {
								href: "#" + _this.state.maskId + "-unreadBadge",
								fill: "black"
							});
							const spring = _this.state.unreadBadgeMask.springs.spring;
							const badgeStyle = {
								opacity: spring.to([0, .5, 1], [0, 0, 1]),
								transform: spring.to((e => `translate(${26 - 16 * e}px, ${16 - 15 * e})`))
							};
							defs.props.children.push(external_BdApi_React_default().createElement(external_Modules_react_spring_namespaceObject.animated.rect, {
								id: _this.state.maskId + "-unreadBadge",
								x: "-5",
								y: "28",
								width: _this.props.unreadBadgeWidth + 8,
								height: "24",
								rx: "12",
								ry: "12",
								transform: _this.getBadgePositionInterpolation(_this.state.unreadBadgeMask)
							}));
							masks.props.children.push(useElement);
							stroke.props.children.push(useElement);
							childTree.children.push(_this.props.unreadBadge ? external_BdApi_React_default().createElement(BlobContainer, {
								className: badge.Z.unread,
								animatedStyle: badgeStyle,
								key: "unreadBadge"
							}, _this.props.unreadBadge) : null);
						}));
					}
					checkCount(count) {
						return count > 1e3 ? 1e3 * Math.floor(count / 1e3) : count;
					}
					getUnreadCountForGuild(guildId, includeMutedChannels) {
						const channels = ChannelsStore.getChannels(guildId);
						if (!Array.isArray(channels.SELECTABLE)) return 0;
						return channels.SELECTABLE.reduce(((count, {
							channel
						}) => {
							if (!includeMutedChannels && UnreadCountBadges_MutedStore.isChannelMuted(channel.guild_id, channel.id)) return count;
							if (!includeMutedChannels && channel.parent_id && UnreadCountBadges_MutedStore.isChannelMuted(guildId, channel.parent_id)) return count;
							return count += UnreadCountBadges_UnreadStore.getUnreadCount(channel.id);
						}), 0);
					}
					async patchGuild() {
						const selector = `.${external_PluginApi_namespaceObject.WebpackModules.getByProps("listItemWidth", "navigationIcon")?.listItem}`;
						const Guild = await external_PluginApi_namespaceObject.ReactComponents.getComponentByName("Guild", selector);
						external_PluginApi_namespaceObject.Patcher.after(Guild.component.prototype, "render", ((_this, __, res) => {
							const mask = external_PluginApi_namespaceObject.Utilities.findInReactTree(res, (m => m?.props?.hasOwnProperty("lowerBadgeWidth")));
							if (!mask || mask.type === BlobMaskWrapper) return;
							Object.assign(mask.props, {
								maskType: mask.type,
								shouldShow: unread => unread > 0,
								collector: ({
									guildId
								}) => {
									if (!settings.get("showOnGuilds", true)) return 0;
									if (!settings.get("showMutedGuildUnread", false) && UnreadCountBadges_MutedStore.isMuted(guildId)) return 0;
									return this.checkCount(this.getUnreadCountForGuild(guildId, settings.get("includeMutedInGuild", false)));
								},
								color: "guildColor",
								guildId: _this.props.guild.id
							});
							mask.type = BlobMaskWrapper;
						}));
						Guild.forceUpdateAll();
						this.updateGuilds = () => Guild.forceUpdateAll();
					}
					async patchHomeIcon() {
						const selector = `.${external_PluginApi_namespaceObject.WebpackModules.getByProps("wrapper", "childWrapper")?.childWrapper}`;
						const TutorialIndicator = await external_PluginApi_namespaceObject.ReactComponents.getComponentByName("TutorialIndicator", selector);
						external_PluginApi_namespaceObject.Patcher.after(TutorialIndicator.component.prototype, "render", ((_this, _, res) => {
							if ("friends-list" !== _this.props.tutorialId) return;
							const mask = external_PluginApi_namespaceObject.Utilities.findInReactTree(res, (m => m?.props?.hasOwnProperty("lowerBadgeWidth")));
							if (!mask || mask.type === BlobMaskWrapper) return;
							Object.assign(mask.props, {
								collector: () => {
									if (!settings.get("showTotalUnreadCount", true)) return 0;
									const guilds = Object.values(stores_namespaceObject.Guilds.getGuilds()).reduce(((count, guild) => {
										if (!settings.get("includeMutedGuildsInTotal", false) && UnreadCountBadges_MutedStore.isMuted(guild.id)) return count;
										return count += this.getUnreadCountForGuild(guild.id, settings.get("includeMutedChannelsInTotal", false));
									}), 0);
									const dms = Object.values(GuildChannelsStore.getMutablePrivateChannels()).reduce(((count, channel) => {
										if (settings.get("includeDmsInTotal", true) && channel.type === constants_namespaceObject.ChannelTypes.DM && (settings.get("includeMutedDms", false) ? !UnreadCountBadges_MutedStore.isChannelMuted(channel.guild_id, channel.id) : true)) count += UnreadCountBadges_UnreadStore.getUnreadCount(channel.id);
										if (!settings.get("includeGroupsInTotal", true) && channel.type === constants_namespaceObject.ChannelTypes.GROUP_DM && (settings.get("includeMutedGroups", false) ? !UnreadCountBadges_MutedStore.isChannelMuted(channel.guild_id, channel.id) : true)) count += UnreadCountBadges_UnreadStore.getUnreadCount(channel.id);
										return count;
									}), 0);
									return this.checkCount(guilds + dms);
								},
								color: "totalColor",
								maskType: mask.type,
								shouldShow: unread => unread > 0
							});
							mask.type = BlobMaskWrapper;
						}));
						this.updateHomeIcon = () => TutorialIndicator.forceUpdateAll();
						TutorialIndicator.forceUpdateAll();
					}
					async patchFolder() {
						const FolderIcon = external_PluginApi_namespaceObject.WebpackModules.getModule((m => m?.type?.render?.toString().indexOf("folderColor") > -1)).type;
						external_PluginApi_namespaceObject.Patcher.after(FolderIcon, "render", ((_, [props], res) => {
							const mask = external_PluginApi_namespaceObject.Utilities.findInReactTree(res, (e => e?.props?.hasOwnProperty("lowerBadgeWidth")));
							if (!mask || mask.type === BlobMaskWrapper) return;
							Object.assign(mask.props, {
								collector: ({
									guildIds
								}) => {
									if (!settings.get("showOnFolders", true)) return 0;
									return this.checkCount(guildIds.reduce(((count, id) => {
										if (!settings.get("includeMutedGuildsInFolders", false) && UnreadCountBadges_MutedStore.isMuted(id)) return count;
										return count += this.getUnreadCountForGuild(id, settings.get("includeMutedChannelsInFolders", false));
									}), 0));
								},
								color: "folderColor",
								maskType: mask.type,
								guildIds: props.guildIds,
								shouldShow: (unread, props) => unread > 0 && (props.isFolderExpanded ? settings.get("showOnExpandedFolders", true) : true),
								isFolderExpanded: FolderStatesStore.isFolderExpanded(props.folderId)
							});
							mask.type = BlobMaskWrapper;
						}));
					}
					onStop() {
						external_StyleLoader_default().remove();
						external_PluginApi_namespaceObject.Patcher.unpatchAll();
						if ("function" === typeof this.updateGuilds) this.updateGuilds();
						if ("function" === typeof this.updateHomeIcon) this.updateHomeIcon();
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
		var __webpack_exports__ = __webpack_require__(842);
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