"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { company, heroImages, nav } from "@/content/site";
import { Wordmark } from "@/components/Wordmark";

/**
 * Cinematic hero: four photographs cross-fading behind the headline,
 * with the nav and CTA overlaid on top. Rotates every 5s; stops for
 * anyone who asked for reduced motion.
 */
export function Hero() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => {
      setActive((i) => (i + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="p-2 sm:p-3">
      <section className="relative flex min-h-[80vh] flex-col justify-between overflow-hidden rounded-[var(--radius-card)] bg-night">
        {heroImages.map((image, index) => (
          <div
            key={image.src}
            className="absolute inset-0 transition-opacity duration-[1200ms] ease-in-out"
            style={{ opacity: index === active ? 1 : 0 }}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              priority={index === 0}
              sizes="100vw"
              className="object-cover"
            />
          </div>
        ))}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(10,11,12,0.32) 0%, rgba(10,11,12,0.08) 30%, rgba(10,11,12,0.72) 100%)",
          }}
        />

        <header className="relative z-10 flex flex-wrap items-center justify-between gap-4 px-4 py-5 sm:px-6 sm:py-6">
          <Link href="/" aria-label={`${company.name} home`}>
            <Wordmark onDark />
          </Link>

          <nav className="flex flex-wrap items-center gap-4 text-sm font-medium sm:gap-7">
            {nav.map((item) => (
              <a key={item.href} href={item.href} className="text-white/90 hover:text-white">
                {item.label}
              </a>
            ))}
            <a
              href="#quote"
              className="inline-flex min-h-[42px] items-center rounded-full bg-white px-[18px] font-semibold text-ink transition-colors hover:bg-[#E4E2DD]"
            >
              Contact us
            </a>
          </nav>
        </header>

        <div className="relative z-10 grid gap-6 px-4 py-8 sm:gap-12 sm:px-6 sm:py-14 md:grid-cols-2 md:items-end">
          <h1 className="max-w-[14ch] text-balance text-[clamp(2.25rem,5.4vw,3.875rem)] leading-[1.02] font-semibold tracking-[-0.03em] text-white">
            Freight solutions with on-time deliveries
          </h1>
          <div className="max-w-[420px] md:justify-self-end">
            <p className="text-[15px] leading-relaxed text-white/90">
              Export, import and domestic delivery from our Oshodi and Wuye
              offices — packed, documented and dispatched through DHL, FedEx
              and UPS.
            </p>
            <a
              href="#quote"
              className="mt-4 inline-flex min-h-[48px] items-center justify-center rounded-full bg-white px-6 text-[15px] font-semibold text-ink transition-colors hover:bg-[#E4E2DD]"
            >
              Get a quote
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
