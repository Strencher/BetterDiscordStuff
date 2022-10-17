/**
 * @name InvisibleTyping
 * @version 1.2.3
 * @description Enhanced version of silent typing.
 * @author Strencher
 */

module.exports = meta => {
    const {React, Webpack, Patcher, Webpack: {Filters}} = BdApi;

    const ContextMenuActions = {};

    BdApi.Webpack.getModule((_, m) => {
        let matched = false;
        for (const func of Object.values(m.exports)) {
            if (typeof func !== "function") continue;
    
            if (func.toString().indexOf("CONTEXT_MENU_CLOSE") > -1) {
                ContextMenuActions.closeContextMenu = func;
                matched = true;
            }
            else if (matched && func.toString().indexOf("renderLazy") > -1) {
                ContextMenuActions.openContextMenu = func;
                matched = true;
            }
        }

        return matched;
    });

    const ReactWrapper = (props) => {
        return React.createElement("div", {
            style: {display: "contents"},
            ref: el => {
                if (!el) return;
                el.appendChild(props.element);
            }
        });
    };

    const Utilities = {
        getReactProps: (el, filter = _ => _) => {
            const instance = BdApi.getInternalInstance(el);
    
            for (let current = instance.return, i = 0; i > 10000 || current !== null; current = current?.return, i++) {
                if (current?.pendingProps && filter(current.pendingProps)) return current.pendingProps;
            }
    
            return null;
        },
        // Taken from SolidJS' template function.
        template(html, check, isSVG) {
            const t = document.createElement("template");
            t.innerHTML = html;
            let node = t.content.firstChild;
            if (isSVG)
                node = node.firstChild;
            return node;
        },
        createElement: (type, props, ...children) => {
            if (typeof type === "function") return type({...props, children: [].concat()})
    
            const node = document.createElement(type);
    
            for (const key of Object.keys(props)) {
                if (key.indexOf("on") === 0) node.addEventListener(key.slice(2).toLowerCase(), props[key]);
                else if (key === "children") {
                    node.append(...(Array.isArray(props[key]) ? props[key] : [].concat(props[key])));
                } else {
                    node.setAttribute(key === "className" ? "class" : key, props[key]);
                }
            }
    
            if (children.length) node.append(...children);
    
            return node;
        },
        joinClassNames: (...classNames) => classNames.filter(Boolean).join(" ")
    };

    const Settings = {
        _listeners: new Set,
        getSetting(key, defValue) {return BdApi.loadData(meta.name, key) ?? defValue;},
        updateSetting(key, value) {BdApi.saveData(meta.name, key, value), this._alertListeners();},
        _alertListeners() {this._listeners.forEach(l => l());},
        onChange(callback) {this._listeners.add(callback);},
        offChange(callback) {return this._listeners.delete(callback);}
    };

    const wrapIcon = Icon => props => {
        const element = Icon.cloneNode(true);

        for (const prop in props) {
            element.setAttribute(prop, props[prop]);
        }

        return element;
    };

    const EnabledIcon = wrapIcon(Utilities.template(
        `<svg width="25" height="25" viewBox="0 0 576 512">
            <path fill="currentColor" d="M528 448H48c-26.51 0-48-21.49-48-48V112c0-26.51 21.49-48 48-48h480c26.51 0 48 21.49 48 48v288c0 26.51-21.49 48-48 48zM128 180v-40c0-6.627-5.373-12-12-12H76c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12zm96 0v-40c0-6.627-5.373-12-12-12h-40c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12zm96 0v-40c0-6.627-5.373-12-12-12h-40c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12zm96 0v-40c0-6.627-5.373-12-12-12h-40c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12zm96 0v-40c0-6.627-5.373-12-12-12h-40c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12zm-336 96v-40c0-6.627-5.373-12-12-12h-40c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12zm96 0v-40c0-6.627-5.373-12-12-12h-40c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12zm96 0v-40c0-6.627-5.373-12-12-12h-40c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12zm96 0v-40c0-6.627-5.373-12-12-12h-40c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12zm-336 96v-40c0-6.627-5.373-12-12-12H76c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12zm288 0v-40c0-6.627-5.373-12-12-12H172c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h232c6.627 0 12-5.373 12-12zm96 0v-40c0-6.627-5.373-12-12-12h-40c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12z"></path>
        </svg>`
    ));

    const DisabledIcon = wrapIcon(Utilities.template(
        `<svg width="25" height="25" viewBox="0 0 576 512">
            <path fill="currentColor" d="M528 448H48c-26.51 0-48-21.49-48-48V112c0-26.51 21.49-48 48-48h480c26.51 0 48 21.49 48 48v288c0 26.51-21.49 48-48 48zM128 180v-40c0-6.627-5.373-12-12-12H76c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12zm96 0v-40c0-6.627-5.373-12-12-12h-40c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12zm96 0v-40c0-6.627-5.373-12-12-12h-40c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12zm96 0v-40c0-6.627-5.373-12-12-12h-40c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12zm96 0v-40c0-6.627-5.373-12-12-12h-40c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12zm-336 96v-40c0-6.627-5.373-12-12-12h-40c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12zm96 0v-40c0-6.627-5.373-12-12-12h-40c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12zm96 0v-40c0-6.627-5.373-12-12-12h-40c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12zm96 0v-40c0-6.627-5.373-12-12-12h-40c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12zm-336 96v-40c0-6.627-5.373-12-12-12H76c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12zm288 0v-40c0-6.627-5.373-12-12-12H172c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h232c6.627 0 12-5.373 12-12zm96 0v-40c0-6.627-5.373-12-12-12h-40c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12z"></path>
            <rect class="IT-disabledStrokeThrough" x="10" y="10" width="600pt" height="70px" fill="#f04747" /> 
        </svg>
    `));

    const [TypingModule, Tooltips, TextArea, ContextMenuClasses, ScrollerClasses] = Webpack.getBulk.apply(null, [
        Filters.byProps("startTyping", "stopTyping"),
        Filters.byProps("tooltipContent"),
        Filters.byProps("textAreaThreadCreation"),
        Filters.byProps("menu", "styleFlexible"),
        Filters.byProps("scrollerBase", "scrolling")
    ].map(filter => ({filter})));

    class ContextMenu {
        constructor(target, items) {
            this.target = target;
            this.items = items;

            BdApi.onRemoved(target, () => {
                this.ref?.remove();
                this.unlisten();
            });

            target.addEventListener("contextmenu", (e) => {
                this.open(e);
            });
        }

        handleClick = (e) => {
            if (e.target === this.ref || e.target.contains(this.ref)) return;
            
            ContextMenuActions.closeContextMenu();
        }

        listen() {
            document.addEventListener("click", this.handleClick);
        }

        unlisten() {
            document.removeEventListener("click", this.handleClick);
        }

        open(e) {
            const res = this.ref = this.render();
            ContextMenuActions.openContextMenu(e, () => React.createElement(ReactWrapper, {element: res}));

            this.listen();
        }

        renderItem({label, action}) {
            const element = Utilities.createElement("div", {
                className: ContextMenuClasses.label
            }, label);

            return Utilities.createElement("div", {
                className: Utilities.joinClassNames("IT-menu-item", ContextMenuClasses.item, ContextMenuClasses.labelContainer, ContextMenuClasses.colorDefault),
                onClick: event => {
                    action(event, {
                        updateLabel(label) {
                            label.innerText = label;
                        }
                    });

                    this.unlisten();
                    ContextMenuActions.closeContextMenu();
                },
                children: element
            });
        }

        render() {
            return Utilities.createElement("div", {
                className: Utilities.joinClassNames("IT-context-menu", ContextMenuClasses.scroller, ScrollerClasses.thin, ContextMenuClasses.menu, ContextMenuClasses.styleFlexible),
                children: this.items.map(item => this.renderItem(item))
            });
        }
    }

    class Tooltip {
        containerClassName = Utilities.joinClassNames("IT-tooltip", ...["tooltip", "tooltipTop", "tooltipPrimary"].map(c => Tooltips?.[c]));
        pointerClassName = Tooltips?.tooltipPointer;
        contentClassName = Tooltips?.tooltipContent;

        constructor(target, {text, spacing}) {
            this.target = target;
            this.ref = null;
            this.text = text;
            this.spacing = spacing;
            this.tooltip = Utilities.createElement("div", {
                className: this.containerClassName,
                style: "visibility: hidden;",
                children: [
                    Utilities.createElement("div", {className: this.pointerClassName, style: "left: calc(50% + 0px)"}),
                    Utilities.createElement("div", {className: this.contentClassName}, text)
                ]
            });

            this.target.addEventListener("mouseenter", () => {
                this.show();    
            });

            this.target.addEventListener("mouseleave", () => {
                this.hide();
            });

            BdApi.onRemoved(this.target, () => {
                this.hide();
            });
        }

        get container() {return document.querySelector(".layerContainer-2v_Sit ~ .layerContainer-2v_Sit");}

        checkOffset(x, y) {
            if (y < 0) {
                y = 0;
            } else if (y > window.innerHeight) {
                y = window.innerHeight;
            }
    
            if (x > window.innerWidth) {
                x = window.innerWidth;
            } else if (x < 0) {
                x = 0;
            }
    
            return {x, y};
        }

        show() {
            const tooltip = this.ref = this.tooltip.cloneNode(true);
            this.container.appendChild(tooltip);

            const targetRect = this.target.getBoundingClientRect();
            const tooltipRect = tooltip.getBoundingClientRect();

            let top = (targetRect.y - tooltipRect.height) - this.spacing;
            let left = targetRect.x + (targetRect.width / 2) - (tooltipRect.width / 2);    

            const position = this.checkOffset(left, top);

            tooltip.style = `top: ${position.y}px; left: ${position.x}px;`;
        }

        hide() {
            this.ref?.remove();
        }
    }

    class InvisibleTypingButton {
        constructor(target, channelId) {
            this._destroyed = false;
            this.target = target;
            this.channelId = channelId;
            target._patched = true;

            Settings.onChange(this.handleChange);
        }

        unmount() {
            this.target._patched = true;
            Settings.offChange(this.handleChange);
        }

        handleChange = () => {
            if (this._destroyed) return;

            if (this.state && _.isEqual(this.state, InvisibleTypingButton.getState(this.channelId))) return;

            this.mount();
        }

        static getState(channelId) {
            const isGlobal = Settings.getSetting("autoEnable", true);
            const isExcluded = Settings.getSetting("exclude", []).includes(channelId);

            return {
                isGlobal,
                enabled: isGlobal ? !isExcluded : isExcluded,
            };
        }

        mount() {
            if (this._destroyed) return false;

            const res = this.render();
            if (!res) this.ref?.remove();
            else {
                if (this.ref) {
                    this.ref.replaceWith(res);
                } else {
                    this.target.insertBefore(res, this.target.firstChild);
                }
                
                this.ref = res;
                res._unmount = this.unmount.bind(this);
            }
        }

        removeItem(array, item) {
            while (array.includes(item)) {
                array.splice(array.indexOf(item), 1);
            }
        
            return array;
        }

        get isEmpty() {return this.target.parentElement.getElementsByClassName(TextArea.textArea)[0]?.textContent?.length === 0}

        handleClick = () => {
            const excludeList = Settings.getSetting("exclude", []).concat();

            if (excludeList.includes(this.channelId)) {
                this.removeItem(excludeList, this.channelId);
                TypingModule.stopTyping(this.channelId);
            } else {
                excludeList.push(this.channelId);
                if (!this.isEmpty) TypingModule.startTyping(this.channelId);
            }

            Settings.updateSetting("exclude", excludeList);
        }

        render() {
            const {isGlobal, enabled} = this.state = InvisibleTypingButton.getState(this.channelId);

            const container = Utilities.createElement("button", {
                className: Utilities.joinClassNames("IT-button", enabled && "IT-disabled"),
                onClick: this.handleClick
            });

            const Icon = enabled ? EnabledIcon() : DisabledIcon();

            container.appendChild(Icon);

            new Tooltip(container, {
                text: enabled ? "Typing Enabled" : "Typing Disabled",
                spacing: 8
            });

            new ContextMenu(container, [
                {
                    label: isGlobal ? "Disable Globally" : "Enable Globally",
                    action() {
                        Settings.updateSetting("autoEnable", !isGlobal);
                    }
                },
                {
                    label: "Reset Config",
                    action() {
                        Settings.updateSetting("exclude", []);
                        BdApi.showToast("Successfully reset config for all channels.", {type: "success"});
                    }
                }
            ]);

            return container;
        }
    }

    return {
        start() {
            BdApi.injectCSS(meta.name, /*css*/`
                .IT-context-menu {
                    flex-direction: column;
                }

                .IT-menu-item:hover {
                    background-color: var(--brand-experiment-560);
                    color: #fff;
                }

                .IT-tooltip {
                    position: fixed;
                }

                .IT-button svg {
                    color: var(--interactive-normal);
                    overflow: visible;
                }
                
                .IT-button .IT-disabledStrokeThrough {
                    position: absolute;
                    transform: translateX(-15px) translateY(530px) rotate(-45deg);
                }
                
                .IT-button {
                    margin-top: 3px;
                    background: transparent;
                }

                .IT-button:hover:not(.IT-disabled) svg {
                    color: var(--interactive-hover);
                }
            `);

            Patcher.instead(meta.name, TypingModule, "startTyping", (_, [channelId], originalMethod) => {
                if (InvisibleTypingButton.getState(channelId).enabled) originalMethod(channelId);
            });

            const elements = document.getElementsByClassName(TextArea.textArea);

            if (!elements.length) return;

            for (const element of elements) {
                const props = Utilities.getReactProps(element, e => e?.channel);
                const [buttons] = element.parentElement.getElementsByClassName(TextArea.buttons);
                
                if (!props || !buttons || buttons._patched) continue;

                new InvisibleTypingButton(buttons, props.channel.id).mount();
            }
        },
        stop() {
            BdApi.clearCSS(meta.name);
            document.querySelectorAll(".TI-button").forEach(el => el._unmount?.());
            Patcher.unpatchAll(meta.name);
        },
        observer({addedNodes}) {
            for (const node of addedNodes) {
                if (node.nodeType === Node.TEXT_NODE) continue;
                
                const elements = node.getElementsByClassName(TextArea.textArea);

                if (!elements.length) continue;

                for (const element of elements) {
                    const props = Utilities.getReactProps(element, e => e?.channel);
                    const [buttons] = element.parentElement.getElementsByClassName(TextArea.buttons);

                    if (!props || !buttons || buttons._patched) continue;

                    new InvisibleTypingButton(buttons, props.channel.id).mount();
                }
            }
        }
    };
};
