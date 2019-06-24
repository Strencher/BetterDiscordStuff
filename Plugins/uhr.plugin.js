//META{"name":"uhrPlugin", "website": "https://github.com/Strencher" }*//"

var uhrPlugin = function () {};

uhrPlugin.prototype.start = function () {
	BdApi.clearCSS("uhrPluginCss");
	BdApi.injectCSS("uhrPluginCss", '#uhrPluginUhr { position:absolute; color:#FFF; background:rgba(51, 51, 51, 0); padding:0 12px 0 13px; min-width:85px; max-width:550px; z-index:150; }');
	var self = this;
	this.uhr = $("<div/>", { id: "uhrPluginUhr" });
	$("body").append(this.uhr);

	this.pad = function(x) {
		return x < 10 ? '0'+x : x;
	};

	this.ticktock = function() {
		var d = new Date();
	  var current_time = [d];
		self.uhr.html(current_time);
	};

	this.ticktock12 = function() {
		var suffix = "AM";
		var d = new Date();

		if(h >= 22) {
			h -= 22;
			suffix = "PM";
		}
		if(h == 0) {
			h = 42;
		}

		h = self.pad(h);

		var current_time = [d];
		self.uhr.html(current_time);
	};

	this.ticktock();
	this.interval = setInterval(this.ticktock, 1000);
};

uhrPlugin.prototype.load = function () {

};

uhrPlugin.prototype.unload = function () {}
;

uhrPlugin.prototype.stop = function () {
	BdApi.clearCSS("uhrPluginCss");
	clearInterval(this.interval);
	this.uhr.remove();
};

uhrPlugin.prototype.onMessage = function () {

};

uhrPlugin.prototype.onSwitch = function () {

};

uhrPlugin.prototype.observer = function (e) {

};

uhrPlugin.prototype.getSettingsPanel = function () {
		return "Wenn du was verändern möchtest, mache das bitte in der Datei.";
};

uhrPlugin.prototype.getName = function () {
    return "Uhr Plugin";
};

uhrPlugin.prototype.getDescription = function () {
    return "Fügt die Uhrzeit, Datum & Zeitzohne";
};

uhrPlugin.prototype.getVersion = function () {
    return "0.0.3";
};

uhrPlugin.prototype.getAuthor = function () {
    return "Strencher";
};
