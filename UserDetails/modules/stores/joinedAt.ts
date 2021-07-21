import { GuildActions } from "@discord/actions";
import { Store } from "@discord/flux";
import { Dispatcher } from "@discord/modules";
import { Members, Users } from "@discord/stores";
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
    }[]
    notFound: string[];
    type: "GUILD_MEMBERS_CHUNK"
};

const JoinedAtDates = new Map<string, JoinedAtType>(), fetchingQueue = new Set<string>();

const JoinedAt = new class JoinedAt extends Store {
    resolveId(...args: string[]) { return args.join("_"); }
    get fetching(): Set<string> { return fetchingQueue;}
    logger: Logger = new Logger("JoinedAtStore");

    constructor() {
        super(Dispatcher, {});
    }

    getState(): Map<string, JoinedAtType> { return JoinedAtDates; }

    has(guildId: string, userId: string): boolean { return this.getDate(guildId, userId) !== null && JoinedAtDates.has(this.resolveId(guildId, userId)); }
    
    isFetching(guildId: string, userId: string): boolean {
        return fetchingQueue.has(this.resolveId(guildId, userId));
    }

    getDate(guildId: string, userId: string): JoinedAtType {
        const data = JoinedAtDates.get(this.resolveId(guildId, userId));
        if (!data || Date.now() - data.fetch > 600000) return null;

        return data;
    }

    registerCallback(guildId: string, userId: string, callback: (data: MemberRequestResponse) => void) {
        const handleCallback = (data: MemberRequestResponse) => {
            if (data.guildId !== guildId) return;

            callback(data);

            Dispatcher.unsubscribe("GUILD_MEMBERS_CHUNK", handleCallback);
        };

        // @ts-ignore
        Dispatcher.subscribe("GUILD_MEMBERS_CHUNK", handleCallback);
    }

    setFailed(id: string, reason: string): void {
        fetchingQueue.delete(id);

        JoinedAtDates.set(id, {
            data: reason,
            fetch: Date.now(),
            status: "failure"
        });
        this.emitChange();
    }

    async fetch(guildId: string, userId: string): Promise<void> {
        const id = this.resolveId(guildId, userId);
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

        const timeout = setTimeout(() => {
            this.setFailed(id, "FAILED_TO_FETCH");
            this.logger.error("Request timed out, didn't got a response after 1 minute.")
        }, 6 * 10000);
        this.registerCallback(guildId, userId, data => {
            if (data.notFound.indexOf(userId) > -1) {
                this.setFailed(id, "MEMBER_WAS_NOT_FOUND");
            } else {
                const member = data.members.find(e => e?.user?.id === userId);
                if (member) { // double check because discord :poop:
                    JoinedAtDates.set(id, {
                        data: new Date(member.joined_at),
                        fetch: Date.now(),
                        status: "success"
                    });
                } else {
                    this.setFailed(id, "MEMBER_WAS_NOT_FOUND");
                    this.logger.info(`Member ${userId} of guild ${guildId} was not found!`);
                }
            }

            fetchingQueue.delete(id);
            clearTimeout(timeout);
            this.emitChange();
        });
        GuildActions.requestMembersById(guildId, userId);
    }
};

export default JoinedAt;