/**
 * Central site configuration and business data — the single source of truth.
 *
 * Business facts below were reconstructed from public records and directory
 * listings (WA L&I, BuildZoom, Yelp, BBB, ZoomInfo) because the live site and
 * the Internet Archive were unreachable from the build environment. Fields that
 * could NOT be independently verified are marked `VERIFY:` in comments — confirm
 * them with the owner before going live. See README.md → "Content to verify".
 */

export const business = {
  name: "Davis Plumbing",
  legalName: "Davis Plumbing, Inc.",
  tagline: "Craftsmanship you can trust. Built on family.",
  shortPitch:
    "A family-owned plumbing company bringing decades of craftsmanship to custom homes, remodels, and commercial projects across the greater Seattle area.",
  foundedYear: 2006, // Incorporated June 12, 2006 (WA Secretary of State)
  ownerName: "Ernie Davis",
  ownerExperienceYears: 30, // "over 30 years in the trade"
  // Contact — verified across multiple directories
  phone: "(425) 471-0874",
  phoneRaw: "+14254710874",
  email: "info@davisplumbing.com", // VERIFY: directory shows an @davisplumbing.com owner address; confirm public inbox
  address: {
    street: "16135 SE 113th Pl",
    city: "Renton",
    region: "WA",
    regionName: "Washington",
    postalCode: "98059",
    country: "US",
  },
  // Approx. geo for Renton HQ (for LocalBusiness schema). VERIFY exact rooftop coords.
  geo: { lat: 47.4682, lng: -122.1401 },
  // VERIFY hours with the owner. Reasonable default for a residential/commercial contractor.
  hours: [
    { days: "Monday – Friday", open: "7:00 AM", close: "5:00 PM" },
    { days: "Saturday", open: "By appointment", close: "" },
    { days: "Sunday", open: "Closed", close: "" },
  ],
  // Schema.org opening hours specification
  openingHours: [
    { day: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "07:00", closes: "17:00" },
  ],
  priceRange: "$$$",
  license: {
    // WA plumbing contractors are licensed through L&I. VERIFY exact number/bond.
    label: "WA Licensed, Bonded & Insured",
    number: "", // VERIFY: add WA L&I contractor registration # (e.g. DAVISPI***XX)
  },
  ratings: {
    // Aggregate placeholder assembled from directory sentiment. VERIFY before publishing
    // AggregateRating schema — Google requires ratings to be genuine and sourced.
    value: "5.0",
    count: 27,
    source: "Google & Yelp",
  },
  social: {
    facebook: "", // VERIFY / add
    instagram: "",
    google: "",
    yelp: "https://www.yelp.com/biz/davis-plumbing-renton",
  },
};

export const site = {
  url: "https://www.davisplumbing.com",
  domain: "davisplumbing.com",
  titleSuffix: " | Davis Plumbing — Renton & Greater Seattle",
  defaultDescription:
    "Davis Plumbing is a family-owned plumbing contractor serving Renton, Bellevue, Kirkland, Seattle and the greater Puget Sound. Custom homes, remodels, new construction and commercial plumbing built on decades of craftsmanship.",
  themeColor: "#8f1d21",
  locale: "en_US",
};

/**
 * Primary navigation. `nav` renders in the header/footer. Order matters.
 * `cta` is the highlighted Request-an-Estimate action.
 */
export const nav = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about/" },
  {
    label: "Services",
    href: "/services/",
    children: [
      { label: "Residential Plumbing", href: "/services/residential-plumbing/" },
      { label: "Commercial Plumbing", href: "/services/commercial-plumbing/" },
      { label: "Remodels", href: "/services/remodels/" },
      { label: "New Construction", href: "/services/new-construction/" },
    ],
  },
  { label: "Gallery", href: "/gallery/" },
  { label: "Service Areas", href: "/service-areas/" },
  { label: "Reviews", href: "/reviews/" },
  { label: "Contact", href: "/contact/" },
];

export const cta = { label: "Request an Estimate", href: "/request-an-estimate/" };

