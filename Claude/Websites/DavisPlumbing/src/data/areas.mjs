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
    slug: "kirkland",
    city: "Kirkland",
    headline: "Plumbing in Kirkland, WA",
    metaDescription:
      "Plumbing in Kirkland, WA. Davis Plumbing serves Kirkland's waterfront homes, remodels, and new construction across the Eastside with custom-home craftsmanship. Call (425) 471-0874.",
    intro:
      "Kirkland's walkable downtown and Lake Washington waterfront make it one of the Eastside's most sought-after places to live — and to build. Davis Plumbing brings custom-home craftsmanship to homes throughout Kirkland.",
    body:
      "From the waterfront estates along Lake Street to the newer builds up in Totem Lake and Finn Hill, Kirkland homeowners expect their trades to match the quality of their homes. We set designer fixtures with care, rough-in cleanly, and coordinate with the Eastside's finest builders and designers — the work that's earned us a lasting reputation.",
    neighborhoods: [
      "Downtown Kirkland",
      "Juanita",
      "Totem Lake",
      "Houghton",
      "Rose Hill",
      "Bridle Trails",
      "Finn Hill",
      "Kingsgate",
    ],
    localNote:
      "We work throughout Kirkland's waterfront and hillside neighborhoods, coordinating closely with Eastside builders and designers.",
    landmark: "Lake Washington's Eastside shoreline",
  },
  {
    slug: "redmond",
    city: "Redmond",
    headline: "Plumbing in Redmond, WA",
    metaDescription:
      "Plumbing in Redmond, WA. Davis Plumbing serves Redmond homeowners and builders — custom homes, remodels, and new construction from Education Hill to the Sammamish Valley. Call (425) 471-0874.",
    intro:
      "Redmond has grown from a quiet valley town into one of the Eastside's most dynamic communities — and its homes have grown with it. Davis Plumbing brings decades of craftsmanship to Redmond's established neighborhoods and new construction alike.",
    body:
      "Whether it's a remodel up on Education Hill, a custom build near Bear Creek, or new construction along the Sammamish Valley, we deliver plumbing that's clean behind the walls and flawless at the fixtures. Redmond homeowners and builders count on us for work that's done right and built to last.",
    neighborhoods: [
      "Education Hill",
      "Grass Lawn",
      "Overlake",
      "Bear Creek",
      "Idylwood",
      "Redmond Ridge",
      "Union Hill",
      "Willows",
    ],
    localNote:
      "From established neighborhoods to new construction, we know Redmond's homes and the way this community builds.",
    landmark: "the Sammamish River Valley",
  },
  {
    slug: "woodinville",
    city: "Woodinville",
    headline: "Plumbing in Woodinville, WA",
    metaDescription:
      "Plumbing in Woodinville, WA. Davis Plumbing serves Woodinville's wine-country estates, acreage homes, and custom builds — including well and pressure systems. Call (425) 471-0874.",
    intro:
      "Known for its wineries and rolling acreage, Woodinville is where Eastside luxury meets country living. Davis Plumbing brings custom-home craftsmanship to its estates, ranch properties, and new builds.",
    body:
      "Woodinville's larger lots and rural properties often mean well systems, pressure tanks, and plumbing built for self-reliance — work we know well. From Hollywood Hill estates to homes along the Sammamish Valley, we design and install systems that perform beautifully and last for decades.",
    neighborhoods: [
      "Hollywood Hill",
      "Wellington",
      "Cottage Lake",
      "Leota",
      "Bear Creek",
      "Sammamish Valley",
      "English Hill",
      "Woodinville Wine District",
    ],
    localNote:
      "We're experienced with acreage properties — well systems, pressure tanks, and the plumbing rural-luxury homes require.",
    landmark: "Sammamish Valley wine country",
  },
  {
    slug: "medina",
    city: "Medina",
    headline: "Luxury Plumbing in Medina, WA",
    metaDescription:
      "Luxury plumbing in Medina, WA. Davis Plumbing serves Medina's waterfront estates with designer fixture installation, remodels, and new construction — discreet, exacting craftsmanship. Call (425) 471-0874.",
    intro:
      "Medina is home to some of the most exclusive waterfront estates on Lake Washington. Homes like these demand a plumber who treats every fixture like a finished piece of jewelry — exactly the standard Davis Plumbing holds.",
    body:
      "On Medina's Gold Coast, expectations are absolute, and rightly so. We bring the discretion, punctuality, and precision these estates deserve, coordinating quietly with architects and designers to deliver plumbing worthy of the region's finest homes. It's craftsmanship you can trust with a property like this.",
    neighborhoods: [
      "Evergreen Point",
      "Hunts Point",
      "Yarrow Point",
      "Clyde Hill",
      "Groat Point",
      "Medina Circle",
      "Overlake",
      "Fairweather Bay",
    ],
    localNote:
      "We're experienced with waterfront estates where quality and discretion are everything.",
    landmark: "the Gold Coast of Lake Washington",
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
 * Only the territory named by davisplumbing.com is listed. Every named city has
 * a full landing page above, so there are no extra "communities" to list. If the
 * site later names more, add them to `areas` (with coordinates in
 * scripts/gen-boundaries.mjs) rather than here.
 */
export const additionalCommunities = [];
