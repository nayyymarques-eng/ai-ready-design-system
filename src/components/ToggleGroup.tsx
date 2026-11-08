/** Filters one list by one choice at a time. Contract: contracts/toggle-group.md */
export function ToggleGroup({ label, items }: { label: string; items: { label: string; count?: number; selected?: boolean }[] }) {
  return (
    <div className="toggle-group" role="group" aria-label={label}>
      {items.map(i => (
        <button key={i.label} className={i.selected ? 'toggle-group__item is-selected' : 'toggle-group__item'} type="button" aria-pressed={!!i.selected}>
          {i.label}{i.count !== undefined ? <> <span className="numeral">{i.count}</span></> : null}
        </button>
      ))}
    </div>
  );
}
