import {ContextMenuActions, WebpackModules} from "@zlibrary";
import {flush, Utils} from "..";

export default class ContextMenu {
    static buildItem(item) {
        if (item.children) {
            if (Array.isArray(item.children)) item.children = this.buildItems(item.children);
            else item.children = this.buildItem(item.children);
        }

        const id = (item.id ? item.id : item.label.toLowerCase().replace(/ /g, "-"))
            + (item.children ? "" : "-submenu");

        return React.createElement(MenuItem, {
            ...item,
            id: id,
            key: id
        });
    }

    static buildItems(items) {
        return items.map(e => this.buildItem(e));
    }

    static buildMenu(items) {
        return React.createElement(
            MenuGroup,
            {key: items[0].id},
            this.buildItems(items)
        );
    }

    static open(target, render) {return ContextMenuActions.openContextMenu(target, render);}

    static close() {return ContextMenuActions.closeContextMenu();}

    static async findContextMenu(displayName, filter = _ => true) {
        const regex = new RegExp(displayName, "i");
        const normalFilter = (exports) => exports && exports.default && regex.test(exports.default.displayName) && filter(exports.default);
        const nestedFilter = (module) => regex.test(module.toString());

        {
            const normalCache = WebpackModules.getModule(Utils.combine(normalFilter, (e) => filter(e.default)));
            if (normalCache) return {type: "normal", module: normalCache};
        }

        {
            const webpackId = Object.keys(WebpackModules.require.m).find(id => nestedFilter(WebpackModules.require.m[id]));
            const nestedCache = webpackId !== undefined && WebpackModules.getByIndex(webpackId);
            if (nestedCache && filter(nestedCache?.default)) return {type: "nested", module: nestedCache};
        }

        return new Promise((resolve) => {
            const cancel = () => WebpackModules.removeListener(listener);
            const listener = (exports, module) => {
                const normal = normalFilter(exports);
                const nested = nestedFilter(module);

                if ((!nested && !normal) || !filter(exports?.default)) return;

                resolve({type: normal ? "normal" : "nested", module: exports});
                WebpackModules.removeListener(listener);
                flush.delete(cancel);
            };

            WebpackModules.addListener(listener);
            flush.add(cancel);
        });
    }
}