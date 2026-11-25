import { Link } from 'react-router-dom';
import { ArrowRight, Building2, Factory, Globe2, Layers, Zap } from 'lucide-react';
import {
  CinematicImage,
  Reveal,
  StaggerGroup,
  StaggerItem,
} from '../components/MotionPrimitives';
import { PageHero } from '../components/PageHero';
import { SeoHead } from '../components/SeoHead';
import { COMPANY, IMAGES } from '../data/company';

const MARKET_SEGMENTS = [
  {
    number: '01',
    title: 'Industrial & Manufacturing Businesses',
    icon: Factory,
    description:
      'Manufacturing plants, processing facilities, and industrial estates rely on uninterrupted diesel and petroleum fuel availability to power generators, boilers, and production equipment. Transpetro Energy Limited seeks to support industrial operators with structured bulk AGO supply and dependable scheduling.',
    enquiry: 'Bulk Diesel Purchase',
  },
  {
    number: '02',
    title: 'Energy & Infrastructure Businesses',
    icon: Zap,
    description:
      'Construction contractors, civil engineering firms, telecommunications infrastructure operators, and power-intensive project sites require timely fuel replenishment across demanding operating schedules. We coordinate commercial supply arrangements tailored to heavy operational fuel demand.',
    enquiry: 'Product Supply',
  },
  {
    number: '03',
    title: 'Commercial Organisations',
    icon: Building2,
    description:
      'Corporate offices, hospitality facilities, logistics hubs, healthcare institutions, and commercial complexes depend on reliable diesel reserves to sustain backup power and day-to-day operations. We structure transparent commercial fuel supply with clear invoicing and communication.',
    enquiry: 'Bulk Diesel Purchase',
  },
  {
    number: '04',
    title: 'Large-Scale Petroleum Products Buyers',
    icon: Layers,
    description:
      'Institutional buyers, wholesale off-takers, and fleet or facility procurement desks requiring high-volume petroleum product sourcing benefit from disciplined market engagement, clear supply terms, and coordinated bulk delivery planning.',
    enquiry: 'Product Supply',
  },
  {
    number: '05',
    title: 'International Petroleum Products Buyers & Trading Partners',
    icon: Globe2,
    description:
      'International trading houses and overseas petroleum product buyers seeking credible Nigerian counterparties can engage Transpetro Energy Limited for structured export supply discussions, clear counterparty procedures, and professional trade coordination.',
    enquiry: 'Export Enquiry',
  },
];

