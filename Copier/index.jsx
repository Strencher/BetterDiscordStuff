import {Patcher, ReactUtils, UI} from "@api";
import * as ContextMenus from "./menus";
import Styles from "@styles";
import Webpack, {Tooltip} from "./modules/webpack";
import {copy, findInTree, onceAdded} from "./modules/utils";
import config from "@manifest";
import React from "react";
import CopyIcon from "./components/icons/copy";

import "./button.css";
import "./changelog.css";
import CopyButton from "./components/copybutton";
import SettingsPanel from "./components/settings";
import Settings from "./modules/settings";

export default class Copier {
    flush = new Set();

    maybeShowChangelog() {
        if (config.version === Settings.get("latestUsedVersion")) return;

        const items = config.changelog.map(item => (
            <div className={"copier-changelog-item " + "item-changelog-" + item.type}>
                <h4 className="copier-changelog-header">{item.type}</h4>
                {item.items.map(i => <span>{i}</span>)}
            </div>
        ));

        "changelogImage" in config && items.unshift(
            <img className="copier-changelog-banner" src={config.changelogImage} />
        );

        Settings.set("latestUsedVersion", config.version);

        const formatter = new Intl.DateTimeFormat(document.documentElement.lang, {month: "long", day: "numeric", year: "numeric"});
        UI.alert(<div className="copier-title-wrap">
            <h1>What's New - {config.name}</h1>
            <span>{formatter.format(new Date(config.changelogDate))}</span>
        </div>, items);
    }

    getSettingsPanel() {
        return (
            <SettingsPanel />
        );
    }

    start() {
        this.controller = new AbortController();
        Styles.load();

        for (const id in ContextMenus) {
            try {
                const unpatch = ContextMenus[id]();
                this.flush.add(unpatch);
            } catch (error) {
                console.error("[Copier] Could not initialize patch for", id, ":", error);
            }
        }

        this.patchAboutMe();
        this.patchToolbar();
        this.maybeShowChangelog();
    }

    patchAboutMe() {
        const [module, key] = Webpack.getMangled(m => m?.toString?.().includes("USER_POPOUT_ABOUT_ME"));

        const CopyButton = React.memo(({onClick}) => (
            <Tooltip text="Copy About Me" tooltipClassName="copier-tooltip" position="top">
                {props => (
                    <button {...props} className="copier-button" onClick={onClick}>
                        <CopyIcon width="14" height="14" />
                    </button>
                )}
            </Tooltip>
        ));

        Patcher.after(module, key, (_, [{bio}], res) => {
            const title = findInTree(res, e => e?.variant && Array.isArray(e.children));

            if (!title) return res;;

            title.children.push(
                <CopyButton onClick={() => copy(bio)} />
            );
        });
    }

    async patchToolbar() {
        const {buttons} = Webpack.getByProps("messageListItem", "buttons") ?? {};

        const buttonsContainer = await new Promise(resolve => {
            onceAdded("." + buttons, node => {
                const instance = ReactUtils.getInternalInstance(node);

                if (!instance) return;

                for (let curr = instance, max = 100; curr != null && max--; curr = curr?.return) {
                    max < 5 && console.log(curr);
                    if ((node = curr?.memoizedProps?.children?.type) && node?.$$typeof) {
                        resolve(node);
                        break;
                    }
                }
            }, this.controller.signal);
        });
        
        if (!buttonsContainer) return;

        const ToolbarButtonPatch = ({__COP_ORIGINAL, ...props}) => {
            if (!__COP_ORIGINAL) return null;

            const res = __COP_ORIGINAL.call(null, props);

            try {
                res?.props?.children?.unshift?.(
                    <CopyButton message={props.message} />
                );
            } catch (error) {
                console.error("[Copier] Fatal error:", error);
            }

            return res;
        };

        Patcher.after(buttonsContainer, "type", (_, __, res) => {
            const el = findInTree(res, e => e?.props?.message);

            if (!el) return;

            el.props.__COP_ORIGINAL = el.type;
            el.type = ToolbarButtonPatch;
        });
    }

    stop() {
        Styles.unload();
        Patcher.unpatchAll();
        this.flush.forEach(f => f());
        this.flush.clear()
        this.controller.abort();
    }
}
