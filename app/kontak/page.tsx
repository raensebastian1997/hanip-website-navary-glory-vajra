import type { Metadata } from 'next';
import type { ReactElement } from 'react';
import { MailIcon, MapPinIcon, PhoneIcon, WhatsAppIcon } from '@/components/icons';
import { getFooterData, getSiteData } from '@/lib/getData';

export const metadata: Metadata = {
  title: 'Kontak',
  description: 'Hubungi Navary Glory Vajra untuk konsultasi kebutuhan legalitas bisnis Anda.',
  alternates: { canonical: '/kontak' },
};

export default function ContactPage(): ReactElement {
  const site = getSiteData();
  const { contact } = getFooterData();

  return (
    <section className="section-pad bg-cream">
      <div className="container-page">
        <div className="max-w-3xl">
          <h2 className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.24em] text-brand-600">
            <span aria-hidden="true" className="h-px w-8 bg-brand-600" />
            Hubungi Kami
          </h2>
          <h1 className="font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl lg:text-[2.75rem]">
            Mari bicarakan kebutuhan legalitas bisnis Anda
          </h1>
          <p className="mt-4 text-base leading-7 text-ink/65 sm:text-lg">
            Tim {site.name} siap membantu menjawab pertanyaan dan mengarahkan Anda ke layanan yang sesuai.
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          <a href={contact.phoneHref} className="rounded-3xl border border-ink/10 bg-white p-6 transition hover:border-brand-300 hover:shadow-card">
            <PhoneIcon className="h-6 w-6 text-brand-600" />
            <h2 className="mt-4 font-display text-lg font-extrabold text-ink">Telepon</h2>
            <p className="mt-2 text-sm text-ink/65">{contact.phoneDisplay}</p>
          </a>
          <a href={contact.whatsappLink} target="_blank" rel="noopener noreferrer" className="rounded-3xl border border-ink/10 bg-white p-6 transition hover:border-brand-300 hover:shadow-card">
            <WhatsAppIcon className="h-6 w-6 text-brand-600" />
            <h2 className="mt-4 font-display text-lg font-extrabold text-ink">WhatsApp</h2>
            <p className="mt-2 text-sm text-ink/65">{contact.whatsappDisplay}</p>
          </a>
          <a href={`mailto:${contact.email}`} className="rounded-3xl border border-ink/10 bg-white p-6 transition hover:border-brand-300 hover:shadow-card">
            <MailIcon className="h-6 w-6 text-brand-600" />
            <h2 className="mt-4 font-display text-lg font-extrabold text-ink">Email</h2>
            <p className="mt-2 text-sm text-ink/65">{contact.email}</p>
          </a>
          <div className="rounded-3xl border border-ink/10 bg-white p-6">
            <MapPinIcon className="h-6 w-6 text-brand-600" />
            <h2 className="mt-4 font-display text-lg font-extrabold text-ink">Alamat</h2>
            <address className="mt-2 text-sm leading-6 text-ink/65 not-italic">{contact.address}</address>
          </div>
        </div>
      </div>
    </section>
  );
}
