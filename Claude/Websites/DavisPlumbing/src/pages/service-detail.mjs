import {
  icon,
  photo,
  ctaBand,
  pageHero,
  faqList,
  faqSchema,
  serviceSchema,
  breadcrumbSchema,
} from "../lib/templates.mjs";
import { services } from "../data/site.mjs";
import { areas } from "../data/areas.mjs";

/* Extended, unique content per service (intro, process, FAQs). */
const detail = {
  "residential-plumbing": {
    intro:
      "Your home's plumbing works hardest when you never think about it. We keep it that way — repairing what's broken, upgrading what's tired, and installing new systems with the kind of care that turns a house into a home you can rely on for decades.",
    sections: [
      { h: "Repairs done right the first time", p: "Leaks, running toilets, low pressure, failing water heaters — we diagnose the real problem and fix it properly, not just patch the symptom. You get a clear explanation and an honest price before we start." },
      { h: "Upgrades that make daily life better", p: "Tankless water heaters for endless hot water, whole-home filtration for cleaner water, recirculation for instant hot at the tap, and designer fixtures set with precision. Small upgrades, big difference." },
      { h: "Re-pipes and whole-home systems", p: "Older Seattle-area homes often hide aging galvanized or polybutylene lines. We re-pipe cleanly and efficiently, minimizing disruption while future-proofing your home's water system." },
    ],
    process: [
      ["Honest assessment", "We listen, inspect, and explain what's really going on — no scare tactics."],
      ["Clear estimate", "A fair, written price so you know exactly what to expect."],
      ["Craftsman-grade work", "Clean, code-correct installation that's built to last."],
      ["We stand behind it", "You call a real family, not a call center, if you ever need us."],
    ],
    faqs: [
      { q: "Do you handle both small repairs and large projects?", a: "Yes. From a single leaky faucet to a whole-home re-pipe, we bring the same care to every job. No project is too small to do right." },
      { q: "Can you install fixtures I purchased myself?", a: "Absolutely. We regularly install homeowner- and designer-supplied fixtures, and we'll set them flawlessly. We're happy to advise on quality and compatibility beforehand." },
      { q: "How do I know if I need a re-pipe?", a: "Signs include discolored water, recurring leaks, low pressure, and older galvanized or polybutylene piping. We'll inspect and give you an honest recommendation — repair if that's all you need, re-pipe only if it's truly warranted." },
    ],
  },
  "commercial-plumbing": {
    intro:
      "When your building's plumbing goes down, your business does too. We partner with property managers, builders, and business owners to keep commercial systems running — and to install new ones that are built for the demands of daily operation.",
    sections: [
      { h: "Tenant improvements & build-outs", p: "Restaurants, offices, retail, medical — we rough-in and finish plumbing for tenant spaces on schedule and to code, coordinating cleanly with your general contractor and trades." },
      { h: "Commercial new construction", p: "From underground to trim, we install complete commercial plumbing systems: domestic water, waste and vent, grease interpolation, and specialty fixtures built to handle real-world load." },
      { h: "Service, maintenance & compliance", p: "Backflow testing, code-compliance work, and scheduled maintenance that catches small problems before they become expensive emergencies." },
    ],
    process: [
      ["Scope & bid", "Detailed, competitive bids builders and owners can plan around."],
      ["Coordination", "We work seamlessly with GCs, architects, and other trades."],
      ["On-schedule delivery", "Reliable crews that keep your project moving."],
      ["Inspection-ready", "Work that passes the first time, every time."],
    ],
    faqs: [
      { q: "Do you work with general contractors and property managers?", a: "Yes — a large share of our commercial work comes from long-standing relationships with GCs and property managers who value reliable scheduling and clean, code-correct work." },
      { q: "Can you handle backflow testing and code compliance?", a: "We do. We handle backflow assembly installation and testing along with the compliance work commercial buildings require." },
      { q: "Do you offer scheduled maintenance?", a: "Yes. Preventive maintenance plans help commercial clients avoid costly emergency downtime. We'll tailor a schedule to your building's needs." },
    ],
  },
  remodels: {
    intro:
      "A remodel is where plumbing craftsmanship becomes visible. The right fixtures, set perfectly, in exactly the right place — that's what turns a renovation into the room you've been picturing. We work hand-in-hand with homeowners, designers, and builders to make it happen.",
    sections: [
      { h: "Kitchens that work beautifully", p: "Farmhouse sinks, pot fillers, filtered water taps, prep sinks, and the behind-the-wall plumbing that supports it all — installed so the finished kitchen looks and performs exactly as designed." },
      { h: "Bathrooms worth lingering in", p: "Freestanding tubs, curbless showers, steam systems, wall-mounted fixtures, and heated details. We handle the relocation and rough-in that make ambitious bathroom designs possible." },
      { h: "Designed to match the vision", p: "We coordinate closely with your designer or builder, reading plans carefully and flagging issues early so the plumbing supports the design instead of compromising it." },
    ],
    process: [
      ["Plan review", "We study the design and catch conflicts before they cost you."],
      ["Precise rough-in", "Fixtures land exactly where the design intends."],
      ["Flawless trim-out", "Level, tight, and beautiful — the details that show."],
      ["Final walkthrough", "We don't leave until it's right."],
    ],
    faqs: [
      { q: "Do you work with our designer or general contractor?", a: "Yes, and we prefer to. Early coordination with your designer or GC produces the cleanest result. We read plans carefully and communicate throughout the project." },
      { q: "Can you relocate plumbing for a new layout?", a: "In most cases, yes. Moving sinks, tubs, and fixtures is common in remodels. We'll assess the existing structure and give you honest options for the layout you want." },
      { q: "Will you install high-end and specialty fixtures?", a: "Definitely. Freestanding tub fillers, steam showers, pot fillers, and designer brands are our comfort zone. Precision setting of premium fixtures is exactly the work we love." },
    ],
  },
  "new-construction": {
    intro:
      "Custom homes are our home turf. From the first underground rough to the final fixture, we install plumbing systems that builders trust on their most important projects — clean, complete, and built to serve a family for generations.",
    sections: [
      { h: "Underground & rough-in", p: "The foundation of a home's plumbing is laid before the walls go up. Our underground and rough-in work is meticulous, well-planned, and inspection-ready — the kind builders point to with pride." },
      { h: "Whole-home water systems", p: "Pressure regulation, filtration, recirculation, and hose bibs positioned where they'll actually be used. We think through how the family will live in the home, not just how to pass code." },
      { h: "Trim-out & fixture setting", p: "When it's time to finish, we set every fixture with a craftsman's eye — because on a custom home, the details are what people remember." },
    ],
    process: [
      ["Plan & coordinate", "We work from the builder's plans and coordinate with every trade."],
      ["Underground & rough", "Meticulous layout that supports the whole build."],
      ["Systems & test", "Water, waste, gas, and specialty systems, pressure-tested."],
      ["Trim & finish", "Flawless fixtures and a clean, inspection-ready finish."],
    ],
    faqs: [
      { q: "Do custom-home builders hire you directly?", a: "Yes. Much of our new-construction work comes from ongoing relationships with the region's custom-home builders who rely on our clean rough-in and dependable scheduling." },
      { q: "Can you coordinate radiant or hydronic systems?", a: "We coordinate closely with radiant and hydronic specialists so the plumbing and heating systems integrate cleanly. Early planning is key, and we're built for it." },
      { q: "What areas do you serve for new construction?", a: "We build custom-home plumbing across the greater Seattle area — Sammamish, Issaquah, Bellevue, Mercer Island, and up into Cle Elum and Suncadia, among others." },
    ],
  },
};

