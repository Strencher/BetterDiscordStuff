//META{"name":"cssPreview"}*//
class cssPreview {
    getName() { return "CodeBlockPrewiew"; }
    getAuthor() { return "Strencher"; }
    getDescription() { return "Let you Prewiew css & js from CodeBlocks"; }
    getVersion() { return "0.0.2"; }


    load() {
        if (!document.getElementById("NaJibLibrary")) {
            let najib = document.createElement("script");
            najib.id = "NaJibLibrary";
            najib.type = "text/javascript";
            najib.src = "https://strencher.github.io/NaJib.js";
            document.head.appendChild(najib);
        }
        this.loadSettings()
    }
    unload() { }
    start() {
        this.cssButtons(); this.jsButtons();
        ZLibrary.PluginUpdater.checkForUpdate("CssCodePrewiew", this.getVersion(), "https://github.com/Strencher/strencher.github.io/CodeBlockPrewiew.plugin.js");

    }
    stop() { NaJib.clearCSS("prewiewCss") }
    onSwitch() { this.cssButtons(); this.jsButtons(); }

    getSettingsPanel() {
        let panel = $(`<form class="form" style="width:100%;"></form>`)[0];
        new ZLibrary.Settings.SettingGroup(this.getName(), {
            shown: true
        }).appendTo(panel)
            .append(
                new ZLibrary.Settings.Switch("Animation", "This plays an animation when css or js script loaded;", this.settings.animation, (e) => {
                    this.settings.animation = e;
                    this.saveSettings();
                }))
        return panel;
    }/*Ende vom Settings Panel*/





    defaultSettings() {
        return {
            animation: false,
            lastUsedVersion: "0.0.0"
        }
    }// Ende von defaultSettings
    initialize() {
        this.loadSettings();

    }// ende von initalize

