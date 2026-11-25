import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation, useOutlet } from 'react-router-dom';
import { Globe, Mail, MapPin, Menu, Phone, X } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { COMPANY, NAV_LINKS, SERVICES } from '../data/company';
import { LUXURY_EASE, StaggerGroup, StaggerItem } from './MotionPrimitives';
import { PearlAssistant } from './PearlAssistant';
import { WhatsAppButton } from './WhatsAppButton';

export function Layout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname, hash } = useLocation();
  const outlet = useOutlet();
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    if (hash) {
      const target = document.getElementById(hash.slice(1));
      if (target) {
        target.scrollIntoView({ behavior: prefersReduced ? 'auto' : 'smooth' });
        return;
      }
    }
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [pathname, hash, prefersReduced]);

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#0B2545]">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-md focus:bg-[#0B2545] focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
      >
        Skip to main content
      </a>

      {/* Top Navigation — Strict 3-Zone Contract with refined hover & scroll elevation */}
      <header
        className={`sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b transition-shadow duration-200 ${
          scrolled ? 'border-[#DCE3EC] shadow-sm' : 'border-[#DCE3EC]'
        }`}
      >
        <div className="mx-auto max-w-[1240px] px-5 lg:px-8 h-[68px] lg:h-[76px] flex items-center justify-between gap-8">
          {/* Zone 1: Brand Wordmark */}
          <Link
            to="/"
            className="group flex items-center gap-3 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F27405]"
            aria-label={`${COMPANY.name} Home`}
          >
            <img
              src={COMPANY.logoEmblem}
              alt=""
              aria-hidden="true"
              className="h-10 lg:h-11 w-auto object-contain shrink-0 transition-transform duration-300 group-hover:scale-[1.04]"
            />
            <span className="font-display text-base lg:text-[1.125rem] font-extrabold tracking-tight text-[#0B2545]">
              TRANSPETRO <span className="font-semibold text-[#13355E]">ENERGY</span>
            </span>
          </Link>

          {/* Zone 2: Clean single-line text navigation links with animated glide underline */}
          <nav aria-label="Primary Navigation" className="hidden lg:flex items-center gap-6 xl:gap-7">
            {NAV_LINKS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  `nav-glide py-2 text-sm font-medium whitespace-nowrap shrink-0 transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F27405] ${
                    isActive
                      ? 'text-[#0B2545] font-semibold'
                      : 'text-slate-600 hover:text-[#0B2545]'
                  }`
                }
                data-active={
                  item.to === '/' ? pathname === '/' : pathname.startsWith(item.to)
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
              className={`cta-sheen hidden sm:inline-flex items-center justify-center rounded-md px-5 py-2.5 text-sm font-semibold whitespace-nowrap shrink-0 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F27405] ${
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

        {/* Animated Mobile Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              id="mobile-navigation"
              initial={prefersReduced ? false : { opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={prefersReduced ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: LUXURY_EASE }}
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
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Smooth Subtle Page Transition Across All Seven Pages */}
      <main id="main-content" className="flex-1">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={pathname}
            initial={prefersReduced ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={prefersReduced ? undefined : { opacity: 0, y: -6 }}
            transition={{ duration: 0.28, ease: LUXURY_EASE }}
          >
            {outlet}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Premium Navy-Blue Corporate Footer with Entrance Animation & Gold/Orange Accent Effects */}
      <footer className="relative overflow-hidden bg-[#071A33] text-slate-200">
        {/* Animated Gold & Orange Horizon Accent Bar */}
        <div
          className="gold-accent-bar h-1.5 w-full bg-gradient-to-r from-[#F5B800] via-[#F27405] to-[#F5B800]"
          aria-hidden="true"
        />

        {/* Subtle warm atmospheric ambient glow */}
        <div
          className="pointer-events-none absolute -top-24 left-1/4 w-[420px] h-[220px] rounded-full bg-[#F27405]/[0.06] blur-3xl"
          aria-hidden="true"
        />

        {/* Subtle Brand Logo Watermark */}
        <img
          src={COMPANY.logoEmblem}
          alt=""
          aria-hidden="true"
          className="pointer-events-none select-none absolute -right-10 -bottom-10 w-72 h-auto opacity-[0.045]"
        />

        <div className="relative mx-auto max-w-[1200px] px-6 lg:px-8 pt-16 pb-12">
          <StaggerGroup
            staggerDelay={0.09}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8"
          >
            {/* Brand Column */}
            <StaggerItem className="lg:col-span-4 space-y-5">
              <Link to="/" className="inline-flex items-center gap-3.5 group">
                <div className="rounded-lg bg-white p-1.5 shrink-0 transition-transform duration-300 group-hover:scale-[1.04]">
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
            </StaggerItem>

            {/* Quick Navigation */}
            <StaggerItem className="lg:col-span-2">
              <h2 className="font-display text-sm font-semibold text-white tracking-wide mb-4">
                Quick Links
              </h2>
              <div className="h-[2px] w-8 bg-gradient-to-r from-[#F5B800] to-[#F27405] mb-4" aria-hidden="true" />
              <ul className="space-y-2.5 text-sm">
                {NAV_LINKS.map((item) => (
                  <li key={item.to}>
                    <Link
                      to={item.to}
                      className="inline-block text-slate-300 hover:text-[#F5B800] transition-all duration-200 hover:translate-x-1"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    to="/contact"
                    className="inline-block text-slate-300 hover:text-[#F5B800] transition-all duration-200 hover:translate-x-1"
                  >
                    Contact Us
                  </Link>
                </li>
              </ul>
            </StaggerItem>

            {/* Products & Services */}
            <StaggerItem className="lg:col-span-3">
              <h2 className="font-display text-sm font-semibold text-white tracking-wide mb-4">
                Products & Services
              </h2>
              <div className="h-[2px] w-8 bg-gradient-to-r from-[#F5B800] to-[#F27405] mb-4" aria-hidden="true" />
              <ul className="space-y-2.5 text-sm">
                {SERVICES.map((service) => (
                  <li key={service.id}>
                    <Link
                      to={`/products-services#${service.id}`}
                      className="inline-block text-slate-300 hover:text-[#F5B800] transition-all duration-200 hover:translate-x-1"
                    >
                      {service.shortTitle}
                    </Link>
                  </li>
                ))}
              </ul>
            </StaggerItem>

            {/* Corporate Contact */}
            <StaggerItem className="lg:col-span-3">
              <h2 className="font-display text-sm font-semibold text-white tracking-wide mb-4">
                Corporate Office
              </h2>
              <div className="h-[2px] w-8 bg-gradient-to-r from-[#F5B800] to-[#F27405] mb-4" aria-hidden="true" />
              <ul className="space-y-3.5 text-sm text-slate-300">
                <li className="flex items-start gap-3">
                  <MapPin className="h-4 w-4 text-[#F5B800] shrink-0 mt-1" aria-hidden="true" />
                  <span className="leading-relaxed">{COMPANY.address}</span>
                </li>
                <li>
                  <a
                    href={COMPANY.phoneHref}
                    className="flex items-center gap-3 hover:text-[#F5B800] transition-colors tabular-nums"
                  >
                    <Phone className="h-4 w-4 text-[#F5B800] shrink-0" aria-hidden="true" />
                    <span>{COMPANY.phoneDisplay}</span>
                  </a>
                </li>
                <li>
                  <a
                    href={COMPANY.emailHref}
                    className="flex items-center gap-3 hover:text-[#F5B800] transition-colors break-all"
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
                    className="flex items-center gap-3 hover:text-[#F5B800] transition-colors"
                  >
                    <Globe className="h-4 w-4 text-[#F5B800] shrink-0" aria-hidden="true" />
                    <span>{COMPANY.websiteDisplay}</span>
                  </a>
                </li>
              </ul>
            </StaggerItem>
          </StaggerGroup>

          <motion.div
            initial={prefersReduced ? false : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, delay: 0.2, ease: LUXURY_EASE }}
            className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-slate-400"
          >
            <p>{COMPANY.copyright}</p>
            <p className="text-slate-400">
              {COMPANY.businessLine} · Rivers State, Nigeria
            </p>
          </motion.div>
        </div>
      </footer>

      <WhatsAppButton />
      <PearlAssistant />
    </div>
  );
}
