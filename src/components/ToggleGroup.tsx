/** Filters one list by one choice at a time. Contract: contracts/toggle-group.md */
export type ToggleGroupProps = {
  label: string;
  items: { label: string; count?: number; selected?: boolean }[];
  /** Called with the item's index when it is chosen. The screen keeps which item is selected. */
  onSelect?: (index: number) => void;
};

export function ToggleGroup({ label, items, onSelect }: ToggleGroupProps) {
  return (
    <div className="toggle-group" role="group" aria-label={label}>
      {items.map((i, n) => (
        <button key={i.label} className={i.selected ? 'toggle-group__item is-selected' : 'toggle-group__item'} type="button"
          aria-pressed={!!i.selected} onClick={onSelect ? () => onSelect(n) : undefined}>
          {i.label}{i.count !== undefined ? <> <span className="numeral">{i.count}</span></> : null}
        </button>
      ))}
    </div>
  );
}
