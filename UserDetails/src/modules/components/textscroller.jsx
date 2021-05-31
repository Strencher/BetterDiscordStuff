import React from "react";
import ReactDOM from "react-dom";
import {WebpackModules} from "@zlibrary";
import Utilities from "../Utilities";
import styles from "../apis/dates.scss";

const Animations = WebpackModules.getByProps("Value");

export default class TextScroller extends React.Component {
    _ref = instance => {
        let element = ReactDOM.findDOMNode(instance);
        if (element && element.parentElement) {
            let maxWidth = element.parentElement.innerWidth;
            if (maxWidth > 50) element.style.setProperty("max-width", `${maxWidth}px`);
            setTimeout(() => {
                if (document.contains(element.parentElement)) {
                    let newMaxWidth = element.parentElement.innerWidth;
                    if (newMaxWidth > maxWidth) element.style.setProperty("max-width", `${newMaxWidth}px`);
                }
            }, 3000);
            let Animation = new Animations.Value(0);
            Animation
                .interpolate({inputRange: [0, 1], outputRange: [0, (element.firstElementChild.offsetWidth - element.offsetWidth) * -1]})
                .addListener(v => {element.firstElementChild.style.setProperty("left", `${v.value}px`);});
            this.scroll = p => {
                let w = p + parseFloat(element.firstElementChild.style.getPropertyValue("left")) / (element.firstElementChild.offsetWidth - element.offsetWidth);
                w = isNaN(w) || !isFinite(w) ? p : w;
                w *= element.firstElementChild.offsetWidth / (element.offsetWidth * 2);
                Animations.parallel([Animations.timing(Animation, {toValue: p, duration: Math.sqrt(w ** 2) * 4000 / (parseInt(this.props.speed) || 1)})]).start();
            };
        }
    }

    _onClick = e => {
        if (typeof this.props.onClick == "function") this.props.onClick(e, this);
    }

    _onMouseEnter = e => {
        if (e.currentTarget.offsetWidth < e.currentTarget.firstElementChild.offsetWidth) {
            this.scrolling = true;
            e.currentTarget.firstElementChild.style.setProperty("display", "block");
            this.scroll(1);
        }
    }

    _onMouseLeave = e => {
        if (this.scrolling) {
            delete this.scrolling;
            e.currentTarget.firstElementChild.style.setProperty("display", "inline");
            this.scroll(0);
        }
    }

    render() {
        const style = Object.assign({}, this.props.style, {
            position: "relative",
            display: "block",
            overflow: "hidden"
        });

        const childStyle = {
            left: "0",
            position: "relative",
            display: "inline",
            whiteSpace: "nowrap"
        };

        return <div
            className={Utilities.joinClassNames(this.props.className, styles.scrollableText)}
            style={style}
            ref={this._ref}
            onClick={this._onClick}
            onMouseEnter={this._onMouseEnter}
            onMouseLeave={this._onMouseLeave}
        >
            <div style={childStyle}>{this.props.children}</div>
        </div>;
    }
}