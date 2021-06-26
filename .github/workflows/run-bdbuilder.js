#!/usr/bin/env node

const _path = require("path");
const _cp = require("child_process");
const _fs = require("fs");

const changedFiles = process.argv.slice(2);
const changedPlugins = [...new Set(changedFiles.map(filename => filename.split(_path.sep)[0]))].filter(pluginName => "." !== pluginName[0]);

// Needed while bdbuilder is a submodule; obsolete after npm release
if (0 < changedPlugins.length) {
  _cp.execSync("npm i", {
    cwd: "bdbuilder",
    stdio: ["ignore", "inherit", "inherit"]
  });
}

for (let i = 0; i < changedPlugins.length; i++) {
  buildPlugin(changedPlugins[i]);
}

_fs.rmSync(_path.resolve(process.cwd(), "bdbuilder/node_modules"), { force: true, recursive: true });


function buildPlugin(pluginName) {
  const pluginSrcDir = _path.resolve(pluginName, "src");
  _cp.execSync("npm i", {
    cwd: pluginSrcDir,
    stdio: ["ignore", "inherit", "inherit"]
  });
  _cp.execSync(`node ./bdbuilder --plugin="${pluginName}" --build`, {
    cwd: ".",
    stdio: ["ignore", "inherit", "inherit"]
  });
  _fs.rmSync(_path.resolve(pluginSrcDir, "node_modules"), { force: true, recursive: true });
}
