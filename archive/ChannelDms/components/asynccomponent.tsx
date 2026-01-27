import {useEffect, useState} from "react";

function AsyncComponent({promise, fallback, ...props}) {
    const [Component, setComponent] = useState(() => fallback);

    useEffect(() => {
        Promise.resolve(promise).then(comp => {
            setComponent(() => comp);
        });
    }, [promise]);
    
    return <Component {...props} />
};

export default function wrapPromise(promise: Promise<any>, fallback: any) {
    return props => {
        return (
            <AsyncComponent promise={promise} fallback={fallback} {...props} />
        );
    }
};