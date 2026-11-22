import { useEffect, useState, type FormEvent } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  AlertCircle,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Globe,
  Info,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
  UserCheck,
} from 'lucide-react';
import { PageHero } from '../components/PageHero';
import { SeoHead } from '../components/SeoHead';
import { COMPANY, ENQUIRY_CATEGORIES, IMAGES, type EnquiryCategory } from '../data/company';

interface FormState {
  fullName: string;
  companyName: string;
  email: string;
  phone: string;
  enquiryType: EnquiryCategory;
  message: string;
}

interface SubmissionResult {
  delivered: boolean;
  referenceId: string;
  receivedAt: string;
  message: string;
  submittedData: FormState;
}

function resolveInitialCategory(param: string | null): EnquiryCategory {
  if (param && (ENQUIRY_CATEGORIES as readonly string[]).includes(param)) {
    return param as EnquiryCategory;
  }
  return 'Product Supply';
}

export function ContactPage() {
  const [searchParams] = useSearchParams();
  const initialCategory = resolveInitialCategory(searchParams.get('enquiry'));
  const serviceParam = searchParams.get('service');

  const [form, setForm] = useState<FormState>({
    fullName: '',
    companyName: '',
    email: '',
    phone: '',
    enquiryType: initialCategory,
    message: serviceParam
      ? `We would like to discuss ${serviceParam} requirements with Transpetro Energy Limited.`
      : '',
  });

  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<SubmissionResult | null>(null);
  const [emailConfigured, setEmailConfigured] = useState<boolean | null>(null);
  const [showSmtpGuide, setShowSmtpGuide] = useState(false);

  useEffect(() => {
    const nextCategory = resolveInitialCategory(searchParams.get('enquiry'));
    const nextService = searchParams.get('service');
    if (searchParams.get('enquiry') || nextService) {
      setForm((prev) => ({
        ...prev,
        enquiryType: nextCategory,
        message:
          nextService && prev.message.trim() === ''
            ? `We would like to discuss ${nextService} requirements with Transpetro Energy Limited.`
            : prev.message,
      }));
    }
  }, [searchParams]);

  useEffect(() => {
    let active = true;
    fetch('/api/enquiries/status')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (active && data && typeof data.emailConfigured === 'boolean') {
          setEmailConfigured(data.emailConfigured);
        }
      })
      .catch(() => {
        if (active) {
          setEmailConfigured(false);
        }
      });
    return () => {
      active = false;
    };
  }, []);

  function validateClient(state: FormState): Partial<Record<keyof FormState, string>> {
    const errors: Partial<Record<keyof FormState, string>> = {};
    if (state.fullName.trim().length < 2) {
      errors.fullName = 'Please enter your full name (at least 2 characters).';
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.email.trim())) {
      errors.email = 'Please enter a valid email address.';
    }
    const trimmedPhone = state.phone.trim();
    if (trimmedPhone.length < 7 || !/^[0-9+\-\s()]{7,40}$/.test(trimmedPhone)) {
      errors.phone = 'Please enter a valid telephone number (e.g. +234 816 498 8092).';
    }
    if (state.message.trim().length < 15) {
      errors.message = 'Please include brief details about your enquiry (at least 15 characters).';
    }
    return errors;
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitError(null);

    const clientErrors = validateClient(form);
    if (Object.keys(clientErrors).length > 0) {
      setFieldErrors(clientErrors);
      return;
    }

    setFieldErrors({});
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await response.json();

      if (!response.ok || !data.ok) {
        if (data.fieldErrors && typeof data.fieldErrors === 'object') {
          setFieldErrors(data.fieldErrors);
        }
        setSubmitError(
          data.error ||
            'Unable to process your enquiry right now. Please contact us directly by telephone or email.'
        );
        return;
      }

      setSubmissionResult({
        delivered: Boolean(data.delivered),
        referenceId: data.referenceId,
        receivedAt: data.receivedAt,
        message: data.message,
        submittedData: { ...form },
      });

      setForm({
        fullName: '',
        companyName: '',
        email: '',
        phone: '',
        enquiryType: 'Product Supply',
        message: '',
      });
    } catch {
      setSubmitError(
        'Could not reach the enquiry service. Please contact Transpetro Energy Limited directly via email or telephone.'
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  function buildMailtoFallback(data: FormState, refId: string): string {
    const subject = `[${refId}] ${data.enquiryType} — ${data.fullName}`;
    const body = [
      `Reference ID: ${refId}`,
      `Full Name: ${data.fullName}`,
      `Company Name: ${data.companyName || 'Not provided'}`,
      `Email Address: ${data.email}`,
      `Phone Number: ${data.phone}`,
      `Enquiry Type: ${data.enquiryType}`,
      '',
      'Message:',
      data.message,
    ].join('\n');
    return `mailto:${COMPANY.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  function buildWhatsAppFallback(data: FormState, refId: string): string {
    const text = `Hello Transpetro Energy Limited (${refId}),\nName: ${data.fullName}\nCompany: ${
      data.companyName || 'N/A'
    }\nEnquiry: ${data.enquiryType}\nPhone: ${data.phone}\nEmail: ${data.email}\n\n${data.message}`;
    return `https://wa.me/${COMPANY.whatsappNumber}?text=${encodeURIComponent(text)}`;
  }

  return (
    <>
      <SeoHead
        title="Contact Us | Transpetro Energy Limited – Rivers State, Nigeria"
        description="Contact Transpetro Energy Limited in Rivers State, Nigeria for bulk diesel (AGO) supply, petroleum products trading, export enquiries, and business partnerships."
      />

      <PageHero
        title="Contact Transpetro Energy Limited"
        subtitle="Speak with our commercial desk regarding bulk AGO/diesel supply, petroleum products trading, export arrangements, and business partnerships."
        breadcrumbs={[
          { label: 'Home', to: '/' },
          { label: 'Contact Us' },
        ]}
        image={IMAGES.pipelineInfrastructure}
        imageAlt="Petroleum energy infrastructure corridor at sunset"
      />

      <section className="bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Column: Official Corporate Contact Details */}
            <div className="lg:col-span-5 space-y-8">
              <div>
                <div className="h-1 w-12 bg-gradient-to-r from-[#F5B800] to-[#F27405] mb-5" aria-hidden="true" />
                <p className="text-sm font-semibold text-[#DC620B] mb-2">Direct Corporate Desk</p>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#0B2545]">
                  Get in Touch With Our Team
                </h2>
                <p className="mt-3 text-base text-slate-600 leading-relaxed">
                  We welcome commercial enquiries from industrial facilities, corporate buyers,
                  suppliers, and prospective international trading partners.
                </p>
              </div>

              <div className="rounded-xl bg-[#F6F8FB] border border-[#DCE3EC] p-6 sm:p-7 space-y-5">
                <div className="flex items-start gap-3.5">
                  <div className="h-10 w-10 rounded-lg bg-[#0B2545] text-[#F5B800] flex items-center justify-center shrink-0">
                    <MapPin className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-display text-sm font-bold text-[#0B2545]">Office Address</h3>
                    <p className="mt-1 text-sm text-slate-600 leading-relaxed">{COMPANY.address}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="h-10 w-10 rounded-lg bg-[#0B2545] text-[#F5B800] flex items-center justify-center shrink-0">
                    <Phone className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-display text-sm font-bold text-[#0B2545]">Telephone & WhatsApp</h3>
                    <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
                      <a
                        href={COMPANY.phoneHref}
                        className="font-semibold text-[#0B2545] hover:text-[#DC620B] transition-colors tabular-nums"
                      >
                        {COMPANY.phoneDisplay}
                      </a>
                      <a
                        href={COMPANY.whatsappHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 hover:underline"
                      >
                        <MessageCircle className="h-3.5 w-3.5" aria-hidden="true" />
                        Chat on WhatsApp
                      </a>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="h-10 w-10 rounded-lg bg-[#0B2545] text-[#F5B800] flex items-center justify-center shrink-0">
                    <Mail className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-display text-sm font-bold text-[#0B2545]">Email Address</h3>
                    <a
                      href={COMPANY.emailHref}
                      className="mt-1 inline-block text-sm font-semibold text-[#0B2545] hover:text-[#DC620B] transition-colors break-all"
                    >
                      {COMPANY.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="h-10 w-10 rounded-lg bg-[#0B2545] text-[#F5B800] flex items-center justify-center shrink-0">
                    <Globe className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-display text-sm font-bold text-[#0B2545]">Website</h3>
                    <a
                      href={COMPANY.websiteHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 inline-block text-sm font-medium text-slate-700 hover:text-[#DC620B] transition-colors"
                    >
                      {COMPANY.websiteDisplay}
                    </a>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#DCE3EC] flex items-start gap-3.5">
                  <div className="h-10 w-10 rounded-lg bg-[#0B2545] text-[#F5B800] flex items-center justify-center shrink-0">
                    <UserCheck className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div className="text-sm space-y-1">
                    <h3 className="font-display font-bold text-[#0B2545]">Corporate Credentials</h3>
                    <p className="text-slate-700">
                      Managing Director/CEO: <span className="font-semibold text-[#0B2545]">{COMPANY.mdCeo}</span>
                    </p>
                    <p className="text-slate-600 tabular-nums">
                      RC Number: <span className="font-medium text-[#0B2545]">{COMPANY.rcNumber}</span> · TIN:{' '}
                      <span className="font-medium text-[#0B2545]">{COMPANY.tin}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Validated Enquiry Form */}
            <div className="lg:col-span-7">
              <div className="rounded-2xl bg-white border border-[#DCE3EC] p-6 sm:p-8 lg:p-10">
                <h2 className="font-display text-2xl font-bold text-[#0B2545]">
                  Commercial Enquiry Form
                </h2>
                <p className="mt-1.5 text-sm text-slate-600">
                  Complete the fields below to submit a structured supply or partnership enquiry.
                </p>

                {/* Honest notice when SMTP email transport is not configured yet */}
                {emailConfigured === false && (
                  <div className="mt-5 rounded-xl bg-amber-50 border border-amber-200 p-4 text-sm text-amber-950">
                    <div className="flex items-start gap-3">
                      <Info className="h-5 w-5 text-amber-700 shrink-0 mt-0.5" aria-hidden="true" />
                      <div className="flex-1">
                        <p className="font-semibold text-amber-950">
                          Outbound Email Dispatch (SMTP) Is Not Yet Configured
                        </p>
                        <p className="mt-1 text-amber-900 leading-relaxed">
                          This form validates enquiries on the Node.js backend and assigns a
                          reference ID, but automated email delivery to{' '}
                          <span className="font-medium">{COMPANY.email}</span> requires SMTP
                          environment variables. After submitting, you can forward your pre-filled
                          enquiry in one click via email or WhatsApp.
                        </p>
                        <button
                          type="button"
                          onClick={() => setShowSmtpGuide((prev) => !prev)}
                          className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-[#0B2545] hover:underline"
                        >
                          {showSmtpGuide ? 'Hide' : 'View'} SMTP Backend Connection Instructions
                          {showSmtpGuide ? (
                            <ChevronUp className="h-3.5 w-3.5" />
                          ) : (
                            <ChevronDown className="h-3.5 w-3.5" />
                          )}
                        </button>
                        {showSmtpGuide && (
                          <div className="mt-3 rounded-lg bg-white border border-amber-200 p-3.5 text-xs text-slate-700 space-y-1.5">
                            <p className="font-semibold text-[#0B2545]">
                              To enable automated email delivery in production:
                            </p>
                            <p>
                              Configure the following server-side environment variables (never in
                              frontend code):{' '}
                              <code className="font-mono text-[#0B2545]">
                                SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM,
                                ENQUIRY_RECIPIENT_EMAIL
                              </code>
                              .
                            </p>
                            <p>
                              Once configured and the server is restarted, <code className="font-mono">POST /api/enquiries</code>{' '}
                              automatically dispatches enquiries via Nodemailer directly to{' '}
                              <code className="font-mono">{COMPANY.email}</code>.
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Submission Confirmation / Honest Delivery State */}
                {submissionResult && (
                  <div
                    role="status"
                    className={`mt-6 rounded-xl border p-5 ${
                      submissionResult.delivered
                        ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                        : 'bg-[#F6F8FB] border-[#0B2545]/25 text-[#0B2545]'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      {submissionResult.delivered ? (
                        <CheckCircle2 className="h-5 w-5 text-emerald-700 shrink-0 mt-0.5" aria-hidden="true" />
                      ) : (
                        <Info className="h-5 w-5 text-[#DC620B] shrink-0 mt-0.5" aria-hidden="true" />
                      )}
                      <div className="space-y-2 text-sm">
                        <p className="font-display font-bold text-base">
                          {submissionResult.delivered
                            ? 'Enquiry Delivered to Transpetro Energy Limited'
                            : 'Enquiry Validated — Direct Dispatch Required'}
                        </p>
                        <p className="text-xs font-medium text-slate-600 tabular-nums">
                          Reference ID: <span className="text-[#0B2545] font-semibold">{submissionResult.referenceId}</span>
                        </p>
                        <p className="leading-relaxed">{submissionResult.message}</p>

                        {!submissionResult.delivered && (
                          <div className="pt-2 flex flex-wrap gap-3">
                            <a
                              href={buildMailtoFallback(
                                submissionResult.submittedData,
                                submissionResult.referenceId
                              )}
                              className="inline-flex items-center gap-2 rounded-md bg-[#0B2545] hover:bg-[#13355E] text-white text-xs font-semibold px-4 py-2.5 transition-colors"
                            >
                              <Mail className="h-3.5 w-3.5" aria-hidden="true" />
                              Send Now via Email Client
                            </a>
                            <a
                              href={buildWhatsAppFallback(
                                submissionResult.submittedData,
                                submissionResult.referenceId
                              )}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 rounded-md bg-[#F27405] hover:bg-[#DC620B] text-white text-xs font-semibold px-4 py-2.5 transition-colors"
                            >
                              <MessageCircle className="h-3.5 w-3.5" aria-hidden="true" />
                              Send Now via WhatsApp
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {submitError && (
                  <div
                    role="alert"
                    className="mt-6 rounded-xl bg-red-50 border border-red-200 p-4 flex items-start gap-3 text-sm text-red-900"
                  >
                    <AlertCircle className="h-5 w-5 text-red-600 shrink-0 mt-0.5" aria-hidden="true" />
                    <span>{submitError}</span>
                  </div>
                )}

                <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="fullName" className="block text-sm font-semibold text-[#0B2545] mb-1.5">
                        Full Name <span className="text-[#DC620B]">*</span>
                      </label>
                      <input
                        id="fullName"
                        name="fullName"
                        type="text"
                        required
                        autoComplete="name"
                        value={form.fullName}
                        onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                        placeholder="e.g. Chinedu Okafor"
                        aria-invalid={Boolean(fieldErrors.fullName)}
                        aria-describedby={fieldErrors.fullName ? 'fullName-error' : undefined}
                        className={`w-full rounded-md border px-3.5 py-2.5 text-sm text-[#0B2545] bg-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0B2545]/20 focus:border-[#0B2545] ${
                          fieldErrors.fullName ? 'border-red-500' : 'border-[#CBD5E1]'
                        }`}
                      />
                      {fieldErrors.fullName && (
                        <p id="fullName-error" className="mt-1 text-xs text-red-600">
                          {fieldErrors.fullName}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="companyName" className="block text-sm font-semibold text-[#0B2545] mb-1.5">
                        Company Name
                      </label>
                      <input
                        id="companyName"
                        name="companyName"
                        type="text"
                        autoComplete="organization"
                        value={form.companyName}
                        onChange={(e) => setForm({ ...form, companyName: e.target.value })}
                        placeholder="Organisation or trading entity"
                        className="w-full rounded-md border border-[#CBD5E1] px-3.5 py-2.5 text-sm text-[#0B2545] bg-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0B2545]/20 focus:border-[#0B2545]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold text-[#0B2545] mb-1.5">
                        Email Address <span className="text-[#DC620B]">*</span>
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        autoComplete="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="name@company.com"
                        aria-invalid={Boolean(fieldErrors.email)}
                        aria-describedby={fieldErrors.email ? 'email-error' : undefined}
                        className={`w-full rounded-md border px-3.5 py-2.5 text-sm text-[#0B2545] bg-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0B2545]/20 focus:border-[#0B2545] ${
                          fieldErrors.email ? 'border-red-500' : 'border-[#CBD5E1]'
                        }`}
                      />
                      {fieldErrors.email && (
                        <p id="email-error" className="mt-1 text-xs text-red-600">
                          {fieldErrors.email}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-semibold text-[#0B2545] mb-1.5">
                        Phone Number <span className="text-[#DC620B]">*</span>
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        required
                        autoComplete="tel"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        placeholder="+234 800 000 0000"
                        aria-invalid={Boolean(fieldErrors.phone)}
                        aria-describedby={fieldErrors.phone ? 'phone-error' : undefined}
                        className={`w-full rounded-md border px-3.5 py-2.5 text-sm text-[#0B2545] bg-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0B2545]/20 focus:border-[#0B2545] ${
                          fieldErrors.phone ? 'border-red-500' : 'border-[#CBD5E1]'
                        }`}
                      />
                      {fieldErrors.phone && (
                        <p id="phone-error" className="mt-1 text-xs text-red-600">
                          {fieldErrors.phone}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="enquiryType" className="block text-sm font-semibold text-[#0B2545] mb-1.5">
                      Enquiry Type <span className="text-[#DC620B]">*</span>
                    </label>
                    <select
                      id="enquiryType"
                      name="enquiryType"
                      value={form.enquiryType}
                      onChange={(e) =>
                        setForm({ ...form, enquiryType: e.target.value as EnquiryCategory })
                      }
                      className="w-full rounded-md border border-[#CBD5E1] px-3.5 py-2.5 text-sm text-[#0B2545] bg-white focus:outline-none focus:ring-2 focus:ring-[#0B2545]/20 focus:border-[#0B2545]"
                    >
                      {ENQUIRY_CATEGORIES.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-[#0B2545] mb-1.5">
                      Message <span className="text-[#DC620B]">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      required
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Share your product requirements, estimated volume, delivery location, or partnership enquiry..."
                      aria-invalid={Boolean(fieldErrors.message)}
                      aria-describedby={fieldErrors.message ? 'message-error' : undefined}
                      className={`w-full rounded-md border px-3.5 py-2.5 text-sm text-[#0B2545] bg-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0B2545]/20 focus:border-[#0B2545] ${
                        fieldErrors.message ? 'border-red-500' : 'border-[#CBD5E1]'
                      }`}
                    />
                    {fieldErrors.message && (
                      <p id="message-error" className="mt-1 text-xs text-red-600">
                        {fieldErrors.message}
                      </p>
                    )}
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-md bg-[#F27405] hover:bg-[#DC620B] disabled:opacity-60 text-white font-semibold text-sm px-7 py-3.5 transition-colors cursor-pointer whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0B2545]"
                    >
                      <Send className="h-4 w-4" aria-hidden="true" />
                      {isSubmitting ? 'Validating & Submitting...' : 'Submit Enquiry'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Location Map: Oyigbo / Iriebe, Rivers State, Nigeria */}
      <section className="bg-[#F6F8FB] border-t border-[#DCE3EC] py-16 lg:py-20">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
            <div>
              <p className="text-sm font-semibold text-[#DC620B] mb-1">Office Location</p>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#0B2545]">
                Oyigbo & Iriebe, Rivers State, Nigeria
              </h2>
              <p className="mt-1.5 text-sm text-slate-600 max-w-2xl">{COMPANY.address}</p>
            </div>
            <a
              href="https://www.openstreetmap.org/?mlat=4.8781&mlon=7.1282#map=13/4.8781/7.1282"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0B2545] hover:text-[#DC620B] whitespace-nowrap"
            >
              Open Larger Map
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>

          <div className="rounded-2xl overflow-hidden border border-[#DCE3EC] bg-white h-[380px] sm:h-[420px]">
            <iframe
              title="Map showing Oyigbo and Iriebe, Rivers State, Nigeria"
              src="https://www.openstreetmap.org/export/embed.html?bbox=7.0600%2C4.8350%2C7.1950%2C4.9200&layer=mapnik&marker=4.8781%2C7.1282"
              className="w-full h-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </>
  );
}