export function MarketsPage() {
  return (
    <>
      <SeoHead
        title="Markets & Industries | Commercial & International Energy Buyers – Transpetro Energy"
        description="Explore the industrial, manufacturing, energy, commercial, and international petroleum trading segments Transpetro Energy Limited aims to serve."
      />

      <PageHero
        title="Markets & Industries"
        subtitle="Connecting petroleum products supply opportunities with the operational needs of commercial, industrial, and international buyers."
        breadcrumbs={[
          { label: 'Home', to: '/' },
          { label: 'Markets & Industries' },
        ]}
        image={IMAGES.industrialPower}
        imageAlt="Modern industrial manufacturing and power generation complex at twilight"
      />

      {/* How We Connect Supply & Demand */}
      <section className="relative overflow-hidden bg-white py-20 lg:py-24">
        <img
          src={COMPANY.logoEmblem}
          alt=""
          aria-hidden="true"
          className="pointer-events-none select-none absolute -right-14 top-12 w-72 h-auto opacity-[0.04]"
        />
        <div className="relative mx-auto max-w-[1200px] px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
            <Reveal className="lg:col-span-6 flex flex-col justify-center">
              <div className="h-1 w-12 bg-gradient-to-r from-[#F5B800] to-[#F27405] mb-5" aria-hidden="true" />
              <p className="text-sm font-semibold text-[#DC620B] mb-2">Market Positioning</p>
              <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#0B2545]">
                {COMPANY.secondaryStatement}
              </h2>
              <p className="mt-5 text-base text-slate-600 leading-relaxed">
                Across Nigeria’s industrial corridors and international energy markets, commercial
                fuel buyers face the continuous task of securing reliable supply without sacrificing
                clarity or commercial integrity.
              </p>
              <p className="mt-4 text-base text-slate-600 leading-relaxed">
                Transpetro Energy Limited aims to bridge this gap by connecting structured petroleum
                products supply opportunities directly with the specific volume, timing, and
                commercial needs of our target customer segments. We focus on building transparent,
                repeatable supply relationships with both local and international buyers.
              </p>
            </Reveal>

            <div className="lg:col-span-6 group">
              <CinematicImage
                src={IMAGES.agoDieselSupply}
                alt="Modern bulk diesel loading rack supporting commercial and industrial fuel distribution"
                ambientZoom
                className="h-full min-h-[300px] rounded-xl border border-[#DCE3EC]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Five Target Market Segments */}
      <section className="bg-[#F6F8FB] border-y border-[#DCE3EC] py-20 lg:py-24">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-8">
          <Reveal className="max-w-2xl mb-12">
            <p className="text-sm font-semibold text-[#DC620B] mb-2">Target Customer Segments</p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#0B2545]">
              Industries & Buyers We Seek to Serve
            </h2>
          </Reveal>

          <StaggerGroup staggerDelay={0.07} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {MARKET_SEGMENTS.map((segment, index) => {
              const Icon = segment.icon;
              const isLastFull = index === MARKET_SEGMENTS.length - 1;
              return (
                <StaggerItem key={segment.number} className={isLastFull ? 'md:col-span-2' : ''}>
                  <article className="group h-full rounded-xl bg-white border border-[#DCE3EC] p-7 lg:p-8 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:border-[#0B2545]/30 hover:shadow-md">
                    <div>
                      <div className="flex items-center justify-between gap-4 mb-5">
                        <span className="font-display text-sm font-bold text-[#DC620B] tabular-nums">
                          {segment.number}.
                        </span>
                        <div className="h-10 w-10 rounded-lg bg-[#0B2545] text-[#F5B800] flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-105">
                          <Icon className="h-5 w-5" aria-hidden="true" />
                        </div>
                      </div>
                      <h3 className="font-display text-xl sm:text-2xl font-bold text-[#0B2545]">
                        {segment.title}
                      </h3>
                      <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed max-w-4xl">
                        {segment.description}
                      </p>
                    </div>

                    <div className="mt-6 pt-5 border-t border-[#EDF1F6]">
                      <Link
                        to={`/contact?enquiry=${encodeURIComponent(segment.enquiry)}&service=${encodeURIComponent(segment.title)}`}
                        className="group/link inline-flex items-center gap-2 text-sm font-semibold text-[#0B2545] hover:text-[#DC620B] transition-colors"
                      >
                        Enquire Now
                        <ArrowRight
                          className="h-4 w-4 transition-transform duration-200 group-hover/link:translate-x-1"
                          aria-hidden="true"
                        />
                      </Link>
                    </div>
                  </article>
                </StaggerItem>
              );
            })}
          </StaggerGroup>
        </div>
      </section>

      {/* Local & International Buyers CTA */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-8">
          <Reveal>
            <div className="rounded-2xl bg-[#0B2545] text-white overflow-hidden shadow-md">
              <div
                className="gold-accent-bar h-1 w-full bg-gradient-to-r from-[#F5B800] via-[#F27405] to-[#F5B800]"
                aria-hidden="true"
              />
              <div className="p-8 sm:p-12 lg:p-14 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-8">
                  <p className="text-sm font-semibold text-[#F5B800] mb-2">
                    Local & International Buyers
                  </p>
                  <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-white">
                    Ready to Discuss Your Commercial or Export Supply Requirements?
                  </h2>
                  <p className="mt-3 text-base text-slate-200 leading-relaxed">
                    We welcome enquiries from Nigerian industrial and commercial fuel buyers as well
                    as prospective international trading partners seeking transparent, structured
                    supply discussions.
                  </p>
                </div>
                <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3">
                  <Link
                    to="/contact?enquiry=Bulk%20Diesel%20Purchase"
                    className="cta-sheen group inline-flex items-center justify-center gap-2 rounded-md bg-[#F27405] hover:bg-[#DC620B] text-white text-sm font-semibold px-6 py-3.5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg whitespace-nowrap"
                  >
                    Domestic Supply Enquiry
                    <ArrowRight
                      className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </Link>
                  <Link
                    to="/contact?enquiry=Export%20Enquiry"
                    className="inline-flex items-center justify-center gap-2 rounded-md bg-white/10 hover:bg-white/20 text-white border border-white/25 text-sm font-semibold px-6 py-3.5 transition-all duration-200 hover:-translate-y-0.5 whitespace-nowrap"
                  >
                    International Trade Enquiry
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
