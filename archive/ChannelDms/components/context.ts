import React from "react";

const ChannelInfoContext = React.createContext<{
    shouldShow: boolean;
    selectedChannelId: string;
    setSelectedChannelId: Function;
}>({
    shouldShow: false, 
    selectedChannelId: "",
    setSelectedChannelId: () => {}
});

export default ChannelInfoContext;