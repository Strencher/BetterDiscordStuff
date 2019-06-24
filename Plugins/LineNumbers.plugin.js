//META{"name":"lineNumbers"}*//

/*@cc_on
@if (@_jscript)
    // Offer to self-install for clueless users that try to run this directly.
    var shell = WScript.CreateObject("WScript.Shell");
    var fs = new ActiveXObject("Scripting.FileSystemObject");
    var pathPlugins = shell.ExpandEnvironmentStrings("%APPDATA%\\BetterDiscord\\plugins");
    var pathSelf = WScript.ScriptFullName;
    // Put the user at ease by addressing them in the first person
    shell.Popup("It looks like you mistakenly tried to run me directly. (don't do that!)", 0, "I'm a plugin for BetterDiscord", 0x30);
    if (fs.GetParentFolderName(pathSelf) === fs.GetAbsolutePathName(pathPlugins)) {
        shell.Popup("I'm in the correct folder already.\nJust reload Discord with Ctrl+R.", 0, "I'm already installed", 0x40);
    } else if (!fs.FolderExists(pathPlugins)) {
        shell.Popup("I can't find the BetterDiscord plugins folder.\nAre you sure it's even installed?", 0, "Can't install myself", 0x10);
    } else if (shell.Popup("Should I copy myself to BetterDiscord's plugins folder for you?", 0, "Do you need some help?", 0x34) === 6) {
        fs.CopyFile(pathSelf, fs.BuildPath(pathPlugins, fs.GetFileName(pathSelf)), true);
        // Show the user where to put plugins in the future
        shell.Exec("explorer " + pathPlugins);
        shell.Popup("I'm installed!\nJust reload Discord with Ctrl+R.", 0, "Successfully installed", 0x40);
    }
    WScript.Quit();
@else @*/

var lineNumbers = function () {};

