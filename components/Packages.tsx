import type { ReactElement } from 'react';
import { CheckIcon, WhatsAppIcon } from '@/components/icons';
import { SectionHeading } from '@/components/SectionHeading';
import type { PackagesData } from '@/types/packages';

export interface PackagesProps {
  readonly data: PackagesData;
  readonly categoryId?: string;
  readonly itemIds?: readonly string[];
  readonly title?: string;
  readonly description?: string;
  readonly showCategoryNav?: boolean;
  readonly headingLevel?: 'h1' | 'h2';
}

export function Packages({
  data,
  categoryId,
  itemIds,
  title = 'Paket legalitas sesuai tahap bisnis Anda',
  description = 'Harga transparan, cakupan jelas, dan pendampingan dari tim yang memahami kebutuhan legalitas perusahaan Indonesia.',
  showCategoryNav = true,
  headingLevel = 'h2',
}: PackagesProps): ReactElement {
  const visibleItems = data.items.filter((item) =>
    (!categoryId || item.categoryId === categoryId) &&
    (!itemIds || itemIds.includes(item.id)),
  );
  const visibleCategories = data.categories.filter((category) =>
    visibleItems.some((item) => item.categoryId === category.id),
  );

  return (
    <section id="paket" className="section-pad bg-cream" aria-labelledby="paket-title">
      <div className="container-page">
        <SectionHeading
          id="paket-title"
          eyebrow="Layanan Kami"
          title={title}
          description={description}
          level={headingLevel}
        />

        {showCategoryNav ? (
          <nav aria-label="Kategori paket" className="mt-8 flex flex-wrap gap-2">
            {visibleCategories.map((category) => (
              <a
                key={category.id}
                href={`#paket-${category.id}`}
                className="inline-flex min-h-10 items-center rounded-full border border-ink/15 bg-white px-4 text-sm font-semibold text-ink/80 transition hover:border-accent-400 hover:text-accent-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-600"
              >
                {category.name}
              </a>
            ))}
          </nav>
        ) : null}

        <div className="mt-14 space-y-16">
          {visibleCategories.map((category) => {
            const items = visibleItems.filter((item) => item.categoryId === category.id);

            return (
              <div
                key={category.id}
                id={`paket-${category.id}`}
                className="scroll-mt-28"
              >
                <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <h3 className="font-display text-2xl font-extrabold text-brand-700">
                      {category.name}
                    </h3>
                    <p className="mt-1 max-w-2xl text-sm leading-6 text-ink/75">
                      {category.description}
                    </p>
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-ink/70">
                    {items.length} paket
                  </span>
                </div>

                <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
                  {items.map((item) => (
                    <article
                      key={item.id}
                      className={`relative flex flex-col rounded-3xl border bg-white p-6 ${
                        item.highlighted
                          ? 'border-brand-600 shadow-card ring-4 ring-accent-500/15'
                          : 'border-ink/10 shadow-sm'
                      }`}
                    >
                      {item.badge ? (
                        <span className="absolute -top-3 left-6 rounded-full bg-accent-700 px-3 py-1 text-[0.65rem] font-bold uppercase tracking-wide text-white">
                          {item.badge}
                        </span>
                      ) : null}

                      <h4 className="font-display text-lg font-extrabold leading-6 text-ink">
                        {item.name}
                      </h4>

                      <div className="mt-4 border-b border-ink/10 pb-5">
                        <p className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-ink/70">
                          {item.priceNote}
                        </p>
                        <p className="mt-1 font-display text-3xl font-extrabold text-brand-600">
                          {item.price}
                        </p>
                      </div>

                      <ul className="mt-5 flex-1 space-y-3">
                        {item.features.map((feature) => (
                          <li key={feature} className="flex items-start gap-2.5">
                            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent-50 text-accent-700">
                              <CheckIcon className="h-3 w-3" />
                            </span>
                            <span className="text-sm leading-6 text-ink/75">
                              {feature}
                            </span>
                          </li>
                        ))}
                      </ul>

                      <a
                        href={item.whatsappLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`btn mt-6 w-full ${
                          item.highlighted ? 'btn-primary' : 'btn-outline-dark'
                        }`}
                      >
                        <WhatsAppIcon className="h-4 w-4" />
                        Konsultasi Paket
                      </a>
                    </article>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <p className="mt-10 rounded-2xl border border-ink/10 bg-white px-5 py-4 text-sm leading-6 text-ink/75">
          Harga dapat menyesuaikan kompleksitas dokumen, domisili, dan jenis KBLI.
          Hubungi tim kami untuk mendapatkan penawaran yang paling sesuai dengan
          kebutuhan bisnis Anda.
        </p>
      </div>
    </section>
  );
}
