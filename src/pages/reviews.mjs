import {
  business,
  icon,
  ctaBand,
  pageHero,
  reviewCard,
  breadcrumbSchema,
} from "../lib/templates.mjs";
import { reviews } from "../data/site.mjs";

export default function () {
  const trail = [
    { label: "Home", href: "/" },
    { label: "Reviews", href: "/reviews/" },
  ];

  // Review schema — only for genuine, attributable reviews (verified: true).
  // AggregateRating is included but see README: confirm real totals before publishing.
  const verified = reviews.filter((r) => r.verified);
  const reviewSchema = {
    "@context": "https://schema.org",
    "@type": "Plumber",
    name: business.legalName,
    telephone: business.phoneRaw,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: business.ratings.value,
      reviewCount: business.ratings.count,
    },
    review: verified.map((r) => ({
      "@type": "Review",
      reviewRating: { "@type": "Rating", ratingValue: r.rating, bestRating: 5 },
      author: { "@type": "Person", name: r.author },
      reviewBody: r.quote,
    })),
  };

  const content = `
${pageHero({
  eyebrow: "Reviews",
  title: "The best measure of our work is who calls us back.",
  lead: "For decades, families and builders across the greater Seattle area have trusted Davis Plumbing — and trusted us again. Here's what a few of them have said.",
  image: "/assets/img/reviews/reviews-hero.jpg",
  imageAlt: "Happy Davis Plumbing customers in their newly remodeled home",
  trail,
})}

<section class="section-sm bg-red">
  <div class="container">
    <div class="stats-band">
      <div class="stat"><span class="num" style="color:#fff">${business.ratings.value}★</span><span class="lbl" style="color:rgba(255,255,255,.85)">Average rating</span></div>
      <div class="stat"><span class="num" style="color:#fff">${business.ownerExperienceYears}+</span><span class="lbl" style="color:rgba(255,255,255,.85)">Years of trust</span></div>
      <div class="stat"><span class="num" style="color:#fff">Top 5%</span><span class="lbl" style="color:rgba(255,255,255,.85)">Of WA contractors</span></div>
      <div class="stat"><span class="num" style="color:#fff">100%</span><span class="lbl" style="color:rgba(255,255,255,.85)">Family owned</span></div>
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="grid grid-2">
      ${reviews.map((r) => reviewCard(r)).join("")}
    </div>
    <div class="center" style="margin-top:3rem">
      <p class="text-muted">Worked with us recently? We'd be grateful for your review.</p>
      <div style="display:flex;gap:1rem;justify-content:center;flex-wrap:wrap;margin-top:1rem">
        <a class="btn btn-outline" href="${business.social.yelp}" target="_blank" rel="noopener">${icon("yelp")} Review us on Yelp</a>
      </div>
    </div>
  </div>
</section>

${ctaBand({
  title: "Join the families who trust Davis Plumbing.",
  text: "Experience the craftsmanship and honesty our customers keep coming back for. Request your estimate today.",
})}
`;

  return {
    slug: "reviews",
    title: "Reviews & Testimonials | Davis Plumbing, Renton WA",
    description:
      "Read reviews and testimonials for Davis Plumbing — a family-owned, top-rated plumbing contractor serving Renton, Kent and the greater Seattle area for decades.",
    content,
    head:
      breadcrumbSchema(trail) +
      `<script type="application/ld+json">${JSON.stringify(reviewSchema)}</script>`,
  };
}
