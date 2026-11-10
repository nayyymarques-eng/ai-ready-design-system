/** Three or more actions on one thing, behind one button. Contract: contracts/menu-button.md */
export type MenuButtonProps = {
  label: string;
  items: { label: string; danger?: boolean }[];
  open?: boolean;
  /** Called when the button is pressed. The screen keeps whether the menu is open. */
  onToggle?: () => void;
  /** Called with the action's index when one is chosen. */
  onSelect?: (index: number) => void;
};

export function MenuButton({ label, items, open = false, onToggle, onSelect }: MenuButtonProps) {
  return (
    <div className={open ? 'menu-button is-open' : 'menu-button'}>
      <button className="btn btn--tertiary" type="button" aria-label={label} aria-haspopup="menu" aria-expanded={open} onClick={onToggle}>⋯</button>
      <div className="menu" role="menu" hidden={!open}>
        {items.map((i, n) => (
          <button key={i.label} className="menu__item" type="button" role="menuitem" onClick={onSelect ? () => onSelect(n) : undefined}>{i.label}</button>
        ))}
      </div>
    </div>
  );
}
