import { ChevronRight } from 'lucide-react';
import useReveal from '@/hooks/use-reveal';
import { whatsappLink } from '@/lib/site';

const services = [
  {
    title: 'Household supply',
    tagline: 'Fresh fish at your door. Daily, weekly or on demand.',
    image: 'https://images.unsplash.com/photo-1764345960391-9b66a2541deb?crop=entropy&cs=srgb&fm=jpg&q=80',
    alt: 'Fresh fish prepared for a family meal',
    tone: 'light',
  },
  {
    title: 'Hotel bulk supply',
    tagline: 'High-volume, consistent supply for daily menus.',
    image: 'https://images.unsplash.com/photo-1772654271379-484eeabecc37?crop=entropy&cs=srgb&fm=jpg&q=80',
    alt: 'Bulk crates of fresh fish ready for hotel kitchens',
    tone: 'dark',
  },
  {
    title: 'Restaurant supply',
    tagline: 'Premium-grade local favourites and exotic varieties.',
    image: 'https://images.pexels.com/photos/3029526/pexels-photo-3029526.jpeg?auto=compress&cs=tinysrgb',
    alt: 'Premium fish fillets on ice for restaurants',
    tone: 'dark',
  },
  {
    title: 'Catering supply',
    tagline: 'Large-scale orders, delivered on time for every event.',
    image: 'https://images.pexels.com/photos/229789/pexels-photo-229789.jpeg?auto=compress&cs=tinysrgb',
    alt: 'Whole fish on ice for catering orders',
    tone: 'light',
  },
  {
    title: 'Event & occasion supply',
    tagline: 'Marriages, receptions, birthdays and every celebration.',
    image: 'https://images.unsplash.com/photo-1769611446060-e97e80d23063?crop=entropy&cs=srgb&fm=jpg&q=80',
    alt: 'Fish dishes served at a celebration',
    tone: 'light',
  },
  {
    title: 'Custom bulk orders',
    tagline: 'Your quantity, your varieties. Tailored to the kilo.',
    image: 'https://images.unsplash.com/photo-1767347898281-e4a21328e615?crop=entropy&cs=srgb&fm=jpg&q=80',
    alt: 'Assorted fresh fish packed for a custom bulk order',
    tone: 'dark',
  },
];

const withWidth = (url, w) => `${url}&w=${w}`;

function ServiceTile({ service }) {
  const dark = service.tone === 'dark';
  return (
    <article
      data-testid={`service-card-${service.title.toLowerCase().replace(/[^a-z]+/g, '-')}`}
      className={`tile reveal flex flex-col overflow-hidden text-center ${
        dark ? 'on-dark bg-ink' : 'bg-canvas-alt'
      }`}
    >
      <div className="px-6 pt-12 sm:pt-14">
        <h3 className={`text-2xl font-semibold sm:text-3xl ${dark ? 'text-snow' : 'text-fg'}`}>
          {service.title}
        </h3>
        <p className={`mx-auto mt-2 max-w-[460px] text-sm sm:text-base ${dark ? 'text-snow/70' : 'text-fg-muted'}`}>
          {service.tagline}
        </p>
        <a
          href={whatsappLink(`Hi FISHTO, I would like a quote for ${service.title.toLowerCase()}`)}
          target="_blank"
          rel="noopener noreferrer"
          className="link-apple mt-4 text-sm"
          aria-label={`Get a quote for ${service.title.toLowerCase()} on WhatsApp`}
        >
          Get a quote
          <ChevronRight className="h-4 w-4" aria-hidden="true" />
        </a>
      </div>
      <div className="tile-media mt-8 aspect-[4/3] flex-grow overflow-hidden">
        <img
          src={withWidth(service.image, 900)}
          srcSet={`${withWidth(service.image, 600)} 600w, ${withWidth(service.image, 900)} 900w, ${withWidth(service.image, 1400)} 1400w`}
          sizes="(min-width: 768px) 50vw, 100vw"
          alt={service.alt}
          width="900"
          height="675"
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover"
        />
      </div>
    </article>
  );
}

export default function ServicesSection() {
  const ref = useReveal();

  return (
    <section id="services" data-testid="services-section" aria-labelledby="services-title" ref={ref} className="bg-canvas pb-3">
      <div className="container-apple reveal py-16 text-center sm:py-20">
        <p className="eyebrow">Services</p>
        <h2 id="services-title" className="headline mt-2">
          Every table, covered.
        </h2>
        <p className="subhead mx-auto mt-4 max-w-[640px]">
          From a family dinner to a 500-guest wedding, one supplier for every kind of order.
        </p>
      </div>

      <div className="container-wide grid gap-3 md:grid-cols-2">
        {services.map((service) => (
          <ServiceTile key={service.title} service={service} />
        ))}
      </div>
    </section>
  );
}
