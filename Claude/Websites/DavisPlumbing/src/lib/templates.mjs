import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { business, site, nav, cta } from "../data/site.mjs";
import { icon } from "./icons.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");

/**
 * Resolve a photographic src at build time. If the real file exists on disk it
 * is used; otherwise an on-brand SVG placeholder (see scripts/placeholders.mjs)
 * is substituted. Drop real photos at the expected path and rebuild — the
 * references switch automatically. `kind` picks the placeholder shape when the
 * path isn't a service/gallery photo: hero | portrait | wide | tall | square.
 */
export function photoSrc(src, kind = "generic") {
  if (!src) return `/assets/img/placeholders/kind-${kind}.svg`;
  if (existsSync(path.join(ROOT, src.replace(/^\//, "")))) return src;
  let m;
  // Any *-hero image gets the dark hero placeholder (services/areas heroes, etc.)
  if (/-hero\.(?:jpg|webp|png)$/.test(src)) return `/assets/img/placeholders/kind-hero.svg`;
  if ((m = src.match(/\/services\/([a-z0-9-]+)\.(?:jpg|webp|png)$/)))
    return `/assets/img/placeholders/service-${m[1]}.svg`;
  if ((m = src.match(/\/gallery\/([a-z0-9-]+)-\d+\.(?:jpg|webp|png)$/)))
    return `/assets/img/placeholders/gallery-${m[1]}.svg`;
  if (src.includes("/og/")) return `/assets/img/placeholders/og.svg`;
  return `/assets/img/placeholders/kind-${kind}.svg`;
}

export function photo(src, alt, opts = {}) {
  return img(photoSrc(src, opts.kind), alt, opts);
}

/* ---------------------------------------------------------------------------
   Brand logo (inline SVG) — the "primary horizontal" mark. Inlined in the
   header so it paints with first HTML (no request, no layout shift).
   Full logo suite lives in /assets/logos/.
--------------------------------------------------------------------------- */
// The Davis family crest (transparent artwork in /assets/logos/).
export function brandCrest(cls = "") {
  return `<img class="brand-crest${cls ? " " + cls : ""}" src="/assets/logos/crest-160.webp" srcset="/assets/logos/crest-160.webp 1x, /assets/logos/crest-320.webp 2x" alt="Davis Plumbing family crest" width="150" height="160">`;
}

export function brandLogoInline() {
  return `<svg viewBox="0 0 60 64" role="img" aria-label="Davis Plumbing crest" focusable="false">
  <defs>
    <linearGradient id="hb" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#a5282d"/><stop offset="1" stop-color="#6d1216"/>
    </linearGradient>
  </defs>
  <path d="M30 2 4 9v22c0 16 12 26 26 31 14-5 26-15 26-31V9L30 2Z" fill="url(#hb)"/>
  <path d="M30 2 4 9v22c0 16 12 26 26 31 14-5 26-15 26-31V9L30 2Z" fill="none" stroke="#c1a15a" stroke-width="1.4"/>
  <path d="M30 7 9 12.5V31c0 13.6 10.2 22.4 21 26.8 10.8-4.4 21-13.2 21-26.8V12.5L30 7Z" fill="none" stroke="#d8be86" stroke-width="0.7" opacity="0.6"/>
  <path d="M30 13v20M22 20h16" stroke="#f2e6c9" stroke-width="2.2" stroke-linecap="round"/>
  <circle cx="30" cy="40" r="3.1" fill="none" stroke="#f2e6c9" stroke-width="2"/>
  <path d="M30 40v6" stroke="#f2e6c9" stroke-width="2.2" stroke-linecap="round"/>
</svg>`;
}

/* ---------------------------------------------------------------------------
   SEO helpers
--------------------------------------------------------------------------- */
export function abs(path) {
  if (!path) return site.url + "/";
  if (path.startsWith("http")) return path;
  return site.url + path;
}

function jsonld(obj) {
  return `<script type="application/ld+json">${JSON.stringify(obj)}</script>`;
}

export function organizationSchema() {
  return jsonld({
    "@context": "https://schema.org",
    "@type": "Organization",
    name: business.legalName,
    alternateName: business.name,
    url: site.url,
    logo: abs("/assets/logos/davis-plumbing-crest.svg"),
    telephone: business.phoneRaw,
    foundingDate: String(business.foundedYear),
    founder: { "@type": "Person", name: business.ownerName },
    address: {
      "@type": "PostalAddress",
      streetAddress: business.address.street,
      addressLocality: business.address.city,
      addressRegion: business.address.region,
      postalCode: business.address.postalCode,
      addressCountry: business.address.country,
    },
    sameAs: Object.values(business.social).filter(Boolean),
  });
}

export function localBusinessSchema({ areaServed = [], id = site.url + "/#business" } = {}) {
  return jsonld({
    "@context": "https://schema.org",
    "@type": "Plumber",
    "@id": id,
    name: business.legalName,
    image: abs("/assets/img/og/davis-plumbing-og.png"),
    logo: abs("/assets/logos/davis-plumbing-crest.svg"),
    url: site.url,
    telephone: business.phoneRaw,
    priceRange: business.priceRange,
    foundingDate: String(business.foundedYear),
    address: {
      "@type": "PostalAddress",
      streetAddress: business.address.street,
      addressLocality: business.address.city,
      addressRegion: business.address.region,
      postalCode: business.address.postalCode,
      addressCountry: business.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: business.geo.lat,
      longitude: business.geo.lng,
    },
    openingHoursSpecification: business.openingHours.map((o) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: o.day,
      opens: o.opens,
      closes: o.closes,
    })),
    areaServed: areaServed.map((a) => ({ "@type": "City", name: a })),
    sameAs: Object.values(business.social).filter(Boolean),
  });
}

export function breadcrumbSchema(trail) {
  return jsonld({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: t.label,
      item: abs(t.href),
    })),
  });
}

