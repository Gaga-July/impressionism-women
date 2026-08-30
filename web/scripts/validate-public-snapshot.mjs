import { readFile, readdir, stat } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const dataRoot = path.join(root, "generated", "static-data");
const publicRoot = path.join(root, "public");
const errors = [];
const check = (condition, message) => { if (!condition) errors.push(message); };
const load = async name => JSON.parse(await readFile(path.join(dataRoot, name), "utf8"));
const [paintings, artists, summary, report, manifest] = await Promise.all([
  load("paintings.json"), load("artists.json"), load("site-summary.json"),
  load("export-report.json"), load("image-manifest.json"),
]);

check(Array.isArray(paintings) && paintings.length === 355, `Expected 355 paintings, found ${paintings.length}.`);
check(Array.isArray(artists) && artists.length === 7, `Expected 7 artists, found ${artists.length}.`);
check(summary.paintingCount === 355, "Summary painting count is not 355.");
check(summary.artistCount === 7, "Summary artist count is not 7.");
check(summary.imageCount === 321, "Summary image count is not 321.");
check(summary.artworkCodeReservationCount === 2, "Summary reservation count is not 2.");
check(report.status === "passed", "Committed export report did not pass.");
check(manifest.imageCount === 321, "Manifest image count is not 321.");
check(manifest.derivativeCount === 642, "Manifest derivative count is not 642.");

const codes = new Set();
for (const painting of paintings) {
  check(typeof painting.code === "string" && !codes.has(painting.code), `Duplicate or invalid painting code: ${painting.code}`);
  codes.add(painting.code);
}

const referenced = new Set();
for (const entry of manifest.images) {
  for (const publicPath of [entry.detailStaticPath, entry.cardStaticPath]) {
    check(typeof publicPath === "string" && publicPath.startsWith("/static-images/artworks/"), `Unsafe public image path: ${publicPath}`);
    check(!publicPath.includes("..") && !path.isAbsolute(publicPath.slice(1)), `Path traversal in image path: ${publicPath}`);
    if (typeof publicPath !== "string") continue;
    referenced.add(publicPath);
    const file = path.resolve(publicRoot, `.${publicPath}`);
    check(file.startsWith(path.resolve(publicRoot) + path.sep), `Image escapes public root: ${publicPath}`);
    try {
      const info = await stat(file);
      check(info.isFile(), `Derivative is not a file: ${publicPath}`);
      check(info.size < 100 * 1024 * 1024, `Derivative exceeds 100 MiB: ${publicPath}`);
    } catch { errors.push(`Missing derivative: ${publicPath}`); }
  }
}

const derivativeDir = path.join(publicRoot, "static-images", "artworks");
const derivativeNames = await readdir(derivativeDir);
check(derivativeNames.length === 642, `Expected 642 committed WebP files, found ${derivativeNames.length}.`);
for (const name of derivativeNames) {
  check(/^ART-\d{4}-\d{2}(-card)?\.webp$/.test(name), `Unexpected derivative filename: ${name}`);
}
check(referenced.size === 642, `Expected 642 unique manifest paths, found ${referenced.size}.`);

const staticSourceFiles = [
  "src/lib/static-data.ts", "static-site/app/page.tsx", "static-site/app/collection/page.tsx",
  "static-site/app/artists/page.tsx", "static-site/app/artists/[code]/page.tsx",
  "static-site/app/artworks/[code]/page.tsx",
];
for (const relative of staticSourceFiles) {
  const text = await readFile(path.join(root, relative), "utf8");
  check(!/from\s+["']@\/lib\/(prisma|paintings|admin|source-images)["']/.test(text), `Static source imports server runtime: ${relative}`);
  check(!/["']\/(api|images)\//.test(text), `Static source contains forbidden runtime URL: ${relative}`);
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}
console.log("Public snapshot validated: 355 paintings, 7 artists, 321 image records, 2 reservations, 642 WebP derivatives.");
