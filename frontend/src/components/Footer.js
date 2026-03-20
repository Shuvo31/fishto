import { Mail, Phone, ArrowUp } from 'lucide-react';

const footerLinks = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Why Us', href: '#why-us' },
  { label: 'Occasions', href: '#occasions' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
];

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const handleClick = (e, href) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer data-testid="footer-section" className="relative bg-ocean-950 text-white">
      {/* Wave top */}
      <div className="absolute -top-px left-0 w-full overflow-hidden leading-none">
        <svg viewBox="0 0 1440 60" className="w-full h-[40px] md:h-[60px]" preserveAspectRatio="none">
          <path fill="#f8fafc" d="M0,30 C360,60 720,0 1080,30 C1260,45 1380,35 1440,30 L1440,0 L0,0 Z" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-20 pb-8">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <h3 className="font-accent text-2xl font-bold tracking-wider mb-3">FISHTO</h3>
            <p className="text-sm font-body text-slate-400 leading-relaxed">
              Fresh Fish Supply Since 2022. Delivering premium quality fish to homes, hotels, restaurants, and events across the region.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-semibold text-base mb-4 text-white">Quick Links</h4>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => handleClick(e, link.href)}
                    data-testid={`footer-link-${link.label.toLowerCase().replace(/\s/g, '-')}`}
                    className="text-sm font-body text-slate-400 hover:text-aqua transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-semibold text-base mb-4 text-white">Contact</h4>
            <div className="space-y-3">
              <a
                href="mailto:support@fishto.in"
                data-testid="footer-email"
                className="flex items-center gap-3 text-sm font-body text-slate-400 hover:text-aqua transition-colors"
              >
                <Mail className="w-4 h-4 flex-shrink-0" />
                support@fishto.in
              </a>
              <a
                href="tel:9748465789"
                data-testid="footer-phone"
                className="flex items-center gap-3 text-sm font-body text-slate-400 hover:text-aqua transition-colors"
              >
                <Phone className="w-4 h-4 flex-shrink-0" />
                9748465789
              </a>
            </div>
          </div>
        </div>

        {/* Divider & Bottom */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs font-body text-slate-500">
            &copy; {new Date().getFullYear()} FISHTO. All rights reserved. Fresh Fish Supply Since 2022.
          </p>
          <button
            data-testid="footer-scroll-top"
            onClick={scrollToTop}
            className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors duration-200"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}
