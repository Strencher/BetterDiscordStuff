import {Store} from "@discord/flux";
import {Dispatcher} from "@discord/modules";
// @ts-ignore
import {get as fetch} from "https";
import {Logger} from "@discord/utils";
import Converter from "./converter";
import {UserBanner} from "./types";

let banners = new Map<string, UserBanner>();

export default new class BannerStore extends Store {
    public logger: Logger = new Logger(this.constructor.name);
    public intervalTimer: number = 3.6e+6;
    // @ts-ignore
    private _interval: NodeJS.Timeout;
    public API_URL: string = "https://black-cube-web.vercel.app/api/css"; // Very hideous domain. :( p0rtl was here

    constructor() {
        super(Dispatcher, {});
    }

    public destroy(): void {
        if (!this._initialized) return;

        clearInterval(this._interval);
    }

    public getState(): Map<string, UserBanner> {
        return banners;
    }

    initialize(): void {
        this._initialized = true;

        this._interval = setInterval(this.fetchBanners, this.intervalTimer);
        this.fetchBanners();
    }

    public fetchBanners = (): void => {
        fetch(this.API_URL, res => {
            const chunks = [];
            res.on("data", chunk => chunks.push(chunk));

            res.on("end", async () => {
                try {
                    banners = await Converter.convert(chunks.join(""));

                    this.emitChange();
                } catch (error) {
                    this.logger.error(error);
                }
            });

            res.on("error", error => this.logger.error(error));
        });
    }

    public getBannerURL(userId: string): string | null {
        return banners.get(userId)?.background;
    }

    public getBanner(userId: string): UserBanner | void {
        return banners.get(userId);
    }

    public hasBanner(userId: string): boolean {
        return banners.has(userId);
    }
}
