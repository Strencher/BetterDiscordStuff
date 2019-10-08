//META{"name":"discordObjects"}*//
class discordObjects {
    getName() { return "Discord Objects"; }
    getDescription() { return "Gives you Discord Object functions, for example: Bot, Staff and others (local)."; }
    getVersion() { return "0.0.3"; }
    getAuthor() { return "Strencher"; }
    
    load() {
        BdApi.showToast("[Discord Objects] was loadet");
    }
    unload() {
        ZLibrary.DiscordAPI.currentUser.discordObject.hasFlag = () => false;
        ZLibrary.DiscordAPI.currentUser.discordObject.isStaff = () => false;
        ZLibrary.DiscordAPI.currentUser.discordObject.bot = () => false;
        ZLibrary.DiscordAPI.currentUser.discordObject.premiumDiscriminator = () => false;

    }
    start() {
        ZLibrary.DiscordAPI.currentUser.discordObject.hasFlag = () => true;
        ZLibrary.DiscordAPI.currentUser.discordObject.isStaff = () => true;
        ZLibrary.DiscordAPI.currentUser.discordObject.bot = () => true;
        ZLibrary.DiscordAPI.currentUser.discordObject.premiumDiscriminator = () => true;
        BdApi.showToast("[Discord Objects] Please Restart Discord to apply changes.", {type: "error"});
    }
    stop() { 
        ZLibrary.DiscordAPI.currentUser.discordObject.hasFlag = () => false;
        ZLibrary.DiscordAPI.currentUser.discordObject.isStaff = () => false;
        ZLibrary.DiscordAPI.currentUser.discordObject.bot = () => false;
        ZLibrary.DiscordAPI.currentUser.discordObject.premiumDiscriminator = () => false;
        BdApi.showToast("[Discord Objects] Please Restart Discord to clear you Settings.", {type: "error"});
    }
   
}
