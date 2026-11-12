import type { ReactNode } from 'react';

/** A message about the whole screen. Contract: contracts/banner.md */
export type BannerProps = { tone?: 'warning' | 'critical'; children: ReactNode };

export function Banner({ tone, children }: BannerProps) {
  return <div className={tone ? `banner banner--${tone}` : 'banner'} role="status">{children}</div>;
}
