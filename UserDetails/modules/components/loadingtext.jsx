import React, {useEffect, useReducer} from "react";
import styles from "./style.scss";

export function reducer(state) {
    if (state >= 3) return 1;
    else return state + 1;
}

export default function LoadingText() {
    const [state, dispatch] = useReducer(reducer, 1);

    useEffect(() => {
        const interval = setInterval(() => {
            dispatch();
        }, 500);

        return () => {clearInterval(interval);}
    }, []);

    return <div className={styles.loadingText}>{".".repeat(state)}</div>;
}