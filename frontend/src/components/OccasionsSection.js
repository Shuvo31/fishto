import { useRef, useEffect } from 'react';
import { Heart, GlassWater, Cake, Users, ChefHat, Sparkles } from 'lucide-react';

const occasions = [
  { icon: Heart, title: 'Marriage', description: 'Premium fish supply for wedding feasts. We cater to small and grand celebrations alike.' },
  { icon: GlassWater, title: 'Reception', description: 'Fresh seafood for reception dinners. Variety and volume to match your guest list.' },
  { icon: Cake, title: 'Birthday Parties', description: 'Make birthday parties special with fresh fish dishes. Custom orders welcome.' },
  { icon: Users, title: 'Family Events', description: 'Family gatherings deserve the freshest catch. Reliable supply for reunions and get-togethers.' },
  { icon: ChefHat, title: 'Catering Orders', description: 'Bulk supply for catering companies handling large-scale events and corporate functions.' },
  { icon: Sparkles, title: 'Festival & Special Functions', description: 'From Diwali to Christmas feasts, we supply fresh fish for festival celebrations.' },
];

export default function OccasionsSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible');
        });
      },
      { threshold: 0.1 }
    );
    const el = sectionRef.current;
    if (el) {
      el.querySelectorAll('.animate-on-scroll, .stagger-children').forEach((child) =>
        observer.observe(child)
      );
    }
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="occasions"
      data-testid="occasions-section"
      ref={sectionRef}
      className="relative py-20 md:py-32 bg-white water-texture"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="animate-on-scroll text-center mb-16">
          <span className="overline">Events We Serve</span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-ocean-950 tracking-tight">
            Occasions We Serve
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-base md:text-lg text-slate-600 font-body leading-relaxed">
            We ensure timely and fresh fish supply for small and large occasions. No event is too big or too small for FISHTO.
          </p>
        </div>

        {/* Grid */}
        <div className="stagger-children grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {occasions.map((occasion, index) => (
            <div
              key={occasion.title}
              data-testid={`occasion-card-${occasion.title.toLowerCase().replace(/\s+/g, '-')}`}
              className="group relative bg-gradient-to-br from-slate-50 to-white rounded-2xl border border-slate-100 p-6 hover:shadow-[0_15px_40px_-10px_rgba(14,165,233,0.12)] transition-all duration-300 hover:-translate-y-1"
            >
              {/* Number */}
              <span className="absolute top-4 right-4 font-accent text-5xl font-bold text-slate-100 select-none group-hover:text-aqua/10 transition-colors duration-300">
                {String(index + 1).padStart(2, '0')}
              </span>

              <div className="relative">
                <div className="w-14 h-14 rounded-2xl bg-ocean-950 flex items-center justify-center mb-5 group-hover:bg-aqua-dark transition-colors duration-300 shadow-lg">
                  <occasion.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-lg font-heading font-semibold text-ocean-950 mb-2">
                  {occasion.title}
                </h3>
                <p className="text-sm font-body text-slate-600 leading-relaxed">
                  {occasion.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="animate-on-scroll text-center mt-14">
          <a
            href="https://wa.me/919748465789?text=Hi%20FISHTO%2C%20I%20need%20fish%20supply%20for%20an%20event"
            target="_blank"
            rel="noopener noreferrer"
            data-testid="occasions-cta-btn"
            className="inline-flex items-center gap-2 bg-ocean-950 text-white font-body font-semibold rounded-full px-8 py-4 shadow-xl hover:shadow-2xl hover:bg-ocean-900 transition-all duration-300 text-base"
          >
            Plan Your Event Supply
            <Sparkles className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
}
