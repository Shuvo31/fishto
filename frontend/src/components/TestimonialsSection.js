import { useState } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import useReveal from '@/hooks/use-reveal';

const testimonials = [
  {
    name: 'Rajesh Kumar',
    role: 'Hotel owner, Kolkata',
    text: 'FISHTO has been our go-to fish supplier for over a year. The quality is consistently excellent, and deliveries are always on time.',
    rating: 5,
  },
  {
    name: 'Priya Banerjee',
    role: 'Home customer',
    text: 'I order fresh fish from FISHTO every week. It is always fresh and tastes amazing, and their customer service is very responsive.',
    rating: 5,
  },
  {
    name: 'Amit Sharma',
    role: 'Restaurant manager',
    text: 'We switched to FISHTO last year and have not looked back. Bulk orders are handled smoothly, and the variety is impressive.',
    rating: 5,
  },
  {
    name: 'Sunita Das',
    role: 'Catering service owner',
    text: 'Large orders, delivered fresh, on time. FISHTO understands event-scale requirements perfectly.',
    rating: 5,
  },
  {
    name: 'Mohit Agarwal',
    role: 'Event planner',
    text: 'I have used FISHTO for multiple weddings and receptions. The fish was fresh every single time. Makes my job so much easier.',
    rating: 4,
  },
];

export default function TestimonialsSection() {
  const ref = useReveal();
  const [current, setCurrent] = useState(0);
  const total = testimonials.length;
  const t = testimonials[current];

  const go = (i) => setCurrent((i + total) % total);

  const onKeyDown = (e) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); go(current + 1); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); go(current - 1); }
  };

  return (
    <section
      id="testimonials"
      data-testid="testimonials-section"
      aria-labelledby="testimonials-title"
      ref={ref}
      className="bg-canvas py-20 sm:py-28"
    >
      <div className="container-apple">
        <div className="reveal text-center">
          <p className="eyebrow">Reviews</p>
          <h2 id="testimonials-title" className="headline mt-2">
            Loved at home. Trusted in kitchens.
          </h2>
        </div>

        <div
          className="reveal reveal-delay-1 mx-auto mt-14 max-w-[820px] text-center"
          role="group"
          aria-roledescription="carousel"
          aria-label="Customer reviews"
          tabIndex={0}
          onKeyDown={onKeyDown}
        >
          <figure
            key={current}
            className="animate-fade-up"
            aria-live="polite"
            aria-atomic="true"
            aria-roledescription="slide"
            aria-label={`${current + 1} of ${total}`}
          >
            <div className="flex justify-center gap-1" data-testid="testimonial-stars" aria-label={`Rated ${t.rating} out of 5`} role="img">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  aria-hidden="true"
                  className={`h-5 w-5 ${i < t.rating ? 'fill-fg text-fg' : 'text-fg/20'}`}
                />
              ))}
            </div>
            <blockquote
              data-testid="testimonial-text"
              className="mt-8 min-h-[150px] font-display text-lg font-semibold text-fg sm:min-h-[120px] sm:text-2xl"
            >
              “{t.text}”
            </blockquote>
            <figcaption className="mt-8">
              <p data-testid="testimonial-name" className="text-sm font-semibold text-fg">{t.name}</p>
              <p className="text-xs text-fg-muted">{t.role}</p>
            </figcaption>
          </figure>

          <div className="mt-10 flex items-center justify-center gap-6">
            <button
              type="button"
              data-testid="testimonial-prev-btn"
              onClick={() => go(current - 1)}
              aria-label="Previous review"
              className="flex h-9 w-9 items-center justify-center rounded-pill bg-fg/10 text-fg transition-colors duration-slow ease-apple hover:bg-fg/15"
            >
              <ChevronLeft className="h-5 w-5" aria-hidden="true" />
            </button>

            <div className="flex items-center" data-testid="testimonial-dots">
              {testimonials.map((item, i) => (
                <button
                  key={item.name}
                  type="button"
                  onClick={() => go(i)}
                  aria-label={`Show review ${i + 1} of ${total}`}
                  aria-current={i === current ? 'true' : undefined}
                  className="group flex h-9 items-center px-1"
                >
                  <span
                    className={`block h-2 rounded-pill transition-all duration-slow ease-apple ${
                      i === current ? 'w-6 bg-fg' : 'w-2 bg-fg/25 group-hover:bg-fg/50'
                    }`}
                  />
                </button>
              ))}
            </div>

            <button
              type="button"
              data-testid="testimonial-next-btn"
              onClick={() => go(current + 1)}
              aria-label="Next review"
              className="flex h-9 w-9 items-center justify-center rounded-pill bg-fg/10 text-fg transition-colors duration-slow ease-apple hover:bg-fg/15"
            >
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
