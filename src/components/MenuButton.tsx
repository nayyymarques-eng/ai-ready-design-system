/** Three or more actions on one thing, behind one button. Contract: contracts/menu-button.md */
export type MenuButtonProps = { label: string; items: { label: string; danger?: boolean }[]; open?: boolean };

export function MenuButton({ label, items, open = false }: MenuButtonProps) {
  return (
    <div className={open ? 'menu-button is-open' : 'menu-button'}>
      <button className="btn btn--tertiary" type="button" aria-label={label} aria-haspopup="menu" aria-expanded={open}>⋯</button>
      <div className="menu" role="menu">
        {items.map(i => <button key={i.label} className="menu__item" type="button" role="menuitem">{i.label}</button>)}
      </div>
    </div>
  );
}
