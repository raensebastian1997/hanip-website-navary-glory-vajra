export interface HeroCta {
  readonly label: string;
  readonly href: string;
}

export interface HeroStat {
  readonly value: string;
  readonly label: string;
}

export interface HeroData {
  readonly eyebrow: string;
  readonly title: string;
  readonly highlight: string;
  readonly description: string;
  readonly pricePrefix: string;
  readonly price: string;
  readonly priceNote: string;
  readonly primaryCta: HeroCta;
  readonly secondaryCta: HeroCta;
  readonly stats: readonly HeroStat[];
  readonly trustNote: string;
  readonly documentTitle: string;
  readonly documentStatus: string;
  readonly documentItems: readonly string[];
  readonly documentFooter: string;
}
