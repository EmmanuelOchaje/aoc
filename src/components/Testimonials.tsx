"use client";

import { useState } from "react";
import { testimonials } from "@/content/site";

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const current = testimonials[index];

  function prev() {
    setIndex((i) => (i - 1 + testimonials.length) % testimonials.length);
  }
  function next() {
    setIndex((i) => (i + 1) % testimonials.length);
  }

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-5 sm:mb-10">
        <h2 className="max-w-[16ch] text-balance text-headline font-medium">
          Why businesses trust us with their freight
        </h2>
        <div className="flex gap-2.5">
          <button
            type="button"
            aria-label="Previous testimonial"
            onClick={prev}
            className="grid h-[46px] w-[46px] place-items-center rounded-full border border-line bg-surface text-base text-ink transition-colors hover:bg-ink hover:text-white"
          >
            ‹
          </button>
          <button
            type="button"
            aria-label="Next testimonial"
            onClick={next}
            className="grid h-[46px] w-[46px] place-items-center rounded-full border border-line bg-surface text-base text-ink transition-colors hover:bg-ink hover:text-white"
          >
            ›
          </button>
        </div>
      </div>
      <div className="grid items-start gap-6 sm:gap-14 md:grid-cols-[200px_1fr]">
        <div>
          <div className="text-sm font-semibold">{current.name}</div>
          <div className="mt-1 text-xs text-muted">{current.role}</div>
        </div>
        <p className="max-w-[30ch] text-balance text-[clamp(1.1875rem,2.3vw,1.75rem)] leading-[1.4] font-medium tracking-[-0.02em]">
          &ldquo;{current.quote}&rdquo;
        </p>
      </div>
    </div>
  );
}
