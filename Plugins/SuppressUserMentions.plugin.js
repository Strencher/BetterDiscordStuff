//META{"name":"SuppressUserMentions","website":"https://metalloriff.github.io/toms-discord-stuff/","source":"https://github.com/Metalloriff/BetterDiscordPlugins/blob/master/SuppressUserMentions.plugin.js"}*//

class SuppressUserMentions {

	getName() { return "SuppressUserMentions"; }
	getDescription() { return "Allows you to suppress mentions from specified users without blocking them."; }
	getVersion() { return "0.0.1"; }
	getAuthor() { return "Metalloriff"; }
	getChanges() {
		return {

		};
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

	get settingFields() {
		return {
			suppressedUsers: { title: "Suppressed user IDs", description: "You can also add and remove suppressed users from the context menu", type: "string", array: true }
		};
	}

	get defaultSettings() {
		return {
			displayUpdateNotes: true,
			suppressedUsers: ["454465635972284428"]
		};
	}

	getSettingsPanel() {
		return NeatoLib.Settings.createPanel(this);
	}

	saveSettings() {
		NeatoLib.Settings.save(this);
	}

	onLibLoaded() {
		this.settings = NeatoLib.Settings.load(this);

		NeatoLib.Updates.check(this);

		//if (this.settings.displayUpdateNotes) NeatoLib.Changelog.compareVersions(this.getName(), this.getChanges());

		this.unpatch = NeatoLib.monkeyPatchInternal(NeatoLib.Modules.get("isMentioned"), "isMentioned", e => {
			if (this.settings.suppressedUsers.includes(e.args[0].author.id)) return false;
			else return e.callDefault();
		});

		document.addEventListener("contextmenu", this.contextEvent = e => this.onContextMenu(e));

		NeatoLib.Events.onPluginLoaded(this);
	}

	onContextMenu(e) {
		if (!e.target.className.includes("username") && !e.target.className.includes("large")) return;

		const uid = NeatoLib.ReactData.getProp(NeatoLib.DOM.searchForParentElementByClassName(e.target, NeatoLib.getClass("containerCozy", "container")), "messages.0.author.id");
		if (!uid) return;

		const contextMenu = NeatoLib.ContextMenu.get();
		if (!contextMenu) return;

		contextMenu.insertAdjacentElement("afterBegin", NeatoLib.ContextMenu.createGroup([
			!this.settings.suppressedUsers.includes(uid) ? NeatoLib.ContextMenu.createItem("Suppress User Mentions", () => {
				this.settings.suppressedUsers.push(uid);
				this.saveSettings();
				NeatoLib.ContextMenu.close();
			}) :
			NeatoLib.ContextMenu.createItem("Unsuppress User Mentions", () => {
				this.settings.suppressedUsers.splice(this.settings.suppressedUsers.indexOf(uid), 1);
				this.saveSettings();
				NeatoLib.ContextMenu.close();
			})
		]));
	}

	stop() {
		this.unpatch();
		document.removeEventListener("contextmenu", this.contextEvent);
	}

}
