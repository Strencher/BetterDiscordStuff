import {WebpackModules} from "@zlibrary";
import React from "react";

const overrides = {
    useMemo: factory => factory(),
    useState: initialState => [initialState, () => void 0],
    useReducer: initialValue => [initialValue, () => void 0],
    useEffect: () => {},
    useLayoutEffect: () => {},
    useRef: () => ({current: null}),
    useCallback: callback => callback
};
const keys = Object.keys(overrides);

export function wrapInHooks(functionalComponent: Function) {
    const ReactDispatcher = (React as any).__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentDispatcher.current;
    const originals = keys.map(e => [e, ReactDispatcher[e]]);

    Object.assign(ReactDispatcher, overrides);

    let returnValue = null, error = null;
    try {
        returnValue = functionalComponent();
    } catch (err) {
        error = err;
    }

    Object.assign(ReactDispatcher, Object.fromEntries(originals));

    // Throw it after react we re-assigned react's dispatcher stuff so it won't break discord entirely.
    if (error) throw error;

    return returnValue;
};

export const getLazy = function (filter: (m: any) => boolean) {
    const fromCache = WebpackModules.getModule(filter);
    if (fromCache) return Promise.resolve(fromCache);

    return new Promise(resolve => {
        const cancel = WebpackModules.addListener((m) => {
            const matches = [m, m?.default];

            for (let i = 0; i < matches.length; i++) {
                const match = filter(matches[i]);
                if (!match) continue;

                resolve(matches[i]);
                cancel();
                break;
            }
        });
    });
}