import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from 'react';
import { Link } from 'react-router-dom';
import {
  AlertCircle,
  Briefcase,
  CheckCircle2,
  Info,
  Mail,
  MessageCircle,
  MessageSquare,
  Minus,
  Phone,
  Send,
  ShieldCheck,
  X,
} from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { COMPANY } from '../data/company';
import { LUXURY_EASE } from './MotionPrimitives';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  isError?: boolean;
  suggestLead?: boolean;
}

interface LeadFormState {
  fullName: string;
  companyName: string;
  email: string;
  phone: string;
  country: string;
  productOfInterest: string;
  estimatedQuantity: string;
  enquiryNature: string;
  notes: string;
  consentGiven: boolean;
}

interface LeadSubmissionResult {
  delivered: boolean;
  referenceId: string;
  message: string;
  submittedData: LeadFormState;
}

const INITIAL_GREETING =
  "Hello! I'm Pearl, Transpetro Energy's virtual assistant. Welcome! How may I assist you today?";

const CONVERSATION_STARTERS = [
  'What petroleum products do you supply?',
  'Do you supply AGO (Diesel)?',
  'Do you support international petroleum trading?',
  'Which industries do you serve?',
  'How can I request a quotation?',
  'How can I become a business partner?',
  'How can I contact Transpetro Energy?',
] as const;

const PRODUCT_OPTIONS = [
  'Automotive Gas Oil (AGO / Diesel)',
  'Bulk Diesel Sourcing & Supply',
  'Petroleum Products Trading',
  'Industrial & Commercial Supply',
  'International / Export Supply',
  'Other / General Petroleum Products',
] as const;

const ENQUIRY_NATURE_OPTIONS = [
  'Product Purchase / Quotation',
  'Bulk Diesel Supply',
  'International / Export Trading',
  'Business Partnership',
  'General Commercial Enquiry',
] as const;

const LEAD_TRIGGER_PATTERN =
  /\b(quote|quotation|price|pricing|buy|purchase|bulk|order|partner|partnership|export|supply|enquiry|enquire|contact|proposal|quantity|litres|liters|metric ton|mt)\b/i;

function createEmptyLeadForm(): LeadFormState {
  return {
    fullName: '',
    companyName: '',
    email: '',
    phone: '',
    country: '',
    productOfInterest: PRODUCT_OPTIONS[0],
    estimatedQuantity: '',
    enquiryNature: ENQUIRY_NATURE_OPTIONS[0],
    notes: '',
    consentGiven: false,
  };
}

function renderFormattedText(content: string) {
  const lines = content.split('\n');
  return (
    <div className="space-y-1.5">
      {lines.map((line, index) => {
        const trimmed = line.trim();
        if (!trimmed) {
          return null;
        }
        if (trimmed.startsWith('- ') || trimmed.startsWith('• ') || trimmed.startsWith('* ')) {
          return (
            <div key={index} className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#F27405] shrink-0" aria-hidden="true" />
              <span>{trimmed.slice(2)}</span>
            </div>
          );
        }
        return <p key={index}>{trimmed}</p>;
      })}
    </div>
  );
}

