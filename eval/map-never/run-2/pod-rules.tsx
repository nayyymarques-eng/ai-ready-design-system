/*
 * TPL-02: no template fits this screen on its own.
 * List page came closest: the senders table is its job. But the screen also edits one
 * sender's rules (a form, which a list page has no slot for, and a list page holds one
 * table only). Form page fits the edit but has no place for the list of senders.
 * Built from the app shell, page header and sections instead.
 */
import {
  AppShell, NavRail, PageHeader, Section, Grid, Row, Card, Table, Tr, Td, Badge,
  Button, MenuButton, Checkbox, Field, List, ListItem, NewPart,
} from '../src';

export const title = 'Proof rules';

export const css = `
.x-upload { display: flex; flex-direction: column; gap: var(--s2); min-width: 0; }
.x-upload__label { font: var(--type-body-strong); color: var(--ink); }
.x-upload__current { display: flex; align-items: center; gap: var(--s3); padding: var(--s3); border: var(--border); border-radius: var(--radius); min-width: 0; }
.x-upload__thumb { flex: none; width: 64px; height: 48px; border-radius: var(--radius); background: var(--surface-sunken); border: var(--border); display: flex; align-items: flex-end; justify-content: center; padding-bottom: var(--s1); }
.x-upload__parcel { width: 24px; height: 16px; border-radius: var(--s1); border: var(--border); background: var(--line); }
.x-upload__file { display: flex; flex-direction: column; min-width: 0; }
.x-upload__name { font: var(--type-body-strong); color: var(--ink); overflow-wrap: anywhere; }
.x-upload__meta { font: var(--type-small); color: var(--muted); }
.x-upload__drop { display: flex; align-items: center; justify-content: center; flex-wrap: wrap; gap: var(--s3); padding: var(--s5) var(--s4); border: 1px dashed var(--muted); border-radius: var(--radius); background: var(--surface-sunken); text-align: center; }
.x-upload__input { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }
.x-upload__hint { font: var(--type-small); color: var(--muted); }
`;

type Sender = {
  name: string;
  photo: string;
  signature: string;
  id: string;
  deliveries: string;
  status: { tone?: 'positive' | 'warning' | 'info'; label: string };
};

const senders: Sender[] = [
  { name: 'Northvale Wines', photo: 'Required', signature: 'Required', id: 'Over 18', deliveries: '2,184', status: { tone: 'info', label: 'New rules from 1 Dec' } },
  { name: 'Brightmoor Electronics', photo: 'Required', signature: 'Required', id: 'Not needed', deliveries: '6,902', status: { tone: 'positive', label: 'Active' } },
  { name: 'Halden Pharmacy', photo: 'Required', signature: 'Required', id: 'Over 18', deliveries: '1,457', status: { tone: 'positive', label: 'Active' } },
  { name: 'Fernway Books', photo: 'Required', signature: 'Not needed', id: 'Not needed', deliveries: '4,075', status: { tone: 'positive', label: 'Active' } },
  { name: 'Petal & Stem Florists', photo: 'Required', signature: 'Not needed', id: 'Not needed', deliveries: '3,318', status: { tone: 'positive', label: 'Active' } },
  { name: 'Ostler Home & Garden', photo: 'Required', signature: 'Over £250', id: 'Not needed', deliveries: '2,640', status: { tone: 'positive', label: 'Active' } },
  { name: 'Kiln Street Vapes', photo: 'Required', signature: 'Required', id: 'Over 18', deliveries: '912', status: { tone: 'positive', label: 'Active' } },
  { name: 'Marlow Tool Hire', photo: 'Not set', signature: 'Not set', id: 'Not set', deliveries: '388', status: { tone: 'warning', label: 'No rules set' } },
];

