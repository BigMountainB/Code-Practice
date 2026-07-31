import { pageHero, breadcrumbSchema } from "../lib/templates.mjs";

export default function () {
  const trail = [
    { label: "Home", href: "/" },
    { label: "Brand", href: "/brand/" },
  ];

  const concept = (n, title, file, desc, note) => `
  <div class="card" data-reveal>
    <span class="eyebrow">Concept ${n}</span>
    <h3 style="margin-top:.5rem">${title}</h3>
    <div style="background:var(--cream);border-radius:var(--radius);padding:2rem;margin:1.2rem 0;display:grid;place-items:center;min-height:220px">
      <img src="/assets/logos/${file}" alt="${title} — Davis Plumbing logo concept" style="max-height:220px;width:auto">
    </div>
    <p class="text-muted">${desc}</p>
    <p style="margin-top:.8rem;font-size:.85rem"><strong>Best for:</strong> ${note}</p>
  </div>`;

  const swatch = (name, hex, sub) => `
  <div style="text-align:center">
    <div style="height:96px;border-radius:var(--radius);background:${hex};border:1px solid var(--line)"></div>
    <p style="margin-top:.6rem;font-weight:600">${name}</p>
    <p class="text-muted" style="font-size:.82rem">${hex} · ${sub}</p>
  </div>`;

  const content = `
${pageHero({
  eyebrow: "Brand Identity",
  title: "The Davis Plumbing mark.",
  lead: "A timeless identity rooted in family heritage and the plumbing trade — heraldic styling, copper and brass, and a cross woven naturally into the form. Three concepts, one family.",
  image: "/assets/img/hero/craftsmanship.jpg",
  imageAlt: "Davis Plumbing brand identity",
  trail,
})}

<section class="section">
  <div class="container">
    <div class="section-head center">
      <span class="eyebrow center">Three Concepts</span>
      <h2>One family, three expressions.</h2>
      <p>Each concept combines the Davis family heritage with the craftsmanship of the trade — a modern take on the traditional coat of arms.</p>
    </div>
    <div class="grid grid-3">
      ${concept(1, "The Family Crest", "davis-plumbing-crest.svg", "A modernized heraldic shield with a copper riser and valve forming a subtle cross, brass border, and a wordmark banner. The fullest expression of the family's heritage.", "Website, letterhead, signage, framed shop print.")}
      ${concept(2, "The Mark", "davis-plumbing-mark.svg", "A clean shield monogram — a serif “D” with a copper riser — stripped to its essentials. Reads clearly at any size.", "Truck wraps, hats, embroidery, social avatars, favicons.")}
      ${concept(3, "Heraldic Luxury", "davis-plumbing-luxury.svg", "A refined slim emblem paired with an elegant serif wordmark and fine gold rules — positioned like a luxury custom-home builder.", "Proposals, premium print, high-end marketing.")}
    </div>
  </div>
</section>

<section class="section bg-cream">
  <div class="container">
    <div class="section-head center">
      <span class="eyebrow center">Logo Suite</span>
      <h2>Every layout you'll need.</h2>
      <p>Delivered as scalable SVG, with monochrome versions for embroidery, engraving, and one-color print.</p>
    </div>
    <div class="grid grid-2">
      <div class="card" style="display:grid;place-items:center;padding:2.5rem"><img src="/assets/logos/davis-plumbing-horizontal.svg" alt="Horizontal lockup" style="max-height:130px"></div>
      <div class="card" style="display:grid;place-items:center;padding:2.5rem"><img src="/assets/logos/davis-plumbing-stacked.svg" alt="Stacked lockup" style="max-height:220px"></div>
      <div class="card bg-ink" style="display:grid;place-items:center;padding:2.5rem;color:var(--cream)"><img src="/assets/logos/davis-plumbing-crest-mono.svg" alt="Crest, monochrome reversed" style="max-height:200px;color:var(--cream)"></div>
      <div class="card" style="display:grid;place-items:center;padding:2.5rem;color:var(--ink)"><img src="/assets/logos/davis-plumbing-mark-mono.svg" alt="Mark, monochrome" style="max-height:180px"></div>
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="section-head center">
      <span class="eyebrow center">Color</span>
      <h2>A heritage palette.</h2>
      <p>Heraldic crimson and white, warmed by copper and brass — the materials of the trade.</p>
    </div>
    <div class="grid grid-4" style="max-width:900px;margin-inline:auto">
      ${swatch("Heraldic Crimson", "#8f1d21", "PMS 1817 C")}
      ${swatch("Copper", "#a5673b", "PMS 1535 C")}
      ${swatch("Brass / Gold", "#c1a15a", "PMS 4515 C")}
      ${swatch("Ink", "#16191d", "Rich Black")}
    </div>
    <div class="center" style="margin-top:2.5rem">
      <a class="btn btn-outline" href="/assets/logos/brand-color-palette.svg" target="_blank" rel="noopener">View full palette sheet</a>
    </div>
  </div>
</section>

<section class="section bg-cream">
  <div class="container">
    <div class="section-head center">
      <span class="eyebrow center">Typography</span>
      <h2>Fraunces &amp; Inter.</h2>
    </div>
    <div class="grid grid-2" style="max-width:900px;margin-inline:auto">
      <div class="card">
        <p class="text-muted" style="letter-spacing:.2em;text-transform:uppercase;font-size:.75rem">Display · Fraunces</p>
        <p style="font-family:var(--font-display);font-size:3rem;line-height:1.1;margin-top:.5rem">Craftsmanship &amp; Family</p>
      </div>
      <div class="card">
        <p class="text-muted" style="letter-spacing:.2em;text-transform:uppercase;font-size:.75rem">Body · Inter</p>
        <p style="font-size:1.05rem;line-height:1.7;margin-top:.5rem">Built on decades of skill and strong family values, Davis Plumbing brings exceptional workmanship to every home and business it serves.</p>
      </div>
    </div>
  </div>
</section>
`;

  return {
    slug: "brand",
    title: "Brand Identity & Logo Concepts | Davis Plumbing",
    description:
      "The Davis Plumbing brand identity — three heraldic logo concepts, full logo suite, color palette, and typography inspired by the Davis family heritage and the plumbing trade.",
    content,
    head: breadcrumbSchema(trail),
  };
}
