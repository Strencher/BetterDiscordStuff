import {useStateFromStores} from "@discord/flux";
import {Logger, Patcher, ReactComponents, Utilities, WebpackModules} from "@zlibrary";

export default async function patchRTCConnectionUsers() {
    return; // TODO: Fix this later.
    const VoiceStateStore = WebpackModules.getByProps("isSoundSharing", "isSpeaking");
    const RTCConnectionVoiceUsers = WebpackModules.getModule(m => m?.default?.displayName === "RTCConnectionVoiceUsers");

    function PatchedRTCUser(props) {
        const ret = props.__originalType(props);
        const isSpeaking = useStateFromStores([VoiceStateStore], () => VoiceStateStore.isSpeaking(props.user.id) || VoiceStateStore.isSoundSharing(props.user.id))
    
        try {
            const org = ret.props.children;
            ret.props.children = e => {
                const ret = org(e);
                try {
                    const org2 = ret.props.children;
                    ret.props.children = tooltipProps => {
                        const ret = org2(tooltipProps);
                        
                        // try {
                        //     const overlay = 
                        // } catch (error) {
                            
                        // }

                        return ret;
                    };
                } catch (error) {
                    Logger.error("Error in PatchedRTCUser:", error);
                }

                return ret;
            };
        } catch (error) {
            Logger.error("Error in PatchedRTCUser:", error);
        }

        return ret;
    }
    
    Patcher.after(RTCConnectionVoiceUsers, "default", (_, __, res) => {
        const list = Utilities.findInReactTree(res, e => e?.role === "group" && Array.isArray(e.children));
        if (!list) return;
        const users = list.children[0];
        if (!users?.length) return;

        for (const user of users) {
            if (typeof user?.type !== "function" || user.type === PatchedRTCUser) continue;
            const original = user.type;

            user.props.__originalType = original;
            user.type = PatchedRTCUser;
        }
    });
}