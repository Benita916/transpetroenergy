import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Compass,
  Handshake,
  Headphones,
  Layers,
  Scale,
  ShieldCheck,
  Users,
} from 'lucide-react';
import {
  CinematicImage,
  Reveal,
  StaggerGroup,
  StaggerItem,
} from '../components/MotionPrimitives';
import { PageHero } from '../components/PageHero';
import { SeoHead } from '../components/SeoHead';
import { COMPANY, IMAGES } from '../data/company';

const BUSINESS_PRINCIPLES = [
  {
    number: '01',
    title: 'Commitment to Reliable Supply',
    icon: ShieldCheck,
    description:
      'Industrial and commercial facilities depend on predictable energy availability. We approach every supply commitment with careful preparation, realistic timelines, and disciplined execution.',
  },
  {
    number: '02',
    title: 'Professional Business Relationships',
    icon: Handshake,
    description:
      'We engage suppliers, logistics providers, and commercial buyers with corporate professionalism—respecting agreed commercial procedures, confidentiality, and clear contractual expectations.',
  },
  {
    number: '03',
    title: 'Customer-Focused Service',
    icon: Headphones,
    description:
      'Every buyer operates on unique consumption cycles and site delivery constraints. We listen closely to operational requirements and structure responsive account communication around customer needs.',
  },
  {
    number: '04',
    title: 'Transparency and Integrity',
    icon: Scale,
    description:
      'We believe trust in petroleum marketing is earned through clarity. Our commercial terms, documentation workflows, and status communications are direct, honest, and verifiable.',
  },
  {
    number: '05',
    title: 'Efficient Supply Coordination',
    icon: Layers,
    description:
      'By coordinating product sourcing, loading allocation, haulage scheduling, and receiving readiness as one cohesive workflow, we reduce friction and support dependable delivery execution.',
  },
  {
    number: '06',
    title: 'Understanding of Petroleum Products Marketing',
    icon: Compass,
    description:
      'Focused squarely on commercial Automotive Gas Oil (AGO/Diesel) and petroleum products trading, we align commercial structuring with real market dynamics across domestic and cross-border demand.',
  },
  {
    number: '07',
    title: 'Long-Term Partnership Approach',
    icon: Users,
    description:
      'We measure success by enduring counterparty relationships rather than one-off deals—investing in reliability, communication, and commercial fairness that support multi-year collaboration.',
  },
];

