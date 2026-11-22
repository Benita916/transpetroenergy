import { Link } from 'react-router-dom';
import { ArrowRight, Building2, Compass, Globe2, Handshake, ShieldCheck, Truck } from 'lucide-react';
import { BrandImage } from '../components/BrandImage';
import { SeoHead } from '../components/SeoHead';
import { COMPANY, IMAGES, SERVICES } from '../data/company';

const WHY_PRINCIPLES = [
  {
    number: '01',
    title: 'Commitment to Reliable Supply',
    description:
      'Structured sourcing and scheduling discipline built around keeping industrial and commercial operations running without unnecessary disruption.',
  },
  {
    number: '02',
    title: 'Transparency & Integrity',
    description:
      'Clear commercial terms, honest communication, and documented business practices across every supply enquiry and transaction.',
  },
  {
    number: '03',
    title: 'Efficient Supply Coordination',
    description:
      'Coordinated order planning from sourcing and loading through delivery scheduling and receiving confirmation.',
  },
  {
    number: '04',
    title: 'Long-Term Partnership Focus',
    description:
      'Commercial relationships designed for repeat institutional trust rather than short-term, transactional engagement.',
  },
];

const INDUSTRIES = [
  {
    title: 'Industrial & Manufacturing',
    detail: 'Bulk Automotive Gas Oil (AGO) supply arrangements supporting factory machinery, production lines, and industrial power.',
    icon: Building2,
  },
  {
    title: 'Energy & Infrastructure',
    detail: 'Commercial diesel and petroleum product sourcing for engineering sites, power infrastructure, and heavy equipment operators.',
    icon: Compass,
  },
  {
    title: 'Commercial Organisations',
    detail: 'Structured fuel supply coordination for corporate facilities, commercial campuses, and large institutional fuel buyers.',
    icon: Handshake,
  },
  {
    title: 'International Trading Partners',
    detail: 'Professional engagement and export supply coordination for cross-border petroleum products buyers and trading houses.',
    icon: Globe2,
  },
];

