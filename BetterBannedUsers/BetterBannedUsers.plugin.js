/**
 * @name BetterBannedUsers
 * @version 1.0.0
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
		"version": "1.0.0",
		"description": "Enhances the banned users page.",
		"authors": [{
			"name": "Strencher",
			"discord_id": "415849376598982656",
			"github_username": "Strencher"
		}],
		"github": "https://github.com/Strencher/BetterDiscordStuff/BetterBannedUsers",
		"github_raw": "https://raw.githubusercontent.com/Strencher/BetterDiscordStuff/master/BetterBannedUsers/BetterBannedUsers.plugin.js"
	},
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
					"src": "./assets/preview.png"
				},
				{
					"name": "Settings Panel",
					"src": "./assets/settings.png"
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
		let __plugin_styles__ = "";
		let __style_element__ = null;
		var __webpack_modules__ = {
			418: (module, __webpack_exports__, __webpack_require__) => {
				__webpack_require__.d(__webpack_exports__, {
					Z: () => __WEBPACK_DEFAULT_EXPORT__
				});
				var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(645);
				var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = __webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
				var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()((function(i) {
					return i[1];
				}));
				___CSS_LOADER_EXPORT___.push([module.id, ".BetterBannedUsers-banned-remove{display:none;position:absolute;top:-15px;right:-30px}.bannedUser-1IalTM .username-1b3MVI{white-space:nowrap;padding-left:0}.bannedUser-1IalTM:hover .BetterBannedUsers-banned-remove{display:flex}.BetterBannedUsers-banned-banReason{text-overflow:ellipsis;color:var(--interactive-normal);overflow:hidden;white-space:nowrap;padding-bottom:1px;max-width:575px;display:flex;align-items:center}.BetterBannedUsers-banned-wrapper{margin-left:10px;z-index:10}.BetterBannedUsers-banned-container{margin-bottom:20px}.BetterBannedUsers-banned-search{margin-top:10px}", ""]);
				___CSS_LOADER_EXPORT___.locals = {
					remove: "BetterBannedUsers-banned-remove",
					banReason: "BetterBannedUsers-banned-banReason",
					wrapper: "BetterBannedUsers-banned-wrapper",
					container: "BetterBannedUsers-banned-container",
					search: "BetterBannedUsers-banned-search"
				};
				__plugin_styles__ += `\n/* ${module.id} */\n${___CSS_LOADER_EXPORT___}\n`;
				const __WEBPACK_DEFAULT_EXPORT__ = Object.assign(___CSS_LOADER_EXPORT___, ___CSS_LOADER_EXPORT___.locals);
			},
			469: (module, __webpack_exports__, __webpack_require__) => {
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
				__plugin_styles__ += `\n/* ${module.id} */\n${___CSS_LOADER_EXPORT___}\n`;
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
			698: module => {
				module.exports = window["BdApi"]["React"];
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
			var banned = __webpack_require__(418);
			const external_n_inject_name_config_info_name_n_if_style_element_style_element_remove_n_style_element_document_head_appendChild_Object_assign_document_createElement_style_id_name_textContent_plugin_styles_n_n_remove_n_if_style_element_n_style_element_remove_n_style_element_null_n_n_n_namespaceObject = {
				inject: (name = config.info.name) => {
					if (__style_element__) __style_element__.remove();
					__style_element__ = document.head.appendChild(Object.assign(document.createElement("style"), {
						id: name,
						textContent: __plugin_styles__
					}));
				},
				remove: () => {
					if (__style_element__) {
						__style_element__.remove();
						__style_element__ = null;
					}
				}
			};
			var external_n_inject_name_config_info_name_n_if_style_element_style_element_remove_n_style_element_document_head_appendChild_Object_assign_document_createElement_style_id_name_textContent_plugin_styles_n_n_remove_n_if_style_element_n_style_element_remove_n_style_element_null_n_n_n_default = __webpack_require__.n(external_n_inject_name_config_info_name_n_if_style_element_style_element_remove_n_style_element_document_head_appendChild_Object_assign_document_createElement_style_id_name_textContent_plugin_styles_n_n_remove_n_if_style_element_n_style_element_remove_n_style_element_null_n_n_n_namespaceObject);
			const BetterBannedUsers_package = {
				info: {
					name: "BetterBannedUsers",
					version: "1.0.0",
					description: "Enhances the banned users page.",
					authors: [{
						name: "Strencher",
						discord_id: "415849376598982656",
						github_username: "Strencher"
					}],
					github: "https://github.com/Strencher/BetterDiscordStuff/BetterBannedUsers",
					github_raw: "https://raw.githubusercontent.com/Strencher/BetterDiscordStuff/master/BetterBannedUsers/BetterBannedUsers.plugin.js"
				},
				build: {
					zlibrary: true,
					copy: true,
					production: false,
					scssHash: false,
					alias: {
						components: "components/index.js"
					},
					release: {
						source: true,
						readme: true,
						public: true,
						previews: [{
							name: "Banned Users Page",
							src: "./assets/preview.png"
						}, {
							name: "Settings Panel",
							src: "./assets/settings.png"
						}]
					}
				}
			};
			var info = {
				name: "BetterBannedUsers",
				version: "1.0.0",
				description: "Enhances the banned users page.",
				authors: [{
					name: "Strencher",
					discord_id: "415849376598982656",
					github_username: "Strencher"
				}],
				github: "https://github.com/Strencher/BetterDiscordStuff/BetterBannedUsers",
				github_raw: "https://raw.githubusercontent.com/Strencher/BetterDiscordStuff/master/BetterBannedUsers/BetterBannedUsers.plugin.js"
			};
			var build = {
				zlibrary: true,
				copy: true,
				production: false,
				scssHash: false,
				alias: {
					components: "components/index.js"
				},
				release: {
					source: true,
					readme: true,
					public: true,
					previews: [{
						name: "Banned Users Page",
						src: "./assets/preview.png"
					}, {
						name: "Settings Panel",
						src: "./assets/settings.png"
					}]
				}
			};
			const external_Object_assign_BdApi_findModuleByProps_useStateFromStores_default_BdApi_findModuleByProps_useStateFromStores_namespaceObject = Object.assign({}, BdApi.findModuleByProps("useStateFromStores").default, BdApi.findModuleByProps("useStateFromStores"));
			const external_get_Dispatcher_n_const_value_BdApi_findModuleByProps_dirtyDispatch_subscribe_n_Object_defineProperty_this_Dispatcher_n_value_n_configurable_true_n_n_return_value_n_nget_EmojiUtils_n_const_value_BdApi_findModuleByProps_uploadEmoji_n_Object_defineProperty_this_EmojiUtils_n_value_n_configurable_true_n_n_return_value_n_nget_PermissionUtils_n_const_value_BdApi_findModuleByProps_computePermissions_n_Object_defineProperty_this_PermissionUtils_n_value_n_configurable_true_n_n_return_value_n_namespaceObject = {
				get Dispatcher() {
					const value = BdApi.findModuleByProps("dirtyDispatch", "subscribe");
					Object.defineProperty(this, "Dispatcher", {
						value,
						configurable: true
					});
					return value;
				},
				get EmojiUtils() {
					const value = BdApi.findModuleByProps("uploadEmoji");
					Object.defineProperty(this, "EmojiUtils", {
						value,
						configurable: true
					});
					return value;
				},
				get PermissionUtils() {
					const value = BdApi.findModuleByProps("computePermissions");
					Object.defineProperty(this, "PermissionUtils", {
						value,
						configurable: true
					});
					return value;
				}
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
			class SettingsManager extends external_Object_assign_BdApi_findModuleByProps_useStateFromStores_default_BdApi_findModuleByProps_useStateFromStores_namespaceObject.Store {
				constructor(pluginName) {
					super(external_get_Dispatcher_n_const_value_BdApi_findModuleByProps_dirtyDispatch_subscribe_n_Object_defineProperty_this_Dispatcher_n_value_n_configurable_true_n_n_return_value_n_nget_EmojiUtils_n_const_value_BdApi_findModuleByProps_uploadEmoji_n_Object_defineProperty_this_EmojiUtils_n_value_n_configurable_true_n_n_return_value_n_nget_PermissionUtils_n_const_value_BdApi_findModuleByProps_computePermissions_n_Object_defineProperty_this_PermissionUtils_n_value_n_configurable_true_n_n_return_value_n_namespaceObject.Dispatcher, {});
					_defineProperty(this, "get", ((key, defaultValue) => this.settings[key] ?? defaultValue));
					_defineProperty(this, "set", ((key, value) => {
						this.settings[key] = value;
						external_PluginApi_namespaceObject.PluginUtilities.saveSettings(this.pluginName, this.settings);
						this.emitChange();
					}));
					this.pluginName = pluginName;
					this.settings = external_PluginApi_namespaceObject.PluginUtilities.loadSettings(pluginName, {});
				}
			}
			const Settings = new SettingsManager(info.name);
			const settings = Settings;
			const external_get_Messages_n_const_value_BdApi_findModuleByProps_getMessage_getMessages_n_Object_defineProperty_this_Messages_n_value_n_configurable_true_n_n_return_value_n_nget_Channels_n_const_value_BdApi_findModuleByProps_getChannel_n_Object_defineProperty_this_Channels_n_value_n_configurable_true_n_n_return_value_n_nget_Guilds_n_const_value_BdApi_findModuleByProps_getGuild_n_Object_defineProperty_this_Guilds_n_value_n_configurable_true_n_n_return_value_n_nget_SelectedGuilds_n_const_value_BdApi_findModuleByProps_getGuildId_getLastSelectedGuildId_n_Object_defineProperty_this_SelectedGuilds_n_value_n_configurable_true_n_n_return_value_n_nget_SelectedChannels_n_const_value_BdApi_findModuleByProps_getChannelId_getLastSelectedChannelId_n_Object_defineProperty_this_SelectedChannels_n_value_n_configurable_true_n_n_return_value_n_nget_Info_n_const_value_BdApi_findModuleByProps_getCurrentUser_n_Object_defineProperty_this_Info_n_value_n_configurable_true_n_n_return_value_n_nget_Status_n_const_value_BdApi_findModuleByProps_getStatus_n_Object_defineProperty_this_Status_n_value_n_configurable_true_n_n_return_value_n_nget_Users_n_const_value_BdApi_findModuleByProps_getUser_n_Object_defineProperty_this_Users_n_value_n_configurable_true_n_n_return_value_n_nget_Settings_n_const_value_BdApi_findModuleByProps_afkTimeout_status_n_Object_defineProperty_this_Settings_n_value_n_configurable_true_n_n_return_value_n_nget_UserProfile_n_const_value_BdApi_findModuleByProps_getUserProfile_n_Object_defineProperty_this_UserProfile_n_value_n_configurable_true_n_n_return_value_n_nget_Members_n_const_value_BdApi_findModuleByProps_getMember_n_Object_defineProperty_this_Members_n_value_n_configurable_true_n_n_return_value_n_nget_Activities_n_const_value_BdApi_findModuleByProps_getActivities_n_Object_defineProperty_this_Activities_n_value_n_configurable_true_n_n_return_value_n_nget_Games_n_const_value_BdApi_findModuleByProps_getGame_n_Object_defineProperty_this_Games_n_value_n_configurable_true_n_n_return_value_n_nget_Auth_n_const_value_BdApi_findModuleByProps_getId_isGuest_n_Object_defineProperty_this_Auth_n_value_n_configurable_true_n_n_return_value_n_nget_TypingUsers_n_const_value_BdApi_findModuleByProps_isTyping_n_Object_defineProperty_this_TypingUsers_n_value_n_configurable_true_n_n_return_value_n_namespaceObject = {
				get Messages() {
					const value = BdApi.findModuleByProps("getMessage", "getMessages");
					Object.defineProperty(this, "Messages", {
						value,
						configurable: true
					});
					return value;
				},
				get Channels() {
					const value = BdApi.findModuleByProps("getChannel");
					Object.defineProperty(this, "Channels", {
						value,
						configurable: true
					});
					return value;
				},
				get Guilds() {
					const value = BdApi.findModuleByProps("getGuild");
					Object.defineProperty(this, "Guilds", {
						value,
						configurable: true
					});
					return value;
				},
				get SelectedGuilds() {
					const value = BdApi.findModuleByProps("getGuildId", "getLastSelectedGuildId");
					Object.defineProperty(this, "SelectedGuilds", {
						value,
						configurable: true
					});
					return value;
				},
				get SelectedChannels() {
					const value = BdApi.findModuleByProps("getChannelId", "getLastSelectedChannelId");
					Object.defineProperty(this, "SelectedChannels", {
						value,
						configurable: true
					});
					return value;
				},
				get Info() {
					const value = BdApi.findModuleByProps("getCurrentUser");
					Object.defineProperty(this, "Info", {
						value,
						configurable: true
					});
					return value;
				},
				get Status() {
					const value = BdApi.findModuleByProps("getStatus");
					Object.defineProperty(this, "Status", {
						value,
						configurable: true
					});
					return value;
				},
				get Users() {
					const value = BdApi.findModuleByProps("getUser");
					Object.defineProperty(this, "Users", {
						value,
						configurable: true
					});
					return value;
				},
				get Settings() {
					const value = BdApi.findModuleByProps("afkTimeout", "status");
					Object.defineProperty(this, "Settings", {
						value,
						configurable: true
					});
					return value;
				},
				get UserProfile() {
					const value = BdApi.findModuleByProps("getUserProfile");
					Object.defineProperty(this, "UserProfile", {
						value,
						configurable: true
					});
					return value;
				},
				get Members() {
					const value = BdApi.findModuleByProps("getMember");
					Object.defineProperty(this, "Members", {
						value,
						configurable: true
					});
					return value;
				},
				get Activities() {
					const value = BdApi.findModuleByProps("getActivities");
					Object.defineProperty(this, "Activities", {
						value,
						configurable: true
					});
					return value;
				},
				get Games() {
					const value = BdApi.findModuleByProps("getGame");
					Object.defineProperty(this, "Games", {
						value,
						configurable: true
					});
					return value;
				},
				get Auth() {
					const value = BdApi.findModuleByProps("getId", "isGuest");
					Object.defineProperty(this, "Auth", {
						value,
						configurable: true
					});
					return value;
				},
				get TypingUsers() {
					const value = BdApi.findModuleByProps("isTyping");
					Object.defineProperty(this, "TypingUsers", {
						value,
						configurable: true
					});
					return value;
				}
			};
			const external_window_namespaceObject = window._;
			var external_window_default = __webpack_require__.n(external_window_namespaceObject);
			const external_get_Tooltip_n_const_value_BdApi_findModuleByDisplayName_Tooltip_n_Object_defineProperty_this_Tooltip_n_value_n_configurable_true_n_n_return_value_n_nget_TooltipContainer_n_const_value_BdApi_findModuleByProps_TooltipContainer_TooltipContainer_n_Object_defineProperty_this_TooltipContainer_n_value_n_configurable_true_n_n_return_value_n_nget_TextInput_n_const_value_BdApi_findModuleByDisplayName_TextInput_n_Object_defineProperty_this_TextInput_n_value_n_configurable_true_n_n_return_value_n_nget_SlideIn_n_const_value_BdApi_findModuleByDisplayName_SlideIn_n_Object_defineProperty_this_SlideIn_n_value_n_configurable_true_n_n_return_value_n_nget_SettingsNotice_n_const_value_BdApi_findModuleByDisplayName_SettingsNotice_n_Object_defineProperty_this_SettingsNotice_n_value_n_configurable_true_n_n_return_value_n_nget_TransitionGroup_n_const_value_BdApi_findModuleByDisplayName_TransitionGroup_n_Object_defineProperty_this_TransitionGroup_n_value_n_configurable_true_n_n_return_value_n_nget_Button_n_const_value_BdApi_findModuleByProps_DropdownSizes_n_Object_defineProperty_this_Button_n_value_n_configurable_true_n_n_return_value_n_nget_Flex_n_const_value_BdApi_findModuleByDisplayName_Flex_n_Object_defineProperty_this_Flex_n_value_n_configurable_true_n_n_return_value_n_nget_Text_n_const_value_BdApi_findModuleByDisplayName_Text_n_Object_defineProperty_this_Text_n_value_n_configurable_true_n_n_return_value_n_nget_Card_n_const_value_BdApi_findModuleByDisplayName_Card_n_Object_defineProperty_this_Card_n_value_n_configurable_true_n_n_return_value_n_namespaceObject = {
				get Tooltip() {
					const value = BdApi.findModuleByDisplayName("Tooltip");
					Object.defineProperty(this, "Tooltip", {
						value,
						configurable: true
					});
					return value;
				},
				get TooltipContainer() {
					const value = BdApi.findModuleByProps("TooltipContainer")?.TooltipContainer;
					Object.defineProperty(this, "TooltipContainer", {
						value,
						configurable: true
					});
					return value;
				},
				get TextInput() {
					const value = BdApi.findModuleByDisplayName("TextInput");
					Object.defineProperty(this, "TextInput", {
						value,
						configurable: true
					});
					return value;
				},
				get SlideIn() {
					const value = BdApi.findModuleByDisplayName("SlideIn");
					Object.defineProperty(this, "SlideIn", {
						value,
						configurable: true
					});
					return value;
				},
				get SettingsNotice() {
					const value = BdApi.findModuleByDisplayName("SettingsNotice");
					Object.defineProperty(this, "SettingsNotice", {
						value,
						configurable: true
					});
					return value;
				},
				get TransitionGroup() {
					const value = BdApi.findModuleByDisplayName("TransitionGroup");
					Object.defineProperty(this, "TransitionGroup", {
						value,
						configurable: true
					});
					return value;
				},
				get Button() {
					const value = BdApi.findModuleByProps("DropdownSizes");
					Object.defineProperty(this, "Button", {
						value,
						configurable: true
					});
					return value;
				},
				get Flex() {
					const value = BdApi.findModuleByDisplayName("Flex");
					Object.defineProperty(this, "Flex", {
						value,
						configurable: true
					});
					return value;
				},
				get Text() {
					const value = BdApi.findModuleByDisplayName("Text");
					Object.defineProperty(this, "Text", {
						value,
						configurable: true
					});
					return value;
				},
				get Card() {
					const value = BdApi.findModuleByDisplayName("Card");
					Object.defineProperty(this, "Card", {
						value,
						configurable: true
					});
					return value;
				}
			};
			const external_BdApi_findModuleByProps_getLocale_namespaceObject = BdApi.findModuleByProps("getLocale");
			var external_BdApi_React_ = __webpack_require__(698);
			var components_select = __webpack_require__(469);
			const external_get_joinClassNames_n_const_value_BdApi_findModule_m_typeof_m_default_default_function_default_n_Object_defineProperty_this_joinClassNames_n_value_n_configurable_true_n_n_return_value_n_nget_useForceUpdate_n_const_value_BdApi_findModuleByProps_useForceUpdate_useForceUpdate_n_Object_defineProperty_this_useForceUpdate_n_value_n_configurable_true_n_n_return_value_n_nget_Logger_n_const_value_BdApi_findModuleByProps_setLogFn_default_n_Object_defineProperty_this_Logger_n_value_n_configurable_true_n_n_return_value_n_nget_Navigation_n_const_value_BdApi_findModuleByProps_replaceWith_n_Object_defineProperty_this_Navigation_n_value_n_configurable_true_n_n_return_value_n_namespaceObject = {
				get joinClassNames() {
					const value = BdApi.findModule((m => "function" === typeof m?.default?.default))?.default;
					Object.defineProperty(this, "joinClassNames", {
						value,
						configurable: true
					});
					return value;
				},
				get useForceUpdate() {
					const value = BdApi.findModuleByProps("useForceUpdate")?.useForceUpdate;
					Object.defineProperty(this, "useForceUpdate", {
						value,
						configurable: true
					});
					return value;
				},
				get Logger() {
					const value = BdApi.findModuleByProps("setLogFn")?.default;
					Object.defineProperty(this, "Logger", {
						value,
						configurable: true
					});
					return value;
				},
				get Navigation() {
					const value = BdApi.findModuleByProps("replaceWith");
					Object.defineProperty(this, "Navigation", {
						value,
						configurable: true
					});
					return value;
				}
			};
			var React = __webpack_require__(698);
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
			function Select({
				value,
				options,
				label,
				onChange
			}) {
				const [selected, setSelected] = (0, external_BdApi_React_.useState)(value);
				const renderPopout = props => React.createElement("div", _extends({}, props, {
					className: components_select.Z.container
				}), options.map(((option, index) => React.createElement("div", {
					className: (0, external_get_joinClassNames_n_const_value_BdApi_findModule_m_typeof_m_default_default_function_default_n_Object_defineProperty_this_joinClassNames_n_value_n_configurable_true_n_n_return_value_n_nget_useForceUpdate_n_const_value_BdApi_findModuleByProps_useForceUpdate_useForceUpdate_n_Object_defineProperty_this_useForceUpdate_n_value_n_configurable_true_n_n_return_value_n_nget_Logger_n_const_value_BdApi_findModuleByProps_setLogFn_default_n_Object_defineProperty_this_Logger_n_value_n_configurable_true_n_n_return_value_n_nget_Navigation_n_const_value_BdApi_findModuleByProps_replaceWith_n_Object_defineProperty_this_Navigation_n_value_n_configurable_true_n_n_return_value_n_namespaceObject.joinClassNames)(components_select.Z.option, {
						[components_select.Z.selected]: (null === selected || void 0 === selected ? void 0 : selected.value) === option.value
					}),
					key: index,
					onClick: () => {
						setSelected(option);
						onChange(option);
						props.closePopout();
					}
				}, option.label))));
				return React.createElement(Popout, {
					renderPopout,
					align: "center",
					animation: Popout.Animation.FADE,
					position: "bottom"
				}, (props => React.createElement(external_get_Tooltip_n_const_value_BdApi_findModuleByDisplayName_Tooltip_n_Object_defineProperty_this_Tooltip_n_value_n_configurable_true_n_n_return_value_n_nget_TooltipContainer_n_const_value_BdApi_findModuleByProps_TooltipContainer_TooltipContainer_n_Object_defineProperty_this_TooltipContainer_n_value_n_configurable_true_n_n_return_value_n_nget_TextInput_n_const_value_BdApi_findModuleByDisplayName_TextInput_n_Object_defineProperty_this_TextInput_n_value_n_configurable_true_n_n_return_value_n_nget_SlideIn_n_const_value_BdApi_findModuleByDisplayName_SlideIn_n_Object_defineProperty_this_SlideIn_n_value_n_configurable_true_n_n_return_value_n_nget_SettingsNotice_n_const_value_BdApi_findModuleByDisplayName_SettingsNotice_n_Object_defineProperty_this_SettingsNotice_n_value_n_configurable_true_n_n_return_value_n_nget_TransitionGroup_n_const_value_BdApi_findModuleByDisplayName_TransitionGroup_n_Object_defineProperty_this_TransitionGroup_n_value_n_configurable_true_n_n_return_value_n_nget_Button_n_const_value_BdApi_findModuleByProps_DropdownSizes_n_Object_defineProperty_this_Button_n_value_n_configurable_true_n_n_return_value_n_nget_Flex_n_const_value_BdApi_findModuleByDisplayName_Flex_n_Object_defineProperty_this_Flex_n_value_n_configurable_true_n_n_return_value_n_nget_Text_n_const_value_BdApi_findModuleByDisplayName_Text_n_Object_defineProperty_this_Text_n_value_n_configurable_true_n_n_return_value_n_nget_Card_n_const_value_BdApi_findModuleByDisplayName_Card_n_Object_defineProperty_this_Card_n_value_n_configurable_true_n_n_return_value_n_namespaceObject.Flex, {
					className: components_select.Z.select,
					shrink: 0,
					grow: 0,
					align: external_get_Tooltip_n_const_value_BdApi_findModuleByDisplayName_Tooltip_n_Object_defineProperty_this_Tooltip_n_value_n_configurable_true_n_n_return_value_n_nget_TooltipContainer_n_const_value_BdApi_findModuleByProps_TooltipContainer_TooltipContainer_n_Object_defineProperty_this_TooltipContainer_n_value_n_configurable_true_n_n_return_value_n_nget_TextInput_n_const_value_BdApi_findModuleByDisplayName_TextInput_n_Object_defineProperty_this_TextInput_n_value_n_configurable_true_n_n_return_value_n_nget_SlideIn_n_const_value_BdApi_findModuleByDisplayName_SlideIn_n_Object_defineProperty_this_SlideIn_n_value_n_configurable_true_n_n_return_value_n_nget_SettingsNotice_n_const_value_BdApi_findModuleByDisplayName_SettingsNotice_n_Object_defineProperty_this_SettingsNotice_n_value_n_configurable_true_n_n_return_value_n_nget_TransitionGroup_n_const_value_BdApi_findModuleByDisplayName_TransitionGroup_n_Object_defineProperty_this_TransitionGroup_n_value_n_configurable_true_n_n_return_value_n_nget_Button_n_const_value_BdApi_findModuleByProps_DropdownSizes_n_Object_defineProperty_this_Button_n_value_n_configurable_true_n_n_return_value_n_nget_Flex_n_const_value_BdApi_findModuleByDisplayName_Flex_n_Object_defineProperty_this_Flex_n_value_n_configurable_true_n_n_return_value_n_nget_Text_n_const_value_BdApi_findModuleByDisplayName_Text_n_Object_defineProperty_this_Text_n_value_n_configurable_true_n_n_return_value_n_nget_Card_n_const_value_BdApi_findModuleByDisplayName_Card_n_Object_defineProperty_this_Card_n_value_n_configurable_true_n_n_return_value_n_namespaceObject.Flex.Align.CENTER,
					justify: external_get_Tooltip_n_const_value_BdApi_findModuleByDisplayName_Tooltip_n_Object_defineProperty_this_Tooltip_n_value_n_configurable_true_n_n_return_value_n_nget_TooltipContainer_n_const_value_BdApi_findModuleByProps_TooltipContainer_TooltipContainer_n_Object_defineProperty_this_TooltipContainer_n_value_n_configurable_true_n_n_return_value_n_nget_TextInput_n_const_value_BdApi_findModuleByDisplayName_TextInput_n_Object_defineProperty_this_TextInput_n_value_n_configurable_true_n_n_return_value_n_nget_SlideIn_n_const_value_BdApi_findModuleByDisplayName_SlideIn_n_Object_defineProperty_this_SlideIn_n_value_n_configurable_true_n_n_return_value_n_nget_SettingsNotice_n_const_value_BdApi_findModuleByDisplayName_SettingsNotice_n_Object_defineProperty_this_SettingsNotice_n_value_n_configurable_true_n_n_return_value_n_nget_TransitionGroup_n_const_value_BdApi_findModuleByDisplayName_TransitionGroup_n_Object_defineProperty_this_TransitionGroup_n_value_n_configurable_true_n_n_return_value_n_nget_Button_n_const_value_BdApi_findModuleByProps_DropdownSizes_n_Object_defineProperty_this_Button_n_value_n_configurable_true_n_n_return_value_n_nget_Flex_n_const_value_BdApi_findModuleByDisplayName_Flex_n_Object_defineProperty_this_Flex_n_value_n_configurable_true_n_n_return_value_n_nget_Text_n_const_value_BdApi_findModuleByDisplayName_Text_n_Object_defineProperty_this_Text_n_value_n_configurable_true_n_n_return_value_n_nget_Card_n_const_value_BdApi_findModuleByDisplayName_Card_n_Object_defineProperty_this_Card_n_value_n_configurable_true_n_n_return_value_n_namespaceObject.Flex.Justify.END,
					onClick: props.onClick
				}, React.createElement(external_get_Tooltip_n_const_value_BdApi_findModuleByDisplayName_Tooltip_n_Object_defineProperty_this_Tooltip_n_value_n_configurable_true_n_n_return_value_n_nget_TooltipContainer_n_const_value_BdApi_findModuleByProps_TooltipContainer_TooltipContainer_n_Object_defineProperty_this_TooltipContainer_n_value_n_configurable_true_n_n_return_value_n_nget_TextInput_n_const_value_BdApi_findModuleByDisplayName_TextInput_n_Object_defineProperty_this_TextInput_n_value_n_configurable_true_n_n_return_value_n_nget_SlideIn_n_const_value_BdApi_findModuleByDisplayName_SlideIn_n_Object_defineProperty_this_SlideIn_n_value_n_configurable_true_n_n_return_value_n_nget_SettingsNotice_n_const_value_BdApi_findModuleByDisplayName_SettingsNotice_n_Object_defineProperty_this_SettingsNotice_n_value_n_configurable_true_n_n_return_value_n_nget_TransitionGroup_n_const_value_BdApi_findModuleByDisplayName_TransitionGroup_n_Object_defineProperty_this_TransitionGroup_n_value_n_configurable_true_n_n_return_value_n_nget_Button_n_const_value_BdApi_findModuleByProps_DropdownSizes_n_Object_defineProperty_this_Button_n_value_n_configurable_true_n_n_return_value_n_nget_Flex_n_const_value_BdApi_findModuleByDisplayName_Flex_n_Object_defineProperty_this_Flex_n_value_n_configurable_true_n_n_return_value_n_nget_Text_n_const_value_BdApi_findModuleByDisplayName_Text_n_Object_defineProperty_this_Text_n_value_n_configurable_true_n_n_return_value_n_nget_Card_n_const_value_BdApi_findModuleByDisplayName_Card_n_Object_defineProperty_this_Card_n_value_n_configurable_true_n_n_return_value_n_namespaceObject.Text, {
					color: external_get_Tooltip_n_const_value_BdApi_findModuleByDisplayName_Tooltip_n_Object_defineProperty_this_Tooltip_n_value_n_configurable_true_n_n_return_value_n_nget_TooltipContainer_n_const_value_BdApi_findModuleByProps_TooltipContainer_TooltipContainer_n_Object_defineProperty_this_TooltipContainer_n_value_n_configurable_true_n_n_return_value_n_nget_TextInput_n_const_value_BdApi_findModuleByDisplayName_TextInput_n_Object_defineProperty_this_TextInput_n_value_n_configurable_true_n_n_return_value_n_nget_SlideIn_n_const_value_BdApi_findModuleByDisplayName_SlideIn_n_Object_defineProperty_this_SlideIn_n_value_n_configurable_true_n_n_return_value_n_nget_SettingsNotice_n_const_value_BdApi_findModuleByDisplayName_SettingsNotice_n_Object_defineProperty_this_SettingsNotice_n_value_n_configurable_true_n_n_return_value_n_nget_TransitionGroup_n_const_value_BdApi_findModuleByDisplayName_TransitionGroup_n_Object_defineProperty_this_TransitionGroup_n_value_n_configurable_true_n_n_return_value_n_nget_Button_n_const_value_BdApi_findModuleByProps_DropdownSizes_n_Object_defineProperty_this_Button_n_value_n_configurable_true_n_n_return_value_n_nget_Flex_n_const_value_BdApi_findModuleByDisplayName_Flex_n_Object_defineProperty_this_Flex_n_value_n_configurable_true_n_n_return_value_n_nget_Text_n_const_value_BdApi_findModuleByDisplayName_Text_n_Object_defineProperty_this_Text_n_value_n_configurable_true_n_n_return_value_n_nget_Card_n_const_value_BdApi_findModuleByDisplayName_Card_n_Object_defineProperty_this_Card_n_value_n_configurable_true_n_n_return_value_n_namespaceObject.Text.Colors.MUTED
				}, label), React.createElement(external_get_Tooltip_n_const_value_BdApi_findModuleByDisplayName_Tooltip_n_Object_defineProperty_this_Tooltip_n_value_n_configurable_true_n_n_return_value_n_nget_TooltipContainer_n_const_value_BdApi_findModuleByProps_TooltipContainer_TooltipContainer_n_Object_defineProperty_this_TooltipContainer_n_value_n_configurable_true_n_n_return_value_n_nget_TextInput_n_const_value_BdApi_findModuleByDisplayName_TextInput_n_Object_defineProperty_this_TextInput_n_value_n_configurable_true_n_n_return_value_n_nget_SlideIn_n_const_value_BdApi_findModuleByDisplayName_SlideIn_n_Object_defineProperty_this_SlideIn_n_value_n_configurable_true_n_n_return_value_n_nget_SettingsNotice_n_const_value_BdApi_findModuleByDisplayName_SettingsNotice_n_Object_defineProperty_this_SettingsNotice_n_value_n_configurable_true_n_n_return_value_n_nget_TransitionGroup_n_const_value_BdApi_findModuleByDisplayName_TransitionGroup_n_Object_defineProperty_this_TransitionGroup_n_value_n_configurable_true_n_n_return_value_n_nget_Button_n_const_value_BdApi_findModuleByProps_DropdownSizes_n_Object_defineProperty_this_Button_n_value_n_configurable_true_n_n_return_value_n_nget_Flex_n_const_value_BdApi_findModuleByDisplayName_Flex_n_Object_defineProperty_this_Flex_n_value_n_configurable_true_n_n_return_value_n_nget_Text_n_const_value_BdApi_findModuleByDisplayName_Text_n_Object_defineProperty_this_Text_n_value_n_configurable_true_n_n_return_value_n_nget_Card_n_const_value_BdApi_findModuleByDisplayName_Card_n_Object_defineProperty_this_Card_n_value_n_configurable_true_n_n_return_value_n_namespaceObject.Text, {
					className: components_select.Z.selectedText,
					color: external_get_Tooltip_n_const_value_BdApi_findModuleByDisplayName_Tooltip_n_Object_defineProperty_this_Tooltip_n_value_n_configurable_true_n_n_return_value_n_nget_TooltipContainer_n_const_value_BdApi_findModuleByProps_TooltipContainer_TooltipContainer_n_Object_defineProperty_this_TooltipContainer_n_value_n_configurable_true_n_n_return_value_n_nget_TextInput_n_const_value_BdApi_findModuleByDisplayName_TextInput_n_Object_defineProperty_this_TextInput_n_value_n_configurable_true_n_n_return_value_n_nget_SlideIn_n_const_value_BdApi_findModuleByDisplayName_SlideIn_n_Object_defineProperty_this_SlideIn_n_value_n_configurable_true_n_n_return_value_n_nget_SettingsNotice_n_const_value_BdApi_findModuleByDisplayName_SettingsNotice_n_Object_defineProperty_this_SettingsNotice_n_value_n_configurable_true_n_n_return_value_n_nget_TransitionGroup_n_const_value_BdApi_findModuleByDisplayName_TransitionGroup_n_Object_defineProperty_this_TransitionGroup_n_value_n_configurable_true_n_n_return_value_n_nget_Button_n_const_value_BdApi_findModuleByProps_DropdownSizes_n_Object_defineProperty_this_Button_n_value_n_configurable_true_n_n_return_value_n_nget_Flex_n_const_value_BdApi_findModuleByDisplayName_Flex_n_Object_defineProperty_this_Flex_n_value_n_configurable_true_n_n_return_value_n_nget_Text_n_const_value_BdApi_findModuleByDisplayName_Text_n_Object_defineProperty_this_Text_n_value_n_configurable_true_n_n_return_value_n_nget_Card_n_const_value_BdApi_findModuleByDisplayName_Card_n_Object_defineProperty_this_Card_n_value_n_configurable_true_n_n_return_value_n_namespaceObject.Text.Colors.INTERACTIVE_NORMAL
				}, null === selected || void 0 === selected ? void 0 : selected.label), React.createElement(Caret, {
					direction: Caret.Directions.DOWN,
					className: external_get_Tooltip_n_const_value_BdApi_findModuleByDisplayName_Tooltip_n_Object_defineProperty_this_Tooltip_n_value_n_configurable_true_n_n_return_value_n_nget_TooltipContainer_n_const_value_BdApi_findModuleByProps_TooltipContainer_TooltipContainer_n_Object_defineProperty_this_TooltipContainer_n_value_n_configurable_true_n_n_return_value_n_nget_TextInput_n_const_value_BdApi_findModuleByDisplayName_TextInput_n_Object_defineProperty_this_TextInput_n_value_n_configurable_true_n_n_return_value_n_nget_SlideIn_n_const_value_BdApi_findModuleByDisplayName_SlideIn_n_Object_defineProperty_this_SlideIn_n_value_n_configurable_true_n_n_return_value_n_nget_SettingsNotice_n_const_value_BdApi_findModuleByDisplayName_SettingsNotice_n_Object_defineProperty_this_SettingsNotice_n_value_n_configurable_true_n_n_return_value_n_nget_TransitionGroup_n_const_value_BdApi_findModuleByDisplayName_TransitionGroup_n_Object_defineProperty_this_TransitionGroup_n_value_n_configurable_true_n_n_return_value_n_nget_Button_n_const_value_BdApi_findModuleByProps_DropdownSizes_n_Object_defineProperty_this_Button_n_value_n_configurable_true_n_n_return_value_n_nget_Flex_n_const_value_BdApi_findModuleByDisplayName_Flex_n_Object_defineProperty_this_Flex_n_value_n_configurable_true_n_n_return_value_n_nget_Text_n_const_value_BdApi_findModuleByDisplayName_Text_n_Object_defineProperty_this_Text_n_value_n_configurable_true_n_n_return_value_n_nget_Card_n_const_value_BdApi_findModuleByDisplayName_Card_n_Object_defineProperty_this_Card_n_value_n_configurable_true_n_n_return_value_n_namespaceObject.Text.Colors.INTERACTIVE_NORMAL
				}))));
			}
			var createUpdateWrapper_React = __webpack_require__(698);
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
			const createUpdateWrapper = (Component, valueProp = "value", changeProp = "onChange") => props => {
				const [value, setValue] = createUpdateWrapper_React.useState(props[valueProp]);
				return createUpdateWrapper_React.createElement(Component, createUpdateWrapper_extends({}, props, {
					[valueProp]: value,
					[changeProp]: value => {
						if ("function" === typeof props[changeProp]) props[changeProp](value);
						setValue(value);
					}
				}));
			};
			const hooks_createUpdateWrapper = createUpdateWrapper;
			var settings_React = __webpack_require__(698);
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
					var _event$preventDefault, _event$stopPropagatio;
					null === (_event$preventDefault = event.preventDefault) || void 0 === _event$preventDefault ? void 0 : _event$preventDefault.call(event);
					null === (_event$stopPropagatio = event.stopPropagation) || void 0 === _event$stopPropagatio ? void 0 : _event$stopPropagatio.call(event);
					return func.apply(this, arguments);
				};
			}
			var BetterBannedUsers_React = __webpack_require__(698);
			const RemoveButton = external_PluginApi_namespaceObject.WebpackModules.getByDisplayName("RemoveButton");
			const GuildActions = external_PluginApi_namespaceObject.WebpackModules.getByProps("unbanUser");
			const SearchBar = external_PluginApi_namespaceObject.WebpackModules.getByDisplayName("SearchBar");
			const GuildSettings = external_PluginApi_namespaceObject.WebpackModules.getByProps("updateMemberRoles");
			const Util = external_PluginApi_namespaceObject.WebpackModules.getByProps("cachedFunction");
			class BetterBannedUsers extends(external_BasePlugin_default()) {
				onStart() {
					external_n_inject_name_config_info_name_n_if_style_element_style_element_remove_n_style_element_document_head_appendChild_Object_assign_document_createElement_style_id_name_textContent_plugin_styles_n_n_remove_n_if_style_element_n_style_element_remove_n_style_element_null_n_n_n_default().inject();
					this.patchBannedUser();
					this.patchBannedUsers();
				}
				getSettingsPanel() {
					return BetterBannedUsers_React.createElement(SettingsPanel, null);
				}
				getSingleClass(...props) {
					var _WebpackModules$getBy;
					return "." + (null === (_WebpackModules$getBy = external_PluginApi_namespaceObject.WebpackModules.getByProps(...props)) || void 0 === _WebpackModules$getBy ? void 0 : _WebpackModules$getBy[props[0]]);
				}
				async patchBannedUser() {
					const BannedUser = await external_PluginApi_namespaceObject.ReactComponents.getComponentByName("BannedUser", this.getSingleClass(["bannedUser"]));
					external_PluginApi_namespaceObject.Patcher.after(BannedUser.component.prototype, "render", ((that, _, res) => {
						var _res$props;
						if (!Array.isArray(null === res || void 0 === res ? void 0 : null === (_res$props = res.props) || void 0 === _res$props ? void 0 : _res$props.children)) return;
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
						}, ban.reason ?? external_BdApi_findModuleByProps_getLocale_namespaceObject.Messages.NO_BAN_REASON) : null), settings.get("quickUnban", true) ? BetterBannedUsers_React.createElement(RemoveButton, {
							className: banned.Z.remove,
							onClick: preventPropagation((() => {
								this.unbanUser(guild.id, user);
							}))
						}) : null);
					}));
					BannedUser.forceUpdateAll();
				}
				async patchBannedUsers() {
					const BannedUsers = external_PluginApi_namespaceObject.WebpackModules.getByDisplayName("FluxContainer(GuildSettingsBans)").prototype.render.call({
						memoizedGetStateFromStores: () => {}
					}).type;
					external_PluginApi_namespaceObject.Patcher.before(BannedUsers.prototype, "render", (that => {
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
							if (~userIds.indexOf(searchQuery)) return [external_get_Messages_n_const_value_BdApi_findModuleByProps_getMessage_getMessages_n_Object_defineProperty_this_Messages_n_value_n_configurable_true_n_n_return_value_n_nget_Channels_n_const_value_BdApi_findModuleByProps_getChannel_n_Object_defineProperty_this_Channels_n_value_n_configurable_true_n_n_return_value_n_nget_Guilds_n_const_value_BdApi_findModuleByProps_getGuild_n_Object_defineProperty_this_Guilds_n_value_n_configurable_true_n_n_return_value_n_nget_SelectedGuilds_n_const_value_BdApi_findModuleByProps_getGuildId_getLastSelectedGuildId_n_Object_defineProperty_this_SelectedGuilds_n_value_n_configurable_true_n_n_return_value_n_nget_SelectedChannels_n_const_value_BdApi_findModuleByProps_getChannelId_getLastSelectedChannelId_n_Object_defineProperty_this_SelectedChannels_n_value_n_configurable_true_n_n_return_value_n_nget_Info_n_const_value_BdApi_findModuleByProps_getCurrentUser_n_Object_defineProperty_this_Info_n_value_n_configurable_true_n_n_return_value_n_nget_Status_n_const_value_BdApi_findModuleByProps_getStatus_n_Object_defineProperty_this_Status_n_value_n_configurable_true_n_n_return_value_n_nget_Users_n_const_value_BdApi_findModuleByProps_getUser_n_Object_defineProperty_this_Users_n_value_n_configurable_true_n_n_return_value_n_nget_Settings_n_const_value_BdApi_findModuleByProps_afkTimeout_status_n_Object_defineProperty_this_Settings_n_value_n_configurable_true_n_n_return_value_n_nget_UserProfile_n_const_value_BdApi_findModuleByProps_getUserProfile_n_Object_defineProperty_this_UserProfile_n_value_n_configurable_true_n_n_return_value_n_nget_Members_n_const_value_BdApi_findModuleByProps_getMember_n_Object_defineProperty_this_Members_n_value_n_configurable_true_n_n_return_value_n_nget_Activities_n_const_value_BdApi_findModuleByProps_getActivities_n_Object_defineProperty_this_Activities_n_value_n_configurable_true_n_n_return_value_n_nget_Games_n_const_value_BdApi_findModuleByProps_getGame_n_Object_defineProperty_this_Games_n_value_n_configurable_true_n_n_return_value_n_nget_Auth_n_const_value_BdApi_findModuleByProps_getId_isGuest_n_Object_defineProperty_this_Auth_n_value_n_configurable_true_n_n_return_value_n_nget_TypingUsers_n_const_value_BdApi_findModuleByProps_isTyping_n_Object_defineProperty_this_TypingUsers_n_value_n_configurable_true_n_n_return_value_n_namespaceObject.Users.getUser(searchQuery)];
							let users = userIds.map(external_get_Messages_n_const_value_BdApi_findModuleByProps_getMessage_getMessages_n_Object_defineProperty_this_Messages_n_value_n_configurable_true_n_n_return_value_n_nget_Channels_n_const_value_BdApi_findModuleByProps_getChannel_n_Object_defineProperty_this_Channels_n_value_n_configurable_true_n_n_return_value_n_nget_Guilds_n_const_value_BdApi_findModuleByProps_getGuild_n_Object_defineProperty_this_Guilds_n_value_n_configurable_true_n_n_return_value_n_nget_SelectedGuilds_n_const_value_BdApi_findModuleByProps_getGuildId_getLastSelectedGuildId_n_Object_defineProperty_this_SelectedGuilds_n_value_n_configurable_true_n_n_return_value_n_nget_SelectedChannels_n_const_value_BdApi_findModuleByProps_getChannelId_getLastSelectedChannelId_n_Object_defineProperty_this_SelectedChannels_n_value_n_configurable_true_n_n_return_value_n_nget_Info_n_const_value_BdApi_findModuleByProps_getCurrentUser_n_Object_defineProperty_this_Info_n_value_n_configurable_true_n_n_return_value_n_nget_Status_n_const_value_BdApi_findModuleByProps_getStatus_n_Object_defineProperty_this_Status_n_value_n_configurable_true_n_n_return_value_n_nget_Users_n_const_value_BdApi_findModuleByProps_getUser_n_Object_defineProperty_this_Users_n_value_n_configurable_true_n_n_return_value_n_nget_Settings_n_const_value_BdApi_findModuleByProps_afkTimeout_status_n_Object_defineProperty_this_Settings_n_value_n_configurable_true_n_n_return_value_n_nget_UserProfile_n_const_value_BdApi_findModuleByProps_getUserProfile_n_Object_defineProperty_this_UserProfile_n_value_n_configurable_true_n_n_return_value_n_nget_Members_n_const_value_BdApi_findModuleByProps_getMember_n_Object_defineProperty_this_Members_n_value_n_configurable_true_n_n_return_value_n_nget_Activities_n_const_value_BdApi_findModuleByProps_getActivities_n_Object_defineProperty_this_Activities_n_value_n_configurable_true_n_n_return_value_n_nget_Games_n_const_value_BdApi_findModuleByProps_getGame_n_Object_defineProperty_this_Games_n_value_n_configurable_true_n_n_return_value_n_nget_Auth_n_const_value_BdApi_findModuleByProps_getId_isGuest_n_Object_defineProperty_this_Auth_n_value_n_configurable_true_n_n_return_value_n_nget_TypingUsers_n_const_value_BdApi_findModuleByProps_isTyping_n_Object_defineProperty_this_TypingUsers_n_value_n_configurable_true_n_n_return_value_n_namespaceObject.Users.getUser);
							const tester = new RegExp(`^${external_window_default().escape(searchQuery)}`, "i");
							if (searchQuery) users = users.filter((user => {
								var _bans$user$id;
								return tester.test(null === user || void 0 === user ? void 0 : user.username) || tester.test(null === (_bans$user$id = bans[user.id]) || void 0 === _bans$user$id ? void 0 : _bans$user$id.reason);
							}));
							users = users.sortBy((e => {
								var _bans$e$id, _bans$e$id$reason;
								return "username" === sort.value ? e.username.toLowerCase() : (null === (_bans$e$id = bans[e.id]) || void 0 === _bans$e$id ? void 0 : null === (_bans$e$id$reason = _bans$e$id.reason) || void 0 === _bans$e$id$reason ? void 0 : _bans$e$id$reason.length) ?? 0;
							}));
							if ("ascending" === order.value) users = users.reverse();
							return users.value();
						}));
						const original = that.renderSection;
						that.renderSection = function() {
							const res = original(...arguments);
							const message = res.props.children[0].props.children[0];
							res.props.children[0] = BetterBannedUsers_React.createElement(external_get_Tooltip_n_const_value_BdApi_findModuleByDisplayName_Tooltip_n_Object_defineProperty_this_Tooltip_n_value_n_configurable_true_n_n_return_value_n_nget_TooltipContainer_n_const_value_BdApi_findModuleByProps_TooltipContainer_TooltipContainer_n_Object_defineProperty_this_TooltipContainer_n_value_n_configurable_true_n_n_return_value_n_nget_TextInput_n_const_value_BdApi_findModuleByDisplayName_TextInput_n_Object_defineProperty_this_TextInput_n_value_n_configurable_true_n_n_return_value_n_nget_SlideIn_n_const_value_BdApi_findModuleByDisplayName_SlideIn_n_Object_defineProperty_this_SlideIn_n_value_n_configurable_true_n_n_return_value_n_nget_SettingsNotice_n_const_value_BdApi_findModuleByDisplayName_SettingsNotice_n_Object_defineProperty_this_SettingsNotice_n_value_n_configurable_true_n_n_return_value_n_nget_TransitionGroup_n_const_value_BdApi_findModuleByDisplayName_TransitionGroup_n_Object_defineProperty_this_TransitionGroup_n_value_n_configurable_true_n_n_return_value_n_nget_Button_n_const_value_BdApi_findModuleByProps_DropdownSizes_n_Object_defineProperty_this_Button_n_value_n_configurable_true_n_n_return_value_n_nget_Flex_n_const_value_BdApi_findModuleByDisplayName_Flex_n_Object_defineProperty_this_Flex_n_value_n_configurable_true_n_n_return_value_n_nget_Text_n_const_value_BdApi_findModuleByDisplayName_Text_n_Object_defineProperty_this_Text_n_value_n_configurable_true_n_n_return_value_n_nget_Card_n_const_value_BdApi_findModuleByDisplayName_Card_n_Object_defineProperty_this_Card_n_value_n_configurable_true_n_n_return_value_n_namespaceObject.Flex, {
								direction: external_get_Tooltip_n_const_value_BdApi_findModuleByDisplayName_Tooltip_n_Object_defineProperty_this_Tooltip_n_value_n_configurable_true_n_n_return_value_n_nget_TooltipContainer_n_const_value_BdApi_findModuleByProps_TooltipContainer_TooltipContainer_n_Object_defineProperty_this_TooltipContainer_n_value_n_configurable_true_n_n_return_value_n_nget_TextInput_n_const_value_BdApi_findModuleByDisplayName_TextInput_n_Object_defineProperty_this_TextInput_n_value_n_configurable_true_n_n_return_value_n_nget_SlideIn_n_const_value_BdApi_findModuleByDisplayName_SlideIn_n_Object_defineProperty_this_SlideIn_n_value_n_configurable_true_n_n_return_value_n_nget_SettingsNotice_n_const_value_BdApi_findModuleByDisplayName_SettingsNotice_n_Object_defineProperty_this_SettingsNotice_n_value_n_configurable_true_n_n_return_value_n_nget_TransitionGroup_n_const_value_BdApi_findModuleByDisplayName_TransitionGroup_n_Object_defineProperty_this_TransitionGroup_n_value_n_configurable_true_n_n_return_value_n_nget_Button_n_const_value_BdApi_findModuleByProps_DropdownSizes_n_Object_defineProperty_this_Button_n_value_n_configurable_true_n_n_return_value_n_nget_Flex_n_const_value_BdApi_findModuleByDisplayName_Flex_n_Object_defineProperty_this_Flex_n_value_n_configurable_true_n_n_return_value_n_nget_Text_n_const_value_BdApi_findModuleByDisplayName_Text_n_Object_defineProperty_this_Text_n_value_n_configurable_true_n_n_return_value_n_nget_Card_n_const_value_BdApi_findModuleByDisplayName_Card_n_Object_defineProperty_this_Card_n_value_n_configurable_true_n_n_return_value_n_namespaceObject.Flex.Direction.VERTICAL,
								className: banned.Z.container
							}, message, BetterBannedUsers_React.createElement(external_get_Tooltip_n_const_value_BdApi_findModuleByDisplayName_Tooltip_n_Object_defineProperty_this_Tooltip_n_value_n_configurable_true_n_n_return_value_n_nget_TooltipContainer_n_const_value_BdApi_findModuleByProps_TooltipContainer_TooltipContainer_n_Object_defineProperty_this_TooltipContainer_n_value_n_configurable_true_n_n_return_value_n_nget_TextInput_n_const_value_BdApi_findModuleByDisplayName_TextInput_n_Object_defineProperty_this_TextInput_n_value_n_configurable_true_n_n_return_value_n_nget_SlideIn_n_const_value_BdApi_findModuleByDisplayName_SlideIn_n_Object_defineProperty_this_SlideIn_n_value_n_configurable_true_n_n_return_value_n_nget_SettingsNotice_n_const_value_BdApi_findModuleByDisplayName_SettingsNotice_n_Object_defineProperty_this_SettingsNotice_n_value_n_configurable_true_n_n_return_value_n_nget_TransitionGroup_n_const_value_BdApi_findModuleByDisplayName_TransitionGroup_n_Object_defineProperty_this_TransitionGroup_n_value_n_configurable_true_n_n_return_value_n_nget_Button_n_const_value_BdApi_findModuleByProps_DropdownSizes_n_Object_defineProperty_this_Button_n_value_n_configurable_true_n_n_return_value_n_nget_Flex_n_const_value_BdApi_findModuleByDisplayName_Flex_n_Object_defineProperty_this_Flex_n_value_n_configurable_true_n_n_return_value_n_nget_Text_n_const_value_BdApi_findModuleByDisplayName_Text_n_Object_defineProperty_this_Text_n_value_n_configurable_true_n_n_return_value_n_nget_Card_n_const_value_BdApi_findModuleByDisplayName_Card_n_Object_defineProperty_this_Card_n_value_n_configurable_true_n_n_return_value_n_namespaceObject.Flex, {
								direction: external_get_Tooltip_n_const_value_BdApi_findModuleByDisplayName_Tooltip_n_Object_defineProperty_this_Tooltip_n_value_n_configurable_true_n_n_return_value_n_nget_TooltipContainer_n_const_value_BdApi_findModuleByProps_TooltipContainer_TooltipContainer_n_Object_defineProperty_this_TooltipContainer_n_value_n_configurable_true_n_n_return_value_n_nget_TextInput_n_const_value_BdApi_findModuleByDisplayName_TextInput_n_Object_defineProperty_this_TextInput_n_value_n_configurable_true_n_n_return_value_n_nget_SlideIn_n_const_value_BdApi_findModuleByDisplayName_SlideIn_n_Object_defineProperty_this_SlideIn_n_value_n_configurable_true_n_n_return_value_n_nget_SettingsNotice_n_const_value_BdApi_findModuleByDisplayName_SettingsNotice_n_Object_defineProperty_this_SettingsNotice_n_value_n_configurable_true_n_n_return_value_n_nget_TransitionGroup_n_const_value_BdApi_findModuleByDisplayName_TransitionGroup_n_Object_defineProperty_this_TransitionGroup_n_value_n_configurable_true_n_n_return_value_n_nget_Button_n_const_value_BdApi_findModuleByProps_DropdownSizes_n_Object_defineProperty_this_Button_n_value_n_configurable_true_n_n_return_value_n_nget_Flex_n_const_value_BdApi_findModuleByDisplayName_Flex_n_Object_defineProperty_this_Flex_n_value_n_configurable_true_n_n_return_value_n_nget_Text_n_const_value_BdApi_findModuleByDisplayName_Text_n_Object_defineProperty_this_Text_n_value_n_configurable_true_n_n_return_value_n_nget_Card_n_const_value_BdApi_findModuleByDisplayName_Card_n_Object_defineProperty_this_Card_n_value_n_configurable_true_n_n_return_value_n_namespaceObject.Flex.Direction.HORIZONTAL,
								justify: external_get_Tooltip_n_const_value_BdApi_findModuleByDisplayName_Tooltip_n_Object_defineProperty_this_Tooltip_n_value_n_configurable_true_n_n_return_value_n_nget_TooltipContainer_n_const_value_BdApi_findModuleByProps_TooltipContainer_TooltipContainer_n_Object_defineProperty_this_TooltipContainer_n_value_n_configurable_true_n_n_return_value_n_nget_TextInput_n_const_value_BdApi_findModuleByDisplayName_TextInput_n_Object_defineProperty_this_TextInput_n_value_n_configurable_true_n_n_return_value_n_nget_SlideIn_n_const_value_BdApi_findModuleByDisplayName_SlideIn_n_Object_defineProperty_this_SlideIn_n_value_n_configurable_true_n_n_return_value_n_nget_SettingsNotice_n_const_value_BdApi_findModuleByDisplayName_SettingsNotice_n_Object_defineProperty_this_SettingsNotice_n_value_n_configurable_true_n_n_return_value_n_nget_TransitionGroup_n_const_value_BdApi_findModuleByDisplayName_TransitionGroup_n_Object_defineProperty_this_TransitionGroup_n_value_n_configurable_true_n_n_return_value_n_nget_Button_n_const_value_BdApi_findModuleByProps_DropdownSizes_n_Object_defineProperty_this_Button_n_value_n_configurable_true_n_n_return_value_n_nget_Flex_n_const_value_BdApi_findModuleByDisplayName_Flex_n_Object_defineProperty_this_Flex_n_value_n_configurable_true_n_n_return_value_n_nget_Text_n_const_value_BdApi_findModuleByDisplayName_Text_n_Object_defineProperty_this_Text_n_value_n_configurable_true_n_n_return_value_n_nget_Card_n_const_value_BdApi_findModuleByDisplayName_Card_n_Object_defineProperty_this_Card_n_value_n_configurable_true_n_n_return_value_n_namespaceObject.Flex.Justify.END
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
								onChange: value => {
									GuildSettings.setSearchQuery(value);
								},
								onClear: () => GuildSettings.setSearchQuery(""),
								placeholder: external_BdApi_findModuleByProps_getLocale_namespaceObject.Messages.BANS_SEARCH_PLACEHOLDER,
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
					external_PluginApi_namespaceObject.Toasts.succes(`Unbanned <span style="color: #5865f2;">${user.tag}</span>!`);
				}
				onStop() {
					external_n_inject_name_config_info_name_n_if_style_element_style_element_remove_n_style_element_document_head_appendChild_Object_assign_document_createElement_style_id_name_textContent_plugin_styles_n_n_remove_n_if_style_element_n_style_element_remove_n_style_element_null_n_n_n_default().remove();
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