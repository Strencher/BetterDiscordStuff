//META{"name":"serverTheme"}*//
var serverTheme = function(){};

/* Information */
serverTheme.prototype.getName = function(){
    return 'Server Specific Themes';
};
serverTheme.prototype.getDescription = function(){
    return 'Ability to use specific themes on individual servers and channels.';
};
serverTheme.prototype.getVersion = function(){
    return '1.1.2';
};
serverTheme.prototype.getAuthor = function(){
    return 'IRDeNial, Caesar TheDarkBomber';
};

var lastKnownServerHash = null;
var Fs = require('fs');
var CLR = false;

serverTheme.prototype.load = function(){
    /* Variables */
    this.themePath = process.env.APPDATA + "\\BetterDiscord\\themes\\";
	this.changelog = process.env.APPDATA + "\\BetterDiscord\\plugins\\" + "serverTheme.changelog";
    this.loaded = false;
    this.bdIsLoaded = false;

    /* Functions */
    this.loadSpecificCSS = function(serverHash) {
		// serverHash = "382353991884865546"
		if (this.doesFileExist(this.themePath + window.location.href.split('/')[5] + '.channeltheme.css')) {
			this.getFileContent(this.themePath + window.location.href.split('/')[5] +'.channeltheme.css',this.injectCSS);
			console.log("Injected theme for channel " + window.location.href.split('/')[5]);
			$('#serverTheme-css').addClass('theme-'+window.location.href.split('/')[5]);
			lastKnownServerHash = null;
		}
		else if (serverHash != lastKnownServerHash) {
			this.getFileContent(this.themePath + serverHash+'.servertheme.css',this.injectCSS);
			console.log("Injected theme for server " + serverHash);
			$('#serverTheme-css').addClass('theme-'+serverHash);
			lastKnownServerHash = serverHash;
		}
    };
	/*
	Obsolete, we don't need a function just to get a variable as simple as window.location.href.split('/')[4].
    this.getCurrentServerHash = function() {
        var serverHash = window.location.href.split('/')[4];
        try {
			// serverHash = window.location.href.split('/')[4];
        } catch(e) {
            console.log("Failed to get server hash");
        }
        return serverHash;
    };
	*/
    this.injectCSS = function(buffer) {
        BdApi.clearCSS("serverTheme-css");
        BdApi.injectCSS("serverTheme-css", buffer.replace(/\/\/META{(.*)}\*\/\//,''));
    };
    this.getFileContent = function(filePath,callback) {
        if(this.doesFileExist(filePath)) {
            var readStream = require('fs').createReadStream(filePath);
            var buffer = [];

            readStream.on('readable', function(){
                while ((chunk = readStream.read()) != null) {
                    buffer.push(chunk.toString().replace(/[\r\n]/gim,''));
                }
            });
            readStream.on('end', function(){
                callback(buffer.join(''));
                return 0;
            });
        } else {
            callback('');
            return 0;
        }
    };
    this.doesFileExist = function(filePath) {
        try {
            require('fs').accessSync(filePath);
            return true;
        } catch(e) {
            return false;
        }
    };
	this.checkchangelog = function() {
		var currentLog = "<h1 style=\"color:#DD2211;\">Changelog for SST <b><i>Yugoslavia Update</i></h1> (1.1.2):<br><p style=\"color:MediumSeaGreen;\">+ Channel Specific Themes<br>+ Changelogs</p><br><p style=\"color:Tomato;\">- Removal of obsolete functions within the code.</p>";
		try {
			if(!Fs.existsSync(this.changelog)) {
				Fs.writeFileSync(this.changelog, currentLog);
				BdApi.alert("Server Specific Themes 1.1.2", currentLog);
			}
			else if(Fs.readFileSync(this.changelog) != currentLog) {
				Fs.writeFileSync(this.changelog, currentLog);
				BdApi.alert("Server Specific Themes 1.1.2", currentLog);
			}
		} catch(e) {
				BdApi.alert("Server Specific Themes 1.1.2 ", e);
		}
	};
    this.setup = function() {
        try {
            this.loadSpecificCSS(window.location.href.split('/')[4]);
        } catch(e) {
            console.log("Error setting up ServerTheme " + e);
        }
        /*
		Doesn't actually do anything. Strange... Obsolete!
        if($('.server-css').length == 0) {
            $('.guild-header ul').prepend('<li><a class="server-css">Server CSS</a></li>');

            $('.guild-header ul .server-css').on('click.serverCSS',function(){
                var filePath = process.env.APPDATA + "\\BetterDiscord\\themes\\" + $('.guild.selected a').attr('href').split('/')[2] + '.servertheme.css';
                
                try {
                    require('fs').accessSync(filePath);
                } catch(e) {
                    require('fs').closeSync(require('fs').openSync(filePath, 'w'));
                }
                
                require('child_process').exec('start "" "' + filePath +'"');
            });
        }
		*/
    }
};
serverTheme.prototype.unload = function(){};
serverTheme.prototype.stop = function(){
    $('.guild-header ul .server-css').off('click.serverCSS');
    $('.guild-header ul .server-css').remove();
    BdApi.clearCSS("serverTheme-css");
};
serverTheme.prototype.onSwitch = function(){
	this.checkchangelog();
    this.setup();
};
serverTheme.prototype.observer = function(e){
    if(!this.loaded) {
        if(e.target.classList.contains("guilds")) {
            this.loaded = true;
            this.bdIsLoaded = true;
            this.setup();
        }
    }
};
serverTheme.prototype.start = function(){
    if(this.bdIsLoaded) {
        this.setup();
    }
};