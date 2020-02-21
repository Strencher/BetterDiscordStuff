//META{"name":"twitchChat"}*//
class twitchChat {
  constructor() { }
  getName() { return "Twitch Chat"; }
  getAuthor() { return "Strencher"; }
  getDescription() { return "Support-server: https://discord.gg/gvA2ree Adds a twitch chat to Discord."; }
  getVersion() { return "0.0.5"; }
  initialize() {
    ZLibrary.PluginUpdater.checkForUpdate("Twitch Chat", this.getVersion(), "https://raw.githubusercontent.com/Strencher/BetterDiscordStuff/master/TwitchChat/twitchchat.plugin.js");
    this.loadSettings();
  }
  load() { }
  unload() { this.stop() }
  start() {
    this.observer = new MutationObserver(changes => {
      for (let a = 0; a < changes.length; a++) {
        changes[a].addedNodes.forEach(e => {
          if (e && e.classList && e.classList.contains("contentRegionScrollerWrap-3YZXdm")) {
            e.querySelectorAll(".bda-author").forEach(f => {
              if (f.innerText.includes("Strencher")) {
                f.innerText = null;
                let btn = $(`<a class="anchor-3Z-8Bb da-anchor anchorUnderlineOnHover-2ESHQB da-anchorUnderlineOnHover">Strencher</a>`);
                btn.on("click", () => {
                  BdApi.findModuleByProps("openPrivateChannel").openPrivateChannel(BdApi.findModuleByProps("getCurrentUser").getCurrentUser().id, "415849376598982656");
                  setTimeout(_ => {
                    BdApi.findModuleByProps("fetchProfile").open("415849376598982656", null);
                  }, 2000)
                })
                f.appendChild(btn[0])
              }

            })
          }
        })
      }
    })
    this.observer.observe(document.body, {
      childList: true,
      subtree: true
    })
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

    $("head").append('<script id="JQueryUI" src="https://code.jquery.com/ui/1.12.1/jquery-ui.min.js"></script>')
    if (!$("#twitchChatButton")[0] && $(".toolbar-1t6TWx")[0]) this.addButton();
    if (this.settings.lastUsedVersion != this.getVersion()) {
      this.settings.lastUsedVersion = this.getVersion();
      this.saveSettings();
      BdApi.alert("TwitchChat - Changelog", `Some Small fixes. \n Added author profile link. Thanks to DevilBro's help!`);
    }
  }

