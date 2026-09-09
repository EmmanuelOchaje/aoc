import type { Metadata } from "next";
import { faqs, serviceLines, services } from "@/content/site";
import { SiteHeader } from "@/components/SiteHeader";
import { Accordion } from "@/components/Accordion";
import { Button, Card, Container, Label } from "@/components/ui";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Express courier and consolidated air and sea cargo between Nigeria and the world, plus packaging, customs documentation and domestic delivery.",
};

export default function ServicesPage() {
  return (
    <main>
      <SiteHeader />

      <Container className="py-16 md:py-24">
        <Label>Services</Label>
        <h1 className="text-display mt-5 max-w-[16ch] font-medium">
          Everything you need to move goods
        </h1>

        <div className="mt-16 grid gap-5 md:grid-cols-2">
          {serviceLines.map((line) => (
            <Card key={line.id} className="p-8">
              <div className="flex items-baseline justify-between gap-4">
                <h2 className="text-title font-medium">{line.name}</h2>
                <span className="label">{line.speed}</span>
              </div>
              <p className="mt-5 text-muted">{line.summary}</p>
              <p className="mt-5 text-sm text-muted">
                <span className="label">Best for</span>
                <span className="mt-2 block">{line.bestFor}</span>
              </p>
            </Card>
          ))}
        </div>

        <div className="mt-20 grid gap-x-8 gap-y-12 border-t border-line pt-16 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <div key={service.slug}>
              {/* TODO: replace with 3D isometric icons to match the reference */}
              <div className="h-10 w-10 rounded-[var(--radius-tile)] bg-surface-sunk" />
              <h2 className="mt-5 font-medium">{service.title}</h2>
              <p className="mt-2 text-sm text-muted">{service.description}</p>
            </div>
          ))}
        </div>
      </Container>

      <Container className="pb-20 md:pb-28">
        <Label>Questions</Label>
        <h2 className="text-headline mt-4 mb-12 max-w-[18ch] font-medium">
          Get all the details before you ship
        </h2>
        <Accordion items={faqs} />
      </Container>

      <Container className="pb-20 md:pb-28">
        <Card className="flex flex-col items-start gap-6 p-10 md:flex-row md:items-center md:justify-between">
          <p className="text-headline max-w-[20ch] font-medium">
            Not sure which service fits?
          </p>
          <Button href="/contact">Get a Quote</Button>
        </Card>
      </Container>
    </main>
  );
}
