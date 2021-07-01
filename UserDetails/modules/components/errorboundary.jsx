import React from "react";
import Logger from "../logger";
import Error from "./icons/error";

export default class ErrorBoundary extends React.Component {
    state = {hasError: false, error: null, info: null};

    componentDidCatch(error, info) {
        this.setState({error, info, hasError: true}); 
        Logger.error(`[ErrorBoundary:${this.props.id}] HI OVER HERE!! SHOW THIS SCREENSHOT TO THE DEVELOPER.\n`, error);       
    }

    render() {
        if (this.state.hasError) {
            return this.props.mini ? <Error style={{color: "#f04747"}} /> : <div>
                <span>An error has occured while rendering {this.props.id}.</span>
                <span>Open console (<code>Ctrl + shift + i / Cmd + shift + i</code>) - Select the "Console" tab and screenshot the big red error.</span>
            </div>;
        } else return this.props.children;
    }
}