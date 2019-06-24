//META{"name":"DetailedServerTooltips","website":"https://metalloriff.github.io/toms-discord-stuff/","source":"https://github.com/Metalloriff/BetterDiscordPlugins/blob/master/DetailedServerTooltips.plugin.js"}*//

class DetailedServerTooltips {

	getName() { return "DetailedServerTooltips"; }
	getDescription() { return "Displays a more detailed tooltip for servers similar to user popouts. Contains a larger image, owner's tag, date, time and days ago created, date, time and days ago joined, member count, channel count, role count, region, and whether or not the server is partnered."; }
	getVersion() { return "0.3.11"; }
	getAuthor() { return "Metalloriff"; }
	getChanges() {
		return {
			"0.1.1": `
				Added a creation date field.
			`,
			"0.2.3": `
				Fixed tooltip color not changing with some themes.
				Fixed the tooltip arrow being offsetted wrong when the tooltip was prevented from going off-screen.
				Tooltip guild icons are now full res.
			`,
			"0.3.4": `
				Fixed update notes.
				Fixed incompatibility with Zerebos' DoNotTrack plugin. (If you still have issues with tooltips sticking with it, please let me know. I barely tested it.)
				Added a minimal mode setting.
			`,
			"0.3.5": `
				Fixed tooltip getting stuck with ServerFolders
			`,
			"0.3.6": `
				Fixed tooltips getting stuck when switching from dm to a server.
			`,
			"0.3.8": `
				Fixed tooltips not showing for servers inside of folders with DevilBro's ServerFolders plugin.
			`
		};
	}

	load() {}

