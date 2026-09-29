import { useState } from 'react';
import { Mail, Phone, MapPin, MessageCircle, CheckCircle2, ChevronDown, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import useReveal from '@/hooks/use-reveal';
import { SITE, whatsappLink } from '@/lib/site';

const orderTypes = [
  'Household supply',
  'Hotel bulk order',
  'Restaurant supply',
  'Catering order',
  'Event / marriage',
  'Custom bulk order',
];

const EMPTY = { name: '', phone: '', email: '', orderType: '', message: '' };
const MESSAGE_MAX = 500;

const contactMethods = [
  { icon: Phone, label: 'Call us', value: SITE.phoneDisplay, href: SITE.phoneHref, testId: 'contact-phone-link' },
  { icon: MessageCircle, label: 'WhatsApp', value: 'Chat with us', href: whatsappLink(), external: true },
  { icon: Mail, label: 'Email', value: SITE.email, href: `mailto:${SITE.email}`, testId: 'contact-email-link' },
  { icon: MapPin, label: 'Delivery area', value: 'Message us to confirm your location' },
];

const fieldClass =
  'block h-14 w-full border bg-canvas px-4 text-sm text-fg placeholder:text-fg-muted transition-colors duration-slow ease-apple focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30 disabled:opacity-40';

function validate(data) {
  const errors = {};
  if (!data.name.trim()) errors.name = 'Enter your name.';
  const digits = data.phone.replace(/\D/g, '');
  if (!digits) errors.phone = 'Enter your phone number.';
  else if (digits.length < 10 || digits.length > 12) errors.phone = 'Enter a valid 10-digit phone number.';
  if (data.email && !/^\S+@\S+\.\S+$/.test(data.email)) errors.email = 'Enter a valid email address.';
  return errors;
}

function Field({ id, label, required, error, children, hint }) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-xs font-semibold text-fg">
        {label}
        {required && <span className="text-fg-muted"> (required)</span>}
      </label>
      {children}
      {hint && !error && <p className="mt-1 text-xs text-fg-muted">{hint}</p>}
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-1 text-xs text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}

