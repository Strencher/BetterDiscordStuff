/**
 * @name TwitchChatV2
 * @displayName TwitchChatV2
 * @invite gvA2ree
 * @authorId 415849376598982656
 */
/*@cc_on
@if (@_jscript)
    
    // Offer to self-install for clueless users that try to run this directly.
    var shell = WScript.CreateObject("WScript.Shell");
    var fs = new ActiveXObject("Scripting.FileSystemObject");
    var pathPlugins = shell.ExpandEnvironmentStrings("%APPDATA%\BetterDiscord\plugins");
    var pathSelf = WScript.ScriptFullName;
    // Put the user at ease by addressing them in the first person
    shell.Popup("It looks like you've mistakenly tried to run me directly. \n(Don't do that!)", 0, "I'm a plugin for BetterDiscord", 0x30);
    if (fs.GetParentFolderName(pathSelf) === fs.GetAbsolutePathName(pathPlugins)) {
        shell.Popup("I'm in the correct folder already.", 0, "I'm already installed", 0x40);
    } else if (!fs.FolderExists(pathPlugins)) {
        shell.Popup("I can't find the BetterDiscord plugins folder.\nAre you sure it's even installed?", 0, "Can't install myself", 0x10);
    } else if (shell.Popup("Should I copy myself to BetterDiscord's plugins folder for you?", 0, "Do you need some help?", 0x34) === 6) {
        fs.CopyFile(pathSelf, fs.BuildPath(pathPlugins, fs.GetFileName(pathSelf)), true);
        // Show the user where to put plugins in the future
        shell.Exec("explorer " + pathPlugins);
        shell.Popup("I'm installed!", 0, "Successfully installed", 0x40);
    }
    WScript.Quit();

@else@*/

