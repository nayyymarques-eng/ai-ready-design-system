import { ListPage, NavRail, ToggleGroup, Table, Tr, Td, Badge, Avatar, Row, NewPart, Button } from '../src';

export const title = 'Proof to review — Tolvane';

type Delivery = {
  parcel: string;
  recipient: string;
  address: string;
  driver: string;
  initials: string;
  delivered: string;
  time: string;
  disputed: boolean;
  photo: boolean;
  signature: boolean;
  scene: 'door' | 'porch' | 'locker' | 'reception';
};

const deliveries: Delivery[] = [
  { parcel: 'TV-48213', recipient: 'Hannah Okafor', address: '14 Albert Road, Leeds', driver: 'Ana Moreira', initials: 'AM', delivered: 'Today', time: '09:42', disputed: true, photo: true, signature: false, scene: 'door' },
  { parcel: 'TV-48197', recipient: 'Marcus Lindqvist', address: '3 Mill Lane, York', driver: 'Tomasz Nowak', initials: 'TN', delivered: 'Today', time: '08:15', disputed: true, photo: false, signature: false, scene: 'porch' },
  { parcel: 'TV-48160', recipient: 'Priya Raman', address: 'Flat 6, 22 Canal Street, Leeds', driver: 'Ana Moreira', initials: 'AM', delivered: 'Yesterday', time: '17:58', disputed: false, photo: true, signature: false, scene: 'reception' },
  { parcel: 'TV-48142', recipient: 'Daniel Achterberg', address: '88 Station Road, Harrogate', driver: 'Kofi Mensah', initials: 'KM', delivered: 'Yesterday', time: '16:31', disputed: true, photo: true, signature: true, scene: 'locker' },
  { parcel: 'TV-48119', recipient: 'Sofia Bianchi', address: '5 Orchard Close, Wakefield', driver: 'Leah Byrne', initials: 'LB', delivered: 'Yesterday', time: '14:07', disputed: false, photo: false, signature: true, scene: 'door' },
  { parcel: 'TV-48088', recipient: 'Owen Price', address: '41 Park View, Bradford', driver: 'Tomasz Nowak', initials: 'TN', delivered: 'Yesterday', time: '11:20', disputed: false, photo: true, signature: false, scene: 'porch' },
  { parcel: 'TV-48054', recipient: 'Aisha Bello', address: 'Unit 2, Kirkstall Trade Park, Leeds', driver: 'Kofi Mensah', initials: 'KM', delivered: '9 Nov', time: '15:46', disputed: true, photo: true, signature: true, scene: 'reception' },
  { parcel: 'TV-48031', recipient: 'Grace Whitfield', address: '17 Beech Grove, Otley', driver: 'Leah Byrne', initials: 'LB', delivered: '9 Nov', time: '10:12', disputed: false, photo: false, signature: true, scene: 'door' },
  { parcel: 'TV-47996', recipient: 'Ravi Chandran', address: '9 Hill Top, Huddersfield', driver: 'Ana Moreira', initials: 'AM', delivered: '8 Nov', time: '18:03', disputed: false, photo: true, signature: false, scene: 'locker' },
];

const counts = {
  all: deliveries.length,
  disputed: deliveries.filter(d => d.disputed).length,
  photo: deliveries.filter(d => !d.photo).length,
  signature: deliveries.filter(d => !d.signature).length,
};

const sceneText: Record<Delivery['scene'], string> = {
  door: 'parcel at a front door',
  porch: 'parcel on a porch step',
  locker: 'parcel in a parcel locker',
  reception: 'parcel at a reception desk',
};

function ProofThumb({ d }: { d: Delivery }) {
  if (!d.photo) {
    return (
      <NewPart name="proof-thumb" className="x-thumb x-thumb--none" role="img" aria-label="No photo taken"
        job="A small preview of the delivery photo in a table row"
        why="The system has no image or thumbnail component">
        <span className="x-thumb__none" aria-hidden="true">None</span>
      </NewPart>
    );
  }
  return (
    <NewPart name="proof-thumb" className={`x-thumb x-thumb--${d.scene}`} role="img" aria-label={`Delivery photo: ${sceneText[d.scene]}`}
      job="A small preview of the delivery photo in a table row"
      why="The system has no image or thumbnail component">
      <span className="x-thumb__ground" aria-hidden="true" />
      <span className="x-thumb__parcel" aria-hidden="true" />
    </NewPart>
  );
}

function Missing({ d }: { d: Delivery }) {
  if (d.photo && d.signature) return <Badge tone="positive">Complete</Badge>;
  return (
    <Row>
      {!d.photo ? <Badge tone="warning">Photo</Badge> : null}
      {!d.signature ? <Badge tone="warning">Signature</Badge> : null}
    </Row>
  );
}

