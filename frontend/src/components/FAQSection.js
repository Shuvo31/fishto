import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import useReveal from '@/hooks/use-reveal';

// Keep in sync with the FAQPage JSON-LD in public/index.html.
const faqs = [
  {
    question: 'What types of fish does FISHTO supply?',
    answer: 'We supply a wide variety of fresh fish including Rohu, Katla, Hilsa, Pomfret, Prawns and many more. Our selection varies with seasonal availability to ensure maximum freshness.',
  },
  {
    question: 'What is the minimum order quantity for bulk orders?',
    answer: 'Bulk orders start at 5 kg. For event orders, we customise quantities to your requirements. Contact us for a custom quote.',
  },
  {
    question: 'How do you keep the fish fresh during delivery?',
    answer: 'We use insulated packaging with ice to maintain the right temperature in transit, and our delivery network is designed for quick turnaround so fish reaches you in the freshest condition.',
  },
  {
    question: 'Do you deliver to my area?',
    answer: 'We serve major areas in and around our operating region. To confirm delivery to your location, message us on WhatsApp or give us a call.',
  },
  {
    question: 'How far in advance should I order for events?',
    answer: 'For large events like weddings or receptions, we recommend ordering at least 3–5 days in advance so we can source the best quality fish and guarantee on-time delivery.',
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept cash on delivery, UPI and bank transfers. For bulk and corporate orders, credit terms are available on a case-by-case basis.',
  },
  {
    question: 'Can I order a specific type of fish?',
    answer: 'Yes. We accommodate custom orders based on availability. Share your requirements and we will do our best to source the fish you need.',
  },
];

export default function FAQSection() {
  const ref = useReveal();

  return (
    <section id="faq" data-testid="faq-section" aria-labelledby="faq-title" ref={ref} className="bg-canvas-alt py-20 sm:py-28">
      <div className="container-apple max-w-[820px]">
        <div className="reveal text-center">
          <p className="eyebrow">FAQ</p>
          <h2 id="faq-title" className="headline mt-2">
            Questions? Answers.
          </h2>
        </div>

        <Accordion type="single" collapsible className="reveal reveal-delay-1 mt-12 border-t border-fg/15" data-testid="faq-accordion">
          {faqs.map((faq, index) => (
            <AccordionItem key={faq.question} value={`item-${index}`} className="border-b border-fg/15" data-testid={`faq-item-${index}`}>
              <AccordionTrigger
                data-testid={`faq-trigger-${index}`}
                className="gap-6 py-6 text-left font-display text-sm font-semibold text-fg hover:no-underline sm:text-base [&>svg]:h-5 [&>svg]:w-5 [&>svg]:text-fg-muted"
              >
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="pb-6 pr-10 text-sm text-fg-muted">{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
