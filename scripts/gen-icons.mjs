/**
 * Generates raster PNG icons from the Davis Plumbing badge — no dependencies.
 * Hand-rasterizes the crest badge into an RGBA buffer and encodes a PNG using
 * Node's built-in zlib. Run once (checked into the repo):
 *
 *   node scripts/gen-icons.mjs
 *
 * Outputs:
 *   assets/logos/apple-touch-icon.png     (180x180)
 *   assets/logos/icon-192.png             (192x192, PWA)
 *   assets/logos/icon-512.png             (512x512, PWA)
 *   assets/img/og/davis-plumbing-og.png   (1200x630 social card)
 */
import { deflateSync } from "node:zlib";
import { writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

/* ---- PNG encoder ---- */
const CRC = (() => {
  const t = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    t[n] = c >>> 0;
  }
  return (buf) => {
    let c = 0xffffffff;
    for (let i = 0; i < buf.length; i++) c = t[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
    return (c ^ 0xffffffff) >>> 0;
  };
})();

function chunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);
  const t = Buffer.from(type, "ascii");
  const body = Buffer.concat([t, data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(CRC(body), 0);
  return Buffer.concat([len, body, crc]);
}

function encodePNG(w, h, rgba) {
  const sig = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(w, 0);
  ihdr.writeUInt32BE(h, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 6; // RGBA
  const raw = Buffer.alloc((w * 4 + 1) * h);
  for (let y = 0; y < h; y++) {
    raw[y * (w * 4 + 1)] = 0; // filter none
    rgba.copy(raw, y * (w * 4 + 1) + 1, y * w * 4, (y + 1) * w * 4);
  }
  const idat = deflateSync(raw, { level: 9 });
  return Buffer.concat([
    sig,
    chunk("IHDR", ihdr),
    chunk("IDAT", idat),
    chunk("IEND", Buffer.alloc(0)),
  ]);
}

/* ---- drawing helpers ---- */
const hex = (h) => [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)];
function mix(a, b, t) {
  return [Math.round(a[0] + (b[0] - a[0]) * t), Math.round(a[1] + (b[1] - a[1]) * t), Math.round(a[2] + (b[2] - a[2]) * t)];
}
function inRoundRect(x, y, x0, y0, x1, y1, r) {
  if (x < x0 || x > x1 || y < y0 || y > y1) return false;
  const cx = Math.min(Math.max(x, x0 + r), x1 - r);
  const cy = Math.min(Math.max(y, y0 + r), y1 - r);
  return (x - cx) ** 2 + (y - cy) ** 2 <= r * r;
}

const RED_T = hex("#a5282d"), RED_B = hex("#6d1216"), BRASS = hex("#d8be86"), CREAM = hex("#f2e6c9");
const INK_T = hex("#1d2126"), INK_B = hex("#10131a");

function drawBadge(S, { rounded = true } = {}) {
  const buf = Buffer.alloc(S * S * 4);
  const s = S / 64; // favicon coordinate scale
  const rad = rounded ? 12 * s : 0;
  const set = (x, y, c, a = 255) => {
    const i = (y * S + x) * 4;
    buf[i] = c[0]; buf[i + 1] = c[1]; buf[i + 2] = c[2]; buf[i + 3] = a;
  };
  for (let y = 0; y < S; y++) {
    for (let x = 0; x < S; x++) {
      if (!inRoundRect(x, y, 0, 0, S - 1, S - 1, rad)) { set(x, y, [0, 0, 0], 0); continue; }
      // red gradient field
      let c = mix(RED_T, RED_B, y / S);
      // brass keyline ring (shield-ish inset rounded rect)
      const inKey = inRoundRect(x, y, 5 * s, 6 * s, (64 - 5) * s, (64 - 4) * s, 9 * s);
      const inKeyIn = inRoundRect(x, y, 7 * s, 8 * s, (64 - 7) * s, (64 - 6) * s, 8 * s);
      if (inKey && !inKeyIn) c = BRASS;
      // plumbing cross (vertical + horizontal bars)
      const vBar = x >= 29.5 * s && x <= 34.5 * s && y >= 18 * s && y <= 48 * s;
      const hBar = x >= 21 * s && x <= 43 * s && y >= 26 * s && y <= 31 * s;
      if (vBar || hBar) c = CREAM;
      // valve ring near base
      const dx = x - 32 * s, dy = y - 44 * s, d = Math.sqrt(dx * dx + dy * dy);
      if (d >= 4.5 * s && d <= 7.5 * s) c = CREAM;
      set(x, y, c);
    }
  }
  return buf;
}

function drawOG(W, H) {
  const buf = Buffer.alloc(W * H * 4);
  const set = (x, y, c, a = 255) => { const i = (y * W + x) * 4; buf[i] = c[0]; buf[i + 1] = c[1]; buf[i + 2] = c[2]; buf[i + 3] = a; };
  const cx = W / 2, cy = H / 2 - 30, s = 3.2;
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      let c = mix(INK_T, INK_B, y / H);
      // subtle diagonal hatch
      if (((x + y) % 46) < 1) c = mix(c, [255, 255, 255], 0.03);
      set(x, y, c);
    }
  }
  // brass shield keyline (ellipse-ish rounded rect) + cross
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const lx = x - cx, ly = y - cy;
      // cross bars
      const vBar = Math.abs(lx) <= 5 * s && ly >= -40 * s && ly <= 40 * s;
      const hBar = Math.abs(lx) <= 24 * s && Math.abs(ly + 4 * s) <= 5 * s;
      if (vBar || hBar) set(x, y, BRASS);
      // valve ring
      const d = Math.sqrt(lx * lx + (ly - 44 * s) ** 2);
      if (d >= 10 * s && d <= 14 * s) set(x, y, BRASS);
      // outer shield keyline (rounded rect ring)
      const inA = inRoundRect(x, y, cx - 70 * s, cy - 78 * s, cx + 70 * s, cy + 86 * s, 30 * s);
      const inB = inRoundRect(x, y, cx - 67 * s, cy - 75 * s, cx + 67 * s, cy + 83 * s, 29 * s);
      if (inA && !inB) set(x, y, BRASS);
    }
  }
  // bottom brass rule
  for (let x = cx - 180; x < cx + 180; x++) for (let y = H - 90; y < H - 88; y++) set(x, y, BRASS, 180);
  return buf;
}

async function main() {
  await mkdir(path.join(ROOT, "assets/img/og"), { recursive: true });
  const jobs = [
    ["assets/logos/apple-touch-icon.png", encodePNG(180, 180, drawBadge(180, { rounded: true }))],
    ["assets/logos/icon-192.png", encodePNG(192, 192, drawBadge(192, { rounded: true }))],
    ["assets/logos/icon-512.png", encodePNG(512, 512, drawBadge(512, { rounded: true }))],
    ["assets/img/og/davis-plumbing-og.png", encodePNG(1200, 630, drawOG(1200, 630))],
  ];
  for (const [rel, png] of jobs) {
    await writeFile(path.join(ROOT, rel), png);
    console.log(`✓ ${rel} (${(png.length / 1024).toFixed(1)} KB)`);
  }
}
main().catch((e) => { console.error(e); process.exit(1); });
