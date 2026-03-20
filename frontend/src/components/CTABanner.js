import { useRef, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function CTABanner() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible');
        });
      },
      { threshold: 0.15 }
    );
    const el = sectionRef.current;
    if (el) {
      el.querySelectorAll('.animate-on-scroll').forEach((child) => observer.observe(child));
    }
    return () => observer.disconnect();
  }, []);

  return (
    <section
      data-testid="cta-banner-section"
      ref={sectionRef}
      className="relative py-20 md:py-28 overflow-hidden"
    >
      {/* Background */}
      <div
        className="absolute inset-0 parallax-bg"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1772654271379-484eeabecc37?crop=entropy&cs=srgb&fm=jpg&q=85')`,
        }}
      />
      <div className="absolute inset-0 bg-ocean-950/80" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
        <div className="animate-on-scroll">
          <span className="overline mb-4 inline-block">Ready to Order?</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-white tracking-tight mb-6">
            Get Fresh Fish Delivered<br />
            <span className="text-aqua">To Your Doorstep</span>
          </h2>
          <p className="text-base md:text-lg text-slate-300 font-body leading-relaxed mb-10 max-w-2xl mx-auto">
            Whether it is a daily household need or a grand wedding feast, FISHTO is ready to serve you with the freshest catch.
          </p>
        </div>

        <div className="animate-on-scroll flex flex-col sm:flex-row gap-4 justify-center">
          <a href="#contact" onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }}>
            <Button
              data-testid="cta-contact-btn"
              className="shimmer-btn rounded-full bg-white text-ocean-950 hover:bg-slate-100 px-8 py-6 text-base font-body font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 gap-2"
            >
              Contact Us Now
              <ArrowRight className="w-5 h-5" />
            </Button>
          </a>
          <a
            href="https://wa.me/919748465789?text=Hi%20FISHTO%2C%20I%20want%20a%20bulk%20order%20quote"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              data-testid="cta-whatsapp-btn"
              className="rounded-full bg-aqua text-ocean-950 hover:bg-aqua-light px-8 py-6 text-base font-body font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 gap-2"
            >
              WhatsApp Us
              <ArrowRight className="w-5 h-5" />
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}
