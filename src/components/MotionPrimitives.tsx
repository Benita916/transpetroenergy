import { useRef, type ReactNode } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { BrandImage } from './BrandImage';

export const LUXURY_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  duration?: number;
  immediate?: boolean;
}

export function Reveal({
  children,
  className,
  delay = 0,
  y = 22,
  duration = 0.65,
  immediate = false,
}: RevealProps) {
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return <div className={className}>{children}</div>;
  }

  if (immediate) {
    return (
      <motion.div
        initial={{ opacity: 0, y }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration, delay, ease: LUXURY_EASE }}
        className={className}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration, delay, ease: LUXURY_EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface StaggerGroupProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
}

export function StaggerGroup({ children, className, staggerDelay = 0.08 }: StaggerGroupProps) {
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.08 }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface StaggerItemProps {
  children: ReactNode;
  className?: string;
}

export function StaggerItem({ children, className }: StaggerItemProps) {
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 24 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.62, ease: LUXURY_EASE },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface ParallaxBackdropProps {
  src: string;
  alt: string;
  priority?: boolean;
  kenBurns?: 'hero' | 'subtle' | 'none';
  imageClassName?: string;
  overlayClassName?: string;
}

export function ParallaxBackdrop({
  src,
  alt,
  priority = false,
  kenBurns = 'subtle',
  imageClassName = 'w-full h-full object-cover',
  overlayClassName,
}: ParallaxBackdropProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], ['-6%', '6%']);

  const kbClass =
    kenBurns === 'hero'
      ? 'animate-ken-burns-hero'
      : kenBurns === 'subtle'
      ? 'animate-ken-burns-subtle'
      : '';

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden" aria-hidden="true">
      <motion.div
        style={prefersReduced ? undefined : { y }}
        className="w-full h-[116%] -mt-[8%] will-change-transform"
      >
        <BrandImage
          src={src}
          alt={alt}
          priority={priority}
          className={`${imageClassName} ${kbClass}`}
        />
      </motion.div>
      {overlayClassName && <div className={`absolute inset-0 ${overlayClassName}`} />}
    </div>
  );
}

interface CinematicImageProps {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  ambientZoom?: boolean;
  priority?: boolean;
}

export function CinematicImage({
  src,
  alt,
  className = '',
  imgClassName = '',
  ambientZoom = false,
  priority = false,
}: CinematicImageProps) {
  const prefersReduced = useReducedMotion();

  return (
    <motion.div
      initial={prefersReduced ? false : { opacity: 0, scale: 0.985 }}
      whileInView={prefersReduced ? undefined : { opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.72, ease: LUXURY_EASE }}
      className={`overflow-hidden ${className}`}
    >
      <BrandImage
        src={src}
        alt={alt}
        priority={priority}
        className={`w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.045] ${
          ambientZoom ? 'animate-ken-burns-subtle' : ''
        } ${imgClassName}`}
      />
    </motion.div>
  );
}

const MARQUEE_ITEMS = [
  'PETROLEUM PRODUCTS SUPPLY',
  'AGO / DIESEL',
  'ENERGY TRADING',
  'INTERNATIONAL SUPPLY',
  'INDUSTRIAL ENERGY',
];

export function EnergyMarquee() {
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return (
      <div
        aria-label="Core business sectors"
        className="bg-[#071A33] border-y border-white/10 py-4 px-6"
      >
        <div className="mx-auto max-w-[1200px] flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs sm:text-sm font-display font-semibold tracking-[0.14em] text-slate-100">
          {MARQUEE_ITEMS.map((item, idx) => (
            <span key={item} className="inline-flex items-center gap-5">
              <span>{item}</span>
              {idx < MARQUEE_ITEMS.length - 1 && (
                <span className="text-[#F5B800]" aria-hidden="true">
                  |
                </span>
              )}
            </span>
          ))}
        </div>
      </div>
    );
  }

  const repeatedSets = [0, 1, 2, 3];

  return (
    <div
      aria-label="Core business sectors"
      className="marquee-wrapper relative overflow-hidden bg-[#071A33] border-y border-white/10 py-4 select-none"
    >
      {/* Subtle left/right fade masks for polished international presentation */}
      <div
        className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-28 z-10 bg-gradient-to-r from-[#071A33] to-transparent"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-28 z-10 bg-gradient-to-l from-[#071A33] to-transparent"
        aria-hidden="true"
      />

      <div className="animate-marquee-track">
        {repeatedSets.map((setIdx) => (
          <div
            key={setIdx}
            aria-hidden={setIdx > 0}
            className="flex items-center shrink-0"
          >
            {MARQUEE_ITEMS.map((item) => (
              <div
                key={`${setIdx}-${item}`}
                className="flex items-center shrink-0 text-xs sm:text-[13px] font-display font-semibold tracking-[0.18em] text-slate-100"
              >
                <span className="px-6 sm:px-8 whitespace-nowrap">{item}</span>
                <span className="text-[#F5B800]/90 font-normal" aria-hidden="true">
                  |
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
