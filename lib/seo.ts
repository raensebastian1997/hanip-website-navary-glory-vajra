import type {
  FaqPageSchema,
  JsonLdData,
  OrganizationSchema,
  ServiceSchema,
  WebSiteSchema,
} from '@/types/seo';
import { getFaqData, getFooterData, getPackagesData, getSiteData } from '@/lib/getData';

function buildOrganizationSchema(): OrganizationSchema {
  const site = getSiteData();
  const footer = getFooterData();

  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: site.name,
    url: site.url,
    logo: `${site.url}/icons/icon-512.png`,
    description: site.description,
    email: footer.contact.email,
    telephone: '+622129021873',
    address: {
      '@type': 'PostalAddress',
      streetAddress:
        'Grand Slipi Tower, Lantai 9 Unit O, Jl. Jend. S. Parman Kav. 22-24, Palmerah',
      addressLocality: 'Jakarta Barat',
      addressRegion: 'DKI Jakarta',
      postalCode: '11480',
      addressCountry: 'ID',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: site.whatsapp.display,
      contactType: 'customer service',
      areaServed: 'ID',
      availableLanguage: ['id'],
    },
    areaServed: 'Indonesia',
  };
}

function buildWebSiteSchema(): WebSiteSchema {
  const site = getSiteData();

  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: site.name,
    url: site.url,
    description: site.description,
    inLanguage: 'id',
    publisher: {
      '@type': 'Organization',
      name: site.name,
      url: site.url,
    },
  };
}

function buildServiceSchemas(): readonly ServiceSchema[] {
  const site = getSiteData();
  const packages = getPackagesData();

  return packages.items.map((item) => {
    const category = packages.categories.find((entry) => entry.id === item.categoryId);
    const categoryName = category?.name ?? 'Layanan Legalitas Usaha';

    return {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: item.name,
      description: `${item.name} dari ${site.name}. ${item.features.join(', ')}.`,
      serviceType: categoryName,
      areaServed: 'Indonesia',
      provider: {
        '@type': 'Organization',
        name: site.name,
        url: site.url,
      },
      offers: {
        '@type': 'Offer',
        price: String(item.priceValue),
        priceCurrency: 'IDR',
        availability: 'https://schema.org/InStock',
        url: `${site.url}/#paket`,
      },
    };
  });
}

function buildFaqSchema(): FaqPageSchema {
  const faq = getFaqData();

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

export function getStructuredData(): readonly JsonLdData[] {
  return [
    buildOrganizationSchema(),
    buildWebSiteSchema(),
    ...buildServiceSchemas(),
    buildFaqSchema(),
  ];
}
