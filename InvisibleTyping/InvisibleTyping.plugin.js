/**
 * @name InvisibleTyping
 * @author Strencher
 * @version 0.0.1
 * @description Enhanced version of silent typing.
 * @source https://github.com/Strencher/BetterDiscordStuff/blob/master/InvisibleTyping/InvisibleTyping.plugin.js
 * @updateUrl https://raw.githubusercontent.com/Strencher/BetterDiscordStuff/master/InvisibleTyping/InvisibleTyping.plugin.js
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
		"name": "InvisibleTyping",
		"authors": [{
			"name": "Strencher",
			"discord_id": "415849376598982656",
			"github_username": "Strencher",
			"twitter_username": "Strencher3"
		}],
		"version": "0.0.1",
		"description": "Enhanced version of silent typing.",
		"github": "https://github.com/Strencher/BetterDiscordStuff/blob/master/InvisibleTyping/InvisibleTyping.plugin.js",
		"github_raw": "https://raw.githubusercontent.com/Strencher/BetterDiscordStuff/master/InvisibleTyping/InvisibleTyping.plugin.js"
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
		"title": "Yeah",
		"type": "added",
		"items": [
			"The plugin exist"
		]
	}]
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
			605: (module, __webpack_exports__, __webpack_require__) => {
				__webpack_require__.d(__webpack_exports__, {
					Z: () => __WEBPACK_DEFAULT_EXPORT__
				});
				var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(645);
				var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = __webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
				var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()((function(i) {
					return i[1];
				}));
				___CSS_LOADER_EXPORT___.push([module.id, ".InvisibleTyping-typingButton-invisibleTypingButton svg{color:var(--interactive-normal);overflow:visible}.InvisibleTyping-typingButton-invisibleTypingButton .InvisibleTyping-typingButton-disabledStrokeThrough{position:absolute;transform:translateX(-15px) translateY(530px) rotate(-45deg)}.InvisibleTyping-typingButton-invisibleTypingButton{margin-top:3px;background:transparent}.InvisibleTyping-typingButton-invisibleTypingButton:hover:not(.InvisibleTyping-typingButton-disabled) svg{color:var(--interactive-hover)}.InvisibleTyping-typingButton-invisibleTypingTooltip{display:inline-flex}", ""]);
				___CSS_LOADER_EXPORT___.locals = {
					invisibleTypingButton: "InvisibleTyping-typingButton-invisibleTypingButton",
					disabledStrokeThrough: "InvisibleTyping-typingButton-disabledStrokeThrough",
					disabled: "InvisibleTyping-typingButton-disabled",
					invisibleTypingTooltip: "InvisibleTyping-typingButton-invisibleTypingTooltip"
				};
				__plugin_styles__ += `\n/* ${module.id} */\n${___CSS_LOADER_EXPORT___}\n`;
				const __WEBPACK_DEFAULT_EXPORT__ = Object.assign(___CSS_LOADER_EXPORT___, ___CSS_LOADER_EXPORT___.locals);
			},
			282: (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
				__webpack_require__.r(__webpack_exports__);
				__webpack_require__.d(__webpack_exports__, {
					default: () => InvisibleTyping
				});
				const external_PluginApi_namespaceObject = PluginApi;
				const external_BasePlugin_namespaceObject = BasePlugin;
				var external_BasePlugin_default = __webpack_require__.n(external_BasePlugin_namespaceObject);
				const package_namespaceObject = JSON.parse('{"um":{"u2":"InvisibleTyping"}}');
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
							external_PluginApi_namespaceObject.Logger.error(`Cannot run callback for event "${event}": "` + callback.toString().slice(0, 10) + '..."', "\n", error);
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
				var external_BdApi_React_ = __webpack_require__(698);
				var external_BdApi_React_default = __webpack_require__.n(external_BdApi_React_);
				class Utilities extends external_PluginApi_namespaceObject.Utilities {
					static get joinClassNames() {
						return this.className;
					}
					static capitalize(string) {
						return string[0].toUpperCase() + string.slice(1);
					}
					static useForceUpdate() {
						return (0, external_BdApi_React_.useReducer)((n => n + 1), 0)[1];
					}
				}
				function settings_defineProperty(obj, key, value) {
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
					static removeFromArray(key, item, defaultValue = []) {
						const setting = this.get(key, defaultValue);
						while (setting.indexOf(item) > -1) setting.splice(setting.indexOf(item), 1);
						this.set(key, setting);
						return true;
					}
					static appendToArray(key, item, defaultValue = []) {
						const setting = this.get(key, defaultValue);
						setting.push(item);
						this.set(key, setting);
						return true;
					}
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
				settings_defineProperty(Settings, "updater", new Eventhandler);
				settings_defineProperty(Settings, "settings", external_PluginApi_namespaceObject.PluginUtilities.loadSettings(package_namespaceObject.um.u2, {}));
				settings_defineProperty(Settings, "get", ((key, defaultValue) => Settings.settings[key] ?? defaultValue));
				settings_defineProperty(Settings, "set", ((key, value) => {
					Settings.settings[key] = value;
					external_PluginApi_namespaceObject.PluginUtilities.saveSettings(package_namespaceObject.um.u2, Settings.settings);
					Settings.updater.reply("update");
				}));
				var typingButton = __webpack_require__(605);
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
				function Keyboard({
					disabled,
					...props
				}) {
					return React.createElement("svg", _extends({}, props, {
						width: "25",
						height: "25",
						viewBox: "0 0 576 512"
					}), React.createElement("path", {
						fill: "currentColor",
						d: "M528 448H48c-26.51 0-48-21.49-48-48V112c0-26.51 21.49-48 48-48h480c26.51 0 48 21.49 48 48v288c0 26.51-21.49 48-48 48zM128 180v-40c0-6.627-5.373-12-12-12H76c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12zm96 0v-40c0-6.627-5.373-12-12-12h-40c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12zm96 0v-40c0-6.627-5.373-12-12-12h-40c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12zm96 0v-40c0-6.627-5.373-12-12-12h-40c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12zm96 0v-40c0-6.627-5.373-12-12-12h-40c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12zm-336 96v-40c0-6.627-5.373-12-12-12h-40c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12zm96 0v-40c0-6.627-5.373-12-12-12h-40c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12zm96 0v-40c0-6.627-5.373-12-12-12h-40c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12zm96 0v-40c0-6.627-5.373-12-12-12h-40c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12zm-336 96v-40c0-6.627-5.373-12-12-12H76c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12zm288 0v-40c0-6.627-5.373-12-12-12H172c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h232c6.627 0 12-5.373 12-12zm96 0v-40c0-6.627-5.373-12-12-12h-40c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12z"
					}), disabled ? React.createElement("rect", {
						className: typingButton.Z.disabledStrokeThrough,
						x: "10",
						y: "10",
						width: "600pt",
						height: "70px",
						fill: "#f04747"
					}) : null);
				}
				var typingbutton_React = __webpack_require__(698);
				const TypingModule = external_PluginApi_namespaceObject.WebpackModules.getByProps("startTyping");
				const {
					TooltipContainer: Tooltip
				} = external_PluginApi_namespaceObject.WebpackModules.getByProps("TooltipContainer");
				function InvisibleTypingButton({
					channel,
					textValue
				}) {
					const [enabled, setEnabled] = (0, external_BdApi_React_.useState)(Settings.get("exclude", []).indexOf(channel.id) > -1);
					const handleClick = (0, external_BdApi_React_.useCallback)((() => {
						if (enabled) {
							Settings.removeFromArray("exclude", channel.id);
							TypingModule.stopTyping(channel.id);
							setEnabled(false);
						} else {
							Settings.appendToArray("exclude", channel.id);
							if (textValue) TypingModule.startTyping(channel.id);
							setEnabled(true);
						}
					}), [enabled]);
					return typingbutton_React.createElement(Tooltip, {
						text: enabled ? "Typing Enabled" : "Typing Disabled",
						position: "top",
						className: typingButton.Z.invisibleTypingTooltip
					}, typingbutton_React.createElement("button", {
						className: Utilities.joinClassNames(typingButton.Z.invisibleTypingButton, {
							enabled,
							disabled: !enabled
						}),
						onClick: handleClick
					}, typingbutton_React.createElement(Keyboard, {
						disabled: !enabled
					})));
				}
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
				var InvisibleTyping_React = __webpack_require__(698);
				class InvisibleTyping extends(external_BasePlugin_default()) {
					onStart() {
						external_n_inject_n_if_style_element_style_element_remove_n_style_element_document_head_appendChild_Object_assign_document_createElement_style_textContent_plugin_styles_n_n_remove_n_if_style_element_n_style_element_remove_n_style_element_null_n_n_n_default().inject();
						Utilities.suppressErrors(this.patchTextAreaButtons.bind(this), "textarea buttons patch")();
						Utilities.suppressErrors(this.patchStartTyping.bind(this), "start typing patch")();
					}
					async patchTextAreaButtons() {
						var _WebpackModules$find;
						const ChannelTextAreaContainer = null === (_WebpackModules$find = external_PluginApi_namespaceObject.WebpackModules.find((m => {
							var _m$type, _m$type$render;
							return "ChannelTextAreaContainer" === (null === m || void 0 === m ? void 0 : null === (_m$type = m.type) || void 0 === _m$type ? void 0 : null === (_m$type$render = _m$type.render) || void 0 === _m$type$render ? void 0 : _m$type$render.displayName);
						}))) || void 0 === _WebpackModules$find ? void 0 : _WebpackModules$find.type;
						external_PluginApi_namespaceObject.Patcher.after(ChannelTextAreaContainer, "render", ((_, [{
							channel,
							textValue
						}], returnValue) => {
							const tree = Utilities.findInReactTree(returnValue, (e => {
								var _e$className;
								return (null === e || void 0 === e ? void 0 : null === (_e$className = e.className) || void 0 === _e$className ? void 0 : _e$className.indexOf("buttons-")) > -1;
							}));
							if (!Array.isArray(null === tree || void 0 === tree ? void 0 : tree.children)) return returnValue;
							tree.children.unshift(InvisibleTyping_React.createElement(InvisibleTypingButton, {
								channel,
								textValue
							}));
						}));
					}
					async patchStartTyping() {
						const TypingModule = external_PluginApi_namespaceObject.WebpackModules.getByProps("startTyping");
						external_PluginApi_namespaceObject.Patcher.instead(TypingModule, "startTyping", ((_, [channelId], originalMethod) => {
							if (~Settings.get("exclude", []).indexOf(channelId)) originalMethod(channelId);
						}));
					}
					onStop() {
						external_PluginApi_namespaceObject.Patcher.unpatchAll();
						external_n_inject_n_if_style_element_style_element_remove_n_style_element_document_head_appendChild_Object_assign_document_createElement_style_textContent_plugin_styles_n_n_remove_n_if_style_element_n_style_element_remove_n_style_element_null_n_n_n_default().remove();
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
		var __webpack_exports__ = __webpack_require__(282);
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