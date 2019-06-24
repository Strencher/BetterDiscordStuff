//META{"name":"SaveTo","website":"https://metalloriff.github.io/toms-discord-stuff/","source":"https://github.com/Metalloriff/BetterDiscordPlugins/blob/master/SaveTo.plugin.js"}*//

class SaveTo {

	getName() { return "Save To"; }
	getDescription() { return "Allows you to save images, videos, files, server icons and user avatars to your defined folders, or browse to a folder, via the context menu."; }
	getVersion() { return "0.7.8"; }
	getAuthor() { return "Metalloriff"; }
	getChanges() {
		return {
			"0.1.2" :
			`
				Added sort mode settings, including custom sorting.
				You can now add, remove and modify folders via the settings menu.
			`,
			"0.2.2" :
			`
				Instead of just random numbers, the random file names are now random characters.
				Added a changelog toggle setting.
				Added a view changelog button.
			`,
			"0.3.2" :
			`
				Fixed the context menu being slightly delayed, causing an ugly flash effect.
				Added a "Save and Open File" choice to the folder submenus.
			`,
			"0.4.2" :
			`
				Added a setting to move the dropdown menu to the top of the context menu.
			`,
			"0.5.4" :
			`
				Fixed a bunch of bugs.
				Emotes are now saved as the emote name instead of ID.
			`,
			"0.5.5" :
			`
				Fixed "Save File Here" and "Save and Open File" not working.
			`,
			"0.6.7" :
			`
				Added a "Save File Here As" option to folder context menus.
			`,
			"0.7.8" :
			`
				You can now save emojis from the emoji picker.
				Fixed saving avatars.
				Fixed saving server icons.
			`
		};
	}

	saveSettings() {
		NeatoLib.Settings.save(this);
	}
	
	saveData() {
		NeatoLib.Data.save("SaveTo", "data", this.data);
	}

