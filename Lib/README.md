# NaJib Library

###InjectCSS
`injectCSS(id, style)`
```
id: The is of the element / style
style: Your css stylesheed
```
**Example:**
```
NaJib.injectCSS("testid", `
.emoji {
    background-color: green;
}`);
```
or
```
var style = `
.emoji {
    background-color: green;
}`;
NaJib.injectCSS("testid", style);
```
### ClearCSS
`clearCSS(id)`
```
id: Id of an element e.g (id)
```
**Example:**
```
NaJib.clearCSS("testid");
```
### InjectScript
`injectScript(id, script)`
```
id: The id of the script
script: Your Js script;
```
**Example:**
```
NaJib.injectScript("testid", `
console.error("This is not an Error!");
`);
```
or
```
var script = `
console.error("This is not an Error!")
`;
NaJib.injectScript("testid", script);
```
### ClearScript
`clearScript(id)`
```
id: The id of the script
```
**Example:**
```
NaJib.clearScript("testid");
```