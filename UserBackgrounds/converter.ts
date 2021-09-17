import {Logger} from "@zlibrary";
import {UserBanner, CSSStyle} from "./types";

export const extractRegex = /data-user-id="(.+)"/g;

export default class Converter {
    static extractUserIds(selector: string) {
        const map = selector.split(",").map((attr: string) => {
            const result = extractRegex.exec(attr);
            // Check if the match is null or there's no userId found.
            if (!result?.[1]) return null;

            return result[1];
        }).filter(e => e);

        return [...new Set(map)]; // Remove duplicates
    }

    static async convert(css: string): Promise<Map<string, UserBanner>> {
        const start = Date.now();
        let output = new Map();
        const sheet: CSSStyle = new CSSStyleSheet({media: "print"}) as CSSStyle;

        const style = await sheet.replace(css);

        for (const cssRule of [...style.cssRules]) {
            const userIds = this.extractUserIds(cssRule.selectorText);
            for (const id of userIds) {
                const bgData: {background: string, orientation?: string} = {
                    background: cssRule.style.getPropertyValue("--user-background").slice(5, -2)
                };

                if (cssRule.style.getPropertyValue("--")) {
                    bgData.orientation = cssRule.style.getPropertyValue("--user-popout-position");
                }

                output.set(id, bgData);
            }
        }
        Logger.log(`Compiled database (css -> json) in ${(Date.now() - start).toFixed(0)}ms.`);
        return output;
    }
}