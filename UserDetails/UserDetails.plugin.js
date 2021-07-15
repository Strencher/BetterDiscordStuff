/**
 * @name UserDetails
 * @version 1.4.4
 * @author Strencher
 * @description Shows you a lot information about users in popouts.
 * @source https://github.com/Strencher/BetterDiscordStuff/UserDetails
 * @updateUrl https://raw.githubusercontent.com/Strencher/BetterDiscordStuff/master/UserDetails/UserDetails.plugin.js
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
		"name": "UserDetails",
		"version": "1.4.4",
		"authors": [{
			"name": "Strencher",
			"discord_id": "415849376598982656",
			"github_username": "Strencher",
			"twitter_username": "Strencher3"
		}],
		"description": "Shows you a lot information about users in popouts.",
		"github": "https://github.com/Strencher/BetterDiscordStuff/UserDetails",
		"github_raw": "https://raw.githubusercontent.com/Strencher/BetterDiscordStuff/master/UserDetails/UserDetails.plugin.js"
	},
	"changelog": [{
		"title": "Fixed - v1.4.4",
		"type": "fixed",
		"items": [
			"Fixed the crash related to the latest discord update."
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
			597: (module, __webpack_exports__, __webpack_require__) => {
				__webpack_require__.d(__webpack_exports__, {
					Z: () => __WEBPACK_DEFAULT_EXPORT__
				});
				var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(645);
				var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = __webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
				var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()((function(i) {
					return i[1];
				}));
				___CSS_LOADER_EXPORT___.push([module.id, ".UserDetails-connections-header{font-weight:700;text-transform:uppercase;font-size:12px;margin-bottom:8px;color:var(--header-secondary)}.UserDetails-connections-connectionsBody div:not(.UserDetails-connections-connections,.UserDetails-connections-container){display:inline-flex;margin:5px}.UserDetails-connections-connectionsBody .UserDetails-connections-loading{fill:var(--interactive-muted);animation:UserDetails-connections-blink infinite 2s;width:30px;height:30px;margin:5px;margin-top:0;margin-left:0}.UserDetails-connections-connectionsBody .UserDetails-connections-connections{display:flex;flex-wrap:wrap;margin-bottom:8px}.UserDetails-connections-connectionsBody .UserDetails-connections-connections img{width:30px;height:30px}.UserDetails-connections-connectionsBody .UserDetails-connections-errorIcon{width:35px;height:35px;margin-top:-5px}.UserDetails-connections-connectionsBody .UserDetails-connections-errorIcon{fill:#ed4245 !important}@keyframes UserDetails-connections-blink{0%{opacity:.6}50%{opacity:.3}100%{opacity:.6}}", ""]);
				___CSS_LOADER_EXPORT___.locals = {
					header: "UserDetails-connections-header",
					connectionsBody: "UserDetails-connections-connectionsBody",
					connections: "UserDetails-connections-connections",
					container: "UserDetails-connections-container",
					loading: "UserDetails-connections-loading",
					blink: "UserDetails-connections-blink",
					errorIcon: "UserDetails-connections-errorIcon"
				};
				StyleLoader.append(module.id, ___CSS_LOADER_EXPORT___.toString());
				const __WEBPACK_DEFAULT_EXPORT__ = Object.assign(___CSS_LOADER_EXPORT___, ___CSS_LOADER_EXPORT___.locals);
			},
			242: (module, __webpack_exports__, __webpack_require__) => {
				__webpack_require__.d(__webpack_exports__, {
					Z: () => __WEBPACK_DEFAULT_EXPORT__
				});
				var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(645);
				var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = __webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
				var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()((function(i) {
					return i[1];
				}));
				___CSS_LOADER_EXPORT___.push([module.id, ".UserDetails-dates-container{display:flex;max-width:-webkit-fill-available}.UserDetails-dates-container.UserDetails-dates-text{flex-direction:column;margin-top:10px}.UserDetails-dates-container.UserDetails-dates-icons{flex-direction:row}.UserDetails-dates-container.UserDetails-dates-icons .UserDetails-dates-loading{animation:UserDetails-dates-blink infinite 2s ease-in-out}.UserDetails-dates-container svg{fill:#ddd;margin:5px;width:20px;height:20px}.UserDetails-dates-container.UserDetails-dates-text .UserDetails-dates-scrollableText{color:var(--text-normal);white-space:nowrap;position:relative;font-size:14px;width:-webkit-fill-available;text-align:left;line-height:18px}.UserDetails-dates-container.UserDetails-dates-text.UserDetails-dates-userProfile{padding-left:18px}.UserDetails-dates-container.UserDetails-dates-text.UserDetails-dates-userProfile .UserDetails-dates-scrollableText{text-align:left !important}.UserDetails-dates-container .UserDetails-dates-errorIcon{fill:#ed4245 !important}.UserDetails-dates-wrapper{display:block}@keyframes UserDetails-dates-blink{0%{opacity:.6}50%{opacity:.3}100%{opacity:.6}}", ""]);
				___CSS_LOADER_EXPORT___.locals = {
					container: "UserDetails-dates-container",
					text: "UserDetails-dates-text",
					icons: "UserDetails-dates-icons",
					loading: "UserDetails-dates-loading",
					blink: "UserDetails-dates-blink",
					scrollableText: "UserDetails-dates-scrollableText",
					userProfile: "UserDetails-dates-userProfile",
					errorIcon: "UserDetails-dates-errorIcon",
					wrapper: "UserDetails-dates-wrapper"
				};
				StyleLoader.append(module.id, ___CSS_LOADER_EXPORT___.toString());
				const __WEBPACK_DEFAULT_EXPORT__ = Object.assign(___CSS_LOADER_EXPORT___, ___CSS_LOADER_EXPORT___.locals);
			},
			755: (module, __webpack_exports__, __webpack_require__) => {
				__webpack_require__.d(__webpack_exports__, {
					Z: () => __WEBPACK_DEFAULT_EXPORT__
				});
				var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(645);
				var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = __webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
				var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()((function(i) {
					return i[1];
				}));
				___CSS_LOADER_EXPORT___.push([module.id, ".UserDetails-activity-icon{display:flex;float:right}.UserDetails-activity-container{display:flex}", ""]);
				___CSS_LOADER_EXPORT___.locals = {
					icon: "UserDetails-activity-icon",
					container: "UserDetails-activity-container"
				};
				StyleLoader.append(module.id, ___CSS_LOADER_EXPORT___.toString());
				const __WEBPACK_DEFAULT_EXPORT__ = Object.assign(___CSS_LOADER_EXPORT___, ___CSS_LOADER_EXPORT___.locals);
			},
			173: (module, __webpack_exports__, __webpack_require__) => {
				__webpack_require__.d(__webpack_exports__, {
					Z: () => __WEBPACK_DEFAULT_EXPORT__
				});
				var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(645);
				var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = __webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
				var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()((function(i) {
					return i[1];
				}));
				___CSS_LOADER_EXPORT___.push([module.id, ".UserDetails-badge-connection{width:30px;height:30px;position:relative}.UserDetails-badge-connection.UserDetails-badge-verified{border-radius:50%;overflow:hidden}.UserDetails-badge-connection.UserDetails-badge-verified .UserDetails-badge-verifiedBadge{width:12px;height:12px;position:absolute;bottom:0;right:0px;background:var(--background-floating);border-radius:50%;overflow:hidden;padding:2px}", ""]);
				___CSS_LOADER_EXPORT___.locals = {
					connection: "UserDetails-badge-connection",
					verified: "UserDetails-badge-verified",
					verifiedBadge: "UserDetails-badge-verifiedBadge"
				};
				StyleLoader.append(module.id, ___CSS_LOADER_EXPORT___.toString());
				const __WEBPACK_DEFAULT_EXPORT__ = Object.assign(___CSS_LOADER_EXPORT___, ___CSS_LOADER_EXPORT___.locals);
			},
			564: (module, __webpack_exports__, __webpack_require__) => {
				__webpack_require__.d(__webpack_exports__, {
					Z: () => __WEBPACK_DEFAULT_EXPORT__
				});
				var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(645);
				var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = __webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
				var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()((function(i) {
					return i[1];
				}));
				___CSS_LOADER_EXPORT___.push([module.id, ".UserDetails-flowerstar-wrapper{position:relative;display:flex;align-items:center;justify-content:center}.UserDetails-flowerstar-wrapper .UserDetails-flowerstar-container{display:block}.UserDetails-flowerstar-wrapper .UserDetails-flowerstar-tick{position:absolute;top:50%;left:50%;transform:translate(-50%, -50%)}", ""]);
				___CSS_LOADER_EXPORT___.locals = {
					wrapper: "UserDetails-flowerstar-wrapper",
					container: "UserDetails-flowerstar-container",
					tick: "UserDetails-flowerstar-tick"
				};
				StyleLoader.append(module.id, ___CSS_LOADER_EXPORT___.toString());
				const __WEBPACK_DEFAULT_EXPORT__ = Object.assign(___CSS_LOADER_EXPORT___, ___CSS_LOADER_EXPORT___.locals);
			},
			128: (module, __webpack_exports__, __webpack_require__) => {
				__webpack_require__.d(__webpack_exports__, {
					Z: () => __WEBPACK_DEFAULT_EXPORT__
				});
				var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(645);
				var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = __webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
				var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()((function(i) {
					return i[1];
				}));
				___CSS_LOADER_EXPORT___.push([module.id, ".UserDetails-settings-settingsPanel .UserDetails-settings-formItem{margin-bottom:10px}.UserDetails-settings-settingsPanel .UserDetails-settings-icons{flex-wrap:wrap}.UserDetails-settings-settingsPanel .UserDetails-settings-icons .UserDetails-settings-settingsBadgeContainer{display:inline-flex;cursor:pointer}.UserDetails-settings-settingsPanel .UserDetails-settings-icons .UserDetails-settings-settingsBadgeContainer .UserDetails-settings-settingsBadgeIcon{width:40px;height:40px}.UserDetails-settings-settingsPanel .UserDetails-settings-icons .UserDetails-settings-settingsBadgeContainer .UserDetails-settings-settingsBadgeIcon.UserDetails-settings-disabled{opacity:.4}.UserDetails-settings-settingsPanel .UserDetails-settings-category{color:#ddd}.UserDetails-settings-settingsPanel .UserDetails-settings-category.UserDetails-settings-opened .UserDetails-settings-categoryContent{padding:10px;padding:10px}.UserDetails-settings-settingsPanel .UserDetails-settings-category.UserDetails-settings-opened .UserDetails-settings-categoryContent .UserDetails-settings-replacementVariable{user-select:text;margin-bottom:6px;padding-bottom:6px;border-bottom:thin solid var(--background-modifier-accent)}.UserDetails-settings-settingsPanel .UserDetails-settings-category.UserDetails-settings-opened .UserDetails-settings-categoryContent .UserDetails-settings-replacementVariable b{margin-right:3px}.UserDetails-settings-settingsPanel .UserDetails-settings-category .UserDetails-settings-categoryHeader{cursor:pointer;padding:10px;font-size:15px;background:var(--background-tertiary);font-weight:600;text-transform:uppercase;display:flex;align-items:center}.UserDetails-settings-settingsPanel .UserDetails-settings-category .UserDetails-settings-categoryHeader .UserDetails-settings-categoryCaret{margin-left:auto}.UserDetails-settings-settingsPanel .UserDetails-settings-pageIcon{color:var(--interactive-normal);fill:var(--interactive-normal)}", ""]);
				___CSS_LOADER_EXPORT___.locals = {
					settingsPanel: "UserDetails-settings-settingsPanel",
					formItem: "UserDetails-settings-formItem",
					icons: "UserDetails-settings-icons",
					settingsBadgeContainer: "UserDetails-settings-settingsBadgeContainer",
					settingsBadgeIcon: "UserDetails-settings-settingsBadgeIcon",
					disabled: "UserDetails-settings-disabled",
					category: "UserDetails-settings-category",
					opened: "UserDetails-settings-opened",
					categoryContent: "UserDetails-settings-categoryContent",
					replacementVariable: "UserDetails-settings-replacementVariable",
					categoryHeader: "UserDetails-settings-categoryHeader",
					categoryCaret: "UserDetails-settings-categoryCaret",
					pageIcon: "UserDetails-settings-pageIcon"
				};
				StyleLoader.append(module.id, ___CSS_LOADER_EXPORT___.toString());
				const __WEBPACK_DEFAULT_EXPORT__ = Object.assign(___CSS_LOADER_EXPORT___, ___CSS_LOADER_EXPORT___.locals);
			},
			562: (module, __webpack_exports__, __webpack_require__) => {
				__webpack_require__.d(__webpack_exports__, {
					Z: () => __WEBPACK_DEFAULT_EXPORT__
				});
				var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(645);
				var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = __webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
				var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()((function(i) {
					return i[1];
				}));
				___CSS_LOADER_EXPORT___.push([module.id, ".UserDetails-style-loadingText{color:var(--text-normal);text-align:center}.UserDetails-style-scrollableText{color:var(--text-normal);white-space:nowrap;position:relative;font-size:14px;width:-webkit-fill-available;text-align:center;line-height:18px}", ""]);
				___CSS_LOADER_EXPORT___.locals = {
					loadingText: "UserDetails-style-loadingText",
					scrollableText: "UserDetails-style-scrollableText"
				};
				StyleLoader.append(module.id, ___CSS_LOADER_EXPORT___.toString());
				const __WEBPACK_DEFAULT_EXPORT__ = Object.assign(___CSS_LOADER_EXPORT___, ___CSS_LOADER_EXPORT___.locals);
			},
			177: (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
				__webpack_require__.r(__webpack_exports__);
				__webpack_require__.d(__webpack_exports__, {
					default: () => Plugin
				});
				const external_StyleLoader_namespaceObject = StyleLoader;
				var external_StyleLoader_default = __webpack_require__.n(external_StyleLoader_namespaceObject);
				var external_BdApi_React_ = __webpack_require__(832);
				var external_BdApi_React_default = __webpack_require__.n(external_BdApi_React_);
				const components_namespaceObject = Modules["@discord/components"];
				const connections_namespaceObject = Modules["@discord/connections"];
				var connections_default = __webpack_require__.n(connections_namespaceObject);
				var badge = __webpack_require__(173);
				const utils_namespaceObject = Modules["@discord/utils"];
				const external_PluginApi_namespaceObject = PluginApi;
				const package_namespaceObject = JSON.parse('{"um":{"u2":"UserDetails"}}');
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
				const FormItem = external_PluginApi_namespaceObject.WebpackModules.getByDisplayName("FormItem");
				const FormText = external_PluginApi_namespaceObject.WebpackModules.getByDisplayName("FormText");
				const FormDivider = external_PluginApi_namespaceObject.WebpackModules.getByDisplayName("FormDivider");
				const Flex = external_PluginApi_namespaceObject.WebpackModules.getByDisplayName("Flex");
				const {
					marginBottom8
				} = external_PluginApi_namespaceObject.WebpackModules.getByProps("marginBottom8");
				class Utilities extends external_PluginApi_namespaceObject.Utilities {
					static joinClassNames(...classNames) {
						return classNames.filter((e => e)).join(" ");
					}
					static get useForceUpdate() {
						return () => (0, external_BdApi_React_.useReducer)((n => n + 1), 0)[1];
					}
					static createUpdateWrapper(Component, form = true, valueProp = "value") {
						return props => {
							const [state, setState] = (0, external_BdApi_React_.useState)(props[valueProp]);
							props[valueProp] = state;
							if (form) return external_BdApi_React_default().createElement(Flex, {
								className: marginBottom8,
								direction: Flex.Direction.VERTICAL
							}, external_BdApi_React_default().createElement(FormItem, {
								title: props.name
							}, external_BdApi_React_default().createElement(Component, _extends({}, props, {
								onChange: value => {
									value = value.value ?? value;
									setState(value);
									props.onChange(value);
								}
							})), external_BdApi_React_default().createElement(FormText, {
								type: "description",
								disabled: Boolean(props.note)
							}, props.note)), external_BdApi_React_default().createElement(FormDivider, null));
							else return external_BdApi_React_default().createElement(Component, _extends({}, props, {
								onChange: value => {
									value = value.value ?? value;
									setState(value);
									props.onChange(value);
								}
							}));
						};
					}
				}
				const modules_namespaceObject = Modules["@discord/modules"];
				const flux_namespaceObject = Modules["@discord/flux"];
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
				const Settings = new class extends flux_namespaceObject.Store {
					constructor() {
						super(modules_namespaceObject.Dispatcher, {});
						_defineProperty(this, "settings", external_PluginApi_namespaceObject.PluginUtilities.loadSettings(package_namespaceObject.um.u2, {}));
						_defineProperty(this, "get", ((key, defaultValue) => this.settings[key] ?? defaultValue));
						_defineProperty(this, "set", ((key, value) => {
							this.settings[key] = value;
							external_PluginApi_namespaceObject.PluginUtilities.saveSettings(package_namespaceObject.um.u2, this.settings);
							this.emitChange();
						}));
					}
				};
				var flowerstar = __webpack_require__(564);
				function flowerstar_extends() {
					flowerstar_extends = Object.assign || function(target) {
						for (var i = 1; i < arguments.length; i++) {
							var source = arguments[i];
							for (var key in source)
								if (Object.prototype.hasOwnProperty.call(source, key)) target[key] = source[key];
						}
						return target;
					};
					return flowerstar_extends.apply(this, arguments);
				}
				const icons_flowerstar = props => external_BdApi_React_default().createElement("div", flowerstar_extends({}, props, {
					className: (0, utils_namespaceObject.joinClassNames)(flowerstar.Z.wrapper, props.className)
				}), external_BdApi_React_default().createElement("svg", {
					width: "16",
					height: "16",
					viewBox: "0 0 16 15.2",
					className: flowerstar.Z.container
				}, external_BdApi_React_default().createElement("path", {
					fill: "#4f545c",
					"fill-rule": "evenodd",
					d: "m16 7.6c0 .79-1.28 1.38-1.52 2.09s.44 2 0 2.59-1.84.35-2.46.8-.79 1.84-1.54 2.09-1.67-.8-2.47-.8-1.75 1-2.47.8-.92-1.64-1.54-2.09-2-.18-2.46-.8.23-1.84 0-2.59-1.54-1.3-1.54-2.09 1.28-1.38 1.52-2.09-.44-2 0-2.59 1.85-.35 2.48-.8.78-1.84 1.53-2.12 1.67.83 2.47.83 1.75-1 2.47-.8.91 1.64 1.53 2.09 2 .18 2.46.8-.23 1.84 0 2.59 1.54 1.3 1.54 2.09z"
				})), external_BdApi_React_default().createElement("svg", {
					className: flowerstar.Z.tick,
					width: "16",
					height: "16",
					viewBox: "0 0 16 15.2"
				}, external_BdApi_React_default().createElement("path", {
					d: "M7.4,11.17,4,8.62,5,7.26l2,1.53L10.64,4l1.36,1Z",
					fill: "#ffffff"
				})));
				function Badge({
					item
				}) {
					const connection = connections_default().get(item.type);
					const shouldVerified = Settings.get("showVerifiedConnections", true) && item.verified;
					return external_BdApi_React_default().createElement(components_namespaceObject.TooltipContainer, {
						text: item.name,
						className: (0, utils_namespaceObject.joinClassNames)(badge.Z.connection, {
							[badge.Z.verified]: shouldVerified
						})
					}, external_BdApi_React_default().createElement("img", {
						onContextMenu: () => {},
						onClick: () => {
							try {
								open(connection.getPlatformUserUrl(item), "_blank");
							} catch {}
						},
						src: connection.icon.color
					}), shouldVerified && external_BdApi_React_default().createElement(icons_flowerstar, {
						className: badge.Z.verifiedBadge
					}));
				}
				class Logger {
					static error(...message) {
						this._log("error", ...message);
					}
					static warn(...message) {
						this._log("warn", ...message);
					}
					static info(...message) {
						this._log("info", ...message);
					}
					static log(...message) {
						this._log("log", ...message);
					}
					static _log(level = "log", ...message) {
						console[level](`%c[${package_namespaceObject.um.u2}]%c`, "color: #0870f3; font-weight: 700;", "", ...message);
					}
				}
				function queue_defineProperty(obj, key, value) {
					if (key in obj) Object.defineProperty(obj, key, {
						value,
						enumerable: true,
						configurable: true,
						writable: true
					});
					else obj[key] = value;
					return obj;
				}
				class WaitQueue {
					constructor({
						autostart = true,
						functions = [],
						delay = 1e3
					} = {}) {
						queue_defineProperty(this, "next", (() => {
							if (!this.functions.length || this.paused) return this.running = false;
							this.running = true;
							this._runCallback(this.functions.shift()).then((() => setTimeout(this.next, this.delay)));
						}));
						queue_defineProperty(this, "continue", (() => {
							this.paused = false;
							this.next();
						}));
						queue_defineProperty(this, "pause", (() => {
							this.paused = true;
						}));
						this.autostart = autostart;
						this.functions = functions;
						this.delay = delay;
						if (this.autostart && functions.length) this.next();
					}
					add(callback, caller, event) {
						const func = async () => {
							event.reply("done", await callback());
						};
						func.__caller = caller;
						func.__error = error => {
							event.reply("error", error);
						};
						this.functions.push(func);
						event.on("cancel", (() => {
							const index = this.functions.indexOf(func);
							if (-1 == index) return;
							this.functions.splice(index, 1);
						}));
						if (this.autostart && !this.running) this.next();
					}
					async _runCallback(callback) {
						if ("function" !== typeof callback) return;
						try {
							await callback();
						} catch (error) {
							Logger.error(`Could not run callback for "${callback.__caller}":`, "\n", error);
							callback.__error(error);
						}
					}
				}
				const {
					APIModule
				} = external_PluginApi_namespaceObject.DiscordModules;
				let cache = window.__ud_cache ?? (window.__ud_cache = {}),
					queue = new WaitQueue({
						delay: 2500
					});
				class ApiModule {
					constructor(plugin) {
						this.plugin = plugin;
						cache[this.api] = {};
					}
					extractDate(id) {
						return new Date(id / 4194304 + 14200704e5);
					}
					get api() {
						return "";
					}
					get cache() {
						return cache[this.api];
					}
					error(...message) {
						Logger.error(...message);
					}
					setCache(guildId, userId, data) {
						if (!cache[this.api]) cache[this.api] = {
							[guildId]: {}
						};
						if (!cache[this.api][guildId]) cache[this.api][guildId] = {};
						return cache[this.api][guildId][userId] = data;
					}
					getByCache(guildId, userId) {
						const chunk = cache[this.api]?.[guildId]?.[userId];
						if (!chunk || Date.now() - chunk.fetch > 6e5) return null;
						return chunk.data;
					}
					get(options, guildId, userId, event) {
						if (!cache[this.api]) cache[this.api] = {
							[guildId]: {}
						};
						if (!cache[this.api][guildId]) cache[this.api][guildId] = {};
						let data;
						const userFromCache = this.getByCache(guildId, userId);
						if (userFromCache) data = userFromCache;
						if (!data) {
							queue.add((() => APIModule.get(options)), this.api, event);
							event.on("done", (data => {
								this.setCache(guildId, userId, {
									data,
									fetch: Date.now()
								});
							})).on("error", (error => {
								if (429 === error.status) {
									queue.pause();
									setTimeout(queue.continue, 1e3 * (error.body?.retry_after ?? 5));
								}
							}));
						} else event.reply("done", data);
					}
					parseZeroPadding(zeroable) {
						return zeroable <= 9 ? "0" + zeroable : zeroable;
					}
					monthsAgo(date1, date2) {
						let months = 12 * (date2.getFullYear() - date1.getFullYear());
						months -= date1.getMonth();
						months += date2.getMonth();
						months = Math.abs(months);
						return months <= 0 ? 0 : months;
					}
					daysAgo(date1, date2) {
						return Math.floor((date1 - date2) / (1e3 * 60 * 60 * 24));
					}
					yearsAgo(date1, date2) {
						return this.monthsAgo(date2, date1) / 12;
					}
					parseTime(format, date) {
						if ("object" !== typeof date) date = new Date(date);
						const today = new Date,
							daysago = this.daysAgo(today, date),
							hour12 = 0 === Settings.get("12hour", 1);
						return format.replace(/\$timelabel/g, date.getHours() >= 12 ? "PM" : "AM").replace(/\$daysago/g, daysago).replace(/\$dayname/g, date.toLocaleDateString("default", {
							weekday: "short",
							hour12
						})).replace(/\$day/g, date.toLocaleDateString("default", {
							day: "2-digit",
							hour12
						})).replace(/\$monthname/g, date.toLocaleDateString("default", {
							month: "short",
							hour12
						})).replace(/\$monthsago/g, this.monthsAgo(today, date)).replace(/\$month/g, date.toLocaleDateString("default", {
							month: "2-digit",
							hour12
						})).replace(/\$weeksago/g, Math.floor(daysago / 7)).replace(/\$yearsago/g, Math.floor(this.yearsAgo(today, date))).replace(/\$year/g, date.getFullYear()).replace(/\$hour/g, this.parseZeroPadding(hour12 ? date.getHours() % 12 : date.getHours())).replace(/\$minute/g, this.parseZeroPadding(date.getMinutes())).replace(/\$second/g, this.parseZeroPadding(date.getSeconds()));
					}
				}
				function circle_extends() {
					circle_extends = Object.assign || function(target) {
						for (var i = 1; i < arguments.length; i++) {
							var source = arguments[i];
							for (var key in source)
								if (Object.prototype.hasOwnProperty.call(source, key)) target[key] = source[key];
						}
						return target;
					};
					return circle_extends.apply(this, arguments);
				}
				const circle = props => external_BdApi_React_default().createElement("svg", circle_extends({}, props, {
					xmlns: "http://www.w3.org/2000/svg",
					viewBox: "0 0 36 36"
				}), external_BdApi_React_default().createElement("circle", {
					cx: "18",
					cy: "18",
					r: "18"
				}));
				function error_extends() {
					error_extends = Object.assign || function(target) {
						for (var i = 1; i < arguments.length; i++) {
							var source = arguments[i];
							for (var key in source)
								if (Object.prototype.hasOwnProperty.call(source, key)) target[key] = source[key];
						}
						return target;
					};
					return error_extends.apply(this, arguments);
				}
				const error = props => external_BdApi_React_default().createElement("svg", error_extends({
					xmlns: "http://www.w3.org/2000/svg",
					viewBox: "0 0 24 24",
					fill: "black",
					width: "18px",
					height: "18px"
				}, props), external_BdApi_React_default().createElement("path", {
					d: "M0 0h24v24H0z",
					fill: "none"
				}), external_BdApi_React_default().createElement("path", {
					d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"
				}));
				var apis_connections = __webpack_require__(597);
				const stores_namespaceObject = Modules["@discord/stores"];
				const actions_namespaceObject = Modules["@discord/actions"];
				const Header = external_PluginApi_namespaceObject.WebpackModules.getByDisplayName("Header");
				class Userconnections extends ApiModule {
					get api() {
						return this.constructor.name;
					}
					task(user) {
						return () => {
							if (!connections_default().filter((c => Settings.get("shownConnections", {})[c.type])).length || user.bot) return null;
							const connections = (0, flux_namespaceObject.useStateFromStores)([stores_namespaceObject.UserProfile], (() => stores_namespaceObject.UserProfile.getUserProfile(user.id)?.connectedAccounts));
							const [message, setMessage] = (0, external_BdApi_React_.useState)("");
							(0, external_BdApi_React_.useEffect)((() => {
								if (stores_namespaceObject.UserProfile.isFetching(user.id)) return;
								actions_namespaceObject.ProfileActions.fetchProfile(user.id).catch((error => {
									if (~error?.message?.indexOf("Already dispatching")) return;
									external_PluginApi_namespaceObject.Logger.error(`Failed to fetch profile for ${user.id}:\n`, error);
									setMessage("Failed to fetch!");
								}));
							}), [true]);
							return external_BdApi_React_default().createElement("div", {
								className: apis_connections.Z.connectionsBody
							}, !connections?.length && Settings.get("showEmptyConnections", true) || connections?.length ? external_BdApi_React_default().createElement(Header, {
								className: apis_connections.Z.container,
								size: Header.Sizes.SIZE_12,
								className: apis_connections.Z.header,
								uppercase: true,
								muted: true
							}, connections?.length ? "connections" : "no connections") : null, Array.isArray(connections) ? connections?.length ? external_BdApi_React_default().createElement("div", {
								className: apis_connections.Z.connections
							}, connections.filter((e => Settings.get("shownConnections")[e.type])).map((badge => external_BdApi_React_default().createElement(Badge, {
								item: badge,
								key: badge.type
							})))) : null : message ? external_BdApi_React_default().createElement(components_namespaceObject.TooltipContainer, {
								text: message
							}, external_BdApi_React_default().createElement(error, {
								className: apis_connections.Z.errorIcon
							})) : external_BdApi_React_default().createElement(components_namespaceObject.TooltipContainer, {
								text: "Loading Connections..."
							}, connections_default().filter((e => Settings.get("shownConnections")[e.type])).map((() => external_BdApi_React_default().createElement(circle, {
								className: apis_connections.Z.loading
							})))));
						};
					}
				}
				function cake_extends() {
					cake_extends = Object.assign || function(target) {
						for (var i = 1; i < arguments.length; i++) {
							var source = arguments[i];
							for (var key in source)
								if (Object.prototype.hasOwnProperty.call(source, key)) target[key] = source[key];
						}
						return target;
					};
					return cake_extends.apply(this, arguments);
				}
				const cake = props => external_BdApi_React_default().createElement("svg", cake_extends({}, props, {
					xmlns: "http://www.w3.org/2000/svg",
					height: "24",
					viewBox: "0 0 24 24",
					width: "24"
				}), external_BdApi_React_default().createElement("g", null, external_BdApi_React_default().createElement("rect", {
					fill: "none",
					height: "24",
					width: "24"
				}), external_BdApi_React_default().createElement("g", null, external_BdApi_React_default().createElement("polygon", {
					points: "2,22 16,17 7,8"
				}), external_BdApi_React_default().createElement("path", {
					d: "M14.53,12.53l5.59-5.59c0.49-0.49,1.28-0.49,1.77,0l0.59,0.59l1.06-1.06l-0.59-0.59c-1.07-1.07-2.82-1.07-3.89,0 l-5.59,5.59L14.53,12.53z"
				}), external_BdApi_React_default().createElement("path", {
					d: "M10.06,6.88L9.47,7.47l1.06,1.06l0.59-0.59c1.07-1.07,1.07-2.82,0-3.89l-0.59-0.59L9.47,4.53l0.59,0.59 C10.54,5.6,10.54,6.4,10.06,6.88z"
				}), external_BdApi_React_default().createElement("path", {
					d: "M17.06,11.88l-1.59,1.59l1.06,1.06l1.59-1.59c0.49-0.49,1.28-0.49,1.77,0l1.61,1.61l1.06-1.06l-1.61-1.61 C19.87,10.81,18.13,10.81,17.06,11.88z"
				}), external_BdApi_React_default().createElement("path", {
					d: "M15.06,5.88l-3.59,3.59l1.06,1.06l3.59-3.59c1.07-1.07,1.07-2.82,0-3.89l-1.59-1.59l-1.06,1.06l1.59,1.59 C15.54,4.6,15.54,5.4,15.06,5.88z"
				}))));
				const external_BdApi_ReactDOM_namespaceObject = BdApi.ReactDOM;
				var external_BdApi_ReactDOM_default = __webpack_require__.n(external_BdApi_ReactDOM_namespaceObject);
				var dates = __webpack_require__(242);
				function textscroller_defineProperty(obj, key, value) {
					if (key in obj) Object.defineProperty(obj, key, {
						value,
						enumerable: true,
						configurable: true,
						writable: true
					});
					else obj[key] = value;
					return obj;
				}
				const Animations = external_PluginApi_namespaceObject.WebpackModules.getByProps("Value");
				class TextScroller extends external_BdApi_React_default().Component {
					constructor(...args) {
						super(...args);
						textscroller_defineProperty(this, "_ref", (instance => {
							let element = external_BdApi_ReactDOM_default().findDOMNode(instance);
							if (element && element.parentElement) {
								let maxWidth = element.parentElement.innerWidth;
								if (maxWidth > 50) element.style.setProperty("max-width", `${maxWidth}px`);
								setTimeout((() => {
									if (document.contains(element.parentElement)) {
										let newMaxWidth = element.parentElement.innerWidth;
										if (newMaxWidth > maxWidth) element.style.setProperty("max-width", `${newMaxWidth}px`);
									}
								}), 3e3);
								let Animation = new Animations.Value(0);
								Animation.interpolate({
									inputRange: [0, 1],
									outputRange: [0, -1 * (element.firstElementChild.offsetWidth - element.offsetWidth)]
								}).addListener((v => {
									element.firstElementChild.style.setProperty("left", `${v.value}px`);
								}));
								this.scroll = p => {
									let w = p + parseFloat(element.firstElementChild.style.getPropertyValue("left")) / (element.firstElementChild.offsetWidth - element.offsetWidth);
									w = isNaN(w) || !isFinite(w) ? p : w;
									w *= element.firstElementChild.offsetWidth / (2 * element.offsetWidth);
									Animations.parallel([Animations.timing(Animation, {
										toValue: p,
										duration: 4e3 * Math.sqrt(w ** 2) / (parseInt(this.props.speed) || 1)
									})]).start();
								};
							}
						}));
						textscroller_defineProperty(this, "_onClick", (e => {
							if ("function" == typeof this.props.onClick) this.props.onClick(e, this);
						}));
						textscroller_defineProperty(this, "_onMouseEnter", (e => {
							if (e.currentTarget.offsetWidth < e.currentTarget.firstElementChild.offsetWidth) {
								this.scrolling = true;
								e.currentTarget.firstElementChild.style.setProperty("display", "block");
								this.scroll(1);
							}
						}));
						textscroller_defineProperty(this, "_onMouseLeave", (e => {
							if (this.scrolling) {
								delete this.scrolling;
								e.currentTarget.firstElementChild.style.setProperty("display", "inline");
								this.scroll(0);
							}
						}));
					}
					render() {
						const style = Object.assign({}, this.props.style, {
							position: "relative",
							display: "block",
							overflow: "hidden"
						});
						return external_BdApi_React_default().createElement("div", {
							className: Utilities.joinClassNames(this.props.className, dates.Z.scrollableText),
							style,
							ref: this._ref,
							onClick: this._onClick,
							onMouseEnter: this._onMouseEnter,
							onMouseLeave: this._onMouseLeave
						}, external_BdApi_React_default().createElement("div", {
							style: {
								left: "0",
								position: "relative",
								display: "inline",
								whiteSpace: "nowrap"
							}
						}, this.props.children));
					}
				}
				class CreatedAt extends ApiModule {
					task(userId) {
						const text = this.parseTime(Settings.get("created_format", "Created At: $hour:$minute:$second, $day.$month.$year $daysago days"), this.extractDate(userId));
						return () => Settings.get("useIcons", true) ? external_BdApi_React_default().createElement(components_namespaceObject.TooltipContainer, {
							text
						}, external_BdApi_React_default().createElement(cake, null)) : external_BdApi_React_default().createElement(TextScroller, null, text);
					}
				}
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
				const calendar = props => external_BdApi_React_default().createElement("svg", calendar_extends({}, props, {
					xmlns: "http://www.w3.org/2000/svg",
					height: "24",
					viewBox: "0 0 24 24",
					width: "24"
				}), external_BdApi_React_default().createElement("path", {
					d: "M0 0h24v24H0z",
					fill: "none"
				}), external_BdApi_React_default().createElement("path", {
					d: "M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"
				}));
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
				const cube = props => external_BdApi_React_default().createElement("svg", cube_extends({}, props, {
					xmlns: "http://www.w3.org/2000/svg",
					viewBox: "0 0 36 36"
				}), external_BdApi_React_default().createElement("path", {
					d: "M36 32c0 2.209-1.791 4-4 4H4c-2.209 0-4-1.791-4-4V4c0-2.209 1.791-4 4-4h28c2.209 0 4 1.791 4 4v28z"
				}));
				var style = __webpack_require__(562);
				function reducer(state) {
					if (state >= 3) return 1;
					else return state + 1;
				}
				function LoadingText() {
					const [state, dispatch] = (0, external_BdApi_React_.useReducer)(reducer, 1);
					(0, external_BdApi_React_.useEffect)((() => {
						const interval = setInterval((() => {
							dispatch();
						}), 500);
						return () => {
							clearInterval(interval);
						};
					}), []);
					return external_BdApi_React_default().createElement("div", {
						className: style.Z.loadingText
					}, ".".repeat(state));
				}
				const JoinedAtDates = new Map,
					fetchingQueue = new Set;
				const JoinedAt = new class extends flux_namespaceObject.Store {
					resolveId(...args) {
						return args.join("_");
					}
					constructor() {
						super(modules_namespaceObject.Dispatcher, {});
					}
					getState() {
						return JoinedAtDates;
					}
					has(guildId, userId) {
						return JoinedAtDates.has(this.resolveId(guildId, userId));
					}
					isFetching(guildId, userId) {
						return fetchingQueue.has(this.resolveId(guildId, userId));
					}
					getDate(guildId, userId) {
						const data = JoinedAtDates.get(this.resolveId(guildId, userId));
						if (!data || Date.now() - data.fetch > 6e5) return;
						return data;
					}
					registerCallback(guildId, userId, callback) {
						const handleCallback = data => {
							if (data.guildId !== guildId) return;
							callback(data);
							modules_namespaceObject.Dispatcher.unsubscribe("GUILD_MEMBERS_CHUNK", handleCallback);
						};
						modules_namespaceObject.Dispatcher.subscribe("GUILD_MEMBERS_CHUNK", handleCallback);
					}
					setFailed(id, reason) {
						JoinedAtDates.set(id, {
							data: reason,
							fetch: Date.now(),
							status: "failure"
						});
						this.emitChange();
					}
					async fetch(guildId, userId) {
						const id = this.resolveId(guildId, userId);
						if (fetchingQueue.has(id)) return;
						fetchingQueue.add(id);
						if (stores_namespaceObject.Members.getMember(guildId, userId)) {
							JoinedAtDates.set(id, {
								data: new Date(stores_namespaceObject.Members.getMember(guildId, userId).joinedAt),
								fetch: Date.now(),
								status: "success"
							});
							return this.emitChange();
						}
						const timeout = setTimeout((() => {
							this.setFailed(id, "FAILED_TO_FETCH");
						}), 6 * 1e4);
						this.registerCallback(guildId, userId, (data => {
							if (data.notFound.indexOf(userId) > -1) this.setFailed(id, "MEMBER_WAS_NOT_FOUND");
							else {
								const member = data.members.find((e => e?.user?.id === userId));
								if (member) JoinedAtDates.set(id, {
									data: new Date(member.joined_at),
									fetch: Date.now(),
									status: "success"
								});
								else this.setFailed(id, "MEMBER_WAS_NOT_FOUND");
							}
							fetchingQueue.delete(id);
							clearTimeout(timeout);
							this.emitChange();
						}));
						actions_namespaceObject.GuildActions.requestMembersById(guildId, userId);
					}
				};
				const joinedAt = JoinedAt;
				const i18n_namespaceObject = Modules["@discord/i18n"];
				var i18n_default = __webpack_require__.n(i18n_namespaceObject);
				class joinedDate_JoinedAt extends ApiModule {
					get api() {
						return this.constructor.name;
					}
					get format() {
						return Settings.get("joined_format", "Joined At: $hour:$minute:$second, $day.$month.$year $daysago days");
					}
					task(userId) {
						return external_BdApi_React_default().memo((() => {
							const guildId = stores_namespaceObject.SelectedGuilds.getGuildId();
							const joined = (0, flux_namespaceObject.useStateFromStores)([joinedAt], (() => joinedAt.getDate(guildId, userId)));
							const [message, setMessage] = (0, external_BdApi_React_.useState)("");
							(0, external_BdApi_React_.useEffect)((() => {
								if (joinedAt.has(guildId, userId) || joinedAt.isFetching(guildId, userId)) return;
								if (!guildId) return void setMessage(i18n_namespaceObject.Messages.FAILED_TO_FETCH);
								console.log(joinedAt.has(guildId, userId), joinedAt);
								joinedAt.fetch(guildId, userId);
							}), []);
							const useIcons = Settings.get("useIcons", true);
							const isFailed = !joined || "failure" === joined.status;
							return !isFailed ? useIcons ? external_BdApi_React_default().createElement(components_namespaceObject.TooltipContainer, {
								text: this.parseTime(this.format, joined.data)
							}, external_BdApi_React_default().createElement(calendar, null)) : external_BdApi_React_default().createElement(TextScroller, null, this.parseTime(this.format, joined.data)) : message || isFailed && i18n_namespaceObject.Messages[joined?.data] ? useIcons ? external_BdApi_React_default().createElement(components_namespaceObject.TooltipContainer, {
								text: message || i18n_namespaceObject.Messages[joined.data]
							}, external_BdApi_React_default().createElement(error, {
								className: dates.Z.errorIcon
							})) : external_BdApi_React_default().createElement(TextScroller, {
								style: {
									color: "red"
								}
							}, message || i18n_namespaceObject.Messages[joined.data]) : external_BdApi_React_default().createElement(components_namespaceObject.TooltipContainer, {
								text: "Loading JoinedAt..."
							}, useIcons ? external_BdApi_React_default().createElement(cube, {
								className: dates.Z.loading
							}) : external_BdApi_React_default().createElement(LoadingText, null));
						}));
					}
				}
				function textbubble_extends() {
					textbubble_extends = Object.assign || function(target) {
						for (var i = 1; i < arguments.length; i++) {
							var source = arguments[i];
							for (var key in source)
								if (Object.prototype.hasOwnProperty.call(source, key)) target[key] = source[key];
						}
						return target;
					};
					return textbubble_extends.apply(this, arguments);
				}
				const textbubble = props => external_BdApi_React_default().createElement("svg", textbubble_extends({}, props, {
					xmlns: "http://www.w3.org/2000/svg",
					height: "24",
					viewBox: "0 0 24 24",
					width: "24"
				}), external_BdApi_React_default().createElement("path", {
					d: "M0 0h24v24H0z",
					fill: "none"
				}), external_BdApi_React_default().createElement("path", {
					d: "M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM9 11H7V9h2v2zm4 0h-2V9h2v2zm4 0h-2V9h2v2z"
				}));
				const constants_namespaceObject = Modules["@discord/constants"];
				const sanitize_namespaceObject = Modules["@discord/sanitize"];
				const external_PluginApi_DiscordModules_namespaceObject = PluginApi.DiscordModules;
				function lastMessage_defineProperty(obj, key, value) {
					if (key in obj) Object.defineProperty(obj, key, {
						value,
						enumerable: true,
						configurable: true,
						writable: true
					});
					else obj[key] = value;
					return obj;
				}
				function resolveId(...args) {
					return args.join("_");
				}
				const lastMessage_fetchingQueue = new Set,
					lastMessages = new Map;
				function handleMessageCreate({
					message,
					channelId
				}) {
					lastMessages.set(resolveId(message.author.id, channelId), {
						channelId,
						messageId: message.id,
						data: new Date(message.timestamp),
						fetch: Date.now(),
						status: "success"
					});
					LastMessage.emitChange();
				}
				function handleMessageDelete({
					messageId,
					channelId
				}) {
					for (const [userId, result] of lastMessages) {
						if (result.messageId !== messageId || result.channelId !== channelId) continue;
						lastMessages.delete(resolveId(userId, channelId));
						LastMessage.emitChange();
					}
				}
				class LastMessageStore extends flux_namespaceObject.Store {
					constructor(...args) {
						super(...args);
						lastMessage_defineProperty(this, "paused", false);
					}
					get _users() {
						return lastMessages;
					}
					isFetching(userId, channelId) {
						return lastMessage_fetchingQueue.has(resolveId(userId, channelId));
					}
					get(userId, channelId) {
						const cached = lastMessages.get(resolveId(userId, channelId));
						if (!cached || Date.now() - cached.fetch > 6e5) return null;
						return cached;
					}
					has(userId, channelId) {
						return lastMessages.has(resolveId(userId, channelId));
					}
					fetch(userId, roomId, isGuild = false, attemp = 1) {
						const id = resolveId(userId, roomId);
						if (lastMessage_fetchingQueue.has(id) || this.paused) return Promise.resolve();
						if (attemp > 5) {
							lastMessage_fetchingQueue.delete(id);
							lastMessages.set(id, {
								channelId: roomId,
								data: "FAILED_TO_FETCH",
								fetch: Date.now(),
								messageId: null,
								status: "failure"
							});
							return Promise.resolve();
						}
						lastMessage_fetchingQueue.add(id);
						return new Promise(((resolve, reject) => {
							external_PluginApi_DiscordModules_namespaceObject.APIModule.get({
								url: isGuild ? constants_namespaceObject.Endpoints.SEARCH_GUILD(roomId) : constants_namespaceObject.Endpoints.SEARCH_CHANNEL(roomId),
								query: (0, sanitize_namespaceObject.stringify)({
									author_id: userId
								})
							}).then((data => {
								lastMessage_fetchingQueue.delete(id);
								let message = null;
								if (data?.body?.messages?.length)
									for (const result of data.body.messages[0])
										if (result.hit && result.author.id === userId) {
											message = result;
											break;
										}
								if (message) lastMessages.set(id, {
									data: new Date(message.timestamp),
									fetch: Date.now(),
									channelId: message.channel_id,
									messageId: message.id,
									status: "success"
								});
								else lastMessages.set(id, {
									data: "FAILED_TO_FETCH",
									fetch: Date.now(),
									channelId: roomId,
									messageId: null,
									status: "failure"
								});
								this.emitChange();
								resolve();
							})).catch((error => {
								if (429 === error.status) {
									this.paused = true;
									setTimeout((() => {
										this.paused = false;
										this.fetch(userId, roomId, isGuild, attemp).then(resolve).catch(reject);
									}), error.body.retry_after + 1e3);
								} else reject(error);
								lastMessage_fetchingQueue.delete(id);
							}));
						}));
					}
				}
				const LastMessage = new LastMessageStore(modules_namespaceObject.Dispatcher, {
					MESSAGE_CREATE: handleMessageCreate,
					MESSAGE_DELETE: handleMessageDelete
				});
				const stores_lastMessage = LastMessage;
				class LastMessageApi extends ApiModule {
					get api() {
						return this.constructor.name;
					}
					get format() {
						return Settings.get("lastmessage_format", "Last Message: $hour:$minute:$second, $day.$month.$year $daysago days");
					}
					task(user) {
						return () => {
							const roomId = stores_namespaceObject.SelectedGuilds.getGuildId() || stores_namespaceObject.SelectedChannels.getChannelId();
							const isGuild = Boolean(stores_namespaceObject.SelectedGuilds.getGuildId());
							const lastMessage = (0, flux_namespaceObject.useStateFromStores)([stores_lastMessage], (() => stores_lastMessage.get(user.id, roomId)));
							const [errorMessage, setErrorMessage] = (0, external_BdApi_React_.useState)("");
							(0, external_BdApi_React_.useEffect)((() => {
								if (stores_lastMessage.isFetching(user.id, roomId) || stores_lastMessage.has(user.id, roomId)) return;
								if (!roomId) return setErrorMessage("Cannot resolve channel/guild id.");
								stores_lastMessage.fetch(user.id, roomId, isGuild).catch((error => {
									this.error(`Failed to fetch LastMessage from ${user.tag}:\n`, error);
								}));
							}), []);
							const transitionToMessage = () => {
								if (!lastMessage.channelId || !lastMessage.messageId) return;
								utils_namespaceObject.Navigation.replaceWith(isGuild ? `/channels/${stores_namespaceObject.SelectedGuilds.getGuildId()}/${lastMessage.channelId}/${lastMessage.messageId}` : `/channels/@me/${lastMessage.channelId}/${lastMessage.messageId}`);
							};
							const failed = "failure" === lastMessage?.status;
							const shouldUseIcon = Settings.get("useIcons", true);
							return lastMessage?.data && !failed ? shouldUseIcon ? external_BdApi_React_default().createElement(components_namespaceObject.TooltipContainer, {
								text: this.parseTime(this.format, lastMessage.data)
							}, external_BdApi_React_default().createElement(textbubble, {
								onClick: transitionToMessage
							})) : external_BdApi_React_default().createElement(TextScroller, {
								onClick: transitionToMessage
							}, this.parseTime(this.format, lastMessage.data)) : errorMessage || failed && i18n_namespaceObject.Messages[lastMessage.data] ? shouldUseIcon ? external_BdApi_React_default().createElement(components_namespaceObject.TooltipContainer, {
								text: errorMessage || i18n_namespaceObject.Messages[lastMessage.data]
							}, external_BdApi_React_default().createElement(error, {
								className: dates.Z.errorIcon
							})) : external_BdApi_React_default().createElement(TextScroller, null, errorMessage || i18n_namespaceObject.Messages[lastMessage.data]) : external_BdApi_React_default().createElement(components_namespaceObject.TooltipContainer, {
								text: "Loading Last Message..."
							}, shouldUseIcon ? external_BdApi_React_default().createElement(cube, {
								className: dates.Z.loading
							}) : external_BdApi_React_default().createElement(LoadingText, null));
						};
					}
				}
				const defaultConnections = {
					battlenet: {
						icon: "/assets/8c289d499232cd8e9582b4a5639d9d1d.png"
					},
					facebook: {
						icon: "/assets/8d8f815f3d81a33b1e70ec7c22e1b6fe.png",
						link: "https://www.facebook.com/profile.php?id={{userId}}"
					},
					leagueoflegends: {
						icon: "/assets/806953fe1cc616477175cbcdf90d5cd3.png"
					},
					reddit: {
						icon: "/assets/3abe9ce5a00cc24bd8aae04bf5968f4c.png",
						link: "https://www.reddit.com/user/{{user}}"
					},
					spotify: {
						icon: "/assets/f0655521c19c08c4ea4e508044ec7d8c.png",
						link: "https://open.spotify.com/user/{{user}}"
					},
					steam: {
						icon: "/assets/f09c1c70a67ceaaeb455d163f3f9cbb8.png",
						link: "https://steamcommunity.com/profiles/{{userId}}"
					},
					twitch: {
						icon: "/assets/edbbf6107b2cd4334d582b26e1ac786d.png",
						link: "https://twitch.tv/{{user}}"
					},
					twitter: {
						icon: "/assets/4662875160dc4c56954003ebda995414.png",
						link: "https://twitter.com/{{user}}"
					},
					xbox: {
						icon: "/assets/0d44ba28e39303de3832db580a252456.png"
					},
					youtube: {
						icon: "/assets/449cca50c1452b4ace3cbe9bc5ae0fd6.png",
						link: "https://www.youtube.com/channel/{{userId}}"
					},
					github: {
						icon: "/assets/5d69e29f0d71aaa04ed9725100199b4e.png",
						link: "https://github.com/{{user}}"
					}
				};
				const pages_namespaceObject = JSON.parse('[{"name":"General","icon":"Wrench","items":[{"type":"switch","name":"Use Icons","note":"Defines if icons should be used to show any date.","id":"useIcons","value":true},{"type":"radio","name":"Time Format","value":1,"id":"12hour","options":[{"value":1,"name":"24 hour"},{"value":0,"name":"12 hour"}]},{"type":"divider"},{"type":"category","name":"Variables","items":[{"type":"replacement","prefix":"$timelabel","description":"Replaces the current time label. eg AM or PM."},{"type":"replacement","prefix":"$day","description":"Replaces the current day."},{"type":"replacement","prefix":"$daysago","description":"Replaces with a number of how many days it\'s ago."},{"type":"replacement","prefix":"$dayname","description":"Replaces the shorted dayname."},{"type":"replacement","prefix":"$weeksago","description":"Replaces with a number of how many weeks it\'s ago."},{"type":"replacement","prefix":"$month","description":"Replaces the month."},{"type":"replacement","prefix":"$monthname","description":"Replaces the shorted monthname."},{"type":"replacement","prefix":"$monthsago","description":"Replaces with a number of how many months it\'s ago."},{"type":"replacement","prefix":"$year","description":"Replaces the year."},{"type":"replacement","prefix":"$yearsago","description":"Replaces with a number of how many years it\'s ago."},{"type":"replacement","prefix":"$hour","description":"Replaces the hour(s)"},{"type":"replacement","prefix":"$minute","description":"Replaces the minute(s)"},{"type":"replacement","prefix":"$second","description":"Replaces the second(s)"}]}]},{"name":"Created At","icon":"Cake","items":[{"type":"switch","name":"Show in UserPopout","id":"created_show_up","note":"Defines if the creation date should be shown in the UserPopout.","value":true},{"type":"switch","name":"Show in UserProfile","id":"created_show_profile","note":"Defines if the creation date should be shown in the UserProfile.","value":true},{"type":"text","name":"Created At","note":"Format of the Created at date. Read the variables section in the general settings to understand how it works.","id":"created_format","value":"Created At: $hour:$minute:$second, $day.$month.$year $daysago days"}]},{"name":"Joined At","icon":"Calendar","items":[{"type":"switch","name":"Show in UserPopout","id":"joined_show_up","note":"Defines if the joined date should be shown in the UserPopout.","value":true},{"type":"switch","name":"Show in UserProfile","id":"joined_show_profile","note":"Defines if the joined date should be shown in the UserProfile.","value":true},{"type":"text","name":"Joined At","note":"Format of the joined at date. Read the variables section in the general settings to understand how it works.","id":"joined_format","value":"Joined At: $hour:$minute:$second, $day.$month.$year $daysago days"}]},{"name":"Last Message At","icon":"TextBubble","items":[{"type":"switch","name":"Show in UserPopout","id":"lastmessage_show_up","note":"Defines if the last message date should be shown in the UserPopout.","value":true},{"type":"switch","name":"Show in UserProfile","id":"lastmessage_show_profile","note":"Defines if the last message date should be shown in the UserProfile.","value":true},{"type":"text","name":"Last Message","note":"Format of the LastMessage at date. Read the variables section in the general settings to understand how it works.","id":"lastmessage_format","value":"Last Message At: $hour:$minute:$second, $day.$month.$year $daysago days"}]},{"name":"Connections","icon":"Chain","items":[{"type":"switch","name":"Show Empty","note":"Show a \\"NO CONNECTIONS\\" placeholder if the user has no connections.","id":"showEmptyConnections","value":true},{"type":"switch","name":"Show Verified","note":"Shows a little verified badge below the icon if the connection is verified.","id":"showVerifiedConnections","value":true},{"type":"icons"}]},{"name":"Activity Icons","icon":"GamePad","items":[{"type":"switch","name":"Enable Activity Icons","note":null,"id":"activityIcons","value":true},{"type":"radio","name":"Activity Icon State","note":"Replaces the activity icon in the activity text of the member list.","id":"activityIconState","value":0,"disabled":false,"options":[{"name":"Replace with associated icon","value":0},{"name":"Don\'t do anything","value":1},{"name":"Hide it","value":2}]},{"type":"switch","name":"Show Gamepad","note":"This shows a gamepad icon if an icon for the activity isn\'t available.","id":"showGamepad","value":true}]}]');
				var settings = __webpack_require__(128);
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
							info: null
						});
					}
					componentDidCatch(error, info) {
						this.setState({
							error,
							info,
							hasError: true
						});
						Logger.error(`[ErrorBoundary:${this.props.id}] HI OVER HERE!! SHOW THIS SCREENSHOT TO THE DEVELOPER.\n`, error);
					}
					render() {
						if (this.state.hasError) return this.props.mini ? external_BdApi_React_default().createElement(error, {
							style: {
								color: "#f04747"
							}
						}) : external_BdApi_React_default().createElement("div", null, external_BdApi_React_default().createElement("span", null, "An error has occured while rendering ", this.props.id, "."), external_BdApi_React_default().createElement("span", null, "Open console (", external_BdApi_React_default().createElement("code", null, "Ctrl + shift + i / Cmd + shift + i"), ') - Select the "Console" tab and screenshot the big red error.'));
						else return this.props.children;
					}
				}
				const forms_namespaceObject = Modules["@discord/forms"];
				function chain_extends() {
					chain_extends = Object.assign || function(target) {
						for (var i = 1; i < arguments.length; i++) {
							var source = arguments[i];
							for (var key in source)
								if (Object.prototype.hasOwnProperty.call(source, key)) target[key] = source[key];
						}
						return target;
					};
					return chain_extends.apply(this, arguments);
				}
				const chain = props => external_BdApi_React_default().createElement("svg", chain_extends({
					viewBox: "0 0 512 512",
					width: "24",
					height: "24"
				}, props), external_BdApi_React_default().createElement("path", {
					d: "M326.612 185.391c59.747 59.809 58.927 155.698.36 214.59-.11.12-.24.25-.36.37l-67.2 67.2c-59.27 59.27-155.699 59.262-214.96 0-59.27-59.26-59.27-155.7 0-214.96l37.106-37.106c9.84-9.84 26.786-3.3 27.294 10.606.648 17.722 3.826 35.527 9.69 52.721 1.986 5.822.567 12.262-3.783 16.612l-13.087 13.087c-28.026 28.026-28.905 73.66-1.155 101.96 28.024 28.579 74.086 28.749 102.325.51l67.2-67.19c28.191-28.191 28.073-73.757 0-101.83-3.701-3.694-7.429-6.564-10.341-8.569a16.037 16.037 0 0 1-6.947-12.606c-.396-10.567 3.348-21.456 11.698-29.806l21.054-21.055c5.521-5.521 14.182-6.199 20.584-1.731a152.482 152.482 0 0 1 20.522 17.197zM467.547 44.449c-59.261-59.262-155.69-59.27-214.96 0l-67.2 67.2c-.12.12-.25.25-.36.37-58.566 58.892-59.387 154.781.36 214.59a152.454 152.454 0 0 0 20.521 17.196c6.402 4.468 15.064 3.789 20.584-1.731l21.054-21.055c8.35-8.35 12.094-19.239 11.698-29.806a16.037 16.037 0 0 0-6.947-12.606c-2.912-2.005-6.64-4.875-10.341-8.569-28.073-28.073-28.191-73.639 0-101.83l67.2-67.19c28.239-28.239 74.3-28.069 102.325.51 27.75 28.3 26.872 73.934-1.155 101.96l-13.087 13.087c-4.35 4.35-5.769 10.79-3.783 16.612 5.864 17.194 9.042 34.999 9.69 52.721.509 13.906 17.454 20.446 27.294 10.606l37.106-37.106c59.271-59.259 59.271-155.699.001-214.959z"
				}));
				function wrench_extends() {
					wrench_extends = Object.assign || function(target) {
						for (var i = 1; i < arguments.length; i++) {
							var source = arguments[i];
							for (var key in source)
								if (Object.prototype.hasOwnProperty.call(source, key)) target[key] = source[key];
						}
						return target;
					};
					return wrench_extends.apply(this, arguments);
				}
				const wrench = props => external_BdApi_React_default().createElement("svg", wrench_extends({}, props, {
					viewBox: "0 0 512 512",
					height: "24",
					width: "24"
				}), external_BdApi_React_default().createElement("path", {
					d: "M501.1 395.7L384 278.6c-23.1-23.1-57.6-27.6-85.4-13.9L192 158.1V96L64 0 0 64l96 128h62.1l106.6 106.6c-13.6 27.8-9.2 62.3 13.9 85.4l117.1 117.1c14.6 14.6 38.2 14.6 52.7 0l52.7-52.7c14.5-14.6 14.5-38.2 0-52.7zM331.7 225c28.3 0 54.9 11 74.9 31l19.4 19.4c15.8-6.9 30.8-16.5 43.8-29.5 37.1-37.1 49.7-89.3 37.9-136.7-2.2-9-13.5-12.1-20.1-5.5l-74.4 74.4-67.9-11.3L334 98.9l74.4-74.4c6.6-6.6 3.4-17.9-5.7-20.2-47.4-11.7-99.6.9-136.6 37.9-28.5 28.5-41.9 66.1-41.2 103.6l82.1 82.1c8.1-1.9 16.5-2.9 24.7-2.9zm-103.9 82l-56.7-56.7L18.7 402.8c-25 25-25 65.5 0 90.5s65.5 25 90.5 0l123.6-123.6c-7.6-19.9-9.9-41.6-5-62.7zM64 472c-13.2 0-24-10.8-24-24 0-13.3 10.7-24 24-24s24 10.7 24 24c0 13.2-10.7 24-24 24z"
				}));
				var React = __webpack_require__(832);
				function spotify_extends() {
					spotify_extends = Object.assign || function(target) {
						for (var i = 1; i < arguments.length; i++) {
							var source = arguments[i];
							for (var key in source)
								if (Object.prototype.hasOwnProperty.call(source, key)) target[key] = source[key];
						}
						return target;
					};
					return spotify_extends.apply(this, arguments);
				}
				const spotify = props => React.createElement("svg", spotify_extends({}, props, {
					width: "20",
					height: "20",
					viewBox: "0 0 65 65"
				}), React.createElement("path", {
					fill: "#1ED760",
					d: "M32.5,0.5 C14.826888,0.5 0.5,14.826888 0.5,32.5 C0.5,50.173112 14.826888,64.5 32.5,64.5 C50.173112,64.5 64.5,50.173112 64.5,32.5 C64.5,14.826888 50.173112,0.5 32.5,0.5 Z M47.18,46.66 C46.6031412,47.595466 45.3795381,47.8902025 44.44,47.32 C36.93,42.73 27.44,41.69 16.33,44.23 C15.6145818,44.4464575 14.8381683,44.245926 14.3170501,43.7100969 C13.7959319,43.1742677 13.6170868,42.3925738 13.8533716,41.6834571 C14.0896564,40.9743403 14.7016337,40.4561564 15.44,40.34 C27.63,37.55 38.09,38.75 46.52,43.91 C47.4615306,44.487221 47.7569974,45.7183323 47.18,46.66 Z M51.1,37.95 C50.3770773,39.1205793 48.8441907,39.487042 47.67,38.77 C39.07,33.48 25.96,31.95 15.78,35.04 C14.9279216,35.2990176 14.0023844,35.0837812 13.3520294,34.4753684 C12.7016744,33.8669556 12.425306,32.9577988 12.6270294,32.0903684 C12.8287528,31.2229381 13.4779216,30.5290176 14.33,30.27 C25.95,26.74 40.4,28.45 50.28,34.52 C51.445766,35.2424019 51.8079122,36.7714637 51.09,37.94 L51.1,37.95 Z M51.44,28.88 C41.13,22.75 24.11,22.19 14.26,25.18 C13.2140022,25.5702637 12.0378133,25.3474036 11.207084,24.6015444 C10.3763547,23.8556852 10.0285164,22.7102178 10.3042349,21.6283692 C10.5799535,20.5465206 11.4336155,19.707266 12.52,19.45 C23.82,16.02 42.61,16.68 54.52,23.73 C55.8401426,24.6185116 56.2368626,26.3831995 55.4240137,27.7512295 C54.6111649,29.1192595 52.8715856,29.6146124 51.46,28.88 L51.44,28.88 Z"
				}));
				var twitch_React = __webpack_require__(832);
				function twitch_extends() {
					twitch_extends = Object.assign || function(target) {
						for (var i = 1; i < arguments.length; i++) {
							var source = arguments[i];
							for (var key in source)
								if (Object.prototype.hasOwnProperty.call(source, key)) target[key] = source[key];
						}
						return target;
					};
					return twitch_extends.apply(this, arguments);
				}
				const twitch = props => twitch_React.createElement("svg", twitch_extends({
					width: "20",
					height: "20",
					viewBox: "0 0 128 128"
				}, props), twitch_React.createElement("defs", null, twitch_React.createElement("path", {
					id: "color-a",
					d: "M8.5542826,0 L0,22 L0,111.8 L30.7954173,111.8 L30.7954173,128 L48.1052598,128 L64.408716,111.8 L89.3670935,111.8 L122.980392,78.4 L122.980392,0 L8.5542826,0 Z M111.406951,72.6 L92.0843362,91.8 L61.2889188,91.8 L44.9854626,108 L44.9854626,91.8 L19.020699,91.8 L19.020699,11.4 L111.406951,11.4 L111.406951,72.6 Z M92.2856134,33.4 L92.2856134,66.8 L80.8128109,66.8 L80.8128109,33.4 L92.2856134,33.4 Z M61.4901961,33.4 L61.4901961,66.8 L50.0173935,66.8 L50.0173935,33.4 L61.4901961,33.4 Z"
				})), twitch_React.createElement("g", {
					fill: "none",
					"fill-rule": "evenodd",
					transform: "translate(3)"
				}, twitch_React.createElement("polygon", {
					fill: "#FFF",
					"fill-rule": "nonzero",
					points: "110.431 72.512 91.272 91.717 60.736 91.717 44.57 107.922 44.57 91.717 18.824 91.717 18.824 11.294 110.431 11.294"
				}), twitch_React.createElement("mask", {
					id: "color-b",
					fill: "#fff"
				}, twitch_React.createElement("use", {
					xlinkHref: "#color-a"
				})), twitch_React.createElement("use", {
					fill: "#563194",
					"fill-rule": "nonzero",
					xlinkHref: "#color-a"
				})));
				var valorant_React = __webpack_require__(832);
				function valorant_extends() {
					valorant_extends = Object.assign || function(target) {
						for (var i = 1; i < arguments.length; i++) {
							var source = arguments[i];
							for (var key in source)
								if (Object.prototype.hasOwnProperty.call(source, key)) target[key] = source[key];
						}
						return target;
					};
					return valorant_extends.apply(this, arguments);
				}
				const valorant = props => valorant_React.createElement("svg", valorant_extends({
					width: "20",
					height: "20",
					viewBox: "0 0 216.000000 216.000000"
				}, props), valorant_React.createElement("g", {
					transform: "translate(0.000000,216.000000) scale(0.100000,-0.100000)",
					fill: "#000000",
					stroke: "none"
				}, valorant_React.createElement("path", {
					d: "M0 1080 l0 -1080 1080 0 1080 0 0 1080 0 1080 -1080 0 -1080 0 0-1080z"
				})));
				var youtube_React = __webpack_require__(832);
				function youtube_extends() {
					youtube_extends = Object.assign || function(target) {
						for (var i = 1; i < arguments.length; i++) {
							var source = arguments[i];
							for (var key in source)
								if (Object.prototype.hasOwnProperty.call(source, key)) target[key] = source[key];
						}
						return target;
					};
					return youtube_extends.apply(this, arguments);
				}
				const youtube = props => youtube_React.createElement("svg", youtube_extends({
					height: "20",
					width: "20",
					viewBox: "0 0 576 512"
				}, props), youtube_React.createElement("path", {
					fill: "#FF1A1A",
					d: "M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z"
				}));
				var gamepad_React = __webpack_require__(832);
				function gamepad_extends() {
					gamepad_extends = Object.assign || function(target) {
						for (var i = 1; i < arguments.length; i++) {
							var source = arguments[i];
							for (var key in source)
								if (Object.prototype.hasOwnProperty.call(source, key)) target[key] = source[key];
						}
						return target;
					};
					return gamepad_extends.apply(this, arguments);
				}
				const gamepad = props => gamepad_React.createElement("svg", gamepad_extends({
					width: "20",
					height: "20",
					viewBox: "0 0 24 24"
				}, props), gamepad_React.createElement("g", {
					fill: "none",
					"fill-rule": "evenodd"
				}, gamepad_React.createElement("path", {
					fill: "currentColor",
					d: "M5.79335761,5 L18.2066424,5 C19.7805584,5 21.0868816,6.21634264 21.1990185,7.78625885 L21.8575059,17.0050826 C21.9307825,18.0309548 21.1585512,18.9219909 20.132679,18.9952675 C20.088523,18.9984215 20.0442685,19 20,19 C18.8245863,19 17.8000084,18.2000338 17.5149287,17.059715 L17,15 L7,15 L6.48507125,17.059715 C6.19999155,18.2000338 5.1754137,19 4,19 C2.97151413,19 2.13776159,18.1662475 2.13776159,17.1377616 C2.13776159,17.0934931 2.1393401,17.0492386 2.1424941,17.0050826 L2.80098151,7.78625885 C2.91311838,6.21634264 4.21944161,5 5.79335761,5 Z M14.5,10 C15.3284271,10 16,9.32842712 16,8.5 C16,7.67157288 15.3284271,7 14.5,7 C13.6715729,7 13,7.67157288 13,8.5 C13,9.32842712 13.6715729,10 14.5,10 Z M18.5,13 C19.3284271,13 20,12.3284271 20,11.5 C20,10.6715729 19.3284271,10 18.5,10 C17.6715729,10 17,10.6715729 17,11.5 C17,12.3284271 17.6715729,13 18.5,13 Z M6,9 L4,9 L4,11 L6,11 L6,13 L8,13 L8,11 L10,11 L10,9 L8,9 L8,7 L6,7 L6,9 Z"
				}), gamepad_React.createElement("rect", {
					width: "24",
					height: "24"
				})));
				var googleChrome_React = __webpack_require__(832);
				function googleChrome_extends() {
					googleChrome_extends = Object.assign || function(target) {
						for (var i = 1; i < arguments.length; i++) {
							var source = arguments[i];
							for (var key in source)
								if (Object.prototype.hasOwnProperty.call(source, key)) target[key] = source[key];
						}
						return target;
					};
					return googleChrome_extends.apply(this, arguments);
				}
				const googleChrome = props => googleChrome_React.createElement("svg", googleChrome_extends({
					width: "20",
					height: "20",
					viewBox: "0 0 48 48"
				}, props), googleChrome_React.createElement("path", {
					fill: "#4caf50",
					d: "M44,24c0,11.044-8.956,20-20,20S4,35.044,4,24S12.956,4,24,4S44,12.956,44,24z"
				}), googleChrome_React.createElement("path", {
					fill: "#ffc107",
					d: "M24,4v20l8,4l-8.843,16c0.317,0,0.526,0,0.843,0c11.053,0,20-8.947,20-20S35.053,4,24,4z"
				}), googleChrome_React.createElement("path", {
					fill: "#4caf50",
					d: "M44,24c0,11.044-8.956,20-20,20S4,35.044,4,24S12.956,4,24,4S44,12.956,44,24z"
				}), googleChrome_React.createElement("path", {
					fill: "#ffc107",
					d: "M24,4v20l8,4l-8.843,16c0.317,0,0.526,0,0.843,0c11.053,0,20-8.947,20-20S35.053,4,24,4z"
				}), googleChrome_React.createElement("path", {
					fill: "#f44336",
					d: "M41.84,15H24v13l-3-1L7.16,13.26H7.14C10.68,7.69,16.91,4,24,4C31.8,4,38.55,8.48,41.84,15z"
				}), googleChrome_React.createElement("path", {
					fill: "#dd2c00",
					d: "M7.158,13.264l8.843,14.862L21,27L7.158,13.264z"
				}), googleChrome_React.createElement("path", {
					fill: "#558b2f",
					d: "M23.157,44l8.934-16.059L28,25L23.157,44z"
				}), googleChrome_React.createElement("path", {
					fill: "#f9a825",
					d: "M41.865,15H24l-1.579,4.58L41.865,15z"
				}), googleChrome_React.createElement("path", {
					fill: "#fff",
					d: "M33,24c0,4.969-4.031,9-9,9s-9-4.031-9-9s4.031-9,9-9S33,19.031,33,24z"
				}), googleChrome_React.createElement("path", {
					fill: "#2196f3",
					d: "M31,24c0,3.867-3.133,7-7,7s-7-3.133-7-7s3.133-7,7-7S31,20.133,31,24z"
				}));
				var headphones_React = __webpack_require__(832);
				function headphones_extends() {
					headphones_extends = Object.assign || function(target) {
						for (var i = 1; i < arguments.length; i++) {
							var source = arguments[i];
							for (var key in source)
								if (Object.prototype.hasOwnProperty.call(source, key)) target[key] = source[key];
						}
						return target;
					};
					return headphones_extends.apply(this, arguments);
				}
				const headphones = props => headphones_React.createElement("svg", headphones_extends({
					width: "20",
					height: "20",
					viewBox: "0 0 24 24"
				}, props), headphones_React.createElement("svg", {
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				}, headphones_React.createElement("path", {
					d: "M12 2.00305C6.486 2.00305 2 6.48805 2 12.0031V20.0031C2 21.1071 2.895 22.0031 4 22.0031H6C7.104 22.0031 8 21.1071 8 20.0031V17.0031C8 15.8991 7.104 15.0031 6 15.0031H4V12.0031C4 7.59105 7.589 4.00305 12 4.00305C16.411 4.00305 20 7.59105 20 12.0031V15.0031H18C16.896 15.0031 16 15.8991 16 17.0031V20.0031C16 21.1071 16.896 22.0031 18 22.0031H20C21.104 22.0031 22 21.1071 22 20.0031V12.0031C22 6.48805 17.514 2.00305 12 2.00305Z",
					fill: "currentColor"
				})));
				var icons_React = __webpack_require__(832);
				const Icons = {
					Cake: cake,
					Calendar: calendar,
					Error: error,
					TextBubble: textbubble,
					Chain: chain,
					Wrench: wrench,
					Flowerstar: icons_flowerstar,
					Spotify: spotify,
					Twitch: twitch,
					Valorant: valorant,
					YouTube: youtube,
					GamePad: gamepad,
					GoogleChrome: googleChrome,
					Headphones: headphones
				};
				function noop() {
					return null;
				}
				function Icon({
					name,
					...props
				}) {
					const IconComponent = Icons[name] ?? noop;
					return icons_React.createElement(IconComponent, props);
				}
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
				const RadioGroup = Utilities.createUpdateWrapper(external_PluginApi_namespaceObject.WebpackModules.getByDisplayName("RadioGroup"));
				const SwitchItem = Utilities.createUpdateWrapper(external_PluginApi_namespaceObject.WebpackModules.getByDisplayName("SwitchItem"), false);
				const TextInput = Utilities.createUpdateWrapper(external_PluginApi_namespaceObject.WebpackModules.getByDisplayName("TextInput"));
				const breadCrumbs = external_PluginApi_namespaceObject.WebpackModules.getByProps("breadcrumbActive");
				const {
					marginBottom8: settings_marginBottom8
				} = external_PluginApi_namespaceObject.WebpackModules.getByProps("marginBottom8");
				const Breadcrumbs = external_PluginApi_namespaceObject.WebpackModules.getByDisplayName("Breadcrumbs");
				const settings_Flex = external_PluginApi_namespaceObject.WebpackModules.getByDisplayName("Flex");
				const {
					default: CardItem
				} = external_PluginApi_namespaceObject.WebpackModules.find((m => m?.default?.toString().indexOf("hasNextSection") > -1)) ?? {
					default: () => null
				};
				const Card = external_PluginApi_namespaceObject.WebpackModules.getByDisplayName("Card");
				const Caret = external_PluginApi_namespaceObject.WebpackModules.getByDisplayName("Caret");
				const Clickable = external_PluginApi_namespaceObject.WebpackModules.getByDisplayName("Clickable");
				const TextItem = ({
					value,
					onChange,
					name,
					note
				}) => external_BdApi_React_default().createElement(settings_Flex, {
					className: settings_marginBottom8,
					direction: settings_Flex.Direction.VERTICAL
				}, external_BdApi_React_default().createElement(forms_namespaceObject.FormItem, {
					title: name,
					className: settings.Z.formItem
				}, external_BdApi_React_default().createElement(TextInput, {
					value,
					onChange
				}), external_BdApi_React_default().createElement(forms_namespaceObject.FormText, {
					type: "description",
					disabled: false
				}, note)), external_BdApi_React_default().createElement(forms_namespaceObject.FormDivider, null));
				const IconSetting = () => {
					const forceUpdate = Utilities.useForceUpdate();
					const shownIcons = Settings.get("shownConnections", Object.fromEntries(connections_default().map((e => [e.type, true]))));
					return external_BdApi_React_default().createElement(settings_Flex, {
						className: settings.Z.icons
					}, connections_default().filter((e => e.enabled)).map((k => external_BdApi_React_default().createElement(components_namespaceObject.TooltipContainer, {
						className: settings.Z.settingsBadgeContainer,
						text: shownIcons[k.type] ? "Enabled" : "Disabled",
						hideOnClick: false
					}, external_BdApi_React_default().createElement("img", {
						src: k.icon.color,
						className: Utilities.joinClassNames(settings.Z.settingsBadgeIcon, shownIcons[k.type] ? "enabled" : settings.Z.disabled),
						onClick: () => {
							Settings.set("shownConnections", (shownIcons[k.type] = !shownIcons[k.type], shownIcons));
							forceUpdate();
						}
					})))));
				};
				const Category = props => {
					const [opened, setOpened] = (0, external_BdApi_React_.useState)(false);
					return external_BdApi_React_default().createElement(Card, {
						className: Utilities.joinClassNames(settings.Z.category, opened && settings.Z.opened)
					}, external_BdApi_React_default().createElement(Clickable, {
						onClick: () => setOpened(!opened)
					}, external_BdApi_React_default().createElement(settings_Flex, {
						className: settings.Z.categoryHeader,
						direction: settings_Flex.Direction.HORIZONTAL
					}, props.name, external_BdApi_React_default().createElement(Caret, {
						className: settings.Z.categoryCaret,
						direction: Caret.Directions[opened ? "DOWN" : "LEFT"]
					}))), external_BdApi_React_default().createElement("div", {
						className: settings.Z.categoryContent
					}, opened && props.items.map(renderSetting)));
				};
				const renderSetting = setting => {
					switch (setting.type) {
						case "switch":
							return external_BdApi_React_default().createElement(SwitchItem, settings_extends({}, setting, {
								value: Settings.get(setting.id, setting.value),
								onChange: value => {
									Settings.set(setting.id, value);
								}
							}), setting.name);
						case "replacement":
							return external_BdApi_React_default().createElement(settings_Flex, {
								direction: settings_Flex.Direction.HORIZONTAL,
								className: settings.Z.replacementVariable
							}, external_BdApi_React_default().createElement("b", null, setting.prefix), external_BdApi_React_default().createElement("span", null, setting.description));
						case "radio":
							const {
								name, note
							} = setting;
							delete setting.name;
							delete setting.note;
							return external_BdApi_React_default().createElement(forms_namespaceObject.FormItem, {
								title: name
							}, note && external_BdApi_React_default().createElement(forms_namespaceObject.FormText, {
								type: "description"
							}, note), external_BdApi_React_default().createElement(RadioGroup, settings_extends({}, setting, {
								value: Settings.get(setting.id, setting.value),
								onChange: value => {
									Settings.set(setting.id, value);
								}
							})));
						case "text":
							return external_BdApi_React_default().createElement(TextItem, settings_extends({}, setting, {
								value: Settings.get(setting.id, setting.value),
								onChange: value => {
									Settings.set(setting.id, value);
								}
							}));
						case "icons":
							return external_BdApi_React_default().createElement(IconSetting, null);
						case "category":
							return external_BdApi_React_default().createElement(Category, setting);
						case "divider":
							return external_BdApi_React_default().createElement(forms_namespaceObject.FormDivider, null);
					}
				};
				const renderCustomcrumb = ({
					label
				}, isActive) => external_BdApi_React_default().createElement(forms_namespaceObject.FormTitle, {
					tag: forms_namespaceObject.FormTitle.Tags.H2,
					className: Utilities.joinClassNames(breadCrumbs.breadcrumb, isActive ? breadCrumbs.breadcrumbActive : breadCrumbs.breadcrumbInactive)
				}, label);
				const mainPages = [{
					id: "main",
					label: "General Settings"
				}];
				function SettingsPanel() {
					const [activeItem, setActiveItem] = (0, external_BdApi_React_.useState)("main");
					return external_BdApi_React_default().createElement(ErrorBoundary, {
						id: "SettingsPanel"
					}, external_BdApi_React_default().createElement("div", {
						className: settings.Z.settingsPanel
					}, external_BdApi_React_default().createElement(settings_Flex, {
						align: settings_Flex.Align.CENTER,
						basis: "auto",
						className: breadCrumbs.breadcrumbs,
						grow: 1,
						shrink: 1
					}, "main" === activeItem ? external_BdApi_React_default().createElement(forms_namespaceObject.FormTitle, {
						className: breadCrumbs.breakcrumb,
						tag: forms_namespaceObject.FormTitle.Tags.H2
					}, "General") : external_BdApi_React_default().createElement(Breadcrumbs, {
						activeId: activeItem,
						breadcrumbs: mainPages.concat({
							id: activeItem,
							label: pages_namespaceObject[activeItem].name
						}),
						renderCustomBreadcrumb: renderCustomcrumb,
						onBreadcrumbClick: e => setActiveItem(e.id)
					})), "main" === activeItem ? pages_namespaceObject.map(((page, index) => external_BdApi_React_default().createElement(CardItem, {
						buttonDisabled: false,
						buttonText: "Configure",
						details: [{
							text: `${page.items.length} setting${page.items.length > 1 ? "s" : ""}.`
						}],
						hasNextSection: true,
						icon: () => external_BdApi_React_default().createElement(Icon, {
							className: settings.Z.pageIcon,
							name: page.icon
						}),
						name: page.name,
						onButtonClick: () => setActiveItem(index)
					}))) : pages_namespaceObject[activeItem].items.map(renderSetting)));
				}
				const external_BasePlugin_namespaceObject = BasePlugin;
				var external_BasePlugin_default = __webpack_require__.n(external_BasePlugin_namespaceObject);
				var components_activity = __webpack_require__(755);
				var activity_React = __webpack_require__(832);
				const byName = [
					[/spotify/i, spotify],
					[/youtube/i, () => activity_React.createElement("img", {
						src: connections_default().get("youtube").icon.color,
						width: "20",
						height: "20"
					})],
					[/twitch/i, twitch],
					[/google\schrome/i, googleChrome]
				];
				function ActivityIcon({
					activity
				}) {
					const {
						game,
						showGamepad
					} = (0, flux_namespaceObject.useStateFromStores)([stores_namespaceObject.Games, Settings], (() => ({
						showGamepad: Settings.get("showGamepad", true),
						game: stores_namespaceObject.Games.getGame(activity.application_id)
					})), null, _.isEqual);
					const icon = (0, external_BdApi_React_.useMemo)((() => byName.find((([regex]) => regex.test(activity.name || activity.id)))), [game]);
					if (icon) {
						const Icon = icon[1];
						return activity_React.createElement(Icon, null);
					}
					if (game && game.getIconURL()) return activity_React.createElement("img", {
						src: game.getIconURL(),
						width: "20",
						height: "20"
					});
					return showGamepad ? activity_React.createElement(gamepad, null) : null;
				}
				function noopNull() {
					return null;
				}
				function ActivitiesFilter(activity, index, target) {
					if (4 === activity?.type) return false;
					return target.indexOf(activity) === index;
				}
				function Activity({
					user
				}) {
					const {
						activity,
						showActivityIcons
					} = (0, flux_namespaceObject.useStateFromStores)([stores_namespaceObject.Activities, Settings], (() => ({
						activity: stores_namespaceObject.Activities.getActivities(user.id).filter(ActivitiesFilter)[0],
						showActivityIcons: Settings.get("activityIcons", true)
					})), null, _.isEqual);
					if (!showActivityIcons || !activity) return null;
					return activity_React.createElement(components_namespaceObject.TooltipContainer, {
						text: activity.name,
						className: components_activity.Z.container,
						position: "left"
					}, activity_React.createElement(ActivityIcon, {
						className: components_activity.Z.icon,
						activity
					}));
				}
				const DiscordCommands = BdApi.findModuleByProps("BUILT_IN_COMMANDS");
				const DiscordCommandTypes = BdApi.findModuleByProps("ApplicationCommandType");
				const Types = DiscordCommandTypes.ApplicationCommandType;
				const OptionTypes = DiscordCommandTypes.ApplicationCommandOptionType;
				const PermissionTypes = DiscordCommandTypes.ApplicationCommandPermissionType;
				if (!DiscordCommands.BUILT_IN_SECTIONS.some((e => "betterdiscord" === e.id))) DiscordCommands.BUILT_IN_SECTIONS.push({
					icon: "https://github.com/BetterDiscord.png",
					id: "betterdiscord",
					name: "BetterDiscord",
					type: 0
				});
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
				const nl_namespaceObject = JSON.parse('{"CONNECTIONS":"Verbindingen","NO_CONNECTIONS":"Geen verbindingen!","LOADING_CONNECTIONS":"Verbindingen aan het laden...","LOADING_LAST_MESSAGE":"Laatste bericht aan het laden...","LOADING_JOINED_AT":"Lid geworden op aan het laden...","MEMBER_WAS_NOT_FOUND":"Lid kon niet worden gevonden!","FAILED_TO_FETCH":"Gefaald om op te halen!","USERINFO_CMD_DESC":"Laat bepaalde informatie zien over een bepaald lid."}');
				var translations_nl_namespaceObject = __webpack_require__.t(nl_namespaceObject, 2);
				const de_namespaceObject = JSON.parse('{"CONNECTIONS":"Verknüpfungen","NO_CONNECTIONS":"Keine Verknüpfungen","LOADING_CONNECTIONS":"Lade Verknüpfungen...","LOADING_LAST_MESSAGE":"Lade letzte Nachricht...","LOADING_JOINED_AT":"Lade Beitrittsdatum...","MEMBER_WAS_NOT_FOUND":"Mitglied konnte nicht gefunden werden.","FAILED_TO_FETCH":"Fehler beim Laden","USERINFO_CMD_DESC":"Zeigt einige Informationen über einen bestimmten Nutzer."}');
				var translations_de_namespaceObject = __webpack_require__.t(de_namespaceObject, 2);
				const en_US_namespaceObject = JSON.parse('{"CONNECTIONS":"Connections","NO_CONNECTIONS":"No Connections","LOADING_CONNECTIONS":"Loading Connections...","LOADING_LAST_MESSAGE":"Loading Last Message","LOADING_JOINED_AT":"Loading Joined At","MEMBER_WAS_NOT_FOUND":"Member Was Not Found!","FAILED_TO_FETCH":"Failed To Fetch","USERINFO_CMD_DESC":"User Information"}');
				var translations_en_US_namespaceObject = __webpack_require__.t(en_US_namespaceObject, 2);
				const tr_namespaceObject = JSON.parse('{"CONNECTIONS":"Bağlantılar","NO_CONNECTIONS":"Bağlantı yok!","LOADING_CONNECTIONS":"Bağlantılar yükleniyor..","LOADING_LAST_MESSAGE":"Son mesaj yükleniyor..","LOADING_JOINED_AT":"Giriş tarihi yükleniyor..","MEMBER_WAS_NOT_FOUND":"Kullanıcı bulunamadı!","FAILED_TO_FETCH":"Alınamadı!","USERINFO_CMD_DESC":"Belirli bir kullanıcı hakkında bazı bilgiler verir."}');
				var translations_tr_namespaceObject = __webpack_require__.t(tr_namespaceObject, 2);
				const translations = {
					nl: translations_nl_namespaceObject,
					de: translations_de_namespaceObject,
					"en-US": translations_en_US_namespaceObject,
					tr: translations_tr_namespaceObject
				};
				const loadedStrings = {};
				stores_namespaceObject.SettingsStore.addChangeListener(injectStrings);
				function injectStrings() {
					Object.assign(i18n_default()._provider._context.messages, loadedStrings[i18n_default().getLocale()] ?? {});
					if (loadedStrings["en-US"]) Object.assign(i18n_default()._provider._context.defaultMessages, loadedStrings["en-US"]);
				}
				function addStrings(locale, strings) {
					if (!loadedStrings[locale]) loadedStrings[locale] = {};
					Object.assign(loadedStrings[locale], strings);
					injectStrings();
				}
				function removeStrings(locale, strings) {
					if (!loadedStrings[locale]) return;
					for (let str in strings) delete loadedStrings[locale][str];
					injectStrings();
				}
				function addStringsObject(strings) {
					for (let locale in strings) addStrings(locale, strings[locale]);
				}
				function removeStringsObject(strings) {
					for (let locale in strings) removeStrings(locale, strings[locale]);
				}
				const LocaleManager = {
					addStringsObject,
					addStrings,
					removeStringsObject,
					removeStrings
				};
				const strings = LocaleManager;
				function SuppressErrors(func, onError = (() => {})) {
					const wrapped = function() {
						try {
							return func.apply(this, arguments);
						} catch (error) {
							onError(error);
						}
					};
					Object.assign(wrapped, func);
					wrapped.toString = () => func.toString();
					return wrapped;
				}
				function UserDetails_defineProperty(obj, key, value) {
					if (key in obj) Object.defineProperty(obj, key, {
						value,
						enumerable: true,
						configurable: true,
						writable: true
					});
					else obj[key] = value;
					return obj;
				}
				const getClass = (props = [], items = props, exclude = [], selector = false) => {
					const module = external_PluginApi_namespaceObject.WebpackModules.find((m => m && props.every((prop => void 0 !== m[prop])) && exclude.every((e => void 0 == m[e]))));
					if (!module) return "";
					return (selector ? "." : "") + items.map((item => module[item])).join(selector ? "." : " ");
				};
				class Plugin extends(external_BasePlugin_default()) {
					constructor(...args) {
						super(...args);
						UserDetails_defineProperty(this, "promises", {
							cancelled: false,
							cancel() {
								this.cancelled = true;
							}
						});
					}
					getSettingsPanel() {
						return external_BdApi_React_default().createElement(SettingsPanel, null);
					}
					onStart() {
						external_StyleLoader_default().inject();
						strings.addStringsObject(translations);
						this.createdApi = new CreatedAt(this);
						this.joinedApi = new joinedDate_JoinedAt(this);
						this.lastMessageApi = new LastMessageApi(this);
						this.connectionsApi = new Userconnections(this);
						this.patchUserPopout();
						this.patchUserProfile();
						this.patchMemberListItem();
						this.patchUserActivityStatus();
						commands.registerCommand(this.getName(), {
							id: "user-info",
							name: "userinfo",
							get description() {
								return i18n_namespaceObject.Messages.USERINFO_CMD_DESC;
							},
							predicate: () => true,
							execute: (props, {
								channel,
								guild
							}) => {
								const users = props.user.map((e => stores_namespaceObject.Users.getUser(e.userId))).filter((e => e));
								if (!users.length) return clyde.sendMessage(channel.id, {
									content: "Sorry, but i can't resolve that user."
								});
								clyde.sendMessage(channel.id, {
									content: "That's what i've found so far:",
									embeds: users.map((user => this.createEmbedForUser(user, guild, channel)))
								});
							},
							options: [{
								name: "user",
								type: 6,
								description: "The user"
							}],
							type: 3
						});
					}
					createEmbedForUser(user, guild) {
						const member = stores_namespaceObject.Members.getMember(guild.id, user.id);
						const largeUrl = user.getAvatarURL().split("?size")[0] + "?size=2048";
						const activities = stores_namespaceObject.Activities.getActivities(user.id);
						return {
							color: member?.colorString ? external_PluginApi_namespaceObject.ColorConverter.hex2int(member.colorString) : void 0,
							author: {
								name: user.tag,
								icon_url: user.getAvatarURL(),
								proxy_icon_url: user.getAvatarURL()
							},
							thumbnail: {
								height: 128,
								proxy_url: largeUrl,
								url: largeUrl,
								width: 128
							},
							footer: {
								text: "ID: " + user.id
							},
							timestamp: (new Date).toISOString(),
							type: "rich",
							description: `<@!${user.id}>`,
							fields: [{
								name: "Creation Date",
								inline: true,
								value: this.createdApi.extractDate(user.id).toGMTString()
							}, member && {
								name: "Joined Date",
								inline: true,
								value: new Date(member.joinedAt).toGMTString()
							}, member && {
								name: "Roles [" + member.roles.length + "]",
								value: member.roles.map((role => `<@&${role}>`)).join(" | ")
							}, activities.length && {
								name: "Activities",
								value: activities.map((ac => `- **${ac.name}**: \`${ac.state}\``)).join("\n")
							}].filter((e => e))
						};
					}
					async patchUserPopout() {
						const UserPopoutInfo = external_PluginApi_namespaceObject.WebpackModules.getByProps("UserPopoutInfo");
						const UserPopoutBody = external_PluginApi_namespaceObject.WebpackModules.getModule((m => "UserPopoutBody" === m.default.displayName));
						external_PluginApi_namespaceObject.Patcher.after(UserPopoutInfo, "UserPopoutInfo", ((_, [{
							user
						}], returnValue) => {
							if (this.promises.cancelled) return;
							const tree = Utilities.findInReactTree(returnValue, SuppressErrors((e => e.className.indexOf("headerText") > -1)));
							if (!Array.isArray(tree?.children) || !user) return;
							const WrappedJoinedAt = this.joinedApi.task(user.id);
							const WrappedCreatedAt = this.createdApi.task(user.id);
							const WrappedLastMessage = this.lastMessageApi.task(user);
							tree.children.push(external_BdApi_React_default().createElement(ErrorBoundary, {
								key: "UserPopoutHeader",
								id: "UserPopoutHeader",
								mini: true
							}, external_BdApi_React_default().createElement("div", {
								className: Utilities.joinClassNames(dates.Z.container, Settings.get("useIcons", true) ? dates.Z.icons : dates.Z.text)
							}, Settings.get("created_show_up", true) && external_BdApi_React_default().createElement(WrappedCreatedAt, {
								key: "created-date"
							}), Settings.get("joined_show_up", true) && external_BdApi_React_default().createElement(WrappedJoinedAt, {
								key: "joined-date"
							}), Settings.get("lastmessage_show_up", true) && external_BdApi_React_default().createElement(WrappedLastMessage, {
								key: "lastmessage-date"
							}))));
						}));
						external_PluginApi_namespaceObject.Patcher.after(UserPopoutBody, "default", ((_, [{
							user
						}], returnValue) => {
							if (this.promises.cancelled) return;
							if (!Array.isArray(returnValue?.props?.children)) return returnValue;
							const Connections = this.connectionsApi.task(user);
							returnValue.props.children.unshift(external_BdApi_React_default().createElement(ErrorBoundary, {
								id: "UserPopoutBody",
								mini: true,
								key: "connections"
							}, external_BdApi_React_default().createElement(Connections, null)));
						}));
					}
					async patchUserProfile() {
						const UserProfileModalHeader = external_PluginApi_namespaceObject.WebpackModules.getModule((m => "UserProfileModalHeader" === m.default.displayName));
						external_PluginApi_namespaceObject.Patcher.after(UserProfileModalHeader, "default", ((_, [{
							user
						}], res) => {
							if (this.promises.cancelled) return;
							const tree = Utilities.findInReactTree(res, SuppressErrors((res => "DiscordTag" === res.type.displayName)));
							if (!tree || tree.type?.__patched) return;
							const original = tree.type;
							tree.type = (...args) => {
								const ret = original.apply(this, args);
								try {
									const WrappedJoinedAt = this.joinedApi.task(user.id);
									const WrappedCreatedAt = this.createdApi.task(user.id);
									const WrappedLastMessage = this.lastMessageApi.task(user);
									return external_BdApi_React_default().createElement("div", {
										className: dates.Z.wrapper
									}, ret, external_BdApi_React_default().createElement(ErrorBoundary, {
										id: "UserProfile",
										mini: true
									}, external_BdApi_React_default().createElement("div", {
										className: Utilities.joinClassNames(dates.Z.container, dates.Z.userProfile, Settings.get("useIcons", true) ? dates.Z.icons : dates.Z.text)
									}, Settings.get("created_show_profile", true) && external_BdApi_React_default().createElement(WrappedCreatedAt, null), Settings.get("joined_show_profile", true) && external_BdApi_React_default().createElement(WrappedJoinedAt, null), Settings.get("lastmessage_show_profile", true) && external_BdApi_React_default().createElement(WrappedLastMessage, null))));
								} catch (error) {
									Logger.error("Failed to inject into ProfileModal:", error);
								}
								return ret;
							};
							tree.type.__patched = true;
							tree.name = "DiscordTag";
						}));
					}
					async patchMemberListItem() {
						const MemberListItem = await external_PluginApi_namespaceObject.ReactComponents.getComponentByName("MemberListItem", getClass(["member", "activity"], ["member"], [], true));
						const ActivityStatus = external_PluginApi_namespaceObject.WebpackModules.getModule((m => "ActivityStatus" === m.default.displayName));
						const ConnectedActivity = (0, flux_namespaceObject.connectStores)([Settings], (e => e))(Activity);
						external_PluginApi_namespaceObject.Patcher.after(MemberListItem.component.prototype, "render", ((that, _, res) => {
							if (this.promises.cancelled) return;
							if (!Settings.get("activityIcon", true)) return;
							res.props.children = external_BdApi_React_default().createElement(ConnectedActivity, {
								user: that.props.user
							});
						}));
						external_PluginApi_namespaceObject.Patcher.after(ActivityStatus, "default", ((_, [{
							activities
						}], res) => {
							const element = res?.props?.children?.[2];
							if (!element) return;
							Object.assign(element.props, {
								type: activities.filter(ActivitiesFilter)[0].type
							});
						}));
						MemberListItem.forceUpdateAll();
					}
					async patchUserActivityStatus() {
						const RichActivity = external_PluginApi_namespaceObject.WebpackModules.getModule((m => "RichActivity" === m?.default?.displayName));
						external_PluginApi_namespaceObject.Patcher.after(RichActivity, "default", ((_, [props]) => {
							const shouldShow = (0, flux_namespaceObject.useStateFromStores)([Settings], (() => Settings.get("activityIconState", 0)));
							switch (shouldShow) {
								case 1:
									return;
								case 2:
									return null;
							}
							switch (props.type) {
								case constants_namespaceObject.ActivityTypes.PLAYING:
									return external_BdApi_React_default().createElement(gamepad, props);
								case constants_namespaceObject.ActivityTypes.LISTENING:
									return external_BdApi_React_default().createElement(headphones, props);
							}
						}));
					}
					onStop() {
						strings.removeStringsObject(translations);
						external_PluginApi_namespaceObject.Patcher.unpatchAll();
						external_StyleLoader_default().remove();
						this.promises.cancel();
						commands.unregisterAllCommands(this.getName());
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
			var getProto = Object.getPrototypeOf ? obj => Object.getPrototypeOf(obj) : obj => obj.__proto__;
			var leafPrototypes;
			__webpack_require__.t = function(value, mode) {
				if (1 & mode) value = this(value);
				if (8 & mode) return value;
				if ("object" === typeof value && value) {
					if (4 & mode && value.__esModule) return value;
					if (16 & mode && "function" === typeof value.then) return value;
				}
				var ns = Object.create(null);
				__webpack_require__.r(ns);
				var def = {};
				leafPrototypes = leafPrototypes || [null, getProto({}), getProto([]), getProto(getProto)];
				for (var current = 2 & mode && value;
					"object" == typeof current && !~leafPrototypes.indexOf(current); current = getProto(current)) Object.getOwnPropertyNames(current).forEach((key => def[key] = () => value[key]));
				def["default"] = () => value;
				__webpack_require__.d(ns, def);
				return ns;
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
		var __webpack_exports__ = __webpack_require__(177);
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