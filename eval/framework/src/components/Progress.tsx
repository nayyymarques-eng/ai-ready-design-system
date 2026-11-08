/** How far a task has gone. Contract: contracts/progress.md */
export function Progress({ value, max, label }: { value: number; max: number; label: string }) {
  const pct = Math.round((value / max) * 100);
  return (
    <div className="progress" role="progressbar" aria-valuemin={0} aria-valuemax={max} aria-valuenow={value}>
      <div className="progress__label"><span>{label}</span><span className="numeral">{pct}%</span></div>
      <div className="progress__track"><div className="progress__fill" style={{ '--value': pct } as React.CSSProperties} /></div>
    </div>
  );
}
