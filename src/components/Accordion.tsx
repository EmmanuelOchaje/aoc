"use client";

import { useState } from "react";

/**
 * FAQ accordion. Each row is its own card and toggles independently
 * of the others (not exclusive) — matches the source design.
 */
export function Accordion({
  items,
}: {
  items: readonly { question: string; answer: string }[];
}) {
  const [open, setOpen] = useState<Record<number, boolean>>({ 0: true });

  return (
    <div className="grid gap-2.5">
      {items.map((item, index) => {
        const isOpen = Boolean(open[index]);
        const panelId = `faq-panel-${index}`;

        return (
          <div key={item.question} className="rounded-[0.625rem] bg-surface px-4 sm:px-6">
            <h3>
              <button
                type="button"
                onClick={() => setOpen((prev) => ({ ...prev, [index]: !prev[index] }))}
                aria-expanded={isOpen}
                aria-controls={panelId}
                className="flex w-full items-center justify-between gap-4 py-5 text-left text-[15px] font-semibold sm:text-base"
              >
                {item.question}
                <span aria-hidden className="text-lg font-normal text-muted">
                  {isOpen ? "−" : "+"}
                </span>
              </button>
            </h3>
            <div id={panelId} hidden={!isOpen}>
              <p className="max-w-[74ch] pb-5 text-sm leading-relaxed text-ink-soft">
                {item.answer}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
