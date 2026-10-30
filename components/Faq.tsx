import type { ReactElement } from 'react';
import { PlusIcon, WhatsAppIcon } from '@/components/icons';
import { SectionHeading } from '@/components/SectionHeading';
import { buildWhatsAppLink } from '@/lib/whatsapp';
import type { FaqData } from '@/types/faq';
import type { SiteData } from '@/types/site';

export interface FaqProps {
  readonly data: FaqData;
  readonly site: SiteData;
  readonly headingLevel?: 'h1' | 'h2';
}

export function Faq({ data, site, headingLevel = 'h2' }: FaqProps): ReactElement {
  const whatsappHref = buildWhatsAppLink(
    site.whatsapp.number,
    'Halo Navary Glory Vajra, saya ingin menanyakan seputar layanan legalitas usaha.',
  );

  return (
    <section id="faq" className="section-pad bg-cream" aria-labelledby="faq-title">
      <div className="container-page grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading
            id="faq-title"
            eyebrow="FAQ"
            title="Pertanyaan yang sering diajukan"
            description="Belum menemukan jawaban yang Anda cari? Tim kami siap membantu melalui konsultasi gratis."
            level={headingLevel}
          />

          <div className="mt-8 rounded-3xl bg-ink p-6 text-white sm:p-7">
            <p className="font-display text-xl font-extrabold">
              Butuh jawaban lebih cepat?
            </p>
            <p className="mt-2 text-sm leading-6 text-white/65">
              Tanyakan langsung kebutuhan legalitas perusahaan Anda kepada tim
              Navary Glory Vajra.
            </p>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary mt-5 w-full sm:w-auto"
            >
              <WhatsAppIcon className="h-4 w-4" />
              Hubungi via WhatsApp
            </a>
          </div>
        </div>

        <div className="space-y-3">
          {data.items.map((item, index) => (
            <details
              key={item.id}
              className="faq-item group rounded-2xl border border-ink/10 bg-white px-5 py-1 open:shadow-card"
              open={index === 0}
            >
              <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-4 py-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600">
                <h3 className="font-display text-base font-bold leading-6 text-ink">
                  {item.question}
                </h3>
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-600">
                  <PlusIcon className="faq-icon h-4 w-4 transition-transform duration-200" />
                </span>
              </summary>
              <p className="pb-5 pr-10 text-sm leading-7 text-ink/65">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
