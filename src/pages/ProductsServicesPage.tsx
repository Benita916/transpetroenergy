import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import { CinematicImage, Reveal } from '../components/MotionPrimitives';
import { PageHero } from '../components/PageHero';
import { SeoHead } from '../components/SeoHead';
import { IMAGES, SERVICES } from '../data/company';

export function ProductsServicesPage() {
  return (
    <>
      <SeoHead
        title="Products & Services | Bulk Diesel (AGO) Supply & Petroleum Trading – Transpetro Energy"
        description="Explore Transpetro Energy Limited's commercial AGO/diesel marketing, bulk diesel sourcing, petroleum products trading, distribution coordination, and export supply arrangements."
      />

      <PageHero
        title="Products & Services"
        subtitle="Focused commercial petroleum products marketing, bulk Automotive Gas Oil (AGO/Diesel) sourcing, supply coordination, and international trading arrangements."
        breadcrumbs={[
          { label: 'Home', to: '/' },
          { label: 'Products & Services' },
        ]}
        image={IMAGES.agoDieselSupply}
        imageAlt="Modern bulk diesel loading rack gantry with articulated loading arms"
      />

      {/* Commercial Scope Intro */}
      <section className="bg-white py-14 border-b border-[#DCE3EC]">
        <Reveal className="mx-auto max-w-[1200px] px-6 lg:px-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold text-[#DC620B] mb-1.5">Commercial & Institutional Focus</p>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#0B2545]">
              Structured Energy Supply for Commercial, Industrial & Trading Counterparties
            </h2>
            <p className="mt-3 text-base text-slate-600 leading-relaxed">
              Transpetro Energy Limited focuses exclusively on wholesale, commercial, industrial,
              and international petroleum supply arrangements. Select any service below to submit a
              tailored enquiry directly to our commercial desk.
            </p>
          </div>
          <Link
            to="/supply-logistics"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-[#0B2545] hover:text-[#DC620B] whitespace-nowrap shrink-0 transition-colors"
          >
            View Supply & Logistics Approach
            <ArrowRight
              className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
              aria-hidden="true"
            />
          </Link>
        </Reveal>
      </section>

      {/* Individual Service Sections */}
      <section className="bg-[#F6F8FB] py-16 lg:py-20">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-8 space-y-12 lg:space-y-16">
          {SERVICES.map((service, index) => {
            const isEven = index % 2 === 1;
            const enquiryHref = `/contact?enquiry=${encodeURIComponent(
              service.enquiryCategory
            )}&service=${encodeURIComponent(service.title)}`;

            return (
              <Reveal key={service.id} delay={0.05}>
                <article
                  id={service.id}
                  className="group scroll-mt-24 rounded-2xl bg-white border border-[#DCE3EC] overflow-hidden transition-all duration-300 hover:border-[#0B2545]/30 hover:shadow-lg"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
                    <div
                      className={`lg:col-span-5 min-h-[260px] lg:min-h-[380px] ${
                        isEven ? 'lg:order-2' : 'lg:order-1'
                      }`}
                    >
                      <CinematicImage
                        src={service.image}
                        alt={service.imageAlt}
                        ambientZoom={index === 0 || index === 5}
                        className="w-full h-full"
                      />
                    </div>

                    <div
                      className={`lg:col-span-7 p-7 sm:p-10 lg:p-12 flex flex-col justify-between ${
                        isEven ? 'lg:order-1' : 'lg:order-2'
                      }`}
                    >
                      <div>
                        <p className="text-sm font-semibold text-[#DC620B] tabular-nums mb-2">
                          {service.number}. {service.enquiryCategory}
                        </p>
                        <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#0B2545] leading-tight">
                          {service.title}
                        </h2>
                        <p className="mt-4 text-base text-slate-600 leading-relaxed">
                          {service.description}
                        </p>

                        <ul className="mt-6 space-y-2.5 text-sm sm:text-[15px] text-slate-700">
                          {service.highlights.map((item) => (
                            <li key={item} className="flex items-start gap-2.5">
                              <Check className="h-4 w-4 text-[#F27405] shrink-0 mt-1" aria-hidden="true" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="mt-8 pt-6 border-t border-[#EDF1F6] flex flex-wrap items-center gap-4">
                        <Link
                          to={enquiryHref}
                          className="cta-sheen group/cta inline-flex items-center justify-center gap-2 rounded-md bg-[#F27405] hover:bg-[#DC620B] text-white text-sm font-semibold px-6 py-3 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md whitespace-nowrap"
                        >
                          Enquire Now
                          <ArrowRight
                            className="h-4 w-4 transition-transform duration-200 group-hover/cta:translate-x-1"
                            aria-hidden="true"
                          />
                        </Link>
                        <Link
                          to="/supply-logistics"
                          className="text-sm font-semibold text-[#0B2545] hover:text-[#DC620B] transition-colors"
                        >
                          Learn how we coordinate delivery
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* Bottom Commercial CTA */}
      <section className="bg-white py-16 lg:py-20 border-t border-[#DCE3EC]">
        <Reveal className="mx-auto max-w-[1200px] px-6 lg:px-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#0B2545]">
              Have a Specific Volume or Supply Requirement?
            </h2>
            <p className="mt-2.5 text-base text-slate-600 leading-relaxed">
              Share your expected product specifications, volume profile, and delivery window with
              our commercial desk to begin a structured supply discussion.
            </p>
          </div>
          <Link
            to="/contact?enquiry=Product%20Supply"
            className="cta-sheen group inline-flex items-center justify-center gap-2 rounded-md bg-[#0B2545] hover:bg-[#13355E] text-white text-sm font-semibold px-6 py-3.5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md whitespace-nowrap shrink-0"
          >
            Submit Supply Enquiry
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
