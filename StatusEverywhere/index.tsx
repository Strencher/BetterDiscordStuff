/// <reference path="../types/main.d.ts" />

import { Patcher, Utilities, WebpackModules, Logger, ReactComponents } from "@zlibrary"
import BasePlugin from "@zlibrary/plugin"
import StatusAvatar from "./components/avatar";
import stylesheet from "styles";
import React from "react";
import SettingsPanel from "./components/settings";
import _ from "lodash";
import * as Patches from "./patches";

export default class StatusEverywhere extends BasePlugin {
    public _flush: Function[] = [];

    public get StatusAvatar() { return StatusAvatar; }

    public getSettingsPanel() {
        const Panel = SettingsPanel as React.FunctionComponent<{}>;

        return (
            <Panel />
        );
    }

    public createTimeLog(label: string): { end: () => void, start: number } {
        const start: number = Date.now();

        const end = function () {
            const current: number = Date.now();

            Logger.log(label.replace(/%s/g, (current - start).toFixed()));
        };

        return { start, end };
    }

    public async onStart(): Promise<void> {
        const time = this.createTimeLog("Started StatusEverywhere in %sms.");
        const methods = Object.keys(Patches);

        for (let i = 0; i < methods.length; i++) {
            if (!methods[i].startsWith("patch") || typeof(Patches[methods[i]]) !== "function") continue;

            Utilities.suppressErrors(Patches[methods[i]].bind(this, this._flush), `${this.constructor.name}.${methods[i]}`)();
        }

        time.end();

        stylesheet.inject();
    }

    onStop(): void {
        Patcher.unpatchAll();
        stylesheet.remove();

        for (let i = 0; i < this._flush.length; i++) {
            this._flush[i]();
        }
    }
}