#!/usr/bin/env node

const _path = require("path");
const _cp = require("child_process");

const changedFiles = process.argv.slice(2);
const changedPlugins = [...new Set(changedFiles.map(filename => filename.split(_path.sep)[0]))].filter(pluginName => "." !== pluginName[0]);

// Needed while bdbuilder is a submodule; obsolete after npm release
if (0 < changedPlugins.length) {
  _cp.execSync("npm i", {
    cwd: _path.resolve(process.cwd(), "bdbuilder"),
    stdio: ["ignore", "inherit", "inherit"],
  });
}

for (let i = 0; i < changedPlugins.length; i++) {
  buildPlugin(changedPlugins[i]);
}

function buildPlugin(pluginName) {
  const pluginSrcDir = _path.resolve(process.cwd(), pluginName, "src");
  _cp.execSync("npm i", {
    cwd: pluginSrcDir,
    stdio: ["ignore", "inherit", "inherit"],
  });
  _cp.execSync(`node ./bdbuilder --plugin="${pluginName}" --build`, {
    cwd: process.cwd(),
    stdio: ["ignore", "inherit", "inherit"],
  });
}
