import {Store} from "@discord/flux";
// import {Dispatcher} from "@discord/modules";
import {Logger, Toasts} from "@zlibrary";
import https from "https";

import { WebpackModules } from "@zlibrary";
const Dispatcher = WebpackModules.getByProps('dispatch', 'subscribe');

type DispatchEvent<T> = {
    type: T;
}

const handleData = function (event: DispatchEvent<"MINI_THEMES_RECEIVE_DATA"> & {data: string[]}) {
    snippets = event.data;
}

let snippets = [];

const GithubStore = new class GithubStore extends Store {
    public readonly API_URL = "https://raw.githubusercontent.com/Strencher/BD-MiniThemes/main/snippets.json";

    constructor() {
        super(Dispatcher, {
            MINI_THEMES_RECEIVE_DATA: handleData
        });
    }

    public getState(): string[] {return snippets;}

    public async fetchData(): Promise<void> {
        https.get(this.API_URL, res => {
            const data = [];

            res.on("data", chunk => data.push(chunk));

            res.on("end", () => {
                Dispatcher.dirtyDispatch({
                    type: "MINI_THEMES_RECEIVE_DATA",
                    // @ts-ignore
                    data: JSON.parse(data.join(""))
                });
            });

            res.on("error", error => {
                Logger.error(error);
                Toasts.error("Failed to fetch MiniThemes API.");
            });
        });
    }
}

export default GithubStore;