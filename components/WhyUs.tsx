import type { ReactElement } from 'react';
import { SectionHeading } from '@/components/SectionHeading';
import { WhyUsGlyph } from '@/components/icons';
import type { WhyUsItem } from '@/types/why-us';

export interface WhyUsProps {
  readonly items: readonly WhyUsItem[];
  readonly headingLevel?: 'h1' | 'h2';
}

export function WhyUs({ items, headingLevel = 'h2' }: WhyUsProps): ReactElement {
  return (
    <section
      id="keunggulan"
      className="section-pad bg-cream"
      aria-labelledby="keunggulan-title"
    >
      <div className="container-page">
        <SectionHeading
          id="keunggulan-title"
          eyebrow="Kenapa Memilih Kami"
          title="Tim yang tepat untuk legalitas bisnis Anda"
          description="Kami menggabungkan pengalaman, proses yang terstruktur, dan layanan yang responsif agar setiap kebutuhan legalitas perusahaan tertangani dengan baik."
          align="center"
          level={headingLevel}
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <article
              key={item.id}
              className="group rounded-3xl border border-ink/15 bg-white p-6 transition hover:-translate-y-1 hover:border-accent-300 hover:shadow-card"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent-50 text-accent-700 transition group-hover:bg-accent-600 group-hover:text-white">
                <WhyUsGlyph name={item.icon} className="h-6 w-6" />
              </span>
              <h3 className="mt-5 font-display text-lg font-extrabold text-ink">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-ink/75">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
