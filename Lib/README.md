# NaJib Library

## How to Add NaJib to your Plugin:
In the following code `libLoaded` is a function that gets executed when the library is loaded.
```js
if(!global.NaJib) {
            const title = "Library Missing";
            const ModalStack = BdApi.findModuleByProps("push", "update", "pop", "popWithKey");
            const TextElement = BdApi.findModuleByProps("Sizes", "Weights");
            const ConfirmationModal = BdApi.findModule(m => m.defaultProps && m.key && m.key() == "confirm-modal");
            if (!ModalStack || !ConfirmationModal || !TextElement) return BdApi.alert(title, `The library plugin needed for ${this.getName()} is missing.<br /><br /> <a href="https://betterdiscord.net/ghdl?url=https://raw.githubusercontent.com/Strencher/BetterDiscordStuff/master/Lib/0NaJibLibrary.plugin.js" target="_blank">Click here to download the library!</a>`);
            ModalStack.push(function(props) {
                return BdApi.React.createElement(ConfirmationModal, Object.assign({
                    header: title,
                    children: [TextElement({color: TextElement.Colors.PRIMARY, children: [`The NaJib library plugin needed for ${this.getName()} is missing. Please click Download Now to install it.`]})],
                    red: false,
                    confirmText: "Download Now",
                    cancelText: "Cancel",
                    onConfirm: () => {
                        require("request").get("https://raw.githubusercontent.com/Strencher/BetterDiscordStuff/master/Lib/0NaJibLibrary.plugin.js", async (error, response, body) => {
                            if (error) return require("electron").shell.openExternal("https://betterdiscord.net/ghdl?url=https://raw.githubusercontent.com/Strencher/BetterDiscordStuff/master/Lib/0NaJibLibrary.plugin.js");
                            await new Promise(r => require("fs").writeFile(require("path").join(ContentManager.pluginsFolder, "0NaJibLibrary.plugin.js"), body, r));
                        });
                    }
                }, props));
            });
        } else {
            // Your stuff "Start".
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
