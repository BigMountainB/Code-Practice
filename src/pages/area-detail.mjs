import {
  business,
  icon,
  photo,
  ctaBand,
  pageHero,
  reviewCard,
  faqList,
  faqSchema,
  localBusinessSchema,
  serviceSchema,
  breadcrumbSchema,
} from "../lib/templates.mjs";
import { services, reviews } from "../data/site.mjs";
import { areas } from "../data/areas.mjs";

export default function () {
  return areas.map((a, idx) => {
    const trail = [
      { label: "Home", href: "/" },
      { label: "Service Areas", href: "/service-areas/" },
      { label: a.city, href: `/service-areas/${a.slug}/` },
    ];

    // Unique-ish local FAQ per city (localized).
    const faqs = [
      {
        q: `Does Davis Plumbing serve ${a.city}?`,
        a: `Yes. ${a.intro} Call ${business.phone} to talk with our team about your ${a.city} project.`,
      },
      {
        q: `What plumbing services do you offer in ${a.city}?`,
        a: `We provide the full range for ${a.city} homeowners and builders: residential repairs and upgrades, kitchen and bath remodels, custom-home and new-construction plumbing, and commercial work.`,
      },
      {
        q: `Are you licensed and insured to work in ${a.city}?`,
        a: `Absolutely. Davis Plumbing is ${business.license.label.toLowerCase()}, and we handle the permitting and inspections your ${a.city} project requires.`,
      },
    ];

    // Rotate a couple of reviews so each city page differs.
    const localReviews = [reviews[idx % reviews.length], reviews[(idx + 2) % reviews.length]];

    const content = `
${pageHero({
  eyebrow: `Plumbing in ${a.city}, Washington`,
  title: a.headline,
  lead: a.intro,
  image: `/assets/img/areas/${a.slug}-hero.jpg`,
  imageAlt: `Davis Plumbing serving ${a.city}, WA`,
  trail,
})}

<section class="section">
  <div class="container">
    <div class="split">
      <div class="prose" data-reveal>
        <span class="eyebrow">Your ${a.city} Plumber</span>
        <h2 style="margin-top:.6rem">Craftsmanship ${a.city} homeowners trust.</h2>
        <p>${a.body}</p>
        <p>${a.localNote}</p>
        <h3>Neighborhoods we serve near ${a.landmark}</h3>
        <div class="chip-grid" style="margin-top:1rem">
          ${a.neighborhoods.map((n) => `<span class="chip">${n}</span>`).join("")}
        </div>
      </div>
      <aside data-reveal data-reveal-delay="1">
        <div class="card" style="position:sticky;top:110px">
          <h3 style="font-size:var(--step-1)">Serving ${a.city} &amp; nearby</h3>
          <ul class="footer-contact" style="margin-top:1.2rem">
            <li style="display:flex;gap:.7rem;margin-bottom:1rem;color:var(--ink-soft)"><span style="color:var(--copper);width:18px">${icon("phone")}</span><a href="tel:${business.phoneRaw}" style="color:var(--red);font-weight:600">${business.phone}</a></li>
            <li style="display:flex;gap:.7rem;margin-bottom:1rem;color:var(--ink-soft)"><span style="color:var(--copper);width:18px">${icon("pin")}</span><span>Based in ${business.address.city}, serving ${a.city}</span></li>
            <li style="display:flex;gap:.7rem;color:var(--ink-soft)"><span style="color:var(--copper);width:18px">${icon("clock")}</span><span>Mon–Fri 7am–5pm · Sat by appt.</span></li>
          </ul>
          <a class="btn" href="/request-an-estimate/" style="width:100%;margin-top:1.5rem">Request an Estimate</a>
        </div>
      </aside>
    </div>
  </div>
</section>

<section class="section bg-cream">
  <div class="container">
    <div class="section-head center">
      <span class="eyebrow center">What We Do in ${a.city}</span>
      <h2>Full-service plumbing, close to home.</h2>
    </div>
    <div class="grid grid-4">
      ${services
        .map(
          (s) => `<a class="card" href="/services/${s.slug}/" data-reveal>
        <div class="icon">${icon(s.icon)}</div>
        <h3 style="font-size:var(--step-1)">${s.title}</h3>
        <p>${s.short}</p>
      </a>`
        )
        .join("")}
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="section-head center">
      <span class="eyebrow center">Nearby &amp; Trusted</span>
      <h2>What customers say.</h2>
    </div>
    <div class="grid grid-2">
      ${localReviews.map((r) => reviewCard(r)).join("")}
    </div>
  </div>
</section>

<section class="section bg-cream">
  <div class="container-narrow">
    <div class="section-head center" style="margin-inline:auto">
      <span class="eyebrow center">${a.city} Plumbing FAQ</span>
      <h2>Good to know.</h2>
    </div>
    ${faqList(faqs)}
  </div>
</section>

${ctaBand({
  title: `Ready to start your ${a.city} project?`,
  text: `From repairs to custom homes, Davis Plumbing brings decades of craftsmanship to ${a.city}. Reach out for an honest estimate.`,
})}
`;

    return {
      path: `/service-areas/${a.slug}/`,
      title: `Plumber in ${a.city}, WA | Davis Plumbing — ${business.phone}`,
      description: a.metaDescription,
      content,
      head:
        breadcrumbSchema(trail) +
        localBusinessSchema({
          areaServed: [a.city, ...a.neighborhoods.slice(0, 4)],
          id: `https://www.davisplumbing.com/service-areas/${a.slug}/#business`,
        }) +
        serviceSchema({
          name: `Plumbing in ${a.city}, WA`,
          description: a.metaDescription,
          areaServed: [a.city],
        }) +
        faqSchema(faqs),
    };
  });
}
