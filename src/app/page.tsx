import Image from "next/image";
import {
  company,
  contact,
  dhlRates,
  faqs,
  fedexRates,
  processSteps,
  services,
  stats,
  upsRates,
  whyUs,
} from "@/content/site";
import { Hero } from "@/components/Hero";
import { TrackBar } from "@/components/TrackBar";
import { ServiceIcon } from "@/components/ServiceIcon";
import { Testimonials } from "@/components/Testimonials";
import { RouteMap } from "@/components/RouteMap";
import { Accordion } from "@/components/Accordion";
import { QuoteForm } from "@/components/QuoteForm";
import { Button, Card, Container, Label, StatRow } from "@/components/ui";
import { chatUrl } from "@/lib/whatsapp";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <TrackBar />

      {/* Who we are */}
      <section id="about">
        <Container className="py-9 sm:py-14 md:py-20">
          <div className="grid gap-6 md:grid-cols-[200px_1fr] md:gap-16">
            <Label>Who we are</Label>
            <p className="max-w-[30ch] text-balance text-[clamp(1.25rem,2.6vw,1.9375rem)] leading-[1.28] font-medium tracking-[-0.02em] md:col-span-2">
              {company.description}
            </p>
          </div>

          <div className="mt-10 border-t border-line pt-7 sm:mt-14 sm:pt-9">
            <StatRow items={stats} />
          </div>
        </Container>
      </section>

      {/* Coverage map */}
      <Container className="pb-10 sm:pb-14 md:pb-20">
        <div className="mb-6 grid items-end gap-4 sm:mb-9 sm:grid-cols-2">
          <h2 className="max-w-[14ch] text-balance text-headline font-medium">
            Where your cargo goes
          </h2>
          <p className="max-w-[44ch] text-sm leading-relaxed text-muted sm:justify-self-end">
            Every lane runs out of Oshodi, Lagos. Hover a destination to
            trace the route. Figures are working days, door to door.
          </p>
        </div>
        <RouteMap />
        <p className="mt-3 text-xs text-muted/70">
          Country outlines from Natural Earth. Routes shown are our
          most-used lanes, not a limit on where we ship.
        </p>
      </Container>

      {/* Reliable handling from drop-off to doorstep */}
      <Container className="pb-10 sm:pb-14 md:pb-20">
        <div className="grid items-center gap-6 sm:gap-14 md:grid-cols-2">
          <div>
            <h2 className="max-w-[15ch] text-balance text-headline font-medium">
              Reliable handling from drop-off to doorstep
            </h2>
            <p className="mt-4 max-w-[44ch] text-[15px] leading-relaxed text-ink-soft sm:mt-4.5 sm:text-base">
              The person who packs your shipment is the person who answers
              when you call about it. We inspect, package, prepare the
              paperwork and dispatch, then stay with it until it lands.
            </p>
            <Button href="/#quote" className="mt-6">
              Get a quote
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-2 sm:gap-3.5">
            <div className="relative col-span-2 h-[180px] overflow-hidden rounded-[var(--radius-tile)] sm:h-[220px] md:h-[270px]">
              <Image
                src="/images/streamline-loading.jpg"
                alt="Cartons being loaded"
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="relative h-[150px] overflow-hidden rounded-[var(--radius-tile)] sm:h-[180px] md:h-[220px]">
              <Image
                src="/images/hero-forklift.jpg"
                alt="Forklift moving pallets in a warehouse"
                fill
                sizes="(min-width: 768px) 25vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="relative h-[150px] overflow-hidden rounded-[var(--radius-tile)] sm:h-[180px] md:h-[220px]">
              <Image
                src="/images/hero-truck.jpg"
                alt="Freight truck on the road"
                fill
                sizes="(min-width: 768px) 25vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </Container>

      {/* Services */}
      <section id="services">
        <Container className="pb-10 sm:pb-14 md:pb-20">
          <div className="grid grid-cols-1 gap-6 border-t border-line pt-7 sm:grid-cols-2 sm:gap-10 sm:pt-9 lg:grid-cols-3">
            {services.map((service) => (
              <div key={service.slug}>
                <div className="text-ink">
                  <ServiceIcon paths={service.icon} />
                </div>
                <h3 className="mt-4 text-[15px] font-semibold tracking-[-0.01em] sm:text-base">
                  {service.title}
                </h3>
                <p className="mt-2.5 max-w-[38ch] text-sm leading-relaxed text-muted">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* How it works */}
      <section id="process">
        <Container className="pt-8 pb-10 sm:pt-14 sm:pb-14 md:pb-20">
          <div className="mb-6 grid items-end gap-4 sm:mb-9 sm:grid-cols-2">
            <h2 className="max-w-[12ch] text-balance text-headline font-medium">
              How it works
            </h2>
            <p className="max-w-[40ch] text-sm leading-relaxed text-muted sm:justify-self-end">
              From our Oshodi office to anywhere in the world, in four steps.
            </p>
          </div>
          <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step) => (
              <Card key={step.number} className="p-5 sm:p-6.5">
                <div className="text-xs font-semibold text-muted">{step.number}</div>
                <h3 className="mt-3.5 text-base font-semibold">{step.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted">{step.description}</p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Why clients trust us */}
      <section id="why" className="px-4 sm:px-6">
        <div className="relative grid min-h-[460px] gap-6 overflow-hidden rounded-[var(--radius-card)] bg-night p-6 sm:min-h-[560px] sm:gap-10 sm:p-11 md:grid-cols-2">
          <Image
            src="/images/warehouse-why.jpg"
            alt="Warehouse weighing shot"
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(90deg, rgba(10,11,12,0.8) 0%, rgba(10,11,12,0.45) 60%, rgba(10,11,12,0.3) 100%)",
            }}
          />
          <div className="relative flex flex-col justify-between gap-8 sm:gap-16">
            <h2 className="max-w-[14ch] text-balance text-headline font-medium text-white">
              Why clients trust us with their cargo
            </h2>
            <Button href="/#quote" variant="light" className="self-start">
              Get a quote
            </Button>
          </div>
          <div className="relative grid gap-3.5">
            {whyUs.map((item) => (
              <Card key={item.title} className="p-4.5 sm:p-6">
                <h3 className="text-base font-semibold">{item.title}</h3>
                <p className="mt-2.5 max-w-[40ch] text-sm leading-relaxed text-muted">
                  {item.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Rates */}
      <section id="rates">
        <Container className="pt-10 pb-8 sm:pt-16 sm:pb-10 md:pt-20">
          <div className="mb-6 grid items-end gap-4 sm:mb-9 sm:grid-cols-2">
            <h2 className="max-w-[14ch] text-balance text-headline font-medium">
              Rates and transit times
            </h2>
            <p className="max-w-[44ch] text-sm leading-relaxed text-muted sm:justify-self-end">
              Working days from the day we dispatch. Pick-up means collection
              at the destination depot; door means we deliver to the address.
            </p>
          </div>

          <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
            <Card className="p-5 sm:p-7">
              <h3 className="text-lg font-semibold">DHL</h3>
              <p className="mt-1.5 mb-4.5 text-[13px] text-muted">{dhlRates.note}</p>
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr>
                    <th scope="col" className="border-b border-[#E7E4DE] pb-2.5 text-left text-xs font-medium text-muted">
                      Destination
                    </th>
                    <th scope="col" className="border-b border-[#E7E4DE] pb-2.5 text-right text-xs font-medium text-muted">
                      Pick-up
                    </th>
                    <th scope="col" className="border-b border-[#E7E4DE] pb-2.5 text-right text-xs font-medium text-muted">
                      Door
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {dhlRates.rows.map((row, i) => (
                    <tr key={row.destination}>
                      <td className={`py-3 ${i < dhlRates.rows.length - 1 ? "border-b border-[#F0EEE9]" : ""}`}>
                        {row.destination}
                      </td>
                      <td className={`py-3 text-right font-semibold ${i < dhlRates.rows.length - 1 ? "border-b border-[#F0EEE9]" : ""}`}>
                        {row.pickup}
                      </td>
                      <td className={`py-3 text-right font-semibold ${i < dhlRates.rows.length - 1 ? "border-b border-[#F0EEE9]" : ""}`}>
                        {row.door}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>

            <Card className="p-5 sm:p-7">
              <h3 className="text-lg font-semibold">FedEx</h3>
              <p className="mt-1.5 mb-4.5 text-[13px] text-muted">{fedexRates.note}</p>
              <ul className="text-sm">
                {fedexRates.bullets.map((bullet, i) => (
                  <li
                    key={bullet}
                    className={`py-3 ${i < fedexRates.bullets.length - 1 ? "border-b border-[#F0EEE9]" : ""}`}
                  >
                    {bullet}
                  </li>
                ))}
              </ul>
            </Card>

            <Card className="p-5 sm:p-7">
              <h3 className="text-lg font-semibold">UPS</h3>
              <p className="mt-1.5 mb-4.5 text-[13px] text-muted">{upsRates.note}</p>
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr>
                    <th scope="col" className="border-b border-[#E7E4DE] pb-2.5 text-left text-xs font-medium text-muted">
                      Destination
                    </th>
                    <th scope="col" className="border-b border-[#E7E4DE] pb-2.5 text-right text-xs font-medium text-muted">
                      Pick-up
                    </th>
                    <th scope="col" className="border-b border-[#E7E4DE] pb-2.5 text-right text-xs font-medium text-muted">
                      Door
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {upsRates.rows.map((row, i) => (
                    <tr key={row.destination}>
                      <td className={`py-3 ${i < upsRates.rows.length - 1 ? "border-b border-[#F0EEE9]" : ""}`}>
                        {row.destination}
                      </td>
                      <td className={`py-3 text-right font-semibold ${i < upsRates.rows.length - 1 ? "border-b border-[#F0EEE9]" : ""}`}>
                        {row.pickup}
                      </td>
                      <td className={`py-3 text-right font-semibold ${i < upsRates.rows.length - 1 ? "border-b border-[#F0EEE9]" : ""}`}>
                        {row.door}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>
          </div>

          <p className="mt-5 max-w-[70ch] text-sm leading-relaxed text-muted sm:mt-7">
            These are transit times, not prices. What you pay depends on
            weight, destination and how fast you need it there. Send the
            details and we quote before you commit.
          </p>
        </Container>
      </section>

      {/* Testimonials */}
      <section id="testimonials">
        <Container className="py-8 sm:py-12 md:py-16">
          <Testimonials />
        </Container>
      </section>

      {/* FAQ */}
      <section id="faq">
        <Container className="py-8 sm:py-12 md:py-16">
          <div className="mb-6 grid items-end gap-4 sm:mb-9 sm:grid-cols-2">
            <h2 className="max-w-[14ch] text-balance text-headline font-medium">
              Get all the details about our freight service
            </h2>
            <p className="max-w-[40ch] text-sm leading-relaxed text-muted sm:justify-self-end">
              Answers to what people ask most before they send their first
              shipment with us.
            </p>
          </div>
          <Accordion items={faqs.map((f) => ({ question: f.question, answer: f.answer }))} />
        </Container>
      </section>

      {/* Quote */}
      <section id="quote" className="px-4 py-5 sm:px-6 sm:py-8 md:py-10">
        <div className="grid gap-7 rounded-[var(--radius-card)] bg-ink p-6 sm:gap-14 sm:p-9 md:grid-cols-2 md:p-13">
          <div>
            <h2 className="max-w-[16ch] text-balance text-[clamp(1.625rem,3.4vw,2.5rem)] leading-[1.08] font-medium tracking-[-0.03em] text-white">
              Tell us what you&rsquo;re sending and we&rsquo;ll price it
            </h2>
            <p className="mt-4 max-w-[42ch] text-[15px] leading-relaxed text-white/65">
              Most people send a photo of the item and where it&rsquo;s going.
              We come back with the price and the days, usually the same
              working day.
            </p>
            <a
              href={chatUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex min-h-[50px] items-center justify-center rounded-full bg-white px-6.5 text-[15px] font-semibold text-ink transition-colors hover:bg-[#E4E2DD]"
            >
              Message us on WhatsApp
            </a>

            <dl className="mt-7 grid max-w-[360px] gap-3 text-sm sm:mt-9">
              {contact.offices.map((office) => (
                <div
                  key={office.name}
                  className="flex justify-between gap-4 border-t border-white/[0.18] pt-3"
                >
                  <dt className="text-white/55">{office.name}</dt>
                  <dd className="max-w-[24ch] text-right text-white">{office.address}</dd>
                </div>
              ))}
              <div className="flex justify-between gap-4 border-t border-white/[0.18] pt-3">
                <dt className="text-white/55">Phone</dt>
                <dd className="text-right text-white">
                  {contact.offices[0].phone} · {contact.offices[1].phone}
                </dd>
              </div>
              <div className="flex justify-between gap-4 border-t border-white/[0.18] pt-3">
                <dt className="text-white/55">Email</dt>
                <dd className="text-white">{contact.email}</dd>
              </div>
              <div className="flex justify-between gap-4 border-t border-white/[0.18] pt-3">
                <dt className="text-white/55">Hours</dt>
                <dd className="text-white">{contact.hours}</dd>
              </div>
            </dl>
          </div>

          <QuoteForm />
        </div>
      </section>
    </main>
  );
}
