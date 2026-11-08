import type { ReactNode } from 'react';
import { AppShell, NavRail, PageHeader, ToggleGroup, Table, Tr, Td, Badge, Avatar, Button, NewPart } from '../src';

export const title = 'Proof to review';

export const css = `
.x-filter-scroll { display: grid; grid-template-columns: max-content; max-width: 100%; overflow-x: auto; }
.x-cell { display: flex; flex-direction: column; align-items: flex-start; gap: var(--s1); white-space: nowrap; }
.x-cell--wrap { white-space: normal; min-width: 176px; }
.x-badges { display: flex; flex-wrap: wrap; gap: var(--s1); white-space: nowrap; }
.x-person { display: flex; align-items: center; gap: var(--s2); white-space: nowrap; }
.x-cell__main { font: var(--type-body-strong); color: var(--ink); }
.x-cell__meta { font: var(--type-small); color: var(--muted); }
.x-thumb { display: inline-flex; align-items: flex-end; justify-content: center; width: 48px; height: 36px; border: var(--border); border-radius: var(--radius); background: var(--surface-sunken); overflow: hidden; vertical-align: middle; }
.x-thumb__door { width: 20px; height: 28px; border: var(--border); border-bottom: 0; border-radius: var(--radius) var(--radius) 0 0; background: var(--surface); display: flex; align-items: flex-end; justify-content: center; }
.x-thumb__parcel { width: 12px; height: 10px; margin-bottom: var(--s1); border-radius: var(--radius); background: var(--muted); }
.x-thumb--missing { align-items: center; border-style: dashed; background: var(--surface); }
.x-thumb__none { font: var(--type-small); color: var(--muted); }
`;

type Missing = 'photo' | 'signature' | 'both' | 'none';
type Delivery = {
  parcel: string; items: string;
  recipient: string; address: string;
  driver: string; initials: string; route: string;
  when: string; ago: string;
  missing: Missing; disputed: boolean; reason: string;
};

const deliveries: Delivery[] = [
  { parcel: 'TLV-482193', items: '2.4 kg', recipient: 'Marta Esteves', address: 'Lisboa', driver: 'Ana Moreira', initials: 'AM', route: 'Route L-07', when: 'Today', ago: '09:42', missing: 'none', disputed: true, reason: 'Customer says it never arrived' },
  { parcel: 'TLV-482077', items: '6.1 kg', recipient: 'Rui Patrício Lda.', address: 'Porto', driver: 'Tiago Fonseca', initials: 'TF', route: 'Route P-02', when: 'Today', ago: '08:15', missing: 'signature', disputed: true, reason: 'Left with neighbour, not confirmed' },
  { parcel: 'TLV-481960', items: '0.8 kg', recipient: 'Inês Carvalho', address: 'Lisboa', driver: 'Ana Moreira', initials: 'AM', route: 'Route L-07', when: 'Yesterday', ago: '18:27', missing: 'photo', disputed: false, reason: 'Camera failed at handover' },
  { parcel: 'TLV-481902', items: '12.0 kg', recipient: 'Farmácia Lumiar', address: 'Lisboa', driver: 'Bruno Sequeira', initials: 'BS', route: 'Route L-11', when: 'Yesterday', ago: '16:03', missing: 'both', disputed: true, reason: 'Customer says it never arrived' },
  { parcel: 'TLV-481855', items: '1.2 kg', recipient: 'João Nogueira', address: 'Porto', driver: 'Tiago Fonseca', initials: 'TF', route: 'Route P-02', when: 'Yesterday', ago: '14:40', missing: 'signature', disputed: false, reason: 'Recipient refused to sign' },
  { parcel: 'TLV-481790', items: '9.7 kg', recipient: 'Padaria Graça', address: 'Lisboa', driver: 'Carla Mendes', initials: 'CM', route: 'Route L-03', when: 'Yesterday', ago: '11:58', missing: 'none', disputed: true, reason: 'One of three parcels missing' },
  { parcel: 'TLV-481744', items: '0.4 kg', recipient: 'Sofia Ramalho', address: 'Porto', driver: 'Hugo Pires', initials: 'HP', route: 'Route P-05', when: '6 Nov', ago: '19:12', missing: 'photo', disputed: true, reason: 'Customer says it never arrived' },
  { parcel: 'TLV-481688', items: '3.3 kg', recipient: 'Pedro Almeida', address: 'Lisboa', driver: 'Carla Mendes', initials: 'CM', route: 'Route L-03', when: '6 Nov', ago: '15:31', missing: 'photo', disputed: false, reason: 'Photo upload did not finish' },
  { parcel: 'TLV-481630', items: '5.0 kg', recipient: 'Clínica Dentária Sé', address: 'Lisboa', driver: 'Bruno Sequeira', initials: 'BS', route: 'Route L-11', when: '6 Nov', ago: '10:06', missing: 'signature', disputed: false, reason: 'Signed by unnamed staff member' },
  { parcel: 'TLV-481571', items: '1.9 kg', recipient: 'Beatriz Lopes', address: 'Porto', driver: 'Hugo Pires', initials: 'HP', route: 'Route P-05', when: '5 Nov', ago: '17:49', missing: 'none', disputed: true, reason: 'Photo shows a different door' },
  { parcel: 'TLV-481509', items: '4.2 kg', recipient: 'Miguel Torres', address: 'Lisboa', driver: 'Ana Moreira', initials: 'AM', route: 'Route L-07', when: '5 Nov', ago: '13:20', missing: 'photo', disputed: false, reason: 'Driver skipped photo step' },
  { parcel: 'TLV-481466', items: '0.6 kg', recipient: 'Leonor Brito', address: 'Porto', driver: 'Tiago Fonseca', initials: 'TF', route: 'Route P-02', when: '4 Nov', ago: '18:55', missing: 'none', disputed: true, reason: 'Customer says it never arrived' },
  { parcel: 'TLV-481402', items: '7.8 kg', recipient: 'Oficina Auto Benfica', address: 'Lisboa', driver: 'Carla Mendes', initials: 'CM', route: 'Route L-03', when: '4 Nov', ago: '09:37', missing: 'signature', disputed: false, reason: 'Signature pad left blank' },
  { parcel: 'TLV-481344', items: '2.0 kg', recipient: 'Daniela Couto', address: 'Porto', driver: 'Hugo Pires', initials: 'HP', route: 'Route P-05', when: '3 Nov', ago: '16:22', missing: 'none', disputed: true, reason: 'Parcel arrived damaged, says not delivered' },
];

