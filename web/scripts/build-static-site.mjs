import { existsSync } from "node:fs";
import { cp, lstat, mkdir, readlink, rename, rm, symlink } from "node:fs/promises";
import path from "node:path";
import { spawn } from "node:child_process";

const webRoot = process.cwd();
const staticRoot = path.join(webRoot, "static-site");
const publicLink = path.join(staticRoot, "public");
const sourcePublic = path.join(webRoot, "public");
const sourceOut = path.join(staticRoot, "out");
const finalOut = path.join(webRoot, "out");

function assertInside(target, parent, label) {
  const relative = path.relative(parent, target);
  if (!relative || relative.startsWith("..") || path.isAbsolute(relative)) throw new Error(`${label} is outside its expected parent: ${target}`);
}
assertInside(publicLink, staticRoot, "Static public link");
assertInside(sourceOut, staticRoot, "Static build output");
assertInside(finalOut, webRoot, "Final output");

async function ensurePublicLink() {
  if (existsSync(publicLink)) {
    const info = await lstat(publicLink);
    if (!info.isSymbolicLink()) throw new Error(`Refusing to replace non-link path: ${publicLink}`);
    const target = path.resolve(staticRoot, await readlink(publicLink));
    if (target !== sourcePublic) throw new Error(`Static public link points to unexpected target: ${target}`);
    return;
  }
  await symlink(sourcePublic, publicLink, process.platform === "win32" ? "junction" : "dir");
}

await ensurePublicLink();
const nextBin = path.join(webRoot, "node_modules", "next", "dist", "bin", "next");
const child = spawn(process.execPath, [nextBin, "build", "static-site"], {
  cwd: webRoot, stdio: "inherit", env: { ...process.env, STATIC_EXPORT: "true" },
});
const exitCode = await new Promise((resolve, reject) => { child.once("error", reject); child.once("exit", code => resolve(code ?? 1)); });
if (exitCode !== 0) process.exit(exitCode);
if (!existsSync(sourceOut)) throw new Error(`Static build did not create ${sourceOut}`);
if (existsSync(finalOut)) await rm(finalOut, { recursive: true, force: true });
try { await rename(sourceOut, finalOut); }
catch {
  await mkdir(finalOut, { recursive: true });
  await cp(sourceOut, finalOut, { recursive: true });
  await rm(sourceOut, { recursive: true, force: true });
}
console.log(`Static site exported to ${finalOut}`);
