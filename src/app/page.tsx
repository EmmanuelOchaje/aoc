import Link from "next/link";
import {
  company,
  serviceLines,
  services,
  stats,
  whyUs,
} from "@/content/site";
import { Hero } from "@/components/Hero";
import { Button, Card, Container, ImageSlot, Label, StatRow } from "@/components/ui";

export default function HomePage() {
  return (
    <main>
      <Hero />

      {/* Who we are — tiny label left, one large statement right */}
      <Container className="py-20 md:py-28">
        <div className="grid gap-8 md:grid-cols-[200px_1fr]">
          <Label>Who We Are</Label>
          <p className="text-headline max-w-[24ch] font-medium">
            {company.description}
          </p>
        </div>

        <div className="mt-20 border-t border-line pt-14">
          <StatRow items={stats} />
        </div>
      </Container>

      <ServiceFork />

      <Container className="pb-20 md:pb-28">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 className="text-headline max-w-[16ch] font-medium">
            Everything you need to move goods
          </h2>
          <Button href="/services" variant="outline">
            All services
          </Button>
        </div>

        <div className="mt-12 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {services.slice(0, 8).map((service) => (
            <div key={service.slug}>
              {/* TODO: replace with 3D isometric icons to match the reference */}
              <div className="h-10 w-10 rounded-[var(--radius-tile)] bg-surface-sunk" />
              <h3 className="mt-5 font-medium">{service.title}</h3>
              <p className="mt-2 text-sm text-muted">{service.description}</p>
            </div>
          ))}
        </div>
      </Container>

      <WhyUs />
    </main>
  );
}

/**
 * The fork between the two service lines. This is the main decision
 * a customer makes, so it gets its own section rather than being
 * buried as two cells in the services grid.
 */
function ServiceFork() {
  return (
    <Container className="pb-20 md:pb-28">
      <Label>Two ways to ship</Label>
      <h2 className="text-headline mt-4 max-w-[18ch] font-medium">
        Fast when you need it. Affordable when you don&apos;t.
      </h2>

      <div className="mt-12 grid gap-5 md:grid-cols-2">
        {serviceLines.map((line) => (
          <Card key={line.id} className="flex flex-col gap-6 p-8">
            <div className="flex items-baseline justify-between gap-4">
              <h3 className="text-title font-medium">{line.name}</h3>
              <span className="label">{line.speed}</span>
            </div>
            <p className="text-muted">{line.summary}</p>
            <p className="mt-auto border-t border-line pt-5 text-sm">
              <span className="label">Best for</span>
              <span className="mt-2 block text-muted">{line.bestFor}</span>
            </p>
            <Link href="/rates" className="text-sm font-medium underline underline-offset-4">
              See {line.name.toLowerCase()} rates
            </Link>
          </Card>
        ))}
      </div>
    </Container>
  );
}

function WhyUs() {
  return (
    <section className="bg-night py-20 text-white md:py-28">
      <Container>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col">
            <h2 className="text-headline max-w-[16ch] font-medium">
              Why clients trust us with their shipments
            </h2>
            <ImageSlot
              caption="warehouse or cargo handling"
              className="mt-10 min-h-[260px] flex-1 border-night-line bg-night-card"
            />
          </div>

          <div className="flex flex-col gap-4">
            {whyUs.map((item) => (
              <div
                key={item.title}
                className="rounded-[var(--radius-tile)] bg-night-card p-6"
              >
                <div className="h-9 w-9 rounded-lg bg-white/10" />
                <h3 className="mt-5 font-medium">{item.title}</h3>
                <p className="mt-2 text-sm text-night-muted">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
