import {Utils} from "@api";
import React from "react";

export function copy(text) {
    DiscordNative.clipboard.copy(text);
}

export function int2rgb(int) {
    int >>>= 0;
    const b = int & 0xFF;
    const g = (int & 0xFF00) >>> 8;
    const r = (int & 0xFF0000) >>> 16;

    return "rgb(" + [r, g, b].join(", ") + ")";
}

export function int2hex(int) {
    return "#" + int.toString(16).padStart(6, "0");
}

export function findInTree(res, filter) {
    return Utils.findInTree(res, filter, {walkable: ["props", "children", "type"]});
}

export const onceAdded = (selector, callback, signal) => {
    let directMatch;
    if (directMatch = document.querySelector(selector)) {
        callback(directMatch);
        return () => null;
    }

    const cancel = () => observer.disconnect();

    const observer = new MutationObserver(changes => {
        for (const change of changes) {
            if (!change.addedNodes.length) continue;

            for (const node of change.addedNodes) {
                if (node.nodeType === Node.TEXT_NODE) continue;
                
                const match = (node.matches(selector) && node) || node.querySelector(selector);

                if (!match) continue;

                cancel();
                signal.removeEventListener("abort", cancel);

                callback(match);
            }
        }
    });

    observer.observe(document.body, {childList: true, subtree: true});

    signal.addEventListener("abort", cancel);
};

export function useKeyState() {
    const [active, setActive] = React.useState("none");
    React.useEffect(() => {
        const handleChange = e => {
            setActive(
                e.ctrlKey && e.shiftKey
                    ? "both"
                    : e.ctrlKey
                        ? "ctrl"
                        : e.shiftKey
                            ? "shift"
                            : "none"
            );
        };

        window.addEventListener("keydown", handleChange);
        window.addEventListener("keyup", handleChange);

        return () => {
            window.removeEventListener("keydown", handleChange);
            window.removeEventListener("keyup", handleChange);
        };
    }, [true]);

    return active;
}

export const useStateFromStores = (stores, factory) => {
    const [state, setState] = React.useState(factory());

    React.useEffect(() => {
        const listener = () => setState(factory());

        for (const store of stores) {
            store.addReactChangeListener(listener);
        }

        return () => stores.forEach(store => store.removeReactChangeListener())
    });

    return state;
};

export const fmt = (str, ...strings) => {
    let i = 0;
    return str.replaceAll("{s}", () => strings[i++]);
};

export function findGroupById(res, id) {
    if (!res) return null;

    let children = res?.props?.children;
    if (!children) return null;

    if (!Array.isArray(children))
        children = [children];

    if (children.some(child =>
        child && typeof child === "object" && "props" in child && child.props.id === id
    )) return res;

    for (const child of children)
        if (child && typeof child === "object") {
            const found = findGroupById(child, id);
            if (found) return found;
        }
}
