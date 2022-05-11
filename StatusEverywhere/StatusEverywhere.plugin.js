/**
 * @name StatusEverywhere
 * @version 2.3.4
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
		"version": "2.3.4",
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
	"changelog": [{
		"title": "fixes",
		"type": "fixed",
		"items": [
			"Fixed patching MemberList."
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
			"readme": true,
			"previews": [{
					"name": "Chat",
					"src": "assets/chat.png"
				},
				{
					"name": "MemberList",
					"src": "assets/memberlist.png"
				},
				{
					"name": "Account",
					"src": "assets/account.png"
				},
				{
					"name": "Customization",
					"src": "assets/settings.png"
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
			672: (module, __webpack_exports__, __webpack_require__) => {
				__webpack_require__.d(__webpack_exports__, {
					Z: () => __WEBPACK_DEFAULT_EXPORT__
				});
				var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(645);
				var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = __webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
				var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()((function(i) {
					return i[1];
				}));
				___CSS_LOADER_EXPORT___.push([module.id, ".StatusEverywhere-avatar-chatAvatar{overflow:visible !important;box-sizing:border-box}.StatusEverywhere-avatar-userPopout{border-radius:50%;box-sizing:border-box}.StatusEverywhere-avatar-userPopout[data-mobile=false]~svg foreignObject{mask:none;border-radius:50%;overflow:hidden}.StatusEverywhere-avatar-speaking foreignObject,.StatusEverywhere-avatar-radial foreignObject{border:2px solid var(--status-color);border-spacing:2px;border-radius:50%;box-sizing:border-box}.StatusEverywhere-avatar-radial foreignObject{border-width:3px}.StatusEverywhere-avatar-radial[data-mobile=false][data-typing=false] foreignObject{border-width:3px;mask:none}.StatusEverywhere-avatar-radial[data-mobile=false][data-typing=false] rect{display:none}.userInfo-regn9W{justify-content:flex-start;padding:16px 16px 0 146px}.userInfo-regn9W .button-f2h6uQ{margin-left:auto}.accountSettingsAvatar{top:46px}.avatar-2e8lTP::before{display:none}", ""]);
				___CSS_LOADER_EXPORT___.locals = {
					chatAvatar: "StatusEverywhere-avatar-chatAvatar",
					userPopout: "StatusEverywhere-avatar-userPopout",
					speaking: "StatusEverywhere-avatar-speaking",
					radial: "StatusEverywhere-avatar-radial"
				};
				StyleLoader.append(module.id, ___CSS_LOADER_EXPORT___.toString());
				const __WEBPACK_DEFAULT_EXPORT__ = Object.assign(___CSS_LOADER_EXPORT___, ___CSS_LOADER_EXPORT___.locals);
			},
			89: (module, __webpack_exports__, __webpack_require__) => {
				__webpack_require__.d(__webpack_exports__, {
					Z: () => __WEBPACK_DEFAULT_EXPORT__
				});
				var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(645);
				var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = __webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
				var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()((function(i) {
					return i[1];
				}));
				___CSS_LOADER_EXPORT___.push([module.id, ".StatusEverywhere-colorPicker-inputContainer{position:relative;display:inline-table}.StatusEverywhere-colorPicker-inputContainer svg{position:absolute;top:5px;right:5px}.StatusEverywhere-colorPicker-colorInput{outline:none;width:70px;border:none;height:54px;margin-top:1px;border-radius:4px;cursor:pointer}.StatusEverywhere-colorPicker-colorInput::-webkit-color-swatch{border:none}.StatusEverywhere-colorPicker-controls{padding-left:1px;padding-top:2px;display:flex}.StatusEverywhere-colorPicker-colorSwatch{cursor:pointer;border-radius:4px;width:23px;height:23px;margin:4px;display:flex;align-items:center;justify-content:center}.StatusEverywhere-colorPicker-colorSwatches{align-content:flex-start;margin-left:5px !important;max-width:340px}.StatusEverywhere-colorPicker-defaultColor{cursor:pointer;width:70px;height:58px;border-radius:4px;margin-right:9px;display:flex;align-items:center;justify-content:center}.StatusEverywhere-colorPicker-tiny{width:30px;height:30px;border-radius:4px}.StatusEverywhere-colorPicker-tiny .StatusEverywhere-colorPicker-input{outline:none;width:30px;border:none;height:30px;border-radius:4px;cursor:pointer}.StatusEverywhere-colorPicker-tiny .StatusEverywhere-colorPicker-input::-webkit-color-swatch{border:none}.StatusEverywhere-colorPicker-tiny svg{position:absolute;bottom:5px;right:5px;width:15px;height:15px;pointer-events:none}", ""]);
				___CSS_LOADER_EXPORT___.locals = {
					inputContainer: "StatusEverywhere-colorPicker-inputContainer",
					colorInput: "StatusEverywhere-colorPicker-colorInput",
					controls: "StatusEverywhere-colorPicker-controls",
					colorSwatch: "StatusEverywhere-colorPicker-colorSwatch",
					colorSwatches: "StatusEverywhere-colorPicker-colorSwatches",
					defaultColor: "StatusEverywhere-colorPicker-defaultColor",
					tiny: "StatusEverywhere-colorPicker-tiny",
					input: "StatusEverywhere-colorPicker-input"
				};
				StyleLoader.append(module.id, ___CSS_LOADER_EXPORT___.toString());
				const __WEBPACK_DEFAULT_EXPORT__ = Object.assign(___CSS_LOADER_EXPORT___, ___CSS_LOADER_EXPORT___.locals);
			},
			530: (module, __webpack_exports__, __webpack_require__) => {
				__webpack_require__.d(__webpack_exports__, {
					Z: () => __WEBPACK_DEFAULT_EXPORT__
				});
				var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(645);
				var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = __webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
				var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()((function(i) {
					return i[1];
				}));
				___CSS_LOADER_EXPORT___.push([module.id, ".StatusEverywhere-settings-settingContainer{position:relative;border-bottom:thin solid var(--background-modifier-accent);padding-bottom:20px;margin-bottom:20px}.StatusEverywhere-settings-colorPickerItem{position:absolute;top:0;right:5px}", ""]);
				___CSS_LOADER_EXPORT___.locals = {
					settingContainer: "StatusEverywhere-settings-settingContainer",
					colorPickerItem: "StatusEverywhere-settings-colorPickerItem"
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
				___CSS_LOADER_EXPORT___.push([module.id, ".StatusEverywhere-category-category.StatusEverywhere-category-compact{position:inherit}.StatusEverywhere-category-category.StatusEverywhere-category-compact .StatusEverywhere-category-header{display:flex;align-items:center;justify-content:space-between;padding:2px;padding-left:10px;text-transform:uppercase;font-weight:600;font-size:.9rem}.StatusEverywhere-category-category.StatusEverywhere-category-compact .StatusEverywhere-category-header .StatusEverywhere-category-caret{float:right;display:inline-flex;color:var(--interactive-normal)}.StatusEverywhere-category-category.StatusEverywhere-category-compact .StatusEverywhere-category-header .StatusEverywhere-category-stroke{background-color:var(--background-modifier-accent);height:2px;flex:1;margin:0 5px 0 10px}.StatusEverywhere-category-category.StatusEverywhere-category-compact .StatusEverywhere-category-header .StatusEverywhere-category-label{color:var(--interactive-normal)}.StatusEverywhere-category-category.StatusEverywhere-category-compact .StatusEverywhere-category-content{padding-left:20px;width:calc(100% - 40px)}.StatusEverywhere-category-category.StatusEverywhere-category-default{background:rgba(32,34,37,.3);border:1px solid #202225;margin:5px;cursor:pointer;border-radius:3px;--color: var(--interactive-normal)}.StatusEverywhere-category-category.StatusEverywhere-category-default:hover{--color: var(--interactive-hover)}.StatusEverywhere-category-category.StatusEverywhere-category-default .StatusEverywhere-category-header{padding-right:5px;padding:10px 15px;padding-bottom:0;display:flex;align-items:center;justify-content:space-between}.StatusEverywhere-category-category.StatusEverywhere-category-default .StatusEverywhere-category-header .StatusEverywhere-category-stroke{display:none}.StatusEverywhere-category-category.StatusEverywhere-category-default .StatusEverywhere-category-header .StatusEverywhere-category-divider{position:relative}.StatusEverywhere-category-category.StatusEverywhere-category-default .StatusEverywhere-category-header .StatusEverywhere-category-label{font-size:1rem;font-weight:600;color:#fff;text-transform:uppercase}.StatusEverywhere-category-category.StatusEverywhere-category-default .StatusEverywhere-category-header .StatusEverywhere-category-caret{color:var(--color);transition:color .3s}.StatusEverywhere-category-category.StatusEverywhere-category-default.StatusEverywhere-category-opened .StatusEverywhere-category-content{padding:8px}.StatusEverywhere-category-category.StatusEverywhere-category-default.StatusEverywhere-category-opened .StatusEverywhere-category-header{background:rgba(32,34,37,.6)}", ""]);
				___CSS_LOADER_EXPORT___.locals = {
					category: "StatusEverywhere-category-category",
					compact: "StatusEverywhere-category-compact",
					header: "StatusEverywhere-category-header",
					caret: "StatusEverywhere-category-caret",
					stroke: "StatusEverywhere-category-stroke",
					label: "StatusEverywhere-category-label",
					content: "StatusEverywhere-category-content",
					default: "StatusEverywhere-category-default",
					divider: "StatusEverywhere-category-divider",
					opened: "StatusEverywhere-category-opened"
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
				default: () => StatusEverywhere
			});
			var patches_namespaceObject = {};
			__webpack_require__.r(patches_namespaceObject);
			__webpack_require__.d(patches_namespaceObject, {
				patchAccount: () => patchAccountSection,
				patchAuditLog: () => patchAuditLog,
				patchChannelMessage: () => patchChannelMessage,
				patchChatAvatar: () => patchChatAvatar,
				patchColorModule: () => patchColorModule,
				patchGuildSettingsMembers: () => patchGuildSettingsMembers,
				patchHeaderPlaying: () => patchHeaderPlaying,
				patchMemberList: () => patchMemberListItem,
				patchPartyMembers: () => patchPartyMembers,
				patchPrivateChannel: () => patchPrivateChannel,
				patchUserPopout: () => patchUserPopout,
				patchUserProfile: () => patchUserProfile,
				patchVoice: () => patchVoiceUser
			});
			const external_PluginApi_namespaceObject = PluginApi;
			const external_BasePlugin_namespaceObject = BasePlugin;
			var external_BasePlugin_default = __webpack_require__.n(external_BasePlugin_namespaceObject);
			const flux_namespaceObject = Modules["@discord/flux"];
			var external_BdApi_React_ = __webpack_require__(113);
			var external_BdApi_React_default = __webpack_require__.n(external_BdApi_React_);
			const stores_namespaceObject = Modules["@discord/stores"];
			const constants_namespaceObject = Modules["@discord/constants"];
			const icons_namespaceObject = Modules["@discord/icons"];
			var avatar = __webpack_require__(672);
			const package_namespaceObject = JSON.parse('{"um":{"u2":"StatusEverywhere"}}');
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
			const external_window_namespaceObject = window._;
			var external_window_default = __webpack_require__.n(external_window_namespaceObject);
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
			const components_namespaceObject = Modules["@discord/components"];
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
			const {
				ComponentDispatch
			} = external_PluginApi_namespaceObject.WebpackModules.getByProps("ComponentDispatch");
			const {
				Sizes: AvatarSizes,
				AnimatedAvatar
			} = external_PluginApi_namespaceObject.WebpackModules.getByProps("AnimatedAvatar");
			const {
				useContextMenuUser
			} = external_PluginApi_namespaceObject.WebpackModules.getByProps("useContextMenuUser") ?? {
				useContextMenuUser: () => {}
			};
			const StatusModule = external_PluginApi_namespaceObject.WebpackModules.getByProps("getStatusColor");
			const Members = external_PluginApi_namespaceObject.WebpackModules.getByProps("subscribeMembers");
			const ActivityUtils = external_PluginApi_namespaceObject.WebpackModules.getByProps("isStreaming");
			const Popout = external_PluginApi_namespaceObject.WebpackModules.getByDisplayName("Popout");
			const UserPopoutContainer = external_PluginApi_namespaceObject.WebpackModules.getModule((m => "UserPopoutContainer" === m.type?.displayName));
			const ActivityStore = external_PluginApi_namespaceObject.WebpackModules.getByProps("getAllApplicationActivities");
			function isStreaming(userId) {
				const activities = ActivityStore.getActivities(userId);
				return ActivityUtils.isStreaming(activities);
			}
			let guilds = {};
			function reloadSubscriptions(guildId, userId, type = "add") {
				if ("add" === type && guilds[guildId].has(userId)) return;
				external_window_default().forEach(guilds, ((users, guildId) => {
					if (!users.size) return;
					Members.unsubscribeMembers(guildId, Array.from(users));
				}));
				if ("add" === type) guilds[guildId].add(userId);
				else if ("remove" === type) guilds[guildId].delete(userId);
				if ("add" === type) external_window_default().forEach(guilds, ((users, guildId) => {
					if (!users.size) return;
					Members.subscribeMembers(guildId, Array.from(users));
				}));
			}
			function useSubscribeGuildMembers(guildId, userId, shouldWatch) {
				if (!guilds[guildId]) guilds[guildId] = new Set;
				(0, external_BdApi_React_.useEffect)((() => {
					if (!shouldWatch) return;
					reloadSubscriptions(guildId, userId, "add");
					return function() {
						reloadSubscriptions(guildId, userId, "remove");
					};
				}), [guildId, userId, shouldWatch]);
			}
			const classes = {
				...external_PluginApi_namespaceObject.WebpackModules.getByProps("sizeEmoji", "avatar")
			};
			function StatusEverywhereAvatar(props) {
				const {
					type,
					animated = false,
					size = AvatarSizes.SIZE_40,
					user,
					channel_id = stores_namespaceObject.SelectedChannels.getChannelId(),
					radial: radialConfig,
					showTyping,
					shouldWatch = true,
					AvatarComponent = AnimatedAvatar,
					onMouseEnter,
					onMouseLeave,
					shouldShowUserPopout,
					resolution,
					borderBox = true
				} = props;
				if (!user) {
					external_PluginApi_namespaceObject.Logger.warn("No user provided");
					return null;
				}
				const [shouldAnimate, setAnimate] = (0, external_BdApi_React_.useState)(animated);
				const [hasUserPopout, setUserPopout] = (0, external_BdApi_React_.useState)(false);
				const streaming = isStreaming(user.id);
				const [status, isMobile, isTyping, statusColor, radial, forceLoadStatus, res] = (0,
					flux_namespaceObject.useStateFromStoresArray)([stores_namespaceObject.TypingUsers, stores_namespaceObject.Status, settings], (() => [streaming ? "streaming" : stores_namespaceObject.Status.getStatus(user.id), stores_namespaceObject.Status.isMobileOnline(user.id), stores_namespaceObject.TypingUsers.isTyping(channel_id, user.id) && settings.get(showTyping?.id, showTyping?.value ?? false) && showTyping, StatusModule.getStatusColor(streaming ? "streaming" : stores_namespaceObject.Status.getStatus(user.id)), settings.get(radialConfig?.id, radialConfig?.value), settings.get("forceLoadStatus", true), settings.get(resolution?.id, resolution?.value) ?? 56]));
				try {
					useSubscribeGuildMembers(stores_namespaceObject.SelectedGuilds.getGuildId(), user.id, null != stores_namespaceObject.SelectedGuilds.getGuildId() && shouldWatch && forceLoadStatus);
				} catch (error) {
					external_PluginApi_namespaceObject.Logger.error("Error while subscribing to guild member events:\n", error);
				}
				(0, external_BdApi_React_.useEffect)((() => {
					if (shouldAnimate === animated) return;
					try {
						setAnimate(animated);
					} catch (error) {
						external_PluginApi_namespaceObject.Logger.error("Error while setting 'animated' state:\n", error);
					}
				}), [animated]);
				(0, external_BdApi_React_.useEffect)((() => {
					if ("chat" !== props.type) return;
					try {
						const key = `${props.subscribeToGroupId}:${user.id}`;
						ComponentDispatch.subscribeKeyed(constants_namespaceObject.ComponentActionsKeyed.ANIMATE_CHAT_AVATAR, key, setAnimate);
						return () => void ComponentDispatch.unsubscribeKeyed(constants_namespaceObject.ComponentActionsKeyed.ANIMATE_CHAT_AVATAR, key, setAnimate);
					} catch (error) {
						external_PluginApi_namespaceObject.Logger.error("Error while subscribing to ChatAvatarAnimate:\n", error);
					}
				}), [user, props.subscribeToGroupId]);
				const onContextMenu = useContextMenuUser(user.id, channel_id);
				return external_BdApi_React_default().createElement("div", {
					onMouseEnter,
					onMouseLeave,
					className: external_PluginApi_namespaceObject.Utilities.className("avatarWrapper", {
						[avatar.Z.radial]: radial,
						[avatar.Z.userPopout]: "user-popout" === type
					}),
					"data-status": status,
					"data-mobile": isMobile,
					"data-typing": isTyping,
					"data-user-id": user.id,
					style: {
						"--status-color": statusColor
					}
				}, external_BdApi_React_default().createElement(Popout, {
					renderPopout: props => external_BdApi_React_default().createElement(UserPopoutContainer, _extends({}, props, {
						userId: user.id,
						channelId: channel_id,
						guildId: stores_namespaceObject.SelectedGuilds.getGuildId()
					})),
					animation: Popout.Animation.TRANSLATE,
					position: Popout.Positions.RIGHT,
					shouldShow: hasUserPopout && shouldShowUserPopout,
					onRequestOpen: () => setUserPopout(true),
					onRequestClose: () => setUserPopout(false)
				}, (popoutProps => external_BdApi_React_default().createElement(AvatarComponent, _extends({}, popoutProps, {
					onClick: setUserPopout.bind(null, !hasUserPopout),
					statusTooltip: true,
					statusColor,
					className: external_PluginApi_namespaceObject.Utilities.className(borderBox && avatar.Z.chatAvatar, "chat" === type && classes.avatar, "chat" === type && classes.clickable, props.className, {
						[avatar.Z.speaking]: props.isSpeaking
					}),
					status,
					isTyping,
					isMobile,
					size,
					src: user.getAvatarURL(props.guildId, res, shouldAnimate),
					onContextMenu
				})))));
			}
			StatusEverywhereAvatar.Sizes = AvatarSizes;
			const StatusAvatar = ErrorBoundary.from(StatusEverywhereAvatar, "StatusEverywhere", (() => external_BdApi_React_default().createElement(components_namespaceObject.TooltipContainer, {
				text: "Component Error"
			}, external_BdApi_React_default().createElement(icons_namespaceObject.WarningCircle, {
				color: "#f04747"
			}))));
			const components_avatar = StatusAvatar;
			const external_StyleLoader_namespaceObject = StyleLoader;
			var external_StyleLoader_default = __webpack_require__.n(external_StyleLoader_namespaceObject);
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
				DEFAULT: category.Z["default"]
			};
			var colorPicker = __webpack_require__(89);
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
			const defaultColors = null && [1752220, 3066993, 3447003, 10181046, 15277667, 15844367, 15105570, 15158332, 9807270, 6323595, 1146986, 2067276, 2123412, 7419530, 11342935, 12745742, 11027200, 10038562, 9936031, 5533306];
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
			function ComplexColorPicker({
				value,
				defaultValue,
				onChange,
				colors = defaultColors
			}) {
				const [color, setColor] = useState(resolveColor(value));
				const intValue = useMemo((() => resolveColor(color, false)), [color]);
				const handleChange = useCallback((({
					target: {
						value
					}
				}) => {
					setColor(value);
					onChange(resolveColor(value));
				}), []);
				return React.createElement(Flex, {
					direction: Flex.Direction.HORIZONTAL
				}, React.createElement("div", {
					className: styles.controls
				}, React.createElement(Tooltip, {
					text: "Default",
					position: "bottom"
				}, (props => React.createElement("div", colorPicker_extends({}, props, {
					className: styles.defaultColor,
					style: {
						backgroundColor: resolveColor(defaultValue)
					},
					onClick: () => handleChange({
						target: {
							value: defaultValue
						}
					})
				}), intValue === resolveColor(defaultValue, false) ? React.createElement(Checkmark, {
					width: "25",
					height: "25"
				}) : null))), React.createElement(Tooltip, {
					text: "Custom Color",
					position: "bottom"
				}, (props => React.createElement("div", {
					className: styles.inputContainer
				}, React.createElement(Dropper, null), React.createElement("input", colorPicker_extends({}, props, {
					style: {
						backgroundColor: resolveColor(color)
					},
					type: "color",
					className: styles.colorInput,
					value: resolveColor(color),
					onChange: handleChange
				})))))), React.createElement(Flex, {
					wrap: Flex.Wrap.WRAP,
					className: styles.colorSwatches
				}, colors.map(((int, index) => React.createElement("div", {
					key: index,
					className: styles.colorSwatch,
					style: {
						backgroundColor: resolveColor(int)
					},
					onClick: () => handleChange({
						target: {
							value: int
						}
					})
				}, intValue === int ? React.createElement(Checkmark, null) : null)))));
			}
			function TinyColorPicker({
				value,
				onChange,
				className,
				defaultValue
			}) {
				const [color, setColor] = (0, external_BdApi_React_.useState)(resolveColor(value));
				const handleChange = (0, external_BdApi_React_.useCallback)((({
					target: {
						value
					}
				}) => {
					setColor(value);
					onChange(resolveColor(value));
				}), []);
				return external_BdApi_React_default().createElement("div", {
					className: (0, utils_namespaceObject.joinClassNames)(colorPicker.Z.tiny, className),
					onContextMenu: () => handleChange({
						target: {
							value: resolveColor(defaultValue)
						}
					})
				}, external_BdApi_React_default().createElement("input", {
					type: "color",
					className: colorPicker.Z.input,
					onChange: handleChange,
					value: resolveColor(color),
					style: {
						backgroundColor: resolveColor(color)
					}
				}), external_BdApi_React_default().createElement(Dropper, null));
			}
			const forms_namespaceObject = Modules["@discord/forms"];
			var components_settings = __webpack_require__(530);
			const components_settings_namespaceObject = JSON.parse('{"performance":{"forceLoadStatus":{"name":"Force Load Status","note":"This setting force-loads the status\'s of users from the WebSocket. Be aware, this can cause high usage of resources because of the amount of users in the cache. I can try to work on something that improves this but for now, if you don\'t want it, simply disable.","value":true,"type":"switch"}},"colors":{"dndColor":{"name":"Do Not Disturb Color","note":"Color for \\"Do Not Disturb\\" status indicator.","value":"#ED4245","type":"color"},"idleColor":{"name":"Idle Color","note":"Color for \\"Idle\\" status indicator.","value":"#FAA81A","type":"color"},"onlineColor":{"name":"Online Color","note":"Color for \\"Online\\" status indicator.","value":"#3BA55D","type":"color"},"streamingColor":{"name":"Streaming Color","note":"Color for \\"Streaming\\" status indicator.","value":"#593695","type":"color"},"offlineColor":{"name":"Offline Color","note":"Color for \\"Offline\\" status indicator.","value":"#747F8D","type":"color"}},"chat":{"chatAvatarResolution":{"name":"Resolution","note":"The avatar url size will be eg, url?size=128","value":40,"type":"slider","sticky":true,"markers":[16,32,40,56,80,128,256]},"showChatTyping":{"name":"Typing","note":"Show typing state in the chat.","value":true,"type":"switch"},"chatRadialStatus":{"name":"Radial Status","note":"Shows the status as border instead of pointer.","value":false,"type":"switch"}},"member_list":{"memberListAvatarResolution":{"name":"Resolution","note":"The avatar url size will be eg, url?size=128","value":32,"type":"slider","sticky":true,"markers":[16,32,28,40,56,80,128,256]},"showMemberlistTyping":{"name":"Typing","note":"Show typing state in the member list.","value":true,"type":"switch"},"memberlistRadialStatus":{"name":"Radial Status","note":"Shows the status as border instead of pointer.","value":false,"type":"switch"}},"friends_page":{"friendsPageAvatarResolution":{"name":"Resolution","note":"The avatar url size will be eg, url?size=128","value":56,"type":"slider","sticky":true,"markers":[16,32,40,56,80,128,256]},"showFriendsPageTyping":{"name":"Typing","note":"Show typing state in the friends page.","value":true,"type":"switch"},"friendsPageRadialStatus":{"name":"Radial Status","note":"Shows the status as border instead of pointer.","value":false,"type":"switch"}},"user_popout":{"userPopoutAvatarResolution":{"name":"Resolution","note":"The avatar url size will be eg, url?size=128","value":80,"type":"slider","sticky":true,"markers":[16,32,40,56,80,128,256]},"showUserPopoutTyping":{"name":"Typing","note":"Show typing state in user popout.","value":true,"type":"switch"},"userPopoutRadialStatus":{"name":"Radial Status","note":"Shows the status as border instead of pointer.","value":false,"type":"switch"}},"direct_messages":{"dmAvatarResolution":{"name":"Resolution","note":"The avatar url size will be eg, url?size=128","value":32,"type":"slider","sticky":true,"markers":[16,28,32,40,56,80,128,256]},"showDirectMessagesTyping":{"name":"Typing","note":"Show typing state in direct messages.","value":true,"type":"switch"},"directMessagesRadialStatus":{"name":"Radial Status","note":"Shows the status as border instead of pointer.","value":false,"type":"switch"}},"user_profile":{"userProfileAvatarResolution":{"name":"Resolution","note":"The avatar url size will be eg, url?size=128","value":128,"type":"slider","sticky":true,"markers":[16,32,40,56,80,128,256]},"showUserProfileTyping":{"name":"Typing","note":"Show typing state in user profile modal.","value":true,"type":"switch"},"userProfileRadialStatus":{"name":"Radial Status","note":"Shows the status as border instead of pointer.","value":false,"type":"switch"}},"guild_settings":{"guildSettingsAvatarResolution":{"name":"Resolution","note":"The avatar url size will be eg, url?size=128","value":32,"type":"slider","sticky":true,"markers":[16,32,40,56,80,128,256]},"showGuildSettingsTyping":{"name":"Typing","note":"Show typing state in the guild settings","value":true,"type":"switch"},"guildSettingsRadialStatus":{"name":"Radial Status","note":"Shows the status as border instead of pointer.","value":false,"type":"switch"}},"voice_chat":{"voiceChatAvatarResolution":{"name":"Resolution","note":"The avatar url size will be eg, url?size=128","value":24,"type":"slider","sticky":true,"markers":[16,24,32,40,56,80,128,256]},"showVoiceChatTyping":{"name":"Typing","note":"Show typing state in the voice chat.","value":true,"type":"switch"}},"accounts":{"accountSectionAvatarResolution":{"name":"Resolution","note":"The avatar url size will be eg, url?size=128","value":32,"type":"slider","sticky":true,"markers":[16,32,40,56,80,128,256]},"accountSettingsAvatarResolution":{"name":"Resolution","note":"The avatar url size will be eg, url?size=128","value":128,"type":"slider","sticky":true,"markers":[16,32,40,56,80,128,256]},"accountSettingsRadialStatus":{"name":"Radial Status","note":"Shows the status as border instead of pointer.","value":false,"type":"switch"}}}');
			function settings_extends() {
				settings_extends = Object.assign || function(target) {
					for (var i = 1; i < arguments.length; i++) {
						var source = arguments[i];
						for (var key in source)
							if (Object.prototype.hasOwnProperty.call(source, key)) target[key] = source[key];
					}
					return target;
				};
				return settings_extends.apply(this, arguments);
			}
			const SwitchItem = hooks_createUpdateWrapper(external_PluginApi_namespaceObject.WebpackModules.getByDisplayName("SwitchItem"));
			const Slider = hooks_createUpdateWrapper(external_PluginApi_namespaceObject.WebpackModules.getByDisplayName("Slider"), "initialValue", "onValueChange");
			function SwitchSetting({
				name,
				value,
				id,
				note
			}) {
				return external_BdApi_React_default().createElement(SwitchItem, {
					children: name,
					value: settings.get(id, value),
					onChange: value => settings.set(id, value),
					note
				});
			}
			function ColorSetting({
				name,
				value,
				id,
				note
			}) {
				return external_BdApi_React_default().createElement(components_namespaceObject.Flex, {
					direction: components_namespaceObject.Flex.Direction.VERTICAL,
					className: components_settings.Z.settingContainer
				}, external_BdApi_React_default().createElement(forms_namespaceObject.FormTitle, {
					tag: "h3"
				}, name), external_BdApi_React_default().createElement(components_namespaceObject.Flex, {
					align: components_namespaceObject.Flex.Align.END
				}, external_BdApi_React_default().createElement(forms_namespaceObject.FormText, {
					type: "description"
				}, note)), external_BdApi_React_default().createElement(TinyColorPicker, {
					defaultValue: value,
					value: settings.get(id, value),
					onChange: external_window_default().debounce((value => settings.set(id, value)), 500),
					className: components_settings.Z.colorPickerItem
				}));
			}
			function SliderSetting({
				name,
				value,
				id,
				note,
				markers,
				sticky,
				valueMap,
				valueString,
				...props
			}) {
				const currentValue = settings.get(id, value).toString();
				return external_BdApi_React_default().createElement("div", {
					className: components_settings.Z.settingContainer
				}, external_BdApi_React_default().createElement(forms_namespaceObject.FormTitle, {
					tag: "h3"
				}, name), external_BdApi_React_default().createElement(Slider, settings_extends({
					onValueChange: value => settings.set(id, valueMap ? valueMap.replace(/%s/g, value) : value),
					defaultValue: value,
					initialValue: Number(currentValue),
					stickToMarkers: sticky ?? false,
					handleSize: 10,
					markers
				}, props)), external_BdApi_React_default().createElement(forms_namespaceObject.FormText, {
					type: "description"
				}, note));
			}
			function SettingsPanel() {
				return Object.entries(components_settings_namespaceObject).map((([key, items]) => external_BdApi_React_default().createElement(Category, {
					look: Category.Looks.COMPACT,
					label: key.replace(/_/g, " "),
					key
				}, Object.entries(items).map((([id, props]) => {
					switch (props.type) {
						case "switch":
							return external_BdApi_React_default().createElement(SwitchSetting, settings_extends({}, props, {
								id,
								key: id
							}));
						case "color":
							return external_BdApi_React_default().createElement(ColorSetting, settings_extends({}, props, {
								id,
								key: id
							}));
						case "slider":
							return external_BdApi_React_default().createElement(SliderSetting, settings_extends({}, props, {
								id,
								key: id
							}));
					}
				})))));
			}
			const lazyPatch = function(module, functionName, callback, id) {
				if (!module || !functionName || "function" !== typeof module[functionName]) return;
				const original = module[functionName];
				const unpatch = function() {
					module[functionName] = original;
				};
				module[functionName] = function() {
					const returnValue = Reflect.apply(original, this, arguments);
					try {
						const tempReturn = Reflect.apply(callback, this, [arguments, returnValue]);
						return "undefined" === typeof tempReturn ? returnValue : tempReturn;
					} catch (error) {
						external_PluginApi_namespaceObject.Logger.error(`Lazy patch ${id} failed!`, error);
					}
					return returnValue;
				};
				Object.assign(module[functionName], {
					_originalFunction: original,
					patchedBy: package_namespaceObject.um.u2,
					unpatch
				});
				return unpatch;
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
			function account_extends() {
				account_extends = Object.assign || function(target) {
					for (var i = 1; i < arguments.length; i++) {
						var source = arguments[i];
						for (var key in source)
							if (Object.prototype.hasOwnProperty.call(source, key)) target[key] = source[key];
					}
					return target;
				};
				return account_extends.apply(this, arguments);
			}
			async function patchAccountSection() {
				getLazy(external_PluginApi_namespaceObject.Filters.byProperties(["container", "avatar", "redIcon"])).then((classes => external_PluginApi_namespaceObject.ReactComponents.getComponentByName("Account", `.${classes.container} > div`))).then((Account => {
					external_PluginApi_namespaceObject.Patcher.after(Account.component.prototype, "render", ((_, __, res) => {
						const tree = external_PluginApi_namespaceObject.Utilities.findInReactTree(res, (e => e?.renderPopout && !e.child));
						if (!tree) return res;
						const old = tree.children;
						tree.children = e => {
							const ret = old(e);
							if (!ret) return ret;
							const props = ret.props.children.props;
							if (ret.props.children.toString().indexOf("avatarWrapper") < 0) try {
								const tree = external_PluginApi_namespaceObject.Utilities.findInReactTree(ret, (e => "function" === typeof e?.children && "renderPopout" in e));
								const original = tree.children;
								tree.children = props => {
									const ret = original(props);
									const isSpeaking = !!ret.props.children?.props?.isSpeaking;
									ret.props.children = external_BdApi_React_default().createElement(components_avatar, account_extends({}, props, {
										user: stores_namespaceObject.Users.getCurrentUser(),
										shouldWatch: false,
										radial: {
											id: "accountSettingsRadialStatus",
											value: false
										},
										isSpeaking,
										resolution: {
											id: "accountSectionAvatarResolution",
											value: components_settings_namespaceObject.accounts.accountSectionAvatarResolution.value
										},
										size: components_avatar.Sizes.SIZE_32
									}));
									return ret;
								};
							} catch (error) {
								external_PluginApi_namespaceObject.Logger.error("Error in AccountSection patch:", error);
							} else ret.props.children = external_BdApi_React_default().createElement(components_avatar, account_extends({}, props, {
								user: stores_namespaceObject.Users.getCurrentUser(),
								shouldWatch: false,
								radial: {
									id: "accountSettingsRadialStatus",
									value: false
								},
								resolution: {
									id: "accountSectionAvatarResolution",
									value: components_settings_namespaceObject.accounts.accountSectionAvatarResolution.value
								},
								size: components_avatar.Sizes.SIZE_32
							}));
							return ret;
						};
					}));
					Account.forceUpdateAll();
				}));
				function PatchedUserSettingsAccountProfileCard(params) {
					const {
						__originalType,
						...props
					} = params;
					const ret = __originalType(props);
					try {
						const avatar = external_PluginApi_namespaceObject.Utilities.findInReactTree(ret, (e => e?.props?.status));
						if (!avatar) return ret;
						Object.assign(avatar.props, {
							user: stores_namespaceObject.Users.getCurrentUser(),
							shouldWatch: false,
							size: components_avatar.Sizes.SIZE_120,
							animated: true,
							className: external_PluginApi_namespaceObject.Utilities.className(avatar.props.className, "accountSettingsAvatar"),
							radial: {
								id: "accountSettingsRadialStatus",
								value: false
							},
							resolution: {
								id: "accountSettingsAvatarResolution",
								value: components_settings_namespaceObject.accounts.accountSettingsAvatarResolution.value
							}
						});
						avatar.type = components_avatar;
					} catch (error) {
						external_PluginApi_namespaceObject.Logger.error("Error in UserSettingsAccountCard:", error);
						return ret;
					}
					return ret;
				}
				getLazy(external_PluginApi_namespaceObject.Filters.byProperties(["contentColumnDefault"])).then((classes => external_PluginApi_namespaceObject.ReactComponents.getComponentByName("UserSettingsAccount", `.${classes.contentColumnDefault} > div`))).then((UserSettingsAccount => {
					external_PluginApi_namespaceObject.Patcher.after(UserSettingsAccount.component.prototype, "renderAccountSettings", ((_, __, res) => {
						const tree = external_PluginApi_namespaceObject.Utilities.findInReactTree(res, (e => Array.isArray(e) && e.some((e => "UserSettingsAccountProfileCard" === e?.type?.displayName))));
						if (!tree) return;
						const index = tree.findIndex((e => "UserSettingsAccountProfileCard" === e?.type?.displayName));
						const element = tree[index];
						tree[index] = external_BdApi_React_default().createElement(PatchedUserSettingsAccountProfileCard, {
							__originalType: element.type
						});
					}));
					UserSettingsAccount.forceUpdateAll();
				}));
			}
			function auditlog_extends() {
				auditlog_extends = Object.assign || function(target) {
					for (var i = 1; i < arguments.length; i++) {
						var source = arguments[i];
						for (var key in source)
							if (Object.prototype.hasOwnProperty.call(source, key)) target[key] = source[key];
					}
					return target;
				};
				return auditlog_extends.apply(this, arguments);
			}
			async function patchAuditLog() {
				const AuditLog = await getLazy(external_PluginApi_namespaceObject.Filters.byDisplayName("GuildSettingsAuditLogEntry"));
				const classes = external_PluginApi_namespaceObject.WebpackModules.getByProps("desaturate", "auditLog", "avatar");
				external_PluginApi_namespaceObject.Patcher.after(AuditLog.prototype, "render", ((_this, _, res) => {
					const originalChildren = res?.props?.children;
					if ("function" !== typeof originalChildren) return;
					if (!_this.props.log?.user) return;
					lazyPatch(res?.props, "children", ((_, ret) => {
						const popout = external_PluginApi_namespaceObject.Utilities.findInReactTree(ret, (e => e?.renderPopout));
						if (!popout) return;
						lazyPatch(popout, "children", (props => external_BdApi_React_default().createElement(components_avatar, auditlog_extends({}, props[0], {
							user: _this.props.log.user,
							showTyping: {
								id: "showGuildSettingsShowTyping",
								value: true
							},
							radial: {
								id: "guildSettingsRadialStatus",
								value: false
							},
							resolution: {
								id: "guildSettingsAvatarResolution",
								value: components_settings_namespaceObject.guild_settings.guildSettingsAvatarResolution.value
							},
							className: classes.avatar
						}))));
					}));
				}));
			}
			function channelmessage_extends() {
				channelmessage_extends = Object.assign || function(target) {
					for (var i = 1; i < arguments.length; i++) {
						var source = arguments[i];
						for (var key in source)
							if (Object.prototype.hasOwnProperty.call(source, key)) target[key] = source[key];
					}
					return target;
				};
				return channelmessage_extends.apply(this, arguments);
			}
			function patchChannelMessage() {
				const Patched = Symbol("__StatusEverywhere_patched__");
				const ChannelMessage = external_PluginApi_namespaceObject.WebpackModules.getModule((m => "ChannelMessage" === m.type.displayName));
				external_PluginApi_namespaceObject.Patcher.after(ChannelMessage, "type", (function(_, __, res) {
					const tree = external_PluginApi_namespaceObject.Utilities.findInReactTree(res, (e => e?.childrenHeader));
					if (!tree) return;
					external_PluginApi_namespaceObject.Patcher.after(tree.childrenHeader.type, "type", ((_, [props], res) => {
						const user = props?.message?.author;
						const channel_id = props?.message?.channel_id;
						res.props.avatar = external_BdApi_React_default().createElement(components_avatar, channelmessage_extends({}, props, {
							type: "chat",
							user,
							channel_id,
							shouldShowUserPopout: true,
							showTyping: {
								id: "chatShowTyping",
								value: true
							},
							radial: {
								id: "chatRadialStatus",
								value: false
							},
							resolution: {
								id: "chatAvatarResolution",
								value: components_settings_namespaceObject.chat.chatAvatarResolution.value
							}
						}));
					}));
					tree.childrenHeader.type[Patched] = true;
					this.unpatch();
				}));
			}
			function chatavatar_extends() {
				chatavatar_extends = Object.assign || function(target) {
					for (var i = 1; i < arguments.length; i++) {
						var source = arguments[i];
						for (var key in source)
							if (Object.prototype.hasOwnProperty.call(source, key)) target[key] = source[key];
					}
					return target;
				};
				return chatavatar_extends.apply(this, arguments);
			}
			function patchChatAvatar() {
				const Patched = Symbol("__StatusEverywhere_patched__");
				const ChatMessage = external_PluginApi_namespaceObject.WebpackModules.getModule((m => m?.default?.toString?.().indexOf("ANIMATE_CHAT_AVATAR") > -1));
				external_PluginApi_namespaceObject.Patcher.after(ChatMessage, "default", ((_, [props], res) => {
					const tree = external_PluginApi_namespaceObject.Utilities.findInTree(res, (e => e?.renderPopout));
					const user = props?.message?.author;
					const channel_id = props?.message?.channel_id;
					if (!user || !tree?.children || Patched in tree.children || user.bot && "0000" === user.discriminator) return;
					tree.children = () => external_BdApi_React_default().createElement(components_avatar, chatavatar_extends({}, props, {
						type: "chat",
						user,
						channel_id,
						shouldShowUserPopout: true,
						showTyping: {
							id: "showChatTyping",
							value: true
						},
						radial: {
							id: "chatRadialStatus",
							value: false
						},
						size: components_avatar.Sizes.SIZE_40,
						resolution: {
							id: "chatAvatarResolution",
							value: components_settings_namespaceObject.chat.chatAvatarResolution.value
						}
					}));
					tree.children[Patched] = true;
				}));
			}
			function patchColorModule() {
				const StatusModule = external_PluginApi_namespaceObject.WebpackModules.getByProps("getStatusColor");
				external_PluginApi_namespaceObject.Patcher.after(StatusModule, "getStatusColor", ((_, [status]) => {
					switch (status) {
						case "dnd":
							return settings.get("dndColor", "#ED4245");
						case "idle":
							return settings.get("idleColor", "#FAA81A");
						case "online":
							return settings.get("onlineColor", "#3BA55D");
						case "streaming":
							return settings.get("streamingColor", "#593695");
						case "offline":
							return settings.get("offlineColor", "#747F8D");
						default:
							return "#747F8D";
					}
				}));
			}
			function guildsettingsmembers_extends() {
				guildsettingsmembers_extends = Object.assign || function(target) {
					for (var i = 1; i < arguments.length; i++) {
						var source = arguments[i];
						for (var key in source)
							if (Object.prototype.hasOwnProperty.call(source, key)) target[key] = source[key];
					}
					return target;
				};
				return guildsettingsmembers_extends.apply(this, arguments);
			}
			async function patchGuildSettingsMembers() {
				const classes = await getLazy(external_PluginApi_namespaceObject.Filters.byProperties(["member", "avatar"]));
				const Member = await external_PluginApi_namespaceObject.ReactComponents.getComponentByName("Member", `.${classes.member}`);
				external_PluginApi_namespaceObject.Patcher.after(Member.component.prototype, "render", ((_this, _, returnValue) => {
					const avatar = external_PluginApi_namespaceObject.Utilities.findInReactTree(returnValue, (e => e?.props?.className === classes.avatar));
					if (!avatar || "function" !== typeof avatar.type) return;
					Object.assign(avatar.props, {
						user: _this.props.user
					});
					lazyPatch(avatar, "type", (props => external_BdApi_React_default().createElement(components_avatar, guildsettingsmembers_extends({}, props[0], {
						showTyping: {
							id: "showGuildSettingsShowTyping",
							value: true
						},
						radial: {
							id: "guildSettingsRadialStatus",
							value: false
						},
						resolution: {
							id: "guildSettingsAvatarResolution",
							value: components_settings_namespaceObject.guild_settings.guildSettingsAvatarResolution.value
						}
					}))));
				}));
				Member.forceUpdateAll();
			}
			async function patchHeaderPlaying() {
				const NowPlayingHeader = external_PluginApi_namespaceObject.WebpackModules.getModule((m => "NowPlayingHeader" === m?.default?.displayName));
				external_PluginApi_namespaceObject.Patcher.after(NowPlayingHeader, "default", ((_, __, res) => {
					const original = res.type;
					res.type = function({
						priorityUser: {
							user
						}
					}) {
						const ret = original.apply(this, arguments);
						try {
							const avatar = external_PluginApi_namespaceObject.Utilities.findInReactTree(ret, (e => e?.props?.status));
							if (!avatar) return ret;
							avatar.props = Object.assign({}, {
								user,
								size: components_avatar.Sizes.SIZE_32,
								shouldWatch: false,
								channel_id: stores_namespaceObject.Channels.getDMFromUserId(user.id),
								radial: {
									id: "friendsPageRadialStatus",
									value: false
								},
								showTyping: {
									id: "showFriendsPageTyping",
									value: true
								},
								resolution: {
									id: "friendsPageAvatarResolution",
									value: components_settings_namespaceObject.friends_page.friendsPageAvatarResolution.value
								}
							});
							avatar.type = components_avatar;
						} catch (error) {
							external_PluginApi_namespaceObject.Logger.error("Error in NowPlayHeader patch:\n", error);
						}
						return ret;
					};
				}));
			}
			function memberlist_extends() {
				memberlist_extends = Object.assign || function(target) {
					for (var i = 1; i < arguments.length; i++) {
						var source = arguments[i];
						for (var key in source)
							if (Object.prototype.hasOwnProperty.call(source, key)) target[key] = source[key];
					}
					return target;
				};
				return memberlist_extends.apply(this, arguments);
			}
			async function patchMemberListItem(_, promises) {
				const classes = external_PluginApi_namespaceObject.WebpackModules.getByProps("avatarDecorationPadding", "member");
				const MemberListItem = await external_PluginApi_namespaceObject.ReactComponents.getComponentByName("MemberListItem", `.${classes.member}`);
				if (promises.cancelled) return;
				external_PluginApi_namespaceObject.Patcher.after(MemberListItem.component.prototype, "renderAvatar", (_this => external_BdApi_React_default().createElement(components_avatar, memberlist_extends({}, _this.props, {
					type: "member-list",
					shouldWatch: false,
					animated: _this.state?.hovered || _this.props.selected,
					size: components_avatar.Sizes.SIZE_32,
					showTyping: {
						id: "showMemberlistTyping",
						value: true
					},
					radial: {
						id: "memberlistRadialStatus",
						value: false
					},
					resolution: {
						id: "memberListAvatarResolution",
						value: components_settings_namespaceObject.member_list.memberListAvatarResolution.value
					}
				}))));
				MemberListItem.forceUpdateAll();
			}
			var partymembers_React = __webpack_require__(113);
			function partymembers_extends() {
				partymembers_extends = Object.assign || function(target) {
					for (var i = 1; i < arguments.length; i++) {
						var source = arguments[i];
						for (var key in source)
							if (Object.prototype.hasOwnProperty.call(source, key)) target[key] = source[key];
					}
					return target;
				};
				return partymembers_extends.apply(this, arguments);
			}
			async function patchPartyMembers() {
				const classes = {
					...Object(external_PluginApi_namespaceObject.WebpackModules.getByProps("partyMember")),
					...Object(external_PluginApi_namespaceObject.WebpackModules.getByProps("container", "activity", "partyAvatar"))
				};
				const selector = "." + Object.values(external_window_default().pick(classes, ["partyMember", "partyAvatar"])).map((e => e.split(" ").join("."))).join(", .");
				const VoiceUserSummaryItem = external_PluginApi_namespaceObject.WebpackModules.getByDisplayName("VoiceUserSummaryItem");
				const UserSummaryItem = external_PluginApi_namespaceObject.WebpackModules.getByDisplayName("UserSummaryItem");
				const PartyMember = await external_PluginApi_namespaceObject.ReactComponents.getComponentByName("PartyMember", selector);
				external_PluginApi_namespaceObject.Patcher.before(VoiceUserSummaryItem.prototype, "render", (_this => {
					if (_this.props.__patched) return;
					_this.props.__patched = true;
					const original = _this.props.renderUser;
					_this.props.renderUser = (props, ...args) => {
						const user = props?.user ?? props;
						const ret = original ? original.apply(null, [props].concat(args)) : null;
						if (!user) return ret;
						return partymembers_React.createElement(components_avatar, partymembers_extends({}, props, {
							user,
							shouldWatch: false,
							size: _this.props.size ?? components_avatar.Sizes.SIZE_16,
							showTyping: {
								id: "showChatTyping",
								value: true
							},
							radial: {
								id: "chatRadialStatus",
								value: false
							},
							shouldShowUserPopout: true
						}));
					};
				}));
				external_PluginApi_namespaceObject.Patcher.after(PartyMember.component.prototype, "render", ((_this, _, ret) => {
					const {
						member: {
							user
						}
					} = _this.props;
					ret.props.children = props => partymembers_React.createElement(components_avatar, partymembers_extends({}, props, {
						user,
						shouldWatch: false,
						size: components_avatar.Sizes.SIZE_16,
						showTyping: {
							id: "showChatTyping",
							value: true
						},
						radial: {
							id: "chatRadialStatus",
							value: false
						},
						shouldShowUserPopout: true
					}));
				}));
				external_PluginApi_namespaceObject.Patcher.after(UserSummaryItem.prototype, "renderUsers", (_this => _this.props.users.map((user => partymembers_React.createElement(components_avatar, {
					user,
					className: "avatarContainer-3CQrif",
					type: "voice-user",
					size: components_avatar.Sizes.SIZE_24,
					showTyping: {
						id: "showVoiceChatTyping",
						value: true
					},
					resolution: {
						id: "voiceChatAvatarResolution",
						value: 56
					}
				})))));
				PartyMember.forceUpdateAll();
			}
			var privatechannel_React = __webpack_require__(113);
			async function patchPrivateChannel() {
				const PrivateChannel = external_PluginApi_namespaceObject.WebpackModules.getByDisplayName("PrivateChannel");
				external_PluginApi_namespaceObject.Patcher.after(PrivateChannel.prototype, "renderAvatar", (_this => {
					if (_this.props.pinned || _this.props.channel.type === constants_namespaceObject.ChannelTypes.GROUP_DM) return;
					return privatechannel_React.createElement(components_avatar, {
						user: _this.props.user,
						shouldWatch: false,
						channel_id: _this.props.channel.id,
						type: "direct-message",
						showTyping: {
							id: "showDirectMessagesTyping",
							value: true
						},
						radial: {
							id: "directMessagesRadialStatus",
							value: false
						},
						resolution: {
							id: "dmAvatarResolution",
							value: components_settings_namespaceObject.direct_messages.dmAvatarResolution.value
						},
						size: components_avatar.Sizes.SIZE_32
					});
				}));
			}
			function userpopout_extends() {
				userpopout_extends = Object.assign || function(target) {
					for (var i = 1; i < arguments.length; i++) {
						var source = arguments[i];
						for (var key in source)
							if (Object.prototype.hasOwnProperty.call(source, key)) target[key] = source[key];
					}
					return target;
				};
				return userpopout_extends.apply(this, arguments);
			}
			function patchUserPopout() {
				const UserPopoutComponents = external_PluginApi_namespaceObject.WebpackModules.getByProps("UserPopoutAvatar");
				external_PluginApi_namespaceObject.Patcher.after(UserPopoutComponents, "UserPopoutAvatar", ((_, [props], res) => {
					const tree = external_PluginApi_namespaceObject.Utilities.findInReactTree(res, (e => e?.className?.indexOf("avatarHoverTarget") > -1));
					if (!tree) return;
					const {
						props: props2,
						type: Component
					} = tree.children;
					tree.children = external_BdApi_React_default().createElement(components_avatar, userpopout_extends({}, props, props2, {
						shouldWatch: false,
						type: "user-popout",
						animated: true,
						size: components_avatar.Sizes.SIZE_80,
						AvatarComponent: ({
							className,
							...props
						}) => external_BdApi_React_default().createElement(Component, userpopout_extends({
							className: external_PluginApi_namespaceObject.Utilities.className(className, tree?.props?.className)
						}, props, props2)),
						radial: {
							id: "userPopoutRadialStatus",
							value: false
						},
						showTyping: {
							id: "showUserPopoutTyping",
							value: true
						},
						resolution: {
							id: "userPopoutAvatarResolution",
							value: components_settings_namespaceObject.user_popout.userPopoutAvatarResolution.value
						}
					}));
				}));
			}
			async function patchUserProfile(flush) {
				const UserProfileModalHeader = await new Promise((resolve => {
					const filter = m => "UserProfileModalHeader" === m?.default?.displayName;
					const cancel = () => external_PluginApi_namespaceObject.WebpackModules.removeListener(listener); {
						const fromCache = external_PluginApi_namespaceObject.WebpackModules.getModule(filter);
						if (fromCache) return resolve(fromCache);
					}
					const listener = module => {
						if (!filter(module)) return;
						resolve(module);
						cancel();
					};
					external_PluginApi_namespaceObject.WebpackModules.addListener(listener);
					flush.push(cancel);
				}));
				const classes = Object.assign({}, external_PluginApi_namespaceObject.WebpackModules.getByProps("avatarSpeaking", "wrapper"), external_PluginApi_namespaceObject.WebpackModules.getByProps("header", "headerTop"));
				external_PluginApi_namespaceObject.Patcher.after(UserProfileModalHeader, "default", ((_, [props], res) => {
					const avatar = external_PluginApi_namespaceObject.Utilities.findInReactTree(res, (e => null != e?.props?.statusTooltip));
					if (!avatar) return;
					avatar.props = Object.assign({}, props, {
						className: external_PluginApi_namespaceObject.Utilities.className(classes.avatar, classes.wrapper),
						animated: true,
						shouldWatch: false,
						borderBox: false,
						radial: {
							id: "userProfileRadialStatus",
							value: false
						},
						showTyping: {
							id: "showUserProfileTyping",
							value: true
						},
						resolution: {
							id: "userProfileAvatarResolution",
							value: components_settings_namespaceObject.user_profile.userProfileAvatarResolution.value
						},
						size: components_avatar.Sizes.SIZE_120
					});
					avatar.type = components_avatar;
				}));
			}
			var voice_React = __webpack_require__(113);
			function voice_extends() {
				voice_extends = Object.assign || function(target) {
					for (var i = 1; i < arguments.length; i++) {
						var source = arguments[i];
						for (var key in source)
							if (Object.prototype.hasOwnProperty.call(source, key)) target[key] = source[key];
					}
					return target;
				};
				return voice_extends.apply(this, arguments);
			}
			function patchVoiceUser() {
				const VoiceUser = external_PluginApi_namespaceObject.WebpackModules.getByDisplayName("VoiceUser");
				const classes = external_PluginApi_namespaceObject.WebpackModules.getByProps("avatarContainer", "avatarSmall");
				const classNames = ["avatarContainer", "avatarSmall", "avatar"].map((cl => classes[cl])).join(" ");
				external_PluginApi_namespaceObject.Patcher.after(VoiceUser.prototype, "renderAvatar", (_this => voice_React.createElement(components_avatar, voice_extends({}, _this.props, {
					className: classNames,
					isSpeaking: _this.props.speaking,
					type: "voice-user",
					size: components_avatar.Sizes.SIZE_24,
					showTyping: {
						id: "showVoiceChatTyping",
						value: true
					},
					resolution: {
						id: "voiceChatAvatarResolution",
						value: components_settings_namespaceObject.voice_chat.voiceChatAvatarResolution.value
					}
				}))));
			}
			function StatusEverywhere_defineProperty(obj, key, value) {
				if (key in obj) Object.defineProperty(obj, key, {
					value,
					enumerable: true,
					configurable: true,
					writable: true
				});
				else obj[key] = value;
				return obj;
			}
			class StatusEverywhere extends(external_BasePlugin_default()) {
				constructor(...args) {
					super(...args);
					StatusEverywhere_defineProperty(this, "_flush", []);
					StatusEverywhere_defineProperty(this, "promises", {
						cancelled: false,
						cancel: () => {
							this.promises.cancelled = true;
						}
					});
				}
				get StatusAvatar() {
					return components_avatar;
				}
				getSettingsPanel() {
					return external_BdApi_React_default().createElement(SettingsPanel, null);
				}
				createTimeLog(label) {
					const start = Date.now();
					return {
						start,
						end: function() {
							const current = Date.now();
							external_PluginApi_namespaceObject.Logger.log(label.replace(/%s/g, (current - start).toFixed()));
						}
					};
				}
				async onStart() {
					const time = this.createTimeLog("Started StatusEverywhere in %sms.");
					const methods = Object.keys(patches_namespaceObject);
					for (let i = 0; i < methods.length; i++) {
						if (!methods[i].startsWith("patch") || "function" !== typeof patches_namespaceObject[methods[i]]) continue;
						external_PluginApi_namespaceObject.Utilities.suppressErrors(patches_namespaceObject[methods[i]].bind(this, this._flush, this.promises), `${this.constructor.name}.${methods[i]}`)();
					}
					time.end();
					external_StyleLoader_default().inject();
				}
				onStop() {
					external_PluginApi_namespaceObject.Patcher.unpatchAll();
					external_StyleLoader_default().remove();
					for (let i = 0; i < this._flush.length; i++) this._flush[i]();
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