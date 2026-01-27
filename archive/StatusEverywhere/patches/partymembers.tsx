import {Patcher, ReactComponents, WebpackModules} from "@zlibrary";
import StatusAvatar from "../components/avatar";
import _ from "lodash";

export default async function patchPartyMembers() {
    const classes = {
        ...Object(WebpackModules.getByProps("partyMember")),
        ...Object(WebpackModules.getByProps("container", "activity", "partyAvatar"))
    };
    const selector = "." + Object.values<string>(_.pick(classes, ["partyMember", "partyAvatar"]))
        .map(e => e.split(" ").join("."))
        .join(", .");
    const VoiceUserSummaryItem = WebpackModules.getByDisplayName("VoiceUserSummaryItem");
    const UserSummaryItem = WebpackModules.getByDisplayName("UserSummaryItem");
    const PartyMember = await ReactComponents.getComponentByName("PartyMember", selector);
    
    Patcher.before(VoiceUserSummaryItem.prototype, "render", _this => {
        if (_this.props.__patched) return;
        _this.props.__patched = true;

        const original = _this.props.renderUser;

        _this.props.renderUser = (props: any, ...args: any[]) => {
            const user: UserObject | void = props?.user ?? props;
            const ret = original ? original.apply(null, [props].concat(args)) : null;
            if (!user) return ret;

            return (
                <StatusAvatar
                    {...props}
                    user={user}
                    shouldWatch={false}
                    size={_this.props.size ?? StatusAvatar.Sizes.SIZE_16}
                    showTyping={{ id: "showChatTyping", value: true }}
                    radial={{ id: "chatRadialStatus", value: false }}
                    shouldShowUserPopout
                />
            );
        };
    });

    Patcher.after(PartyMember.component.prototype, "render", (_this, _, ret) => {
        const { member: { user } } = _this.props;
        
        ret.props.children = (props: JSX.IntrinsicAttributes) => (
            <StatusAvatar
                {...props}
                user={user}
                shouldWatch={false}
                size={StatusAvatar.Sizes.SIZE_16}
                showTyping={{id: "showChatTyping", value: true}}
                radial={{ id: "chatRadialStatus", value: false }}
                shouldShowUserPopout
            />
        );
    });

    Patcher.after(UserSummaryItem.prototype, "renderUsers", _this => {
        return _this.props.users.map((user: UserObject) => (
            <StatusAvatar
                user={user}
                className="avatarContainer-3CQrif"
                type="voice-user"
                size={StatusAvatar.Sizes.SIZE_24}
                showTyping={{id: "showVoiceChatTyping", value: true}}
                resolution={{id: "voiceChatAvatarResolution", value: 56}}
            />
        ));
    });

    PartyMember.forceUpdateAll();
}