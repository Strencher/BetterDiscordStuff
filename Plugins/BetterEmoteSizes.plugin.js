//META{"name":"BetterEmoteSizes","website":"https://metalloriff.github.io/toms-discord-stuff/","source":"https://github.com/Metalloriff/BetterDiscordPlugins/blob/master/BetterEmoteSizes.plugin.js"}*//

class BetterEmoteSizes {

	getName() { return "Emote Zoom"; }
	getDescription() { return "Increases the size of emojis, emotes, and reactions upon hovering over them and allows you to change their default sizes."; }
	getVersion() { return "2.4.13"; }
	getAuthor() { return "Metalloriff"; }

	get settingFields() {
		return {
			alterSmall: { label: "Affect small emojis", type: "bool" },
			smallSize: { label: "Default small emoji size (px)", type: "number" },
			alterLarge: { label: "Affect large emojis", type: "bool" },
			largeSize: { label: "Default large emoji size (px)", type: "number" },
			alterBD: { label: "Affect small BetterDiscord emotes", type: "bool" },
			bdSize: { label: "Default small BetterDiscord emote size (px)", type: "number" },
			alterLargeBD: { label: "Affect large BetterDiscord emotes", type: "bool" },
			largeBdSize: { label: "Default large BetterDiscord emote size (px)", type: "number" },
			alterReactions: { label: "Affect reactions", type: "bool" },
			reactionSize: { label: "Default reaction size (px)", type: "number" },
			hoverSize: { label: "Emoji and BetterDiscord emote hover size multiplier", type: "number" },
			reactionHoverSize: { label: "Reaction hover size multiplier", type: "number" },
			transitionSpeed: { label: "Transition speed (seconds)", type: "number" },
			equal: { label: "Small and large emote zoom to equal", type: "bool" }
		};
	}

	get defaultSettings() {
		return {
			displayUpdateNotes: true,
			alterSmall: true,
			smallSize: 22,
			alterLarge: true,
			largeSize: 32,
			alterBD: true,
			bdSize: 28,
			alterLargeBD: true,
			largeBdSize: 32,
			alterReactions: true,
			reactionSize: 16,
			hoverSize: 3,
			transitionSpeed: 0.5,
			reactionHoverSize: 2,
			equal: false
		};
	}

	getSettingsPanel() {
		return NeatoLib.Settings.createPanel(this);
	}

	saveSettings() {
		NeatoLib.Settings.save(this);
		this.update();
	}

	load() {}

	start() {
		const libLoadedEvent = () => {
			try{ this.onLibLoaded(); }
			catch(err) { console.error(this.getName(), "fatal error, plugin could not be started!", err); try { this.stop(); } catch(err) { console.error(this.getName() + ".stop()", err); } }
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

	onLibLoaded() {
		this.settings = NeatoLib.Settings.load(this);

		NeatoLib.Updates.check(this, "https://raw.githubusercontent.com/Metalloriff/BetterDiscordPlugins/master/BetterEmoteSizes.plugin.js");

		if (!NeatoLib.hasRequiredLibVersion(this, "0.7.19")) return;

		this.update();

		NeatoLib.Events.onPluginLoaded(this);
	}

	update() {
		const markup = NeatoLib.getClass("markup"), messageGroup = NeatoLib.getClass("containerCozyBounded", "container"), message = NeatoLib.getClass("messageCozy", "message"), reaction = NeatoLib.getClass("reaction"), 		reactionMe = NeatoLib.getClass("reactionMe");

		if (this.style) this.style.destroy();
		this.style = NeatoLib.injectCSS(`.${messageGroup} { overflow: visible; }`);

		if (this.settings.alterSmall) {
			this.style.append(`
				#app-mount .${markup} > .emoji:not(.jumboable) {
					height: ${this.settings.smallSize}px;
					width: auto;
					transform: scale(1);
					transition: transform ${this.settings.transitionSpeed}s;
				}
				#app-mount .${markup} > .emoji:not(.jumboable):hover {
					transform: scale(${this.settings.equal ? ((this.settings.largeSize / this.settings.smallSize) * this.settings.hoverSize) : this.settings.hoverSize});
					position: relative;
					z-index: 1;
				}
				#app-mount .${messageGroup}:last-child .${message}:nth-last-child(2) .${markup} .emoji:not(.jumboable):hover {
					transform: scale(${this.settings.equal ? ((this.settings.largeSize / this.settings.smallSize) * this.settings.hoverSize) : this.settings.hoverSize}) translateY(-35%);
				}
			`);
		}

		if (this.settings.alterLarge) {
			this.style.append(`
				#app-mount .${markup} > .emoji.jumboable {
					height: ${this.settings.largeSize}px;
					width: auto;
					transform: scale(1);
					transition: transform ${this.settings.transitionSpeed}s;
				}
				#app-mount .${markup} > .emoji.jumboable:hover {
					transform: scale(${this.settings.hoverSize});
					position: relative;
					z-index: 1;
				}
				#app-mount .${messageGroup}:last-child .${message}:nth-last-child(2) .${markup} .emoji.jumboable:hover {
					transform: scale(${this.settings.hoverSize}) translateY(-35%);
				}
			`);
		}

		if (this.settings.alterBD) {
			this.style.append(`
				#app-mount .emote:not(.jumboable) {
					height: ${this.settings.bdSize}px;
					width: auto;
					max-height: ${this.settings.bdSize}px !important;
					transform: scale(1);
					transition: transform ${this.settings.transitionSpeed}s;
				}
				#app-mount .emote:not(.emoteshake):not(.emoteshake2):not(.emoteshake3):not(.jumboable):hover {
					transform: scale(${this.settings.hoverSize});
					position: relative;
					z-index: 1;
				}
				#app-mount .${messageGroup}:last-child .${message}:nth-last-child(2) .emote:not(.emoteshake):not(.emoteshake2):not(.emoteshake3):not(.jumboable):hover {
					transform: scale(${this.settings.hoverSize}) translateY(-35%);
				}
			`);
		}

		if (this.settings.alterLargeBD) {
			this.style.append(`
				#app-mount .emote.jumboable {
					height: ${this.settings.largeBdSize}px;
					width: auto;
					max-height: ${this.settings.largeBdSize}px !important;
					transform: scale(1);
					transition: transform ${this.settings.transitionSpeed}s;
				}
				#app-mount .emote.jumboable:not(.emoteshake):not(.emoteshake2):not(.emoteshake3):hover {
					transform: scale(${this.settings.hoverSize});
					position: relative;
					z-index: 1;
				}
				#app-mount .${messageGroup}:last-child .${message}:nth-last-child(2) .emote.jumboable:not(.emoteshake2):not(.emoteshake3):hover {
					transform: scale(${this.settings.hoverSize}) translateY(-35%);
				}
			`);
		}

		if (this.settings.alterReactions) {
			this.style.append(`
				#app-mount .${reaction} .emoji, .${reaction}.${reactionMe} .emoji {
					height: ${this.settings.reactionSize}px;
					width: auto;
				}
				#app-mount .${reaction} {
					transition: transform ${this.settings.transitionSpeed}s;
				}
				#app-mount .${reaction}:hover {
					transform: scale(${this.settings.reactionHoverSize}) !important;
					z-index: 1000;
				}
			`);
		}
	}

	stop() {
		if (this.style) this.style.destroy();
	}

}
