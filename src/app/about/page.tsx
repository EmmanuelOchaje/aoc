import { redirect } from "next/navigation";

// The site is now a single page — "about" lives at the "Who we are" section.
export default function AboutPage() {
  redirect("/#about");
}
