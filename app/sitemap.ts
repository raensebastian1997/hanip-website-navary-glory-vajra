import type { MetadataRoute } from 'next';
import { getSiteData, getSpecialPackagesData } from '@/lib/getData';
import { PACKAGE_PAGES } from '@/lib/package-pages';

export default function sitemap(): MetadataRoute.Sitemap {
  const site = getSiteData();

  return [
    {
      url: site.url,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    ...['keunggulan', 'faq', 'kontak'].map((slug) => ({
      url: `${site.url}/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    ...PACKAGE_PAGES.map((page) => ({
      url: `${site.url}/paket/${page.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
    ...getSpecialPackagesData().items.map((item) => ({
      url: `${site.url}${item.href}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ];
}
