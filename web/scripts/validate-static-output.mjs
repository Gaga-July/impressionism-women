import { readFile, stat } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const dataRoot = path.join(root, "generated/static-data");
const load = async name => JSON.parse(await readFile(path.join(dataRoot, name), "utf8"));
const [paintings, artists, summary, exportReport, manifest] = await Promise.all([
  load("paintings.json"), load("artists.json"), load("site-summary.json"), load("export-report.json"), load("image-manifest.json"),
]);
const errors = [];
const check = (condition, message) => { if (!condition) errors.push(message); };
check(paintings.length === 355, `Expected 355 paintings, found ${paintings.length}.`);
check(artists.length === 7, `Expected 7 artists, found ${artists.length}.`);
check(summary.imageCount === 355, `Expected 355 image records, found ${summary.imageCount}.`);
check(summary.artworkCodeReservationCount === 2, `Expected 2 reservations, found ${summary.artworkCodeReservationCount}.`);
check(exportReport.status === "passed", "Static data export report did not pass.");
check(manifest.imageCount === 355, `Expected 355 manifest images, found ${manifest.imageCount}.`);
check(manifest.derivativeCount === 710, `Expected 710 derivatives, found ${manifest.derivativeCount}.`);
for (const entry of manifest.images) {
  for (const publicPath of [entry.detailStaticPath, entry.cardStaticPath]) {
    const file = path.join(root, "public", ...publicPath.split("/").filter(Boolean));
    try { const info = await stat(file); check(info.size < 100 * 1024 * 1024, `${publicPath} exceeds 100 MiB.`); }
    catch { errors.push(`Missing derivative: ${publicPath}`); }
  }
}
if (errors.length) { console.error(errors.join("\n")); process.exit(1); }
console.log(`Static preparation validated: ${paintings.length} paintings, ${artists.length} artists, ${manifest.imageCount} images, ${manifest.derivativeCount} derivatives.`);
