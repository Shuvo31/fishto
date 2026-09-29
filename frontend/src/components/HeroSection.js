import { ChevronRight, Phone } from 'lucide-react';
import { SITE, whatsappLink } from '@/lib/site';

const trustStats = [
  { value: '2022', label: 'Serving customers since' },
  { value: '5–500 kg', label: 'Bulk orders handled' },
  { value: 'On ice', label: 'Hygienic, insulated packing' },
  { value: 'On time', label: 'Scheduled daily delivery' },
];

export default function HeroSection() {
  return (
    <section id="top" data-testid="hero-section" aria-labelledby="hero-title" className="pt-12">
      <p className="bg-canvas-alt px-6 py-3 text-center text-xs text-fg">
        Planning a wedding or reception? Book your fish supply 3–5 days ahead.{' '}
        <a
          href={whatsappLink('Hi FISHTO, I need fish supply for an event')}
          target="_blank"
          rel="noopener noreferrer"
          className="link-apple"
        >
          Plan now
          <ChevronRight className="h-3 w-3" aria-hidden="true" />
        </a>
      </p>

      <div className="on-dark relative overflow-hidden bg-black">
        <div className="container-apple relative z-10 pt-14 text-center sm:pt-16">
          <h1 id="hero-title">
            <span className="block animate-fade-up text-sm font-semibold sm:text-lg">
              <span className="text-gradient-brand">Kolkata’s fresh fish supply</span>
            </span>
            <span
              className="mt-2 block animate-fade-up font-display text-display font-semibold text-snow sm:text-display-lg lg:text-hero"
              style={{ animationDelay: '80ms' }}
            >
              Fresh fish.
              <br />
              Delivered fresh.
            </span>
          </h1>

          <p
            className="mx-auto mt-4 max-w-[760px] animate-fade-up text-base text-snow/70 sm:text-lg"
            style={{ animationDelay: '160ms' }}
          >
            Hygienically handled, packed on ice and delivered on time — for homes, hotels,
            restaurants, catering and weddings.
          </p>

          <div
            className="mt-8 flex animate-fade-up flex-col items-center justify-center gap-4 sm:flex-row"
            style={{ animationDelay: '240ms' }}
          >
            <a
              href={whatsappLink('Hi FISHTO, I would like a quote for fresh fish supply')}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="hero-quote-btn"
              className="btn-primary min-w-[180px]"
            >
              Get a quote
            </a>
            <a href={SITE.phoneHref} data-testid="hero-contact-btn" className="btn-secondary min-w-[180px]">
              <Phone className="h-4 w-4" aria-hidden="true" />
              Call {SITE.phoneDisplay}
            </a>
          </div>
        </div>

        <div className="relative mx-auto mt-10 h-[clamp(260px,56vw,660px)] max-w-[1280px]" aria-hidden="true">
          <div className="absolute inset-x-[10%] bottom-0 top-[25%] rounded-pill bg-[radial-gradient(closest-side,rgba(0,113,227,0.45),rgba(0,113,227,0))] blur-2xl" />

          <p
            className="text-chrome absolute inset-x-0 top-0 animate-fade-up select-none text-center font-display font-semibold leading-none"
            style={{ fontSize: 'clamp(104px, 25vw, 360px)', letterSpacing: '-0.045em', animationDelay: '300ms' }}
          >
            FRESH
          </p>

          <div className="absolute bottom-0 left-1/2 w-[80%] max-w-[800px] -translate-x-1/2">
            <div className="animate-hero-rise" style={{ animationDelay: '420ms' }}>
              <picture>
                <source srcSet="/images/hero-fish.webp" type="image/webp" />
                <img
                  src="/images/hero-fish.png"
                  alt=""
                  width="995"
                  height="556"
                  fetchpriority="high"
                  decoding="async"
                  className="w-full animate-swim drop-shadow-[0_40px_60px_rgba(0,113,227,0.35)]"
                />
              </picture>
            </div>
          </div>
        </div>

        <div className="container-apple relative z-10">
          <dl
            data-testid="hero-trust"
            className="grid grid-cols-2 gap-y-8 border-t border-snow/10 py-12 text-center sm:py-14 lg:grid-cols-4"
          >
            {trustStats.map((stat) => (
              <div key={stat.label} className="flex flex-col-reverse px-4">
                <dt className="mt-1 text-xs text-snow/60">{stat.label}</dt>
                <dd className="font-display text-2xl font-semibold text-snow lg:text-3xl">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
