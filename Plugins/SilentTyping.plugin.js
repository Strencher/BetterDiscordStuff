//META{"name":"silentTyping"}*//

/*@cc_on
@if (@_jscript)
    // Offer to self-install for clueless users that try to run this directly.
    var shell = WScript.CreateObject("WScript.Shell");
    var fs = new ActiveXObject("Scripting.FileSystemObject");
    var pathPlugins = shell.ExpandEnvironmentStrings("%APPDATA%\\BetterDiscord\\plugins");
    var pathSelf = WScript.ScriptFullName;
    // Put the user at ease by addressing them in the first person
    shell.Popup("It looks like you mistakenly tried to run me directly. (don't do that!)", 0, "I'm a plugin for BetterDiscord", 0x30);
    if (fs.GetParentFolderName(pathSelf) === fs.GetAbsolutePathName(pathPlugins)) {
        shell.Popup("I'm in the correct folder already.\nJust reload Discord with Ctrl+R.", 0, "I'm already installed", 0x40);
    } else if (!fs.FolderExists(pathPlugins)) {
        shell.Popup("I can't find the BetterDiscord plugins folder.\nAre you sure it's even installed?", 0, "Can't install myself", 0x10);
    } else if (shell.Popup("Should I copy myself to BetterDiscord's plugins folder for you?", 0, "Do you need some help?", 0x34) === 6) {
        fs.CopyFile(pathSelf, fs.BuildPath(pathPlugins, fs.GetFileName(pathSelf)), true);
        // Show the user where to put plugins in the future
        shell.Exec("explorer " + pathPlugins);
        shell.Popup("I'm installed!\nJust reload Discord with Ctrl+R.", 0, "Successfully installed", 0x40);
    }
    WScript.Quit();
@else @*/

var silentTyping = function () {};

