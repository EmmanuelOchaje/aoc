import { redirect } from "next/navigation";

// The site is now a single page — the quote form lives at the #quote section.
export default function ContactPage() {
  redirect("/#quote");
}
