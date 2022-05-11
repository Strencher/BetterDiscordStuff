import {Patcher, ReactComponents, WebpackModules} from "@zlibrary";
import React from "react";
import StatusAvatar from "../components/avatar";
import settings from "../components/settings.json";

export default async function patchMemberListItem(_, promises: { cancelled: boolean, cancel(): void }): Promise<void> {
    const classes = WebpackModules.getByProps("avatarDecorationPadding", "member");
    const MemberListItem = await ReactComponents.getComponentByName("MemberListItem", `.${classes.member}`);
    
    if (promises.cancelled) return;

    Patcher.after(MemberListItem.component.prototype, "renderAvatar", _this => {
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

    MemberListItem.forceUpdateAll();
}