export default function () {
  return services.map((s) => {
    const d = detail[s.slug];
    const trail = [
      { label: "Home", href: "/" },
      { label: "Services", href: "/services/" },
      { label: s.title, href: `/services/${s.slug}/` },
    ];
    const related = services.filter((x) => x.slug !== s.slug);

    const content = `
${pageHero({
  eyebrow: "Services",
  title: s.title,
  lead: s.summary,
  image: `/assets/img/services/${s.slug}-hero.jpg`,
  imageAlt: `${s.title} by Davis Plumbing`,
  trail,
})}

<section class="section">
  <div class="container">
    <div class="split">
      <div class="prose" data-reveal>
        <p class="lead">${d.intro}</p>
        ${d.sections.map((sec) => `<h2>${sec.h}</h2><p>${sec.p}</p>`).join("")}
      </div>
      <aside data-reveal data-reveal-delay="1">
        <div class="card" style="position:sticky;top:110px">
          <h3 style="font-size:var(--step-1)">What we handle</h3>
          <ul class="check-list" style="margin-top:1.2rem">
            ${s.highlights.map((h) => `<li>${h}</li>`).join("")}
          </ul>
          <a class="btn" href="/request-an-estimate/" style="width:100%;margin-top:1.5rem">Request an Estimate</a>
          <p class="text-muted" style="text-align:center;margin-top:1rem;font-size:.85rem">or call <a href="tel:+14254710874" style="color:var(--red);font-weight:600">(425) 471-0874</a></p>
        </div>
      </aside>
    </div>
  </div>
</section>

<section class="section bg-cream">
  <div class="container">
    <div class="section-head center">
      <span class="eyebrow center">How We Work</span>
      <h2>A process built around doing it right.</h2>
    </div>
    <div class="grid grid-4">
      ${d.process
        .map(
          (p, i) => `<div class="card" data-reveal data-reveal-delay="${i % 3}">
        <div style="font-family:var(--font-display);font-size:2.5rem;color:var(--brass);line-height:1">0${i + 1}</div>
        <h3 style="font-size:var(--step-1);margin-top:.5rem">${p[0]}</h3>
        <p>${p[1]}</p>
      </div>`
        )
        .join("")}
    </div>
  </div>
</section>

<section class="section">
  <div class="container-narrow">
    <div class="section-head center" style="margin-inline:auto">
      <span class="eyebrow center">Common Questions</span>
      <h2>${s.title} — answered.</h2>
    </div>
    ${faqList(d.faqs)}
  </div>
</section>

<section class="section-sm bg-cream">
  <div class="container">
    <h3 class="center" style="margin-bottom:2rem">Explore more of what we do</h3>
    <div class="grid grid-3">
      ${related
        .map(
          (r) => `<a class="card" href="/services/${r.slug}/" data-reveal>
        <div class="icon">${icon(r.icon)}</div>
        <h3 style="font-size:var(--step-1)">${r.title}</h3>
        <p>${r.short}</p>
      </a>`
        )
        .join("")}
    </div>
  </div>
</section>

${ctaBand()}
`;

    return {
      path: `/services/${s.slug}/`,
      title: `${s.title} in Renton & Greater Seattle | Davis Plumbing`,
      description: `${s.summary} Davis Plumbing — family-owned, serving Renton, Bellevue, Kirkland, Seattle and beyond.`,
      content,
      head:
        breadcrumbSchema(trail) +
        serviceSchema({
          name: s.title,
          description: s.summary,
          areaServed: areas.map((a) => a.city),
        }) +
        faqSchema(d.faqs),
    };
  });
}
