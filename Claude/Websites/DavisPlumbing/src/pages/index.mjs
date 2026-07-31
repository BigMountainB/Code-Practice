import {
  business,
  site,
  cta,
  icon,
  photo,
  ctaBand,
  reviewCard,
  serviceCard,
  localBusinessSchema,
} from "../lib/templates.mjs";
import { services, values, stats, reviews, galleryItems } from "../data/site.mjs";
import { areas } from "../data/areas.mjs";

function heroTrust() {
  return stats
    .slice(0, 3)
    .map((s) => `<div><span class="num">${s.value}</span><span class="cap">${s.label.replace("*", "")}</span></div>`)
    .join("");
}

export default function () {
  const areaChips = areas.map((a) => a.city);

  const content = `
<section class="hero">
  <div class="hero-media">
    ${photo("/assets/img/hero/home-hero.jpg", "A Davis Plumbing craftsman setting fixtures in a luxury custom home", { loading: "eager", kind: "hero" })}
  </div>
  <div class="container">
    <div class="hero-inner">
      <span class="eyebrow">Family Owned · Renton, WA · Since ${business.foundedYear}</span>
      <h1>Plumbing built on craftsmanship, family, and trust.</h1>
      <p class="lead">For decades, homeowners and builders across the greater Seattle area have trusted Davis Plumbing with the work that matters most — from custom homes and remodels to the quiet systems a home depends on.</p>
      <div class="hero-actions">
        <a class="btn btn-lg" href="${cta.href}">${cta.label}</a>
        <a class="btn btn-ghost btn-lg" href="tel:${business.phoneRaw}" style="color:#fff;border-color:rgba(255,255,255,.6)"><span>${icon("phone")}</span> ${business.phone}</a>
      </div>
      <div class="hero-trust">${heroTrust()}</div>
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="split">
      <div data-reveal>
        <span class="eyebrow">Our Story</span>
        <h2>A family name we're proud to put on every job.</h2>
        <p class="lead" style="margin-top:1.2rem">Davis Plumbing was built by ${business.ownerName} on a simple idea: do honest work, treat people right, and let the craftsmanship speak for itself.</p>
        <p class="text-muted" style="margin-top:1rem">More than ${business.ownerExperienceYears} years later, that idea still runs everything we do. We're a family business, and the relationships we've built — with homeowners, designers, and the region's finest builders — are the reason customers keep calling us back, project after project, year after year.</p>
        <ul class="check-list" style="margin-top:1.6rem">
          <li>Trusted with custom homes and high-end remodels</li>
          <li>Clean, code-correct work that lasts for decades</li>
          <li>Straight answers and fair, honest pricing</li>
        </ul>
        <a class="link-arrow" href="/about/" style="margin-top:1.6rem">Read our story ${icon("arrow")}</a>
      </div>
      <div class="feature-media" data-reveal data-reveal-delay="1">
        ${photo("/assets/img/about/family-craftsmanship.jpg", "The Davis family, a multi-generation plumbing company in Renton, Washington", { kind: "portrait" })}
        <div class="badge-float">
          ${icon("award")}
          <span><span class="t">${business.ownerExperienceYears}+ yrs</span><span class="s">Of craftsmanship</span></span>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="section bg-cream">
  <div class="container">
    <div class="section-head center">
      <span class="eyebrow center">What We Do</span>
      <h2>Plumbing for homes and businesses that expect more.</h2>
      <p>From a single fixture to a ground-up custom home, we bring the same care and precision to every project.</p>
    </div>
    <div class="grid grid-4">
      ${services.map((s) => serviceCard(s)).join("")}
    </div>
  </div>
</section>

<section class="section bg-ink">
  <div class="container">
    <div class="split reverse">
      <div class="feature-media wide" data-reveal>
        ${photo("/assets/img/hero/craftsmanship.jpg", "Clean copper and PEX rough-in plumbing by Davis Plumbing in a custom home", { kind: "wide" })}
      </div>
      <div data-reveal data-reveal-delay="1">
        <span class="eyebrow">The Davis Standard</span>
        <h2>The kind of work you trust with a million-dollar home.</h2>
        <p class="lead" style="margin-top:1.2rem;color:rgba(255,255,255,.9)">Behind the walls is where craftsmanship really shows. Builders and homeowners choose us because our rough-in is clean, our fixtures are set flawlessly, and our work passes inspection the first time.</p>
        <p style="margin-top:1rem;color:var(--stone-light)">We treat every home — from a first remodel to a custom estate — with the same respect and attention to detail. That consistency is how a family name becomes a reputation.</p>
        <a class="btn btn-light" href="/gallery/" style="margin-top:1.8rem">View our work</a>
      </div>
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="section-head center">
      <span class="eyebrow center">Why Families &amp; Builders Choose Us</span>
      <h2>Built on values that don't go out of style.</h2>
    </div>
    <div class="grid grid-4">
      ${values
        .map(
          (v, i) => `<div class="value" data-reveal data-reveal-delay="${i % 3}">
        <div class="icon">${icon(v.icon)}</div>
        <h3>${v.title}</h3>
        <p>${v.body}</p>
      </div>`
        )
        .join("")}
    </div>
  </div>
</section>

<section class="section-sm bg-red">
  <div class="container">
    <div class="stats-band">
      ${stats
        .map(
          (s) => `<div class="stat"><span class="num" style="color:#fff">${s.value}</span><span class="lbl" style="color:rgba(255,255,255,.8)">${s.label.replace("*", "")}</span></div>`
        )
        .join("")}
    </div>
  </div>
</section>

<section class="section bg-cream">
  <div class="container">
    <div class="section-head center">
      <span class="eyebrow center">In Their Words</span>
      <h2>Trusted, and recommended, again and again.</h2>
    </div>
    <div class="grid grid-3">
      ${reviews.slice(0, 3).map((r) => reviewCard(r)).join("")}
    </div>
    <div class="center" style="margin-top:3rem">
      <a class="btn btn-outline" href="/reviews/">Read more reviews</a>
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="section-head center">
      <span class="eyebrow center">Where We Work</span>
      <h2>Proudly serving the greater Seattle area.</h2>
      <p>From our home in Renton to custom homes across the Eastside and the mountains beyond, we bring the same craftsmanship to every community we serve.</p>
    </div>
    <div class="chip-grid" style="justify-content:center;max-width:820px;margin-inline:auto">
      ${areaChips.map((c) => {
        const area = areas.find((a) => a.city === c);
        return area
          ? `<a class="chip" href="/service-areas/${area.slug}/">${c}</a>`
          : `<span class="chip">${c}</span>`;
      }).join("")}
    </div>
    <div class="center" style="margin-top:2.5rem">
      <a class="link-arrow" href="/service-areas/">See all service areas ${icon("arrow")}</a>
    </div>
  </div>
</section>

${ctaBand()}
`;

  return {
    path: "/",
    title:
      "Davis Plumbing | Custom-Home & Remodel Plumbing in Renton & Greater Seattle",
    description: site.defaultDescription,
    content,
    head: localBusinessSchema({ areaServed: areas.map((a) => a.city) }),
  };
}
