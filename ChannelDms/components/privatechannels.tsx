import {WebpackModules, Components, Logger} from "@zlibrary";
import {useCallback} from "react";
import ChannelInfoContext from "./context";
import createStore from "common/hooks/zustand";
import React from "react";

const PrivateChannelsConnected = WebpackModules.getByDisplayName("PrivateChannelsConnected");
const [useChannelStore, Api] = createStore({shouldShow: true, selectedChannelId: ""});

const original = Symbol("original");

function NestedPrivateChannels(props) {
    const res = props[original](props);

    try {
        const items = res?.props?.children?.[1]?.props?.children;

        if (Array.isArray(items)) {
            while (items.length) items.pop();
        }
    } catch (error) {
        Logger.error("Failed to patch NestedPrivateChannels:", error);
    }

    return res;
}

function PrivateChannelsPatched(props: any) {
    const ret = PrivateChannelsConnected(props);

    try {
        ret.props.showNitroTab = false;
        ret.props.showLibrary = false;
        ret.props.homeLink = "";
        ret.props[original] = ret.type;
        ret.type = NestedPrivateChannels;
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
