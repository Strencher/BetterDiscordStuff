/**
 * @name InvisibleTyping
 * @version 1.3.3
 * @description Makes your typing invisible to other people.
 * @author Strencher
 * @invite gvA2ree
 * @changelog [fixed] Fixed cleanup of observer. 
 * @changelogDate 2022-10-22T22:00:00.000Z
 * @changelogImage https://cdn.discordapp.com/attachments/939319506428391495/1032360180303790163/Untitled-1.jpg
 */

var meta;

const {React, DOM, Patcher, UI, Data, Utils, ReactUtils, ContextMenu, Webpack: _Webpack} = new BdApi("InvisibleTyping");

const Webpack = {
    ..._Webpack,
    getByProps(...props) {return this.getModule(this.Filters.byProps(...props));},
    getStore(name) {return this.getModule(m => m?._dispatchToken && m?.getName() === name);},
    getBulk(...queries) {return _Webpack.getBulk(...queries.map(q => typeof q === "function" ? {filter: q} : q));}
};

Utilities: {
    var removeItem = function (array, item) {
        while (array.includes(item)) {
            array.splice(array.indexOf(item), 1);
        }
    
        return array;
    };
    
    var onceAdded = (selector, callback, signal) => {
        let directMatch;
        if (directMatch = document.querySelector(selector)) {
            callback(directMatch);
            return () => null;
        }

        const cancel = () => observer.disconnect();
    
        const observer = new MutationObserver(changes => {
            for (const change of changes) {
                if (!change.addedNodes.length) continue;
    
                for (const node of change.addedNodes) {
                    const match = (node.matches(selector) && node) || node.querySelector(selector);

                    if (!match) continue;
    
                    cancel();
                    signal.removeEventListener("abort", cancel);

                    callback(match);
                }
            }
        });

        observer.observe(document.body, {childList: true, subtree: true});
    
        signal.addEventListener("abort", cancel);
    };
    
    var Fluxify = (component, stores, getter) => {
        Object.assign(component.prototype, {
            componentDidMount() {
                this._handleStoreChange = this._handleStoreChange.bind(this);
                this._handleStoreChange();
    
                for (const store of stores) store.addChangeListener(this._handleStoreChange);
            },
            _handleStoreChange() {
                if (this._gone) return;
                this.setState(getter(this.props));
            },
            componentWillUnmount() {
                this._gone = true;
                for (const store of stores) store.removeChangeListener(this._handleStoreChange);
            }
        });
    };

    var Settings = {
        _listeners: new Set,
        settings: Data.load("settings") ?? {},
        getSetting(id, defValue) {return this.settings[id] ?? defValue;},
        updateSetting(id, value) {return this.settings[id] = value, this.saveSettings();},
        saveSettings() {Data.save("settings", this.settings), this.emitChange();},

        emitChange() {this._listeners.forEach(callback => callback());},
        addChangeListener(listener) {this._listeners.add(listener);},
        removeChangeListener(listener) {this._listeners.delete(listener);}
    };
};

