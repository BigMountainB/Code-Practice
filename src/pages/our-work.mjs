import {
  icon,
  photoSrc,
  cta,
  ctaBand,
  breadcrumbSchema,
} from "../lib/templates.mjs";
import { galleryItems, galleryCategories } from "../data/site.mjs";

const label = (slug) =>
  (galleryCategories.find((c) => c.slug === slug) || {}).label || "Our Work";

export default function () {
  const trail = [
    { label: "Home", href: "/" },
    { label: "Our Work", href: "/our-work/" },
  ];

  const slides = galleryItems
    .map((item, i) => {
      const src = photoSrc(item.src);
      return `<figure class="slide${i === 0 ? " active" : ""}" data-cat="${label(item.category)}" data-title="${item.alt.replace(/"/g, "&quot;")}">
      <img src="${src}" alt="${item.alt.replace(/"/g, "&quot;")}" ${i === 0 ? 'fetchpriority="high"' : 'loading="lazy" decoding="async"'}>
    </figure>`;
    })
    .join("");

  const dots = galleryItems
    .map((_, i) => `<button class="${i === 0 ? "active" : ""}" aria-label="Go to slide ${i + 1}"></button>`)
    .join("");

  const thumbs = galleryItems
    .map((item, i) => {
      const src = photoSrc(item.src);
      return `<button class="${i === 0 ? "active" : ""}" aria-label="${item.alt.replace(/"/g, "&quot;")}"><img src="${src}" alt="" loading="lazy"></button>`;
    })
    .join("");

  const content = `
<section class="slideshow" id="slideshow" aria-roledescription="carousel" aria-label="Davis Plumbing project slideshow">
  <span class="ss-progress" id="ss-progress" aria-hidden="true"></span>
  ${slides}
  <div class="ss-dots" role="tablist" aria-label="Choose slide">${dots}</div>
  <div class="slideshow-inner">
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
      <span class="eyebrow center">The Work Behind the Name</span>
      <h2>Every project is a promise kept.</h2>
      <p>From custom-home rough-ins to luxury kitchen and bath remodels, our work speaks the language of craftsmanship — clean lines, flawless fixtures, and details that last for decades.</p>
    </div>
    <div class="grid grid-4">
      ${galleryCategories
        .map(
          (c, i) => `<div class="value" data-reveal data-reveal-delay="${i % 3}">
        <div class="icon">${icon(["home", "drop", "wrench", "blueprint", "building", "tools", "compass", "award"][i % 8])}</div>
        <h3 style="font-size:var(--step-1)">${c.label}</h3>
      </div>`
        )
        .join("")}
    </div>
  </div>
</section>

${ctaBand({
  title: "Let's add your project to the collection.",
  text: "The work in this slideshow started with a conversation. We'd love to hear about what you're planning.",
})}
`;

  return {
    slug: "our-work",
    title: "Our Work | Davis Plumbing Project Slideshow",
    description:
      "See Davis Plumbing's craftsmanship — a full-screen slideshow of custom-home rough-ins, luxury kitchen and bath remodels, and commercial projects across the greater Seattle area.",
    content,
    head: breadcrumbSchema(trail),
  };
}
