import {
  business,
  icon,
  photo,
  pageHero,
  localBusinessSchema,
  breadcrumbSchema,
} from "../lib/templates.mjs";
import { areas } from "../data/areas.mjs";

export default function () {
  const trail = [
    { label: "Home", href: "/" },
    { label: "Contact", href: "/contact/" },
  ];

  const hoursRows = business.hours
    .map(
      (h) => `<li><span>${h.days}</span><span>${h.close ? `${h.open} – ${h.close}` : h.open}</span></li>`
    )
    .join("");

  const content = `
${pageHero({
  eyebrow: "Contact Us",
  title: "Let's talk about your project.",
  lead: "Call us, send a message, or request an estimate. You'll reach a real family business that takes your project as seriously as you do.",
  image: "/assets/img/contact/contact-hero.jpg",
  imageAlt: "Davis Plumbing service truck in the greater Seattle area",
  trail,
})}

<section class="section">
  <div class="container">
    <div class="split">
      <div data-reveal>
        <span class="eyebrow">Get in Touch</span>
        <h2>We're here to help.</h2>
        <p class="lead" style="margin-top:1rem">Whether it's a repair, a remodel, or a custom home, we'd be glad to hear from you. Prefer the phone? Give ${business.ownerName.split(" ")[0]} and the team a call.</p>

        <div class="grid grid-2" style="margin-top:2rem;gap:1.5rem">
          <a class="card" href="tel:${business.phoneRaw}">
            <div class="icon">${icon("phone")}</div>
            <h3 style="font-size:var(--step-1)">Call</h3>
            <p style="color:var(--red);font-weight:600;font-size:1.1rem">${business.phone}</p>
          </a>
          <a class="card" href="mailto:${business.email}">
            <div class="icon">${icon("mail")}</div>
            <h3 style="font-size:var(--step-1)">Email</h3>
            <p style="color:var(--red);font-weight:600">${business.email}</p>
          </a>
          <div class="card">
            <div class="icon">${icon("pin")}</div>
            <h3 style="font-size:var(--step-1)">Visit</h3>
            <p>${business.address.street}<br>${business.address.city}, ${business.address.region} ${business.address.postalCode}</p>
          </div>
          <div class="card">
            <div class="icon">${icon("clock")}</div>
            <h3 style="font-size:var(--step-1)">Hours</h3>
            <ul style="margin-top:.5rem">${hoursRows.replace(/<li>/g, '<li style="display:flex;justify-content:space-between;gap:1rem;font-size:.9rem;color:var(--muted);margin-bottom:.3rem">')}</ul>
          </div>
        </div>

        <div style="margin-top:2rem">
          <p class="text-muted" style="font-size:.9rem">${business.license.label}${business.license.number ? ` · Lic. ${business.license.number}` : ""}</p>
        </div>
      </div>

      <div data-reveal data-reveal-delay="1">
        <form class="form-card" id="contact-form" novalidate>
          <h3 style="font-size:var(--step-2)">Send us a message</h3>
          <p class="text-muted" style="margin-top:.4rem;margin-bottom:1.5rem">We'll get back to you promptly — usually the same business day.</p>
          <div class="field-row">
            <div class="field">
              <label for="c-name">Name <span class="req">*</span></label>
              <input id="c-name" name="name" type="text" required autocomplete="name">
            </div>
            <div class="field">
              <label for="c-phone">Phone <span class="req">*</span></label>
              <input id="c-phone" name="phone" type="tel" required autocomplete="tel">
            </div>
          </div>
          <div class="field">
            <label for="c-email">Email</label>
            <input id="c-email" name="email" type="email" autocomplete="email">
          </div>
          <div class="field">
            <label for="c-city">City / Service Area</label>
            <input id="c-city" name="city" type="text" list="area-list" placeholder="e.g. Renton">
            <datalist id="area-list">${areas.map((a) => `<option value="${a.city}">`).join("")}</datalist>
          </div>
          <div class="field">
            <label for="c-message">How can we help? <span class="req">*</span></label>
            <textarea id="c-message" name="message" required placeholder="Tell us a little about your project…"></textarea>
          </div>
          <button class="btn btn-lg" type="submit" style="width:100%">Send message</button>
          <p class="form-note">By submitting, you agree to be contacted about your request. We never share your information.</p>
        </form>
        <div class="form-success" id="contact-success">
          <div class="icon" style="width:48px;height:48px;color:var(--red);margin:0 auto 1rem">${icon("check")}</div>
          <h3>Thank you — message sent.</h3>
          <p class="text-muted" style="margin-top:.5rem">We've received your note and will be in touch shortly. Need us sooner? Call <a href="tel:${business.phoneRaw}" style="color:var(--red);font-weight:600">${business.phone}</a>.</p>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="section-sm bg-cream">
  <div class="container center">
    <h3>Proudly serving the greater Seattle area</h3>
    <div class="chip-grid" style="justify-content:center;max-width:760px;margin:1.5rem auto 0">
      ${areas.map((a) => `<a class="chip" href="/service-areas/${a.slug}/">${a.city}</a>`).join("")}
    </div>
  </div>
</section>
`;

  return {
    slug: "contact",
    title: "Contact Davis Plumbing | Renton, WA — (425) 471-0874",
    description:
      "Contact Davis Plumbing in Renton, WA. Call (425) 471-0874 or send a message. Family-owned plumbing serving Renton, Kent, Bellevue, Seattle and the greater Seattle area.",
    content,
    head:
      breadcrumbSchema(trail) +
      localBusinessSchema({ areaServed: areas.map((a) => a.city), id: "https://www.davisplumbing.com/contact/#business" }),
  };
}
