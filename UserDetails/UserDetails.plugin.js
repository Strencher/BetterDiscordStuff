/**
 * @name UserDetails
 * @version 2.9.1
 * @author Strencher
 * @description Shows you a lot information about users in both the UserPopout and UserProfile Modal. To enumerate: Creation Date, Joined At Date, Last Message Date, Mutual Friends, Mutual Servers & Connections. It also shows the Roles List in the UserProfile Modal.
 * @source https://github.com/Strencher/BetterDiscordStuff/tree/development/UserDetails
 * @updateUrl https://raw.githubusercontent.com/Strencher/BetterDiscordStuff/master/UserDetails/UserDetails.plugin.js
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
		"name": "UserDetails",
		"version": "2.9.1",
		"authors": [{
			"name": "Strencher",
			"discord_id": "415849376598982656",
			"github_username": "Strencher",
			"twitter_username": "Strencher3"
		}],
		"description": "Shows you a lot information about users in both the UserPopout and UserProfile Modal. To enumerate: Creation Date, Joined At Date, Last Message Date, Mutual Friends, Mutual Servers & Connections. It also shows the Roles List in the UserProfile Modal.",
		"github": "https://github.com/Strencher/BetterDiscordStuff/tree/development/UserDetails",
		"github_raw": "https://raw.githubusercontent.com/Strencher/BetterDiscordStuff/master/UserDetails/UserDetails.plugin.js",
		"invite": "gvA2ree"
	},
	"changelog": [{
		"title": "Bug Fixes",
		"type": "fixed",
		"items": [
			"The Plugin works again"
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
					return ___createMemoize___(this, 'Text', () => BdApi.findModuleByDisplayName('LegacyText'))
				},
				get 'Card'() {
					return ___createMemoize___(this, 'Card', () => BdApi.findModuleByDisplayName('Card'))
				}
			},
			'@discord/modules': {
				get 'Dispatcher'() {
					return ___createMemoize___(this, 'Dispatcher', () => BdApi.findModuleByProps('dispatch', 'isDispatching'))
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
			597: (module, __webpack_exports__, __webpack_require__) => {
				__webpack_require__.d(__webpack_exports__, {
					Z: () => __WEBPACK_DEFAULT_EXPORT__
				});
				var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(645);
				var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = __webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
				var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()((function(i) {
					return i[1];
				}));
				___CSS_LOADER_EXPORT___.push([module.id, ".UserDetails-connections-header{font-weight:700;text-transform:uppercase;font-size:12px;margin-bottom:8px;color:var(--header-secondary)}.UserDetails-connections-connectionsBody div:not(.UserDetails-connections-connections,.UserDetails-connections-container){display:inline-flex;margin:2px}.UserDetails-connections-connectionsBody .UserDetails-connections-loading{fill:var(--interactive-muted);animation:UserDetails-connections-blink infinite 2s;width:30px;height:30px;margin:5px;margin-top:0;margin-left:0}.UserDetails-connections-connectionsBody .UserDetails-connections-connections{display:flex;flex-wrap:wrap;margin-bottom:8px}.UserDetails-connections-connectionsBody .UserDetails-connections-connections img{width:30px;height:30px}.UserDetails-connections-connectionsBody .UserDetails-connections-errorIcon{width:35px;height:35px;margin-top:-5px}.UserDetails-connections-connectionsBody .UserDetails-connections-errorIcon{fill:#ed4245 !important}@keyframes UserDetails-connections-blink{0%{opacity:.6}50%{opacity:.3}100%{opacity:.6}}", ""]);
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
				___CSS_LOADER_EXPORT___.push([module.id, ".customStatus-oN4ZZY:not(:empty){padding-top:10px;border-top:thin solid var(--background-modifier-accent)}.UserDetails-dates-container{display:flex;max-width:-webkit-fill-available;margin-bottom:-5px}.UserDetails-dates-container.UserDetails-dates-text{flex-direction:column;margin-top:10px;border-top:thin solid var(--background-modifier-accent);padding-top:10px}.UserDetails-dates-container.UserDetails-dates-icons{flex-direction:row}.UserDetails-dates-container.UserDetails-dates-icons.UserDetails-dates-userProfile{padding-left:13px}.UserDetails-dates-container.UserDetails-dates-icons .UserDetails-dates-loading{animation:UserDetails-dates-blink infinite 2s ease-in-out}.UserDetails-dates-container svg{fill:#ddd;margin:5px;width:20px;height:20px}.UserDetails-dates-container.UserDetails-dates-text .UserDetails-dates-scrollableText{color:var(--text-normal);white-space:nowrap;position:relative;font-size:14px;width:-webkit-fill-available;text-align:left;line-height:18px}.UserDetails-dates-container.UserDetails-dates-text.UserDetails-dates-userProfile{padding-left:18px}.UserDetails-dates-container.UserDetails-dates-text.UserDetails-dates-userProfile .UserDetails-dates-scrollableText{text-align:left !important}.UserDetails-dates-container .UserDetails-dates-errorIcon{fill:#ed4245 !important}.UserDetails-dates-wrapper{display:block}@keyframes UserDetails-dates-blink{0%{opacity:.6}50%{opacity:.3}100%{opacity:.6}}", ""]);
				___CSS_LOADER_EXPORT___.locals = {
					container: "UserDetails-dates-container",
					text: "UserDetails-dates-text",
					icons: "UserDetails-dates-icons",
					userProfile: "UserDetails-dates-userProfile",
					loading: "UserDetails-dates-loading",
					blink: "UserDetails-dates-blink",
					scrollableText: "UserDetails-dates-scrollableText",
					errorIcon: "UserDetails-dates-errorIcon",
					wrapper: "UserDetails-dates-wrapper"
				};
				StyleLoader.append(module.id, ___CSS_LOADER_EXPORT___.toString());
				const __WEBPACK_DEFAULT_EXPORT__ = Object.assign(___CSS_LOADER_EXPORT___, ___CSS_LOADER_EXPORT___.locals);
			},
			675: (module, __webpack_exports__, __webpack_require__) => {
				__webpack_require__.d(__webpack_exports__, {
					Z: () => __WEBPACK_DEFAULT_EXPORT__
				});
				var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(645);
				var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = __webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
				var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()((function(i) {
					return i[1];
				}));
				___CSS_LOADER_EXPORT___.push([module.id, ".UserDetails-mutualFriends-header{font-weight:700;text-transform:uppercase;font-size:12px;margin-bottom:8px;color:var(--header-secondary)}.UserDetails-mutualFriends-body{display:block;margin-bottom:8px}.UserDetails-mutualFriends-friends{display:flex;flex-wrap:wrap}.UserDetails-mutualFriends-mutualFriend{margin:2px;cursor:pointer}.UserDetails-mutualFriends-stack .UserDetails-mutualFriends-mutualFriend{margin:0;margin-right:-10px;background:var(--background-floating)}", ""]);
				___CSS_LOADER_EXPORT___.locals = {
					header: "UserDetails-mutualFriends-header",
					body: "UserDetails-mutualFriends-body",
					friends: "UserDetails-mutualFriends-friends",
					mutualFriend: "UserDetails-mutualFriends-mutualFriend",
					stack: "UserDetails-mutualFriends-stack"
				};
				StyleLoader.append(module.id, ___CSS_LOADER_EXPORT___.toString());
				const __WEBPACK_DEFAULT_EXPORT__ = Object.assign(___CSS_LOADER_EXPORT___, ___CSS_LOADER_EXPORT___.locals);
			},
			416: (module, __webpack_exports__, __webpack_require__) => {
				__webpack_require__.d(__webpack_exports__, {
					Z: () => __WEBPACK_DEFAULT_EXPORT__
				});
				var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(645);
				var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = __webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
				var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()((function(i) {
					return i[1];
				}));
				___CSS_LOADER_EXPORT___.push([module.id, ".UserDetails-mutualServers-header{font-weight:700;text-transform:uppercase;font-size:12px;margin-bottom:8px;color:var(--header-secondary)}.UserDetails-mutualServers-body{display:block;margin-bottom:8px}.UserDetails-mutualServers-guilds{display:flex;flex-wrap:wrap}.UserDetails-mutualServers-mutualGuild{margin:2px}.UserDetails-mutualServers-mutualGuild,.UserDetails-mutualServers-guildAcronym{width:30px;height:30px;border-radius:50%;overflow:hidden;transition:border-radius .3s}.UserDetails-mutualServers-mutualGuild:hover,.UserDetails-mutualServers-guildAcronym:hover{border-radius:20%}.UserDetails-mutualServers-mutualGuild img{width:30px;height:30px}.UserDetails-mutualServers-guildAcronym{display:flex;background:var(--background-floating);align-items:center;justify-content:center;white-space:nowrap;font-size:12px}.UserDetails-mutualServers-stack .UserDetails-mutualServers-mutualGuild{margin:0;margin-right:-10px;background:var(--background-floating)}", ""]);
				___CSS_LOADER_EXPORT___.locals = {
					header: "UserDetails-mutualServers-header",
					body: "UserDetails-mutualServers-body",
					guilds: "UserDetails-mutualServers-guilds",
					mutualGuild: "UserDetails-mutualServers-mutualGuild",
					guildAcronym: "UserDetails-mutualServers-guildAcronym",
					stack: "UserDetails-mutualServers-stack"
				};
				StyleLoader.append(module.id, ___CSS_LOADER_EXPORT___.toString());
				const __WEBPACK_DEFAULT_EXPORT__ = Object.assign(___CSS_LOADER_EXPORT___, ___CSS_LOADER_EXPORT___.locals);
			},
			965: (module, __webpack_exports__, __webpack_require__) => {
				__webpack_require__.d(__webpack_exports__, {
					Z: () => __WEBPACK_DEFAULT_EXPORT__
				});
				var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(645);
				var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = __webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
				var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()((function(i) {
					return i[1];
				}));
				___CSS_LOADER_EXPORT___.push([module.id, ".UserDetails-styles-body:first-child{margin-top:8px}.UserDetails-styles-tooltip{--background-floating: var(--background-secondary)}", ""]);
				___CSS_LOADER_EXPORT___.locals = {
					body: "UserDetails-styles-body",
					tooltip: "UserDetails-styles-tooltip"
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
				___CSS_LOADER_EXPORT___.push([module.id, ".UserDetails-badge-connection{width:30px;height:30px;position:relative}.UserDetails-badge-connection.UserDetails-badge-verified .UserDetails-badge-verifiedBadge{width:12px;height:12px;position:absolute;bottom:-3px;right:-3px;background:var(--background-floating);border-radius:50%;overflow:hidden;padding:2px}", ""]);
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
				___CSS_LOADER_EXPORT___.push([module.id, ".UserDetails-settings-settingsPanel .UserDetails-settings-descriptionItem{margin-top:8px}.UserDetails-settings-settingsPanel .UserDetails-settings-translation{width:27px;height:18px;margin-right:8px}.UserDetails-settings-settingsPanel .UserDetails-settings-marginBottom8{margin-bottom:8px}.UserDetails-settings-settingsPanel .UserDetails-settings-formItem{margin-bottom:10px}.UserDetails-settings-settingsPanel .UserDetails-settings-cardItem{display:flex;position:relative}.UserDetails-settings-settingsPanel .UserDetails-settings-cardItem>div{flex-grow:1}.UserDetails-settings-settingsPanel .UserDetails-settings-cardItem .UserDetails-settings-textBadge{position:absolute;top:-5px;right:-5px;display:inline-block;text-transform:uppercase;vertical-align:middle}.UserDetails-settings-settingsPanel .UserDetails-settings-icons{flex-wrap:wrap}.UserDetails-settings-settingsPanel .UserDetails-settings-icons .UserDetails-settings-settingsBadgeContainer{display:inline-flex;cursor:pointer}.UserDetails-settings-settingsPanel .UserDetails-settings-icons .UserDetails-settings-settingsBadgeContainer .UserDetails-settings-settingsBadgeIcon{width:40px;height:40px}.UserDetails-settings-settingsPanel .UserDetails-settings-icons .UserDetails-settings-settingsBadgeContainer .UserDetails-settings-settingsBadgeIcon.UserDetails-settings-disabled{opacity:.4}.UserDetails-settings-settingsPanel .UserDetails-settings-category{color:#ddd}.UserDetails-settings-settingsPanel .UserDetails-settings-category.UserDetails-settings-opened .UserDetails-settings-categoryContent{padding:10px;padding:10px}.UserDetails-settings-settingsPanel .UserDetails-settings-category.UserDetails-settings-opened .UserDetails-settings-categoryContent .UserDetails-settings-replacementVariable{user-select:text;margin-bottom:6px;padding-bottom:6px;border-bottom:thin solid var(--background-modifier-accent)}.UserDetails-settings-settingsPanel .UserDetails-settings-category.UserDetails-settings-opened .UserDetails-settings-categoryContent .UserDetails-settings-replacementVariable b{margin-right:3px}.UserDetails-settings-settingsPanel .UserDetails-settings-category .UserDetails-settings-categoryHeader{cursor:pointer;padding:10px;font-size:15px;background:var(--background-tertiary);font-weight:600;text-transform:uppercase;display:flex;align-items:center}.UserDetails-settings-settingsPanel .UserDetails-settings-category .UserDetails-settings-categoryHeader .UserDetails-settings-categoryCaret{margin-left:auto}.UserDetails-settings-settingsPanel .UserDetails-settings-pageIcon{color:var(--interactive-normal);fill:var(--interactive-normal)}", ""]);
				___CSS_LOADER_EXPORT___.locals = {
					settingsPanel: "UserDetails-settings-settingsPanel",
					descriptionItem: "UserDetails-settings-descriptionItem",
					translation: "UserDetails-settings-translation",
					marginBottom8: "UserDetails-settings-marginBottom8",
					formItem: "UserDetails-settings-formItem",
					cardItem: "UserDetails-settings-cardItem",
					textBadge: "UserDetails-settings-textBadge",
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
		var __webpack_exports__ = {};
		(() => {
			__webpack_require__.r(__webpack_exports__);
			__webpack_require__.d(__webpack_exports__, {
				default: () => Plugin
			});
			var modules_stores_namespaceObject = {};
			__webpack_require__.r(modules_stores_namespaceObject);
			__webpack_require__.d(modules_stores_namespaceObject, {
				JoinedAt: () => joinedAt,
				LastMessage: () => stores_lastMessage
			});
			const constants_namespaceObject = Modules["@discord/constants"];
			const flux_namespaceObject = Modules["@discord/flux"];
			const i18n_namespaceObject = Modules["@discord/i18n"];
			var i18n_default = __webpack_require__.n(i18n_namespaceObject);
			const modules_namespaceObject = Modules["@discord/modules"];
			const stores_namespaceObject = Modules["@discord/stores"];
			const external_PluginApi_namespaceObject = PluginApi;
			const external_BasePlugin_namespaceObject = BasePlugin;
			var external_BasePlugin_default = __webpack_require__.n(external_BasePlugin_namespaceObject);
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
			var external_BdApi_React_ = __webpack_require__(113);
			var external_BdApi_React_default = __webpack_require__.n(external_BdApi_React_);
			const external_StyleLoader_namespaceObject = StyleLoader;
			var external_StyleLoader_default = __webpack_require__.n(external_StyleLoader_namespaceObject);
			const components_namespaceObject = Modules["@discord/components"];
			const connections_namespaceObject = Modules["@discord/connections"];
			var connections_default = __webpack_require__.n(connections_namespaceObject);
			var badge = __webpack_require__(173);
			const utils_namespaceObject = Modules["@discord/utils"];
			const package_namespaceObject = JSON.parse('{"um":{"u2":"UserDetails"}}');
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
			const modules_Settings = Settings;
			var flowerstar = __webpack_require__(564);
			const icons_flowerstar = props => external_BdApi_React_default().createElement("div", Object.assign({}, props, {
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
			const contextmenu_namespaceObject = Modules["@discord/contextmenu"];
			const native_namespaceObject = Modules["@discord/native"];
			const external_window_namespaceObject = window._;
			var external_window_default = __webpack_require__.n(external_window_namespaceObject);
			const FormItem = external_PluginApi_namespaceObject.WebpackModules.getByDisplayName("FormItem");
			const FormText = external_PluginApi_namespaceObject.WebpackModules.getByDisplayName("FormText");
			const FormDivider = external_PluginApi_namespaceObject.WebpackModules.getByDisplayName("FormDivider");
			const Flex = external_PluginApi_namespaceObject.WebpackModules.getByDisplayName("Flex");
			const {
				marginBottom8
			} = external_PluginApi_namespaceObject.WebpackModules.getByProps("marginBottom8");
			class Utilities extends external_PluginApi_namespaceObject.Utilities {
				static getIconURL(type, colored = modules_Settings.get("coloredConnectionsIcons", true)) {
					switch (type) {
						case "steam":
							return colored ? "lightSVG" : "darkSVG";
						case "xbox":
							return colored ? "customPNG" : "whiteSVG";
						case "youtube":
							return colored ? "darkSVG" : "whitePNG";
						case "epicgames":
							return colored ? "lightSVG" : "whitePNG";
						default:
							return colored ? "darkSVG" : "whitePNG";
					}
				}
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
						}, external_BdApi_React_default().createElement(Component, Object.assign({}, props, {
							onChange: value => {
								value = value.value ?? value;
								setState(value);
								props.onChange(value);
							}
						})), external_BdApi_React_default().createElement(FormText, {
							type: "description",
							disabled: Boolean(props.note)
						}, props.note)), external_BdApi_React_default().createElement(FormDivider, null));
						else return external_BdApi_React_default().createElement(Component, Object.assign({}, props, {
							onChange: value => {
								value = value.value ?? value;
								setState(value);
								props.onChange(value);
							}
						}));
					};
				}
				static makeLazy(factory) {
					let cache = {
						value: null,
						ran: false
					};
					return () => cache.ran ? cache.value : (cache.ran = true, cache.value = factory());
				}
				static getLazy(filter) {
					const fromCache = external_PluginApi_namespaceObject.WebpackModules.getModule(filter);
					if (fromCache) return Promise.resolve(fromCache);
					return new Promise((resolve => {
						const cancel = external_PluginApi_namespaceObject.WebpackModules.addListener((m => {
							const matches = [m, m?.default];
							for (let i = 0; i < matches.length; i++) {
								if (!matches[i] || !filter(matches[i])) continue;
								resolve(matches[i]);
								cancel();
								break;
							}
						}));
					}));
				}
			}
			var styles = __webpack_require__(965);
			function Badge({
				item
			}) {
				const connection = connections_default().get(item.type);
				const onClick = () => {
					try {
						open(connection.getPlatformUserUrl(item), "_blank");
					} catch {}
				};
				const onContextMenu = e => {
					(0, contextmenu_namespaceObject.openContextMenu)(e, (() => external_BdApi_React_default().createElement(contextmenu_namespaceObject.Menu, {
						navId: "connections-context",
						onClose: contextmenu_namespaceObject.closeContextMenu
					}, external_BdApi_React_default().createElement(contextmenu_namespaceObject.MenuGroup, null, external_BdApi_React_default().createElement(contextmenu_namespaceObject.MenuItem, {
						id: "copy-connection-id",
						label: i18n_namespaceObject.Messages.COPY_ID,
						action: () => (0, native_namespaceObject.copy)(item.id)
					})))));
				};
				const shouldVerified = modules_Settings.get("showVerifiedConnections", true) && item.verified;
				return external_BdApi_React_default().createElement(components_namespaceObject.Tooltip, {
					text: `${external_window_default().upperFirst(item.type)}: ${item.name}`,
					tooltipClassName: styles.Z.tooltip
				}, (props => external_BdApi_React_default().createElement("div", Object.assign({}, props, {
					onClick,
					className: (0, utils_namespaceObject.joinClassNames)(badge.Z.connection, {
						[badge.Z.verified]: shouldVerified
					})
				}), external_BdApi_React_default().createElement("img", {
					onContextMenu,
					src: connection.icon[Utilities.getIconURL(item.type)]
				}), shouldVerified && external_BdApi_React_default().createElement(icons_flowerstar, {
					className: badge.Z.verifiedBadge
				}))));
			}
			const circle = props => external_BdApi_React_default().createElement("svg", Object.assign({}, props, {
				xmlns: "http://www.w3.org/2000/svg",
				viewBox: "0 0 36 36"
			}), external_BdApi_React_default().createElement("circle", {
				cx: "18",
				cy: "18",
				r: "18"
			}));
			const error = props => external_BdApi_React_default().createElement("svg", Object.assign({
				xmlns: "http://www.w3.org/2000/svg",
				viewBox: "0 0 24 24",
				fill: "#ddd",
				width: "24",
				height: "24"
			}, props), external_BdApi_React_default().createElement("path", {
				d: "M0 0h24v24H0z",
				fill: "none"
			}), external_BdApi_React_default().createElement("path", {
				d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"
			}));
			var apis_connections = __webpack_require__(597);
			const actions_namespaceObject = Modules["@discord/actions"];
			const nl_namespaceObject = JSON.parse('{"CONNECTIONS":"Verbindingen","NO_CONNECTIONS":"Geen verbindingen!","LOADING_CONNECTIONS":"Verbindingen aan het laden...","LOADING_LAST_MESSAGE":"Laatste bericht aan het laden...","LOADING_JOINED_AT":"Lid geworden op aan het laden...","MEMBER_WAS_NOT_FOUND":"Lid kon niet worden gevonden!","FAILED_TO_FETCH":"Gefaald om op te halen!","USERINFO_CMD_DESC":"Laat bepaalde informatie zien over een bepaald lid.","NO_MUTUAL_GUILDS":"Geen gemeenschappelijke servers","LOADING_MUTUAL_GUILDS":"Gemeenschappelijke servers aan het laden...","LOADING_MUTUAL_FRIENDS":"Gemeenschappelijke vrienden aan het laden...","NO_MUTUAL_FRIENDS":"Geen gemeenschappelijke vrienden"}');
			var locales_nl_namespaceObject = __webpack_require__.t(nl_namespaceObject, 2);
			const de_namespaceObject = JSON.parse('{"CONNECTIONS":"Verknüpfungen","NO_CONNECTIONS":"Keine Verknüpfungen","LOADING_CONNECTIONS":"Lade Verknüpfungen...","LOADING_LAST_MESSAGE":"Lade letzte Nachricht...","LOADING_JOINED_AT":"Lade Beitrittsdatum...","MEMBER_WAS_NOT_FOUND":"Mitglied konnte nicht gefunden werden.","FAILED_TO_FETCH":"Fehler beim Laden","USERINFO_CMD_DESC":"Zeigt einige Informationen über einen bestimmten Nutzer.","NO_MUTUAL_GUILDS":"Keine gemeinsamen Server","LOADING_MUTUAL_GUILDS":"Gemeinsame Server werden geladen.","LOADING_MUTUAL_FRIENDS":"Gemeinsame Freunde werden geladen...","NO_MUTUAL_FRIENDS":"Keine gemeinsamen Freunde"}');
			var locales_de_namespaceObject = __webpack_require__.t(de_namespaceObject, 2);
			const en_US_namespaceObject = JSON.parse('{"CONNECTIONS":"Connections","NO_CONNECTIONS":"No Connections","LOADING_CONNECTIONS":"Loading Connections...","LOADING_LAST_MESSAGE":"Loading Last Message","LOADING_JOINED_AT":"Loading Joined At","MEMBER_WAS_NOT_FOUND":"Member Was Not Found!","FAILED_TO_FETCH":"Failed To Fetch","USERINFO_CMD_DESC":"User Information","NO_MUTUAL_GUILDS":"No mutual guilds","LOADING_MUTUAL_GUILDS":"Loading mutual guilds...","LOADING_MUTUAL_FRIENDS":"Loading mutual friends...","NO_MUTUAL_FRIENDS":"No mutual friends"}');
			var locales_en_US_namespaceObject = __webpack_require__.t(en_US_namespaceObject, 2);
			const tr_namespaceObject = JSON.parse('{"CONNECTIONS":"Bağlantılar","NO_CONNECTIONS":"Bağlantı yok!","LOADING_CONNECTIONS":"Bağlantılar yükleniyor..","LOADING_LAST_MESSAGE":"Son mesaj yükleniyor..","LOADING_JOINED_AT":"Giriş tarihi yükleniyor..","MEMBER_WAS_NOT_FOUND":"Kullanıcı bulunamadı!","FAILED_TO_FETCH":"Alınamadı!","USERINFO_CMD_DESC":"Belirli bir kullanıcı hakkında bazı bilgiler verir.","NO_MUTUAL_GUILDS":"Ortak sunucu yok!","LOADING_MUTUAL_GUILDS":"Ortak sunucular yükleniyor!","LOADING_MUTUAL_FRIENDS":"Ortak arkadaşları yüklüyorum...","NO_MUTUAL_FRIENDS":"Ortak arkadaş yok"}');
			var locales_tr_namespaceObject = __webpack_require__.t(tr_namespaceObject, 2);
			const fr_namespaceObject = JSON.parse('{"CONNECTIONS":"Connexions","NO_CONNECTIONS":"Pas de connexion!","LOADING_CONNECTIONS":"Chargement des connexions...","LOADING_LAST_MESSAGE":"Chargement du dernier message...","LOADING_JOINED_AT":"Chargement de la date d\'entrée...","MEMBER_WAS_NOT_FOUND":"Membre non trouvé","FAILED_TO_FETCH":"Échec de la récupération","USERINFO_CMD_DESC":"Informations sur un utilisateur spécifique","NO_MUTUAL_GUILDS":"Pas de serveur en commun","LOADING_MUTUAL_GUILDS":"Chargement des serveurs en communs...","LOADING_MUTUAL_FRIENDS":"Chargement des amis en communs...","NO_MUTUAL_FRIENDS":"Aucun ami en commun"}');
			const vi_namespaceObject = JSON.parse('{"CONNECTIONS":"Kết nối","NO_CONNECTIONS":"Không có kết nối!","LOADING_CONNECTIONS":"Đang tải các kết nối...","LOADING_LAST_MESSAGE":"Đang tải tin nhắn cuối cùng...","LOADING_JOINED_AT":"Đang tải ngày tham gia...","MEMBER_WAS_NOT_FOUND":"Không tìm thấy thành viên!","FAILED_TO_FETCH":"Nạp dữ liệu thất bại!","USERINFO_CMD_DESC":"Hiển thị một số thông tin về một người dùng cụ thể.","NO_MUTUAL_GUILDS":"Không có server chung nào","LOADING_MUTUAL_GUILDS":"Đang tải server chung...","LOADING_MUTUAL_FRIENDS":"Đang tải bạn chung...","NO_MUTUAL_FRIENDS":"Không có bạn chung nào"}');
			const es_ES_namespaceObject = JSON.parse('{"CONNECTIONS":"Conexiones","NO_CONNECTIONS":"Sin conexiones","LOADING_CONNECTIONS":"Cargando conexiones...","LOADING_LAST_MESSAGE":"Cargando el último mensaje...","LOADING_JOINED_AT":"Cargando la fecha de ingreso...","MEMBER_WAS_NOT_FOUND":"¡El miembro no fue encontrado!","FAILED_TO_FETCH":"¡No se pudo obtener!","USERINFO_CMD_DESC":"Muestra información sobre un usuario en específico.","NO_MUTUAL_GUILDS":"Sin servidores en común","LOADING_MUTUAL_GUILDS":"Cargando los servidores en común...","LOADING_MUTUAL_FRIENDS":"Cargando amigos mútuos...","NO_MUTUAL_FRIENDS":"Sin amigos mútuos"}');
			const sv_SE_namespaceObject = JSON.parse('{"CONNECTIONS":"anslutningar","NO_CONNECTIONS":"inga anslutningar","LOADING_CONNECTIONS":"laddar anslutningar","LOADING_LAST_MESSAGE":"läser in det senaste meddelandet","LOADING_JOINED_AT":"lastning gick med vid","MEMBER_WAS_NOT_FOUND":"medlem hittades inte","FAILED_TO_FETCH":"misslyckades med att hämta","USERINFO_CMD_DESC":"visar lite information om en specifik användare","NO_MUTUAL_GUILDS":"inga ömsesidiga servrar","LOADING_MUTUAL_GUILDS":"laddar ömsesidiga servrar"}');
			const pt_BR_namespaceObject = JSON.parse('{"CONNECTIONS":"Conexões","NO_CONNECTIONS":"Sem conexões","LOADING_CONNECTIONS":"Carregando conexões","LOADING_LAST_MESSAGE":"Carregando última mensagem","LOADING_JOINED_AT":"Carregando entrou há","MEMBER_WAS_NOT_FOUND":"Membro não encontrado!","FAILED_TO_FETCH":"Falha na busca","USERINFO_CMD_DESC":"Mostra algumas informações de um usuário específico.","NO_MUTUAL_GUILDS":"Sem servidores em comum","LOADING_MUTUAL_GUILDS":"Carregando os servidores em comum","LOADING_MUTUAL_FRIENDS":"Carregando amigos em comum...","NO_MUTUAL_FRIENDS":"Sem amigos em comum."}');
			const locales = {
				"en-US": locales_en_US_namespaceObject,
				"es-ES": es_ES_namespaceObject,
				"sv-SE": sv_SE_namespaceObject,
				"pt-BR": pt_BR_namespaceObject,
				nl: locales_nl_namespaceObject,
				de: locales_de_namespaceObject,
				tr: locales_tr_namespaceObject,
				fr: fr_namespaceObject,
				vi: vi_namespaceObject
			};
			function strings_defineProperty(obj, key, value) {
				if (key in obj) Object.defineProperty(obj, key, {
					value,
					enumerable: true,
					configurable: true,
					writable: true
				});
				else obj[key] = value;
				return obj;
			}
			class Strings {
				static init() {
					this.setLanguage(i18n_default().getLocale());
					modules_namespaceObject.Dispatcher.subscribe("USER_SETTINGS_UPDATE", this.handleLocaleChange);
				}
				static shutdown() {
					modules_namespaceObject.Dispatcher.unsubscribe("USER_SETTINGS_UPDATE", this.handleLocaleChange);
				}
				static setLanguage(lang) {
					this._strings = locales[lang] ?? locales["en-US"];
				}
				static hasString(key) {
					return null != this._strings[key] || null != locales["en-US"][key];
				}
				static get(key) {
					return this._strings[key] ?? locales["en-US"][key] ?? "String not found.";
				}
			}
			strings_defineProperty(Strings, "_strings", void 0);
			strings_defineProperty(Strings, "handleLocaleChange", (() => {
				Strings.setLanguage(i18n_default().getLocale());
			}));
			const {
				Heading
			} = external_PluginApi_namespaceObject.WebpackModules.getByProps("Heading") ?? {
				Heading: () => null
			};
			const defaultConnections = Object.fromEntries(connections_default().map((item => [item.type, true])));
			function UserConnections({
				user
			}) {
				if (!connections_default().filter((c => modules_Settings.get("shownConnections", defaultConnections)[c.type])).length || user.bot || !modules_Settings.get("showConnectionsSection", true)) return null;
				const connections = (0, flux_namespaceObject.useStateFromStores)([stores_namespaceObject.UserProfile], (() => stores_namespaceObject.UserProfile.getUserProfile(user.id)?.connectedAccounts));
				const [message, setMessage] = (0, external_BdApi_React_.useState)("");
				(0, external_BdApi_React_.useEffect)((() => {
					if (Array.isArray(connections) || stores_namespaceObject.UserProfile.isFetching(user.id)) return;
					modules_namespaceObject.Dispatcher.wait((() => {
						actions_namespaceObject.ProfileActions.fetchProfile(user.id).catch((error => {
							if (~error?.message?.indexOf("Already dispatching")) return;
							external_PluginApi_namespaceObject.Logger.error(`Failed to fetch profile for ${user.id}:\n`, error);
							setMessage(Strings.get("FAILED_TO_FETCH"));
						}));
					}));
				}), []);
				return external_BdApi_React_default().createElement("div", {
					className: external_PluginApi_namespaceObject.Utilities.className(apis_connections.Z.connectionsBody, styles.Z.body)
				}, !connections?.length && modules_Settings.get("showEmptyConnections", true) || connections?.length ? external_BdApi_React_default().createElement(Heading, {
					level: 3,
					variant: "eyebrow",
					className: (0, utils_namespaceObject.joinClassNames)(apis_connections.Z.container, apis_connections.Z.header),
					uppercase: true,
					muted: true
				}, Strings.get(connections?.length ? "CONNECTIONS" : "NO_CONNECTIONS")) : null, Array.isArray(connections) ? connections?.length ? external_BdApi_React_default().createElement("div", {
					className: apis_connections.Z.connections
				}, connections.filter((e => modules_Settings.get("shownConnections", defaultConnections)[e.type])).map((badge => external_BdApi_React_default().createElement(Badge, {
					item: badge,
					key: badge.type
				})))) : null : message ? external_BdApi_React_default().createElement(components_namespaceObject.TooltipContainer, {
					text: message
				}, external_BdApi_React_default().createElement(error, {
					className: apis_connections.Z.errorIcon
				})) : external_BdApi_React_default().createElement(components_namespaceObject.TooltipContainer, {
					text: Strings.get("LOADING_CONNECTIONS")
				}, connections_default().filter((e => modules_Settings.get("shownConnections", defaultConnections)[e.type])).map((() => external_BdApi_React_default().createElement(circle, {
					className: apis_connections.Z.loading
				})))));
			}
			const cake = props => external_BdApi_React_default().createElement("svg", Object.assign({}, props, {
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
			function useSettings(settings) {
				return (0, flux_namespaceObject.useStateFromStores)([modules_Settings], (() => Object.fromEntries(Object.keys(settings).map((key => [key, modules_Settings.get(key, settings[key])])))));
			}
			function extractDate(id) {
				return new Date(id / 4194304 + 14200704e5);
			}
			function parseZeroPadding(zeroable) {
				return zeroable <= 9 ? "0" + zeroable : zeroable;
			}
			function monthsAgo(date1, date2) {
				let months = 12 * (date2.getFullYear() - date1.getFullYear());
				months -= date1.getMonth();
				months += date2.getMonth();
				months = Math.abs(months);
				return months <= 0 ? 0 : months;
			}
			function daysAgo(date1, date2) {
				return Math.floor((date1.getTime() - date2.getTime()) / (1e3 * 60 * 60 * 24));
			}
			function yearsAgo(date1, date2) {
				return monthsAgo(date2, date1) / 12;
			}
			function minimalAgo(date1, date2) {
				const months = monthsAgo(date1, date2);
				if (months > 12) {
					const years = yearsAgo(date1, date2);
					const years_floored = Math.floor(years)
					return `${years_floored}${(years - years_floored > .5) ? ' and a half' : ''} year${years > 1 ? 's' : ''}`;
				}
				else {
					const days = daysAgo(date1, date2);
					if (days > 7) {
						const weeks = days / 7.0;
						const weeks_floored = Math.floor(weeks);
						return `${weeks_floored}${(weeks - weeks_floored > .5) ? ' and a half' : ''} week${weeks > 1 ? 's' : ''}`;
					}
					else if (days > 0) {
						return `${Math.floor(days)} day${days > 1 ? 's' : ''}`;
					}
					else {
						const seconds = date2.getSeconds() - date1.getSeconds();
						const minutes = Math.floor(seconds / 60.0);
						const hours = Math.floor(minutes / 60.0);
						if (hours > 1) {
							return `${hours} hours`;
						}
						else if (hours == 1) {
							return 'an hour';
						}
						else if (minutes > 1) {
							return `${minutes} minutes`;
						}
						else if (minutes == 1) { 
							return 'a minute';
						}
						else if (seconds > 1) {
							return `${seconds} seconds`;
						}
						else {
							return 'less than a second'
						}
					}
				}
			}
			function parseTime(format, date) {
				if ("object" !== typeof date) date = new Date(date);
				const today = new Date,
					daysago = daysAgo(today, date),
					hour12 = 0 === modules_Settings.get("12hour", 1);
				return format.replace(/\$timelabel/g, date.getHours() >= 12 ? "PM" : "AM").replace(/\$daysago/g, daysago.toString()).replace(/\$dayname/g, date.toLocaleDateString("default", {
					weekday: "short",
					hour12
				})).replace(/\$ago/g, minimalAgo(today, date)).replace(/\$day/g, date.toLocaleDateString("default", {
					day: "2-digit",
					hour12
				})).replace(/\$monthname/g, date.toLocaleDateString("default", {
					month: "short",
					hour12
				})).replace(/\$monthsago/g, monthsAgo(today, date).toString()).replace(/\$month/g, date.toLocaleDateString("default", {
					month: "2-digit",
					hour12
				})).replace(/\$weeksago/g, Math.floor(daysago / 7).toString()).replace(/\$yearsago/g, Math.floor(yearsAgo(today, date)).toString()).replace(/\$year/g, date.getFullYear().toString()).replace(/\$hour/g, parseZeroPadding(hour12 ? date.getHours() % 12 : date.getHours()).toString()).replace(/\$minute/g, parseZeroPadding(date.getMinutes()).toString()).replace(/\$second/g, parseZeroPadding(date.getSeconds()).toString());
			}
			const DEFAULT_FORMAT = "Created At: $hour:$minute:$second, $day.$month.$year $daysago days";
			function CreatedAt({
				userId
			}) {
				const format = modules_Settings.get("created_format", DEFAULT_FORMAT);
				const text = parseTime(format, extractDate(userId));
				return modules_Settings.get("useIcons", true) ? external_BdApi_React_default().createElement(components_namespaceObject.TooltipContainer, {
					text
				}, external_BdApi_React_default().createElement(cake, null)) : external_BdApi_React_default().createElement(TextScroller, null, text);
			}
			const calendar = props => external_BdApi_React_default().createElement("svg", Object.assign({}, props, {
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
			const cube = props => external_BdApi_React_default().createElement("svg", Object.assign({}, props, {
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
			function joinedAt_defineProperty(obj, key, value) {
				if (key in obj) Object.defineProperty(obj, key, {
					value,
					enumerable: true,
					configurable: true,
					writable: true
				});
				else obj[key] = value;
				return obj;
			}
			const resolveId = function(guildId, userId) {
				return `${guildId}_${userId}`;
			};
			const JoinedAtDates = new Map,
				fetchingQueue = new Set;
			let stopped = false;
			const handleGuildMembersChunk = function(data) {
				if (stopped || !data || !Array.isArray(data.members)) return;
				if (data.notFound?.length)
					for (let i = 0; i < data.notFound.length; i++) {
						const userId = data.notFound[i];
						fetchingQueue.delete(userId);
						JoinedAtDates.set(resolveId(data.guildId, data.notFound[i]), {
							data: "MEMBER_WAS_NOT_FOUND",
							fetch: Date.now(),
							status: "failure"
						});
					}
				for (let i = 0; i < data.members.length; i++) {
					const member = data.members[i];
					if (!member || !member.user) continue;
					fetchingQueue.delete(member.user.id);
					JoinedAtDates.set(resolveId(data.guildId, member.user.id), {
						data: new Date(member.joined_at),
						fetch: Date.now(),
						status: "success"
					});
				}
			};
			class JoinedAtStore extends flux_namespaceObject.Store {
				constructor(...args) {
					super(...args);
					joinedAt_defineProperty(this, "logger", new utils_namespaceObject.Logger("JoinedAtStore"));
				}
				get fetching() {
					return fetchingQueue;
				}
				getState() {
					return JoinedAtDates;
				}
				clear() {
					JoinedAtDates.clear();
					fetchingQueue.clear();
				}
				has(guildId, userId) {
					return null !== this.getDate(guildId, userId) && JoinedAtDates.has(resolveId(guildId, userId));
				}
				isFetching(guildId, userId) {
					return fetchingQueue.has(resolveId(guildId, userId));
				}
				getDate(guildId, userId) {
					const data = JoinedAtDates.get(resolveId(guildId, userId));
					if (!data || Date.now() - data.fetch > 6e5) return null;
					return data;
				}
				destroy() {
					stopped = true;
				}
				async fetch(guildId, userId) {
					const id = resolveId(guildId, userId);
					if (fetchingQueue.has(id)) return;
					fetchingQueue.add(id);
					if (stores_namespaceObject.Members.getMember(guildId, userId)) {
						fetchingQueue.delete(id);
						JoinedAtDates.set(id, {
							data: new Date(stores_namespaceObject.Members.getMember(guildId, userId).joinedAt),
							fetch: Date.now(),
							status: "success"
						});
						return this.emitChange();
					}
					setTimeout((() => {
						if (this.has(guildId, userId)) return;
						JoinedAtDates.set(id, {
							data: "FAILED_TO_FETCH",
							fetch: Date.now(),
							status: "failure"
						});
						this.logger.error("Request timed out, didn't got a response after 1 minute.");
					}), 6 * 1e4);
					actions_namespaceObject.GuildActions.requestMembersById(guildId, userId);
				}
			}
			const JoinedAt = new JoinedAtStore(modules_namespaceObject.Dispatcher, {
				GUILD_MEMBERS_CHUNK: handleGuildMembersChunk
			});
			const joinedAt = JoinedAt;
			const joinedDate_DEFAULT_FORMAT = "Joined At: $hour:$minute:$second, $day.$month.$year $daysago days";
			function JoinedAtDate({
				userId
			}) {
				const format = modules_Settings.get("joined_format", joinedDate_DEFAULT_FORMAT);
				const guildId = stores_namespaceObject.SelectedGuilds.getGuildId();
				const joined = (0, flux_namespaceObject.useStateFromStores)([joinedAt], (() => joinedAt.getDate(guildId, userId)));
				const [message, setMessage] = (0, external_BdApi_React_.useState)("");
				(0, external_BdApi_React_.useEffect)((() => {
					if (joinedAt.has(guildId, userId) || joinedAt.isFetching(guildId, userId)) return;
					if (!guildId) return void setMessage(Strings.get("FAILED_TO_FETCH"));
					joinedAt.fetch(guildId, userId);
				}), []);
				const useIcons = modules_Settings.get("useIcons", true);
				const isFailed = !joined || "failure" === joined.status;
				return !isFailed ? useIcons ? external_BdApi_React_default().createElement(components_namespaceObject.TooltipContainer, {
					text: parseTime(format, joined.data)
				}, external_BdApi_React_default().createElement(calendar, null)) : external_BdApi_React_default().createElement(TextScroller, null, parseTime(format, joined.data)) : message || isFailed && Strings.hasString(joined?.data) ? useIcons ? external_BdApi_React_default().createElement(components_namespaceObject.TooltipContainer, {
					text: message || Strings.get(joined.data)
				}, external_BdApi_React_default().createElement(error, {
					className: dates.Z.errorIcon
				})) : external_BdApi_React_default().createElement(TextScroller, {
					style: {
						color: "red"
					}
				}, message || Strings.get(joined.data)) : external_BdApi_React_default().createElement(components_namespaceObject.TooltipContainer, {
					text: Strings.get("LOADING_JOINED_AT")
				}, useIcons ? external_BdApi_React_default().createElement(cube, {
					className: dates.Z.loading
				}) : external_BdApi_React_default().createElement(LoadingText, null));
			}
			const textbubble = props => external_BdApi_React_default().createElement("svg", Object.assign({}, props, {
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
			function lastMessage_resolveId(...args) {
				return args.join("_");
			}
			const lastMessage_fetchingQueue = new Set,
				lastMessages = new Map;
			function handleMessageCreate({
				message,
				channelId
			}) {
				lastMessages.set(lastMessage_resolveId(message.author.id, channelId), {
					channelId,
					messageId: message.id,
					data: new Date(message.timestamp),
					fetch: Date.now(),
					status: "success"
				});
			}
			function handleMessageDelete({
				messageId,
				channelId
			}) {
				for (const [userId, result] of lastMessages) {
					if (result.messageId !== messageId || result.channelId !== channelId) continue;
					lastMessages.delete(lastMessage_resolveId(userId, channelId));
				}
			}
			class LastMessageStore extends flux_namespaceObject.Store {
				constructor(...args) {
					super(...args);
					lastMessage_defineProperty(this, "paused", false);
					lastMessage_defineProperty(this, "logger", new utils_namespaceObject.Logger("LastMessageStore"));
					lastMessage_defineProperty(this, "MAX_RETRIES", 5);
				}
				get _users() {
					return lastMessages;
				}
				get fetching() {
					return lastMessage_fetchingQueue;
				}
				isFetching(userId, channelId) {
					return lastMessage_fetchingQueue.has(lastMessage_resolveId(userId, channelId));
				}
				get(userId, channelId) {
					const cached = lastMessages.get(lastMessage_resolveId(userId, channelId));
					if (!cached || Date.now() - cached.fetch > 6e5) return null;
					return cached;
				}
				has(userId, channelId) {
					return null != this.get(userId, channelId) && lastMessages.has(lastMessage_resolveId(userId, channelId));
				}
				fetch(userId, roomId, isGuild = false, attempt = 1) {
					const id = lastMessage_resolveId(userId, roomId);
					if (lastMessage_fetchingQueue.has(id) || this.paused) return Promise.resolve();
					if (attempt > this.MAX_RETRIES) {
						lastMessage_fetchingQueue.delete(id);
						lastMessages.set(id, {
							channelId: roomId,
							data: "FAILED_TO_FETCH",
							fetch: Date.now(),
							messageId: null,
							status: "failure"
						});
						this.logger.error(`Request failed after ${this.MAX_RETRIES} attempts.`);
						this.emitChange();
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
							else {
								lastMessages.set(id, {
									data: "FAILED_TO_FETCH",
									fetch: Date.now(),
									channelId: roomId,
									messageId: null,
									status: "failure"
								});
								this.logger.info(`No messages for ${userId} were found in ${roomId}.`);
							}
							this.emitChange();
							resolve();
						})).catch((error => {
							if (429 === error.status) {
								this.paused = true;
								setTimeout((() => {
									this.paused = false;
									this.fetch(userId, roomId, isGuild, attempt).then(resolve).catch(reject);
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
			const lastMessage_DEFAULT_FORMAT = "Last Message: $hour:$minute:$second, $day.$month.$year $daysago days";
			function LastMessageDate({
				user
			}) {
				const format = modules_Settings.get("lastmessage_format", lastMessage_DEFAULT_FORMAT);
				const roomId = stores_namespaceObject.SelectedGuilds.getGuildId() || stores_namespaceObject.SelectedChannels.getChannelId();
				const isGuild = Boolean(stores_namespaceObject.SelectedGuilds.getGuildId());
				const lastMessage = (0, flux_namespaceObject.useStateFromStores)([stores_lastMessage], (() => stores_lastMessage.get(user.id, roomId)));
				const [errorMessage, setErrorMessage] = (0, external_BdApi_React_.useState)("");
				(0, external_BdApi_React_.useEffect)((() => {
					if (stores_lastMessage.isFetching(user.id, roomId) || stores_lastMessage.has(user.id, roomId)) return;
					if (!roomId) return setErrorMessage("Cannot resolve channel/guild id.");
					stores_lastMessage.fetch(user.id, roomId, isGuild).catch((error => {
						external_PluginApi_namespaceObject.Logger.error(`Failed to fetch LastMessage from ${user.tag}:\n`, error);
					}));
				}), []);
				const transitionToMessage = () => {
					if (!lastMessage.channelId || !lastMessage.messageId) return;
					utils_namespaceObject.Navigation.replaceWith(isGuild ? `/channels/${stores_namespaceObject.SelectedGuilds.getGuildId()}/${lastMessage.channelId}/${lastMessage.messageId}` : `/channels/@me/${lastMessage.channelId}/${lastMessage.messageId}`);
				};
				const failed = "failure" === lastMessage?.status;
				const shouldUseIcon = modules_Settings.get("useIcons", true);
				return lastMessage?.data && !failed ? shouldUseIcon ? external_BdApi_React_default().createElement(components_namespaceObject.TooltipContainer, {
					text: parseTime(format, lastMessage.data)
				}, external_BdApi_React_default().createElement(textbubble, {
					onClick: transitionToMessage
				})) : external_BdApi_React_default().createElement(TextScroller, {
					onClick: transitionToMessage
				}, parseTime(format, lastMessage.data)) : errorMessage || failed && Strings.hasString(lastMessage.data) ? shouldUseIcon ? external_BdApi_React_default().createElement(components_namespaceObject.TooltipContainer, {
					text: errorMessage || Strings.get(lastMessage.data)
				}, external_BdApi_React_default().createElement(error, {
					className: dates.Z.errorIcon
				})) : external_BdApi_React_default().createElement(TextScroller, {
					style: {
						color: "red"
					}
				}, errorMessage || Strings.get(lastMessage.data)) : external_BdApi_React_default().createElement(components_namespaceObject.TooltipContainer, {
					text: Strings.get("LOADING_LAST_MESSAGE")
				}, shouldUseIcon ? external_BdApi_React_default().createElement(cube, {
					className: dates.Z.loading
				}) : external_BdApi_React_default().createElement(LoadingText, null));
			}
			var apis_mutualFriends = __webpack_require__(675);
			const {
				Heading: mutualFriends_Heading
			} = external_PluginApi_namespaceObject.WebpackModules.getByProps("Heading") ?? {
				Heading: () => null
			};
			const WindowStore = external_PluginApi_namespaceObject.WebpackModules.getByProps("isFocused");
			const {
				AnimatedAvatar,
				Sizes
			} = external_PluginApi_namespaceObject.WebpackModules.getByProps("AnimatedAvatar");
			const UserProfileModal = external_PluginApi_namespaceObject.WebpackModules.getByProps("openUserProfileModal");
			const {
				ComponentDispatch
			} = external_PluginApi_namespaceObject.WebpackModules.getByProps("ComponentDispatch") ?? {};
			function MutualFriend({
				user
			}) {
				const [isMouseOver, setMouseOver] = (0, external_BdApi_React_.useState)(false);
				const isWindowFocused = (0, flux_namespaceObject.useStateFromStores)([WindowStore], (() => WindowStore.isFocused()));
				return external_BdApi_React_default().createElement(components_namespaceObject.Tooltip, {
					text: user.tag,
					position: "top",
					tooltipClassName: styles.Z.tooltip
				}, (props => external_BdApi_React_default().createElement("div", {
					className: apis_mutualFriends.Z.mutualFriend,
					onMouseOver: () => (setMouseOver(true), props.onMouseEnter()),
					onMouseLeave: () => (setMouseOver(false), props.onMouseLeave()),
					onClick: () => {
						UserProfileModal.openUserProfileModal({
							userId: user.id,
							guildId: stores_namespaceObject.SelectedGuilds.getGuildId()
						});
						ComponentDispatch.dispatchToLastSubscribed("POPOUT_CLOSE");
					}
				}, external_BdApi_React_default().createElement(AnimatedAvatar, {
					status: stores_namespaceObject.Status.getStatus(user.id),
					size: Sizes.SIZE_32,
					src: user.getAvatarURL(stores_namespaceObject.SelectedGuilds.getGuildId(), 32, isMouseOver && isWindowFocused)
				}))));
			}
			function MutualFriends({
				user
			}) {
				const settings = useSettings({
					showMutualFriends: true,
					hideMutualFriendsCurrentUser: true,
					showEmptyMutualFriends: true,
					stackMutualFriends: false
				});
				if (!settings.showMutualFriends || settings.hideMutualFriendsCurrentUser && user.id === stores_namespaceObject.Users.getCurrentUser().id) return null;
				const mutualFriends = (0, flux_namespaceObject.useStateFromStores)([stores_namespaceObject.UserProfile], (() => stores_namespaceObject.UserProfile.getMutualFriends(user.id)));
				(0, external_BdApi_React_.useEffect)((() => {
					if (Array.isArray(mutualFriends)) return;
					modules_namespaceObject.Dispatcher.wait((() => actions_namespaceObject.ProfileActions.fetchMutualFriends(user.id)));
				}), []);
				return Array.isArray(mutualFriends) ? mutualFriends.length ? external_BdApi_React_default().createElement("div", {
					className: external_PluginApi_namespaceObject.Utilities.className(apis_mutualFriends.Z.body, styles.Z.body)
				}, external_BdApi_React_default().createElement(mutualFriends_Heading, {
					level: 3,
					variant: "eyebrow",
					className: apis_mutualFriends.Z.header,
					uppercase: true,
					muted: true
				}, i18n_namespaceObject.Messages.MUTUAL_FRIENDS), external_BdApi_React_default().createElement("div", {
					className: (0, utils_namespaceObject.joinClassNames)(apis_mutualFriends.Z.friends, settings.stackMutualFriends && apis_mutualFriends.Z.stack)
				}, mutualFriends.map((props => external_BdApi_React_default().createElement(MutualFriend, props))))) : settings.showEmptyMutualFriends && external_BdApi_React_default().createElement(mutualFriends_Heading, {
					level: 3,
					variant: "eyebrow",
					className: apis_mutualFriends.Z.header,
					uppercase: true,
					muted: true
				}, Strings.get("NO_MUTUAL_FRIENDS")) : external_BdApi_React_default().createElement(mutualFriends_Heading, {
					level: 3,
					variant: "eyebrow",
					className: apis_mutualFriends.Z.header,
					uppercase: true,
					muted: true
				}, Strings.get("LOADING_MUTUAL_FRIENDS"));
			}
			var mutualServers = __webpack_require__(416);
			const FriendsStore = external_PluginApi_namespaceObject.WebpackModules.getByProps("getMutualGuilds");
			const {
				Heading: mutualServers_Heading
			} = external_PluginApi_namespaceObject.WebpackModules.getByProps("Heading") ?? {
				Heading: () => null
			};
			const mutualServers_WindowStore = external_PluginApi_namespaceObject.WebpackModules.getByProps("isFocused");
			function MutualServer({
				guild,
				nick,
				onClick
			}) {
				const [isMouseOver, setMouseOver] = (0, external_BdApi_React_.useState)(false);
				const isWindowFocused = (0, flux_namespaceObject.useStateFromStores)([mutualServers_WindowStore], (() => mutualServers_WindowStore.isFocused()));
				return external_BdApi_React_default().createElement(components_namespaceObject.TooltipContainer, {
					key: guild.id,
					text: nick ? `${guild.name} (${nick})` : guild.name,
					position: "top",
					className: mutualServers.Z.mutualGuild,
					tooltipClassName: styles.Z.tooltip
				}, guild.icon ? external_BdApi_React_default().createElement("img", {
					onMouseOver: () => setMouseOver(true),
					onMouseLeave: () => setMouseOver(false),
					src: guild.getIconURL(128, isMouseOver && isWindowFocused),
					onClick: () => onClick(guild.id)
				}) : external_BdApi_React_default().createElement("div", {
					className: mutualServers.Z.guildAcronym,
					onClick: () => onClick(guild.id)
				}, guild.acronym));
			}
			function MutualServers({
				user
			}) {
				const settings = useSettings({
					showMutualGuilds: true,
					hideMutualGuildsCurrentUser: true,
					stackMutualServers: false,
					showEmptyMutualGuilds: true
				});
				if (!settings.showMutualGuilds || settings.hideMutualGuildsCurrentUser && user.id === stores_namespaceObject.Users.getCurrentUser().id) return null;
				const mutualGuilds = (0, flux_namespaceObject.useStateFromStores)([FriendsStore], (() => FriendsStore.getMutualGuilds(user.id)));
				const [message, setMessage] = (0, external_BdApi_React_.useState)("");
				(0, external_BdApi_React_.useEffect)((() => {
					if (Array.isArray(mutualGuilds) || stores_namespaceObject.UserProfile.isFetching(user.id)) return;
					modules_namespaceObject.Dispatcher.wait((() => {
						actions_namespaceObject.ProfileActions.fetchProfile(user.id).catch((error => {
							if (~error?.message?.indexOf("Already dispatching")) return;
							external_PluginApi_namespaceObject.Logger.error(`Failed to fetch profile for ${user.id}:\n`, error);
							setMessage(Strings.get("FAILED_TO_FETCH"));
						}));
					}));
				}), []);
				return Array.isArray(mutualGuilds) ? mutualGuilds.length ? external_BdApi_React_default().createElement("div", {
					className: external_PluginApi_namespaceObject.Utilities.className(mutualServers.Z.body, styles.Z.body)
				}, external_BdApi_React_default().createElement(mutualServers_Heading, {
					level: 3,
					variant: "eyebrow",
					className: mutualServers.Z.header,
					uppercase: true,
					muted: true
				}, i18n_namespaceObject.Messages.MUTUAL_GUILDS), external_BdApi_React_default().createElement("div", {
					className: (0, utils_namespaceObject.joinClassNames)(mutualServers.Z.guilds, settings.stackMutualServers && mutualServers.Z.stack)
				}, mutualGuilds.map((props => external_BdApi_React_default().createElement(MutualServer, Object.assign({}, props, {
					onClick: actions_namespaceObject.GuildActions.transitionToGuildSync
				})))))) : settings.showEmptyMutualGuilds && external_BdApi_React_default().createElement(mutualServers_Heading, {
					level: 3,
					variant: "eyebrow",
					className: mutualServers.Z.header,
					uppercase: true,
					muted: true
				}, Strings.get("NO_MUTUAL_GUILDS")) : external_BdApi_React_default().createElement(external_BdApi_React_default().Fragment, null, external_BdApi_React_default().createElement(mutualServers_Heading, {
					level: 3,
					variant: "eyebrow",
					className: mutualServers.Z.header,
					uppercase: true,
					muted: true
				}, Strings.get(message ? "NO_MUTUAL_GUILDS" : "LOADING_MUTUAL_GUILDS")), message && external_BdApi_React_default().createElement(components_namespaceObject.TooltipContainer, {
					text: message,
					position: "top"
				}, external_BdApi_React_default().createElement(error, null)));
			}
			var React = __webpack_require__(113);
			const spotify = props => React.createElement("svg", Object.assign({}, props, {
				width: "20",
				height: "20",
				viewBox: "0 0 65 65"
			}), React.createElement("path", {
				fill: "#1ED760",
				d: "M32.5,0.5 C14.826888,0.5 0.5,14.826888 0.5,32.5 C0.5,50.173112 14.826888,64.5 32.5,64.5 C50.173112,64.5 64.5,50.173112 64.5,32.5 C64.5,14.826888 50.173112,0.5 32.5,0.5 Z M47.18,46.66 C46.6031412,47.595466 45.3795381,47.8902025 44.44,47.32 C36.93,42.73 27.44,41.69 16.33,44.23 C15.6145818,44.4464575 14.8381683,44.245926 14.3170501,43.7100969 C13.7959319,43.1742677 13.6170868,42.3925738 13.8533716,41.6834571 C14.0896564,40.9743403 14.7016337,40.4561564 15.44,40.34 C27.63,37.55 38.09,38.75 46.52,43.91 C47.4615306,44.487221 47.7569974,45.7183323 47.18,46.66 Z M51.1,37.95 C50.3770773,39.1205793 48.8441907,39.487042 47.67,38.77 C39.07,33.48 25.96,31.95 15.78,35.04 C14.9279216,35.2990176 14.0023844,35.0837812 13.3520294,34.4753684 C12.7016744,33.8669556 12.425306,32.9577988 12.6270294,32.0903684 C12.8287528,31.2229381 13.4779216,30.5290176 14.33,30.27 C25.95,26.74 40.4,28.45 50.28,34.52 C51.445766,35.2424019 51.8079122,36.7714637 51.09,37.94 L51.1,37.95 Z M51.44,28.88 C41.13,22.75 24.11,22.19 14.26,25.18 C13.2140022,25.5702637 12.0378133,25.3474036 11.207084,24.6015444 C10.3763547,23.8556852 10.0285164,22.7102178 10.3042349,21.6283692 C10.5799535,20.5465206 11.4336155,19.707266 12.52,19.45 C23.82,16.02 42.61,16.68 54.52,23.73 C55.8401426,24.6185116 56.2368626,26.3831995 55.4240137,27.7512295 C54.6111649,29.1192595 52.8715856,29.6146124 51.46,28.88 L51.44,28.88 Z"
			}));
			var twitch_React = __webpack_require__(113);
			const twitch = props => twitch_React.createElement("svg", Object.assign({
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
			var youtube_React = __webpack_require__(113);
			const youtube = props => youtube_React.createElement("svg", Object.assign({
				height: "20",
				width: "20",
				viewBox: "0 0 576 512"
			}, props), youtube_React.createElement("path", {
				fill: "#FF1A1A",
				d: "M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z"
			}));
			var gamepad_React = __webpack_require__(113);
			const gamepad = props => gamepad_React.createElement("svg", Object.assign({
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
			var components_activity = __webpack_require__(755);
			var googleChrome_React = __webpack_require__(113);
			const googleChrome = props => googleChrome_React.createElement("svg", Object.assign({
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
			var activity_React = __webpack_require__(113);
			const byName = [
				[/spotify/i, spotify],
				[/youtube/i, () => activity_React.createElement("img", {
					src: connections_default().get("youtube").icon.darkSVG,
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
				} = (0, flux_namespaceObject.useStateFromStoresObject)([stores_namespaceObject.Games, modules_Settings], (() => ({
					showGamepad: modules_Settings.get("showGamepad", true),
					game: stores_namespaceObject.Games.getGame(activity.application_id)
				})), [activity]);
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
					showActivityIcons,
					disabled
				} = (0, flux_namespaceObject.useStateFromStoresObject)([stores_namespaceObject.Status, modules_Settings], (() => ({
					activity: stores_namespaceObject.Status.getActivities(user.id).filter(ActivitiesFilter)[0],
					showActivityIcons: modules_Settings.get("activityIcons", true),
					disabled: user?.bot && modules_Settings.get("disableIconsForBots", true)
				})), [user]);
				if (!showActivityIcons || !activity || disabled) return null;
				return activity_React.createElement(components_namespaceObject.TooltipContainer, {
					text: activity.name,
					className: components_activity.Z.container,
					position: "left"
				}, activity_React.createElement(ActivityIcon, {
					className: components_activity.Z.icon,
					activity
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
						fill: "#f04747"
					}) : external_BdApi_React_default().createElement("div", null, external_BdApi_React_default().createElement("span", null, "An error has occured while rendering ", this.props.id, "."), external_BdApi_React_default().createElement("span", null, "Open console (", external_BdApi_React_default().createElement("code", null, "Ctrl + shift + i / Cmd + shift + i"), ') - Select the "Console" tab and screenshot the big red error.'));
					else return this.props.children;
				}
			}
			var headphones_React = __webpack_require__(113);
			const headphones = props => headphones_React.createElement("svg", Object.assign({
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
			var memberroles_React = __webpack_require__(113);
			const textNames = new Set(["Text", "LegacyText"]);
			const Text = external_PluginApi_namespaceObject.WebpackModules.getModule((m => textNames.has(m.displayName)));
			const {
				default: MemberRolesList
			} = external_PluginApi_namespaceObject.WebpackModules.getByProps("MemberRole") ?? {
				default: () => null
			};
			const classes = Utilities.makeLazy((() => external_PluginApi_namespaceObject.WebpackModules.getByProps("userInfoSectionHeader")));
			const {
				Heading: memberroles_Heading
			} = external_PluginApi_namespaceObject.WebpackModules.getByProps("Heading") ?? {
				Heading: () => null
			};
			function MemberRolesSection({
				userId,
				guildId = stores_namespaceObject.SelectedGuilds.getGuildId()
			}) {
				const roles = (0, flux_namespaceObject.useStateFromStoresArray)([stores_namespaceObject.Members], (() => stores_namespaceObject.Members.getMember(guildId, userId)?.roles));
				const guild = (0, flux_namespaceObject.useStateFromStores)([stores_namespaceObject.Guilds], (() => stores_namespaceObject.Guilds.getGuild(guildId)));
				const user = (0, flux_namespaceObject.useStateFromStores)([stores_namespaceObject.Users], (() => stores_namespaceObject.Users.getUser(userId)));
				if (!roles || !guild || !user) return null;
				return memberroles_React.createElement(ErrorBoundary, {
					id: "MemberRolesSection"
				}, memberroles_React.createElement("div", {
					className: (0, utils_namespaceObject.joinClassNames)(classes()?.userInfoSection, Text?.Colors?.STANDARD)
				}, memberroles_React.createElement(memberroles_Heading, {
					level: 3,
					variant: "eyebrow",
					uppercase: true,
					className: classes()?.userInfoSectionHeader
				}, i18n_namespaceObject.Messages.ROLES_LIST.format({
					numRoles: roles.length
				})), memberroles_React.createElement(MemberRolesList, {
					guild,
					user,
					userRoles: roles
				})));
			}
			const pages_namespaceObject = JSON.parse('[{"name":"General","icon":"Wrench","items":[{"type":"switch","name":"Use Icons","note":"Defines if icons should be used to show any date.","id":"useIcons","value":true},{"type":"radio","name":"Time Format","value":1,"id":"12hour","options":[{"value":1,"name":"24 hour"},{"value":0,"name":"12 hour"}]},{"type":"divider"},{"type":"category","name":"Variables","items":[{"type":"replacement","prefix":"$timelabel","description":"Replaces the current time label. eg AM or PM."},{"type":"replacement","prefix":"$ago","description":"Replaces with a dynamic \\"ago\\" string. Example: \\"3 and a half years\\""},{"type":"replacement","prefix":"$day","description":"Replaces the current day."},{"type":"replacement","prefix":"$daysago","description":"Replaces with a number of how many days it\'s ago."},{"type":"replacement","prefix":"$dayname","description":"Replaces the shorted dayname."},{"type":"replacement","prefix":"$weeksago","description":"Replaces with a number of how many weeks it\'s ago."},{"type":"replacement","prefix":"$month","description":"Replaces the month."},{"type":"replacement","prefix":"$monthname","description":"Replaces the shorted monthname."},{"type":"replacement","prefix":"$monthsago","description":"Replaces with a number of how many months it\'s ago."},{"type":"replacement","prefix":"$year","description":"Replaces the year."},{"type":"replacement","prefix":"$yearsago","description":"Replaces with a number of how many years it\'s ago."},{"type":"replacement","prefix":"$hour","description":"Replaces the hour(s)"},{"type":"replacement","prefix":"$minute","description":"Replaces the minute(s)"},{"type":"replacement","prefix":"$second","description":"Replaces the second(s)"}]}]},{"name":"Panel Popout","icon":"User","added":"2021-10-14T22:00:00.000Z","items":[{"type":"switch","name":"Enable","id":"showPanelPopout","value":true},{"type":"radio","name":"Open on","id":"panelPopoutType","value":"click","options":[{"name":"Right Click","value":"contextmenu"},{"name":"Left Click","value":"click"}]}]},{"name":"Created At","icon":"Cake","items":[{"type":"switch","name":"Show in UserPopout","id":"created_show_up","note":"Defines if the creation date should be shown in the UserPopout.","value":true},{"type":"switch","name":"Show in UserProfile","id":"created_show_profile","note":"Defines if the creation date should be shown in the UserProfile.","value":true},{"type":"text","name":"Created At","note":"Format of the Created at date. Read the variables section in the general settings to understand how it works.","id":"created_format","value":"Created At: $hour:$minute:$second, $day.$month.$year $daysago days"}]},{"name":"Joined At","icon":"Calendar","items":[{"type":"switch","name":"Show in UserPopout","id":"joined_show_up","note":"Defines if the joined date should be shown in the UserPopout.","value":true},{"type":"switch","name":"Show in UserProfile","id":"joined_show_profile","note":"Defines if the joined date should be shown in the UserProfile.","value":true},{"type":"text","name":"Joined At","note":"Format of the joined at date. Read the variables section in the general settings to understand how it works.","id":"joined_format","value":"Joined At: $hour:$minute:$second, $day.$month.$year $daysago days"}]},{"name":"Last Message At","icon":"TextBubble","items":[{"type":"switch","name":"Show in UserPopout","id":"lastmessage_show_up","note":"Defines if the last message date should be shown in the UserPopout.","value":true},{"type":"switch","name":"Show in UserProfile","id":"lastmessage_show_profile","note":"Defines if the last message date should be shown in the UserProfile.","value":true},{"type":"text","name":"Last Message","note":"Format of the LastMessage at date. Read the variables section in the general settings to understand how it works.","id":"lastmessage_format","value":"Last Message At: $hour:$minute:$second, $day.$month.$year $daysago days"}]},{"name":"Connections","icon":"Chain","items":[{"type":"switch","name":"Enable Section","note":"Enables this section in the user popout.","id":"showConnectionsSection","value":true},{"type":"switch","name":"Colored Icons","note":"Colored/White icons for the connections.","id":"coloredConnectionsIcons","value":true},{"type":"switch","name":"Show Empty","note":"Show a \\"NO CONNECTIONS\\" placeholder if the user has no connections.","id":"showEmptyConnections","value":true},{"type":"switch","name":"Show Verified","note":"Shows a little verified badge below the icon if the connection is verified.","id":"showVerifiedConnections","value":true},{"type":"icons"}]},{"name":"Activity Icons","icon":"GamePad","items":[{"type":"switch","name":"Enable Activity Icons","note":null,"id":"activityIcons","value":true},{"type":"switch","name":"Disable Bots","note":"Disables the icon for bots, since the most always have something with \'Playing: {...}\' in their statuses.","id":"disableIconsForBots","value":true},{"type":"radio","name":"Activity Icon State","note":"Replaces the activity icon in the activity text of the member list.","id":"activityIconState","value":0,"disabled":false,"options":[{"name":"Replace with associated icon","value":0},{"name":"Don\'t do anything","value":1},{"name":"Hide it","value":2}]},{"type":"switch","name":"Show Gamepad","note":"This shows a gamepad icon if an icon for the activity isn\'t available.","id":"showGamepad","value":true}]},{"name":"Profile Roles","icon":"Profile","added":"2021-10-05T22:00:00.000Z","items":[{"type":"switch","name":"Enable","note":"Adds the roles section (if available) to the profile modal.","id":"profileRoles","value":true}]},{"name":"Mutual Friends","icon":"Friends","added":"2021-10-15T18:59:12.897Z","items":[{"type":"switch","name":"Enable","note":"Adds the mutuals friends section to the user popout.","id":"showMutualFriends","value":true},{"type":"switch","name":"Disable for yourself","note":"Disables the mutual friends section for you.","id":"hideMutualFriendsCurrentUser","value":true},{"type":"switch","name":"Show empty message","note":"This defines if an empty message \'no mutual friends\' should be shown if the user has no mutual friends with you","id":"showEmptyMutualFriends","value":true},{"type":"switch","name":"Stack Icons","note":"Stacks the icons so it takes less space.","id":"stackMutualFriends","value":false}]},{"name":"Mutual Servers","icon":"Mutual","items":[{"type":"switch","name":"Enable Mutual Servers","note":"This enables/disables the mutual servers section in the user popout","id":"showMutualGuilds","value":true},{"type":"switch","name":"Disable for yourself","note":"Disables the mutual servers section for you. (it will just show all your guilds)","id":"hideMutualGuildsCurrentUser","value":true},{"type":"switch","name":"Show empty message","note":"This defines if an empty message \'no mutual servers\' should be shown if the user has no mutual servers with you","id":"showEmptyMutualGuilds","value":true},{"type":"switch","name":"Stack Icons","note":"Stacks the icons so it takes less space.","id":"stackMutualServers","value":false}]},{"name":"Translation Credits","icon":"Language","items":[{"type":"translation","name":"Turkish","id":"tr","note":"@IMaWeebツ#6931"},{"type":"translation","name":"English","id":"en-US","note":"@It\'s Rad, Not Red#0001"},{"type":"translation","name":"German","id":"de","note":"@l0c4lh057#9748, @SteffoSpieler#1868"},{"type":"translation","name":"Dutch","id":"nl","note":"@th0masterharambe#0001"},{"type":"translation","name":"Vietnamese","id":"vi","note":"@MH#5893"},{"type":"translation","name":"Spanish","id":"es-ES","note":"@DrPuc##2048"},{"type":"translation","name":"Swedish","id":"sv-SE","note":"@toatl#7460"},{"type":"translation","name":"Portuguese (Brazil)","id":"pt-BR","note":"@Dominic#1111"},{"type":"translation","name":"French","id":"fr","note":"@LemCent321#1663"}]}]');
			var settings = __webpack_require__(128);
			const forms_namespaceObject = Modules["@discord/forms"];
			const chain = props => external_BdApi_React_default().createElement("svg", Object.assign({
				viewBox: "0 0 512 512",
				width: "24",
				height: "24"
			}, props), external_BdApi_React_default().createElement("path", {
				d: "M326.612 185.391c59.747 59.809 58.927 155.698.36 214.59-.11.12-.24.25-.36.37l-67.2 67.2c-59.27 59.27-155.699 59.262-214.96 0-59.27-59.26-59.27-155.7 0-214.96l37.106-37.106c9.84-9.84 26.786-3.3 27.294 10.606.648 17.722 3.826 35.527 9.69 52.721 1.986 5.822.567 12.262-3.783 16.612l-13.087 13.087c-28.026 28.026-28.905 73.66-1.155 101.96 28.024 28.579 74.086 28.749 102.325.51l67.2-67.19c28.191-28.191 28.073-73.757 0-101.83-3.701-3.694-7.429-6.564-10.341-8.569a16.037 16.037 0 0 1-6.947-12.606c-.396-10.567 3.348-21.456 11.698-29.806l21.054-21.055c5.521-5.521 14.182-6.199 20.584-1.731a152.482 152.482 0 0 1 20.522 17.197zM467.547 44.449c-59.261-59.262-155.69-59.27-214.96 0l-67.2 67.2c-.12.12-.25.25-.36.37-58.566 58.892-59.387 154.781.36 214.59a152.454 152.454 0 0 0 20.521 17.196c6.402 4.468 15.064 3.789 20.584-1.731l21.054-21.055c8.35-8.35 12.094-19.239 11.698-29.806a16.037 16.037 0 0 0-6.947-12.606c-2.912-2.005-6.64-4.875-10.341-8.569-28.073-28.073-28.191-73.639 0-101.83l67.2-67.19c28.239-28.239 74.3-28.069 102.325.51 27.75 28.3 26.872 73.934-1.155 101.96l-13.087 13.087c-4.35 4.35-5.769 10.79-3.783 16.612 5.864 17.194 9.042 34.999 9.69 52.721.509 13.906 17.454 20.446 27.294 10.606l37.106-37.106c59.271-59.259 59.271-155.699.001-214.959z"
			}));
			const wrench = props => external_BdApi_React_default().createElement("svg", Object.assign({}, props, {
				viewBox: "0 0 512 512",
				height: "24",
				width: "24"
			}), external_BdApi_React_default().createElement("path", {
				d: "M501.1 395.7L384 278.6c-23.1-23.1-57.6-27.6-85.4-13.9L192 158.1V96L64 0 0 64l96 128h62.1l106.6 106.6c-13.6 27.8-9.2 62.3 13.9 85.4l117.1 117.1c14.6 14.6 38.2 14.6 52.7 0l52.7-52.7c14.5-14.6 14.5-38.2 0-52.7zM331.7 225c28.3 0 54.9 11 74.9 31l19.4 19.4c15.8-6.9 30.8-16.5 43.8-29.5 37.1-37.1 49.7-89.3 37.9-136.7-2.2-9-13.5-12.1-20.1-5.5l-74.4 74.4-67.9-11.3L334 98.9l74.4-74.4c6.6-6.6 3.4-17.9-5.7-20.2-47.4-11.7-99.6.9-136.6 37.9-28.5 28.5-41.9 66.1-41.2 103.6l82.1 82.1c8.1-1.9 16.5-2.9 24.7-2.9zm-103.9 82l-56.7-56.7L18.7 402.8c-25 25-25 65.5 0 90.5s65.5 25 90.5 0l123.6-123.6c-7.6-19.9-9.9-41.6-5-62.7zM64 472c-13.2 0-24-10.8-24-24 0-13.3 10.7-24 24-24s24 10.7 24 24c0 13.2-10.7 24-24 24z"
			}));
			var valorant_React = __webpack_require__(113);
			const valorant = props => valorant_React.createElement("svg", Object.assign({
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
			var language_React = __webpack_require__(113);
			const language = props => language_React.createElement("svg", Object.assign({
				xmlns: "http://www.w3.org/2000/svg",
				height: "24px",
				viewBox: "0 0 24 24",
				width: "24px",
				fill: "currentColor"
			}, props), language_React.createElement("path", {
				d: "M21 4H11l-1-3H3c-1.1 0-2 .9-2 2v15c0 1.1.9 2 2 2h8l1 3h9c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zM7 16c-2.76 0-5-2.24-5-5s2.24-5 5-5c1.35 0 2.48.5 3.35 1.3L9.03 8.57c-.38-.36-1.04-.78-2.03-.78-1.74 0-3.15 1.44-3.15 3.21S5.26 14.21 7 14.21c2.01 0 2.84-1.44 2.92-2.41H7v-1.71h4.68c.07.31.12.61.12 1.02C11.8 13.97 9.89 16 7 16zm6.17-5.42h3.7c-.43 1.25-1.11 2.43-2.05 3.47-.31-.35-.6-.72-.86-1.1l-.79-2.37zm8.33 9.92c0 .55-.45 1-1 1H14l2-2.5-1.04-3.1 3.1 3.1.92-.92-3.3-3.25.02-.02c1.13-1.25 1.93-2.69 2.4-4.22H20v-1.3h-4.53V8h-1.29v1.29h-1.44L11.46 5.5h9.04c.55 0 1 .45 1 1v14z"
			}), language_React.createElement("path", {
				d: "M0 0h24v24H0zm0 0h24v24H0z",
				fill: "none"
			}));
			var mutual_React = __webpack_require__(113);
			const mutual = props => mutual_React.createElement("svg", Object.assign({
				xmlns: "http://www.w3.org/2000/svg",
				height: "24px",
				viewBox: "0 0 24 24",
				width: "24px",
				fill: "currentColor"
			}, props), mutual_React.createElement("g", null, mutual_React.createElement("rect", {
				fill: "none",
				height: "24",
				width: "24",
				x: "0"
			})), mutual_React.createElement("g", null, mutual_React.createElement("g", null, mutual_React.createElement("g", null, mutual_React.createElement("path", {
				d: "M9.01,14H2v2h7.01v3L13,15l-3.99-4V14z M14.99,13v-3H22V8h-7.01V5L11,9L14.99,13z"
			})))));
			var user_React = __webpack_require__(113);
			const user = props => user_React.createElement("svg", Object.assign({
				width: "24",
				height: "24",
				role: "img",
				xmlns: "http://www.w3.org/2000/svg",
				viewBox: "0 0 448 512"
			}, props), user_React.createElement("path", {
				fill: "currentColor",
				d: "M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"
			}));
			var friends_React = __webpack_require__(113);
			const friends = props => friends_React.createElement("svg", Object.assign({
				width: "24",
				height: "24",
				viewBox: "0 0 640 512"
			}, props), friends_React.createElement("g", null, friends_React.createElement("path", {
				fill: "currentColor",
				d: "M480 256a96 96 0 1 0-96-96 96 96 0 0 0 96 96zm48 32h-3.8c-13.9 4.8-28.6 8-44.2 8s-30.3-3.2-44.2-8H432c-20.4 0-39.2 5.9-55.7 15.4 24.4 26.3 39.7 61.2 39.7 99.8v38.4c0 2.2-.5 4.3-.6 6.4H592a48 48 0 0 0 48-48 111.94 111.94 0 0 0-112-112z"
			}), friends_React.createElement("path", {
				fill: "currentColor",
				d: "M192 256A112 112 0 1 0 80 144a111.94 111.94 0 0 0 112 112zm76.8 32h-8.3a157.53 157.53 0 0 1-68.5 16c-24.6 0-47.6-6-68.5-16h-8.3A115.23 115.23 0 0 0 0 403.2V432a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48v-28.8A115.23 115.23 0 0 0 268.8 288z"
			})));
			var profile_React = __webpack_require__(113);
			const profile = props => profile_React.createElement("svg", Object.assign({
				width: "24",
				height: "24",
				viewBox: "0 0 384 512"
			}, props), profile_React.createElement("path", {
				fill: "currentColor",
				d: "M224 136V0H24C10.7 0 0 10.7 0 24v464c0 13.3 10.7 24 24 24h336c13.3 0 24-10.7 24-24V160H248c-13.2 0-24-10.8-24-24zm80 273.6v19.2c0 10.61-10.03 19.2-22.4 19.2H102.4c-12.37 0-22.4-8.6-22.4-19.2v-19.2c0-31.81 30.09-57.6 67.2-57.6h4.95c12.29 5.12 25.73 8 39.85 8s27.56-2.88 39.85-8h4.95c37.11 0 67.2 25.79 67.2 57.6zM192 320c-35.35 0-64-28.65-64-64s28.65-64 64-64 64 28.65 64 64-28.65 64-64 64zm185-215L279.1 7c-4.5-4.5-10.6-7-17-7H256v128h128v-6.1c0-6.3-2.5-12.4-7-16.9z"
			}));
			var icons_React = __webpack_require__(113);
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
				Headphones: headphones,
				Language: language,
				Mutual: mutual,
				User: user,
				Friends: friends,
				Profile: profile
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
			const RadioGroup = Utilities.createUpdateWrapper(external_PluginApi_namespaceObject.WebpackModules.getByDisplayName("RadioGroup"));
			const SwitchItem = Utilities.createUpdateWrapper(external_PluginApi_namespaceObject.WebpackModules.getByDisplayName("SwitchItem"), false);
			const TextInput = Utilities.createUpdateWrapper(external_PluginApi_namespaceObject.WebpackModules.getByDisplayName("TextInput"));
			const BadgesModule = external_PluginApi_namespaceObject.WebpackModules.getByProps("TextBadge");
			const breadCrumbs = external_PluginApi_namespaceObject.WebpackModules.getByProps("breadcrumbActive");
			const {
				marginBottom8: settings_marginBottom8
			} = external_PluginApi_namespaceObject.WebpackModules.getByProps("marginBottom8");
			const Breadcrumbs = external_PluginApi_namespaceObject.WebpackModules.getByDisplayName("Breadcrumbs");
			const {
				default: CardItem
			} = external_PluginApi_namespaceObject.WebpackModules.find((m => m?.default?.toString().indexOf("hasNextSection") > -1)) ?? {
				default: () => null
			};
			const Card = external_PluginApi_namespaceObject.WebpackModules.getByDisplayName("Card");
			const Caret = external_PluginApi_namespaceObject.WebpackModules.getByDisplayName("Caret");
			const Clickable = external_PluginApi_namespaceObject.WebpackModules.getByDisplayName("Clickable");
			const FlagsStore = external_PluginApi_namespaceObject.WebpackModules.getModule((m => "function" === typeof m.keys && m.resolve && m.keys().some((e => e.includes("en-US")))));
			const TextItem = ({
				value,
				onChange,
				name,
				note
			}) => external_BdApi_React_default().createElement(components_namespaceObject.Flex, {
				className: settings_marginBottom8,
				direction: components_namespaceObject.Flex.Direction.VERTICAL
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
				const colored = (0, flux_namespaceObject.useStateFromStores)([modules_Settings], (() => modules_Settings.get("coloredConnectionsIcons", true)));
				const forceUpdate = Utilities.useForceUpdate();
				const shownIcons = (0, flux_namespaceObject.useStateFromStores)([modules_Settings], (() => modules_Settings.get("shownConnections", Object.fromEntries(connections_default().map((e => [e.type, true]))))));
				return external_BdApi_React_default().createElement(components_namespaceObject.Flex, {
					className: settings.Z.icons
				}, connections_default().filter((e => e.enabled)).map((k => external_BdApi_React_default().createElement(components_namespaceObject.TooltipContainer, {
					className: settings.Z.settingsBadgeContainer,
					text: shownIcons[k.type] ? "Enabled" : "Disabled",
					hideOnClick: false
				}, external_BdApi_React_default().createElement("img", {
					src: k.icon[Utilities.getIconURL(k.type, colored)],
					className: Utilities.joinClassNames(settings.Z.settingsBadgeIcon, shownIcons[k.type] ? "enabled" : settings.Z.disabled),
					onClick: () => {
						modules_Settings.set("shownConnections", (shownIcons[k.type] = !shownIcons[k.type],
							shownIcons));
						forceUpdate();
					}
				})))));
			};
			const Translation = ({
				name,
				note,
				id
			}) => {
				const icon = (0, external_BdApi_React_.useMemo)((() => {
					try {
						return external_BdApi_React_default().createElement("img", {
							src: FlagsStore("./" + id + ".png"),
							className: (0, utils_namespaceObject.joinClassNames)(settings.Z.translation, settings.Z.marginBottom8)
						});
					} catch {
						return null;
					}
				}), [id]);
				return external_BdApi_React_default().createElement(external_BdApi_React_default().Fragment, null, external_BdApi_React_default().createElement(components_namespaceObject.Flex, {
					direction: components_namespaceObject.Flex.Direction.HORIZONTAL,
					justify: components_namespaceObject.Flex.Justify.BETWEEN,
					align: components_namespaceObject.Flex.Align.CENTER,
					className: settings.Z.descriptionItem
				}, icon, external_BdApi_React_default().createElement(forms_namespaceObject.FormTitle, {
					tag: forms_namespaceObject.FormTitle.Tags.H5
				}, name), external_BdApi_React_default().createElement(components_namespaceObject.Flex, {
					justify: components_namespaceObject.Flex.Justify.END,
					align: components_namespaceObject.Flex.Align.START,
					className: settings.Z.marginBottom8
				}, external_BdApi_React_default().createElement(forms_namespaceObject.FormText, null, note))), external_BdApi_React_default().createElement(forms_namespaceObject.FormDivider, null));
			};
			const Category = props => {
				const [opened, setOpened] = (0, external_BdApi_React_.useState)(false);
				return external_BdApi_React_default().createElement(Card, {
					className: Utilities.joinClassNames(settings.Z.category, opened && settings.Z.opened)
				}, external_BdApi_React_default().createElement(Clickable, {
					onClick: () => setOpened(!opened)
				}, external_BdApi_React_default().createElement(components_namespaceObject.Flex, {
					className: settings.Z.categoryHeader,
					direction: components_namespaceObject.Flex.Direction.HORIZONTAL
				}, props.name, external_BdApi_React_default().createElement(Caret, {
					className: settings.Z.categoryCaret,
					direction: Caret.Directions[opened ? "DOWN" : "LEFT"]
				}))), external_BdApi_React_default().createElement("div", {
					className: settings.Z.categoryContent
				}, opened && props.items.map(renderSetting)));
			};
			const renderSetting = setting => {
				setting = _.cloneDeep(setting);
				switch (setting.type) {
					case "switch":
						return external_BdApi_React_default().createElement(SwitchItem, Object.assign({}, setting, {
							value: modules_Settings.get(setting.id, setting.value),
							onChange: modules_Settings.set.bind(modules_Settings, setting.id)
						}), setting.name);
					case "replacement":
						return external_BdApi_React_default().createElement(components_namespaceObject.Flex, {
							direction: components_namespaceObject.Flex.Direction.HORIZONTAL,
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
							type: "description",
							className: settings.Z.marginBottom8
						}, note), external_BdApi_React_default().createElement(RadioGroup, Object.assign({}, setting, {
							value: modules_Settings.get(setting.id, setting.value),
							onChange: modules_Settings.set.bind(modules_Settings, setting.id)
						})));
					case "text":
						return external_BdApi_React_default().createElement(TextItem, Object.assign({}, setting, {
							value: modules_Settings.get(setting.id, setting.value),
							onChange: modules_Settings.set.bind(modules_Settings, setting.id)
						}));
					case "icons":
						return external_BdApi_React_default().createElement(IconSetting, null);
					case "category":
						return external_BdApi_React_default().createElement(Category, setting);
					case "translation":
						return external_BdApi_React_default().createElement(Translation, setting);
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
				label: "Modules"
			}];
			function SettingsPanel() {
				const [activeItem, setActiveItem] = (0, external_BdApi_React_.useState)("main");
				return external_BdApi_React_default().createElement(ErrorBoundary, {
					id: "SettingsPanel"
				}, external_BdApi_React_default().createElement("div", {
					className: settings.Z.settingsPanel
				}, external_BdApi_React_default().createElement(components_namespaceObject.Flex, {
					align: components_namespaceObject.Flex.Align.CENTER,
					basis: "auto",
					className: breadCrumbs.breadcrumbs,
					grow: 1,
					shrink: 1
				}, "main" === activeItem ? external_BdApi_React_default().createElement(forms_namespaceObject.FormTitle, {
					className: breadCrumbs.breakcrumb,
					tag: forms_namespaceObject.FormTitle.Tags.H2
				}, "Modules") : external_BdApi_React_default().createElement(Breadcrumbs, {
					activeId: activeItem,
					breadcrumbs: mainPages.concat({
						id: activeItem,
						label: pages_namespaceObject[activeItem].name
					}),
					renderCustomBreadcrumb: renderCustomcrumb,
					onBreadcrumbClick: e => setActiveItem(e.id)
				})), "main" === activeItem ? pages_namespaceObject.map(((page, index) => external_BdApi_React_default().createElement("div", {
					className: settings.Z.cardItem
				}, external_BdApi_React_default().createElement(CardItem, {
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
				}), daysAgo(new Date, new Date(page.added)) < 60 && null != page.added && external_BdApi_React_default().createElement(BadgesModule.TextBadge, {
					text: i18n_namespaceObject.Messages.NEW,
					color: constants_namespaceObject.Colors.STATUS_RED_500,
					className: settings.Z.textBadge
				})))) : pages_namespaceObject[activeItem].items.map(renderSetting)));
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
				get Stores() {
					return modules_stores_namespaceObject;
				}
				get Settings() {
					return modules_Settings;
				}
				getSettingsPanel() {
					return external_BdApi_React_default().createElement(SettingsPanel, null);
				}
				onStart() {
					external_StyleLoader_default().inject();
					Strings.init();
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
								content: "Sorry, but I can't resolve that user."
							});
							clyde.sendMessage(channel.id, {
								content: "That's what I've found so far:",
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
							value: extractDate(user.id).toGMTString()
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
					const UserPopoutComponents = external_PluginApi_namespaceObject.WebpackModules.getByProps("UserPopoutInfo");
					const UserPopoutBody = external_PluginApi_namespaceObject.WebpackModules.getModule((m => "UserPopoutBody" === m?.default?.displayName && m.default.toString().indexOf("ROLES_LIST") > -1));
					external_PluginApi_namespaceObject.Patcher.after(UserPopoutComponents, "UserPopoutInfo", ((_, [{
						user
					}], returnValue) => {
						if (this.promises.cancelled) return;
						const tree = Utilities.findInReactTree(returnValue, (e => e?.className?.indexOf("headerText") > -1));
						if (!Array.isArray(tree?.children) || !user) return;
						tree.children.push(external_BdApi_React_default().createElement(ErrorBoundary, {
							key: "UserPopoutHeader",
							id: "UserPopoutHeader",
							mini: true
						}, external_BdApi_React_default().createElement("div", {
							className: Utilities.joinClassNames(dates.Z.container, modules_Settings.get("useIcons", true) ? dates.Z.icons : dates.Z.text)
						}, modules_Settings.get("created_show_up", true) && external_BdApi_React_default().createElement(CreatedAt, {
							userId: user.id,
							key: "created-date"
						}), modules_Settings.get("joined_show_up", true) && external_BdApi_React_default().createElement(JoinedAtDate, {
							userId: user.id,
							key: "joined-date"
						}), modules_Settings.get("lastmessage_show_up", true) && external_BdApi_React_default().createElement(LastMessageDate, {
							user,
							key: "lastmessage-date"
						}))));
					}));
					external_PluginApi_namespaceObject.Patcher.after(UserPopoutBody, "default", ((_, [{
						user
					}], returnValue) => {
						if (this.promises.cancelled) return;
						if (!Array.isArray(returnValue?.props?.children) || returnValue.props.children.some((child => child?.type === ErrorBoundary))) return returnValue;
						returnValue.props.children.splice(-1, 0, external_BdApi_React_default().createElement(ErrorBoundary, {
							id: "UserPopoutBody",
							mini: true,
							key: "connections"
						}, external_BdApi_React_default().createElement(UserConnections, {
							user
						})), external_BdApi_React_default().createElement(ErrorBoundary, {
							id: "UserPopoutBody",
							mini: true,
							key: "mutual_servers"
						}, external_BdApi_React_default().createElement(MutualServers, {
							user
						})), external_BdApi_React_default().createElement(ErrorBoundary, {
							id: "UserPopoutBody",
							mini: true,
							key: "mutual_friends"
						}, external_BdApi_React_default().createElement(MutualFriends, {
							user
						})));
					}));
				}
				async patchUserProfile() {
					const UserProfileModalHeader = await Utilities.getLazy((m => "UserProfileModalHeader" === m.default?.displayName));
					const UserInfoBase = external_PluginApi_namespaceObject.WebpackModules.getModule((m => "UserInfoBase" === m.default?.displayName));
					external_PluginApi_namespaceObject.Patcher.after(UserInfoBase, "default", ((_, [props], returnValue) => {
						if (!Array.isArray(returnValue?.props?.children) || !modules_Settings.get("profileRoles", true)) return;
						returnValue.props.children.unshift(external_BdApi_React_default().createElement(MemberRolesSection, {
							userId: props.user.id,
							key: "roles"
						}));
					}));
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
								return external_BdApi_React_default().createElement("div", {
									className: dates.Z.wrapper
								}, ret, external_BdApi_React_default().createElement(ErrorBoundary, {
									id: "UserProfile",
									mini: true
								}, external_BdApi_React_default().createElement("div", {
									className: Utilities.joinClassNames(dates.Z.container, dates.Z.userProfile, modules_Settings.get("useIcons", true) ? dates.Z.icons : dates.Z.text)
								}, modules_Settings.get("created_show_profile", true) && external_BdApi_React_default().createElement(CreatedAt, {
									userId: user.id,
									key: "created-at"
								}), modules_Settings.get("joined_show_profile", true) && external_BdApi_React_default().createElement(JoinedAtDate, {
									userId: user.id,
									key: "joined-at"
								}), modules_Settings.get("lastmessage_show_profile", true) && external_BdApi_React_default().createElement(LastMessageDate, {
									user,
									key: "last-message"
								}))));
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
					const ConnectedActivity = (0, flux_namespaceObject.connectStores)([modules_Settings], (e => e))(Activity);
					external_PluginApi_namespaceObject.Patcher.after(MemberListItem.component.prototype, "render", ((that, _, res) => {
						if (this.promises.cancelled) return;
						if (!modules_Settings.get("activityIcon", true)) return;
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
						const shouldShow = (0, flux_namespaceObject.useStateFromStores)([modules_Settings], (() => modules_Settings.get("activityIconState", 0)));
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
				async patchAccountSection() {
					const classes = external_PluginApi_namespaceObject.WebpackModules.getByProps("copySuccess", "container");
					const AccountSection = await external_PluginApi_namespaceObject.ReactComponents.getComponentByName("Account", `.${classes.container}`);
					const UserPopoutContainer = external_PluginApi_namespaceObject.WebpackModules.getModule((m => "UserPopoutContainer" === m.type.displayName));
					const Popout = external_PluginApi_namespaceObject.WebpackModules.getByDisplayName("Popout");
					external_PluginApi_namespaceObject.Patcher.after(AccountSection.component.prototype, "render", ((_this, _, res) => {
						if (this.promises.cancelled) return;
						if (!_this.state.hasOwnProperty("showUserPopout")) _this.state.showUserPopout = false;
						res.props.onClick = res.props.onContextMenu = function(e) {
							if (modules_Settings.get("panelPopoutType", "click") !== e.type) return;
							e.preventDefault();
							e.stopPropagation();
							if (e.target?.classList?.contains(classes.container) || e.target?.parentElement?.classList?.contains(classes.nameTag) || e.target?.classList?.contains(classes.usernameContainer) || e.target?.parentElement?.classList?.contains(classes.usernameContainer)) this.setState({
								showUserPopout: !_this.state.showUserPopout
							});
						}.bind(_this);
						return external_BdApi_React_default().createElement(ErrorBoundary, {
							id: "AccountSection"
						}, external_BdApi_React_default().createElement(Popout, {
							child: res,
							shouldShow: _this.state.showUserPopout && modules_Settings.get("showPanelPopout", true),
							animation: Popout.Animation.TRANSLATE,
							onRequestClose: () => _this.setState({
								showUserPopout: false
							}),
							position: Popout.Positions.TOP,
							align: Popout.Align.CENTER,
							renderPopout: props => external_BdApi_React_default().createElement(ErrorBoundary, {
								id: "UserPopoutContainer"
							}, external_BdApi_React_default().createElement(UserPopoutContainer, Object.assign({}, props, {
								channelId: stores_namespaceObject.SelectedChannels.getChannelId(),
								guildId: stores_namespaceObject.SelectedGuilds.getGuildId(),
								userId: stores_namespaceObject.Users.getCurrentUser().id,
								position: "top"
							})))
						}, (() => res)));
					}));
					AccountSection.forceUpdateAll();
				}
				destroyStore(dispatchToken) {
					modules_namespaceObject.Dispatcher._dependencyGraph.removeNode(dispatchToken);
					modules_namespaceObject.Dispatcher._invalidateCaches();
				}
				onStop() {
					Strings.shutdown();
					external_PluginApi_namespaceObject.Patcher.unpatchAll();
					external_StyleLoader_default().remove();
					this.promises.cancel();
					commands.unregisterAllCommands(this.getName());
					this.destroyStore(joinedAt.getDispatchToken());
					this.destroyStore(stores_lastMessage.getDispatchToken());
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