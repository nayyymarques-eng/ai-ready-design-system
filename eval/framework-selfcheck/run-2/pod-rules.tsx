/*
 * Proof rules (pod-rules). TPL-02: no template fits this screen on its own.
 * Closest: the list page (the senders table). It doesn't fit because the same screen
 * also edits one sender's rules and saves them, which is the form page's job; a list
 * page holds one table and nothing else, and a form page holds no table. So the screen
 * is built from the app shell, the page header and sections: the list first, then the
 * edit form for the sender being edited, saved from one button at its end.
 */
import {
  AppShell, NavRail, PageHeader, Banner, Section, Grid, Row, Card, Table, Tr, Td,
  Badge, Button, ToggleGroup, Field, Checkbox, List, ListItem, NewPart,
} from '../src';

export const title = 'Proof rules';

export const css = `
.x-upload { display: grid; grid-template-columns: minmax(0, 280px) minmax(0, 1fr); gap: var(--s5); align-items: start; }
.x-upload__details { display: flex; flex-direction: column; gap: var(--s4); min-width: 0; }
.x-upload__file { display: flex; flex-direction: column; gap: var(--s1); }
.x-upload__name { font: var(--type-body-strong); color: var(--ink); overflow-wrap: anywhere; }
.x-upload__meta { font: var(--type-small); color: var(--muted); }
.x-photo { position: relative; aspect-ratio: 4 / 3; border-radius: var(--radius); border: var(--border); background: var(--surface-sunken); overflow: hidden; }
.x-photo__wall { position: absolute; inset: 0 0 22% 0; background: var(--tint-warning); }
.x-photo__step { position: absolute; left: 0; right: 0; bottom: 0; height: 22%; background: var(--line); }
.x-photo__door { position: absolute; left: 22%; width: 40%; top: 10%; bottom: 22%; background: var(--surface); border: var(--border); border-radius: var(--radius) var(--radius) 0 0; }
.x-photo__number { position: absolute; top: 14%; left: 50%; transform: translateX(-50%); font: var(--type-heading); color: var(--ink); }
.x-photo__parcel { position: absolute; left: 30%; width: 26%; height: 24%; bottom: 14%; background: var(--warning); border-radius: var(--radius); }
.x-photo__tape { position: absolute; left: 50%; top: 0; bottom: 0; width: 14%; transform: translateX(-50%); background: var(--tint-warning); }
.x-photo__label { position: absolute; right: 8%; bottom: 12%; width: 28%; height: 24%; background: var(--surface); border-radius: var(--radius); }
.x-photo__caption { position: absolute; left: var(--s2); bottom: var(--s2); padding: 0 var(--s2); border-radius: var(--radius-pill); background: var(--surface); font: var(--type-small); color: var(--ink); }
@media (max-width: 720px) {
  .x-upload { grid-template-columns: minmax(0, 1fr); }
}
`;

const nav = (
  <NavRail brand="Tolvane" items={[
    { label: 'Today', href: '#' },
    { label: 'Routes', href: '#', count: 42 },
    { label: 'Drivers', href: '#', count: 64 },
    { label: 'Deliveries', href: '#' },
    { label: 'Disputes', href: '#', count: 7 },
    { label: 'Proof rules', href: '#', current: true },
    { label: 'Settings', href: '#' },
  ]} />
);

type Sender = {
  name: string; photo: string; signature: string; id: string; since: string; weekly: string;
  status: { tone?: 'positive' | 'warning' | 'info'; text: string };
};

const senders: Sender[] = [
  { name: 'Larder & Vine', photo: 'Required', signature: 'Not required', id: 'Not required', since: '3 Mar 2026', weekly: '1,240', status: { tone: 'info', text: 'Editing' } },
  { name: 'Brightwell Wines', photo: 'Required', signature: 'Required', id: 'Challenge 25', since: '12 Jan 2026', weekly: '860', status: { tone: 'positive', text: 'Active' } },
  { name: 'Corbel Home', photo: 'Required', signature: 'Not required', id: 'Not required', since: '1 Sep 2025', weekly: '3,410', status: { tone: 'positive', text: 'Active' } },
  { name: 'Fenwick Electronics', photo: 'Required', signature: 'Over £250', id: 'Not required', since: '1 Dec 2026', weekly: '2,075', status: { tone: 'warning', text: 'Starts 1 Dec' } },
  { name: 'Marlow Tools', photo: 'Required', signature: 'Required', id: 'Every item', since: '20 Jun 2026', weekly: '415', status: { tone: 'positive', text: 'Active' } },
  { name: 'Pellow & Finch', photo: 'Required', signature: 'Not required', id: 'Not required', since: '14 Feb 2026', weekly: '5,920', status: { tone: 'positive', text: 'Active' } },
  { name: 'Quayside Vapes', photo: 'Required', signature: 'Required', id: 'Challenge 25', since: '2 Oct 2026', weekly: '290', status: { tone: 'positive', text: 'Active' } },
  { name: 'Tansy Books', photo: 'Not required', signature: 'Not required', id: 'Not required', since: '5 May 2025', weekly: '1,105', status: { tone: 'positive', text: 'Active' } },
];

