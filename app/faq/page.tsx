import type { Metadata } from 'next';
import type { ReactElement } from 'react';
import { Faq } from '@/components/Faq';
import { getFaqData, getSiteData } from '@/lib/getData';

export const metadata: Metadata = {
  title: 'FAQ',
  description: 'Jawaban atas pertanyaan yang sering diajukan tentang layanan legalitas bisnis Navary Glory Vajra.',
  alternates: { canonical: '/faq' },
};

export default function FaqPage(): ReactElement {
  return <Faq data={getFaqData()} site={getSiteData()} headingLevel="h1" />;
}