export function HomePage() {
  return (
    <>
      <SeoHead
        title="Transpetro Energy Limited | Petroleum Products Marketing & Bulk Diesel Supply Nigeria"
        description="Transpetro Energy Limited is a Nigerian petroleum products marketing, bulk AGO/diesel supply, distribution coordination, and international energy trading company."
      />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#071A33] text-white">
        <div className="absolute inset-0">
          <BrandImage
            src={IMAGES.heroTerminal}
            alt="Coastal petroleum storage terminal and oil tank farm at golden hour"
            priority
            className="w-full h-full object-cover"
          />
          <div
            className="absolute inset-0 bg-gradient-to-r from-[#071A33]/95 via-[#0B2545]/82 to-[#071A33]/45"
            aria-hidden="true"
          />
        </div>

        <div className="relative mx-auto max-w-[1200px] px-6 lg:px-8 py-24 sm:py-28 lg:py-36">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold tracking-wide text-[#F5B800] mb-4">
              Transpetro Energy Limited · Rivers State, Nigeria
            </p>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-[3.5rem] font-extrabold tracking-tight text-white leading-[1.08]">
              {COMPANY.tagline}
            </h1>
            <p className="mt-5 text-lg sm:text-xl font-medium text-slate-100 leading-snug">
              {COMPANY.secondaryStatement}
            </p>
            <p className="mt-4 text-base text-slate-200 leading-relaxed max-w-xl">
              Transpetro Energy Limited is a Nigerian petroleum products marketing, supply, and
              distribution company focused on connecting dependable product sources with industrial,
              commercial, and international energy buyers.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link
                to="/products-services"
                className="inline-flex items-center justify-center gap-2 rounded-md bg-[#F27405] hover:bg-[#DC620B] text-white font-semibold text-sm sm:text-base px-6 py-3.5 transition-colors duration-150 whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F5B800]"
              >
                Explore Our Services
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center justify-center gap-2 rounded-md bg-white/10 hover:bg-white/20 text-white border border-white/30 font-semibold text-sm sm:text-base px-6 py-3.5 backdrop-blur-xs transition-colors duration-150 whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>

        {/* Corporate Gold-Orange Base Strip */}
        <div className="relative border-t border-white/15 bg-[#071A33]/90 backdrop-blur-xs">
          <div className="mx-auto max-w-[1200px] px-6 lg:px-8 py-5 grid grid-cols-1 sm:grid-cols-3 gap-5 text-sm">
            <div className="flex items-center gap-3">
              <ShieldCheck className="h-5 w-5 text-[#F5B800] shrink-0" aria-hidden="true" />
              <span className="text-slate-200">
                Registered Nigerian Company · <span className="tabular-nums text-white font-medium">RC {COMPANY.rcNumber}</span>
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Truck className="h-5 w-5 text-[#F5B800] shrink-0" aria-hidden="true" />
              <span className="text-slate-200">Bulk AGO / Diesel & Petroleum Products Supply</span>
            </div>
            <div className="flex items-center gap-3">
              <Globe2 className="h-5 w-5 text-[#F5B800] shrink-0" aria-hidden="true" />
              <span className="text-slate-200">Domestic Commercial & International Trade Focus</span>
            </div>
          </div>
        </div>
      </section>

      {/* Section 1: Company Introduction */}
      <section className="relative overflow-hidden bg-white py-20 lg:py-24">
        <img
          src={COMPANY.logoEmblem}
          alt=""
          aria-hidden="true"
          className="pointer-events-none select-none absolute -right-16 top-1/2 -translate-y-1/2 w-80 h-auto opacity-[0.04]"
        />
        <div className="relative mx-auto max-w-[1200px] px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
            <div className="lg:col-span-6 flex flex-col justify-center">
              <div className="h-1 w-12 bg-gradient-to-r from-[#F5B800] to-[#F27405] mb-5" aria-hidden="true" />
              <p className="text-sm font-semibold text-[#DC620B] mb-2">About Transpetro Energy Limited</p>
              <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#0B2545] leading-tight">
                Connecting Reliable Petroleum Supply with Commercial & Industrial Demand
              </h2>
              <p className="mt-5 text-base text-slate-600 leading-relaxed">
                Headquartered in Rivers State, Nigeria, Transpetro Energy Limited operates as a
                petroleum products marketing, supply, and distribution business dedicated to
                commercial integrity and dependable coordination.
              </p>
              <p className="mt-4 text-base text-slate-600 leading-relaxed">
                We focus on commercial Automotive Gas Oil (AGO/Diesel) marketing, bulk fuel
                sourcing, petroleum products trading, and supply logistics coordination—serving
                organisations that require disciplined execution and transparent business
                relationships.
              </p>
              <div className="mt-8">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#0B2545] hover:text-[#DC620B] transition-colors group"
                >
                  Learn More About Us
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="h-full min-h-[320px] rounded-xl overflow-hidden border border-[#DCE3EC]">
                <BrandImage
                  src={IMAGES.pipelineInfrastructure}
                  alt="Petroleum transfer pipelines and precision industrial valve stations along a coastal energy corridor"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Products & Services Overview (Asymmetric Editorial Grid) */}
      <section className="bg-[#F6F8FB] border-y border-[#DCE3EC] py-20 lg:py-24">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold text-[#DC620B] mb-2">Products & Services</p>
              <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#0B2545]">
                Commercial Petroleum Supply & Trading Solutions
              </h2>
            </div>
            <Link
              to="/products-services"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#0B2545] hover:text-[#DC620B] whitespace-nowrap transition-colors group"
            >
              Learn More About Our Services
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((service, index) => {
              const isFeatured = index === 0 || index === 5;
              return (
                <article
                  key={service.id}
                  className={`group bg-white rounded-xl border border-[#DCE3EC] overflow-hidden flex flex-col transition-colors hover:border-[#0B2545]/35 ${
                    isFeatured ? 'md:col-span-2 lg:col-span-2' : ''
                  }`}
                >
                  <div className={`relative overflow-hidden ${isFeatured ? 'h-60 sm:h-64' : 'h-52'}`}>
                    <BrandImage
                      src={service.image}
                      alt={service.imageAlt}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="p-6 lg:p-7 flex-1 flex flex-col justify-between">
                    <div>
                      <p className="text-xs font-semibold text-[#DC620B] tabular-nums mb-2">
                        {service.number}. {service.shortTitle}
                      </p>
                      <h3 className="font-display text-xl font-bold text-[#0B2545] leading-snug">
                        {service.title}
                      </h3>
                      <p className="mt-3 text-sm sm:text-[15px] text-slate-600 leading-relaxed">
                        {service.summary}
                      </p>
                    </div>
                    <div className="mt-6 pt-4 border-t border-[#EDF1F6] flex items-center justify-between gap-4">
                      <Link
                        to={`/products-services#${service.id}`}
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0B2545] hover:text-[#DC620B] transition-colors"
                      >
                        Learn More
                        <ArrowRight className="h-4 w-4" aria-hidden="true" />
                      </Link>
                      <Link
                        to={`/contact?enquiry=${encodeURIComponent(service.enquiryCategory)}&service=${encodeURIComponent(service.shortTitle)}`}
                        className="text-sm font-medium text-slate-600 hover:text-[#0B2545] transition-colors"
                      >
                        Enquire Now
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Section 3: Why Choose Transpetro Energy? */}
      <section className="bg-white py-20 lg:py-24">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4">
              <div className="h-1 w-12 bg-gradient-to-r from-[#F5B800] to-[#F27405] mb-5" aria-hidden="true" />
              <p className="text-sm font-semibold text-[#DC620B] mb-2">Our Business Principles</p>
              <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#0B2545]">
                Why Choose Transpetro Energy?
              </h2>
              <p className="mt-4 text-base text-slate-600 leading-relaxed">
                Commercial fuel procurement requires counterparties who communicate plainly, plan
                accurately, and stand behind their commitments.
              </p>
              <div className="mt-7">
                <Link
                  to="/why-choose-us"
                  className="inline-flex items-center gap-2 rounded-md bg-[#0B2545] hover:bg-[#13355E] text-white text-sm font-semibold px-5 py-3 transition-colors"
                >
                  Learn More
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {WHY_PRINCIPLES.map((item) => (
                <div
                  key={item.number}
                  className="rounded-xl bg-[#F6F8FB] border border-[#DCE3EC] p-6 lg:p-7"
                >
                  <span className="font-display text-sm font-bold text-[#DC620B] tabular-nums">
                    {item.number}.
                  </span>
                  <h3 className="mt-2 font-display text-lg font-bold text-[#0B2545]">
                    {item.title}
                  </h3>
                  <p className="mt-2.5 text-sm text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Supply & Logistics Overview */}
      <section className="bg-[#0B2545] text-white py-20 lg:py-24">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
            <div className="lg:col-span-6 order-2 lg:order-1">
              <div className="h-full min-h-[320px] rounded-xl overflow-hidden border border-white/15">
                <BrandImage
                  src={IMAGES.tankerLogistics}
                  alt="Modern petroleum fuel road tanker trucks staged cleanly in an industrial logistics yard"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="lg:col-span-6 order-1 lg:order-2 flex flex-col justify-center">
              <div className="h-1 w-12 bg-gradient-to-r from-[#F5B800] to-[#F27405] mb-5" aria-hidden="true" />
              <p className="text-sm font-semibold text-[#F5B800] mb-2">Supply & Logistics</p>
              <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
                Disciplined Supply & Delivery Coordination
              </h2>
              <p className="mt-5 text-base text-slate-200 leading-relaxed">
                From initial product sourcing to loading scheduling, haulage coordination, and
                customer delivery planning, Transpetro Energy Limited coordinates every commercial
                link required to move petroleum products efficiently to receiving sites.
              </p>
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-slate-200">
                <div className="border-t border-white/15 pt-4">
                  <h3 className="font-display font-semibold text-white">Structured Sourcing</h3>
                  <p className="mt-1 text-slate-300 leading-relaxed">
                    Aligning product availability and specifications with buyer demand.
                  </p>
                </div>
                <div className="border-t border-white/15 pt-4">
                  <h3 className="font-display font-semibold text-white">Export & Maritime Coordination</h3>
                  <p className="mt-1 text-slate-300 leading-relaxed">
                    Coordinating documentation and scheduling for international counterparties.
                  </p>
                </div>
              </div>
              <div className="mt-8">
                <Link
                  to="/supply-logistics"
                  className="inline-flex items-center gap-2 rounded-md bg-[#F27405] hover:bg-[#DC620B] text-white text-sm font-semibold px-6 py-3 transition-colors"
                >
                  Learn More About Supply & Logistics
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Industries We Serve */}
      <section className="bg-white py-20 lg:py-24">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold text-[#DC620B] mb-2">Markets & Industries</p>
              <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#0B2545]">
                Sectors We Seek to Serve
              </h2>
              <p className="mt-3 text-base text-slate-600 leading-relaxed">
                Supporting commercial, industrial, and international buyers who depend on structured
                petroleum products supply.
              </p>
            </div>
            <Link
              to="/markets"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#0B2545] hover:text-[#DC620B] whitespace-nowrap transition-colors group"
            >
              Learn More About Markets
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {INDUSTRIES.map((sector) => {
              const Icon = sector.icon;
              return (
                <div
                  key={sector.title}
                  className="rounded-xl border border-[#DCE3EC] bg-[#F6F8FB] p-6 flex flex-col justify-between"
                >
                  <div>
                    <div className="h-11 w-11 rounded-lg bg-[#0B2545] text-[#F5B800] flex items-center justify-center mb-5">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <h3 className="font-display text-lg font-bold text-[#0B2545]">
                      {sector.title}
                    </h3>
                    <p className="mt-2.5 text-sm text-slate-600 leading-relaxed">
                      {sector.detail}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Section 6: Call to Action */}
      <section className="bg-[#F6F8FB] border-t border-[#DCE3EC] py-16 lg:py-20">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-8">
          <div className="rounded-2xl bg-[#071A33] text-white p-8 sm:p-12 lg:p-14 relative overflow-hidden">
            <img
              src={COMPANY.logoEmblem}
              alt=""
              aria-hidden="true"
              className="pointer-events-none select-none absolute -right-8 -bottom-10 w-60 h-auto opacity-[0.06]"
            />
            <div className="relative flex flex-col lg:flex-row lg:items-center justify-between gap-8">
              <div className="max-w-2xl">
                <p className="text-sm font-semibold text-[#F5B800] mb-2">
                  Commercial Enquiries & Partnerships
                </p>
                <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white">
                  Discuss Your Bulk Diesel or Petroleum Supply Requirements
                </h2>
                <p className="mt-3 text-base text-slate-300 leading-relaxed">
                  Whether you represent an industrial facility, commercial enterprise, or
                  international trading partner, our team is ready to discuss structured supply
                  arrangements.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-4 shrink-0">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-md bg-[#F27405] hover:bg-[#DC620B] text-white font-semibold text-sm sm:text-base px-6 py-3.5 transition-colors whitespace-nowrap"
                >
                  Contact Our Team
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
