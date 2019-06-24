//META{"name":"CSSCode"}*//
class CSSCode {
    getName() {
        return 'CSSCode';
    }
    getShortName() {
        return 'CSSCode';
    }
    getDescription() {
        return 'Preview CSS inside codeblock using context menu';
    }
    getSettingsPanel() {
        const panel = $('<form>').addClass('form').css('width', '100%');
        if (this.initialized) this.generatePanel(panel);
        return panel[0];
    }
    getVersion() {
        return '0.0.4';
    }
    getAuthor() {
        return 'Modder4869';
    }
    getLink() {
        return `https://raw.githubusercontent.com/Modder4869/LazyStuff/master/LazyPlugins/${this.getName()}.plugin.js`;
    }
    constructor() {
        this.initialized = false;
        this.default = {
            delay: false,
            ms: 3000
        };
        this.settings = {
            delay: false,
            ms: 3000
        };
        this.previewSheet;
        this.re;
    }
    load() {

    }
    start() {
        let libraryScript = document.getElementById('zeresLibraryScript');
        this.previewSheet = document.getElementById('CSSCode');
        if (!this.previewSheet) {
            this.previewSheet = document.createElement('style');
            this.previewSheet.setAttribute('id', 'CSSCode');
            document.body.appendChild(this.previewSheet);
        }
        if (!libraryScript) {
            libraryScript = document.createElement('script');
            libraryScript.setAttribute('type', 'text/javascript');
            libraryScript.setAttribute('src', 'https://rauenzi.github.io/BetterDiscordAddons/Plugins/PluginLibrary.js');
            libraryScript.setAttribute('id', 'zeresLibraryScript');
            document.head.appendChild(libraryScript);
        }

        if (typeof window.ZeresLibrary !== 'undefined') this.initialize();
        else libraryScript.addEventListener('load', () => this.initialize());
    }
    initialize() {
        PluginUtilities.checkForUpdate(this.getName(), this.getVersion(), this.getLink());
        PluginUtilities.loadSettings(this.getName(), this.settings);
        this.addListeners();
        this.initialized = true;
    }
    addListeners() {
       this.re = new RegExp('([#\.][a-z0-9]*?\.?.*?)\s?\{([^\{\}]*)\}', 'mgi');
        $(document).on(`keydown.${this.getName()}`, (e) => {
            if (e.altKey && e.which === 82) {
                this.clearCSS();
            }
        });
        $(document).on(`contextmenu.${this.getName()}`, (e) => {
            if (e.toElement.tagName === 'CODE' && e.toElement.className.toLowerCase().includes('css') || this.re.test(e.toElement.innerText)) {
                this.addContextMenuItems(e);
            }
        });
    }
    removeListeners() {
        $(document).off(`contextmenu.${this.getName()}`);
        $(document).off(`keydown.${this.getName()}`);
    }
    clearCSS() {
        if (!document.contains(this.previewSheet)) return;
        this.previewSheet.innerHTML = '';
    }
    addContextMenuItems(e) {
        if (!document.contains(this.previewSheet)) return;
        const context =  document.querySelector(DiscordSelectors.ContextMenu.contextMenu);
        let item;
        if (this.previewSheet.innerText.length === 0) {
            item = new PluginContextMenu.TextItem('Preview CSS', {
                callback: () => {
                    if (context) {
                        $(context).hide();
                    }
                    this.previewSheet.innerHTML = e.toElement.innerText;
                    if (this.settings.delay) {
                        setTimeout(() => (this.previewSheet.innerHTML = ''), this.settings.ms);
                    }
                }
            });
        } else {
            item = new PluginContextMenu.TextItem('Disable CSS Preview', {
                callback: () => {
                    if (context) {
                        $(context).hide();
                    }
                    this.clearCSS();
                },
                hint: 'Alt+R'
            });
        }
        $(context).find('.itemGroup-1tL0uz').first().append(item.element);
    }
    generatePanel(panel) {
        new PluginSettings.ControlGroup('Preview Settings', () => PluginUtilities.saveSettings(this.getName(), this.settings)).appendTo(panel).append(
            new PluginSettings.Checkbox('Preview Reset', 'Automatically reset the CSS Preview after a delay.', this.settings.delay, (i) => {
                this.settings.delay = i;
                this.removeListeners();
                this.addListeners();
            }),
            new PluginSettings.Slider('Preview Reset Delay', 'How long to wait before resetting the CSS Preview. Default is 3000ms, 1000ms = 1 second.', 0, 10000, 500, this.settings.ms, (i) => {
                this.settings.ms = i;
                this.removeListeners();
                this.addListeners();
            })
            .setLabelUnit('ms')
        );

        const resetButton = $('<button>', {
            type: 'button',
            text: 'Reset To Default',
            style: 'float: right;'
        }).on('click.reset', () => {
            for (const key in this.default) {
                this.settings[key] = this.default[key];
            }
            PluginUtilities.saveSettings(this.getName(), this.settings);
            panel.empty();
            this.generatePanel(panel);
        });

        panel.append(resetButton);
    }
    stop() {
        if (document.contains(this.previewSheet)) {
            this.previewSheet.remove();
        }
        this.removeListeners();
        this.initialized = false;
    }
}
