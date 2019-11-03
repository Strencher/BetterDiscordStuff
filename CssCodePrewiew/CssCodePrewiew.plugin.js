//META{"name":"cssPreview"}*//
class cssPreview {
    getName() {return "CssBlockPrewiew";}
    getAuthor() {return "Strencher";}
    getDescription() {return "Let you Prewiew css from CodeBlocks";}
    getVersion() {return "0.0.1";}


    load() {
        ZLibrary.PluginUpdater.checkForUpdate("CssCodePrewiew", this.getVersion(), "https://github.com/Strencher/strencher.github.io/CssCodePrewiew.plugin.js");

    }
    unload() {}
    start() {this.Buttons();}
    stop() {document.getElementsByClassName("prewiewCss").style = "display: none !important";
            BdApi.clearCSS("prewiewCss")}
    onSwitch() {this.Buttons();}
    
    

    Buttons() {
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
                    BdApi.showToast("[PrewiewCss] Css unloadet.");
                BdApi.clearCSS("prewiewCss");
            }
            contextMenu1.onclick = () => {
                BdApi.showToast("[PrewiewCss] Css loadet.", {type: "success"});
                let style1 = base.innerText;
                BdApi.injectCSS("prewiewCss", style1);
                
            }
            

        }

    }
    
}
