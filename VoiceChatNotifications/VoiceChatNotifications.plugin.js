/**
 * @name VoiceChatNotifications
 * @version 1.0.0
 * @description Shows you certain events from voicechats in a logs panel or as desktop notification.
 * @author Strencher
 * @source https://github.com/Strencher/BetterDiscordStuff/VoiceChatNotifications
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
		"version": "1.0.0",
		"description": "Shows you certain events from voicechats in a logs panel or as desktop notification.",
		"authors": [{
			"name": "Strencher",
			"discord_id": "415849376598982656",
			"github_username": "Strencher"
		}],
		"github": "https://github.com/Strencher/BetterDiscordStuff/VoiceChatNotifications",
		"github_raw": "https://raw.githubusercontent.com/Strencher/BetterDiscordStuff/master/VoiceChatNotifications/VoiceChatNotifications.plugin.js"
	},
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
		let __plugin_styles__ = "";
		let __style_element__ = null;
		var __webpack_modules__ = {
			281: (module, __webpack_exports__, __webpack_require__) => {
				__webpack_require__.d(__webpack_exports__, {
					Z: () => __WEBPACK_DEFAULT_EXPORT__
				});
				var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(645);
				var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = __webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
				var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()((function(i) {
					return i[1];
				}));
				___CSS_LOADER_EXPORT___.push([module.id, ".VoiceChatNotifications-button-icon{cursor:pointer;align-items:center}", ""]);
				___CSS_LOADER_EXPORT___.locals = {
					icon: "VoiceChatNotifications-button-icon"
				};
				__plugin_styles__ += `\n/* ${module.id} */\n${___CSS_LOADER_EXPORT___}\n`;
				const __WEBPACK_DEFAULT_EXPORT__ = Object.assign(___CSS_LOADER_EXPORT___, ___CSS_LOADER_EXPORT___.locals);
			},
			554: (module, __webpack_exports__, __webpack_require__) => {
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
				__plugin_styles__ += `\n/* ${module.id} */\n${___CSS_LOADER_EXPORT___}\n`;
				const __WEBPACK_DEFAULT_EXPORT__ = Object.assign(___CSS_LOADER_EXPORT___, ___CSS_LOADER_EXPORT___.locals);
			},
			562: (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
				__webpack_require__.r(__webpack_exports__);
				__webpack_require__.d(__webpack_exports__, {
					default: () => VoiceChatNotifications
				});
				const external_get_Timestamp_n_const_value_BdApi_findModuleByPrototypes_toDate_month_n_Object_defineProperty_this_Timestamp_n_value_n_configurable_true_n_n_return_value_n_nget_Message_n_const_value_BdApi_findModuleByPrototypes_getReaction_isSystemDM_n_Object_defineProperty_this_Message_n_value_n_configurable_true_n_n_return_value_n_nget_User_n_const_value_BdApi_findModuleByPrototypes_tag_n_Object_defineProperty_this_User_n_value_n_configurable_true_n_n_return_value_n_nget_Channel_n_const_value_BdApi_findModuleByPrototypes_isOwner_isCategory_n_Object_defineProperty_this_Channel_n_value_n_configurable_true_n_n_return_value_n_namespaceObject = {
					get Timestamp() {
						const value = BdApi.findModuleByPrototypes("toDate", "month");
						Object.defineProperty(this, "Timestamp", {
							value,
							configurable: true
						});
						return value;
					},
					get Message() {
						const value = BdApi.findModuleByPrototypes("getReaction", "isSystemDM");
						Object.defineProperty(this, "Message", {
							value,
							configurable: true
						});
						return value;
					},
					get User() {
						const value = BdApi.findModuleByPrototypes("tag");
						Object.defineProperty(this, "User", {
							value,
							configurable: true
						});
						return value;
					},
					get Channel() {
						const value = BdApi.findModuleByPrototypes("isOwner", "isCategory");
						Object.defineProperty(this, "Channel", {
							value,
							configurable: true
						});
						return value;
					}
				};
				const external_Object_assign_BdApi_findModuleByProps_ModalRoot_BdApi_findModuleByProps_openModal_namespaceObject = Object.assign({}, BdApi.findModuleByProps("ModalRoot"), BdApi.findModuleByProps("openModal"));
				const external_get_Messages_n_const_value_BdApi_findModuleByProps_getMessage_getMessages_n_Object_defineProperty_this_Messages_n_value_n_configurable_true_n_n_return_value_n_nget_Channels_n_const_value_BdApi_findModuleByPorps_getChannel_n_Object_defineProperty_this_Channels_n_value_n_configurable_true_n_n_return_value_n_nget_Guilds_n_const_value_BdApi_findModuleByProps_getGuild_n_Object_defineProperty_this_Guilds_n_value_n_configurable_true_n_n_return_value_n_nget_SelectedGuilds_n_const_value_BdApi_findModuleByProps_getGuildId_getLastSelectedGuildId_n_Object_defineProperty_this_SelectedGuilds_n_value_n_configurable_true_n_n_return_value_n_nget_SelectedChannels_n_const_value_BdApi_findModuleByProps_getChannelId_getLastSelectedChannelId_n_Object_defineProperty_this_SelectedChannels_n_value_n_configurable_true_n_n_return_value_n_nget_Info_n_const_value_BdApi_findModuleByProps_getCurrentUser_n_Object_defineProperty_this_Info_n_value_n_configurable_true_n_n_return_value_n_nget_Status_n_const_value_BdApi_findModuleByProps_getStatus_n_Object_defineProperty_this_Status_n_value_n_configurable_true_n_n_return_value_n_nget_Users_n_const_value_BdApi_findModuleByProps_getUser_n_Object_defineProperty_this_Users_n_value_n_configurable_true_n_n_return_value_n_nget_Settings_n_const_value_BdApi_findModuleByProps_afkTimeout_status_n_Object_defineProperty_this_Settings_n_value_n_configurable_true_n_n_return_value_n_namespaceObject = {
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
					}
				};
				const external_PluginApi_namespaceObject = PluginApi;
				const external_BasePlugin_namespaceObject = BasePlugin;
				var external_BasePlugin_default = __webpack_require__.n(external_BasePlugin_namespaceObject);
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
				var components_button = __webpack_require__(281);
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
				function VoiceNotificationsButton(props) {
					return React.createElement(external_get_Tooltip_n_const_value_BdApi_findModuleByDisplayName_Tooltip_n_Object_defineProperty_this_Tooltip_n_value_n_configurable_true_n_n_return_value_n_nget_TooltipContainer_n_const_value_BdApi_findModuleByProps_TooltipContainer_TooltipContainer_n_Object_defineProperty_this_TooltipContainer_n_value_n_configurable_true_n_n_return_value_n_nget_TextInput_n_const_value_BdApi_findModuleByDisplayName_TextInput_n_Object_defineProperty_this_TextInput_n_value_n_configurable_true_n_n_return_value_n_nget_SlideIn_n_const_value_BdApi_findModuleByDisplayName_SlideIn_n_Object_defineProperty_this_SlideIn_n_value_n_configurable_true_n_n_return_value_n_nget_SettingsNotice_n_const_value_BdApi_findModuleByDisplayName_SettingsNotice_n_Object_defineProperty_this_SettingsNotice_n_value_n_configurable_true_n_n_return_value_n_nget_TransitionGroup_n_const_value_BdApi_findModuleByDisplayName_TransitionGroup_n_Object_defineProperty_this_TransitionGroup_n_value_n_configurable_true_n_n_return_value_n_nget_Button_n_const_value_BdApi_findModuleByProps_DropdownSizes_n_Object_defineProperty_this_Button_n_value_n_configurable_true_n_n_return_value_n_nget_Flex_n_const_value_BdApi_findModuleByDisplayName_Flex_n_Object_defineProperty_this_Flex_n_value_n_configurable_true_n_n_return_value_n_nget_Text_n_const_value_BdApi_findModuleByDisplayName_Text_n_Object_defineProperty_this_Text_n_value_n_configurable_true_n_n_return_value_n_namespaceObject.TooltipContainer, {
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
						width: "22",
						height: "22"
					}, React.createElement("g", null, React.createElement("path", {
						d: "M299.389,412.924l-53.346,24.248c-5.285,2.402-10.87,3.62-16.602,3.62c-6.846,0-13.425-1.743-19.222-4.94   c-0.288,0.016-0.574,0.044-0.867,0.044H96.137c-8.284,0-15-6.716-15-15c0-8.284,6.716-15,15-15h93.655   c-0.938-7.26,0.133-14.757,3.285-21.69l3.777-8.31H96.137c-8.284,0-15-6.716-15-15c0-8.284,6.716-15,15-15H210.49l6.907-15.196   c0.018-0.04,0.038-0.072,0.057-0.11c1.471-3.201,3.502-6.151,6.041-8.69l6.005-6.004H96.137c-8.284,0-15-6.716-15-15   s6.716-15,15-15H259.5l30-29.999H96.137c-8.284,0-15-6.716-15-15c0-8.284,6.716-15,15-15H319.5l77.724-77.723l0.345-0.344V67.001   c0-8.284-6.716-15-15-15h-35V15c0-8.284-6.716-15-15-15c-8.284,0-15,6.716-15,15v37h-31.429V15c0-8.284-6.716-15-15-15   c-8.284,0-15,6.716-15,15v37H224.71V15c0-8.284-6.716-15-15-15c-8.284,0-15,6.716-15,15v37h-31.429V15c0-8.284-6.716-15-15-15   c-8.284,0-15,6.716-15,15v37h-31.429V15c0-8.284-6.716-15-15-15s-15,6.716-15,15v37H36.137c-8.284,0-15,6.716-15,15v400   c0,24.813,20.187,45,45,45h286.432c24.813,0,45-20.187,45-45V317.533l-89.221,89.22   C305.682,409.419,302.637,411.471,299.389,412.924z M209.71,195.897H96.137c-8.284,0-15-6.716-15-15c0-8.284,6.716-15,15-15H209.71   c8.284,0,15,6.716,15,15C224.71,189.182,217.994,195.897,209.71,195.897z"
					}), React.createElement("path", {
						d: "M397.224,190.6L244.708,343.114l-24.32,53.505c-3.824,8.412,4.83,17.065,13.242,13.242l53.505-24.32h0L439.65,233.026   L397.224,190.6L397.224,190.6z"
					}), React.createElement("path", {
						d: "M482.077,148.174c-11.716-11.716-30.711-11.716-42.426,0l-21.213,21.213l42.426,42.426l21.213-21.213   C493.792,178.884,493.792,159.89,482.077,148.174z"
					})))));
				}
				const package_namespaceObject = JSON.parse('{"u":{"u2":"VoiceChatNotifications"}}');
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
				class Settings {
					static saveState() {
						external_PluginApi_namespaceObject.PluginUtilities.saveSettings(package_namespaceObject.u.u2, this.settings);
					}
				}
				_defineProperty(Settings, "settings", external_PluginApi_namespaceObject.PluginUtilities.loadSettings(package_namespaceObject.u.u2, {}));
				_defineProperty(Settings, "get", ((key, defaultValue) => Settings.settings[key] ?? defaultValue));
				_defineProperty(Settings, "set", ((key, value) => {
					Settings.settings[key] = value;
					Settings.saveState();
				}));
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
				const external_PluginApi_DiscordModules_namespaceObject = PluginApi.DiscordModules;
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
				const external_BdApi_findModuleByProps_ScrollerAuto_namespaceObject = BdApi.findModuleByProps("ScrollerAuto");
				var external_BdApi_React_ = __webpack_require__(698);
				var external_BdApi_React_default = __webpack_require__.n(external_BdApi_React_);
				function createStore(state) {
					const listeners = new Set;
					const api = {
						getState() {
							return state;
						},
						setState(partial) {
							const partialState = "function" === typeof partial ? partial(state) : partial;
							if (!_.isEqual(partialState, state)) {
								state = Object.assign({}, state, partialState);
								listeners.forEach((listener => {
									listener(state);
								}));
							}
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
				var panel = __webpack_require__(554);
				var panel_React = __webpack_require__(698);
				const ChannelMessage = external_PluginApi_namespaceObject.WebpackModules.getModule((m => {
					var _m$type;
					return "ChannelMessage" === (null === m || void 0 === m ? void 0 : null === (_m$type = m.type) || void 0 === _m$type ? void 0 : _m$type.displayName);
				}));
				const dummyChannel = new external_get_Timestamp_n_const_value_BdApi_findModuleByPrototypes_toDate_month_n_Object_defineProperty_this_Timestamp_n_value_n_configurable_true_n_n_return_value_n_nget_Message_n_const_value_BdApi_findModuleByPrototypes_getReaction_isSystemDM_n_Object_defineProperty_this_Message_n_value_n_configurable_true_n_n_return_value_n_nget_User_n_const_value_BdApi_findModuleByPrototypes_tag_n_Object_defineProperty_this_User_n_value_n_configurable_true_n_n_return_value_n_nget_Channel_n_const_value_BdApi_findModuleByPrototypes_isOwner_isCategory_n_Object_defineProperty_this_Channel_n_value_n_configurable_true_n_n_return_value_n_namespaceObject.Channel({
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
						var _lastItem, _lastItem$user;
						let isGroupStart = (null === (_lastItem = lastItem) || void 0 === _lastItem ? void 0 : null === (_lastItem$user = _lastItem.user) || void 0 === _lastItem$user ? void 0 : _lastItem$user.id) === item.user.id;
						const message = new external_get_Timestamp_n_const_value_BdApi_findModuleByPrototypes_toDate_month_n_Object_defineProperty_this_Timestamp_n_value_n_configurable_true_n_n_return_value_n_nget_Message_n_const_value_BdApi_findModuleByPrototypes_getReaction_isSystemDM_n_Object_defineProperty_this_Message_n_value_n_configurable_true_n_n_return_value_n_nget_User_n_const_value_BdApi_findModuleByPrototypes_tag_n_Object_defineProperty_this_User_n_value_n_configurable_true_n_n_return_value_n_nget_Channel_n_const_value_BdApi_findModuleByPrototypes_isOwner_isCategory_n_Object_defineProperty_this_Channel_n_value_n_configurable_true_n_n_return_value_n_namespaceObject.Message({
							content: item.message,
							timestamp: item.timestamp,
							author: new external_get_Timestamp_n_const_value_BdApi_findModuleByPrototypes_toDate_month_n_Object_defineProperty_this_Timestamp_n_value_n_configurable_true_n_n_return_value_n_nget_Message_n_const_value_BdApi_findModuleByPrototypes_getReaction_isSystemDM_n_Object_defineProperty_this_Message_n_value_n_configurable_true_n_n_return_value_n_nget_User_n_const_value_BdApi_findModuleByPrototypes_tag_n_Object_defineProperty_this_User_n_value_n_configurable_true_n_n_return_value_n_nget_Channel_n_const_value_BdApi_findModuleByPrototypes_isOwner_isCategory_n_Object_defineProperty_this_Channel_n_value_n_configurable_true_n_n_return_value_n_namespaceObject.User(item.user)
						});
						message.start = !isGroupStart;
						formattedLogs.push(message);
						lastItem = item;
					}
					return panel_React.createElement("div", null, panel_React.createElement(external_get_Tooltip_n_const_value_BdApi_findModuleByDisplayName_Tooltip_n_Object_defineProperty_this_Tooltip_n_value_n_configurable_true_n_n_return_value_n_nget_TooltipContainer_n_const_value_BdApi_findModuleByProps_TooltipContainer_TooltipContainer_n_Object_defineProperty_this_TooltipContainer_n_value_n_configurable_true_n_n_return_value_n_nget_TextInput_n_const_value_BdApi_findModuleByDisplayName_TextInput_n_Object_defineProperty_this_TextInput_n_value_n_configurable_true_n_n_return_value_n_nget_SlideIn_n_const_value_BdApi_findModuleByDisplayName_SlideIn_n_Object_defineProperty_this_SlideIn_n_value_n_configurable_true_n_n_return_value_n_nget_SettingsNotice_n_const_value_BdApi_findModuleByDisplayName_SettingsNotice_n_Object_defineProperty_this_SettingsNotice_n_value_n_configurable_true_n_n_return_value_n_nget_TransitionGroup_n_const_value_BdApi_findModuleByDisplayName_TransitionGroup_n_Object_defineProperty_this_TransitionGroup_n_value_n_configurable_true_n_n_return_value_n_nget_Button_n_const_value_BdApi_findModuleByProps_DropdownSizes_n_Object_defineProperty_this_Button_n_value_n_configurable_true_n_n_return_value_n_nget_Flex_n_const_value_BdApi_findModuleByDisplayName_Flex_n_Object_defineProperty_this_Flex_n_value_n_configurable_true_n_n_return_value_n_nget_Text_n_const_value_BdApi_findModuleByDisplayName_Text_n_Object_defineProperty_this_Text_n_value_n_configurable_true_n_n_return_value_n_namespaceObject.Button, {
						className: panel.Z.clearButton,
						onClick: () => Api.setState({
							logs: []
						})
					}, "Clear Logs"), panel_React.createElement(external_BdApi_findModuleByProps_ScrollerAuto_namespaceObject.ScrollerThin, {
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
				const createUpdateWrapper = (Component, valueProp = "value", changeProp = "onChange") => props => {
					const [value, setValue] = external_BdApi_React_default().useState(props[valueProp]);
					return external_BdApi_React_default().createElement(Component, Settings_extends({}, props, {
						[valueProp]: value,
						[changeProp]: value => {
							if ("function" === typeof props[changeProp]) props[changeProp](value);
							setValue(value);
						}
					}));
				};
				const SwitchItem = createUpdateWrapper(external_PluginApi_namespaceObject.WebpackModules.getByDisplayName("SwitchItem"));
				function SettingsPanel() {
					return external_BdApi_React_default().createElement("div", null, external_BdApi_React_default().createElement(SwitchItem, {
						note: "Defines if logs about your own actions should be shown.",
						value: Settings.get("ignoreSelf", false),
						onChange: value => {
							Settings.set("ignoreSelf", value);
						}
					}, "Log yourself"), Object.keys(constants.VOICE_STATES).reduce(((items, key) => {
						items.push(external_BdApi_React_default().createElement(SwitchItem, {
							value: Settings.get(key, true),
							onChange: value => {
								Settings.set(key, value);
							},
							note: constants.VOICE_STATES[key].description
						}, _.upperFirst(key)));
						return items;
					}), []));
				}
				var VoiceChatNotifications_React = __webpack_require__(698);
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
				class VoiceChatNotifications extends(external_BasePlugin_default()) {
					constructor(...args) {
						super(...args);
						VoiceChatNotifications_defineProperty(this, "logs", []);
						VoiceChatNotifications_defineProperty(this, "lastStates", {});
						VoiceChatNotifications_defineProperty(this, "logsRef", VoiceChatNotifications_React.createRef());
						VoiceChatNotifications_defineProperty(this, "currentVoiceChannelId", void 0);
						VoiceChatNotifications_defineProperty(this, "openLogs", (() => {
							(0, external_Object_assign_BdApi_findModuleByProps_ModalRoot_BdApi_findModuleByProps_openModal_namespaceObject.openModal)((props => VoiceChatNotifications_React.createElement(external_Object_assign_BdApi_findModuleByProps_ModalRoot_BdApi_findModuleByProps_openModal_namespaceObject.ModalRoot, props, VoiceChatNotifications_React.createElement(LogsPanel, null))));
						}));
						VoiceChatNotifications_defineProperty(this, "onVoiceStateChange", (props => {
							let user = external_get_Messages_n_const_value_BdApi_findModuleByProps_getMessage_getMessages_n_Object_defineProperty_this_Messages_n_value_n_configurable_true_n_n_return_value_n_nget_Channels_n_const_value_BdApi_findModuleByPorps_getChannel_n_Object_defineProperty_this_Channels_n_value_n_configurable_true_n_n_return_value_n_nget_Guilds_n_const_value_BdApi_findModuleByProps_getGuild_n_Object_defineProperty_this_Guilds_n_value_n_configurable_true_n_n_return_value_n_nget_SelectedGuilds_n_const_value_BdApi_findModuleByProps_getGuildId_getLastSelectedGuildId_n_Object_defineProperty_this_SelectedGuilds_n_value_n_configurable_true_n_n_return_value_n_nget_SelectedChannels_n_const_value_BdApi_findModuleByProps_getChannelId_getLastSelectedChannelId_n_Object_defineProperty_this_SelectedChannels_n_value_n_configurable_true_n_n_return_value_n_nget_Info_n_const_value_BdApi_findModuleByProps_getCurrentUser_n_Object_defineProperty_this_Info_n_value_n_configurable_true_n_n_return_value_n_nget_Status_n_const_value_BdApi_findModuleByProps_getStatus_n_Object_defineProperty_this_Status_n_value_n_configurable_true_n_n_return_value_n_nget_Users_n_const_value_BdApi_findModuleByProps_getUser_n_Object_defineProperty_this_Users_n_value_n_configurable_true_n_n_return_value_n_nget_Settings_n_const_value_BdApi_findModuleByProps_afkTimeout_status_n_Object_defineProperty_this_Settings_n_value_n_configurable_true_n_n_return_value_n_namespaceObject.Users.getUser(props.userId) || {};
							if (Settings.get("ignoreSelf", false) && user.id === external_get_Messages_n_const_value_BdApi_findModuleByProps_getMessage_getMessages_n_Object_defineProperty_this_Messages_n_value_n_configurable_true_n_n_return_value_n_nget_Channels_n_const_value_BdApi_findModuleByPorps_getChannel_n_Object_defineProperty_this_Channels_n_value_n_configurable_true_n_n_return_value_n_nget_Guilds_n_const_value_BdApi_findModuleByProps_getGuild_n_Object_defineProperty_this_Guilds_n_value_n_configurable_true_n_n_return_value_n_nget_SelectedGuilds_n_const_value_BdApi_findModuleByProps_getGuildId_getLastSelectedGuildId_n_Object_defineProperty_this_SelectedGuilds_n_value_n_configurable_true_n_n_return_value_n_nget_SelectedChannels_n_const_value_BdApi_findModuleByProps_getChannelId_getLastSelectedChannelId_n_Object_defineProperty_this_SelectedChannels_n_value_n_configurable_true_n_n_return_value_n_nget_Info_n_const_value_BdApi_findModuleByProps_getCurrentUser_n_Object_defineProperty_this_Info_n_value_n_configurable_true_n_n_return_value_n_nget_Status_n_const_value_BdApi_findModuleByProps_getStatus_n_Object_defineProperty_this_Status_n_value_n_configurable_true_n_n_return_value_n_nget_Users_n_const_value_BdApi_findModuleByProps_getUser_n_Object_defineProperty_this_Users_n_value_n_configurable_true_n_n_return_value_n_nget_Settings_n_const_value_BdApi_findModuleByProps_afkTimeout_status_n_Object_defineProperty_this_Settings_n_value_n_configurable_true_n_n_return_value_n_namespaceObject.Info.getCurrentUser().id) return;
							const pushToLog = message => {
								const timestamp = new external_get_Timestamp_n_const_value_BdApi_findModuleByPrototypes_toDate_month_n_Object_defineProperty_this_Timestamp_n_value_n_configurable_true_n_n_return_value_n_nget_Message_n_const_value_BdApi_findModuleByPrototypes_getReaction_isSystemDM_n_Object_defineProperty_this_Message_n_value_n_configurable_true_n_n_return_value_n_nget_User_n_const_value_BdApi_findModuleByPrototypes_tag_n_Object_defineProperty_this_User_n_value_n_configurable_true_n_n_return_value_n_nget_Channel_n_const_value_BdApi_findModuleByPrototypes_isOwner_isCategory_n_Object_defineProperty_this_Channel_n_value_n_configurable_true_n_n_return_value_n_namespaceObject.Timestamp(new Date);
								LogsPanel.Store.setState((state => ({
									logs: state.logs.concat({
										user,
										timestamp,
										message
									})
								})));
							};
							if (this.lastStates[props.userId] && !props.channelId && Settings.get("leave", true)) {
								pushToLog("Left.");
								delete this.lastStates[props.userId];
							}
							if (props.channelId !== this.currentVoiceChannelId) return;
							if (!this.lastStates[props.userId]) {
								if (Settings.get("join", true)) pushToLog("Joined.");
								this.lastStates[props.userId] = props;
							} else {
								if (_.isEqual(this.lastStates[props.userId], props)) return;
								for (const prop in constants.VOICE_STATES) {
									const value = constants.VOICE_STATES[prop];
									const hasChanges = this.lastStates[props.userId][prop] !== props[prop];
									if (Settings.get(value.setting, true) && hasChanges) pushToLog(value.strings[Number(Boolean(props[prop]))]);
								}
								this.lastStates[props.userId] = props;
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
							[external_PluginApi_DiscordModules_namespaceObject.DiscordConstants.ActionTypes.VOICE_STATE_UPDATE, this.onVoiceStateChange],
							[external_PluginApi_DiscordModules_namespaceObject.DiscordConstants.ActionTypes.VOICE_CHANNEL_SELECT, this.onSelect]
						];
					}
					getSettingsPanel() {
						return VoiceChatNotifications_React.createElement(SettingsPanel, null);
					}
					onStart() {
						external_n_inject_n_if_style_element_style_element_remove_n_style_element_document_head_appendChild_Object_assign_document_createElement_style_textContent_plugin_styles_n_n_remove_n_if_style_element_n_style_element_remove_n_style_element_null_n_n_n_default().inject();
						for (const [event, callback] of this.subscriptions) external_get_Dispatcher_n_const_value_BdApi_findModuleByProps_dirtyDispatch_subscribe_n_Object_defineProperty_this_Dispatcher_n_value_n_configurable_true_n_n_return_value_n_nget_EmojiUtils_n_const_value_BdApi_findModuleByProps_uploadEmoji_n_Object_defineProperty_this_EmojiUtils_n_value_n_configurable_true_n_n_return_value_n_nget_PermissionUtils_n_const_value_BdApi_findModuleByProps_computePermissions_n_Object_defineProperty_this_PermissionUtils_n_value_n_configurable_true_n_n_return_value_n_namespaceObject.Dispatcher.subscribe(event, callback);
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
						timestamp
					}) {
						if (Settings.get("desktopNotifi", false) && Settings.get("supressInDnd", true) && "dnd" !== external_get_Messages_n_const_value_BdApi_findModuleByProps_getMessage_getMessages_n_Object_defineProperty_this_Messages_n_value_n_configurable_true_n_n_return_value_n_nget_Channels_n_const_value_BdApi_findModuleByPorps_getChannel_n_Object_defineProperty_this_Channels_n_value_n_configurable_true_n_n_return_value_n_nget_Guilds_n_const_value_BdApi_findModuleByProps_getGuild_n_Object_defineProperty_this_Guilds_n_value_n_configurable_true_n_n_return_value_n_nget_SelectedGuilds_n_const_value_BdApi_findModuleByProps_getGuildId_getLastSelectedGuildId_n_Object_defineProperty_this_SelectedGuilds_n_value_n_configurable_true_n_n_return_value_n_nget_SelectedChannels_n_const_value_BdApi_findModuleByProps_getChannelId_getLastSelectedChannelId_n_Object_defineProperty_this_SelectedChannels_n_value_n_configurable_true_n_n_return_value_n_nget_Info_n_const_value_BdApi_findModuleByProps_getCurrentUser_n_Object_defineProperty_this_Info_n_value_n_configurable_true_n_n_return_value_n_nget_Status_n_const_value_BdApi_findModuleByProps_getStatus_n_Object_defineProperty_this_Status_n_value_n_configurable_true_n_n_return_value_n_nget_Users_n_const_value_BdApi_findModuleByProps_getUser_n_Object_defineProperty_this_Users_n_value_n_configurable_true_n_n_return_value_n_nget_Settings_n_const_value_BdApi_findModuleByProps_afkTimeout_status_n_Object_defineProperty_this_Settings_n_value_n_configurable_true_n_n_return_value_n_namespaceObject.Settings.status) new Notification(user.username + " - " + timestamp.toLocaleString(), {
							icon: user.getAvatarURL(),
							body: message,
							silent: true
						});
					}
					onStop() {
						external_n_inject_n_if_style_element_style_element_remove_n_style_element_document_head_appendChild_Object_assign_document_createElement_style_textContent_plugin_styles_n_n_remove_n_if_style_element_n_style_element_remove_n_style_element_null_n_n_n_default().remove();
						external_PluginApi_namespaceObject.Patcher.unpatchAll();
						for (const [event, callack] of this.subscriptions) external_get_Dispatcher_n_const_value_BdApi_findModuleByProps_dirtyDispatch_subscribe_n_Object_defineProperty_this_Dispatcher_n_value_n_configurable_true_n_n_return_value_n_nget_EmojiUtils_n_const_value_BdApi_findModuleByProps_uploadEmoji_n_Object_defineProperty_this_EmojiUtils_n_value_n_configurable_true_n_n_return_value_n_nget_PermissionUtils_n_const_value_BdApi_findModuleByProps_computePermissions_n_Object_defineProperty_this_PermissionUtils_n_value_n_configurable_true_n_n_return_value_n_namespaceObject.Dispatcher.unsubscribe(event, callack);
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
		var __webpack_exports__ = __webpack_require__(562);
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