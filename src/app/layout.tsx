import type { Metadata } from "next";
import { Instrument_Sans } from "next/font/google";
import { company } from "@/content/site";
import { SiteFooter } from "@/components/SiteFooter";
import { WhatsAppFab } from "@/components/WhatsAppFab";
import "./globals.css";

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(company.domain),
  title: {
    default: `${company.name} — ${company.tagline}`,
    template: `%s — ${company.name}`,
  },
  description: company.description,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    // The font variable must live on <html>, not <body>: Tailwind's
    // @theme declares --font-sans on :root, and a var() there cannot
    // reach a property defined further down the tree.
    <html lang="en" className={instrumentSans.variable}>
      <body className="font-sans antialiased">
        {children}
        <SiteFooter />
        <WhatsAppFab />
      </body>
    </html>
  );
}
