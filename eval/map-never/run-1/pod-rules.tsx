/*
 * Template (TPL-02): no template fits this screen, so it is built from the app shell,
 * the page header and sections.
 * Closest: form page. The screen saves one sender's rules together, like a form page,
 * but it also lists every sender in a table to pick the one to edit. A form page holds
 * only cards of fields, and a list page holds only one table, so neither holds both.
 */
import {
  AppShell, NavRail, PageHeader, Banner, Section, Stack, Row, ToggleGroup,
  Table, Tr, Td, Badge, Button, Card, Checkbox, Field, NewPart,
} from '../src';

export const title = 'Proof rules · Tolvane';

export const css = `
.x-upload { display: flex; flex-wrap: wrap; align-items: flex-start; gap: var(--s4); }
.x-upload__preview { flex: none; width: 240px; max-width: 100%; aspect-ratio: 4 / 3; border: var(--border); border-radius: var(--radius); overflow: hidden; background: var(--surface-sunken); }
.x-upload__preview svg { display: block; width: 100%; height: 100%; }
.x-upload__meta { flex: 1; min-width: 200px; display: flex; flex-direction: column; gap: var(--s3); }
.x-upload__file { display: flex; flex-direction: column; }
.x-upload__name { font: var(--type-body-strong); color: var(--ink); overflow-wrap: anywhere; }
.x-upload__detail { font: var(--type-small); color: var(--muted); }
.x-upload__drop { display: block; padding: var(--s4); border: 1px dashed var(--muted); border-radius: var(--radius); background: var(--surface-sunken); color: var(--text); cursor: pointer; }
.x-upload__drop strong { color: var(--ink); text-decoration: underline; }
.x-upload__input { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }
.x-upload__tips { flex-basis: 100%; margin: 0; padding: 0 0 0 var(--s5); display: flex; flex-direction: column; gap: var(--s1); }
.x-photo__wall { fill: var(--surface-sunken); }
.x-photo__ground { fill: var(--line); }
.x-photo__frame { fill: var(--surface); stroke: var(--line); stroke-width: 2; }
.x-photo__door { fill: var(--muted); }
.x-photo__detail { fill: var(--text); }
.x-photo__plate { fill: var(--surface); stroke: var(--ink); stroke-width: 2; }
.x-photo__digit { fill: var(--ink); }
.x-photo__box { fill: var(--tint-warning); stroke: var(--warning); stroke-width: 2; }
.x-photo__tape { fill: var(--warning); }
.x-photo__label { fill: var(--surface); }
`;

type Sender = {
  name: string;
  proof: string;
  idCheck: string;
  disputes: number;
  since: string;
  status: { tone?: 'positive' | 'warning' | 'info'; text: string };
  editing?: boolean;
};

const senders: Sender[] = [
  { name: 'Copper & Vine Wines', proof: 'Photo', idCheck: 'No', disputes: 4, since: '3 Mar 2026', status: { tone: 'warning', text: 'Needs ID check' }, editing: true },
  { name: 'Halden Pharmacy', proof: 'Photo, signature', idCheck: 'Yes, 18+', disputes: 2, since: '12 Jan 2026', status: { tone: 'positive', text: 'Active' } },
  { name: 'Northgate Electronics', proof: 'Photo, signature', idCheck: 'No', disputes: 6, since: '1 Dec 2026', status: { tone: 'info', text: 'Change scheduled' } },
  { name: 'Bramble Home & Garden', proof: 'Photo', idCheck: 'No', disputes: 1, since: '20 Aug 2025', status: { tone: 'positive', text: 'Active' } },
  { name: 'Pellbray Vape Supply', proof: 'Photo', idCheck: 'No', disputes: 0, since: '5 May 2026', status: { tone: 'warning', text: 'Needs ID check' } },
  { name: 'Little Fern Books', proof: 'Photo', idCheck: 'No', disputes: 0, since: 'Default rules', status: { text: 'Default' } },
];

function ExamplePhoto() {
  return (
    <svg viewBox="0 0 240 180" role="img" aria-label="Example: a taped parcel on the doorstep, with the door and house number 14 in the same frame">
      <rect className="x-photo__wall" x="0" y="0" width="240" height="180" />
      <rect className="x-photo__ground" x="0" y="140" width="240" height="40" />
      <rect className="x-photo__frame" x="64" y="12" width="92" height="132" />
      <rect className="x-photo__door" x="72" y="20" width="76" height="122" />
      <rect className="x-photo__detail" x="134" y="78" width="6" height="14" rx="2" />
      <rect className="x-photo__detail" x="96" y="44" width="28" height="4" rx="2" />
      <rect className="x-photo__plate" x="172" y="36" width="36" height="26" rx="3" />
      <rect className="x-photo__digit" x="182" y="42" width="4" height="14" />
      <rect className="x-photo__digit" x="190" y="42" width="3" height="10" />
      <rect className="x-photo__digit" x="198" y="42" width="3" height="14" />
      <rect className="x-photo__digit" x="190" y="49" width="14" height="3" />
      <rect className="x-photo__box" x="150" y="112" width="58" height="40" rx="2" />
      <rect className="x-photo__tape" x="176" y="112" width="6" height="40" />
      <rect className="x-photo__label" x="156" y="120" width="16" height="10" />
    </svg>
  );
}

