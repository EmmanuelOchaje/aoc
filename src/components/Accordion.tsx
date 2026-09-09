"use client";

import { useState } from "react";

/**
 * FAQ accordion. Uses buttons with aria-expanded rather than
 * <details> so the open/close state can be animated and only one
 * row stays open at a time.
 */
export function Accordion({
  items,
}: {
  items: readonly { question: string; answer: string }[];
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="divide-y divide-line border-y border-line">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const panelId = `faq-panel-${index}`;

        return (
          <div key={item.question}>
            <h3>
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : index)}
                aria-expanded={isOpen}
                aria-controls={panelId}
                className="flex w-full items-center justify-between gap-6 py-6 text-left"
              >
                <span className="text-title font-medium">{item.question}</span>
                <span
                  aria-hidden
                  className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border border-line text-lg transition-transform ${
                    isOpen ? "rotate-45" : ""
                  }`}
                >
                  +
                </span>
              </button>
            </h3>
            <div id={panelId} hidden={!isOpen}>
              <p className="max-w-[70ch] pb-6 text-muted">{item.answer}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
