import { useRef, useEffect } from 'react';
import { Shield, Truck, Award, Clock } from 'lucide-react';

const highlights = [
  { icon: Shield, label: 'Hygienic & Fresh' },
  { icon: Truck, label: 'Timely Delivery' },
  { icon: Award, label: 'Premium Quality' },
  { icon: Clock, label: 'Since 2022' },
];

export default function AboutSection() {
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
      id="about"
      data-testid="about-section"
      ref={sectionRef}
      className="relative py-20 md:py-32 bg-white water-texture"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <div className="animate-on-scroll relative">
            <div className="relative rounded-3xl overflow-hidden shadow-[0_25px_50px_-12px_rgba(15,23,42,0.15)]">
              <img
                src="https://images.pexels.com/photos/3029526/pexels-photo-3029526.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                alt="Fresh salmon fillets on ice"
                className="w-full h-[400px] md:h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ocean-950/30 to-transparent" />
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-6 -right-4 md:right-8 glass rounded-2xl px-6 py-4 shadow-xl">
              <p className="font-accent text-xs tracking-widest text-aqua uppercase">Trusted Since</p>
              <p className="font-heading text-3xl font-bold text-ocean-950">2022</p>
            </div>
          </div>

          {/* Content */}
          <div>
            <div className="animate-on-scroll">
              <span className="overline">About Us</span>
              <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-ocean-950 tracking-tight leading-tight">
                Your Trusted Partner in<br />
                <span className="text-aqua-dark">Fresh Seafood Supply</span>
              </h2>
            </div>

            <div className="animate-on-scroll mt-6">
              <p className="text-base text-slate-600 font-body leading-relaxed">
                FISHTO started in 2022 with a clear mission: to deliver the freshest,
                highest-quality fish to every doorstep and business counter. We focus on
                freshness, quality, hygiene, timely delivery, and reliable service.
              </p>
              <p className="mt-4 text-base text-slate-600 font-body leading-relaxed">
                Whether you are a household looking for daily fresh fish or a hotel needing
                consistent bulk supply, FISHTO is your dependable partner. We handle both
                regular supply and large event orders with the same dedication to excellence.
              </p>
            </div>

            {/* Highlights */}
            <div className="animate-on-scroll mt-10 grid grid-cols-2 gap-4">
              {highlights.map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-3 bg-slate-50 rounded-xl px-4 py-3 border border-slate-100"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-aqua/10 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-aqua-dark" />
                  </div>
                  <span className="text-sm font-body font-semibold text-ocean-950">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
