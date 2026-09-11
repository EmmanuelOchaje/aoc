import { redirect } from "next/navigation";

// The site is now a single page — rates live at the #rates section.
export default function RatesPage() {
  redirect("/#rates");
}
