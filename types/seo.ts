export interface PostalAddressSchema {
  readonly '@type': 'PostalAddress';
  readonly streetAddress: string;
  readonly addressLocality: string;
  readonly addressRegion: string;
  readonly postalCode: string;
  readonly addressCountry: string;
}

export interface ContactPointSchema {
  readonly '@type': 'ContactPoint';
  readonly telephone: string;
  readonly contactType: string;
  readonly areaServed: string;
  readonly availableLanguage: readonly string[];
}

export interface OrganizationSchema {
  readonly '@context': 'https://schema.org';
  readonly '@type': 'Organization';
  readonly name: string;
  readonly url: string;
  readonly logo: string;
  readonly description: string;
  readonly email: string;
  readonly telephone: string;
  readonly address: PostalAddressSchema;
  readonly contactPoint: ContactPointSchema;
  readonly areaServed: string;
}

export interface WebSiteSchema {
  readonly '@context': 'https://schema.org';
  readonly '@type': 'WebSite';
  readonly name: string;
  readonly url: string;
  readonly description: string;
  readonly inLanguage: string;
  readonly publisher: {
    readonly '@type': 'Organization';
    readonly name: string;
    readonly url: string;
  };
}

export interface OfferSchema {
  readonly '@type': 'Offer';
  readonly price: string;
  readonly priceCurrency: string;
  readonly availability: string;
  readonly url: string;
}

export interface ServiceSchema {
  readonly '@context': 'https://schema.org';
  readonly '@type': 'Service';
  readonly name: string;
  readonly description: string;
  readonly serviceType: string;
  readonly areaServed: string;
  readonly provider: {
    readonly '@type': 'Organization';
    readonly name: string;
    readonly url: string;
  };
  readonly offers: OfferSchema;
}

export interface QuestionSchema {
  readonly '@type': 'Question';
  readonly name: string;
  readonly acceptedAnswer: {
    readonly '@type': 'Answer';
    readonly text: string;
  };
}

export interface FaqPageSchema {
  readonly '@context': 'https://schema.org';
  readonly '@type': 'FAQPage';
  readonly mainEntity: readonly QuestionSchema[];
}

export type JsonLdData =
  | OrganizationSchema
  | WebSiteSchema
  | ServiceSchema
  | FaqPageSchema;
