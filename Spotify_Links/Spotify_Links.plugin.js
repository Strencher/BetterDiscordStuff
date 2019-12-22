//META{"name":"spotifyLinks"}*//
class spotifyLinks {
    getAuthor() {
        return "Strencher";
    }
    getName() {
        return "SpotifyLinks";
    }
    getVersion() {
        return "0.0.2";
    }
    getDescription() {
        return "Opens Spotify links in Spotify. (mini plugin)";
    }
    start() {
        this.event = (e) => {
            if (e.target.localName == "a" && e.target.href.includes("open.spotify.com") && e.target.href.includes("track")) {
                window.open("spotify://track/" + e.target.href.split("/").reverse()[0]);
                e.preventDefault();
            }
            if (e.target.localName == "a" && e.target.href.includes("open.spotify.com") && e.target.href.includes("album")) {
                window.open("spotify://album/" + e.target.href.split("/").reverse()[0]);
                e.preventDefault();
            }
            if (e.target.localName == "a" && e.target.href.includes("open.spotify.com") && e.target.href.includes("artist")) {
                window.open("spotify://artist/" + e.target.href.split("/").reverse()[0]);
                e.preventDefault();
            }
        }
        document.addEventListener("click", this.event);
    }
    stop() {
        document.removeEventListener("click", this.event);
    }
    load() {
        ZLibrary.PluginUpdater.checkForUpdate("Spotify_Links", this.getVersion(), "https://raw.githubusercontent.com/Strencher/BetterDiscordStuff/master/Spotify_Links/Spotify_Links.plugin.js");
        BdApi.showToast(this.getName() + " Plugin loaded.")
    }
    unload() {
        this.stop()
    }
}