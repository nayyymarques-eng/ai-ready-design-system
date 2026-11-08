import type { ReactNode } from 'react';

/** A short status word. */
export type BadgeProps = { tone?: 'positive' | 'warning' | 'critical' | 'info'; children: ReactNode };

export function Badge({ tone, children }: BadgeProps) {
  return <span className={tone ? `badge badge--${tone}` : 'badge'}>{children}</span>;
}
