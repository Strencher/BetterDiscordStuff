//META { "name": "CharCounter", "website": "https://inve1951.github.io/BetterDiscordStuff/" } *//

var CharCounter = (function (){
  var CharacterCounter, TextArea, cancel, install, css, React, getOwnerInstance;

  class CharCounter {
    getName() { return "Character Counter"; }

    getDescription() { return "Adds a character counter to chat inputs."; }

    getAuthor() { return "square"; };

    getVersion() { return "2.1.0"; }

    load() {
      return window.SuperSecretSquareStuff != null ? window.SuperSecretSquareStuff : window.SuperSecretSquareStuff = new Promise(function (c, r) {
        return require("request").get("https://raw.githubusercontent.com/Inve1951/BetterDiscordStuff/master/plugins/0circle.plugin.js", function (err, res, body) {
          if (err || 200 !== (res != null ? res.statusCode : void 0)) {
            return r(err != null ? err : res);
          }
          Object.defineProperties(window.SuperSecretSquareStuff, {
            libLoaded: {
              value: c
            },
            code: {
              value: body
            }
          });
          return (0, eval)(body);
        });
      });
    }

    async start() {
      ({getOwnerInstance, React} = await SuperSecretSquareStuff);
      if(!install()) this.onSwitch = install;
      BdApi.injectCSS("css_charCounter", css);
    }

    stop() {
      BdApi.clearCSS("css_charCounter");
      cancel && cancel();
      cancel = null;
    }
  }

  install = function() {
    var ta;

    if(!TextArea) TextArea = BDV2.WebpackModules.find(m=>m.prototype&&["calculateNodeStyling"].every(p=>null!=m.prototype[p]));

    if(!TextArea || !React) return false;

    delete this.onSwitch;

    cancel = Utils.monkeyPatch(TextArea.prototype, "render", {after: function(data) {
      data.returnValue = React.createElement(
        React.Fragment, null, data.returnValue, React.createElement(CharacterCounter, {value: data.thisObject.props.value})
      );
    }});

    if(ta = document.querySelector("form textarea")) try {
      getOwnerInstance(ta).forceUpdate();
    } catch (e) {}

    return true;
  };

  CharacterCounter = function({value}) {
    if(null == value) return null;
    var {length} = value.trim();
    return React.createElement(
      "span", {id: "charcounter", className: 2000 < length && "over2k"}, `${length}/2000`
    );
  };

  css = `
    #charcounter {
      color: rgba(255, 255, 255, .5);
      user-select: none;
      pointer-events: none;
      display: block;
      position: absolute;
      right: 5px; bottom: -1.1em;
      z-index: 1;
    }
    .message-1PNnaP #charcounter {
      right: unset;
      left: 5px;
    }
    #charcounter.over2k {
      color: rgba(240,71,71,.8);
    }
    .uploadModal-2ifh8j #charcounter.over2k {
      color: rgba(172,10,10,.8);
    }`;

  return CharCounter;
})();
