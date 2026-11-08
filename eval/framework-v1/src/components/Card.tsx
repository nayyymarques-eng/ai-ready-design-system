import type { ReactNode } from 'react';

/** A surface that groups one thing. Contract: contracts/card.md */
export function Card({ children }: { children: ReactNode }) {
  return <div className="card">{children}</div>;
}
