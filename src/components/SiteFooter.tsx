import { company, contact, nav } from "@/content/site";
import { Container } from "@/components/ui";
import { Wordmark } from "@/components/Wordmark";
import { chatUrl } from "@/lib/whatsapp";

export function SiteFooter() {
  const [lagos, abuja] = contact.offices;

  return (
    <footer className="px-4 py-6 sm:px-6 sm:py-10">
      <Container className="!px-0">
        <div className="grid gap-8 border-t border-line pt-8 sm:grid-cols-2 sm:gap-10 md:grid-cols-6 md:pt-10">
          <div>
            <Wordmark />
            <p className="mt-3 max-w-[26ch] text-sm leading-relaxed text-muted">
              Lagos and Abuja. DHL, FedEx and UPS dispatch.
            </p>
          </div>

          <FooterColumn title="Lagos office">
            <p className="max-w-[24ch] text-muted">{lagos.address}</p>
            <a href={lagos.phoneHref} className="text-muted hover:text-ink">
              {lagos.phone}
            </a>
          </FooterColumn>

          <FooterColumn title="Abuja office">
            <p className="max-w-[24ch] text-muted">{abuja.address}</p>
            <a href={abuja.phoneHref} className="text-muted hover:text-ink">
              {abuja.phone}
            </a>
          </FooterColumn>

          <FooterColumn title="Navigation">
            {nav.map((item) => (
              <a key={item.href} href={item.href} className="text-muted hover:text-ink">
                {item.label}
              </a>
            ))}
            <a href="#track" className="text-muted hover:text-ink">
              Track
            </a>
          </FooterColumn>

          <FooterColumn title="Contact">
            <a href={lagos.phoneHref} className="text-muted hover:text-ink">
              {lagos.phone}
            </a>
            <a href={`mailto:${contact.email}`} className="text-muted hover:text-ink">
              {contact.email}
            </a>
            <a
              href={chatUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted hover:text-ink"
            >
              WhatsApp
            </a>
          </FooterColumn>

          <FooterColumn title="Carriers">
            <span className="text-muted">DHL</span>
            <span className="text-muted">FedEx</span>
            <span className="text-muted">UPS</span>
          </FooterColumn>
        </div>

        <div className="mt-6 flex flex-wrap justify-between gap-3 text-xs text-muted sm:mt-9">
          <span>
            © {new Date().getFullYear()} {company.legalName}
          </span>
          <span>{contact.hours}</span>
        </div>
      </Container>
    </footer>
  );
}

function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="grid content-start gap-2 text-sm">
      <div className="font-semibold text-ink">{title}</div>
      {children}
    </div>
  );
}
