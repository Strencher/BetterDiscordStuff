//META{"name":"cssPreview"}*//
class cssPreview {
    getName() {return "CodeBlockPrewiew";}
    getAuthor() {return "Strencher";}
    getDescription() {return "Let you Prewiew css from CodeBlocks";}
    getVersion() {return "0.0.0";}


    load() {
        ZLibrary.PluginUpdater.checkForUpdate("CssCodePrewiew", this.getVersion(), "https://github.com/Strencher/strencher.github.io/CssCodePrewiew.plugin.js");

    }
    unload() {}
    start() {this.cssButtons(); this.jsButtons();}
    stop() {document.getElementsByClassName("prewiewCss").style = "display: none !important";
            BdApi.clearCSS("PrewiewCss")}
    onSwitch() {this.cssButtons(); this.jsButtons();}
    
    
    jsButtons() {
        let bases = document.querySelectorAll(".js, .JS, .Js, .jS");
        for(let base of bases) {
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
                BdApi.showToast("[PrewiewJs] Js script loadet.", {type: "success"});
                let scriptsrc = base.innerText;
                let js1 = scriptsrc.replace(/Js|jS|JS/gi, "")
                $("head").append(`<script id="PrewiewJs">${js1}</script>`);
            }
                
                
            
            

        }
    }
    removeJs() {
        if(document.getElementById("PrewiewJs")) {
            BdApi.showToast("[PrewiewJs] Js script unloadet.");
            let a = document.getElementById("PrewiewJs");
            a.remove();
        }else {
            BdApi.showToast("[PrewiewJs] There is no Js", {type: "error"});
        }
    }
    removeCss() {
        if(document.getElementById("PrewiewCss")) {
            BdApi.showToast("[PrewiewCss] Css Style unloaded.");
            let a = document.getElementById("PrewiewCss");
            a.remove();
        }else {
            BdApi.showToast("[PrewiewCss] There is no Css", {type: "error"});
        }
    }
    cssButtons() {
        let bases = document.querySelectorAll(".css, .CSS, .Css, .cSS, .cSs, .CsS");
        for(let base of bases) {
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
                BdApi.showToast("[PrewiewCss] Css loadet.", {type: "success"});
                let style1 = base.innerText;
                
                let css1 = style1.replace(/css|CSS|cSS|CsS|csS|cSs|/gi, "")
                $("head").append(`<style id="PrewiewCss">${css1}</style>`);
                
            }
            

        }

    }
    
}
