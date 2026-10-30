import Image from 'next/image';
import type { ReactElement } from 'react';

export interface LogoProps {
  readonly variant?: 'dark' | 'light';
  readonly className?: string;
  readonly showText?: boolean;
}

export function Logo({
  variant = 'dark',
  className = '',
  showText = true,
}: LogoProps): ReactElement {
  return (
    <span
      className={`inline-flex items-center gap-3 ${className}`}
      data-variant={variant}
    >
      <Image
        src="/images/navary-mark.png"
        width={620}
        height={515}
        alt={showText ? '' : 'Navary Glory Vajra'}
        aria-hidden={showText}
        className="h-11 w-11 shrink-0 object-contain"
        priority
      />
      {showText ? (
        <Image
          src="/images/navary-wordmark.png"
          width={870}
          height={265}
          alt="Navary Glory Vajra"
          className="h-9 w-auto max-w-[min(9rem,42vw)] object-contain sm:max-w-36"
          priority
        />
      ) : null}
    </span>
  );
}
