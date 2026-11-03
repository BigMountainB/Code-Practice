import {
  business,
  icon,
  photo,
  cta,
  ctaBand,
  pageHero,
  reviewCard,
  breadcrumbSchema,
} from "../lib/templates.mjs";
import { values, stats, reviews } from "../data/site.mjs";

export default function () {
  const trail = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about/" },
  ];

  const content = `
${pageHero({
  eyebrow: `Family Owned Since ${business.foundedYear}`,
  title: "Three generations of the same promise.",
  lead: "Davis Plumbing isn't a franchise or a call center. We're a family — and the work we do carries our name.",
  image: "/assets/img/about/about-hero.jpg",
  imageAlt: "The Davis Plumbing family and crew in Renton, Washington",
  trail,
})}

<section class="section">
  <div class="container">
    <div class="split">
      <div class="feature-media" style="aspect-ratio:3/2" data-reveal>
        ${photo("/assets/img/about/davis-crew.jpg", "The Davis Plumbing crew with their work trucks", { kind: "wide" })}
        <div class="badge-float">
          ${icon("drop")}
          <span><span class="t">Est. ${business.foundedYear}</span><span class="s">Renton, Washington</span></span>
        </div>
      </div>
      <div class="prose" data-reveal data-reveal-delay="1">
        <span class="eyebrow">How We Started</span>
        <h2 style="margin-top:.6rem">It began with one man, a truck, and a reputation to protect.</h2>
        <p>${business.ownerName} spent more than ${business.ownerExperienceYears} years learning the plumbing trade the way it should be learned — on job sites, under experienced hands, doing the work until it was second nature. When he founded Davis Plumbing, he wasn't trying to build the biggest company in Washington. He was trying to build the most trusted one.</p>
        <p>That meant showing up when he said he would. It meant charging a fair price and doing the job right, even when no one was watching. And it meant treating every home — whether a modest remodel or a multi-million-dollar custom build — with the same respect and craftsmanship.</p>
        <p>Word travels in this business. One clean rough-in leads to another. One honest estimate earns a customer for life. Decades later, much of our work still comes from the builders, designers, and families who trusted us early — and never had a reason to call anyone else.</p>
      </div>
    </div>
  </div>
</section>

<section class="section bg-ink">
  <div class="container">
    <div class="section-head center" style="margin-inline:auto">
      <span class="eyebrow center">What We Believe</span>
      <h2>The values behind the name.</h2>
      <p style="color:var(--stone-light)">These aren't slogans on a truck. They're the standard we hold ourselves to on every job, every day.</p>
    </div>
    <div class="grid grid-4">
      ${values
        .map(
          (v, i) => `<div class="value" style="border-color:var(--line-dark)" data-reveal data-reveal-delay="${i % 3}">
        <div class="icon">${icon(v.icon)}</div>
        <h3 style="color:#fff">${v.title}</h3>
        <p style="color:var(--stone-light)">${v.body}</p>
      </div>`
        )
        .join("")}
    </div>
    <div class="feature-media" style="aspect-ratio:3/2;margin-top:3.5rem" data-reveal>
      ${photo("/assets/img/about/davis-family.jpg", "The Davis family at Pike Place Market in Seattle", { kind: "wide" })}
    </div>
  </div>
</section>

<section class="section">
  <div class="container-narrow prose" data-reveal>
    <span class="eyebrow">Our Commitment to Quality</span>
    <h2 style="margin-top:.6rem">Craftsmanship isn't a feature. It's the whole point.</h2>
    <p>Anyone can connect a pipe. Doing it so it's clean, accessible, correct, and built to outlast the home around it — that's the difference between a plumber and a craftsman. We've spent decades on the craftsman side of that line, and we don't intend to cross back.</p>
    <blockquote>“We'd rather earn a customer for the next twenty years than a job for the next twenty minutes.”</blockquote>
    <p>On a custom home, our rough-in is laid out with the same care a finish carpenter brings to trim. Our fixtures are set level, tight, and flawless. We coordinate with builders and designers so the plumbing supports the vision instead of fighting it. And when the inspector arrives, our work is ready — because we build it right the first time.</p>
    <h3>Why customers come back</h3>
    <ul>
      <li><strong>We're accountable.</strong> The Davis name is on the invoice. If something isn't right, you call us — a real family, not a dispatch queue.</li>
      <li><strong>We're consistent.</strong> The quality doesn't change with the size of the job or the day of the week.</li>
      <li><strong>We're honest.</strong> Clear estimates, no surprise upsells, and straight answers when you ask a question.</li>
      <li><strong>We're experienced.</strong> ${business.ownerExperienceYears}+ years means we've seen it, solved it, and know how to do it right.</li>
    </ul>
  </div>
</section>

<section class="section-sm bg-cream">
  <div class="container">
    <div class="stats-band">
      ${stats
        .map(
          (s) => `<div class="stat"><span class="num">${s.value}</span><span class="lbl">${s.label.replace("*", "")}</span></div>`
        )
        .join("")}
    </div>
    <p class="center text-muted" style="margin-top:2rem;font-size:.82rem">*Contractor ranking based on public BuildZoom licensing data for Washington State.</p>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="section-head center">
      <span class="eyebrow center">From the People We've Served</span>
      <h2>A reputation earned one home at a time.</h2>
    </div>
    <div class="grid grid-3">
      ${reviews.slice(0, 3).map((r) => reviewCard(r)).join("")}
    </div>
  </div>
</section>

${ctaBand({
  title: "Let's build a relationship that lasts.",
  text: "Whether it's your first remodel or your forever home, we'd be honored to earn your trust. Reach out for an honest, no-pressure estimate.",
})}
`;

  return {
    slug: "about",
    title: "About Davis Plumbing | Our Family, Story & Values",
    description: `Meet Davis Plumbing — a family-owned plumbing company founded by ${business.ownerName} with ${business.ownerExperienceYears}+ years of craftsmanship. Serving Renton, Bellevue and the greater Seattle area since ${business.foundedYear}.`,
    content,
    head: breadcrumbSchema(trail),
  };
}
