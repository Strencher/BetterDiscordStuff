import pkg from "../package.json";

export default class TemplatePlugin {
    getName() {return pkg.name;}
    getAuthor() {return pkg.author;}
    getDescription() { return pkg.description;}
    getVersion() {return pkg.version;}
    load() {
        BdApi.showConfirmationModal("Library plugin is needed", 
            [`The library plugin needed for ${pkg.name} is missing. Please click Download Now to install it.`], {
                confirmText: "Download",
                cancelText: "Cancel",
                onConfirm: () => {
                    require("request").get("https://rauenzi.github.io/BDPluginLibrary/release/0PluginLibrary.plugin.js", async (error, response, body) => {
                    if (error) return require("electron").shell.openExternal("https://betterdiscord.net/ghdl?url=https://raw.githubusercontent.com/rauenzi/BDPluginLibrary/master/release/0PluginLibrary.plugin.js");
                        await new Promise(r => require("fs").writeFile(require("path").join(BdApi.Plugins.folder, "0PluginLibrary.plugin.js"), body, r));
                    });
                }
            });
    }
    start() { }
    stop() { }
}