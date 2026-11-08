import { ListPage, NavRail, ToggleGroup, Table, Tr, Td, Badge, Avatar, Row, NewPart, Button } from '../src';

export const title = 'Proof to review';

export const css = `
.x-proof-thumb { display: inline-flex; align-items: flex-end; justify-content: center; width: var(--s7); height: var(--s6); border-radius: var(--radius); background: var(--surface-sunken); border: var(--border); overflow: hidden; flex: none; }
.x-proof-thumb__parcel { width: var(--s4); height: var(--s3); margin-bottom: var(--s1); background: var(--line); border-radius: var(--radius); }
.x-proof-thumb.is-empty { border-style: dashed; align-items: center; background: var(--surface); }
.x-proof-thumb__none { font: var(--type-small); color: var(--muted); }
`;

type Delivery = {
  parcel: string;
  recipient: string;
  area: string;
  driver: string;
  initials: string;
  delivered: string;
  disputed: boolean;
  photo: boolean;
  signature: boolean;
};

const deliveries: Delivery[] = [
  { parcel: 'TLV-48213', recipient: 'Marta Lindqvist', area: 'Hackney E8', driver: 'Ana Moreira', initials: 'AM', delivered: 'Today, 09:42', disputed: true, photo: true, signature: true },
  { parcel: 'TLV-48197', recipient: 'Kofi Mensah', area: 'Peckham SE15', driver: 'Tomasz Nowak', initials: 'TN', delivered: 'Today, 08:15', disputed: true, photo: false, signature: true },
  { parcel: 'TLV-48160', recipient: 'Priya Raman', area: 'Islington N1', driver: 'Ana Moreira', initials: 'AM', delivered: 'Yesterday, 17:58', disputed: false, photo: true, signature: false },
  { parcel: 'TLV-48144', recipient: 'Daniel Okafor', area: 'Brixton SW2', driver: 'Sofia Ricci', initials: 'SR', delivered: 'Yesterday, 16:20', disputed: false, photo: false, signature: true },
  { parcel: 'TLV-48121', recipient: 'Hannah Clarke', area: 'Camden NW1', driver: 'Liam Byrne', initials: 'LB', delivered: 'Yesterday, 14:03', disputed: true, photo: true, signature: false },
  { parcel: 'TLV-48098', recipient: 'Yusuf Demir', area: 'Walthamstow E17', driver: 'Tomasz Nowak', initials: 'TN', delivered: 'Yesterday, 11:47', disputed: false, photo: false, signature: false },
  { parcel: 'TLV-48052', recipient: 'Chloe Martin', area: 'Clapham SW4', driver: 'Sofia Ricci', initials: 'SR', delivered: '6 Nov, 18:31', disputed: true, photo: true, signature: true },
  { parcel: 'TLV-48017', recipient: 'Arjun Patel', area: 'Stratford E15', driver: 'Liam Byrne', initials: 'LB', delivered: '6 Nov, 10:09', disputed: false, photo: true, signature: false },
];

const count = (f: (d: Delivery) => boolean) => deliveries.filter(f).length;

function ProofThumb({ d }: { d: Delivery }) {
  if (!d.photo) {
    return (
      <NewPart name="proof-thumb" className="x-proof-thumb" job="A small preview of the delivery photo in a table row" why="No component shows an image or a preview of one" role="img" aria-label="No photo taken">
        <span className="x-proof-thumb__none">None</span>
      </NewPart>
    );
  }
  return (
    <NewPart name="proof-thumb" className="x-proof-thumb" job="A small preview of the delivery photo in a table row" why="No component shows an image or a preview of one" role="img" aria-label={`Delivery photo for ${d.parcel}`}>
      <span className="x-proof-thumb__parcel" />
    </NewPart>
  );
}

function Issues({ d }: { d: Delivery }) {
  return (
    <Row>
      {d.disputed ? <Badge tone="critical">Disputed</Badge> : null}
      {!d.photo ? <Badge tone="warning">No photo</Badge> : null}
      {!d.signature ? <Badge tone="warning">No signature</Badge> : null}
    </Row>
  );
}

export default function PodQueue() {
  return (
    <ListPage
      nav={<NavRail brand="Tolvane" items={[
        { label: 'Today', href: '#' },
        { label: 'Routes', href: '#' },
        { label: 'Drivers', href: '#', count: 24 },
        { label: 'Proof to review', href: '#', count: deliveries.length, current: true },
        { label: 'Customers', href: '#' },
        { label: 'Settings', href: '#' },
      ]} />}
      title="Proof to review"
      actions={<Button variant="secondary">Export list</Button>}
      filters={<ToggleGroup label="Filter deliveries" items={[
        { label: 'All', count: deliveries.length, selected: true },
        { label: 'Disputed', count: count(d => d.disputed) },
        { label: 'Missing photo', count: count(d => !d.photo) },
        { label: 'Missing signature', count: count(d => !d.signature) },
      ]} />}
    >
      <Table columns={[
        { label: 'Parcel' },
        { label: 'Recipient' },
        { label: 'Driver' },
        { label: 'Marked delivered' },
        { label: 'Photo' },
        { label: 'Why it needs review' },
      ]}>
        {deliveries.map(d => (
          <Tr key={d.parcel}>
            <Td><a href="#" aria-label={`Review delivery ${d.parcel}`}>{d.parcel.replace('-', '\u2011')}</a></Td>
            <Td>{d.recipient}</Td>
            <Td><Row><Avatar initials={d.initials} />{d.driver}</Row></Td>
            <Td>{d.delivered}</Td>
            <Td><ProofThumb d={d} /></Td>
            <Td><Issues d={d} /></Td>
          </Tr>
        ))}
      </Table>
    </ListPage>
  );
}
