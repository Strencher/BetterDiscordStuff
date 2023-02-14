import React from "react";

import "./textbox.scss";

export default function TextBox({name, note, value, onChange, placeholder}) {
    const [currentValue, setValue] = React.useState(value);

    return (
        <div className="copier-textbox">
            <div className="copier-header copier-textbox-name">{name}</div>
            <input
                className="copier-text-input"
                defaultValue={currentValue}
                onInput={({target}) => (onChange(target.value), setValue(target.value))}
                placeholder={placeholder}
                onClick={e => e.stopPropagation()}
            />
            {note && <div className="copier-textbox-note">{note}</div>}
        </div>
    );
}
