//META{"name":"NateUtilities"}*//

class NateUtilities {
	
    getName() { return "NateUtilities"; }
    getDescription() { return "For all of your ear and brain saving needs! If you don't know what this plugin is, it's not for you, just ignore it."; }
    getVersion() { return "0.0.2"; }
	getAuthor() { return "Metalloriff"; }
	getChanges() {
		return {
			
		};
	}

    load() {}

    start() {

        let libLoadedEvent = () => {
            try{ this.onLibLoaded(); }
            catch(err) { console.error(this.getName(), "fatal error, plugin could not be started!", err); }
        };

		let lib = document.getElementById("NeatoBurritoLibrary");
		if(lib == undefined) {
			lib = document.createElement("script");
			lib.setAttribute("id", "NeatoBurritoLibrary");
			lib.setAttribute("type", "text/javascript");
			lib.setAttribute("src", "https://rawgit.com/NeatoLib/BetterDiscordPlugins/master/Lib/NeatoBurritoLibrary.js");
			document.head.appendChild(lib);
		}
        if(typeof window.NeatoLib !== "undefined") libLoadedEvent();
        else lib.addEventListener("load", libLoadedEvent);

	}

	getSettingsPanel() {

		setTimeout(() => {

            NeatoLib.Settings.pushElement(NeatoLib.Settings.Elements.createKeybindInput("local mute nate", this.settings.muteHotkey, newKey => {
                this.unregisterKeybinds();
                if(newKey) {
                    this.settings.muteHotkey = newKey;
                    this.registerKeybinds();
                    this.saveSettings();
                } else PluginUtilities.showToast("You did not input anything!", { type : "error" });
            }, { description : "For when your ears and/or brain need a break.", global : true }), this.getName());

            NeatoLib.Settings.pushElement(NeatoLib.Settings.Elements.createKeybindInput("server mute nate", this.settings.serverMuteHotkey, newKey => {
                this.unregisterKeybinds();
                if(newKey) {
                    this.settings.serverMuteHotkey = newKey;
                    this.registerKeybinds();
                    this.saveSettings();
                } else PluginUtilities.showToast("You did not input anything!", { type : "error" });
            }, { description : "For when you feel like being a hero.", global : true }), this.getName());

            NeatoLib.Settings.pushElement(NeatoLib.Settings.Elements.createKeybindInput("server deafen nate", this.settings.serverDeafenHotkey, newKey => {
                this.unregisterKeybinds();
                if(newKey) {
                    this.settings.serverDeafenHotkey = newKey;
                    this.registerKeybinds();
                    this.saveSettings();
                } else PluginUtilities.showToast("You did not input anything!", { type : "error" });
            }, { description : "For when you need to talk behind Nate's back.", global : true }), this.getName());

            NeatoLib.Settings.pushChangelogElements(this);

		}, 0);

		return NeatoLib.Settings.Elements.pluginNameLabel(this.getName());
		
	}

	saveSettings() {
		NeatoLib.Settings.save(this);		
	}

	onLibLoaded() {

		NeatoLib.Updates.check(this);
		
		this.settings = NeatoLib.Settings.load(this, {
            displayUpdateNotes : true,
            muteHotkey : "Alt + N",
            serverMuteHotkey : "Shift + Alt + N",
            serverDeafenHotkey : "Control + Alt + N"
		});

        NeatoLib.Events.onPluginLoaded(this);
		
        //if(this.settings.displayUpdateNotes) NeatoLib.Changelog.compareVersions(this.getName(), this.getChanges());
        
        this.registerKeybinds();

        this.initialized = true;

        this.onSwitch();

    }
    
    onSwitch() {

        if(!this.initialized) return;

        this.selectedServer = NeatoLib.getSelectedTextChannel();
        this.selectedVoiceChannel = NeatoLib.getSelectedVoiceChannel();

    }
    
    registerKeybinds() {

        let nate = "209024642697003008",
        toggleLocalMute = NeatoLib.Modules.get("toggleLocalMute").toggleLocalMute,
        isLocalMuted = NeatoLib.Modules.get("isLocalMute").isLocalMute,
        serverActionModule = NeatoLib.Modules.get(["setServerMute", "setServerDeaf"]),
        getVoiceStates = NeatoLib.Modules.get("getVoiceStates").getVoiceStates;

        NeatoLib.Keybinds.registerGlobal(this.settings.muteHotkey, () => {
            toggleLocalMute(nate);
            if(isLocalMuted(nate)) NeatoLib.showToast("I got ya, fam!", "success");
            else NeatoLib.showToast("You're gonna regret that.", "error");
        });

        NeatoLib.Keybinds.registerGlobal(this.settings.serverMuteHotkey, () => {
            
            if(this.selectedServer && this.selectedVoiceChannel) {

                let voiceStates = getVoiceStates(this.selectedServer.id);

                if(voiceStates[nate] == undefined) {
                    NeatoLib.showToast("Nate is not here, you're safe!", "success");
                    return;
                }

                serverActionModule.setServerMute(this.selectedServer.id, nate, !voiceStates[nate].mute);

                if(!voiceStates[nate].mute) NeatoLib.showToast("You should be proud!", "success");
                else NeatoLib.showToast("Sick fuck!", "error");

            }

        });

        NeatoLib.Keybinds.registerGlobal(this.settings.serverDeafenHotkey, () => {

            if(this.selectedServer && this.selectedVoiceChannel) {

                let voiceStates = getVoiceStates(this.selectedServer.id);

                if(voiceStates[nate] == undefined) {
                    NeatoLib.showToast("Nate is not here, you're safe!", "success");
                    return;
                }

                serverActionModule.setServerDeaf(this.selectedServer.id, nate, !voiceStates[nate].deaf);

                if(!voiceStates[nate].deaf) NeatoLib.showToast("That Nate kid is an idiot.", "success");
                else NeatoLib.showToast("Shut up guys!", "error");

            }

        });

    }

    unregisterKeybinds() {
        NeatoLib.Keybinds.unregisterGlobal(this.settings.muteHotkey);
        NeatoLib.Keybinds.unregisterGlobal(this.settings.serverMuteHotkey);
        NeatoLib.Keybinds.unregisterGlobal(this.settings.serverDeafenHotkey);
    }
	
    stop() {
        this.unregisterKeybinds();
	}
	
}
