//META { "name": "restartNoMore" } *//
var restartNoMore;

restartNoMore = function () {
  /*
  cb = (e) ->
    window.removeEventListener "error", cb
    if e not instanceof ErrorEvent
      c arguments...
    else
      r message: e.error.message, stack: e.error.stack
    return
  window.addEventListener "error", cb
  bw.webContents.executeJavaScript js, false, cb
  return
  */
  var _crypto, _electron, _path, _util, _vm, ap, bw, cbFunc2PromiseFunc, createWebview, error, execJs, execJsW, fs, getDisplayName, getMd5, getSettings, init, loadFile, log, np, onFileChanged, pPlugins, pThemes, parseHeader, replace, settings, si, state, ts, unloadFile, wPlugins, wThemes, warn, wrapJs;

  class restartNoMore {
    getName() {
      return "Restart No More";
    }

    getDescription() {
      return "Live-updates your themes and plugins. Especially useful during development.";
    }

    getVersion() {
      return "0.1.5";
    }

    getAuthor() {
      return "square";
    }

    constructor() {
      var base;
      bw = _electron.remote.getCurrentWindow();
      base = function () {
        switch (process.platform) {
          case "win32":
            return _path.resolve(process.env.appdata, "BetterDiscord");
          case "darwin":
            return _path.resolve(process.env.HOME, "Library/Preferences/BetterDiscord");
          default:
            if (process.env.XDG_CONFIG_HOME) {
              return _path.resolve(process.env.XDG_CONFIG_HOME, "BetterDiscord");
            } else {
              return _path.resolve(process.env.HOME, ".config/BetterDiscord");
            }
        }
      }();
      pPlugins = _path.join(base, "plugins");
      pThemes = _path.join(base, "themes");
    }

    async start() {
      var e, p, t;
      state = {
        inProcess: {},
        headerCache: {},
        md5Cache: {},
        fileCache: {}
      };
      try {
        p = fs.readdir(pPlugins);
        t = fs.readdir(pThemes);
        await ap((await ap(async function () {
          var f, i, len, ref, results;
          ref = await p;
          results = [];
          for (i = 0, len = ref.length; i < len; i++) {
            f = ref[i];
            results.push(init(f, true));
          }
          return results;
        }(), async function () {
          var f, i, len, ref, results;
          ref = await t;
          results = [];
          for (i = 0, len = ref.length; i < len; i++) {
            f = ref[i];
            results.push(init(f, false));
          }
          return results;
        }())));
      } catch (error1) {
        e = error1;
        error(e);
        if (settings.devMode) {
          return;
        }
      }
      try {
        wPlugins = fs.watch(pPlugins, {
          persistent: false
        }, onFileChanged(true));
      } catch (error1) {
        e = error1;
        error(e);
      }
      try {
        wThemes = fs.watch(pThemes, {
          persistent: false
        }, onFileChanged(false));
      } catch (error1) {
        e = error1;
        error(e);
      }
    }

    stop() {
      if (wPlugins != null) {
        wPlugins.close();
      }
      if (wThemes != null) {
        wThemes.close();
      }
    }

    load() {
      getSettings();
    }

    getSettingsPanel() {
      return `<div id="settings_RNM">\n<label>\n<input name="devMode" type="checkbox" ${settings.devMode ? "checked" : ""}\n  onchange="restartNoMore.updateSettings()"/>\nDeveloper Mode\n</label>\n</div>`;
    }

    static updateSettings() {
      var checked, i, len, name, ref, type, value;
      ref = document.querySelectorAll("#settings_RNM input");
      for (i = 0, len = ref.length; i < len; i++) {
        ({ name, type, value, checked } = ref[i]);
        if (type === "checkbox") {
          settings[name] = checked;
        }
      }
      bdPluginStorage.set("restartNoMore", "settings", settings);
    }

  };

  _path = require("path");

  _crypto = require("crypto");

  _util = require("util");

  _electron = require("electron");

  _vm = require("vm");

  np = function () {
    return new Promise(...arguments);
  };

  ap = async function () {
    var i, len, p, results;
    results = [];
    for (i = 0, len = arguments.length; i < len; i++) {
      p = arguments[i];
      results.push((await p));
    }
    return results;
  };

  ts = function (f) {
    return f.toString();
  };

  wrapJs = function (js) {
    return `(${js}\n)()`;
  };

  replace = function (o, s) {
    var k, v;
    for (k in o) {
      v = o[k];
      //s = s.replace ///#{k}///g, v for k, v of o
      s = s.split(k).join(v);
    }
    return s;
  };

  si = function () {
    return np(function (c) {
      setImmediate(function () {
        c();
      });
    });
  };

  cbFunc2PromiseFunc = function (f) {
    return function (...args) {
      return np(function (c, r) {
        f(...args, function (e, result) {
          if (e != null) {
            return r(e);
          }
          c(result);
        });
      });
    };
  };

  fs = {};

  (function () {
    var _fs, f, i, len, ref;
    _fs = require("fs");
    ref = ["readdir", "lstat", "readFile", "writeFile"];
    for (i = 0, len = ref.length; i < len; i++) {
      f = ref[i];
      fs[f] = cbFunc2PromiseFunc(_fs[f]);
    }
    fs.watch = _fs.watch;
  })();

  bw = null;

  state = null;

  settings = null;

  pPlugins = pThemes = null;

  wPlugins = wThemes = null;

  getSettings = function () {
    var k, ref, ref1, v;
    settings = (ref = bdPluginStorage.get("restartNoMore", "settings")) != null ? ref : {};
    ref1 = {
      devMode: false
    };
    for (k in ref1) {
      v = ref1[k];
      if (settings[k] == null) {
        settings[k] = v;
      }
    }
  };

  init = async function (filename, isPlugin) {
    var e, fileContent, header, shortname, stats;
    filename = _path.resolve(isPlugin ? pPlugins : pThemes, filename);
    shortname = _path.basename(filename);
    if (!(isPlugin && filename.endsWith(".plugin.js") || !isPlugin && filename.endsWith(".theme.css"))) {
      if (isPlugin && filename.endsWith(".config.json") || "desktop.ini" === shortname) {
        return;
      }
      return warn(`WTF is that doing in there?\n${filename}`);
    }
    state.inProcess[filename] = true;
    try {
      stats = await fs.lstat(filename);
    } catch (error1) {
      e = error1;
      state.inProcess[filename] = false;
      return error(e, shortname);
    }
    if (!stats.isFile()) {
      state.inProcess[filename] = false;
      return;
    }
    try {
      fileContent = await fs.readFile(filename, "utf8");
    } catch (error1) {
      e = error1;
      state.inProcess[filename] = false;
      return error(e, shortname);
    }
    if (isPlugin) {
      state.fileCache[filename] = fileContent;
    }
    try {
      header = parseHeader(fileContent, isPlugin);
    } catch (error1) {
      e = error1;
      state.inProcess[filename] = false;
      return error(e, shortname);
    }
    state.headerCache[filename] = header;
    state.md5Cache[header.name] = getMd5(fileContent);
    state.inProcess[filename] = false;
  };

  onFileChanged = function (isPlugin) {
    return async function (type, filename) {
      var e, fileContent, header, headerOld, k, md5, ref, ref1, shortname, stats, v;
      filename = _path.resolve(isPlugin ? pPlugins : pThemes, filename);
      if (state.inProcess[filename] || isPlugin && filename.endsWith(".config.json")) {
        return;
      }
      shortname = _path.basename(filename);
      if (!(isPlugin && filename.endsWith(".plugin.js") || !isPlugin && filename.endsWith(".theme.css"))) {
        if (isPlugin && filename.endsWith("config.json") || "desktop.ini" === shortname || settings.devMode && isPlugin && filename.endsWith(").js" || !isPlugin && filename.endsWith(").css"))) {
          return;
        }
        return warn(`WTF is that doing in there?\n${filename}`);
      }
      state.inProcess[filename] = true;
      try {
        stats = await fs.lstat(filename);
      } catch (error1) {
        e = error1;
        if ("ENOENT" === e.code) {
          try {
            await unloadFile(filename, shortname, isPlugin);
            log(`Unloaded ${shortname}!`);
          } catch (error1) {
            e = error1;
            error(e, shortname);
          }
          state.inProcess[filename] = false;
          return;
        }
        state.inProcess[filename] = false;
        return error(e, shortname);
      }
      if (!stats.isFile()) {
        state.inProcess[filename] = false;
        return;
      }
      await si();
      try {
        fileContent = await fs.readFile(filename, "utf8");
      } catch (error1) {
        e = error1;
        state.inProcess[filename] = false;
        return error(e, shortname);
      }
      try {
        header = parseHeader(fileContent, isPlugin);
      } catch (error1) {
        e = error1;
        state.inProcess[filename] = false;
        return error(e, shortname);
      }
      if (isPlugin) {
        if (header.displayName == null) {
          header.displayName = (ref = header.pname) != null ? ref : await getDisplayName(header.name, fileContent, false);
        }
        if (header.displayName instanceof Array) {
          state.inProcess[filename] = false;
          return error(header.displayName, shortname);
        }
      }
      md5 = getMd5(fileContent);
      headerOld = state.headerCache[filename];
      if (headerOld == null && state.md5Cache[header.name] != null) {
        ref1 = state.headerCache;
        for (k in ref1) {
          v = ref1[k];
          if (!(v.name === header.name)) {
            continue;
          }
          state.inProcess[filename] = false;
          return warn(`Skipped loading ${shortname}! ${v.name} belongs to ${_path.basename(k)}!`);
        }
        state.inProcess[filename] = false;
        return error(new Error("Unhandled code path!"), shortname);
      }
      if (headerOld != null) {
        if (headerOld.name != null && state.md5Cache[headerOld.name] === md5) {
          state.inProcess[filename] = false;
          return log(`Skipped unchanged file ${shortname}!`);
        }
        try {
          await unloadFile(filename, shortname, isPlugin);
          log(`Unloaded ${shortname}!`);
          state.inProcess[filename] = false;
        } catch (error1) {
          e = error1;
          state.inProcess[filename] = false;
          return error(e, shortname);
        }
      }
      try {
        await loadFile(filename, header, fileContent, isPlugin);
        state.inProcess[filename] = false;
      } catch (error1) {
        e = error1;
        state.inProcess[filename] = false;
        return error(e, shortname);
      }
      state.headerCache[filename] = header;
      state.md5Cache[header.name] = md5;
      state.inProcess[filename] = false;
      log(`Loaded ${shortname}!`);
    };
  };

  loadFile = async function (filename, header, fileContent, isPlugin) {
    var displayName, e, n, plugin;
    // throws
    if (isPlugin) {
      new _vm.Script(fileContent, {
        filename,
        displayErrors: true
      });
      await execJs(wrapJs(replace({
        name: header.name,
        fileContent
      }, ts(function () {
        fileContent;
        global.name = name;
      }))));
      try {
        displayName = await execJs(wrapJs(replace({
          name: header.name
        }, ts(function () {
          var plugin, result;
          plugin = new global.name();
          result = plugin.getName();
          if (result in bdplugins) {
            throw new Error(`\`displayName\` mismatch! Actual: \`${result}\``);
          }
          bdplugins[result] = {
            plugin,
            enabled: false
          };
          return result;
        }))));
      } catch (error1) {
        e = error1;
        if (e.message.startsWith("`displayName`")) {
          e.message += `, detected: \`${header.displayName}\`\n`;
          e.message += "Plugin is loaded twice now. Reload reccommended!";
        }
        throw e;
      }
      if (displayName !== header.displayName) {
        if (settings.devMode) {
          warn(`\`displayName\` mismatch! Actual: \`${displayName}\`, detected: \`${header.displayName}\``);
        }
        header.displayName = displayName;
      }
      ({ plugin } = bdplugins[displayName]);
      if (typeof plugin.load === "function") {
        plugin.load();
      }
      if (displayName in pluginCookie) {
        if (pluginCookie[displayName]) {
          plugin.start();
        }
        return;
      }
      pluginCookie[displayName] = false;
      pluginModule.savePluginData();
      return;
    }
    // is theme
    fileContent = fileContent.slice(1 + fileContent.indexOf("\n"));
    bdthemes[header.name] = Object.assign({}, header, {
      enabled: false,
      css: escape(fileContent)
    });
    if (header.name in themeCookie) {
      if (themeCookie[header.name]) {
        if (!/^\w(?:\w|-)*$/.test(header.name)) {
          warn(`META name must not contain spaces or other crap! \`${header.name}\``);
        }
        n = document.createElement("style");
        n.id = header.name;
        n.innerHTML = fileContent;
        document.head.appendChild(n);
      }
      return;
    }
    themeCookie[header.name] = false;
    themeModule.saveThemeData();
  };

  unloadFile = async function (filename, shortname, isPlugin) {
    var e, header, plugin, ref, theme;
    // throws # dev mode
    header = state.headerCache[filename];
    if (isPlugin) {
      if (header.displayName == null) {
        header.displayName = await getDisplayName(header.name, state.fileCache[filename], true);
      }
      if (header.displayName instanceof Array) {
        throw header.displayName;
      }
      try {
        plugin = bdplugins[header.displayName].plugin;
      } catch (error1) {
        e = error1;
        throw new Error(`Unable to find a loaded plugin with name \`${header.displayName}\`!`);
      }
      if (pluginCookie[header.displayName]) {
        try {
          plugin.stop();
        } catch (error1) {
          e = error1;
          if (settings.devMode) {
            error(e, shortname);
            warn("Reload reccommended!");
          } else {
            throw e;
          }
        }
        try {
          if (typeof plugin.unload === "function") {
            plugin.unload();
          }
        } catch (error1) {
          e = error1;
          warn("The `unload` function is optional. BD does not use it, RNM does.");
          if (settings.devMode) {
            error(e, shortname);
            warn("Reload reccommended!");
          } else {
            throw e;
          }
        }
      }
      delete global[header.name];
      delete bdplugins[header.displayName];
      delete state.headerCache[filename];
      delete state.fileCache[filename];
      delete state.md5Cache[header.name];
      return;
    }
    // is theme
    theme = bdthemes[header.name];
    if (themeCookie[header.name]) {
      if ((ref = document.head.querySelector(`style[id='${header.name}']`)) != null) {
        ref.remove();
      }
    }
    delete bdthemes[header.name];
    delete state.headerCache[filename];
    delete state.md5Cache[header.name];
  };

  parseHeader = function (fileContent, isPlugin) {
    var header, i, len, missing, ref, x;
    // throws # sync
    header = fileContent.slice(0, fileContent.indexOf("\n"));
    header = header.slice(6 + header.lastIndexOf("/\/ME" + "TA"), header.lastIndexOf("*/\/"));
    header = JSON.parse(header);
    missing = [];
    ref = isPlugin ? ["name"] : ["name", "author", "description", "version"];
    for (i = 0, len = ref.length; i < len; i++) {
      x = ref[i];
      if (!(x in header)) {
        missing.push(x);
      }
    }
    if (missing.length) {
      throw new Error(`Invalid META, missing: ${missing.join(", ")}!`);
    }
    return header;
  };

  getDisplayName = async function (name, fileContent, mustMatchLoadedPlugin) {
    var displayName, dontDoThisForPluginsLoadedByRNM, e, errors, fallback, fromInstance, fromPrototype, m, plugin, ref, sandbox, unsafeButFastest, webview;
    if (fileContent == null) {
      // returns string or array of errors
      error(new Error("fileContent is undefined"));
    }
    errors = [];
    if (mustMatchLoadedPlugin) {
      try {
        dontDoThisForPluginsLoadedByRNM = await execJs(wrapJs(replace({ name }, ts(function () {
          return name.prototype.getName();
        }))));
      } catch (error1) {
        e = error1;
        errors.push(e);
      }
      if (dontDoThisForPluginsLoadedByRNM != null && dontDoThisForPluginsLoadedByRNM in bdplugins) {
        return dontDoThisForPluginsLoadedByRNM;
      }
    }
    unsafeButFastest = (ref = m = fileContent.match(RegExp(`^[\\s\\S]*?\\n[\\s\\S]*?${name}[\\s\\S]*?getName[\\s\\S]+?('|")((?:\\\\\\1|[^\\1])*?)\\1`))) != null ? ref[2].replace("\\" + m[1], m[1]) : void 0; // skip first line
    // class deklaration
    // find getName function
    // + in case of name["getName"] = ...
    // find and store opening quotation marker in \1
    // store display name in \2
    // which can hold anything besides unescaped \1
    // and is closed with \1
    if (unsafeButFastest != null && unsafeButFastest in bdplugins || !mustMatchLoadedPlugin && unsafeButFastest != null) {
      return unsafeButFastest;
    }
    warn("Couldn't get plugin name from regex, booting up virtual machine!");
    try {
      plugin = new _vm.Script(fileContent, {
        filename,
        displayErrors: true
      });
    } catch (error1) {
      e = error1;
      errors.push(e);
    }
    sandbox = _vm.createContext();
    try {
      plugin.runInContext(sandbox);
    } catch (error1) {
      e = error1;
      errors.push(e);
    }
    try {
      fromPrototype = new _vm.Script(wrapJs(replace({ name }, ts(function () {
        return name.prototype.getName();
      })))).runInContext(sandbox, {
        displayErrors: true
      });
    } catch (error1) {
      e = error1;
      errors.push(e);
    }
    if (fromPrototype != null && fromPrototype in bdplugins) {
      return fromPrototype;
    }
    try {
      fromInstance = new _vm.Script(wrapJs(replace({ name }, ts(function () {
        var p;
        p = new name();
        try {
          p.load();
        } catch (error1) {}
        return p.getName();
      })))).runInContext(sandbox, {
        displayErrors: true
      });
    } catch (error1) {
      e = error1;
      errors.push(e);
    }
    if (fromInstance != null && fromInstance in bdplugins || !mustMatchLoadedPlugin && fromInstance != null) {
      return fromInstance;
    }
    warn("Couldn't get plugin name from VM, creating webview!!!!!");
    webview = await createWebview();
    try {
      await execJsW(webview, fileContent);
    } catch (error1) {
      e = error1;
      errors.push(e);
    }
    try {
      fallback = await execJsW(webview, wrapJs(replace({ name }, ts(function () {
        return name.prototype.getName();
      }))));
    } catch (error1) {
      e = error1;
      errors.push(e);
    }
    if (fallback != null && fallback in bdplugins) {
      webview.remove();
      return fallback;
    }
    try {
      displayName = await execJsW(webview, wrapJs(replace({ name }, ts(function () {
        var p;
        p = new name();
        try {
          p.load();
        } catch (error1) {}
        return p.getName();
      }))));
    } catch (error1) {
      e = error1;
      errors.push(e);
    }
    if (displayName != null && displayName in bdplugins || !mustMatchLoadedPlugin && displayName != null) {
      webview.remove();
      return displayName;
    }
    webview.remove();
    return [...errors, new Error("Unable to determine plugin name!")];
  };

  execJs = function (js) {
    return np(function (c, r) {
      var e, script;
      try {
        //return try c _vm.runInThisContext js, displayErrors: true
        //catch e then r e
        script = new _vm.Script(js, {
          displayErrors: true
        });
        c(script.runInThisContext());
      } catch (error1) {
        e = error1;
        r(e);
      }
    });
  };

  createWebview = function () {
    return np(function (c) {
      var webview;
      webview = document.createElement("webview");
      webview.src = "non-existent.dummy";
      webview.setAttribute("from-restart-no-more", null);
      webview.addEventListener("dom-ready", function () {
        c(webview);
      });
      document.body.appendChild(webview);
    });
  };

  execJsW = function (webview, js) {
    return np(function (c, r) {
      var clearErrorP, errorP;
      clearErrorP = wrapJs(ts(function () {
        window.onerror = void 0;
      }));
      errorP = wrapJs(ts(function () {
        return new Promise(function (c) {
          window.onerror = function (e) {
            window.onerror = void 0;
            c({
              message: e.message,
              stack: e.stack
            });
          };
        });
      }));
      webview.executeJavaScript(errorP, false, function (e) {
        r(e);
      });
      webview.executeJavaScript(js, false, function (result) {
        webview.executeJavaScript(clearErrorP, false, function () {
          c(result);
        });
      });
    });
  };

  getMd5 = function (fileContent) {
    return _crypto.createHash("md5").update(fileContent).digest("hex");
  };

  log = function (text) {
    console.log(`%cRNM: %c${text}`, "color:#7e0e46;font-size:1.3em;font-weight:bold", "color:#005900;font-size:1.3em");
  };

  warn = function (text) {
    console.log(`%cRNM: %c${text}`, "color:#7e0e46;font-size:1.3em;font-weight:bold", "color:#c6a924;font-size:1.3em");
  };

  error = function (e, filename) {
    var _e, i, len;
    if (!(e instanceof Array)) {
      _e = [e];
    }
    for (i = 0, len = _e.length; i < len; i++) {
      e = _e[i];
      if (filename != null) {
        console.groupCollapsed(`%cRNM: %c${filename} %cError: ${e.message}`, "color:#7e0e46;font-size:1.3em;font-weight:bold", "color:#005900;font-size:1.3em", "color:#671413;font-size:1.3em");
      } else {
        console.groupCollapsed(`%cRNM: %cError: ${e.message}`, "color:#7e0e46;font-size:1.3em;font-weight:bold", "color:#671413;font-size:1.3em");
      }
      console.trace(e.stack);
      console.groupEnd();
    }
  };

  return restartNoMore;
}.call(this);

global.restartNoMore = restartNoMore;