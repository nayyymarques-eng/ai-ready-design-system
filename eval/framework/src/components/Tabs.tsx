/** Switches between views of the same thing. Contract: contracts/tabs.md */
export function Tabs({ label, items }: { label: string; items: { label: string; current?: boolean }[] }) {
  return (
    <div className="tabs" role="tablist" aria-label={label}>
      {items.map(i => <button key={i.label} className={i.current ? 'tabs__item is-current' : 'tabs__item'} type="button" role="tab" aria-selected={!!i.current}>{i.label}</button>)}
    </div>
  );
}
