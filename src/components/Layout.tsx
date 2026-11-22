import { useEffect, useState } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { Globe, Mail, MapPin, Menu, Phone, X } from 'lucide-react';
import { COMPANY, NAV_LINKS, SERVICES } from '../data/company';
import { WhatsAppButton } from './WhatsAppButton';

export function Layout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { pathname, hash } = useLocation();

  useEffect(() => {
    setMobileMenuOpen(false);
    if (hash) {
      const target = document.getElementById(hash.slice(1));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [pathname, hash]);

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#0B2545]">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-md focus:bg-[#0B2545] focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
      >
        Skip to main content
      </a>

      {/* Top Navigation — Strict 3-Zone Contract */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#DCE3EC]">
        <div className="mx-auto max-w-[1240px] px-5 lg:px-8 h-[68px] lg:h-[76px] flex items-center justify-between gap-8">
          {/* Zone 1: Brand Wordmark (single line, no subtitle clutter) */}
          <Link
            to="/"
            className="flex items-center gap-3 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F27405]"
            aria-label={`${COMPANY.name} Home`}
          >
            <img
              src={COMPANY.logoEmblem}
              alt=""
              aria-hidden="true"
              className="h-10 lg:h-11 w-auto object-contain shrink-0"
            />
            <span className="font-display text-base lg:text-[1.125rem] font-extrabold tracking-tight text-[#0B2545]">
              TRANSPETRO <span className="font-semibold text-[#13355E]">ENERGY</span>
            </span>
          </Link>

          {/* Zone 2: Clean single-line text navigation links */}
          <nav aria-label="Primary Navigation" className="hidden lg:flex items-center gap-6 xl:gap-7">
            {NAV_LINKS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  `relative py-2 text-sm font-medium whitespace-nowrap shrink-0 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F27405] ${
                    isActive
                      ? 'text-[#0B2545] font-semibold after:absolute after:left-0 after:right-0 after:bottom-0 after:h-[2px] after:bg-[#F27405]'
                      : 'text-slate-600 hover:text-[#0B2545]'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* Zone 3: Single Primary Action + Mobile Trigger */}
          <div className="flex items-center gap-3 shrink-0">
            <Link
              to="/contact"
              className={`hidden sm:inline-flex items-center justify-center rounded-md px-5 py-2.5 text-sm font-semibold whitespace-nowrap shrink-0 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F27405] ${
                pathname === '/contact'
                  ? 'bg-[#DC620B] text-white'
                  : 'bg-[#0B2545] text-white hover:bg-[#13355E]'
              }`}
            >
              Contact Us
            </Link>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              className="lg:hidden inline-flex items-center justify-center h-11 w-11 rounded-md border border-[#DCE3EC] text-[#0B2545] hover:bg-[#F6F8FB] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F27405]"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div
            id="mobile-navigation"
            className="lg:hidden border-t border-[#DCE3EC] bg-white shadow-lg"
          >
            <nav aria-label="Mobile Navigation" className="mx-auto max-w-[1240px] px-5 py-4 flex flex-col gap-1">
              {[...NAV_LINKS, { label: 'Contact Us', to: '/contact' }].map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === '/'}
                  className={({ isActive }) =>
                    `px-4 py-3 rounded-md text-base font-medium transition-colors ${
                      isActive
                        ? 'bg-[#F6F8FB] text-[#0B2545] font-semibold'
                        : 'text-slate-700 hover:bg-[#F6F8FB] hover:text-[#0B2545]'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
              <div className="mt-3 pt-4 border-t border-[#DCE3EC] px-4 flex flex-col gap-2 text-sm text-slate-600">
                <a href={COMPANY.phoneHref} className="inline-flex items-center gap-2 hover:text-[#0B2545] tabular-nums">
                  <Phone className="h-4 w-4 text-[#F27405]" aria-hidden="true" />
                  {COMPANY.phoneDisplay}
                </a>
                <a href={COMPANY.emailHref} className="inline-flex items-center gap-2 hover:text-[#0B2545]">
                  <Mail className="h-4 w-4 text-[#F27405]" aria-hidden="true" />
                  {COMPANY.email}
                </a>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Page Main Content */}
      <main id="main-content" className="flex-1">
        <Outlet />
      </main>

      {/* Premium Navy-Blue Corporate Footer */}
      <footer className="relative overflow-hidden bg-[#071A33] text-slate-200">
        {/* Letterhead-inspired Gold & Orange Top Accent Rule */}
        <div className="h-1.5 w-full bg-gradient-to-r from-[#F5B800] via-[#F27405] to-[#0B2545]" aria-hidden="true" />

        {/* Subtle Brand Logo Watermark */}
        <img
          src={COMPANY.logoEmblem}
          alt=""
          aria-hidden="true"
          className="pointer-events-none select-none absolute -right-10 -bottom-10 w-72 h-auto opacity-[0.045]"
        />

        <div className="relative mx-auto max-w-[1200px] px-6 lg:px-8 pt-16 pb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
            {/* Brand Column */}
            <div className="lg:col-span-4 space-y-5">
              <Link to="/" className="inline-flex items-center gap-3.5 group">
                <div className="rounded-lg bg-white p-1.5 shrink-0">
                  <img
                    src={COMPANY.logoEmblem}
                    alt={`${COMPANY.name} logo`}
                    className="h-11 w-auto object-contain"
                  />
                </div>
                <div>
                  <div className="font-display text-lg font-extrabold tracking-tight text-white">
                    TRANSPETRO
                  </div>
                  <div className="font-display text-xs font-semibold tracking-[0.14em] text-[#F5B800] uppercase">
                    ENERGY LIMITED
                  </div>
                </div>
              </Link>

              <div className="space-y-2">
                <p className="text-sm font-semibold text-white italic">
                  {COMPANY.tagline}
                </p>
                <p className="text-sm text-slate-300 leading-relaxed max-w-sm">
                  {COMPANY.secondaryStatement} A Nigerian petroleum products marketing, supply, and
                  distribution company connecting reliable product supply with commercial and
                  industrial energy demand.
                </p>
              </div>

              <div className="pt-2 text-xs text-slate-400 space-y-1 tabular-nums">
                <p>RC Number: {COMPANY.rcNumber} · TIN: {COMPANY.tin}</p>
                <p>Managing Director/CEO: {COMPANY.mdCeo}</p>
              </div>
            </div>

            {/* Quick Navigation */}
            <div className="lg:col-span-2">
              <h2 className="font-display text-sm font-semibold text-white tracking-wide mb-4">
                Quick Links
              </h2>
              <ul className="space-y-2.5 text-sm">
                {NAV_LINKS.map((item) => (
                  <li key={item.to}>
                    <Link
                      to={item.to}
                      className="text-slate-300 hover:text-[#F5B800] transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    to="/contact"
                    className="text-slate-300 hover:text-[#F5B800] transition-colors"
                  >
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>

            {/* Products & Services */}
            <div className="lg:col-span-3">
              <h2 className="font-display text-sm font-semibold text-white tracking-wide mb-4">
                Products & Services
              </h2>
              <ul className="space-y-2.5 text-sm">
                {SERVICES.map((service) => (
                  <li key={service.id}>
                    <Link
                      to={`/products-services#${service.id}`}
                      className="text-slate-300 hover:text-[#F5B800] transition-colors"
                    >
                      {service.shortTitle}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Corporate Contact */}
            <div className="lg:col-span-3">
              <h2 className="font-display text-sm font-semibold text-white tracking-wide mb-4">
                Corporate Office
              </h2>
              <ul className="space-y-3.5 text-sm text-slate-300">
                <li className="flex items-start gap-3">
                  <MapPin className="h-4 w-4 text-[#F5B800] shrink-0 mt-1" aria-hidden="true" />
                  <span className="leading-relaxed">{COMPANY.address}</span>
                </li>
                <li>
                  <a
                    href={COMPANY.phoneHref}
                    className="flex items-center gap-3 hover:text-white transition-colors tabular-nums"
                  >
                    <Phone className="h-4 w-4 text-[#F5B800] shrink-0" aria-hidden="true" />
                    <span>{COMPANY.phoneDisplay}</span>
                  </a>
                </li>
                <li>
                  <a
                    href={COMPANY.emailHref}
                    className="flex items-center gap-3 hover:text-white transition-colors break-all"
                  >
                    <Mail className="h-4 w-4 text-[#F5B800] shrink-0" aria-hidden="true" />
                    <span>{COMPANY.email}</span>
                  </a>
                </li>
                <li>
                  <a
                    href={COMPANY.websiteHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 hover:text-white transition-colors"
                  >
                    <Globe className="h-4 w-4 text-[#F5B800] shrink-0" aria-hidden="true" />
                    <span>{COMPANY.websiteDisplay}</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-slate-400">
            <p>{COMPANY.copyright}</p>
            <p className="text-slate-400">
              {COMPANY.businessLine} · Rivers State, Nigeria
            </p>
          </div>
        </div>
      </footer>

      <WhatsAppButton />
    </div>
  );
}
