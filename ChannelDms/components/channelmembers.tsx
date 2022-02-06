import {Utilities, WebpackModules} from "@zlibrary";
import createStore from "../modules/store";
import styles from "./channelmembers.scss";
import PrivateChannels from "./privatechannels";

const TabBar = WebpackModules.getByProps("Item", "Header");

enum Tabs {
    MEMBERS,
    DMS
}

enum Events {
    SELECT
}

const Store = createStore({
    initialState: {tab: Tabs.MEMBERS},
    handler(event, state) {
        switch (event.type) {
            case Events.SELECT: {
                if (!Tabs[event.id]) return false;

                state.tab = event.id;

                return state;
            }
        }
    }
});

type ValueOf<T> = T[keyof T];

export function renderList({tab, MemberList, memberListProps}) {
    switch (tab) {
        case Tabs.MEMBERS: return (
            <MemberList {...memberListProps} __IS_PLUGIN key="MEMBERS" />
        );

        case Tabs.DMS: return (
            <PrivateChannels key="DMS" />
        );

        default: return <p>Uh.</p>;
    }
}

export default function ChannelMembers({original: MemberList, memberListProps}) {
    const tab = Store.useStore(s => s.tab);

    const handleSelect = function (id: ValueOf<typeof Tabs>) {
        Store.dispatch({
            type: Events.SELECT,
            id: id
        });
    }
    
    return (
        <div className={styles.wrap}>
            <TabBar.Header className={Utilities.className(styles.header, TabBar.Types.TOP_PILL)} key="TAB_BAR">
                <TabBar.Item
                    selectedItem={tab}
                    id={Tabs.MEMBERS}
                    type={TabBar.Types.TOP}
                    onClick={handleSelect.bind(null, Tabs.MEMBERS)}
                >Members</TabBar.Item>
                <TabBar.Item
                    selectedItem={tab}
                    id={Tabs.DMS}
                    onClick={handleSelect.bind(null, Tabs.DMS)}
                >DMs</TabBar.Item>
            </TabBar.Header>
            {renderList({
                tab: tab,
                memberListProps: memberListProps,
                MemberList: MemberList
            })}
        </div>
    );
}