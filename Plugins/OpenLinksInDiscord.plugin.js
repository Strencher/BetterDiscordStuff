//META{"name":"OpenLinksInDiscord","website":"https://metalloriff.github.io/toms-discord-stuff/","source":"https://github.com/Metalloriff/BetterDiscordPlugins/blob/master/OpenLinksInDiscord.plugin.js"}*//

class OpenLinksInDiscord {
	
    getName() { return "OpenLinksInDiscord"; }
    getDescription() { return "Opens links in a new window in Discord, instead of in your web browser. Hold shift to open links normally."; }
    getVersion() { return "1.1.4"; }
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

	getSettingsPanel() {

		let save = () => NeatoLib.Settings.save(this);

		setTimeout(() => {
			
			NeatoLib.Settings.pushElements([
				NeatoLib.Settings.Elements.createToggleGroup("ld-tg", "Keys", [
					{ title : "Control/command", value : "ctrlKey", setValue : this.settings.ctrlKey },
					{ title : "Shift", value : "shiftKey", setValue : this.settings.shiftKey },
					{ title : "Alt", value : "altKey", setValue : this.settings.altKey }
				], c => {
					this.settings[c.value] = !this.settings[c.value];
					save();
				}),
				NeatoLib.Settings.Elements.createToggleSwitch("Open in browser by default (holding keys above will open them in Discord)", this.settings.reverse, () => {
					this.settings.reverse = !this.settings.reverse;
					save();
				})
			], this.getName());

		}, 0);

		return NeatoLib.Settings.Elements.pluginNameLabel(this.getName());

	}
	
	onLibLoaded() {
		
		NeatoLib.Updates.check(this);

		this.settings = NeatoLib.Settings.load(this, {
			ctrlKey : false,
			shiftKey : true,
			altKey : false,
			reverse : false
		});

		this.event = e => {
            if(e.target.localName == "a" && e.target.href && e.target.href.startsWith("http") && !e.target.parentElement.className.includes("channel") && !e.target.href.includes("/channels/")) {
				if((!this.settings.ctrlKey || e.ctrlKey) && (!this.settings.shiftKey || e.shiftKey) && (!this.settings.altKey || e.altKey)) {
					if(this.settings.reverse) {
						this.onClickLink(e);
					}
				} else if(!this.settings.reverse) {
					this.onClickLink(e);
				}
			}
		};
		
		document.addEventListener("click", this.event);

		this.electron = require("electron");

		NeatoLib.Events.onPluginLoaded(this);
		
	}
    
    onClickLink(e) {

		let window = new this.electron.remote.BrowserWindow({ frame : true, resizeable : true, show : true, webPreferences : { nodeIntegration : false, nodeIntegrationInWorker : false }});

		window.maximize();
		window.setMenu(null);
        window.loadURL(e.target.href);
        
        e.preventDefault();

    }
	
    stop() {
        document.removeEventListener("click", this.event);
	}
	
}