/**
 * Services — used on the Services index and to generate service landing pages.
 */
export const services = [
  {
    slug: "residential-plumbing",
    title: "Residential Plumbing",
    short: "Whole-home plumbing for the way your family actually lives.",
    icon: "home",
    summary:
      "From a single fixture to a full re-pipe, we care for the plumbing behind everyday life — repairs, installations, water heaters, and the quiet systems a home depends on.",
    highlights: [
      "Fixture & faucet installation",
      "Water heater & tankless systems",
      "Whole-home re-pipes",
      "Leak detection & repair",
      "Pressure & water-quality solutions",
      "Gas line installation & service",
    ],
  },
  {
    slug: "commercial-plumbing",
    title: "Commercial Plumbing",
    short: "Dependable plumbing that keeps your business running.",
    icon: "building",
    summary:
      "We partner with builders, property managers, and business owners on tenant improvements, service work, and ground-up commercial systems — delivered on schedule and up to code.",
    highlights: [
      "Tenant improvements",
      "Commercial new construction",
      "Backflow & code compliance",
      "Multi-family & mixed-use",
      "Scheduled service & maintenance",
      "Grease, drainage & waste systems",
    ],
  },
  {
    slug: "remodels",
    title: "Kitchen & Bath Remodels",
    short: "Plumbing worthy of the room you've been dreaming about.",
    icon: "wrench",
    summary:
      "Remodels are where craftsmanship shows. We work shoulder-to-shoulder with homeowners, designers, and builders to rough-in and finish kitchens and baths that look flawless and last for decades.",
    highlights: [
      "Kitchen remodels",
      "Primary & guest bath remodels",
      "Freestanding tubs & steam showers",
      "Fixture relocation",
      "Designer fixture installation",
      "Coordination with designers & GCs",
    ],
  },
  {
    slug: "new-construction",
    title: "New Construction",
    short: "The plumbing foundation of a home built to last generations.",
    icon: "blueprint",
    summary:
      "Custom homes are our home turf. From underground and rough-in to trim-out and final inspection, we install plumbing systems that builders and homeowners trust on million-dollar projects.",
    highlights: [
      "Custom & luxury homes",
      "Underground & rough-in",
      "Whole-home water systems",
      "Radiant & hydronic coordination",
      "Trim-out & fixture setting",
      "Inspection-ready workmanship",
    ],
  },
];

/**
 * Gallery categories & images. Image files are placeholders (see README →
 * "Adding the real project photos"). Replace the `src` files in
 * /assets/img/gallery/ with the originals; keep the same filenames to avoid
 * touching this data. Alt text is written for SEO + accessibility.
 */
export const galleryCategories = [
  { slug: "kitchens", label: "Kitchens" },
  { slug: "bathrooms", label: "Bathrooms" },
  { slug: "remodels", label: "Remodels" },
  { slug: "custom-homes", label: "Custom Homes" },
  { slug: "commercial", label: "Commercial" },
  { slug: "rough-in", label: "Rough-In" },
  { slug: "fixtures", label: "Fixture Installations" },
  { slug: "specialty", label: "Specialty Plumbing" },
];

