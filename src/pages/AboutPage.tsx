import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { BrandImage } from '../components/BrandImage';
import { PageHero } from '../components/PageHero';
import { SeoHead } from '../components/SeoHead';
import { COMPANY, IMAGES } from '../data/company';

const CORE_VALUES = [
  {
    number: '01',
    title: 'Integrity',
    description:
      'We conduct business with honesty, accountability, and clear ethical standards in every commercial conversation, contract, and delivery commitment.',
  },
  {
    number: '02',
    title: 'Reliability',
    description:
      'Our buyers depend on energy availability to power operations. We treat scheduling discipline and follow-through as foundational responsibilities.',
  },
  {
    number: '03',
    title: 'Transparency',
    description:
      'From initial enquiry to transaction documentation and dispatch updates, we communicate plainly and accurately with suppliers and customers.',
  },
  {
    number: '04',
    title: 'Operational Excellence',
    description:
      'We continuously refine our sourcing, coordination, and communication workflows to deliver smooth, responsive commercial execution.',
  },
  {
    number: '05',
    title: 'Long-Term Partnerships',
    description:
      'We prioritise enduring business relationships built on mutual respect, commercial fairness, and consistent performance over time.',
  },
];

export function AboutPage() {
  return (
    <>
      <SeoHead
        title="About Us | Transpetro Energy Limited – Petroleum Products Marketing Nigeria"
        description="Learn about Transpetro Energy Limited, our vision, mission, core values, corporate governance, and message from Managing Director/CEO Anelechi Moore Ezeala."
      />

      <PageHero
        title="About Transpetro Energy Limited"
        subtitle="A Nigerian petroleum products marketing, supply, and distribution company built on commercial integrity, disciplined coordination, and enduring business partnerships."
        breadcrumbs={[
          { label: 'Home', to: '/' },
          { label: 'About Us' },
        ]}
        image={IMAGES.pipelineInfrastructure}
        imageAlt="Steel petroleum transfer pipelines and valve manifolds along a modern energy corridor"
      />

      {/* Company Introduction & Who We Are */}
      <section className="relative overflow-hidden bg-white py-20 lg:py-24">
        <img
          src={COMPANY.logoEmblem}
          alt=""
          aria-hidden="true"
          className="pointer-events-none select-none absolute -right-12 top-16 w-72 h-auto opacity-[0.04]"
        />
        <div className="relative mx-auto max-w-[1200px] px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-7 space-y-6">
              <div>
                <p className="text-sm font-semibold text-[#DC620B] mb-2">Company Introduction</p>
                <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#0B2545]">
                  Who We Are
                </h2>
              </div>

              <p className="text-base text-slate-600 leading-relaxed">
                Transpetro Energy Limited is a registered Nigerian petroleum products marketing,
                supply, and distribution company headquartered in Rivers State, Nigeria. Guided by
                our corporate ethos—<em>{COMPANY.tagline}</em>—we exist to bridge dependable
                petroleum product supply channels with the real operational energy requirements of
                commercial, industrial, and international buyers.
              </p>

              <p className="text-base text-slate-600 leading-relaxed">
                In a sector where dependability, specification discipline, and timely communication
                directly impact industrial productivity, Transpetro Energy Limited is structured to
                serve as a responsive, trustworthy commercial counterparty. We focus on connecting
                qualified suppliers with serious buyers through clear documentation, structured
                supply coordination, and accountable customer service.
              </p>

              <div className="pt-4">
                <h3 className="font-display text-xl font-bold text-[#0B2545] mb-3">
                  Our Business Focus
                </h3>
                <p className="text-base text-slate-600 leading-relaxed">
                  Our core commercial activities centre on Automotive Gas Oil (AGO / Diesel)
                  marketing and bulk supply, petroleum products trading, industrial and commercial
                  supply arrangements, distribution coordination, and international petroleum
                  products trading and export supply arrangements. We focus strictly on commercial,
                  industrial, and wholesale trading segments rather than retail filling station
                  operations.
                </p>
              </div>
            </div>

            {/* Corporate Profile Summary Card */}
            <aside className="lg:col-span-5 rounded-xl bg-[#F6F8FB] border border-[#DCE3EC] p-7 lg:p-8 space-y-6">
              <div className="flex items-center gap-3.5 pb-5 border-b border-[#DCE3EC]">
                <img
                  src={COMPANY.logoEmblem}
                  alt={`${COMPANY.name} emblem`}
                  className="h-12 w-auto object-contain shrink-0"
                />
                <div>
                  <h3 className="font-display text-lg font-bold text-[#0B2545]">{COMPANY.name}</h3>
                  <p className="text-xs text-slate-600">{COMPANY.secondaryStatement}</p>
                </div>
              </div>

              <dl className="space-y-4 text-sm">
                <div className="flex flex-col gap-0.5">
                  <dt className="text-xs font-semibold text-slate-500">Principal Activity</dt>
                  <dd className="text-[#0B2545] font-medium">{COMPANY.businessLine}</dd>
                </div>
                <div className="flex flex-col gap-0.5">
                  <dt className="text-xs font-semibold text-slate-500">Corporate Registration</dt>
                  <dd className="text-[#0B2545] font-medium tabular-nums">
                    RC Number: {COMPANY.rcNumber} · TIN: {COMPANY.tin}
                  </dd>
                </div>
                <div className="flex flex-col gap-0.5">
                  <dt className="text-xs font-semibold text-slate-500">Managing Director / CEO</dt>
                  <dd className="text-[#0B2545] font-medium">{COMPANY.mdCeo}</dd>
                </div>
                <div className="flex flex-col gap-0.5">
                  <dt className="text-xs font-semibold text-slate-500">Office Address</dt>
                  <dd className="text-[#0B2545] leading-relaxed">{COMPANY.address}</dd>
                </div>
              </dl>

              <div className="pt-2">
                <Link
                  to="/contact"
                  className="w-full inline-flex items-center justify-center gap-2 rounded-md bg-[#0B2545] hover:bg-[#13355E] text-white text-sm font-semibold px-5 py-3 transition-colors"
                >
                  Connect With Our Team
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="bg-[#0B2545] text-white py-20 lg:py-24">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="rounded-xl bg-[#071A33] border border-white/10 p-8 lg:p-10">
              <div className="h-1 w-10 bg-[#F5B800] mb-5" aria-hidden="true" />
              <h2 className="font-display text-2xl font-bold text-white">Our Vision</h2>
              <p className="mt-4 text-base text-slate-200 leading-relaxed">
                To be a respected and dependable petroleum products marketing, supply, and energy
                trading company recognised across Nigeria and international markets for commercial
                integrity, responsive supply coordination, and lasting partner value.
              </p>
            </div>

            <div className="rounded-xl bg-[#071A33] border border-white/10 p-8 lg:p-10">
              <div className="h-1 w-10 bg-[#F27405] mb-5" aria-hidden="true" />
              <h2 className="font-display text-2xl font-bold text-white">Our Mission</h2>
              <p className="mt-4 text-base text-slate-200 leading-relaxed">
                To connect petroleum product suppliers and commercial buyers through disciplined
                sourcing, transparent business transactions, coordinated delivery execution, and
                customer-centred account management that supports uninterrupted industrial growth.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="bg-[#F6F8FB] border-b border-[#DCE3EC] py-20 lg:py-24">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <p className="text-sm font-semibold text-[#DC620B] mb-2">How We Operate</p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#0B2545]">
              Our Core Values
            </h2>
            <p className="mt-3 text-base text-slate-600 leading-relaxed">
              Every supply enquiry, commercial agreement, and counterparty engagement at Transpetro
              Energy Limited is guided by five core principles.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CORE_VALUES.map((value) => (
              <div
                key={value.title}
                className="rounded-xl bg-white border border-[#DCE3EC] p-7 flex flex-col"
              >
                <span className="font-display text-sm font-bold text-[#DC620B] tabular-nums">
                  {value.number}.
                </span>
                <h3 className="mt-2 font-display text-xl font-bold text-[#0B2545]">
                  {value.title}
                </h3>
                <p className="mt-3 text-sm sm:text-[15px] text-slate-600 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Commitment to Customers & Business Partners */}
      <section className="bg-white py-20 lg:py-24">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
            <div className="lg:col-span-5">
              <div className="h-full min-h-[300px] rounded-xl overflow-hidden border border-[#DCE3EC]">
                <BrandImage
                  src={IMAGES.heroTerminal}
                  alt="Petroleum storage tanks and industrial loading terminal at dusk"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="lg:col-span-7 flex flex-col justify-center">
              <p className="text-sm font-semibold text-[#DC620B] mb-2">Commercial Stewardship</p>
              <h2 className="font-display text-3xl font-bold tracking-tight text-[#0B2545]">
                Our Commitment to Customers & Business Partners
              </h2>
              <p className="mt-4 text-base text-slate-600 leading-relaxed">
                We understand that reliable energy supply is a critical operational input for every
                organisation we engage. Whether coordinating domestic bulk diesel deliveries or
                structuring cross-border petroleum trading enquiries, we uphold clear expectations
                and responsive stewardship.
              </p>
              <ul className="mt-6 space-y-3.5 text-sm sm:text-[15px] text-slate-700">
                {[
                  'Clear commercial communication regarding availability, specifications, and delivery timelines.',
                  'Disciplined coordination across sourcing, loading schedules, and receiving site requirements.',
                  'Transparent documentation and professional accountability at every stage of engagement.',
                  'A collaborative, long-term outlook that values repeat trust with both suppliers and buyers.',
                ].map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-[#F27405] shrink-0 mt-0.5" aria-hidden="true" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Message from the Managing Director / CEO */}
      <section className="relative overflow-hidden bg-[#F6F8FB] border-t border-[#DCE3EC] py-20 lg:py-24">
        <img
          src={COMPANY.logoEmblem}
          alt=""
          aria-hidden="true"
          className="pointer-events-none select-none absolute -right-12 -bottom-12 w-80 h-auto opacity-[0.045]"
        />
        <div className="relative mx-auto max-w-[960px] px-6 lg:px-8">
          <div className="rounded-2xl bg-white border border-[#DCE3EC] p-8 sm:p-12 lg:p-14">
            <div className="h-1 w-14 bg-gradient-to-r from-[#F5B800] to-[#F27405] mb-6" aria-hidden="true" />
            <p className="text-sm font-semibold text-[#DC620B] mb-2">Executive Leadership</p>
            <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-[#0B2545]">
              Message from the Managing Director / CEO
            </h2>

            <div className="mt-6 space-y-4 text-base text-slate-700 leading-relaxed">
              <p>
                Energy powers industry, commerce, and economic progress. At Transpetro Energy
                Limited, our focus is straightforward: to build a disciplined, transparent, and
                dependable petroleum products marketing, supply, and distribution enterprise that
                customers and trading counterparties can rely upon with confidence.
              </p>
              <p>
                We recognise that industrial operators, commercial enterprises, and international
                petroleum buyers do not merely seek fuel—they seek certainty, clear communication,
                and partners who honour their word. Every aspect of our commercial model is centred
                on bridging reliable supply opportunities with customer requirements through
                structured coordination and principled execution.
              </p>
              <p>
                As we continue developing commercial relationships across Nigeria and international
                energy markets, our commitment remains grounded in integrity, responsiveness, and
                mutual value creation. We welcome the opportunity to discuss your petroleum supply
                requirements and build lasting partnerships together.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-[#DCE3EC] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <p className="font-display text-lg font-bold text-[#0B2545]">{COMPANY.mdCeo}</p>
                <p className="text-sm text-slate-600">
                  Managing Director / Chief Executive Officer · {COMPANY.name}
                </p>
              </div>
              <Link
                to="/products-services"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#0B2545] hover:text-[#DC620B] transition-colors whitespace-nowrap"
              >
                Explore Products & Services
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
