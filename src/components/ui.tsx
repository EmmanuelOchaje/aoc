import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

/** Page gutter. The design insets content from the viewport edge. */
export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-[1240px] px-4 sm:px-6 ${className}`}>
      {children}
    </div>
  );
}

/** Tiny uppercase section label, e.g. "Who We Are". */
export function Label({ children }: { children: ReactNode }) {
  return <p className="label">{children}</p>;
}

type ButtonProps = {
  children: ReactNode;
  href: string;
  variant?: "solid" | "outline" | "light";
  className?: string;
} & Omit<ComponentProps<typeof Link>, "href" | "className" | "children">;

/** Pill button. Solid black is the primary action throughout. */
export function Button({
  children,
  href,
  variant = "solid",
  className = "",
  ...rest
}: ButtonProps) {
  const styles = {
    solid: "bg-ink text-white hover:bg-[#33383D]",
    outline: "border border-line bg-transparent text-ink hover:bg-surface",
    light: "bg-white text-ink hover:bg-[#E4E2DD]",
  }[variant];

  const isExternal = href.startsWith("http") || href.startsWith("mailto:");
  const classes = `inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-colors ${styles} ${className}`;

  if (isExternal) {
    return (
      <a href={href} className={classes} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...rest}>
      {children}
    </Link>
  );
}

/** White card on the canvas — the core surface of the design. */
export function Card({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`rounded-[var(--radius-card)] bg-surface ${className}`}>
      {children}
    </div>
  );
}

/**
 * The oversized stat row: huge numerals, hairline dividers,
 * small captions underneath.
 */
export function StatRow({
  items,
}: {
  items: readonly { value: string; caption: string }[];
}) {
  return (
    <dl className="grid grid-cols-2 gap-y-10 md:grid-cols-4">
      {items.map((item, index) => (
        <div
          key={item.caption}
          className={
            index > 0
              ? "md:border-l md:border-line md:pl-8"
              : ""
          }
        >
          <dt className="text-stat font-medium">{item.value}</dt>
          <dd className="label mt-3">{item.caption}</dd>
        </div>
      ))}
    </dl>
  );
}
