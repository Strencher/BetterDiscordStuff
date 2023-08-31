/**
 * @name ShutUpClyde
 * @version 1.0.1
 * @author Strencher
 * @description Prevents Clyde from disturbing you.
 * @source https://github.com/Strencher/BetterDiscordStuff/ShutUpClyde/ShutUpClyde.plugin.js
 * @donate https://paypal.me/RealStrencher
 */

const {Patcher, Webpack} = new BdApi("ShutUpClyde");

module.exports = () => ({
    start() {
        const MessageActions = Webpack.getByKeys("sendBotMessage");
        
        Patcher.instead(MessageActions, "sendBotMessage", () => {});
        Patcher.instead(MessageActions, "sendClydeError", () => {});
    },

    stop() {
        Patcher.unpatchAll();
    }
});
