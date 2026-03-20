import { useState, useEffect } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Why Us', href: '#why-us' },
  { label: 'Occasions', href: '#occasions' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = (href) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav
      data-testid="navbar"
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'glass shadow-[0_4px_30px_rgba(0,0,0,0.08)]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a
            href="#hero"
            data-testid="navbar-logo"
            className="flex items-center gap-2"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          >
            <span className="font-accent text-xl md:text-2xl font-bold tracking-wider text-ocean-950">
              FISHTO
            </span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                data-testid={`nav-link-${link.label.toLowerCase().replace(/\s/g, '-')}`}
                onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                className="text-sm font-body font-medium text-slate-600 hover:text-ocean-950 transition-colors duration-200 relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-aqua after:transition-all after:duration-300 hover:after:w-full"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <a href="tel:9748465789" data-testid="navbar-call-btn">
              <Button variant="outline" className="rounded-full border-slate-300 text-slate-700 hover:border-ocean-950 hover:text-ocean-950 gap-2 font-body text-sm">
                <Phone className="w-4 h-4" />
                Call Us
              </Button>
            </a>
            <a
              href="https://wa.me/919748465789"
              target="_blank"
              rel="noopener noreferrer"
              data-testid="navbar-whatsapp-btn"
            >
              <Button className="rounded-full bg-ocean-950 hover:bg-ocean-900 text-white font-body text-sm shadow-lg hover:shadow-xl transition-all duration-300">
                Get Quote
              </Button>
            </a>
          </div>

          {/* Mobile Toggle */}
          <button
            data-testid="mobile-menu-toggle"
            className="lg:hidden p-2 text-ocean-950"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div data-testid="mobile-menu" className="lg:hidden glass border-t border-slate-200/50">
          <div className="px-6 py-4 space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                data-testid={`mobile-nav-${link.label.toLowerCase().replace(/\s/g, '-')}`}
                onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                className="block py-2 text-sm font-body font-medium text-slate-700 hover:text-ocean-950 transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-3 flex gap-3">
              <a href="tel:9748465789" className="flex-1">
                <Button variant="outline" className="w-full rounded-full font-body text-sm">
                  <Phone className="w-4 h-4 mr-2" /> Call
                </Button>
              </a>
              <a href="https://wa.me/919748465789" target="_blank" rel="noopener noreferrer" className="flex-1">
                <Button className="w-full rounded-full bg-ocean-950 text-white font-body text-sm">
                  Get Quote
                </Button>
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
