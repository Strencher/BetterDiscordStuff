import {useEffect, useReducer} from "react";

export default function createStore(state) {
    const listeners = new Set();

    const api = {
        getState() {return state;},
        setState(partial) {
            const partialState = typeof partial === "function" ? partial(state) : partial;
            if (!_.isEqual(partialState, state)) {
                state = Object.assign({}, state, partialState);
                listeners.forEach(listener => {
                    listener(state);
                });
            }
        },
        get listeners() {return listeners;},
        on(listener) {
            if (listeners.has(listener)) return;
            listeners.add(listener);

            return () => listeners.delete(listener);
        },
        off(listener) {
            return listeners.delete(listener);
        }
    };

    function useState(collector = _ => _) {
        const forceUpdate = useReducer(e => e + 1, 0)[1];
        useEffect(() => {
            const handler = () => forceUpdate();

            listeners.add(handler);

            return () => listeners.delete(handler);
        }, []);

        return collector(api.getState());
    }

    return [useState, api];
}