//META{"name":"OpenLinksInDiscordV2"}*//
var OpenLinksInDiscordV2 = (function () {
    class OpenLinksInDiscordV2 {
        getName() { return "OpenLinksInDiscordV2"; }
        getAuthor() { return "Strencher"; }
        getDescription() { return "Opens Links in a Discord Browserwindow, rewrite of Metalloriff's"; }
        getVersion() { return "0.0.1"; }
        load() {
            this.loadSettings()
        }
        getSettingsPanel() {
            let panel = $(`<form class="form" style="width:100%;"></form>`)[0];
            new ZLibrary.Settings.SettingGroup(this.getName(), {
                shown: true
            }).appendTo(panel)
                .append(
                    new ZLibrary.Settings.Switch("Dark Theme", "This Enables the Dark Theme to the Browser window", this.settings.darkTheme, (e) => {
                        this.settings.darkTheme = e;
                        this.saveSettings();
                    }))
                .append(
                    new ZLibrary.Settings.Switch("Always OnTop", "If this is true the window is always OnTop of windows", this.settings.onTop, (e) => {
                        this.settings.onTop = e;
                        this.saveSettings();
                    }))
                .append(
                    new ZLibrary.Settings.Switch("Maximize window", "This Maximizes the window auto.", this.settings.MaxiMize, (e) => {
                        this.settings.MaxiMize = e;
                        this.saveSettings();
                    }))
                .append(
                    new ZLibrary.Settings.Switch("Ctrl Key", "Use Ctrl Key to open in the default browser.", this.settings.ctrl, (e) => {
                        this.settings.ctrl = e;
                        this.saveSettings();
                    }))

            return panel;
        }
        defaultSettings() {
            return {
                darkTheme: true,
                MaxiMize: false,
                onTop: false,
                ctrl: true,
                lastUsedVersion: "0.0.0"
            }
        }
        initialize() {
            this.loadSettings();

        }
        saveSettings() {
            ZLibrary.PluginUtilities.saveSettings("OpenLinksInDiscordV2", this.settings);
        }
        loadSettings() {
            this.settings = ZLibrary.PluginUtilities.loadSettings("OpenLinksInDiscordV2", this.defaultSettings());
        }
        start() {
            var libraryScript = document.getElementById("ZLibraryScript");
            if (!libraryScript || !window.ZLibrary) {
                libraryScript = document.createElement("script");
                libraryScript.setAttribute("type", "text/javascript");
                libraryScript.setAttribute("src", "https://rauenzi.github.io/BDPluginLibrary/release/ZLibrary.js");
                libraryScript.setAttribute("id", "ZLibraryScript");
                document.head.appendChild(libraryScript);
            }
            if (window.ZLibrary) this.initialize();
            else libraryScript.addEventListener("load", () => { this.initialize(); });
        }
        initialize() {
            ZLibrary.PluginUpdater.checkForUpdate(this.getName(), this.getVersion(), "https://betterdiscord.net/ghdl?url=https://raw.githubusercontent.com/Strencher/BetterDiscordStuff/master/OpenLinksInDiscordV2/OpenLinksInDiscordV2.plugin.js");
            this.listener = (e) => {
                if (e.target.localName == "a" && e.target.href && e.target.href.startsWith("http") && !e.target.href.includes("/channels/")) {
                    if (this.settings.ctrl && e.ctrlKey) {
                        return
                    } else {
                        this.openBrowserWindow(e)
                    }

                }
            }
            document.addEventListener("click", this.listener);
            if (this.settings.lastUsedVersion != this.getVersion()) {
                this.settings.lastUsedVersion = this.getVersion();
                this.saveSettings();
                BdApi.alert("OpenLinksInDiscordV2 - Changelog", `
                          Initial release! :)
                `);
            }

        }
        openBrowserWindow(e) {
            const electron = require("electron");
            let window = new electron.remote.BrowserWindow({
                frame: true,
                resizeable: true,
                show: true,
                darkTheme: this.settings.darkTheme,
                center: true,
                alwaysOnTop: this.settings.onTop,
                useContentSize: true,
                backgroundColor: '#171717',
                webPreferences: {
                    plugins: true
                }
            });
            window.loadURL(e.target.href);
            if (this.settings.MaxiMize) {
                window.maximize()
            }
            e.preventDefault();
        }
        stop() { document.removeEventListener("click", this.listener) }
    }
    return OpenLinksInDiscordV2;
})()