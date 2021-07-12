import { Store } from '@discord/flux';
import { Dispatcher } from '@discord/modules';
// @ts-ignore
import { get as fetch } from 'https';
import { Logger } from '@discord/utils';

export type banner = {
  background: string;
  orientation?: 'top' | 'left' | 'right' | 'bottom';
};

let banners = new Map<string, banner>();

export default new class BannerStore extends Store {
  public logger: Logger = new Logger(this.constructor.name);
  public intervalTimer: number = 3.6e+6;
  // @ts-ignore
  private readonly _interval: NodeJS.Timeout;
  public API_URL: string = 'https://raw.githubusercontent.com/Discord-Custom-Covers/usrbg/master/dist/usrbg.json';

  constructor() {
    super(Dispatcher, {});
  }

  public destroy(): void {
    if (!this._initialized) return;

    clearInterval(this._interval);
  }

  public getState(): Map<string, banner> {
    return banners;
  }

  initialize(): void {
    this._initialized = true;

    setInterval(this.fetchBanners, this.intervalTimer);
    this.fetchBanners();
  }

  public fetchBanners = (): void => {
    fetch(this.API_URL, res => {
      const chunks = [];
      res.on('data', chunk => chunks.push(chunk));

      res.on('end', () => {
        banners = new Map<string, banner>(Object.entries(JSON.parse(chunks.join(""))));

        this.emitChange();
      });

      res.on('error', error => this.logger.error(error));
    });
  }

  public getBannerURL(userId: string): string | null {
    return banners.get(userId)?.background;
  }

  public getBanner(userId: string): banner | void {
    return banners.get(userId);
  }

  public hasBanner(userId: string): boolean {
    return banners.has(userId);
  }
}