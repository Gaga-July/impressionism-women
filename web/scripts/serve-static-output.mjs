import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import { createServer } from "node:http";
import path from "node:path";

const root = path.resolve(process.cwd(), "out");
const port = Number(process.env.STATIC_PORT ?? 4173);
const rawBase = process.env.NEXT_PUBLIC_BASE_PATH?.trim() ?? "";
const basePath = rawBase && rawBase !== "/" ? `/${rawBase.replace(/^\/+|\/+$/g, "")}` : "";
const mime = { ".html": "text/html; charset=utf-8", ".css": "text/css; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".json": "application/json", ".svg": "image/svg+xml", ".webp": "image/webp", ".ico": "image/x-icon" };

async function resolveFile(urlPath) {
  let pathname = decodeURIComponent(urlPath.split("?")[0]);
  if (basePath) {
    if (pathname === basePath) pathname = "/";
    else if (pathname.startsWith(`${basePath}/`)) pathname = pathname.slice(basePath.length);
    else return null;
  }
  const relative = pathname.replace(/^\/+/, "");
  const candidate = path.resolve(root, relative);
  if (candidate !== root && !candidate.startsWith(`${root}${path.sep}`)) return null;
  const attempts = [candidate, path.join(candidate, "index.html")];
  for (const attempt of attempts) { try { if ((await stat(attempt)).isFile()) return attempt; } catch {} }
  return null;
}

createServer(async (request, response) => {
  const file = await resolveFile(request.url ?? "/");
  if (!file) {
    const notFound = path.join(root, "404.html"); response.writeHead(404, { "Content-Type": mime[".html"] }); createReadStream(notFound).pipe(response); return;
  }
  response.writeHead(200, { "Content-Type": mime[path.extname(file).toLowerCase()] ?? "application/octet-stream", "Cache-Control": "no-store" }); createReadStream(file).pipe(response);
}).listen(port, "127.0.0.1", () => console.log(`Static output served at http://127.0.0.1:${port}${basePath || "/"}`));
