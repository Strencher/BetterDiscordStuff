/// <reference path="../../../bdbuilder/typings/main.d.ts" />

import { Endpoints } from "@discord/constants";
import {Store} from "@discord/flux";
import { Messages } from "@discord/i18n";
import {Dispatcher} from "@discord/modules";
import {stringify} from "@discord/sanitize";
import {APIModule} from "@zlibrary/discord";

export type LastMessageResponse = {
    fetch: number,
    channelId: string;
    data: string | Date,
    messageId: string;
    status: "failure" | "success";
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

const fetchingQueue = new Set<string>(), lastMessages = new Map<string, LastMessageResponse>();

function handleMessageCreate({message, channelId}: {message: SearchResult, channelId: string}) {
    lastMessages.set(resolveId(message.author.id, channelId), {
        channelId: channelId,
        messageId: message.id,
        data: new Date(message.timestamp),
        fetch: Date.now(),
        status: "success"
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
    isFetching(userId: string, channelId: string) {return fetchingQueue.has(resolveId(userId, channelId));}

    get(userId: string, channelId: string): LastMessageResponse {
        const cached = lastMessages.get(resolveId(userId, channelId));
        if (!cached || Date.now() - cached.fetch > 600000) return null;

        return cached;
    }

    has(userId: string, channelId: string): boolean {
        return lastMessages.has(resolveId(userId, channelId));
    }

    fetch(userId: string, roomId: string, isGuild = false, attemp = 1): Promise<void> {
        const id = resolveId(userId, roomId);
        if (fetchingQueue.has(id) || this.paused) return Promise.resolve();
        if (attemp > 5) {
            fetchingQueue.delete(id);
            lastMessages.set(id, {
                channelId: roomId,
                data: "FAILED_TO_FETCH",
                fetch: Date.now(),
                messageId: null,
                status: "failure"
            });
            return Promise.resolve();
        }
        fetchingQueue.add(id);
        return new Promise<void>((resolve, reject) => {
            APIModule.get({
                url: isGuild ? Endpoints.SEARCH_GUILD(roomId) : Endpoints.SEARCH_CHANNEL(roomId),
                query: stringify({author_id: userId})
            }).then((data: ApiResponse) => {
                fetchingQueue.delete(id);
                let message: null | SearchResult = null;

                if (data?.body?.messages?.length) for (const result of data.body.messages[0]) {
                    if (result.hit && result.author.id === userId) {
                        message = result;
                        break;
                    }
                }
                if (message) {
                    lastMessages.set(id, {
                        data: new Date(message.timestamp),
                        fetch: Date.now(),
                        channelId: message.channel_id,
                        messageId: message.id,
                        status: "success"
                    });
                } else {
                    lastMessages.set(id, {
                        data: "FAILED_TO_FETCH",
                        fetch: Date.now(),
                        channelId: roomId,
                        messageId: null,
                        status: "failure"
                    });
                }
                
                this.emitChange();
                resolve();
            }).catch(error => {
                if (error.status === 429) {
                    this.paused = true;
                    setTimeout(() => {
                        this.paused = false;
                        this.fetch(userId, roomId, isGuild, attemp).then(resolve).catch(reject);
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