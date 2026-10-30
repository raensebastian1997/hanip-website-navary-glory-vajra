import type { ReactElement } from 'react';

export interface SectionHeadingProps {
  readonly id?: string;
  readonly eyebrow: string;
  readonly title: string;
  readonly description?: string;
  readonly tone?: 'light' | 'dark';
  readonly align?: 'left' | 'center';
  readonly level?: 'h1' | 'h2';
}

export function SectionHeading({
  id,
  eyebrow,
  title,
  description,
  tone = 'dark',
  align = 'left',
  level = 'h2',
}: SectionHeadingProps): ReactElement {
  const titleColor = tone === 'light' ? 'text-white' : 'text-ink';
  const descriptionColor = tone === 'light' ? 'text-white/70' : 'text-ink/65';
  const alignment = align === 'center' ? 'mx-auto text-center' : 'text-left';
  const Heading = level;

  return (
    <div className={`max-w-3xl ${alignment}`}>
      <p className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.24em] text-brand-600">
        <span aria-hidden="true" className="h-px w-8 bg-brand-600" />
        {eyebrow}
      </p>
      <Heading
        id={id}
        className={`font-display text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-[2.75rem] ${titleColor}`}
      >
        {title}
      </Heading>
      {description ? (
        <p className={`mt-4 text-base leading-7 sm:text-lg ${descriptionColor}`}>
          {description}
        </p>
      ) : null}
    </div>
  );
}
