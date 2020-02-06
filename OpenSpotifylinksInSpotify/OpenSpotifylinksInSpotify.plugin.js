//META{"name":"spotifyLinks"}*//
class spotifyLinks {
    getAuthor() {
        return "Strencher";
    };
    getName() {
        return "Open SpotifyLinks In Spotify";
    };
    getVersion() {
        return "0.0.1";
    };
    getDescription() {
        return "Opens Spotify links in Spotify. (mini plugin) requires Spotify Desktop App.";
    };
    start() {
        this.event = (e) => {
            if (e.target.localName == "a" && e.target.href.includes("open.spotify.com")) {
                e.preventDefault();
                let url = e.target.href.split("/");
                window.open(`spotify://${url[3]}/${url.reverse()[0]}`);
            }
        }
        document.addEventListener("click", this.event);
    };
    stop() {
        document.removeEventListener("click", this.event);
    };
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
    };
    initialize() {
        ZLibrary.PluginUpdater.checkForUpdate(this.getName(), this.getVersion(), "https://raw.githubusercontent.com/Strencher/BetterDiscordStuff/master/OpenSpotifylinksInSpotify/OpenSpotifylinksInSpotify.plugin.js");
    }

    unload() {
        this.stop()
    };
}