export default function ContactSection() {
  const ref = useReveal();
  const [data, setData] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');

  const update = (key) => (e) => {
    setData((d) => ({ ...d, [key]: e.target.value }));
    if (errors[key]) setErrors((errs) => ({ ...errs, [key]: undefined }));
  };

  const errorProps = (key) =>
    errors[key]
      ? { 'aria-invalid': true, 'aria-describedby': `contact-${key}-error`, className: `${fieldClass} border-destructive` }
      : { className: `${fieldClass} border-fg/15` };

  const handleSubmit = (e) => {
    e.preventDefault();
    const found = validate(data);
    setErrors(found);
    if (Object.keys(found).length) {
      toast.error('Please check the highlighted fields.');
      document.getElementById(`contact-${Object.keys(found)[0]}`)?.focus();
      return;
    }

    setStatus('loading');
    const lines = [
      'Hi FISHTO, I have an enquiry.',
      `Name: ${data.name.trim()}`,
      `Phone: ${data.phone.trim()}`,
      data.email && `Email: ${data.email.trim()}`,
      data.orderType && `Order type: ${data.orderType}`,
      data.message && `Details: ${data.message.trim()}`,
    ].filter(Boolean);

    window.open(whatsappLink(lines.join('\n')), '_blank', 'noopener,noreferrer');
    setStatus('success');
    toast.success('Your enquiry is ready to send on WhatsApp.');
    setTimeout(() => {
      setStatus('idle');
      setData(EMPTY);
    }, 5000);
  };

  return (
    <section id="contact" data-testid="contact-section" aria-labelledby="contact-title" ref={ref} className="bg-canvas py-20 sm:py-28">
      <div className="container-apple">
        <div className="grid gap-12 lg:grid-cols-5 lg:gap-16">
          <div className="reveal lg:col-span-2">
            <p className="eyebrow">Contact</p>
            <h2 id="contact-title" className="headline mt-2">
              Let's get your order moving.
            </h2>
            <p className="mt-4 text-sm text-fg-muted sm:text-base">
              Tell us what you need and we'll reply promptly with availability and a quote.
            </p>

            <ul className="mt-10 divide-y divide-border border-y border-border">
              {contactMethods.map((method) => {
                const content = (
                  <>
                    <method.icon className="h-5 w-5 flex-shrink-0 text-brand" aria-hidden="true" />
                    <span className="min-w-0">
                      <span className="block text-xs text-fg-muted">{method.label}</span>
                      <span className="block truncate text-sm text-fg">{method.value}</span>
                    </span>
                  </>
                );
                return (
                  <li key={method.label}>
                    {method.href ? (
                      <a
                        href={method.href}
                        data-testid={method.testId}
                        target={method.external ? '_blank' : undefined}
                        rel={method.external ? 'noopener noreferrer' : undefined}
                        className="flex items-center gap-4 py-4 transition-colors duration-slow ease-apple hover:text-brand-link"
                      >
                        {content}
                      </a>
                    ) : (
                      <div className="flex items-center gap-4 py-4">{content}</div>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="reveal reveal-delay-1 lg:col-span-3">
            <div className="bg-canvas-alt p-6 sm:p-10">
              {status === 'success' ? (
                <div className="py-16 text-center" data-testid="contact-form-success" role="status">
                  <CheckCircle2 className="mx-auto h-12 w-12 text-brand" strokeWidth={1.5} aria-hidden="true" />
                  <h3 className="mt-4 text-xl font-semibold text-fg">Almost there.</h3>
                  <p className="mt-2 text-sm text-fg-muted">
                    Hit send in WhatsApp and we'll get back to you shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-6" data-testid="contact-form" aria-busy={status === 'loading'}>
                  <div className="grid gap-6 sm:grid-cols-2">
                    <Field id="contact-name" label="Name" required error={errors.name}>
                      <input
                        id="contact-name"
                        data-testid="contact-name-input"
                        autoComplete="name"
                        placeholder="Full name"
                        maxLength={80}
                        value={data.name}
                        onChange={update('name')}
                        {...errorProps('name')}
                      />
                    </Field>
                    <Field id="contact-phone" label="Phone" required error={errors.phone}>
                      <input
                        id="contact-phone"
                        data-testid="contact-phone-input"
                        type="tel"
                        inputMode="tel"
                        autoComplete="tel"
                        placeholder="10-digit mobile number"
                        maxLength={16}
                        value={data.phone}
                        onChange={update('phone')}
                        {...errorProps('phone')}
                      />
                    </Field>
                  </div>

                  <Field id="contact-email" label="Email" error={errors.email}>
                    <input
                      id="contact-email"
                      data-testid="contact-email-input"
                      type="email"
                      autoComplete="email"
                      placeholder="name@example.com"
                      maxLength={120}
                      value={data.email}
                      onChange={update('email')}
                      {...errorProps('email')}
                    />
                  </Field>

                  <Field id="contact-order-type" label="Order type">
                    <div className="relative">
                      <select
                        id="contact-order-type"
                        data-testid="contact-order-type-select"
                        value={data.orderType}
                        onChange={update('orderType')}
                        className={`${fieldClass} appearance-none border-fg/15 pr-12 ${data.orderType ? '' : 'text-fg-muted'}`}
                      >
                        <option value="">Select an order type</option>
                        {orderTypes.map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-fg-muted" aria-hidden="true" />
                    </div>
                  </Field>

                  <Field id="contact-message" label="Message" hint={`${data.message.length}/${MESSAGE_MAX}`}>
                    <textarea
                      id="contact-message"
                      data-testid="contact-message-textarea"
                      placeholder="Varieties, quantity and delivery date"
                      rows={4}
                      maxLength={MESSAGE_MAX}
                      value={data.message}
                      onChange={update('message')}
                      className={`${fieldClass} h-auto resize-none border-fg/15 py-4`}
                    />
                  </Field>

                  <button
                    type="submit"
                    data-testid="contact-submit-btn"
                    disabled={status === 'loading'}
                    className="btn-primary w-full py-s15"
                  >
                    {status === 'loading' ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" /> Preparing…
                      </>
                    ) : (
                      'Send enquiry on WhatsApp'
                    )}
                  </button>
                  <p className="text-center text-xs text-fg-muted">
                    Opens WhatsApp with your details filled in. Nothing is sent until you tap send.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
