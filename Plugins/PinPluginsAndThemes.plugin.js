//META{"name":"PinPluginsAndThemes","website":"https://github.com/Metalloriff/BetterDiscordPlugins/blob/master/README.md","source":"https://github.com/Metalloriff/BetterDiscordPlugins/blob/master/PinPluginsAndThemes.plugin.js"}*//

class PinPluginsAndThemes {
	
    getName() { return "PinPluginsAndThemes"; }
    getDescription() { return "Allows you to pin plugins and themes via the context menu."; }
    getVersion() { return "1.0.1"; }
	getAuthor() { return "Metalloriff"; }
	getChanges() {
		return {
            "1.0.1": `
                Fixed plugins and themes not pinning after switching settings tabs.
                Fixed incompatibility with DevilBro's RepoControls plugin. Changing sorting mode of RepoControls will temporarily break the plugin, but simply switching tabs will fix it.
            `
		};
	}

    load() {}

    start() {

        let libLoadedEvent = () => {
            try{ this.onLibLoaded(); }
            catch(err) { console.error(this.getName(), "fatal error, plugin could not be started!", err); try { this.stop(); } catch(err) { console.error(this.getName() + ".stop()", err); } }
        };

		let lib = document.getElementById("NeatoBurritoLibrary");
		if(lib == undefined) {
			lib = document.createElement("script");
			lib.setAttribute("id", "NeatoBurritoLibrary");
			lib.setAttribute("type", "text/javascript");
			lib.setAttribute("src", "https://rawgit.com/Metalloriff/BetterDiscordPlugins/master/Lib/NeatoBurritoLibrary.js");
			document.head.appendChild(lib);
		}
        if(typeof window.NeatoLib !== "undefined") libLoadedEvent();
        else lib.addEventListener("load", libLoadedEvent);

	}

	getSettingsPanel() {

		setTimeout(() => {

            NeatoLib.Settings.pushElement(NeatoLib.Settings.Elements.createNewTextField("Pin color (R, G, B) or (hex)", this.settings.pinColor, e => {
                if(e.target.value.trim()[0] == "#") e.target.value = NeatoLib.Colors.hexToRGB(e.target.value.trim());
                this.settings.pinColor = e.target.value;
                this.applyStyles();
                this.saveSettings();
            }), this.getName());
			
			NeatoLib.Settings.pushChangelogElements(this);

		}, 0);

		return NeatoLib.Settings.Elements.pluginNameLabel(this.getName());
		
    }
    
    applyStyles() {
        
        if(this.styles) this.styles.destroy();

        this.styles = NeatoLib.injectCSS(`
            #ptap-pinned-items {
                border-bottom: 10px solid rgb(${this.settings.pinColor});
                margin-bottom: 20px;
            }
            #ptap-pinned-items li {
                border-color: rgb(${this.settings.pinColor});
            }
            #ptap-pinned-items .bda-footer button, #ptap-pinned-items .ui-switch.checked {
                background: rgb(${this.settings.pinColor}) !important;
            }
            #ptap-pinned-items .bda-footer a, #ptap-pinned-items .bda-name {
                color: rgb(${this.settings.pinColor}) !important;
            }
            #plugin-settings-PinPluginsAndThemes input, #plugin-settings-PinPluginsAndThemes .themeDefault-24hCdX.valueChecked-m-4IJZ, #plugin-settings-PinPluginsAndThemes button {
                background-color: rgb(${this.settings.pinColor}) !important;
            }
        `);

    }

	saveSettings() {
        this.applyStyles();
		NeatoLib.Settings.save(this);
	}

	onLibLoaded() {

        if(NeatoLib.hasRequiredLibVersion(this, "0.0.2") == false) return;
		
		this.settings = NeatoLib.Settings.load(this, {
            displayUpdateNotes : true,
            pinned : [],
            pinColor : "142, 112, 216"
		});
		
		NeatoLib.Updates.check(this);
		
        if(this.settings.displayUpdateNotes) NeatoLib.Changelog.compareVersions(this.getName(), this.getChanges());

        this.applyStyles();

        this.updatePinned = () => {

            let items = document.getElementsByTagName("li"), pinnedItems = document.getElementById("ptap-pinned-items");

            for(let i = 0; i < items.length; i++) {

                if(!items[i].getAttribute("data-idx")) items[i].setAttribute("data-idx", i);

                items[i].addEventListener("contextmenu", this.onItemContext);

                if(this.settings.pinned.indexOf(items[i].getAttribute("data-name")) != -1) {

                    if(!pinnedItems) {
                        document.getElementsByClassName("bda-slist")[0].insertAdjacentHTML("afterbegin", `<div id="ptap-pinned-items"></div>`);
                        pinnedItems = document.getElementById("ptap-pinned-items");
                    }

                    pinnedItems.appendChild(items[i]);

                }

            }

        };
        
        this.onItemContext = e => {

            let name = e.currentTarget.getAttribute("data-name"), idx = parseInt(e.currentTarget.getAttribute("data-idx")) + 1;

            if(name) {
                NeatoLib.ContextMenu.create([NeatoLib.ContextMenu.createGroup([NeatoLib.ContextMenu.createItem(this.settings.pinned.indexOf(name) == -1 ? "Pin" : "Unpin", e => {
                    if(this.settings.pinned.indexOf(name) != -1) {
                        let list = document.getElementsByClassName("bda-slist")[0];
                        list.insertBefore(document.querySelector(`[data-name="${name}"]`), list.childNodes[idx]);
                        this.settings.pinned.splice(this.settings.pinned.indexOf(name), 1);
                        NeatoLib.showToast(name + " unpinned");
                    } else {
                        this.settings.pinned.push(name);
                        this.updatePinned();
                        NeatoLib.showToast(name + " pinned", null, { color : `rgb(${this.settings.pinColor})` });
                    }
                    this.saveSettings();
                    NeatoLib.ContextMenu.close();
                })])], e);
            }

        };

        this.settingsObserver = new MutationObserver(mutations => {

            for(let mi = 0; mi < mutations.length; mi++) {

                let added = mutations[mi].addedNodes[0];

                if(added && added instanceof Element && (added.classList.contains(NeatoLib.getClass("scrollerWrap"))))
                    this.updatePinned();

            }

        });

        this.settingsPanelEvent = () => {
            this.settingsObserver.observe(document.getElementsByClassName(NeatoLib.Events.classes.layer)[1], { childList : true, subtree : true });
        };

        NeatoLib.Events.attach("settings", this.settingsPanelEvent);
		
		NeatoLib.Events.onPluginLoaded(this);

	}
	
    stop() {
        NeatoLib.Events.detach("settings", this.settingsPanelEvent);
        this.styles.destroy();
	}
	
}
