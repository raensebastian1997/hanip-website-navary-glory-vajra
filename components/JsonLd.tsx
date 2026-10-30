import type { ReactElement } from 'react';
import type { JsonLdData } from '@/types/seo';

export interface JsonLdProps {
  readonly data: JsonLdData;
}

export function JsonLd({ data }: JsonLdProps): ReactElement {
  const json = JSON.stringify(data).replace(/</g, '\\u003c');

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
