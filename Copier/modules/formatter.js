import ChannelTypes from "../data/channeltypes";

export default class Formatter {
    static formatString(string, options) {
        for (const option in options) {
            string = string.replace(new RegExp(`\\$${option}`, "g"), options[option]);
        }

        return string;
    }

    static formatDate(date) {
        const formatter = new Intl.DateTimeFormat(document.documentElement.lang, {
            dateStyle: "full",
            timeStyle: "short"
        });

        return formatter.format(date);
    }

    static parseSnowFlake(id) {
        return new Date((id / 4194304) + 1420070400000);
    }

    static formatChannelType(type) {
        const string = ChannelTypes[type] ?? "";

        return string.split("_").map(e => e[0].toUpperCase() + e.slice(1)).join(" ");
    }
}
