import { AppShell, NavRail, PageHeader, ToggleGroup, Table, Tr, Td, Badge, Avatar, Button, Stack, NewPart } from '../src';

export const title = 'Proof to review';

export const css = `
.x-filter-scroll { max-width: 100%; overflow-x: auto; white-space: nowrap; }
.x-pod-thumb { position: relative; display: block; width: 48px; height: 36px; border-radius: var(--radius); background: var(--surface-sunken); border: var(--border); overflow: hidden; }
.x-pod-thumb__step { position: absolute; left: 0; right: 0; bottom: 0; height: 10px; background: var(--line); }
.x-pod-thumb__parcel { position: absolute; left: 12px; bottom: 6px; width: 24px; height: 16px; border-radius: var(--radius); background: var(--muted); }
.x-pod-thumb__parcel::after { content: ""; position: absolute; left: 11px; top: 0; bottom: 0; width: 2px; background: var(--surface-sunken); }
.x-pod-thumb.is-empty { background: var(--surface); border-style: dashed; display: flex; align-items: center; justify-content: center; font: var(--type-small); color: var(--muted); }
.x-cell-person { display: flex; align-items: center; gap: var(--s2); white-space: nowrap; }
.x-cell-badges { display: flex; flex-wrap: wrap; gap: var(--s1); min-width: 120px; }
.x-cell-stack { display: flex; flex-direction: column; white-space: nowrap; }
.x-cell-stack__sub { font: var(--type-small); color: var(--muted); }
`;

type Delivery = {
  parcel: string;
  route: string;
  recipient: string;
  address: string;
  driver: string;
  initials: string;
  delivered: string;
  deliveredDay: string;
  photo: boolean;
  signature: boolean;
  disputed: boolean;
};

const deliveries: Delivery[] = [
  { parcel: 'TLV-48213', route: 'Route 14', recipient: 'Hannah Okafor', address: '22 Larch Close, Leeds LS6 2QT', driver: 'Marek Nowak', initials: 'MN', delivered: '09:42', deliveredDay: 'Today', photo: true, signature: false, disputed: true },
  { parcel: 'TLV-48197', route: 'Route 14', recipient: 'Daniel Brennan', address: 'Flat 3, 8 Cardigan Road, Leeds LS6 1LF', driver: 'Marek Nowak', initials: 'MN', delivered: '09:15', deliveredDay: 'Today', photo: false, signature: false, disputed: true },
  { parcel: 'TLV-48160', route: 'Route 9', recipient: 'Priya Raman', address: '117 Otley Road, Leeds LS16 5JX', driver: 'Sofia Almeida', initials: 'SA', delivered: '08:58', deliveredDay: 'Today', photo: false, signature: true, disputed: false },
  { parcel: 'TLV-47984', route: 'Route 3', recipient: 'Wenlowe Print Ltd', address: 'Unit 4, Aire Valley Park, Bradford BD4 6SD', driver: 'Tom Hartley', initials: 'TH', delivered: '16:31', deliveredDay: 'Yesterday', photo: true, signature: true, disputed: true },
  { parcel: 'TLV-47951', route: 'Route 9', recipient: 'Grace Whitfield', address: '5 Moorland Terrace, Leeds LS17 7AB', driver: 'Sofia Almeida', initials: 'SA', delivered: '15:07', deliveredDay: 'Yesterday', photo: true, signature: false, disputed: false },
  { parcel: 'TLV-47902', route: 'Route 6', recipient: 'Omar Siddiqui', address: '41 Harehills Lane, Leeds LS8 4HA', driver: 'Lena Fischer', initials: 'LF', delivered: '13:22', deliveredDay: 'Yesterday', photo: false, signature: true, disputed: true },
  { parcel: 'TLV-47855', route: 'Route 3', recipient: 'Rachel Moss', address: '9 Wharf Street, Shipley BD17 7DW', driver: 'Tom Hartley', initials: 'TH', delivered: '11:48', deliveredDay: 'Yesterday', photo: true, signature: false, disputed: false },
  { parcel: 'TLV-47720', route: 'Route 6', recipient: 'Ben Achterberg', address: '63 Roundhay Road, Leeds LS7 1AN', driver: 'Lena Fischer', initials: 'LF', delivered: '17:54', deliveredDay: 'Tue 3 Nov', photo: false, signature: true, disputed: false },
];

