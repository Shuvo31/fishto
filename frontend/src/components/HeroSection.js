import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, ChevronDown } from 'lucide-react';

export default function HeroSection() {
  const heroRef = useRef(null);

  useEffect(() => {
    const el = heroRef.current;
    if (el) el.classList.add('visible');
  }, []);

  return (
    <section
      id="hero"
      data-testid="hero-section"
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 parallax-bg"
        style={{
          backgroundImage: `url('https://images.pexels.com/photos/229789/pexels-photo-229789.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940')`,
        }}
      />
      {/* Overlay */}
      <div className="absolute inset-0 hero-overlay" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
        <div className="animate-fade-up" style={{ animationDelay: '0.1s' }}>
          <span className="overline inline-block mb-6 tracking-[0.3em]">
            EST 2022 &middot; FRESH CATCH
          </span>
        </div>

        <h1
          className="animate-fade-up text-4xl sm:text-5xl lg:text-7xl font-heading font-bold text-white leading-tight tracking-tight mb-6"
          style={{ animationDelay: '0.3s' }}
        >
          Fresh Fish Supply for<br />
          <span className="text-aqua">Homes, Hotels, Restaurants</span><br />
          <span className="text-white/90">& Events</span>
        </h1>

        <p
          className="animate-fade-up max-w-2xl mx-auto text-base md:text-lg text-slate-300 font-body leading-relaxed mb-10"
          style={{ animationDelay: '0.5s' }}
        >
          Since 2022, FISHTO has been supplying fresh, high-quality fish to individual
          customers, hotels, restaurants, catering services, and special occasions.
        </p>

        <div
          className="animate-fade-up flex flex-col sm:flex-row gap-4 justify-center"
          style={{ animationDelay: '0.7s' }}
        >
          <a href="#contact" onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }}>
            <Button
              data-testid="hero-contact-btn"
              className="shimmer-btn rounded-full bg-white text-ocean-950 hover:bg-slate-100 px-8 py-6 text-base font-body font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 gap-2"
            >
              Contact Us
              <ArrowRight className="w-5 h-5" />
            </Button>
          </a>
          <a href="https://wa.me/919748465789?text=Hi%20FISHTO%2C%20I%20want%20a%20bulk%20order%20quote" target="_blank" rel="noopener noreferrer">
            <Button
              data-testid="hero-quote-btn"
              className="rounded-full bg-aqua text-ocean-950 hover:bg-aqua-light px-8 py-6 text-base font-body font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 gap-2"
            >
              Get Bulk Order Quote
              <ArrowRight className="w-5 h-5" />
            </Button>
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
        <a
          href="#about"
          data-testid="hero-scroll-down"
          onClick={(e) => { e.preventDefault(); document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' }); }}
          className="flex flex-col items-center text-white/60 hover:text-white/90 transition-colors"
        >
          <span className="text-xs font-body tracking-widest uppercase mb-2">Scroll</span>
          <ChevronDown className="w-5 h-5" />
        </a>
      </div>
    </section>
  );
}
