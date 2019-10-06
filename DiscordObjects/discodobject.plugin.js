//META{"name":"discordObjects"}*//
class discordObjects {
    getName() { return "Discord Objects"; }
    getDescription() { return "Gives you Discord Object functions, for example: Bot, Staff and others. (local)"; }
    getVersion() { return "0.0.2"; }
    getAuthor() { return "Strencher"; }
    
    load() {}
    start() {
        ZLibrary.DiscordAPI.currentUser.discordObject.hasFlag = () => true
        ZLibrary.DiscordAPI.currentUser.discordObject.isStaff = () => true
        ZLibrary.DiscordAPI.currentUser.discordObject.bot = () => true 
        BdApi.showToast("Please Restart Discord to apply changes.", {type: "info"});
    }
    stop() { 
        ZLibrary.DiscordAPI.currentUser.discordObject.hasFlag = () => false
        ZLibrary.DiscordAPI.currentUser.discordObject.isStaff = () => false
        ZLibrary.DiscordAPI.currentUser.discordObject.bot = () => false
        BdApi.showToast("Please Restart Discord to clear you Settings.", {type: "info"});
    }
   
}
