/**
 * ============================================================
 *  AOC — single source of truth for site content.
 * ============================================================
 *
 *  Everything a non-developer might need to change lives here:
 *  company details, services, rates, FAQs, testimonials.
 *  Edit this file and the whole site updates.
 */

export const company = {
  name: "AOC Freighter & Cargo",
  legalName: "AOC Freighter & Cargo",
  tagline: "Freight solutions with on-time deliveries",

  // TODO: replace with the real domain once registered.
  domain: "https://aocfreighter.com",

  description:
    "A Lagos freight and courier company, moving parcels and cargo for people and businesses that need them to arrive intact and on the day promised.",
} as const;

export const contact = {
  offices: [
    {
      name: "Lagos",
      address: "No 6 Arewa Street, Mafoluku Oshodi, Lagos",
      phone: "08032961109",
      phoneHref: "tel:08032961109",
    },
    {
      name: "Abuja",
      address: "Shop HIG 140, Fati Abubakar, Wuye Ultra Modern Market, Abuja",
      phone: "+234 810 034 7112",
      phoneHref: "tel:+2348100347112",
    },
  ],

  email: "support@aocfreighter.com",

  /**
   * The number that receives quote requests and tracking chats from
   * the website. International format, digits only, no "+".
   */
  whatsapp: "2348032961109",

  hours: "Mon–Sat, 8:00 AM – 6:00 PM WAT",
} as const;

export const socials = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/aoc.logistics?stkn=MTEwcTIwbXI1ajkzNg%3D%3D&utm_source=qr",
  },
  {
    name: "TikTok",
    href: "https://www.tiktok.com/@aoc.logistics?_r=1&_t=ZS-99eQIVooRd6",
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/share/1DALVaRdsB/?mibextid=wwXIfr",
  },
] as const;

export const nav = [
  { label: "Services", href: "#services" },
  { label: "How it works", href: "#process" },
  { label: "Rates", href: "#rates" },
  { label: "FAQ", href: "#faq" },
] as const;

/** Hero background photos, cross-faded on a timer. */
export const heroImages = [
  { src: "/images/hero-plane.jpg", alt: "Cargo plane on the tarmac" },
  { src: "/images/hero-truck.jpg", alt: "Freight truck on the road" },
  { src: "/images/hero-delivery.jpg", alt: "Van making a delivery" },
  { src: "/images/hero-forklift.jpg", alt: "Forklift moving pallets in a warehouse" },
] as const;

export const stats = [
  { value: "36", caption: "States covered in Nigeria" },
  { value: "220+", caption: "Countries reachable via our carriers" },
  { value: "3–5", caption: "Working days, Lagos to the UK" },
  { value: "6", caption: "Days a week, Monday to Saturday" },
] as const;

/**
 * The services grid. Icon paths are simple line-art strokes drawn
 * in a shared 24x24 viewBox — see components/ServiceIcon.tsx.
 */
export const services = [
  {
    slug: "international-export",
    title: "International export",
    description:
      "Nigeria to anywhere. Inspected, packed for the route it is taking, documented and dispatched.",
    icon: ["M2 12l20-7-7 20-3-8-10-5z"],
  },
  {
    slug: "international-import",
    title: "International import",
    description:
      "Inbound shipments into Nigeria with customs documentation and last-mile delivery to your door.",
    icon: ["M12 3v12", "M7 10l5 5 5-5", "M4 20h16"],
  },
  {
    slug: "domestic-delivery",
    title: "Domestic delivery",
    description: "All 36 states. Lagos to Abuja, Kano, Enugu and Port Harcourt.",
    icon: [
      "M2 7h11v10H2z",
      "M13 10h4l4 4v3h-8z",
      "M6.5 17a1.8 1.8 0 100 3.6 1.8 1.8 0 000-3.6z",
      "M17.5 17a1.8 1.8 0 100 3.6 1.8 1.8 0 000-3.6z",
    ],
  },
  {
    slug: "cargo-packaging",
    title: "Cargo packaging",
    description: "Materials matched to the goods, whether fragile, bulk or specialised.",
    icon: ["M3 8l9-4 9 4v8l-9 4-9-4z", "M3 8l9 4 9-4", "M12 12v8"],
  },
  {
    slug: "documentation-customs",
    title: "Documentation & customs",
    description: "Declarations and compliance. Wrong paperwork is what holds shipments up.",
    icon: ["M6 3h8l4 4v14H6z", "M14 3v4h4", "M9 12h6", "M9 16h6"],
  },
  {
    slug: "tracking",
    title: "Tracking",
    description: "A number on every shipment, from drop-off to delivery.",
    icon: [
      "M12 21s7-5.6 7-11a7 7 0 10-14 0c0 5.4 7 11 7 11z",
      "M12 12a2.4 2.4 0 100-4.8 2.4 2.4 0 000 4.8z",
    ],
  },
] as const;

export const processSteps = [
  {
    number: "01",
    title: "Submit your cargo",
    description: "Bring your items to the office or schedule a pickup, and tell us the destination.",
  },
  {
    number: "02",
    title: "Professional packaging",
    description: "We inspect and package your goods with materials matched to what you are sending.",
  },
  {
    number: "03",
    title: "Processing and dispatch",
    description: "Documentation and customs paperwork handled, then handed to DHL, FedEx or UPS.",
  },
  {
    number: "04",
    title: "Track and receive",
    description: "You get a tracking number and follow the shipment until it reaches its destination.",
  },
] as const;

export const whyUs = [
  {
    title: "One person, start to finish",
    description:
      "No call centre and no handover. The same person packs it, files the paperwork and answers your calls about it.",
  },
  {
    title: "Priced before you commit",
    description:
      "Weight, destination and urgency decide the price. We quote it before the box is sealed and nothing is added after.",
  },
  {
    title: "Global carriers, local hands",
    description:
      "Dispatched through DHL, FedEx and UPS, prepared by people who know what customs at the other end will reject.",
  },
] as const;

