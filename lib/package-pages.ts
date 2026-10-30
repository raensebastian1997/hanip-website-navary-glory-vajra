export interface PackagePage {
  readonly slug: string;
  readonly categoryId: string;
  readonly itemIds: readonly string[];
  readonly title: string;
  readonly description: string;
}

export const PACKAGE_PAGES: readonly PackagePage[] = [
  {
    slug: 'pendirian-pt',
    categoryId: 'pendirian-pt',
    itemIds: ['pt-non-izin', 'pt-dan-izin', 'pt-izin-vo', 'pt-lengkap'],
    title: 'Paket Pendirian PT',
    description: 'Pilih layanan pendirian PT sesuai kebutuhan legalitas dan operasional bisnis Anda.',
  },
  {
    slug: 'pendirian-cv',
    categoryId: 'cv-akta-vo',
    itemIds: ['cv-dan-izin', 'cv-izin-vo'],
    title: 'Paket Pendirian CV',
    description: 'Layanan pendirian CV beserta pengurusan izin dan kebutuhan usaha Anda.',
  },
  {
    slug: 'perubahan-akta',
    categoryId: 'cv-akta-vo',
    itemIds: ['perubahan-akta'],
    title: 'Paket Perubahan Akta PT & CV',
    description: 'Pendampingan perubahan data dan dokumen perusahaan melalui akta notaris.',
  },
  {
    slug: 'hak-kekayaan-intelektual',
    categoryId: 'perizinan-hki',
    itemIds: ['hki'],
    title: 'Pendaftaran Hak Cipta, Merek dan Paten',
    description: 'Lindungi karya dan identitas bisnis dengan pendampingan pendaftaran kekayaan intelektual.',
  },
  {
    slug: 'virtual-office',
    categoryId: 'cv-akta-vo',
    itemIds: ['virtual-office'],
    title: 'Paket Virtual Office',
    description: 'Alamat usaha strategis dengan fasilitas penerimaan surat dan dukungan resepsionis.',
  },
];
