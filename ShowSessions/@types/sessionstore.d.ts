export type Session = {
    sessionId: string;
    activities: any[],
    active: boolean;
    status: "idle" | "dnd" | "online";
    clientInfo: {
        os: string;
        client: string;
    };
};

type SessionsStore = {
    getSessions: () => Session[];
    getSessionById: (id: string) => Session;
    addChangeListener: (listener: () => void | Function) => void;
    removeChangeListener: (listener: () => void | Function) => void;
};

export default SessionsStore;