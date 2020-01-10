//META{"name":"DevUtils"}*//
var DevUtils = (function () {
    var config = {
        "info": {
            "name": "DevUtils",
            "author": "Strencher",
            "version": "0.0.1",
            "description": "Adds some usefull stuff for developers.\nDocumentation in the Settings panel."
        }
    };
    class DevUtils {
        getName() {
            return config.info.name;
        };
        getAuthor() {
            return config.info.author;
        };
        getVersion() {
            return config.info.version;
        };
        getDescription() {
            return config.info.description;
        };
        load() {
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
        };
        initialize() { ZLibrary.PluginUpdater.checkForUpdate(config.info.name, config.info.version, "https://betterdiscord.net/ghdl?url=https://raw.githubusercontent.com/Strencher/BetterDiscordStuff/master/DevUtils/DevUtils.plugin.js"); };
        start() {
            let parent = document.querySelector(".typeWindows-1za-n7");
            parent.insertAdjacentHTML("beforeend", `<div class="copySelector winButtonMinMax-PBQ2gm winButton-iRh8-Z flexCenter-3_1bcw flex-1O1GKY justifyCenter-3D2jYp alignCenter-1dQNNs da-winButtonMinMax da-winButton da-flexCenter da-flex da-justifyCenter da-alignCenter"><input type="checkbox"></input></div>`);
            BdApi.injectCSS("DevUtils", `\nli[data-name="DevUtils"] .bda-description {\nwhite-space: pre;\n}\n`)
            parent.insertAdjacentHTML("beforeend", `<div title="Click to run debugger" class="debugButton winButtonMinMax-PBQ2gm winButton-iRh8-Z flexCenter-3_1bcw flex-1O1GKY justifyCenter-3D2jYp alignCenter-1dQNNs da-winButtonMinMax da-winButton da-flexCenter da-flex da-justifyCenter da-alignCenter" style=""><img src="https://img.icons8.com/material-two-tone/24/000000/pause.png" style="width: auto; height: 15px; filter: invert(70%);"></div>`);
            document.querySelector(".debugButton").addEventListener("click", () => { debugger });
            parent.insertAdjacentHTML("beforeend", `<div title="Click to reload Discord" class="reloadButton winButtonMinMax-PBQ2gm winButton-iRh8-Z flexCenter-3_1bcw flex-1O1GKY justifyCenter-3D2jYp alignCenter-1dQNNs da-winButtonMinMax da-winButton da-flexCenter da-flex da-justifyCenter da-alignCenter" style=""><img src="https://img.icons8.com/ios-glyphs/30/000000/refresh.png" style="width: auto; height: 15px; filter: invert(70%);"></div>`);
            document.querySelector(".reloadButton").addEventListener("click", () => { location.reload(true); });

            this.copySelector = (elem) => {
                var a;
                try {
                    a = elem.target.className;
                    if (!a) {
                        a = "No class or id found!"
                        DiscordNative.clipboard.copy(a);
                    } else {
                        DiscordNative.clipboard.copy(a);
                    }
                }
                catch (err) {
                    a = "No class or id found!"
                    DiscordNative.clipboard.copy(a);
                }
            };
            document.querySelector(".copySelector").addEventListener("change", (e) => {
                if (e.target.checked == true) {
                    BdApi.showToast("CopySelector: on", { type: "success" });
                    document.body.addEventListener("contextmenu", this.copySelector);
                } else {
                    BdApi.showToast("CopySelector: off");
                    document.body.removeEventListener("contextmenu", this.copySelector);
                }

            });
            global.DevUtils = {
                CreateEvent: {
                    Contextmenu: function (element) {
                        var event = document.createEvent("MouseEvent");
                        event.initMouseEvent("contextmenu",
                            true,
                            true,
                            window,
                            0,
                            0,
                            0,
                            0,
                            0,
                            false,
                            false,
                            false,
                            false,
                            0,
                            null
                        );

                        document.querySelector(element).dispatchEvent(event);
                    },
                    Click: function (element) {
                        var event = document.createEvent("MouseEvent");
                        event.initMouseEvent("click",
                            true,
                            true,
                            window,
                            0,
                            0,
                            0,
                            0,
                            0,
                            false,
                            false,
                            false,
                            false,
                            0,
                            null
                        );
                        document.querySelector(element).dispatchEvent(event);

                    },
                    Keydown: function (el, keyCode) {
                        el = document.querySelector(el)
                        el.dispatchEvent(new KeyboardEvent('keydown', {
                            'key': keyCode
                        }));
                    },
                },
            };
        };
        unload() {
            this.stop();
        };
        stop() {
            BdApi.clearCSS("DevUtils")
            global.DevUtils = null;
            document.body.removeEventListener("contextmenu", this.copySelector);
            document.querySelector(".reloadButton").remove();
            document.querySelector(".debugButton").remove();
            document.querySelector(".copySelector").remove();
        };
        getSettingsPanel() {
            return `
            <h1 style="margin-bottom: 15px; text-align: center; color: white; font-size: 25px; font-family: Arial;">DevUtils Documentation</h1>
            
            <li>Type:

            <pre><code class="scrollbarGhostHairline-1mSOM1 scrollbar-3dvm_9 da-scrollbarGhostHairline da-scrollbar hljs js">DevUtils.CreateEvent.Contextmenu(".element");</code></pre>

            To Simulate a Contextmenu event.
            </li>
            <li>Type:

            <pre><code class="scrollbarGhostHairline-1mSOM1 scrollbar-3dvm_9 da-scrollbarGhostHairline da-scrollbar hljs js">DevUtils.CreateEvent.Click(".element");</code></pre>

            To Simulate a Click event.
            </li>
            <li>Type:

            <pre><code class="scrollbarGhostHairline-1mSOM1 scrollbar-3dvm_9 da-scrollbarGhostHairline da-scrollbar hljs js">DevUtils.CreateEvent.Keydown(".element", "F1");</code></pre>

            To Simulate a Keydown event.
            </li>
           `
        };
    }
    return DevUtils;
}).call(this)