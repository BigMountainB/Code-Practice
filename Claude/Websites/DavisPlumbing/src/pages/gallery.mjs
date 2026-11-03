import {
  icon,
  photo,
  photoSrc,
  ctaBand,
  breadcrumbSchema,
} from "../lib/templates.mjs";
import { galleryCategories, galleryItems } from "../data/site.mjs";

const catLabel = (slug) =>
  (galleryCategories.find((c) => c.slug === slug) || {}).label || "Our Work";

export default function () {
  const trail = [
    { label: "Home", href: "/" },
    { label: "Gallery", href: "/gallery/" },
  ];

  /* ---- Full-screen slideshow (hero) ---- */
  const slides = galleryItems
    .map((item, i) => {
      const src = photoSrc(item.src);
      return `<figure class="slide${i === 0 ? " active" : ""}" data-cat="${catLabel(item.category)}" data-title="${item.alt.replace(/"/g, "&quot;")}">
      <img src="${src}" alt="${item.alt.replace(/"/g, "&quot;")}" ${i === 0 ? 'fetchpriority="high"' : 'loading="lazy" decoding="async"'}>
    </figure>`;
    })
    .join("");
  const dots = galleryItems
    .map((_, i) => `<button class="${i === 0 ? "active" : ""}" aria-label="Go to slide ${i + 1}"></button>`)
    .join("");
  const thumbs = galleryItems
    .map((item, i) => `<button class="${i === 0 ? "active" : ""}" aria-label="${item.alt.replace(/"/g, "&quot;")}"><img src="${photoSrc(item.src)}" alt="" loading="lazy"></button>`)
    .join("");

  /* ---- Masonry tiles ---- */
  const tiles = galleryItems
    .map((item, i) => {
      const src = photoSrc(item.src);
      return `<figure class="tile" data-cat="${item.category}" data-index="${i}" data-full="${src}" data-caption="${item.alt.replace(/"/g, "&quot;")}" tabindex="0" role="button" aria-label="View: ${item.alt.replace(/"/g, "&quot;")}">
      <img src="${src}" alt="${item.alt.replace(/"/g, "&quot;")}" loading="lazy" decoding="async">
      <span class="zoom" aria-hidden="true">${icon("zoom")}</span>
      <figcaption class="cap">${item.alt}</figcaption>
    </figure>`;
    })
    .join("");

  const filters =
    `<button class="active" data-filter="all">All Work</button>` +
    galleryCategories
      .filter((c) => galleryItems.some((item) => item.category === c.slug))
      .map((c) => `<button data-filter="${c.slug}">${c.label}</button>`).join("");

  /* ---- Before / after ---- */
  const baSets = [
    { before: "/assets/img/gallery/ba-bath-before.jpg", after: "/assets/img/gallery/ba-bath-after.jpg", label: "Primary Bath Remodel — Issaquah" },
    { before: "/assets/img/gallery/ba-kitchen-before.jpg", after: "/assets/img/gallery/ba-kitchen-after.jpg", label: "Kitchen Remodel — Bellevue" },
  ];
  // Only show pairs whose real before AND after photos exist.
  const baReady = baSets.filter((b) => photoSrc(b.before) === b.before && photoSrc(b.after) === b.after);
  const baMarkup = baReady
    .map(
      (b, i) => `<div data-reveal data-reveal-delay="${i}">
    <div class="ba" data-ba>
      ${photo(b.before, `${b.label} — before`, { kind: "wide", className: "before" })}
      ${photo(b.after, `${b.label} — after`, { kind: "wide", className: "after" })}
      <span class="tag b">Before</span><span class="tag a">After</span>
      <span class="handle"></span>
      <input type="range" min="0" max="100" value="50" aria-label="Drag to compare before and after: ${b.label}">
    </div>
    <p class="text-muted" style="margin-top:.9rem;font-weight:600">${b.label}</p>
  </div>`
    )
    .join("");

  const content = `
<section class="slideshow" id="slideshow" aria-roledescription="carousel" aria-label="Davis Plumbing project slideshow">
  <span class="ss-progress" id="ss-progress" aria-hidden="true"></span>
  ${slides}
  <div class="ss-dots" role="tablist" aria-label="Choose slide">${dots}</div>
  <div class="slideshow-inner">
    <div class="container">
      <ul class="breadcrumbs">${trail.map((t, i) => (i === trail.length - 1 ? `<li aria-current="page">${t.label}</li>` : `<li><a href="${t.href}">${t.label}</a></li>`)).join("")}</ul>
    </div>
    <div class="container slide-caption">
      <span class="eyebrow" id="ss-cat">Our Work</span>
      <h2 id="ss-title">Decades of craftsmanship.</h2>
    </div>
  </div>
  <div class="slideshow-ui">
    <div class="container">
      <span class="ss-counter"><span id="ss-current">01</span><span class="sep">/</span><span class="total">${String(galleryItems.length).padStart(2, "0")}</span></span>
      <div class="ss-controls">
        <button class="ss-btn" id="ss-prev" aria-label="Previous image">${icon("chevronL")}</button>
        <button class="ss-btn" id="ss-play" aria-label="Pause slideshow" data-state="playing">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="7" y="5" width="3.5" height="14" rx="1"/><rect x="13.5" y="5" width="3.5" height="14" rx="1"/></svg>
        </button>
        <button class="ss-btn" id="ss-next" aria-label="Next image">${icon("chevronR")}</button>
      </div>
    </div>
  </div>
</section>

<section class="section-tight bg-ink">
  <div class="container-wide">
    <div class="ss-thumbs" aria-label="Jump to a project">
      ${thumbs}
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="section-head center">
      <span class="eyebrow center">Browse by Category</span>
      <h2>Every project, a promise kept.</h2>
      <p>Filter the work by project type, or tap any image to view it full-size.</p>
    </div>
  </div>
  <div class="container-wide">
    <div class="gallery-filters" role="tablist" aria-label="Filter gallery by category">
      ${filters}
    </div>
    <div class="masonry" id="masonry">
      ${tiles}
    </div>
  </div>
</section>

${baReady.length ? `<section class="section bg-cream">
  <div class="container">
    <div class="section-head center">
      <span class="eyebrow center">Before &amp; After</span>
      <h2>See the transformation.</h2>
      <p>Drag the slider to compare. The best remodels look effortless — the craftsmanship is in what you don't see.</p>
    </div>
    <div class="grid grid-2">
      ${baMarkup}
    </div>
  </div>
</section>` : ""}

${ctaBand({
  title: "Imagine what we could build for you.",
  text: "Every project in this gallery started with a conversation. Let's start yours.",
})}

<!-- Lightbox -->
<div class="lightbox" id="lightbox" role="dialog" aria-modal="true" aria-label="Image viewer">
  <button class="lb-close" aria-label="Close">${icon("close")}</button>
  <button class="lb-nav prev" aria-label="Previous image">${icon("chevronL")}</button>
  <figure>
    <img id="lb-img" src="" alt="">
    <figcaption id="lb-cap"></figcaption>
  </figure>
  <button class="lb-nav next" aria-label="Next image">${icon("chevronR")}</button>
</div>
`;

  return {
    slug: "gallery",
    title: "Gallery | Our Work — Kitchens, Baths, Custom Homes & Commercial",
    description:
      "See Davis Plumbing's work — a full-screen slideshow and gallery of custom-home rough-ins, luxury kitchen and bath remodels, fixture installations, and commercial projects across the greater Seattle area.",
    content,
    head: breadcrumbSchema(trail),
  };
}
