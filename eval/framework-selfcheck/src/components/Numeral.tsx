/** A number set in tabular figures. Contract: contracts/numeral.md */
export function Numeral({ children }: { children: string | number }) { return <span className="numeral">{children}</span>; }
