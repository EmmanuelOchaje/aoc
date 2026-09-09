import type { Metadata } from "next";
import { company, stats, whyUs } from "@/content/site";
import { SiteHeader } from "@/components/SiteHeader";
import { Button, Container, ImageSlot, Label, StatRow } from "@/components/ui";

export const metadata: Metadata = {
  title: "About",
  description: company.description,
};

export default function AboutPage() {
  return (
    <main>
      <SiteHeader />

      <Container className="py-16 md:py-24">
        <Label>Who We Are</Label>
        <h1 className="text-display mt-5 max-w-[16ch] font-medium">
          A freight partner, not just a drop-off point
        </h1>
        <p className="mt-8 max-w-[60ch] text-muted">{company.description}</p>

        <ImageSlot
          caption="the team, the office, or cargo being packed"
          className="mt-14 min-h-[380px]"
        />

        <div className="mt-20 border-t border-line pt-14">
          <StatRow items={stats} />
        </div>
      </Container>

      <section className="bg-night py-20 text-white md:py-28">
        <Container>
          <Label>Why Us</Label>
          <h2 className="text-headline mt-4 max-w-[18ch] font-medium">
            Logistics you can actually rely on
          </h2>

          <div className="mt-14 grid gap-5 sm:grid-cols-2">
            {whyUs.map((item) => (
              <div
                key={item.title}
                className="rounded-[var(--radius-tile)] bg-night-card p-8"
              >
                <h3 className="text-title font-medium">{item.title}</h3>
                <p className="mt-3 text-sm text-night-muted">{item.description}</p>
              </div>
            ))}
          </div>

          <Button href="/contact" variant="light" className="mt-12">
            Get a Quote
          </Button>
        </Container>
      </section>
    </main>
  );
}
