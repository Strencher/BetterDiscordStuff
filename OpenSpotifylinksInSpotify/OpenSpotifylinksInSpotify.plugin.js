//META{"name":"spotifyLinks", "source": "https://github.com/Strencher/BetterDiscordStuff/blob/master/OpenSpotifylinksInSpotify/OpenSpotifylinksInSpotify.plugin.js", "website": "https://strencher.github.io/BetterDiscordStuff/"}*//
const { shell } = require('electron');
class spotifyLinks {
    getAuthor() {
        return "Strencher";
    }
    getName() {
        return "Open SpotifyLinks In Spotify";
    }
    getVersion() {
        return "0.0.2";
    }
    getDescription() {
        return "Opens Spotify links in Spotify. (mini plugin) requires Spotify Desktop App.";
    }
    event(e) {
        if (e.target.localName == "a" && e.target.href.includes("open.spotify.com")) {
            e.preventDefault();
            let url = e.target.href.split("/");
            shell.openExternal(`spotify://${url[3]}/${url[url.length - 1]}`, { activate: true });
        };
    }
    start() {
        document.addEventListener("click", this.event);
    }
    stop() {
        document.removeEventListener("click", this.event);
    }
    load() {
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
        ZLibrary.PluginUpdater.checkForUpdate(this.getName(), this.getVersion(), "https://raw.githubusercontent.com/Strencher/BetterDiscordStuff/master/OpenSpotifylinksInSpotify/OpenSpotifylinksInSpotify.plugin.js");
    }
    unload() {
        this.stop();
    }
}
