import { MessageCircle } from 'lucide-react';
import { COMPANY } from '../data/company';

export function WhatsAppButton() {
  return (
    <a
      href={COMPANY.whatsappHref}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Chat with ${COMPANY.name} on WhatsApp at ${COMPANY.phoneDisplay}`}
      className="fixed bottom-5 right-5 z-40 inline-flex items-center gap-2.5 rounded-full bg-[#0B2545] hover:bg-[#13355E] text-white px-4 py-3 shadow-lg border border-white/15 transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F27405]"
    >
      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#25D366] text-white shrink-0">
        <MessageCircle className="h-4 w-4" aria-hidden="true" />
      </span>
      <span className="hidden sm:inline text-sm font-medium tracking-wide whitespace-nowrap">
        WhatsApp Us
      </span>
    </a>
  );
}
