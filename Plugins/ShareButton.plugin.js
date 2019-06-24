//META{"name":"ShareButton","website":"https://metalloriff.github.io/toms-discord-stuff/","source":"https://github.com/Metalloriff/BetterDiscordPlugins/blob/master/ShareButton.plugin.js"}*//

class ShareButton {
	
    getName() { return "Share Button"; }
    getDescription() { return "Allows you to easily share images, videos, links and messages to other channels and servers via the context menu and message dropdown menu."; }
    getVersion() { return "0.2.7"; }
	getAuthor() { return "Metalloriff"; }
	getChanges() {
		return {
            "0.1.2" : 
            `
                Halfed the size of the server items.
                Added a submenu for pinned and recent channels in the context menu.
                You can now share messages via the context menu.
                Shared messages are now quoted with the user's name.
                You can now share to direct messages.
            `,
            "0.2.7" :
            `
                Fixed the plugin, but the recent channels is still broken. I will try to fix it soon.
            `
		};
	}

    load() {}

	start() {
		const libLoadedEvent = () => {
			try{ this.onLibLoaded(); }
			catch(err) { console.error(this.getName(), "fatal error, plugin could not be started!", err); try { this.stop(); } catch(err) { console.error(this.getName() + ".stop()", err); } }
		};

		let lib = document.getElementById("NeatoBurritoLibrary");
		if (!lib) {
			lib = document.createElement("script");
			lib.id = "NeatoBurritoLibrary";
			lib.type = "text/javascript";
			lib.src = "https://rawgit.com/Metalloriff/BetterDiscordPlugins/master/Lib/NeatoBurritoLibrary.js";
			document.head.appendChild(lib);
		}

		this.forceLoadTimeout = setTimeout(libLoadedEvent, 30000);
		if (typeof window.NeatoLib !== "undefined") libLoadedEvent();
		else lib.addEventListener("load", libLoadedEvent);
	}
    
    getSettingsPanel() {
        setTimeout(() => {
            Metalloriff.Settings.pushChangelogElements(this);
        }, 0);

        return Metalloriff.Settings.Elements.pluginNameLabel(this.getName());
    }

    saveSettings() {
        NeatoLib.Settings.save(this);
    }
	
	onLibLoaded() {
        NeatoLib.Updates.check(this);

        this.settings = NeatoLib.Settings.load(this, {
            displayUpdateNotes : true
        });

        Metalloriff.Changelog.compareVersions(this.getName(), this.getChanges());

        this.guildModule = NeatoLib.Modules.get(["getGuild", "getGuilds"]);
        this.sortedGuildModule = NeatoLib.Modules.get("getSortedGuilds");
        this.channelModule = NeatoLib.Modules.get(["getChannel", "getChannels"]);
        this.dmModule = NeatoLib.Modules.get("getPrivateChannelIds");
        this.userModule = NeatoLib.Modules.get(["getUser", "getUsers"]);
        this.transitionModule = NeatoLib.Modules.get("transitionTo");
        this.messageModule = NeatoLib.Modules.get("sendMessage");

        let data = NeatoLib.Data.load("ShareButton", "data", { recentChannels : [], pinnedChannels : [] });

        this.recentChannels = data.recentChannels || [];
        this.pinnedChannels = data.pinnedChannels || [];

        this.popoutObserver = new MutationObserver(m => {
            if(m[0].addedNodes && m[0].addedNodes[0] instanceof Element && m[0].addedNodes[0].firstChild && m[0].addedNodes[0].firstChild.classList.contains("option-popout")) {
                let dropdown = e[0].addedNodes[0].firstChild, message = NeatoLib.ReactData.getProps(dropdown).message;
                dropdown.insertAdjacentHTML("afterBegin", `<div id="sb-share-popout" class="btn-item">Share</div>`);
                document.getElementById("sb-share-popout").addEventListener("click", () => {
                    this.openShareMenu(undefined, NeatoLib.Modules.get("messageCozy").message.split(" ").join(""), `"${message.content}" - ${message.author.username}`);
                    dropdown.style.display = "none";
                });
            }
        });

        setTimeout(() => {
            if(document.getElementsByClassName("popouts-3dRSmE")) this.popoutObserver.observe(document.getElementsByClassName("popouts-3dRSmE")[0], { childList : true });
        }, 5000);

        this.contextEvent = e => {
            if(!NeatoLib.ContextMenu.get()) setTimeout(() => this.onContextMenu(e), 0);
            else this.onContextMenu(e);
        };

        document.addEventListener("contextmenu", this.contextEvent);

        NeatoLib.Changelog.compareVersions(this.getName(), this.getChanges());

        NeatoLib.Events.onPluginLoaded(this);

    }
    
