import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { BrandImage } from './BrandImage';

interface BreadcrumbItem {
  label: string;
  to?: string;
}

interface PageHeroProps {
  title: string;
  subtitle: string;
  breadcrumbs: BreadcrumbItem[];
  image: string;
  imageAlt: string;
}

export function PageHero({ title, subtitle, breadcrumbs, image, imageAlt }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-[#071A33] text-white">
      <div className="absolute inset-0">
        <BrandImage
          src={image}
          alt={imageAlt}
          priority
          className="w-full h-full object-cover opacity-40"
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-[#071A33]/95 via-[#0B2545]/85 to-[#071A33]/65"
          aria-hidden="true"
        />
      </div>

      <div className="relative mx-auto max-w-[1200px] px-6 lg:px-8 pt-12 pb-16 lg:pt-16 lg:pb-20">
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex flex-wrap items-center gap-2 text-xs font-medium text-slate-300">
            {breadcrumbs.map((item, idx) => {
              const isLast = idx === breadcrumbs.length - 1;
              return (
                <li key={item.label} className="flex items-center gap-2">
                  {idx > 0 && <ChevronRight className="h-3.5 w-3.5 text-[#F5B800]" aria-hidden="true" />}
                  {item.to && !isLast ? (
                    <Link
                      to={item.to}
                      className="hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F5B800]"
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <span className="text-white" aria-current="page">
                      {item.label}
                    </span>
                  )}
                </li>
              );
            })}
          </ol>
        </nav>

        <div className="max-w-3xl">
          <div className="h-1 w-14 bg-gradient-to-r from-[#F5B800] to-[#F27405] mb-5" aria-hidden="true" />
          <h1 className="font-display text-3xl sm:text-4xl lg:text-[2.85rem] font-bold tracking-tight text-white leading-[1.12]">
            {title}
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-200 leading-relaxed max-w-2xl">
            {subtitle}
          </p>
        </div>
      </div>

      {/* Subtle golden-orange corporate accent bar echoing letterhead */}
      <div className="relative h-1 w-full bg-gradient-to-r from-[#0B2545] via-[#F5B800] to-[#F27405]" aria-hidden="true" />
    </section>
  );
}
