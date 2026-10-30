export interface WhatsAppConfig {
  readonly number: string;
  readonly display: string;
  readonly defaultMessage: string;
}

export interface SiteData {
  readonly name: string;
  readonly shortName: string;
  readonly domain: string;
  readonly url: string;
  readonly title: string;
  readonly description: string;
  readonly tagline: string;
  readonly whatsapp: WhatsAppConfig;
}
