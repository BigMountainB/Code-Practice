import {
  icon,
  cta,
  ctaBand,
  pageHero,
  photo,
  breadcrumbSchema,
} from "../lib/templates.mjs";
import { services } from "../data/site.mjs";

export default function () {
  const trail = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services/" },
  ];

  const rows = services
    .map((s, i) => {
      const reverse = i % 2 === 1 ? " reverse" : "";
      return `<div class="split${reverse}" style="margin-bottom:var(--space-xl)" data-reveal>
      <div class="feature-media wide">
        ${photo(`/assets/img/services/${s.slug}.jpg`, `${s.title} by Davis Plumbing`)}
      </div>
      <div>
        <div class="icon" style="width:48px;height:48px;color:var(--red);margin-bottom:1rem">${icon(s.icon)}</div>
        <h2>${s.title}</h2>
        <p class="lead" style="margin-top:1rem">${s.summary}</p>
        <ul class="check-list" style="margin-top:1.4rem;columns:2;column-gap:2rem">
          ${s.highlights.map((h) => `<li>${h}</li>`).join("")}
        </ul>
        <a class="btn btn-outline" href="/services/${s.slug}/" style="margin-top:1.6rem">${s.title} details</a>
      </div>
    </div>`;
    })
    .join("");

  const content = `
${pageHero({
  eyebrow: "Our Services",
  title: "Full-service plumbing, done to a higher standard.",
  lead: "From everyday repairs to ground-up custom homes, Davis Plumbing delivers craftsmanship you can trust — residential and commercial, across the greater Seattle area.",
  image: "/assets/img/services/services-hero.jpg",
  imageAlt: "Davis Plumbing craftsman installing a designer fixture",
  trail,
})}

<section class="section">
  <div class="container">
    ${rows}
  </div>
</section>

${ctaBand()}
`;

  return {
    slug: "services",
    title: "Plumbing Services | Residential, Commercial, Remodels & New Construction",
    description:
      "Davis Plumbing offers residential and commercial plumbing, kitchen & bath remodels, and new-construction plumbing across Renton, Kent, Bellevue, Seattle and the greater Seattle area.",
    content,
    head: breadcrumbSchema(trail),
  };
}
