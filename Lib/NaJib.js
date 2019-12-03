var NaJib = {
    version: "0.0.1",
    injectCSS: function (id, css) {
        let element = document.createElement("style");
        element.innerHTML = css;
        element.type = "text/css";
        element.id = id;
        document.head.appendChild(element);
    },
    clearCSS: function (id) {
        let styleid = document.getElementById(id);
        try {
            styleid.remove();
        }
        catch (err) {
            console.error(`${err.message}`);
        }
    },
    injectScript: function (id, script) {
        let element = document.createElement("script");
        element.innerHTML = script;
        element.type = "text/javascript";
        element.id = id;
        document.head.appendChild(element);
    },
    clearScript: function (id) {
        let scriptid = document.getElementById(id);
        if (!scriptid) {
            console.error(`Please enter a valid id!`)
        }
        if (scriptid) {
            scriptid.remove();
        }
    }
}