const nav = (
  <NavRail brand="Tolvane" items={[
    { label: 'Today', href: '#' },
    { label: 'Routes', href: '#' },
    { label: 'Drivers', href: '#', count: 64 },
    { label: 'Deliveries', href: '#' },
    { label: 'Disputes', href: '#', count: 7 },
    { label: 'Proof rules', href: '#', current: true },
    { label: 'Settings', href: '#' },
  ]} />
);

export default function PodRules() {
  return (
    <AppShell nav={nav}>
      <PageHeader title="Proof rules" actions={<Button variant="secondary">Add sender</Button>} />

      <Section title="Senders" titleId="senders">
        <Table columns={[
          { label: 'Sender' },
          { label: 'Photo' },
          { label: 'Signature' },
          { label: 'ID check' },
          { label: 'Deliveries, 30 days', numeric: true },
          { label: 'Status' },
          { label: 'Actions' },
        ]}>
          {senders.map(s => (
            <Tr key={s.name}>
              <Td>{s.name}</Td>
              <Td>{s.photo}</Td>
              <Td>{s.signature}</Td>
              <Td>{s.id}</Td>
              <Td numeric>{s.deliveries}</Td>
              <Td><Badge tone={s.status.tone}>{s.status.label}</Badge></Td>
              <Td>
                <MenuButton label={`Actions for ${s.name}`} items={[
                  { label: 'Edit rules' },
                  { label: 'View disputes' },
                  { label: 'Copy rules to another sender' },
                ]} />
              </Td>
            </Tr>
          ))}
        </Table>
      </Section>

      <Section title="Edit rules for Northvale Wines" titleId="edit-rules">
        <Card>
          <p>On every Northvale Wines delivery, drivers collect:</p>
          <Checkbox label="A photo of the parcel at the door" defaultChecked />
          <Checkbox label="The customer's signature" defaultChecked />
          <Checkbox label="An ID check for age-restricted items" defaultChecked />

          <Grid>
            <Field id="min-age" label="Minimum age on the ID" options={['18', '21', '25']} defaultValue="18"
              hint="Only on parcels Northvale marks as age-restricted. With no one over 18 at home, the parcel goes back to the depot." />
            <Field id="start-date" label="New rules start on" type="date" defaultValue="2026-12-01"
              hint="Until then, drivers collect a photo and an ID check, as now." />
          </Grid>

          <NewPart name="photo-upload" className="x-upload"
            job="Upload the example photo that shows drivers what a good proof photo looks like"
            why="File upload is not built in the system yet (rules, section 13)">
            <label className="x-upload__label" htmlFor="example-photo">Example proof photo</label>
            <div className="x-upload__current">
              <div className="x-upload__thumb" aria-hidden="true"><div className="x-upload__parcel" /></div>
              <div className="x-upload__file">
                <p className="x-upload__name">northvale-doorstep-example.jpg</p>
                <p className="x-upload__meta">1.8 MB, 1600 by 1200, added 14 Oct 2026 by Rita Okafor</p>
              </div>
            </div>
            <div className="x-upload__drop">
              <p>Drop a new photo here, or</p>
              <Button variant="secondary">Choose a photo</Button>
              <input className="x-upload__input" id="example-photo" type="file" accept="image/jpeg,image/png" />
            </div>
            <p className="x-upload__hint">JPG or PNG, up to 10 MB. Show the whole parcel and the house number in daylight, with no faces. Drivers see this photo before they take their own.</p>
          </NewPart>

          <Row>
            <Button variant="secondary">Cancel</Button>
            <Button variant="primary">Save rules</Button>
          </Row>
        </Card>
      </Section>

      <Section title="History for Northvale Wines" titleId="history">
        <List>
          <ListItem label="14 Oct 2026, Rita Okafor" value="Changed the example photo" />
          <ListItem label="2 Sep 2026, Tomasz Wierzbicki" value="Added an ID check, over 18" />
          <ListItem label="18 Jun 2026, Rita Okafor" value="Set photo as required" />
        </List>
      </Section>
    </AppShell>
  );
}