Components: {
    var InvisibleTypingButton = class InvisibleTypingButton extends React.Component {
        state = {enabled: false};
        static DMChannels = new Set([1, 3]);
        static canViewChannel(channel) {
            if (!channel) return false;
            if (this.DMChannels.has(channel.type)) return true;
        
            try {
                return this.defaultProps.PermissionUtils.can({
                    context: channel,
                    user: this.defaultProps.UserStore.getCurrentUser(),
                    permission: /*SEND_MESSAGES*/ 2048n
                });
            } catch (error) {
                console.error("Failed to request permissions:", error);
                return true;
            }
        }
    
        static shouldShow(children, props) {
            if (!Array.isArray(children)) return false;
            if (props.type?.analyticsName === "profile_bio_input") return false;
            if (children.some(child => child && child.type === InvisibleTypingButton)) return false;
            if (!this.canViewChannel(props.channel)) return false;
    
            return true;
        }
    
        static getState(channelId) {
            const isGlobal = Settings.getSetting("autoEnable", true);
            const isExcluded = Settings.getSetting("exclude", []).includes(channelId);
    
            if (isExcluded) return isGlobal;
            return !isGlobal;
        }
    
        handleClick = () => {
            const {channel, isEmpty, TypingModule} = this.props;
            const excludeList = Settings.getSetting("exclude", []).concat();
    
            if (excludeList.includes(channel.id)) {
                removeItem(excludeList, channel.id);
                TypingModule.stopTyping(channel.id);
            } else {
                excludeList.push(channel.id);
                if (!isEmpty) TypingModule.startTyping(channel.id);
            }
    
            Settings.updateSetting("exclude", excludeList);
        }
    
        renderContextMenu() {
            const globalState = Settings.getSetting("autoEnable", false);

            return ContextMenu.buildMenu([
                {
                    id: "globally-disable-or-enable-typing",
                    label: !globalState ? "Disable Globally" : "Enable Globally",
                    onClick: () => {Settings.updateSetting("autoEnable", !globalState);}
                },
                {
                    id: "reset-config",
                    color: "colorDanger",
                    disabled: !Settings.getSetting("exclude", []).length,
                    label: "Reset Config",
                    onClick() {
                        Settings.updateSetting("exclude", []);
                        UI.showToast("Successfully reset config for all channels.", {type: "success"});
                    }
                }
            ]);
        }
    
        renderButton = props => {
            return React.createElement("button", {
                ...props,
                ref: e => e && (e.unmount = () => {
                    this.render = () => null;
                    this.forceUpdate();
                }),
                onClick: this.handleClick,
                onContextMenu: e => ContextMenu.open(e, this.renderContextMenu()),
                className: Utils.className("invisible-typing-button", {enabled: this.state.enabled, disabled: !this.state.disabled}),
                children: React.createElement("svg", {
                    width: "25",
                    height: "25",
                    viewBox: "0 0 576 512"
                }, React.createElement("path", {
                    fill: "currentColor",
                    d: "M528 448H48c-26.51 0-48-21.49-48-48V112c0-26.51 21.49-48 48-48h480c26.51 0 48 21.49 48 48v288c0 26.51-21.49 48-48 48zM128 180v-40c0-6.627-5.373-12-12-12H76c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12zm96 0v-40c0-6.627-5.373-12-12-12h-40c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12zm96 0v-40c0-6.627-5.373-12-12-12h-40c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12zm96 0v-40c0-6.627-5.373-12-12-12h-40c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12zm96 0v-40c0-6.627-5.373-12-12-12h-40c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12zm-336 96v-40c0-6.627-5.373-12-12-12h-40c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12zm96 0v-40c0-6.627-5.373-12-12-12h-40c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12zm96 0v-40c0-6.627-5.373-12-12-12h-40c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12zm96 0v-40c0-6.627-5.373-12-12-12h-40c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12zm-336 96v-40c0-6.627-5.373-12-12-12H76c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12zm288 0v-40c0-6.627-5.373-12-12-12H172c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h232c6.627 0 12-5.373 12-12zm96 0v-40c0-6.627-5.373-12-12-12h-40c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12z"
                }), !this.state.enabled ? React.createElement("rect", {
                    className: "disabled-stroke-through",
                    x: "10",
                    y: "10",
                    width: "600pt",
                    height: "70px",
                    fill: "#f04747"
                }) : null)
            });
        }
    
        render() {
            const {Tooltip} = this.props;
    
            return React.createElement(Tooltip, {
                text: this.state.enabled ? "Disable Typing" : "Enable Typing",
                children: this.renderButton
            });
        }
    }
    
    Fluxify(InvisibleTypingButton, [Settings], (props) => ({enabled: InvisibleTypingButton.getState(props.channel.id)}));

    Settings: {
        var SimpleSwitch = ({state = false, name = "", note = "", onChange}) => {
            const [currState, toggle] = React.useReducer(n => !n, state);

            const handleChange = () => (onChange(!currState), toggle());

            return React.createElement("div", {className: "it-switch-wrapper"},
                React.createElement("div", {className: "it-switch-header"},
                    React.createElement("h5", {className: "it-switch-name"}, name),
                    React.createElement("div", {
                        className: Utils.className("it-switch-item", currState && "it-switch-checked"),
                        onClick: handleChange,
                    }, React.createElement("div", {className: "it-switch-dot"}))
                ),  
                React.createElement("span", {className: "it-switch-note"}, note)
            );
        }
    }
}

