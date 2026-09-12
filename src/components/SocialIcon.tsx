const paths: Record<string, readonly string[]> = {
  Instagram: [
    "M4 4h16v16H4z",
    "M12 8.5a3.5 3.5 0 100 7 3.5 3.5 0 000-7z",
    "M16.5 7.5h.01",
  ],
  TikTok: [
    "M15 3v11.5a3.5 3.5 0 11-3.5-3.5",
    "M15 3c.5 2.8 2.3 4.5 5 5",
  ],
  Facebook: [
    "M13.5 21v-7h2.3l.35-3H13.5V9.1c0-.87.24-1.46 1.5-1.46h1.6V5.06C16.3 5 15.3 4.9 14.2 4.9c-2.3 0-3.9 1.4-3.9 4V11H8v3h2.3v7z",
  ],
};

/** Social platform icon, line-art in the same 24x24 viewBox as ServiceIcon. */
export function SocialIcon({ name }: { name: keyof typeof paths }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={20}
      height={20}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {paths[name].map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  );
}
