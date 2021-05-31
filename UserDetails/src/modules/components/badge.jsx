
import {WebpackModules} from "@zlibrary";
import React from "react";
import defaultConnections from "../data/defaultConnections";

const {TooltipContainer: Tooltip} = WebpackModules.getByProps("TooltipContainer");

const formatString = (string, options) => {
    for (const option in options) string = string.replace(new RegExp(`{{${option}}}`, "g"), options[option]);
    return string;
}

export default function Badge({name, id, type}) {
    const onClick = () => {
        const link = defaultConnections[type].link;
        if (!link) return;
        open(formatString(link, {
            userId: id,
            user: name
        }));
    };

    return <Tooltip text={name}>
        <img src={defaultConnections[type].icon} onClick={onClick} />
    </Tooltip>;
}