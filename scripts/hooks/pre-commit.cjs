const { execSync } = require("node:child_process");
const fs = require("node:fs");
const process = require("node:process");

const getTTY = () => (process.platform === "win32" ? "CON" : "/dev/tty");

try {
    execSync("npm run lint", { stdio: "inherit" });
    process.exit(0);
} catch {
    console.log("");
    console.log("Issues detected.");
    console.log("");
    console.log("[1] Try Auto-fix and continue");
    console.log("[2] Commit anyway");
    console.log("[3] Abort commit");
    console.log("");

    const tty = fs.createReadStream(getTTY());
    tty.setEncoding("utf8");
    process.stdout.write("Choose an option: ");
    tty.once("data", data => {
        console.log("");
        switch (data.trim()) {
            case "1":
                try {
                    execSync("npm run lint:fix", { stdio: "inherit" });
                    execSync("git add .", { stdio: "inherit" });
                    process.exit(0);
                } catch {
                    process.exit(1);
                }
                break;

            case "2":
                console.log("Continuing without fixes...");
                process.exit(0);
                break;

            default:
                console.log("Commit aborted");
                process.exit(1);
        }
    });
}
