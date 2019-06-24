//META{"name":"ESorter"}*//

function ESorter(){}

ESorter.prototype.getName = function() {
    return "Fave Emote Sorter";
};

ESorter.prototype.getDescription = function() {
    return "Drag & Drop rearrange your list of favourited emotes";
};

ESorter.prototype.getVersion = function() {
    return "1.1";
};

ESorter.prototype.getAuthor = function() {
    return "Hammock";
};

ESorter.prototype.start = function() {

	var script = document.createElement('script');
	script.type = 'text/javascript';
	script.src = 'https://raw.githubusercontent.com/cosmicsalad/Discord-Themes-and-Plugins/master/lib/jquery-ui.min.js';
	$("head").append(script);
	console.log("Emote Sorter loaded");

	this.initEmoteList();

};

ESorter.prototype.activateEmoteList = function() {
	$("#bda-qem-favourite-container .emote-menu-inner").sortable({
		distance: 10,
		items: '.emote-container',
		placeholder: 'emote-placeholder',
		update: function (e, ui) {
			ESorter.prototype.storeNewEmoteList();
		},
		sort: function (e) {
			$('#bda-qem-favourite-container .emote-menu-inner .emote-placeholder').css({"display":"inline-block","width":"30px","height":"30px","padding":"2px","background":"rgba(255,255,255,0.1)","border-radius":"5px"});
		}
	}).disableSelection();
}

ESorter.prototype.initEmoteList = function() {

	// make channel list sortable
	$('.channel-textarea-emoji').on('click',function() {

		// set initial order
		storedEmoteOrder = JSON.parse(bdPluginStorage.get("sortEmoteOrder", 'config'));

		if (!$('#bda-qem-favourite-container .emote-menu-inner').hasClass("ui-sortable")) {
			setTimeout(function() {

				ESorter.prototype.activateEmoteList();

				if(storedEmoteOrder) {
					var emoteBox = $('#bda-qem-favourite-container .emote-menu-inner');

					$.each(storedEmoteOrder,function(i,v) {
						$('.emote-icon[title="'+v+'"]').parent().attr('data-sort', i);
					});

					$('#bda-qem-favourite-container .emote-menu-inner .emote-container').sort(sortemotes).appendTo(emoteBox);
					
					function sortemotes(a,b){
						return ($(b).data('sort')) < ($(a).data('sort')) ? 1 : -1;    
					}
				}

			}, 10);
		}

	});

	this.storeNewEmoteList();

};

ESorter.prototype.storeNewEmoteList = function() {

	emotes = $.map($("#bda-qem-favourite-container .emote-menu-inner").children('.emote-container'), function(el) { 
		return $(el).children('.emote-icon').attr('title');
	});

	var storedEmoteOrder = JSON.parse(bdPluginStorage.get("sortEmoteOrder", 'config'));

	emoteList = {};
	emoteList = emotes;
	newEmoteList = $.extend({}, storedEmoteOrder, emoteList);

	bdPluginStorage.set("sortEmoteOrder", 'config', JSON.stringify(newEmoteList));
};

ESorter.prototype.load = function() {};
ESorter.prototype.unload = function() {};
ESorter.prototype.stop = function() {};
ESorter.prototype.onSwitch = function() {
	this.initEmoteList();
};
ESorter.prototype.getSettingsPanel = function() {
    return null;
};