export function serviceSchema({ name, description, areaServed = [] }) {
  return jsonld({
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: name,
    provider: {
      "@type": "Plumber",
      name: business.legalName,
      telephone: business.phoneRaw,
    },
    areaServed: areaServed.map((a) => ({ "@type": "City", name: a })),
    description,
  });
}

export function faqSchema(faqs) {
  return jsonld({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  });
}

/* ---------------------------------------------------------------------------
   Header + Footer
--------------------------------------------------------------------------- */
function navMarkup(currentPath) {
  return nav
    .map((item) => {
      const isCurrent =
        item.href === "/"
          ? currentPath === "/"
          : currentPath.startsWith(item.href);
      const cls = [item.children ? "has-children" : "", isCurrent ? "current" : ""]
        .filter(Boolean)
        .join(" ");
      const dropdown = item.children
        ? `<ul class="dropdown">${item.children
            .map((c) => `<li><a href="${c.href}">${c.label}</a></li>`)
            .join("")}</ul>`
        : "";
      return `<li${cls ? ` class="${cls}"` : ""}><a href="${item.href}">${item.label}</a>${dropdown}</li>`;
    })
    .join("");
}

export function header(currentPath) {
  return `<header class="site-header" id="site-header" data-transparent>
  <div class="container-wide">
    <a class="brand" href="/" aria-label="${business.name} — home">
      ${brandCrest()}
      <span class="brand-text">
        <span class="name">Davis Plumbing</span>
        <span class="sub">Est. ${business.foundedYear} · Renton, WA</span>
      </span>
    </a>
    <nav class="primary-nav" aria-label="Primary">
      <ul class="nav-links">${navMarkup(currentPath)}</ul>
      <a class="btn" href="${cta.href}">${cta.label}</a>
    </nav>
    <div class="header-actions">
      <a class="header-phone" href="tel:${business.phoneRaw}">${icon("phone")}<span>${business.phone}</span></a>
      <button class="nav-toggle" id="nav-toggle" aria-label="Open menu" aria-expanded="false" aria-controls="site-header">
        <span></span><span></span><span></span>
      </button>
    </div>
  </div>
</header>`;
}