	getSettingsPanel() {

		setTimeout(() => {

			let date = new Date();

			let refreshFolders = () => {

				let fields = [];

				for (let i = 0; i < this.data.folders.length; i++) {

					let textField = NeatoLib.Settings.Elements.createNewTextField("", this.data.folders[i].path, e => {
						let name = e.target.value.substring(e.target.value.split("\\").join("/").lastIndexOf("/") + 1, e.target.value.length);
						if (e.target.value.trim().length == 0 || name.length == 0) {
							this.data.folders.splice(i, 1);
							e.target.parentElement.outerHTML = "";
						} else {
							this.data.folders[i].path = e.target.value;
							this.data.folders[i].name = name;
						}
						refreshFolders();
						this.saveData();
					});

					textField.insertAdjacentElement("beforeend", NeatoLib.Settings.Elements.createButton("Browse", e => {
						NeatoLib.browseForFile(folder => {
							e.target.parentElement.getElementsByClassName("input")[0].value = folder.path;
							this.data.folders[i].path = folder.path;
							this.data.folders[i].name = folder.name;
							refreshFolders();
							this.saveData();
						}, {
							directory: true
						});
					}, "float:right;"));

					let positionField = NeatoLib.Settings.Elements.createNewTextField("", this.data.folders[i].position, e => {
						if (e.target.value.length == 0) e.target.value = this.data.folders[i].position;
						else this.data.folders[i].position = e.target.value;
						refreshFolders();
						this.saveData();
					}).getElementsByTagName("input")[0];

					positionField.style.paddingRight = "10px";
					positionField.style.width = "100px";
					positionField.style.float = "left";

					textField.setAttribute("data-path", this.data.folders[i].path);
					textField.setAttribute("data-name", this.data.folders[i].name);
					textField.setAttribute("data-priority", this.data.folders[i].position);

					textField.getElementsByTagName("input")[0].style.width = "430px";

					textField.addEventListener("click", () => this.selectedFolder = i);

					textField.insertAdjacentElement("afterbegin", positionField);

					fields.push(textField);

				}

				if (this.settings.sortMode == "a-z" || this.settings.sortMode == "z-a") fields = fields.sort((x, y) => {
					if (x.getAttribute("data-name").toLowerCase() < y.getAttribute("data-name").toLowerCase()) return -1;
					if (x.getAttribute("data-name").toLowerCase() > y.getAttribute("data-name").toLowerCase()) return 1;
					return 0;
				});

				if (this.settings.sortMode == "z-a" || this.settings.sortMode == "new-old") fields = fields.reverse();

				if (this.settings.sortMode == "custom") fields = fields.sort((x, y) => {
					if (parseFloat(x.getAttribute("data-priority")) > parseFloat(y.getAttribute("data-priority"))) return -1;
					if (parseFloat(x.getAttribute("data-priority")) < parseFloat(y.getAttribute("data-priority"))) return 1;
					return 0;
				});

				document.getElementById("st-folders").innerHTML = "";

				for (let i = 0; i < fields.length; i++) document.getElementById("st-folders").insertAdjacentElement("beforeend", fields[i]);

			};

			NeatoLib.Settings.pushElement(NeatoLib.Settings.Elements.createRadioGroup("st-file-name-type", "File name type:", [{
					title: "Original",
					value: "original",
					description: `Example: unknown.png`
				},
				{
					title: "Date",
					value: "date",
					description: `Example: ${date.toLocaleDateString().split("/").join("-")} ${date.getMinutes()}${date.getSeconds()}${date.getMilliseconds()}.png`
				},
				{
					title: "Random",
					value: "random",
					description: `Example: ${Math.random().toString(36).substring(10)}.png`
				},
				{
					title: "Original + random",
					value: "original+random",
					description: `Example: unknown ${Math.random().toString(36).substring(10)}.png`
				}
			], this.settings.fileNameType, (e, choiceItem) => {
				this.settings.fileNameType = choiceItem.value;
				this.saveSettings();
			}), this.getName());

			NeatoLib.Settings.pushElement(NeatoLib.Settings.Elements.createRadioGroup("st-sort-type", "Sort by:", [{
					title: "A - Z",
					value: "a-z"
				},
				{
					title: "Z - A",
					value: "z-a"
				},
				{
					title: "Newest - Oldest",
					value: "new-old"
				},
				{
					title: "Oldest - Newest",
					value: "old-new"
				},
				{
					title: "By priority",
					value: "custom"
				}
			], this.settings.sortMode, (e, choiceItem) => {
				this.settings.sortMode = choiceItem.value;
				refreshFolders();
				this.saveSettings();
			}), this.getName());

			let folderLabels = document.createElement("div");

			folderLabels.insertAdjacentHTML("beforeend", `<h5 style="color:white;padding-bottom:10px;padding-top:20px;">Folders:</h5>`);
			folderLabels.insertAdjacentHTML("beforeend", `<h5 style="color:white;padding-bottom:10px;width:100px;display:inline-block;">Prioirty</h5>`);
			folderLabels.insertAdjacentHTML("beforeend", `<h5 style="color:white;padding-bottom:10px;width:430px;display:inline-block;">Path</h5>`);

			NeatoLib.Settings.pushElement(folderLabels, this.getName());

			let foldersParentDiv = document.createElement("div");

			foldersParentDiv.setAttribute("id", "st-folders");

			NeatoLib.Settings.pushElement(foldersParentDiv, this.getName());

			refreshFolders();

			NeatoLib.Settings.pushHTML(`<div id="st-settings-buttons" style="text-align:center;padding-top:20px;"></div>`, this.getName());

			let buttonParent = document.getElementById("st-settings-buttons");

			buttonParent.insertAdjacentElement("beforeend", NeatoLib.Settings.Elements.createButton("Add Folder", () => {
				this.browseForFolder(() => refreshFolders());
			}));

			buttonParent.insertAdjacentElement("beforeend", NeatoLib.Settings.Elements.createButton("Remove Selected Folder", () => {
				this.data.folders.splice(this.selectedFolder, 1);
				refreshFolders();
				this.saveData();
			}, "margin-left:15px;", {
				id: "st-settings-remove-folder"
			}));

			buttonParent.insertAdjacentElement("beforeend", NeatoLib.Settings.Elements.createButton("Open Selected Folder", () => {
				window.open(`file:///${this.data.folders[this.selectedFolder].path}`);
			}, "margin-left:15px;", {
				id: "st-settings-open-folder"
			}));

			NeatoLib.Settings.pushElement(NeatoLib.Settings.Elements.createToggleSwitch("Move dropdown menu to the top of the context menu", this.settings.dropdownOnTop, () => {
				this.settings.dropdownOnTop = !this.settings.dropdownOnTop;
				this.saveSettings();
			}), this.getName());

			NeatoLib.Settings.pushChangelogElements(this);

		}, 0);

		return NeatoLib.Settings.Elements.pluginNameLabel(this.getName());

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

	onLibLoaded() {
		NeatoLib.Updates.check(this);

		this.data = NeatoLib.Data.load("SaveTo", "data", {
			folders: []
		});

		let updated = [];

		for (let i = 0; i < this.data.folders.length; i++) {
			if (typeof this.data.folders[i] !== "object") {
				let p = this.data.folders[i];

				updated.push({
					path: p,
					name: p.substring(p.split("\\").join("/").lastIndexOf("/") + 1, p.length),
					position: i
				});
			}
		}

		if (updated.length > 0) this.data.folders = updated;

		this.settings = NeatoLib.Settings.load(this, {
			fileNameType: "original",
			sortMode: "a-z",
			displayUpdateNotes: true,
			dropdownOnTop: true
		});

		this.selectedFolder = -1;

		document.addEventListener("contextmenu", this.contextMenuEvent = e => {
			if (document.getElementsByClassName(NeatoLib.getClass("contextMenu")).length == 0) setTimeout(() => this.onContextMenu(e), 0);
			else this.onContextMenu(e);
		});

		NeatoLib.Changelog.compareVersions(this.getName(), this.getChanges());

		NeatoLib.Events.onPluginLoaded(this);
	}

	onContextMenu(e) {
		let member = NeatoLib.DOM.searchForParentElementByClassName(e.target, NeatoLib.getClass("member")),
			dm = NeatoLib.DOM.searchForParentElementByClassName(e.target, "private") || NeatoLib.DOM.searchForParentElementByClassName(e.target, "friends-row"),
			messageGroup = NeatoLib.DOM.searchForParentElementByClassName(e.target, NeatoLib.getClass("containerCozy", "container")),
			user = NeatoLib.ReactData.get(NeatoLib.ContextMenu.get()) ? NeatoLib.ReactData.get(NeatoLib.ContextMenu.get()).return.return.return.return.memoizedProps.user : null,
			guild = NeatoLib.ReactData.getProp(NeatoLib.ContextMenu.get(), "guild");

		if (e.target.localName != "a" && e.target.localName != "img" && e.target.localName != "video" && !member && !dm && !messageGroup && !e.target.className.includes("emojiItem") && !user && !guild) return;

		let saveLabel = "Save To",
			url = e.target.poster || e.target.style.backgroundImage.substring(e.target.style.backgroundImage.indexOf(`"`) + 1, e.target.style.backgroundImage.lastIndexOf(`"`)) || e.target.href || e.target.src,
			menu = [];

		if (user) {
			url = user.getAvatarURL();
			if (url.includes("/a_")) url = url.replace(".png", ".gif");
		
			saveLabel = "Save Avatar To";
		}

		if (guild) {
			url = guild.getIconURL();

			saveLabel = "Save Icon To";
		}

		if (e.target.className.includes("guildIcon")) saveLabel = "Save Icon To";

		if ((!url && !e.target.className.includes("emojiItem")) || e.target.classList.contains("emote") || url.includes("youtube.com/")) return;

		url = url.split("?")[0];

		if (saveLabel.includes("Avatar") || saveLabel.includes("Icon")) url += "?size=2048";

		url = url.replace(".webp", ".png");

		let fileName = url.substring(url.lastIndexOf("/") + 1, url.length),
			fileExtension = url.substring(url.lastIndexOf("."), url.length);

		if (e.target.classList.contains("emoji")) {
			saveLabel = "Save Emoji To";
			fileName = NeatoLib.ReactData.getProps(e.target).emojiName.replace(/[^A-Za-z]/g, "") + fileExtension;
		}

		if (e.target.className.includes("emojiItem")) {
			saveLabel = "Save Emoji To";
			fileName = (url = e.target.style.backgroundImage.split('"')[1]).split("?")[0].split("/")[4];
		}

		let date = new Date();

		if (this.settings.fileNameType == "date") fileName = `${date.toLocaleDateString().split("/").join("-")} ${date.getMinutes()}${date.getSeconds()}${date.getMilliseconds()}${fileExtension}`;

		if (this.settings.fileNameType == "random") fileName = `${Math.random().toString(36).substring(10)}${fileExtension}`;

		if (this.settings.fileNameType == "original+random") fileName = fileName.replace(fileExtension, "") + ` ${Math.random().toString(36).substring(10)}${fileExtension}`;

		let optionsSubMenu = i => {
			let r = [];

			r.push(NeatoLib.ContextMenu.createItem("Remove Folder", e => {
				this.data.folders.splice(i, 1);
				this.saveData();
				e.target.remove();
			}));

			r.push(NeatoLib.ContextMenu.createItem("Open Folder", () => {
				window.open("file:///" + this.data.folders[i].path);
			}));

			r.push(NeatoLib.ContextMenu.createItem("Save File Here", () => {
				NeatoLib.downloadFile(url, this.data.folders[i].path, fileName);
			}));

			r.push(NeatoLib.ContextMenu.createItem("Save File Here As", () => {
				NeatoLib.ContextMenu.close();

				console.log(fileName);

				NeatoLib.UI.createTextPrompt("save-file-as", "Save File As...", (filename, prompt) => {
					if (!filename) NeatoLib.showToast("File not saved! No filename specified!", "error");
					else NeatoLib.downloadFile(url, this.data.folders[i].path, filename + "." + fileName.split(".")[fileName.split(".").length - 1]);

					prompt.close();
				}, fileName.split(".")[0]);
			}));

			r.push(NeatoLib.ContextMenu.createItem("Save and Open File", () => {
				NeatoLib.downloadFile(url, this.data.folders[i].path, fileName, p => window.open("file:///" + p));
			}));

			return r;
		};

		let sorted = this.data.folders;

		if (this.settings.sortMode == "a-z" || this.settings.sortMode == "z-a") sorted = sorted.sort((x, y) => {
			if (x.name.toLowerCase() < y.name.toLowerCase()) return -1;
			if (x.name.toLowerCase() > y.name.toLowerCase()) return 1;
			return 0;
		});

		if (this.settings.sortMode == "z-a" || this.settings.sortMode == "old-new") sorted = sorted.reverse();

		if (this.settings.sortMode == "custom") sorted = sorted.sort((x, y) => {
			if (x.position > y.position) return -1;
			if (x.position < y.position) return 1;
			return 0;
		});

		let g = [];
		for (let i = 0; i < this.data.folders.length; i++) {
			g.push(NeatoLib.ContextMenu.createSubMenu(this.data.folders[i].name, optionsSubMenu(i), {
				callback: () => NeatoLib.downloadFile(url, this.data.folders[i].path, fileName)
			}));
		}
		menu.push(NeatoLib.ContextMenu.createGroup(g));

		menu.push(NeatoLib.ContextMenu.createGroup([
			NeatoLib.ContextMenu.createItem("Add Folder", () => this.browseForFolder),
			NeatoLib.ContextMenu.createItem("Browse", () => NeatoLib.browseForFile(folder => NeatoLib.downloadFile(url, folder.path, fileName), {
				directory: true
			})),
			NeatoLib.ContextMenu.createItem("Plugin Settings", () => {
				NeatoLib.Settings.showPluginSettings(this.getName());
				NeatoLib.ContextMenu.close();
			})
		]));

		if (NeatoLib.ContextMenu.get()) NeatoLib.ContextMenu.get().insertAdjacentElement(this.settings.dropdownOnTop ? "afterbegin" : "beforeend", NeatoLib.ContextMenu.createGroup([NeatoLib.ContextMenu.createSubMenu(saveLabel, menu)]));
		else NeatoLib.ContextMenu.create([NeatoLib.ContextMenu.createGroup([NeatoLib.ContextMenu.createSubMenu(saveLabel, menu)])], e);
	}

	browseForFolder(selected) {
		NeatoLib.browseForFile(folder => {
			if (this.data.folders.findIndex(f => f.path == folder.path) == -1) {
				this.data.folders.push({
					path: folder.path,
					name: folder.name,
					position: this.data.folders.length
				});

				this.saveData();
			}

			if (selected) selected();
		}, {
			directory: true
		});
	}

	stop() {
		document.removeEventListener("contextmenu", this.contextMenuEvent);
	}

}
