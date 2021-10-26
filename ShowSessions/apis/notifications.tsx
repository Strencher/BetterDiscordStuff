import ReactDOM from "react-dom";

export default class Notifications {
    container: HTMLDivElement;

    public initialize(): void {
        const container = this.container = Object.assign(document.createElement("div"), { id: "ShowSessions-notifications-wrapper" });

        
    }

    public shutdown(): void {
        if (document.contains(this.container)) {
            ReactDOM.unmountComponentAtNode(this.container);
            this.container.remove();
        }
    }
}