import type { ReactNode } from 'react';

/** Rows of things with the same fields. Contract: contracts/table.md */
export type Column = { label: string; numeric?: boolean };

export function Table({ columns, caption, children }: { columns: Column[]; caption?: string; children: ReactNode }) {
  return (
    <div className="table-scroll"><table className="table">
      {caption ? <caption>{caption}</caption> : null}
      <thead><tr>{columns.map(c => <th key={c.label} scope="col" className={c.numeric ? 'is-number' : undefined}>{c.label}</th>)}</tr></thead>
      <tbody>{children}</tbody>
    </table></div>
  );
}
export function Tr({ children }: { children: ReactNode }) { return <tr>{children}</tr>; }
export function Td({ numeric, children }: { numeric?: boolean; children?: ReactNode }) {
  return <td className={numeric ? 'is-number' : undefined}>{children}</td>;
}
