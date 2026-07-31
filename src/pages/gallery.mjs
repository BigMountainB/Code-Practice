import {
  icon,
  photo,
  photoSrc,
  ctaBand,
  pageHero,
  breadcrumbSchema,
} from "../lib/templates.mjs";
import { galleryCategories, galleryItems } from "../data/site.mjs";

export default function () {
  const trail = [
    { label: "Home", href: "/" },
    { label: "Gallery", href: "/gallery/" },
  ];

  const filters =
    `<button class="active" data-filter="all">All Work</button>` +
    galleryCategories
      .map((c) => `<button data-filter="${c.slug}">${c.label}</button>`)
      .join("");

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

  // Before/after sets (placeholder pairs until real photos are added).
  const baSets = [
    { before: "/assets/img/gallery/ba-bath-before.jpg", after: "/assets/img/gallery/ba-bath-after.jpg", label: "Primary Bath Remodel — Issaquah" },
    { before: "/assets/img/gallery/ba-kitchen-before.jpg", after: "/assets/img/gallery/ba-kitchen-after.jpg", label: "Kitchen Remodel — Bellevue" },
  ];
  const baMarkup = baSets
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
${pageHero({
  eyebrow: "Project Gallery",
  title: "Decades of craftsmanship, one project at a time.",
  lead: "Kitchens, baths, custom homes, commercial builds, and the clean rough-in work behind it all. Explore the workmanship that's earned Davis Plumbing its reputation.",
  image: "/assets/img/gallery/gallery-hero.jpg",
  imageAlt: "A gallery of Davis Plumbing custom-home and remodel projects",
  trail,
})}

<section class="section">
  <div class="container-wide">
    <div class="gallery-filters" role="tablist" aria-label="Filter gallery by category">
      ${filters}
    </div>
    <div class="masonry" id="masonry">
      ${tiles}
    </div>
  </div>
</section>

<section class="section bg-cream">
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
</section>

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
    title: "Project Gallery | Kitchens, Baths, Custom Homes & Commercial",
    description:
      "Browse Davis Plumbing's project gallery — custom-home rough-ins, luxury kitchen and bath remodels, fixture installations, and commercial work across the greater Seattle area.",
    content,
    head: breadcrumbSchema(trail),
  };
}
