import { business, icon } from "../lib/templates.mjs";

export default function () {
  const content = `
<section class="page-hero" style="min-height:70vh;display:flex;align-items:center">
  <div class="container center" style="position:relative;z-index:2">
    <span class="eyebrow center" style="justify-content:center;color:var(--brass-light)">404</span>
    <h1 style="color:#fff">This page slipped down the drain.</h1>
    <p class="lead" style="color:rgba(255,255,255,.85);max-width:52ch;margin:1.2rem auto 0">The page you're looking for isn't here — but we're still just a call away. Let's get you back on track.</p>
    <div style="display:flex;gap:1rem;justify-content:center;flex-wrap:wrap;margin-top:2rem">
      <a class="btn btn-light btn-lg" href="/">Back to home</a>
      <a class="btn btn-ghost btn-lg" href="tel:${business.phoneRaw}" style="color:#fff;border-color:rgba(255,255,255,.6)"><span>${icon("phone")}</span> ${business.phone}</a>
    </div>
  </div>
</section>
`;

  return {
    path: "/404.html",
    title: "Page Not Found | Davis Plumbing",
    description: "The page you're looking for could not be found.",
    content,
    head: `<meta name="robots" content="noindex, follow">`,
  };
}
