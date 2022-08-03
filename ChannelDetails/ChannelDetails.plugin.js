/**
 * @name ChannelDetails
 * @author Strencher
 * @version 1.1.1
 * @description Shows you a lot information about channels, like: channel tooltip, channel accessibility etc.
 * @source https://github.com/Strencher/BetterDiscordStuff/blob/master/ChannelDetails/ChannelDetails.plugin.js
 * @updateUrl https://raw.githubusercontent.com/Strencher/BetterDiscordStuff/master/ChannelDetails/ChannelDetails.plugin.js
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
		"name": "ChannelDetails",
		"authors": [{
			"name": "Strencher",
			"discord_id": "415849376598982656",
			"github_username": "Strencher",
			"twitter_username": "Strencher3"
		}],
		"version": "1.1.1",
		"description": "Shows you a lot information about channels, like: channel tooltip, channel accessibility etc.",
		"github": "https://github.com/Strencher/BetterDiscordStuff/blob/master/ChannelDetails/ChannelDetails.plugin.js",
		"github_raw": "https://raw.githubusercontent.com/Strencher/BetterDiscordStuff/master/ChannelDetails/ChannelDetails.plugin.js"
	},
	"changelog": [{
		"type": "fixed",
		"title": "Finally",
		"items": [
			"Fixes for the latest 4.8 quadrillion discord updates."
		]
	}],
	"build": {
		"zlibrary": true,
		"copy": true,
		"production": true,
		"release": {
			"source": true,
			"readme": true,
			"public": true
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
			676: (module, __webpack_exports__, __webpack_require__) => {
				__webpack_require__.d(__webpack_exports__, {
					Z: () => __WEBPACK_DEFAULT_EXPORT__
				});
				var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(645);
				var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = __webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
				var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()((function(i) {
					return i[1];
				}));
				___CSS_LOADER_EXPORT___.push([module.id, '.ChannelDetails-modal-content{position:relative}.ChannelDetails-modal-header{display:flex;flex-direction:column;align-items:flex-start}.ChannelDetails-modal-header .ChannelDetails-modal-title{text-transform:uppercase;color:#fff;font-weight:600;font-size:20px}.ChannelDetails-modal-header .ChannelDetails-modal-channelName{margin-top:5px;color:var(--channels-default);font-size:12px;font-weight:600;text-transform:uppercase}.ChannelDetails-modal-header .ChannelDetails-modal-channelName::before{content:"#"}.ChannelDetails-modal-header .ChannelDetails-modal-closeButton{position:absolute;right:10px;top:10px}.ChannelDetails-modal-copy{position:relative;top:2px;margin-left:5px;display:inline-flex}.ChannelDetails-modal-copy svg{width:14px;height:14px}.ChannelDetails-modal-item{margin-bottom:15px;border-bottom:thin solid var(--background-modifier-accent);padding-bottom:15px}.ChannelDetails-modal-item>div{padding-left:5px;user-select:text;cursor:text}.ChannelDetails-modal-tooltip{display:inline-flex}.ChannelDetails-modal-scroller{max-height:375px;padding-top:10px;padding-bottom:10px;color:#ddd}.ChannelDetails-modal-scroller p{text-align:center}.ChannelDetails-modal-permissionItem{height:20px;padding:15px 10px;border-radius:5px;display:flex;align-items:center;position:relative}.ChannelDetails-modal-permissionItem .ChannelDetails-modal-iconContainer{position:relative;overflow:hidden;border-radius:50%;margin-right:15px;width:35px;height:35px}.ChannelDetails-modal-permissionItem .ChannelDetails-modal-tooltip{position:absolute;right:10px}.ChannelDetails-modal-permissionItem .ChannelDetails-modal-colorCopy{color:#fff}.ChannelDetails-modal-permissionItem.ChannelDetails-modal-self .ChannelDetails-modal-iconContainer::before{content:"";width:100%;height:100%;background:#000;opacity:.6;display:block;position:absolute}.ChannelDetails-modal-permissionItem.ChannelDetails-modal-self .ChannelDetails-modal-iconContainer svg{color:#fff;top:50%;left:50%;transform:translate(-50%, -50%)}.ChannelDetails-modal-permissionItem.ChannelDetails-modal-self .ChannelDetails-modal-iconContainer svg *,.ChannelDetails-modal-permissionItem.ChannelDetails-modal-self .ChannelDetails-modal-iconContainer svg{position:absolute}.ChannelDetails-modal-permissionItem:hover{background:var(--background-modifier-hover)}.ChannelDetails-modal-permissionItem .ChannelDetails-modal-avatar{overflow:hidden;border-radius:50%;width:100%;height:100%}.ChannelDetails-modal-permissionItem .ChannelDetails-modal-roleCircle{overflow:hidden;width:100%;height:100%;border-radius:50%;background:var(--color, #ddd)}.ChannelDetails-modal-permissionItem .ChannelDetails-modal-name{color:var(--color, #ddd);font-weight:500;font-size:15px}.ChannelDetails-modal-tabItems{display:flex;margin-top:10px;width:100%}.ChannelDetails-modal-tabItems .ChannelDetails-modal-tabItem{color:#ddd;font-size:16px;padding:6px 15px;border-radius:4px;cursor:pointer;box-sizing:border-box;margin-right:10px}.ChannelDetails-modal-tabItems .ChannelDetails-modal-tabItem:not(.ChannelDetails-modal-selected):hover{background:var(--background-modifier-hover)}.ChannelDetails-modal-tabItems .ChannelDetails-modal-tabItem.ChannelDetails-modal-selected{font-weight:600;cursor:default;background:var(--interactive-muted);color:#fff}', ""]);
				___CSS_LOADER_EXPORT___.locals = {
					content: "ChannelDetails-modal-content",
					header: "ChannelDetails-modal-header",
					title: "ChannelDetails-modal-title",
					channelName: "ChannelDetails-modal-channelName",
					closeButton: "ChannelDetails-modal-closeButton",
					copy: "ChannelDetails-modal-copy",
					item: "ChannelDetails-modal-item",
					tooltip: "ChannelDetails-modal-tooltip",
					scroller: "ChannelDetails-modal-scroller",
					permissionItem: "ChannelDetails-modal-permissionItem",
					iconContainer: "ChannelDetails-modal-iconContainer",
					colorCopy: "ChannelDetails-modal-colorCopy",
					self: "ChannelDetails-modal-self",
					avatar: "ChannelDetails-modal-avatar",
					roleCircle: "ChannelDetails-modal-roleCircle",
					name: "ChannelDetails-modal-name",
					tabItems: "ChannelDetails-modal-tabItems",
					tabItem: "ChannelDetails-modal-tabItem",
					selected: "ChannelDetails-modal-selected"
				};
				StyleLoader.append(module.id, ___CSS_LOADER_EXPORT___.toString());
				const __WEBPACK_DEFAULT_EXPORT__ = Object.assign(___CSS_LOADER_EXPORT___, ___CSS_LOADER_EXPORT___.locals);
			},
			921: (module, __webpack_exports__, __webpack_require__) => {
				__webpack_require__.d(__webpack_exports__, {
					Z: () => __WEBPACK_DEFAULT_EXPORT__
				});
				var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(645);
				var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = __webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
				var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()((function(i) {
					return i[1];
				}));
				___CSS_LOADER_EXPORT___.push([module.id, ".threads.ChannelDetails-tooltip-tooltip{margin-bottom:10px;padding-left:2px}.voiceActivities .ChannelDetails-tooltip-section{margin:0 !important}.voiceActivities .ChannelDetails-tooltip-header{font-family:var(--font-display)}.ChannelDetails-tooltip-divider{width:100%;height:1px;background:var(--background-modifier-accent);margin-bottom:15px}.ChannelDetails-tooltip-section{color:#ddd;margin-top:10px}.ChannelDetails-tooltip-section:not(:first-of-type){margin-bottom:10px}.ChannelDetails-tooltip-section .ChannelDetails-tooltip-header{color:var(--header-secondary);font-weight:700;text-transform:uppercase;font-size:12px;margin-bottom:8px;line-height:16px}.ChannelDetails-tooltip-section .ChannelDetails-tooltip-body{display:flex;flex-wrap:wrap;width:max-content;max-width:290px}.ChannelDetails-tooltip-section .ChannelDetails-tooltip-role{font-size:12px;font-weight:500;background:var(--background-secondary-alt);border-radius:4px;box-sizing:border-box;height:22px;margin:0 4px 4px 0;padding:4px;align-items:center;display:flex}.ChannelDetails-tooltip-section .ChannelDetails-tooltip-role .ChannelDetails-tooltip-avatar{border-radius:50%;width:12px;height:12px;padding:0;margin:0 4px;display:flex}.ChannelDetails-tooltip-section .ChannelDetails-tooltip-role.ChannelDetails-tooltip-isSelf{background:var(--brand-experiment) !important}.ChannelDetails-tooltip-section .ChannelDetails-tooltip-role .ChannelDetails-tooltip-roleCircle{border-radius:50%;width:12px;height:12px;padding:0;margin:0 4px;display:flex;background:var(--color, #ddd)}.ChannelDetails-tooltip-section .ChannelDetails-tooltip-role .ChannelDetails-tooltip-roleName{max-width:200px;white-space:nowrap;text-overflow:ellipsis;overflow:hidden;margin-right:4px}", ""]);
				___CSS_LOADER_EXPORT___.locals = {
					tooltip: "ChannelDetails-tooltip-tooltip",
					section: "ChannelDetails-tooltip-section",
					header: "ChannelDetails-tooltip-header",
					divider: "ChannelDetails-tooltip-divider",
					body: "ChannelDetails-tooltip-body",
					role: "ChannelDetails-tooltip-role",
					avatar: "ChannelDetails-tooltip-avatar",
					isSelf: "ChannelDetails-tooltip-isSelf",
					roleCircle: "ChannelDetails-tooltip-roleCircle",
					roleName: "ChannelDetails-tooltip-roleName"
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
				default: () => ChannelDetails
			});
			const stores_namespaceObject = Modules["@discord/stores"];
			const external_PluginApi_namespaceObject = PluginApi;
			const external_BasePlugin_namespaceObject = BasePlugin;
			var external_BasePlugin_default = __webpack_require__.n(external_BasePlugin_namespaceObject);
			var external_BdApi_React_ = __webpack_require__(113);
			var external_BdApi_React_default = __webpack_require__.n(external_BdApi_React_);
			const constants_namespaceObject = Modules["@discord/constants"];
			const i18n_namespaceObject = Modules["@discord/i18n"];
			var i18n_default = __webpack_require__.n(i18n_namespaceObject);
			const modules_namespaceObject = Modules["@discord/modules"];
			const en_US_namespaceObject = JSON.parse('{"ALLOWED_ROLES":"Allowed Roles","DENIED_ROLES":"Denied Roles","ALLOWED_USERS":"Allowed Users","DENIED_USERS":"Denied Users","CHANNEL_DETAILS":"Channel Details","CATEGORY_DETAILS":"Category Details","NOONE_PERMITTED":"No-one was permitted for this channel.","NOONE_DENIED":"No-one was denied from this channel","GENERAL":"General","PERMITTED":"Permitted","DENIED":"Denied","NAME":"Name","CREATED_AT":"Created At","ID":"Id","LAST_MESSAGE_AT":"Last Message At","NSFW":"Nsfw","CATEGORY":"Category","POSITION":"Position","TYPE":"Type","MENTION":"Mention","TOPIC":"Description","COPY":"Copy","COPIED":"Copied!","NOT_SPECIFIED":"Not Specified.","YES":"Yes","NO":"No","NOT_FOUND":"Not found.","COPY_COLOR":"Copy Color","MORE_OPTIONS":"More Options","COPY_NAME":"Copy Name"}');
			const translations = {
				"en-US": en_US_namespaceObject
			};
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
			class Strings {
				static init() {
					this.setLanguage(i18n_default().getLocale());
					modules_namespaceObject.Dispatcher.subscribe(constants_namespaceObject.ActionTypes.USER_SETTINGS_UPDATE, this.handleLocaleChange);
				}
				static shutdown() {
					modules_namespaceObject.Dispatcher.unsubscribe(constants_namespaceObject.ActionTypes.USER_SETTINGS_UPDATE, this.handleLocaleChange);
				}
				static setLanguage(lang) {
					this._strings = translations[lang] ?? translations["en-US"];
				}
				static get(key) {
					return this._strings[key] ?? translations["en-US"][key] ?? "String not found.";
				}
			}
			_defineProperty(Strings, "_strings", void 0);
			_defineProperty(Strings, "handleLocaleChange", (() => {
				Strings.setLanguage(i18n_default().getLocale());
			}));
			var tooltip = __webpack_require__(921);
			var React = __webpack_require__(113);
			const AvatarUtils = external_PluginApi_namespaceObject.WebpackModules.getByProps("getUserAvatarURL");
			function MemberRole({
				name,
				colorString,
				id
			}) {
				const isSelf = ~stores_namespaceObject.Members.getMember(stores_namespaceObject.SelectedGuilds.getGuildId(), stores_namespaceObject.Users.getCurrentUser().id)?.roles.indexOf(id);
				return React.createElement("div", {
					className: external_PluginApi_namespaceObject.Utilities.className(tooltip.Z.role, isSelf && tooltip.Z.isSelf)
				}, React.createElement("div", {
					className: tooltip.Z.roleCircle,
					style: {
						"--color": colorString
					}
				}), React.createElement("div", {
					className: tooltip.Z.roleName
				}, name));
			}
			function MemberWithAvatar({
				user
			}) {
				const isSelf = stores_namespaceObject.Users.getCurrentUser().id === user?.id;
				return React.createElement("div", {
					className: external_PluginApi_namespaceObject.Utilities.className(tooltip.Z.role, isSelf && tooltip.Z.isSelf)
				}, React.createElement("img", {
					className: tooltip.Z.avatar,
					src: AvatarUtils.getUserAvatarURL(user ?? {})
				}), React.createElement("div", {
					className: tooltip.Z.roleName
				}, user?.username ?? "Unknown", "#", user?.discriminator ?? "0000"));
			}
			const collectSections = function(section) {
				return section.reduce((([allowed, denied], enemy) => {
					if (enemy.can) allowed.push(enemy.id);
					else denied.push(enemy.id);
					return [allowed, denied];
				}), [
					[],
					[]
				]);
			};
			function ChannelTooltip({
				overrides,
				guild,
				className
			}) {
				const [allowedUsers, deniedUsers] = (0, external_BdApi_React_.useMemo)((() => collectSections(overrides.users)), [overrides, guild]);
				const [allowedRoles, deniedRoles] = (0, external_BdApi_React_.useMemo)((() => collectSections(overrides.roles)), [overrides, guild]);
				const renderSection = function(section, type, string) {
					const getProps = {
						user: id => stores_namespaceObject.Users.getUser(id),
						role: id => guild.getRole(id)
					} [type];
					if ("function" !== typeof getProps || 0 === section.length) return null;
					return section.length ? React.createElement("div", {
						className: tooltip.Z.section,
						key: string
					}, React.createElement("h3", {
						className: tooltip.Z.header
					}, Strings.get(string)), React.createElement("div", {
						className: tooltip.Z.body
					}, section.map((enemyId => "user" === type ? React.createElement(MemberWithAvatar, {
						user: stores_namespaceObject.Users.getUser(enemyId)
					}) : React.createElement(MemberRole, getProps(enemyId)))))) : null;
				};
				return React.createElement("div", {
					className: external_PluginApi_namespaceObject.Utilities.className(tooltip.Z.tooltip, className)
				}, renderSection(allowedRoles, "role", "ALLOWED_ROLES"), renderSection(deniedRoles, "role", "DENIED_ROLES"), renderSection(allowedUsers, "user", "ALLOWED_USERS"), renderSection(deniedUsers, "user", "DENIED_USERS"));
			}
			const PermissionTypes = {
				1: "users",
				0: "roles"
			};
			const BigIntUtils = external_PluginApi_namespaceObject.WebpackModules.getByProps("deserialize", "invert", "has");
			const hasPermissionOverride = function(perms, permission) {
				return BigIntUtils.has(perms.allow, constants_namespaceObject.Permissions[permission]) || BigIntUtils.has(perms.deny, constants_namespaceObject.Permissions[permission]);
			};
			const can = function(permissions, permission) {
				return (permissions & constants_namespaceObject.Permissions[permission]) == constants_namespaceObject.Permissions[permission] == 1;
			};
			const isVoiceChannel = function(channel) {
				return Boolean(~[constants_namespaceObject.ChannelTypes.GUILD_VOICE, constants_namespaceObject.ChannelTypes.GUILD_STAGE_VOICE].indexOf(channel.type));
			};
			const getPermissionOverrides = function(channel) {
				const overrides = channel.permissionOverwrites;
				return Object.keys(overrides).reduce(((map, id) => {
					const override = overrides[id];
					if (!hasPermissionOverride(override, "VIEW_CHANNEL")) return map;
					map[PermissionTypes[override.type]].push({
						id,
						can: can(override.allow, isVoiceChannel(channel) ? "CONNECT" : "VIEW_CHANNEL"),
						type: PermissionTypes[override.type].slice(0, -1)
					});
					return map;
				}), Object.fromEntries(Object.values(PermissionTypes).map((e => [e, []]))));
			};
			const extractDate = function(id) {
				return new Date(id / 4194304 + 14200704e5);
			};
			const getLastChannelMessageDate = function(channelId) {
				return extractDate(Messages.getMessages(channelId)._array.slice(-1)[0]?.id);
			};
			const external_StyleLoader_namespaceObject = StyleLoader;
			var external_StyleLoader_default = __webpack_require__.n(external_StyleLoader_namespaceObject);
			const modal_namespaceObject = Modules["@discord/modal"];
			const components_namespaceObject = Modules["@discord/components"];
			const contextmenu_namespaceObject = Modules["@discord/contextmenu"];
			const flux_namespaceObject = Modules["@discord/flux"];
			const forms_namespaceObject = Modules["@discord/forms"];
			const external_PluginApi_DiscordModules_namespaceObject = PluginApi.DiscordModules;
			const external_window_namespaceObject = window._;
			var external_window_default = __webpack_require__.n(external_window_namespaceObject);
			var copy_React = __webpack_require__(113);
			function Copy(props) {
				return copy_React.createElement("svg", Object.assign({
					xmlns: "http://www.w3.org/2000/svg",
					height: "24px",
					viewBox: "0 0 24 24",
					width: "24px"
				}, props), copy_React.createElement("path", {
					d: "M0 0h24v24H0z",
					fill: "none"
				}), copy_React.createElement("path", {
					d: "M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z",
					fill: "currentColor"
				}));
			}
			var dropper_React = __webpack_require__(113);
			function Dropper(props) {
				return dropper_React.createElement("svg", Object.assign({
					width: "14",
					height: "14",
					viewBox: "0 0 16 16"
				}, props), dropper_React.createElement("g", {
					fill: "none"
				}, dropper_React.createElement("path", {
					d: "M-4-4h24v24H-4z"
				}), dropper_React.createElement("path", {
					fill: "currentColor",
					d: "M14.994 1.006C13.858-.257 11.904-.3 10.72.89L8.637 2.975l-.696-.697-1.387 1.388 5.557 5.557 1.387-1.388-.697-.697 1.964-1.964c1.13-1.13 1.3-2.985.23-4.168zm-13.25 10.25c-.225.224-.408.48-.55.764L.02 14.37l1.39 1.39 2.35-1.174c.283-.14.54-.33.765-.55l4.808-4.808-2.776-2.776-4.813 4.803z"
				})));
			}
			var overflowMenu_React = __webpack_require__(113);
			function OverflowMenu(props) {
				return overflowMenu_React.createElement("svg", Object.assign({
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				}, props), overflowMenu_React.createElement("g", {
					fill: "none",
					"fill-rule": "evenodd"
				}, overflowMenu_React.createElement("path", {
					d: "M24 0v24H0V0z"
				}), overflowMenu_React.createElement("path", {
					fill: "currentColor",
					d: "M12 16c1.1045695 0 2 .8954305 2 2s-.8954305 2-2 2-2-.8954305-2-2 .8954305-2 2-2zm0-6c1.1045695 0 2 .8954305 2 2s-.8954305 2-2 2-2-.8954305-2-2 .8954305-2 2-2zm0-6c1.1045695 0 2 .8954305 2 2s-.8954305 2-2 2-2-.8954305-2-2 .8954305-2 2-2z"
				})));
			}
			var tick_React = __webpack_require__(113);
			function Tick(props) {
				return tick_React.createElement("svg", Object.assign({
					width: "32",
					height: "24",
					viewBox: "0 0 24 24"
				}, props), tick_React.createElement("path", {
					fill: "currentColor",
					"fill-rule": "evenodd",
					"clip-rule": "evenodd",
					d: "M8.99991 16.17L4.82991 12L3.40991 13.41L8.99991 19L20.9999 7.00003L19.5899 5.59003L8.99991 16.17Z"
				}));
			}
			var modal = __webpack_require__(676);
			const Markdown = external_PluginApi_namespaceObject.WebpackModules.getByProps("parseTopic");
			const Popout = external_PluginApi_namespaceObject.WebpackModules.getByDisplayName("Popout");
			const UnreadStore = external_PluginApi_namespaceObject.WebpackModules.getByProps("getUnreadCount");
			function SpringButton({
				children,
				timeout = 1e3
			}) {
				const [active, setActive] = (0, external_BdApi_React_.useState)(false);
				const timeoutRef = (0, external_BdApi_React_.useRef)(null);
				(0, external_BdApi_React_.useEffect)((() => {
					if (!active) return;
					if (timeoutRef.current) clearTimeout(timeoutRef.current);
					timeoutRef.current = setTimeout((() => {
						setActive(false);
					}), timeout);
				}), [active, timeoutRef]);
				return children({
					active,
					onClick: setActive.bind(null, true)
				});
			}
			const renderPermissionItem = function(id, guild, type) {
				const props = {
					user: stores_namespaceObject.Users.getUser(id),
					role: guild.getRole(id)
				} [type];
				if (!props) return null;
				const isSelf = "role" === type ? ~stores_namespaceObject.Members.getMember(guild.id, stores_namespaceObject.Users.getCurrentUser().id)?.roles.indexOf(props.id) : stores_namespaceObject.Users.getCurrentUser().id === props.id;
				return external_BdApi_React_default().createElement("div", {
					className: external_PluginApi_namespaceObject.Utilities.className(modal.Z.permissionItem, isSelf && modal.Z.self),
					"aria-type": type,
					style: {
						"--color": props.colorString
					}
				}, external_BdApi_React_default().createElement("div", {
					className: modal.Z.iconContainer
				}, "user" === type ? external_BdApi_React_default().createElement("img", {
					src: props.getAvatarURL(true, true),
					className: modal.Z.avatar
				}) : external_BdApi_React_default().createElement("div", {
					className: modal.Z.roleCircle
				}), isSelf && external_BdApi_React_default().createElement(Tick, null)), external_BdApi_React_default().createElement("div", {
					className: modal.Z.name
				}, props["user" === type ? "username" : "name"], "user" === type && "#" + props.discriminator), "role" === type && external_BdApi_React_default().createElement(Popout, {
					renderPopout: function(popoutProps) {
						let ref = null;
						const callback = function({
							target
						}) {
							if (!ref || ref.contains(target)) return;
							popoutProps.closePopout();
							ref = null;
						};
						return external_BdApi_React_default().createElement("div", {
							ref: element => {
								if (!element) document.removeEventListener("click", callback);
								else {
									ref = element;
									setTimeout((() => {
										document.addEventListener("click", callback);
									}), 100);
								}
							}
						}, external_BdApi_React_default().createElement(contextmenu_namespaceObject.Menu, {
							navId: "more-options",
							onClose: popoutProps.closePopout,
							style: "styleFlexible"
						}, external_BdApi_React_default().createElement(contextmenu_namespaceObject.MenuGroup, null, "role" === type && props.colorString && external_BdApi_React_default().createElement(contextmenu_namespaceObject.MenuItem, {
							icon: () => external_BdApi_React_default().createElement(Dropper, {
								width: "14",
								height: "14"
							}),
							label: Strings.get("COPY_COLOR"),
							id: "copy-role-color",
							action: () => external_PluginApi_DiscordModules_namespaceObject.ElectronModule.copy(props.colorString)
						}), external_BdApi_React_default().createElement(contextmenu_namespaceObject.MenuItem, {
							icon: () => external_BdApi_React_default().createElement(Copy, {
								width: "18",
								height: "18"
							}),
							label: Strings.get("COPY_NAME"),
							id: "copy-name",
							action: () => external_PluginApi_DiscordModules_namespaceObject.ElectronModule.copy(props["user" === type ? "username" : "name"])
						}))));
					},
					align: "top",
					spacing: 8,
					position: "left",
					animation: "2",
					onRequestClose: () => true
				}, (props => external_BdApi_React_default().createElement(components_namespaceObject.TooltipContainer, {
					className: modal.Z.tooltip,
					text: Strings.get("MORE_OPTIONS"),
					position: "left"
				}, external_BdApi_React_default().createElement(components_namespaceObject.Button, Object.assign({
					size: components_namespaceObject.Button.Sizes.NONE,
					look: components_namespaceObject.Button.Looks.BLANK,
					className: modal.Z.colorCopy
				}, props), external_BdApi_React_default().createElement(OverflowMenu, null))))));
			};
			const pages = [{
				id: "GENERAL",
				name: "GENERAL",
				render: ({
					channel,
					type
				}) => {
					const renderItem = function(prop, value, copy) {
						const title = [prop, null != copy && external_BdApi_React_default().createElement(SpringButton, null, (props => external_BdApi_React_default().createElement(components_namespaceObject.TooltipContainer, {
							text: props.active ? Strings.get("COPIED") : Strings.get("COPY"),
							className: modal.Z.tooltip,
							hideOnClick: false,
							color: props.active ? "green" : void 0
						}, external_BdApi_React_default().createElement(components_namespaceObject.Button, {
							className: modal.Z.copy,
							size: components_namespaceObject.Button.Sizes.NONE,
							look: components_namespaceObject.Button.Looks.BLANK,
							onClick: external_window_default().flow(external_PluginApi_DiscordModules_namespaceObject.ElectronModule.copy.bind(external_PluginApi_DiscordModules_namespaceObject.ElectronModule, copy), props.onClick)
						}, external_BdApi_React_default().createElement(Copy, null)))))];
						return external_BdApi_React_default().createElement(forms_namespaceObject.FormItem, {
							title,
							className: modal.Z.item,
							key: prop
						}, external_BdApi_React_default().createElement(forms_namespaceObject.FormText, null, "string" === typeof value ? Markdown.parse(value) : value));
					};
					const channelType = constants_namespaceObject.ChannelTypes[channel.type].split("_").map(external_window_default().flow(external_window_default().lowerCase, external_window_default().upperFirst)).join(" ");
					let lastMessage = extractDate(UnreadStore.lastMessageId(channel.id));
					return [renderItem(Strings.get("NAME"), channel.name, channel.name), renderItem(Strings.get("ID"), channel.id, channel.id), "CATEGORY_DETAILS" !== type && renderItem(Strings.get("MENTION"), `<#${channel.id}>`, `<#${channel.id}>`), renderItem(Strings.get("CREATED_AT"), `<t:${Math.floor(extractDate(channel.id) / 1e3)}:R>`, extractDate(channel.id).toLocaleString()), renderItem(Strings.get("POSITION"), channel.position, channel.position), "CATEGORY_DETAILS" !== type && renderItem(Strings.get("CATEGORY"), channel.parent_id ? `<#${channel.parent_id}>` : Strings.get("NOT_SPECIFIED"), channel.parent_id && `<#${channel.parent_id}>`), renderItem(Strings.get("NSFW"), channel.nsfw ? Strings.get("YES") : Strings.get("NO"), null), "CATEGORY_DETAILS" !== type && channel.type !== constants_namespaceObject.ChannelTypes.GUILD_VOICE && renderItem(Strings.get("LAST_MESSAGE_AT"), lastMessage || isNaN(lastMessage) ? `<t:${Math.floor(lastMessage / 1e3)}:R>` : Strings.get("NOT_FOUND"), lastMessage && !isNaN(lastMessage) && lastMessage.toLocaleString()), renderItem(Strings.get("TYPE"), channelType, channelType), renderItem(Strings.get("TOPIC"), channel.topic || Strings.get("NOT_SPECIFIED"), channel.topic || null)].filter(Boolean);
				}
			}, {
				id: "PERMITTED",
				name: "PERMITTED",
				render: ({
					channel
				}) => {
					const overrides = getPermissionOverrides(channel);
					const permitted = [...overrides.users, ...overrides.roles].filter((e => e.can)).sort((a => "user" == a.type ? 0 : -1));
					const renderedEnemies = permitted.map((enemy => renderPermissionItem(enemy.id, stores_namespaceObject.Guilds.getGuild(channel.guild_id), enemy.type)));
					return renderedEnemies.length ? renderedEnemies : external_BdApi_React_default().createElement("p", null, Strings.get("NOONE_PERMITTED"));
				}
			}, {
				id: "DENIED",
				name: "DENIED",
				render: ({
					channel
				}) => {
					const overrides = getPermissionOverrides(channel);
					const permitted = [...overrides.users, ...overrides.roles].filter((e => !e.can)).sort((a => "user" == a.type ? 0 : -1));
					const renderedEnemies = permitted.map((enemy => renderPermissionItem(enemy.id, stores_namespaceObject.Guilds.getGuild(channel.guild_id), enemy.type)));
					return renderedEnemies.length ? renderedEnemies : external_BdApi_React_default().createElement("p", null, Strings.get("NOONE_DENIED"));
				}
			}];
			function ChannelAccessibilityModal({
				channelId,
				onClose,
				type
			}) {
				const channel = (0, flux_namespaceObject.useStateFromStores)([stores_namespaceObject.Channels], (() => stores_namespaceObject.Channels.getChannel(channelId)), [channelId]);
				const [selected, setSelected] = (0, external_BdApi_React_.useState)(pages[0].id);
				const handleChannelSelect = (0, external_BdApi_React_.useCallback)((id => {
					setSelected(id);
				}), [selected, channel, onClose]);
				const element = (0, external_BdApi_React_.useMemo)((() => {
					try {
						return pages.find((e => e.id === selected)).render({
							channel,
							type
						});
					} catch (err) {
						external_PluginApi_namespaceObject.Logger.stacktrace(`Failed to render page "${selected}":`, err);
						return "Component Error";
					}
				}), [selected, channel, onClose]);
				return external_BdApi_React_default().createElement("div", {
					className: modal.Z.content
				}, external_BdApi_React_default().createElement(modal_namespaceObject.ModalHeader, {
					className: modal.Z.header
				}, external_BdApi_React_default().createElement("div", {
					className: modal.Z.title
				}, external_BdApi_React_default().createElement("h2", null, Strings.get(type)), external_BdApi_React_default().createElement("div", {
					className: modal.Z.channelName
				}, channel.name), external_BdApi_React_default().createElement(modal_namespaceObject.ModalCloseButton, {
					onClick: onClose,
					className: modal.Z.closeButton
				})), external_BdApi_React_default().createElement("div", {
					className: modal.Z.tabItems
				}, pages.map((page => external_BdApi_React_default().createElement("div", {
					className: external_PluginApi_namespaceObject.Utilities.className(modal.Z.tabItem, page.id === selected && modal.Z.selected),
					key: page.id,
					onClick: handleChannelSelect.bind(null, page.id)
				}, Strings.get(page.name)))))), external_BdApi_React_default().createElement(modal_namespaceObject.ModalContent, {
					className: modal.Z.scroller
				}, element));
			}
			var ChannelDetails_React = __webpack_require__(113);
			const GuildPermissions = external_PluginApi_namespaceObject.WebpackModules.getByProps("getGuildPermissions");
			const shouldShowPermissions = function(channel) {
				if (!channel) return false;
				const overrides = getPermissionOverrides(channel);
				return overrides?.roles?.length > 0 || overrides?.users?.length > 0;
			};
			class ChannelDetails extends(external_BasePlugin_default()) {
				onStart() {
					this.patchTextChannel();
					this.patchChannelContextMenu();
					this.patchActiveThreadsPopout();
					this.patchVoiceChannel();
					this.patchVoiceChannelActivities();
					Strings.init();
					external_StyleLoader_default().inject();
				}
				async patchVoiceChannelActivities() {
					const Scroller = external_PluginApi_namespaceObject.WebpackModules.getByProps("thin", "scrollerBase");
					const ActivityPopout = external_PluginApi_namespaceObject.WebpackModules.getByProps("partyMembers", "container", "activity");
					const VoiceChannelActivities = external_PluginApi_namespaceObject.WebpackModules.getModule((m => "VoiceChannelActivities" === m?.default?.displayName));
					external_PluginApi_namespaceObject.Patcher.after(VoiceChannelActivities, "default", ((_, [props], ret) => {
						if (!props.channel) return;
						const overrides = getPermissionOverrides(props.channel);
						if (!Object.values(PermissionTypes).some((prop => overrides[prop]?.length > 0))) return ret;
						if (ret) ret.props.children.unshift(ChannelDetails_React.createElement(ChannelTooltip, {
							overrides,
							guild: stores_namespaceObject.Guilds.getGuild(props.channel.guild_id),
							className: "voiceActivities"
						}), ChannelDetails_React.createElement("div", {
							className: tooltip.Z.divider
						}));
						else return ChannelDetails_React.createElement("div", {
							className: `${ActivityPopout.container} ${Scroller.thin}`
						}, ChannelDetails_React.createElement(ChannelTooltip, {
							overrides,
							guild: stores_namespaceObject.Guilds.getGuild(props.channel.guild_id),
							className: "voiceActivities"
						}));
					}));
				}
				async patchVoiceChannel() {
					const selector = `.${external_PluginApi_namespaceObject.WebpackModules.getByProps("containerDefault", "containerDragAfter")?.containerDefault}`;
					const VoiceChannel = await external_PluginApi_namespaceObject.ReactComponents.getComponentByName("VoiceChannel", selector);
					external_PluginApi_namespaceObject.Patcher.after(VoiceChannel.component.prototype, "render", ((_this, _, returnValue) => {
						const shouldShow = shouldShowPermissions(_this.props.channel);
						const props = external_PluginApi_namespaceObject.Utilities.findInReactTree(returnValue, (e => e?.renderPopout));
						if (shouldShow) {
							returnValue.props.onMouseEnter = _this.handleMouseEnter;
							returnValue.props.onMouseLeave = _this.handleMouseLeave;
						}
						if (_this.state.shouldShowActivities && shouldShow)
							if (props) props.shouldShow = true;
					}));
					VoiceChannel.forceUpdateAll();
				}
				async patchTextChannel() {
					const selector = `.${external_PluginApi_namespaceObject.WebpackModules.getByProps("containerDefault", "containerDragAfter")?.containerDefault}`;
					const TextChannel = await external_PluginApi_namespaceObject.ReactComponents.getComponentByName("TextChannel", selector);
					external_PluginApi_namespaceObject.Patcher.after(TextChannel.component.prototype, "render", ((_this, _, returnValue) => {
						const shouldShow = shouldShowPermissions(_this.props.channel);
						if (shouldShow) {
							returnValue.props.onMouseEnter = _this.handleMouseEnter;
							returnValue.props.onMouseLeave = _this.handleMouseLeave;
						}
						if (_this.state.shouldShowThreadsPopout && shouldShow) returnValue.props.children.props.shouldShow = true;
					}));
					TextChannel.forceUpdateAll();
				}
				async patchActiveThreadsPopout() {
					const ActiveThreadsPopout = external_PluginApi_namespaceObject.WebpackModules.getModule((m => "ActiveThreadsPopout" === m?.default?.displayName));
					const UnreadStore = external_PluginApi_namespaceObject.WebpackModules.getByProps("getUnreadCount");
					const ThreadsStore = external_PluginApi_namespaceObject.WebpackModules.getByProps("getActiveUnjoinedThreadsForParent");
					const SnowflakeUtils = external_PluginApi_namespaceObject.WebpackModules.getByProps("extractTimestamp");
					function useActiveThreads(channel) {
						if (channel.type === constants_namespaceObject.ChannelTypes.GUILD_VOICE) return [];
						return (0, flux_namespaceObject.useStateFromStoresArray)([UnreadStore, ThreadsStore, GuildPermissions], (() => external_window_default()(ThreadsStore.getActiveUnjoinedThreadsForParent(channel.guild_id, channel.id)).values().filter((thread => GuildPermissions.can(constants_namespaceObject.Permissions.VIEW_CHANNEL, thread))).sort(((a, b) => {
							const lastMessageInA = UnreadStore.lastMessageId(a.id);
							const lastMessageInB = UnreadStore.lastMessageId(b.id);
							return SnowflakeUtils.compare(lastMessageInA, lastMessageInB);
						})).reverse().value()));
					}
					function PatchedThreadsPopout(props) {
						const {
							children,
							className,
							channel
						} = props;
						const threads = useActiveThreads(channel);
						const ret = ChannelDetails_React.createElement("div", {
							className
						}, shouldShowPermissions(channel) && ChannelDetails_React.createElement(ChannelTooltip, {
							overrides: getPermissionOverrides(channel),
							guild: stores_namespaceObject.Guilds.getGuild(channel.guild_id),
							className: "threads"
						}), threads.length ? ChannelDetails_React.createElement(ChannelDetails_React.Fragment, null, children) : null);
						return ret;
					}
					external_PluginApi_namespaceObject.Patcher.after(ActiveThreadsPopout, "default", ((_, [props], ret) => {
						ret.type = PatchedThreadsPopout;
						Object.assign(ret.props, props);
					}));
				}
				openModal(channel, type) {
					(0, modal_namespaceObject.openModal)((props => ChannelDetails_React.createElement(modal_namespaceObject.ModalRoot, Object.assign({}, props, {
						size: "medium"
					}), ChannelDetails_React.createElement(ChannelAccessibilityModal, {
						channelId: channel.id,
						onClose: props.onClose,
						type
					}))));
				}
				async patchChannelContextMenu() {
					const ChannelEditItem = await external_PluginApi_namespaceObject.DCM.getDiscordMenu("useChannelEditItem");
					const getType = function(channel) {
						switch (channel.type) {
							case constants_namespaceObject.ChannelTypes.GUILD_CATEGORY:
								return "CATEGORY_DETAILS";
							default:
								return "CHANNEL_DETAILS";
						}
					};
					external_PluginApi_namespaceObject.Patcher.after(ChannelEditItem, "default", ((_, [channel], ret) => {
						const type = getType(channel);
						return [ChannelDetails_React.createElement(contextmenu_namespaceObject.MenuItem, {
							key: type,
							id: "channel-details",
							label: Strings.get(type),
							action: () => {
								this.openModal(channel, type);
							}
						}), ret];
					}));
				}
				onStop() {
					Strings.shutdown();
					external_StyleLoader_default().remove();
					external_PluginApi_namespaceObject.Patcher.unpatchAll();
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