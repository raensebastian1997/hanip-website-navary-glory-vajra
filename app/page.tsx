import type { ReactElement } from 'react';
import { CtaSection } from '@/components/CtaSection';
import { Hero } from '@/components/Hero';
import { JsonLd } from '@/components/JsonLd';
import { Packages } from '@/components/Packages';
import {
  getHeroData,
  getPackagesData,
  getSiteData,
} from '@/lib/getData';
import { getStructuredData } from '@/lib/seo';

export default function HomePage(): ReactElement {
  const hero = getHeroData();
  const packages = getPackagesData();
  const structuredData = getStructuredData();

  return (
    <>
      {structuredData.map((schema, index) => (
        <JsonLd key={`${schema['@type']}-${index}`} data={schema} />
      ))}
      <Hero data={hero} />
      <Packages data={packages} />
      <CtaSection site={getSiteData()} />
    </>
  );
}
