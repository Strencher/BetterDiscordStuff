//META{"name":"statusEnabler"}*//


class statusEnabler {
    getName() { return "Status Enabler"; }
    getDescription() { return "Enables the Custom Status tab for you."; }
    getVersion() { return "0.0.1"; }
    getAuthor() { return "Strencher"; }
    
    load() {
        ZLibrary.PluginUpdater.checkForUpdate("Status Enabler", this.getVersion(), "https://strencher.github.io/statusenabler.plugin.js");
    }
    
    unload() {
        BdApi.findModuleByProps('getCurrentUser').getCurrentUser().flags += 0;

    }
    start() {
        BdApi.findModuleByProps('getCurrentUser').getCurrentUser().flags += 1;
        BdApi.showToast("Custom status was successful unlocked for you.", {type: "info"});
    }
    stop() { 
        BdApi.findModuleByProps('getCurrentUser').getCurrentUser().flags += 0;
    }
   
}
