#!/usr/bin/env node

const _path = require("path");
const _cp = require("child_process");

const changedFiles = process.argv.slice(2);
const changedPlugins = [...new Set(changedFiles.map(filename => filename.split(_path.sep)[0]))].filter(pluginName => "." !== pluginName[0]);

for (let i = 0; i < changedPlugins.length; i++) {
  buildPlugin(changedPlugins[i]);
}

function buildPlugin(pluginName) {
  const pluginDir = _path.resolve(process.cwd(), pluginName);
  const pluginSrcDir = _path.resolve(pluginDir, "src");
  _cp.execSync("npm i", {
    cwd: pluginSrcDir,
    stdio: ["ignore", "inherit", "inherit"]
  });
  _cp.execSync(`node ./bdbuilder --plugin="${pluginName}" --build`, {
    cwd: process.cwd(),
    stdio: ["ignore", "inherit", "inherit"]
  });
}
