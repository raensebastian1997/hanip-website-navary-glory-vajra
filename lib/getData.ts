import siteJson from '@/data/site.json';
import heroJson from '@/data/hero.json';
import packagesJson from '@/data/packages.json';
import whyUsJson from '@/data/why-us.json';
import faqJson from '@/data/faq.json';
import newsJson from '@/data/news.json';
import footerJson from '@/data/footer.json';
import specialPackagesJson from '@/data/special-packages.json';

import type { SiteData } from '@/types/site';
import type { HeroData } from '@/types/hero';
import type { PackagesData } from '@/types/packages';
import type { WhyUsItem } from '@/types/why-us';
import type { FaqData } from '@/types/faq';
import type { NewsArticle } from '@/types/news';
import type { FooterData } from '@/types/footer';
import type { SpecialPackagesData } from '@/types/special-packages';

export function getSiteData(): SiteData {
  return siteJson as SiteData;
}

export function getHeroData(): HeroData {
  return heroJson as HeroData;
}

export function getPackagesData(): PackagesData {
  return packagesJson as PackagesData;
}

export function getWhyUsData(): readonly WhyUsItem[] {
  return whyUsJson as readonly WhyUsItem[];
}

export function getFaqData(): FaqData {
  return faqJson as FaqData;
}

export function getNewsData(): readonly NewsArticle[] {
  return newsJson as readonly NewsArticle[];
}

export function getFooterData(): FooterData {
  return footerJson as FooterData;
}

export function getSpecialPackagesData(): SpecialPackagesData {
  return specialPackagesJson as SpecialPackagesData;
}
