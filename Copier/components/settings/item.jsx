import "./item.scss";

import {Utils} from "@api";
import React from "react";

import Tune from "../icons/tune";

export default function SettingsItem({name, note, children, opened = false, onSelect}) {
    return (
        <div className={Utils.className("copier-settings-item", opened && "item-opened")} onClick={onSelect}>
            <div className="copier-settings-item-header">
                <div className="copier-settings-name">
                    <div className="copier-settings-icon-box">
                        <Tune />
                    </div>
                    {name}
                </div>
                {!opened && (
                    <div className="copier-settings-note">{note}</div>
                )}
            </div>
            <div className="copier-settings-children">{opened && children}</div>
        </div>
    );
}
