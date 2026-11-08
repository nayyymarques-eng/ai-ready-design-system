# Catalogue

The components, in React. Each is in `src/components/`, and `src/index.ts` exports them all: `import { Button, Card } from '../src'`. Load `tokens.css` then `components.css`.

## Layout
- **AppShell**: `<AppShell nav={<NavRail … />}>…page…</AppShell>`
- **NavRail**: `<NavRail brand="Tolvane" items={[{ label: 'Drivers', href: '#', count: 24, current: true }]} />`
- **PageHeader**: `<PageHeader title="Drivers" status={<Badge>…</Badge>} actions={<Button …/>} />`
- **Section**: `<Section title="Recent" titleId="recent">…</Section>`
- **Stack** (vertical, 16 gap), **Row** (horizontal, 8 gap), **Grid** (auto columns, min 220): `<Stack>…</Stack>`

## Components
- **Card**: `<Card>…</Card>`
- **Button**: `<Button variant="primary">Save</Button>`; variant `primary`, `secondary`, `ghost`, `danger`
- **MenuButton**: `<MenuButton label="More actions" items={[{ label: 'Edit' }, { label: 'Deactivate' }]} />`
- **Field**: `<Field id="name" label="Name" hint="…" />`; `type` text, email, number, date, time, tel; `options={['EUR', 'GBP']}` makes a select; `error="…"`
- **Checkbox**: `<Checkbox label="…" />`
- **Switch**: `<Switch label="…" defaultChecked />`
- **ToggleGroup**: `<ToggleGroup label="Filter" items={[{ label: 'All', count: 24, selected: true }, { label: 'Active', count: 18 }]} />`
- **Tabs**: `<Tabs label="Invoice" items={[{ label: 'Overview', current: true }, { label: 'History' }]} />`
- **Table**: `<Table columns={[{ label: 'Name' }, { label: 'Amount', numeric: true }]}><Tr><Td>…</Td><Td numeric>…</Td></Tr></Table>`
- **Badge**: `<Badge tone="positive">Paid</Badge>`; tone `positive`, `warning`, `critical`, `info`, or none for neutral
- **Numeral**: `<Numeral>24</Numeral>`
- **Stat**: `<Stat label="Deliveries this month" value="12,480" />`
- **Banner**: `<Banner tone="warning"><p>…</p></Banner>`; tone `warning`, `critical`, or none for info
- **List**: `<List><ListItem label="Tax ID" value="PT 234 567 890" /></List>`; or `<ListItem>…</ListItem>`
- **Avatar**: `<Avatar initials="AM" />`
- **Progress**: `<Progress value={3} max={5} label="3 of 5 steps done" />`
- **BarChart**: `<BarChart label="Deliveries, last six months" bars={[{ label: 'Jun', display: '10.2k', value: 10200, current: true }]} />`
- **EmptyState**: `<EmptyState title="No invoices yet" action={<Button …/>}><p>…</p></EmptyState>`
- **Dialog**: `<Dialog id="d1" title="…" open actions={<>…buttons…</>}>…</Dialog>`
