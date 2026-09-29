import Logo from '@/components/Logo';
import { NAV_LINKS, SITE, scrollToHash, whatsappLink } from '@/lib/site';

const serviceLinks = [
  'Household supply',
  'Hotel bulk supply',
  'Restaurant supply',
  'Catering supply',
  'Event & occasion supply',
  'Custom bulk orders',
];

export default function Footer() {
  const linkClass = 'text-fg-muted transition-colors duration-slow ease-apple hover:text-fg hover:underline';

  return (
    <footer data-testid="footer-section" className="bg-canvas-alt text-xs">
      <div className="container-apple py-12">
        <div className="border-b border-fg/15 pb-8">
          <Logo className="h-7 w-auto" />
          <p className="mt-3 max-w-[520px] text-fg-muted">
            FISHTO is a Kolkata-based fresh fish supplier for homes, hotels, restaurants, caterers and events.
            Hygienically handled, packed on ice and delivered on time since {SITE.foundedYear}.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-8 py-8 sm:grid-cols-3">
          <nav aria-label="Footer">
            <h2 className="font-text text-xs font-semibold text-fg">Explore</h2>
            <ul className="mt-3 space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => scrollToHash(e, link.href)}
                    data-testid={`footer-link-${link.label.toLowerCase().replace(/\s/g, '-')}`}
                    className={linkClass}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="font-text text-xs font-semibold text-fg">Services</h2>
            <ul className="mt-3 space-y-2">
              {serviceLinks.map((service) => (
                <li key={service}>
                  <a
                    href={whatsappLink(`Hi FISHTO, I would like a quote for ${service.toLowerCase()}`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={linkClass}
                  >
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-text text-xs font-semibold text-fg">Contact</h2>
            <address className="mt-3 space-y-2 not-italic">
              <a href={SITE.phoneHref} data-testid="footer-phone" className={`block ${linkClass}`}>
                {SITE.phoneDisplay}
              </a>
              <a href={`mailto:${SITE.email}`} data-testid="footer-email" className={`block ${linkClass}`}>
                {SITE.email}
              </a>
              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className={`block ${linkClass}`}>
                WhatsApp
              </a>
            </address>
          </div>
        </div>

        <div className="flex flex-col gap-2 border-t border-fg/15 pt-6 text-fg-muted sm:flex-row sm:items-center sm:justify-between">
          <p>Copyright © {new Date().getFullYear()} FISHTO. All rights reserved.</p>
          <a
            href="#top"
            data-testid="footer-scroll-top"
            onClick={(e) => scrollToHash(e, '#top')}
            className={linkClass}
          >
            Back to top
          </a>
        </div>
      </div>
    </footer>
  );
}
