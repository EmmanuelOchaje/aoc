import { redirect } from "next/navigation";

// The site is now a single page — services live at the #services section.
export default function ServicesPage() {
  redirect("/#services");
}
