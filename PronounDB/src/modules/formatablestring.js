import {Utilities} from "@zlibrary";

export default class FormattableString extends String {
    format(options) {
        return Utilities.formatString(this, options);
    }
}