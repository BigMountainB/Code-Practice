# Adding the real project photos

The site is fully built and looks finished using **on-brand SVG placeholders**.
Every placeholder is swapped for a real photo automatically the moment a file
exists at the expected path — **no code changes, no data edits**. Just drop the
image in, keep the filename, and run `npm run build`.

## How the swap works

At build time, `photoSrc()` (in `src/lib/templates.mjs`) checks whether the real
file exists on disk. If it does, it's used. If not, a themed placeholder is
substituted. So the workflow is simply:

1. Save your photo at the exact path listed below (same name, `.jpg` or `.webp`).
2. Run `npm run build`.
3. The page now shows your photo, with the SEO alt text already written.

> **Tip — image quality:** export web-optimized JP/WebP. Heroes ~2000px wide,
> gallery ~1400px, portraits ~1200px. Keep files under ~300 KB where possible
> (the site is tuned for fast Core Web Vitals). Then re-run the build.

## Folder map

- `hero/`, `home/` — full-width hero photography (dark, cinematic works best)
- `about/` — owner portrait, family/crew, workshop
- `services/` — one card image + one hero per service
- `areas/` — one card image + one hero per city
- `gallery/` — categorized project photos + before/after pairs
- `reviews/`, `contact/`, `estimate/` — supporting hero images
- `og/` — 1200×630 social-share card (a branded placeholder PNG is already here)

## Every photo slot the site expects

Filenames map to alt text and categories already defined in
`src/data/site.mjs` and `src/data/areas.mjs`. Replace any of these:

- `assets/img/about/about-hero.jpg`
- `assets/img/about/ernie-davis.jpg`
- `assets/img/about/family-craftsmanship.jpg`
- `assets/img/areas/areas-hero.jpg`
- `assets/img/areas/bellevue-hero.jpg`
- `assets/img/areas/bellevue.jpg`
- `assets/img/areas/cle-elum-hero.jpg`
- `assets/img/areas/cle-elum.jpg`
- `assets/img/areas/issaquah-hero.jpg`
- `assets/img/areas/issaquah.jpg`
- `assets/img/areas/kent-hero.jpg`
- `assets/img/areas/kent.jpg`
- `assets/img/areas/mercer-island-hero.jpg`
- `assets/img/areas/mercer-island.jpg`
- `assets/img/areas/renton-hero.jpg`
- `assets/img/areas/renton.jpg`
- `assets/img/areas/sammamish-hero.jpg`
- `assets/img/areas/sammamish.jpg`
- `assets/img/areas/seattle-hero.jpg`
- `assets/img/areas/seattle.jpg`
- `assets/img/contact/contact-hero.jpg`
- `assets/img/estimate/estimate-hero.jpg`
- `assets/img/gallery/ba-bath-after.jpg`
- `assets/img/gallery/ba-bath-before.jpg`
- `assets/img/gallery/ba-kitchen-after.jpg`
- `assets/img/gallery/ba-kitchen-before.jpg`
- `assets/img/gallery/bathrooms-1.jpg`
- `assets/img/gallery/bathrooms-2.jpg`
- `assets/img/gallery/bathrooms-3.jpg`
- `assets/img/gallery/commercial-1.jpg`
- `assets/img/gallery/commercial-2.jpg`
- `assets/img/gallery/commercial-3.jpg`
- `assets/img/gallery/custom-homes-1.jpg`
- `assets/img/gallery/custom-homes-2.jpg`
- `assets/img/gallery/custom-homes-3.jpg`
- `assets/img/gallery/fixtures-1.jpg`
- `assets/img/gallery/fixtures-2.jpg`
- `assets/img/gallery/fixtures-3.jpg`
- `assets/img/gallery/gallery-hero.jpg`
- `assets/img/gallery/kitchens-1.jpg`
- `assets/img/gallery/kitchens-2.jpg`
- `assets/img/gallery/kitchens-3.jpg`
- `assets/img/gallery/remodels-1.jpg`
- `assets/img/gallery/remodels-2.jpg`
- `assets/img/gallery/remodels-3.jpg`
- `assets/img/gallery/rough-in-1.jpg`
- `assets/img/gallery/rough-in-2.jpg`
- `assets/img/gallery/rough-in-3.jpg`
- `assets/img/gallery/specialty-1.jpg`
- `assets/img/gallery/specialty-2.jpg`
- `assets/img/gallery/specialty-3.jpg`
- `assets/img/hero/craftsmanship.jpg`
- `assets/img/home/home-hero.jpg`
- `assets/img/reviews/reviews-hero.jpg`
- `assets/img/services/commercial-plumbing-hero.jpg`
- `assets/img/services/commercial-plumbing.jpg`
- `assets/img/services/new-construction-hero.jpg`
- `assets/img/services/new-construction.jpg`
- `assets/img/services/remodels-hero.jpg`
- `assets/img/services/remodels.jpg`
- `assets/img/services/residential-plumbing-hero.jpg`
- `assets/img/services/residential-plumbing.jpg`
- `assets/img/services/services-hero.jpg`
## Gallery: adding more photos or categories

Gallery images are defined in `src/data/site.mjs` → `galleryItems` /
`galleryCategories`. To add photos, add entries there (with alt text) and drop
the files in `gallery/`. To add a whole new category, add it to
`galleryCategories` and the filter button + masonry tiles generate themselves.

## Before / after pairs

Defined in `src/pages/gallery.mjs` (`baSets`). Supply matching `-before` /
`-after` files at the same resolution for a clean slider.