    saveData() { NeatoLib.Data.save("ShareButton", "data", { recentChannels : this.recentChannels, pinnedChannels : this.pinnedChannels }); }

    onContextMenu(e) {
        if(e.target.localName != "img" && e.target.localName != "video" && !e.target.className.includes("markup")) return;

        let choices = [], pinnedChannelsItem = [], recentChannelsItem = [];

        let channelClick = (channel, ce) => {

            let url = e.target.src;

            if(!url) url = e.target.href;

            url = url.split("?")[0];

            let msg = NeatoLib.ReactData.getProps(e.target).message;

            if(!url) url = `"${msg.content}" - ${msg.author.username}`;

            ce.currentTarget.dataset.guildId = channel.guild_id;
            ce.currentTarget.dataset.channelId = channel.id;
            ce.currentTarget.dataset.content = url;

            this.sendMessage(ce);

            ce.currentTarget.innerText = "Sent!";
            ce.currentTarget.style.backgroundColor = "#43b581";
            ce.currentTarget.style.cursor = "default";

            ce.currentTarget.onclick = null;

        };

        for(let i = 0; i < this.pinnedChannels.length; i++) {
            let channel = this.channelModule.getChannel(this.pinnedChannels[i]);

            if(!channel) continue;

            pinnedChannelsItem.push(NeatoLib.ContextMenu.createItem("#" + channel.name, ce => channelClick(channel, ce), { hint : this.guildModule.getGuild(channel.guild_id).name }));
        }

        for(let i = 0; i < this.recentChannels.length; i++) {
            let channel = this.channelModule.getChannel(this.recentChannels[i]);

            if(!channel) continue;

            recentChannelsItem.push(NeatoLib.ContextMenu.createItem("#" + channel.name, ce => channelClick(channel, ce), { hint : this.guildModule.getGuild(channel.guild_id).name }));
        }

        let open = () => { this.openShareMenu(e); NeatoLib.ContextMenu.close(); };
        
        choices.push(NeatoLib.ContextMenu.createSubMenu("Pinned Channels", pinnedChannelsItem));
        choices.push(NeatoLib.ContextMenu.createSubMenu("Recent Channels", recentChannelsItem));
        choices.push(NeatoLib.ContextMenu.createItem("Open Share Menu", open));

        NeatoLib.ContextMenu.get().insertAdjacentElement("afterBegin", NeatoLib.ContextMenu.createSubMenu("Share", [NeatoLib.ContextMenu.createGroup(choices)], { callback : open }));
    }

