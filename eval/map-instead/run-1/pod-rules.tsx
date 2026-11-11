/*
 * TPL-02: no template fits this screen on its own. It does two jobs: list every sender with the proof it
 * requires (the list page's job) and edit one sender's rules, saved together (the form page's job).
 * The list page came closest, but it holds one table and nothing else, so the screen is built from the
 * app shell, the page header and sections: the senders table first, then the form for the chosen sender.
 */
import {
  AppShell, Badge, Banner, Button, Card, Checkbox, Field, Grid, List, ListItem, NavRail, NewPart,
  PageHeader, Row, Section, Stack, Table, Td, ToggleGroup, Tr,
} from '../src';

export const title = 'Proof rules — Tolvane';

export const css = `
.x-photo-upload { display: flex; flex-wrap: wrap; gap: var(--s4); align-items: stretch; }
.x-photo-upload__preview { flex: 0 0 200px; max-width: 100%; aspect-ratio: 4 / 3; position: relative; overflow: hidden;
  background: var(--surface-sunken); border: var(--border); border-radius: var(--radius); }
.x-photo-upload__door { position: absolute; left: 22%; bottom: 0; width: 34%; height: 78%;
  background: var(--surface); border: var(--border); border-bottom: 0; }
.x-photo-upload__number { position: absolute; left: 62%; top: 18%; font: var(--type-body-strong); color: var(--ink); }
.x-photo-upload__parcel { position: absolute; left: 50%; bottom: 8%; width: 26%; height: 22%;
  background: var(--line); border: var(--border); border-radius: var(--radius); }
.x-photo-upload__body { flex: 1 1 240px; min-width: 0; display: flex; flex-direction: column; gap: var(--s3); }
.x-photo-upload__file { font: var(--type-body-strong); color: var(--ink); overflow-wrap: anywhere; }
.x-photo-upload__meta { font: var(--type-small); color: var(--muted); }
.x-photo-upload__drop { display: flex; flex-direction: column; gap: var(--s2); align-items: flex-start;
  padding: var(--s4); border: 1px dashed var(--muted); border-radius: var(--radius); background: var(--surface-sunken); }
.x-photo-upload__drop p { font: var(--type-small); color: var(--text); }
`;

const senders = [
  { name: 'Halden Pharmacy', photo: 'Required', signature: 'Not needed', id: 'Not needed', since: '3 Mar 2026', status: <Badge tone="info">Editing</Badge> },
  { name: 'Corvo Wine Club', photo: 'Required', signature: 'Required', id: '18+', since: '12 Jan 2026', status: <Badge tone="positive">Active</Badge> },
  { name: 'Brightbasket Grocery', photo: 'Required', signature: 'Not needed', id: '18+', since: '2 Dec 2026', status: <Badge tone="warning">Scheduled</Badge> },
  { name: 'Northwall Electronics', photo: 'Required', signature: 'Required', id: 'Not needed', since: '20 Aug 2025', status: <Badge tone="positive">Active</Badge> },
  { name: 'Pell & Thorne Books', photo: 'Required', signature: 'Not needed', id: 'Not needed', since: '5 May 2025', status: <Badge tone="positive">Active</Badge> },
  { name: 'Ashby Vape Supply', photo: 'Required', signature: 'Required', id: '18+', since: '14 Feb 2026', status: <Badge tone="positive">Active</Badge> },
  { name: 'Mira Home Textiles', photo: 'Not needed', signature: 'Not needed', id: 'Not needed', since: '9 Sep 2025', status: <Badge>No proof</Badge> },
  { name: 'Lumen Opticians', photo: 'Required', signature: 'Required', id: 'Not needed', since: '28 Jun 2026', status: <Badge tone="positive">Active</Badge> },
];

