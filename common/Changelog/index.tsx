import React from "react";
import { Data, Webpack, UI } from "@api";
import { Manifest } from "@manifest";

import "./style.scss";

interface I18n {
    getLocale: () => string;
}

export default function showChangelog(manifest: Manifest) {
    if (Data.load("lastVersion") === manifest.version) return;

    const i18n: I18n = Webpack.getByKeys("getLocale");
    const formatter = new Intl.DateTimeFormat(i18n.getLocale(), {
        month: "long",
        day: "numeric",
        year: "numeric"
    });

    const title = (
        <div className="Changelog-Title-Wrapper">
            <h1>What's New - {manifest.name}</h1>
            <div>{formatter.format(new Date(manifest.changelogDate))} - v{manifest.version}</div>
        </div>
    )

    const items = manifest.changelog.map(item => (
        <div className="Changelog-Item">
            <h4 className={`Changelog-Header ${item.type}`}>{item.title}</h4>
            {item.items.map(item => (
                <span>{item}</span>
            ))}
        </div>
    ));

    "changelogImage" in manifest && items.unshift(
        <img className="Changelog-Banner" src={manifest.changelogImage} />
    );

    UI.alert(title as unknown as string, items);
    Data.save("lastVersion", manifest.version);
}