export function footer() {
  const year = 2026;
  const col = (title, links) =>
    `<div class="footer-col"><h4>${title}</h4><ul>${links
      .map((l) => `<li><a href="${l.href}">${l.label}</a></li>`)
      .join("")}</ul></div>`;

  return `<footer class="site-footer">
  <div class="container-wide">
    <div class="footer-top">
      <div class="footer-brand">
        <a class="brand" href="/" aria-label="${business.name}">
          ${brandCrest("footer-crest")}
          <span class="brand-text"><span class="name">Davis Plumbing</span><span class="sub">Est. ${business.foundedYear}</span></span>
        </a>
        <p>${business.shortPitch}</p>
        <div class="chip-grid" style="margin-top:1.4rem">
          <span class="chip" style="background:transparent;border-color:var(--line-dark);color:var(--stone-light)">${business.license.label}</span>
        </div>
      </div>
      ${col("Services", [
        { label: "Residential Plumbing", href: "/services/residential-plumbing/" },
        { label: "Commercial Plumbing", href: "/services/commercial-plumbing/" },
        { label: "Kitchen & Bath Remodels", href: "/services/remodels/" },
        { label: "New Construction", href: "/services/new-construction/" },
      ])}
      ${col("Company", [
        { label: "About Us", href: "/about/" },
        { label: "Project Gallery", href: "/gallery/" },
        { label: "Service Areas", href: "/service-areas/" },
        { label: "Reviews", href: "/reviews/" },
        { label: "Contact", href: "/contact/" },
      ])}
      <div class="footer-col">
        <h4>Get in touch</h4>
        <ul class="footer-contact">
          <li>${icon("phone")}<a href="tel:${business.phoneRaw}">${business.phone}</a></li>
          <li>${icon("mail")}<a href="mailto:${business.email}">${business.email}</a></li>
          <li>${icon("pin")}<span>${business.address.street}<br>${business.address.city}, ${business.address.region} ${business.address.postalCode}</span></li>
          <li>${icon("clock")}<span>Mon–Fri 7am–5pm<br>Sat by appointment</span></li>
        </ul>
        <a class="btn btn-light" href="${cta.href}" style="margin-top:0.5rem">${cta.label}</a>
      </div>
    </div>
    <div class="footer-bottom">
      <span>© ${year} ${business.legalName}. All rights reserved.</span>
      <span>Family owned &amp; operated · Serving the greater Seattle area since ${business.foundedYear}.</span>
    </div>
  </div>
</footer>`;
}

