import { ListPage, NavRail, ToggleGroup, Table, Tr, Td, Badge, Button, Row, NewPart } from '../src';

export const title = 'Proof to review';

export const css = `
.x-pod-thumb { display: inline-flex; align-items: flex-end; justify-content: flex-start; width: 48px; height: 36px; border-radius: var(--radius); background: var(--surface-sunken); border: var(--border); overflow: hidden; vertical-align: middle; }
.x-pod-thumb__box { display: block; width: 24px; height: 16px; margin: 0 0 var(--s1) var(--s2); border-radius: var(--radius); background: var(--line); }
.x-pod-thumb--none { align-items: center; justify-content: center; font: var(--type-small); color: var(--muted); }
`;

type Missing = 'photo' | 'signature' | 'both' | 'none';

type Delivery = {
  parcel: string;
  contents: string;
  recipient: string;
  address: string;
  driver: string;
  initials: string;
  deliveredAt: string;
  disputed: boolean;
  missing: Missing;
};

const deliveries: Delivery[] = [
  { parcel: 'TLV-48213', contents: '1 box, 4.2 kg', recipient: 'Marta Lindqvist', address: '14 Harbour Row, Leith', driver: 'Ana Moreira', initials: 'AM', deliveredAt: 'Today, 09:42', disputed: true, missing: 'none' },
  { parcel: 'TLV-48177', contents: '2 boxes, 11.0 kg', recipient: 'Devon Okafor', address: 'Flat 3, 88 Calton Road', driver: 'Jonas Becker', initials: 'JB', deliveredAt: 'Today, 08:15', disputed: true, missing: 'signature' },
  { parcel: 'TLV-48102', contents: '1 envelope', recipient: 'Priya Raman', address: '2 Wester Coates Gardens', driver: 'Ana Moreira', initials: 'AM', deliveredAt: 'Yesterday, 17:58', disputed: false, missing: 'photo' },
  { parcel: 'TLV-48095', contents: '1 box, 2.7 kg', recipient: 'Callum Reid', address: '41 Dalry Road', driver: 'Sofia Brandt', initials: 'SB', deliveredAt: 'Yesterday, 16:20', disputed: false, missing: 'signature' },
  { parcel: 'TLV-48061', contents: '1 box, 6.5 kg', recipient: 'Hana Sato', address: 'Unit 7, Bonnington Mill', driver: 'Liam Kerr', initials: 'LK', deliveredAt: 'Yesterday, 14:03', disputed: true, missing: 'photo' },
  { parcel: 'TLV-47988', contents: '3 boxes, 18.4 kg', recipient: 'Ewan Fraser', address: '9 Comely Bank Avenue', driver: 'Jonas Becker', initials: 'JB', deliveredAt: '6 Nov, 11:37', disputed: false, missing: 'both' },
  { parcel: 'TLV-47952', contents: '1 box, 1.1 kg', recipient: 'Lucía Ortega', address: '22 Marchmont Crescent', driver: 'Sofia Brandt', initials: 'SB', deliveredAt: '6 Nov, 10:09', disputed: true, missing: 'none' },
  { parcel: 'TLV-47910', contents: '1 envelope', recipient: 'Tom Achterberg', address: '5 Warrender Park Terrace', driver: 'Liam Kerr', initials: 'LK', deliveredAt: '5 Nov, 15:46', disputed: false, missing: 'signature' },
];

const nb = (t: string) => t.replace(/ /g, '\u00a0').replace(/-/g, '\u2011');

const count = (f: (d: Delivery) => boolean) => deliveries.filter(f).length;
const hasNoPhoto = (d: Delivery) => d.missing === 'photo' || d.missing === 'both';
const hasNoSignature = (d: Delivery) => d.missing === 'signature' || d.missing === 'both';

function Photo({ d }: { d: Delivery }) {
  if (hasNoPhoto(d)) {
    return (
      <NewPart name="proof-thumbnail" className="x-pod-thumb x-pod-thumb--none" job="A small preview of the delivery photo in a table row" why="No component shows an image or its placeholder" role="img" aria-label={`No photo for ${d.parcel}`}>
        None
      </NewPart>
    );
  }
  return (
    <NewPart name="proof-thumbnail" className="x-pod-thumb" job="A small preview of the delivery photo in a table row" why="No component shows an image or its placeholder" role="img" aria-label={`Proof photo for ${d.parcel}, parcel at the door`}>
      <span className="x-pod-thumb__box" />
    </NewPart>
  );
}

function Status({ d }: { d: Delivery }) {
  return (
    <Row>
      {d.disputed ? <Badge tone="critical">Disputed</Badge> : null}
      {hasNoPhoto(d) ? <Badge tone="warning">No photo</Badge> : null}
      {hasNoSignature(d) ? <Badge tone="warning">No signature</Badge> : null}
      {d.missing === 'none' ? <Badge>Proof complete</Badge> : null}
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
        { label: nb('Proof to review'), href: '#', count: deliveries.length, current: true },
        { label: 'Customers', href: '#' },
        { label: 'Settings', href: '#' },
      ]} />}
      title="Proof to review"
      filters={<ToggleGroup label="Filter deliveries" items={[
        { label: 'All', count: deliveries.length, selected: true },
        { label: 'Disputed', count: count(d => d.disputed) },
        { label: nb('Missing photo'), count: count(hasNoPhoto) },
        { label: nb('Missing signature'), count: count(hasNoSignature) },
      ]} />}
    >
      <Table columns={[
        { label: 'Parcel' },
        { label: 'Recipient' },
        { label: 'Driver' },
        { label: 'Marked delivered' },
        { label: 'Photo' },
        { label: 'Dispute and missing proof' },
        { label: 'Review' },
      ]}>
        {deliveries.map(d => (
          <Tr key={d.parcel}>
            <Td><strong>{nb(d.parcel)}</strong><br />{nb(d.contents)}</Td>
            <Td>{nb(d.recipient)}<br />{nb(d.address)}</Td>
            <Td>{nb(d.driver)}</Td>
            <Td>{nb(d.deliveredAt)}</Td>
            <Td><Photo d={d} /></Td>
            <Td><Status d={d} /></Td>
            <Td><Button variant="secondary" aria-label={`Review ${d.parcel}`}>Review</Button></Td>
          </Tr>
        ))}
      </Table>
    </ListPage>
  );
}
