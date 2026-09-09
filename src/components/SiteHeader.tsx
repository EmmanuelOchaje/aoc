"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { company, nav } from "@/content/site";
import { Button } from "@/components/ui";
import { Wordmark } from "@/components/Wordmark";

export function SiteHeader({ onDark = false }: { onDark?: boolean }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // On the hero the nav sits over photography, so it inverts to white.
  const ink = onDark ? "text-white" : "text-ink";
  const muted = onDark ? "text-white/70" : "text-muted";

  return (
    <header className="relative z-20">
      <nav className="flex items-center justify-between gap-6 px-5 py-4 sm:px-6">
        <Link href="/" aria-label={`${company.name} home`}>
          <Wordmark onDark={onDark} />
        </Link>

        <ul className="hidden items-center gap-7 md:flex">
          {nav.map((item) => {
            const active = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`text-sm transition-colors hover:opacity-100 ${
                    active ? ink : muted
                  } ${active ? "font-medium" : ""}`}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <Button
            href="/contact"
            variant={onDark ? "light" : "solid"}
            className="hidden sm:inline-flex"
          >
            Get a Quote
          </Button>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label="Toggle navigation"
            className={`grid h-10 w-10 place-items-center rounded-full md:hidden ${
              onDark ? "bg-white/15 text-white" : "bg-surface text-ink"
            }`}
          >
            <span aria-hidden>{open ? "✕" : "☰"}</span>
          </button>
        </div>
      </nav>

      {open && (
        <div
          id="mobile-nav"
          className="absolute inset-x-4 top-full rounded-[var(--radius-tile)] bg-surface p-3 shadow-lg md:hidden"
        >
          <ul className="flex flex-col">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-2.5 text-sm text-ink hover:bg-canvas"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
