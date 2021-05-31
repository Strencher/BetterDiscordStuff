import React, {useEffect, useReducer} from "react";

export function reducer(state) {
    if (state >= 3) return 1;
    else return state + 1;
}

export default function LoadingText() {
    const [state, dispatch] = useReducer(reducer, 1);

    useEffect(() => {
        const internal = setInterval(() => {
            dispatch();
        }, 500);

        return () => {clearInterval(internal);}
    }, []);

    return <div style={{textAlign: "center"}}>{".".repeat(state)}</div>;
}