    openShareMenu(e, definedName, definedData) {
        if(document.getElementById("sb-menu")) return document.getElementById("sb-menu").remove();

        let menu = NeatoLib.UI.createBasicScrollList("sb-menu", "Share");

        menu.window.insertAdjacentHTML("afterBegin", `
            <style>
            #sb-menu {
                z-index: 1000;
                position: absolute;
                left: 45%;
                bottom: 8%;
            }

            .sb-label {
                color: white;
                font-size: 30px;
                padding-top: 20px;
                padding-left: 20px;
            }

            .sb-button {
                border-radius: 10px;
                background-color: rgba(0, 0, 0, 0.2);
                cursor: pointer;
                transition: background 0.3s;
            }

            .sb-button:hover {
                background-color: rgba(255, 255, 255, 0.2);
            }

            .sb-button:active {
                background-color: rgba(0, 0, 0, 0.3);
            }

            .sb-guilds {
                max-height: 870px;
            }
            
            .sb-channel-item-button {
                text-align: center;
                margin: 5px;
            }

            .sb-channel-item {
                margin: auto;
                width: 95%;
                height: 40px;
                line-height: 40px;
                color: white;
                margin-top: 18px;
            }

            .sb-server-item {
                margin: 5px;
                margin-top: 10px;
                padding: 1px;
            }

            .sb-server-item-icon {
                width: 25px;
                height: 25px;
                background-color: rgba(0, 0, 0, 0.2);
                background-size: cover;
                margin: 10px;
                border-radius: 5px;
            }

            .sb-server-item-label {
                color: white;
                display: inline-block;
                margin-left: 35px;
                width: 600px;
                font-size: 25px;
                font-weight: 500;
            }
            </style>
        `);
        
        let url, filename;

        if(definedName && definedData) {
            url = definedData;
            filename = definedName;
        } else {
            url = e.target.src;

            if(!url) {
                url = e.target.href;
                filename = url;
            } else {
                url = url.split("?")[0];
                filename = url.substring(url.lastIndexOf("/") + 1, url.length);
            }
        }

        let msg = NeatoLib.ReactData.getProps(e.target).message;

        if(!url) url = `"${msg.content}" - ${msg.author.username}`;

        if(filename) menu.window.getElementsByTagName("h2")[0].innerText += filename;

        let recentChannels, pinnedChannels;

        let updateChannels = () => {
            let ci = document.getElementsByClassName("sb-channel-item-button");

            for(let i = 0; i < ci.length; i++) {
                ci[i].onclick = channelClickEvent;
                ci[i].oncontextmenu = channelContextEvent;
            }
        },
        
        updateRecentChannels = () => {
            if(recentChannels) {
                recentChannels.remove();
                recentChannels = null;
            }

            for(let i = 0; i < this.recentChannels.length; i++) {
                let channel = this.channelModule.getChannel(this.recentChannels[i]), guild;
                if (channel) guild = this.guildModule.getGuild(channel.guild_id);

                if(!channel || !guild) continue;

                if(!recentChannels) recentChannels = document.getElementById("sb-servers").insertBefore(NeatoLib.DOM.createElement({
                    id : "sb-recent-channels",
                    innerHTML : `<div class="sb-label">Recent Channels</div>`
                }), null);

                let ci = document.createElement("div");
                ci.className = "sb-channel-item-button sb-button";
                ci.dataset.guildId = guild.id;
                ci.dataset.channelId = channel.id;
                ci.dataset.content = url;
                ci.innerHTML = `<div class="sb-channel-item">#${channel.name} - ${guild.name}</div>`;

                recentChannels.appendChild(ci);
            }
            updateChannels()
        },
        
        updatePinnedChannels = () => {
            if(pinnedChannels) {
                pinnedChannels.remove();
                pinnedChannels = null;
            }

            for(let i = 0; i < this.pinnedChannels.length; i++) {
                let channel = this.channelModule.getChannel(this.pinnedChannels[i]), guild;
                if (channel) guild = this.guildModule.getGuild(channel.guild_id);

                if(!channel || !guild) continue;

                if(!pinnedChannels) {
                    menu.scroller.insertAdjacentHTML("afterBegin", `<div id="sb-pinned-channels"><div class="sb-label">Pinned Channels</div></div>`);
                    pinnedChannels = document.getElementById("sb-pinned-channels");
                }

                let ci = document.createElement("div");
                ci.className = "sb-channel-item-button sb-button";
                ci.dataset.guildId = guild.id;
                ci.dataset.channelId = channel.id;
                ci.dataset.content = url;
                ci.innerHTML = `<div class="sb-channel-item">#${channel.name} - ${guild.name}</div>`;

                pinnedChannels.appendChild(ci);
            }
            updateChannels();
        };

        let guilds = this.sortedGuildModule.getSortedGuilds(), guildsParent, allChannels = Object.values(this.channelModule.getChannels()).sort((x, y) => x.position - y.position);

        for(let i = 0; i < guilds.length; i++) {
            if(!guildsParent) {
                menu.scroller.insertAdjacentHTML("beforeEnd", 
                `<div id="sb-servers">
                    <div class ="sb-label">Servers</div>
                    <div data-server-id="DM" data-opened="false" class="sb-server-item sb-dm-item sb-button">
                        <div class="sb-server-item-icon" style="background-image: url('/assets/89576a4bb71f927eb20e8aef987b499b.svg')">
                            <div class="sb-server-item-label">Direct Messages</div>
                        </div>
                        <div class="sb-server-item-channels"></div>
                    </div>
                </div>`);

                guildsParent = document.getElementById("sb-servers");
                
                document.getElementsByClassName("sb-dm-item")[0].onclick = e => {
                    if(e.target.classList.contains("sb-dm-subitem")) return;

                    let par = e.currentTarget.getElementsByClassName("sb-server-item-channels")[0], dms = this.dmModule.getPrivateChannelIds();

                    let dmClickEvent = e => {
                        this.sendMessage(e);

                        e.currentTarget.style.backgroundColor = "#43b581";
                        e.currentTarget.style.cursor = "default";

                        NeatoLib.showToast("Shared!", "success");

                        e.currentTarget.onclick = null;
                        getEventListeners(e.currentTarget).click[0].remove();
                    };

                    if(par.children.length) {
                        par.innerHTML = "";
                        e.currentTarget.style.backgroundColor = "";
                    } else {
                        for(let di = 0; di < dms.length; di++) {
                            let dm = this.channelModule.getChannel(dms[di]);

                            if(dm.recipients.length > 1) {
                                let item = document.createElement("div");

                                item.className = "sb-server-item sb-dm-subitem sb-button";

                                item.style.margin = "15px";
                                item.style.marginLeft = "30px";

                                item.dataset.channelId = dms[di];
                                item.dataset.content = url;

                                item.innerHTML = `<div class="sb-server-item-icon" style="height: auto;width:0px"><div class="sb-server-item-label" style="pointer-events:none;">${Array.from(dm.recipients, uid => this.userModule.getUser(uid).username).join(", ")}</div></div>`;

                                item.addEventListener("click", dmClickEvent);

                                par.appendChild(item);
                            } else {
                                let user = this.userModule.getUser(dm.recipients[0]);

                                if(!user) continue;

                                let item = document.createElement("div");

                                item.className = "sb-server-item sb-dm-subitem sb-button";

                                item.style.margin = "15px";
                                item.style.marginLeft = "30px";

                                item.dataset.channelId = dms[di];
                                item.dataset.content = url;

                                item.innerHTML = `<div class="sb-server-item-icon" style="background-image: url('${user.getAvatarURL()}');"><div class="sb-server-item-label" style="pointer-events:none;">${user.username}</div></div>`;

                                item.addEventListener("click", dmClickEvent);

                                par.appendChild(item);
                            }
                        }
                    }
                };
            }

            guildsParent.insertAdjacentHTML("beforeEnd", `<div data-server-id="${guilds[i].guild.id}" data-opened="false" class="sb-server-item sb-button"><div class="sb-server-item-icon" style="background-image: url('${guilds[i].guild.getIconURL()}');"><div class="sb-server-item-label">${guilds[i].guild.name}</div></div><div class="sb-server-item-channels"></div></div>`);
        }
        
        let channelClickEvent = e => {
            this.sendMessage(e);

            e.currentTarget.getElementsByClassName("sb-channel-item")[0].innerText = "Shared!";

            e.currentTarget.style.backgroundColor = "#43b581";
            e.currentTarget.style.cursor = "default";

            NeatoLib.showToast("Shared!", "success");

            e.currentTarget.removeEventListener("click", channelClickEvent);
            e.currentTarget.removeEventListener("contextmenu", channelContextEvent);

            if(this.recentChannels.indexOf(e.currentTarget.dataset.channelId) != -1) this.recentChannels.splice(this.recentChannels.indexOf(e.currentTarget.dataset.channelId), 1);
            this.recentChannels.push(e.currentTarget.dataset.channelId);
            while(this.recentChannels.length >= 10) this.recentChannels.splice(0, 1);

            updateRecentChannels();

            this.saveData();
        },

        channelContextEvent = e => {
            let items = [], cid = e.currentTarget.dataset.channelId;

            if(this.pinnedChannels.includes(cid)) items.push(NeatoLib.ContextMenu.createItem("Unpin", () => {
                this.pinnedChannels.splice(this.pinnedChannels.indexOf(cid), 1);
                updatePinnedChannels();
                this.saveData();
                NeatoLib.ContextMenu.close();
            }));
            else items.push(NeatoLib.ContextMenu.createItem("Pin", () => {
                this.pinnedChannels.push(cid);
                updatePinnedChannels();
                this.saveData();
                NeatoLib.ContextMenu.close();
            }));

            NeatoLib.ContextMenu.create([NeatoLib.ContextMenu.createGroup(items)], e);
        };

        let serverItems = Array.from(document.getElementsByClassName("sb-server-item")).filter(e => !e.classList.contains("sb-dm-item")),
        
        serverItemClickEvent = e => {
            if(e.target.classList.contains("sb-channel-item")) return;

            let targ = NeatoLib.DOM.searchForParentElementByClassName(e.target, "sb-server-item");

            let par = targ.getElementsByClassName("sb-server-item-channels")[0], guild = this.guildModule.getGuild(targ.dataset.serverId), categories = [];

            if(par.children.length) {
                par.innerHTML = "";
                targ.style.backgroundColor = "";
            } else {
                for(let i = 0; i < allChannels.length; i++) {
                    if(allChannels[i].guild_id == targ.dataset.serverId && allChannels[i].type == 0) {
                        if(allChannels[i].parent_id && categories.indexOf(allChannels[i].parent_id) == -1) {
                            par.insertAdjacentHTML("beforeEnd", `<div id="sb-recent-channels" style="text-align:center;"><div class="sb-label" style="padding-left:0px;">${this.channelModule.getChannel(allChannels[i].parent_id).name}</div></div>`);
                            
                            categories.push(allChannels[i].parent_id);
                        }

                        if(!allChannels[i].parent_id && categories.indexOf("uncategorized") == -1) {
                            par.insertAdjacentHTML("beforeEnd", `<div id="sb-recent-channels" style="text-align:center;"><div class="sb-label" style="padding-left:0px;">Uncategorized</div></div>`);

                            categories.push("uncategorized");
                        }

                        let item = document.createElement("div");

                        item.className = "sb-channel-item-button sb-button";

                        item.dataset.guildId = guild.id;
                        item.dataset.channelId = allChannels[i].id;
                        item.dataset.content = url;

                        item.innerHTML = `<div class="sb-channel-item">#${allChannels[i].name}</div>`;

                        par.appendChild(item);
                    }
                }
                updateChannels();
            }
        };

        for(let i = 0; i < serverItems.length; i++) serverItems[i].onclick = serverItemClickEvent;

        updatePinnedChannels();
        updateRecentChannels();
    }

    sendMessage(e) {
        let lastServer = NeatoLib.getSelectedServer(), lastChannel = NeatoLib.getSelectedTextChannel(), lastScroll = document.getElementsByClassName(NeatoLib.getClass("messages"))[0].scrollTop;

        this.transitionModule.transitionTo(e.currentTarget.dataset.channelId, e.currentTarget.dataset.guildId);

        this.messageModule.sendMessage(e.currentTarget.dataset.channelId, { content : e.currentTarget.dataset.content });

        if(lastServer && lastChannel) this.transitionModule.transitionTo(lastChannel.id, lastServer.id);

        document.getElementsByClassName(NeatoLib.getClass("messages"))[0].scrollTop = lastScroll;
    }
	
    stop() {
        document.removeEventListener("contextmenu", this.contextEvent);

        if(this.popoutObserver != undefined) this.popoutObserver.disconnect();
	}
	
}
