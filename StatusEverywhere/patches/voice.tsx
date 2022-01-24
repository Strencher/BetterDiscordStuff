import {Patcher, WebpackModules} from "@zlibrary";
import StatusAvatar from "../components/avatar";
import settings from "../components/settings.json";

export default function patchVoiceUser(): void {
    const VoiceUser = WebpackModules.getByDisplayName("VoiceUser");
    const classes = WebpackModules.getByProps("avatarContainer", "avatarSmall");
    const classNames = ["avatarContainer", "avatarSmall", "avatar"].map(cl => classes[cl]).join(" ");
    
    type VoiceUserProps = {
        speaking: boolean;
        user: UserObject;
    };

    Patcher.after(VoiceUser.prototype, "renderAvatar", (_this: {props: VoiceUserProps}) => {
        return (
            <StatusAvatar
                {..._this.props}
                className={classNames}
                isSpeaking={_this.props.speaking}
                type="voice-user"
                size={StatusAvatar.Sizes.SIZE_24}
                showTyping={{id: "showVoiceChatTyping", value: true}}
                resolution={{id: "voiceChatAvatarResolution", value: settings.voice_chat.voiceChatAvatarResolution.value}}
            />
        );
    });
}