	start() {
		const libLoadedEvent = () => {
			try{
				if(window.pluginCookie["DoNotTrack"] == true) setTimeout(() => this.onLibLoaded(), 2000);
				else this.onLibLoaded();
			}
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

	get settingFields() {
		return {
			tooltipColor: { label: "Tooltip color", type: "color" },
			displayDelay: { label: "Tooltip display delay", description: "(ms)", type: "int" },
			preview: { type: "custom", html: `
					<div class="tooltip tooltip-right dst-tooltip" style="position: relative; margin-top: 20px;">
							Kappa Stretch Server
							<div class="dst-tooltip-icon" style="background-image: url(https://cdn.discordapp.com/attachments/392905457486004224/457784406313271296/KappaStretch.png);"></div>
							<div id="dst-tooltip-owner-label" class="dst-tooltip-label">Owner: KappaStretch#0000</div>
							<div class="dst-tooltip-label">Joined at: ${new Date().toLocaleDateString()}, ${new Date().toLocaleTimeString()} (0 days ago)</div>
							<div id="dst-tooltip-member-count-label" class="dst-tooltip-label">400 members</div>
							<div class="dst-tooltip-label">15 channels</div>
							<div class="dst-tooltip-label">10 roles</div>
							<div class="dst-tooltip-label">Region: us-central</div>
							<div style="font-weight: bolder;" class="dst-tooltip-label"><div class="profileBadgePartner-SjK6L2 profileBadge-2BqF-Z" style="display: inline-block;"></div>PARTNERED SERVER</div>
					</div>
			` },
			minimalMode: { label: "Minimal mode", type: "bool" },
			minimalPreview: { type: "custom", html: `
					<div class="tooltip tooltip-right dst-tooltip dst-min" style="position: relative; margin-top: 20px;">
							Kappa Stretch Server
							<div class="dst-tooltip-icon" style="background-image: url(https://cdn.discordapp.com/attachments/392905457486004224/457784406313271296/KappaStretch.png);"></div>
							<div id="dst-tooltip-owner-label" class="dst-tooltip-label">Owner: KappaStretch#0000</div>
							<div class="dst-tooltip-label">Joined at: ${new Date().toLocaleDateString()}, ${new Date().toLocaleTimeString()} (0 days ago)</div>
							<div id="dst-tooltip-member-count-label" class="dst-tooltip-label">400 members</div>
							<div class="dst-tooltip-label">15 channels</div>
							<div class="dst-tooltip-label">10 roles</div>
							<div class="dst-tooltip-label">Region: us-central</div>
							<div style="font-weight: bolder;" class="dst-tooltip-label"><div class="profileBadgePartner-SjK6L2 profileBadge-2BqF-Z" style="display: inline-block;"></div>PARTNERED SERVER</div>
					</div>
			` }
		};
	}

	get defaultSettings() {
		return {
			displayUpdateNotes: true,
			tooltipColor: "#7289da",
			displayDelay: 500,
			minimalMode: false
		};
	}

	getSettingsPanel() {
		return NeatoLib.Settings.createPanel(this);
	}

	saveSettings() {
		this.applyCSS();
		NeatoLib.Settings.save(this);
	}

	applyCSS() {
		if (this.style) this.style.destroy();

		this.style = NeatoLib.injectCSS(`
			.dst-tooltip {
					width: 100%;
					max-width: 225px;
					text-align: center;
					background-color: ${this.settings.tooltipColor} !important;
					color: white;
			}

			.dst-tooltip:after {
					border-right-color: ${this.settings.tooltipColor} !important;
					top: 25px !important;
			}

			.dst-tooltip-icon {
					width: 200px;
					height: 200px;
					background-size: cover;
					border-radius: 5px;
					margin-top: 5px;
					flex: 1;
			}

			.dst-tooltip-label {
					color: white;
					margin-top: 10px;
					font-size: 15px;
			}

			.dst-min .dst-tooltip-icon{display:none}
			.dst-min .dst-tooltip-label{font-size:13px}
			.dst-tooltip.dst-min{max-width:200px}
	`);
	}

	onLibLoaded() {
		if (!NeatoLib.hasRequiredLibVersion(this, "0.8.20")) return;

		NeatoLib.Settings.load(this);

		NeatoLib.Updates.check(this);

		if (this.settings.displayUpdateNotes) NeatoLib.Changelog.compareVersions(this.getName(), this.getChanges());

		this.guildModule = NeatoLib.Modules.get("getGuild");
		this.userModule = NeatoLib.Modules.get("getUser");
		this.memberModule = NeatoLib.Modules.get("getMembers");
		this.channelModule = NeatoLib.Modules.get("getChannel");
		this.memberCountModule = NeatoLib.Modules.get("getMemberCount");

		this.localUser = NeatoLib.getLocalUser();

		this.owners = {};

		this.applyCSS();

		let tooltip, timeout;

		this.dragGuild = () => {
			this.mouseLeaveGuild();

			let tooltips = document.getElementsByClassName("dst-tooltip");

			for (let i = 0; i < tooltips.length; i++) {
				if (tooltips[i].updateLoop) clearInterval(tooltips[i].updateLoop);
				tooltips[i].remove();
			}
		};

		this.mouseEnterGuild = e => {
			timeout = setTimeout(() => {
				tooltip = this.tooltip(((e.target.parentElement.href || e.target.href).match(/\d+/) || [])[0], e.target);
				if (!tooltip) return;
				let tt = document.getElementsByClassName(NeatoLib.getClass("tooltip"))[0];
				tt.appendChild(tooltip);
				tt.find("." + NeatoLib.getClass("tooltip", "tooltipPointer").trim().replace(" ", ".")).css("border-top-color", this.settings.tooltipColor);
				let bottomPos = parseFloat(tooltip.style.top) + tooltip.offsetHeight;
				if (bottomPos > window.innerHeight) {
					tooltip.style.top = (parseFloat(tooltip.style.top) - (bottomPos - window.innerHeight)) + "px";
					tooltip.insertAdjacentHTML("afterbegin", `<style>.dst-tooltip:after{top:calc(25px + ${parseFloat(tooltip.style.top) - (parseFloat(tooltip.style.top) - (bottomPos - window.innerHeight))}px) !important}</style>`);
				}
				var tooltipObserver = new MutationObserver((mutations) => {
					mutations.forEach((mutation) => {
						var nodes = Array.from(mutation.removedNodes);
						var ownMatch = nodes.indexOf(tooltip) > -1;
						var directMatch = nodes.indexOf(e.target) > -1;
						var parentMatch = nodes.some(parent => parent.contains(e.target));
						if (ownMatch || directMatch || parentMatch) {
							tooltipObserver.disconnect();
							tooltip.remove();
						}
					});
				});
			}, this.settings.displayDelay);
		};

		this.mouseLeaveGuild = () => {
			clearTimeout(timeout);
			if (tooltip) tooltip.remove();
		};

		this.switchEvent = () => this.applyToGuilds();

		this.guildObserver = new MutationObserver(this.switchEvent);
		this.guildObserver.observe(document.getElementsByClassName(NeatoLib.getClass("unreadMentionsBar", "scroller"))[0], { childList: true, subtree: true });
		this.guildObserver.observe(document.getElementsByClassName(NeatoLib.getClass("firefoxFixScrollFlex"))[0], { childList: true, subtree: true });

		NeatoLib.Events.attach("switch", this.switchEvent);

		this.applyToGuilds();

		NeatoLib.Events.onPluginLoaded(this);
	}

	applyToGuilds(detach) {
		const guilds = document.getElementsByClassName(NeatoLib.getClass("acronym", "wrapper"));

		for (let i = 0; i < guilds.length; i++) {
			let reactEvents = NeatoLib.ReactData.getEvents(guilds[i]);

			guilds[i].parentElement.removeEventListener("dragstart", this.dragGuild);
			guilds[i].parentElement.removeEventListener("dragend", this.dragGuild);
			guilds[i].removeEventListener("mouseenter", this.mouseEnterGuild);
			guilds[i].removeEventListener("mouseleave", this.mouseLeaveGuild);

			if (reactEvents) {
				if (reactEvents.onMouseEnter_unpatched) reactEvents.onMouseEnter = reactEvents.onMouseEnter_unpatched;
				if (reactEvents.onMouseLeave_unpatched) reactEvents.onMouseLeave = reactEvents.onMouseLeave_unpatched;
			}

			if (detach) continue;

			if (reactEvents) {
				if (!reactEvents.onMouseEnter_unpatched) reactEvents.onMouseEnter_unpatched = reactEvents.onMouseEnter;
				if (!reactEvents.onMouseLeave_unpatched) reactEvents.onMouseLeave_unpatched = reactEvents.onMouseLeave;

				reactEvents.onMouseEnter = () => {};
				reactEvents.onMouseLeave = () => {};
			}

			guilds[i].parentElement.addEventListener("dragstart", this.dragGuild);
			guilds[i].parentElement.addEventListener("dragend", this.dragGuild);
			guilds[i].addEventListener("mouseenter", this.mouseEnterGuild);
			guilds[i].addEventListener("mouseleave", this.mouseLeaveGuild);
		}
	}

	tooltip(guildId, element) {
		if (!guildId || !element || element.getBoundingClientRect().width == 0) return;

		let tooltip = document.createElement("div"),
			guild = this.guildModule.getGuild(guildId),
			owner = this.userModule.getUser(guild.ownerId);

		tooltip.className = NeatoLib.getClass("tooltip") + " " + NeatoLib.getClass("tooltip", "tooltipRight") + " dst-tooltip";
		if (this.settings.minimalMode) tooltip.classList.add("dst-min");

		tooltip.style.left = (element.getBoundingClientRect().left + element.offsetWidth + 8) + "px";
		tooltip.style.top = ((element.getBoundingClientRect().top + (element.offsetHeight / 2)) - (tooltip.offsetHeight / 2) - 25) + "px";
		tooltip.style.position = "fixed";

		let creationDate = NeatoLib.getSnowflakeCreationDate(guild.id);

		tooltip.innerHTML = `${this.escapeHtml(guild.name)}
				<div class="dst-tooltip-icon" style="background-image: url(${guild.getIconURL()}?size=2048);"></div>
				<div id="dst-tooltip-owner-label" class="dst-tooltip-label">Owner: ${owner ? this.escapeHtml(owner.tag) : "unknown"}</div>
				<div class="dst-tooltip-label">Created at: ${creationDate.toLocaleDateString()}, ${creationDate.toLocaleTimeString()} (${Math.round(Math.abs(creationDate.getTime() - new Date().getTime()) / 86400000)} days ago)</div>
				${creationDate.toString() == guild.joinedAt.toString() ? "" : `<div class="dst-tooltip-label">Joined at: ${guild.joinedAt.toLocaleDateString()}, ${guild.joinedAt.toLocaleTimeString()} (${Math.round(Math.abs(guild.joinedAt.getTime() - new Date().getTime()) / 86400000)} days ago)</div>`}
				<div id="dst-tooltip-member-count-label" class="dst-tooltip-label">${this.memberCountModule.getMemberCount(guildId)} members</div>
				<div class="dst-tooltip-label">${Object.values(this.channelModule.getChannels()).filter(c => c.guild_id == guildId).length} channels</div>
				<div class="dst-tooltip-label">${Object.keys(guild.roles).length} roles</div>
				<div class="dst-tooltip-label">Region: ${guild.region}</div>`;

		if(!guild.getIconURL()) tooltip.find(".dst-tooltip-icon").outerHTML = "";

		if (guild.features.has("PARTNERED")) tooltip.insertAdjacentHTML("beforeend", `<div style="font-weight: bolder;" class="dst-tooltip-label"><div class="profileBadgePartner-SjK6L2 profileBadge-2BqF-Z" style="display: inline-block;"></div>PARTNERED SERVER</div>`);

		if(owner){
			this.owners[guildId] = owner.tag;
		}else{
			NeatoLib.Modules.get("getAPIBaseURL").get(NeatoLib.Modules.get(["Permissions", "ActivityTypes", "StatusTypes"]).Endpoints.USER(guild.ownerId)).then(result => {
				if(!result) return;
				let res = JSON.parse(result.text);
				this.owners[guildId] = res.username + "#" + res.discriminator;
			});
		}

		let updateMemberCount = false;
		if(this.memberCountModule.getMemberCount(guildId) < 500){
			NeatoLib.Modules.get("requestMembers").requestMembers(guildId, "", 0);
			updateMemberCount = true;
		}

		const self = setInterval(() => {
			if (!Array.from(document.getElementsByClassName(NeatoLib.getClass("tooltip"))).includes(tooltip)) return clearInterval(self);
			document.getElementById("dst-tooltip-owner-label").innerHTML = "Owner: " + (this.escapeHtml(this.owners[guildId] || "unknown"));
			if(updateMemberCount) document.getElementById("dst-tooltip-member-count-label").innerText = this.memberModule.getMembers(guildId).length + " members";
		}, 500);

		tooltip.updateLoop = self;

		return tooltip;
	}

	stop() {
		let tooltips = document.getElementsByClassName("dst-tooltip");

		for (let i = 0; i < tooltips.length; i++) {
			if (tooltips[i].updateLoop) clearInterval(tooltips[i].updateLoop);
			tooltips[i].remove();
		}

		this.applyToGuilds(true);

		if (this.style) this.style.destroy();

		NeatoLib.Events.detach("switch", this.switchEvent);

		this.guildObserver.disconnect();
	}

	escapeHtml(txt){
		return txt.replace(/&/g, "&amp;")
				  .replace(/</g, "&lt;")
				  .replace(/>/g, "&gt;")
				  .replace(/"/g, "&quot;")
				  .replace(/'/g, "&#039;");
	}

}
