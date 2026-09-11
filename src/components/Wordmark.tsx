/** Text wordmark — "AOC Freighter & Cargo", inverts to white on dark sections. */
export function Wordmark({ onDark = false }: { onDark?: boolean }) {
  return (
    <span
      className={`text-lg font-bold tracking-[-0.02em] ${onDark ? "text-white" : "text-ink"}`}
    >
      AOC Freighter &amp; Cargo
    </span>
  );
}
