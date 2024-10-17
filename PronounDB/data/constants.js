import {Webpack} from "@api";

export const API_URL = "https://pronoundb.org/api/v2";

export const Endpoints = {
    LOOKUP: `${API_URL}/lookup?platform=discord&id={{userId}}`,
    LOOKUP_BULK: `${API_URL}/lookup?platform=discord&ids={{userIds}}`
};

export const Pronouns = {
    he: "He/Him",
    it: "It/Its",
    she: "She/Her",
    they: "They/Them",
    any: "Any pronouns",
    other: "Other pronouns",
    ask: "Ask me my pronouns",
    avoid: "Avoid pronouns, use my name",
    unspecified: "No pronouns specified."
};

export const ModalsModule = Webpack.getModule(x=>x.openModal)
export const ModalComponents = Webpack.getModule(x=>x.ModalRoot)
export const FlexModule = Webpack.getByKeys( "Align", "Child", "Wrap" );