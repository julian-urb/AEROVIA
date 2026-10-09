import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { existsSync } from "node:fs";
import { extname, join, normalize } from "node:path";

const root = process.argv[2] ?? "out";
const port = Number(process.argv[3] ?? 5210);

const CONTENT_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".txt": "text/plain",
  ".xml": "application/xml",
  ".webmanifest": "application/manifest+json",
  ".woff2": "font/woff2",
  ".ico": "image/x-icon",
};

const ROUTES = [
  "/",
  "/destinations/",
  "/destinations/tokyo/",
  "/destinations/singapore/",
  "/destinations/cebu/",
  "/destinations/seoul/",
  "/destinations/bangkok/",
  "/destinations/dubai/",
  "/travel-info/",
  "/manage/",
  "/results/",
  "/passenger-details/",
  "/passengers/",
  "/seats/",
  "/payment/",
  "/confirmation/",
  "/privacy/",
  "/terms/",
  "/robots.txt",
  "/sitemap.xml",
  "/manifest.webmanifest",
  "/404.html",
  "/offline.html",
  "/sw.js",
];

function contentType(file) {
  return CONTENT_TYPES[extname(file)] ?? "application/octet-stream";
}

async function serveFile(res, file) {
  const data = await readFile(file);
  res.writeHead(200, { "Content-Type": contentType(file) });
  res.end(data);
}

function resolveFile(urlPath) {
  const safe = normalize(decodeURIComponent(urlPath.split("?")[0])).replace(
    /^(\.\.[/\\])+/,
    "",
  );
  const candidate = join(root, safe);
  if (existsSync(candidate)) {
    const info = stat(candidate);
    return info.then((s) => {
      if (s.isDirectory()) {
        const indexFile = join(candidate, "index.html");
        return existsSync(indexFile) ? indexFile : null;
      }
      return candidate;
    });
  }
  const indexFile = join(root, safe, "index.html");
  if (existsSync(indexFile)) return Promise.resolve(indexFile);
  return Promise.resolve(null);
}

const server = createServer(async (req, res) => {
  try {
    const file = await resolveFile(req.url ?? "/");
    if (!file) {
      const notFound = join(root, "404.html");
      if (existsSync(notFound)) {
        const data = await readFile(notFound);
        res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
        res.end(data);
        return;
      }
      res.writeHead(404);
      res.end("not found");
      return;
    }
    await serveFile(res, file);
  } catch {
    res.writeHead(500);
    res.end("error");
  }
});

function checkBuildArtifacts() {
  const required = [join(root, "index.html"), join(root, "404.html")];
  const missing = required.filter((file) => !existsSync(file));
  if (missing.length) {
    throw new Error(
      `Missing export artifacts: ${missing.join(", ")}. Did the build output to "${root}"?`,
    );
  }
}

await checkBuildArtifacts();

await new Promise((resolve) => server.listen(port, resolve));
console.log(`Smoke test serving "${root}" on http://localhost:${port}`);

const base = `http://localhost:${port}`;
let failures = 0;

for (const route of ROUTES) {
  try {
    const response = await fetch(`${base}${route}`, { redirect: "manual" });
    const ok = response.status === 200;
    if (!ok) failures += 1;
    console.log(`${ok ? "PASS" : "FAIL"} ${route} -> ${response.status}`);
  } catch (error) {
    failures += 1;
    console.log(`FAIL ${route} -> ${error.message}`);
  }
}

server.close();

if (failures > 0) {
  console.error(`\nSmoke test failed: ${failures} route(s) did not return 200.`);
  process.exit(1);
}
console.log(`\nSmoke test passed: ${ROUTES.length} routes returned 200.`);
