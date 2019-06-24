//META{"name":"CustomizableAvatarDPI","website":"https://github.com/Metalloriff/BetterDiscordPlugins/blob/master/README.md","source":"https://github.com/Metalloriff/BetterDiscordPlugins/blob/master/CustomizableAvatarDPI.plugin.js"}*//

class CustomizableAvatarDPI {
	
	getName() { return "Customizable Avatar DPI"; }
	getDescription() { return "Allows you to change the DPI of user avatars, to reduce bluriness with themes that increase the size of them."; }
	getVersion() { return "1.0.5"; }
	getAuthor() { return "Metalloriff"; }

	load() {}

	start() {

		let libLoadedEvent = () => {
			try{ this.onLibLoaded(); }
			catch(err) { console.error(this.getName(), "fatal error, plugin could not be started!", err); try { this.stop(); } catch(err) { console.error(this.getName() + ".stop()", err); } }
		};

		let lib = document.getElementById("NeatoBurritoLibrary");
		if(!lib) {
			lib = document.createElement("script");
			lib.id = "NeatoBurritoLibrary";
			lib.type = "text/javascript";
			lib.src = "https://rawgit.com/Metalloriff/BetterDiscordPlugins/master/Lib/NeatoBurritoLibrary.js";
			document.head.appendChild(lib);
		}
		this.forceLoadTimeout = setTimeout(libLoadedEvent, 30000);
		if(typeof window.NeatoLib !== "undefined") libLoadedEvent();
		else lib.addEventListener("load", libLoadedEvent);

	}

	saveSettings() {
		NeatoLib.Settings.save(this);
	}

	getSettingsPanel() {

		setTimeout(() => {

			NeatoLib.Settings.pushElement(NeatoLib.Settings.Elements.createNewTextField("Small avatar size", this.settings.smallAvatarSize, e => {
				this.settings.smallAvatarSize = e.target.value;
				this.saveSettings();
			}), this.getName(), { tooltip : "Member list, DM list, etc" });

			NeatoLib.Settings.pushElement(NeatoLib.Settings.Elements.createNewTextField("Large avatar size", this.settings.largeAvatarSize, e => {
				this.settings.largeAvatarSize = e.target.value;
				this.saveSettings();
			}), this.getName(), { tooltip : "Chat avatars" });

			NeatoLib.Settings.pushElement(NeatoLib.Settings.Elements.createNewTextField("Popout avatar size", this.settings.popoutAvatarSize, e => {
				this.settings.popoutAvatarSize = e.target.value;
				this.saveSettings();
			}), this.getName(), { tooltip : "User popouts" });
			
			NeatoLib.Settings.pushChangelogElements(this);

		}, 0);

		return NeatoLib.Settings.Elements.pluginNameLabel(this.getName());
		
	}
	
	onLibLoaded(){

		NeatoLib.Updates.check(this);

		this.settings = NeatoLib.Settings.load(this, {
			popoutAvatarSize : 1024,
			largeAvatarSize : 128,
			smallAvatarSize : 128,
			displayUpdateNotes : true
		});
		
		this.appObserver = new MutationObserver(m => {

			for(let i = 0; i < m.length; i++) {

				if(!m[i].addedNodes.length) continue;

				for(let a = 0; a < m[i].addedNodes.length; a++) {

					let added = m[i].addedNodes[a];

					if(!(added instanceof Element)) continue;

					let large = added.classList.contains("avatar-large") ? [added] : added.getElementsByClassName("avatar-large");

					for(let i = 0; i < large.length; i++) if(large[i].style && large[i].style.backgroundImage) large[i].style.backgroundImage = large[i].style.backgroundImage.split("?size=")[0] + "?size=" + this.settings.largeAvatarSize;

					let popout = added.classList.contains("popout-2fzvxG") ? [added] : added.getElementsByClassName("popout-2fzvxG");

					for(let i = 0; i < popout.length; i++) if(popout[i].style && popout[i].style.backgroundImage) popout[i].style.backgroundImage = popout[i].style.backgroundImage.split("?size=")[0] + "?size=" + this.settings.popoutAvatarSize;

					let small = added.classList.contains("avatar-small") || added.classList.contains("small-5Os1Bb") || added.classList.contains("avatarContainer-72bSfM") ? [added] : Array.from(added.getElementsByClassName("avatar-small")).concat(Array.from(added.getElementsByClassName("small-5Os1Bb"))).concat(Array.from(added.getElementsByClassName("avatarContainer-72bSfM")));

					for(let i = 0; i < small.length; i++) if(small[i].style && small[i].style.backgroundImage) small[i].style.backgroundImage = small[i].style.backgroundImage.split("?size=")[0] + "?size=" + this.settings.smallAvatarSize;

				}

			}

		});

		this.appObserver.observe(document.getElementById("app-mount"), { childList : true, subtree : true });

		NeatoLib.Events.onPluginLoaded(this);
		
	}
	
	stop() {
		this.appObserver.disconnect();
	}
	
}