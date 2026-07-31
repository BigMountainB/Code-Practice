/**
 * Davis Plumbing — static site generator (zero dependencies).
 *
 * Reads page modules from src/pages/, renders each through the shared layout,
 * and writes fully-static HTML to the repo root (GitHub-Pages / any static host
 * ready). Also generates sitemap.xml, robots.txt, site.webmanifest, and — until
 * the real photography is dropped in — lightweight SVG placeholder images.
 *
 *   node build.mjs
 */
import { readdir, mkdir, writeFile, rm, readFile, access } from "node:fs/promises";
import { constants } from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { layout, abs } from "./src/lib/templates.mjs";
import { site } from "./src/data/site.mjs";
import { generatePlaceholders } from "./scripts/placeholders.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = __dirname;
const PAGES_DIR = path.join(ROOT, "src", "pages");

/* --- collect page descriptors ------------------------------------------- */
async function loadPages() {
  const files = (await readdir(PAGES_DIR)).filter((f) => f.endsWith(".mjs"));
  const pages = [];
  for (const file of files.sort()) {
    const mod = await import(pathToFileURL(path.join(PAGES_DIR, file)).href);
    const out = typeof mod.default === "function" ? await mod.default() : mod.default;
    (Array.isArray(out) ? out : [out]).forEach((p) => pages.push(p));
  }
  return pages;
}

/* --- write one page ------------------------------------------------------ */
function outPathFor(p) {
  const clean = (p.path || (p.slug ? `/${p.slug}/` : "/")).replace(/^\//, "");
  if (clean === "" || clean === "/") return "index.html";
  if (clean.endsWith(".html")) return clean; // explicit file, e.g. 404.html
  return path.join(clean, "index.html");
}

async function writePage(p) {
  p.currentPath = p.path || (p.slug ? `/${p.slug}/` : "/");
  const html = layout(p);
  const rel = outPathFor(p);
  const abspath = path.join(ROOT, rel);
  await mkdir(path.dirname(abspath), { recursive: true });
  await writeFile(abspath, html, "utf8");
  return p.currentPath;
}

/* --- sitemap + robots + manifest ---------------------------------------- */
async function writeSitemap(paths) {
  const urls = paths
    .sort()
    .map((u) => {
      const priority = u === "/" ? "1.0" : u.split("/").filter(Boolean).length <= 1 ? "0.8" : "0.6";
      return `  <url><loc>${abs(u)}</loc><changefreq>monthly</changefreq><priority>${priority}</priority></url>`;
    })
    .join("\n");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
  await writeFile(path.join(ROOT, "sitemap.xml"), xml, "utf8");
}

async function writeRobots() {
  const txt = `User-agent: *
Allow: /

Sitemap: ${site.url}/sitemap.xml
`;
  await writeFile(path.join(ROOT, "robots.txt"), txt, "utf8");
}

async function writeManifest() {
  const manifest = {
    name: "Davis Plumbing",
    short_name: "Davis Plumbing",
    description: site.defaultDescription,
    start_url: "/",
    display: "standalone",
    background_color: "#f7f3ea",
    theme_color: site.themeColor,
    icons: [
      { src: "/assets/logos/favicon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/assets/logos/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
  await writeFile(path.join(ROOT, "site.webmanifest"), JSON.stringify(manifest, null, 2), "utf8");
}

/* --- main ---------------------------------------------------------------- */
async function main() {
  const t0 = Date.now ? 0 : 0; // Date.now unavailable in some sandboxes; keep simple
  console.log("→ Generating placeholder imagery…");
  const created = await generatePlaceholders(ROOT);
  console.log(`  ${created} placeholder assets ensured.`);

  console.log("→ Rendering pages…");
  const pages = await loadPages();
  const written = [];
  for (const p of pages) {
    const url = await writePage(p);
    written.push(url);
    console.log(`  ✓ ${url}`);
  }

  // Exclude explicit files (e.g. /404.html) from the sitemap.
  await writeSitemap(written.filter((u) => !u.endsWith(".html")));
  await writeRobots();
  await writeManifest();
  console.log(`→ sitemap.xml (${written.length} urls), robots.txt, site.webmanifest`);
  console.log(`\nDone. ${written.length} pages built.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
