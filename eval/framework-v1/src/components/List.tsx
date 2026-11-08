import type { ReactNode } from 'react';

/** Label and value pairs, or a short list of items. Contract: contracts/list.md */
export function List({ children }: { children: ReactNode }) { return <div className="list">{children}</div>; }
export function ListItem({ label, value, children }: { label?: ReactNode; value?: ReactNode; children?: ReactNode }) {
  return <div className="list__item">{label !== undefined ? <span>{label}</span> : null}{value !== undefined ? <strong>{value}</strong> : null}{children}</div>;
}
