import type { Metadata } from "next";
import { cargoRates, courierRates } from "@/content/site";
import { SiteHeader } from "@/components/SiteHeader";
import { Button, Card, Container, Label } from "@/components/ui";

export const metadata: Metadata = {
  title: "Rates & Transit Times",
  description:
    "Courier transit times by carrier and destination, plus air and sea cargo routes, rates and schedules.",
};

export default function RatesPage() {
  return (
    <main>
      <SiteHeader />

      <Container className="py-16 md:py-24">
        <Label>Rates</Label>
        <h1 className="text-display mt-5 max-w-[16ch] font-medium">
          Transit times and what they cost
        </h1>
        <p className="mt-6 max-w-[60ch] text-muted">
          Times are working days from the moment goods are dropped off or
          collected, and exclude customs delays outside our control. Every
          shipment is quoted before it travels.
        </p>

        {/* Express courier — priced per kg, quoted per shipment */}
        <section className="mt-20">
          <h2 className="text-headline font-medium">Express courier</h2>
          <p className="mt-4 max-w-[60ch] text-muted">
            Door to door, fully tracked, priced on chargeable weight.
          </p>

          <div className="mt-10 flex flex-col gap-5">
            {courierRates.map((carrier) => (
              <Card key={carrier.carrier} className="overflow-hidden">
                <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-line px-8 py-6">
                  <h3 className="text-title font-medium">{carrier.carrier}</h3>
                  <span className="label">{carrier.service}</span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full min-w-[520px] text-sm">
                    <thead>
                      <tr className="border-b border-line text-left">
                        <th scope="col" className="label px-8 py-4 font-normal">
                          Destination
                        </th>
                        <th scope="col" className="label px-8 py-4 font-normal">
                          Office pick-up
                        </th>
                        <th scope="col" className="label px-8 py-4 font-normal">
                          Door to door
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {carrier.routes.map((route) => (
                        <tr
                          key={route.destination}
                          className="border-b border-line last:border-0"
                        >
                          <th scope="row" className="px-8 py-4 text-left font-medium">
                            {route.destination}
                          </th>
                          <td className="px-8 py-4 text-muted">{route.pickup}</td>
                          <td className="px-8 py-4 text-muted">{route.doorToDoor}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Cargo — priced per kg (air) or per cubic metre (sea) */}
        <section className="mt-20">
          <h2 className="text-headline font-medium">Air &amp; sea cargo</h2>
          <p className="mt-4 max-w-[60ch] text-muted">
            Consolidated freight on regular routes. Slower than courier, and
            considerably cheaper by weight.
          </p>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {cargoRates.map((mode) => (
              <Card key={mode.mode} className="overflow-hidden">
                <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-line px-8 py-6">
                  <h3 className="text-title font-medium">{mode.mode}</h3>
                  <span className="label">Priced {mode.unit}</span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full min-w-[380px] text-sm">
                    <thead>
                      <tr className="border-b border-line text-left">
                        <th scope="col" className="label px-8 py-4 font-normal">
                          Destination
                        </th>
                        <th scope="col" className="label px-8 py-4 font-normal">
                          Transit
                        </th>
                        <th scope="col" className="label px-8 py-4 font-normal">
                          Rate
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {mode.routes.map((route) => (
                        <tr
                          key={route.destination}
                          className="border-b border-line last:border-0"
                        >
                          <th scope="row" className="px-8 py-4 text-left font-medium">
                            {route.destination}
                          </th>
                          <td className="px-8 py-4 text-muted">{route.transit}</td>
                          <td className="px-8 py-4 text-muted">{route.price}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            ))}
          </div>
        </section>

        <Card className="mt-20 flex flex-col items-start gap-6 p-10 md:flex-row md:items-center md:justify-between">
          <p className="text-headline max-w-[22ch] font-medium">
            Send us the details and we&apos;ll quote it.
          </p>
          <Button href="/contact">Get a Quote</Button>
        </Card>
      </Container>
    </main>
  );
}
