export const SITE = {
  name: 'FISHTO',
  url: 'https://fishto.in',
  email: 'support@fishto.in',
  phoneDisplay: '+91 97484 65789',
  phoneHref: 'tel:+919748465789',
  foundedYear: 2022,
};

export const whatsappLink = (message = 'Hi FISHTO, I want to enquire about fresh fish supply') =>
  `https://wa.me/919748465789?text=${encodeURIComponent(message)}`;

export const NAV_LINKS = [
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Why FISHTO', href: '#why-us' },
  { label: 'Occasions', href: '#occasions' },
  { label: 'Reviews', href: '#testimonials' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
];

export const scrollToHash = (event, href) => {
  const target = document.querySelector(href);
  if (!target) return;
  event.preventDefault();
  target.scrollIntoView({ behavior: 'smooth' });
  target.setAttribute('tabindex', '-1');
  target.focus({ preventScroll: true });
  window.history.replaceState(null, '', href);
};
