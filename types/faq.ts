export interface FaqItem {
  readonly id: string;
  readonly question: string;
  readonly answer: string;
}

export interface FaqData {
  readonly items: readonly FaqItem[];
}
