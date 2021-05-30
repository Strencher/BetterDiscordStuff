export default {
    VOICE_STATES: {
        deaf: {
            setting: "serverDeaf",
            strings: ["Got Server undeafened", "Got Server deafened"],
            description: "Fires if someone got server deafened/undeafened."
        },
        mute: {
            setting: "serverMute",
            strings: ["Got Server unmuted", "Got Server muted"],
            description: "Fires if someone got server muted/unmuted."
        },
        selfDeaf: {
            setting: "selfDeaf",
            strings: ["Undeafened", "Deafened"],
            description: "Fires if someone deafen/undeafen oneself."
        },
        selfMute: {
            setting: "selfMute",
            strings: ["Unmuted self.", "Muted self."],
            description: "Fires if someone mutes/unmutes oneself."
        },
        selfStream: {
            setting: "selfStream",
            strings: ["Stopped streaming.", "Started streaming."],
            description: "Fires if someone stopps/startes streaming."
        },
        selfVideo: {
            setting: "selfVideo",
            strings: ["Stopped screenshare.", "Started screenshare."],
            description: "Fires if someone stopps/starts screensharing."
        }
    }
};