import {
  AppShell,
  NavRail,
  PageHeader,
  Section,
  ToggleGroup,
  Table,
  Tr,
  Td,
  Avatar,
  Badge,
  Button,
  NewPart,
} from '../src';
import type { ReactNode } from 'react';

export const title = 'Proof to review · Tolvane';

export const css = `
.x-twoline { display: flex; flex-direction: column; }
.x-twoline__main { font: var(--type-body-strong); color: var(--ink); white-space: nowrap; }
.x-twoline__sub { font: var(--type-small); color: var(--muted); white-space: nowrap; }
.x-twoline__sub--address { white-space: normal; min-width: 120px; }
.x-person { display: inline-flex; align-items: center; gap: var(--s2); white-space: nowrap; }
.x-line { white-space: nowrap; }
.x-proof { display: flex; flex-direction: column; align-items: flex-start; gap: var(--s1); }
.x-filters { max-width: 100%; overflow-x: auto; white-space: nowrap; }
.x-photo { position: relative; display: block; width: var(--s7); height: var(--s7); border-radius: var(--radius); background: var(--surface-sunken); border: var(--border); overflow: hidden; }
.x-photo::before { content: ""; position: absolute; left: 0; right: 0; bottom: 0; height: var(--s3); background: var(--line); }
.x-photo::after { content: ""; position: absolute; width: var(--s5); height: var(--s4); bottom: var(--s3); left: var(--s3); background: var(--warning); opacity: .45; border-radius: var(--radius); }
.x-photo--step::after { left: var(--s4); width: var(--s4); height: var(--s4); }
.x-photo--porch::after { left: var(--s2); width: var(--s6); height: var(--s5); }
.x-photo--missing { border-style: dashed; background: var(--surface); display: flex; align-items: center; justify-content: center; font: var(--type-small); color: var(--muted); }
.x-photo--missing::before, .x-photo--missing::after { content: none; }
`;

type Missing = 'photo' | 'signature';
type Delivery = {
  parcel: string;
  address: string;
  recipient: string;
  driver: string;
  initials: string;
  day: string;
  time: string;
  photo: 'door' | 'step' | 'porch' | null;
  photoNote?: string;
  missing: Missing[];
  disputed: boolean;
};

const deliveries: Delivery[] = [
  { parcel: 'TLV-48213', address: '14 Harrow Lane, Leeds LS6 2QT', recipient: 'Priya Raman', driver: 'Tomás Ferreira', initials: 'TF', day: 'Today', time: '10:12', photo: 'door', photoNote: 'Parcel at front door', missing: ['signature'], disputed: true },
  { parcel: 'TLV-48197', address: 'Flat 3, 22 Albion St, Leeds LS1 6AG', recipient: 'Daniel Okafor', driver: 'Grace Whitfield', initials: 'GW', day: 'Today', time: '09:41', photo: null, missing: ['photo'], disputed: true },
  { parcel: 'TLV-48160', address: '7 Moor Road, Headingley LS6 4BH', recipient: 'Hannah Lewis', driver: 'Marek Nowak', initials: 'MN', day: 'Today', time: '08:55', photo: 'step', photoNote: 'Parcel on doorstep', missing: [], disputed: true },
  { parcel: 'TLV-48122', address: '31 Kirkstall Ave, Leeds LS5 3DP', recipient: 'Owen Price', driver: 'Tomás Ferreira', initials: 'TF', day: 'Yesterday', time: '18:30', photo: null, missing: ['photo', 'signature'], disputed: false },
  { parcel: 'TLV-48104', address: '2 Chapel Yard, Horsforth LS18 4HR', recipient: 'Sofia Bianchi', driver: 'Aisha Khan', initials: 'AK', day: 'Yesterday', time: '16:07', photo: 'porch', photoNote: 'Parcel in porch', missing: ['signature'], disputed: false },
  { parcel: 'TLV-48088', address: '58 Otley Road, Leeds LS16 5JT', recipient: 'Ciarán Doyle', driver: 'Grace Whitfield', initials: 'GW', day: 'Yesterday', time: '13:22', photo: 'door', photoNote: 'Parcel at front door', missing: [], disputed: true },
  { parcel: 'TLV-48051', address: '9 Beech Grove, Chapel Allerton LS7 3PQ', recipient: 'Mei Chen', driver: 'Marek Nowak', initials: 'MN', day: '6 Nov', time: '15:48', photo: 'step', photoNote: 'Parcel on doorstep', missing: ['signature'], disputed: false },
  { parcel: 'TLV-48019', address: 'Unit 4, Canal Wharf, Leeds LS11 5PS', recipient: 'Robert Hughes', driver: 'Aisha Khan', initials: 'AK', day: '6 Nov', time: '11:10', photo: null, missing: ['photo'], disputed: true },
  { parcel: 'TLV-47986', address: '103 Roundhay Road, Leeds LS8 5AN', recipient: 'Fatima Ali', driver: 'Tomás Ferreira', initials: 'TF', day: '5 Nov', time: '17:36', photo: 'porch', photoNote: 'Parcel in porch', missing: ['signature'], disputed: false },
];

