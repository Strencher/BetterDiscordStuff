import {Endpoints} from "@discord/constants";
import {Store} from "@discord/flux";
import {Dispatcher} from "@discord/modules";
import {stringify} from "@discord/sanitize";
import {APIModule} from "@zlibrary/discord";

export type LastMessage = {
    fetch: number,
    channelId: string;
    date: Date,
    messageId: string;
};

export type SearchResult = {
    hit: boolean;
    id: string;
    author: {
        id: string;
    },
    timestamp: string;
    channel_id: string;
};

type ApiResponse = {
    body: {
        messages: Array<Array<SearchResult>>;
    }
}

function resolveId(...args: any[]): string {
    return args.join("_");
}

const fetchingQueue = new Set<string>(), lastMessages = new Map<string, LastMessage>();

function handleMessageCreate({message, channelId}: {message: SearchResult, channelId: string}) {
    lastMessages.set(resolveId(message.author.id, channelId), {
        channelId: channelId,
        messageId: message.id,
        date: new Date(message.timestamp),
        fetch: Date.now()
    });

    LastMessage.emitChange();
}

function handleMessageDelete({messageId, channelId}) {
    for (const [userId, result] of lastMessages) {
        if (result.messageId !== messageId || result.channelId !== channelId) continue;

        lastMessages.delete(resolveId(userId, channelId));
        LastMessage.emitChange();
    }
}

class LastMessageStore extends Store {
    public paused = false;
    get _users() {return lastMessages;}
    isFetching(userId: string) {return fetchingQueue.has(userId);}

    get(userId: string, channelId: string): LastMessage {
        const cached = lastMessages.get(resolveId(userId, channelId));
        if (!cached || Date.now() - cached.fetch > 600000) return null;

        return cached;
    }

    has(userId: string, channelId: string): boolean {
        return lastMessages.has(resolveId(userId, channelId));
    }

    fetch(userId: string, roomId: string, isGuild = false): Promise<void> {
        const id = resolveId(userId, roomId);
        if (fetchingQueue.has(id) || this.paused) return Promise.resolve();
        fetchingQueue.add(id);
        return new Promise<void>((resolve, reject) => {
            APIModule.get({
                url: isGuild ? Endpoints.SEARCH_GUILD(roomId) : Endpoints.SEARCH_CHANNEL(roomId),
                query: stringify({author_id: userId})
            }).then((data: ApiResponse) => {
                fetchingQueue.delete(id);
                if (data?.body?.messages?.length) {
                    const message = data.body.messages[0].find((result: SearchResult) => result.hit && result.author.id === userId);
                    if (message) {
                        lastMessages.set(id, {
                            date: new Date(message.timestamp),
                            fetch: Date.now(),
                            channelId: message.channel_id,
                            messageId: message.id
                        });
                        this.emitChange();
                    }
                }
                resolve();
            }).catch(error => {
                if (error.status === 429) {
                    this.paused = true;
                    setTimeout(() => {
                        this.paused = false;
                        this.fetch(userId, roomId, isGuild).then(resolve).catch(reject);
                    }, error.body.retry_after + 1000);
                } else {
                    reject(error);
                }
                fetchingQueue.delete(id);
            });
        });
    }
}

const LastMessage = new LastMessageStore(Dispatcher, {
    MESSAGE_CREATE: handleMessageCreate,
    MESSAGE_DELETE: handleMessageDelete
});

export default LastMessage;