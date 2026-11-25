import { MessageCircle } from 'lucide-react';
import { COMPANY } from '../data/company';

export function WhatsAppButton() {
  return (
    <a
      href={COMPANY.whatsappHref}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Chat with ${COMPANY.name} on WhatsApp at ${COMPANY.phoneDisplay}`}
      className="fixed bottom-[78px] right-5 z-40 inline-flex items-center gap-2 rounded-full bg-white hover:bg-[#F6F8FB] text-[#0B2545] px-3.5 py-2 shadow-md border border-[#DCE3EC] transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F27405]"
    >
      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#25D366] text-white shrink-0">
        <MessageCircle className="h-3.5 w-3.5" aria-hidden="true" />
      </span>
      <span className="hidden sm:inline text-xs font-semibold tracking-wide whitespace-nowrap">
        WhatsApp
      </span>
    </a>
  );
}
