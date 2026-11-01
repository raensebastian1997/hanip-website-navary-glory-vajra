import type { ReactElement } from 'react';
import { WhatsAppIcon } from '@/components/icons';
import { buildWhatsAppLink } from '@/lib/whatsapp';
import type { SiteData } from '@/types/site';

export interface WhatsAppFabProps {
  readonly site: SiteData;
}

export function WhatsAppFab({ site }: WhatsAppFabProps): ReactElement {
  const whatsappHref = buildWhatsAppLink(
    site.whatsapp.number,
    site.whatsapp.defaultMessage,
  );

  return (
    <a
      href={whatsappHref}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Konsultasi gratis via WhatsApp"
      className="group fixed bottom-5 right-4 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-float transition hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2 sm:bottom-6 sm:right-6"
    >
      <WhatsAppIcon className="h-7 w-7" />
      <span className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap rounded-lg bg-brand-950 px-3 py-1.5 text-xs font-semibold text-white opacity-0 transition group-hover:opacity-100 md:block">
        Konsultasi Gratis
      </span>
    </a>
  );
}
