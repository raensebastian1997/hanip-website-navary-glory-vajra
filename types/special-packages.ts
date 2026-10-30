export interface SpecialPackageItem {
  readonly slug: string;
  readonly label: string;
  readonly href: string;
  readonly description: string;
  readonly introduction: string;
  readonly sections: readonly SpecialPackageSection[];
}

export interface SpecialPackageSection {
  readonly heading: string;
  readonly items: readonly string[];
}

export interface SpecialPackagesData {
  readonly items: readonly SpecialPackageItem[];
}
