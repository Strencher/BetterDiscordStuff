//META{"name": "CustomTitleTag"}*//

var CustomTitleTag = (function () {
  const config = {
    "info": {
      "author": "Strencher",
      "version": "0.0.1",
      "name": "CustomTitleTag",
      "description": "Allows you to set a Custom Tag to the title."
    }
  }
  class CustomTitleTag {
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
    load() {
      this.loadSettings()
    }
    unload() { this.stop() }
    selector() {
      var bold;
      if (this.settings.bold == true) {
        bold = "bold";
      } else {
        bold = "none"
      }
      this.css = `
          .wordmark-2iDDfm {
              font-size: ${this.settings.fontSize};
              padding: 0;
              font-weight: ${bold};
              color: ${this.settings.color};
          }

          .wordmark-2iDDfm::before {
              content: "${this.settings.content}";
              display: block;
              height: 17px;
              width: 500px;
              margin: 3px 0;
          }

          .wordmark-2iDDfm svg {
              display: none;
          }
          .wordmarkWindows-1v0lYD {
              left: 5px;
          }
          `
      BdApi.injectCSS(config.info.name, this.css)
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
    initialize() {
      ZLibrary.PluginUpdater.checkForUpdate(this.getName(), this.getVersion(), "https://betterdiscord.net/ghdl?url=https://raw.githubusercontent.com/Strencher/BetterDiscordStuff/master/CustomTitleTag/CustomTitleTag.plugin.js");
      if (this.settings.lastUsedVersion != this.getVersion()) {
        this.settings.lastUsedVersion = this.getVersion();
        this.saveSettings();
        BdApi.alert("CustomTitleTag - Changelog", `
                  Initial release! :)
        `);
      }
      this.selector()
      BdApi.injectCSS(config.info.name + "-settings", `
          .slider.switch-round {
              border-radius: 34px;
          }
          .slider.switch-round:before {
              border-radius: 50%;
          }
          .slider:before {
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
          .input:checked + .slider {
              background-color: #7289da;
          }
          .slider {
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
          .input:checked + .slider:before {
              -webkit-transform: translateX(26px);
              -ms-transform: translateX(26px);
              transform: translateX(26px);
          }
          .slider.switch-round {
              border-radius: 34px;
          }
          .slider.switch-round:before {
              border-radius: 50%;
          }
          .switch .input { 
              opacity: 0;
              width: 0;
              height: 0;
          }`)
    }
    stop() {
      BdApi.clearCSS(config.info.name);
      BdApi.clearCSS(config.info.name + "-settings");
    }
    getSettingsPanel() {
      var bold;
      if (this.settings.bold == false) {
        bold = ""
      } else {
        bold = 'checked="true"';
      }
      let panel = document.createElement("form");
      panel.className = "form";
      panel.style.width = "100%";
      panel.insertAdjacentHTML("afterbegin",
        `<span>Text:  <input style="width: 560px;" class="textInput inputDefault-_djjkz input-cIJ7To da-inputDefault da-input input-cIJ7To da-input size16-1P40sf da-size16 wordInputs" value="${this.settings.content}"></input><span>
              <span>Bold: <label style="display: flex; width: 60px; height: 34px; transform: scale(0.7); margin-left: 33px; margin-top: -18px;" class="boldText switch"><input ${bold} type="checkbox" class="input"><span class="slider switch-round"></label></input></span></span>
              <span>Font-size: <input style="width: 560px;" class="fontSizeText inputDefault-_djjkz input-cIJ7To da-inputDefault da-input input-cIJ7To da-input size16-1P40sf da-size16 wordInputs" value="${this.settings.fontSize}"></input></span>
              <span>Color: <input class="colorPicker" value="${this.settings.color}" style="cursor: pointer; background-color: transparent; border-color: transparent;" type="color"></input></span>
          `);
      setTimeout(() => {
        let textInput = document.getElementsByClassName("textInput")[0];
        let boldText = document.getElementsByClassName("boldText")[0];
        let fontSizeText = document.getElementsByClassName("fontSizeText")[0];
        let colorPicker = document.getElementsByClassName("colorPicker")[0];
        textInput.addEventListener("change", (e) => {
          this.settings.content = e.target.value;
          this.saveSettings()
        })
        boldText.addEventListener("change", (e) => {
          this.settings.bold = e.target.checked;
          this.saveSettings()
        })
        fontSizeText.addEventListener("change", (e) => {
          this.settings.fontSize = e.target.value;
          this.saveSettings()
        })
        colorPicker.addEventListener("change", (e) => {
          this.settings.color = e.target.value;
          this.saveSettings()
        })
      }, 900)

      return panel;
    }

    get defaultSettings() {
      return {
        content: "YOUR TITLE",
        bold: true,
        fontSize: "15px",
        color: "#00ff00",
        lastUsedVersion: "0.0.1"
      }
    }
    loadSettings() {
      var a = BdApi.loadData("CustomTitleTag", "settings");
      if (!a) {
        this.settings = null;
        this.saveSettings()
      } else {
        this.settings = a;
      }

    }
    saveSettings() {
      if (!this.settings) {
        BdApi.saveData("CustomTitleTag", "settings", this.defaultSettings);
      } else {
        BdApi.saveData("CustomTitleTag", "settings", this.settings);
        BdApi.clearCSS(config.info.name);
        this.selector()
      }

    }
  }
  return CustomTitleTag;
})()