import React from "react";
import TextBox from "./textbox";
import Settings from "../../modules/settings";
import "./replacement.scss";

function Variable({name, description}) {
    return (
        <div className="copier-variable">
            <span className="copier-variable-name">${name}</span>
            <div className="copier-variable-description">{description}</div>
        </div>
    );
}

export default function Replacement({options, id, name}) {
    return (
        <React.Fragment>
            <TextBox name="Configure" onChange={value => Settings.set(id, value)} placeholder={name} value={Settings.get(id)} />
            <div className="copier-header copier-settings-name">Available Variables:</div>
            {options.map(option => (
                <Variable key={option.name} name={option.name} description={option.description} />
            ))}
        </React.Fragment>
    );
}
