import { ChevronRight } from 'lucide-react';
import useReveal from '@/hooks/use-reveal';
import { whatsappLink } from '@/lib/site';

const services = [
  {
    title: 'Household supply',
    tagline: 'Rohu and katla, cut the way your kitchen likes it. Daily, weekly or on demand.',
    image: '/images/service-household.webp',
    alt: 'Fresh rohu fish steaks on a banana leaf in a Kolkata home kitchen',
    tone: 'light',
  },
  {
    title: 'Hotel bulk supply',
    tagline: 'Crates of rohu and katla on ice, delivered fresh for your daily menus.',
    image: '/images/service-hotel.webp',
    alt: 'Crates of fresh rohu and katla on ice at a Kolkata wholesale fish market',
    tone: 'dark',
  },
  {
    title: 'Restaurant supply',
    tagline: 'Silver ilish and premium catch for menus that can’t compromise.',
    image: '/images/service-restaurant.webp',
    alt: 'Two whole fresh hilsa (ilish) fish on a banana leaf with green chillies',
    tone: 'dark',
  },
  {
    title: 'Catering supply',
    tagline: 'Golda chingri by the tray, delivered on time for every event.',
    image: '/images/service-catering.webp',
    alt: 'Trays of fresh golda chingri (giant river prawns) on ice in a catering kitchen',
    tone: 'light',
  },
  {
    title: 'Event & occasion supply',
    tagline: 'Shorshe ilish to chingri malai — the fish that makes a Bengali feast.',
    image: '/images/service-event.webp',
    alt: 'Bengali wedding thali with shorshe ilish, chingri malai curry and rice on a banana leaf',
    tone: 'light',
  },
  {
    title: 'Custom bulk orders',
    tagline: 'Hilsa, rohu, katla, prawns — your mix, your quantity, to the kilo.',
    image: '/images/service-custom.webp',
    alt: 'Assorted fresh hilsa, rohu, katla, golda and bagda prawns on ice',
    tone: 'dark',
  },
];

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
          src={service.image}
          alt={service.alt}
          width="1152"
          height="864"
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