export default function PodRules() {
  return (
    <AppShell
      nav={
        <NavRail
          brand="Tolvane"
          items={[
            { label: 'Today', href: '#' },
            { label: 'Deliveries', href: '#', count: 1284 },
            { label: 'Disputes', href: '#', count: 7 },
            { label: 'Drivers', href: '#', count: 42 },
            { label: 'Proof rules', href: '#', count: 8, current: true },
            { label: 'Settings', href: '#' },
          ]}
        />
      }
    >
      <PageHeader title="Proof rules" actions={<Button variant="secondary">Add sender</Button>} />

      <Banner>
        <p>Each delivery keeps the rules that applied on its delivery date. When a customer disputes a delivery, the review checks the proof against those rules.</p>
      </Banner>

      <Section title="Senders" titleId="senders">
        <ToggleGroup
          label="Filter senders"
          items={[
            { label: 'All', count: 8, selected: true },
            { label: 'ID check', count: 3 },
            { label: 'Scheduled change', count: 1 },
          ]}
        />
        <Table
          columns={[
            { label: 'Sender' }, { label: 'Photo' }, { label: 'Signature' }, { label: 'ID check' },
            { label: 'Rules since' }, { label: 'Status' }, { label: 'Edit' },
          ]}
        >
          {senders.map(s => (
            <Tr key={s.name}>
              <Td><strong>{s.name}</strong></Td>
              <Td>{s.photo}</Td>
              <Td>{s.signature}</Td>
              <Td>{s.id}</Td>
              <Td>{s.since}</Td>
              <Td>{s.status}</Td>
              <Td><Button variant="tertiary" aria-label={`Edit rules for ${s.name}`}>Edit</Button></Td>
            </Tr>
          ))}
        </Table>
      </Section>

      <Section title="Edit rules for Halden Pharmacy" titleId="edit">
        <Grid>
          <Card>
            <p><strong>Proof drivers collect at handover</strong></p>
            <Stack>
              <Checkbox label="Photo of the parcel at the door" defaultChecked />
              <Checkbox label="Signature from the person who takes the parcel" defaultChecked />
              <Checkbox label="ID check for age-restricted items" defaultChecked />
              <Checkbox label="Allow a safe place when nobody is home" />
            </Stack>
            <Field
              id="min-age"
              label="Minimum age for the ID check"
              options={['18', '21']}
              defaultValue="18"
              hint="Drivers scan the ID in the app. Tolvane keeps the result of the check, not a copy of the ID."
            />
          </Card>
          <Card>
            <Field
              id="start-date"
              label="New rules start on"
              type="date"
              defaultValue="2026-11-18"
              hint="Deliveries on or after this date use the new rules. Deliveries before it keep the current ones."
            />
            <List>
              <ListItem label="Current rules since" value="3 Mar 2026" />
              <ListItem label="Deliveries planned from 18 Nov" value="412" />
              <ListItem label="Drivers on Halden routes" value="11" />
            </List>
          </Card>
        </Grid>

        <Card>
          <p><strong>Example of a good proof photo</strong></p>
          <p>Drivers see this photo in the app before their first Halden Pharmacy stop of the day.</p>
          <NewPart
            name="photo-upload"
            className="x-photo-upload"
            job="Upload the example photo that shows drivers what a good proof photo looks like, and show the current one"
            why="File upload is not built in the system yet (rules, section 13)"
          >
            <div
              className="x-photo-upload__preview"
              role="img"
              aria-label="Example photo: the parcel on the doorstep, the front door and house number 14 in one frame"
            >
              <div className="x-photo-upload__door" />
              <span className="x-photo-upload__number">14</span>
              <div className="x-photo-upload__parcel" />
            </div>
            <div className="x-photo-upload__body">
              <div>
                <p className="x-photo-upload__file">halden-doorstep-example.jpg</p>
                <p className="x-photo-upload__meta">1.8 MB, uploaded by Priya Okafor on 3 Mar 2026</p>
              </div>
              <div className="x-photo-upload__drop">
                <p>Drop a new photo here to replace it. JPG or PNG, up to 10 MB. Show the parcel, the door and the house number in one frame, with no faces.</p>
                <Row>
                  <Button variant="secondary">Choose photo</Button>
                  <Button variant="tertiary">Remove</Button>
                </Row>
              </div>
            </div>
          </NewPart>
        </Card>

        <Card>
          <p><strong>Changes from 18 Nov 2026</strong></p>
          <List>
            <ListItem label="Photo" value="Required, no change" />
            <ListItem label="Signature" value="Required, was not needed" />
            <ListItem label="ID check" value="Required, 18+, was not needed" />
            <ListItem label="Safe place" value="Not allowed, no change" />
          </List>
          <Row>
            <Button variant="secondary">Cancel</Button>
            <Button variant="primary">Save rules</Button>
          </Row>
        </Card>
      </Section>
    </AppShell>
  );
}
