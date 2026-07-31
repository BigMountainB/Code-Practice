/**
 * Fetches authoritative municipal boundaries (US Census TIGER, via the
 * generalpiston/geojson-us-city-boundaries GitHub mirror), simplifies them, and
 * writes src/data/boundaries.mjs. Run once (output is committed, so the normal
 * build needs no network):
 *
 *   node scripts/gen-boundaries.mjs
 */
import { writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const BASE = "https://raw.githubusercontent.com/generalpiston/geojson-us-city-boundaries/master/cities/wa";

const CITIES = [
  { slug: "seattle", name: "Seattle", frame: "west" },
  { slug: "bellevue", name: "Bellevue", frame: "west" },
  { slug: "mercer-island", name: "Mercer Island", frame: "west" },
  { slug: "renton", name: "Renton", frame: "west" },
  { slug: "kent", name: "Kent", frame: "west" },
  { slug: "issaquah", name: "Issaquah", frame: "west" },
  { slug: "sammamish", name: "Sammamish", frame: "west" },
  { slug: "cle-elum", name: "Cle Elum", frame: "east" },
];

/* Ramer–Douglas–Peucker on [lng,lat] rings. */
function rdp(points, eps) {
  if (points.length < 3) return points;
  let dmax = 0, idx = 0;
  const [ax, ay] = points[0], [bx, by] = points[points.length - 1];
  for (let i = 1; i < points.length - 1; i++) {
    const [px, py] = points[i];
    const dx = bx - ax, dy = by - ay;
    const t = (dx * dx + dy * dy) || 1;
    const u = ((px - ax) * dx + (py - ay) * dy) / t;
    const cx = ax + u * dx, cy = ay + u * dy;
    const d = Math.hypot(px - cx, py - cy);
    if (d > dmax) { dmax = d; idx = i; }
  }
  if (dmax > eps) {
    const left = rdp(points.slice(0, idx + 1), eps);
    const right = rdp(points.slice(idx), eps);
    return left.slice(0, -1).concat(right);
  }
  return [points[0], points[points.length - 1]];
}

const area = (ring) => {
  let a = 0;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++)
    a += ring[j][0] * ring[i][1] - ring[i][0] * ring[j][1];
  return Math.abs(a / 2);
};

function outerRings(geom) {
  const rings = [];
  if (geom.type === "Polygon") rings.push(geom.coordinates[0]);
  else if (geom.type === "MultiPolygon") geom.coordinates.forEach((poly) => rings.push(poly[0]));
  return rings;
}

async function main() {
  const out = {};
  for (const c of CITIES) {
    const res = await fetch(`${BASE}/${c.slug}.json`);
    const gj = await res.json();
    const geom = gj.type === "FeatureCollection" ? gj.features[0].geometry : gj.type === "Feature" ? gj.geometry : gj;
    let rings = outerRings(geom).map((r) => r.map(([lng, lat]) => [lng, lat]));
    const maxA = Math.max(...rings.map(area));
    // keep the main body + significant exclaves; drop slivers
    rings = rings.filter((r) => area(r) >= 0.04 * maxA);
    // simplify
    const eps = 0.00045; // ~45m
    rings = rings.map((r) => rdp(r, eps).map(([lng, lat]) => [Math.round(lng * 1e5) / 1e5, Math.round(lat * 1e5) / 1e5]));
    out[c.slug] = { name: c.name, frame: c.frame, rings };
    console.log(`${c.slug}: ${rings.length} ring(s), ${rings.reduce((s, r) => s + r.length, 0)} pts`);
  }

  const body = `/**
 * Municipal boundaries for the Davis Plumbing service area.
 * Source: US Census TIGER places (via generalpiston/geojson-us-city-boundaries),
 * simplified with Ramer–Douglas–Peucker (~45 m). Regenerate with
 * scripts/gen-boundaries.mjs. Coordinates are [lng, lat]; outer rings only.
 */
export const boundaries = ${JSON.stringify(out)};
`;
  await writeFile(path.join(ROOT, "src", "data", "boundaries.mjs"), body, "utf8");
  const bytes = Buffer.byteLength(body);
  console.log(`Wrote src/data/boundaries.mjs (${(bytes / 1024).toFixed(1)} KB)`);
}
main().catch((e) => { console.error(e); process.exit(1); });
