/**
 * @name OpenLinksInSpecificBrowser
 * @description Let you open links in your choosen browser.
 * @author Strencher
 * @authorId 415849376598982656
 */
const { spawn } = require("child_process");
const dialog = require("electron").remote.dialog;
function OpenLinksInSpecificBrowser() {
    function event(e) {
        if (e.target.localName == "a" && e.target.href && e.target.href.startsWith("http") && !e.target.href.includes("/channels/")) {
            e.preventDefault()
            spawn(this.settings, [e.target.href])
        }
    }
    const defaultSettings = { browser: "" }
    function onStop() { document.removeEventListener("click", event) }
    function saveSettings() { BdApi.saveData('OpenLinksInSpecificBrowser', "settings", this.settings); };
    function loadSettings() { this.settings = BdApi.loadData("OpenLinksInSpecificBrowser", "settings") };
    return {
        getName: _ => 'OpenLinksInSpecificBrowser',
        getAuthor: _ => 'Strencher',
        getVersion: _ => '1.0.0',
        getDescription: _ => 'Let you open links in your choosen browser. First Set up a browser Path in the settings panel',
        load: _ => { loadSettings() },
        start: _ => {
            if (!this.settings) {
                this.settings = defaultSettings
                saveSettings()
            }
            document.addEventListener("click", event)
        },
        stop: _ => { onStop() },
        unload: _ => { onStop() },
        getSettingsPanel: _ => {
            let panel = $(`<form style="width: 100%;height: 130px;"><h1 align="center" style="font-weight: bold; font-size: 25px;">Set Your Browser</h1><input type="text" style="position: relative; top: 20px; width: 580px;"><button style="position: relative; top: 50px;left: 0px;">Choose a .exe from Browser</button></form>`)[0];
            if (this.settings) panel.find("input").value = this.settings;
            panel.find("button").on("click.browser", (e) => {
                e.stopPropagation();
                e.preventDefault();
                dialog.showOpenDialog({ title: "Choose youre Custom Browser .exe" }, { name: ".exe", extensions: ".exe" }).then(({ filePaths }) => {
                    this.settings = filePaths[0].replace(/\\/gi, `${'\\\\'}`);
                    saveSettings()
                    panel.find("input").value = filePaths[0].replace(/\\/gi, `${'\\\\'}`);
                })
            })
            return panel;
        }
    }
}