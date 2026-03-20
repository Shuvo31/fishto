import { useRef, useEffect } from 'react';
import { Droplets, Truck, ShoppingCart, CalendarCheck, Users, Star } from 'lucide-react';

const reasons = [
  {
    icon: Droplets,
    title: 'Fresh & Hygienic Fish',
    description: 'We ensure every fish is fresh, properly stored, and hygienically handled from source to delivery.',
  },
  {
    icon: Truck,
    title: 'Reliable Delivery',
    description: 'On-time, every time. Our delivery network ensures your fish arrives fresh and on schedule.',
  },
  {
    icon: ShoppingCart,
    title: 'Bulk Order Support',
    description: 'From 5 kg to 500 kg, we handle orders of all sizes with competitive bulk pricing.',
  },
  {
    icon: CalendarCheck,
    title: 'Serving Since 2022',
    description: 'Years of trusted service, building relationships with hundreds of satisfied customers.',
  },
  {
    icon: Users,
    title: 'Personal & Business',
    description: 'Equally suited for individual families and large commercial establishments.',
  },
  {
    icon: Star,
    title: 'Trusted for Events',
    description: 'Our event supply service is relied upon for marriages, receptions, and celebrations.',
  },
];

export default function WhyChooseUs() {
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
      id="why-us"
      data-testid="why-choose-us-section"
      ref={sectionRef}
      className="relative py-20 md:py-32 bg-ocean-950 overflow-hidden"
    >
      {/* Subtle texture */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, rgba(45,212,191,0.3) 0%, transparent 50%),
                           radial-gradient(circle at 75% 75%, rgba(14,165,233,0.2) 0%, transparent 50%)`
        }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="animate-on-scroll text-center mb-16">
          <span className="overline">Why FISHTO</span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-white tracking-tight">
            Why Choose Us
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-base md:text-lg text-slate-400 font-body leading-relaxed">
            FISHTO stands apart with a commitment to quality, reliability, and customer satisfaction.
          </p>
        </div>

        {/* Grid */}
        <div className="stagger-children grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {reasons.map((reason) => (
            <div
              key={reason.title}
              data-testid={`reason-card-${reason.title.toLowerCase().replace(/\s+/g, '-')}`}
              className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-12 h-12 rounded-xl bg-aqua/15 flex items-center justify-center mb-4 group-hover:bg-aqua/25 transition-colors duration-300">
                <reason.icon className="w-6 h-6 text-aqua" />
              </div>
              <h3 className="text-lg font-heading font-semibold text-white mb-2">
                {reason.title}
              </h3>
              <p className="text-sm font-body text-slate-400 leading-relaxed">
                {reason.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
