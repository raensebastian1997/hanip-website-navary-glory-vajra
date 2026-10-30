import type { MetadataRoute } from 'next';
import { getSiteData } from '@/lib/getData';

export default function robots(): MetadataRoute.Robots {
  const site = getSiteData();

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
