const fs = require("fs");
const path = require("path");

const ignore = [
    ".github",
    ".git",
    "bdbuilder"
];

__dirname = path.join(__dirname, "..");

(function moveItems() {
    for (const folder of fs.readdirSync(__dirname).filter(e => fs.statSync(path.join(__dirname, e)).isDirectory() && ignore.indexOf(e) < 0)) {
        const folderPath = path.join(__dirname, folder);

        if (!fs.existsSync(path.join(folderPath, "src"))) continue;
        for (const file of fs.readdirSync(folderPath).filter(e => [".plugin.js", ".md"].some(ext => e.endsWith(ext)))) {
            fs.unlinkSync(path.join(folderPath, file));
        }
        for (const file of fs.readdirSync(path.join(folderPath, "src"))) {
            fs.renameSync(path.join(folderPath, "src", file), path.join(folderPath, file));
        }
        fs.rmdirSync(path.join(folderPath, "src"));
    }
})();
