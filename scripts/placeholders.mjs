/**
 * Generates tasteful, on-brand SVG placeholders so the site looks finished
 * before the real photography is added. When a real photo exists at the
 * expected path (e.g. /assets/img/services/remodels.jpg), the build's photo()
 * resolver uses it automatically and ignores the placeholder.
 *
 * Placeholders are written to /assets/img/placeholders/ (a generated folder).
 * See README → "Adding the real project photos".
 */
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { services, galleryCategories } from "../src/data/site.mjs";

const crest = `<g opacity="0.10" transform="translate(CX,CY)">
  <path d="M0 -46 -40 -33 v34 c0 24 18 40 40 47 22 -7 40 -23 40 -47 v-34 z" fill="none" stroke="STROKE" stroke-width="2"/>
  <path d="M0 -20 V22 M-18 -8 H18" stroke="STROKE" stroke-width="3" stroke-linecap="round"/>
  <circle cx="0" cy="30" r="5" fill="none" stroke="STROKE" stroke-width="3"/>
</g>`;

function panel({
  w = 1200,
  h = 900,
  label = "",
  sub = "",
  bg1 = "#efe8da",
  bg2 = "#e2d8c4",
  ink = "#8a7d63",
  stroke = "#a5673b",
}) {
  const cx = w / 2;
  const cy = h / 2 - (label ? 26 : 0);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="img" aria-label="${label || "Davis Plumbing"}">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${bg1}"/><stop offset="1" stop-color="${bg2}"/>
    </linearGradient>
    <pattern id="p" width="34" height="34" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
      <line x1="0" y1="0" x2="0" y2="34" stroke="${ink}" stroke-opacity="0.05" stroke-width="1"/>
    </pattern>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#g)"/>
  <rect width="${w}" height="${h}" fill="url(#p)"/>
  ${crest.replace("CX", cx).replace("CY", cy - 40).replaceAll("STROKE", stroke)}
  ${
    label
      ? `<text x="${cx}" y="${cy + 70}" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-size="46" fill="${ink}">${label}</text>`
      : ""
  }
  ${
    sub
      ? `<text x="${cx}" y="${cy + 110}" text-anchor="middle" font-family="system-ui, sans-serif" font-size="20" letter-spacing="3" fill="${ink}" opacity="0.7">${sub.toUpperCase()}</text>`
      : ""
  }
</svg>`;
}

export async function generatePlaceholders(root) {
  const dir = path.join(root, "assets", "img", "placeholders");
  await mkdir(dir, { recursive: true });
  const files = {};

  // Generic kinds
  files["kind-generic.svg"] = panel({ label: "Davis Plumbing", sub: "Craftsmanship" });
  files["kind-wide.svg"] = panel({ w: 1400, h: 900, label: "Davis Plumbing", sub: "Craftsmanship" });
  files["kind-tall.svg"] = panel({ w: 900, h: 1200, label: "Davis Plumbing", sub: "Craftsmanship" });
  files["kind-square.svg"] = panel({ w: 1000, h: 1000, label: "Davis Plumbing" });

  // Dark hero placeholder
  files["kind-hero.svg"] = panel({
    w: 1600,
    h: 1000,
    label: "Davis Plumbing",
    sub: "Family · Craftsmanship · Trust",
    bg1: "#1d2126",
    bg2: "#12151a",
    ink: "#d8be86",
    stroke: "#c1a15a",
  });

  // Portrait (owner/team)
  files["kind-portrait.svg"] = panel({ w: 900, h: 1100, label: "The Davis Family", sub: "Since 2006", bg1: "#e7ded0", bg2: "#d8ccb6" });

  // OG image (social share) — 1200x630
  files["og.svg"] = panel({
    w: 1200,
    h: 630,
    label: "Davis Plumbing",
    sub: "Renton · Kent · Greater Seattle",
    bg1: "#1d2126",
    bg2: "#12151a",
    ink: "#d8be86",
    stroke: "#c1a15a",
  });

  // Per-service
  for (const s of services) {
    files[`service-${s.slug}.svg`] = panel({ w: 1200, h: 900, label: s.title, sub: "Davis Plumbing" });
  }

  // Per-gallery-category
  for (const c of galleryCategories) {
    files[`gallery-${c.slug}.svg`] = panel({ w: 1000, h: c.slug === "rough-in" ? 1200 : 800, label: c.label, sub: "Project Gallery" });
  }

  let count = 0;
  for (const [name, svg] of Object.entries(files)) {
    await writeFile(path.join(dir, name), svg, "utf8");
    count++;
  }
  return count;
}