/* ---------------------------------------------------------------------------
   Full document layout
--------------------------------------------------------------------------- */
export function layout(page) {
  const {
    slug = "",
    title,
    description = site.defaultDescription,
    bodyClass = "",
    currentPath,
    head = "",
    content,
    ogImage = "/assets/img/og/davis-plumbing-og.png",
    ogType = "website",
  } = page;

  const pagePath = currentPath ?? (slug ? `/${slug}/` : "/");
  const fullTitle = title.includes("Davis Plumbing") ? title : title + site.titleSuffix;
  const canonical = abs(pagePath);
  const ogResolved = photoSrc(ogImage, "og");

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${fullTitle}</title>
<meta name="description" content="${escapeAttr(description)}">
<link rel="canonical" href="${canonical}">
<meta name="theme-color" content="${site.themeColor}">
<meta name="format-detection" content="telephone=no">
<meta name="author" content="${business.legalName}">
<meta name="robots" content="index, follow, max-image-preview:large">

<!-- Open Graph -->
<meta property="og:type" content="${ogType}">
<meta property="og:site_name" content="${business.name}">
<meta property="og:title" content="${escapeAttr(fullTitle)}">
<meta property="og:description" content="${escapeAttr(description)}">
<meta property="og:url" content="${canonical}">
<meta property="og:image" content="${abs(ogResolved)}">
<meta property="og:locale" content="${site.locale}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${escapeAttr(fullTitle)}">
<meta name="twitter:description" content="${escapeAttr(description)}">
<meta name="twitter:image" content="${abs(ogResolved)}">

<!-- Icons & manifest -->
<link rel="icon" href="/assets/logos/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/assets/logos/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">

<!-- Fonts: preload the two variable files we self-host -->
<link rel="preload" href="/assets/fonts/fraunces-var.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/assets/fonts/inter-var.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="/assets/css/styles.css">

${organizationSchema()}
${head}
</head>
<body class="${bodyClass}">
<a class="skip-link" href="#main">Skip to content</a>
${header(pagePath)}
<main id="main">
${content}
</main>
${footer()}
<script src="/assets/js/main.js" defer></script>
</body>
</html>`;
}

function escapeAttr(s = "") {
  return String(s).replace(/"/g, "&quot;").replace(/</g, "&lt;");
}

/* ---------------------------------------------------------------------------
   Reusable section components (used across pages)
--------------------------------------------------------------------------- */
export function img(src, alt, { className = "", ratio = "", loading = "lazy", width, height, sizes } = {}) {
  const attrs = [
    `src="${src}"`,
    `alt="${escapeAttr(alt)}"`,
    loading === "eager" ? `fetchpriority="high"` : `loading="lazy"`,
    loading === "eager" ? "" : `decoding="async"`,
    width ? `width="${width}"` : "",
    height ? `height="${height}"` : "",
    sizes ? `sizes="${sizes}"` : "",
    className ? `class="${className}"` : "",
    ratio ? `style="aspect-ratio:${ratio}"` : "",
  ]
    .filter(Boolean)
    .join(" ");
  return `<img ${attrs}>`;
}

export function breadcrumbs(trail) {
  return `<ul class="breadcrumbs">${trail
    .map((t, i) =>
      i === trail.length - 1
        ? `<li aria-current="page">${t.label}</li>`
        : `<li><a href="${t.href}">${t.label}</a></li>`
    )
    .join("")}</ul>`;
}

export function pageHero({ eyebrow, title, lead, image, imageAlt, trail }) {
  return `<section class="page-hero">
  ${image ? `<div class="page-hero-media">${photo(image, imageAlt || title, { loading: "eager", kind: "hero" })}</div>` : ""}
  <div class="container">
    ${trail ? breadcrumbs(trail) : ""}
    ${eyebrow ? `<span class="eyebrow">${eyebrow}</span>` : ""}
    <h1>${title}</h1>
    ${lead ? `<p class="lead">${lead}</p>` : ""}
  </div>
</section>`;
}

export function ctaBand({
  title = "Let's build something that lasts.",
  text = "Tell us about your project. We'll give you an honest assessment and a fair estimate — no pressure, no gimmicks.",
  primary = cta,
  secondary = { label: business.phone, href: `tel:${business.phoneRaw}` },
} = {}) {
  return `<section class="section cta-band bg-red">
  <img class="crest-watermark" src="/assets/logos/crest-900.webp" alt="" aria-hidden="true" loading="lazy">
  <div class="container" data-reveal>
    <span class="eyebrow center" style="color:var(--brass-light)">Request an Estimate</span>
    <h2>${title}</h2>
    <p>${text}</p>
    <div class="actions">
      <a class="btn btn-light btn-lg" href="${primary.href}">${primary.label}</a>
      <a class="btn btn-ghost btn-lg" href="${secondary.href}" style="color:#fff;border-color:rgba(255,255,255,.6)"><span>${icon("phone")}</span> ${secondary.label}</a>
    </div>
  </div>
</section>`;
}

export function reviewCard(r) {
  const initials = r.author
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("");
  const stars = Array.from({ length: r.rating }, () => icon("star")).join("");
  return `<figure class="review-card" data-reveal>
  <div class="stars" aria-label="${r.rating} out of 5 stars">${stars}</div>
  <blockquote>“${r.quote}”</blockquote>
  <figcaption class="attr">
    <span class="avatar" aria-hidden="true">${initials}</span>
    <span>
      <span class="who">${r.author}</span><br>
      <span class="where">${r.location}${r.source ? ` · via ${r.source}` : ""}</span>
    </span>
  </figcaption>
</figure>`;
}

export function serviceCard(s) {
  return `<article class="service-card" data-reveal>
  <a href="/services/${s.slug}/" class="media" aria-label="${s.title}">
    ${photo(`/assets/img/services/${s.slug}.jpg`, `${s.title} by Davis Plumbing`, { ratio: "4/3", width: 600, height: 450 })}
  </a>
  <div class="body">
    <h3>${s.title}</h3>
    <p>${s.short}</p>
    <a class="link-arrow" href="/services/${s.slug}/">Explore ${s.title.toLowerCase()} ${icon("arrow")}</a>
  </div>
</article>`;
}

export function faqList(faqs) {
  return `<div class="faq">${faqs
    .map(
      (f) => `<div class="faq-item">
    <button class="faq-q" aria-expanded="false">${f.q}<span class="pm" aria-hidden="true"></span></button>
    <div class="faq-a"><div class="faq-a-inner">${f.a}</div></div>
  </div>`
    )
    .join("")}</div>`;
}

export { business, site, nav, cta, icon };
