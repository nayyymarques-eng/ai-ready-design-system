import { ListPage, NavRail, ToggleGroup, Table, Tr, Td, Badge, Avatar, Row, Button, NewPart } from '../src';

export const title = 'Proof to review · Tolvane';

type Delivery = {
  parcel: string;
  recipient: string;
  place: string;
  driver: string;
  initials: string;
  delivered: string;
  disputed: boolean;
  photo: boolean;
  signature: boolean;
  photoLabel?: string;
};

const deliveries: Delivery[] = [
  { parcel: 'TLV‑48213', recipient: 'Hannah Ruiz', place: 'Leeds LS6', driver: 'Ana Moreira', initials: 'AM', delivered: 'Today, 14:32', disputed: true, photo: true, signature: false, photoLabel: 'Parcel on a doorstep' },
  { parcel: 'TLV‑48197', recipient: 'Oliver Grant', place: 'Leeds LS8', driver: 'Kofi Mensah', initials: 'KM', delivered: 'Today, 13:05', disputed: true, photo: false, signature: false },
  { parcel: 'TLV‑48176', recipient: 'Priya Nair', place: 'Bradford BD9', driver: 'Kofi Mensah', initials: 'KM', delivered: 'Today, 11:48', disputed: false, photo: false, signature: true },
  { parcel: 'TLV‑48150', recipient: 'Daniel Okafor', place: 'Leeds LS11', driver: 'Ewa Nowak', initials: 'EN', delivered: 'Today, 10:21', disputed: false, photo: true, signature: false, photoLabel: 'Parcel handed over at a shop counter' },
  { parcel: 'TLV‑48102', recipient: 'Sophie Laurent', place: 'Wakefield WF1', driver: 'Ana Moreira', initials: 'AM', delivered: 'Yesterday, 17:56', disputed: true, photo: true, signature: true, photoLabel: 'Parcel by a front door' },
  { parcel: 'TLV‑48077', recipient: 'Marcus Webb', place: 'Leeds LS2', driver: 'Tom Hale', initials: 'TH', delivered: 'Yesterday, 16:10', disputed: false, photo: false, signature: true },
  { parcel: 'TLV‑48041', recipient: 'Aisha Rahman', place: 'Huddersfield HD1', driver: 'Ewa Nowak', initials: 'EN', delivered: 'Yesterday, 12:37', disputed: true, photo: false, signature: true },
  { parcel: 'TLV‑47998', recipient: 'Liam Carter', place: 'Leeds LS7', driver: 'Tom Hale', initials: 'TH', delivered: 'Yesterday, 09:14', disputed: false, photo: true, signature: false, photoLabel: 'Parcel in a porch' },
  { parcel: 'TLV‑47965', recipient: 'Grace Thompson', place: 'Halifax HX1', driver: 'Jamal Idris', initials: 'JI', delivered: '8 Nov, 18:42', disputed: true, photo: true, signature: true, photoLabel: 'Parcel behind a side gate' },
  { parcel: 'TLV‑47930', recipient: 'Noah Fischer', place: 'Leeds LS4', driver: 'Jamal Idris', initials: 'JI', delivered: '8 Nov, 15:03', disputed: false, photo: true, signature: false, photoLabel: 'Parcel on a doormat' },
];

const counts = {
  all: deliveries.length,
  disputed: deliveries.filter(d => d.disputed).length,
  photo: deliveries.filter(d => !d.photo).length,
  signature: deliveries.filter(d => !d.signature).length,
};

function ProofPhoto({ d }: { d: Delivery }) {
  if (!d.photo) {
    return (
      <NewPart name="proof-photo" className="x-proof-photo x-proof-photo--none" job="A small preview of the delivery photo, or its absence"
        why="The system has no image thumbnail, and screens may not load image files">
        No photo
      </NewPart>
    );
  }
  return (
    <NewPart name="proof-photo" className="x-proof-photo" role="img" aria-label={`Delivery photo: ${d.photoLabel}`}
      job="A small preview of the delivery photo, or its absence"
      why="The system has no image thumbnail, and screens may not load image files">
      <span className="x-proof-photo__parcel" />
    </NewPart>
  );
}

function Missing({ d }: { d: Delivery }) {
  if (d.photo && d.signature) return <>Nothing missing</>;
  return (
    <Row>
      {!d.photo ? <Badge tone="warning">Photo</Badge> : null}
      {!d.signature ? <Badge tone="warning">Signature</Badge> : null}
    </Row>
  );
}

export default function PodQueue() {
  return (
    <ListPage
      nav={<NavRail brand="Tolvane" items={[
        { label: 'Today', href: '#' },
        { label: 'Routes', href: '#' },
        { label: 'Drivers', href: '#' },
        { label: 'Proof to review', href: '#', count: counts.all, current: true },
        { label: 'Customers', href: '#' },
        { label: 'Settings', href: '#' },
      ]} />}
      title="Proof to review"
      actions={<Button variant="secondary">Export list</Button>}
      filters={<ToggleGroup label="Filter deliveries" items={[
        { label: 'All', count: counts.all, selected: true },
        { label: 'Disputed', count: counts.disputed },
        { label: 'Missing photo', count: counts.photo },
        { label: 'Missing signature', count: counts.signature },
      ]} />}
    >
      <Table columns={[
          { label: 'Parcel' },
          { label: 'Recipient' },
          { label: 'Driver' },
          { label: 'Marked delivered' },
          { label: 'Photo' },
          { label: 'Missing proof' },
          { label: 'Dispute' },
        ]}>
        {deliveries.map(d => (
          <Tr key={d.parcel}>
            <Td><a href={`#review-${d.parcel.replace('\u2011', '-')}`} aria-label={`Review parcel ${d.parcel.replace('\u2011', '-')}`}>{d.parcel}</a></Td>
            <Td>{d.recipient}, {d.place}</Td>
            <Td><Row><Avatar initials={d.initials} />{d.driver}</Row></Td>
            <Td>{d.delivered}</Td>
            <Td><ProofPhoto d={d} /></Td>
            <Td><Missing d={d} /></Td>
            <Td>{d.disputed ? <Badge tone="critical">Not received</Badge> : 'None'}</Td>
          </Tr>
        ))}
      </Table>
    </ListPage>
  );
}

export const css = `
.x-proof-photo {
  position: relative;
  width: var(--s7);
  height: var(--s7);
  border-radius: var(--radius);
  overflow: hidden;
  background: linear-gradient(to bottom, var(--line) 0 62%, var(--muted) 62% 100%);
  display: flex;
  align-items: center;
  justify-content: center;
}
.x-proof-photo__parcel {
  position: absolute;
  left: var(--s3);
  bottom: var(--s2);
  width: var(--s5);
  height: var(--s4);
  background: var(--tint-warning);
  border: 1px solid var(--warning);
  border-radius: var(--radius);
}
.x-proof-photo--none {
  background: var(--surface-sunken);
  border: 1px dashed var(--muted);
  font: var(--type-small);
  color: var(--muted);
  text-align: center;
  padding: var(--s1);
}
`;