export function WhyChooseUsPage() {
  return (
    <>
      <SeoHead
        title="Why Choose Us | Business Principles & Corporate Integrity – Transpetro Energy"
        description="Learn why commercial fuel buyers and trading partners choose Transpetro Energy Limited for reliable petroleum supply coordination, transparency, and long-term partnerships."
      />

      <PageHero
        title="Why Choose Transpetro Energy"
        subtitle="Built on seven clear business principles: reliability, commercial integrity, customer focus, and disciplined petroleum supply coordination."
        breadcrumbs={[
          { label: 'Home', to: '/' },
          { label: 'Why Choose Us' },
        ]}
        image={IMAGES.heroTerminal}
        imageAlt="Modern petroleum storage terminal and maritime energy facility at sunset"
      />

      {/* Seven Business Principles */}
      <section className="relative overflow-hidden bg-white py-20 lg:py-24">
        <img
          src={COMPANY.logoEmblem}
          alt=""
          aria-hidden="true"
          className="pointer-events-none select-none absolute -right-12 top-24 w-80 h-auto opacity-[0.04]"
        />
        <div className="relative mx-auto max-w-[1200px] px-6 lg:px-8">
          <Reveal className="max-w-3xl mb-14">
            <div className="h-1 w-12 bg-gradient-to-r from-[#F5B800] to-[#F27405] mb-5" aria-hidden="true" />
            <p className="text-sm font-semibold text-[#DC620B] mb-2">Our Standards of Engagement</p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#0B2545]">
              Principles That Guide Every Commercial Relationship
            </h2>
            <p className="mt-4 text-base text-slate-600 leading-relaxed">
              In petroleum products marketing and trading, reputation is built on consistency,
              plain-spoken communication, and honouring commitments. These seven principles define
              how Transpetro Energy Limited works with buyers and business partners.
            </p>
          </Reveal>

          <StaggerGroup staggerDelay={0.07} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {BUSINESS_PRINCIPLES.map((principle, index) => {
              const Icon = principle.icon;
              const isLast = index === BUSINESS_PRINCIPLES.length - 1;
              return (
                <StaggerItem
                  key={principle.number}
                  className={isLast ? 'md:col-span-2 lg:col-span-3' : ''}
                >
                  <article
                    className={`group h-full rounded-xl border p-7 lg:p-8 flex flex-col justify-between transition-all duration-300 ${
                      isLast
                        ? 'lg:flex-row lg:items-center lg:gap-10 bg-[#0B2545] text-white border-[#0B2545] shadow-md'
                        : 'bg-[#F6F8FB] border-[#DCE3EC] hover:-translate-y-1 hover:bg-white hover:border-[#0B2545]/30 hover:shadow-md'
                    }`}
                  >
                    <div className={isLast ? 'lg:max-w-3xl' : ''}>
                      <div className="flex items-center justify-between gap-4 mb-5">
                        <span
                          className={`font-display text-sm font-bold tabular-nums ${
                            isLast ? 'text-[#F5B800]' : 'text-[#DC620B]'
                          }`}
                        >
                          {principle.number}.
                        </span>
                        <div
                          className={`h-10 w-10 rounded-lg flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-105 ${
                            isLast
                              ? 'bg-white/10 text-[#F5B800]'
                              : 'bg-[#0B2545] text-[#F5B800]'
                          }`}
                        >
                          <Icon className="h-5 w-5" aria-hidden="true" />
                        </div>
                      </div>
                      <h3
                        className={`font-display text-xl font-bold ${
                          isLast ? 'text-white sm:text-2xl' : 'text-[#0B2545]'
                        }`}
                      >
                        {principle.title}
                      </h3>
                      <p
                        className={`mt-3 text-sm sm:text-[15px] leading-relaxed ${
                          isLast ? 'text-slate-200' : 'text-slate-600'
                        }`}
                      >
                        {principle.description}
                      </p>
                    </div>

                    {isLast && (
                      <div className="mt-6 lg:mt-0 shrink-0">
                        <Link
                          to="/contact?enquiry=Business%20Partnership"
                          className="cta-sheen group/cta inline-flex items-center justify-center gap-2 rounded-md bg-[#F27405] hover:bg-[#DC620B] text-white text-sm font-semibold px-6 py-3.5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg whitespace-nowrap"
                        >
                          Partner With Us
                          <ArrowRight
                            className="h-4 w-4 transition-transform duration-200 group-hover/cta:translate-x-1"
                            aria-hidden="true"
                          />
                        </Link>
                      </div>
                    )}
                  </article>
                </StaggerItem>
              );
            })}
          </StaggerGroup>
        </div>
      </section>

      {/* Supporting Visual Band */}
      <section className="bg-[#F6F8FB] border-t border-[#DCE3EC] py-20">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
            <div className="lg:col-span-6 group">
              <CinematicImage
                src={IMAGES.pipelineInfrastructure}
                alt="Steel petroleum transfer pipelines and industrial valve station at sunset"
                ambientZoom
                className="h-full min-h-[280px] rounded-xl border border-[#DCE3EC]"
              />
            </div>
            <Reveal className="lg:col-span-6 flex flex-col justify-center">
              <p className="text-sm font-semibold text-[#DC620B] mb-2">Start a Conversation</p>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#0B2545]">
                Experience Disciplined Commercial Energy Supply
              </h2>
              <p className="mt-4 text-base text-slate-600 leading-relaxed">
                Explore our petroleum products marketing and bulk diesel supply offerings or contact
                our commercial team directly to discuss your organisation’s energy requirements.
              </p>
              <div className="mt-7 flex flex-wrap gap-4">
                <Link
                  to="/contact"
                  className="cta-sheen group inline-flex items-center gap-2 rounded-md bg-[#0B2545] hover:bg-[#13355E] text-white text-sm font-semibold px-6 py-3 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md whitespace-nowrap"
                >
                  Contact Us
                  <ArrowRight
                    className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </Link>
                <Link
                  to="/products-services"
                  className="inline-flex items-center gap-2 rounded-md bg-white hover:bg-[#EDF1F6] text-[#0B2545] border border-[#DCE3EC] text-sm font-semibold px-6 py-3 transition-all duration-200 hover:-translate-y-0.5 whitespace-nowrap"
                >
                  Explore Products & Services
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
