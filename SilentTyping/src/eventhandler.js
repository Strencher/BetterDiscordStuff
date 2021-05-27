import {Logger} from "@zlibrary";

export default class Eventhandler {
    subsriptions = {};

    constructor({events = ["done", "cancel"]} = {}) {
        events.forEach(ev => this.subsriptions[ev] = []);
    }

    on(event, callback) {
        if (!this.subsriptions[event]) this.subsriptions[event] = [];
        this.subsriptions[event].push(callback);
        return this;
    }

    off(event, callback) {
        if (!this.subsriptions[event]) return false;
        const index = this.subsriptions[event].indexOf(callback);
        if (index === -1) return false;
        this.subsriptions[event].splice(index, 1);
        return this;
    }

    reply(event, ...args) {
        if (!this.subsriptions[event]) return false;
        for (const callback of this.subsriptions[event]) {
            try {
                callback(...args);
            } catch (error) {
                Logger.error(`Cannot run callback for event "${event}": \"` + callback.toString().slice(0, 10) + "...\"", "\n", error);
            }
        }
    }

    onDone(callback) {
        return this.on("done", callback);
    }

    cancel() {
        this.reply("cancel");
    }

    get emit() {return this.reply;}
}