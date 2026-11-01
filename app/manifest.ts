import type { MetadataRoute } from 'next';
import { getSiteData } from '@/lib/getData';

export default function manifest(): MetadataRoute.Manifest {
  const site = getSiteData();

  return {
    name: site.name,
    short_name: site.shortName,
    description: site.description,
    start_url: '/',
    scope: '/',
    display: 'standalone',
    orientation: 'portrait',
    background_color: '#F8F9FA',
    theme_color: '#065C8C',
    lang: 'id',
    dir: 'ltr',
    categories: ['business', 'finance'],
    icons: [
      {
        src: '/icons/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icons/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icons/maskable-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/icons/maskable-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  };
}
