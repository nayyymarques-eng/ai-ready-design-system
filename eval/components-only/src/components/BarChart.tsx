/** A few values over time or by category. */
export type Bar = { label: string; display: string; value: number; current?: boolean };

export function BarChart({ label, bars }: { label: string; bars: Bar[] }) {
  const max = Math.max(...bars.map(b => b.value));
  return (
    <div className="bar-chart" role="img" aria-label={label}>
      {bars.map(b => (
        <div key={b.label} className={b.current ? 'bar-chart__col is-current' : 'bar-chart__col'}>
          <span className="bar-chart__value">{b.display}</span>
          <div className="bar-chart__bar" style={{ '--value': Math.round((b.value / max) * 100) } as React.CSSProperties} />
          <span className="bar-chart__label">{b.label}</span>
        </div>
      ))}
    </div>
  );
}
