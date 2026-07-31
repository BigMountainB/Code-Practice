/**
 * Self-contained service-area map.
 *
 * Draws a stylized map of the greater-Seattle → Cascades region with:
 *   - recognizable water (Puget Sound, Lake Washington, Lake Sammamish)
 *   - a service-area BOUNDARY OUTLINE encompassing every city we serve
 *   - a pin for each city, placed by its real latitude/longitude
 *   - an (empty) layer the browser fills with the visitor's location (see
 *     main.js → ipapi.co lookup) and a point-in-polygon "inside our area?" test
 *
 * No map tiles, no external libraries — one inline SVG. Projection is a simple
 * equirectangular mapping with a cosine correction at the region's center
 * latitude so east–west distances read correctly at this scale.
 */

export const BBOX = { lngMin: -122.62, lngMax: -120.62, latMin: 47.02, latMax: 47.86 };
export const MAP = { w: 1000, h: 520 };

const LAT0 = (BBOX.latMin + BBOX.latMax) / 2;
const COSLAT = Math.cos((LAT0 * Math.PI) / 180);

/** Project [lng, lat] → [x, y] in SVG units. Exposed params let JS reuse it. */
export function project(lng, lat, map = MAP, bbox = BBOX) {
  const spanLng = (bbox.lngMax - bbox.lngMin) * COSLAT;
  const x = ((lng - bbox.lngMin) * COSLAT) / spanLng * map.w;
  const y = ((bbox.latMax - lat) / (bbox.latMax - bbox.latMin)) * map.h;
  return [x, y];
}

/** City centers [lng, lat]. Order roughly west→east. */
export const cityCoords = {
  seattle: [-122.3321, 47.6062],
  bellevue: [-122.2015, 47.6101],
  "mercer-island": [-122.2221, 47.5707],
  renton: [-122.2171, 47.4829],
  kent: [-122.2348, 47.3809],
  issaquah: [-122.0326, 47.5301],
  sammamish: [-122.0356, 47.6163],
  "cle-elum": [-120.9395, 47.1954],
};

export const HQ = [-122.1401, 47.4682]; // Renton shop

