import Link from "next/link";
import { company, contact, nav, services } from "@/content/site";
import { Container } from "@/components/ui";
import { Wordmark } from "@/components/Wordmark";

export function SiteFooter() {
  return (
    <footer className="bg-night text-white">
      <Container className="py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <Wordmark onDark />
            <p className="mt-5 max-w-[32ch] text-sm text-night-muted">
              {company.tagline}
            </p>
          </div>

          <FooterColumn title="Pages">
            {nav.map((item) => (
              <FooterLink key={item.href} href={item.href}>
                {item.label}
              </FooterLink>
            ))}
          </FooterColumn>

          <FooterColumn title="Services">
            {services.slice(0, 5).map((service) => (
              <FooterLink key={service.slug} href="/services">
                {service.title}
              </FooterLink>
            ))}
          </FooterColumn>

          <FooterColumn title="Contact">
            {contact.offices.map((office) => (
              <li key={office.name} className="text-sm text-night-muted">
                <span className="block text-white">{office.name}</span>
                {office.address}
                <span className="mt-1 block">{office.phone}</span>
              </li>
            ))}
            <li className="text-sm text-night-muted">{contact.email}</li>
          </FooterColumn>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-night-line pt-6 text-sm text-night-muted sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p>
              © {new Date().getFullYear()} {company.legalName}. All rights
              reserved.
            </p>
            {/* CC BY 4.0 attribution for the hero photograph — see CREDITS.md */}
            <p className="mt-1 text-xs text-night-muted/70">
              Hero photograph by 4300streetcar,{" "}
              <a
                href="https://creativecommons.org/licenses/by/4.0"
                className="underline underline-offset-2 hover:text-white"
                target="_blank"
                rel="noopener noreferrer"
              >
                CC BY 4.0
              </a>
              .
            </p>
          </div>
          <ul className="flex gap-5">
            {contact.socials.map((social) => (
              <li key={social.label}>
                <a href={social.href} className="transition-colors hover:text-white">
                  {social.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
}

function FooterColumn({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h2 className="text-sm font-medium text-white">{title}</h2>
      <ul className="mt-4 flex flex-col gap-3">{children}</ul>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link href={href} className="text-sm text-night-muted transition-colors hover:text-white">
        {children}
      </Link>
    </li>
  );
}