(function () {
    "use strict";

    // Settings panel helpers

    // Create and return a new top-level settings panel
    function topPanel() {
        var panel = $("<form>")
            .addClass("form")
            .css("width", "100%");

        return panel;
    }

    // Create and return a container for control groups
    function controlGroups() {
        return $("<div>").addClass("control-groups");
    }

    // Create and return a flexible control group
    // settings (object)
    //   label
    //     an element or something JQuery-ish
    //     or, if string, use as plain text
    function controlGroup(settings) {
        var group = $("<div>").addClass("control-group");

        if (typeof settings.label === "string") {
            group.append($("<label>").text(settings.label));
        } else if (settings.label !== undefined) {
            group.append($("<label>").append(settings.label));
        }

        return group;
    }

    // Create and return a group of checkboxes
    // settings (object)
    //   items (array)
    //     an array of settings objects to be passed to checkbox()
    //   callback (function(state))
    //     called with the current state, when it changes
    //     state is an array of boolean values
    function checkboxGroup(settings) {
        settings = $.extend({
            items: [],
            callback: $.noop,
        }, settings);

        var state = settings.items.map(item => item.checked === true);
        function onClick(i, itemState) {
            if (settings.items[i].callback !== undefined) {
                settings.items[i].callback(itemState);
            }
            state[i] = itemState;
            settings.callback(state);
        }

        var group = $("<ul>").addClass("checkbox-group");

        group.append(settings.items.map(function (item, i) {
            return checkbox($.extend({}, item, {
                callback: onClick.bind(undefined, i),
            }));
        }));

        return group;
    }

    // Create and return a checkbox
    // settings (object)
    //   label
    //     an element or something JQuery-ish
    //     or, if string, use as plain text
    //   help
    //     an element or something JQuery-ish
    //     or, if string, use as plain text
    //   checked (boolean)
    //   disabled (boolean)
    //   callback (function(state))
    //     called with the current state, when it changes
    //     state is a boolean
    function checkbox(settings) {
        settings = $.extend({
            checked: false,
            disabled: false,
            callback: $.noop,
        }, settings);

        var input = $("<input>").attr("type", "checkbox")
            .prop("checked", settings.checked)
            .prop("disabled", settings.disabled);

        var inner = $("<div>").addClass("checkbox-inner")
            .append(input)
            .append($("<span>"));

        var outer = $("<div>").addClass("checkbox").append(inner);

        if (settings.disabled) {
            outer.addClass("disabled");
        }

        if (typeof settings.label === "string") {
            outer.append($("<span>").text(settings.label));
        } else if (settings.label !== undefined) {
            outer.append($("<span>").append(settings.label));
        }

        outer.on("click.kawaiiSettings", function () {
            if (!input.prop("disabled")) {
                var checked = !input.prop("checked");
                input.prop("checked", checked);
                settings.callback(checked);
            }
        });

        var item = $("<li>").append(outer);

        var help;
        if (typeof settings.help === "string") {
            help = $("<div>").text(settings.help);
        } else if (settings.help !== undefined) {
            help = $("<div>").append(settings.help);
        }

        if (help !== undefined) {
            help.appendTo(item)
                .addClass("help-text")
                .css("margin-top", "-3px")
                .css("margin-left", "27px");
        }

        return item;
    }

    // End settings panel helpers

    function processCodeBlocks(mutation) {
        mutationFind(mutation, ".hljs").not(":has(ol)")
            .filter((_, e) => !(settings.ignoreNoLanguage && e.className.endsWith("hljs")))
            .each(function () {
                this.innerHTML = this.innerHTML.split("\n").map(line => "<li>"+line+"<br></li>").join("");
            })
            .wrapInner($("<ol>").addClass("kawaii-linenumbers"));
    }

    // Helper function for finding all elements matching selector affected by a mutation
    function mutationFind(mutation, selector) {
        var target = $(mutation.target), addedNodes = $(mutation.addedNodes);
        var mutated = target.add(addedNodes).filter(selector);
        var descendants = addedNodes.find(selector);
        var ancestors = target.parents(selector);
        return mutated.add(descendants).add(ancestors);
    }

    var css = `
    .hljs ol {
        list-style: none;
        counter-reset: linenumbers;
    }

    .hljs ol li {
        text-indent: -4ch;
        margin-left: 3.5ch;
        padding-left: 0.5ch;
        border-left: 1px solid rgba(0,0,0,0.2);
    }

    .hljs ol li::before {
        color: rgba(127,127,127,0.5);
        display: inline-block;
        width: 3ch;
        margin-right: 0.5ch;
        padding-right: 0.5ch;
        text-align: right;
        counter-increment: linenumbers;
        content: counter(linenumbers);
        -webkit-user-select: none;
        user-select: none;
    }`;

    lineNumbers.prototype.start = function () {
        settings = localSettings();

        if (!settings.noStyle) {
            BdApi.injectCSS("kawaii-linenumbers-css", css);
        }
        // process entire document
        var mutation = {target: document, addedNodes: [document]};
        processCodeBlocks(mutation);
    };

    lineNumbers.prototype.observer = function (mutation) {
        processCodeBlocks(mutation);
    };

    // Settings
    //   ignoreNoLanguage
    //     false - apply even when no language is specified
    //     true  - apply only to code blocks with a specified language
    //   noStyle
    //     false - add some simple CSS for styling line-numbered code blocks
    //     true  - leave styling up to themes or custom CSS

    var settings = {}, defaultSettings = {
        ignoreNoLanguage: false,
        noStyle: false,
    };

    // Load or store settings from localStorage
    function localSettings(settings) {
        if (settings === undefined) {
            var localSettings;

            try {
                localSettings = bdPluginStorage.get("lineNumbers", "settings");
            } catch (err) {
                console.warn("LineNumbers:", "unable to load settings:", err);
                localSettings = null;
            }

            if (localSettings === null) {
                // try to fall back to localStorage
                try {
                    localSettings = JSON.parse(localStorage.lineNumbers);
                } catch (err) {
                    localSettings = {};
                }
                bdPluginStorage.set("lineNumbers", "settings", localSettings);
            }
            return $.extend({}, defaultSettings, localSettings);
        }

        try {
            bdPluginStorage.set("lineNumbers", "settings", settings);
        } catch (err) {
            console.warn("LineNumbers:", "unable to save settings:", err);
        }
    }

    lineNumbers.prototype.load = function () {};

    lineNumbers.prototype.unload = function () {};

    lineNumbers.prototype.stop = function () {
        BdApi.clearCSS("kawaii-linenumbers-css");
        $(".kawaii-linenumbers")
            .removeClass("kawaii-linenumbers")
            .children()
            .not(":last-child").append(document.createTextNode("\n")).end()
            .contents().unwrap().unwrap();

        localSettings(settings);
    };

    lineNumbers.prototype.restart = function () {
        this.stop();
        this.start();
    };

    lineNumbers.prototype.getSettingsPanel = function () {
        var panel = topPanel();

        var filterControls = controlGroups().appendTo(panel);

        var Control = controlGroup({label: "Filtering options"})
            .appendTo(filterControls)
            .append(checkboxGroup({
                callback: state => {
                    localSettings(settings);
                    this.restart();
                },
                items: [
                    {
                        label: "Ignore code blocks with no language specified.",
                        checked: settings.ignoreNoLanguage,
                        callback: state => { settings.ignoreNoLanguage = state; },
                    },
                    {
                        label: "Don't add style rules.",
                        help: "Leave styling up to themes or custom CSS.",
                        checked: settings.noStyle,
                        callback: state => { settings.noStyle = state; },
                    },
                ],
            }));


        return panel[0];
    };

    lineNumbers.prototype.getName = function () {
        return "Line Numbers";
    };

    lineNumbers.prototype.getDescription = function () {
        return "Add line numbers to code blocks";
    };

    lineNumbers.prototype.getVersion = function () {
        return "1.1.8";
    };

    lineNumbers.prototype.getAuthor = function () {
        return "noodlebox";
    };
})();

/*@end @*/
