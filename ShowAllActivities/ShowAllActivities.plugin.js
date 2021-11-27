/**
 * @name ShowAllActivities
 * @version 1.0.0
 * @author Strencher, Juby210
 * @description See every status a user has enabled. Original made by Juby210#0577.
 * @source https://github.com/Strencher/BetterDiscordStuff/tree/master/ShowAllActivities
 * @updateUrl https://raw.githubusercontent.com/Strencher/BetterDiscordStuff/master/ShowAllActivities/ShowAllActivities.plugin.js
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
		"name": "ShowAllActivities",
		"version": "1.0.0",
		"authors": [{
				"name": "Strencher",
				"discord_id": "415849376598982656",
				"github_username": "Strencher",
				"twitter_username": "Strencher3"
			},
			{
				"name": "Juby210",
				"discord_id": "324622488644616195",
				"github_username": "Juby210"
			}
		],
		"description": "See every status a user has enabled. Original made by Juby210#0577.",
		"github": "https://github.com/Strencher/BetterDiscordStuff/tree/master/ShowAllActivities",
		"github_raw": "https://raw.githubusercontent.com/Strencher/BetterDiscordStuff/master/ShowAllActivities/ShowAllActivities.plugin.js",
		"invite": "gvA2ree"
	},
	"changelog": [{
		"title": "Rewrite",
		"type": "improved",
		"items": [
			"The plugin was rewritting and works fine again."
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
			"readme": true,
			"previews": [{
				"name": "Activity Carosell",
				"src": "assets/preview.png"
			}]
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
			761: (module, __webpack_exports__, __webpack_require__) => {
				__webpack_require__.d(__webpack_exports__, {
					Z: () => __WEBPACK_DEFAULT_EXPORT__
				});
				var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(645);
				var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = __webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
				var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()((function(i) {
					return i[1];
				}));
				___CSS_LOADER_EXPORT___.push([module.id, ".ShowAllActivities-wrapper-wrapper{display:flex;flex-direction:column}.ShowAllActivities-wrapper-wrapper .ShowAllActivities-wrapper-controls{margin-bottom:10px;display:flex;align-items:center;justify-content:space-between;padding:5px;background:var(--background-secondary-alt);border-radius:3px;flex:1 0;margin-top:-5px}.ShowAllActivities-wrapper-wrapper .ShowAllActivities-wrapper-controls .ShowAllActivities-wrapper-caret{display:inline-flex;align-items:center;justify-content:center;cursor:pointer;border-radius:3px}.ShowAllActivities-wrapper-wrapper .ShowAllActivities-wrapper-controls .ShowAllActivities-wrapper-caret.ShowAllActivities-wrapper-disabled{cursor:not-allowed;opacity:.3}.ShowAllActivities-wrapper-wrapper .ShowAllActivities-wrapper-controls .ShowAllActivities-wrapper-caret:hover:not(.ShowAllActivities-wrapper-disabled){background:var(--background-modifier-accent)}.ShowAllActivities-wrapper-wrapper .ShowAllActivities-wrapper-controls .ShowAllActivities-wrapper-carosell{display:flex;align-items:center}.ShowAllActivities-wrapper-wrapper .ShowAllActivities-wrapper-controls .ShowAllActivities-wrapper-carosell .ShowAllActivities-wrapper-dot{margin:0 4px;width:10px;cursor:pointer;height:10px;border-radius:100px;background:var(--interactive-muted);transition:background .3s;opacity:.6}.ShowAllActivities-wrapper-wrapper .ShowAllActivities-wrapper-controls .ShowAllActivities-wrapper-carosell .ShowAllActivities-wrapper-dot:hover:not(.ShowAllActivities-wrapper-selected){opacity:1}.ShowAllActivities-wrapper-wrapper .ShowAllActivities-wrapper-controls .ShowAllActivities-wrapper-carosell .ShowAllActivities-wrapper-dot.ShowAllActivities-wrapper-selected{opacity:1;background:var(--dot-color, var(--brand-experiment))}.ShowAllActivities-wrapper-tooltip{--background-floating: var(--background-secondary)}", ""]);
				___CSS_LOADER_EXPORT___.locals = {
					wrapper: "ShowAllActivities-wrapper-wrapper",
					controls: "ShowAllActivities-wrapper-controls",
					caret: "ShowAllActivities-wrapper-caret",
					disabled: "ShowAllActivities-wrapper-disabled",
					carosell: "ShowAllActivities-wrapper-carosell",
					dot: "ShowAllActivities-wrapper-dot",
					selected: "ShowAllActivities-wrapper-selected",
					tooltip: "ShowAllActivities-wrapper-tooltip"
				};
				StyleLoader.append(module.id, ___CSS_LOADER_EXPORT___.toString());
				const __WEBPACK_DEFAULT_EXPORT__ = Object.assign(___CSS_LOADER_EXPORT___, ___CSS_LOADER_EXPORT___.locals);
			},
			766: (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
				__webpack_require__.r(__webpack_exports__);
				__webpack_require__.d(__webpack_exports__, {
					default: () => ShowAllActivities
				});
				const external_PluginApi_namespaceObject = PluginApi;
				const external_BasePlugin_namespaceObject = BasePlugin;
				var external_BasePlugin_default = __webpack_require__.n(external_BasePlugin_namespaceObject);
				const external_StyleLoader_namespaceObject = StyleLoader;
				var external_StyleLoader_default = __webpack_require__.n(external_StyleLoader_namespaceObject);
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
				const createUpdateWrapper = (Component, valueProp = "value", changeProp = "onChange", valueIndex = 0) => props => {
					const [value, setValue] = React.useState(props[valueProp]);
					return React.createElement(Component, _extends({}, props, {
						[valueProp]: value,
						[changeProp]: (...args) => {
							const value = args[valueIndex];
							if ("function" === typeof props[changeProp]) props[changeProp](value);
							setValue(value);
						}
					}));
				};
				const hooks_createUpdateWrapper = createUpdateWrapper;
				var external_BdApi_React_ = __webpack_require__(113);
				var external_BdApi_React_default = __webpack_require__.n(external_BdApi_React_);
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
				const package_namespaceObject = JSON.parse('{"um":{"u2":"ShowAllActivities"}}');
				const Settings = new SettingsManager(package_namespaceObject.um.u2);
				const settings = Settings;
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
				const Items = [{
					id: "showAlways",
					name: "Show Always",
					note: "Shows the controls bar even if only one activity is present.",
					value: false
				}];
				function SettingsPanel() {
					return external_BdApi_React_default().createElement(external_BdApi_React_default().Fragment, null, Items.map((item => external_BdApi_React_default().createElement(SwitchItem, settings_extends({}, item, {
						value: settings.get(item.id, item.value),
						onChange: value => settings.set(item.id, value)
					}), item.name))));
				}
				var wrapper = __webpack_require__(761);
				const icons_namespaceObject = Modules["@discord/icons"];
				const stores_namespaceObject = Modules["@discord/stores"];
				const components_namespaceObject = Modules["@discord/components"];
				const i18n_namespaceObject = Modules["@discord/i18n"];
				const colors_namespaceObject = JSON.parse('{"spotify":"#1db954","363445589247131668":"#ff0000","463097721130188830":"#d9252a","802958789555781663":"#593695","STREAMING":"#593695","562286213059444737":"#3a004b","83226320970055681":"#889afb","782685898163617802":"#889afb","356869127241072640":"#112120","367827983903490050":"#e5649d"}');
				const constants_namespaceObject = Modules["@discord/constants"];
				var wrapper_React = __webpack_require__(113);
				function wrapper_extends() {
					wrapper_extends = Object.assign || function(target) {
						for (var i = 1; i < arguments.length; i++) {
							var source = arguments[i];
							for (var key in source)
								if (Object.prototype.hasOwnProperty.call(source, key)) target[key] = source[key];
						}
						return target;
					};
					return wrapper_extends.apply(this, arguments);
				}
				const {
					default: UserActivity,
					UserActivityTypes
				} = external_PluginApi_namespaceObject.WebpackModules.getModule((m => "UserActivityContainer" === m?.default?.displayName));
				const classes = external_PluginApi_namespaceObject.WebpackModules.getByProps("activity", "rolesList");
				function ActivityWrapper({
					user,
					...props
				}) {
					const activities = (0, flux_namespaceObject.useStateFromStoresArray)([stores_namespaceObject.Status], (() => stores_namespaceObject.Status.getActivities(user.id).filter((ac => 4 !== ac.type))));
					const [activityIndex, setActivityIndex] = (0, external_BdApi_React_.useState)(0);
					const currentActivity = (0, external_BdApi_React_.useMemo)((() => activities[activityIndex]), [activityIndex, activities]);
					const shouldShowControls = (0, flux_namespaceObject.useStateFromStores)([settings], (() => activities.length > 1 || settings.get("showAlways", false)), [activities]);
					const canGo = type => {
						if (-1 === activityIndex || 0 === activities.length || activityIndex > activities.length - 1) return false;
						switch (type) {
							case "backward":
								return activityIndex > 0;
							case "forward":
								return activityIndex !== activities.length - 1 && activityIndex < activities.length - 1;
						}
					};
					const handleSelectNext = type => (0, external_BdApi_React_.useCallback)((() => {
						if (!canGo(type)) return;
						switch (type) {
							case "backward":
								var index = activityIndex - 1;
								break;
							case "forward":
								var index = activityIndex + 1;
								break;
						}
						if (index < 0 || index > activities.length) return;
						setActivityIndex(index);
					}), [activities, activityIndex, user]);
					const goForward = handleSelectNext("forward");
					const goBackward = handleSelectNext("backward");
					if (!activities.length) return null;
					if (!currentActivity) {
						setActivityIndex(0);
						return null;
					}
					const style = {
						"--dot-color": colors_namespaceObject[Object.keys(colors_namespaceObject).find((e => currentActivity.id?.includes(e) || currentActivity.application_id === e || currentActivity.type === constants_namespaceObject.ActivityTypes[e]))]
					};
					return wrapper_React.createElement("div", {
						className: external_PluginApi_namespaceObject.Utilities.className(wrapper.Z.wrapper, {
							[wrapper.Z.spotify]: currentActivity.id?.startsWith("spotify")
						}),
						style
					}, wrapper_React.createElement(UserActivity, wrapper_extends({
						__SAA: true
					}, props, {
						user,
						activity: currentActivity,
						type: UserActivityTypes.USER_POPOUT,
						key: currentActivity.application_id,
						className: external_PluginApi_namespaceObject.Utilities.className(classes.activity, "newPopoutActivityStyles")
					})), shouldShowControls && wrapper_React.createElement("div", {
						className: wrapper.Z.controls
					}, wrapper_React.createElement(components_namespaceObject.Tooltip, {
						key: "LEFT",
						text: i18n_namespaceObject.Messages.PAGINATION_PREVIOUS,
						tooltipClassName: wrapper.Z.tooltip,
						spacing: 14
					}, (props => wrapper_React.createElement("div", wrapper_extends({}, props, {
						className: external_PluginApi_namespaceObject.Utilities.className(wrapper.Z.caret, {
							[wrapper.Z.disabled]: !canGo("backward")
						}),
						onClick: goBackward
					}), wrapper_React.createElement(icons_namespaceObject.Caret, {
						direction: icons_namespaceObject.Caret.Directions.LEFT
					})))), wrapper_React.createElement("div", {
						className: wrapper.Z.carosell
					}, activities.map(((_, i) => wrapper_React.createElement("div", {
						key: "dot--" + i,
						onClick: () => setActivityIndex(i),
						className: external_PluginApi_namespaceObject.Utilities.className(wrapper.Z.dot, {
							[wrapper.Z.selected]: i === activityIndex
						})
					})))), wrapper_React.createElement(components_namespaceObject.Tooltip, {
						key: "RIGHT",
						text: i18n_namespaceObject.Messages.PAGINATION_NEXT,
						tooltipClassName: wrapper.Z.tooltip,
						spacing: 14
					}, (props => wrapper_React.createElement("div", wrapper_extends({}, props, {
						className: external_PluginApi_namespaceObject.Utilities.className(wrapper.Z.caret, {
							[wrapper.Z.disabled]: !canGo("forward")
						}),
						onClick: goForward
					}), wrapper_React.createElement(icons_namespaceObject.Caret, {
						direction: icons_namespaceObject.Caret.Directions.RIGHT
					}))))));
				}
				var ShowAllActivities_React = __webpack_require__(113);
				function ShowAllActivities_extends() {
					ShowAllActivities_extends = Object.assign || function(target) {
						for (var i = 1; i < arguments.length; i++) {
							var source = arguments[i];
							for (var key in source)
								if (Object.prototype.hasOwnProperty.call(source, key)) target[key] = source[key];
						}
						return target;
					};
					return ShowAllActivities_extends.apply(this, arguments);
				}
				class ShowAllActivities extends(external_BasePlugin_default()) {
					getSettingsPanel() {
						return ShowAllActivities_React.createElement(SettingsPanel, null);
					}
					onStart() {
						external_StyleLoader_default().inject();
						this.patchUserActivityContainer();
					}
					patchUserActivityContainer() {
						const UserActivityModule = external_PluginApi_namespaceObject.WebpackModules.getModule((m => "UserActivityContainer" === m?.default?.displayName));
						external_PluginApi_namespaceObject.Patcher.after(UserActivityModule, "default", ((_, [props]) => {
							if (props.type !== UserActivityModule.UserActivityTypes.USER_POPOUT || props.__SAA) return;
							return ShowAllActivities_React.createElement(ActivityWrapper, ShowAllActivities_extends({
								user: props.user
							}, props));
						}));
					}
					onStop() {
						external_StyleLoader_default().remove();
						external_PluginApi_namespaceObject.Patcher.unpatchAll();
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
		var __webpack_exports__ = __webpack_require__(766);
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