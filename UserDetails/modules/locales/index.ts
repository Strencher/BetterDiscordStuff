import * as nl from "./nl.json";
import * as de from "./de.json";
import * as enUS from "./en-US.json";
import * as tr from "./tr.json";
import fr from "./fr.json";
import vi from "./vi.json";
import esES from "./es-ES.json";
import svSE from "./sv-SE.json";
import ptBR from "./pt-BR.json";

export default {
    "en-US": enUS,
    "es-ES": esES,
    "sv-SE": svSE,
    "pt-BR": ptBR,
    nl,
    de,
    tr,
    fr,
    vi
};

export type Keys = {
    CONNECTIONS: string;
    NO_CONNECTIONS: string;
    LOADING_CONNECTIONS: string;
    LOADING_LAST_MESSAGE: string;
    LOADING_JOINED_AT: string;
    MEMBER_WAS_NOT_FOUND: string;
    FAILED_TO_FETCH: string;
    USERINFO_CMD_DESC: string;
    NO_MUTUAL_GUILDS: string;
    LOADING_MUTUAL_GUILDS: string;
};