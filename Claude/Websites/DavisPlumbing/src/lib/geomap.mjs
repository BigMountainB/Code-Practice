/**
 * Service-area map built from real municipal boundaries (US Census TIGER,
 * simplified — see scripts/gen-boundaries.mjs → src/data/boundaries.mjs).
 *
 * Every jurisdiction is drawn as its actual outline. Because Cle Elum sits ~85
 * miles east across the Cascades, the Puget Sound cluster is the main map and
 * Cle Elum gets its own inset — an honest depiction of the separation rather
 * than one big blob. The visitor is located by IP (see main.js), tested against
 * the real polygons, and pinned in whichever frame contains them.
 */
import { boundaries } from "../data/boundaries.mjs";

const COS = Math.cos((47.53 * Math.PI) / 180);
const HQ = { lng: -122.1401, lat: 47.4682, city: "renton" }; // Renton shop

function ringsBBox(slugs) {
  let lngMin = 180, lngMax = -180, latMin = 90, latMax = -90;
  for (const s of slugs)
    for (const ring of boundaries[s].rings)
      for (const [lng, lat] of ring) {
        if (lng < lngMin) lngMin = lng;
        if (lng > lngMax) lngMax = lng;
        if (lat < latMin) latMin = lat;
        if (lat > latMax) latMax = lat;
      }
  return { lngMin, lngMax, latMin, latMax };
}

function pad(bb, fx, fy) {
  const dx = (bb.lngMax - bb.lngMin) * fx;
  const dy = (bb.latMax - bb.latMin) * fy;
  return { lngMin: bb.lngMin - dx, lngMax: bb.lngMax + dx, latMin: bb.latMin - dy, latMax: bb.latMax + dy };
}

/** Fit a geographic bbox into a max box, preserving aspect (cos-corrected). */
function makeFrame(slugs, maxW, maxH, padX = 0.08, padY = 0.08) {
  const bb = pad(ringsBBox(slugs), padX, padY);
  const effW = (bb.lngMax - bb.lngMin) * COS;
  const effH = bb.latMax - bb.latMin;
  const scale = Math.min(maxW / effW, maxH / effH);
  const w = +(effW * scale).toFixed(1);
  const h = +(effH * scale).toFixed(1);
  const project = (lng, lat) => [(lng - bb.lngMin) * COS * scale, (bb.latMax - lat) * scale];
  return { bbox: bb, scale, w, h, project };
}

const centroid = (rings) => {
  const r = rings.reduce((a, b) => (b.length > a.length ? b : a), rings[0]);
  let x = 0, y = 0;
  r.forEach(([lng, lat]) => { x += lng; y += lat; });
  return [x / r.length, y / r.length];
};

function ringPath(ring, project) {
  return (
    ring
      .map(([lng, lat], i) => {
        const [x, y] = project(lng, lat);
        return `${i ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`;
      })
      .join("") + "Z"
  );
}

function cityPaths(slug, frame) {
  return boundaries[slug].rings.map((r) => `<path class="boundary" d="${ringPath(r, frame.project)}"/>`).join("");
}

/** Small water/landmark text hints (positioned by coordinate, no fake shapes). */
function waterLabels(frame) {
  const items = [
    { lng: -122.435, lat: 47.6, t: "Puget Sound" },
    { lng: -122.252, lat: 47.64, t: "Lake Washington" },
    { lng: -122.085, lat: 47.605, t: "Lake Sammamish" },
  ];
  return items
    .map((w) => {
      const [x, y] = frame.project(w.lng, w.lat);
      if (x < 6 || y < 6 || x > frame.w - 6 || y > frame.h - 6) return "";
      return `<text x="${x.toFixed(1)}" y="${y.toFixed(1)}" transform="rotate(-90 ${x.toFixed(1)} ${y.toFixed(1)})" class="water-label">${w.t}</text>`;
    })
    .join("");
}

