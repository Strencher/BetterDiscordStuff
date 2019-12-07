//META{"name":"guildCounter"}*//
class guildCounter {
    getName() {
        return "Guild-Counter";
    }
    getAuthor() {
        return "Strencher";
    }
    getDescription() {
        return 'Displays a count from your server. \nPut \n:root {\n--GC-color: red;\n} \nInto CustomCSS editor to change the color.';
    }
    getVersion() {
        return "0.0.1";
    }
    load() {
        ZLibrary.PluginUpdater.checkForUpdate("Guild-Counter", this.getVersion(), "https://raw.githubusercontent.com/Strencher/BetterDiscordStuff/master/Guild-Counter/Guild-counter.plugin.js");
        let NaJib = document.getElementById("NaJibLibrary");
        if (!NaJib) {
            najib = document.createElement("script");
            najib.id = "NaJibLibrary";
            najib.type = "text/javascript";
            najib.src = "https://strencher.github.io/NaJib.js";
            document.head.appendChild(najib);
        }
    }
    unload() {
        this.stop()
    }
    start() {
        window.setTimeout(() => {
            let count = BdApi.findModuleByProps('totalGuilds').totalGuilds;
            let a = $(`<div class="Guild-counter">${count}</div>`);
            a.appendTo(".guildSeparator-3s64Iy");
            a.on("click", () => {
                NaJib.showToast(`Your'e currently in ${count} servers.`, {
                    type: "info",
                    timeout: "5000",
                    onclick: null
                })
            })
            if (!document.getElementById("Guild-counterCSS")) {
                NaJib.injectCSS("Guild-counterCSS", `
            :root {
                --GC-color: #36393f;
            }
            .guildSeparator-3s64Iy {
              height: 15px;
              color: #ffffff;
              width: 52px;
              border-top-left-radius: 7px;
              border-bottom-left-radius: 7px;
              border-bottom-right-radius: 7px;
              border-top-right-radius: 7px;
              background-color: var(--GC-color);
            }
            .Guild-counter {
              color: white;
              cursor: pointer;
              margin-left: 18px;
              border-bottom-right-radius: 7px;
              border-top-right-radius: 7px;
              background-color: var(--GC-color);
            }
            li[data-name="Guild-Counter"] .bda-description {
                white-space: pre;
            }
            `)
            }
        }, 1200);

    }
    stop() {
        NaJib.deleteElement("#Guild-counterCSS");
        NaJib.deleteElement(".Guild-counter")
    }
}
