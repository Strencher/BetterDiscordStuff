const {watch} = require("rollup");
const path = require("path");
const fs = require("fs");
const nodeResolve = require("@rollup/plugin-node-resolve");
const cssom = require("cssom");
const {js: jsBeautify} = require("js-beautify");
const {default: esBuild} = require("rollup-plugin-esbuild");
const {default: json} = require("@rollup/plugin-json");

const defaults = Object.entries({
    watch: false
});

const argv = Object.fromEntries(defaults.concat(
    process.argv.slice(2).reduce((args, arg) => {
        if (arg.indexOf("-") !== 0 && args.length > 0) {
            arg.includes(",") && (arg = arg.split(",")); 
            args[args.length - 1][1] = arg;
        } else {
            while (arg.indexOf("-") === 0) arg = arg.slice(1);
            args.push([arg, true]);
        }
    
        return args;
    }, [])
));

if (!("input" in argv)) {
    console.error("No input provided!");
    process.exit(1);
}

const input = path.resolve(process.cwd(), argv.input);
const manifestPath = path.resolve(input, "package.json");

if (!fs.existsSync(input)) {
    console.error("Can't find input folder. Are you sure it exists?");
    process.exit(1);
}

if (!fs.existsSync(manifestPath)) {
    console.error("Can't find a package.json file in your project. Please create one.");
    process.exit(1);
}

function makeMeta(manifest) {
    manifest.author ??= manifest.authors.map(e => e.name).join(", ");

    return Object.keys(manifest)
        .filter(e => e !== "authors")
        .reduce((str, key) =>
            typeof manifest[key] === "string" 
                ? str + ` * @${key} ${manifest[key]}\n`
                : str
        , "/**\n") + " */\n\n";
}

const styleLoader = `
import manifest from "@manifest";
export default {
    sheets: [],
    _element: null,
    load() {
        if (this._element) return;
        this._element = Object.assign(document.createElement("style"), {
            textContent: this.sheets.join("\\n"),
            id: manifest.name
        });
        document.head.appendChild(this._element);
    },
    unload() {
        this._element?.remove();
        this._element = null;
    }
}`;

const matchAll = ({regex, input, parent = false, flat = false}) => {
    let matches, output = [], lastIndex = 0;
    while (matches = regex.exec(input.slice(lastIndex))) {
        if (!regex.global) lastIndex += matches.index + matches[0].length;
        if (parent) output.push(matches);
        else {
            const [, ...match] = matches;

            output.push(...(flat ? match : [match]));
        }
    }
    return output;
}

const virtual = files => ({
    name: "Virtual Files",
    resolveId(id) {
        return files[id] && id;
    },
    load(id) {
        if (files[id]) {
            return files[id];
        }
    }
});

function upperFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function toCamelCase(str) {
    let out = "";
    const split = str.split("-");

    for (let i = 0; i < split.length; i++) {
        out += i > 0 ? upperFirst(split[i]) : split[i];
    }

    return out;
}

const watcher = watch({
    input: path.resolve(input, fs.readdirSync(input).find(e => e.indexOf("index") === 0)),
    watch: {
        skipWrite: true
    },
    output: {
        format: "cjs",
        exports: "auto"
    },
    external: require("node:module").builtinModules,
    plugins: [
        json(),
        nodeResolve({
            extensions: [".ts", ".tsx", ".js", ".jsx", ".css", ".scss"]
        }),
        esBuild({
            target: "esNext",
            jsx: "transform"
        }),
        virtual({
            "react": "export default BdApi.React",
            "react-dom": "export default BdApi.ReactDOM",
            "@styles": styleLoader,
            get "@manifest"() {return "export default " + fs.readFileSync(manifestPath, "utf8");},
            "@api":
                "import manifest from \"@manifest\";" +
                "export const {Data, Patcher, DOM, ReactUtils, Utils, Webpack, UI, ContextMenu} = new BdApi(manifest.name);",
        }),
        {

            name: "StyleSheet Loader",
            async load(id) {
                const ext = path.extname(id);
                
                if (ext !== ".css" && ext !== ".scss") return null;

                let content; {
                    if (ext === ".scss") {
                        content = (await require("sass").compileAsync(id)).css;
                    } else {
                        content = await fs.promises.readFile(id, "utf8");
                    }
                };

                const names = cssom.parse(content).cssRules.reduce((classNames, rule) => {
                    const matches = matchAll({
                        regex: /((?:\.|#)[\w-]+)/g,
                        input: rule.selectorText,
                        flat: true
                    });

                    Object.assign(classNames,
                        Object.fromEntries(matches.map(m => (m = m.slice(1), [toCamelCase(m), m])))
                    );
            
                    return classNames;
                }, {});

                return "import Styles from \"@styles\";" +
                    `Styles.sheets.push("/* ${id.split(path.sep).pop()} */",` +
                    `\`${content.replaceAll("`", "\\`")}\`);` +
                    "export default " + JSON.stringify(names, null, 4);
            }
        },
        {
            name: "Code Regions",
            transform(code, id) {
                id = path.basename(id);
    
                return `/* @module ${id} */\n${code}\n/*@end */`;
            }
        }
    ],
    
})
    
watcher.on("event", async event => {
    switch (event.code) {
        case "BUNDLE_START": {
            if (argv.watch) console.clear();
            console.time(`Build in`);
        } break;

        case "BUNDLE_END": {
            const manifest = JSON.parse(await fs.promises.readFile(manifestPath, "utf8"));
            const bundle = event.result;

            let {output: [{code}]} = await bundle.generate({format: "cjs", exports: "auto"});
            
            code = code.replace(/var (\w+) =/, "const $1 =");
            code = jsBeautify(code, {
                indent_size: 4,
                indent_char: " ",
                end_with_newline: true,
                brace_style: "preserve-inline"
            });

            const contents = makeMeta(manifest) + code;

            const outfile = path.resolve(process.cwd(), "builds", `${manifest.name}.plugin.js`);

            fs.writeFileSync(outfile, contents, "utf8");

            console.timeEnd(`Build in`);

            event.result.close();
            if (!argv.watch) watcher.close();
        } break;

        case "ERROR": {
            console.error(event.error);
            if (!argv.watch) watcher.close();
        } break;
    }
});
