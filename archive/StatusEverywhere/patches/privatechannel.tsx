import {ChannelTypes} from "@discord/constants";
import {Patcher, WebpackModules} from "@zlibrary";
import StatusAvatar from "../components/avatar";
import settings from "../components/settings.json";

export default async function patchPrivateChannel(): Promise<void> {
    const PrivateChannel = WebpackModules.getByDisplayName("PrivateChannel");
    
    Patcher.after(PrivateChannel.prototype, "renderAvatar", (_this, _, res) => {
        if (_this.props.pinned || _this.props.channel.type === ChannelTypes.GROUP_DM) return;

        return (
            <StatusAvatar
                user={_this.props.user}
                shouldWatch={false}
                channel_id={_this.props.channel.id}
                type="direct-message"
                showTyping={{ id: "showDirectMessagesTyping", value: true }}
                radial={{id: "directMessagesRadialStatus", value: false}}
                resolution={{id: "dmAvatarResolution", value: settings.direct_messages.dmAvatarResolution.value}}
                size={StatusAvatar.Sizes.SIZE_32}
            />
        );
    });
}