export default function PodRules() {
  return (
    <AppShell
      nav={<NavRail brand="Tolvane" items={[
        { label: 'Today', href: '#' },
        { label: 'Deliveries', href: '#', count: 1284 },
        { label: 'Drivers', href: '#', count: 42 },
        { label: 'Disputes', href: '#', count: 13 },
        { label: 'Proof rules', href: '#', current: true },
        { label: 'Settings', href: '#' },
      ]} />}
    >
      <PageHeader
        title="Proof rules"
        actions={<>
          <Button variant="secondary">Add sender</Button>
          <Button variant="primary">Save rules</Button>
        </>}
      />

      <Banner tone="warning">
        <p>2 senders ship age-restricted items without an ID check: Copper &amp; Vine Wines and Pellbray Vape Supply.</p>
      </Banner>

      <Section title="Senders" titleId="senders">
        <ToggleGroup label="Filter senders" items={[
          { label: 'All', count: 6, selected: true },
          { label: 'Needs ID check', count: 2 },
          { label: 'Change scheduled', count: 1 },
        ]} />
        <Table columns={[
          { label: 'Sender' },
          { label: 'Proof required' },
          { label: 'ID check' },
          { label: 'Open disputes', numeric: true },
          { label: 'Rules since' },
          { label: 'Status' },
          { label: 'Action' },
        ]}>
          {senders.map(s => (
            <Tr key={s.name}>
              <Td>{s.editing ? <Row><strong>{s.name}</strong><Badge tone="info">Editing</Badge></Row> : s.name}</Td>
              <Td>{s.proof}</Td>
              <Td>{s.idCheck}</Td>
              <Td numeric>{s.disputes}</Td>
              <Td>{s.since}</Td>
              <Td><Badge tone={s.status.tone}>{s.status.text}</Badge></Td>
              <Td><Button variant="tertiary" aria-label={`Edit rules for ${s.name}`}>Edit</Button></Td>
            </Tr>
          ))}
        </Table>
      </Section>

      <Section title="What drivers collect for Copper & Vine Wines" titleId="collect">
        <Card>
          <p>Drivers can't mark a delivery as done until they collect every proof ticked here.</p>
          <Stack>
            <Checkbox label="Photo of the parcel where it was left" defaultChecked />
            <Checkbox label="Signature from the person who takes the parcel" defaultChecked />
            <Checkbox label="ID check for age-restricted items" defaultChecked />
          </Stack>
          <Field id="min-age" label="Minimum age" options={['18', '21', '25']} defaultValue="18"
            hint="The driver checks a photo ID and records only the year of birth." />
          <Field id="nobody-home" label="If no one over the minimum age is home" options={['Return to depot', 'Try again next working day']} defaultValue="Return to depot"
            hint="Age-restricted parcels are never left with a neighbour or in a safe place." />
        </Card>
      </Section>

      <Section title="When the new rules start" titleId="start">
        <Card>
          <Field id="start-date" label="Rules start on" type="date" defaultValue="2026-11-18"
            hint="Deliveries scheduled from this date use the new rules. Until then, drivers collect a photo only." />
          <Checkbox label="Tell drivers in the app the day before" defaultChecked />
        </Card>
      </Section>

      <Section title="Example proof photo" titleId="example">
        <Card>
          <p>Drivers see this photo in the app when they deliver for Copper &amp; Vine Wines, as a guide to a good proof photo.</p>
          <NewPart
            name="file-upload"
            className="x-upload"
            job="Upload one example photo and show the current one, with its name, size and actions"
            why="File upload is listed as not built in rules.md section 13, and no contract shows a file or an image"
          >
            <div className="x-upload__preview"><ExamplePhoto /></div>
            <div className="x-upload__meta">
              <div className="x-upload__file">
                <span className="x-upload__name">copper-vine-doorstep-example.jpg</span>
                <span className="x-upload__detail">JPG, 1.8 MB, uploaded 4 Nov 2026 by Marta Lindqvist</span>
              </div>
              <Row>
                <Button variant="secondary">Replace photo</Button>
                <Button variant="tertiary">Remove</Button>
              </Row>
              <label className="x-upload__drop" htmlFor="example-photo">
                Drop a new photo here or <strong>choose a file</strong>. JPG or PNG, up to 5 MB.
              </label>
              <input className="x-upload__input" id="example-photo" type="file" accept="image/jpeg,image/png" />
            </div>
            <ul className="x-upload__tips">
              <li>The parcel and the door or house number in the same frame</li>
              <li>Taken from about two metres away, in focus</li>
              <li>No faces and nothing inside the home</li>
            </ul>
          </NewPart>
        </Card>
      </Section>
    </AppShell>
  );
}
