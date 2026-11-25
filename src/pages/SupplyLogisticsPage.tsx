import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import {
  CinematicImage,
  ParallaxBackdrop,
  Reveal,
  StaggerGroup,
  StaggerItem,
} from '../components/MotionPrimitives';
import { PageHero } from '../components/PageHero';
import { SeoHead } from '../components/SeoHead';
import { COMPANY, IMAGES } from '../data/company';

const SUPPLY_PILLARS = [
  {
    number: '01',
    title: 'Petroleum Products Sourcing',
    description:
      'Every reliable transaction begins with disciplined product sourcing. Transpetro Energy Limited engages qualified petroleum product suppliers to align product availability, commercial terms, and specification requirements with each customer enquiry before scheduling fulfilment.',
  },
  {
    number: '02',
    title: 'Supply Coordination',
    description:
      'We act as the commercial coordination bridge between product supply sources and receiving buyers—managing order confirmation, loading allocation timelines, documentation checks, and counterparty alignment so orders move smoothly from confirmation to dispatch.',
  },
  {
    number: '03',
    title: 'Bulk Supply Arrangements',
    description:
      'For high-volume Automotive Gas Oil (AGO) and commercial petroleum consumers, we structure bulk supply arrangements suited to single-lot requirements or scheduled recurring replenishments, aligned with site storage capacity and procurement cycles.',
  },
  {
    number: '04',
    title: 'Logistics Coordination',
    description:
      'Working alongside qualified haulage and maritime logistics service providers, we coordinate road tanker dispatch, loading bay scheduling, and route timing without claiming ownership of third-party depots, tank farms, fleets, or vessels—focusing our accountability on end-to-end commercial coordination.',
  },
  {
    number: '05',
    title: 'Delivery Planning',
    description:
      'Prior to dispatch, we confirm site access requirements, receiving hours, offloading protocols, and key site contacts with the buyer. Structured delivery planning minimises turnaround delays and supports predictable inventory management.',
  },
  {
    number: '06',
    title: 'Customer Communication',
    description:
      'Clear, timely communication is central to our operating model. Customers receive direct commercial contact throughout order confirmation, loading milestones, transit status, and post-delivery documentation follow-up.',
  },
];

