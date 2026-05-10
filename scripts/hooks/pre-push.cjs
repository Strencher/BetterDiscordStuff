const { execSync } = require("node:child_process");

const protectedBranches = ["development"];

const branch = execSync("git branch --show-current").toString().trim() || null;

console.log(`Current branch: ${branch}`);

if (!branch || !protectedBranches.includes(branch)) {
    console.log("Non-protected branch → skipping pre-push checks");
    process.exit(0);
}

console.log("Protected branch detected → running pre-push checks...");

try {
    const upstream = execSync(`git rev-parse --abbrev-ref ${branch}@{upstream}`).toString().trim() || null;
    const changedFiles =
        execSync(`git diff --name-only ${upstream}...${branch}`).toString().trim().split("\n").filter(Boolean) || [];

    execSync("npm run lint", { stdio: "inherit" });
    execSync(`npm run build -- --plugins ${changedFiles.join(" ")}`, { stdio: "inherit" });
    console.log("");
    console.log("Pre-push checks passed");
    console.log("");
    process.exit(0);
} catch {
    console.log("");
    console.log("Push aborted. Fix issues before pushing to protected branches");
    console.log("");
    process.exit(1);
}
