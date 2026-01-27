import {Patcher, Utilities, WebpackModules} from "@zlibrary";
import React from "react";
import StatusAvatar from "../components/avatar";
import settings from "../components/settings.json";

export default function patchChatAvatar(): void {
    const Patched = Symbol("__StatusEverywhere_patched__");
    const ChatMessage = WebpackModules.getModule(m => m?.default?.toString?.().indexOf("ANIMATE_CHAT_AVATAR") > -1);
    
    type PatchArgs = {
        user: UserObject,
        subscribeToGroupId: string;
        message: any;
    };
    
    Patcher.after(ChatMessage, "default", (_, [props]: PatchArgs[], res) => {
        const tree = Utilities.findInTree(res, e => e?.renderPopout);
        const user = props?.message?.author;
        const channel_id = props?.message?.channel_id;
        
        if (!user || !tree?.children || Patched in tree.children || (user.bot && user.discriminator === "0000")) return;
        
        tree.children = (_props) => {
            return (
                <StatusAvatar
                    {...props}
                    type="chat"
                    user={user}
                    channel_id={channel_id}
                    shouldShowUserPopout
                    showTyping={{ id: "showChatTyping", value: true }}
                    radial={{ id: "chatRadialStatus", value: false }}
                    size={StatusAvatar.Sizes.SIZE_40}
                    resolution={{id: "chatAvatarResolution", value: settings.chat.chatAvatarResolution.value}}
                />
            );
        };

        tree.children[Patched] = true;
    });
}