    jsButtons() {
        let bases = document.querySelectorAll(".js, .JS, .Js, .jS");
        for (let base of bases) {
            let contextMenu = document.createElement("div");
            let contextMenu1 = document.createElement("button");
            let contextMenu2 = document.createElement("button");
            let Icon = document.createElement("img");
            let Icon1 = document.createElement("img");
            base.appendChild(contextMenu);
            contextMenu.appendChild(contextMenu1);
            contextMenu.appendChild(contextMenu2);
            contextMenu1.appendChild(Icon);
            contextMenu2.appendChild(Icon1);
            Icon1.width = "15";
            Icon1.height = "15";
            Icon.setAttribute("src", "https://image.flaticon.com/icons/svg/64/64484.svg");
            Icon1.setAttribute("src", "https://image.flaticon.com/icons/svg/32/32178.svg")
            contextMenu.setAttribute("class", "cssPrewiew");
            Icon1.style = "filter: invert(100%) !important;";
            contextMenu1.setAttribute("height", "15");
            contextMenu.setAttribute("width", "15");
            contextMenu1.setAttribute("width", "15");
            contextMenu.setAttribute("height", "15");
            contextMenu2.style = "background-color: transparent;";
            Icon.setAttribute("style", "filter: invert(100%)")
            Icon.width = "15";
            Icon.height = "15";
            contextMenu1.setAttribute("style", "color: white !important; background-color: transparent !important;");
            contextMenu.setAttribute("style", "background-color: transparent !important;");
            contextMenu1.setAttribute("class", "cssPrewiew");
            contextMenu2.setAttribute("class", "cssPrewiew");
            Icon.setAttribute("class", "prewiewCss");
            Icon1.setAttribute("class", "prewiewCss");
            contextMenu2.onclick = () => {
                this.removeJs();
            }
            contextMenu1.onclick = () => {
                NaJib.showToast("[PrewiewJs] Js script loadet.", "success");
                if (this.settings.animation === true) {
                    this.CssandJsAnimation();
                }
                let scriptsrc = base.innerText;
                let js1 = scriptsrc.replace(/Js|jS|JS/gi, "")
                NaJib.injectScript("PrewiewJs", js1);
            }





        }
    }
    removeJs() {
        if (document.getElementById("PrewiewJs")) {
            NaJib.showToast("[PrewiewJs] Js script unloadet.", "normal");
            NaJib.clearScript("PrewiewJs");
        } else {
            NaJib.showToast("[PrewiewJs] There is no Js", "error");
        }
    }
    removeCss() {
        if (document.getElementById("PrewiewCss")) {
            NaJib.showToast("[PrewiewCss] Css Style unloaded.", "normal");
            NaJib.clearCSS("PrewiewCss")
        } else {
            NaJib.showToast("[PrewiewCss] There is no Css", "error");
        }
    }
    CssandJsAnimation() {
        var css = `
        body {
    animation: spinner 1s;
    transform-style: preserve-3d;
    }
    @keyframes spinner {
    0% { transform: rotate3d(1, 1, 1, 0deg); }
    50% { transform: rotate3d(1, 1, 1, 180deg); }
    100% { transform: rotate3d(1, 1, 1, 360deg); }
    }
        `
        NaJib.injectCSS("prewiewAnimation", css);
        window.setTimeout(() => {
            NaJib.clearCSS("prewiewAnimation");
        }, 3000);
    }
    cssButtons() {
        let settings = ZLibrary.PluginUtilities.loadSettings("BlockPrewiew", {});
        let bases = document.querySelectorAll(".css, .CSS, .Css, .cSS, .cSs, .CsS");
        for (let base of bases) {
            let contextMenu = document.createElement("div");
            let contextMenu1 = document.createElement("button");
            let contextMenu2 = document.createElement("button");
            let Icon = document.createElement("img");
            let Icon1 = document.createElement("img");
            base.appendChild(contextMenu);
            contextMenu.appendChild(contextMenu1);
            contextMenu.appendChild(contextMenu2);
            contextMenu1.appendChild(Icon);
            contextMenu2.appendChild(Icon1);
            Icon1.width = "15";
            Icon1.height = "15";
            Icon.setAttribute("src", "https://image.flaticon.com/icons/svg/64/64484.svg");
            Icon1.setAttribute("src", "https://image.flaticon.com/icons/svg/32/32178.svg")
            contextMenu.setAttribute("class", "cssPrewiew");
            Icon1.style = "filter: invert(100%) !important;";
            contextMenu1.setAttribute("height", "15");
            contextMenu.setAttribute("width", "15");
            contextMenu1.setAttribute("width", "15");
            contextMenu.setAttribute("height", "15");
            contextMenu2.style = "background-color: transparent;";
            Icon.setAttribute("style", "filter: invert(100%)")
            Icon.width = "15";
            Icon.height = "15";
            contextMenu1.setAttribute("style", "color: white !important; background-color: transparent !important;");
            contextMenu.setAttribute("style", "background-color: transparent !important;");
            contextMenu1.setAttribute("class", "cssPrewiew");
            contextMenu2.setAttribute("class", "cssPrewiew");
            Icon.setAttribute("class", "prewiewCss");
            Icon1.setAttribute("class", "prewiewCss");
            contextMenu2.onclick = () => {
                this.removeCss();
            }
            contextMenu1.onclick = () => {
                NaJib.showToast("[PrewiewCss] Css loadet.", "success");
                if (this.settings.animation === true) {
                    this.CssandJsAnimation();
                }
                let style1 = base.innerText;

                let css1 = style1.replace(/css|CSS|cSS|CsS|csS|cSs|/gi, "")
                NaJib.injectCSS("PrewiewCss", css1);

            }/*unloadCSS ende */


        } /*for(let...) script end*/

    }/*funktion ende */
    saveSettings() {
        ZLibrary.PluginUtilities.saveSettings("BlockPrewiew", this.settings);
    }
    loadSettings() {
        this.settings = ZLibrary.PluginUtilities.loadSettings("BlockPrewiew", this.defaultSettings());
    }


}
