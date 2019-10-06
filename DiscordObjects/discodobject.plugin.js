//META{"name":"discordObjects"}*//
class discordObjects {
    getName() { return "Discord Objects"; }
    getDescription() { return "Gives you Discord Object functions, for example: Bot, Staff and others. (local)"; }
    getVersion() { return "0.0.2"; }
    getAuthor() { return "Strencher"; }
    
    load() {
        BdApi.showToast("[Discord Objects] was loadet", {type: ""});
    }
    unload() {
        ZLibrary.DiscordAPI.currentUser.discordObject.hasFlag = () => false
        ZLibrary.DiscordAPI.currentUser.discordObject.isStaff = () => false
        ZLibrary.DiscordAPI.currentUser.discordObject.bot = () => false
    }
    start() {
        ZLibrary.DiscordAPI.currentUser.discordObject.hasFlag = () => true
        ZLibrary.DiscordAPI.currentUser.discordObject.isStaff = () => true
        ZLibrary.DiscordAPI.currentUser.discordObject.bot = () => true 
        BdApi.showToast("[Discord Objects] Please Restart Discord to apply changes.", {type: "error"});
    }
    stop() { 
        ZLibrary.DiscordAPI.currentUser.discordObject.hasFlag = () => false
        ZLibrary.DiscordAPI.currentUser.discordObject.isStaff = () => false
        ZLibrary.DiscordAPI.currentUser.discordObject.bot = () => false
        BdApi.showToast("[Discord Objects] Please Restart Discord to clear you Settings.", {type: "error"});
    }
}