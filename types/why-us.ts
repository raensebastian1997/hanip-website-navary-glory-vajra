export type WhyUsIcon =
  | 'experience'
  | 'shield'
  | 'value'
  | 'speed'
  | 'growth'
  | 'practical'
  | 'support'
  | 'consultation';

export interface WhyUsItem {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly icon: WhyUsIcon;
}
