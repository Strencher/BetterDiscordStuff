import {Patcher, WebpackModules} from "@zlibrary";
import React from "react";
import StatusAvatar from "../components/avatar";
import settings from "../components/settings.json";

export default function patchMemberListItem(): void {
    const MemberListItem = WebpackModules.getByDisplayName("MemberListItem");
    
    Patcher.after(MemberListItem.prototype, "renderAvatar", _this => {
        return (
            <StatusAvatar
                {..._this.props}
                type="member-list"
                shouldWatch={false}
                animated={_this.state?.hovered || _this.props.selected}
                size={StatusAvatar.Sizes.SIZE_32}
                showTyping={{id: "showMemberlistTyping", value: true}}
                radial={{id: "memberlistRadialStatus", value: false}}
                resolution={{id: "memberListAvatarResolution", value: settings.member_list.memberListAvatarResolution.value}}
            />
        );
    });
}