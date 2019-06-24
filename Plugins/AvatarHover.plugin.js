//META { "name": "AvatarHover", "website": "https://inve1951.github.io/BetterDiscordStuff/" } *//
global.AvatarHover = function () {
  var AsyncKeystate, css, defaultSettings, getSettings, handleFocusLoss, handleKeyUpDown, handleMouseOverOut, hoverCard, lastTarget, makeInput, qualifier, settings, updateHoverCard, updateQualifier;

  class AvatarHover {
    getName() {
      return "Avatar Hover";
    }

    getDescription() {
      return "When hovering, resize the avatar. Use Ctrl / Ctrl+Shift.";
    }

    getAuthor() {
      return "noVaLue, square";
    }

    getVersion() {
      return "0.6.0";
    }

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
      var createElement;
      ({ AsyncKeystate, createElement } = await SuperSecretSquareStuff);
      getSettings();
      updateQualifier();
      BdApi.injectCSS("css-AvatarHover", css);
      hoverCard = createElement("div", {
        id: "AvatarHover"
      });
      document.addEventListener("keydown", handleKeyUpDown, true);
      document.addEventListener("keyup", handleKeyUpDown, true);
      document.addEventListener("mouseover", handleMouseOverOut, true);
      document.addEventListener("mouseout", handleMouseOverOut, true);
      return window.addEventListener("blur", handleFocusLoss, true);
    }

    stop() {
      document.removeEventListener("keydown", handleKeyUpDown, true);
      document.removeEventListener("keyup", handleKeyUpDown, true);
      document.removeEventListener("mouseover", handleMouseOverOut, true);
      document.removeEventListener("mouseout", handleMouseOverOut, true);
      window.removeEventListener("blur", handleFocusLoss, true);
      hoverCard.remove();
      return BdApi.clearCSS("css-AvatarHover");
    }

    static updateSettings() {
      var checked, i, len, name, ref, type, value;
      ref = document.querySelectorAll("#settings_AvatarHover input");
      for (i = 0, len = ref.length; i < len; i++) {
        ({ name, type, value, checked } = ref[i]);
        settings[name] = "checkbox" === type ? checked : value || defaultSettings[name];
      }
      bdPluginStorage.set("AvatarHover", "settings", settings);
      return updateQualifier();
    }

    getSettingsPanel() {
      var k, v;
      getSettings();
      return `<div id="settings_AvatarHover">${function () {
        var ref, results;
        ref = {
          avatarBackgroundColor: "Background color",
          avatarBorderRadius: "Border radius",
          avatarBorderSize: "Border size",
          avatarBorderColor: "Border color",
          spacer: null,
          isShown: "Force-show avatar",
          isLarge: "Force large avatar",
          isHoverGuilds: "Guilds",
          isHoverChannels: "Channels / DM users",
          isHoverFriends: "Friends list",
          isHoverChatMessages: "Chat messages",
          isHoverChatUsers: "Chat users"
        };
        results = [];
        for (k in ref) {
          v = ref[k];
          results.push(makeInput(k, v));
        }
        return results;
      }().join("")}</div>`;
    }

  };

  hoverCard = AsyncKeystate = null;

  qualifier = null;

  updateQualifier = function () {
    return qualifier = [settings.isHoverGuilds ? ".icon-3o6xvg" : void 0, settings.isHoverChannels ? ".avatarDefault-35WC3R, .avatarSpeaking-1wJCNq, .channel .avatar-small" : void 0, settings.isHoverFriends ? "#friends .avatar-small, .activityFeed-28jde9 .image-33JSyf" : void 0, settings.isHoverChatMessages ? ".message-1PNnaP .image-33JSyf, .embedAuthorIcon--1zR3L" : void 0, settings.isHoverChatUsers ? ".membersWrap-2h-GB4 .image-33JSyf" : void 0].filter(function (s) {
      return s != null;
    }).join(", ");
  };

  handleKeyUpDown = function ({ key }) {
    if (key !== "Control" && key !== "Shift") {
      return;
    }
    return updateHoverCard();
  };

  handleFocusLoss = function () {
    return updateHoverCard();
  };

  handleMouseOverOut = function ({ type, target }) {
    if (!target.matches(qualifier)) {
      return;
    }
    return updateHoverCard("mouseover" === type && target);
  };

  lastTarget = null;

  updateHoverCard = function (target = lastTarget) {
    var boundsTarget, boundsWindow, isLarge, isShown, k, left, ref, size, top, v;
    lastTarget = target;
    isShown = settings.isShown || AsyncKeystate.key("Control");
    isLarge = settings.isLarge || AsyncKeystate.key("Shift");
    if (!(isShown && target)) {
      return hoverCard.remove();
    }
    size = isLarge && 256 || 128;
    boundsTarget = target.getBoundingClientRect();
    boundsWindow = {
      width: window.innerWidth,
      height: window.innerHeight
    };
    left = Math.max(0, boundsTarget.left + (boundsTarget.width - size) / 2);
    if (left + size > boundsWindow.width) {
      left = boundsWindow.width - size;
    }
    top = size > boundsWindow.height ? (boundsWindow.height - size) / 2 : boundsTarget.bottom + size > boundsWindow.height ? boundsTarget.top - size : boundsTarget.bottom;
    ref = {
      backgroundColor: settings.avatarBackgroundColor,
      backgroundImage: ("IMG" === target.tagName && target.src || getComputedStyle(target).backgroundImage).replace(/\?size=\d{3,4}/, `?size=${size}`),
      borderColor: settings.avatarBorderColor,
      borderRadius: settings.avatarBorderRadius,
      borderWidth: settings.avatarBorderSize,
      width: `${size}px`,
      height: `${size}px`,
      top: `${top}px`,
      left: `${left}px`
    };
    for (k in ref) {
      v = ref[k];
      hoverCard.style[k] = v;
    }
    if ("none" === hoverCard.style.backgroundImage) {
      return hoverCard.remove();
    }
    return document.body.appendChild(hoverCard);
  };

  defaultSettings = {
    avatarBackgroundColor: "#303336",
    avatarBorderRadius: "4px",
    avatarBorderSize: "1px",
    avatarBorderColor: "black",
    isShown: false,
    isLarge: false,
    isHoverGuilds: false,
    isHoverChannels: true,
    isHoverFriends: true,
    isHoverChatMessages: true,
    isHoverChatUsers: true
  };

  settings = null;

  getSettings = function () {
    var k, ref, results, v;
    if (settings != null) {
      return;
    }
    settings = (ref = bdPluginStorage.get("AvatarHover", "settings")) != null ? ref : {};
    results = [];
    for (k in defaultSettings) {
      v = defaultSettings[k];
      results.push(settings[k] != null ? settings[k] : settings[k] = v);
    }
    return results;
  };

  makeInput = function (name, label) {
    var _default, isCheckbox, type;
    if (label == null) {
      return "<br/>";
    }
    type = Boolean === defaultSettings[name].constructor && (isCheckbox = true) && "checkbox" || "text";
    _default = isCheckbox ? settings[name] ? "checked" : "" : `placeholder="${defaultSettings[name]}" value="${settings[name]}"`;
    return `<label><input type="${type}" name="${name}" ${_default} onChange="AvatarHover.updateSettings()"/> ${label}</label><br/>`;
  };

  css = "#AvatarHover {\n  background-size: cover;\n  border-style: solid;\n  display: block;\n  pointer-events: none;\n  position: fixed;\n  z-index: 99999;\n}\n#settings_AvatarHover {\n  color: #87909C;\n}";

  return AvatarHover;
}.call(this);