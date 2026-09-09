import Image from "next/image";
import { company } from "@/content/site";
import { SiteHeader } from "@/components/SiteHeader";
import { HeroGlobe } from "@/components/HeroGlobe";
import { Button } from "@/components/ui";

/**
 * Cinematic hero: dark navy stage, a graded cargo aircraft crossing
 * the frame, the route globe behind it, and oversized display type.
 *
 * The aircraft is a real photograph, cut out of its sky by
 * scripts/cutout-plane.mjs and otherwise left alone — no colour grade.
 * Grading it toward the palette laid a grey wash over the airframe and
 * cost it the look of a photograph, which is the whole reason it is
 * here. scripts/brand-plane.mjs can also repaint the airline titles as
 * AOC, and is left unapplied for the same reason.
 *
 * See CREDITS.md — the source image is CC BY 4.0 and the attribution
 * is a licence condition, not a courtesy.
 */
export function Hero() {
  return (
    <div className="p-3 sm:p-4">
      <div className="relative overflow-hidden rounded-[var(--radius-card)] bg-night">
        {/*
          Flat ground. Radial washes and corner blooms were tinting one
          side of the frame differently from the other, so the stage is
          a single even colour instead.
        */}

        {/* Route globe, sunk to the right and cropped by the frame */}
        <div className="pointer-events-none absolute top-1/2 right-[-2%] hidden h-[96%] w-[50%] -translate-y-1/2 opacity-95 md:block">
          <HeroGlobe />
        </div>

        <div className="relative flex min-h-[620px] flex-col md:min-h-[720px]">
          <SiteHeader onDark />

          {/*
            Aircraft in front of the globe, tail running off the left
            edge. The overflow is what gives it the sense of scale —
            an aircraft sized to fit neatly inside the card reads as a
            sticker rather than as something moving through the frame.
          */}
          <Image
            src="/plane-dark.png"
            alt=""
            aria-hidden
            width={2400}
            height={753}
            priority
            className="pointer-events-none absolute top-[18%] left-[-15%] z-10 w-[74%] max-w-none drop-shadow-[0_30px_60px_rgba(0,0,0,0.45)] sm:top-[18%] lg:w-[59%]"
          />

          {/* Extra bottom padding keeps copy clear of the floating chat button */}
          <div className="mt-auto grid gap-10 p-6 pb-24 sm:p-10 sm:pb-24 lg:grid-cols-[1.4fr_1fr] lg:items-end">
            <div>
              <p className="label !text-accent-soft">
                Lagos · Worldwide
              </p>

              <h1 className="mt-6 text-[clamp(2.75rem,7vw,5.5rem)] leading-[0.95] font-medium tracking-[-0.04em] text-white uppercase">
                Every leg
                <br />
                of the journey
              </h1>
            </div>

            <div className="lg:pb-3">
              <p className="max-w-[42ch] text-sm text-white/70">
                {company.name} moves parcels and cargo between Nigeria and the
                world — express courier when it has to arrive today,
                consolidated air and sea cargo when it has to arrive cheaply.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <Button href="/contact" variant="light">
                  Get a Quote
                </Button>
                <Button
                  href="/rates"
                  variant="outline"
                  className="!border-white/25 !text-white hover:!bg-white/10"
                >
                  See rates
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
