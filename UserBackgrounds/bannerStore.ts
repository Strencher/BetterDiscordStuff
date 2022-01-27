import {Store} from "@discord/flux";
import {Dispatcher} from "@discord/modules";
// @ts-ignore
import {get as fetch} from "https";
import {Logger} from "@discord/utils";
import {UserBanner} from "./types";

let banners: Map<string, UserBanner> = new Map();

export default new class BannerStore extends Store {
    public logger: Logger = new Logger(this.constructor.name);
    public intervalTimer: number = 3.6e+6;
    // @ts-ignore
    private _interval: NodeJS.Timeout;
    public API_URL: string = "https://discord-custom-covers.github.io/usrbg/dist/usrbg.json";

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
                    banners = new Map<string, UserBanner>(JSON.parse(chunks.join("")).map((key: { uid: string; img: string; orientation: string; }) => [key.uid, {background: key.img, orientation: key.orientation}]))

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
