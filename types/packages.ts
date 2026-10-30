export interface PackageCategory {
  readonly id: string;
  readonly name: string;
  readonly description: string;
}

export interface PackageItem {
  readonly id: string;
  readonly categoryId: string;
  readonly name: string;
  readonly price: string;
  readonly priceValue: number;
  readonly priceNote: string;
  readonly features: readonly string[];
  readonly whatsappLink: string;
  readonly highlighted: boolean;
  readonly badge: string | null;
}

export interface PackagesData {
  readonly categories: readonly PackageCategory[];
  readonly items: readonly PackageItem[];
}
