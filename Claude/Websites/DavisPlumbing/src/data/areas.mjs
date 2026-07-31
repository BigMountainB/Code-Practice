/**
 * Service-area landing pages. Each entry generates a unique, localized page at
 * /service-areas/<slug>/ with its own <title>, meta description, hero, intro,
 * neighborhoods, and LocalBusiness + Service schema — the foundation of a strong
 * local-SEO footprint. Keep the copy genuinely distinct per city; duplicated
 * "spun" content hurts rankings.
 */

export const areas = [
  {
    slug: "renton",
    city: "Renton",
    headline: "Plumbing in Renton, WA — Our Hometown",
    metaDescription:
      "Family-owned plumbing in Renton, WA. Davis Plumbing has served Renton homes and businesses for decades — custom homes, remodels, water heaters, and repairs. Call (425) 471-0874.",
    intro:
      "Renton isn't just where we work — it's home. Davis Plumbing is based right here, and we've spent decades caring for the plumbing in Renton's neighborhoods, from the historic homes of the Highlands to new custom builds on the hills above the valley.",
    body:
      "Being a hometown plumber means something. When you call us, you're calling neighbors who know Renton's housing stock, its older cast-iron and galvanized systems, and the permitting process for everything from a water-heater swap to a full custom home. We show up on time, respect your home, and stand behind our work long after the job is done.",
    neighborhoods: [
      "Renton Highlands",
      "Kennydale",
      "The Landing",
      "Talbot Hill",
      "Fairwood",
      "Benson Hill",
      "Maplewood",
      "Cascade",
    ],
    localNote:
      "As a Renton-based company, we're often on-site the same or next day — no long drives, no premium travel charges for our own hometown.",
    landmark: "Lake Washington & the Cedar River",
  },
  {
    slug: "kent",
    city: "Kent",
    headline: "Plumbing in Kent, WA",
    metaDescription:
      "Trusted plumbing in Kent, WA. Davis Plumbing serves Kent homeowners, builders, and businesses — remodels, new construction, commercial and residential service. Call (425) 471-0874.",
    intro:
      "Just south of our Renton home base, Kent is one of the communities we've served the longest. From the East Hill neighborhoods to the businesses along the valley floor, Davis Plumbing brings the same craftsmanship to Kent that we bring to every custom home we touch.",
    body:
      "Kent's mix of established homes, new development, and commercial space means no two jobs are alike — and that suits us. Whether you're a homeowner planning a kitchen remodel, a builder needing a reliable rough-in crew, or a business owner who needs plumbing that simply works, we bring decades of experience and a family reputation we protect on every project.",
    neighborhoods: [
      "East Hill",
      "West Hill",
      "Kent Valley",
      "Panther Lake",
      "Meridian",
      "Lake Meridian",
      "Downtown Kent",
      "Scenic Hill",
    ],
    localNote:
      "Kent is minutes from our shop, so we can respond quickly and keep travel costs off your invoice.",
    landmark: "the Green River Valley",
  },
  {
    slug: "bellevue",
    city: "Bellevue",
    headline: "Luxury Plumbing in Bellevue, WA",
    metaDescription:
      "High-end plumbing in Bellevue, WA. Davis Plumbing installs and services custom homes, luxury remodels, and designer fixtures throughout Bellevue. Call (425) 471-0874.",
    intro:
      "Bellevue's custom homes and high-end remodels demand a plumber who understands that the finish work is everything. Davis Plumbing has earned the trust of homeowners, designers, and builders across Bellevue's most sought-after neighborhoods.",
    body:
      "In homes like these, plumbing is invisible when it's done right and impossible to ignore when it isn't. We set designer fixtures with jeweler's care, rough-in with a builder's precision, and coordinate seamlessly with the architects and interior designers who shape Bellevue's finest properties. It's the kind of work we've built our name on.",
    neighborhoods: [
      "West Bellevue",
      "Clyde Hill",
      "Medina",
      "Bridle Trails",
      "Somerset",
      "Newport Shores",
      "Cougar Mountain",
      "Downtown Bellevue",
    ],
    localNote:
      "We regularly partner with Bellevue's luxury builders and design firms on projects where craftsmanship can't be compromised.",
    landmark: "Lake Washington's Eastside",
  },
  {
    slug: "seattle",
    city: "Seattle",
    headline: "Plumbing in Seattle, WA",
    metaDescription:
      "Craftsman plumbing in Seattle, WA. Davis Plumbing serves Seattle homeowners and builders with remodels, custom homes, repairs, and commercial plumbing. Call (425) 471-0874.",
    intro:
      "From century-old Craftsman homes to sleek new builds, Seattle's plumbing is as varied as its neighborhoods — and we've worked on all of it. Davis Plumbing brings decades of experience to homes and businesses across the city.",
    body:
      "Seattle's older housing stock comes with its own challenges: aging supply lines, tricky access, and the need to preserve the character of a home while modernizing what's behind the walls. We handle it with respect and skill — and when it's a new build or a full remodel, we bring the same clean, code-correct workmanship that's made us a trusted name across the region.",
    neighborhoods: [
      "Ballard",
      "Queen Anne",
      "Magnolia",
      "Capitol Hill",
      "West Seattle",
      "Wallingford",
      "Madison Park",
      "Laurelhurst",
    ],
    localNote:
      "We navigate Seattle's permitting and older-home quirks with the experience that only decades in the trade can provide.",
    landmark: "the shores of Puget Sound",
  },
  {
    slug: "issaquah",
    city: "Issaquah",
    headline: "Plumbing in Issaquah, WA",
    metaDescription:
      "Plumbing in Issaquah, WA. Davis Plumbing serves Issaquah's custom homes and remodels — from the Highlands to Squak Mountain — with decades of craftsmanship. Call (425) 471-0874.",
    intro:
      "Nestled against the Issaquah Alps, Issaquah's neighborhoods range from established valley homes to newer luxury developments in the Highlands. Davis Plumbing brings trusted, family-owned craftsmanship to all of them.",
    body:
      "We know Issaquah's terrain and its homes — the hillside builds, the custom properties, the remodels that turn a good house into a forever home. Homeowners here expect their contractors to be as invested in the details as they are, and that's exactly the standard we hold ourselves to on every job.",
    neighborhoods: [
      "Issaquah Highlands",
      "Squak Mountain",
      "Cougar Mountain",
      "Talus",
      "Sammamish Plateau edge",
      "Gilman",
      "Montreux",
      "Providence Point",
    ],
    localNote:
      "Hillside and custom homes are our specialty — the kind of builds Issaquah is known for.",
    landmark: "the Issaquah Alps",
  },
  {
    slug: "sammamish",
    city: "Sammamish",
    headline: "Custom-Home Plumbing in Sammamish, WA",
    metaDescription:
      "Custom-home plumbing in Sammamish, WA. Davis Plumbing installs and services luxury homes, remodels, and new construction across the Sammamish Plateau. Call (425) 471-0874.",
    intro:
      "Sammamish is custom-home country, and custom homes are where Davis Plumbing does some of its best work. We've roughed-in and finished plumbing for luxury builds across the plateau that homeowners will enjoy for generations.",
    body:
      "The homes on the Sammamish Plateau are an investment, and the plumbing inside them should be built to match. We work hand-in-hand with the region's finest builders to deliver systems that are clean behind the walls and flawless at the fixtures — the kind of work you'd trust with a home you plan to keep forever.",
    neighborhoods: [
      "Sammamish Plateau",
      "Klahanie",
      "Pine Lake",
      "Beaver Lake",
      "Trossachs",
      "Aldarra",
      "Timberline",
      "Inglewood",
    ],
    localNote:
      "New-construction and custom-home plumbing is our core craft — and Sammamish is full of it.",
    landmark: "the Sammamish Plateau",
  },
  {
    slug: "mercer-island",
    city: "Mercer Island",
    headline: "Luxury Plumbing on Mercer Island, WA",
    metaDescription:
      "Luxury plumbing on Mercer Island, WA. Davis Plumbing serves waterfront and custom homes with designer fixture installation, remodels, and new construction. Call (425) 471-0874.",
    intro:
      "Mercer Island's waterfront estates and custom homes call for a plumber who treats every fixture like a finished piece of jewelry. Davis Plumbing has earned the trust of island homeowners and builders alike.",
    body:
      "On the island, expectations are high — and rightly so. We bring the discretion, punctuality, and precision these homes deserve, coordinating with designers and builders to deliver plumbing worthy of some of the region's most beautiful properties. It's craftsmanship you can trust with a home like this.",
    neighborhoods: [
      "North End",
      "East Seattle",
      "Mercerwood",
      "First Hill",
      "Faben Point",
      "Groveland Beach",
      "The Lakes",
      "South End",
    ],
    localNote:
      "We're experienced with waterfront and estate properties where quality and discretion matter most.",
    landmark: "Lake Washington's island community",
  },
  {
    slug: "cle-elum",
    city: "Cle Elum",
    headline: "Plumbing in Cle Elum & Suncadia, WA",
    metaDescription:
      "Plumbing in Cle Elum and Suncadia, WA. Davis Plumbing serves mountain custom homes and cabins with new construction, remodels, and cold-climate plumbing. Call (425) 471-0874.",
    intro:
      "Across the pass in Kittitas County, Cle Elum and the Suncadia resort community have become a destination for mountain custom homes and cabins. Davis Plumbing makes the trip because this is exactly the work we love.",
    body:
      "Mountain builds bring their own demands — freeze protection, well and pressure systems, and the kind of self-reliant plumbing a home in the foothills needs. We plan for the climate and build for the long term, so your Cle Elum home or Suncadia cabin performs flawlessly through every season.",
    neighborhoods: [
      "Suncadia Resort",
      "Roslyn",
      "Ronald",
      "Cle Elum",
      "Tumble Creek",
      "Prospector",
      "Trailside",
      "Rope Rider",
    ],
    localNote:
      "We build with cold-climate performance in mind — freeze protection, well systems, and reliable pressure for mountain homes.",
    landmark: "the Cascade foothills",
  },
];

/**
 * Additional communities mentioned for the Service Areas index (no dedicated
 * page yet — easy to promote to full pages later by adding to `areas` above).
 */
export const additionalCommunities = [
  "Kirkland",
  "Redmond",
  "Woodinville",
  "Newcastle",
  "Maple Valley",
  "Covington",
  "Snoqualmie",
  "North Bend",
  "Medina",
  "Clyde Hill",
  "Tukwila",
  "SeaTac",
];