(function () {
    "use strict";

    silentTyping.prototype.start = function () {
        const module = WebpackModules.findByUniqueProperties(["startTyping"], {cacheOnly: true});
        if (!module) {
            console.error("SilentTyping:", "unable to monkey patch sendTyping method");
            return;
        }
        this._cancel = monkeyPatch(module, "startTyping", {instead: ()=>{}});
    };

    silentTyping.prototype.stop = function () {
        if (this._cancel) {
            this._cancel();
            delete this._cancel;
        }
    };

    silentTyping.prototype.load = function () {};

    silentTyping.prototype.unload = function () {};

    silentTyping.prototype.getName = function () {
        return "Silent Typing";
    };

    silentTyping.prototype.getDescription = function () {
        return "Don't send typing notifications";
    };

    silentTyping.prototype.getVersion = function () {
        return "2.1.3";
    };

    silentTyping.prototype.getAuthor = function () {
        return "noodlebox";
    };

    // If samogot's DiscordInternals lib exists, use it. Otherwise, fall back on bundled code below.
    // See: https://github.com/samogot/betterdiscord-plugins/tree/master/v2/1Lib%20Discord%20Internals
    const DI = window.DiscordInternals;
    const hasLib = !!(DI && DI.versionCompare && DI.versionCompare(DI.version || "", "1.9") >= 0);

    /**
     * Function with no arguments and no return value that may be called to revert changes made by {@link monkeyPatch} method, restoring (unpatching) original method.
     * @callback cancelPatch
     */

    /**
     * This is a shortcut for calling original method using `this` and `arguments` from original call. This function accepts no arguments. This function is defined as `() => data.returnValue = data.originalMethod.apply(data.thisObject, data.methodArguments)`
     * @callback originalMethodCall
     * @return {*} The same value, which is returned from original method, also this value would be written into `data.returnValue`
     */

    /**
     * A callback that modifies method logic. This callback is called on each call of the original method and is provided all data about original call. Any of the data can be modified if necessary, but do so wisely.
     * @callback doPatchCallback
     * @param {PatchData} data Data object with information about current call and original method that you may need in your patching callback.
     * @return {*} Makes sense only when used as `instead` parameter in {@link monkeyPatch}. If something other than `undefined` is returned, the returned value replaces the value of `data.returnValue`. If used as `before` or `after` parameters, return value is ignored.
     */

    /**
     * This function monkey-patches a method on an object. The patching callback may be run before, after or instead of target method.
     * Be careful when monkey-patching. Think not only about original functionality of target method and your changes, but also about developers of other plugins, who may also patch this method before or after you. Try to change target method behaviour as little as possible, and avoid changing method signatures.
     * By default, this function logs to the console whenever a method is patched or unpatched in order to aid debugging by you and other developers, but these messages may be suppressed with the `silent` option.
     * Display name of patched method is changed, so you can see if a function has been patched (and how many times) while debugging or in the stack trace. Also, patched methods have property `__monkeyPatched` set to `true`, in case you want to check something programmatically.
     *
     * @author samogot
     * @param {object} what Object to be patched. You can can also pass class prototypes to patch all class instances. If you are patching prototype of react component you may also need {@link Renderer.rebindMethods}.
     * @param {string} methodName The name of the target message to be patched.
     * @param {object} options Options object. You should provide at least one of `before`, `after` or `instead` parameters. Other parameters are optional.
     * @param {doPatchCallback} options.before Callback that will be called before original target method call. You can modify arguments here, so it will be passed to original method. Can be combined with `after`.
     * @param {doPatchCallback} options.after Callback that will be called after original target method call. You can modify return value here, so it will be passed to external code which calls target method. Can be combined with `before`.
     * @param {doPatchCallback} options.instead Callback that will be called instead of original target method call. You can get access to original method using `originalMethod` parameter if you want to call it, but you do not have to. Can't be combined with `before` and `after`.
     * @param {boolean} [options.once=false] Set to `true` if you want to automatically unpatch method after first call.
     * @param {boolean} [options.silent=false] Set to `true` if you want to suppress log messages about patching and unpatching. Useful to avoid clogging the console in case of frequent conditional patching/unpatching, for example from another monkeyPatch callback.
     * @param {string} [options.displayName] You can provide meaningful name for class/object provided in `what` param for logging purposes. By default, this function will try to determine name automatically.
     * @return {cancelPatch} Function with no arguments and no return value that should be called to cancel (unpatch) this patch. You should save and run it when your plugin is stopped.
     */
    const monkeyPatch = hasLib && DI.monkeyPatch || ((what, methodName, options) => {
        const {before, after, instead, once = false, silent = false} = options;
        const displayName = options.displayName || what.displayName || what.name || what.constructor.displayName || what.constructor.name;
        if (!silent) console.log('patch', methodName, 'of', displayName);
        const origMethod = what[methodName];
        const cancel = () => {
            if (!silent) console.log('unpatch', methodName, 'of', displayName);
            what[methodName] = origMethod;
        };
        what[methodName] = function() {
            /**
             * @interface
             * @name PatchData
             * @property {object} thisObject Original `this` value in current call of patched method.
             * @property {Arguments} methodArguments Original `arguments` object in current call of patched method. Please, never change function signatures, as it may cause a lot of problems in future.
             * @property {cancelPatch} cancelPatch Function with no arguments and no return value that may be called to reverse patching of current method. Calling this function prevents running of this callback on further original method calls.
             * @property {function} originalMethod Reference to the original method that is patched. You can use it if you need some special usage. You should explicitly provide a value for `this` and any method arguments when you call this function.
             * @property {originalMethodCall} callOriginalMethod This is a shortcut for calling original method using `this` and `arguments` from original call.
             * @property {*} returnValue This is a value returned from original function call. This property is available only in `after` callback or in `instead` callback after calling `callOriginalMethod` function.
             */
            const data = {
                thisObject: this,
                methodArguments: arguments,
                cancelPatch: cancel,
                originalMethod: origMethod,
                callOriginalMethod: () => data.returnValue = data.originalMethod.apply(data.thisObject, data.methodArguments)
            };
            if (instead) {
                const tempRet = instead(data);
                if (tempRet !== undefined)
                    data.returnValue = tempRet;
            }
            else {
                if (before) before(data);
                data.callOriginalMethod();
                if (after) after(data);
            }
            if (once) cancel();
            return data.returnValue;
        };
        what[methodName].__monkeyPatched = true;
        what[methodName].displayName = 'patched ' + (what[methodName].displayName || methodName);
        return cancel;
    });

    /**
     * @author samogot
     */
    const WebpackModules = hasLib && DI.WebpackModules || (() => {

        const req = typeof(webpackJsonp) == "function" ? webpackJsonp([], {
                '__extra_id__': (module, exports, req) => exports.default = req
        }, ['__extra_id__']).default : webpackJsonp.push([[], {
                '__extra_id__': (module, exports, req) => module.exports = req
        }, [['__extra_id__']]]);
        delete req.m['__extra_id__'];
        delete req.c['__extra_id__'];

        /**
         * Predicate for searching module
         * @callback modulePredicate
         * @param {*} module Module to test
         * @return {boolean} Returns `true` if `module` matches predicate.
         */

        /**
         * Look through all modules of internal Discord's Webpack and return first one that matches filter predicate.
         * At first this function will look through already loaded modules cache. If no loaded modules match, then this function tries to load all modules and match for them. Loading any module may have unexpected side effects, like changing current locale of moment.js, so in that case there will be a warning the console. If no module matches, this function returns `null`. You should always try to provide a predicate that will match something, but your code should be ready to receive `null` in case of changes in Discord's codebase.
         * If module is ES6 module and has default property, consider default first; otherwise, consider the full module object.
         * @param {modulePredicate} filter Predicate to match module
         * @param {object} [options] Options object.
         * @param {boolean} [options.cacheOnly=false] Set to `true` if you want to search only the cache for modules.
         * @return {*} First module that matches `filter` or `null` if none match.
         */
        const find = (filter, options = {}) => {
            const {cacheOnly = false} = options;
            for (let i in req.c) {
                if (req.c.hasOwnProperty(i)) {
                    let m = req.c[i].exports;
                    if (m && m.__esModule && m.default && filter(m.default))
                        return m.default;
                    if (m && filter(m))
                        return m;
                }
            }
            if (cacheOnly) {
                console.warn('Cannot find loaded module in cache');
                return null;
            }
            console.warn('Cannot find loaded module in cache. Loading all modules may have unexpected side effects');
            for (let i = 0; i < req.m.length; ++i) {
                let m = req(i);
                if (m && m.__esModule && m.default && filter(m.default))
                    return m.default;
                if (m && filter(m))
                    return m;
            }
            console.warn('Cannot find module');
            return null;
        };

        /**
         * Look through all modules of internal Discord's Webpack and return first object that has all of following properties. You should be ready that in any moment, after Discord update, this function may start returning `null` (if no such object exists anymore) or even some different object with the same properties. So you should provide all property names that you use, and often even some extra properties to make sure you'll get exactly what you want.
         * @see Read {@link find} documentation for more details how search works
         * @param {string[]} propNames Array of property names to look for
         * @param {object} [options] Options object to pass to {@link find}.
         * @return {object} First module that matches `propNames` or `null` if none match.
         */
        const findByUniqueProperties = (propNames, options) => find(module => propNames.every(prop => module[prop] !== undefined), options);

        /**
         * Look through all modules of internal Discord's Webpack and return first object that has `displayName` property with following value. This is useful for searching for React components by name. Take into account that not all components are exported as modules. Also, there might be several components with the same name.
         * @see Use {@link ReactComponents} as another way to get react components
         * @see Read {@link find} documentation for more details how search works
         * @param {string} displayName Display name property value to look for
         * @param {object} [options] Options object to pass to {@link find}.
         * @return {object} First module that matches `displayName` or `null` if none match.
         */
        const findByDisplayName = (displayName, options) => find(module => module.displayName === displayName, options);

        return {find, findByUniqueProperties, findByDisplayName};

    })();
})();

/*@end @*/
