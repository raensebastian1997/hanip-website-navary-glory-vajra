import type { ReactElement } from 'react';
import Link from 'next/link';
import { Logo } from '@/components/Logo';
import {
  MailIcon,
  MapPinIcon,
  PhoneIcon,
  WhatsAppIcon,
} from '@/components/icons';
import type { FooterData } from '@/types/footer';
import type { SiteData } from '@/types/site';

export interface FooterProps {
  readonly site: SiteData;
  readonly data: FooterData;
}

function isExternal(href: string): boolean {
  return href.startsWith('http');
}

export function Footer({ site, data }: FooterProps): ReactElement {
  return (
    <footer id="kontak" className="bg-brand-600 text-white">
      <div className="container-page grid gap-12 py-16 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <Link href="/" aria-label={`${site.name} - Beranda`} className="inline-flex rounded-2xl bg-white px-3 py-1.5 shadow-sm ring-1 ring-white/20">
            <Logo variant="light" />
          </Link>
          <p className="mt-5 max-w-sm text-sm leading-7 text-white/80">
            {data.description}
          </p>

          <address className="mt-7 space-y-4 text-sm not-italic text-white/85">
            <p className="flex items-start gap-3">
              <MapPinIcon className="mt-0.5 h-4 w-4 shrink-0 text-accent-300" />
              <span className="leading-6">{data.contact.address}</span>
            </p>
            <p>
              <a
                href={data.contact.phoneHref}
                className="inline-flex items-center gap-3 transition hover:text-accent-200"
              >
                <PhoneIcon className="h-4 w-4 shrink-0 text-accent-300" />
                {data.contact.phoneDisplay}
              </a>
            </p>
            <p>
              <a
                href={data.contact.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 transition hover:text-accent-200"
              >
                <WhatsAppIcon className="h-4 w-4 shrink-0 text-accent-300" />
                {data.contact.whatsappDisplay}
              </a>
            </p>
            <p>
              <a
                href={`mailto:${data.contact.email}`}
                className="inline-flex items-center gap-3 transition hover:text-accent-200"
              >
                <MailIcon className="h-4 w-4 shrink-0 text-accent-300" />
                {data.contact.email}
              </a>
            </p>
          </address>
        </div>

        {data.groups.map((group) => (
          <nav key={group.title} aria-label={group.title}>
            <h2 className="font-display text-sm font-extrabold uppercase tracking-[0.18em] text-white">
              {group.title}
            </h2>
            <ul className="mt-4 space-y-3">
              {group.links.map((link) => (
                <li key={`${group.title}-${link.label}`}>
                  <a
                    href={link.href}
                    {...(isExternal(link.href)
                      ? { target: '_blank', rel: 'noopener noreferrer' }
                      : {})}
                    className="text-sm leading-6 text-white/80 transition hover:text-accent-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <div className="border-t border-white/15">
        <div className="container-page flex flex-col gap-3 py-6 text-xs text-white/80 sm:flex-row sm:items-center sm:justify-between">
          <p>{data.copyright}</p>
          <p className="max-w-xl sm:text-right">{data.legalNote}</p>
        </div>
      </div>
    </footer>
  );
}
