# Catalogue

Load `tokens.css` then `components.css`. These are the components and their markup.

## Layout
- **App shell**: `<div class="app"><nav class="nav-rail">…</nav><main class="page">…</main></div>`
- **Nav rail brand** (the product name, first in the rail): `<span class="nav-rail__brand">Tolvane</span>`
- **Nav rail item**: `<a class="nav-rail__item is-current" href="#">Drivers <span class="numeral">24</span></a>`
- **Page header**: `<header class="page-header"><h1 class="page-header__title">Drivers</h1><div class="page-header__actions">…buttons…</div></header>`
- **Section**: `<section class="section"><h2 class="section__title">Recent</h2>…</section>`
- **Stack** (vertical, 16 gap): `<div class="stack">…</div>`
- **Row** (horizontal, 8 gap): `<div class="row">…</div>`
- **Grid** (auto columns, min 220): `<div class="grid">…</div>`

## Components
- **Card**: `<div class="card">…</div>`
- **Button**: `<button class="btn btn--primary">Save</button>`; variants `btn--primary`, `btn--secondary`, `btn--ghost`, `btn--danger`
- **Menu button**: `<div class="menu-button"><button class="btn btn--ghost" aria-label="More actions">⋯</button><div class="menu"><button class="menu__item">Edit</button></div></div>`
- **Field**: `<div class="field"><label class="field__label" for="x">Name</label><input class="field__input" id="x"><p class="field__hint">…</p></div>`; also `<select class="field__select">`, `<p class="field__error">`
- **Checkbox**: `<label class="checkbox"><input type="checkbox"> Label</label>`
- **Switch**: `<label class="switch"><input type="checkbox" role="switch"> Label</label>`
- **Toggle group**: `<div class="toggle-group" role="group" aria-label="Filter"><button class="toggle-group__item is-selected">All</button><button class="toggle-group__item">Active</button></div>`
- **Tabs**: `<div class="tabs" role="tablist"><button class="tabs__item is-current" role="tab">Overview</button><button class="tabs__item" role="tab">Documents</button></div>`
- **Table**: `<div class="table-scroll"><table class="table"><thead><tr><th>Name</th><th class="is-number">Amount</th></tr></thead><tbody>…</tbody></table></div>`
- **Badge**: `<span class="badge badge--positive">Paid</span>`; variants `badge--positive`, `badge--warning`, `badge--critical`, `badge--info`, or none for neutral
- **Numeral**: `<span class="numeral">24</span>`
- **Stat**: `<div class="stat"><span class="stat__label">Deliveries this month</span><span class="stat__value">12,480</span></div>`
- **Banner**: `<div class="banner banner--warning" role="status"><p>…</p></div>`; variants none (info), `banner--warning`, `banner--critical`
- **List**: `<div class="list"><div class="list__item">…</div></div>`; also read-only details: `<div class="list__item"><span>Tax ID</span><strong>PT 234 567 890</strong></div>`
- **Avatar**: `<span class="avatar">AM</span>`
- **Progress**: `<div class="progress" role="progressbar" aria-valuemin="0" aria-valuemax="5" aria-valuenow="3"><div class="progress__label"><span>3 of 5 steps done</span><span class="numeral">60%</span></div><div class="progress__track"><div class="progress__fill" style="--value:60"></div></div></div>`
- **Bar chart**: `<div class="bar-chart" role="img" aria-label="Deliveries, last six months"><div class="bar-chart__col"><span class="bar-chart__value">10.2k</span><div class="bar-chart__bar" style="--value:85"></div><span class="bar-chart__label">Jun</span></div>…</div>`; `is-current` on the bar that matters most
- **Empty state**: `<div class="empty-state"><h2 class="empty-state__title">No invoices yet</h2><p>…</p><button class="btn btn--primary">…</button></div>`
- **Dialog**: `<div class="dialog-backdrop"><div class="dialog" role="dialog" aria-labelledby="d1"><h2 class="dialog__title" id="d1">…</h2><p>…</p><div class="dialog__actions">…</div></div></div>`
- **Table cell modifier**: `is-number` on `<th>`/`<td>` for amounts
- **State classes**: `is-current`, `is-selected`, `is-open`
