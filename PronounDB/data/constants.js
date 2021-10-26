import FormattableString from "../modules/formatablestring";

export const API_URL = "https://pronoundb.org";

export const Endpoints = {
    LOOKUP: new FormattableString(`${API_URL}/api/v1/lookup?platform=discord&id={{userId}}`),
    LOOKUP_BULK: new FormattableString(`${API_URL}/api/v1/lookup-bulk?platform=discord&ids={{userIds}}`)
};

export const Pronouns = {
    unspecified: null,
    hh:         "He/Him",
    hi:         "He/It",
    hs:         "He/She",
    ht:         "He/They",
    ih:         "It/Him",
    ii:         "It/Its",
    is:         "It/She",
    it:         "It/They",
    shh:        "She/He",
    sh:         "She/Her",
    si:         "She/It",
    st:         "She/They",
    th:         "They/He",
    ti:         "They/It",
    ts:         "They/She",
    tt:         "They/Them",
    any:        "Any pronouns",
    other:      "Other pronouns",
    ask:        "Ask me my pronouns",
    avoid:      "Avoid pronouns, use my name",
};