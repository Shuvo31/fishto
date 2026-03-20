import { useRef, useEffect } from 'react';
import { Home, Building2, UtensilsCrossed, ChefHat, PartyPopper, Package } from 'lucide-react';

const services = [
  {
    icon: Home,
    title: 'Household Supply',
    description: 'Fresh fish delivered straight to your home. Daily, weekly, or on-demand supply for families.',
    image: 'https://images.unsplash.com/photo-1764345960391-9b66a2541deb?crop=entropy&cs=srgb&fm=jpg&q=85&w=400',
  },
  {
    icon: Building2,
    title: 'Hotel Bulk Supply',
    description: 'Consistent, high-volume fresh fish supply for hotels. Reliable deliveries to meet your daily menu needs.',
    image: 'https://images.unsplash.com/photo-1772654271379-484eeabecc37?crop=entropy&cs=srgb&fm=jpg&q=85&w=400',
  },
  {
    icon: UtensilsCrossed,
    title: 'Restaurant Supply',
    description: 'Premium-grade fish for restaurants. From local favorites to exotic varieties, always fresh.',
    image: 'https://images.pexels.com/photos/3029526/pexels-photo-3029526.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=400&w=400',
  },
  {
    icon: ChefHat,
    title: 'Catering Service Supply',
    description: 'Large-scale fish supply for catering businesses. Timely delivery guaranteed for your events.',
    image: 'https://images.pexels.com/photos/229789/pexels-photo-229789.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=400&w=400',
  },
  {
    icon: PartyPopper,
    title: 'Event & Occasion Supply',
    description: 'Special fish supply for marriages, receptions, birthdays, and all celebrations.',
    image: 'https://images.unsplash.com/photo-1769611446060-e97e80d23063?crop=entropy&cs=srgb&fm=jpg&q=85&w=400',
  },
  {
    icon: Package,
    title: 'Custom Bulk Orders',
    description: 'Tailored bulk fish orders for marriage, reception, birthday, functions and more. Custom quantities available.',
    image: 'https://images.unsplash.com/photo-1767347898281-e4a21328e615?crop=entropy&cs=srgb&fm=jpg&q=85&w=400',
  },
];

export default function ServicesSection() {
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
      id="services"
      data-testid="services-section"
      ref={sectionRef}
      className="relative py-20 md:py-32 bg-slate-50"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="animate-on-scroll text-center mb-16">
          <span className="overline">What We Offer</span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-ocean-950 tracking-tight">
            Our Services
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-base md:text-lg text-slate-600 font-body leading-relaxed">
            From daily household needs to large-scale event supply, we cover every aspect of fresh fish delivery.
          </p>
        </div>

        {/* Services Grid */}
        <div className="stagger-children grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((service) => (
            <div
              key={service.title}
              data-testid={`service-card-${service.title.toLowerCase().replace(/\s+/g, '-')}`}
              className="card-3d group"
            >
              <div className="card-3d-inner bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-300">
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ocean-950/50 to-transparent" />
                  <div className="absolute bottom-4 left-4 w-12 h-12 rounded-xl bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg">
                    <service.icon className="w-6 h-6 text-ocean-950" />
                  </div>
                </div>
                {/* Content */}
                <div className="p-6">
                  <h3 className="text-lg font-heading font-semibold text-ocean-950 mb-2">
                    {service.title}
                  </h3>
                  <p className="text-sm font-body text-slate-600 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