  onSwitch() {
    if (!$("#twitchChatButton")[0] && $(".toolbar-1t6TWx")[0]) this.addButton();

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
  addButton() {
    let btn = $(`<div style="cursor: pointer; background-color: transparent !important;" id="twitchChatButton" class="removeTwitchChat iconWrapper-2OrFZ1 da-iconWrapper clickable-3rdHwn da-clickable"><img width="25" height="25" src="https://image.flaticon.com/icons/svg/733/733577.svg"></img></div>`);
    btn.on("click", () => {
      if ($("#chat_embed")[0]) {
        $(".dragger").effect("shake")
      } else {
        this.channelNameWrapper()
      }
    });
    $('.toolbar-1t6TWx')[0].prepend(btn[0]);
  }
  addChat(z) {
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
                          <a style="text-transform: uppercase; font-weight: bold; margin-left: 125px;" class="removeTwitchChat" href="https://twitch.tv/${z}">${z}</a>
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
                    src="https://www.twitch.tv/embed/${z}/chat?darkpopout"
                    height="550"
                    width="550">
            </iframe>
                    </div>
                  </div>
                </div>
                <div class="removeTwitchChat" data-focus-guard="true" tabindex="0" style="width: 1px; height: 0px; padding: 0px; overflow: hidden; position: fixed; top: 1px; left: 1px;"></div>
              </div>`);
    a.find(".twitchChatClose").on("click", () => { a.remove(); });
    if (this.settings.dragAble === true) {
      a.find('.dragger').draggable({
        addClasses: true,
        scrollSensitivity: 10
      });
    };
    a.appendTo($("#app-mount > div[data-no-focus-lock='true'] > div:not([class])")[0]);
  }
  channelNameWrapper() {
    let settings = ZLibrary.PluginUtilities.loadSettings("twitchChat", {});
    let defaultChan = settings.defaultChan;
    let backdrop = $(`<div class="removeTwitchChat backdrop-1wrmKB da-backdrop" style="opacity: 0.85; background-color: transparent; z-index: 1000; transform: translateZ(0px);"></div>`);
    let a = $(`<div class="removeTwitchChat modal-3c3bKg da-modal" style="opacity: 1; transform: scale(1) translateZ(0px); z-index: 9999999">
                <div data-focus-guard="true" tabindex="0" style="width: 1px; height: 0px; padding: 0px; overflow: hidden; position: fixed; top: 1px; left: 1px;"></div>
                <div data-focus-guard="true" tabindex="1" style="width: 1px; height: 0px; padding: 0px; overflow: hidden; position: fixed; top: 1px; left: 1px;"></div>
                <div data-focus-lock-disabled="false" class="inner-1ilYF7 da-inner">
                  <div class="modal-yWgWj- da-modal container-14fypd da-container sizeSmall-1jtLQy">
                    <div class="scrollerWrap-2lJEkd firefoxFixScrollFlex-cnI2ix da-scrollerWrap da-firefoxFixScrollFlex content-1EtbQh da-content scrollerThemed-2oenus da-scrollerThemed themeGhostHairline-DBD-2d">
                      <div class="scroller-2FKFPG firefoxFixScrollFlex-cnI2ix da-scroller da-firefoxFixScrollFlex systemPad-3UxEGl da-systemPad inner-ZyuQk0 da-inner content-dfabe7 da-content">
                      <div style="background-color: transparent;">
                      <button style="background-color: transparent;">
                      <img class="twitchChatClose" style="filter: invert(100%);" src="https://image.flaticon.com/icons/svg/151/151882.svg" width="15" height="15">
                      </img>
                      </button
                      </div>
                        <h2 class="h2-2gWE-o title-3sZWYQ size16-14cGz5 height20-mO2eIN weightSemiBold-NJexzi da-h2 da-title da-size16 da-height20 da-weightSemiBold defaultColor-1_ajX0 da-defaultColor title-18-Ds0 marginBottom20-32qID7 da-title da-marginBottom20">
                          Type ChannelName
                        </h2>
                        <input value="${defaultChan}" class="twitchChatInputChannelName inputDefault-_djjkz input-cIJ7To da-inputDefault da-input input-cIJ7To da-input size16-1P40sf da-size16 wordInputs" placeholder="ChannelName:"></input>
                        <button style="margin-top: 5px" class="twitchChatOpenChat flexChild-faoVW3 da-flexChild button-38aScr da-button lookFilled-1Gx00P da-lookFilled colorBrand-3pXr91 da-colorBrand sizeMedium-1AC_Sl da-sizeMedium grow-q77ONN da-grow">
                        <div class="contents-18-Yxp da-contents">
                        Open Chat
                        </div>
                        <div class="inputWrapper-31_8H8 da-inputWrapper">
                        <div class="inputMaxLength-1vRluy da-inputMaxLength">
                        </div>
                        </div>
                      </div>
                    </div>
                   </div>
                </div>
                <div data-focus-guard="true" tabindex="0" style="width: 1px; height: 0px; padding: 0px; overflow: hidden; position: fixed; top: 1px; left: 1px;"></div>
              </div>`);

    a.find(".twitchChatOpenChat").on("click", () => {
      let z = $(".twitchChatInputChannelName")[0].value;
      if (z.length == "0" || z.length <= 4) {
        a.remove();
        backdrop.remove();
      } else {
        this.settings.defaultChan = z;
        this.saveSettings()
        this.addChat(z);
        a.remove()
        backdrop.remove()
      };

    });
    a.find(".twitchChatInputChannelName").on("keyup", (e) => {
      let key = e.which || e.keyCode;
      if (key === 13) a.find(".twitchChatOpenChat").click();
    });
    a.find(".twitchChatClose").on("click", () => { a.remove(); backdrop.remove(); });
    a.find(".twitchChatOpenChat").focus();
    backdrop.on("click", () => { a.remove(); backdrop.remove(); });
    backdrop.appendTo($("#app-mount > div[data-no-focus-lock='true'] > div:not([class])")[0]);
    a.appendTo($("#app-mount > div[data-no-focus-lock='true'] > div:not([class])")[0]);
  }
  stop() {
    this.observer.disconnect()
    $(".removeTwitchChat")[0] ? document.querySelectorAll(".removeTwitchChat").forEach(element => {
      element.remove()
    }) : null;
  }
  saveSettings() {
    ZLibrary.PluginUtilities.saveSettings("twitchChat", this.settings);
  }
  loadSettings() {
    this.settings = ZLibrary.PluginUtilities.loadSettings("twitchChat", this.defaultSettings());
  }

}
