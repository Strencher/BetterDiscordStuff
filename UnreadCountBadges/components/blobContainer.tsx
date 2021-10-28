import React from "react";
import { animated } from "react-spring";

// Don't ask, took it over from discord because i can't import it.
export default class BlobContainer extends React.Component<{className: string, animatedStyle: any}> {
    timeoutId: NodeJS.Timeout;

    componentDidMount() {
        this.forceUpdate();
    }

    componentWillAppear(start) { start(); }
    componentWillEnter(start) { start(); }
    
    componentWillLeave(start) {
        this.timeoutId = setTimeout(start, 300);
    }

    componentWillUnmount() {
        clearInterval(this.timeoutId);
    }

    render() {
        const {className, animatedStyle, children} = this.props;

        return (
            <animated.div className={className} style={animatedStyle}>
                {children}
            </animated.div>
        );
    }
};