/* ---- convex hull (Andrew's monotone chain) ---- */
function hull(points) {
  const pts = points.slice().sort((a, b) => a[0] - b[0] || a[1] - b[1]);
  const cross = (o, a, b) => (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
  const lower = [];
  for (const p of pts) {
    while (lower.length >= 2 && cross(lower[lower.length - 2], lower[lower.length - 1], p) <= 0) lower.pop();
    lower.push(p);
  }
  const upper = [];
  for (let i = pts.length - 1; i >= 0; i--) {
    const p = pts[i];
    while (upper.length >= 2 && cross(upper[upper.length - 2], upper[upper.length - 1], p) <= 0) upper.pop();
    upper.push(p);
  }
  upper.pop();
  lower.pop();
  return lower.concat(upper);
}

/** Offset each hull vertex outward from the centroid by `pad` px. */
function expand(poly, pad) {
  const cx = poly.reduce((s, p) => s + p[0], 0) / poly.length;
  const cy = poly.reduce((s, p) => s + p[1], 0) / poly.length;
  return poly.map(([x, y]) => {
    const dx = x - cx, dy = y - cy;
    const d = Math.hypot(dx, dy) || 1;
    return [x + (dx / d) * pad, y + (dy / d) * pad];
  });
}

/** Rounded-corner path through polygon vertices (quadratic corners). */
function roundedPath(poly, r = 26) {
  const n = poly.length;
  let d = "";
  for (let i = 0; i < n; i++) {
    const p0 = poly[(i - 1 + n) % n], p1 = poly[i], p2 = poly[(i + 1) % n];
    const v1x = p1[0] - p0[0], v1y = p1[1] - p0[1];
    const v2x = p2[0] - p1[0], v2y = p2[1] - p1[1];
    const l1 = Math.hypot(v1x, v1y) || 1, l2 = Math.hypot(v2x, v2y) || 1;
    const rr = Math.min(r, l1 / 2, l2 / 2);
    const a = [p1[0] - (v1x / l1) * rr, p1[1] - (v1y / l1) * rr];
    const b = [p1[0] + (v2x / l2) * rr, p1[1] + (v2y / l2) * rr];
    d += i === 0 ? `M ${a[0].toFixed(1)} ${a[1].toFixed(1)} ` : `L ${a[0].toFixed(1)} ${a[1].toFixed(1)} `;
    d += `Q ${p1[0].toFixed(1)} ${p1[1].toFixed(1)} ${b[0].toFixed(1)} ${b[1].toFixed(1)} `;
  }
  return d + "Z";
}

/** Small blob path from a center + radii (for water shapes). */
function blob(cx, cy, rx, ry, wob = 0.16) {
  const pts = [];
  const steps = 10;
  for (let i = 0; i < steps; i++) {
    const a = (i / steps) * Math.PI * 2;
    const w = 1 + Math.sin(i * 1.7) * wob;
    pts.push([cx + Math.cos(a) * rx * w, cy + Math.sin(a) * ry * w]);
  }
  let d = `M ${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)} `;
  for (let i = 0; i < steps; i++) {
    const p1 = pts[i], p2 = pts[(i + 1) % steps];
    const mx = (p1[0] + p2[0]) / 2, my = (p1[1] + p2[1]) / 2;
    d += `Q ${p1[0].toFixed(1)} ${p1[1].toFixed(1)} ${mx.toFixed(1)} ${my.toFixed(1)} `;
  }
  return d + "Z";
}

/** Compute the padded, rounded boundary + the raw polygon (for point-in-poly). */
export function serviceBoundary() {
  const projected = Object.values(cityCoords).map(([lng, lat]) => project(lng, lat));
  const h = hull(projected);
  const padded = expand(h, 40);
  return { path: roundedPath(padded, 30), polygon: padded };
}

/**
 * Build the map SVG + surrounding UI. `cities` is [{slug, label}] for labels.
 */
export function serviceAreaMap(cities) {
  const { path, polygon } = serviceBoundary();
  const [hqx, hqy] = project(HQ[0], HQ[1]);

  // Water features (positioned by real coordinates, drawn stylized)
  const [psx, psy] = project(-122.55, 47.62);
  const [lwx, lwy] = project(-122.26, 47.60);
  const [lsx, lsy] = project(-122.085, 47.585);
  const water = `
    <path d="${blob(psx, psy, 46, 150, 0.28)}" fill="url(#water)"/>
    <path d="${blob(psx, psy + 250, 40, 120, 0.3)}" fill="url(#water)"/>
    <path d="${blob(lwx, lwy, 20, 60)}" fill="url(#water)"/>
    <path d="${blob(lsx, lsy, 9, 26)}" fill="url(#water)"/>`;

  // Cascades hint between the Puget Sound cluster and Cle Elum
  const [cmx, cmy] = project(-121.6, 47.42);
  const mtn = [0, 1, 2, 3]
    .map((i) => {
      const bx = cmx - 90 + i * 60;
      const by = cmy + 30;
      const peak = 40 + (i % 2) * 16;
      return `<path d="M ${bx} ${by} l 34 -${peak} l 34 ${peak} z" fill="#c9bfa8" opacity="0.35"/>`;
    })
    .join("");

  // Explicit label placement (dx, dy, anchor) to avoid overlap in the tight
  // western cluster where several cities share nearly the same x.
  const labelCfg = {
    seattle: { dx: -12, dy: 4, anchor: "end" },
    bellevue: { dx: 12, dy: -12, anchor: "start" },
    "mercer-island": { dx: -12, dy: 5, anchor: "end" },
    renton: { dx: 12, dy: 6, anchor: "start" },
    kent: { dx: 0, dy: 28, anchor: "middle" },
    issaquah: { dx: 12, dy: 5, anchor: "start" },
    sammamish: { dx: 0, dy: -16, anchor: "middle" },
    "cle-elum": { dx: -12, dy: 5, anchor: "end" },
  };
  const pins = cities
    .map((c) => {
      const co = cityCoords[c.slug];
      if (!co) return "";
      const [x, y] = project(co[0], co[1]);
      const cfg = labelCfg[c.slug] || { dx: 0, dy: -16, anchor: "middle" };
      return `<g class="pin" transform="translate(${x.toFixed(1)},${y.toFixed(1)})">
        <circle r="12" fill="#8f1d21" opacity="0.15"/>
        <circle r="5.5" fill="#8f1d21" stroke="#fff" stroke-width="2"/>
        <text x="${cfg.dx}" y="${cfg.dy}" text-anchor="${cfg.anchor}" class="pin-label">${c.label}</text>
      </g>`;
    })
    .join("");

  return `<div class="areamap" id="areamap"
      data-bbox='${JSON.stringify(BBOX)}'
      data-map='${JSON.stringify(MAP)}'
      data-coslat="${COSLAT}"
      data-polygon='${JSON.stringify(polygon.map((p) => [Math.round(p[0]), Math.round(p[1])]))}'>
    <svg viewBox="0 0 ${MAP.w} ${MAP.h}" role="img" aria-label="Map of the Davis Plumbing service area across the greater Seattle region">
      <defs>
        <linearGradient id="land" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#f2ece0"/><stop offset="1" stop-color="#e7ddc9"/>
        </linearGradient>
        <linearGradient id="water" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#bcd0d6"/><stop offset="1" stop-color="#a7c0c8"/>
        </linearGradient>
        <linearGradient id="region" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#8f1d21" stop-opacity="0.14"/><stop offset="1" stop-color="#8f1d21" stop-opacity="0.06"/>
        </linearGradient>
      </defs>
      <rect width="${MAP.w}" height="${MAP.h}" fill="url(#land)"/>
      ${water}
      ${mtn}
      <path d="${path}" fill="url(#region)" stroke="#8f1d21" stroke-width="2.5" stroke-dasharray="9 7" stroke-linejoin="round"/>
      ${(() => {
        const [tx, ty] = project(-121.35, 47.3);
        return `<text x="${tx.toFixed(1)}" y="${ty.toFixed(1)}" text-anchor="middle" class="region-tag">OUR SERVICE AREA</text>`;
      })()}
      ${pins}
      <g class="hq" transform="translate(${hqx.toFixed(1)},${hqy.toFixed(1)})">
        <circle r="7.5" fill="#c1a15a" stroke="#6d1216" stroke-width="2"/>
      </g>
      <g id="you-pin" class="you-pin" style="display:none">
        <circle class="pulse" r="10" fill="#1d6b3a"/>
        <circle r="6.5" fill="#22a35a" stroke="#fff" stroke-width="2.5"/>
        <text y="-16" text-anchor="middle" class="you-label">You</text>
      </g>
    </svg>
    <div class="areamap-status" id="areamap-status" role="status" aria-live="polite">
      <span class="dot" aria-hidden="true"></span>
      <span class="msg">Locating you on the map…</span>
    </div>
    <ul class="areamap-legend" aria-hidden="true">
      <li><span class="k hq"></span> Our shop (Renton)</li>
      <li><span class="k city"></span> Cities we serve</li>
      <li><span class="k region"></span> Service-area boundary</li>
      <li><span class="k you"></span> Your location</li>
    </ul>
  </div>`;
}
