import Notification from "../components/notification";
import createStore from "common/hooks/zustand";
import ReactDOM from "react-dom";

const [useStore, Api] = createStore({notifications: {}, paused: false});

export function initialize() {
    const DOMNode = Object.assign(document.createElement("div"), {id: "voicechatnotifications"});
    ReactDOM.render(<VoiceNotifications />, DOMNode);

    document.getElementById("app-mount").appendChild(DOMNode);
}

export function shutdown() {
    const node = document.getElementById("voicechatnotifications");
    if (!node) return false; // uh

    const didUnmount = ReactDOM.unmountComponentAtNode(node);
    if (didUnmount) node.remove();
}

export function show(content, options = {}) {
    const id = parseInt(Math.random().toString().slice(2, 16));
    const props = {
        id,
        content,
        ...options,
        onClose: () => {
            Api.setState(state => {
                delete state.notifications[id];

                return {...state}; // clone
            });
        }
    };

    Api.setState(state => ({notifications: {...state.notifications, [id]: props}}));

    return id;
}

export function VoiceNotifications() {
    const state = useStore(e => Object.entries(e.notifications));

    return state.map(([id, props]) => (
        <Notification {...props} key={id} />
    ));
}
