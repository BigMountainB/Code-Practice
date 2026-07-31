import {
  business,
  icon,
  pageHero,
  breadcrumbSchema,
} from "../lib/templates.mjs";
import { services } from "../data/site.mjs";
import { areas } from "../data/areas.mjs";

export default function () {
  const trail = [
    { label: "Home", href: "/" },
    { label: "Request an Estimate", href: "/request-an-estimate/" },
  ];

  const reasons = [
    ["compass", "Honest, no-pressure estimates", "A fair assessment of what your project actually needs — nothing more, nothing less."],
    ["shield", "Licensed, bonded &amp; insured", `${business.license.label}. Your home and project are protected.`],
    ["award", "Decades of craftsmanship", `${business.ownerExperienceYears}+ years of experience on everything from repairs to custom homes.`],
    ["handshake", "A family you can reach", "Talk to real people who stand behind their work — not a call center."],
  ];

  const content = `
${pageHero({
  eyebrow: "Request an Estimate",
  title: "Tell us about your project.",
  lead: "Share a few details and we'll get back to you with a fair, honest estimate. No pressure, no gimmicks — just straight answers from a family that takes pride in its craft.",
  image: "/assets/img/estimate/estimate-hero.jpg",
  imageAlt: "Davis Plumbing reviewing custom home plans with a homeowner",
  trail,
})}

<section class="section">
  <div class="container">
    <div class="split" style="align-items:flex-start">
      <div data-reveal data-reveal-delay="1" style="order:2">
        <form class="form-card" id="estimate-form" novalidate>
          <h3 style="font-size:var(--step-2)">Request your estimate</h3>
          <p class="text-muted" style="margin-top:.4rem;margin-bottom:1.5rem">Fields marked <span style="color:var(--red)">*</span> are required.</p>
          <div class="field-row">
            <div class="field">
              <label for="e-name">Name <span class="req">*</span></label>
              <input id="e-name" name="name" type="text" required autocomplete="name">
            </div>
            <div class="field">
              <label for="e-phone">Phone <span class="req">*</span></label>
              <input id="e-phone" name="phone" type="tel" required autocomplete="tel">
            </div>
          </div>
          <div class="field-row">
            <div class="field">
              <label for="e-email">Email</label>
              <input id="e-email" name="email" type="email" autocomplete="email">
            </div>
            <div class="field">
              <label for="e-city">City / Service Area</label>
              <input id="e-city" name="city" type="text" list="e-area-list" placeholder="e.g. Bellevue">
              <datalist id="e-area-list">${areas.map((a) => `<option value="${a.city}">`).join("")}</datalist>
            </div>
          </div>
          <div class="field">
            <label for="e-type">Type of project</label>
            <select id="e-type" name="projectType">
              <option value="">Select one…</option>
              ${services.map((s) => `<option value="${s.title}">${s.title}</option>`).join("")}
              <option value="Repair / Service">Repair / Service Call</option>
              <option value="Other">Something else</option>
            </select>
          </div>
          <div class="field">
            <label for="e-timeline">Timeline</label>
            <select id="e-timeline" name="timeline">
              <option value="">Select one…</option>
              <option>As soon as possible</option>
              <option>Within a month</option>
              <option>1–3 months</option>
              <option>Just planning / exploring</option>
            </select>
          </div>
          <div class="field">
            <label for="e-message">Project details <span class="req">*</span></label>
            <textarea id="e-message" name="message" required placeholder="Tell us about your project — scope, fixtures, timeline, anything that helps us understand what you have in mind."></textarea>
          </div>
          <button class="btn btn-lg" type="submit" style="width:100%">Request my estimate</button>
          <p class="form-note">Prefer to talk it through? Call <a href="tel:${business.phoneRaw}" style="color:var(--red);font-weight:600">${business.phone}</a>.</p>
        </form>
        <div class="form-success" id="estimate-success">
          <div class="icon" style="width:48px;height:48px;color:var(--red);margin:0 auto 1rem">${icon("check")}</div>
          <h3>Request received — thank you.</h3>
          <p class="text-muted" style="margin-top:.5rem">We'll review your project and get back to you promptly with next steps. For anything urgent, call <a href="tel:${business.phoneRaw}" style="color:var(--red);font-weight:600">${business.phone}</a>.</p>
        </div>
      </div>

      <div data-reveal style="order:1">
        <span class="eyebrow">Why Homeowners &amp; Builders Choose Us</span>
        <h2 style="margin-top:.6rem">What you can expect.</h2>
        <div style="margin-top:1.5rem">
          ${reasons
            .map(
              (r) => `<div style="display:flex;gap:1.1rem;padding:1.1rem 0;border-top:1px solid var(--line)">
            <div class="icon" style="width:38px;height:38px;color:var(--copper);flex-shrink:0">${icon(r[0])}</div>
            <div><h3 style="font-size:var(--step-1)">${r[1]}</h3><p class="text-muted" style="margin-top:.3rem">${r[2]}</p></div>
          </div>`
            )
            .join("")}
        </div>
        <div class="card" style="margin-top:2rem;background:var(--cream)">
          <div class="stars" style="color:var(--brass)">${icon("star")}${icon("star")}${icon("star")}${icon("star")}${icon("star")}</div>
          <blockquote style="font-family:var(--font-display);font-size:var(--step-1);line-height:1.5;color:var(--ink)">“They were the most reasonably priced and offered a next-day appointment… followed up weeks later when I had questions.”</blockquote>
          <p class="text-muted" style="margin-top:1rem;font-weight:600">— A Renton homeowner, via Yelp</p>
        </div>
      </div>
    </div>
  </div>
</section>
`;

  return {
    slug: "request-an-estimate",
    title: "Request an Estimate | Davis Plumbing, Renton WA",
    description:
      "Request a free, no-pressure plumbing estimate from Davis Plumbing. Family-owned, licensed and insured, serving Renton, Kent, Bellevue, Seattle and the greater Seattle area.",
    content,
    head: breadcrumbSchema(trail),
  };
}