const counts = {
  all: deliveries.length,
  disputed: deliveries.filter(d => d.disputed).length,
  photo: deliveries.filter(d => !d.photo).length,
  signature: deliveries.filter(d => !d.signature).length,
};

function Thumb({ has }: { has: boolean }) {
  if (!has) {
    return (
      <NewPart name="pod-thumb" className="x-pod-thumb is-empty" as="span" role="img" aria-label="No photo taken"
        job="A small preview of the proof-of-delivery photo in a table row"
        why="The system has no image or thumbnail component; screens may not load image files, so the photo is drawn schematically">
        None
      </NewPart>
    );
  }
  return (
    <NewPart name="pod-thumb" className="x-pod-thumb" as="span" role="img" aria-label="Photo of the parcel at the door"
      job="A small preview of the proof-of-delivery photo in a table row"
      why="The system has no image or thumbnail component; screens may not load image files, so the photo is drawn schematically">
      <span className="x-pod-thumb__step" />
      <span className="x-pod-thumb__parcel" />
    </NewPart>
  );
}

function Issues({ d }: { d: Delivery }) {
  return (
    <span className="x-cell-badges">
      {d.disputed ? <Badge tone="critical">Disputed</Badge> : null}
      {!d.photo ? <Badge tone="warning">No photo</Badge> : null}
      {!d.signature ? <Badge tone="warning">No signature</Badge> : null}
    </span>
  );
}

export default function PodQueue() {
  return (
    <AppShell
      nav={
        <NavRail
          brand="Tolvane"
          items={[
            { label: 'Today', href: '#' },
            { label: 'Routes', href: '#', count: 18 },
            { label: 'Drivers', href: '#', count: 42 },
            { label: 'Proof to review', href: '#', count: counts.all, current: true },
            { label: 'Customers', href: '#' },
          ]}
        />
      }
    >
      <PageHeader title="Proof to review" actions={<Button variant="secondary">Export list</Button>} />
      <Stack>
        <NewPart name="filter-scroll" className="x-filter-scroll"
          job="Lets the filter row scroll on its own on a phone"
          why="The toggle group is inline and does not wrap; with four filters and counts it is wider than a 375px screen">
          <ToggleGroup
            label="Filter deliveries"
            items={[
              { label: 'All', count: counts.all, selected: true },
              { label: 'Disputed', count: counts.disputed },
              { label: 'Missing photo', count: counts.photo },
              { label: 'Missing signature', count: counts.signature },
            ]}
          />
        </NewPart>
        <Table
          columns={[
            { label: 'Parcel' },
            { label: 'Recipient' },
            { label: 'Driver' },
            { label: 'Marked delivered' },
            { label: 'Photo' },
            { label: 'Needs review' },
            { label: 'Open' },
          ]}
        >
          {deliveries.map(d => (
            <Tr key={d.parcel}>
              <Td>
                <span className="x-cell-stack">
                  <strong>{d.parcel}</strong>
                  <span className="x-cell-stack__sub">{d.route}</span>
                </span>
              </Td>
              <Td>
                <span className="x-cell-stack">
                  <span>{d.recipient}</span>
                  <span className="x-cell-stack__sub">{d.address}</span>
                </span>
              </Td>
              <Td>
                <span className="x-cell-person"><Avatar initials={d.initials} />{d.driver}</span>
              </Td>
              <Td>
                <span className="x-cell-stack">
                  <span>{d.deliveredDay}</span>
                  <span className="x-cell-stack__sub">{d.delivered}</span>
                </span>
              </Td>
              <Td><Thumb has={d.photo} /></Td>
              <Td><Issues d={d} /></Td>
              <Td><Button variant="secondary" aria-label={`Review ${d.parcel}`}>Review</Button></Td>
            </Tr>
          ))}
        </Table>
      </Stack>
    </AppShell>
  );
}
