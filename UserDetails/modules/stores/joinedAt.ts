import { GuildActions } from "@discord/actions";
import { Store } from "@discord/flux";
import { Dispatcher } from "@discord/modules";
import { Members } from "@discord/stores";
import { Logger } from "@discord/utils";

export type JoinedAtType = {
    data: string | Date;
    fetch: number;
    status: "failure" | "success";
};

export type MemberRequestResponse = {
    guildId: string;
    members: {
        deaf: boolean;
        hoist_role: null | string;
        joined_at: string;
        muted: boolean;
        roles: string[];
        user: UserObject
    }[];
    notFound: string[];
    type: "GUILD_MEMBERS_CHUNK"
};

const resolveId = function (guildId: string, userId: string) { return `${guildId}_${userId}`; }

const JoinedAtDates = new Map<string, JoinedAtType>(), fetchingQueue = new Set<string>();
let stopped = false;

const handleGuildMembersChunk = function (data: MemberRequestResponse) {
    if (stopped || !data || !Array.isArray(data.members)) return;

    if (data.notFound?.length) {
        for (let i = 0; i < data.notFound.length; i++) {
            const userId = data.notFound[i];

            fetchingQueue.delete(userId);
            JoinedAtDates.set(resolveId(data.guildId, data.notFound[i]), {
                data: "MEMBER_WAS_NOT_FOUND",
                fetch: Date.now(),
                status: "failure"
            });
        }
    }

    for (let i = 0; i < data.members.length; i++) {
        const member = data.members[i];
        if (!member || !member.user) continue;

        fetchingQueue.delete(member.user.id);
        JoinedAtDates.set(resolveId(data.guildId, member.user.id), {
            data: new Date(member.joined_at),
            fetch: Date.now(),
            status: "success"
        });
    }
};

class JoinedAtStore extends Store {
    public get fetching(): Set<string> { return fetchingQueue;}
    private readonly logger: Logger = new Logger("JoinedAtStore");

    public getState(): Map<string, JoinedAtType> { return JoinedAtDates; }

    public clear(): void {
        JoinedAtDates.clear();
        fetchingQueue.clear();
    }

    public has(guildId: string, userId: string): boolean { return this.getDate(guildId, userId) !== null && JoinedAtDates.has(resolveId(guildId, userId)); }
    
    public isFetching(guildId: string, userId: string): boolean {
        return fetchingQueue.has(resolveId(guildId, userId));
    }

    public getDate(guildId: string, userId: string): JoinedAtType {
        const data = JoinedAtDates.get(resolveId(guildId, userId));
        if (!data || Date.now() - data.fetch > 600000) return null;

        return data;
    }

    public destroy() {
        stopped = true;
    }

    public async fetch(guildId: string, userId: string): Promise<void> {
        const id = resolveId(guildId, userId);
        if (fetchingQueue.has(id)) return;
        fetchingQueue.add(id);

        if (Members.getMember(guildId, userId)) {
            fetchingQueue.delete(id);
            JoinedAtDates.set(id, {
                data: new Date(Members.getMember(guildId, userId).joinedAt),
                fetch: Date.now(),
                status: "success"
            });

            return this.emitChange();
        }

        setTimeout(() => {
            if (this.has(guildId, userId)) return;

            JoinedAtDates.set(id, {
                data: "FAILED_TO_FETCH",
                fetch: Date.now(),
                status: "failure"
            });

            this.logger.error("Request timed out, didn't got a response after 1 minute.")
        }, 6 * 10000);

        GuildActions.requestMembersById(guildId, userId);
    }
};

const JoinedAt: JoinedAtStore = new JoinedAtStore(Dispatcher, {
    // @ts-ignore
    ["GUILD_MEMBERS_CHUNK"]: handleGuildMembersChunk
});

export default JoinedAt;