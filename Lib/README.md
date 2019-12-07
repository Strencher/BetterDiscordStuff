# NaJib Library

## How to Add NaJib to your Plugin:
In the following code `libLoaded` is a function that gets executed when the library is loaded.
```js
var najib = document.getElementById("NaJibLibrary");
if(!najib){
	najib = document.createElement("script");
	najib.id = "NaJibLibrary";
	najib.type = "text/javascript";
	najib.src = "https://strencher.github.io/NaJib.js";
	document.head.appendChild(najib);
}
if(typeof NaJib !== "undefined") libLoaded();
else najib.addEventListener("load", libLoaded);
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
