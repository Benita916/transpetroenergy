import { useState } from 'react';
import { COMPANY } from '../data/company';

interface BrandImageProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  fallbackLabel?: string;
}

export function BrandImage({
  src,
  alt,
  className = 'w-full h-full object-cover',
  priority = false,
  fallbackLabel,
}: BrandImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        role="img"
        aria-label={alt}
        className="w-full h-full bg-gradient-to-br from-[#071A33] via-[#0B2545] to-[#13355E] flex flex-col items-center justify-center p-6 text-center text-white/90"
      >
        <img
          src={COMPANY.logoEmblem}
          alt=""
          aria-hidden="true"
          className="h-12 w-auto opacity-80 mb-3"
        />
        <span className="font-display text-sm font-semibold tracking-tight text-white">
          {fallbackLabel || COMPANY.name}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      loading={priority ? 'eager' : 'lazy'}
      decoding={priority ? 'sync' : 'async'}
      onError={() => setHasError(true)}
      className={className}
    />
  );
}
