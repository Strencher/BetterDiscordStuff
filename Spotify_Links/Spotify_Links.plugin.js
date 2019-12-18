//META{"name":"spotifyLinks"}*//
class spotifyLinks {
    getAuthor() {
        return "Strencher";
    }
    getName() {
        return "SpotifyLinks";
    }
    getVersion() {
        return "0.0.1";
    }
    getDescription() {
        return "Opens Spotify links in Spotify. (mini plugin)";
    }
    start() {
        this.event = (e) => {
            if (e.target.localName == "a" && e.target.href.includes("open.spotify.com")) {
                window.open("spotify://track/" + e.target.href.split("/").reverse()[0]);
                e.preventDefault();
            }
        }
        document.addEventListener("click", this.event);
    }
    stop() {
        document.removeEventListener("click", this.event);
    }
    load() {
        BdApi.showToast(this.getName() + " Plugin loaded.")
    }
    unload() {
        this.stop()
    }
}