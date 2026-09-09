import { contact } from "@/content/site";

export type QuoteRequest = {
  name: string;
  phone: string;
  email: string;
  serviceLine: string;
  origin: string;
  destination: string;
  weight: string;
  details: string;
};

const LABELS: Record<keyof QuoteRequest, string> = {
  name: "Name",
  phone: "Phone",
  email: "Email",
  serviceLine: "Service",
  origin: "Origin",
  destination: "Destination",
  weight: "Weight / volume",
  details: "Details",
};

const FIELD_ORDER = Object.keys(LABELS) as (keyof QuoteRequest)[];

/**
 * Compose a quote request into a readable WhatsApp message.
 * Empty optional fields are omitted rather than sent as blank lines.
 */
export function buildQuoteMessage(request: QuoteRequest): string {
  const lines = FIELD_ORDER.flatMap((field) => {
    const value = request[field].trim();
    return value ? [`${LABELS[field]}: ${value}`] : [];
  });

  return ["Hello AOC, I would like a shipping quote.", "", ...lines].join("\n");
}

/**
 * wa.me works on both mobile and WhatsApp Web, so one link covers
 * every device without sniffing the user agent.
 */
export function buildWhatsAppUrl(request: QuoteRequest): string {
  const text = encodeURIComponent(buildQuoteMessage(request));
  return `https://wa.me/${contact.whatsapp}?text=${text}`;
}

/** A bare "chat with us" link with no prefilled request. */
export function chatUrl(message = "Hello AOC, I have a question about shipping."): string {
  return `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(message)}`;
}