const count = {
  all: deliveries.length,
  disputed: deliveries.filter(d => d.disputed).length,
  photo: deliveries.filter(d => d.missing.includes('photo')).length,
  signature: deliveries.filter(d => d.missing.includes('signature')).length,
};

function Photo({ d }: { d: Delivery }) {
  if (!d.photo) {
    return (
      <NewPart
        name="proof-photo"
        job="A small thumbnail of the delivery photo, or a marked gap when there is none"
        why="The system has no image or thumbnail component"
        className="x-photo x-photo--missing"
        as="span"
        role="img"
        aria-label="No photo taken"
      >
        None
      </NewPart>
    );
  }
  return (
    <NewPart
      name="proof-photo"
      job="A small thumbnail of the delivery photo, or a marked gap when there is none"
      why="The system has no image or thumbnail component"
      className={`x-photo x-photo--${d.photo}`}
      as="span"
      role="img"
      aria-label={`Proof photo: ${d.photoNote}`}
    />
  );
}

function TwoLine({ main, sub, address }: { main: string; sub: string; address?: boolean }) {
  return (
    <NewPart
      name="two-line-cell"
      job="A main value in a table cell with a quieter detail under it"
      why="Table cells have no secondary line"
      className="x-twoline"
      as="span"
    >
      <span className="x-twoline__main">{main}</span>
      <span className={address ? 'x-twoline__sub x-twoline__sub--address' : 'x-twoline__sub'}>{sub}</span>
    </NewPart>
  );
}

function Line({ children }: { children: ReactNode }) {
  return (
    <NewPart
      name="cell-line"
      job="Keeps a short value in a table cell on one line"
      why="Table cells wrap names, times and badges, and a badge has a fixed height"
      className="x-line"
      as="span"
    >
      {children}
    </NewPart>
  );
}

function MissingProof({ missing }: { missing: Missing[] }) {
  if (missing.length === 0) return <Line><Badge>Complete</Badge></Line>;
  return (
    <NewPart
      name="proof-list"
      job="Lists the missing proofs of one delivery, one under the other"
      why="Badges side by side make the column too wide; a row wraps them unevenly"
      className="x-proof"
      as="span"
    >
      {missing.map(m => (
        <Line key={m}><Badge tone="warning">{m === 'photo' ? 'Photo' : 'Signature'}</Badge></Line>
      ))}
    </NewPart>
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
            { label: 'Routes', href: '#', count: 38 },
            { label: 'Drivers', href: '#', count: 24 },
            { label: 'Deliveries', href: '#' },
            { label: 'Proof to review', href: '#', count: count.all, current: true },
            { label: 'Customers', href: '#' },
            { label: 'Settings', href: '#' },
          ]}
        />
      }
    >
      <PageHeader title="Proof to review" actions={<Button variant="secondary">Export list</Button>} />
      <Section>
        <NewPart
          name="filter-scroll"
          job="Lets the filter scroll inside its own box on a phone"
          why="The toggle group does not wrap, and four filters with counts are wider than a 375px screen"
          className="x-filters"
        >
          <ToggleGroup
            label="Filter deliveries"
            items={[
              { label: 'All', count: count.all, selected: true },
              { label: 'Disputed', count: count.disputed },
              { label: 'Missing photo', count: count.photo },
              { label: 'Missing signature', count: count.signature },
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
            { label: 'Missing proof' },
            { label: 'Dispute' },
            { label: 'Review' },
          ]}
        >
          {deliveries.map(d => (
            <Tr key={d.parcel}>
              <Td>
                <TwoLine main={d.parcel} sub={d.address} address />
              </Td>
              <Td><Line>{d.recipient}</Line></Td>
              <Td>
                <NewPart
                  name="person-cell"
                  job="A driver's initials and name on one line in a table cell"
                  why="A row wraps the name under the avatar in a narrow cell"
                  base="row"
                  className="x-person"
                  as="span"
                >
                  <Avatar initials={d.initials} />
                  {d.driver}
                </NewPart>
              </Td>
              <Td>
                <TwoLine main={d.day} sub={d.time} />
              </Td>
              <Td><Photo d={d} /></Td>
              <Td><MissingProof missing={d.missing} /></Td>
              <Td>{d.disputed ? <Line><Badge tone="critical">Not received</Badge></Line> : 'None'}</Td>
              <Td>
                <Button variant="secondary" aria-label={`Review delivery ${d.parcel}`}>Review</Button>
              </Td>
            </Tr>
          ))}
        </Table>
      </Section>
    </AppShell>
  );
}
