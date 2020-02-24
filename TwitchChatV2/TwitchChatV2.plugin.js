//META{"name":"TwitchChatV2","displayName":"TwitchChatV2"}*//
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
      version: "0.0.1",
      description: "Adds an Twitch chat to discord.",
      github: "null",
      github_raw: "null"
    },
    changelog: [
      {
        title: "Yeah",
        type: "added",
        items: ["Rewrote the plugin with React!"]
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
      const title = "Library Missing";
      const ModalStack = BdApi.findModuleByProps("push", "update", "pop", "popWithKey");
      const TextElement = BdApi.findModuleByProps("Sizes", "Weights");
      const ConfirmationModal = BdApi.findModule(m => m.defaultProps && m.key && m.key() == "confirm-modal");
      if (!ModalStack || !ConfirmationModal || !TextElement) return BdApi.alert(title, `The library plugin needed for ${config.info.name} is missing.<br /><br /> <a href="https://betterdiscord.net/ghdl?url=https://raw.githubusercontent.com/rauenzi/BDPluginLibrary/master/release/0PluginLibrary.plugin.js" target="_blank">Click here to download the library!</a>`);
      ModalStack.push(function (props) {
        return BdApi.React.createElement(ConfirmationModal, Object.assign({
          header: title,
          children: [BdApi.React.createElement(TextElement, { color: TextElement.Colors.PRIMARY, children: [`The library plugin needed for ${config.info.name} is missing. Please click Download Now to install it.`] })],
          red: false,
          confirmText: "Download Now",
          cancelText: "Cancel",
          onConfirm: () => {
            require("request").get("https://rauenzi.github.io/BDPluginLibrary/release/0PluginLibrary.plugin.js", async (error, response, body) => {
              if (error) return require("electron").shell.openExternal("https://betterdiscord.net/ghdl?url=https://raw.githubusercontent.com/rauenzi/BDPluginLibrary/master/release/0PluginLibrary.plugin.js");
              await new Promise(r => require("fs").writeFile(require("path").join(ContentManager.pluginsFolder, "0PluginLibrary.plugin.js"), body, r));
            });
          }
        }, props));
      });
    }
    start() { }
    stop() { }
  } : (([Plugin, Api]) => {
    const plugin = (Plugin, Api) => {
      const { WebpackModules, PluginUtilities, Utilities, DiscordModules, ReactComponents, Patcher, DiscordClasses } = ZeresPluginLibrary, { React, Textbox, DiscordConstants: { KeyboardKeys } } = DiscordModules;
      const FormItem = WebpackModules.getByDisplayName('FormItem');
      return class TwitchChatV2 extends Plugin {
        constructor() {
          super();
        }
        get defaultSettings() {
          return {
            channel: "strencher_"
          }
        }
        loadSettings() {
          this.settings = PluginUtilities.loadSettings("TwitchChatV2", this.defaultSettings);
        }
        saveSettings() {
          PluginUtilities.saveSettings("TwitchChatV2", this.settings);
        }
        async onStart() {
          this.loadSettings();
          const TitleBar = await ReactComponents.getComponentByName('HeaderBarContainer', `.title-3qD0b-`);
          Patcher.after("TwitchChatV2", TitleBar.component.prototype, "render", (e, _, ret) => {
            const title = Utilities.getNestedProp(ret, 'props.children.0.props.children');
            if (!title || !Array.isArray(title)) return;
            title.unshift(
              React.createElement("button", {
                style: {
                  backgroundColor: "transparent"
                },
                className: "twitchChat-btn",
                onClick: () => {
                  WebpackModules.getByProps("openModal").openModal(props => {
                    let tmpVal = this.settings.channel;
                    let ref;
                    return React.createElement(WebpackModules.getByProps("ModalRoot").ModalRoot, {
                      transitionState: props.transitionState,
                      children: [
                        React.createElement("h1", {
                          className: "h2-2gWE-o title-3sZWYQ da-h2 da-title defaultColor-1_ajX0 da-defaultColor title-18-Ds0 marginBottom20-32qID7 marginTop8-1DLZ1n da-title da-marginBottom20 da-marginTop8",

                        }, "Select Channel"),
                        React.createElement(Textbox, {
                          value: tmpVal,
                          ref: e => (ref = e),
                          style: {
                            position: "relative",
                            top: "-20px",
                            width: "400px",
                            left: "20px"
                          },
                          onChange: e => {
                            ref.props.value = tmpVal = e;
                            ref.forceUpdate();
                          },
                          onKeyDown: e => {
                            if (e.keyCode == KeyboardKeys.ENTER) {
                              if (e.target.value) {
                                this.settings.channel = tmpVal;
                                this.saveSettings()
                              }
                              props.onClose();
                              const channel = e.target.value || this.settings.channel;
                              WebpackModules.getByProps("openModal").openModal(prop => {
                                return React.createElement(WebpackModules.getByProps("ModalRoot").ModalRoot, {
                                  onKeyDown: (e) => {
                                    if (e.keyCode == KeyboardKeys.ESCAPE) {
                                      prop.onClose();
                                    };
                                  },
                                  transitionState: prop.transitionState,
                                  children: [React.createElement("iframe", {
                                    src: `https://www.twitch.tv/embed/${channel}/chat?darkpopout`,
                                    width: "400",
                                    height: "450",
                                    style: {
                                      margin: "20px"
                                    },
                                  })
                                  ]
                                });
                              });
                            }
                          },
                          placeholder: "Type the ChannelName, confirm with Enter",
                          autoFocus: true
                        })
                      ]
                    })
                  });
                },
                children: [React.createElement("img", {
                  src: "https://image.flaticon.com/icons/svg/733/733577.svg",
                  width: "25",
                  height: "25"
                })
                ]
              }))
          })
        }
        onStop() {
          Patcher.unpatchAll("TwitchChatV2");
        }
        onUnLoad() {
          this.onStop();
        }

      }

    };
    return plugin(Plugin, Api);
  })(global.ZeresPluginLibrary.buildPlugin(config));
})();
