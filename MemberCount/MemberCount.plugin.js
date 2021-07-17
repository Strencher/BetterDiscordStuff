/**
 * @name MemberCount
 * @author Strencher, Kyza
 * @version 0.0.2
 * @description Adds online-offline member count to the member list.
 * @source https://github.com/Strencher/BetterDiscordStuff/blob/master/MemberCount/MemberCount.plugin.js
 * @updateUrl https://raw.githubusercontent.com/Strencher/BetterDiscordStuff/master/MemberCount/MemberCount.plugin.js
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
		"name": "MemberCount",
		"authors": [{
				"name": "Strencher",
				"discord_id": "415849376598982656",
				"github_username": "Strencher",
				"twitter_username": "Strencher3"
			},
			{
				"name": "Kyza",
				"discord_id": "220584715265114113",
				"github_username": "Kyza"
			}
		],
		"version": "0.0.2",
		"description": "Adds online-offline member count to the member list.",
		"github": "https://github.com/Strencher/BetterDiscordStuff/blob/master/MemberCount/MemberCount.plugin.js",
		"github_raw": "https://raw.githubusercontent.com/Strencher/BetterDiscordStuff/master/MemberCount/MemberCount.plugin.js"
	},
	"build": {
		"copy": true,
		"zlibrary": true,
		"production": true,
		"release": {
			"source": true,
			"readme": true,
			"public": true
		}
	},
	"changelog": [{
		"title": "Fixed",
		"type": "fixed",
		"items": [
			"Fixed online count for private channels."
		]
	}]
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
			383: (module, __webpack_exports__, __webpack_require__) => {
				__webpack_require__.d(__webpack_exports__, {
					Z: () => __WEBPACK_DEFAULT_EXPORT__
				});
				var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(645);
				var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = __webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
				var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()((function(i) {
					return i[1];
				}));
				___CSS_LOADER_EXPORT___.push([module.id, ".MemberCount-memberCount-memberCounter{display:flex;justify-content:center;position:sticky;top:0}.MemberCount-memberCount-count{color:#ddd;font-size:12px}.MemberCount-memberCount-pill{width:10px;height:10px;display:block;border-radius:50%;margin:5px}.MemberCount-memberCount-online{background:hsl(139, calc(var(--saturation-factor, 1) * 47.3%), 43.9%)}.MemberCount-memberCount-offline{background:hsl(214, calc(var(--saturation-factor, 1) * 9.9%), 50.4%)}.MemberCount-memberCount-total{background:var(--brand-experiment)}.MemberCount-memberCount-group{display:inline-flex;position:relative;align-items:center;height:25px}.MemberCount-memberCount-wrapper{text-align:-webkit-center;padding-top:10px;align-items:center}.MemberCount-memberCount-wrapper:not([aria-type=complex]){display:flex;flex-direction:column}.MemberCount-memberCount-wrapper:not([aria-type=compact]){padding-left:10px}.MemberCount-memberCount-wrapper.MemberCount-memberCount-sticky{overflow-y:visible;position:sticky;z-index:1;top:0}.MemberCount-memberCount-label{color:var(--channels-default);font-weight:600;text-transform:uppercase;font-size:13px}.MemberCount-memberCount-inner{padding:10px;background:var(--activity-card-background);border-radius:10px;max-width:100px;align-items:center;border:thin solid var(--background-floating)}.MemberCount-memberCount-inner .MemberCount-memberCount-label{margin-right:2px}", ""]);
				___CSS_LOADER_EXPORT___.locals = {
					memberCounter: "MemberCount-memberCount-memberCounter",
					count: "MemberCount-memberCount-count",
					pill: "MemberCount-memberCount-pill",
					online: "MemberCount-memberCount-online",
					offline: "MemberCount-memberCount-offline",
					total: "MemberCount-memberCount-total",
					group: "MemberCount-memberCount-group",
					wrapper: "MemberCount-memberCount-wrapper",
					sticky: "MemberCount-memberCount-sticky",
					label: "MemberCount-memberCount-label",
					inner: "MemberCount-memberCount-inner"
				};
				StyleLoader.append(module.id, ___CSS_LOADER_EXPORT___.toString());
				const __WEBPACK_DEFAULT_EXPORT__ = Object.assign(___CSS_LOADER_EXPORT___, ___CSS_LOADER_EXPORT___.locals);
			},
			47: (module, __webpack_exports__, __webpack_require__) => {
				__webpack_require__.d(__webpack_exports__, {
					Z: () => __WEBPACK_DEFAULT_EXPORT__
				});
				var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(645);
				var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = __webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
				var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()((function(i) {
					return i[1];
				}));
				___CSS_LOADER_EXPORT___.push([module.id, ".MemberCount-settings-guild img,.MemberCount-settings-guildAcronym{pointer-events:none}.MemberCount-settings-guildAcronym{display:flex;background:var(--background-floating);align-items:center;justify-content:center;white-space:nowrap;font-size:12px;width:35px;height:35px;color:#ddd}.MemberCount-settings-guildAcronym:hover{border-radius:20%}.MemberCount-settings-guild{border-radius:50%;overflow:hidden;transition:border-radius,opacity .3s;margin:5px;width:35px;height:35px}.MemberCount-settings-guild.MemberCount-settings-disabled{opacity:.3}.MemberCount-settings-guild img{width:35px;height:35px}.MemberCount-settings-guildsList{display:flex;flex-wrap:wrap}.MemberCount-settings-previewTitle{padding-left:10px}", ""]);
				___CSS_LOADER_EXPORT___.locals = {
					guild: "MemberCount-settings-guild",
					guildAcronym: "MemberCount-settings-guildAcronym",
					disabled: "MemberCount-settings-disabled",
					guildsList: "MemberCount-settings-guildsList",
					previewTitle: "MemberCount-settings-previewTitle"
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
				___CSS_LOADER_EXPORT___.push([module.id, ".MemberCount-category-category.MemberCount-category-compact{position:inherit}.MemberCount-category-category.MemberCount-category-compact .MemberCount-category-header{display:flex;align-items:center;justify-content:space-between;padding:2px;padding-left:10px;text-transform:uppercase;font-weight:600;font-size:.9rem}.MemberCount-category-category.MemberCount-category-compact .MemberCount-category-header .MemberCount-category-caret{float:right;display:inline-flex;color:var(--interactive-normal)}.MemberCount-category-category.MemberCount-category-compact .MemberCount-category-header .MemberCount-category-stroke{background-color:var(--background-modifier-accent);height:2px;flex:1;margin:0 5px 0 10px}.MemberCount-category-category.MemberCount-category-compact .MemberCount-category-header .MemberCount-category-label{color:var(--interactive-normal)}.MemberCount-category-category.MemberCount-category-compact .MemberCount-category-content{padding-left:20px;width:calc(100% - 40px)}.MemberCount-category-category.MemberCount-category-default{background:rgba(32,34,37,.3);border:1px solid #202225;margin:5px;cursor:pointer;border-radius:3px;--color: var(--interactive-normal)}.MemberCount-category-category.MemberCount-category-default:hover{--color: var(--interactive-hover)}.MemberCount-category-category.MemberCount-category-default .MemberCount-category-header{padding-right:5px;padding:10px 15px;padding-bottom:0;display:flex;align-items:center;justify-content:space-between}.MemberCount-category-category.MemberCount-category-default .MemberCount-category-header .MemberCount-category-stroke{display:none}.MemberCount-category-category.MemberCount-category-default .MemberCount-category-header .MemberCount-category-divider{position:relative}.MemberCount-category-category.MemberCount-category-default .MemberCount-category-header .MemberCount-category-label{font-size:1rem;font-weight:600;color:#fff;text-transform:uppercase}.MemberCount-category-category.MemberCount-category-default .MemberCount-category-header .MemberCount-category-caret{color:var(--color);transition:color .3s}.MemberCount-category-category.MemberCount-category-default.MemberCount-category-opened .MemberCount-category-content{padding:8px}.MemberCount-category-category.MemberCount-category-default.MemberCount-category-opened .MemberCount-category-header{background:rgba(32,34,37,.6)}", ""]);
				___CSS_LOADER_EXPORT___.locals = {
					category: "MemberCount-category-category",
					compact: "MemberCount-category-compact",
					header: "MemberCount-category-header",
					caret: "MemberCount-category-caret",
					stroke: "MemberCount-category-stroke",
					label: "MemberCount-category-label",
					content: "MemberCount-category-content",
					default: "MemberCount-category-default",
					divider: "MemberCount-category-divider",
					opened: "MemberCount-category-opened"
				};
				StyleLoader.append(module.id, ___CSS_LOADER_EXPORT___.toString());
				const __WEBPACK_DEFAULT_EXPORT__ = Object.assign(___CSS_LOADER_EXPORT___, ___CSS_LOADER_EXPORT___.locals);
			},
			188: (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
				__webpack_require__.r(__webpack_exports__);
				__webpack_require__.d(__webpack_exports__, {
					default: () => MemberCount
				});
				const external_PluginApi_namespaceObject = PluginApi;
				const external_BasePlugin_namespaceObject = BasePlugin;
				var external_BasePlugin_default = __webpack_require__.n(external_BasePlugin_namespaceObject);
				const components_namespaceObject = Modules["@discord/components"];
				const flux_namespaceObject = Modules["@discord/flux"];
				const i18n_namespaceObject = Modules["@discord/i18n"];
				const utils_namespaceObject = Modules["@discord/utils"];
				var external_BdApi_React_ = __webpack_require__(832);
				var external_BdApi_React_default = __webpack_require__.n(external_BdApi_React_);
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
				const package_namespaceObject = JSON.parse('{"um":{"u2":"MemberCount"}}');
				const Settings = new SettingsManager(package_namespaceObject.um.u2);
				const modules_Settings = Settings;
				function memberCount_defineProperty(obj, key, value) {
					if (key in obj) Object.defineProperty(obj, key, {
						value,
						enumerable: true,
						configurable: true,
						writable: true
					});
					else obj[key] = value;
					return obj;
				}
				const onlineMembers = new Map;
				const OriginalStore = external_PluginApi_namespaceObject.WebpackModules.getByProps("getMemberCount");
				function handleMemberListUpdate({
					guildId,
					groups
				}) {
					if (MemberCountStore._destroyed || !groups.some((group => "online" === group.id))) return;
					const onlineCount = groups.reduce(((total, group) => {
						if ("offline" === group.id) return total;
						return total += group.count;
					}), 0);
					onlineMembers.set(guildId, onlineCount);
					MemberCountStore.emitChange();
				}
				const MemberCountStore = new class extends flux_namespaceObject.Store {
					getState() {
						return onlineMembers;
					}
					getMemberCount(guildId) {
						return OriginalStore.getMemberCount(guildId) ?? 0;
					}
					getOnlineMemberCount(guildId) {
						return onlineMembers.get(guildId) ?? 0;
					}
					destroy() {
						this._destroyed = true;
						modules_namespaceObject.Dispatcher.unsubscribe("GUILD_MEMBER_LIST_UPDATE", handleMemberListUpdate);
					}
					constructor() {
						super(modules_namespaceObject.Dispatcher, {
							GUILD_MEMBER_LIST_UPDATE: handleMemberListUpdate
						});
						memberCount_defineProperty(this, "_destroyed", void 0);
					}
				};
				const memberCount = MemberCountStore;
				var components_memberCount = __webpack_require__(383);
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
				const MemberActions = external_PluginApi_namespaceObject.WebpackModules.getByProps("requestMembers");
				function renderCompact(total, online, isSticky) {
					return external_BdApi_React_default().createElement("div", {
						className: (0, utils_namespaceObject.joinClassNames)(components_memberCount.Z.wrapper, {
							[components_memberCount.Z.sticky]: isSticky
						}),
						"aria-type": "compact"
					}, external_BdApi_React_default().createElement("span", {
						className: components_memberCount.Z.label
					}, "Members"), external_BdApi_React_default().createElement(components_namespaceObject.Flex, {
						direction: components_namespaceObject.Flex.Direction.HORIZONTAL,
						className: components_memberCount.Z.memberCounter
					}, external_BdApi_React_default().createElement("div", {
						className: components_memberCount.Z.group,
						key: "online"
					}, external_BdApi_React_default().createElement(components_namespaceObject.Tooltip, {
						text: i18n_namespaceObject.Messages.STATUS_ONLINE
					}, (props => external_BdApi_React_default().createElement("span", _extends({}, props, {
						className: (0, utils_namespaceObject.joinClassNames)(components_memberCount.Z.pill, components_memberCount.Z.online)
					})))), external_BdApi_React_default().createElement("span", {
						className: components_memberCount.Z.count
					}, online ? online : i18n_namespaceObject.Messages.DEFAULT_INPUT_PLACEHOLDER)), external_BdApi_React_default().createElement("div", {
						className: components_memberCount.Z.group,
						key: "offline"
					}, external_BdApi_React_default().createElement(components_namespaceObject.Tooltip, {
						text: i18n_namespaceObject.Messages.STATUS_OFFLINE
					}, (props => external_BdApi_React_default().createElement("span", _extends({}, props, {
						className: (0, utils_namespaceObject.joinClassNames)(components_memberCount.Z.pill, components_memberCount.Z.offline)
					})))), external_BdApi_React_default().createElement("span", {
						className: components_memberCount.Z.count
					}, total - online)), external_BdApi_React_default().createElement("div", {
						className: components_memberCount.Z.group,
						key: "total"
					}, external_BdApi_React_default().createElement(components_namespaceObject.Tooltip, {
						text: "Total"
					}, (props => external_BdApi_React_default().createElement("span", _extends({}, props, {
						className: (0, utils_namespaceObject.joinClassNames)(components_memberCount.Z.pill, components_memberCount.Z.total)
					})))), external_BdApi_React_default().createElement("span", {
						className: components_memberCount.Z.count
					}, total))));
				}
				function renderComplex(total, online, isSticky) {
					return external_BdApi_React_default().createElement("div", {
						className: (0, utils_namespaceObject.joinClassNames)(components_memberCount.Z.wrapper, {
							[components_memberCount.Z.sticky]: isSticky
						}),
						"aria-type": "complex"
					}, external_BdApi_React_default().createElement(components_namespaceObject.Flex, {
						direction: components_namespaceObject.Flex.Direction.VERTICAL,
						className: components_memberCount.Z.inner
					}, external_BdApi_React_default().createElement("div", {
						className: components_memberCount.Z.group,
						key: "online"
					}, external_BdApi_React_default().createElement("span", {
						className: components_memberCount.Z.label
					}, i18n_namespaceObject.Messages.STATUS_ONLINE, ":"), external_BdApi_React_default().createElement("span", {
						className: components_memberCount.Z.count
					}, online ? online : i18n_namespaceObject.Messages.DEFAULT_INPUT_PLACEHOLDER)), external_BdApi_React_default().createElement("div", {
						className: components_memberCount.Z.group,
						key: "offline"
					}, external_BdApi_React_default().createElement("span", {
						className: components_memberCount.Z.label
					}, i18n_namespaceObject.Messages.STATUS_OFFLINE, ":"), external_BdApi_React_default().createElement("span", {
						className: components_memberCount.Z.count
					}, total - online)), external_BdApi_React_default().createElement("div", {
						className: components_memberCount.Z.group,
						key: "total"
					}, external_BdApi_React_default().createElement("span", {
						className: components_memberCount.Z.label
					}, "Total:"), external_BdApi_React_default().createElement("span", {
						className: components_memberCount.Z.count
					}, total))));
				}
				function MemberCountDisplay({
					guildId
				}) {
					const [totalMembers, onlineMembers, displayMode, isSticky] = (0, flux_namespaceObject.useStateFromStoresArray)([memberCount, modules_Settings], (() => ["owo" === guildId ? 1765 : memberCount.getMemberCount(guildId), "owo" === guildId ? 960 : memberCount.getOnlineMemberCount(guildId), modules_Settings.get("displayMode", 0), modules_Settings.get("displaySticky", true)]));
					(0, external_BdApi_React_.useEffect)((() => {
						if (!onlineMembers) MemberActions.requestMembers(guildId);
					}), [guildId]);
					switch (displayMode) {
						case 0:
							return renderCompact(totalMembers, onlineMembers, isSticky);
						case 1:
							return renderComplex(totalMembers, onlineMembers, isSticky);
						default:
							return external_BdApi_React_default().createElement("span", null, "Bruh.");
					}
				}
				const external_StyleLoader_namespaceObject = StyleLoader;
				var external_StyleLoader_default = __webpack_require__.n(external_StyleLoader_namespaceObject);
				const stores_namespaceObject = Modules["@discord/stores"];
				const forms_namespaceObject = Modules["@discord/forms"];
				const icons_namespaceObject = Modules["@discord/icons"];
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
				var settings = __webpack_require__(47);
				var React = __webpack_require__(832);
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
				const RadioGroup = external_PluginApi_namespaceObject.WebpackModules.getByDisplayName("RadioGroup");
				const SwitchItem = external_PluginApi_namespaceObject.WebpackModules.getByDisplayName("SwitchItem");
				const DisplsayModes = [{
					name: "Compact",
					value: 0
				}, {
					name: "Complex",
					value: 1
				}];
				function SettingsPanel() {
					let [displayMode, displaySticky, excludeGuilds] = (0, flux_namespaceObject.useStateFromStores)([modules_Settings], (() => [modules_Settings.get("displayMode", 0), modules_Settings.get("displaySticky", true), modules_Settings.get("excludeGuilds", {})]));
					const handleGuildToggle = (0, external_BdApi_React_.useCallback)((guildId => {
						if (excludeGuilds[guildId]) delete excludeGuilds[guildId];
						else excludeGuilds[guildId] = true;
						modules_Settings.set("excludeGuilds", excludeGuilds);
					}), [excludeGuilds]);
					return React.createElement(React.Fragment, null, React.createElement(Category, {
						look: Category.Looks.COMPACT,
						label: "General"
					}, React.createElement(SwitchItem, {
						value: displaySticky,
						note: "Defines if the counter should be shown sticky inside the scroller.",
						onChange: value => modules_Settings.set("displaySticky", value)
					}, "Sticky Position"), React.createElement(forms_namespaceObject.FormItem, {
						title: "Display Mode"
					}, React.createElement(forms_namespaceObject.FormText, {
						type: "description"
					}, "See in the preview below."), React.createElement(RadioGroup, {
						value: displayMode,
						disabled: false,
						options: DisplsayModes,
						onChange: ({
							value
						}) => modules_Settings.set("displayMode", value)
					}))), React.createElement(Category, {
						look: Category.Looks.COMPACT,
						label: "Guilds"
					}, React.createElement(forms_namespaceObject.FormTitle, {
						tag: "h2"
					}, "Exlude Guilds from MemberCounter"), React.createElement("div", {
						className: settings.Z.guildsList
					}, Object.values(stores_namespaceObject.Guilds.getGuilds()).map((guild => React.createElement(components_namespaceObject.Tooltip, {
						position: "top",
						text: excludeGuilds[guild.id] ? "Disabled" : "Enabled",
						key: guild.id
					}, (props => React.createElement("div", Settings_extends({}, props, {
						className: (0, utils_namespaceObject.joinClassNames)(settings.Z.guild, {
							[settings.Z.disabled]: Boolean(excludeGuilds[guild.id])
						}),
						onClick: () => handleGuildToggle(guild.id)
					}), guild.icon ? React.createElement("img", {
						src: guild.getIconURL(true)
					}) : React.createElement("div", {
						className: settings.Z.guildAcronym
					}, guild.acronym))))))), React.createElement(components_namespaceObject.Flex, {
						justify: components_namespaceObject.Flex.Justify.END,
						direction: components_namespaceObject.Flex.Direction.HORIZONTAL
					}, React.createElement(components_namespaceObject.Flex.Child, {
						basis: "auto",
						shrink: "1",
						grow: "0",
						wrap: true
					}, React.createElement(components_namespaceObject.Button, {
						size: components_namespaceObject.Button.Sizes.MEDIUM,
						look: components_namespaceObject.Button.Looks.OUTLINED,
						color: components_namespaceObject.Button.Colors.BRAND,
						onClick: () => modules_Settings.set("excludeGuilds", Object.keys(stores_namespaceObject.Guilds.getGuilds()).reduce(((guilds, id) => (guilds[id] = true,
							guilds)), {}))
					}, "Disable All")), React.createElement(components_namespaceObject.Flex.Child, {
						basis: "auto",
						shrink: "1",
						grow: "0",
						wrap: true
					}, React.createElement(components_namespaceObject.Button, {
						size: components_namespaceObject.Button.Sizes.MEDIUM,
						look: components_namespaceObject.Button.Looks.OUTLINED,
						color: components_namespaceObject.Button.Colors.RED,
						onClick: () => modules_Settings.set("excludeGuilds", {})
					}, "Reset")))), React.createElement(Category, {
						look: Category.Looks.COMPACT,
						label: "Preview"
					}, React.createElement(MemberCountDisplay, {
						guildId: "owo"
					})));
				}
				var MemberCount_React = __webpack_require__(832);
				class MemberCount extends(external_BasePlugin_default()) {
					get settings() {
						return modules_Settings;
					}
					onStart() {
						this.patchChannelMembers();
						external_StyleLoader_default().inject();
					}
					getSettingsPanel() {
						return MemberCount_React.createElement(SettingsPanel, null);
					}
					async patchChannelMembers() {
						const {
							ListThin
						} = external_PluginApi_namespaceObject.WebpackModules.getByProps("ListThin");
						external_PluginApi_namespaceObject.Patcher.after(ListThin, "render", ((_, [{
							className
						}], res) => {
							if (className?.indexOf?.("member") < 0) return;
							const guildId = stores_namespaceObject.SelectedGuilds.getGuildId();
							if (Array.isArray(res)) {
								const firstChild = res[0];
								if (firstChild)
									if ("function" === typeof firstChild.props.children) {
										const original = firstChild.props.children;
										firstChild.props.children = (...args) => [MemberCount_React.createElement(MemberCountDisplay, {
											guildId
										}), original(...args)];
									} else firstChild.props.children = [MemberCount_React.createElement(MemberCountDisplay, {
										guildId
									}), firstChild.props.children];
							} else if (res.props?.children) res.props.children = [MemberCount_React.createElement(MemberCountDisplay, {
								guildId
							}), res.props.children];
						}));
						const [node] = document.getElementsByClassName(external_PluginApi_namespaceObject.WebpackModules.getByProps("membersWrap")?.membersWrap ?? "");
						if (node) {
							const instance = external_PluginApi_namespaceObject.ReactTools.getOwnerInstance(node);
							if ("function" === typeof instance.forceUpdate) instance.forceUpdate();
						}
					}
					onStop() {
						memberCount.destroy();
						external_PluginApi_namespaceObject.Patcher.unpatchAll();
						external_StyleLoader_default().remove();
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
		var __webpack_exports__ = __webpack_require__(188);
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