import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import type { ReactElement } from 'react';
import { Packages } from '@/components/Packages';
import { getPackagesData, getSiteData } from '@/lib/getData';
import { PACKAGE_PAGES } from '@/lib/package-pages';

interface PackageDetailPageProps {
  readonly params: Promise<{ slug: string }>;
}

export function generateStaticParams(): { slug: string }[] {
  return PACKAGE_PAGES.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PackageDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = PACKAGE_PAGES.find((entry) => entry.slug === slug);
  if (!page) return {};

  const site = getSiteData();
  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: `/paket/${page.slug}` },
    openGraph: {
      title: `${page.title} | ${site.name}`,
      description: page.description,
      url: `${site.url}/paket/${page.slug}`,
      type: 'website',
    },
  };
}

export default async function PackageDetailPage({ params }: PackageDetailPageProps): Promise<ReactElement> {
  const { slug } = await params;
  const page = PACKAGE_PAGES.find((entry) => entry.slug === slug);
  if (!page) notFound();

  return (
    <Packages
      data={getPackagesData()}
      categoryId={page.categoryId}
      itemIds={page.itemIds}
      title={page.title}
      description={page.description}
      showCategoryNav={false}
      headingLevel="h1"
    />
  );
}
