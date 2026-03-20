import { useRef, useEffect, useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Rajesh Kumar',
    role: 'Hotel Owner, Kolkata',
    text: 'FISHTO has been our go-to fish supplier for over a year. The quality is consistently excellent, and deliveries are always on time. Highly recommended for hotel businesses.',
    rating: 5,
  },
  {
    name: 'Priya Banerjee',
    role: 'Home Customer',
    text: 'I order fresh fish from FISHTO every week. The fish is always fresh and tastes amazing. Their customer service is very responsive and helpful.',
    rating: 5,
  },
  {
    name: 'Amit Sharma',
    role: 'Restaurant Manager',
    text: 'We switched to FISHTO last year and have not looked back. Bulk orders are handled smoothly, and the variety of fish available is impressive.',
    rating: 5,
  },
  {
    name: 'Sunita Das',
    role: 'Catering Service Owner',
    text: 'For our catering events, FISHTO provides exactly what we need. Large orders, delivered fresh, on time. They understand event-scale requirements perfectly.',
    rating: 5,
  },
  {
    name: 'Mohit Agarwal',
    role: 'Event Planner',
    text: 'I have used FISHTO for multiple wedding and reception events. Their fish supply was fresh every single time. Makes my job so much easier!',
    rating: 4,
  },
];

export default function TestimonialsSection() {
  const sectionRef = useRef(null);
  const [current, setCurrent] = useState(0);

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

  const next = () => setCurrent((p) => (p + 1) % testimonials.length);
  const prev = () => setCurrent((p) => (p - 1 + testimonials.length) % testimonials.length);

  const t = testimonials[current];

  return (
    <section
      id="testimonials"
      data-testid="testimonials-section"
      ref={sectionRef}
      className="relative py-20 md:py-32 bg-slate-50"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="animate-on-scroll text-center mb-16">
          <span className="overline">What They Say</span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-ocean-950 tracking-tight">
            Customer Testimonials
          </h2>
        </div>

        {/* Testimonial Card */}
        <div className="animate-on-scroll max-w-3xl mx-auto">
          <div className="relative bg-white rounded-3xl border border-slate-100 shadow-[0_15px_40px_-10px_rgba(0,0,0,0.08)] p-8 md:p-12">
            {/* Quote Icon */}
            <div className="absolute -top-5 left-8 w-10 h-10 rounded-full bg-aqua flex items-center justify-center shadow-lg">
              <Quote className="w-5 h-5 text-white" />
            </div>

            {/* Stars */}
            <div className="flex gap-1 mb-6" data-testid="testimonial-stars">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${i < t.rating ? 'text-amber-400 fill-amber-400' : 'text-slate-200'}`}
                />
              ))}
            </div>

            {/* Text */}
            <blockquote className="text-lg md:text-xl font-body text-slate-700 leading-relaxed mb-8 min-h-[80px]" data-testid="testimonial-text">
              "{t.text}"
            </blockquote>

            {/* Author */}
            <div className="flex items-center justify-between">
              <div>
                <p className="font-heading font-semibold text-ocean-950" data-testid="testimonial-name">{t.name}</p>
                <p className="text-sm font-body text-slate-500">{t.role}</p>
              </div>

              {/* Navigation */}
              <div className="flex gap-2">
                <button
                  data-testid="testimonial-prev-btn"
                  onClick={prev}
                  className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center hover:bg-ocean-950 hover:text-white hover:border-ocean-950 transition-all duration-200"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  data-testid="testimonial-next-btn"
                  onClick={next}
                  className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center hover:bg-ocean-950 hover:text-white hover:border-ocean-950 transition-all duration-200"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Dots */}
            <div className="flex gap-2 justify-center mt-6" data-testid="testimonial-dots">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-2 h-2 rounded-full transition-all duration-200 ${
                    i === current ? 'bg-aqua w-6' : 'bg-slate-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
