export default class FormattableString extends String {
    format(options) {
        let string = this;
        for (const option in options) {
            string = string.replace(new RegExp(`{{${option}}}`, "g"), options[option]);
        }

        return string;
    } 
}