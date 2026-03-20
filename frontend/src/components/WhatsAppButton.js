import { MessageCircle } from 'lucide-react';

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/919748465789?text=Hi%20FISHTO%2C%20I%20want%20to%20enquire%20about%20fresh%20fish%20supply"
      target="_blank"
      rel="noopener noreferrer"
      data-testid="whatsapp-floating-btn"
      className="fixed bottom-6 right-6 z-50 group"
      aria-label="Contact us on WhatsApp"
    >
      <div className="relative">
        {/* Pulse ring */}
        <div className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-20" />
        {/* Button */}
        <div className="relative w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-600 flex items-center justify-center shadow-[0_8px_24px_rgba(16,185,129,0.4)] hover:shadow-[0_8px_30px_rgba(16,185,129,0.55)] transition-all duration-300 hover:scale-110">
          <MessageCircle className="w-7 h-7 text-white" />
        </div>
        {/* Tooltip */}
        <div className="absolute bottom-full right-0 mb-3 px-3 py-1.5 bg-ocean-950 text-white text-xs font-body rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none shadow-lg">
          Chat on WhatsApp
          <div className="absolute top-full right-5 w-2 h-2 bg-ocean-950 rotate-45 -mt-1" />
        </div>
      </div>
    </a>
  );
}