export function SupplyLogisticsPage() {
  return (
    <>
      <SeoHead
        title="Supply & Logistics | Petroleum Distribution & Export Coordination – Transpetro Energy"
        description="Discover how Transpetro Energy Limited coordinates petroleum products sourcing, bulk diesel supply arrangements, delivery planning, and international export logistics in Nigeria."
      />

      <PageHero
        title="Supply & Logistics"
        subtitle="Structured sourcing, disciplined supply coordination, delivery planning, and clear communication from product allocation through receiving confirmation."
        breadcrumbs={[
          { label: 'Home', to: '/' },
          { label: 'Supply & Logistics' },
        ]}
        image={IMAGES.tankerLogistics}
        imageAlt="Modern petroleum road tanker trucks staged cleanly in an industrial logistics yard"
      />

      {/* Operating Philosophy */}
      <section className="bg-white py-20 lg:py-24">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
            <Reveal className="lg:col-span-6 flex flex-col justify-center">
              <div className="h-1 w-12 bg-gradient-to-r from-[#F5B800] to-[#F27405] mb-5" aria-hidden="true" />
              <p className="text-sm font-semibold text-[#DC620B] mb-2">Our Delivery Approach</p>
              <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#0B2545]">
                Coordinated Commercial Fulfilment Across Every Stage
              </h2>
              <p className="mt-5 text-base text-slate-600 leading-relaxed">
                Effective petroleum products supply requires more than product availability—it
                requires accurate coordination across suppliers, loading schedules, transport
                logistics partners, and customer receiving teams.
              </p>
              <p className="mt-4 text-base text-slate-600 leading-relaxed">
                Transpetro Energy Limited focuses on disciplined commercial coordination and
                transparent tracking across each stage of an order, ensuring industrial and
                commercial buyers stay informed from initial confirmation through site delivery.
              </p>
            </Reveal>

            <div className="lg:col-span-6 group">
              <CinematicImage
                src={IMAGES.heroTerminal}
                alt="Coastal petroleum storage terminal and tank farm infrastructure at sunset"
                ambientZoom
                className="h-full min-h-[300px] rounded-xl border border-[#DCE3EC]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Six Core Supply & Logistics Stages */}
      <section className="bg-[#F6F8FB] border-y border-[#DCE3EC] py-20 lg:py-24">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-8">
          <Reveal className="max-w-2xl mb-12">
            <p className="text-sm font-semibold text-[#DC620B] mb-2">End-to-End Coordination</p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#0B2545]">
              How We Coordinate Petroleum Supply
            </h2>
          </Reveal>

          <StaggerGroup staggerDelay={0.07} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SUPPLY_PILLARS.map((pillar) => (
              <StaggerItem key={pillar.number}>
                <div className="h-full rounded-xl bg-white border border-[#DCE3EC] p-7 flex flex-col transition-all duration-300 hover:-translate-y-1 hover:border-[#0B2545]/30 hover:shadow-md">
                  <span className="font-display text-sm font-bold text-[#DC620B] tabular-nums">
                    {pillar.number}.
                  </span>
                  <h3 className="mt-2 font-display text-xl font-bold text-[#0B2545]">
                    {pillar.title}
                  </h3>
                  <p className="mt-3 text-sm sm:text-[15px] text-slate-600 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* Section 7: International Supply & Export Coordination with Parallax */}
      <section className="relative overflow-hidden bg-[#071A33] text-white py-20 lg:py-24">
        <ParallaxBackdrop
          src={IMAGES.heroOilTanker}
          alt="International oil tanker sailing across calm ocean"
          kenBurns="none"
          imageClassName="w-full h-full object-cover opacity-15"
          overlayClassName="bg-gradient-to-r from-[#071A33]/94 via-[#071A33]/88 to-[#071A33]/92"
        />
        <img
          src={COMPANY.logoEmblem}
          alt=""
          aria-hidden="true"
          className="pointer-events-none select-none absolute -right-12 -bottom-12 w-72 h-auto opacity-[0.045]"
        />
        <div className="relative mx-auto max-w-[1200px] px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
            <div className="lg:col-span-6 group">
              <CinematicImage
                src={IMAGES.maritimeTanker}
                alt="International petroleum product tanker vessel navigating coastal waters near a loading terminal"
                ambientZoom
                className="h-full min-h-[320px] rounded-xl border border-white/15"
              />
            </div>

            <Reveal className="lg:col-span-6 flex flex-col justify-center">
              <p className="text-sm font-semibold text-[#F5B800] tabular-nums mb-2">
                07. Cross-Border Trade Coordination
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white">
                International Supply & Export Coordination
              </h2>
              <p className="mt-5 text-base text-slate-200 leading-relaxed">
                For international petroleum buyers and trading counterparties, Transpetro Energy
                Limited provides structured commercial engagement for export supply arrangements.
                We coordinate counterparty documentation, trade procedure alignment, and third-party
                maritime and inspection scheduling in accordance with agreed commercial terms.
              </p>
              <p className="mt-4 text-base text-slate-300 leading-relaxed">
                Our international desk prioritises clear verification, transparent communication,
                and realistic scheduling from initial commercial enquiry through transaction
                structuring.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  to="/contact?enquiry=Export%20Enquiry"
                  className="cta-sheen group inline-flex items-center gap-2 rounded-md bg-[#F27405] hover:bg-[#DC620B] text-white text-sm font-semibold px-6 py-3.5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg whitespace-nowrap"
                >
                  Submit Export Enquiry
                  <ArrowRight
                    className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </Link>
                <Link
                  to="/products-services"
                  className="inline-flex items-center gap-2 rounded-md bg-white/10 hover:bg-white/20 text-white border border-white/25 text-sm font-semibold px-6 py-3.5 transition-all duration-200 hover:-translate-y-0.5 whitespace-nowrap"
                >
                  View Products & Services
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-white py-16 lg:py-20">
        <Reveal className="mx-auto max-w-[1200px] px-6 lg:px-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#0B2545]">
              Plan Your Next Bulk Fuel Delivery
            </h2>
            <p className="mt-2 text-base text-slate-600 leading-relaxed">
              Speak with our supply coordination desk to review delivery windows, site requirements,
              and bulk diesel scheduling.
            </p>
          </div>
          <Link
            to="/contact?enquiry=Bulk%20Diesel%20Purchase"
            className="cta-sheen group inline-flex items-center justify-center gap-2 rounded-md bg-[#0B2545] hover:bg-[#13355E] text-white text-sm font-semibold px-6 py-3.5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md whitespace-nowrap shrink-0"
          >
            Enquire Now
            <ArrowRight
              className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
              aria-hidden="true"
            />
          </Link>
        </Reveal>
      </section>
    </>
  );
}
