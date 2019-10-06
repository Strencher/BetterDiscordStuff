//META{"name":"discordStaff"}*//

class discordStaff {
	
    getName() { return "Discord Staff"; }
    getDescription() { return "Allows you to use Discord Staff experiments."; }
    getVersion() { return "0.0.1"; }
    getAuthor() { return "Strencher"; }
    
    load() {}
    unload() {}

    start() {
        ZLibrary.DiscordAPI.currentUser.discordObject.hasFlag = () => true
    }
    stop() { 
        ZLibrary.DiscordAPI.currentUser.discordObject.hasFlag = () => false
    }

}