export default function PodRules() {
  return (
    <AppShell nav={nav}>
      <PageHeader title="Proof rules" actions={<Button variant="secondary">Add sender</Button>} />

      <Banner>
        <p>Drivers get a sender's new rules in the driver app overnight before the start date. Deliveries before that date keep the rules in force now.</p>
      </Banner>

      <Section title="Senders" titleId="senders">
        <ToggleGroup label="Filter senders" items={[
          { label: 'All', count: 8, selected: true },
          { label: 'Age-restricted', count: 3 },
          { label: 'Scheduled', count: 1 },
        ]} />
        <Table columns={[
          { label: 'Sender' },
          { label: 'Photo' },
          { label: 'Signature' },
          { label: 'ID check' },
          { label: 'Rules from' },
          { label: 'Parcels a week', numeric: true },
          { label: 'Status' },
          { label: 'Action' },
        ]}>
          {senders.map(s => (
            <Tr key={s.name}>
              <Td><strong>{s.name}</strong></Td>
              <Td>{s.photo}</Td>
              <Td>{s.signature}</Td>
              <Td>{s.id}</Td>
              <Td>{s.since}</Td>
              <Td numeric>{s.weekly}</Td>
              <Td><Badge tone={s.status.tone}>{s.status.text}</Badge></Td>
              <Td><Button variant="tertiary" aria-label={`Edit rules for ${s.name}`}>Edit</Button></Td>
            </Tr>
          ))}
        </Table>
      </Section>

      <Grid>
        <Section title="Proof Larder & Vine requires" titleId="proof">
          <Card>
            <Checkbox label="Photo of the parcel at the door" defaultChecked />
            <Checkbox label="Signature on the driver's phone" defaultChecked />
            <Field id="sign-for" label="Signature needed for" options={['All parcels', 'Age-restricted items only', 'Parcels over £100']}
              defaultValue="All parcels" hint="The recipient, or an adult at the address, signs." />
            <Checkbox label="ID check for age-restricted items" defaultChecked />
            <Field id="id-rule" label="When to check ID" options={['Challenge 25: if the person looks under 25', 'Every age-restricted item']}
              defaultValue="Challenge 25: if the person looks under 25"
              hint="Larder & Vine marks wine, beer and spirits as age-restricted: 312 items last week." />
            <Field id="id-fail" label="If the ID check fails" options={['Return the restricted items to the depot', 'Return the whole order to the depot']}
              defaultValue="Return the restricted items to the depot" hint="The driver hands over the rest of the order." />
          </Card>
        </Section>

        <Section title="When the new rules start" titleId="start">
          <Card>
            <Field id="start-date" label="Rules start on" type="date" defaultValue="2026-11-24"
              hint="Earliest: 12 Nov 2026. Deliveries planned from this date use the new rules." />
            <List>
              <ListItem label="Rules now" value="Photo only" />
              <ListItem label="New rules" value="Photo, signature, ID check" />
              <ListItem label="Routes with Larder & Vine parcels" value="38" />
              <ListItem label="Drivers to update" value="51" />
            </List>
          </Card>
        </Section>
      </Grid>

      <Section title="Example proof photo" titleId="photo">
        <Card>
          <NewPart name="file-upload" className="x-upload"
            job="Upload one example photo and show it, so drivers see what a good proof photo looks like"
            why="File upload is not built yet (rules.md, section 13)">
            <NewPart name="photo-preview" className="x-photo" role="img"
              aria-label="Example photo: a parcel on the doorstep of number 14, with the door number and the parcel label in frame"
              job="Show the uploaded example photo" why="No image component, and the screen may not load image files">
              <div className="x-photo__wall" />
              <div className="x-photo__step" />
              <div className="x-photo__door"><span className="x-photo__number">14</span></div>
              <div className="x-photo__parcel"><div className="x-photo__tape" /><div className="x-photo__label" /></div>
              <span className="x-photo__caption">Example</span>
            </NewPart>
            <div className="x-upload__details">
              <div className="x-upload__file">
                <span className="x-upload__name">larder-vine-doorstep-example.jpg</span>
                <span className="x-upload__meta">JPG, 2.4 MB, uploaded by Priya Nair on 8 Nov 2026. JPG or PNG, up to 10 MB.</span>
              </div>
              <List>
                <ListItem label="Parcel label readable" value="Yes" />
                <ListItem label="Door number in frame" value="Yes" />
                <ListItem label="No people in the photo" value="Yes" />
              </List>
              <Row>
                <Button variant="secondary">Replace photo</Button>
                <Button variant="tertiary">Remove</Button>
              </Row>
            </div>
          </NewPart>
        </Card>
      </Section>

      <Row>
        <Button variant="primary" type="submit">Save rules for Larder & Vine</Button>
        <Button variant="secondary">Cancel</Button>
      </Row>
    </AppShell>
  );
}
