/**
* @name MessageLinkEmbed
* @displayName MessageLinkEmbed
* @authorId 415849376598982656
* @invite gvA2ree
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

const MessageLinkEmbed = (() => {
    const config = {
        info: {
            name: "MessageLinkEmbed",
            authors: [
                {
                    name: "Strencher",
                    discord_id: "415849376598982656",
                    github_username: "Strencher",
                    twitter_username: "Strencher3"
                },
                {
                    name: "Juby210",
                    discord_id: "324622488644616195",
                    github_username: "Juby210"
                }
            ],
            version: "0.0.2",
            description: "Make messagelinks look like any other link but with the message. Converted from a PC plugin -> BD plugin. full credits go to @Juby210",
            github: "https://github.com/Strencher/BetterDiscordStuff/blob/master/MessageLinkEmbed/MessageLinkEmbed.plugin.js",
            github_raw: "https://raw.githubusercontent.com/Strencher/BetterDiscordStuff/master/MessageLinkEmbed/MessageLinkEmbed.plugin.js"
        },
        changelog: [
            {
                title: "fixed",
                type: "fixed",
                items: ["Fixed clicking on the name reloads discord."]
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
                [`The library plugin needed for ${config.info.name} is missing. Please click Download Now to install it.`], {
                    confirmText: "Download",
                    cancelText: "Cancel",
                    onConfirm: () => {
                        require("request").get("https://rauenzi.github.io/BDPluginLibrary/release/0PluginLibrary.plugin.js", async (error, response, body) => {
                        if (error) return require("electron").shell.openExternal("https://betterdiscord.net/ghdl?url=https://raw.githubusercontent.com/rauenzi/BDPluginLibrary/master/release/0PluginLibrary.plugin.js");
                        await new Promise(r => require("fs").writeFile(require("path").join(BdApi.Plugins.folder, "0PluginLibrary.plugin.js"), body, r));
                        });
                    }
                });
        }
        start() { }
        stop() { }
    } : (([Plugin, Api]) => {
        const plugin = (Plugin, Api) => {
            
            const { WebpackModules, PluginUtilities, DiscordModules, ReactComponents, Patcher } = Api;
            const { React } = DiscordModules;
            const Message = WebpackModules.find(m=>m.default && m.default.displayName == "Message");
            const { embedMedia, embedAuthor, embedLink, grid, embedFull, embed, embedFooter, embedFooterText, embedImage, embedAuthorNameLink, embedFooterSeparator, embedMargin, embedAuthorIcon, embedAuthorName, embedDescription } = WebpackModules.getByProps("embedAuthor");
            const { embedWrapper } = WebpackModules.getByProps("embedWrapper");
            const { markup } = WebpackModules.getByProps("markup");
            const { anchor } = WebpackModules.getByProps("anchorUnderlineOnHover");
            const { parse } = WebpackModules.getByProps("parse", "parseTopic");
            const { MessageTimestamp } = WebpackModules.getByProps("MessageTimestamp");
            const { getMessage } = WebpackModules.getByProps("getMessage");
            const isVideo = attachment => !!attachment.url.match(/\.(?:mp4|mov|webm)$/)
            const Video = WebpackModules.getByDisplayName("LazyVideo");
            const Image = WebpackModules.getByDisplayName("LazyImageZoomable");
            const { stringify } = WebpackModules.getByProps('stringify', 'parse', 'encode');
            const User = WebpackModules.find(m => m.prototype && m.prototype.tag);
            const Timestamp = WebpackModules.find(m => m.prototype && m.prototype.toDate && m.prototype.month)
            const joinClass = (...e) => e.join(" ");
            const { jumpToMessage } = WebpackModules.getByProps("jumpToMessage")
            let lastFetch = 0
            let cache = {}
            async function getMsg(channelId, messageId) {
                let message = getMessage(channelId, messageId) || cache[messageId]
                if (!message) {
                    if (lastFetch > Date.now() - 2500) await new Promise(r => setTimeout(r, 2500))
                    const data = await DiscordModules.APIModule.get({
                        url: DiscordModules.DiscordConstants.Endpoints.MESSAGES(channelId),
                        query: stringify({
                            limit: 1,
                            around: messageId
                        }),
                        retries: 2
                    })
                    lastFetch = Date.now()
                    message = data.body[0]
                    if (!message) return
                    message.author = new User(message.author)
                    message.timestamp = new Timestamp(message.timestamp)
                }
                cache[messageId] = message
                return message;
            }
            const getMsgWithQueue = (() => {
                let pending = Promise.resolve()
            
                const run = async (channelId, messageId) => {
                    try {
                        await pending
                    } finally {
                        return getMsg(channelId, messageId)
                    }
                }
            
                return (channelId, messageId) => (pending = run(channelId, messageId))
            })()
            class LinkEmbed extends React.Component {
                constructor(props) {
                    super(props)
                    this.state = null;
                }
            
                async componentDidMount() {
                    if (!this.state) {
                        const linkArray = this.props.msgLink.split('/')
                        this.setState(await getMsgWithQueue(linkArray[5], linkArray[6]))
                    }
                }
                render() {
                    if(!this.state) return null;
                    let attachment = null
                    if (this.state.attachments[0] && this.state.attachments[0].width)
                        attachment = this.state.attachments[0]
                    if (this.state.embeds[0] && this.state.embeds[0].type == '')
                        attachment = this.state.embeds[0].image || this.state.embeds[0].thumbnail
                    if (attachment && !attachment.proxy_url) attachment.proxy_url = attachment.proxyURL
                    if (attachment) {
                        if (!attachment.proxy_url) attachment.proxy_url = attachment.proxyURL
                        attachment = isVideo(attachment) ? React.createElement(Video, {
                            className: embedWrapper,
                            fileName: attachment.filename,
                            fileSize: attachment.size,
                            naturalHeight: attachment.height,
                            naturalWidth: attachment.width,
                            poster: attachment.proxy_url + '?format=jpeg',
                            src: attachment.url,
                            width: attachment.width > 370 ? 370 : attachment.width,
                            playable: true
                        }) : React.createElement(Image, {
                            width: attachment.width,
                            height: attachment.height,
                            original: attachment.url,
                            src: attachment.proxy_url,
                            className: joinClass(embedMedia, embedImage, embedWrapper)
                        })
                    }
                    return React.createElement("div", {
                        className: joinClass(embedWrapper, embedFull, embed, markup, grid),
                        style: {
                            borderLeft: "4px solid "+this.state.colorString || "white"
                        }
                    }, React.createElement("div", {
                        className: grid,
                        children: [
                            React.createElement("div", {
                                className: joinClass(embedAuthor, embedMargin),
                                children: [
                                    React.createElement("img", {
                                        className: embedAuthorIcon,
                                        src: this.state.author.avatarURL
                                    }),
                                    React.createElement("a", {
                                        className: joinClass(anchor, embedAuthorName, embedAuthorNameLink, embedLink),
                                        href: this.props.msgLink,
                                        onClick: e=> {
                                            e.preventDefault();
                                            jumpToMessage(this.state.channel_id, this.state.id)
                                        },
                                        children: this.state.author.tag
                                    })
                                ]
                            }),
                            React.createElement("div", {
                                className: joinClass(embedDescription, embedMargin),
                                children: [parse(this.state.content), attachment]
                            }),
                            React.createElement("div", {
                                className: joinClass(embedFooter, embedFooterText, embedMargin),
                                children: [
                                    parse(`<#${this.state.channel_id}>`),
                                    React.createElement("span", {
                                        className: embedFooterSeparator,
                                        children: "•",
                                        style: {
                                            color: "var(--header-secondary)"
                                        }
                                    }),
                                    React.createElement(MessageTimestamp, {
                                        timestamp: this.state.timestamp
                                    })
                                ]
                            })
                        ]
                    }))
                }
            }
            return class MessageLinkEmbed extends Plugin {
                constructor() {
                    super();
                }

                onStart() { 
                    Patcher.after(Message, "default", (_, e) => {
                        const [{childrenMessageContent: { props: { message, content, onUpdate } }}] = e; 
                        if(!message || !content || !message.content) return;
                        const match = message.content.match(/https?:\/\/((canary|ptb)\.)?discordapp\.com\/channels\/(\d{17,19}|@me)\/\d{17,19}\/\d{17,19}/g);
                        if(!match || content.find(f=>f.props && f.props.name == "LinkEmbed")) return;
                        match.forEach(lnk => {
                            content.push("\n", React.createElement(LinkEmbed, { msgLink: lnk, name: "LinkEmbed" }));
                        })
                        onUpdate();
                    })
                }
                onStop() {
                    Patcher.unpatchAll();
                }

            }

        };
        return plugin(Plugin, Api);
    })(global.ZeresPluginLibrary.buildPlugin(config));
})();