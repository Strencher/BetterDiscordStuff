import "./button.css";
import "./changelog.css";

import React from "react";

import {Patcher, ReactUtils} from "@api";
import manifest from "@manifest";
import Styles from "@styles";

import showChangelog from "../common/Changelog";
import CopyButton from "./components/copybutton";
import SettingsPanel from "./components/settings";
import * as ContextMenus from "./menus";
import Webpack, { Tooltip } from "./modules/webpack";
import {findInTree, onceAdded} from "./modules/utils";
import CopyIcon from "./components/icons/copy";

export default class Copier {
    flush = new Set();
    getSettingsPanel() {
        return (
            <SettingsPanel />
        );
    }

    start() {
        Styles.load();
        showChangelog(manifest);
        this.controller = new AbortController();

        for (const id in ContextMenus) {
            try {
                const unpatch = ContextMenus[id]();
                this.flush.add(unpatch);
            } catch (error) {
                console.error("[Copier] Could not initialize patch for", id, ":", error);
            }
        }

        // this.patchAboutMe();
        this.patchToolbar();
    }

    patchAboutMe() {
        const module = Webpack.getBySource(['animUserProfileSidebarateOnHoverOrFocusOnly','61W33d'])

        const CopyButton = React.memo(({onClick}) => (
            <Tooltip text="Copy About Me" tooltipClassName="copier-tooltip" position="top">
                {props => (
                    <button {...props} className="copier-button" onClick={onClick}>
                        <CopyIcon width="14" height="14" />
                    </button>
                )}
            </Tooltip>
        ));

        Patcher.after(module, "Z", (_, [{bio}], res) => {
            console.log(res)
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
