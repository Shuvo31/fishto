import { Check } from 'lucide-react';
import useReveal from '@/hooks/use-reveal';

const promises = [
  'Freshness you can see and taste',
  'Hygienic handling from source to door',
  'Insulated, ice-packed delivery',
  'On-time, every time',
  'The same care for 1 kg or 500 kg',
];

export default function AboutSection() {
  const ref = useReveal();

  return (
    <section id="about" data-testid="about-section" aria-labelledby="about-title" ref={ref} className="bg-canvas py-20 sm:py-28">
      <div className="container-apple">
        <div className="reveal mx-auto max-w-[820px] text-center">
          <p className="eyebrow">About FISHTO</p>
          <h2 id="about-title" className="headline mt-2">
            Freshness isn't a feature.
            <br />
            <span className="text-fg-muted">It's the whole point.</span>
          </h2>
        </div>

        <div className="mt-16 grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="reveal overflow-hidden bg-canvas-alt">
            <img
              src="/images/about-packing.webp"
              alt="Gloved hands packing fresh katla steaks and a whole rohu on ice in an insulated box"
              width="864"
              height="1152"
              loading="lazy"
              decoding="async"
              className="aspect-[4/5] w-full object-cover"
            />
          </div>

          <div className="reveal reveal-delay-1">
            <p className="text-base text-fg sm:text-lg">
              FISHTO started in Kolkata in 2022 with one clear mission: deliver the freshest,
              highest-quality fish to every doorstep and business counter.
            </p>
            <p className="mt-4 text-sm text-fg-muted sm:text-base">
              Whether you're a family ordering for tonight's dinner or a hotel that needs a
              consistent daily supply, you get the same dedication — for regular orders and large
              event orders alike.
            </p>

            <h3 className="mt-10 text-sm font-semibold text-fg">Our promise</h3>
            <ul className="mt-4 divide-y divide-border border-y border-border">
              {promises.map((promise) => (
                <li key={promise} className="flex items-center gap-3 py-s15 text-sm text-fg">
                  <Check className="h-5 w-5 flex-shrink-0 text-brand" aria-hidden="true" />
                  {promise}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
