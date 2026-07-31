import {
  icon,
  photo,
  ctaBand,
  pageHero,
  breadcrumbSchema,
} from "../lib/templates.mjs";
import { serviceAreaMap } from "../lib/geomap.mjs";
import { areas, additionalCommunities } from "../data/areas.mjs";

export default function () {
  const trail = [
    { label: "Home", href: "/" },
    { label: "Service Areas", href: "/service-areas/" },
  ];

  const cards = areas
    .map(
      (a, i) => `<a class="service-card" href="/service-areas/${a.slug}/" data-reveal data-reveal-delay="${i % 3}">
    <span class="media">${photo(`/assets/img/areas/${a.slug}.jpg`, `Plumbing in ${a.city}, WA by Davis Plumbing`, { ratio: "4/3" })}</span>
    <span class="body">
      <h3>${a.city}, WA</h3>
      <p>${a.intro.slice(0, 130)}…</p>
      <span class="link-arrow">${a.city} plumbing ${icon("arrow")}</span>
    </span>
  </a>`
    )
    .join("");

  const content = `
${pageHero({
  eyebrow: "Service Areas",
  title: "Serving the greater Seattle area — and proud of it.",
  lead: "From our home in Renton to custom homes across the Eastside and cabins in the Cascades, Davis Plumbing brings the same craftsmanship to every community we serve.",
  image: "/assets/img/areas/areas-hero.jpg",
  imageAlt: "Map of the greater Seattle area served by Davis Plumbing",
  trail,
})}

<section class="section">
  <div class="container">
    <div class="section-head center">
      <span class="eyebrow center">Are We In Your Area?</span>
      <h2>Every city we serve, mapped to its limits.</h2>
      <p>These are the actual jurisdiction boundaries we work within — from the Puget Sound cities to Cle Elum across the pass. We'll try to find you on the map and tell you if you're inside one.</p>
    </div>
    <div data-reveal>
      ${serviceAreaMap()}
    </div>
    <p class="center text-muted" style="margin-top:1rem;font-size:.82rem">City limits are from public US Census boundary data. Your location is detected approximately from your IP address, in your browser — nothing is stored. Near a boundary? <a href="/contact/" style="color:var(--red)">Contact us</a> to confirm we serve your address.</p>
  </div>
</section>

<section class="section bg-cream">
  <div class="container">
    <div class="section-head center">
      <span class="eyebrow center">Cities We Serve</span>
      <h2>Local craftsmanship, wherever you are.</h2>
      <p>Each community is a little different — and we know them. Explore your city for local details.</p>
    </div>
    <div class="grid grid-3">
      ${cards}
    </div>
  </div>
</section>

<section class="section-sm">
  <div class="container center">
    <h3>And the surrounding communities</h3>
    <p class="text-muted" style="max-width:60ch;margin:1rem auto 0">We also serve homeowners and builders throughout the Puget Sound region. Don't see your town? Just ask — chances are we're already nearby.</p>
    <div class="chip-grid" style="justify-content:center;max-width:820px;margin:2rem auto 0">
      ${additionalCommunities.map((c) => `<span class="chip">${c}</span>`).join("")}
    </div>
  </div>
</section>

${ctaBand()}
`;

  return {
    slug: "service-areas",
    title: "Service Areas | Plumbing Across the Greater Seattle Area",
    description:
      "Davis Plumbing serves Renton, Kent, Bellevue, Seattle, Issaquah, Sammamish, Mercer Island, Cle Elum and surrounding communities. Family-owned craftsmanship across the greater Seattle area.",
    content,
    head: breadcrumbSchema(trail),
  };
}
