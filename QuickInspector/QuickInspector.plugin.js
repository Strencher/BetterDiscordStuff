//META{"name": "QuickInspector"}*//
class QuickInspector {
    constructor() { }
    getName() { return "QuickInspector"; }
    getAuthor() { return "Strencher"; }
    getVersion() { return "0.0.1"; }
    getDescription() { return 'Quick inspect\'s element by Holding alt and click.'; }
    load() { }
    unload() { this.stop(); }
    inspect(_) {
        if (_.altKey) {
            _.preventDefault()
            _.stopPropagation();
            require("electron").remote.getCurrentWindow().inspectElement(parseInt(_.clientX * devicePixelRatio), parseInt(_.clientY * devicePixelRatio));
            debugger;
        }
    }
    start() {
        document.body.addEventListener("click", this.inspect);
    }
    stop() {
        document.body.removeEventListener("click", this.inspect);
    }
}