const count = (f: (d: Delivery) => boolean) => deliveries.filter(f).length;
const filters = [
  { label: 'All', count: deliveries.length, selected: true },
  { label: 'Disputed', count: count(d => d.disputed) },
  { label: 'Missing photo', count: count(d => d.missing === 'photo' || d.missing === 'both') },
  { label: 'Missing signature', count: count(d => d.missing === 'signature' || d.missing === 'both') },
];

function Cell({ main, meta }: { main: ReactNode; meta?: string }) {
  return (
    <NewPart name="cell-two-lines" className="x-cell" as="span" job="A table cell with a main value and a quieter detail line under it" why="The table contract has no secondary text style inside a cell">
      {typeof main === 'string' ? <span className="x-cell__main">{main}</span> : main}
      {meta ? <span className="x-cell__meta">{meta}</span> : null}
    </NewPart>
  );
}

function Thumb({ d }: { d: Delivery }) {
  const noPhoto = d.missing === 'photo' || d.missing === 'both';
  if (noPhoto) {
    return (
      <NewPart name="proof-thumbnail" className="x-thumb x-thumb--missing" as="span" role="img" aria-label="No proof photo" job="A small preview of the proof-of-delivery photo, or its empty slot" why="The system has no image or thumbnail component">
        <span className="x-thumb__none">None</span>
      </NewPart>
    );
  }
  return (
    <NewPart name="proof-thumbnail" className="x-thumb" as="span" role="img" aria-label={`Proof photo of ${d.parcel} at the door`} job="A small preview of the proof-of-delivery photo, or its empty slot" why="The system has no image or thumbnail component">
      <span className="x-thumb__door"><span className="x-thumb__parcel" /></span>
    </NewPart>
  );
}

function Problem({ d }: { d: Delivery }) {
  const noPhoto = d.missing === 'photo' || d.missing === 'both';
  const noSignature = d.missing === 'signature' || d.missing === 'both';
  return (
    <NewPart name="problem-cell" className="x-cell x-cell--wrap" as="span" job="What needs review on one delivery: dispute and missing proof as badges, with the note under them" why="The table contract has no cell that groups several badges with a note">
      <NewPart name="badge-group" className="x-badges" as="span" job="Badges side by side on one line in a table cell" why="A row wraps and adds no line of its own inside a cell">
        {d.disputed ? <Badge tone="critical">Disputed</Badge> : null}
        {noPhoto ? <Badge tone="warning">No photo</Badge> : null}
        {noSignature ? <Badge tone="warning">No signature</Badge> : null}
      </NewPart>
      <span className="x-cell__meta">{d.reason}</span>
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
            { label: 'Deliveries', href: '#', count: 1284 },
            { label: 'Routes', href: '#', count: 38 },
            { label: 'Drivers', href: '#', count: 42 },
            { label: 'Proof to review', href: '#', count: deliveries.length, current: true },
            { label: 'Customers', href: '#' },
          ]}
        />
      }
    >
      <PageHeader title="Proof to review" actions={<Button variant="secondary">Export list</Button>} />

      <NewPart name="filter-scroll" className="x-filter-scroll" job="Keeps the filter row inside the page width on phones" why="The toggle group does not wrap, and four filters with counts are wider than a 375px phone">
        <ToggleGroup label="Filter deliveries to review" items={filters} />
      </NewPart>

      <Table
        columns={[
          { label: 'Parcel' },
          { label: 'Recipient' },
          { label: 'Driver' },
          { label: 'Marked delivered' },
          { label: 'Photo' },
          { label: 'Dispute and missing proof' },
          { label: 'Review' },
        ]}
      >
        {deliveries.map(d => (
          <Tr key={d.parcel}>
            <Td><Cell main={d.parcel} meta={d.items} /></Td>
            <Td><Cell main={d.recipient} meta={d.address} /></Td>
            <Td>
              <NewPart name="person-cell" className="x-person" as="span" job="A driver's avatar beside their name and route in a table cell" why="A row wraps inside a narrow table cell, which pushed the name under the avatar">
                <Avatar initials={d.initials} />
                <Cell main={d.driver} meta={d.route} />
              </NewPart>
            </Td>
            <Td><Cell main={d.when} meta={d.ago} /></Td>
            <Td><Thumb d={d} /></Td>
            <Td><Problem d={d} /></Td>
            <Td><Button variant="secondary" aria-label={`Review ${d.parcel}`}>Review</Button></Td>
          </Tr>
        ))}
      </Table>
    </AppShell>
  );
}
