//META{"name":"guildCounter"}*//
class guildCounter {
    getName() {
        return "Guild-Counter";
    }
    getAuthor() {
        return "Strencher";
    }
    getDescription() {
        return 'Support-server: https://discord.gg/gvA2ree \nDisplays a count from your server. \nPut \n:root {\n--GC-color: red;\n} \nInto CustomCSS editor to change the color.';
    }
    getVersion() {
        return "0.0.2";
    }
    load() {
        ZLibrary.PluginUpdater.checkForUpdate("Guild-Counter", this.getVersion(), "https://raw.githubusercontent.com/Strencher/BetterDiscordStuff/master/Guild-Counter/Guild-counter.plugin.js");
    }

    unload() {
        this.stop()
    }
    start() {
        if (!global.NaJib) {
            pluginModule.stopPlugin("NaJibLibrary")
            const title = "Library Missing";
            const ModalStack = BdApi.findModuleByProps("push", "update", "pop", "popWithKey");
            const TextElement = BdApi.findModuleByProps("Sizes", "Weights");
            const ConfirmationModal = BdApi.findModule(m => m.defaultProps && m.key && m.key() == "confirm-modal");
            if (!ModalStack || !ConfirmationModal || !TextElement) return BdApi.alert(title, `The library plugin needed for ${this.getName()} is missing.<br /><br /> <a href="https://betterdiscord.net/ghdl?url=https://raw.githubusercontent.com/Strencher/BetterDiscordStuff/master/Lib/0NaJibLibrary.plugin.js" target="_blank">Click here to download the library!</a>`);
            ModalStack.push(function (props) {
                return BdApi.React.createElement(ConfirmationModal, Object.assign({
                    header: title,
                    children: [TextElement({ color: TextElement.Colors.PRIMARY, children: [`The NaJib library plugin needed for ${this.getName()} is missing. Please click Download Now to install it.`] })],
                    red: false,
                    confirmText: "Download Now",
                    cancelText: "Cancel",
                    onConfirm: () => {
                        require("request").get("https://raw.githubusercontent.com/Strencher/BetterDiscordStuff/master/Lib/0NaJibLibrary.plugin.js", async (error, response, body) => {
                            if (error) return require("electron").shell.openExternal("https://betterdiscord.net/ghdl?url=https://raw.githubusercontent.com/Strencher/BetterDiscordStuff/master/Lib/0NaJibLibrary.plugin.js");
                            await new Promise(r => require("fs").writeFile(require("path").join(ContentManager.pluginsFolder, "0NaJibLibrary.plugin.js"), body, r));
                        });
                    }
                }, props));
            });
        } else {
            try {
                this.libLoaded()
            }
            catch (err) { setTimeout(() => { pluginModule.startPlugin("NaJibLibrary") }, 10000) }
        }
    }
    libLoaded() {
        let base = document.querySelectorAll(".guildSeparator-3s64Iy")[0];
        let count = NaJib.Modules.findAllByProps('totalGuilds').totalGuilds;
        let h1 = document.createElement("h1");
        h1.className = "Guild-counter";
        h1.innerHTML = `${count}`;
        base.appendChild(h1);
        base.addEventListener("click", () => {
            count = NaJib.Modules.findAllByProps('totalGuilds').totalGuilds;
            h1.innerHTML = `${count}`;
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
                  width: 52px;
                  background-color: var(--GC-color);
                }
                .Guild-counter {
                  color: white;
                  cursor: pointer;
                  text-align: center;
                  background-color: var(--GC-color);
                }
                .GC-inner {
                  background-color: var(--GC-color);
				  transition: 0.2s;
                }
                li[data-name="Guild-Counter"] .bda-description {
                    white-space: pre;
                }
                .GC-inner:hover {
				  filter: brightness(125%);
				  transition: 0.2s;
				}
                `)
        }

    }
    stop() {
        if (document.getElementById("Guild-counterCSS")) {

            NaJib.ElementOptions.delete("#Guild-counterCSS");
        }
        if (document.getElementsByClassName("Guild-counter")) {

            NaJib.ElementOptions.delete(".Guild-counter")
        }
        document.querySelectorAll(".guildSeparator-3s64Iy")[0].removeEventListener("click", this.event)
    }
}