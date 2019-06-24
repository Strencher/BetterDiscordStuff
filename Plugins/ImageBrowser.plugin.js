//META{"name":"ImageBrowser","website":"https://metalloriff.github.io/toms-discord-stuff/","source":"https://github.com/Metalloriff/BetterDiscordPlugins/blob/master/ImageBrowser.plugin.js"}*//

class ImageBrowser {
	
    getName() { return "ImageBrowser"; }
    getDescription() { return "Displays a next and previous button on image popouts for browsing through images in a channel."; }
    getVersion() { return "0.1.1"; }
	getAuthor() { return "Metalloriff"; }
	getChanges() {
		return {
			"0.1.1":
			`
				You can now use the arrow keys to navigate through images.
			`
		};
	}

    load() {}

    start() {

        let libLoadedEvent = () => {
            try{ this.onLibLoaded(); }
            catch(err) { console.error(this.getName(), "fatal error, plugin could not be started!", err); try { this.stop(); } catch(err) { console.error(this.getName() + ".stop()", err); } }
        };

		let lib = document.getElementById("NeatoBurritoLibrary");
		if(!lib) {
			lib = document.createElement("script");
			lib.id = "NeatoBurritoLibrary";
			lib.type = "text/javascript";
			lib.src = "https://rawgit.com/Metalloriff/BetterDiscordPlugins/master/Lib/NeatoBurritoLibrary.js";
			document.head.appendChild(lib);
		}
		this.forceLoadTimeout = setTimeout(libLoadedEvent, 30000);
        if(typeof window.NeatoLib !== "undefined") libLoadedEvent();
		else lib.addEventListener("load", libLoadedEvent);

	}

	getSettingsPanel() {

		setTimeout(() => {

			NeatoLib.Settings.pushElement(NeatoLib.Settings.Elements.createNewTextField("Zoom speed", this.settings.zoomSpeed, e => {
				if(isNaN(e.target.value)) return NeatoLib.showToast("Value must be a number", "error");
				this.settings.zoomSpeed = e.target.value;
				this.saveSettings();
			}), this.getName());

			NeatoLib.Settings.pushElement(NeatoLib.Settings.Elements.createToggleSwitch("Display image loading filter", this.settings.loadingFilter, () => {
				this.settings.loadingFilter = !this.settings.loadingFilter;
				this.saveSettings();
			}), this.getName(), { hint : "Grayscale, blurred, slightly darker, when an image is loading" });
			
			NeatoLib.Settings.pushChangelogElements(this);

		}, 0);

		return NeatoLib.Settings.Elements.pluginNameLabel(this.getName());
		
	}

	saveSettings() {
		NeatoLib.Settings.save(this);
	}

