import {Utilities, WebpackModules} from "@zlibrary";
import {useContext, useEffect, useState} from "react";
import styles from "./counter.scss";

const {default: EmitterContext} = WebpackModules.getByProps("EventEmitterProvider");

export default function CharCounterElement({currentLength, maxCharacterCount}) {
    const Dispatcher: any = useContext(EmitterContext);
    const [selection, setSelection] = useState(0);

    useEffect(() => {
        if (!Dispatcher) return;

        const callback = function (text: string) {
            setSelection(text.length);
        };

        Dispatcher.on("selection-changed", callback);

        return () => Dispatcher.off("selection-changed", callback);
    }, [Dispatcher]);

    return (
        <span className={Utilities.className(styles.counter, currentLength >= maxCharacterCount && styles.oversize)}>
            {currentLength}{selection > 0 ? <span className={styles.selection}>({selection})</span> : null}/{maxCharacterCount}
        </span>
    );
};