export function serviceAreaMap() {
  const westSlugs = Object.keys(boundaries).filter((s) => boundaries[s].frame === "west");
  const eastSlugs = Object.keys(boundaries).filter((s) => boundaries[s].frame === "east");

  const west = makeFrame(westSlugs, 560, 640, 0.1, 0.06);
  const east = makeFrame(eastSlugs, 300, 150, 0.35, 0.6);

  const westCity = (slug) => {
    const [clng, clat] = centroid(boundaries[slug].rings);
    const [lx, ly] = west.project(clng, clat);
    return `<g class="jurisdiction" data-slug="${slug}">${cityPaths(slug, west)}
      <text x="${lx.toFixed(1)}" y="${ly.toFixed(1)}" class="city-label">${boundaries[slug].name}</text></g>`;
  };
  const [hqx, hqy] = west.project(HQ.lng, HQ.lat);

  const eastCity = (slug) => {
    const [clng, clat] = centroid(boundaries[slug].rings);
    const [lx, ly] = east.project(clng, clat);
    return `<g class="jurisdiction">${cityPaths(slug, east)}
      <text x="${lx.toFixed(1)}" y="${(ly - 12).toFixed(1)}" class="city-label">${boundaries[slug].name}</text></g>`;
  };

  // Geo payload for the browser (point-in-polygon + pin placement).
  const framePayload = (f) => ({ lngMin: f.bbox.lngMin, latMax: f.bbox.latMax, cos: COS, scale: f.scale, w: f.w, h: f.h });
  const geo = {
    frames: { west: framePayload(west), east: framePayload(east) },
    cities: Object.fromEntries(
      Object.entries(boundaries).map(([slug, b]) => [slug, { name: b.name, frame: b.frame, rings: b.rings }])
    ),
  };

  return `<div class="areamap" id="areamap">
  <script type="application/json" id="areamap-geo">${JSON.stringify(geo)}</script>
  <div class="areamap-grid">
    <div class="areamap-main">
      <svg viewBox="0 0 ${west.w} ${west.h}" role="img" aria-label="Map of Davis Plumbing's Puget Sound service area with each city's boundary outlined">
        <defs>
          <linearGradient id="mapland" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f4efe4"/><stop offset="1" stop-color="#eae0cd"/></linearGradient>
        </defs>
        <rect width="${west.w}" height="${west.h}" fill="url(#mapland)"/>
        ${waterLabels(west)}
        ${westSlugs.map(westCity).join("")}
        <g class="hq" transform="translate(${hqx.toFixed(1)},${hqy.toFixed(1)})">
          <circle r="8" fill="#c1a15a" stroke="#6d1216" stroke-width="2.5"/>
          <text y="-13" class="hq-label">Our shop</text>
        </g>
        <g id="you-west" class="you-pin" style="display:none">
          <circle class="pulse" r="11" fill="#1d6b3a"/>
          <circle r="6.5" fill="#22a35a" stroke="#fff" stroke-width="2.5"/>
          <text y="-15" class="you-label">You</text>
        </g>
      </svg>
    </div>

    <aside class="areamap-side">
      <div class="areamap-status" id="areamap-status" role="status" aria-live="polite">
        <span class="dot" aria-hidden="true"></span>
        <span class="msg">Locating you on the map…</span>
      </div>
      <div class="areamap-inset">
        <div class="inset-head"><span>Cle Elum &amp; Suncadia</span><span class="inset-dist">≈ 85 mi east ↗</span></div>
        <svg viewBox="0 0 ${east.w} ${east.h}" role="img" aria-label="Cle Elum service-area boundary">
          <rect width="${east.w}" height="${east.h}" fill="#eae0cd"/>
          ${eastSlugs.map(eastCity).join("")}
          <g id="you-east" class="you-pin" style="display:none">
            <circle class="pulse" r="9" fill="#1d6b3a"/>
            <circle r="5.5" fill="#22a35a" stroke="#fff" stroke-width="2"/>
          </g>
        </svg>
        <p class="inset-note">Across the pass in Kittitas County — custom homes &amp; cabins.</p>
      </div>
      <ul class="areamap-legend">
        <li><span class="k hq"></span> Our shop (Renton)</li>
        <li><span class="k city"></span> City limits we serve</li>
        <li><span class="k you"></span> Your location</li>
      </ul>
    </aside>
  </div>
</div>`;
}
