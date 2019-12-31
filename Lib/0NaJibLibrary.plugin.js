//META{"name":"naJib"}*// 
class naJib {
    getName() {
        return "NaJibLibrary";
    }
    getAuthor() {
        return "Strencher";
    }
    getDescription() {
        return "A Cool Javascript Library";
    }
    getVersion() {
        return "0.0.2";
    }
    start() {
        global.NaJib = {
            version: "0.0.6",

            injectCSS: function (id, css) {
                let element = document.createElement("style");
                element.innerHTML = css;
                element.type = "text/css";
                element.id = id;
                document.head.appendChild(element);
                return element;
            },
            clearCSS: function (id) {
                let styleid = document.getElementById(id);
                if (!styleid) {
                    console.error(`%c[NaiJib]%c Please enter a valid id!`, "color: #3A71C1", "");
                } else {
                    styleid.remove();
                    console.info(`%c[NaiJib]%c Successfull cleared CSS!`, "color: #3A71C1", "");
                }
            },
            injectScript: function (options) {
                const { id = "id", script = 'console.log("Dont do This")', src = "example.com" } = options;
                let element = document.createElement("script");
                element.innerHTML = script;
                element.type = "text/javascript";
                element.id = id;
                element.src = src;
                document.head.appendChild(element);
                return element;
            },
            injectCSSafter: async function (id, css, delay) {
                return new Promise((resolve, reject) => window.setTimeout(() => resolve(this.injectCSS(id, css)), delay));
            },
            clearCSSafter: async function (id, delay) {
                return new Promise((resolve, reject) => window.setTimeout(() => resolve(this.clearCSS(id)), delay));
            },
            showToast: function (text, options) {
                const { timeout = 5000, type = "normal", onclick = null } = options;
                let a = $(`<div class="container-1giJp5 da-container najib-Toast-${type}">
                    <div class="inner-tyMogq da-inner">
                        <div class="labelWrapper-Pniq53 da-labelWrapper">
                            <div class="size14-e6ZScH title-eS5yk3 da-title rtcConnectionStatusConnected-VRZDjy">
                                </div>
                                    <h1 class="najib-toast-text">
                                        ${text}
                                    </h1>
                                </div>
                            </div>
                        </div>
                    <div class="flex-1xMQg5 flex-1O1GKY da-flex da-flex horizontal-1ae9ci horizontal-2EEEnY flex-1O1GKY directionRow-3v3tfG justifyStart-2NDFzi alignStretch-DpGPf3 noWrap-3jynv6" style="flex: 0 0 auto;">
                    </div>
                </div>`);
                a.on("contextmenu", () => { a.remove() });
                setTimeout(() => { a.remove() }, timeout);
                if (typeof onclick === "function") a.on("click", onclick);
                $(".panels-j1Uci_").prepend(a);
                return a;
            },
            Settings: {
                create: {
                    Switch: function (elem, description, settings, change) {
                        if (!settings) {
                            settings = false;
                        }
                        let label = document.createElement("label");
                        let div = document.createElement("div");
                        let settingslabel = document.createElement("div");
                        let input = document.createElement("input");
                        let span = document.createElement("span");
                        input.type = "checkbox";
                        input.checked = settings;
                        settingslabel.innerText = description;
                        settingslabel.style = "font-size: 21px; border-top: 2px solid #2f3136;";
                        label.className = "Najib-switch"
                        span.className = "Najib-slider Najib-switch-round";
                        input.style = "opacity: 0; width: 0; height: 0;";
                        input.className = "Najib-input";
                        label.style = "display: flex; width: 60px; height: 34px; transform: scale(0.7); margin-top: -24px; margin-left: 569px;";
                        elem.appendChild(div);
                        div.appendChild(settingslabel);
                        div.appendChild(label);
                        label.appendChild(input);
                        label.appendChild(span);
                        input.addEventListener("change", change);

                    },
                    ColorPicker: function (elem, description, settings, change) {
                        let input = document.createElement("input");
                        let container = document.createElement("div");
                        let label = document.createElement("div");
                        if (!settings) {
                            settings = "#ffffff";
                        }
                        input.type = "color";
                        container.style = "border-top: 2px solid #2f3136;";
                        input.style = "background-color: transparent;";
                        input.className = "NaJib-colorPicker";
                        input.value = settings;
                        label.innerText = description;
                        label.style = "font-size: 21px;";
                        input.addEventListener("change", change)
                        elem.appendChild(container)
                        container.appendChild(label);
                        container.appendChild(input);
                    },
                    TextField: function (elem, description, placeholder, settings, change) {
                        let input = document.createElement("input");
                        let label = document.createElement("div");
                        let conatiner = document.createElement("div");
                        input.type = "text";
                        label.innerText = description;
                        conatiner.style = "border-top: 2px solid #2f3136;";
                        label.style = "font-size: 21px; margin-bottom: 3px;";
                        input.style = "margin-bottom: 5px; width: 325px; display: flex; margin-left: 296px; margin-top: -20px;";
                        input.className = "inputDefault-_djjkz input-cIJ7To da-inputDefault da-input input-cIJ7To da-input size16-1P40sf da-size16 wordInput";
                        input.placeholder = placeholder;
                        input.value = settings;
                        input.addEventListener("change", change);
                        elem.appendChild(conatiner)
                        conatiner.appendChild(label);
                        conatiner.appendChild(input);
                    }
                }
            },
            ElementOptions: {
                delete: function (name) {
                    let element = document.querySelector(name);
                    if (!element) {
                        console.error(`%c[NaiJib]%c Please enter a valid name!`, "color: #3A71C1", "");
                    } else {
                        element.parentElement.removeChild(element)
                    }
                },
                findByText: function (text, rootElement) {
                    if (!rootElement) { rootElement = document.body }
                    const filter = {
                        acceptNode: function (node) {
                            if (node.nodeType === document.TEXT_NODE && node.nodeValue.includes(text)) {
                                return NodeFilter.FILTER_ACCEPT;
                            }
                            return NodeFilter.FILTER_REJECT;
                        }
                    }
                    let nodes = [];
                    let walker = document.createTreeWalker(rootElement, NodeFilter.SHOW_TEXT, filter, false);
                    while (walker.nextNode()) {
                        nodes.push(walker.currentNode.parentNode);
                    }
                    return nodes;
                },
                getClass: function (name) {
                    let element = NaJib.Modules.findAllByProps([name])[0].split(" ");
                    return element;
                },
            },
            Modules: {


                findAllByProps: function (properties) {

                    properties = Array.isArray(properties) ? properties : Array.from(arguments);
                    const id = "WebModules-TEST";
                    const req = window.webpackJsonp.push([[], { [id]: (module, exports, req) => module.exports = req }, [[id]]]);
                    delete req.m[id];
                    delete req.c[id];
                    const filter = m => properties.every(prop => m[prop] !== undefined);
                    for (let i in req.c) if (req.c.hasOwnProperty(i)) {
                        var m = req.c[i].exports;
                        if (m && (typeof m == "object" || typeof m == "function") && filter(m)) return m;
                        if (m && m.__esModule) for (let j in m) if (m[j] && (typeof m[j] == "object" || typeof m[j] == "function") && filter(m[j])) return m[j];
                    }

                }
            },
            sendBotMessage: function (channelID, content) {
                NaJib.Modules.findAllByProps("sendBotMessage").sendBotMessage(channelID, content)
            },

        }
        if (document.getElementById("NaJibCSS")) {
            NaJib.ElementOptions.delete("#NaJibCSS");
            this.inject
        } else {
            this.inject
        }
        this.inject = NaJib.injectCSS("NaJibCSS", `
            .najib-Toast-success {
                background-color: #43B581 !important;
                border-top-left-radius: 10px;
                border-top-right-radius: 10px;
                border-bottom-left-radius: 10px;
                border-bottom-right-radius: 10px;
                margin-bottom: 3px;
            }
            .najib-toast-text {
                font-size: 15px;
                color: white;
                text-align: center;
            }
            .najib-Toast-error {
                background-color: #f04747 !important;
                border-top-left-radius: 10px;
                border-top-right-radius: 10px;
                border-bottom-left-radius: 10px;
                border-bottom-right-radius: 10px;
                margin-bottom: 3px;
            }
            .najib-Toast-normal {
                background-color: #36393f !important;
                border-top-left-radius: 10px;
                border-top-right-radius: 10px;
                border-bottom-left-radius: 10px;
                border-bottom-right-radius: 10px;
                margin-bottom: 3px;
            }
            .najib-Toast-info {
                background-color: #0096d6 !important;
                border-top-left-radius: 10px;
                border-top-right-radius: 10px;
                border-bottom-left-radius: 10px;
                border-bottom-right-radius: 10px;
                margin-bottom: 3px;
            }
            li[data-name=""] .bda-description {
                white-space: pre;
            }
            .Najib-slider.Najib-switch-round {
                border-radius: 34px;
            }
            .Najib-slider.Najib-switch-round:before {
                border-radius: 50%;
            }
            .Najib-slider:before {
                position: absolute;
                content: "";
                height: 26px;
                width: 26px;
                left: 4px;
                top: 4px;
                background-color: white;
                -webkit-transition: .4s;
                transition: .4s;
            }
            .Najib-input:checked + .Najib-slider {
                background-color: #7289da;
            }
            .Najib-slider {
                position: absolute;
                cursor: pointer;
                top: 0;
                left: 2px;
                right: 0;
                bottom: 0;
                background-color: #ccc;
                -webkit-transition: .4s;
                transition: .4s;
            }
            .Najib-input:checked + .Najib-slider:before {
                -webkit-transform: translateX(26px);
                -ms-transform: translateX(26px);
                transform: translateX(26px);
            }
            .Najib-slider.Najib-switch-round {
                border-radius: 34px;
            }
            .Najib-slider.Najib-switch-round:before {
                border-radius: 50%;
            }
            .Najib-switch .Najib-input { 
                opacity: 0;
                width: 0;
                height: 0;
            }
            .NaJib-colorPicker {
                border-color: transparent;
                width: 30px;
                height: 30px;
                display: flex;
                margin-left: 592px;
                margin-top: -21px;
            }

        `)


    }
    load() {
        pluginModule.startPlugin("NaJibLibrary");
    }
    stop() {
        global.NaJib = null;
    }
}