export function PearlAssistant() {
  const [widgetState, setWidgetState] = useState<'closed' | 'minimized' | 'open'>('closed');
  const [activeTab, setActiveTab] = useState<'chat' | 'enquiry'>('chat');
  const [showWelcomePrompt, setShowWelcomePrompt] = useState(false);
  const [welcomeDismissed, setWelcomeDismissed] = useState(false);

  const [aiConfigured, setAiConfigured] = useState<boolean | null>(null);
  const [emailConfigured, setEmailConfigured] = useState<boolean | null>(null);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'pearl-greeting',
      role: 'assistant',
      content: INITIAL_GREETING,
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isSending, setIsSending] = useState(false);

  const [leadForm, setLeadForm] = useState<LeadFormState>(createEmptyLeadForm);
  const [leadFieldErrors, setLeadFieldErrors] = useState<
    Partial<Record<keyof LeadFormState, string>>
  >({});
  const [leadSubmitError, setLeadSubmitError] = useState<string | null>(null);
  const [isSubmittingLead, setIsSubmittingLead] = useState(false);
  const [leadResult, setLeadResult] = useState<LeadSubmissionResult | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatInputRef = useRef<HTMLInputElement>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);
  const prefersReduced = useReducedMotion();

  // Fetch server-side Pearl configuration status (booleans only, zero secrets)
  useEffect(() => {
    let active = true;
    fetch('/api/pearl/status')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!active || !data) return;
        setAiConfigured(Boolean(data.aiConfigured));
        setEmailConfigured(Boolean(data.emailConfigured));
      })
      .catch(() => {
        if (active) {
          setAiConfigured(false);
          setEmailConfigured(false);
        }
      });
    return () => {
      active = false;
    };
  }, []);

  // Subtle non-intrusive welcome prompt after brief dwell
  useEffect(() => {
    if (welcomeDismissed || widgetState !== 'closed') {
      setShowWelcomePrompt(false);
      return;
    }
    const timer = window.setTimeout(() => {
      setShowWelcomePrompt(true);
    }, 3500);
    return () => window.clearTimeout(timer);
  }, [welcomeDismissed, widgetState]);

  // Auto-scroll conversation feed to latest message
  useEffect(() => {
    if (widgetState === 'open' && activeTab === 'chat') {
      messagesEndRef.current?.scrollIntoView({
        behavior: prefersReduced ? 'auto' : 'smooth',
      });
    }
  }, [messages, isSending, widgetState, activeTab, prefersReduced]);

  // Focus input when opening chat window
  useEffect(() => {
    if (widgetState === 'open' && activeTab === 'chat') {
      const focusTimer = window.setTimeout(() => {
        chatInputRef.current?.focus();
      }, 120);
      return () => window.clearTimeout(focusTimer);
    }
  }, [widgetState, activeTab]);

  // Keyboard Escape closes/minimizes open dialog
  useEffect(() => {
    if (widgetState !== 'open') return;
    const onKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === 'Escape') {
        setWidgetState('closed');
        launcherRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [widgetState]);

  function openWidget(tab: 'chat' | 'enquiry' = 'chat') {
    setWelcomeDismissed(true);
    setShowWelcomePrompt(false);
    setActiveTab(tab);
    setWidgetState('open');
  }

  function closeWidget() {
    setWidgetState('closed');
    window.setTimeout(() => launcherRef.current?.focus(), 60);
  }

  async function sendMessageText(rawText: string) {
    const trimmed = rawText.trim();
    if (!trimmed || isSending) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: trimmed,
    };

    const nextHistory = messages
      .filter((m) => m.id !== 'pearl-greeting' && !m.isError)
      .slice(-20)
      .map((m) => ({ role: m.role, content: m.content }));

    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setIsSending(true);

    try {
      const response = await fetch('/api/pearl/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: trimmed,
          history: nextHistory,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.ok) {
        const isUnconfigured = data.code === 'AI_NOT_CONFIGURED';
        if (isUnconfigured) {
          setAiConfigured(false);
        }
        setMessages((prev) => [
          ...prev,
          {
            id: `pearl-err-${Date.now()}`,
            role: 'assistant',
            content:
              data.error ||
              'Pearl is currently unable to reach the AI service. You may submit a business enquiry here or contact Transpetro Energy Limited directly.',
            isError: true,
            suggestLead: true,
          },
        ]);
        return;
      }

      const replyText = typeof data.reply === 'string' ? data.reply : '';
      const shouldSuggestLead =
        LEAD_TRIGGER_PATTERN.test(trimmed) || LEAD_TRIGGER_PATTERN.test(replyText);

      setMessages((prev) => [
        ...prev,
        {
          id: `pearl-${Date.now()}`,
          role: 'assistant',
          content: replyText,
          suggestLead: shouldSuggestLead,
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: `pearl-net-${Date.now()}`,
          role: 'assistant',
          content:
            'Unable to connect to the assistant service right now. You can still submit a business enquiry or reach our team directly by email or WhatsApp.',
          isError: true,
          suggestLead: true,
        },
      ]);
    } finally {
      setIsSending(false);
    }
  }

  function handleChatSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    void sendMessageText(inputValue);
  }

  function handleInputKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      void sendMessageText(inputValue);
    }
  }

  function validateLeadClient(state: LeadFormState): Partial<Record<keyof LeadFormState, string>> {
    const errors: Partial<Record<keyof LeadFormState, string>> = {};
    if (state.fullName.trim().length < 2) {
      errors.fullName = 'Please enter your full name.';
    }
    const hasEmail = state.email.trim().length > 0;
    const hasPhone = state.phone.trim().length > 0;
    if (!hasEmail && !hasPhone) {
      errors.email = 'Provide either a business email or telephone/WhatsApp number.';
      errors.phone = 'Provide either a business email or telephone/WhatsApp number.';
    }
    if (hasEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.email.trim())) {
      errors.email = 'Please enter a valid email address.';
    }
    if (hasPhone && (state.phone.trim().length < 7 || !/^[0-9+\-\s()]{7,40}$/.test(state.phone.trim()))) {
      errors.phone = 'Please enter a valid telephone or WhatsApp number.';
    }
    if (!state.consentGiven) {
      errors.consentGiven = 'Consent is required before submitting your details.';
    }
    return errors;
  }

  async function handleLeadSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLeadSubmitError(null);

    const errors = validateLeadClient(leadForm);
    if (Object.keys(errors).length > 0) {
      setLeadFieldErrors(errors);
      return;
    }

    setLeadFieldErrors({});
    setIsSubmittingLead(true);

    try {
      const response = await fetch('/api/pearl/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(leadForm),
      });
      const data = await response.json();

      if (!response.ok || !data.ok) {
        if (data.fieldErrors && typeof data.fieldErrors === 'object') {
          setLeadFieldErrors(data.fieldErrors);
        }
        setLeadSubmitError(
          data.error ||
            'Unable to submit your enquiry right now. Please contact Transpetro Energy directly.'
        );
        return;
      }

      setLeadResult({
        delivered: Boolean(data.delivered),
        referenceId: data.referenceId,
        message: data.message,
        submittedData: { ...leadForm },
      });
      setLeadForm(createEmptyLeadForm());
    } catch {
      setLeadSubmitError(
        'Could not reach the enquiry endpoint. Please email info.moore@transpetroenergy.org or use WhatsApp.'
      );
    } finally {
      setIsSubmittingLead(false);
    }
  }

  function buildLeadMailto(data: LeadFormState, refId: string): string {
    const subject = `[${refId}] ${data.enquiryNature} — ${data.fullName}`;
    const body = [
      `Reference ID: ${refId}`,
      `Full Name: ${data.fullName}`,
      `Company Name: ${data.companyName || 'Not provided'}`,
      `Business Email: ${data.email || 'Not provided'}`,
      `Telephone / WhatsApp: ${data.phone || 'Not provided'}`,
      `Country: ${data.country || 'Not provided'}`,
      `Product of Interest: ${data.productOfInterest || 'Not specified'}`,
      `Estimated Quantity: ${data.estimatedQuantity || 'Not specified'}`,
      `Nature of Enquiry: ${data.enquiryNature}`,
      '',
      'Notes:',
      data.notes || 'None provided',
    ].join('\n');
    return `mailto:${COMPANY.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  function buildLeadWhatsApp(data: LeadFormState, refId: string): string {
    const text = `Hello Transpetro Energy Limited (${refId}),\nName: ${data.fullName}\nCompany: ${
      data.companyName || 'N/A'
    }\nCountry: ${data.country || 'N/A'}\nProduct: ${data.productOfInterest}\nEstimated Qty: ${
      data.estimatedQuantity || 'TBD'
    }\nEnquiry: ${data.enquiryNature}\nEmail: ${data.email || 'N/A'}\nPhone: ${
      data.phone || 'N/A'
    }${data.notes ? `\nNotes: ${data.notes}` : ''}`;
    return `https://wa.me/${COMPANY.whatsappNumber}?text=${encodeURIComponent(text)}`;
  }

  const showStarters = messages.length <= 1;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-2.5">
      {/* Open Conversation Dialog */}
      <AnimatePresence>
        {widgetState === 'open' && (
          <motion.section
            role="dialog"
            aria-label="Pearl — Transpetro Energy AI Virtual Assistant"
            aria-modal="false"
            initial={prefersReduced ? false : { opacity: 0, y: 18, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={prefersReduced ? undefined : { opacity: 0, y: 14, scale: 0.97 }}
            transition={{ duration: 0.26, ease: LUXURY_EASE }}
            className="w-[calc(100vw-2rem)] sm:w-[400px] md:w-[420px] max-h-[min(640px,calc(100vh-5.5rem))] flex flex-col rounded-2xl bg-white border border-[#DCE3EC] shadow-2xl overflow-hidden"
          >
            {/* Navy Blue Corporate Header with Gold/Orange Accent */}
            <header className="bg-[#071A33] text-white shrink-0">
              <div
                className="gold-accent-bar h-1 w-full bg-gradient-to-r from-[#F5B800] via-[#F27405] to-[#F5B800]"
                aria-hidden="true"
              />
              <div className="px-4 py-3.5 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="relative h-10 w-10 rounded-full bg-white border-2 border-[#F5B800] flex items-center justify-center p-1.5 shrink-0">
                    <img
                      src={COMPANY.logoEmblem}
                      alt=""
                      aria-hidden="true"
                      className="h-full w-auto object-contain"
                    />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h2 className="font-display text-sm font-bold tracking-wide text-white truncate">
                        PEARL
                      </h2>
                      <span className="text-[11px] text-[#F5B800] font-medium whitespace-nowrap">
                        · AI Online
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 truncate">
                      Transpetro Energy AI Virtual Assistant
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  <button
                    type="button"
                    onClick={() => setWidgetState('minimized')}
                    aria-label="Minimise Pearl chat window"
                    className="h-9 w-9 inline-flex items-center justify-center rounded-md text-slate-300 hover:text-white hover:bg-white/10 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F5B800] cursor-pointer"
                  >
                    <Minus className="h-4 w-4" aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={closeWidget}
                    aria-label="Close Pearl chat window"
                    className="h-9 w-9 inline-flex items-center justify-center rounded-md text-slate-300 hover:text-white hover:bg-white/10 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F5B800] cursor-pointer"
                  >
                    <X className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
              </div>

              {/* Functional Mode Switcher: Chat vs Business Enquiry */}
              <div className="px-4 pb-3">
                <div
                  role="tablist"
                  aria-label="Pearl assistant modes"
                  className="grid grid-cols-2 gap-1 p-1 rounded-lg bg-white/10"
                >
                  <button
                    type="button"
                    role="tab"
                    aria-selected={activeTab === 'chat'}
                    onClick={() => setActiveTab('chat')}
                    className={`inline-flex items-center justify-center gap-1.5 py-1.5 px-3 text-xs font-semibold rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                      activeTab === 'chat'
                        ? 'bg-white text-[#0B2545]'
                        : 'text-slate-200 hover:text-white'
                    }`}
                  >
                    <MessageSquare className="h-3.5 w-3.5" aria-hidden="true" />
                    Chat with Pearl
                  </button>
                  <button
                    type="button"
                    role="tab"
                    aria-selected={activeTab === 'enquiry'}
                    onClick={() => setActiveTab('enquiry')}
                    className={`inline-flex items-center justify-center gap-1.5 py-1.5 px-3 text-xs font-semibold rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                      activeTab === 'enquiry'
                        ? 'bg-white text-[#0B2545]'
                        : 'text-slate-200 hover:text-white'
                    }`}
                  >
                    <Briefcase className="h-3.5 w-3.5" aria-hidden="true" />
                    Business Enquiry
                  </button>
                </div>
              </div>
            </header>

            {/* TAB 1: AI Conversation Area */}
            {activeTab === 'chat' ? (
              <>
                <div
                  role="log"
                  aria-live="polite"
                  aria-label="Conversation with Pearl"
                  className="flex-1 overflow-y-auto bg-white px-4 py-4 space-y-4 min-h-[260px]"
                >
                  {/* Graceful notice when AI service credentials are not yet configured */}
                  {aiConfigured === false && (
                    <div className="rounded-xl bg-amber-50 border border-amber-200 p-3.5 text-xs text-amber-950 space-y-2">
                      <div className="flex items-start gap-2.5">
                        <Info className="h-4 w-4 text-amber-700 shrink-0 mt-0.5" aria-hidden="true" />
                        <div className="space-y-1">
                          <p className="font-semibold text-amber-950">
                            Live AI Service Configuration Pending
                          </p>
                          <p className="text-amber-900 leading-relaxed">
                            Pearl’s automated AI conversation engine requires server-side AI
                            provider credentials before live replies can be generated. You can
                            submit a structured commercial request right now via the{' '}
                            <button
                              type="button"
                              onClick={() => setActiveTab('enquiry')}
                              className="font-semibold underline text-[#0B2545] cursor-pointer"
                            >
                              Business Enquiry
                            </button>{' '}
                            tab or reach Transpetro Energy directly.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${
                        msg.role === 'user' ? 'items-end' : 'items-start'
                      }`}
                    >
                      <div
                        className={`max-w-[88%] rounded-xl px-3.5 py-2.5 text-sm leading-relaxed ${
                          msg.role === 'user'
                            ? 'bg-[#0B2545] text-white'
                            : msg.isError
                            ? 'bg-amber-50 text-amber-950 border border-amber-200'
                            : 'bg-[#F6F8FB] text-[#0B2545] border border-[#DCE3EC]'
                        }`}
                      >
                        {msg.role === 'assistant' ? (
                          renderFormattedText(msg.content)
                        ) : (
                          <p>{msg.content}</p>
                        )}
                      </div>

                      {msg.suggestLead && (
                        <div className="mt-2 flex flex-wrap items-center gap-2">
                          <button
                            type="button"
                            onClick={() => setActiveTab('enquiry')}
                            className="inline-flex items-center gap-1.5 rounded-md bg-[#F27405] hover:bg-[#DC620B] text-white text-xs font-semibold px-3 py-1.5 transition-colors cursor-pointer"
                          >
                            <Briefcase className="h-3.5 w-3.5" aria-hidden="true" />
                            Submit Business Enquiry
                          </button>
                          <a
                            href={COMPANY.emailHref}
                            className="inline-flex items-center gap-1 text-xs font-medium text-[#0B2545] hover:text-[#DC620B] underline"
                          >
                            Email Team
                          </a>
                          <a
                            href={COMPANY.phoneHref}
                            className="inline-flex items-center gap-1 text-xs font-medium text-[#0B2545] hover:text-[#DC620B] underline tabular-nums"
                          >
                            Call {COMPANY.phoneDisplay}
                          </a>
                        </div>
                      )}
                    </div>
                  ))}

                  {/* Clickable Conversation Starters */}
                  {showStarters && (
                    <div className="pt-1 space-y-2">
                      <p className="text-xs font-semibold text-slate-500">
                        Suggested questions
                      </p>
                      <div className="flex flex-col gap-1.5">
                        {CONVERSATION_STARTERS.map((starter) => (
                          <button
                            key={starter}
                            type="button"
                            onClick={() => void sendMessageText(starter)}
                            disabled={isSending}
                            className="text-left text-xs sm:text-[13px] font-medium text-[#0B2545] bg-[#F6F8FB] hover:bg-[#EDF1F6] hover:border-[#0B2545]/35 border border-[#DCE3EC] rounded-lg px-3 py-2 transition-colors cursor-pointer disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#F27405]"
                          >
                            {starter}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {isSending && (
                    <div className="flex items-start">
                      <div className="rounded-xl bg-[#F6F8FB] border border-[#DCE3EC] px-3.5 py-2.5 text-xs font-medium text-slate-600">
                        Pearl is preparing a response...
                      </div>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* Chat Composer */}
                <form
                  onSubmit={handleChatSubmit}
                  className="shrink-0 border-t border-[#DCE3EC] bg-white px-3.5 py-3 space-y-2"
                >
                  <div className="flex items-center gap-2">
                    <label htmlFor="pearl-chat-input" className="sr-only">
                      Type your message to Pearl
                    </label>
                    <input
                      ref={chatInputRef}
                      id="pearl-chat-input"
                      type="text"
                      maxLength={1000}
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyDown={handleInputKeyDown}
                      placeholder="Ask Pearl about diesel supply, trading, or enquiries..."
                      className="flex-1 min-w-0 rounded-lg border border-[#CBD5E1] bg-white px-3.5 py-2.5 text-sm text-[#0B2545] placeholder:text-slate-400 focus:outline-none focus:border-[#0B2545] focus:ring-2 focus:ring-[#0B2545]/15"
                    />
                    <button
                      type="submit"
                      disabled={isSending || inputValue.trim().length === 0}
                      aria-label="Send message to Pearl"
                      className="h-10 w-10 shrink-0 inline-flex items-center justify-center rounded-lg bg-[#F27405] hover:bg-[#DC620B] disabled:opacity-50 text-white transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0B2545]"
                    >
                      <Send className="h-4 w-4" aria-hidden="true" />
                    </button>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-500">
                    <span>AI assistant · Verified company info only</span>
                    <Link
                      to="/contact"
                      onClick={() => setWidgetState('minimized')}
                      className="font-medium text-[#0B2545] hover:text-[#DC620B] transition-colors"
                    >
                      Full Contact Page
                    </Link>
                  </div>
                </form>
              </>
            ) : (
              /* TAB 2: Business Lead Generation Form with Explicit Purpose, Privacy Notice & Consent */
              <div className="flex-1 overflow-y-auto bg-white px-4 py-4 space-y-4">
                <div className="space-y-1">
                  <h3 className="font-display text-base font-bold text-[#0B2545]">
                    Submit a Commercial Enquiry
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Share your business requirements so the Transpetro Energy Limited commercial
                    desk can review your enquiry and follow up directly. Only your name, one contact
                    method, and consent are required.
                  </p>
                </div>

                {/* Clear Privacy Notice */}
                <div className="rounded-lg bg-[#F6F8FB] border border-[#DCE3EC] p-3 flex items-start gap-2.5 text-[11px] text-slate-600 leading-relaxed">
                  <ShieldCheck className="h-4 w-4 text-[#0B2545] shrink-0 mt-0.5" aria-hidden="true" />
                  <span>
                    <strong className="text-[#0B2545]">Privacy Notice:</strong> Your details are
                    used solely to respond to your business enquiry with Transpetro Energy Limited.
                    Do not include passwords, bank details, or unnecessary personal information.
                  </span>
                </div>

                {emailConfigured === false && !leadResult && (
                  <div className="rounded-lg bg-amber-50 border border-amber-200 p-3 text-[11px] text-amber-950 leading-relaxed">
                    Automated email delivery (SMTP) is not yet configured on this server. After
                    validation, Pearl will assign a reference number and provide one-click email and
                    WhatsApp dispatch options.
                  </div>
                )}

                {leadResult && (
                  <div
                    role="status"
                    className={`rounded-xl border p-3.5 text-xs space-y-2 ${
                      leadResult.delivered
                        ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                        : 'bg-[#F6F8FB] border-[#0B2545]/25 text-[#0B2545]'
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      {leadResult.delivered ? (
                        <CheckCircle2 className="h-4 w-4 text-emerald-700 shrink-0 mt-0.5" aria-hidden="true" />
                      ) : (
                        <Info className="h-4 w-4 text-[#DC620B] shrink-0 mt-0.5" aria-hidden="true" />
                      )}
                      <div className="space-y-1.5">
                        <p className="font-bold text-sm">
                          {leadResult.delivered
                            ? 'Enquiry Delivered Successfully'
                            : 'Enquiry Validated — Direct Dispatch Required'}
                        </p>
                        <p className="tabular-nums font-medium">
                          Reference: <span className="font-bold">{leadResult.referenceId}</span>
                        </p>
                        <p className="leading-relaxed">{leadResult.message}</p>

                        {!leadResult.delivered && (
                          <div className="pt-1.5 flex flex-wrap gap-2">
                            <a
                              href={buildLeadMailto(leadResult.submittedData, leadResult.referenceId)}
                              className="inline-flex items-center gap-1.5 rounded-md bg-[#0B2545] hover:bg-[#13355E] text-white font-semibold px-3 py-1.5 transition-colors"
                            >
                              <Mail className="h-3.5 w-3.5" aria-hidden="true" />
                              Send via Email
                            </a>
                            <a
                              href={buildLeadWhatsApp(leadResult.submittedData, leadResult.referenceId)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 rounded-md bg-[#F27405] hover:bg-[#DC620B] text-white font-semibold px-3 py-1.5 transition-colors"
                            >
                              <MessageCircle className="h-3.5 w-3.5" aria-hidden="true" />
                              Send via WhatsApp
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {leadSubmitError && (
                  <div
                    role="alert"
                    className="rounded-lg bg-red-50 border border-red-200 p-3 flex items-start gap-2 text-xs text-red-900"
                  >
                    <AlertCircle className="h-4 w-4 text-red-600 shrink-0 mt-0.5" aria-hidden="true" />
                    <span>{leadSubmitError}</span>
                  </div>
                )}

                <form onSubmit={handleLeadSubmit} noValidate className="space-y-3 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label htmlFor="pearl-fullName" className="block font-semibold text-[#0B2545] mb-1">
                        Full Name <span className="text-[#DC620B]">*</span>
                      </label>
                      <input
                        id="pearl-fullName"
                        type="text"
                        required
                        value={leadForm.fullName}
                        onChange={(e) => setLeadForm({ ...leadForm, fullName: e.target.value })}
                        placeholder="Your full name"
                        className={`w-full rounded-md border px-3 py-2 text-xs text-[#0B2545] focus:outline-none focus:border-[#0B2545] ${
                          leadFieldErrors.fullName ? 'border-red-500' : 'border-[#CBD5E1]'
                        }`}
                      />
                      {leadFieldErrors.fullName && (
                        <p className="mt-1 text-[11px] text-red-600">{leadFieldErrors.fullName}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="pearl-companyName" className="block font-semibold text-[#0B2545] mb-1">
                        Company Name
                      </label>
                      <input
                        id="pearl-companyName"
                        type="text"
                        value={leadForm.companyName}
                        onChange={(e) => setLeadForm({ ...leadForm, companyName: e.target.value })}
                        placeholder="Optional"
                        className="w-full rounded-md border border-[#CBD5E1] px-3 py-2 text-xs text-[#0B2545] focus:outline-none focus:border-[#0B2545]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label htmlFor="pearl-email" className="block font-semibold text-[#0B2545] mb-1">
                        Business Email
                      </label>
                      <input
                        id="pearl-email"
                        type="email"
                        value={leadForm.email}
                        onChange={(e) => setLeadForm({ ...leadForm, email: e.target.value })}
                        placeholder="name@company.com"
                        className={`w-full rounded-md border px-3 py-2 text-xs text-[#0B2545] focus:outline-none focus:border-[#0B2545] ${
                          leadFieldErrors.email ? 'border-red-500' : 'border-[#CBD5E1]'
                        }`}
                      />
                      {leadFieldErrors.email && (
                        <p className="mt-1 text-[11px] text-red-600">{leadFieldErrors.email}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="pearl-phone" className="block font-semibold text-[#0B2545] mb-1">
                        Phone / WhatsApp
                      </label>
                      <input
                        id="pearl-phone"
                        type="tel"
                        value={leadForm.phone}
                        onChange={(e) => setLeadForm({ ...leadForm, phone: e.target.value })}
                        placeholder="+234 ..."
                        className={`w-full rounded-md border px-3 py-2 text-xs text-[#0B2545] focus:outline-none focus:border-[#0B2545] ${
                          leadFieldErrors.phone ? 'border-red-500' : 'border-[#CBD5E1]'
                        }`}
                      />
                      {leadFieldErrors.phone && (
                        <p className="mt-1 text-[11px] text-red-600">{leadFieldErrors.phone}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label htmlFor="pearl-country" className="block font-semibold text-[#0B2545] mb-1">
                        Country
                      </label>
                      <input
                        id="pearl-country"
                        type="text"
                        value={leadForm.country}
                        onChange={(e) => setLeadForm({ ...leadForm, country: e.target.value })}
                        placeholder="e.g. Nigeria"
                        className="w-full rounded-md border border-[#CBD5E1] px-3 py-2 text-xs text-[#0B2545] focus:outline-none focus:border-[#0B2545]"
                      />
                    </div>

                    <div>
                      <label htmlFor="pearl-quantity" className="block font-semibold text-[#0B2545] mb-1">
                        Estimated Quantity
                      </label>
                      <input
                        id="pearl-quantity"
                        type="text"
                        value={leadForm.estimatedQuantity}
                        onChange={(e) =>
                          setLeadForm({ ...leadForm, estimatedQuantity: e.target.value })
                        }
                        placeholder="Optional (e.g. litres / MT)"
                        className="w-full rounded-md border border-[#CBD5E1] px-3 py-2 text-xs text-[#0B2545] focus:outline-none focus:border-[#0B2545]"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="pearl-product" className="block font-semibold text-[#0B2545] mb-1">
                      Product of Interest
                    </label>
                    <select
                      id="pearl-product"
                      value={leadForm.productOfInterest}
                      onChange={(e) =>
                        setLeadForm({ ...leadForm, productOfInterest: e.target.value })
                      }
                      className="w-full rounded-md border border-[#CBD5E1] bg-white px-3 py-2 text-xs text-[#0B2545] focus:outline-none focus:border-[#0B2545]"
                    >
                      {PRODUCT_OPTIONS.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="pearl-nature" className="block font-semibold text-[#0B2545] mb-1">
                      Nature of Enquiry
                    </label>
                    <select
                      id="pearl-nature"
                      value={leadForm.enquiryNature}
                      onChange={(e) =>
                        setLeadForm({ ...leadForm, enquiryNature: e.target.value })
                      }
                      className="w-full rounded-md border border-[#CBD5E1] bg-white px-3 py-2 text-xs text-[#0B2545] focus:outline-none focus:border-[#0B2545]"
                    >
                      {ENQUIRY_NATURE_OPTIONS.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="pearl-notes" className="block font-semibold text-[#0B2545] mb-1">
                      Additional Details (Optional)
                    </label>
                    <textarea
                      id="pearl-notes"
                      rows={2}
                      value={leadForm.notes}
                      onChange={(e) => setLeadForm({ ...leadForm, notes: e.target.value })}
                      placeholder="Delivery location, preferred schedule, or partnership scope..."
                      className="w-full rounded-md border border-[#CBD5E1] px-3 py-2 text-xs text-[#0B2545] focus:outline-none focus:border-[#0B2545]"
                    />
                  </div>

                  <div>
                    <label className="flex items-start gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={leadForm.consentGiven}
                        onChange={(e) =>
                          setLeadForm({ ...leadForm, consentGiven: e.target.checked })
                        }
                        className="mt-0.5 h-4 w-4 rounded border-[#CBD5E1] accent-[#0B2545]"
                      />
                      <span className="text-[11px] text-slate-700 leading-relaxed">
                        I consent to Transpetro Energy Limited using these details solely to respond
                        to my commercial enquiry. <span className="text-[#DC620B]">*</span>
                      </span>
                    </label>
                    {leadFieldErrors.consentGiven && (
                      <p className="mt-1 text-[11px] text-red-600">
                        {leadFieldErrors.consentGiven}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmittingLead}
                    className="cta-sheen w-full inline-flex items-center justify-center gap-2 rounded-md bg-[#F27405] hover:bg-[#DC620B] disabled:opacity-60 text-white font-semibold text-xs py-2.5 px-4 transition-colors cursor-pointer"
                  >
                    <Send className="h-3.5 w-3.5" aria-hidden="true" />
                    {isSubmittingLead ? 'Submitting Enquiry...' : 'Submit Business Enquiry'}
                  </button>
                </form>

                {/* Direct Contact Fallback */}
                <div className="pt-3 border-t border-[#EDF1F6] flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-600">
                  <a
                    href={COMPANY.phoneHref}
                    className="inline-flex items-center gap-1 hover:text-[#0B2545] tabular-nums"
                  >
                    <Phone className="h-3 w-3 text-[#F27405]" aria-hidden="true" />
                    {COMPANY.phoneDisplay}
                  </a>
                  <a
                    href={COMPANY.emailHref}
                    className="inline-flex items-center gap-1 hover:text-[#0B2545]"
                  >
                    <Mail className="h-3 w-3 text-[#F27405]" aria-hidden="true" />
                    {COMPANY.email}
                  </a>
                </div>
              </div>
            )}
          </motion.section>
        )}
      </AnimatePresence>

      {/* Minimized Resume Bar */}
      <AnimatePresence>
        {widgetState === 'minimized' && (
          <motion.div
            initial={prefersReduced ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={prefersReduced ? undefined : { opacity: 0, y: 10 }}
            transition={{ duration: 0.2, ease: LUXURY_EASE }}
            className="flex items-center gap-2 rounded-full bg-[#071A33] text-white pl-3.5 pr-2 py-2 shadow-xl border border-[#F5B800]/40"
          >
            <button
              type="button"
              onClick={() => setWidgetState('open')}
              className="flex items-center gap-2.5 text-left cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F5B800]"
            >
              <span className="h-7 w-7 rounded-full bg-white border border-[#F5B800] flex items-center justify-center p-1 shrink-0">
                <img
                  src={COMPANY.logoEmblem}
                  alt=""
                  aria-hidden="true"
                  className="h-full w-auto object-contain"
                />
              </span>
              <span className="text-xs font-semibold whitespace-nowrap pr-1">
                Resume chat with Pearl
              </span>
            </button>
            <button
              type="button"
              onClick={closeWidget}
              aria-label="Close minimised Pearl bar"
              className="h-7 w-7 inline-flex items-center justify-center rounded-full text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Closed Floating Launcher + Subtle Welcome Prompt */}
      {widgetState === 'closed' && (
        <div className="flex items-center gap-2.5">
          <AnimatePresence>
            {showWelcomePrompt && (
              <motion.div
                initial={prefersReduced ? false : { opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={prefersReduced ? undefined : { opacity: 0, x: 8 }}
                transition={{ duration: 0.28, ease: LUXURY_EASE }}
                className="hidden sm:flex items-center gap-2 rounded-xl bg-white border border-[#DCE3EC] shadow-lg pl-3.5 pr-2 py-2 text-xs text-[#0B2545]"
              >
                <button
                  type="button"
                  onClick={() => openWidget('chat')}
                  className="font-medium hover:text-[#DC620B] transition-colors whitespace-nowrap cursor-pointer"
                >
                  Need assistance? Chat with Pearl.
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setWelcomeDismissed(true);
                    setShowWelcomePrompt(false);
                  }}
                  aria-label="Dismiss welcome prompt"
                  className="h-6 w-6 inline-flex items-center justify-center rounded-md text-slate-400 hover:text-[#0B2545] hover:bg-[#F6F8FB] transition-colors cursor-pointer"
                >
                  <X className="h-3.5 w-3.5" aria-hidden="true" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          <button
            ref={launcherRef}
            type="button"
            onClick={() => openWidget('chat')}
            aria-label="Open Pearl — Transpetro Energy AI Virtual Assistant"
            className="cta-sheen group inline-flex items-center gap-2.5 rounded-full bg-[#071A33] hover:bg-[#0B2545] text-white pl-3 pr-4 py-2.5 shadow-xl border border-[#F5B800]/45 transition-all duration-200 hover:-translate-y-0.5 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F27405]"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white border border-[#F5B800] p-1 shrink-0 transition-transform duration-200 group-hover:scale-105">
              <img
                src={COMPANY.logoEmblem}
                alt=""
                aria-hidden="true"
                className="h-full w-auto object-contain"
              />
            </span>
            <span className="text-left leading-tight whitespace-nowrap">
              <span className="block font-display text-xs font-bold tracking-wide text-white">
                Chat with Pearl
              </span>
              <span className="block text-[10px] text-[#F5B800] font-medium">
                AI Assistant
              </span>
            </span>
          </button>
        </div>
      )}
    </div>
  );
}