export const dhlRates = {
  note: "Express courier, door to door, 3–5 working days.",
  rows: [
    { destination: "United Kingdom", pickup: "5", door: "7" },
    { destination: "Ireland", pickup: "7", door: "12" },
    { destination: "USA", pickup: "12", door: "15" },
    { destination: "Canada", pickup: "9", door: "—" },
  ],
} as const;

export const fedexRates = {
  note: "Priority, door to door, 5–7 working days.",
  bullets: [
    "Worldwide door-to-door coverage",
    "Tracked at every stage",
    "Handles fragile and high-value cargo",
    "Customs support included",
  ],
} as const;

export const upsRates = {
  note: "Express, 5–9 working days.",
  rows: [
    { destination: "United Kingdom", pickup: "5–7", door: "7–9" },
    { destination: "Ireland", pickup: "5–7", door: "7–9" },
    { destination: "Europe", pickup: "6–8", door: "7–9" },
  ],
} as const;

export const testimonials = [
  {
    quote:
      "I sent a laptop to my sister in Manchester. It was packed in front of me and it landed in seven days.",
    name: "Chidinma O.",
    role: "Ikeja, Lagos",
  },
  {
    quote:
      "I move samples to buyers in Europe most months. They tell me the day it will arrive and it arrives that day.",
    name: "Emeka A.",
    role: "Trader, Isale Eko",
  },
  {
    quote:
      "My package from the US was stuck at customs. They sorted the paperwork and brought it to my door.",
    name: "Halima B.",
    role: "Abuja",
  },
] as const;

export const faqs = [
  {
    question: "How is the price calculated?",
    answer:
      "Weight, destination and how fast you need it there. Volumetric weight applies to large light items, so a big box of clothes can price above what it weighs on the scale. We tell you the figure before we seal anything.",
  },
  {
    question: "Do you handle customs clearance?",
    answer:
      "Yes. We prepare export declarations and commercial invoices going out, and handle clearance and last-mile delivery on inbound shipments. Duties and taxes charged by the destination country are separate from our fee.",
  },
  {
    question: "What can't you ship?",
    answer:
      "Cash, jewellery without declared value, weapons, live animals, perishables that will not survive the transit time, and anything the carrier or destination country prohibits. Ask before you pack if you are unsure.",
  },
  {
    question: "Do you collect from my address?",
    answer:
      "Within Lagos, yes. Book a pickup and we come to you. Outside Lagos, send it to the office and we take it from there.",
  },
  {
    question: "How long does domestic delivery take?",
    answer:
      "Lagos to Lagos is usually next day. Lagos to Abuja, Port Harcourt, Kano and Enugu is two to three working days. Remote local governments can add a day.",
  },
  {
    question: "What if something is delayed or damaged?",
    answer:
      "You get the same person on the phone, not a call centre. We chase the carrier directly and tell you what we find. Declared-value cover is available at dispatch and we explain what it does and does not cover before you pay for it.",
  },
] as const;

export const shipmentTypes = [
  "International export (Nigeria → abroad)",
  "International import (abroad → Nigeria)",
  "Domestic delivery (within Nigeria)",
] as const;

export const carriers = ["No preference", "DHL", "FedEx", "UPS"] as const;

/**
 * Coverage map lanes — great-circle routes out of Lagos.
 * `iso` is the numeric country id used by world-atlas's TopoJSON, so
 * the destination country can be shaded on the map. `dx`/`dy`/`anchor`
 * nudge each city label clear of its dot.
 */
export const routeLanes = [
  { name: "London", coords: [-0.1276, 51.5072] as const, days: "5–7", iso: "826", dx: 5, dy: -8 },
  { name: "Dublin", coords: [-6.2603, 53.3498] as const, days: "7–12", iso: "372", dx: -7, dy: -14, anchor: "end" as const },
  { name: "New York", coords: [-74.006, 40.7128] as const, days: "12–15", iso: "840", dx: -7, dy: 14, anchor: "end" as const },
  { name: "Toronto", coords: [-79.3832, 43.6532] as const, days: "9–12", iso: "124", dx: -7, dy: -8, anchor: "end" as const },
  { name: "Berlin", coords: [13.405, 52.52] as const, days: "6–9", iso: "276", dx: 7, dy: 4 },
  { name: "Dubai", coords: [55.2708, 25.2048] as const, days: "6–9", iso: "784", dx: 7, dy: 12 },
  { name: "Guangzhou", coords: [113.2644, 23.1291] as const, days: "8–12", iso: "156", dx: 7, dy: -6 },
  { name: "Johannesburg", coords: [28.0473, -26.2041] as const, days: "5–8", iso: "710", dx: 7, dy: 11 },
] as const;

/** Lagos, our dispatch origin — [lon, lat], plus Nigeria's TopoJSON id for shading. */
export const mapOrigin = { name: "Lagos", coords: [3.3792, 6.5244] as const, iso: "566" };

export const trackingCarriers = [
  { value: "dhl", label: "DHL" },
  { value: "fedex", label: "FedEx" },
  { value: "ups", label: "UPS" },
] as const;

export function trackingUrl(carrier: string, trackingNo: string): string {
  const n = encodeURIComponent(trackingNo.trim());
  const urls: Record<string, string> = {
    dhl: `https://www.dhl.com/ng-en/home/tracking.html?tracking-id=${n}`,
    fedex: `https://www.fedex.com/fedextrack/?trknbr=${n}`,
    ups: `https://www.ups.com/track?tracknum=${n}`,
  };
  return urls[carrier] ?? urls.dhl;
}
