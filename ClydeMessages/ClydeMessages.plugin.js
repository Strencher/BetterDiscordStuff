//META{"name":"ClydeMessages"}*//
let ClydeMessages = (function () {
    const config = {
        "info": {
            "author": "Strencher",
            "version": "0.0.1",
            "name": "ClydeMessages",
            "description": "Send Local Clyde Messages by Ctrl+Enter"
        }
    }
    class ClydeMessages {
        getName() {
            return config.info.name;
        }
        getAuthor() {
            return config.info.author;
        }
        getVersion() {
            return config.info.version;
        }
        getDescription() {
            return config.info.description;
        }
        load() { }
        onSwitch() {
            try {
                this.listener()
            }
            catch (err) { BdApi.showToast("You cannot do this in the startpage!", { type: "warning" }) }
        }

        unload() { this.stop() }
        initialize() {
            let b = document.querySelectorAll(".slateTextArea-1Mkdgw")[0];
            if (b) {
                try {
                    this.listener()
                }
                catch (err) { BdApi.showToast("You cannot do this in the startpage!", { type: "warning" }) }
            }

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
        listener() {
            let b = document.querySelectorAll(".slateTextArea-1Mkdgw")[0];
            b.addEventListener("keydown", this.event)
            this.event = (e) => {
                if (e.ctrlKey && e.which == 13) {
                    let c = document.querySelectorAll(".slateTextArea-1Mkdgw")[0];
                    let msg = c.innerText;
                    let channelID = BdApi.findModuleByProps("getSelectedChannelState").getChannelId();
                    BdApi.findModuleByProps("sendBotMessage").sendBotMessage(channelID, msg)
                }

            }
        }
        stop() {
            document.removeEventListener("keydown", this.event);
        }
    }




    return ClydeMessages;
})()
