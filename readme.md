# **BetterDarkMode**
## Download [**🔽ThemeSettings**](https://betterdiscord.net/ghdl?url=https://raw.githubusercontent.com/mwittrien/BetterDiscordAddons/master/Plugins/ThemeSettings/ThemeSettings.plugin.js) Plugin
## Download [**🔽BetterDarkTheme**](https://betterdiscord.net/ghdl?url=https://raw.githubusercontent.com/Strencher/BetterDiscordStuff/master/BetterDarkTheme/BetterDark.theme.css) Theme
![image](https://raw.githubusercontent.com/Strencher/Strencher/master/GIF.gif)
![image](https://raw.githubusercontent.com/Strencher/Strencher/master/GIF2.gif)


# CodeBlockPrewiew
- Let you Prewiew css & Js code from CodeBlocks
# Download [**🔽CodeBlockPrewiew**](https://betterdiscord.net/ghdl?url=https://raw.githubusercontent.com/Strencher/strencher.github.io/master/CodeBlockPrewiew.plugin.js) Plugin
![Prewiew](https://strencher.github.io/CssCodePrewiew.gif)

# **CustomTitleTag**
## Download [**🔽ThemeSettings**](https://betterdiscord.net/ghdl?url=https://raw.githubusercontent.com/mwittrien/BetterDiscordAddons/master/Plugins/ThemeSettings/ThemeSettings.plugin.js) Plugin
## Download[**🔽CustomTitleTag**](https://betterdiscord.net/ghdl?url=https://raw.githubusercontent.com/Strencher/BetterDiscordStuff/master/CustomTitleTga/CustomTitleTag.theme.css) Mini-Theme
![image](https://raw.githubusercontent.com/Strencher/Strencher/master/Screenshot_1.png)
![image](https://raw.githubusercontent.com/Strencher/Strencher/master/Screenshot_2.png)
# Guild Counter
 - Displays a counter with your Servers.
 ![image](https://user-images.githubusercontent.com/46447572/70374194-61306280-18f0-11ea-9f56-e4100f8f19f1.png)

# Download [**🔽Guild Counter**](https://betterdiscord.net/ghdl?url=https://raw.githubusercontent.com/Strencher/BetterDiscordStuff/master/Guild-Counter/Guild-counter.plugin.js) Plugin

# Spotify_Links
 - Opens Spotify links Direct in Spotify **(Spotify Desktop App required!)** by clicking on it.

# Download [**🔽Spotify_Links**](https://betterdiscord.net/ghdl?url=https://raw.githubusercontent.com/Strencher/BetterDiscordStuff/master/Spotify_Links/Spotify_Links.plugin.js) Plugin

# Twitch Chat
## Download [**🔽Twitch Chat**](https://betterdiscord.net/ghdl?url=https://raw.githubusercontent.com/Strencher/BetterDiscordStuff/master/TwitchChat/twitchchat.plugin.js) Plugin

![image](https://strencher.github.io/TwitchChatPrewiew.gif)

# WhatsApp Discord
## Download [**🔽WhatsApp Discord**](https://betterdiscord.net/ghdl?url=https://raw.githubusercontent.com/Strencher/BetterDiscordStuff/master/WhatsAppDiscord/WhatsAppDiscord.plugin.js) Plugin

 - **!!Requires WhatsApp Desktop App!!**

# NaJib Library

## How to Add NaJib to your Plugin:
In the following code `libLoaded` is a function that gets executed when the library is loaded.
```js
var najib = document.getElementById("NaJibLibrary");
    if (!najib) {
         najib = document.createElement("script");
        najib.id = "NaJibLibrary";
        najib.type = "text/javascript";
        najib.src = "https://strencher.github.io/NaJib.min.js";
        document.head.appendChild(najib);
	}
if (window.NaJib) {
    	this.libLoaded();
} else {
    najib.addEventListener("load", () => {
        this.libLoaded()
	});
}
libLoaded() {
	// Your functions instead of start.
}
```
# Docs
### deleteElement
`deleteElement(class or id name)`
```css
You can choose an Id or Class.
```
**Example:**
```js
NaJib.deleteElement(".className");
```
or
```js
NaJib.deleteElement("#IdName");
```
**It Deletes Only the element Not a script they're running inside.**
### InjectCSS
`injectCSS(id, style)`
```css
id: The is of the element / style
style: Your css stylesheed
```
**Example:**
```js
NaJib.injectCSS("testid", `
.emoji {
    background-color: green;
}`);
```
or
```js
var style = `
.emoji {
    background-color: green;
}`;
NaJib.injectCSS("testid", style);
```
### ClearCSS
`clearCSS(id)`
```css
id: Id of an element e.g (id)
```
**Example:**
```js
NaJib.clearCSS("testid");
```
### InjectScript
`injectScript(id, script)`
```css
id: The id of the script
script: Your Js script;
```
**Example:**
```js
NaJib.injectScript("testid", `
console.error("This is not an Error!");
`);
```
or
```js
var script = `
console.error("This is not an Error!")
`;
NaJib.injectScript("testid", script);
```
### injectCSSafter
`injectCSSafter(id, script, delay)`
```css
id: The id of the script
delay: time in milliseconds before the command will executed
```
**Example:**
```js
NaJib.injectCSSafter("testid", `
.emoji {
    background-color: green;
}`, 1200);
```
or
```js
var style = `
.emoji {
    background-color: green;
}`;
NaJib.injectCSS("testid", style, 1200);
```
### ClearCSSafter
`clearCSSafter(id, delay)`
```css
id: Id of an element e.g (id)
delay: time in milliseconds before the command will executed
```
**Example:**
```js
NaJib.clearCSS("testid", 1200);
```
### showToast
`showToast(text, options)`
```css
text: the text in the toast.
options:
  type: Choose an type, here all types: (success, info, normal, error).
  onclick: A function that gets called when the toast is clicked.
  timeout: The duration in milliseconds how long the toast will be visible.
```
**Example:**
```js
NaJib.showToast("This is a Test", {
	type: "info",
	timeout: 7000,
	onclick: ()=>{console.log("clicked")}
});
```
![image](https://user-images.githubusercontent.com/46447572/70256004-ffed7f80-1787-11ea-8094-ee64e2f8772e.png)

