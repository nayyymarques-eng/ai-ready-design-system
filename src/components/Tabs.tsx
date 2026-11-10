/** Switches between views of the same thing. Contract: contracts/tabs.md */
export type TabsProps = {
  label: string;
  items: { label: string; current?: boolean }[];
  /** Called with the tab's index when a tab is chosen. The screen keeps which tab is current. */
  onSelect?: (index: number) => void;
};

export function Tabs({ label, items, onSelect }: TabsProps) {
  return (
    <div className="tabs" role="tablist" aria-label={label}>
      {items.map((i, n) => (
        <button key={i.label} className={i.current ? 'tabs__item is-current' : 'tabs__item'} type="button" role="tab"
          aria-selected={!!i.current} tabIndex={i.current ? 0 : -1} onClick={onSelect ? () => onSelect(n) : undefined}>
          {i.label}
        </button>
      ))}
    </div>
  );
}
