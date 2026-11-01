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
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isPackageMenuOpen, setIsPackageMenuOpen] = useState<boolean>(false);
  const [isSpecialMenuOpen, setIsSpecialMenuOpen] = useState<boolean>(false);
  const whatsappHref = buildWhatsAppLink(
    site.whatsapp.number,
    site.whatsapp.defaultMessage,
  );

  useEffect(() => {
    const onScroll = (): void => setIsScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

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

  const topBarClass = isScrolled
    ? 'hidden overflow-hidden bg-brand-600 text-white/80 lg:block motion-reduce:!transition-none'
    : 'hidden overflow-hidden border-b border-ink/5 bg-[#ddd] text-ink/70 lg:block motion-reduce:!transition-none';
  const topBarLinkClass = isScrolled
    ? 'inline-flex items-center gap-2 transition hover:text-accent-200'
    : 'inline-flex items-center gap-2 transition hover:text-accent-700';
  const topBarIconClass = isScrolled
    ? 'h-3.5 w-3.5 text-accent-300'
    : 'h-3.5 w-3.5 text-accent-700';
  const navShellClass = isScrolled
    ? 'border-b border-white/10 bg-brand-600 shadow-lg shadow-brand-950/20'
    : 'border-b border-ink/10 bg-white/95 shadow-sm backdrop-blur';
  const logoShellClass = isScrolled
    ? 'rounded-2xl bg-white px-3 py-1.5 shadow-sm ring-1 ring-white/20'
    : '';
  const navLinkClass = isScrolled
    ? 'text-white/85 hover:bg-white/10 hover:text-accent-200 focus-visible:ring-accent-300'
    : 'text-ink/80 hover:bg-accent-50 hover:text-accent-700 focus-visible:ring-accent-600';
  const desktopCtaClass = isScrolled
    ? 'btn bg-white text-brand-700 shadow-lg shadow-brand-950/20 hover:bg-accent-100 hover:text-brand-800 focus-visible:ring-accent-300'
    : 'btn btn-primary';
  const menuButtonClass = isScrolled
    ? 'border-white/25 text-white hover:bg-white/10 focus-visible:ring-accent-300'
    : 'border-ink/15 text-ink hover:bg-accent-50 focus-visible:ring-accent-600';
  const mobileMenuClass = isScrolled
    ? 'border-b border-white/10 bg-brand-700 shadow-lg lg:hidden'
    : 'border-b border-ink/10 bg-white shadow-lg lg:hidden';
  const mobileLinkClass = isScrolled
    ? 'text-white/90 hover:bg-white/10 hover:text-accent-200'
    : 'text-ink/80 hover:bg-accent-50 hover:text-accent-700';
  const mobileSubLinkClass = isScrolled
    ? 'text-white/80 hover:bg-white/10 hover:text-accent-200'
    : 'text-ink/70 hover:bg-accent-50 hover:text-accent-700';
  const mobileChevronClass = isScrolled ? 'text-white/80 focus-visible:ring-accent-300' : 'text-ink/70 focus-visible:ring-accent-600';
  const mobileSubmenuBorderClass = isScrolled ? 'border-white/20' : 'border-ink/10';
  const mobileCtaClass = isScrolled
    ? 'btn w-full bg-white text-brand-700 hover:bg-accent-100 hover:text-brand-800 focus-visible:ring-accent-300'
    : 'btn btn-primary w-full';

  return (
    <header className="sticky top-0 z-40">
      <div
        aria-hidden={isScrolled}
        inert={isScrolled}
        className={topBarClass}
        style={{
          height: isScrolled ? 0 : 40,
          transition: 'height 450ms cubic-bezier(0.22, 1, 0.36, 1)',
          pointerEvents: isScrolled ? 'none' : 'auto',
        }}
      >
        <div className="container-page flex h-10 items-center justify-between text-xs motion-reduce:!transition-none"
          style={{
            opacity: isScrolled ? 0 : 1,
            transform: isScrolled ? 'translateY(-40px)' : 'translateY(0)',
            transition: 'opacity 300ms ease, transform 450ms cubic-bezier(0.22, 1, 0.36, 1)',
          }}>
          <div className="flex items-center gap-6">
            <a
              href="tel:+622129021873"
              className={topBarLinkClass}
            >
              <PhoneIcon className={topBarIconClass} />
              0857-8229-4804
            </a>
            <a
              href="mailto:halo@legalinnavary.id"
              className={topBarLinkClass}
            >
              <MailIcon className={topBarIconClass} />
              halo@legalinnavary.id
            </a>
          </div>
          <p>Layanan konsultasi 24 jam untuk kebutuhan legalitas bisnis Anda.</p>
        </div>
      </div>

      <div className={navShellClass}>
        <nav
          aria-label="Navigasi utama"
          className="container-page flex h-20 items-center justify-between gap-6"
        >
          <Link
            href="/"
            aria-label={`${site.name} - Beranda`}
            onClick={closeMenu}
            className={`inline-flex shrink-0 ${logoShellClass}`}
          >
            <Logo />
          </Link>

          <ul className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((link) => (link.label === 'Paket Kami' || link.label === 'Paket Khusus') ? (
              <li key={link.href} className="group relative">
                <Link href={link.href} className={`inline-flex min-h-11 items-center gap-2 rounded-full px-4 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 ${navLinkClass}`}>
                  {link.label}
                  <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className="h-4 w-4 transition group-hover:rotate-180 group-focus-within:rotate-180">
                    <path d="m5 7.5 5 5 5-5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
                <ul className="invisible absolute left-0 top-full z-50 w-72 translate-y-2 rounded-xl border border-brand-100 bg-white p-2 opacity-0 shadow-xl transition duration-150 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
                  {(link.label === 'Paket Kami' ? PACKAGE_LINKS : SPECIAL_PACKAGE_LINKS).map((item) => (
                    <li key={item.label}>
                      <Link href={item.href} className="block rounded-lg px-4 py-3 text-sm font-medium text-ink/80 transition hover:bg-accent-50 hover:text-accent-700 focus-visible:bg-accent-50 focus-visible:text-accent-700 focus-visible:outline-none">{item.label}</Link>
                    </li>
                  ))}
                </ul>
              </li>
            ) : (
              <li key={link.href}>
                <Link href={link.href} className={`inline-flex min-h-11 items-center rounded-full px-4 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 ${navLinkClass}`}>{link.label}</Link>
              </li>
            ))}
          </ul>

          <div className="hidden lg:block">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className={desktopCtaClass}
            >
              <WhatsAppIcon className="h-4 w-4" />
              Konsultasi Gratis
            </a>
          </div>

          <button
            type="button"
            className={`inline-flex h-11 w-11 items-center justify-center rounded-full border transition focus-visible:outline-none focus-visible:ring-2 lg:hidden ${menuButtonClass}`}
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
          className={mobileMenuClass}
        >
          <ul className="container-page flex flex-col gap-1 py-4">
            {NAV_LINKS.map((link) => (link.label === 'Paket Kami' || link.label === 'Paket Khusus') ? (
              <li key={link.href}>
                <div className={`flex min-h-12 items-center rounded-xl px-4 transition ${mobileLinkClass}`}>
                  <a href={link.href} onClick={closeMenu} className="flex flex-1 items-center text-base font-semibold">{link.label}</a>
                  <button type="button" aria-expanded={link.label === 'Paket Kami' ? isPackageMenuOpen : isSpecialMenuOpen} aria-label={`${(link.label === 'Paket Kami' ? isPackageMenuOpen : isSpecialMenuOpen) ? 'Tutup' : 'Buka'} submenu ${link.label}`} onClick={() => {
                    if (link.label === 'Paket Kami') setIsPackageMenuOpen((current) => !current);
                    else setIsSpecialMenuOpen((current) => !current);
                  }} className={`flex h-10 w-10 items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 ${mobileChevronClass}`}>
                    <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className={`h-4 w-4 transition ${(link.label === 'Paket Kami' ? isPackageMenuOpen : isSpecialMenuOpen) ? 'rotate-180' : ''}`}>
                      <path d="m5 7.5 5 5 5-5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </div>
                {(link.label === 'Paket Kami' ? isPackageMenuOpen : isSpecialMenuOpen) ? (
                  <ul className={`ml-4 mt-1 border-l pl-3 ${mobileSubmenuBorderClass}`}>
                    {(link.label === 'Paket Kami' ? PACKAGE_LINKS : SPECIAL_PACKAGE_LINKS).map((item) => (
                      <li key={item.label}><a href={item.href} onClick={closeMenu} className={`flex min-h-11 items-center rounded-lg px-3 text-sm font-medium transition ${mobileSubLinkClass}`}>{item.label}</a></li>
                    ))}
                  </ul>
                ) : null}
              </li>
            ) : (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={closeMenu}
                  className={`flex min-h-12 items-center rounded-xl px-4 text-base font-semibold transition ${mobileLinkClass}`}
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
                className={mobileCtaClass}
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