const css = `
.x-thumb { position: relative; display: block; width: var(--s7); height: var(--s6); border-radius: var(--radius); overflow: hidden; background: var(--surface-sunken); border: 1px solid var(--border); }
.x-thumb__ground { position: absolute; left: 0; right: 0; bottom: 0; height: var(--s3); background: var(--line); }
.x-thumb__parcel { position: absolute; left: var(--s4); bottom: var(--s2); width: var(--s4); height: var(--s3); border-radius: var(--radius); background: var(--warning); }
.x-thumb--door::before { content: ''; position: absolute; right: var(--s2); top: var(--s1); width: var(--s3); bottom: var(--s3); background: var(--muted); border-radius: var(--radius) var(--radius) 0 0; }
.x-thumb--porch::before { content: ''; position: absolute; left: 0; right: 0; bottom: var(--s3); height: var(--s1); background: var(--muted); }
.x-thumb--locker::before { content: ''; position: absolute; left: var(--s2); right: var(--s2); top: var(--s1); bottom: var(--s1); border: 1px solid var(--muted); border-radius: var(--radius); }
.x-thumb--locker .x-thumb__ground { display: none; }
.x-thumb--reception::before { content: ''; position: absolute; left: 0; right: 0; top: var(--s4); height: var(--s2); background: var(--muted); }
.x-thumb--reception .x-thumb__parcel { bottom: var(--s5); left: var(--s3); }
.x-thumb--none { display: flex; align-items: center; justify-content: center; border-style: dashed; background: var(--surface); }
.x-thumb__none { font: var(--type-small); color: var(--text); text-align: center; }
.x-cell { display: block; white-space: nowrap; }
.x-link { white-space: nowrap; }
.x-link a { color: var(--text); font: var(--type-body-strong); text-decoration: underline; text-underline-offset: var(--s1); }
.x-cell__sub { display: block; font: var(--type-small); color: var(--muted); white-space: nowrap; }
`;
export { css };

export default function PodQueue() {
  return (
    <ListPage
      nav={<NavRail brand="Tolvane" items={[
        { label: 'Today', href: '#' },
        { label: 'Routes', href: '#', count: 38 },
        { label: 'Drivers', href: '#', count: 24 },
        { label: 'Proof to review', href: '#', count: counts.all, current: true },
        { label: 'Customers', href: '#' },
        { label: 'Settings', href: '#' },
      ]} />}
      title="Proof to review"
      actions={<Button variant="secondary">Export list</Button>}
      filters={<ToggleGroup label="Filter deliveries" items={[
        { label: 'All', count: counts.all, selected: true },
        { label: 'Disputed', count: counts.disputed },
        { label: 'Missing photo', count: counts.photo },
        { label: 'Missing signature', count: counts.signature },
      ]} />}
    >
      <Table columns={[
        { label: 'Parcel' },
        { label: 'Recipient' },
        { label: 'Driver' },
        { label: 'Marked delivered' },
        { label: 'Photo' },
        { label: 'Missing proof' },
        { label: 'Status' },
      ]}>
        {deliveries.map(d => (
          <Tr key={d.parcel}>
            <Td>
              <NewPart name="row-link" className="x-link" as="span"
                job="Opens one delivery for review from its row"
                why="The system has no link style for opening a row">
                <a href="#" aria-label={`Review delivery ${d.parcel}`}>{d.parcel}</a>
              </NewPart>
            </Td>
            <Td>
              <NewPart name="two-line-cell" className="x-cell" as="span"
                job="A name with a quiet second line under it in a table cell"
                why="Table has no cell with a secondary line">
                <span>{d.recipient}</span>
                <span className="x-cell__sub">{d.address}</span>
              </NewPart>
            </Td>
            <Td><Row><Avatar initials={d.initials} /><span>{d.driver}</span></Row></Td>
            <Td>
              <NewPart name="two-line-cell" className="x-cell" as="span"
                job="A name with a quiet second line under it in a table cell"
                why="Table has no cell with a secondary line">
                <span>{d.delivered}</span>
                <span className="x-cell__sub">{d.time}</span>
              </NewPart>
            </Td>
            <Td><ProofThumb d={d} /></Td>
            <Td><Missing d={d} /></Td>
            <Td>{d.disputed ? <Badge tone="critical">Disputed</Badge> : <Badge>Incomplete</Badge>}</Td>
          </Tr>
        ))}
      </Table>
    </ListPage>
  );
}
