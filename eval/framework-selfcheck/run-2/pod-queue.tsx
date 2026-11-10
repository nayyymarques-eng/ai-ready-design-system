import { ListPage, NavRail, ToggleGroup, Table, Tr, Td, Badge, Avatar, Row, NewPart } from '../src';

export const title = 'Proof to review — Tolvane';

export const css = `
.x-pod-thumb {
  display: flex;
  align-items: flex-end;
  justify-content: center;
  width: var(--s7);
  height: var(--s7);
  border-radius: var(--radius);
  border: var(--border);
  background: var(--surface-sunken);
  overflow: hidden;
}
.x-pod-thumb__parcel {
  width: var(--s5);
  height: var(--s4);
  margin-bottom: var(--s2);
  border-radius: var(--radius);
  background: var(--muted);
}
.x-pod-thumb--none {
  align-items: center;
  border-style: dashed;
  background: var(--surface);
}
.x-pod-thumb__label {
  font: var(--type-small);
  color: var(--muted);
}
.x-pod-cell {
  display: flex;
  flex-direction: column;
  white-space: nowrap;
}
.x-pod-person {
  display: flex;
  align-items: center;
  gap: var(--s2);
  white-space: nowrap;
}
.x-pod-cell__sub {
  font: var(--type-small);
  color: var(--muted);
}
`;

type Issue = 'disputed' | 'photo' | 'signature';

type Delivery = {
  parcel: string;
  route: string;
  recipient: string;
  address: string;
  driver: string;
  initials: string;
  delivered: string;
  deliveredDay: string;
  issues: Issue[];
};

const deliveries: Delivery[] = [
  { parcel: 'TLV-48210-K', route: 'Route 14 · North', recipient: 'Helena Vasconcelos', address: '27 Rua das Flores, apt 3B', driver: 'Ana Moreira', initials: 'AM', delivered: '09:42', deliveredDay: 'Today', issues: ['disputed'] },
  { parcel: 'TLV-48197-C', route: 'Route 09 · Riverside', recipient: 'Tomás Guerreiro', address: '4 Travessa do Moinho', driver: 'Rui Batista', initials: 'RB', delivered: '08:15', deliveredDay: 'Today', issues: ['disputed', 'signature'] },
  { parcel: 'TLV-48163-A', route: 'Route 14 · North', recipient: 'Greenleaf Pharmacy', address: '112 Avenida Central', driver: 'Ana Moreira', initials: 'AM', delivered: '17:58', deliveredDay: 'Yesterday', issues: ['photo'] },
  { parcel: 'TLV-48140-F', route: 'Route 03 · Old town', recipient: 'Marta Sequeira', address: '9 Largo do Carmo, 2nd floor', driver: 'Joana Pires', initials: 'JP', delivered: '16:31', deliveredDay: 'Yesterday', issues: ['disputed', 'photo'] },
  { parcel: 'TLV-48122-B', route: 'Route 21 · Harbour', recipient: 'Duarte Fonseca', address: '58 Rua do Porto', driver: 'Miguel Lopes', initials: 'ML', delivered: '14:07', deliveredDay: 'Yesterday', issues: ['signature'] },
  { parcel: 'TLV-48095-D', route: 'Route 09 · Riverside', recipient: 'Inês Carvalho', address: '15 Rua da Ponte', driver: 'Rui Batista', initials: 'RB', delivered: '11:20', deliveredDay: 'Mon 9 Nov', issues: ['disputed'] },
  { parcel: 'TLV-48071-H', route: 'Route 03 · Old town', recipient: 'Studio Norte', address: '3 Calçada do Sol, unit 4', driver: 'Joana Pires', initials: 'JP', delivered: '10:02', deliveredDay: 'Mon 9 Nov', issues: ['photo', 'signature'] },
  { parcel: 'TLV-48044-E', route: 'Route 21 · Harbour', recipient: 'Paulo Antunes', address: '71 Rua do Farol', driver: 'Miguel Lopes', initials: 'ML', delivered: '18:44', deliveredDay: 'Sun 8 Nov', issues: ['disputed'] },
  { parcel: 'TLV-48018-G', route: 'Route 14 · North', recipient: 'Clara Mendes', address: '6 Rua do Pinhal', driver: 'Ana Moreira', initials: 'AM', delivered: '13:26', deliveredDay: 'Sun 8 Nov', issues: ['signature'] },
];

const count = (issue: Issue) => deliveries.filter(d => d.issues.includes(issue)).length;

function Thumb({ hasPhoto, parcel }: { hasPhoto: boolean; parcel: string }) {
  if (!hasPhoto) {
    return (
      <NewPart name="pod-thumb" className="x-pod-thumb x-pod-thumb--none" role="img" aria-label={`No photo for ${parcel}`}
        job="A small preview of the proof-of-delivery photo in a table row"
        why="The system has no image or thumbnail component">
        <span className="x-pod-thumb__label">None</span>
      </NewPart>
    );
  }
  return (
    <NewPart name="pod-thumb" className="x-pod-thumb" role="img" aria-label={`Proof photo for ${parcel}: parcel left at the door`}
      job="A small preview of the proof-of-delivery photo in a table row"
      why="The system has no image or thumbnail component">
      <span className="x-pod-thumb__parcel" />
    </NewPart>
  );
}

function Stacked({ main, sub, link }: { main: string; sub: string; link?: boolean }) {
  return (
    <NewPart name="pod-cell" className="x-pod-cell"
      job="A table cell with a main value and a quieter second line"
      why="The table has no two-line cell">
      {link ? <a href="#">{main}</a> : <span>{main}</span>}
      <span className="x-pod-cell__sub">{sub}</span>
    </NewPart>
  );
}

function Issues({ issues }: { issues: Issue[] }) {
  return (
    <Row>
      {issues.includes('disputed') ? <Badge tone="critical">Disputed</Badge> : null}
      {issues.includes('photo') ? <Badge tone="warning">Missing photo</Badge> : null}
      {issues.includes('signature') ? <Badge tone="warning">Missing signature</Badge> : null}
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
        { label: 'Proof', href: '#', count: deliveries.length, current: true },
        { label: 'Customers', href: '#' },
      ]} />}
      title="Proof to review"
      filters={<ToggleGroup label="Filter deliveries" items={[
        { label: 'All', count: deliveries.length, selected: true },
        { label: 'Disputed', count: count('disputed') },
        { label: 'Missing photo', count: count('photo') },
        { label: 'Missing signature', count: count('signature') },
      ]} />}>
      <Table columns={[
        { label: 'Photo' },
        { label: 'Parcel' },
        { label: 'Recipient' },
        { label: 'Driver' },
        { label: 'Marked delivered' },
        { label: 'Needs review' },
      ]}>
        {deliveries.map(d => (
          <Tr key={d.parcel}>
            <Td><Thumb hasPhoto={!d.issues.includes('photo')} parcel={d.parcel} /></Td>
            <Td><Stacked main={d.parcel} sub={d.route} link /></Td>
            <Td><Stacked main={d.recipient} sub={d.address} /></Td>
            <Td>
              <NewPart name="pod-person" className="x-pod-person"
                job="A driver's initials and name on one line in a table cell"
                why="The row helper wraps on a phone and squeezes the name; the table should scroll instead">
                <Avatar initials={d.initials} /><span>{d.driver}</span>
              </NewPart>
            </Td>
            <Td><Stacked main={d.delivered} sub={d.deliveredDay} /></Td>
            <Td><Issues issues={d.issues} /></Td>
          </Tr>
        ))}
      </Table>
    </ListPage>
  );
}
