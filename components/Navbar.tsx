'use client';

import { useEffect, useState, type ReactElement } from 'react';
import Link from 'next/link';
import { Logo } from '@/components/Logo';
import { CloseIcon, MenuIcon, PhoneIcon, MailIcon, WhatsAppIcon } from '@/components/icons';
import { buildWhatsAppLink } from '@/lib/whatsapp';
import { getSpecialPackagesData } from '@/lib/getData';
import type { SiteData } from '@/types/site';

interface NavLink {
  readonly label: string;
  readonly href: string;
}

interface PackageLink {
  readonly label: string;
  readonly href: string;
}

export interface NavbarProps {
  readonly site: SiteData;
}

const PACKAGE_LINKS: readonly PackageLink[] = [
  { label: 'Paket Pendirian PT', href: '/paket/pendirian-pt' },
  { label: 'Paket Pendirian CV', href: '/paket/pendirian-cv' },
  { label: 'Paket Perubahan Akta PT & CV', href: '/paket/perubahan-akta' },
  { label: 'Pendaftaran Hak Cipta, Merek dan Paten', href: '/paket/hak-kekayaan-intelektual' },
  { label: 'Paket Virtual Office', href: '/paket/virtual-office' },
];

const SPECIAL_PACKAGE_LINKS = getSpecialPackagesData().items;

