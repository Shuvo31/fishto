import { useRef, useEffect } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqs = [
  {
    question: 'What types of fish does FISHTO supply?',
    answer: 'We supply a wide variety of fresh fish including Rohu, Katla, Hilsa, Pomfret, Prawns, and many more. Our selection varies based on seasonal availability to ensure maximum freshness.',
  },
  {
    question: 'What is the minimum order quantity for bulk orders?',
    answer: 'For bulk orders, our minimum quantity starts at 5 kg. For event orders, we can customize quantities based on your specific requirements. Contact us for a custom quote.',
  },
  {
    question: 'How do you ensure the freshness of fish during delivery?',
    answer: 'We use insulated packaging with ice to maintain optimal temperature during transit. Our delivery network is designed for quick turnaround, ensuring fish reaches you in the freshest condition possible.',
  },
  {
    question: 'Do you deliver to all areas?',
    answer: 'We currently serve major areas in and around our operational region. For specific delivery availability to your location, please contact us via WhatsApp or phone.',
  },
  {
    question: 'How far in advance should I order for events?',
    answer: 'For large events like weddings or receptions, we recommend placing orders at least 3-5 days in advance. This allows us to source the best quality fish and ensure timely delivery.',
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept cash on delivery, UPI payments, and bank transfers. For bulk and corporate orders, we also offer credit terms on a case-by-case basis.',
  },
  {
    question: 'Can I get a custom order for a specific type of fish?',
    answer: 'Yes, we accommodate custom orders based on availability. Please reach out to us with your requirements and we will do our best to source the fish you need.',
  },
];

export default function FAQSection() {
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
      id="faq"
      data-testid="faq-section"
      ref={sectionRef}
      className="relative py-20 md:py-32 bg-white"
    >
      <div className="max-w-3xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="animate-on-scroll text-center mb-12">
          <span className="overline">Got Questions?</span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-ocean-950 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-base md:text-lg text-slate-600 font-body leading-relaxed">
            Find answers to common questions about our fish supply service.
          </p>
        </div>

        {/* Accordion */}
        <div className="animate-on-scroll">
          <Accordion type="single" collapsible className="space-y-3" data-testid="faq-accordion">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border border-slate-200 rounded-xl px-6 data-[state=open]:bg-slate-50 data-[state=open]:border-aqua/30 transition-colors duration-200"
                data-testid={`faq-item-${index}`}
              >
                <AccordionTrigger
                  className="text-left text-base font-body font-semibold text-ocean-950 hover:no-underline py-5"
                  data-testid={`faq-trigger-${index}`}
                >
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm font-body text-slate-600 leading-relaxed pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
