/**
 * ============================================================
 *  AOC — single source of truth for site content.
 * ============================================================
 *
 *  Everything a non-developer might need to change lives here:
 *  company details, services, rates, FAQs, testimonials.
 *  Edit this file and the whole site updates.
 *
 *  Anything marked TODO is a placeholder awaiting real details.
 *  Placeholders are deliberately obvious so nothing invented
 *  ships to a live site by accident.
 */

/**
 * Flip to true once public/logo.png and public/logo-light.png exist
 * (see scripts/remove-logo-bg.mjs). Until then the header renders a
 * text wordmark, so a missing file never shows as a broken image.
 */
export const hasLogoFiles = false;

export const company = {
  // TODO: confirm what AOC stands for and the full legal name.
  name: "AOC",
  legalName: "AOC Logistics",
  tagline: "Your freight and cargo partner",

  // TODO: replace with the real domain once registered.
  domain: "https://aoc.com",

  description:
    "AOC moves parcels and cargo between Nigeria and the world — express courier through DHL, FedEx and UPS, plus consolidated air and sea cargo on our regular routes.",
} as const;

export const contact = {
  // TODO: real address, phone and email for each office.
  offices: [
    {
      name: "Lagos Office",
      address: "TODO: street address, area, Lagos",
      phone: "TODO: +234 ...",
    },
    {
      name: "Abuja Office",
      address: "TODO: street address, area, Abuja",
      phone: "TODO: +234 ...",
    },
  ],

  email: "TODO: hello@aoc.com",

  /**
   * The number that receives quote requests from the website form.
   * Must be in international format, digits only, no "+" and no spaces.
   * Example: 2348012345678
   */
  whatsapp: "2348000000000", // TODO: real WhatsApp number

  hours: [
    { days: "Monday – Friday", time: "8:00 AM – 6:00 PM WAT" },
    { days: "Saturday", time: "9:00 AM – 4:00 PM WAT" },
    { days: "Sunday", time: "Closed" },
  ],

  // TODO: add real profile URLs, or delete the ones AOC doesn't use.
  socials: [
    { label: "Instagram", href: "#" },
    { label: "Facebook", href: "#" },
    { label: "WhatsApp", href: "#" },
  ],
} as const;

export const nav = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Rates", href: "/rates" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

/**
 * The two service lines. This split is the main decision a customer
 * makes on arrival, so it drives the homepage fork and the rates page.
 */
export const serviceLines = [
  {
    id: "express",
    name: "Express Courier",
    summary:
      "Fast, fully tracked, door to door. Priced per kilogram through DHL, FedEx and UPS.",
    speed: "3 – 9 working days",
    bestFor: "Documents, samples, electronics, anything urgent.",
  },
  {
    id: "cargo",
    name: "Air & Sea Cargo",
    summary:
      "Consolidated freight on our regular routes. Slower, but a fraction of courier cost per kilogram.",
    speed: "Air 1 – 3 weeks · Sea 6 – 10 weeks",
    bestFor: "Bulk goods, stock for resale, personal effects, relocation.",
  },
] as const;

/**
 * The services grid. The reference layout holds eight cells in
 * four columns; add or remove freely and the grid reflows.
 * TODO: confirm this list matches what AOC actually offers.
 */
export const services = [
  {
    slug: "international-shipping",
    title: "International Shipping",
    description:
      "Send parcels from Nigeria to anywhere in the world, processed and dispatched through trusted global carriers.",
  },
  {
    slug: "import-receiving",
    title: "Import & Receiving",
    description:
      "Expecting goods from abroad? We receive inbound shipments, clear them, and deliver to your door.",
  },
  {
    slug: "air-cargo",
    title: "Air Cargo",
    description:
      "Consolidated air freight on regular routes — considerably cheaper than express, and still measured in weeks not months.",
  },
  {
    slug: "sea-cargo",
    title: "Sea Cargo",
    description:
      "The most economical way to move volume. Ideal for bulk stock, furniture and full relocations.",
  },
  {
    slug: "domestic-delivery",
    title: "Domestic Delivery",
    description:
      "Door-to-door movement across all 36 states, from Lagos to Abuja, Kano, Enugu and Port Harcourt.",
  },
  {
    slug: "packaging",
    title: "Cargo Packaging",
    description:
      "Professional packing with materials matched to the goods — fragile, bulk or specialised.",
  },
  {
    slug: "customs",
    title: "Documentation & Customs",
    description:
      "Paperwork, declarations and regulatory compliance handled so your shipment clears without hold-ups.",
  },
  {
    slug: "tracking",
    title: "Cargo Tracking",
    description:
      "A tracking number on every shipment, so you know where your goods are at each stage of the journey.",
  },
] as const;

/**
 * Performance stats for the oversized stat row.
 *
 * NOTE: the reference design uses percentages (99% on-time, 92%
 * satisfaction). Only use figures AOC can actually stand behind —
 * counts read just as well in this layout and are far safer.
 * TODO: replace with real, defensible numbers.
 */
