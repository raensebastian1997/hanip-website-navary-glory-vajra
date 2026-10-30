export interface FooterLink {
  readonly label: string;
  readonly href: string;
}

export interface FooterLinkGroup {
  readonly title: string;
  readonly links: readonly FooterLink[];
}

export interface FooterContact {
  readonly address: string;
  readonly phoneDisplay: string;
  readonly phoneHref: string;
  readonly whatsappDisplay: string;
  readonly whatsappLink: string;
  readonly email: string;
}

export interface FooterData {
  readonly description: string;
  readonly contact: FooterContact;
  readonly groups: readonly FooterLinkGroup[];
  readonly copyright: string;
  readonly legalNote: string;
}
