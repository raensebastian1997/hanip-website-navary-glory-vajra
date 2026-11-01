import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import type { ReactElement } from 'react';
import { WhatsAppIcon } from '@/components/icons';
import { getSiteData, getSpecialPackagesData } from '@/lib/getData';
import { buildWhatsAppLink } from '@/lib/whatsapp';

interface SpecialPackagePageProps {
  readonly params: Promise<{ slug: string }>;
}

export function generateStaticParams(): { slug: string }[] {
  return getSpecialPackagesData().items.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: SpecialPackagePageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = getSpecialPackagesData().items.find((entry) => entry.slug === slug);
  if (!item) return {};

  const site = getSiteData();
  return {
    title: item.label,
    description: item.description,
    alternates: { canonical: item.href },
    openGraph: {
      title: `${item.label} | ${site.name}`,
      description: item.description,
      url: `${site.url}${item.href}`,
      type: 'website',
    },
  };
}

export default async function SpecialPackagePage({ params }: SpecialPackagePageProps): Promise<ReactElement> {
  const { slug } = await params;
  const item = getSpecialPackagesData().items.find((entry) => entry.slug === slug);
  if (!item) notFound();

  const site = getSiteData();
  const whatsappHref = buildWhatsAppLink(
    site.whatsapp.number,
    `Halo ${site.name}, saya ingin bertanya harga ${item.label}.`,
  );

  return (
    <section className="section-pad bg-cream">
      <div className="container-page">
        <div className="max-w-3xl">
          <p className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.24em] text-brand-600">
            <span aria-hidden="true" className="h-px w-8 bg-brand-600" />
            Paket Khusus
          </p>
          <h1 className="font-display text-3xl font-extrabold tracking-tight text-brand-600 sm:text-4xl lg:text-[2.75rem]">
            {item.label}
          </h1>
        </div>

        <p className="mt-8 max-w-4xl text-base leading-8 text-ink/75 sm:text-lg">
          {item.introduction}
        </p>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {item.sections.map((section) => (
            <section key={section.heading} className="rounded-3xl border border-ink/15 bg-white p-6 shadow-sm sm:p-8">
              <h2 className="font-display text-xl font-extrabold text-brand-700 sm:text-2xl">
                {section.heading}
              </h2>
              <ol className="mt-5 list-decimal space-y-3 pl-5 text-sm leading-7 text-ink/75 sm:text-base">
                {section.items.map((entry) => <li key={entry} className="pl-1">{entry}</li>)}
              </ol>
            </section>
          ))}
        </div>

        <div className="mt-12 rounded-3xl bg-brand-600 p-8 text-white sm:flex sm:items-center sm:justify-between sm:gap-8">
          <div>
            <h2 className="font-display text-2xl font-extrabold">Butuh bantuan menata dokumen perusahaan?</h2>
            <p className="mt-2 text-sm leading-6 text-white/85">Hubungi tim kami untuk bertanya tentang harga dan konsultasi layanan.</p>
          </div>
          <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="btn mt-6 shrink-0 bg-white text-brand-700 hover:bg-accent-100 hover:text-brand-800 focus-visible:ring-accent-300 sm:mt-0">
            <WhatsAppIcon className="h-4 w-4" />
            Tanya Harga
          </a>
        </div>
      </div>
    </section>
  );
}
