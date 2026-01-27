import * as Locales from "./data/translations/index.js";
import i18n from "@discord/i18n";
import FormattableString from "./classes/string.js";

const Strings = new Proxy(Locales.en, {
    get(_, key) {
        const language = i18n.getLocale();
        const strings = Locales[language.split("-")[0]?.toLowerCase()] ?? Locales.en;
        return new FormattableString(strings[key] ?? Locales.en[key]);
    }
});

export default Strings;