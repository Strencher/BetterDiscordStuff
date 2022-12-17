/**
 * @name OpenLinksInSpecificBrowser
 * @description Let you open links in your choosen browser.
 * @author Strencher
 * @authorId 415849376598982656
 */
const { spawn } = require("child_process");
const dialog = require("electron").remote.dialog;
class OpenLinksInSpecificBrowser {
    getName() {return "OpenLinksInSpecificBrowser";}
    getAuthor() {return "Strencher";}
    getDescription() {return "Let you open links in your choosen browser. First Set up a browser Path in the settings panel. Add a \", -parameters\" at the end of the path to add custom parameters"}
    getVersion() {return "1.0.1"}
    load() {
        this.settings = BdApi.loadData("OpenLinksInSpecificBrowser", "settings") 
    }
    unload() {this.stop()}
    start() {
        if (!this.settings) {
            this.settings = this.defaultSettings
            this.saveSettings()
        }
        document.addEventListener("click", this.event = e => {
            if (e.target.localName == "a" && e.target.href && e.target.href.startsWith("http") && !e.target.href.includes("/channels/")) {
                e.preventDefault()
                try {
                    spawn(this.settings.browser, [e.target.href, this.settins.options])
                } catch (error) {
                    throw new Error(error)    
                }
            }
        })
    }
    get defaultSettings() { 
        return {
            browser: "", 
            options: ""
        }
    }
    stop() { document.removeEventListener("click", this.event) }
    saveSettings() { BdApi.saveData('OpenLinksInSpecificBrowser', "settings", this.settings); };
    
    getSettingsPanel() {
        let panel = $(`<form style="width: 100%;height: 130px;"><h1 align="center" style="font-weight: bold; font-size: 25px;">Set Your Browser</h1><input type="text" style="position: relative; top: 20px; width: 580px;"><button style="position: relative; top: 50px;left: 0px;">Choose a .exe from Browser</button></form>`)[0];
            if (this.settings) {
                panel.find('input[type="text"]').value += this.settings.browser;
                panel.find('input[type="text"]').value += this.settings.options ? ", "+this.settings.options : ""
            }
            panel.find("button").on("click.browser", e => {
                e.stopPropagation();
                e.preventDefault();
                dialog.showOpenDialog({ title: "Choose youre Custom Browser .exe" }, { name: ".exe", extensions: ".exe" }).then(({ filePaths }) => {
                    if(!filePaths[0]) return;
                    this.settings.browser = filePaths[0].replace(/\\/gi, `${'\\\\'}`);
                    this.saveSettings()
                    panel.find("input").value = filePaths[0].replace(/\\/gi, `${'\\\\'}`);
                    BdApi.showToast("Successfull saved Custom Browser", {type: "success"})
                })
            })
            panel.find('input[type="text"]').on("change", e => {
                let args = e.target.value.split(", ");
                this.settings.browser = args[0].replace(/\\/gi, `${'\\\\'}`);
                this.settings.options = args[1] ? args[1] : "";
                this.saveSettings()
                BdApi.showToast("Successfull saved Custom Browser", {type: "success"})
            })
            return panel;
    }
}
