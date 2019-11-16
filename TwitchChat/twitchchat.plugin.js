//META{"name":"twitchChat"}*//
class twitchChat {
  initConstructor() { }
  getName() { return "Twitch Chat"; }
  getAuthor() { return "Strencher"; }
  getDescription() { return "Adds a twitch chat to Discord."; }
  getVersion() { return "0.0.1"; }
  load() {
    if (!global.ZeresPluginLibrary) return window.BdApi.alert("Library Missing",`The library plugin needed for ${this.getName()} is missing.<br /><br /> <a href="https://betterdiscord.net/ghdl?url=https://raw.githubusercontent.com/rauenzi/BDPluginLibrary/master/release/0PluginLibrary.plugin.js" target="_blank">Click here to download the library!</a>`)
    ZLibrary.PluginUpdater.checkForUpdate("Twitch Chat", this.getVersion(), "https://raw.githubusercontent.com/Strencher/BetterDiscordStuff/master/TwitchChat/twitchchat.plugin.js");
    this.loadSettings();

  }
  unload() { }
  start() {
    if (document.getElementById("twitchChatButton")) {
      return;
    } else {
      this.tryAddButton();
    }
  }
  tryAddButton() {
  if(document.getElementsByClassName("toolbar-1t6TWx")) {
    this.addButton();
  } else {
    return;
  }
}
  onSwitch() {
    if (document.getElementById("twitchChatButton")) {
      return;
    } else {
      this.tryAddButton();
    }
  }

  getSettingsPanel() {
    let panel = $(`<form class="form" style="width:100%;"></form>`)[0];
    new ZLibrary.Settings.SettingGroup(this.getName(), { shown: true }).appendTo(panel)
      .append(
        new ZLibrary.Settings.Switch("Enable default chan", "If you enable this option the those channels will be insert in the Input.", this.settings.defaultChans, (e) => {
          this.settings.defaultChans = e;
          this.saveSettings();
        })
      )
      .append(
        new ZLibrary.Settings.Textbox("Default Chans", "The name of the last Channel", this.settings.defaultChan, (e) => {
          this.settings.defaultChan = e;
          this.saveSettings();
        })
      )
      .append(
        new ZLibrary.Settings.Switch("Dragable", "Make the window dragable.", this.settings.dragAble, (e) => {
          this.settings.dragAble = e;
          this.saveSettings();
        })
      )

    return panel;
  }
  defaultSettings() {
    return {
      defaultChans: false,
      dragAble: true,
      defaultChan: "",
      lastUsedVersion: "0.0.0",
    }
  }
  initialize() {
    this.loadSettings();

  }
  addButton() {
    let inner = document.getElementsByClassName("toolbar-1t6TWx")[0];
    let button = document.createElement("button");
    let Icon = document.createElement("img");
    let buttonInner = document.createElement("div");
    Icon.setAttribute("src", "https://image.flaticon.com/icons/svg/733/733577.svg");
    Icon.height = "25";
    Icon.width = "25";
    button.id = "twitchChatButton";
    button.class = "removeTwitchChat"
    button.style = "background-color: transparent !important;";
    buttonInner.style = "background-color: transparent !important;";
    inner.insertBefore(buttonInner, inner.firstChild);
    buttonInner.appendChild(button);
    button.appendChild(Icon);
    Icon.setAttribute("class", "removeTwitchChat");
    Icon.onmouseover = () => {
      Icon.setAttribute("style", "transform: scale(1.2);")
    }
    Icon.onmouseout = () => {
      Icon.setAttribute("style", "transform: scale(1);")
    }
    button.onclick = () => {
      let e = document.querySelector("#chat_embed");
      if (e) {
        let chan = document.querySelector(".twitchChatLink").innerText;
        BdApi.showToast(`(${chan}) is open`, { type: "error" })
        return;
      } else {
        this.channelNameWrapper();
      }
    }
  }

