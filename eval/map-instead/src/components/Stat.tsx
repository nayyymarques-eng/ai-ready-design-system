/** One number that matters, with its label. Contract: contracts/stat.md */
export function Stat({ label, value }: { label: string; value: string }) {
  return <div className="stat"><span className="stat__label">{label}</span><span className="stat__value">{value}</span></div>;
}