module.exports = class InvisibleTyping {
    constructor(metaObject) {meta = this.meta = metaObject;}

    cleanup = new Set([
        () => Patcher.unpatchAll(),
        () => DOM.removeStyle(),
        () => new Set(document.getElementsByClassName("invisible-typing-button")).forEach(el => el.unmount?.())
    ]);

    start() {
        DOM.addStyle(`
            .it-title-wrap {
                font-size: 18px;
            }
            
            .it-title-wrap span {
                font-size: 12px;
                color: var(--text-muted);
                font-family: var(--font-primary);
            }

            .invisible-typing-button svg {
                color: var(--interactive-normal);
                overflow: visible;
            }
            
            .invisible-typing-button .disabled-stroke-through {
                position: absolute;
                transform: translateX(-15px) translateY(530px) rotate(-45deg);
            }
            
            .invisible-typing-button {
                margin-top: 3px;
                background: transparent;
            }

            .invisible-typing-button:hover:not(.disabled) svg {
                color: var(--interactive-hover);
            }

            .it-switch-wrapper {
                color: #fff;
                margin-bottom: 10px;
            }
            
            .it-switch-header {
                margin-bottom: 15px;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            
            .it-switch-name {
                font-size: 18px;
                font-weight: 500;
            }
            
            .it-switch-note {
                font-size: 14px;
                color: var(--text-muted);
            }
            
            .it-switch-item.it-switch-checked {
                background: var(--brand-experiment);
            }
            
            .it-switch-item {
                width: 40px;
                height: 24px;
                background: rgb(114, 118, 125);
                border-radius: 100px;
                cursor: pointer;
            }
            
            .it-switch-dot {
                width: 18px;
                height: 18px;
                background: #fff;
                border-radius: 100px;
                top: 3px;
                left: 3px;
                position: relative;
                transition: transform .3s ease-in-out;
            }
            
            .it-switch-checked .it-switch-dot {
                transform: translateX(16px);
            }

            .it-switch-wrapper {
                color: #fff;
                margin-bottom: 10px;
            }
            
            .it-switch-header {
                margin-bottom: 15px;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            
            .it-switch-name {
                font-size: 18px;
                font-weight: 500;
            }
            
            .it-switch-note {
                font-size: 14px;
                color: var(--text-muted);
            }
            
            .it-switch-item.it-switch-checked {
                background: var(--brand-experiment);
            }
            
            .it-switch-item {
                width: 40px;
                height: 24px;
                background: rgb(114, 118, 125);
                border-radius: 100px;
                cursor: pointer;
            }
            
            .it-switch-dot {
                width: 18px;
                height: 18px;
                background: #fff;
                border-radius: 100px;
                top: 3px;
                left: 3px;
                position: relative;
                transition: transform .3s ease-in-out;
            }
            
            .it-switch-checked .it-switch-dot {
                transform: translateX(16px);
            }
            
            .it-changelog-item {
                color: #fff;
            }
            
            .it-changelog-header {
                text-transform: uppercase;
                font-weight: 700;
                display: flex;
                align-items: center;
                margin-bottom: 10px;
            }
            
            .item-changelog-added .it-changelog-header {
                color: #45BA6A;
            }

            .item-changelog-fixed .it-changelog-header {
                color: #EC4245;
            }

            .item-changelog-improved .it-changelog-header {
                color: #5865F2;
            }
            
            .it-changelog-header::after {
                content: "";
                flex-grow: 1;
                height: 1px;
                background: currentColor;
                margin-left: 7px;
            }
            
            .it-changelog-item span {
                display: list-item;
                margin-left: 5px;
                list-style: inside;
            }
            
            .it-changelog-item span::marker {
                color: var(--background-accent);
            }

            .it-changelog-banner {
                width: 405px;
                border-radius: 8px;
                margin-bottom: 20px;
            }
        `);

        InvisibleTypingButton.defaultProps ??= {};

        [
            InvisibleTypingButton.defaultProps.PermissionUtils,
            InvisibleTypingButton.defaultProps.UserStore,
            InvisibleTypingButton.defaultProps.Tooltip
        ] = Webpack.getBulk(
            {searchExports: true, filter: Webpack.Filters.byProps("can", "areChannelsLocked")},
            m => m?._dispatchToken && m.getName() === "UserStore",
            {searchExports: true, filter: Webpack.Filters.byPrototypeFields("renderTooltip")}
        );

        this.patchTextAreaButtons().catch(() => {});
        this.patchStartTyping();
        this.maybeShowChangelog();
    }

    maybeShowChangelog() {
        if (this.meta.version === Settings.getSetting("latestUsedVersion")) return;

        const items = Array.from(meta.changelog.matchAll(/\[(\w+)\]\s?([^\n]+)/g), ([, type, content]) => {
            let className = "it-changelog-item";
            switch (type) {
                case "fixed":
                case "improved":
                case "added": {
                    className += " item-changelog-" + type;

                    break;
                };
            }

            return React.createElement("div", {
                className,
                children: [
                    React.createElement("h4", {className: "it-changelog-header"}, type),
                    React.createElement("span", null, content)
                ]
            });
        });

        "changelogImage" in meta && items.unshift(
            React.createElement("img", {
                className: "it-changelog-banner",
                src: meta.changelogImage
            })
        );

        Settings.updateSetting("latestUsedVersion", meta.version);
        const formatter = new Intl.DateTimeFormat(document.documentElement.lang, {month: "long", day: "numeric", year: "numeric"});
        UI.alert(React.createElement("div", {
            className: "it-title-wrap",
            children: [
                React.createElement("h1", null, "What's New - InvisibleTyping"),
                React.createElement("span", null, formatter.format(new Date(meta.changelogDate)))
            ]
        }), items);
    }

    async patchTextAreaButtons() {
        const buttonsClassName = Webpack.getByProps("profileBioInput", "buttons")?.buttons

        if (!buttonsClassName) return UI.showToast(`[${this.meta.name}] Could not add button to textarea.`, {type: "error"});
 
        const controller = new AbortController();
        const instance = await new Promise((resolve, reject) => {
            onceAdded("." + buttonsClassName, e => {
                const vnode = ReactUtils.getInternalInstance(e);

                if (!vnode) return;

                for (let curr = vnode, max = 100; curr !== null && max--; curr = curr.return) {
                    const tree = curr?.pendingProps?.children;
                    let buttons;
                    if (Array.isArray(tree) && (buttons = tree.find(s => s?.props?.type && s.props.channel && s.type?.$$typeof))) {
                        resolve(buttons.type);
                        break;
                    }
                }
            }, controller.signal);

            const abort = controller.abort.bind(controller);

            controller.signal.addEventListener("abort", () => {
                this.cleanup.delete(abort);
                reject();
            });

            this.cleanup.add(abort);
        }); 

        Patcher.after(instance, "type", (_, [props], res) => {
            if (!InvisibleTypingButton.shouldShow(res?.props?.children, props)) return;

            res.props.children.unshift(React.createElement(InvisibleTypingButton, props));
        });
    }

    patchStartTyping() {
        const TypingModule = InvisibleTypingButton.defaultProps.TypingModule = Webpack.getByProps("startTyping");

        Patcher.instead(TypingModule, "startTyping", (_, [channelId], originalMethod) => {
            if (InvisibleTypingButton.getState(channelId)) originalMethod(channelId);
        });
    }

    stop() {
        this.cleanup.forEach(clean => clean());
    }

    getSettingsPanel() {
        return React.createElement(SimpleSwitch, {
            get state() {return Settings.getSetting("autoEnable", false);},
            name: "Globally Toggle",
            note: "Enable/Disable your typing information globally and use excluded channels as white-/blacklist.",
            onChange: value => Settings.updateSetting("autoEnable", value)
        });
    }
};
