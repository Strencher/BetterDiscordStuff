/**
 * @name UserDetails
 * @version 1.1.0
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
		"version": "1.1.0",
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
			"type": "fixed",
			"title": "Bugs have been reported!",
			"items": [
				"Fixed jumping to messages when clicking the last message icon.",
				"It shouldn't show things twice anymore."
			]
		},
		{
			"type": "improved",
			"title": "Improvements",
			"items": [
				"Some strings have been improved.",
				"More customization for connections. Also using a new Api.",
				"Faster loading, i mean **__FASTER__** loading connections should load now in less than 1s.",
				"Some things that i don't remember... lol"
			]
		}
	],
	"build": {
		"zlibrary": true,
		"copy": true,
		"production": false,
		"scssHash": false,
		"alias": {
			"icons": "components/icons"
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
		let __plugin_styles__ = "";
		let __style_element__ = null;
		var __webpack_modules__ = {
			815: (module, __webpack_exports__, __webpack_require__) => {
				__webpack_require__.d(__webpack_exports__, {
					Z: () => __WEBPACK_DEFAULT_EXPORT__
				});
				var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(645);
				var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = __webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
				var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()((function(i) {
					return i[1];
				}));
				___CSS_LOADER_EXPORT___.push([module.id, ".UserDetails-connections-connectionsBody div:not(.UserDetails-connections-connections,.UserDetails-connections-container){display:inline-flex;margin:5px}.UserDetails-connections-connectionsBody .UserDetails-connections-loading{fill:var(--interactive-muted);animation:UserDetails-connections-blink infinite 2s;width:30px;height:30px;margin:5px;margin-top:0;margin-left:0}.UserDetails-connections-connectionsBody .UserDetails-connections-connections{display:flex;flex-wrap:wrap;margin-bottom:8px}.UserDetails-connections-connectionsBody .UserDetails-connections-connections img{width:30px;height:30px}.UserDetails-connections-connectionsBody .UserDetails-connections-errorIcon{width:35px;height:35px;margin-top:-5px}.UserDetails-connections-connectionsBody .UserDetails-connections-errorIcon{fill:#ed4245 !important}@keyframes UserDetails-connections-blink{0%{opacity:.6}50%{opacity:.3}100%{opacity:.6}}", ""]);
				___CSS_LOADER_EXPORT___.locals = {
					connectionsBody: "UserDetails-connections-connectionsBody",
					connections: "UserDetails-connections-connections",
					container: "UserDetails-connections-container",
					loading: "UserDetails-connections-loading",
					blink: "UserDetails-connections-blink",
					errorIcon: "UserDetails-connections-errorIcon"
				};
				__plugin_styles__ += `\n/* ${module.id} */\n${___CSS_LOADER_EXPORT___}\n`;
				const __WEBPACK_DEFAULT_EXPORT__ = Object.assign(___CSS_LOADER_EXPORT___, ___CSS_LOADER_EXPORT___.locals);
			},
			785: (module, __webpack_exports__, __webpack_require__) => {
				__webpack_require__.d(__webpack_exports__, {
					Z: () => __WEBPACK_DEFAULT_EXPORT__
				});
				var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(645);
				var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = __webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
				var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()((function(i) {
					return i[1];
				}));
				___CSS_LOADER_EXPORT___.push([module.id, ".UserDetails-dates-container{display:flex;max-width:-webkit-fill-available}.UserDetails-dates-container.UserDetails-dates-text{flex-direction:column}.UserDetails-dates-container.UserDetails-dates-icons{flex-direction:row}.UserDetails-dates-container.UserDetails-dates-icons .UserDetails-dates-loading{animation:UserDetails-dates-blink infinite 2s ease-in-out}.UserDetails-dates-container svg{fill:#ddd;margin:5px;width:20px;height:20px}.UserDetails-dates-container.UserDetails-dates-text .UserDetails-dates-scrollableText{color:var(--text-normal);white-space:nowrap;position:relative;font-size:14px;width:-webkit-fill-available;text-align:left}.UserDetails-dates-container.UserDetails-dates-text.UserDetails-dates-userProfile .UserDetails-dates-scrollableText{text-align:left !important}.UserDetails-dates-container .UserDetails-dates-errorIcon{fill:#ed4245 !important}@keyframes UserDetails-dates-blink{0%{opacity:.6}50%{opacity:.3}100%{opacity:.6}}", ""]);
				___CSS_LOADER_EXPORT___.locals = {
					container: "UserDetails-dates-container",
					text: "UserDetails-dates-text",
					icons: "UserDetails-dates-icons",
					loading: "UserDetails-dates-loading",
					blink: "UserDetails-dates-blink",
					scrollableText: "UserDetails-dates-scrollableText",
					userProfile: "UserDetails-dates-userProfile",
					errorIcon: "UserDetails-dates-errorIcon"
				};
				__plugin_styles__ += `\n/* ${module.id} */\n${___CSS_LOADER_EXPORT___}\n`;
				const __WEBPACK_DEFAULT_EXPORT__ = Object.assign(___CSS_LOADER_EXPORT___, ___CSS_LOADER_EXPORT___.locals);
			},
			308: (module, __webpack_exports__, __webpack_require__) => {
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
				__plugin_styles__ += `\n/* ${module.id} */\n${___CSS_LOADER_EXPORT___}\n`;
				const __WEBPACK_DEFAULT_EXPORT__ = Object.assign(___CSS_LOADER_EXPORT___, ___CSS_LOADER_EXPORT___.locals);
			},
			303: (module, __webpack_exports__, __webpack_require__) => {
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
				__plugin_styles__ += `\n/* ${module.id} */\n${___CSS_LOADER_EXPORT___}\n`;
				const __WEBPACK_DEFAULT_EXPORT__ = Object.assign(___CSS_LOADER_EXPORT___, ___CSS_LOADER_EXPORT___.locals);
			},
			561: (module, __webpack_exports__, __webpack_require__) => {
				__webpack_require__.d(__webpack_exports__, {
					Z: () => __WEBPACK_DEFAULT_EXPORT__
				});
				var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(645);
				var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = __webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
				var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()((function(i) {
					return i[1];
				}));
				___CSS_LOADER_EXPORT___.push([module.id, ".UserDetails-settings-settingsPanel .UserDetails-settings-formItem{margin-bottom:10px}.UserDetails-settings-settingsPanel .UserDetails-settings-icons{flex-wrap:wrap}.UserDetails-settings-settingsPanel .UserDetails-settings-icons .UserDetails-settings-settingsBadgeContainer{display:inline-flex;cursor:pointer}.UserDetails-settings-settingsPanel .UserDetails-settings-icons .UserDetails-settings-settingsBadgeContainer .UserDetails-settings-settingsBadgeIcon{width:40px;height:40px}.UserDetails-settings-settingsPanel .UserDetails-settings-icons .UserDetails-settings-settingsBadgeContainer .UserDetails-settings-settingsBadgeIcon.UserDetails-settings-disabled{opacity:.4}.UserDetails-settings-settingsPanel .UserDetails-settings-category{color:#ddd}.UserDetails-settings-settingsPanel .UserDetails-settings-category.UserDetails-settings-opened .UserDetails-settings-categoryContent{padding:10px;padding:10px}.UserDetails-settings-settingsPanel .UserDetails-settings-category.UserDetails-settings-opened .UserDetails-settings-categoryContent .UserDetails-settings-replacementVariable{user-select:text;margin-bottom:6px;padding-bottom:6px;border-bottom:thin solid var(--background-modifier-accent)}.UserDetails-settings-settingsPanel .UserDetails-settings-category.UserDetails-settings-opened .UserDetails-settings-categoryContent .UserDetails-settings-replacementVariable b{margin-right:3px}.UserDetails-settings-settingsPanel .UserDetails-settings-category .UserDetails-settings-categoryHeader{cursor:pointer;padding:10px;font-size:15px;background:var(--background-tertiary);font-weight:600;text-transform:uppercase;display:flex;align-items:center}.UserDetails-settings-settingsPanel .UserDetails-settings-category .UserDetails-settings-categoryHeader .UserDetails-settings-categoryCaret{margin-left:auto}", ""]);
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
					categoryCaret: "UserDetails-settings-categoryCaret"
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
				module.exports = global["BdApi"]["React"];
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
				default: () => Plugin
			});
			const external_n_inject_n_if_style_element_style_element_remove_n_style_element_document_head_appendChild_Object_assign_document_createElement_style_textContent_plugin_styles_n_n_remove_n_if_style_element_n_style_element_remove_n_style_element_null_n_n_n_namespaceObject = {
				inject: () => {
					if (__style_element__) __style_element__.remove();
					__style_element__ = document.head.appendChild(Object.assign(document.createElement("style"), {
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
			var external_n_inject_n_if_style_element_style_element_remove_n_style_element_document_head_appendChild_Object_assign_document_createElement_style_textContent_plugin_styles_n_n_remove_n_if_style_element_n_style_element_remove_n_style_element_null_n_n_n_default = __webpack_require__.n(external_n_inject_n_if_style_element_style_element_remove_n_style_element_document_head_appendChild_Object_assign_document_createElement_style_textContent_plugin_styles_n_n_remove_n_if_style_element_n_style_element_remove_n_style_element_null_n_n_n_namespaceObject);
			var external_BdApi_React_ = __webpack_require__(698);
			var external_BdApi_React_default = __webpack_require__.n(external_BdApi_React_);
			const external_get_Tooltip_n_const_value_BdApi_findModuleByDisplayName_Tooltip_n_Object_defineProperty_this_Tooltip_n_value_n_configurable_true_n_n_return_value_n_nget_TooltipContainer_n_const_value_BdApi_findModuleByProps_TooltipContainer_TooltipContainer_n_Object_defineProperty_this_TooltipContainer_n_value_n_configurable_true_n_n_return_value_n_nget_TextInput_n_const_value_BdApi_findModuleByDisplayName_TextInput_n_Object_defineProperty_this_TextInput_n_value_n_configurable_true_n_n_return_value_n_nget_SlideIn_n_const_value_BdApi_findModuleByDisplayName_SlideIn_n_Object_defineProperty_this_SlideIn_n_value_n_configurable_true_n_n_return_value_n_nget_SettingsNotice_n_const_value_BdApi_findModuleByDisplayName_SettingsNotice_n_Object_defineProperty_this_SettingsNotice_n_value_n_configurable_true_n_n_return_value_n_nget_TransitionGroup_n_const_value_BdApi_findModuleByDisplayName_TransitionGroup_n_Object_defineProperty_this_TransitionGroup_n_value_n_configurable_true_n_n_return_value_n_nget_Button_n_const_value_BdApi_findModuleByProps_DropdownSizes_n_Object_defineProperty_this_Button_n_value_n_configurable_true_n_n_return_value_n_nget_Flex_n_const_value_BdApi_findModuleByDisplayName_Flex_n_Object_defineProperty_this_Flex_n_value_n_configurable_true_n_n_return_value_n_nget_Text_n_const_value_BdApi_findModuleByDisplayName_Text_n_Object_defineProperty_this_Text_n_value_n_configurable_true_n_n_return_value_n_namespaceObject = {
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
				}
			};
			const external_BdApi_findModuleByProps_get_isSupported_map_namespaceObject = BdApi.findModuleByProps("get", "isSupported", "map");
			var external_BdApi_findModuleByProps_get_isSupported_map_default = __webpack_require__.n(external_BdApi_findModuleByProps_get_isSupported_map_namespaceObject);
			var badge = __webpack_require__(308);
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
			const external_PluginApi_namespaceObject = PluginApi;
			const UserDetails_package = {
				info: {
					name: "UserDetails",
					version: "1.1.0",
					authors: [{
						name: "Strencher",
						discord_id: "415849376598982656",
						github_username: "Strencher",
						twitter_username: "Strencher3"
					}],
					description: "Shows you a lot information about users in popouts.",
					github: "https://github.com/Strencher/BetterDiscordStuff/UserDetails",
					github_raw: "https://raw.githubusercontent.com/Strencher/BetterDiscordStuff/master/UserDetails/UserDetails.plugin.js"
				},
				changelog: [{
					type: "fixed",
					title: "Bugs have been reported!",
					items: ["Fixed jumping to messages when clicking the last message icon.", "It shouldn't show things twice anymore."]
				}, {
					type: "improved",
					title: "Improvements",
					items: ["Some strings have been improved.", "More customization for connections. Also using a new Api.", "Faster loading, i mean **__FASTER__** loading connections should load now in less than 1s.", "Some things that i don't remember... lol"]
				}],
				build: {
					zlibrary: true,
					copy: true,
					production: false,
					scssHash: false,
					alias: {
						icons: "components/icons"
					},
					release: {
						public: true,
						source: true,
						readme: true
					}
				}
			};
			var info = {
				name: "UserDetails",
				version: "1.1.0",
				authors: [{
					name: "Strencher",
					discord_id: "415849376598982656",
					github_username: "Strencher",
					twitter_username: "Strencher3"
				}],
				description: "Shows you a lot information about users in popouts.",
				github: "https://github.com/Strencher/BetterDiscordStuff/UserDetails",
				github_raw: "https://raw.githubusercontent.com/Strencher/BetterDiscordStuff/master/UserDetails/UserDetails.plugin.js"
			};
			var changelog = [{
				type: "fixed",
				title: "Bugs have been reported!",
				items: ["Fixed jumping to messages when clicking the last message icon.", "It shouldn't show things twice anymore."]
			}, {
				type: "improved",
				title: "Improvements",
				items: ["Some strings have been improved.", "More customization for connections. Also using a new Api.", "Faster loading, i mean **__FASTER__** loading connections should load now in less than 1s.", "Some things that i don't remember... lol"]
			}];
			var build = {
				zlibrary: true,
				copy: true,
				production: false,
				scssHash: false,
				alias: {
					icons: "components/icons"
				},
				release: {
					public: true,
					source: true,
					readme: true
				}
			};
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
					console[level](`%c[${UserDetails_package.info.name}]%c`, "color: #0870f3; font-weight: 700;", "", ...message);
				}
			}
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
			class Eventhandler {
				constructor({
					events = ["done", "cancel"]
				} = {}) {
					_defineProperty(this, "subsriptions", {});
					events.forEach((ev => this.subsriptions[ev] = []));
				}
				on(event, callback) {
					if (!this.subsriptions[event]) this.subsriptions[event] = [];
					this.subsriptions[event].push(callback);
					return this;
				}
				off(event, callback) {
					if (!this.subsriptions[event]) return false;
					const index = this.subsriptions[event].indexOf(callback);
					if (-1 === index) return false;
					this.subsriptions[event].splice(index, 1);
					return this;
				}
				reply(event, ...args) {
					if (!this.subsriptions[event]) return false;
					for (const callback of this.subsriptions[event]) try {
						callback(...args);
					} catch (error) {
						Logger.error(`Cannot run callback for event "${event}": "` + callback.toString().slice(0, 10) + '..."', "\n", error);
					}
				}
				onDone(callback) {
					return this.on("done", callback);
				}
				cancel() {
					this.reply("cancel");
				}
				get emit() {
					return this.reply;
				}
			}
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
			function Settings_defineProperty(obj, key, value) {
				if (key in obj) Object.defineProperty(obj, key, {
					value,
					enumerable: true,
					configurable: true,
					writable: true
				});
				else obj[key] = value;
				return obj;
			}
			class Settings {
				static connectStore(Component) {
					return props => {
						if (!props.getSetting) Object.assign(props, {
							getSetting: this.get,
							updateSetting: this.set,
							toggleSetting: id => {
								this.set(!this.get(id));
							}
						});
						const forceUpdate = Utilities.useForceUpdate();
						(0, external_BdApi_React_.useEffect)((() => {
							this.updater.on("update", forceUpdate);
							return () => this.updater.off("update", forceUpdate);
						}), []);
						return external_BdApi_React_default().createElement(Component, props);
					};
				}
			}
			Settings_defineProperty(Settings, "updater", new Eventhandler);
			Settings_defineProperty(Settings, "settings", external_PluginApi_namespaceObject.PluginUtilities.loadSettings(UserDetails_package.info.name, {}));
			Settings_defineProperty(Settings, "get", ((key, defaultValue) => Settings.settings[key] ?? defaultValue));
			Settings_defineProperty(Settings, "set", ((key, value) => {
				Settings.settings[key] = value;
				external_PluginApi_namespaceObject.PluginUtilities.saveSettings(UserDetails_package.info.name, Settings.settings);
				Settings.updater.reply("update");
			}));
			var flowerstar = __webpack_require__(303);
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
				className: (0, external_get_joinClassNames_n_const_value_BdApi_findModule_m_typeof_m_default_default_function_default_n_Object_defineProperty_this_joinClassNames_n_value_n_configurable_true_n_n_return_value_n_nget_useForceUpdate_n_const_value_BdApi_findModuleByProps_useForceUpdate_useForceUpdate_n_Object_defineProperty_this_useForceUpdate_n_value_n_configurable_true_n_n_return_value_n_nget_Logger_n_const_value_BdApi_findModuleByProps_setLogFn_default_n_Object_defineProperty_this_Logger_n_value_n_configurable_true_n_n_return_value_n_nget_Navigation_n_const_value_BdApi_findModuleByProps_replaceWith_n_Object_defineProperty_this_Navigation_n_value_n_configurable_true_n_n_return_value_n_namespaceObject.joinClassNames)(flowerstar.Z.wrapper, props.className)
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
				const connection = external_BdApi_findModuleByProps_get_isSupported_map_default().get(item.type);
				const shouldVerified = Settings.get("showVerifiedConnections", true) && item.verified;
				return external_BdApi_React_default().createElement(external_get_Tooltip_n_const_value_BdApi_findModuleByDisplayName_Tooltip_n_Object_defineProperty_this_Tooltip_n_value_n_configurable_true_n_n_return_value_n_nget_TooltipContainer_n_const_value_BdApi_findModuleByProps_TooltipContainer_TooltipContainer_n_Object_defineProperty_this_TooltipContainer_n_value_n_configurable_true_n_n_return_value_n_nget_TextInput_n_const_value_BdApi_findModuleByDisplayName_TextInput_n_Object_defineProperty_this_TextInput_n_value_n_configurable_true_n_n_return_value_n_nget_SlideIn_n_const_value_BdApi_findModuleByDisplayName_SlideIn_n_Object_defineProperty_this_SlideIn_n_value_n_configurable_true_n_n_return_value_n_nget_SettingsNotice_n_const_value_BdApi_findModuleByDisplayName_SettingsNotice_n_Object_defineProperty_this_SettingsNotice_n_value_n_configurable_true_n_n_return_value_n_nget_TransitionGroup_n_const_value_BdApi_findModuleByDisplayName_TransitionGroup_n_Object_defineProperty_this_TransitionGroup_n_value_n_configurable_true_n_n_return_value_n_nget_Button_n_const_value_BdApi_findModuleByProps_DropdownSizes_n_Object_defineProperty_this_Button_n_value_n_configurable_true_n_n_return_value_n_nget_Flex_n_const_value_BdApi_findModuleByDisplayName_Flex_n_Object_defineProperty_this_Flex_n_value_n_configurable_true_n_n_return_value_n_nget_Text_n_const_value_BdApi_findModuleByDisplayName_Text_n_Object_defineProperty_this_Text_n_value_n_configurable_true_n_n_return_value_n_namespaceObject.TooltipContainer, {
					text: item.name,
					className: (0, external_get_joinClassNames_n_const_value_BdApi_findModule_m_typeof_m_default_default_function_default_n_Object_defineProperty_this_joinClassNames_n_value_n_configurable_true_n_n_return_value_n_nget_useForceUpdate_n_const_value_BdApi_findModuleByProps_useForceUpdate_useForceUpdate_n_Object_defineProperty_this_useForceUpdate_n_value_n_configurable_true_n_n_return_value_n_nget_Logger_n_const_value_BdApi_findModuleByProps_setLogFn_default_n_Object_defineProperty_this_Logger_n_value_n_configurable_true_n_n_return_value_n_nget_Navigation_n_const_value_BdApi_findModuleByProps_replaceWith_n_Object_defineProperty_this_Navigation_n_value_n_configurable_true_n_n_return_value_n_namespaceObject.joinClassNames)(badge.Z.connection, {
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
					var _cache$this$api, _cache$this$api$guild;
					const chunk = null === (_cache$this$api = cache[this.api]) || void 0 === _cache$this$api ? void 0 : null === (_cache$this$api$guild = _cache$this$api[guildId]) || void 0 === _cache$this$api$guild ? void 0 : _cache$this$api$guild[userId];
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
								var _error$body;
								queue.pause();
								setTimeout(queue.continue, 1e3 * ((null === (_error$body = error.body) || void 0 === _error$body ? void 0 : _error$body.retry_after) ?? 5));
							}
						}));
					} else event.reply("done", data);
				}
				parseZeroPadding(zeroable) {
					return zeroable < 9 ? "0" + zeroable : zeroable;
				}
				monthsAgo(date1, date2) {
					let months = 12 * (date2.getFullYear() - date1.getFullYear());
					months -= date1.getMonth();
					months += date2.getMonth();
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
						hour12 = Settings.get("12hour", 1);
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
			var apis_connections = __webpack_require__(815);
			const external_Object_assign_BdApi_findModuleByProps_useStateFromStores_default_BdApi_findModuleByProps_useStateFromStores_namespaceObject = Object.assign({}, BdApi.findModuleByProps("useStateFromStores").default, BdApi.findModuleByProps("useStateFromStores"));
			const external_get_Messages_n_const_value_BdApi_findModuleByProps_getMessage_getMessages_n_Object_defineProperty_this_Messages_n_value_n_configurable_true_n_n_return_value_n_nget_Channels_n_const_value_BdApi_findModuleByPorps_getChannel_n_Object_defineProperty_this_Channels_n_value_n_configurable_true_n_n_return_value_n_nget_Guilds_n_const_value_BdApi_findModuleByProps_getGuild_n_Object_defineProperty_this_Guilds_n_value_n_configurable_true_n_n_return_value_n_nget_SelectedGuilds_n_const_value_BdApi_findModuleByProps_getGuildId_getLastSelectedGuildId_n_Object_defineProperty_this_SelectedGuilds_n_value_n_configurable_true_n_n_return_value_n_nget_SelectedChannels_n_const_value_BdApi_findModuleByProps_getChannelId_getLastSelectedChannelId_n_Object_defineProperty_this_SelectedChannels_n_value_n_configurable_true_n_n_return_value_n_nget_Info_n_const_value_BdApi_findModuleByProps_getCurrentUser_n_Object_defineProperty_this_Info_n_value_n_configurable_true_n_n_return_value_n_nget_Status_n_const_value_BdApi_findModuleByProps_getStatus_n_Object_defineProperty_this_Status_n_value_n_configurable_true_n_n_return_value_n_nget_Users_n_const_value_BdApi_findModuleByProps_getUser_n_Object_defineProperty_this_Users_n_value_n_configurable_true_n_n_return_value_n_nget_Settings_n_const_value_BdApi_findModuleByProps_afkTimeout_status_n_Object_defineProperty_this_Settings_n_value_n_configurable_true_n_n_return_value_n_nget_UserProfile_n_const_value_BdApi_findModuleByProps_getUserProfile_n_Object_defineProperty_this_UserProfile_n_value_n_configurable_true_n_n_return_value_n_namespaceObject = {
				get Messages() {
					const value = BdApi.findModuleByProps("getMessage", "getMessages");
					Object.defineProperty(this, "Messages", {
						value,
						configurable: true
					});
					return value;
				},
				get Channels() {
					const value = BdApi.findModuleByPorps("getChannel");
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
				}
			};
			const external_get_ProfileActions_n_const_value_BdApi_findModuleByProps_fetchProfile_n_Object_defineProperty_this_ProfileActions_n_value_n_configurable_true_n_n_return_value_n_namespaceObject = {
				get ProfileActions() {
					const value = BdApi.findModuleByProps("fetchProfile");
					Object.defineProperty(this, "ProfileActions", {
						value,
						configurable: true
					});
					return value;
				}
			};
			class Userconnections extends ApiModule {
				get api() {
					return this.constructor.name;
				}
				task(user) {
					return ({
						titleClassName
					}) => {
						if (!external_BdApi_findModuleByProps_get_isSupported_map_default().filter((c => Settings.get("shownConnections", {})[c.type])).length || user.bot) return null;
						const connections = (0, external_Object_assign_BdApi_findModuleByProps_useStateFromStores_default_BdApi_findModuleByProps_useStateFromStores_namespaceObject.useStateFromStores)([external_get_Messages_n_const_value_BdApi_findModuleByProps_getMessage_getMessages_n_Object_defineProperty_this_Messages_n_value_n_configurable_true_n_n_return_value_n_nget_Channels_n_const_value_BdApi_findModuleByPorps_getChannel_n_Object_defineProperty_this_Channels_n_value_n_configurable_true_n_n_return_value_n_nget_Guilds_n_const_value_BdApi_findModuleByProps_getGuild_n_Object_defineProperty_this_Guilds_n_value_n_configurable_true_n_n_return_value_n_nget_SelectedGuilds_n_const_value_BdApi_findModuleByProps_getGuildId_getLastSelectedGuildId_n_Object_defineProperty_this_SelectedGuilds_n_value_n_configurable_true_n_n_return_value_n_nget_SelectedChannels_n_const_value_BdApi_findModuleByProps_getChannelId_getLastSelectedChannelId_n_Object_defineProperty_this_SelectedChannels_n_value_n_configurable_true_n_n_return_value_n_nget_Info_n_const_value_BdApi_findModuleByProps_getCurrentUser_n_Object_defineProperty_this_Info_n_value_n_configurable_true_n_n_return_value_n_nget_Status_n_const_value_BdApi_findModuleByProps_getStatus_n_Object_defineProperty_this_Status_n_value_n_configurable_true_n_n_return_value_n_nget_Users_n_const_value_BdApi_findModuleByProps_getUser_n_Object_defineProperty_this_Users_n_value_n_configurable_true_n_n_return_value_n_nget_Settings_n_const_value_BdApi_findModuleByProps_afkTimeout_status_n_Object_defineProperty_this_Settings_n_value_n_configurable_true_n_n_return_value_n_nget_UserProfile_n_const_value_BdApi_findModuleByProps_getUserProfile_n_Object_defineProperty_this_UserProfile_n_value_n_configurable_true_n_n_return_value_n_namespaceObject.UserProfile], (() => {
							var _UserProfile$getUserP;
							return null === (_UserProfile$getUserP = external_get_Messages_n_const_value_BdApi_findModuleByProps_getMessage_getMessages_n_Object_defineProperty_this_Messages_n_value_n_configurable_true_n_n_return_value_n_nget_Channels_n_const_value_BdApi_findModuleByPorps_getChannel_n_Object_defineProperty_this_Channels_n_value_n_configurable_true_n_n_return_value_n_nget_Guilds_n_const_value_BdApi_findModuleByProps_getGuild_n_Object_defineProperty_this_Guilds_n_value_n_configurable_true_n_n_return_value_n_nget_SelectedGuilds_n_const_value_BdApi_findModuleByProps_getGuildId_getLastSelectedGuildId_n_Object_defineProperty_this_SelectedGuilds_n_value_n_configurable_true_n_n_return_value_n_nget_SelectedChannels_n_const_value_BdApi_findModuleByProps_getChannelId_getLastSelectedChannelId_n_Object_defineProperty_this_SelectedChannels_n_value_n_configurable_true_n_n_return_value_n_nget_Info_n_const_value_BdApi_findModuleByProps_getCurrentUser_n_Object_defineProperty_this_Info_n_value_n_configurable_true_n_n_return_value_n_nget_Status_n_const_value_BdApi_findModuleByProps_getStatus_n_Object_defineProperty_this_Status_n_value_n_configurable_true_n_n_return_value_n_nget_Users_n_const_value_BdApi_findModuleByProps_getUser_n_Object_defineProperty_this_Users_n_value_n_configurable_true_n_n_return_value_n_nget_Settings_n_const_value_BdApi_findModuleByProps_afkTimeout_status_n_Object_defineProperty_this_Settings_n_value_n_configurable_true_n_n_return_value_n_nget_UserProfile_n_const_value_BdApi_findModuleByProps_getUserProfile_n_Object_defineProperty_this_UserProfile_n_value_n_configurable_true_n_n_return_value_n_namespaceObject.UserProfile.getUserProfile(user.id)) || void 0 === _UserProfile$getUserP ? void 0 : _UserProfile$getUserP.connectedAccounts;
						}));
						const [message, setMessage] = (0, external_BdApi_React_.useState)("");
						(0, external_BdApi_React_.useEffect)((() => {
							if (external_get_Messages_n_const_value_BdApi_findModuleByProps_getMessage_getMessages_n_Object_defineProperty_this_Messages_n_value_n_configurable_true_n_n_return_value_n_nget_Channels_n_const_value_BdApi_findModuleByPorps_getChannel_n_Object_defineProperty_this_Channels_n_value_n_configurable_true_n_n_return_value_n_nget_Guilds_n_const_value_BdApi_findModuleByProps_getGuild_n_Object_defineProperty_this_Guilds_n_value_n_configurable_true_n_n_return_value_n_nget_SelectedGuilds_n_const_value_BdApi_findModuleByProps_getGuildId_getLastSelectedGuildId_n_Object_defineProperty_this_SelectedGuilds_n_value_n_configurable_true_n_n_return_value_n_nget_SelectedChannels_n_const_value_BdApi_findModuleByProps_getChannelId_getLastSelectedChannelId_n_Object_defineProperty_this_SelectedChannels_n_value_n_configurable_true_n_n_return_value_n_nget_Info_n_const_value_BdApi_findModuleByProps_getCurrentUser_n_Object_defineProperty_this_Info_n_value_n_configurable_true_n_n_return_value_n_nget_Status_n_const_value_BdApi_findModuleByProps_getStatus_n_Object_defineProperty_this_Status_n_value_n_configurable_true_n_n_return_value_n_nget_Users_n_const_value_BdApi_findModuleByProps_getUser_n_Object_defineProperty_this_Users_n_value_n_configurable_true_n_n_return_value_n_nget_Settings_n_const_value_BdApi_findModuleByProps_afkTimeout_status_n_Object_defineProperty_this_Settings_n_value_n_configurable_true_n_n_return_value_n_nget_UserProfile_n_const_value_BdApi_findModuleByProps_getUserProfile_n_Object_defineProperty_this_UserProfile_n_value_n_configurable_true_n_n_return_value_n_namespaceObject.UserProfile.isFetching(user.id)) return;
							external_get_ProfileActions_n_const_value_BdApi_findModuleByProps_fetchProfile_n_Object_defineProperty_this_ProfileActions_n_value_n_configurable_true_n_n_return_value_n_namespaceObject.ProfileActions.fetchProfile(user.id).catch((error => {
								var _error$message;
								if (~(null === error || void 0 === error ? void 0 : null === (_error$message = error.message) || void 0 === _error$message ? void 0 : _error$message.indexOf("Already dispatching"))) return;
								external_PluginApi_namespaceObject.Logger.error(`Failed to fetch profile for ${user.id}:\n`, error);
								setMessage("Failed to fetch!");
							}));
						}), [true]);
						return external_BdApi_React_default().createElement("div", {
							className: apis_connections.Z.connectionsBody
						}, !(null !== connections && void 0 !== connections && connections.length) && Settings.get("showEmptyConnections", true) || null !== connections && void 0 !== connections && connections.length ? external_BdApi_React_default().createElement("div", {
							className: Utilities.joinClassNames(titleClassName, apis_connections.Z.container)
						}, null !== connections && void 0 !== connections && connections.length ? "connections" : "no connections") : null, Array.isArray(connections) ? null !== connections && void 0 !== connections && connections.length ? external_BdApi_React_default().createElement("div", {
							className: apis_connections.Z.connections
						}, connections.filter((e => Settings.get("shownConnections")[e.type])).map((badge => external_BdApi_React_default().createElement(Badge, {
							item: badge,
							key: badge.type
						})))) : null : message ? external_BdApi_React_default().createElement(external_get_Tooltip_n_const_value_BdApi_findModuleByDisplayName_Tooltip_n_Object_defineProperty_this_Tooltip_n_value_n_configurable_true_n_n_return_value_n_nget_TooltipContainer_n_const_value_BdApi_findModuleByProps_TooltipContainer_TooltipContainer_n_Object_defineProperty_this_TooltipContainer_n_value_n_configurable_true_n_n_return_value_n_nget_TextInput_n_const_value_BdApi_findModuleByDisplayName_TextInput_n_Object_defineProperty_this_TextInput_n_value_n_configurable_true_n_n_return_value_n_nget_SlideIn_n_const_value_BdApi_findModuleByDisplayName_SlideIn_n_Object_defineProperty_this_SlideIn_n_value_n_configurable_true_n_n_return_value_n_nget_SettingsNotice_n_const_value_BdApi_findModuleByDisplayName_SettingsNotice_n_Object_defineProperty_this_SettingsNotice_n_value_n_configurable_true_n_n_return_value_n_nget_TransitionGroup_n_const_value_BdApi_findModuleByDisplayName_TransitionGroup_n_Object_defineProperty_this_TransitionGroup_n_value_n_configurable_true_n_n_return_value_n_nget_Button_n_const_value_BdApi_findModuleByProps_DropdownSizes_n_Object_defineProperty_this_Button_n_value_n_configurable_true_n_n_return_value_n_nget_Flex_n_const_value_BdApi_findModuleByDisplayName_Flex_n_Object_defineProperty_this_Flex_n_value_n_configurable_true_n_n_return_value_n_nget_Text_n_const_value_BdApi_findModuleByDisplayName_Text_n_Object_defineProperty_this_Text_n_value_n_configurable_true_n_n_return_value_n_namespaceObject.TooltipContainer, {
							text: message
						}, external_BdApi_React_default().createElement(error, {
							className: apis_connections.Z.errorIcon
						})) : external_BdApi_React_default().createElement(external_get_Tooltip_n_const_value_BdApi_findModuleByDisplayName_Tooltip_n_Object_defineProperty_this_Tooltip_n_value_n_configurable_true_n_n_return_value_n_nget_TooltipContainer_n_const_value_BdApi_findModuleByProps_TooltipContainer_TooltipContainer_n_Object_defineProperty_this_TooltipContainer_n_value_n_configurable_true_n_n_return_value_n_nget_TextInput_n_const_value_BdApi_findModuleByDisplayName_TextInput_n_Object_defineProperty_this_TextInput_n_value_n_configurable_true_n_n_return_value_n_nget_SlideIn_n_const_value_BdApi_findModuleByDisplayName_SlideIn_n_Object_defineProperty_this_SlideIn_n_value_n_configurable_true_n_n_return_value_n_nget_SettingsNotice_n_const_value_BdApi_findModuleByDisplayName_SettingsNotice_n_Object_defineProperty_this_SettingsNotice_n_value_n_configurable_true_n_n_return_value_n_nget_TransitionGroup_n_const_value_BdApi_findModuleByDisplayName_TransitionGroup_n_Object_defineProperty_this_TransitionGroup_n_value_n_configurable_true_n_n_return_value_n_nget_Button_n_const_value_BdApi_findModuleByProps_DropdownSizes_n_Object_defineProperty_this_Button_n_value_n_configurable_true_n_n_return_value_n_nget_Flex_n_const_value_BdApi_findModuleByDisplayName_Flex_n_Object_defineProperty_this_Flex_n_value_n_configurable_true_n_n_return_value_n_nget_Text_n_const_value_BdApi_findModuleByDisplayName_Text_n_Object_defineProperty_this_Text_n_value_n_configurable_true_n_n_return_value_n_namespaceObject.TooltipContainer, {
							text: "Loading Connections..."
						}, external_BdApi_findModuleByProps_get_isSupported_map_default().filter((e => Settings.get("shownConnections")[e.type])).map((() => external_BdApi_React_default().createElement(circle, {
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
			const external_BdApi_ReactDOM_namespaceObject = global["BdApi"]["ReactDOM"];
			var external_BdApi_ReactDOM_default = __webpack_require__.n(external_BdApi_ReactDOM_namespaceObject);
			var dates = __webpack_require__(785);
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
					return () => Settings.get("useIcons", true) ? external_BdApi_React_default().createElement(external_get_Tooltip_n_const_value_BdApi_findModuleByDisplayName_Tooltip_n_Object_defineProperty_this_Tooltip_n_value_n_configurable_true_n_n_return_value_n_nget_TooltipContainer_n_const_value_BdApi_findModuleByProps_TooltipContainer_TooltipContainer_n_Object_defineProperty_this_TooltipContainer_n_value_n_configurable_true_n_n_return_value_n_nget_TextInput_n_const_value_BdApi_findModuleByDisplayName_TextInput_n_Object_defineProperty_this_TextInput_n_value_n_configurable_true_n_n_return_value_n_nget_SlideIn_n_const_value_BdApi_findModuleByDisplayName_SlideIn_n_Object_defineProperty_this_SlideIn_n_value_n_configurable_true_n_n_return_value_n_nget_SettingsNotice_n_const_value_BdApi_findModuleByDisplayName_SettingsNotice_n_Object_defineProperty_this_SettingsNotice_n_value_n_configurable_true_n_n_return_value_n_nget_TransitionGroup_n_const_value_BdApi_findModuleByDisplayName_TransitionGroup_n_Object_defineProperty_this_TransitionGroup_n_value_n_configurable_true_n_n_return_value_n_nget_Button_n_const_value_BdApi_findModuleByProps_DropdownSizes_n_Object_defineProperty_this_Button_n_value_n_configurable_true_n_n_return_value_n_nget_Flex_n_const_value_BdApi_findModuleByDisplayName_Flex_n_Object_defineProperty_this_Flex_n_value_n_configurable_true_n_n_return_value_n_nget_Text_n_const_value_BdApi_findModuleByDisplayName_Text_n_Object_defineProperty_this_Text_n_value_n_configurable_true_n_n_return_value_n_namespaceObject.TooltipContainer, {
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
			function reducer(state) {
				if (state >= 3) return 1;
				else return state + 1;
			}
			function LoadingText() {
				const [state, dispatch] = (0, external_BdApi_React_.useReducer)(reducer, 1);
				(0, external_BdApi_React_.useEffect)((() => {
					const internal = setInterval((() => {
						dispatch();
					}), 500);
					return () => {
						clearInterval(internal);
					};
				}), []);
				return external_BdApi_React_default().createElement("div", {
					style: {
						textAlign: "center"
					}
				}, ".".repeat(state));
			}
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
			const GuildActions = external_PluginApi_namespaceObject.WebpackModules.getByProps("requestMembersById");
			class JoinedAt extends ApiModule {
				get api() {
					return this.constructor.name;
				}
				task(userId) {
					return () => {
						const settingsFormat = Settings.get("joined_format", "Joined At: $hour:$minute:$second, $day.$month.$year $daysago days");
						const guildId = external_get_Messages_n_const_value_BdApi_findModuleByProps_getMessage_getMessages_n_Object_defineProperty_this_Messages_n_value_n_configurable_true_n_n_return_value_n_nget_Channels_n_const_value_BdApi_findModuleByPorps_getChannel_n_Object_defineProperty_this_Channels_n_value_n_configurable_true_n_n_return_value_n_nget_Guilds_n_const_value_BdApi_findModuleByProps_getGuild_n_Object_defineProperty_this_Guilds_n_value_n_configurable_true_n_n_return_value_n_nget_SelectedGuilds_n_const_value_BdApi_findModuleByProps_getGuildId_getLastSelectedGuildId_n_Object_defineProperty_this_SelectedGuilds_n_value_n_configurable_true_n_n_return_value_n_nget_SelectedChannels_n_const_value_BdApi_findModuleByProps_getChannelId_getLastSelectedChannelId_n_Object_defineProperty_this_SelectedChannels_n_value_n_configurable_true_n_n_return_value_n_nget_Info_n_const_value_BdApi_findModuleByProps_getCurrentUser_n_Object_defineProperty_this_Info_n_value_n_configurable_true_n_n_return_value_n_nget_Status_n_const_value_BdApi_findModuleByProps_getStatus_n_Object_defineProperty_this_Status_n_value_n_configurable_true_n_n_return_value_n_nget_Users_n_const_value_BdApi_findModuleByProps_getUser_n_Object_defineProperty_this_Users_n_value_n_configurable_true_n_n_return_value_n_nget_Settings_n_const_value_BdApi_findModuleByProps_afkTimeout_status_n_Object_defineProperty_this_Settings_n_value_n_configurable_true_n_n_return_value_n_nget_UserProfile_n_const_value_BdApi_findModuleByProps_getUserProfile_n_Object_defineProperty_this_UserProfile_n_value_n_configurable_true_n_n_return_value_n_namespaceObject.SelectedGuilds.getGuildId();
						const byCache = this.getByCache(guildId, userId);
						const [joined, setJoined] = (0, external_BdApi_React_.useState)(byCache ? this.parseTime(settingsFormat, byCache) : null);
						const [message, setMessage] = (0, external_BdApi_React_.useState)("");
						(0, external_BdApi_React_.useEffect)((() => {
							if (joined) return;
							if (!guildId) return void setJoined("Joined At: --- --- ---");
							GuildActions.requestMembersById(guildId, userId);
							const callback = chunk => {
								if ((null === chunk || void 0 === chunk ? void 0 : chunk.guildId) === guildId) {
									var _chunk$members, _chunk$notFound;
									const member = null === (_chunk$members = chunk.members) || void 0 === _chunk$members ? void 0 : _chunk$members.find((member => {
										var _member$user;
										return (null === member || void 0 === member ? void 0 : null === (_member$user = member.user) || void 0 === _member$user ? void 0 : _member$user.id) === userId;
									}));
									if (!member) {
										setMessage("Member was not found!");
										this.error(`Member "${userId}" was not found on guild "${guildId}"`);
										this.setCache(guildId, userId, {
											data: null,
											fetch: Date.now()
										});
									} else if (!~(null === (_chunk$notFound = chunk.notFound) || void 0 === _chunk$notFound ? void 0 : _chunk$notFound.indexOf(userId))) {
										setJoined(this.parseTime(settingsFormat, new Date(member.joined_at)));
										this.setCache(guildId, userId, {
											data: new Date(member.joined_at),
											fetch: Date.now()
										});
									}
									external_get_Dispatcher_n_const_value_BdApi_findModuleByProps_dirtyDispatch_subscribe_n_Object_defineProperty_this_Dispatcher_n_value_n_configurable_true_n_n_return_value_n_nget_EmojiUtils_n_const_value_BdApi_findModuleByProps_uploadEmoji_n_Object_defineProperty_this_EmojiUtils_n_value_n_configurable_true_n_n_return_value_n_nget_PermissionUtils_n_const_value_BdApi_findModuleByProps_computePermissions_n_Object_defineProperty_this_PermissionUtils_n_value_n_configurable_true_n_n_return_value_n_namespaceObject.Dispatcher.unsubscribe("GUILD_MEMBERS_CHUNK", callback);
								}
							};
							external_get_Dispatcher_n_const_value_BdApi_findModuleByProps_dirtyDispatch_subscribe_n_Object_defineProperty_this_Dispatcher_n_value_n_configurable_true_n_n_return_value_n_nget_EmojiUtils_n_const_value_BdApi_findModuleByProps_uploadEmoji_n_Object_defineProperty_this_EmojiUtils_n_value_n_configurable_true_n_n_return_value_n_nget_PermissionUtils_n_const_value_BdApi_findModuleByProps_computePermissions_n_Object_defineProperty_this_PermissionUtils_n_value_n_configurable_true_n_n_return_value_n_namespaceObject.Dispatcher.subscribe("GUILD_MEMBERS_CHUNK", callback);
						}), []);
						const useIcons = Settings.get("useIcons", true);
						return joined ? useIcons ? external_BdApi_React_default().createElement(external_get_Tooltip_n_const_value_BdApi_findModuleByDisplayName_Tooltip_n_Object_defineProperty_this_Tooltip_n_value_n_configurable_true_n_n_return_value_n_nget_TooltipContainer_n_const_value_BdApi_findModuleByProps_TooltipContainer_TooltipContainer_n_Object_defineProperty_this_TooltipContainer_n_value_n_configurable_true_n_n_return_value_n_nget_TextInput_n_const_value_BdApi_findModuleByDisplayName_TextInput_n_Object_defineProperty_this_TextInput_n_value_n_configurable_true_n_n_return_value_n_nget_SlideIn_n_const_value_BdApi_findModuleByDisplayName_SlideIn_n_Object_defineProperty_this_SlideIn_n_value_n_configurable_true_n_n_return_value_n_nget_SettingsNotice_n_const_value_BdApi_findModuleByDisplayName_SettingsNotice_n_Object_defineProperty_this_SettingsNotice_n_value_n_configurable_true_n_n_return_value_n_nget_TransitionGroup_n_const_value_BdApi_findModuleByDisplayName_TransitionGroup_n_Object_defineProperty_this_TransitionGroup_n_value_n_configurable_true_n_n_return_value_n_nget_Button_n_const_value_BdApi_findModuleByProps_DropdownSizes_n_Object_defineProperty_this_Button_n_value_n_configurable_true_n_n_return_value_n_nget_Flex_n_const_value_BdApi_findModuleByDisplayName_Flex_n_Object_defineProperty_this_Flex_n_value_n_configurable_true_n_n_return_value_n_nget_Text_n_const_value_BdApi_findModuleByDisplayName_Text_n_Object_defineProperty_this_Text_n_value_n_configurable_true_n_n_return_value_n_namespaceObject.TooltipContainer, {
							text: joined
						}, external_BdApi_React_default().createElement(calendar, null)) : external_BdApi_React_default().createElement(TextScroller, null, joined) : message ? useIcons ? external_BdApi_React_default().createElement(external_get_Tooltip_n_const_value_BdApi_findModuleByDisplayName_Tooltip_n_Object_defineProperty_this_Tooltip_n_value_n_configurable_true_n_n_return_value_n_nget_TooltipContainer_n_const_value_BdApi_findModuleByProps_TooltipContainer_TooltipContainer_n_Object_defineProperty_this_TooltipContainer_n_value_n_configurable_true_n_n_return_value_n_nget_TextInput_n_const_value_BdApi_findModuleByDisplayName_TextInput_n_Object_defineProperty_this_TextInput_n_value_n_configurable_true_n_n_return_value_n_nget_SlideIn_n_const_value_BdApi_findModuleByDisplayName_SlideIn_n_Object_defineProperty_this_SlideIn_n_value_n_configurable_true_n_n_return_value_n_nget_SettingsNotice_n_const_value_BdApi_findModuleByDisplayName_SettingsNotice_n_Object_defineProperty_this_SettingsNotice_n_value_n_configurable_true_n_n_return_value_n_nget_TransitionGroup_n_const_value_BdApi_findModuleByDisplayName_TransitionGroup_n_Object_defineProperty_this_TransitionGroup_n_value_n_configurable_true_n_n_return_value_n_nget_Button_n_const_value_BdApi_findModuleByProps_DropdownSizes_n_Object_defineProperty_this_Button_n_value_n_configurable_true_n_n_return_value_n_nget_Flex_n_const_value_BdApi_findModuleByDisplayName_Flex_n_Object_defineProperty_this_Flex_n_value_n_configurable_true_n_n_return_value_n_nget_Text_n_const_value_BdApi_findModuleByDisplayName_Text_n_Object_defineProperty_this_Text_n_value_n_configurable_true_n_n_return_value_n_namespaceObject.TooltipContainer, {
							text: message
						}, external_BdApi_React_default().createElement(error, {
							className: dates.Z.errorIcon
						})) : external_BdApi_React_default().createElement(TextScroller, {
							style: {
								color: "red"
							}
						}, message) : external_BdApi_React_default().createElement(external_get_Tooltip_n_const_value_BdApi_findModuleByDisplayName_Tooltip_n_Object_defineProperty_this_Tooltip_n_value_n_configurable_true_n_n_return_value_n_nget_TooltipContainer_n_const_value_BdApi_findModuleByProps_TooltipContainer_TooltipContainer_n_Object_defineProperty_this_TooltipContainer_n_value_n_configurable_true_n_n_return_value_n_nget_TextInput_n_const_value_BdApi_findModuleByDisplayName_TextInput_n_Object_defineProperty_this_TextInput_n_value_n_configurable_true_n_n_return_value_n_nget_SlideIn_n_const_value_BdApi_findModuleByDisplayName_SlideIn_n_Object_defineProperty_this_SlideIn_n_value_n_configurable_true_n_n_return_value_n_nget_SettingsNotice_n_const_value_BdApi_findModuleByDisplayName_SettingsNotice_n_Object_defineProperty_this_SettingsNotice_n_value_n_configurable_true_n_n_return_value_n_nget_TransitionGroup_n_const_value_BdApi_findModuleByDisplayName_TransitionGroup_n_Object_defineProperty_this_TransitionGroup_n_value_n_configurable_true_n_n_return_value_n_nget_Button_n_const_value_BdApi_findModuleByProps_DropdownSizes_n_Object_defineProperty_this_Button_n_value_n_configurable_true_n_n_return_value_n_nget_Flex_n_const_value_BdApi_findModuleByDisplayName_Flex_n_Object_defineProperty_this_Flex_n_value_n_configurable_true_n_n_return_value_n_nget_Text_n_const_value_BdApi_findModuleByDisplayName_Text_n_Object_defineProperty_this_Text_n_value_n_configurable_true_n_n_return_value_n_namespaceObject.TooltipContainer, {
							text: "Loading JoinedAt..."
						}, useIcons ? external_BdApi_React_default().createElement(cube, {
							className: dates.Z.loading
						}) : external_BdApi_React_default().createElement(LoadingText, null));
					};
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
			const external_PluginApi_DiscordModules_namespaceObject = PluginApi.DiscordModules;
			const {
				stringify
			} = external_PluginApi_namespaceObject.WebpackModules.getByProps("stringify", "parse", "encode");
			const constants = external_PluginApi_namespaceObject.DiscordModules.DiscordConstants;
			class LastMessage extends ApiModule {
				get api() {
					return this.constructor.name;
				}
				task(user) {
					return () => {
						const [lastMessage, setLastMessage] = (0, external_BdApi_React_.useState)({
							messageId: null,
							channelId: null,
							date: null
						});
						const [errorMessage, setErrorMessage] = (0, external_BdApi_React_.useState)("");
						const isGuild = Boolean(external_get_Messages_n_const_value_BdApi_findModuleByProps_getMessage_getMessages_n_Object_defineProperty_this_Messages_n_value_n_configurable_true_n_n_return_value_n_nget_Channels_n_const_value_BdApi_findModuleByPorps_getChannel_n_Object_defineProperty_this_Channels_n_value_n_configurable_true_n_n_return_value_n_nget_Guilds_n_const_value_BdApi_findModuleByProps_getGuild_n_Object_defineProperty_this_Guilds_n_value_n_configurable_true_n_n_return_value_n_nget_SelectedGuilds_n_const_value_BdApi_findModuleByProps_getGuildId_getLastSelectedGuildId_n_Object_defineProperty_this_SelectedGuilds_n_value_n_configurable_true_n_n_return_value_n_nget_SelectedChannels_n_const_value_BdApi_findModuleByProps_getChannelId_getLastSelectedChannelId_n_Object_defineProperty_this_SelectedChannels_n_value_n_configurable_true_n_n_return_value_n_nget_Info_n_const_value_BdApi_findModuleByProps_getCurrentUser_n_Object_defineProperty_this_Info_n_value_n_configurable_true_n_n_return_value_n_nget_Status_n_const_value_BdApi_findModuleByProps_getStatus_n_Object_defineProperty_this_Status_n_value_n_configurable_true_n_n_return_value_n_nget_Users_n_const_value_BdApi_findModuleByProps_getUser_n_Object_defineProperty_this_Users_n_value_n_configurable_true_n_n_return_value_n_nget_Settings_n_const_value_BdApi_findModuleByProps_afkTimeout_status_n_Object_defineProperty_this_Settings_n_value_n_configurable_true_n_n_return_value_n_nget_UserProfile_n_const_value_BdApi_findModuleByProps_getUserProfile_n_Object_defineProperty_this_UserProfile_n_value_n_configurable_true_n_n_return_value_n_namespaceObject.SelectedGuilds.getGuildId());
						(0, external_BdApi_React_.useEffect)((() => {
							if (user.bot && "0000" === user.discriminator) return setLastMessage({
								date: "Last Message: --- --- ---"
							});
							const roomId = external_get_Messages_n_const_value_BdApi_findModuleByProps_getMessage_getMessages_n_Object_defineProperty_this_Messages_n_value_n_configurable_true_n_n_return_value_n_nget_Channels_n_const_value_BdApi_findModuleByPorps_getChannel_n_Object_defineProperty_this_Channels_n_value_n_configurable_true_n_n_return_value_n_nget_Guilds_n_const_value_BdApi_findModuleByProps_getGuild_n_Object_defineProperty_this_Guilds_n_value_n_configurable_true_n_n_return_value_n_nget_SelectedGuilds_n_const_value_BdApi_findModuleByProps_getGuildId_getLastSelectedGuildId_n_Object_defineProperty_this_SelectedGuilds_n_value_n_configurable_true_n_n_return_value_n_nget_SelectedChannels_n_const_value_BdApi_findModuleByProps_getChannelId_getLastSelectedChannelId_n_Object_defineProperty_this_SelectedChannels_n_value_n_configurable_true_n_n_return_value_n_nget_Info_n_const_value_BdApi_findModuleByProps_getCurrentUser_n_Object_defineProperty_this_Info_n_value_n_configurable_true_n_n_return_value_n_nget_Status_n_const_value_BdApi_findModuleByProps_getStatus_n_Object_defineProperty_this_Status_n_value_n_configurable_true_n_n_return_value_n_nget_Users_n_const_value_BdApi_findModuleByProps_getUser_n_Object_defineProperty_this_Users_n_value_n_configurable_true_n_n_return_value_n_nget_Settings_n_const_value_BdApi_findModuleByProps_afkTimeout_status_n_Object_defineProperty_this_Settings_n_value_n_configurable_true_n_n_return_value_n_nget_UserProfile_n_const_value_BdApi_findModuleByProps_getUserProfile_n_Object_defineProperty_this_UserProfile_n_value_n_configurable_true_n_n_return_value_n_namespaceObject.SelectedGuilds.getGuildId() || external_get_Messages_n_const_value_BdApi_findModuleByProps_getMessage_getMessages_n_Object_defineProperty_this_Messages_n_value_n_configurable_true_n_n_return_value_n_nget_Channels_n_const_value_BdApi_findModuleByPorps_getChannel_n_Object_defineProperty_this_Channels_n_value_n_configurable_true_n_n_return_value_n_nget_Guilds_n_const_value_BdApi_findModuleByProps_getGuild_n_Object_defineProperty_this_Guilds_n_value_n_configurable_true_n_n_return_value_n_nget_SelectedGuilds_n_const_value_BdApi_findModuleByProps_getGuildId_getLastSelectedGuildId_n_Object_defineProperty_this_SelectedGuilds_n_value_n_configurable_true_n_n_return_value_n_nget_SelectedChannels_n_const_value_BdApi_findModuleByProps_getChannelId_getLastSelectedChannelId_n_Object_defineProperty_this_SelectedChannels_n_value_n_configurable_true_n_n_return_value_n_nget_Info_n_const_value_BdApi_findModuleByProps_getCurrentUser_n_Object_defineProperty_this_Info_n_value_n_configurable_true_n_n_return_value_n_nget_Status_n_const_value_BdApi_findModuleByProps_getStatus_n_Object_defineProperty_this_Status_n_value_n_configurable_true_n_n_return_value_n_nget_Users_n_const_value_BdApi_findModuleByProps_getUser_n_Object_defineProperty_this_Users_n_value_n_configurable_true_n_n_return_value_n_nget_Settings_n_const_value_BdApi_findModuleByProps_afkTimeout_status_n_Object_defineProperty_this_Settings_n_value_n_configurable_true_n_n_return_value_n_nget_UserProfile_n_const_value_BdApi_findModuleByProps_getUserProfile_n_Object_defineProperty_this_UserProfile_n_value_n_configurable_true_n_n_return_value_n_namespaceObject.SelectedChannels.getChannelId();
							if (!roomId) return setLastMessage({
								date: "Last Message: --- --- ---"
							});
							const byCache = this.getByCache(roomId, user.id);
							if (byCache) {
								const message = byCache.body.messages[0].find((e => e.hit && e.author.id === user.id));
								setLastMessage({
									messageId: message.id,
									channelId: message.channel_id,
									date: this.parseTime(Settings.get("lastmessage_format", "Last Message: $hour:$minute:$second, $day.$month.$year $daysago days"), new Date(message.timestamp))
								});
							}
							external_PluginApi_DiscordModules_namespaceObject.APIModule.get({
								url: isGuild ? constants.Endpoints.SEARCH_GUILD(roomId) : constants.Endpoints.SEARCH_CHANNEL(roomId),
								query: stringify({
									author_id: user.id
								})
							}).then((data => {
								var _data$body, _data$body$messages;
								if (null !== data && void 0 !== data && null !== (_data$body = data.body) && void 0 !== _data$body && null !== (_data$body$messages = _data$body.messages) && void 0 !== _data$body$messages && _data$body$messages.length) {
									const message = data.body.messages[0].find((e => e.hit && e.author.id === user.id));
									if (message) {
										const data = {
											messageId: message.id,
											channelId: message.channel_id,
											date: this.parseTime(Settings.get("lastmessage_format", "Last Message: $hour:$minute:$second, $day.$month.$year $daysago days"), new Date(message.timestamp))
										};
										this.setCache(roomId, user.id, {
											data: {
												body: {
													messages: [
														[message]
													]
												}
											}
										});
										setLastMessage(data);
									}
								} else setLastMessage({
									date: "Last Message: --- --- ---"
								});
							})).catch((error => {
								setErrorMessage("Failed to fetch!");
								this.error(`Fetch for ${userId} failed!\n`, error);
							}));
						}), [true]);
						const transitionToMessage = () => {
							if (!lastMessage.channelId || !lastMessage.messageId) return;
							external_get_joinClassNames_n_const_value_BdApi_findModule_m_typeof_m_default_default_function_default_n_Object_defineProperty_this_joinClassNames_n_value_n_configurable_true_n_n_return_value_n_nget_useForceUpdate_n_const_value_BdApi_findModuleByProps_useForceUpdate_useForceUpdate_n_Object_defineProperty_this_useForceUpdate_n_value_n_configurable_true_n_n_return_value_n_nget_Logger_n_const_value_BdApi_findModuleByProps_setLogFn_default_n_Object_defineProperty_this_Logger_n_value_n_configurable_true_n_n_return_value_n_nget_Navigation_n_const_value_BdApi_findModuleByProps_replaceWith_n_Object_defineProperty_this_Navigation_n_value_n_configurable_true_n_n_return_value_n_namespaceObject.Navigation.replaceWith(isGuild ? `/channels/${external_get_Messages_n_const_value_BdApi_findModuleByProps_getMessage_getMessages_n_Object_defineProperty_this_Messages_n_value_n_configurable_true_n_n_return_value_n_nget_Channels_n_const_value_BdApi_findModuleByPorps_getChannel_n_Object_defineProperty_this_Channels_n_value_n_configurable_true_n_n_return_value_n_nget_Guilds_n_const_value_BdApi_findModuleByProps_getGuild_n_Object_defineProperty_this_Guilds_n_value_n_configurable_true_n_n_return_value_n_nget_SelectedGuilds_n_const_value_BdApi_findModuleByProps_getGuildId_getLastSelectedGuildId_n_Object_defineProperty_this_SelectedGuilds_n_value_n_configurable_true_n_n_return_value_n_nget_SelectedChannels_n_const_value_BdApi_findModuleByProps_getChannelId_getLastSelectedChannelId_n_Object_defineProperty_this_SelectedChannels_n_value_n_configurable_true_n_n_return_value_n_nget_Info_n_const_value_BdApi_findModuleByProps_getCurrentUser_n_Object_defineProperty_this_Info_n_value_n_configurable_true_n_n_return_value_n_nget_Status_n_const_value_BdApi_findModuleByProps_getStatus_n_Object_defineProperty_this_Status_n_value_n_configurable_true_n_n_return_value_n_nget_Users_n_const_value_BdApi_findModuleByProps_getUser_n_Object_defineProperty_this_Users_n_value_n_configurable_true_n_n_return_value_n_nget_Settings_n_const_value_BdApi_findModuleByProps_afkTimeout_status_n_Object_defineProperty_this_Settings_n_value_n_configurable_true_n_n_return_value_n_nget_UserProfile_n_const_value_BdApi_findModuleByProps_getUserProfile_n_Object_defineProperty_this_UserProfile_n_value_n_configurable_true_n_n_return_value_n_namespaceObject.SelectedGuilds.getGuildId()}/${lastMessage.channelId}/${lastMessage.messageId}` : `/channels/@me/${lastMessage.channelId}/${lastMessage.messageId}`);
						};
						return null !== lastMessage && void 0 !== lastMessage && lastMessage.date ? Settings.get("useIcons", true) ? external_BdApi_React_default().createElement(external_get_Tooltip_n_const_value_BdApi_findModuleByDisplayName_Tooltip_n_Object_defineProperty_this_Tooltip_n_value_n_configurable_true_n_n_return_value_n_nget_TooltipContainer_n_const_value_BdApi_findModuleByProps_TooltipContainer_TooltipContainer_n_Object_defineProperty_this_TooltipContainer_n_value_n_configurable_true_n_n_return_value_n_nget_TextInput_n_const_value_BdApi_findModuleByDisplayName_TextInput_n_Object_defineProperty_this_TextInput_n_value_n_configurable_true_n_n_return_value_n_nget_SlideIn_n_const_value_BdApi_findModuleByDisplayName_SlideIn_n_Object_defineProperty_this_SlideIn_n_value_n_configurable_true_n_n_return_value_n_nget_SettingsNotice_n_const_value_BdApi_findModuleByDisplayName_SettingsNotice_n_Object_defineProperty_this_SettingsNotice_n_value_n_configurable_true_n_n_return_value_n_nget_TransitionGroup_n_const_value_BdApi_findModuleByDisplayName_TransitionGroup_n_Object_defineProperty_this_TransitionGroup_n_value_n_configurable_true_n_n_return_value_n_nget_Button_n_const_value_BdApi_findModuleByProps_DropdownSizes_n_Object_defineProperty_this_Button_n_value_n_configurable_true_n_n_return_value_n_nget_Flex_n_const_value_BdApi_findModuleByDisplayName_Flex_n_Object_defineProperty_this_Flex_n_value_n_configurable_true_n_n_return_value_n_nget_Text_n_const_value_BdApi_findModuleByDisplayName_Text_n_Object_defineProperty_this_Text_n_value_n_configurable_true_n_n_return_value_n_namespaceObject.TooltipContainer, {
							text: null === lastMessage || void 0 === lastMessage ? void 0 : lastMessage.date
						}, external_BdApi_React_default().createElement(textbubble, {
							onClick: transitionToMessage
						})) : external_BdApi_React_default().createElement(TextScroller, {
							onClick: transitionToMessage
						}, null === lastMessage || void 0 === lastMessage ? void 0 : lastMessage.date) : errorMessage ? external_BdApi_React_default().createElement(external_get_Tooltip_n_const_value_BdApi_findModuleByDisplayName_Tooltip_n_Object_defineProperty_this_Tooltip_n_value_n_configurable_true_n_n_return_value_n_nget_TooltipContainer_n_const_value_BdApi_findModuleByProps_TooltipContainer_TooltipContainer_n_Object_defineProperty_this_TooltipContainer_n_value_n_configurable_true_n_n_return_value_n_nget_TextInput_n_const_value_BdApi_findModuleByDisplayName_TextInput_n_Object_defineProperty_this_TextInput_n_value_n_configurable_true_n_n_return_value_n_nget_SlideIn_n_const_value_BdApi_findModuleByDisplayName_SlideIn_n_Object_defineProperty_this_SlideIn_n_value_n_configurable_true_n_n_return_value_n_nget_SettingsNotice_n_const_value_BdApi_findModuleByDisplayName_SettingsNotice_n_Object_defineProperty_this_SettingsNotice_n_value_n_configurable_true_n_n_return_value_n_nget_TransitionGroup_n_const_value_BdApi_findModuleByDisplayName_TransitionGroup_n_Object_defineProperty_this_TransitionGroup_n_value_n_configurable_true_n_n_return_value_n_nget_Button_n_const_value_BdApi_findModuleByProps_DropdownSizes_n_Object_defineProperty_this_Button_n_value_n_configurable_true_n_n_return_value_n_nget_Flex_n_const_value_BdApi_findModuleByDisplayName_Flex_n_Object_defineProperty_this_Flex_n_value_n_configurable_true_n_n_return_value_n_nget_Text_n_const_value_BdApi_findModuleByDisplayName_Text_n_Object_defineProperty_this_Text_n_value_n_configurable_true_n_n_return_value_n_namespaceObject.TooltipContainer, {
							text: errorMessage
						}, external_BdApi_React_default().createElement(error, {
							className: dates.Z.errorIcon
						})) : external_BdApi_React_default().createElement(external_get_Tooltip_n_const_value_BdApi_findModuleByDisplayName_Tooltip_n_Object_defineProperty_this_Tooltip_n_value_n_configurable_true_n_n_return_value_n_nget_TooltipContainer_n_const_value_BdApi_findModuleByProps_TooltipContainer_TooltipContainer_n_Object_defineProperty_this_TooltipContainer_n_value_n_configurable_true_n_n_return_value_n_nget_TextInput_n_const_value_BdApi_findModuleByDisplayName_TextInput_n_Object_defineProperty_this_TextInput_n_value_n_configurable_true_n_n_return_value_n_nget_SlideIn_n_const_value_BdApi_findModuleByDisplayName_SlideIn_n_Object_defineProperty_this_SlideIn_n_value_n_configurable_true_n_n_return_value_n_nget_SettingsNotice_n_const_value_BdApi_findModuleByDisplayName_SettingsNotice_n_Object_defineProperty_this_SettingsNotice_n_value_n_configurable_true_n_n_return_value_n_nget_TransitionGroup_n_const_value_BdApi_findModuleByDisplayName_TransitionGroup_n_Object_defineProperty_this_TransitionGroup_n_value_n_configurable_true_n_n_return_value_n_nget_Button_n_const_value_BdApi_findModuleByProps_DropdownSizes_n_Object_defineProperty_this_Button_n_value_n_configurable_true_n_n_return_value_n_nget_Flex_n_const_value_BdApi_findModuleByDisplayName_Flex_n_Object_defineProperty_this_Flex_n_value_n_configurable_true_n_n_return_value_n_nget_Text_n_const_value_BdApi_findModuleByDisplayName_Text_n_Object_defineProperty_this_Text_n_value_n_configurable_true_n_n_return_value_n_namespaceObject.TooltipContainer, {
							text: "Loading Last Message..."
						}, Settings.get("useIcons", true) ? external_BdApi_React_default().createElement(cube, {
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
			const pages = [{
				name: "General",
				icon: "Wrench",
				items: [{
					type: "switch",
					name: "Use Icons",
					note: "Defines if icons should be used to show any date.",
					id: "useIcons",
					value: true
				}, {
					type: "radio",
					name: "Time Format",
					value: 1,
					id: "12hour",
					options: [{
						value: 1,
						name: "24 hour"
					}, {
						value: 0,
						name: "12 hour"
					}]
				}, {
					type: "divider"
				}, {
					type: "category",
					name: "Variables",
					items: [{
						type: "replacement",
						prefix: "$timelabel",
						description: "Replaces the current time label. eg AM or PM."
					}, {
						type: "replacement",
						prefix: "$day",
						description: "Replaces the current day."
					}, {
						type: "replacement",
						prefix: "$daysago",
						description: "Replaces with a number of how many days it's ago."
					}, {
						type: "replacement",
						prefix: "$dayname",
						description: "Replaces the shorted dayname."
					}, {
						type: "replacement",
						prefix: "$weeksago",
						description: "Replaces with a number of how many weeks it's ago."
					}, {
						type: "replacement",
						prefix: "$month",
						description: "Replaces the month."
					}, {
						type: "replacement",
						prefix: "$monthname",
						description: "Replaces the shorted monthname."
					}, {
						type: "replacement",
						prefix: "$monthsago",
						description: "Replaces with a number of how many months it's ago."
					}, {
						type: "replacement",
						prefix: "$year",
						description: "Replaces the year."
					}, {
						type: "replacement",
						prefix: "$yearsago",
						description: "Replaces with a number of how many years it's ago."
					}, {
						type: "replacement",
						prefix: "$hour",
						description: "Replaces the hour(s)"
					}, {
						type: "replacement",
						prefix: "$minute",
						description: "Replaces the minute(s)"
					}, {
						type: "replacement",
						prefix: "$second",
						description: "Replaces the second(s)"
					}]
				}]
			}, {
				name: "Created At",
				icon: "Cake",
				items: [{
					type: "switch",
					name: "Show in UserPopout",
					id: "created_show_up",
					note: "Defines if the creation date should be shown in the UserPopout.",
					value: true
				}, {
					type: "switch",
					name: "Show in UserProfile",
					id: "created_show_profile",
					note: "Defines if the creation date should be shown in the UserProfile.",
					value: true
				}, {
					type: "text",
					name: "Created At",
					note: "Format of the Created at date. Read the variables section in the general settings to understand how it works.",
					id: "created_format",
					value: "Created At: $hour:$minute:$second, $day.$month.$year $daysago days"
				}]
			}, {
				name: "Joined At",
				icon: "Calendar",
				items: [{
					type: "switch",
					name: "Show in UserPopout",
					id: "joined_show_up",
					note: "Defines if the joined date should be shown in the UserPopout.",
					value: true
				}, {
					type: "switch",
					name: "Show in UserProfile",
					id: "joined_show_profile",
					note: "Defines if the joined date should be shown in the UserProfile.",
					value: true
				}, {
					type: "text",
					name: "Joined At",
					note: "Format of the joined at date. Read the variables section in the general settings to understand how it works.",
					id: "joined_format",
					value: "Joined At: $hour:$minute:$second, $day.$month.$year $daysago days"
				}]
			}, {
				name: "Last Message At",
				icon: "TextBubble",
				items: [{
					type: "switch",
					name: "Show in UserPopout",
					id: "lastmessage_show_up",
					note: "Defines if the last message date should be shown in the UserPopout.",
					value: true
				}, {
					type: "switch",
					name: "Show in UserProfile",
					id: "lastmessage_show_profile",
					note: "Defines if the last message date should be shown in the UserProfile.",
					value: true
				}, {
					type: "text",
					name: "Last Message",
					note: "Format of the LastMessage at date. Read the variables section in the general settings to understand how it works.",
					id: "lastmessage_format",
					value: "Last Message At: $hour:$minute:$second, $day.$month.$year $daysago days"
				}]
			}, {
				name: "Connections",
				icon: "Chain",
				items: [{
					type: "switch",
					name: "Show Empty",
					note: 'Show a "NO CONNECTIONS" placeholder if the user has no connections.',
					id: "showEmptyConnections",
					value: true
				}, {
					type: "switch",
					name: "Show Verified",
					note: "Shows a little verified badge below the icon if the connection is verified.",
					id: "showVerifiedConnections",
					value: true
				}, {
					type: "icons"
				}]
			}];
			var settings = __webpack_require__(561);
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
			const external_BdApi_findModuleByProps_FormItem_namespaceObject = BdApi.findModuleByProps("FormItem");
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
			var React = __webpack_require__(698);
			const Icons = {
				Cake: cake,
				Calendar: calendar,
				Error: error,
				TextBubble: textbubble,
				Chain: chain,
				Wrench: wrench
			};
			function noop() {
				return null;
			}
			function Icon({
				name,
				...props
			}) {
				const IconComponent = Icons[name] ?? noop;
				return React.createElement(IconComponent, props);
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
			} = external_PluginApi_namespaceObject.WebpackModules.find((m => {
				var _m$default;
				return (null === m || void 0 === m ? void 0 : null === (_m$default = m.default) || void 0 === _m$default ? void 0 : _m$default.toString().indexOf("hasNextSection")) > -1;
			})) ?? {
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
			}, external_BdApi_React_default().createElement(external_BdApi_findModuleByProps_FormItem_namespaceObject.FormItem, {
				title: name,
				className: settings.Z.formItem
			}, external_BdApi_React_default().createElement(TextInput, {
				value,
				onChange
			}), external_BdApi_React_default().createElement(external_BdApi_findModuleByProps_FormItem_namespaceObject.FormText, {
				type: "description",
				disabled: false
			}, note)), external_BdApi_React_default().createElement(external_BdApi_findModuleByProps_FormItem_namespaceObject.FormDivider, null));
			const IconSetting = () => {
				const forceUpdate = Utilities.useForceUpdate();
				const shownIcons = Settings.get("shownConnections", Object.fromEntries(external_BdApi_findModuleByProps_get_isSupported_map_default().map((e => [e.type, true]))));
				return external_BdApi_React_default().createElement(settings_Flex, {
					className: settings.Z.icons
				}, external_BdApi_findModuleByProps_get_isSupported_map_default().filter((e => e.enabled)).map((k => external_BdApi_React_default().createElement(external_get_Tooltip_n_const_value_BdApi_findModuleByDisplayName_Tooltip_n_Object_defineProperty_this_Tooltip_n_value_n_configurable_true_n_n_return_value_n_nget_TooltipContainer_n_const_value_BdApi_findModuleByProps_TooltipContainer_TooltipContainer_n_Object_defineProperty_this_TooltipContainer_n_value_n_configurable_true_n_n_return_value_n_nget_TextInput_n_const_value_BdApi_findModuleByDisplayName_TextInput_n_Object_defineProperty_this_TextInput_n_value_n_configurable_true_n_n_return_value_n_nget_SlideIn_n_const_value_BdApi_findModuleByDisplayName_SlideIn_n_Object_defineProperty_this_SlideIn_n_value_n_configurable_true_n_n_return_value_n_nget_SettingsNotice_n_const_value_BdApi_findModuleByDisplayName_SettingsNotice_n_Object_defineProperty_this_SettingsNotice_n_value_n_configurable_true_n_n_return_value_n_nget_TransitionGroup_n_const_value_BdApi_findModuleByDisplayName_TransitionGroup_n_Object_defineProperty_this_TransitionGroup_n_value_n_configurable_true_n_n_return_value_n_nget_Button_n_const_value_BdApi_findModuleByProps_DropdownSizes_n_Object_defineProperty_this_Button_n_value_n_configurable_true_n_n_return_value_n_nget_Flex_n_const_value_BdApi_findModuleByDisplayName_Flex_n_Object_defineProperty_this_Flex_n_value_n_configurable_true_n_n_return_value_n_nget_Text_n_const_value_BdApi_findModuleByDisplayName_Text_n_Object_defineProperty_this_Text_n_value_n_configurable_true_n_n_return_value_n_namespaceObject.TooltipContainer, {
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
						return external_BdApi_React_default().createElement(RadioGroup, settings_extends({}, setting, {
							value: Settings.get(setting.id, setting.value),
							onChange: value => {
								Settings.set(setting.id, value);
							}
						}), setting.name);
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
						return external_BdApi_React_default().createElement(external_BdApi_findModuleByProps_FormItem_namespaceObject.FormDivider, null);
				}
			};
			const renderCustomcrumb = ({
				label
			}, isActive) => external_BdApi_React_default().createElement(external_BdApi_findModuleByProps_FormItem_namespaceObject.FormTitle, {
				tag: external_BdApi_findModuleByProps_FormItem_namespaceObject.FormTitle.Tags.H2,
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
				}, "main" === activeItem ? external_BdApi_React_default().createElement(external_BdApi_findModuleByProps_FormItem_namespaceObject.FormTitle, {
					className: breadCrumbs.breakcrumb,
					tag: external_BdApi_findModuleByProps_FormItem_namespaceObject.FormTitle.Tags.H2
				}, "General") : external_BdApi_React_default().createElement(Breadcrumbs, {
					activeId: activeItem,
					breadcrumbs: mainPages.concat({
						id: activeItem,
						label: pages[activeItem].name
					}),
					renderCustomBreadcrumb: renderCustomcrumb,
					onBreadcrumbClick: e => setActiveItem(e.id)
				})), "main" === activeItem ? pages.map(((page, index) => external_BdApi_React_default().createElement(CardItem, {
					buttonDisabled: false,
					buttonText: "Configure",
					details: [{
						text: `${page.items.length} setting${page.items.length > 1 ? "s" : ""}.`
					}],
					hasNextSection: true,
					icon: () => external_BdApi_React_default().createElement(Icon, {
						name: page.icon,
						fill: "var(--interactive-normal)"
					}),
					name: page.name,
					onButtonClick: () => setActiveItem(index)
				}))) : pages[activeItem].items.map(renderSetting)));
			}
			const external_BasePlugin_namespaceObject = BasePlugin;
			var external_BasePlugin_default = __webpack_require__.n(external_BasePlugin_namespaceObject);
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
					UserDetails_defineProperty(this, "onMessage", (({
						channelId,
						message
					}) => {
						try {
							const roomId = message.guild_id ? message.guild_id : channelId;
							if (!this.lastMessageApi.cache[roomId]) this.lastMessageApi.cache[roomId] = {};
							this.lastMessageApi.cache[roomId][message.author.id] = {
								data: {
									body: {
										messages: [
											[{
												...message,
												hit: true
											}]
										]
									}
								},
								fetch: Date.now()
							};
						} catch (error) {
							external_PluginApi_namespaceObject.Logger.error(error);
						}
					}));
					UserDetails_defineProperty(this, "onMessageDelete", (({
						channelId,
						messageId
					}) => {
						try {
							if (!this.lastMessageApi.cache[channelId]) return;
							const userIds = Object.keys(this.lastMessageApi.cache[channelId]);
							for (const userId of userIds) {
								var _chunk$data, _chunk$data$body;
								const chunk = this.lastMessageApi.cache[channelId][userId];
								const index = null === chunk || void 0 === chunk ? void 0 : null === (_chunk$data = chunk.data) || void 0 === _chunk$data ? void 0 : null === (_chunk$data$body = _chunk$data.body) || void 0 === _chunk$data$body ? void 0 : _chunk$data$body.messages.findIndex((e => {
									var _e$;
									return (null === e || void 0 === e ? void 0 : null === (_e$ = e[0]) || void 0 === _e$ ? void 0 : _e$.id) === messageId;
								}));
								if (~index) chunk.data.body.messages.splice(index, 1);
							}
						} catch (error) {
							external_PluginApi_namespaceObject.Logger.error("Error in MessageDelete event:\n", error);
						}
					}));
				}
				getSettingsPanel() {
					const ConnectedSettings = Settings.connectStore(SettingsPanel);
					return external_BdApi_React_default().createElement(ConnectedSettings, null);
				}
				onStart() {
					external_n_inject_n_if_style_element_style_element_remove_n_style_element_document_head_appendChild_Object_assign_document_createElement_style_textContent_plugin_styles_n_n_remove_n_if_style_element_n_style_element_remove_n_style_element_null_n_n_n_default().inject();
					this.createdApi = new CreatedAt(this);
					this.joinedApi = new JoinedAt(this);
					this.lastMessageApi = new LastMessage(this);
					this.connectionsApi = new Userconnections(this);
					this.patchUserPopout();
					this.patchUserProfile();
					external_get_Dispatcher_n_const_value_BdApi_findModuleByProps_dirtyDispatch_subscribe_n_Object_defineProperty_this_Dispatcher_n_value_n_configurable_true_n_n_return_value_n_nget_EmojiUtils_n_const_value_BdApi_findModuleByProps_uploadEmoji_n_Object_defineProperty_this_EmojiUtils_n_value_n_configurable_true_n_n_return_value_n_nget_PermissionUtils_n_const_value_BdApi_findModuleByProps_computePermissions_n_Object_defineProperty_this_PermissionUtils_n_value_n_configurable_true_n_n_return_value_n_namespaceObject.Dispatcher.subscribe("MESSAGE_CREATE", this.onMessage);
					external_get_Dispatcher_n_const_value_BdApi_findModuleByProps_dirtyDispatch_subscribe_n_Object_defineProperty_this_Dispatcher_n_value_n_configurable_true_n_n_return_value_n_nget_EmojiUtils_n_const_value_BdApi_findModuleByProps_uploadEmoji_n_Object_defineProperty_this_EmojiUtils_n_value_n_configurable_true_n_n_return_value_n_nget_PermissionUtils_n_const_value_BdApi_findModuleByProps_computePermissions_n_Object_defineProperty_this_PermissionUtils_n_value_n_configurable_true_n_n_return_value_n_namespaceObject.Dispatcher.subscribe("MESSAGE_DELETE", this.onMessageDelete);
				}
				async patchUserPopout() {
					const UserPopout = await external_PluginApi_namespaceObject.ReactComponents.getComponentByName("UserPopout", getClass(["userPopout"], ["userPopout"], [], true));
					const UserPopoutHeader = external_PluginApi_namespaceObject.WebpackModules.getModule((m => {
						var _m$default;
						return "UserPopoutHeader" === (null === (_m$default = m.default) || void 0 === _m$default ? void 0 : _m$default.displayName);
					}));
					const patch = (user, tree, type) => {
						const WrappedJoinedAt = this.joinedApi.task(user.id);
						const WrappedCreatedAt = this.createdApi.task(user.id);
						const WrappedLastMessage = this.lastMessageApi.task(user);
						tree.children.splice(2, 0, external_BdApi_React_default().createElement(ErrorBoundary, {
							key: type,
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
					};
					external_PluginApi_namespaceObject.Patcher.after(UserPopoutHeader, "default", ((_, [{
						user
					}], returnValue) => {
						if (this.promises.cancelled) return;
						const tree = Utilities.findInReactTree(returnValue, (m => {
							var _m$className;
							return (null === m || void 0 === m ? void 0 : null === (_m$className = m.className) || void 0 === _m$className ? void 0 : _m$className.indexOf("headerTop")) > -1;
						}));
						if (!Array.isArray(null === tree || void 0 === tree ? void 0 : tree.children) || !user) return;
						patch(user, tree, "PopoutHeader");
					}));
					external_PluginApi_namespaceObject.Patcher.after(UserPopout.component.prototype, "renderHeader", ((thisObject, _, returnValue) => {
						const tree = Utilities.findInReactTree(returnValue, (e => e && e.direction));
						if (!Array.isArray(null === tree || void 0 === tree ? void 0 : tree.children) || !thisObject.props.user) return returnValue;
						patch(thisObject.props.user, tree, "RenderHeader");
					}));
					const titleClassName = getClass(["bodyTitle"], ["bodyTitle"]);
					external_PluginApi_namespaceObject.Patcher.after(UserPopout.component.prototype, "renderBody", ((thisObject, _, returnValue) => {
						if (this.promises.cancelled) return;
						const tree = Utilities.findInReactTree(returnValue, (e => (null === e || void 0 === e ? void 0 : e.className) && Array.isArray(e.children)));
						if (!Array.isArray(null === tree || void 0 === tree ? void 0 : tree.children)) return returnValue;
						const Connections = this.connectionsApi.task(thisObject.props.user);
						tree.children.unshift(external_BdApi_React_default().createElement(ErrorBoundary, {
							id: "UserPopoutBody",
							mini: true,
							key: "connections"
						}, external_BdApi_React_default().createElement(Connections, {
							titleClassName
						})));
					}));
					UserPopout.forceUpdateAll();
				}
				async patchUserProfile() {
					const UserProfile = await external_PluginApi_namespaceObject.ReactComponents.getComponentByName("UserProfileBody", getClass(["root", "topSectionNormal", "topSectionStreaming"], ["root"], [], true));
					external_PluginApi_namespaceObject.Patcher.after(UserProfile.component.prototype, "renderHeader", ((thisObject, _, returnValue) => {
						if (this.promises.cancelled) return;
						const tree = Utilities.findInReactTree(returnValue, (n => {
							var _n$className;
							return (null === n || void 0 === n ? void 0 : null === (_n$className = n.className) || void 0 === _n$className ? void 0 : _n$className.indexOf("headerInfo")) > -1;
						}));
						if (!tree) return;
						if (!thisObject.props.user) return;
						const WrappedJoinedAt = this.joinedApi.task(thisObject.props.user.id);
						const WrappedCreatedAt = this.createdApi.task(thisObject.props.user.id);
						const WrappedLastMessage = this.lastMessageApi.task(thisObject.props.user);
						tree.children.push(external_BdApi_React_default().createElement(ErrorBoundary, {
							id: "UserProfile",
							mini: true
						}, external_BdApi_React_default().createElement("div", {
							className: Utilities.joinClassNames(dates.Z.container, dates.Z.userProfile, Settings.get("useIcons", true) ? dates.Z.icons : dates.Z.text)
						}, Settings.get("created_show_profile", true) && external_BdApi_React_default().createElement(WrappedCreatedAt, null), Settings.get("joined_show_profile", true) && external_BdApi_React_default().createElement(WrappedJoinedAt, null), Settings.get("lastmessage_show_profile", true) && external_BdApi_React_default().createElement(WrappedLastMessage, null))));
					}));
					UserProfile.forceUpdateAll();
				}
				onStop() {
					external_PluginApi_namespaceObject.Patcher.unpatchAll();
					external_get_Dispatcher_n_const_value_BdApi_findModuleByProps_dirtyDispatch_subscribe_n_Object_defineProperty_this_Dispatcher_n_value_n_configurable_true_n_n_return_value_n_nget_EmojiUtils_n_const_value_BdApi_findModuleByProps_uploadEmoji_n_Object_defineProperty_this_EmojiUtils_n_value_n_configurable_true_n_n_return_value_n_nget_PermissionUtils_n_const_value_BdApi_findModuleByProps_computePermissions_n_Object_defineProperty_this_PermissionUtils_n_value_n_configurable_true_n_n_return_value_n_namespaceObject.Dispatcher.unsubscribe("MESSAGE_CREATE", this.onMessage);
					external_get_Dispatcher_n_const_value_BdApi_findModuleByProps_dirtyDispatch_subscribe_n_Object_defineProperty_this_Dispatcher_n_value_n_configurable_true_n_n_return_value_n_nget_EmojiUtils_n_const_value_BdApi_findModuleByProps_uploadEmoji_n_Object_defineProperty_this_EmojiUtils_n_value_n_configurable_true_n_n_return_value_n_nget_PermissionUtils_n_const_value_BdApi_findModuleByProps_computePermissions_n_Object_defineProperty_this_PermissionUtils_n_value_n_configurable_true_n_n_return_value_n_namespaceObject.Dispatcher.unsubscribe("MESSAGE_DELETE", this.onMessageDelete);
					external_n_inject_n_if_style_element_style_element_remove_n_style_element_document_head_appendChild_Object_assign_document_createElement_style_textContent_plugin_styles_n_n_remove_n_if_style_element_n_style_element_remove_n_style_element_null_n_n_n_default().remove();
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