  addChat(callbackOk, callbackCancel) {
    let channelName = document.querySelector(".twitchChatInputChannelName").value;
    let a = $(`<div class="removeTwitchChat dragger modal-3c3bKg da-modal" style="opacity: 1; transform: scale(1) translateZ(0px); z-index: 9999999">
                <div class="removeTwitchChat dragger" data-focus-guard="true" tabindex="0" style="width: 1px; height: 0px; padding: 0px; overflow: hidden; position: fixed; top: 1px; left: 1px;"></div>
                <div class="removeTwitchChat dragger" data-focus-guard="true" tabindex="1" style="width: 1px; height: 0px; padding: 0px; overflow: hidden; position: fixed; top: 1px; left: 1px;"></div>
                <div data-focus-lock-disabled="false" class="removeTwitchChat dragger inner-1ilYF7 da-inner">
                  <div class="removeTwitchChat modal-yWgWj- da-modal container-14fypd da-container sizeSmall-1jtLQy">
                  <div class="removeTwitchChat scrollerWrap-2lJEkd firefoxFixScrollFlex-cnI2ix da-scrollerWrap da-firefoxFixScrollFlex content-1EtbQh da-content scrollerThemed-2oenus da-scrollerThemed themeGhostHairline-DBD-2d">
                  <div class="removeTwitchChat scroller-2FKFPG firefoxFixScrollFlex-cnI2ix da-scroller da-firefoxFixScrollFlex systemPad-3UxEGl da-systemPad inner-ZyuQk0 da-inner content-dfabe7 da-content">
                  <button clas="removeTwitchChat " style="background-color: transparent;">
                  <img style="filter: invert(100%);" class="removeTwitchChat twitchChatClose" src="https://image.flaticon.com/icons/svg/151/151882.svg" width="15" height="15">
                  </img>
                  </button
                  <h2 class="removeTwitchChat h2-2gWE-o title-3sZWYQ size16-14cGz5 height20-mO2eIN weightSemiBold-NJexzi da-h2 da-title da-size16 da-height20 da-weightSemiBold defaultColor-1_ajX0 da-defaultColor title-18-Ds0 marginBottom20-32qID7 marginTop8-1DLZ1n da-title da-marginBottom20 da-marginTop8">
                          <a style="text-transform: uppercase; font-weight: bold; margin-left: 110px;" class="removeTwitchChat itchChatLink" src="https://twitch.tv/${channelName}">${channelName}</a>
                        </h2>
                        <div class="removeTwitchChat inputWrapper-31_8H8 da-inputWrapper">
                        <div class="removeTwitchChat inputMaxLength-1vRluy da-inputMaxLength">
                        </div>
                        </div>
                      </div>
                    </div>
                    <div class="removeTwitchChat flex-1xMQg5 flex-1O1GKY da-flex da-flex horizontalReverse-2eTKWD horizontalReverse-3tRjY7 flex-1O1GKY directionRowReverse-m8IjIq justifyBetween-2tTqYu alignStretch-DpGPf3 wrap-ZIn9Iy footer-3rDWdC da-footer" style="flex: 0 0 auto;">
                    <iframe frameborder="0"
                    scrolling="no"
                    id="chat_embed"
                    class="removeTwitchChat"
                    src="https://www.twitch.tv/embed/${channelName}/chat?darkpopout"
                    height="550"
                    width="550">
            </iframe>
                    </div>
                  </div>
                </div>
                <div class="removeTwitchChat" data-focus-guard="true" tabindex="0" style="width: 1px; height: 0px; padding: 0px; overflow: hidden; position: fixed; top: 1px; left: 1px;"></div>
              </div>`);


    a.find(".twitchChatLink").on("click", () => {
      window.open(`https://twitch.tv/${channelName}`, '_blank');
    })
    a.find(".twitchChatClose").on("click", () => {
      a.remove();
    });
    if (this.settings.dragAble === true) {
      a.find('.dragger').draggable({
        addClasses: true,
        scrollSensitivity: 10
      });
    }
    a.appendTo("#app-mount > div[data-no-focus-lock='true'] > div:not([class])");
    return a.find("div.da-modal")[0];
  }
  channelNameWrapper(callbackOk, callbackCancel) {
    let settings = ZLibrary.PluginUtilities.loadSettings("twitchChat", {});
    let defaultChan = settings.defaultChan;
    let backdrop = $(`<div class="removeTwitchChat backdrop-1wrmKB da-backdrop" style="opacity: 0.85; background-color: transparent; z-index: 1000; transform: translateZ(0px);"></div>`);
    let a = $(`<div class="removeTwitchChat modal-3c3bKg da-modal" style="opacity: 1; transform: scale(1) translateZ(0px); z-index: 9999999">
                <div class="removeTwitchChat"data-focus-guard="true" tabindex="0" style="width: 1px; height: 0px; padding: 0px; overflow: hidden; position: fixed; top: 1px; left: 1px;"></div>
                <div class="removeTwitchChat"data-focus-guard="true" tabindex="1" style="width: 1px; height: 0px; padding: 0px; overflow: hidden; position: fixed; top: 1px; left: 1px;"></div>
                <div data-focus-lock-disabled="false" class="removeTwitchChat inner-1ilYF7 da-inner">
                  <div class="removeTwitchChat modal-yWgWj- da-modal container-14fypd da-container sizeSmall-1jtLQy">
                    <div class="removeTwitchChat scrollerWrap-2lJEkd firefoxFixScrollFlex-cnI2ix da-scrollerWrap da-firefoxFixScrollFlex content-1EtbQh da-content scrollerThemed-2oenus da-scrollerThemed themeGhostHairline-DBD-2d">
                      <div class="removeTwitchChat scroller-2FKFPG firefoxFixScrollFlex-cnI2ix da-scroller da-firefoxFixScrollFlex systemPad-3UxEGl da-systemPad inner-ZyuQk0 da-inner content-dfabe7 da-content">
                      <div style="removeTwitchChat background-color: transparent;">
                      <button class="removeTwitchChat" style="background-color: transparent;">
                      <img class="removeTwitchChat" style="filter: invert(100%);" class="twitchChatClose" src="https://image.flaticon.com/icons/svg/151/151882.svg" width="15" height="15">
                      </img>
                      </button
                      </div>
                        <h2 class="removeTwitchChat h2-2gWE-o title-3sZWYQ size16-14cGz5 height20-mO2eIN weightSemiBold-NJexzi da-h2 da-title da-size16 da-height20 da-weightSemiBold defaultColor-1_ajX0 da-defaultColor title-18-Ds0 marginBottom20-32qID7 marginTop8-1DLZ1n da-title da-marginBottom20 da-marginTop8">
                          Type ChannelName
                        </h2>
                        <input value="${defaultChan}" class="removeTwitchChat twitchChatInputChannelName inputDefault-_djjkz input-cIJ7To da-inputDefault da-input input-cIJ7To da-input size16-1P40sf da-size16 wordInputs" placeholder="ChannelName:"></input>
                        <button style="margin-top: 5px" class="removeTwitchChat twitchChatOpenChat flexChild-faoVW3 da-flexChild button-38aScr da-button lookFilled-1Gx00P da-lookFilled colorBrand-3pXr91 da-colorBrand sizeMedium-1AC_Sl da-sizeMedium grow-q77ONN da-grow">
                        <div class="removeTwitchChat contents-18-Yxp da-contents">
                        Open Chat
                        </div>
                        <div class="removeTwitchChat inputWrapper-31_8H8 da-inputWrapper">
                        <div class="removeTwitchChat inputMaxLength-1vRluy da-inputMaxLength">
                        </div>
                        </div>
                      </div>
                    </div>
                    
                  </div>
                </div>
                <div class="removeTwitchChat" data-focus-guard="true" tabindex="0" style="width: 1px; height: 0px; padding: 0px; overflow: hidden; position: fixed; top: 1px; left: 1px;"></div>
              </div>`);

    a.find(".twitchChatOpenChat").on("click", () => {
      let z = document.getElementsByClassName("twitchChatInputChannelName")[0].value.length;
      if (z === "0") {
        a.remove();
        backdrop.remove();
      } else {
        this.addChat();
        window.setTimeout(() => {
          a.remove()
          backdrop.remove()
        }, 1200);
      };

    });
    a.find(".twitchChatInputChannelName").on("keyup", (e) => {
      var key = e.which || e.keyCode;
      if (key === 13) {
        this.addChat();
        window.setTimeout(() => {
          a.remove()
          backdrop.remove()
        }, 1200);
      } else {
        return;
      }


    });
    a.find(".twitchChatClose").on("click", () => {
      a.remove();
      backdrop.remove();
      
    });

    backdrop.on("click", () => {
      if (typeof callbackCancel === "function") callbackCancel();
      a.remove()
      backdrop.remove();
    });
    backdrop.appendTo("#app-mount > div[data-no-focus-lock='true'] > div:not([class])");
    a.appendTo("#app-mount > div[data-no-focus-lock='true'] > div:not([class])");
    return a.find("div.da-modal")[0];
  }
stop() { 
  document.getElementsByClassName("removeTwitchChat")[0].style="display: none !important;";
}
  saveSettings() {
    ZLibrary.PluginUtilities.saveSettings("twitchChat", this.settings);
  }
  loadSettings() {
    this.settings = ZLibrary.PluginUtilities.loadSettings("twitchChat", this.defaultSettings());
  }
}
