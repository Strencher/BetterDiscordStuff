//META{"name":"DoubleClickVoiceChannels","website":"https://metalloriff.github.io/toms-discord-stuff/","source":"https://github.com/Metalloriff/BetterDiscordPlugins/blob/master/DoubleClickVoiceChannels.plugin.js"}*//

class DoubleClickVoiceChannels {

	getName() { return "DoubleClickVoiceChannels"; }
	getDescription() { return "Requires you to double click voice channels to connect to them."; }
	getVersion() { return "0.0.2"; }
	getAuthor() { return "Metalloriff"; }
	getChanges() {
		return {

		};
	}

	load() {}

	start() {
		let libLoadedEvent = () => {
			try { this.onLibLoaded(); }
			catch (err) { console.error(this.getName(), "fatal error, plugin could not be started!", err); try { this.stop(); } catch (err) { console.error(this.getName() + ".stop()", err); }}
		};

		let lib = document.getElementById("NeatoBurritoLibrary");
		if (!lib) {
			lib = document.createElement("script");
			lib.id = "NeatoBurritoLibrary";
			lib.type = "text/javascript";
			lib.src = "https://rawgit.com/Metalloriff/BetterDiscordPlugins/master/Lib/NeatoBurritoLibrary.js";
			document.head.appendChild(lib);
		}
		this.forceLoadTimeout = setTimeout(libLoadedEvent, 30000);
		if (typeof window.NeatoLib !== "undefined") libLoadedEvent();
		else lib.addEventListener("load", libLoadedEvent);
	}

	getSettingsPanel() {
		setTimeout(() => {
			NeatoLib.Settings.pushElement(NeatoLib.Settings.Elements.createNewTextField("Double click time (ms)", this.settings.delay, e => {
				if (isNaN(e.target.value)) return NeatoLib.showToast("Value must be a number", "error");
				this.settings.delay = e.target.value;
				this.saveSettings();
			}), this.getName(), { tooltip: "The amount of time in milliseconds to wait for the next click" })

			NeatoLib.Settings.pushChangelogElements(this);
		}, 0);

		return NeatoLib.Settings.Elements.pluginNameLabel(this.getName());
	}

	saveSettings() { NeatoLib.Settings.save(this); }

	onLibLoaded() {
		this.settings = NeatoLib.Settings.load(this, {
			displayUpdateNotes: true,
			delay: 250
		});

		NeatoLib.Updates.check(this);

		//if (this.settings.displayUpdateNotes) NeatoLib.Changelog.compareVersions(this.getName(), this.getChanges());

		let lastAttempt = 0;

		this.unpatchSelect = NeatoLib.monkeyPatchInternal(NeatoLib.Modules.get("selectChannel"), "selectVoiceChannel", e => {
			if (performance.now() - lastAttempt <= this.settings.delay || e.args[0] == null) {
				e.callDefault();
				lastAttempt = 0;
			} else lastAttempt = performance.now();
		});

		NeatoLib.Events.onPluginLoaded(this);
	}

	stop() {
		this.unpatchSelect();
	}

}
