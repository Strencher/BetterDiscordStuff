import "./style.scss";

import React from "react";

interface ErrorBoundaryProps {
    id: string;
    mini?: boolean;
    children: React.ReactNode;
}

interface ErrorBoundaryState {
    hasError: boolean;
    error: Error | null;
    info: React.ErrorInfo | null;
}

const ErrorIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#ddd" width="24" height="24" {...props}>
        <path d="M0 0h24v24H0z" fill="none" />
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
    </svg>
);

export default class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
    state: ErrorBoundaryState = { hasError: false, error: null, info: null };

    componentDidCatch(error: Error, info: React.ErrorInfo) {
        this.setState({ error, info, hasError: true });
        console.error(
            `[ErrorBoundary:${this.props.id}] HI OVER HERE!! SHOW THIS SCREENSHOT TO THE DEVELOPER.\n`,
            error
        );
    }

    render() {
        if (this.state.hasError) {
            return this.props.mini ? (
                <ErrorIcon fill="#f04747" />
            ) : (
                <div className="errorBoundary">
                    <div className="errorText">
                        <span>An error has occured while rendering {this.props.id}.</span>
                        <span>
                            Open console (<code>CTRL + SHIFT + i / CMD + SHIFT + i</code>) - Select the "Console" tab
                            and screenshot the big red error.
                        </span>
                    </div>
                </div>
            );
        } else return this.props.children;
    }
}
