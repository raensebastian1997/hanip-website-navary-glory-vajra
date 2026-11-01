import type { ReactElement, ReactNode } from 'react';

export interface PageTransitionProps {
  readonly children: ReactNode;
}

export default function Template({ children }: PageTransitionProps): ReactElement {
  return <div className="page-transition">{children}</div>;
}
