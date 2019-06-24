//META{"name":"ExtendedContextMenu"}*//

// !!! Hey there! If you didn't come here from the BetterDiscord Discord server ( https://discord.gg/2HScm8j )  !!! //
// !!! then please do not use whatever you were using that led you here, getting plugins from places other than !!! //
// !!! the #plugin repo channel in the BD server can be dangerous, as they can be malicious and do bad things.  !!! //

class ExtendedContextMenu {
    constructor() {
        // vv Stole this function from Zere's Plugin Library vv //
        this.getReactInstance = function (node) {
            if (!(node instanceof jQuery) && !(node instanceof Element))
                return undefined;
            var domNode = node instanceof jQuery ? node[0] : node;
            return domNode[Object.keys(domNode).find((key) => key.startsWith("__reactInternalInstance"))];
        };
        // ^^ Stole this function from Zere's Plugin Library ^^ //
    }
    getName() {
        return "Extended Context Menu";
    }
    getDescription() {
        return "Add useful stuff to the context menu.";
    }
    getVersion() {
        return "0.0.6";
    }
    getAuthor() {
        return "Qwerasd";
    }
    load() {
        this.listener = this.oncontextmenu.bind(this);
        this.copyText = require('electron').clipboard.writeText;
        const devModeModule = BdApi.findModuleByProps('developerMode');
        this.developerMode = () => devModeModule.developerMode;
    }
    start() {
        document.addEventListener('contextmenu', this.listener);
    }
    stop() {
        document.removeEventListener('contextmenu', this.listener);
    }
    oncontextmenu() {
        const menu = document.getElementsByClassName('da-contextMenu')[0];
        const reactInstance = this.getReactInstance(menu);
        if (!reactInstance)
            return;
        const props = reactInstance.return.memoizedProps;
        if (!props)
            return;
        const message = props.message;
        const channel = props.channel;
        const guildId = channel && props.channel.guild_id;
        const target = props.target;
        const finalGroup = menu.lastChild;
        if (message) {
            if (!this.developerMode()) {
                finalGroup.appendChild(this.createButton('Copy Message Link', (function () {
                    this.copyText(this.getMessageURL(guildId, channel.id, message.id));
                    return true;
                }).bind(this)));
            }
            finalGroup.appendChild(this.createButton('Copy Message', (function () {
                this.copyText(message.content);
                return true;
            }).bind(this)));
        }
        else if (channel) {
            if (channel.type !== 2) {
                finalGroup.appendChild(this.createButton('Mention', (function () {
                    this.addTextToTextarea(`<#${channel.id}>`);
                    return true;
                }).bind(this)));
            }
            finalGroup.appendChild(this.createButton('Copy Channel Link', (function () {
                this.copyText(this.getChannelURL(guildId, channel.id));
                return true;
            }).bind(this)));
        }
        if (target && target.className && (target.className.includes('hljs') || target.tagName === 'CODE')) {
            let codeNode = target;
            while (codeNode.tagName !== 'CODE' && codeNode.tagName === 'SPAN')
                codeNode = codeNode.parentNode;
            finalGroup.appendChild(this.createButton('Copy Codeblock', (function () {
                this.copyText(codeNode.innerText);
                return true;
            }).bind(this)));
        }
        reactInstance.return.stateNode && reactInstance.return.stateNode.props.onHeightUpdate();
    }
    createButton(text, func) {
        const button = document.createElement('div');
        button.tabIndex = 0;
        button.setAttribute('role', 'button');
        button.className = 'item-1Yvehc da-item extendedContextMenu';
        button.addEventListener('click', e => {
            const close = func(e);
            if (close)
                document.body.click();
        });
        const span = document.createElement('span');
        span.innerText = text;
        const hint = document.createElement('div');
        hint.className = 'hint-22uc-R da-hint';
        button.appendChild(span);
        button.appendChild(hint);
        return button;
    }
    getMessageURL(server, channel, message) {
        return `${this.getChannelURL(server, channel)}/${message}`;
    }
    getChannelURL(server, channel) {
        return `${document.location.origin}/channels/${server ? server : '@me'}/${channel}`;
    }
    addTextToTextarea(text) {
        const textarea = document.getElementsByTagName('textarea')[0];
        textarea.select();
        document.execCommand('insertText', false, text);
    }
}