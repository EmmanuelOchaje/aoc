import type { Metadata } from "next";
import { contact } from "@/content/site";
import { SiteHeader } from "@/components/SiteHeader";
import { QuoteForm } from "@/components/QuoteForm";
import { Card, Container, Label } from "@/components/ui";

export const metadata: Metadata = {
  title: "Contact & Quotes",
  description:
    "Request a shipping quote, or visit one of our offices. We reply on WhatsApp.",
};

export default function ContactPage() {
  return (
    <main>
      <SiteHeader />

      <Container className="py-16 md:py-24">
        <Label>Get a Quote</Label>
        <h1 className="text-display mt-5 max-w-[16ch] font-medium">
          Tell us what you&apos;re shipping
        </h1>

        <div className="mt-16 grid gap-12 lg:grid-cols-[1.25fr_1fr] lg:gap-16">
          <Card className="p-8 md:p-10">
            <QuoteForm />
          </Card>

          <div className="flex flex-col gap-5">
            {contact.offices.map((office) => (
              <Card key={office.name} className="p-8">
                <h2 className="text-title font-medium">{office.name}</h2>
                <p className="mt-4 text-sm text-muted">{office.address}</p>
                <p className="mt-3 text-sm">{office.phone}</p>
              </Card>
            ))}

            <Card className="p-8">
              <h2 className="text-title font-medium">Opening hours</h2>
              <dl className="mt-4 flex flex-col gap-2 text-sm">
                {contact.hours.map((entry) => (
                  <div key={entry.days} className="flex justify-between gap-4">
                    <dt className="text-muted">{entry.days}</dt>
                    <dd>{entry.time}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-6 border-t border-line pt-5 text-sm">
                {contact.email}
              </p>
            </Card>
          </div>
        </div>
      </Container>
    </main>
  );
}
