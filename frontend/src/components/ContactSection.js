import { useRef, useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

const orderTypes = [
  'Household Supply',
  'Hotel Bulk Order',
  'Restaurant Supply',
  'Catering Order',
  'Event / Marriage',
  'Custom Bulk Order',
];

export default function ContactSection() {
  const sectionRef = useRef(null);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    orderType: '',
    message: '',
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible');
        });
      },
      { threshold: 0.1 }
    );
    const el = sectionRef.current;
    if (el) {
      el.querySelectorAll('.animate-on-scroll').forEach((child) => observer.observe(child));
    }
    return () => observer.disconnect();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      toast.error('Please fill in your name and phone number.');
      return;
    }
    setSubmitted(true);
    toast.success('Thank you! We will get back to you shortly.');
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', phone: '', email: '', orderType: '', message: '' });
    }, 4000);
  };

  return (
    <section
      id="contact"
      data-testid="contact-section"
      ref={sectionRef}
      className="relative py-20 md:py-32 bg-slate-50"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Contact Info */}
          <div className="lg:col-span-2">
            <div className="animate-on-scroll">
              <span className="overline">Get In Touch</span>
              <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-ocean-950 tracking-tight leading-tight">
                Contact Us
              </h2>
              <p className="mt-4 text-base text-slate-600 font-body leading-relaxed">
                Have questions or need a quote? Reach out to us and we will respond promptly. We are here to serve you.
              </p>
            </div>

            <div className="animate-on-scroll mt-10 space-y-6">
              <a
                href="mailto:support@fishto.in"
                data-testid="contact-email-link"
                className="flex items-center gap-4 group"
              >
                <div className="w-12 h-12 rounded-xl bg-aqua/10 flex items-center justify-center group-hover:bg-aqua/20 transition-colors">
                  <Mail className="w-5 h-5 text-aqua-dark" />
                </div>
                <div>
                  <p className="text-xs font-body text-slate-500 uppercase tracking-wider">Email</p>
                  <p className="text-base font-body font-semibold text-ocean-950">support@fishto.in</p>
                </div>
              </a>

              <a
                href="tel:9748465789"
                data-testid="contact-phone-link"
                className="flex items-center gap-4 group"
              >
                <div className="w-12 h-12 rounded-xl bg-aqua/10 flex items-center justify-center group-hover:bg-aqua/20 transition-colors">
                  <Phone className="w-5 h-5 text-aqua-dark" />
                </div>
                <div>
                  <p className="text-xs font-body text-slate-500 uppercase tracking-wider">Phone</p>
                  <p className="text-base font-body font-semibold text-ocean-950">9748465789</p>
                </div>
              </a>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-aqua/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-aqua-dark" />
                </div>
                <div>
                  <p className="text-xs font-body text-slate-500 uppercase tracking-wider">Service Area</p>
                  <p className="text-base font-body font-semibold text-ocean-950">Pan-India Delivery</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-3">
            <div className="animate-on-scroll bg-white rounded-3xl border border-slate-100 shadow-[0_15px_40px_-10px_rgba(0,0,0,0.06)] p-8 md:p-10">
              {submitted ? (
                <div className="text-center py-12" data-testid="contact-form-success">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-emerald-600" />
                  </div>
                  <h3 className="text-xl font-heading font-semibold text-ocean-950 mb-2">
                    Message Sent!
                  </h3>
                  <p className="text-slate-600 font-body">
                    Thank you for reaching out. We will get back to you shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5" data-testid="contact-form">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-body font-medium text-slate-700 mb-1.5">
                        Name *
                      </label>
                      <Input
                        data-testid="contact-name-input"
                        placeholder="Your full name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="h-11 rounded-xl border-slate-200 font-body focus-visible:ring-aqua"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-body font-medium text-slate-700 mb-1.5">
                        Phone Number *
                      </label>
                      <Input
                        data-testid="contact-phone-input"
                        placeholder="Your phone number"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="h-11 rounded-xl border-slate-200 font-body focus-visible:ring-aqua"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-body font-medium text-slate-700 mb-1.5">
                      Email
                    </label>
                    <Input
                      data-testid="contact-email-input"
                      placeholder="your@email.com"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="h-11 rounded-xl border-slate-200 font-body focus-visible:ring-aqua"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-body font-medium text-slate-700 mb-1.5">
                      Order Type
                    </label>
                    <Select
                      onValueChange={(val) => setFormData({ ...formData, orderType: val })}
                      value={formData.orderType}
                    >
                      <SelectTrigger
                        data-testid="contact-order-type-select"
                        className="h-11 rounded-xl border-slate-200 font-body focus:ring-aqua"
                      >
                        <SelectValue placeholder="Select order type" />
                      </SelectTrigger>
                      <SelectContent data-testid="contact-order-type-options">
                        {orderTypes.map((type) => (
                          <SelectItem key={type} value={type} className="font-body">
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-body font-medium text-slate-700 mb-1.5">
                      Message
                    </label>
                    <Textarea
                      data-testid="contact-message-textarea"
                      placeholder="Tell us about your requirements..."
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="rounded-xl border-slate-200 font-body focus-visible:ring-aqua resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    data-testid="contact-submit-btn"
                    className="w-full h-12 rounded-xl bg-ocean-950 hover:bg-ocean-900 text-white font-body font-semibold text-base shadow-lg hover:shadow-xl transition-all duration-300 gap-2"
                  >
                    Send Message
                    <Send className="w-5 h-5" />
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
