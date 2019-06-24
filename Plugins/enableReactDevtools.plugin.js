//META { "name": "enableReactDevtools", "website": "https://inve1951.github.io/BetterDiscordStuff/" } *//

var enableReactDevtools = (function(){
  var listener, path, readdir, _fs, _path, _electron, _remote, _bw;

  class enableReactDevtools {
    getName() { return "Enable React-Devtools" }
    getDescription() { return "Automatically loads the React Devtools for you. Big thanks to Natsulus who helped figure this out!" }
    getAuthor() { return "square" }
    getVersion() { return "1.0.0" }

    start() {
      _bw.webContents.on("devtools-opened", listener);
      if(_bw.webContents.isDevToolsOpened()) listener();
    }

    stop() {
      _bw.webContents.removeListener("devtools-opened", listener);
    }
  }

  _fs = require("fs");
  _path = require("path");
  _electron = require("electron");
  ({remote: _remote} = _electron);

  _bw = _remote.getCurrentWindow();

  readdir = require("util").promisify(_fs.readdir);

  _electron.webFrame.registerURLSchemeAsPrivileged("chrome-extension");

  // Should you have react's devtools installed in a different location, you can
  // override the full path in an `enableReactDevtools.plugin.json` file as `json.path`.
  path = BdApi.getData("enableReactDevtools", "path") || function(){
    switch(process.platform) {
      case 'win32':
        return _path.resolve(process.env.LOCALAPPDATA, "Google/Chrome/User Data");
      case 'linux':
        return _path.resolve(process.env.HOME, ".config/google-chrome");
      case 'darwin':
        return _path.resolve(process.env.HOME, "Library/Application Support/Google/Chrome");
    }
  }() + "/Default/Extensions/fmkadmapgofadopljbjfkapdkoienihi/";

  listener = async function() {
    _remote.BrowserWindow.removeDevToolsExtension("React Developer Tools");
    var version, bOk = true;
    try {
      // Since chrome does the updating, a new version might have been installed and the previous one might no longer be present.
      [version] = (await readdir(path)).slice(-1);
    } catch(err) {
      if("ENOENT" !== err.code) throw err;
      bOk = false;
    }
    if( bOk && _remote.BrowserWindow.addDevToolsExtension(_path.join(path, version)) )
      console.log("Successfully installed react devtools.");
    else
      console.error("Couldn't find react devtools in chrome extensions!");
  }

  return enableReactDevtools;
})();
