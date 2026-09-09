import Image from "next/image";
import { hasLogoFiles } from "@/content/site";

/**
 * The AOC logo.
 *
 * Renders the real mark once the files exist in /public, and a text
 * stand-in until then — so a missing asset degrades to something
 * presentable rather than a broken image.
 *
 * Two files are used rather than one CSS filter: the mark is navy
 * with a gold accent, and inverting that programmatically would take
 * the gold with it. scripts/remove-logo-bg.mjs generates both.
 */
export function Wordmark({ onDark = false }: { onDark?: boolean }) {
  if (hasLogoFiles) {
    return (
      <Image
        src={onDark ? "/logo-light.png" : "/logo.png"}
        alt="AOC Logistics"
        width={150}
        height={44}
        priority
        className="h-9 w-auto sm:h-10"
      />
    );
  }

  return (
    <span className="inline-flex flex-col leading-none">
      <span
        className={`font-serif text-xl tracking-[0.06em] ${
          onDark ? "text-white" : "text-ink"
        }`}
      >
        AOC
      </span>
      <span
        className={`mt-1 text-[0.5rem] tracking-[0.34em] ${
          onDark ? "text-accent-soft" : "text-accent"
        }`}
      >
        LOGISTICS
      </span>
    </span>
  );
}