var TwitchChatV2 = (() => {
  const config = {
      info: {
          name: "TwitchChatV2",
          authors: [
              {
                  name: "Strencher",
                  discord_id: "415849376598982656",
                  github_username: "Strencher",
                  twitter_username: "Strencher3"
              }
          ],
          version: "0.0.3",
          description: "Adds an Twitch chat to discord.",
          github: "https://github.com/Strencher/BetterDiscordStuff/TwitchChatV2/TwitchChatV2.plugin.js",
          github_raw: "https://raw.githubusercontent.com/Strencher/BetterDiscordStuff/master/TwitchChatV2/TwitchChatV2.plugin.js"
      },
      changelog: [
          {
              title: "Yeah",
              type: "added",
              items: [
                  "**Added Buttons to Close and open**",
                  "**Added Tooltip to the button**",
                  "**Correcly placed the icon**",
                  "**Added settingspanel to set the Default channel**"
              ]
          }
      ],
      defaultConfig: [
          {
              type: "textbox",
              id: "channel",
              name: "Default Channel",
              note: "The Channel theyre auto filled in the Open Modal"
          }
      ]
  };

  return !global.ZeresPluginLibrary ? class {
      constructor() { this._config = config; }
      getName() { return config.info.name; }
      getAuthor() { return config.info.authors.map(a => a.name).join(", "); }
      getDescription() { return config.info.description; }
      getVersion() { return config.info.version; }
      load() {
          BdApi.showConfirmationModal("Library plugin is needed", 
              ["The library plugin needed for TwitchChatV2 is missing. Please click Download Now to install it."], {
                  confirmText: "Download",
                  cancelText: "Cancel",
                  onConfirm: () => {
                      require("request").get("https://rauenzi.github.io/BDPluginLibrary/release/0PluginLibrary.plugin.js", async (error, response, body) => {
                      if (error) return require("electron").shell.openExternal("https://betterdiscord.net/ghdl?url=https://raw.githubusercontent.com/rauenzi/BDPluginLibrary/master/release/0PluginLibrary.plugin.js");
                      await new Promise(r => require("fs").writeFile(require("path").join(ContentManager.pluginsFolder, "0PluginLibrary.plugin.js"), body, r));
                      });
                  }
              });
      }
      start() { }
      stop() { }
  } : (([Plugin, Api]) => {
      const plugin = (Plugin, Api) => {
          const { WebpackModules, PluginUtilities, Utilities, DiscordModules, ReactComponents, Patcher } = Api;
          const { React, Textbox, DiscordConstants: { KeyboardKeys } } = DiscordModules;
          const Tooltip = WebpackModules.getByDisplayName("Tooltip");
          const { ModalRoot: Modal } = WebpackModules.getByProps("ModalRoot");
          class TwitchChatButton extends React.Component {
              render() {
                  return React.createElement(Tooltip, {
                      position: "bottom",
                      color: "black", 
                      text: "Open Twitch Chat"
                  }, e => React.createElement("div", {
                      onClick: this.props.onClick,
                      className: "iconWrapper-2OrFZ1 clickable-3rdHwn",
                      onMouseEnter: e.onMouseEnter, 
                      onMouseLeave: e.onMouseLeave,
                      style: {
                          backgroundColor: "transparent",
                          borderColor: "transparent"
                      },
                      children: React.createElement("img", {
                          className: "icon-22AiRD",
                          src: "https://image.flaticon.com/icons/svg/733/733577.svg",
                          width: "18",
                          height: "18"

                      })
                  }))
              }
          }
          return class TwitchChatV2 extends Plugin {
              constructor() {
                  super();
              }
              saveSettings() {
                  PluginUtilities.saveSettings("TwitchChatV2", this.settings);
              }
              getSettingsPanel() { 
                  return this.buildSettingsPanel().getElement()
              }
              openChat(val) {
                  WebpackModules.getByProps("openModal").openModal(prop => {
                      return React.createElement(Modal, {
                          onKeyDown: (e) => {
                              if (e.keyCode == KeyboardKeys.ESCAPE) prop.onClose();
                          },
                          transitionState: prop.transitionState,
                          children: [React.createElement("iframe", {
                              src: `https://www.twitch.tv/embed/${val ? val : this.settings.channel}/chat?darkpopout`,
                              width: "400",
                              height: "420",
                              style: {
                                  margin: "20px 20px 60px",
                              },
                          }), React.createElement("button", {
                              className: "button-38aScr lookFilled-1Gx00P colorBrand-3pXr91 sizeMedium-1AC_Sl grow-q77ONN",
                              onClick: () => prop.onClose(),
                              children: React.createElement("div", {
                                      className: "contents-18-Yxp"
                              }, "Close"),
                              style: {
                                  margin: "10px",
                                  width: "10px",
                                  position: 'absolute',
                                  right: "0",
                                  bottom: '0'
                              }
                              })]
                          })
                  });
              }
              async onStart() {
                  const TitleBar = await ReactComponents.getComponentByName('HeaderBarContainer', `.title-3qD0b-`);
                  Patcher.after(TitleBar.component.prototype, "render", (e, _, ret) => {
                      const title = Utilities.getNestedProp(ret, 'props.toolbar.props.children');
                      if (!title || !Array.isArray(title)) return;
                      title.unshift(
                          React.createElement(TwitchChatButton, {
                              onClick: () => {
                                  WebpackModules.getByProps("openModal").openModal(props => {
                                      let tmpVal = this.settings.channel, ref;
                                  return React.createElement(Modal, {
                                      transitionState: props.transitionState,
                                      children: [
                                          React.createElement("h1", {
                                              className: "h2-2gWE-o title-3sZWYQ da-h2 da-title defaultColor-1_ajX0 da-defaultColor title-18-Ds0 marginBottom20-32qID7 marginTop8-1DLZ1n da-title da-marginBottom20 da-marginTop8",

                                          }, "Select Channel"),
                                          React.createElement(Textbox, {
                                              value: tmpVal,
                                              ref: e => (ref = e),
                                              style: {
                                                  margin: "10px",
                                                  maxWidth: "420px"
                                              },
                                              onChange: e => {
                                                  ref.props.value = tmpVal = e;
                                                  ref.forceUpdate();
                                              },
                                              onKeyDown: e => {
                                                  if (e.keyCode == KeyboardKeys.ENTER && tmpVal) {
                                                      this.settings.channel = tmpVal;
                                                      this.saveSettings()
                                                      this.openChat(tmpVal);
                                                      props.onClose();
                                                  }
                                              },
                                              placeholder: "Type the ChannelName, confirm with Enter",
                                              autoFocus: true
                                              }),
                                              React.createElement("div", {
                                                  children: [
                                                      React.createElement("button", {
                                                          className: "button-38aScr lookLink-9FtZy- colorPrimary-3b3xI6 sizeMedium-1AC_Sl grow-q77ONN",
                                                          onClick: () => props.onClose(),
                                                          children: React.createElement("div", {
                                                              className: "contents-18-Yxp"
                                                          }, "Close"),
                                                          style: {
                                                              margin: "10px",
                                                              width: "10px",
                                                              position: 'absolute',
                                                              right: "105px",
                                                              bottom: '0'
                                                          }
                                                      }),
                                                      React.createElement("button", {
                                                          className: "button-38aScr lookFilled-1Gx00P colorBrand-3pXr91 sizeMedium-1AC_Sl grow-q77ONN",
                                                          onClick: () => {
                                                              this.settings.channel = tmpVal;
                                                              this.saveSettings()
                                                              this.openChat(tmpVal);
                                                              props.onClose()
                                                          },
                                                          children: React.createElement("div", {
                                                              className: "contents-18-Yxp"
                                                          }, "Open"),
                                                          style: {
                                                              margin: "10px",
                                                              width: "10px",
                                                              position: 'absolute',
                                                              right: "0",
                                                              bottom: '0'
                                                          }
                                                      })
                                                  ],
                                                  style: {
                                                      height: '50px'
                                                  }
                                              })
                                          ]
                                      })
                                  });
                              }
                          })  
                      )
                  })
              }
              onStop() {
                  Patcher.unpatchAll();
              }
              onUnLoad() {
                  this.onStop();
              }

          }

      };
      return plugin(Plugin, Api);
  })(global.ZeresPluginLibrary.buildPlugin(config));
})();
