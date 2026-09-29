import { useCallback, useEffect, useRef, useState } from 'react';
import { Droplets, Truck, ShoppingCart, CalendarCheck, Users, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import useReveal from '@/hooks/use-reveal';

const reasons = [
  {
    icon: Droplets,
    title: 'Fresh and hygienic.',
    description: 'Every fish is properly stored and hygienically handled from source to delivery.',
  },
  {
    icon: Truck,
    title: 'Reliable delivery.',
    description: 'On time, every time. Our delivery network keeps your fish fresh and on schedule.',
  },
  {
    icon: ShoppingCart,
    title: 'Bulk made easy.',
    description: 'From 5 kg to 500 kg, orders of every size with competitive bulk pricing.',
  },
  {
    icon: CalendarCheck,
    title: 'Trusted since 2022.',
    description: 'Years of service and lasting relationships with hundreds of happy customers.',
  },
  {
    icon: Users,
    title: 'Homes and businesses.',
    description: 'Equally at home serving families and large commercial kitchens.',
  },
  {
    icon: Star,
    title: 'Relied on for events.',
    description: 'The go-to supply for marriages, receptions and celebrations of every size.',
  },
];

// Aligns the first card with the 1024px content column while letting cards bleed to the viewport edge.
const TRACK_INSET = 'max(24px, calc((100vw - 976px) / 2))';

export default function WhyChooseUs() {
  const ref = useReveal();
  const trackRef = useRef(null);
  const [edges, setEdges] = useState({ start: true, end: false });

  const updateEdges = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setEdges({
      start: el.scrollLeft <= 4,
      end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 4,
    });
  }, []);

  useEffect(() => {
    updateEdges();
    window.addEventListener('resize', updateEdges);
    return () => window.removeEventListener('resize', updateEdges);
  }, [updateEdges]);

  const scrollByCard = (direction) => {
    const el = trackRef.current;
    const card = el?.querySelector('li');
    if (!el || !card) return;
    el.scrollBy({ left: direction * (card.clientWidth + 16), behavior: 'smooth' });
  };

  return (
    <section
      id="why-us"
      data-testid="why-choose-us-section"
      aria-labelledby="why-title"
      ref={ref}
      className="overflow-hidden bg-canvas-alt py-20 sm:py-28"
    >
      <div className="container-apple reveal">
        <h2 id="why-title" className="headline">
          Why FISHTO.
          <span className="text-fg-muted"> The best catch for your table.</span>
        </h2>
      </div>

      <ul
        ref={trackRef}
        onScroll={updateEdges}
        tabIndex={0}
        aria-label="Reasons to choose FISHTO"
        style={{ paddingInline: TRACK_INSET, scrollPaddingInline: TRACK_INSET }}
        className="no-scrollbar reveal reveal-delay-1 mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-4"
      >
        {reasons.map((reason) => (
          <li
            key={reason.title}
            data-testid={`reason-card-${reason.title.toLowerCase().replace(/[^a-z]+/g, '-')}`}
            className="flex w-[280px] flex-shrink-0 snap-start flex-col bg-canvas p-8 transition-transform duration-slower ease-apple hover:-translate-y-1 sm:w-[320px]"
          >
            <reason.icon className="h-9 w-9 text-brand" strokeWidth={1.5} aria-hidden="true" />
            <h3 className="mt-6 text-lg font-semibold text-fg">{reason.title}</h3>
            <p className="mt-2 text-sm text-fg-muted">{reason.description}</p>
          </li>
        ))}
      </ul>

      <div className="container-apple mt-4 flex justify-end gap-3">
        <button
          type="button"
          onClick={() => scrollByCard(-1)}
          disabled={edges.start}
          aria-label="Previous reasons"
          className="flex h-9 w-9 items-center justify-center rounded-pill bg-fg/10 text-fg transition-colors duration-slow ease-apple hover:bg-fg/15 disabled:opacity-40 disabled:hover:bg-fg/10"
        >
          <ChevronLeft className="h-5 w-5" aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={() => scrollByCard(1)}
          disabled={edges.end}
          aria-label="Next reasons"
          className="flex h-9 w-9 items-center justify-center rounded-pill bg-fg/10 text-fg transition-colors duration-slow ease-apple hover:bg-fg/15 disabled:opacity-40 disabled:hover:bg-fg/10"
        >
          <ChevronRight className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>
    </section>
  );
}
