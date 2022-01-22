import {Channel, Message, User} from "@discord/classes";
import {Button} from "@discord/components";
import {ScrollerThin} from "@discord/scrollbars";
import {WebpackModules} from "@zlibrary";
import createStore from "common/hooks/zustand";
import styles from "./panel.scss";

const ChannelMessage = WebpackModules.getModule(m => m?.type?.displayName === "ChannelMessage");

const dummyChannel = new Channel({
    name: "dumb-channel",
    id: "-1"
});

const [useStore, Api] = createStore({logs: []});

export default function LogsPanel() {
    const logs = useStore(s => s.logs);

    if (!logs.length) return (
        <b className={styles.empty}>Don't worry, the plugin isn't broken, nothing has happened yet.</b>
    );

    const formattedLogs = [];
    let lastItem = null;

    for (const item of logs) {
        let isGroupStart = lastItem?.user?.id === item.user.id;

        const message = new Message({
            content: item.message,
            timestamp: item.timestamp,
            author: new User(item.user),
        });
        message.start = !isGroupStart;
        formattedLogs.push(message);

        lastItem = item;
    }

    return (
        <div>
            <Button className={styles.clearButton} onClick={() => Api.setState({logs: []})}>Clear Logs</Button>
            <ScrollerThin className={styles.contents}>
                {
                    formattedLogs.map(message => <div className={message.start && styles.message}>
                        <ChannelMessage
                            message={message}
                            channel={dummyChannel}
                            isGroupStart={message.start}
                        />
                    </div>)
                }
            </ScrollerThin>
        </div>
    );
}

LogsPanel.Store = Api;