	onLibLoaded() {
		
		this.settings = NeatoLib.Settings.load(this, {
			displayUpdateNotes : true,
			zoomSpeed : 0.2,
			loadingFilter : true
		});
		
		NeatoLib.Updates.check(this);
		
		const classes = NeatoLib.getClasses(["imageWrapper"], false);

		this.style = NeatoLib.injectCSS(`
			
			.ib-arrow {
				position: fixed;
				top: calc(50% - 100px);
				width: 200px;
				height: 200px;
				filter: invert(50%);
				animation: ib-arrow-fade-in 1s;
				transition: filter 0.3s;
				z-index: 10000;
			}

			.ib-arrow:hover {
				filter: invert(100%);
			}

			@keyframes ib-arrow-fade-in {
				0%{opacity:0}
				100%{opacity:1}
			}
			
		`);
		
		if(this.settings.displayUpdateNotes) NeatoLib.Changelog.compareVersions(this.getName(), this.getChanges());

		let images = [], selectedImage = -1, zoomLevel = 1;

		document.addEventListener("keydown", this.keyDownEvent = e => {
			if(e.key == "ArrowRight" && document.getElementById("ib-next-arrow")) document.getElementById("ib-next-arrow").click();
			else if(e.key == "ArrowLeft" && document.getElementById("ib-prev-arrow")) document.getElementById("ib-prev-arrow").click();
		});
		
		const selectImage = (wrapper, idx, initial) => {

			selectedImage = idx;

			if(!initial) images = Array.filter(document.getElementsByClassName("chat")[0].getElementsByTagName("img"), e => e.parentElement.className.includes("imageWrapper"));

			const image = wrapper.lastChild;

			image.style = "";

			image.addEventListener("mousewheel", e => {
				if(e.wheelDelta > 0) zoomLevel += this.settings.zoomSpeed;
				else if(zoomLevel > 1) zoomLevel -= this.settings.zoomSpeed;
				else {
					clicked = false;
					image.style.top = 0;
					image.style.left = 0;
					image.style.transform = "";
					return;
				}
				if(zoomLevel > 1) {
					image.draggable = false;
					image.style.transform = `scale(${zoomLevel})`;
				} else image.draggable = true;
			});

			let clicked = false, origPos;

			image.addEventListener("mousedown", function(e) {
				origPos = { x : e.clientX, y : e.clientY, top : parseInt(image.style.top), left : parseInt(image.style.left) };
				clicked = true;
			});
			image.addEventListener("mouseup", function() { clicked = false; });

			image.style.top = 0;
			image.style.left = 0;
			image.addEventListener("mousemove", function(e) {
				if(!(clicked && zoomLevel > 1)) return;
				image.style.top = (origPos.top - (origPos.y - e.clientY)) + "px";
				image.style.left = (origPos.left - (origPos.x - e.clientX)) + "px";
			});

			let prevArrow = document.getElementById("ib-prev-arrow"), nextArrow = document.getElementById("ib-next-arrow");

			if(images[idx - 1]) {
				if(!prevArrow) wrapper.parentElement.insertAdjacentElement("afterbegin", NeatoLib.DOM.createElement({ id : "ib-prev-arrow", className : "ib-arrow", src : "https://material.io/tools/icons/static/icons/baseline-arrow_right-24px.svg", style : "left:100px;transform:rotate(180deg)", onclick : () => selectImage(wrapper, selectedImage - 1), draggable : false }, { type : "img" }));
			} else if(prevArrow) prevArrow.remove();

			if(images[idx + 1]) {
				if(!nextArrow) wrapper.parentElement.insertAdjacentElement("afterbegin", NeatoLib.DOM.createElement({ id : "ib-next-arrow", className : "ib-arrow", src : "https://material.io/tools/icons/static/icons/baseline-arrow_right-24px.svg", style : "right:100px;", onclick : () => selectImage(wrapper, selectedImage + 1), draggable : false }, { type : "img" }));
			} else if(nextArrow) nextArrow.remove();

			image.src = images[idx].src;

			if(this.settings.loadingFilter) image.style.filter = "grayscale(100%) brightness(0.8) blur(3px)";
			images[idx].scrollIntoViewIfNeeded();

			image.setAttribute("width", "");
			image.setAttribute("height", "");

			image.style.width = "";
			image.style.height = "";

			const resize = function() {

				image.width *= 3;

				const tryBegin = performance.now();
				while((image.width > window.innerWidth * 0.65 || image.height > window.innerHeight * 0.65) && performance.now() - tryBegin < 500) image.width *= 0.9;

				document.getElementById("app-mount").lastChild.lastChild.firstChild.style.width = image.width + "px";
				document.getElementById("app-mount").lastChild.lastChild.firstChild.style.height = image.height + "px";
				wrapper.style.width = image.width + "px";
				wrapper.style.height = image.height + "px";

			};

			image.onload = function() {

				resize();

				image.src = images[idx].src.split("?")[0];

				image.onload = e => {
					resize();
					image.style.transition = "all 0.1s";
					e.target.style.filter = "";
				};

			};
			if(image.complete) image.onload();

		};

		this.mutationObserver = new MutationObserver(async function(m) {

			if(m[1] && m[1].addedNodes.length) {

				images = Array.filter(document.getElementsByClassName("chat")[0].getElementsByTagName("img"), e => e.parentElement.className.includes("imageWrapper"));

				const wrapper = m[1].addedNodes[0].getElementsByClassName(classes.imageWrapper)[0];
				if(!wrapper) return;
				
				const tryBegin = performance.now();
				while(!wrapper.lastChild.src && performance.now() - tryBegin < 3000) await NeatoLib.Thread.sleep();

				selectImage(wrapper, images.findIndex(i => i.src && i.src.split("?")[0] == wrapper.getElementsByTagName("img")[0].src.split("?")[0]), true);

			}

		});
		
		this.mutationObserver.observe(document.getElementById("app-mount").lastChild, { childList : true });
		
		NeatoLib.Events.onPluginLoaded(this);

	}
	
    stop() {
		this.mutationObserver.disconnect();
		this.style.destroy();
		document.removeEventListener("keydown", this.keyDownEvent);
	}
	
}
