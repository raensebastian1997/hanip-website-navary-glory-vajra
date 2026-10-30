import type { Metadata } from 'next';
import type { ReactElement } from 'react';
import { WhyUs } from '@/components/WhyUs';
import { getWhyUsData } from '@/lib/getData';

export const metadata: Metadata = {
  title: 'Keunggulan',
  description: 'Kenali keunggulan layanan Navary Glory Vajra untuk kebutuhan legalitas bisnis Anda.',
  alternates: { canonical: '/keunggulan' },
};

export default function AdvantagesPage(): ReactElement {
  return <WhyUs items={getWhyUsData()} headingLevel="h1" />;
}
