import { useEffect, useRef, useState } from 'react';
import { Moon, Phone, Sun } from 'lucide-react';
import Logo from '@/components/Logo';
import { NAV_LINKS, SITE, scrollToHash, whatsappLink } from '@/lib/site';

export default function Navbar({ theme, onToggleTheme }) {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef(null);
  const firstLinkRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKey);
    firstLinkRef.current?.focus();
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const onNavigate = (e, href) => {
    setOpen(false);
    scrollToHash(e, href);
  };

  return (
    <header data-testid="navbar" className={`fixed inset-x-0 top-0 z-50 ${open ? 'bg-canvas' : 'glass-nav'}`}>
      <nav aria-label="Primary" className="container-apple flex h-12 items-center justify-between">
        <a
          href="#top"
          data-testid="navbar-logo"
          aria-label="FISHTO home"
          onClick={(e) => onNavigate(e, '#top')}
          className="flex items-center"
        >
          <Logo className="h-[26px] w-auto" />
        </a>

        <ul className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                data-testid={`nav-link-${link.label.toLowerCase().replace(/\s/g, '-')}`}
                onClick={(e) => onNavigate(e, link.href)}
                className="text-xs text-fg/80 transition-colors duration-slow ease-apple hover:text-fg"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-4">
          <button
            type="button"
            data-testid="theme-toggle"
            onClick={onToggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            title={theme === 'dark' ? 'Light mode' : 'Dark mode'}
            className="relative flex h-8 w-8 items-center justify-center rounded-pill text-fg/80 transition-colors duration-slow ease-apple hover:bg-fg/10 hover:text-fg"
          >
            <Sun
              aria-hidden="true"
              className={`absolute h-4 w-4 transition-all duration-slower ease-apple ${
                theme === 'dark' ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-50 opacity-0'
              }`}
            />
            <Moon
              aria-hidden="true"
              className={`absolute h-4 w-4 transition-all duration-slower ease-apple ${
                theme === 'dark' ? 'rotate-90 scale-50 opacity-0' : 'rotate-0 scale-100 opacity-100'
              }`}
            />
          </button>
          <a
            href={SITE.phoneHref}
            data-testid="navbar-call-btn"
            aria-label={`Call FISHTO at ${SITE.phoneDisplay}`}
            className="hidden text-fg/80 transition-colors duration-slow ease-apple hover:text-fg sm:inline-flex"
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
          </a>
          <a
            href={whatsappLink('Hi FISHTO, I would like a quote for fresh fish supply')}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="navbar-whatsapp-btn"
            className="hidden rounded-pill bg-brand px-3 py-1 text-xs text-white transition-colors duration-slow ease-apple hover:bg-brand-link sm:inline-flex"
          >
            Get a quote
          </a>
          <button
            ref={toggleRef}
            type="button"
            data-testid="mobile-menu-toggle"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
            className="relative -mr-2 h-10 w-10 lg:hidden"
          >
            <span
              className={`absolute left-1/2 top-1/2 h-px w-4 -translate-x-1/2 bg-fg transition-transform duration-slow ease-apple ${
                open ? 'rotate-45' : '-translate-y-1'
              }`}
            />
            <span
              className={`absolute left-1/2 top-1/2 h-px w-4 -translate-x-1/2 bg-fg transition-transform duration-slow ease-apple ${
                open ? '-rotate-45' : 'translate-y-1'
              }`}
            />
          </button>
        </div>
      </nav>

      <div
        id="mobile-menu"
        data-testid="mobile-menu"
        hidden={!open}
        className="h-[calc(100dvh-48px)] overflow-y-auto bg-canvas lg:hidden"
      >
        <ul className="container-apple space-y-2 pb-12 pt-6">
          {NAV_LINKS.map((link, i) => (
            <li key={link.href} className="animate-fade-up" style={{ animationDelay: `${i * 40}ms` }}>
              <a
                ref={i === 0 ? firstLinkRef : undefined}
                href={link.href}
                data-testid={`mobile-nav-${link.label.toLowerCase().replace(/\s/g, '-')}`}
                onClick={(e) => onNavigate(e, link.href)}
                className="block py-1 font-display text-xl font-semibold text-fg"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li className="flex gap-3 pt-8">
            <a href={SITE.phoneHref} className="btn-secondary flex-1">
              <Phone className="h-4 w-4" aria-hidden="true" /> Call
            </a>
            <a
              href={whatsappLink('Hi FISHTO, I would like a quote for fresh fish supply')}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary flex-1"
            >
              Get a quote
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