export const stats = [
  { value: "TODO", caption: "Countries reached" },
  { value: "TODO", caption: "Shipments handled" },
  { value: "TODO", caption: "Years in business" },
  { value: "100%", caption: "Tracked delivery" },
] as const;

/**
 * Express courier transit times, by carrier and destination.
 * Nigerian freight customers compare on exactly these numbers,
 * so accuracy matters more here than anywhere else on the site.
 * TODO: replace every row with AOC's real published times.
 */
export const courierRates = [
  {
    carrier: "DHL",
    service: "Express Courier",
    note: "TODO: confirm AOC ships via DHL",
    routes: [
      { destination: "United Kingdom", pickup: "TODO", doorToDoor: "TODO" },
      { destination: "Ireland", pickup: "TODO", doorToDoor: "TODO" },
      { destination: "United States", pickup: "TODO", doorToDoor: "TODO" },
      { destination: "Canada", pickup: "TODO", doorToDoor: "TODO" },
    ],
  },
  {
    carrier: "FedEx",
    service: "Priority Shipping",
    note: "TODO: confirm AOC ships via FedEx",
    routes: [
      { destination: "United Kingdom", pickup: "TODO", doorToDoor: "TODO" },
      { destination: "United States", pickup: "TODO", doorToDoor: "TODO" },
      { destination: "Europe", pickup: "TODO", doorToDoor: "TODO" },
    ],
  },
  {
    carrier: "UPS",
    service: "Express Courier",
    note: "TODO: confirm AOC ships via UPS",
    routes: [
      { destination: "United Kingdom", pickup: "TODO", doorToDoor: "TODO" },
      { destination: "Ireland", pickup: "TODO", doorToDoor: "TODO" },
      { destination: "Europe", pickup: "TODO", doorToDoor: "TODO" },
    ],
  },
] as const;

/**
 * Cargo routes. Cargo is normally priced per kilogram (air) or
 * per cubic metre (sea), unlike courier which is strictly per kg.
 * TODO: replace with AOC's real routes, transit times and pricing.
 */
export const cargoRates = [
  {
    mode: "Air Cargo",
    unit: "per kg",
    routes: [
      { destination: "United Kingdom", transit: "TODO", price: "TODO" },
      { destination: "United States", transit: "TODO", price: "TODO" },
      { destination: "China", transit: "TODO", price: "TODO" },
    ],
  },
  {
    mode: "Sea Cargo",
    unit: "per CBM",
    routes: [
      { destination: "United Kingdom", transit: "TODO", price: "TODO" },
      { destination: "United States", transit: "TODO", price: "TODO" },
      { destination: "China", transit: "TODO", price: "TODO" },
    ],
  },
] as const;

export const whyUs = [
  {
    title: "Reliability",
    description:
      "Shipments handed to established global carriers, with a tracking number on every job and a team that answers the phone.",
  },
  {
    title: "Global Reach",
    description:
      "Courier service worldwide and consolidated cargo on regular routes to the UK, US and China.",
  },
  {
    title: "Transparent Pricing",
    description:
      "Clear quotes based on weight, volume and destination. No hidden charges added after the fact.",
  },
  {
    title: "Experienced Local Team",
    description:
      "A team that understands both Nigerian logistics realities and international shipping requirements.",
  },
] as const;

/**
 * TODO: replace with real client testimonials, or remove the
 * section entirely until AOC has some. Do not ship invented
 * quotes attributed to invented people.
 */
export const testimonials = [
  {
    quote: "TODO: a real client testimonial.",
    name: "TODO: client name",
    role: "TODO: role, location",
  },
] as const;

export const faqs = [
  {
    question: "What is the difference between courier and cargo?",
    answer:
      "Courier is fast and priced per kilogram — usually under two weeks, fully tracked, delivered to the door. Cargo is consolidated freight that travels by air or sea. It takes longer, but costs a fraction as much per kilogram, which makes it the right choice for bulk goods.",
  },
  {
    question: "How do you calculate shipping cost?",
    answer:
      "Courier shipments are priced on chargeable weight — the greater of actual weight and volumetric weight. Sea cargo is priced by volume, in cubic metres. Send us the dimensions and destination and we will quote before you commit.",
  },
  {
    question: "Can I track my shipment?",
    answer:
      "Yes. Every shipment gets a tracking number. Courier shipments are traceable through the carrier's own tracking system from collection to delivery.",
  },
  {
    question: "Do you handle customs clearance?",
    answer:
      "We prepare the required documentation and declarations for shipments in both directions, and advise on duties before goods travel.",
  },
  {
    question: "What items can you not ship?",
    answer:
      "TODO: list AOC's restricted and prohibited items — this varies by carrier and destination and is worth stating plainly.",
  },
] as const;
