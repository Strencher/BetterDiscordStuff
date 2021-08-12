/**
 * @name VoiceChatNotifications
 * @version 1.1.0
 * @description Shows you certain events from voicechats in a logs panel or as desktop notification.
 * @author Strencher
 * @source https://github.com/Strencher/BetterDiscordStuff/tree/master/VoiceChatNotifications
 * @updateUrl https://raw.githubusercontent.com/Strencher/BetterDiscordStuff/master/VoiceChatNotifications/VoiceChatNotifications.plugin.js
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
		"name": "VoiceChatNotifications",
		"version": "1.1.0",
		"description": "Shows you certain events from voicechats in a logs panel or as desktop notification.",
		"authors": [{
			"name": "Strencher",
			"discord_id": "415849376598982656",
			"github_username": "Strencher"
		}],
		"github": "https://github.com/Strencher/BetterDiscordStuff/tree/master/VoiceChatNotifications",
		"github_raw": "https://raw.githubusercontent.com/Strencher/BetterDiscordStuff/master/VoiceChatNotifications/VoiceChatNotifications.plugin.js"
	},
	"changelog": [{
		"type": "fixed",
		"title": "Fixes",
		"items": [
			"Discord update broke it entirely, i fixed it.",
			"Also finally fixed the button padding."
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
			36: (module, __webpack_exports__, __webpack_require__) => {
				__webpack_require__.d(__webpack_exports__, {
					Z: () => __WEBPACK_DEFAULT_EXPORT__
				});
				var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(645);
				var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = __webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
				var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()((function(i) {
					return i[1];
				}));
				___CSS_LOADER_EXPORT___.push([module.id, ".VoiceChatNotifications-button-icon{cursor:pointer;align-items:center;display:flex;margin:0 8px;color:var(--interactive-normal)}", ""]);
				___CSS_LOADER_EXPORT___.locals = {
					icon: "VoiceChatNotifications-button-icon"
				};
				StyleLoader.append(module.id, ___CSS_LOADER_EXPORT___.toString());
				const __WEBPACK_DEFAULT_EXPORT__ = Object.assign(___CSS_LOADER_EXPORT___, ___CSS_LOADER_EXPORT___.locals);
			},
			713: (module, __webpack_exports__, __webpack_require__) => {
				__webpack_require__.d(__webpack_exports__, {
					Z: () => __WEBPACK_DEFAULT_EXPORT__
				});
				var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(645);
				var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = __webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
				var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()((function(i) {
					return i[1];
				}));
				___CSS_LOADER_EXPORT___.push([module.id, "#voicechatnotifications{position:absolute;z-index:999}#voicechatnotifications .VoiceChatNotifications-notification-container{z-index:999}.VoiceChatNotifications-notification-container{min-width:220px;margin-top:20px;position:relative;align-items:center;overflow:hidden;display:flex;pointer-events:all;padding:15px;border-radius:4px}.VoiceChatNotifications-notification-topLeft{left:20px}.VoiceChatNotifications-notification-topRight{right:20px}.VoiceChatNotifications-notification-bottomLeft{bottom:20px;left:20px}.VoiceChatNotifications-notification-bottomRight{bottom:20px;right:20px}.VoiceChatNotifications-notification-closeButton{color:#ddd;position:absolute;right:3px;top:3px;opacity:.7}.VoiceChatNotifications-notification-progress{bottom:0;height:3px;position:absolute;width:100%;left:0}.VoiceChatNotifications-notification-progressBar{height:3px;background:#0870f3}.VoiceChatNotifications-notification-content{color:#ddd;display:flex}.VoiceChatNotifications-notification-closeButton:hover{opacity:1}.VoiceChatNotifications-notification-wrapper{display:flex;flex-direction:column;margin-left:10px}.VoiceChatNotifications-notification-wrapper .VoiceChatNotifications-notification-header{display:flex;flex-direction:row}.VoiceChatNotifications-notification-wrapper .VoiceChatNotifications-notification-header .VoiceChatNotifications-notification-username{color:#fff;font-weight:700}.VoiceChatNotifications-notification-wrapper .VoiceChatNotifications-notification-header .VoiceChatNotifications-notification-timestamp{font-size:.75rem;padding-top:3px;color:var(--channels-default)}.VoiceChatNotifications-notification-wrapper .VoiceChatNotifications-notification-message{line-height:10px}", ""]);
				___CSS_LOADER_EXPORT___.locals = {
					container: "VoiceChatNotifications-notification-container",
					topLeft: "VoiceChatNotifications-notification-topLeft",
					topRight: "VoiceChatNotifications-notification-topRight",
					bottomLeft: "VoiceChatNotifications-notification-bottomLeft",
					bottomRight: "VoiceChatNotifications-notification-bottomRight",
					closeButton: "VoiceChatNotifications-notification-closeButton",
					progress: "VoiceChatNotifications-notification-progress",
					progressBar: "VoiceChatNotifications-notification-progressBar",
					content: "VoiceChatNotifications-notification-content",
					wrapper: "VoiceChatNotifications-notification-wrapper",
					header: "VoiceChatNotifications-notification-header",
					username: "VoiceChatNotifications-notification-username",
					timestamp: "VoiceChatNotifications-notification-timestamp",
					message: "VoiceChatNotifications-notification-message"
				};
				StyleLoader.append(module.id, ___CSS_LOADER_EXPORT___.toString());
				const __WEBPACK_DEFAULT_EXPORT__ = Object.assign(___CSS_LOADER_EXPORT___, ___CSS_LOADER_EXPORT___.locals);
			},
			865: (module, __webpack_exports__, __webpack_require__) => {
				__webpack_require__.d(__webpack_exports__, {
					Z: () => __WEBPACK_DEFAULT_EXPORT__
				});
				var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(645);
				var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = __webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
				var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()((function(i) {
					return i[1];
				}));
				___CSS_LOADER_EXPORT___.push([module.id, ".VoiceChatNotifications-panel-clearButton{min-width:100px;width:100px;margin:10px;position:absolute;right:15px;z-index:99999}.VoiceChatNotifications-panel-contents{height:500px;overflow-y:scroll;overflow-x:hidden}.VoiceChatNotifications-panel-message{margin-top:1.0625rem}.VoiceChatNotifications-panel-empty{color:#ddd;margin:20px;text-align:center}", ""]);
				___CSS_LOADER_EXPORT___.locals = {
					clearButton: "VoiceChatNotifications-panel-clearButton",
					contents: "VoiceChatNotifications-panel-contents",
					message: "VoiceChatNotifications-panel-message",
					empty: "VoiceChatNotifications-panel-empty"
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
				___CSS_LOADER_EXPORT___.push([module.id, ".VoiceChatNotifications-category-category.VoiceChatNotifications-category-compact{position:inherit}.VoiceChatNotifications-category-category.VoiceChatNotifications-category-compact .VoiceChatNotifications-category-header{display:flex;align-items:center;justify-content:space-between;padding:2px;padding-left:10px;text-transform:uppercase;font-weight:600;font-size:.9rem}.VoiceChatNotifications-category-category.VoiceChatNotifications-category-compact .VoiceChatNotifications-category-header .VoiceChatNotifications-category-caret{float:right;display:inline-flex;color:var(--interactive-normal)}.VoiceChatNotifications-category-category.VoiceChatNotifications-category-compact .VoiceChatNotifications-category-header .VoiceChatNotifications-category-stroke{background-color:var(--background-modifier-accent);height:2px;flex:1;margin:0 5px 0 10px}.VoiceChatNotifications-category-category.VoiceChatNotifications-category-compact .VoiceChatNotifications-category-header .VoiceChatNotifications-category-label{color:var(--interactive-normal)}.VoiceChatNotifications-category-category.VoiceChatNotifications-category-compact .VoiceChatNotifications-category-content{padding-left:20px;width:calc(100% - 40px)}.VoiceChatNotifications-category-category.VoiceChatNotifications-category-default{background:rgba(32,34,37,.3);border:1px solid #202225;margin:5px;cursor:pointer;border-radius:3px;--color: var(--interactive-normal)}.VoiceChatNotifications-category-category.VoiceChatNotifications-category-default:hover{--color: var(--interactive-hover)}.VoiceChatNotifications-category-category.VoiceChatNotifications-category-default .VoiceChatNotifications-category-header{padding-right:5px;padding:10px 15px;padding-bottom:0;display:flex;align-items:center;justify-content:space-between}.VoiceChatNotifications-category-category.VoiceChatNotifications-category-default .VoiceChatNotifications-category-header .VoiceChatNotifications-category-stroke{display:none}.VoiceChatNotifications-category-category.VoiceChatNotifications-category-default .VoiceChatNotifications-category-header .VoiceChatNotifications-category-divider{position:relative}.VoiceChatNotifications-category-category.VoiceChatNotifications-category-default .VoiceChatNotifications-category-header .VoiceChatNotifications-category-label{font-size:1rem;font-weight:600;color:#fff;text-transform:uppercase}.VoiceChatNotifications-category-category.VoiceChatNotifications-category-default .VoiceChatNotifications-category-header .VoiceChatNotifications-category-caret{color:var(--color);transition:color .3s}.VoiceChatNotifications-category-category.VoiceChatNotifications-category-default.VoiceChatNotifications-category-opened .VoiceChatNotifications-category-content{padding:8px}.VoiceChatNotifications-category-category.VoiceChatNotifications-category-default.VoiceChatNotifications-category-opened .VoiceChatNotifications-category-header{background:rgba(32,34,37,.6)}", ""]);
				___CSS_LOADER_EXPORT___.locals = {
					category: "VoiceChatNotifications-category-category",
					compact: "VoiceChatNotifications-category-compact",
					header: "VoiceChatNotifications-category-header",
					caret: "VoiceChatNotifications-category-caret",
					stroke: "VoiceChatNotifications-category-stroke",
					label: "VoiceChatNotifications-category-label",
					content: "VoiceChatNotifications-category-content",
					default: "VoiceChatNotifications-category-default",
					divider: "VoiceChatNotifications-category-divider",
					opened: "VoiceChatNotifications-category-opened"
				};
				StyleLoader.append(module.id, ___CSS_LOADER_EXPORT___.toString());
				const __WEBPACK_DEFAULT_EXPORT__ = Object.assign(___CSS_LOADER_EXPORT___, ___CSS_LOADER_EXPORT___.locals);
			},
			423: (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
				__webpack_require__.r(__webpack_exports__);
				__webpack_require__.d(__webpack_exports__, {
					default: () => VoiceChatNotifications
				});
				const classes_namespaceObject = Modules["@discord/classes"];
				const modal_namespaceObject = Modules["@discord/modal"];
				const stores_namespaceObject = Modules["@discord/stores"];
				const external_PluginApi_namespaceObject = PluginApi;
				const external_BasePlugin_namespaceObject = BasePlugin;
				var external_BasePlugin_default = __webpack_require__.n(external_BasePlugin_namespaceObject);
				const components_namespaceObject = Modules["@discord/components"];
				var components_button = __webpack_require__(36);
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
				function VoiceNotificationsButton(props) {
					return React.createElement(components_namespaceObject.TooltipContainer, {
						position: "bottom",
						text: "Open VoiceLogs"
					}, React.createElement("div", _extends({
						className: components_button.Z.icon
					}, props), React.createElement("svg", {
						fill: "currentColor",
						xmlns: "http://www.w3.org/2000/svg",
						x: "0px",
						y: "0px",
						viewBox: "0 0 512 512",
						width: "20",
						height: "20"
					}, React.createElement("g", null, React.createElement("path", {
						d: "M299.389,412.924l-53.346,24.248c-5.285,2.402-10.87,3.62-16.602,3.62c-6.846,0-13.425-1.743-19.222-4.94   c-0.288,0.016-0.574,0.044-0.867,0.044H96.137c-8.284,0-15-6.716-15-15c0-8.284,6.716-15,15-15h93.655   c-0.938-7.26,0.133-14.757,3.285-21.69l3.777-8.31H96.137c-8.284,0-15-6.716-15-15c0-8.284,6.716-15,15-15H210.49l6.907-15.196   c0.018-0.04,0.038-0.072,0.057-0.11c1.471-3.201,3.502-6.151,6.041-8.69l6.005-6.004H96.137c-8.284,0-15-6.716-15-15   s6.716-15,15-15H259.5l30-29.999H96.137c-8.284,0-15-6.716-15-15c0-8.284,6.716-15,15-15H319.5l77.724-77.723l0.345-0.344V67.001   c0-8.284-6.716-15-15-15h-35V15c0-8.284-6.716-15-15-15c-8.284,0-15,6.716-15,15v37h-31.429V15c0-8.284-6.716-15-15-15   c-8.284,0-15,6.716-15,15v37H224.71V15c0-8.284-6.716-15-15-15c-8.284,0-15,6.716-15,15v37h-31.429V15c0-8.284-6.716-15-15-15   c-8.284,0-15,6.716-15,15v37h-31.429V15c0-8.284-6.716-15-15-15s-15,6.716-15,15v37H36.137c-8.284,0-15,6.716-15,15v400   c0,24.813,20.187,45,45,45h286.432c24.813,0,45-20.187,45-45V317.533l-89.221,89.22   C305.682,409.419,302.637,411.471,299.389,412.924z M209.71,195.897H96.137c-8.284,0-15-6.716-15-15c0-8.284,6.716-15,15-15H209.71   c8.284,0,15,6.716,15,15C224.71,189.182,217.994,195.897,209.71,195.897z"
					}), React.createElement("path", {
						d: "M397.224,190.6L244.708,343.114l-24.32,53.505c-3.824,8.412,4.83,17.065,13.242,13.242l53.505-24.32h0L439.65,233.026   L397.224,190.6L397.224,190.6z"
					}), React.createElement("path", {
						d: "M482.077,148.174c-11.716-11.716-30.711-11.716-42.426,0l-21.213,21.213l42.426,42.426l21.213-21.213   C493.792,178.884,493.792,159.89,482.077,148.174z"
					})))));
				}
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
				const package_namespaceObject = JSON.parse('{"um":{"u2":"VoiceChatNotifications"}}');
				const Settings = new SettingsManager(package_namespaceObject.um.u2, {});
				const settings = Settings;
				var notification = __webpack_require__(713);
				const external_StyleLoader_namespaceObject = StyleLoader;
				var external_StyleLoader_default = __webpack_require__.n(external_StyleLoader_namespaceObject);
				const external_PluginApi_DiscordModules_namespaceObject = PluginApi.DiscordModules;
				const scrollbars_namespaceObject = Modules["@discord/scrollbars"];
				var external_BdApi_React_ = __webpack_require__(832);
				var external_BdApi_React_default = __webpack_require__.n(external_BdApi_React_);
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
				var panel = __webpack_require__(865);
				var panel_React = __webpack_require__(832);
				const ChannelMessage = external_PluginApi_namespaceObject.WebpackModules.getModule((m => "ChannelMessage" === m?.type?.displayName));
				const dummyChannel = new classes_namespaceObject.Channel({
					name: "dumb-channel",
					id: "-1"
				});
				const [useStore, Api] = createStore({
					logs: []
				});
				function LogsPanel() {
					const logs = useStore((s => s.logs));
					if (!logs.length) return panel_React.createElement("b", {
						className: panel.Z.empty
					}, "Dont't worry, the plugin isn't broken, nothing just happend.");
					const formattedLogs = [];
					let lastItem = null;
					for (const item of logs) {
						let isGroupStart = lastItem?.user?.id === item.user.id;
						const message = new classes_namespaceObject.Message({
							content: item.message,
							timestamp: item.timestamp,
							author: new classes_namespaceObject.User(item.user)
						});
						message.start = !isGroupStart;
						formattedLogs.push(message);
						lastItem = item;
					}
					return panel_React.createElement("div", null, panel_React.createElement(components_namespaceObject.Button, {
						className: panel.Z.clearButton,
						onClick: () => Api.setState({
							logs: []
						})
					}, "Clear Logs"), panel_React.createElement(scrollbars_namespaceObject.ScrollerThin, {
						className: panel.Z.contents
					}, formattedLogs.map((message => panel_React.createElement("div", {
						className: message.start && panel.Z.message
					}, panel_React.createElement(ChannelMessage, {
						message,
						channel: dummyChannel,
						isGroupStart: message.start
					}))))));
				}
				LogsPanel.Store = Api;
				const constants = {
					VOICE_STATES: {
						deaf: {
							setting: "serverDeaf",
							strings: ["Got Server undeafened", "Got Server deafened"],
							description: "Fires if someone got server deafened/undeafened."
						},
						mute: {
							setting: "serverMute",
							strings: ["Got Server unmuted", "Got Server muted"],
							description: "Fires if someone got server muted/unmuted."
						},
						selfDeaf: {
							setting: "selfDeaf",
							strings: ["Undeafened", "Deafened"],
							description: "Fires if someone deafen/undeafen oneself."
						},
						selfMute: {
							setting: "selfMute",
							strings: ["Unmuted self.", "Muted self."],
							description: "Fires if someone mutes/unmutes oneself."
						},
						selfStream: {
							setting: "selfStream",
							strings: ["Stopped streaming.", "Started streaming."],
							description: "Fires if someone stopps/startes streaming."
						},
						selfVideo: {
							setting: "selfVideo",
							strings: ["Stopped screenshare.", "Started screenshare."],
							description: "Fires if someone stopps/starts screensharing."
						}
					}
				};
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
				const forms_namespaceObject = Modules["@discord/forms"];
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
				const NotificationSetting = hooks_createUpdateWrapper(external_PluginApi_namespaceObject.WebpackModules.getByDisplayName("NotificationSettings"), "position", "onChange", 1);
				const otherSettings = {
					ignoreSelf: {
						value: false,
						note: "Defines if logs about your own actions should be ignored.",
						name: "Ignore yourself"
					},
					suppressInDnd: {
						value: true,
						note: "Suppress desktop notifications in DND, this automatically enables the In-App notification api.",
						name: "Suppress in DND"
					},
					notifications: {
						value: true,
						note: "Defines if notifications should be shown when an event happens in your current call.",
						name: "Notifications"
					}
				};
				function SettingsPanel() {
					return external_BdApi_React_default().createElement("div", null, external_BdApi_React_default().createElement(Category, {
						label: "General",
						look: Category.Looks.COMPACT
					}, Object.keys(otherSettings).map((key => external_BdApi_React_default().createElement(SwitchItem, Settings_extends({}, otherSettings[key], {
						value: settings.get(key, otherSettings[key].value),
						onChange: value => {
							settings.set(key, value);
						}
					}), otherSettings[key].name))), external_BdApi_React_default().createElement(forms_namespaceObject.FormItem, {
						title: "InApp Notifications"
					}, external_BdApi_React_default().createElement(NotificationSetting, {
						position: settings.get("inappPosition", "topleft"),
						onChange: value => settings.set("inappPosition", value)
					}), external_BdApi_React_default().createElement(forms_namespaceObject.FormText, {
						type: "description"
					}, "Defines if notifications should be shown when an event happens in your current call."))), external_BdApi_React_default().createElement(Category, {
						label: "Voice Updates",
						look: Category.Looks.COMPACT
					}, Object.keys(constants.VOICE_STATES).reduce(((items, key) => {
						items.push(external_BdApi_React_default().createElement(SwitchItem, {
							value: settings.get(key, true),
							onChange: value => {
								settings.set(key, value);
							},
							note: constants.VOICE_STATES[key].description
						}, _.upperFirst(key)));
						return items;
					}), [])));
				}
				const external_Modules_react_spring_namespaceObject = Modules["react-spring"];
				var notification_React = __webpack_require__(832);
				function notification_extends() {
					notification_extends = Object.assign || function(target) {
						for (var i = 1; i < arguments.length; i++) {
							var source = arguments[i];
							for (var key in source)
								if (Object.prototype.hasOwnProperty.call(source, key)) target[key] = source[key];
						}
						return target;
					};
					return notification_extends.apply(this, arguments);
				}
				const RemoveIcon = props => notification_React.createElement("svg", notification_extends({
					width: "12",
					height: "12",
					viewBox: "0 0 24 24"
				}, props), notification_React.createElement("path", {
					fill: "currentColor",
					d: "M18.4 4L12 10.4L5.6 4L4 5.6L10.4 12L4 18.4L5.6 20L12 13.6L18.4 20L20 18.4L13.6 12L20 5.6L18.4 4Z"
				}));
				function notification_Notification(props) {
					const [closing, setClosing] = (0, external_BdApi_React_.useState)(false);
					const timeout = (0, external_BdApi_React_.useMemo)((() => props.timeout || 5e3), []);
					const spring = (0, external_Modules_react_spring_namespaceObject.useSpring)({
						from: {
							progress: 0,
							backdrop: closing ? 10 : 0
						},
						to: {
							progress: 100,
							backdrop: closing ? 0 : 10
						},
						config: key => {
							switch (key) {
								case "progress":
									return {
										duration: timeout
									};
								default:
									return {
										duration: 250
									};
							}
						}
					});
					return notification_React.createElement(external_Modules_react_spring_namespaceObject.animated.div, {
						style: {
							backdropFilter: spring.backdrop.to((e => {
								if (closing && 0 === e && "function" === typeof props.onClose) props.onClose();
								return `blur(${e}px)`;
							}))
						},
						onMouseEnter: () => spring.progress.pause(),
						onMouseLeave: () => spring.progress.resume(),
						className: (0, utils_namespaceObject.joinClassNames)(notification.Z.container, {
							closing
						})
					}, notification_React.createElement("div", {
						className: notification.Z.content
					}, props.content), notification_React.createElement(components_namespaceObject.Button, {
						look: components_namespaceObject.Button.Looks.BLANK,
						size: components_namespaceObject.Button.Sizes.NONE,
						className: notification.Z.closeButton,
						onClick: () => setClosing(true)
					}, notification_React.createElement(RemoveIcon, null)), notification_React.createElement("div", {
						className: notification.Z.progress
					}, notification_React.createElement(external_Modules_react_spring_namespaceObject.animated.div, {
						className: notification.Z.progressBar,
						style: {
							width: spring.progress.to((e => {
								if (e > 97 && 0 !== props.timeout && !closing) setClosing(true);
								return `${e}%`;
							})),
							backgroundColor: props.color
						}
					})));
				}
				const external_BdApi_ReactDOM_namespaceObject = BdApi.ReactDOM;
				var external_BdApi_ReactDOM_default = __webpack_require__.n(external_BdApi_ReactDOM_namespaceObject);
				var notifications_React = __webpack_require__(832);
				function notifications_extends() {
					notifications_extends = Object.assign || function(target) {
						for (var i = 1; i < arguments.length; i++) {
							var source = arguments[i];
							for (var key in source)
								if (Object.prototype.hasOwnProperty.call(source, key)) target[key] = source[key];
						}
						return target;
					};
					return notifications_extends.apply(this, arguments);
				}
				const [notifications_useStore, notifications_Api] = createStore({
					notifications: {},
					paused: false
				});
				const DOMNode = Object.assign(document.createElement("div"), {
					id: "voicechatnotifications",
					className: "VoiceChatNotifications-notification-" + settings.get("inappPosition", "topleft")
				});
				function initialize() {
					external_BdApi_ReactDOM_default().render(notifications_React.createElement(VoiceNotifications, null), DOMNode);
					document.getElementById("app-mount").appendChild(DOMNode);
				}
				function shutdown() {
					const node = document.getElementById("voicechatnotifications");
					if (!node) return false;
					const didUnmount = external_BdApi_ReactDOM_default().unmountComponentAtNode(node);
					if (didUnmount) node.remove();
				}
				function show(content, options = {}) {
					const id = parseInt(Math.random().toString().slice(2, 16));
					const props = {
						id,
						content,
						...options,
						onClose: () => {
							notifications_Api.setState((state => {
								delete state.notifications[id];
								return {
									...state
								};
							}));
						}
					};
					notifications_Api.setState((state => ({
						notifications: {
							...state.notifications,
							[id]: props
						}
					})));
					return id;
				}
				settings.addChangeListener((() => {
					const value = settings.get("inappPosition", "topleft");
					DOMNode.className = "VoiceChatNotifications-notification-" + value;
				}));
				function VoiceNotifications() {
					const state = notifications_useStore((e => Object.entries(e.notifications)));
					return state.map((([id, props]) => notifications_React.createElement(notification_Notification, notifications_extends({}, props, {
						key: id
					}))));
				}
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
				var VoiceChatNotifications_React = __webpack_require__(832);
				function VoiceChatNotifications_defineProperty(obj, key, value) {
					if (key in obj) Object.defineProperty(obj, key, {
						value,
						enumerable: true,
						configurable: true,
						writable: true
					});
					else obj[key] = value;
					return obj;
				}
				const VoiceStateStore = external_PluginApi_namespaceObject.WebpackModules.getByProps("getVoiceStates");
				const SelectedVoiceChannelStore = external_PluginApi_namespaceObject.WebpackModules.getByProps("getVoiceChannelId");
				const {
					AnimatedAvatar,
					Sizes: AvatarSizes
				} = external_PluginApi_namespaceObject.WebpackModules.getByProps("AnimatedAvatar");
				const MessageTimestamp = external_PluginApi_namespaceObject.WebpackModules.getByDisplayName("MessageTimestamp");
				const Members = external_PluginApi_namespaceObject.WebpackModules.getByProps("getMember");
				class VoiceChatNotifications extends(external_BasePlugin_default()) {
					constructor(...args) {
						super(...args);
						VoiceChatNotifications_defineProperty(this, "logs", []);
						VoiceChatNotifications_defineProperty(this, "lastStates", {});
						VoiceChatNotifications_defineProperty(this, "logsRef", VoiceChatNotifications_React.createRef());
						VoiceChatNotifications_defineProperty(this, "currentVoiceChannelId", void 0);
						VoiceChatNotifications_defineProperty(this, "openLogs", (() => {
							(0, modal_namespaceObject.openModal)((props => VoiceChatNotifications_React.createElement(modal_namespaceObject.ModalRoot, props, VoiceChatNotifications_React.createElement(LogsPanel, null))));
						}));
						VoiceChatNotifications_defineProperty(this, "onVoiceStateChange", (props => {
							for (const update of props.voiceStates) {
								let user = stores_namespaceObject.Users.getUser(update.userId) || {};
								if (settings.get("ignoreSelf", false) && user.id === stores_namespaceObject.Users.getCurrentUser().id) return;
								const pushToLog = message => {
									const timestamp = new classes_namespaceObject.Timestamp(new Date);
									const log = {
										user,
										timestamp,
										message,
										channelId: update.channelId
									};
									this.updateLogs(log);
									LogsPanel.Store.setState((state => {
										state.logs.unshift(log);
										return {
											logs: state.logs
										};
									}));
								};
								if (this.lastStates[update.userId] && !update.channelId && settings.get("leave", true)) {
									pushToLog("Left the call.");
									delete this.lastStates[update.userId];
								}
								if (!update.channelId || update.channelId !== this.currentVoiceChannelId) return;
								if (!this.lastStates[update.userId]) {
									if (settings.get("join", true)) pushToLog("Joined the call.");
									this.lastStates[update.userId] = update;
								} else {
									if (_.isEqual(this.lastStates[update.userId], update)) return;
									for (const prop in constants.VOICE_STATES) {
										const value = constants.VOICE_STATES[prop];
										const hasChanges = this.lastStates[update.userId][prop] !== update[prop];
										if (settings.get(value.setting, true) && hasChanges) pushToLog(value.strings[Number(Boolean(update[prop]))]);
									}
									this.lastStates[update.userId] = update;
								}
							}
						}));
						VoiceChatNotifications_defineProperty(this, "onSelect", (e => {
							this.logs = [];
							this.lastStates = {};
							this.currentVoiceChannelId = e.channelId;
						}));
					}
					get subscriptions() {
						return [
							[external_PluginApi_DiscordModules_namespaceObject.DiscordConstants.ActionTypes.VOICE_STATE_UPDATES, this.onVoiceStateChange],
							[external_PluginApi_DiscordModules_namespaceObject.DiscordConstants.ActionTypes.VOICE_CHANNEL_SELECT, this.onSelect]
						];
					}
					getSettingsPanel() {
						return VoiceChatNotifications_React.createElement(SettingsPanel, null);
					}
					onStart() {
						external_StyleLoader_default().inject();
						initialize();
						for (const [event, callback] of this.subscriptions) modules_namespaceObject.Dispatcher.subscribe(event, callback);
						const selectedVoiceChannel = SelectedVoiceChannelStore.getVoiceChannelId();
						if (selectedVoiceChannel) {
							const state = VoiceStateStore.getVoiceStatesForChannel(selectedVoiceChannel);
							if (!state) return;
							Object.values(state).forEach((user => {
								this.lastStates[user.userId] = user;
							}));
							this.currentVoiceChannelId = selectedVoiceChannel;
						}
						external_PluginApi_namespaceObject.Utilities.suppressErrors(this.patchHeaderBar.bind(this), "HeaderBar patch")();
						commands.registerCommand(this.getName(), {
							id: "disable-notifications",
							type: 3,
							name: "Disable VCN",
							description: "Disables Voicechat notifications for this session.",
							predicate: () => !LogsPanel.Store.getState().paused && this.currentVoiceChannelId,
							options: [],
							execute: (_, {
								channel
							}) => {
								clyde.sendMessage(channel.id, {
									content: "Hiding Voicechat notifications for now."
								});
								LogsPanel.Store.setState({
									paused: true
								});
							}
						});
						commands.registerCommand(this.getName(), {
							id: "enable-notifications",
							type: 3,
							name: "Enable VCN",
							description: "Enables Voicechat notifications for this session again.",
							predicate: () => LogsPanel.Store.getState().paused && this.currentVoiceChannelId,
							options: [],
							execute: (_, {
								channel
							}) => {
								clyde.sendMessage(channel.id, {
									content: "Showing Voicechat notifications again."
								});
								LogsPanel.Store.setState({
									paused: false
								});
							}
						});
					}
					async patchHeaderBar() {
						const HeaderBarContainer = await external_PluginApi_namespaceObject.ReactComponents.getComponentByName("HeaderBarContainer", `.${external_PluginApi_namespaceObject.WebpackModules.getByProps("chat", "threadSidebar", "uploadArea").title}`);
						external_PluginApi_namespaceObject.Patcher.after(HeaderBarContainer.component.prototype, "render", (_this => {
							const tree = external_PluginApi_namespaceObject.Utilities.getNestedProp(_this, "props.toolbar");
							if (!Array.isArray(tree)) return;
							try {
								tree.unshift(VoiceChatNotifications_React.createElement(VoiceNotificationsButton, {
									onClick: this.openLogs
								}));
							} catch (error) {
								external_PluginApi_namespaceObject.Logger.error(`Failed to inject HeaderBarIcon!\n`, error);
							}
						}));
						HeaderBarContainer.forceUpdateAll();
					}
					updateLogs({
						message,
						user,
						timestamp,
						channelId
					}) {
						if (!settings.get("notifications", true) || LogsPanel.Store.getState().paused) return;
						const useInApp = settings.get("suppressInDnd", true) && "dnd" === stores_namespaceObject.SettingsStore.status || "disabled" !== settings.get("inappPosition", "topLeft");
						if (useInApp) show(VoiceChatNotifications_React.createElement(VoiceChatNotifications_React.Fragment, null, VoiceChatNotifications_React.createElement(AnimatedAvatar, {
							isMobile: false,
							status: stores_namespaceObject.Status.getStatus(user.id),
							isTyping: false,
							src: user.getAvatarURL(),
							size: AvatarSizes.SIZE_32
						}), VoiceChatNotifications_React.createElement("div", {
							className: notification.Z.wrapper
						}, VoiceChatNotifications_React.createElement("div", {
							className: notification.Z.header
						}, VoiceChatNotifications_React.createElement("div", {
							className: notification.Z.username
						}, user.username), VoiceChatNotifications_React.createElement(MessageTimestamp, {
							timestamp: new classes_namespaceObject.Timestamp(timestamp),
							className: notification.Z.timestamp
						})), VoiceChatNotifications_React.createElement("div", {
							className: notification.Z.message
						}, message))), {
							color: Members.getMember(stores_namespaceObject.Channels.getChannel(channelId)?.guild_id, user.id)?.colorString
						});
						else {
							const notification = new Notification(user.username + " - " + timestamp.toLocaleString(), {
								icon: user.getAvatarURL(),
								body: message,
								silent: true
							});
							notification.addEventListener("click", (() => this.openLogs()));
						}
					}
					onStop() {
						external_StyleLoader_default().remove();
						external_PluginApi_namespaceObject.Patcher.unpatchAll();
						commands.unregisterAllCommands(this.getName());
						shutdown();
						for (const [event, callack] of this.subscriptions) modules_namespaceObject.Dispatcher.unsubscribe(event, callack);
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
		var __webpack_exports__ = __webpack_require__(423);
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