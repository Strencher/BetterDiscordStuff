import pkg from "../package.json";

export default class Logger {
    static error(...message) {this._log("error", ...message);}
    static warn(...message) {this._log("warn", ...message);}
    static info(...message) {this._log("info", ...message);}
    static log(...message) {this._log("log", ...message);}
    static _log(level = "log", ...message) {
        console[level](`%c[${pkg.info.name}]%c`, "color: #0870f3; font-weight: 700;", "", ...message);
    }
}