const NAV_LINKS: readonly NavLink[] = [
  { label: 'Beranda', href: '/' },
  { label: 'Paket Kami', href: '/#paket' },
  { label: 'Paket Khusus', href: SPECIAL_PACKAGE_LINKS[0]?.href ?? '/paket-khusus' },
  { label: 'Keunggulan', href: '/keunggulan' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Kontak', href: '/kontak' },
];

export function Navbar({ site }: NavbarProps): ReactElement {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isPackageMenuOpen, setIsPackageMenuOpen] = useState<boolean>(false);
  const [isSpecialMenuOpen, setIsSpecialMenuOpen] = useState<boolean>(false);
  const whatsappHref = buildWhatsAppLink(
    site.whatsapp.number,
    site.whatsapp.defaultMessage,
  );

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') {
        setIsOpen(false);
        setIsPackageMenuOpen(false);
        setIsSpecialMenuOpen(false);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, []);

  const closeMenu = (): void => {
    setIsOpen(false);
    setIsPackageMenuOpen(false);
    setIsSpecialMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40">
      <div className="hidden bg-ink text-white/70 lg:block">
        <div className="container-page flex h-10 items-center justify-between text-xs">
          <div className="flex items-center gap-6">
            <a
              href="tel:+622129021873"
              className="inline-flex items-center gap-2 transition hover:text-white"
            >
              <PhoneIcon className="h-3.5 w-3.5" />
              (021) 29021873
            </a>
            <a
              href="mailto:halo@legalinnavary.id"
              className="inline-flex items-center gap-2 transition hover:text-white"
            >
              <MailIcon className="h-3.5 w-3.5" />
              halo@legalinnavary.id
            </a>
          </div>
          <p>Layanan konsultasi 24 jam untuk kebutuhan legalitas bisnis Anda.</p>
        </div>
      </div>

      <div className="border-b border-ink/5 bg-white/95 shadow-sm backdrop-blur">
        <nav
          aria-label="Navigasi utama"
          className="container-page flex h-20 items-center justify-between gap-6"
        >
          <Link href="/" aria-label={`${site.name} - Beranda`} onClick={closeMenu}>
            <Logo />
          </Link>

          <ul className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((link) => (link.label === 'Paket Kami' || link.label === 'Paket Khusus') ? (
              <li key={link.href} className="group relative">
                <Link href={link.href} className="inline-flex min-h-11 items-center gap-2 rounded-full px-4 text-sm font-semibold text-ink/70 transition hover:bg-brand-50 hover:text-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600">
                  {link.label}
                  <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className="h-4 w-4 transition group-hover:rotate-180 group-focus-within:rotate-180">
                    <path d="m5 7.5 5 5 5-5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
                <ul className="invisible absolute left-0 top-full z-50 w-72 translate-y-2 rounded-xl border border-ink/10 bg-white p-2 opacity-0 shadow-xl transition duration-150 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
                  {(link.label === 'Paket Kami' ? PACKAGE_LINKS : SPECIAL_PACKAGE_LINKS).map((item) => (
                    <li key={item.label}>
                      <Link href={item.href} className="block rounded-lg px-4 py-3 text-sm font-medium text-ink/70 transition hover:bg-brand-50 hover:text-brand-700 focus-visible:bg-brand-50 focus-visible:text-brand-700 focus-visible:outline-none">{item.label}</Link>
                    </li>
                  ))}
                </ul>
              </li>
            ) : (
              <li key={link.href}>
                <Link href={link.href} className="inline-flex min-h-11 items-center rounded-full px-4 text-sm font-semibold text-ink/70 transition hover:bg-brand-50 hover:text-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600">{link.label}</Link>
              </li>
            ))}
          </ul>

          <div className="hidden lg:block">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              <WhatsAppIcon className="h-4 w-4" />
              Konsultasi Gratis
            </a>
          </div>

          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-ink/10 text-ink transition hover:bg-brand-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 lg:hidden"
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            aria-label={isOpen ? 'Tutup menu' : 'Buka menu'}
            onClick={() => {
              setIsOpen((current) => !current);
              setIsPackageMenuOpen(false);
              setIsSpecialMenuOpen(false);
            }}
          >
            {isOpen ? <CloseIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
          </button>
        </nav>
      </div>

      {isOpen ? (
        <div
          id="mobile-menu"
          className="border-b border-ink/10 bg-white shadow-lg lg:hidden"
        >
          <ul className="container-page flex flex-col gap-1 py-4">
            {NAV_LINKS.map((link) => (link.label === 'Paket Kami' || link.label === 'Paket Khusus') ? (
              <li key={link.href}>
                <div className="flex min-h-12 items-center rounded-xl px-4 transition hover:bg-brand-50">
                  <a href={link.href} onClick={closeMenu} className="flex flex-1 items-center text-base font-semibold text-ink/80 hover:text-brand-700">{link.label}</a>
                  <button type="button" aria-expanded={link.label === 'Paket Kami' ? isPackageMenuOpen : isSpecialMenuOpen} aria-label={`${(link.label === 'Paket Kami' ? isPackageMenuOpen : isSpecialMenuOpen) ? 'Tutup' : 'Buka'} submenu ${link.label}`} onClick={() => {
                    if (link.label === 'Paket Kami') setIsPackageMenuOpen((current) => !current);
                    else setIsSpecialMenuOpen((current) => !current);
                  }} className="flex h-10 w-10 items-center justify-center rounded-full text-ink/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600">
                    <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className={`h-4 w-4 transition ${(link.label === 'Paket Kami' ? isPackageMenuOpen : isSpecialMenuOpen) ? 'rotate-180' : ''}`}>
                      <path d="m5 7.5 5 5 5-5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </div>
                {(link.label === 'Paket Kami' ? isPackageMenuOpen : isSpecialMenuOpen) ? (
                  <ul className="ml-4 mt-1 border-l border-ink/10 pl-3">
                    {(link.label === 'Paket Kami' ? PACKAGE_LINKS : SPECIAL_PACKAGE_LINKS).map((item) => (
                      <li key={item.label}><a href={item.href} onClick={closeMenu} className="flex min-h-11 items-center rounded-lg px-3 text-sm font-medium text-ink/65 transition hover:bg-brand-50 hover:text-brand-700">{item.label}</a></li>
                    ))}
                  </ul>
                ) : null}
              </li>
            ) : (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={closeMenu}
                  className="flex min-h-12 items-center rounded-xl px-4 text-base font-semibold text-ink/80 transition hover:bg-brand-50 hover:text-brand-700"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="pt-2">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMenu}
                className="btn btn-primary w-full"
              >
                <WhatsAppIcon className="h-4 w-4" />
                Konsultasi Gratis
              </a>
            </li>
          </ul>
        </div>
      ) : null}
    </header>
  );
}
