import { contact } from "@/content/site";

export type QuoteRequest = {
  name: string;
  phone: string;
  email: string;
  type: string;
  origin: string;
  destination: string;
  weight: string;
  carrier: string;
  description: string;
};

const LABELS: Record<keyof QuoteRequest, string> = {
  name: "Name",
  phone: "Phone",
  email: "Email",
  type: "Type",
  origin: "Origin",
  destination: "Destination",
  weight: "Weight (kg)",
  carrier: "Carrier",
  description: "Item",
};

const FIELD_ORDER = Object.keys(LABELS) as (keyof QuoteRequest)[];

/** Compose a quote request into a readable WhatsApp message. */
export function buildQuoteMessage(request: QuoteRequest): string {
  const lines = FIELD_ORDER.map((field) => `${LABELS[field]}: ${request[field].trim()}`);
  return ["Quote request", ...lines].join("\n");
}

/**
 * wa.me works on both mobile and WhatsApp Web, so one link covers
 * every device without sniffing the user agent.
 */
export function buildWhatsAppUrl(request: QuoteRequest): string {
  const text = encodeURIComponent(buildQuoteMessage(request));
  return `https://wa.me/${contact.whatsapp}?text=${text}`;
}

/** A bare "chat with us" link, optionally with a prefilled message. */
export function chatUrl(message = "Hello, I'd like a quote. I'm sending "): string {
  return `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(message)}`;
}
