import type { ReactElement } from 'react';
import { PhoneIcon, WhatsAppIcon } from '@/components/icons';
import { buildWhatsAppLink } from '@/lib/whatsapp';
import type { SiteData } from '@/types/site';

export interface CtaSectionProps {
  readonly site: SiteData;
}

export function CtaSection({ site }: CtaSectionProps): ReactElement {
  const whatsappHref = buildWhatsAppLink(
    site.whatsapp.number,
    site.whatsapp.defaultMessage,
  );

  return (
    <section className="relative overflow-hidden bg-brand-gradient py-16 text-white sm:py-20">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(17,168,180,0.35),transparent_55%)]"
      />
      <div className="container-page relative text-center">
        <p className="text-xs font-bold uppercase tracking-[0.24em] text-accent-200">
          Mulai Hari Ini
        </p>
        <h2 className="mx-auto mt-3 max-w-3xl font-display text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
          Siap membangun bisnis dengan legalitas yang benar?
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-white/85">
          Ceritakan rencana usaha Anda. Tim {site.name} akan membantu memilih
          paket dan proses yang paling sesuai, tanpa biaya konsultasi awal.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="btn bg-white text-brand-700 shadow-lg shadow-black/10 hover:bg-accent-100 hover:text-brand-800 focus-visible:ring-accent-300"
          >
            <WhatsAppIcon className="h-4 w-4" />
            Konsultasi Gratis
          </a>
          <a
            href="tel:+622129021873"
            className="btn border border-white/40 text-white hover:border-accent-300 hover:bg-white/10 hover:text-accent-200 focus-visible:ring-accent-300"
          >
            <PhoneIcon className="h-4 w-4" />
            0857-8229-4804
          </a>
        </div>
      </div>
    </section>
  );
}
