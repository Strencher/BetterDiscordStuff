import type { Channel } from "@vencord/discord-types";

type ChatButtonsProps = {
    type: {
        analyticsName: string;
        attachments: boolean;
        autocomplete: {
            addReactionShortcut: boolean;
            forceChatLayer: boolean;
            reactions: boolean;
        };
        commands: {
            enabled: boolean;
        };
        confetti: {
            button: boolean;
        };
        drafts: {
            type: number;
            commandType: number;
            autoSave: boolean;
        };
        emojis: {
            button: boolean;
        };
        gifs: {
            button: boolean;
            allowSending: boolean;
        };
        gifts: {
            button: boolean;
        };
        permissions: {
            requireSendMessages: boolean;
        };
        showThreadPromptOnReply: boolean;
        stickers: {
            button: boolean;
            allowSending: boolean;
            autoSuggest: boolean;
        };
        soundmoji: {
            allowSending: boolean;
        };
        users: {
            allowMentioning: boolean;
        };
        submit: {
            button: boolean;
            ignorePreference: boolean;
            disableEnterToSubmit: boolean;
            clearOnSubmit: boolean;
            useDisabledStylesOnSubmit: boolean;
        };
        uploadLongMessages: boolean;
        upsellLongMessages: {
            iconOnly: boolean;
        };
        showCharacterCount: boolean;
        sedReplace: boolean;
        showSlowmodeIndicator: boolean;
        showTypingIndicator: boolean;
    };
    disabled: boolean;
    channel: Channel;
    isEmpty: boolean;
    showAllButtons: boolean;
    textValue?: string;
};

export type ChatButtonsArgs = [ChatButtonsProps, any];

export type ClassValue = string | number | null | undefined | ClassDictionary | ClassArray;

interface ClassDictionary {
    [key: string]: any;
}

interface ClassArray extends Array<ClassValue> {}