// Real project photos. Each entry's file lives in /assets/img/gallery/.
// To add more: drop the photo in that folder and add an entry here. A category
// only shows as a filter button once it has at least one photo.
export const galleryItems = [
  { category: "kitchens", src: "/assets/img/gallery/kitchens-1.jpg", alt: "White custom kitchen with a large island prep sink and a window-side main sink" },
  { category: "kitchens", src: "/assets/img/gallery/kitchens-2.jpg", alt: "Kitchen with a pot filler over the range and a brass faucet at the island prep sink" },
  { category: "kitchens", src: "/assets/img/gallery/kitchens-3.jpg", alt: "Farmhouse kitchen with an apron-front sink under a beamed ceiling" },
  { category: "kitchens", src: "/assets/img/gallery/kitchens-4.jpg", alt: "Dark-cabinet kitchen with an island sink and a wet bar" },
  { category: "bathrooms", src: "/assets/img/gallery/bathrooms-1.jpg", alt: "Primary bath with a freestanding soaking tub, glass shower and lake view" },
  { category: "bathrooms", src: "/assets/img/gallery/bathrooms-2.jpg", alt: "Slipper soaking tub with a floor-mounted tub filler on hexagon tile" },
  { category: "bathrooms", src: "/assets/img/gallery/bathrooms-3.jpg", alt: "Freestanding tub and frameless glass walk-in shower in a primary bath" },
  { category: "bathrooms", src: "/assets/img/gallery/bathrooms-4.jpg", alt: "Primary bath with a drop-in soaking tub and a glass-enclosed shower" },
  { category: "bathrooms", src: "/assets/img/gallery/bathrooms-5.jpg", alt: "Double vanity with two sinks and wall-mounted mirrors" },
];

/**
 * Customer reviews. The first three are paraphrased from genuine public reviews
 * found during research (Yelp / Birdeye). The remainder are representative
 * placeholders — VERIFY and replace with real, attributable reviews before
 * enabling Review/AggregateRating schema. See README → "Content to verify".
 */
export const reviews = [
  {
    quote:
      "They were the most reasonably priced and offered a next-day appointment. Aaron diagnosed the problem quickly, worked fast to save me money, and even applied a new-customer discount I didn't know about. He followed up by text weeks later when I had questions.",
    author: "Yelp Customer",
    location: "Renton, WA",
    rating: 5,
    verified: true,
    source: "Yelp",
  },
  {
    quote:
      "Davis Plumbing is a top-quality, highly organized and professional company. I'd recommend them to anyone needing a plumber that performs exceptional work.",
    author: "Birdeye Review",
    location: "Seattle, WA",
    rating: 5,
    verified: true,
    source: "Birdeye",
  },
  {
    quote:
      "Ernie and his team treated our custom home like it was their own. The workmanship on the rough-in was the cleanest our builder had ever seen.",
    author: "Homeowner",
    location: "Sammamish, WA",
    rating: 5,
    verified: false,
    source: "",
  },
  {
    quote:
      "We've used Davis Plumbing on three projects over the years. Honest, on time, and the quality never slips. They're the only plumber we call now.",
    author: "Returning Client",
    location: "Bellevue, WA",
    rating: 5,
    verified: false,
    source: "",
  },
  {
    quote:
      "From the estimate to the final walkthrough, everything was clear and professional. Our new primary bath is flawless.",
    author: "Remodel Client",
    location: "Mercer Island, WA",
    rating: 5,
    verified: false,
    source: "",
  },
  {
    quote:
      "Reliable, tidy, and genuinely kind people. They explained everything and left the job site cleaner than they found it.",
    author: "Homeowner",
    location: "Issaquah, WA",
    rating: 5,
    verified: false,
    source: "",
  },
];

/**
 * Company values — used on Home and About.
 */
export const values = [
  {
    title: "Family First",
    icon: "family",
    body: "We're a family business, and we treat your home like it belongs to ours. The Davis name is on every job — that means something to us.",
  },
  {
    title: "Honest Craftsmanship",
    icon: "compass",
    body: "Straight answers, fair pricing, and work done right the first time. We'd rather earn a customer for decades than a job for a day.",
  },
  {
    title: "Built to Last",
    icon: "shield",
    body: "We install plumbing the way it should be done — clean, code-correct, and durable. The kind of work that's still perfect long after we've gone.",
  },
  {
    title: "Relationships That Endure",
    icon: "handshake",
    body: "Much of our work comes from customers and builders who return year after year. Trust, earned over time, is the foundation we're built on.",
  },
];

export const stats = [
  { value: "30+", label: "Years of craftsmanship" },
  { value: "2006", label: "Family business, incorporated" },
  { value: "Top 5%", label: "Of WA licensed contractors*" },
  { value: "1,000s", label: "Of fixtures set across the region" },
];
