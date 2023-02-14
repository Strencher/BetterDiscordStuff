import React from "react";
import {Utils} from "@api";
import Tick from "../icons/tick";

import "./toggle.scss";

export default function ToggleItem({name, note, value, onChange}) {
    const [checked, toggle] = React.useReducer(n => !n, value);

    return (
        <div className="copier-toggle">
            <div className="copier-header copier-toggle-name">{name}</div>
            <div
                onClick={(e) => {
                    onChange(!checked);
                    toggle();

                    e.stopPropagation();
                }}
                className={Utils.className("copier-toggle-value", {"copier-checked": checked})}
            >
                {checked && <Tick />}
            </div>
            {note && <div className="copier-toggle-note">{note}</div>}
        </div>
    );
}
