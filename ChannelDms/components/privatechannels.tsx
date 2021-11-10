import {WebpackModules, Components, Logger} from "@zlibrary";
import {useCallback} from "react";
import ChannelInfoContext from "./context";
import createStore from "common/hooks/zustand";

const PrivateChannelsConnected = WebpackModules.getByDisplayName("PrivateChannelsConnected");
const [useChannelStore, Api] = createStore({shouldShow: true, selectedChannelId: ""});

function PrivateChannelsPatched(props: any) {
    const ret = PrivateChannelsConnected(props);

    try {
        ret.props.showNitroTab = false;
        ret.props.showLibrary = false;
        ret.props.homeLink = null;
    } catch (error) {
        Logger.error(`Failed to set properties on PrivateChannels:`, error);
    }

    return ret;
};

export default function PrivateChannels() {
    const {selectedChannelId} = useChannelStore();

    const setSelectedChannelId = useCallback((id: string) => {
        Api.setState({selectedChannelId: id});
    }, [selectedChannelId]);

    return (
        <Components.ErrorBoundary>
            <ChannelInfoContext.Provider value={{shouldShow: true, selectedChannelId, setSelectedChannelId}}>
                <PrivateChannelsPatched /> 
            </ChannelInfoContext.Provider>
        </Components.ErrorBoundary>
    );
};