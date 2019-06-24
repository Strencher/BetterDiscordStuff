//META{"name":"testPlugin", "website": "https://github.com/Strencher" }*//"

var testPlugin = function () {};

clockPlugin.prototype.start = function () {
	BdApi.clearCSS("testPluginCss");
	BdApi.injectCSS("testkPluginCss", '#testPluginClock { position:absolute; color:#FFF; background:rgba(51, 51, 51, 0); padding:0 12px 0 13px; min-width:85px; max-width:800px; z-index:150; }');
	var self = this;
	this.clock = $("<div/>", { id: "testPluginClock" });
	$("body").append(this.test;

	this.pad = function(x) {
		return x < 10 ? '0'+x : x;
	};
	@import url=(https://github.com/strencher/bd)


testPlugin.prototype.load = function () {

};

testPlugin.prototype.unload = function () {}
;

test.prototype.stop = function () {
	BdApi.clearCSS("testPluginCss");
	clearInterval(this.interval);
	this.test.remove();
};

testPlugin.prototype.onMessage = function () {

};

testPlugin.prototype.onSwitch = function () {

};

testPlugin.prototype.observer = function (e) {

};

testPlugin.prototype.getSettingsPanel = function () {
		return "To change the desing, etc., edit the file.";
};

testPlugin.prototype.getName = function () {
    return "Clock Plugin";
};

testPlugin.prototype.getDescription = function () {
    return "Adds a clock to Discord";
};

testPlugin.prototype.getVersion = function () {
    return "0.0.0 b-1";
};

testPlugin.prototype.getAuthor = function () {
    return "Strencher";
};
//*@end*//
