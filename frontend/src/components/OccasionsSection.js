import { Heart, GlassWater, Cake, Users, ChefHat, Sparkles } from 'lucide-react';
import useReveal from '@/hooks/use-reveal';
import { whatsappLink } from '@/lib/site';

const occasions = [
  { icon: Heart, title: 'Marriage', description: 'Premium fish for wedding feasts, from intimate to grand.' },
  { icon: GlassWater, title: 'Reception', description: 'Variety and volume to match every guest list.' },
  { icon: Cake, title: 'Birthday parties', description: 'Make the day special with custom fresh-fish orders.' },
  { icon: Users, title: 'Family events', description: 'Reliable supply for reunions and get-togethers.' },
  { icon: ChefHat, title: 'Catering orders', description: 'Bulk supply for large-scale and corporate functions.' },
  { icon: Sparkles, title: 'Festivals & functions', description: 'Fresh fish for every festive feast, all year round.' },
];

export default function OccasionsSection() {
  const ref = useReveal();

  return (
    <section
      id="occasions"
      data-testid="occasions-section"
      aria-labelledby="occasions-title"
      ref={ref}
      className="on-dark bg-ink py-20 sm:py-28"
    >
      <div className="container-apple">
        <div className="reveal mx-auto max-w-[760px] text-center">
          <p className="eyebrow text-brand-bright">Occasions</p>
          <h2 id="occasions-title" className="headline mt-2">
            Made for the moments that matter.
          </h2>
          <p className="subhead mt-4">
            Small gatherings or grand celebrations — fresh fish, on time, no matter the size.
          </p>
        </div>

        <ul className="reveal reveal-delay-1 mt-16 grid border-t border-snow/10 sm:grid-cols-2 lg:grid-cols-3">
          {occasions.map((occasion) => (
            <li
              key={occasion.title}
              data-testid={`occasion-card-${occasion.title.toLowerCase().replace(/[^a-z]+/g, '-')}`}
              className="border-b border-snow/10 px-2 py-8 sm:px-6"
            >
              <occasion.icon className="h-7 w-7 text-brand-bright" strokeWidth={1.5} aria-hidden="true" />
              <h3 className="mt-4 text-lg font-semibold text-snow">{occasion.title}</h3>
              <p className="mt-1 text-sm text-snow/70">{occasion.description}</p>
            </li>
          ))}
        </ul>

        <div className="reveal mt-14 text-center">
          <a
            href={whatsappLink('Hi FISHTO, I need fish supply for an event')}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="occasions-cta-btn"
            className="btn-primary"
          >
            Plan your event supply
          </a>
        </div>
      </div>
    </section>
  );
}
