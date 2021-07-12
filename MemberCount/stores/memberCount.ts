import { Store } from "@discord/flux";
import { Dispatcher } from "@discord/modules";
import { WebpackModules } from "@zlibrary";

const onlineMembers = new Map<string, number>();
const OriginalStore = WebpackModules.getByProps("getMemberCount");

function handleMemberListUpdate({ guildId, groups }) {
    if (MemberCountStore._destroyed) return;
    const onlineCount = groups.reduce((total, group) => {
        if (group.id === "offline") return total;
        return total += group.count;
    }, 0);

    onlineMembers.set(guildId, onlineCount);
    MemberCountStore.emitChange();
};

const MemberCountStore = new class MemberCountStore extends Store {
    _destroyed: boolean;
    getState() { return onlineMembers; }

    getMemberCount(guildId: string): number { return OriginalStore.getMemberCount(guildId) ?? 0; }
    getOnlineMemberCount(guildId: string): number { return onlineMembers.get(guildId) ?? 0; }

    destroy() {
        this._destroyed = true;
        Dispatcher.unsubscribe("GUILD_MEMBER_LIST_UPDATE", handleMemberListUpdate);
    }

    constructor() {
        super(Dispatcher, {
            GUILD_MEMBER_LIST_UPDATE: handleMemberListUpdate
        });
    }
};

export default MemberCountStore;