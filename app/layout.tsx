import type { Metadata, Viewport } from 'next';
import { Montserrat, Open_Sans } from 'next/font/google';
import './globals.css';

import { Footer } from '@/components/Footer';
import { InstallPrompt } from '@/components/InstallPrompt';
import { Navbar } from '@/components/Navbar';
import { WhatsAppFab } from '@/components/WhatsAppFab';
import { getFooterData, getSiteData } from '@/lib/getData';
import type { ReactElement, ReactNode } from 'react';

const displayFont = Montserrat({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

const bodyFont = Open_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

const site = getSiteData();
const footer = getFooterData();

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | ${site.title}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    'jasa pendirian PT',
    'pendirian CV',
    'virtual office Jakarta',
    'pengurusan izin usaha',
    'PT Perorangan',
    'pendaftaran merek',
    'legalitas perusahaan',
    'Navary Glory Vajra',
  ],
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.name,
  category: 'business',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: site.url,
    siteName: site.name,
    title: `${site.name} | ${site.title}`,
    description: site.description,
    images: [
      {
        url: '/images/og.png',
        width: 1200,
        height: 630,
        alt: `${site.name} - ${site.title}`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${site.name} | ${site.title}`,
    description: site.description,
    images: ['/images/og.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  icons: {
    icon: [
      { url: '/icons/favicon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icons/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      {
        url: '/icons/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
    shortcut: '/icons/favicon-32.png',
  },
  manifest: '/manifest.webmanifest',
  appleWebApp: {
    capable: true,
    title: site.shortName,
    statusBarStyle: 'default',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#d80000',
  colorScheme: 'light',
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>): ReactElement {
  return (
    <html lang="id" className={`${displayFont.variable} ${bodyFont.variable}`}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-brand-600 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
        >
          Lewati ke konten utama
        </a>
        <Navbar site={site} />
        <main id="main">{children}</main>
        <Footer site={site} data={footer} />
        <InstallPrompt appName={site.shortName} />
        <WhatsAppFab site={site} />
      </body>
    </html>
  );
}
