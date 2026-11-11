/*
 * TPL-02: no template fits this screen whole.
 * Closest: the form page, because the rules for one sender are edited and saved together.
 * It did not fit because the screen also lists every sender and the proof each one requires,
 * and a table never goes inside a form page's cards. The list page did not fit either: it holds
 * one table and nothing else, so the edit form has no place in it.
 * Built from the app shell, the page header and sections, in one column.
 */
import {
  AppShell, NavRail, PageHeader, Banner, Section, Stack, Card, Table, Tr, Td, Badge,
  Button, Checkbox, Field, List, ListItem, NewPart, ToggleGroup,
} from '../src';

export const title = 'Proof rules — Tolvane';

export const css = `
.x-upload { display: flex; flex-direction: column; gap: var(--s4); }
.x-upload__current { display: flex; gap: var(--s4); align-items: flex-start; flex-wrap: wrap; }
.x-upload__preview { flex: none; width: 160px; aspect-ratio: 4 / 3; border-radius: var(--radius); background: var(--surface-sunken); border: var(--border); display: flex; flex-direction: column; justify-content: flex-end; padding: var(--s3); gap: var(--s1); }
.x-upload__door { flex: 1; border: var(--border); border-radius: var(--radius); background: var(--surface); display: flex; align-items: flex-end; justify-content: center; padding: var(--s2); }
.x-upload__parcel { width: 48px; height: 32px; border-radius: var(--radius); background: var(--line); }
.x-upload__caption { font: var(--type-small); color: var(--muted); }
.x-upload__meta { display: flex; flex-direction: column; gap: var(--s1); min-width: 0; flex: 1; }
.x-upload__name { font: var(--type-body-strong); color: var(--ink); overflow-wrap: anywhere; }
.x-upload__detail { font: var(--type-small); color: var(--muted); }
.x-upload__drop { display: flex; flex-direction: column; gap: var(--s2); padding: var(--s5) var(--s4); border: 1px dashed var(--muted); border-radius: var(--radius); background: var(--surface-sunken); color: var(--text); }
.x-upload__drop-title { font: var(--type-body-strong); color: var(--ink); }
.x-upload__drop input { font: var(--type-small); color: var(--text); max-width: 100%; }
`;

const nav = (
  <NavRail
    brand="Tolvane"
    items={[
      { label: 'Today', href: '#' },
      { label: 'Deliveries', href: '#', count: 1842 },
      { label: 'Drivers', href: '#', count: 64 },
      { label: 'Disputes', href: '#', count: 7 },
      { label: 'Proof rules', href: '#', current: true },
      { label: 'Settings', href: '#' },
    ]}
  />
);

type Sender = {
  name: string;
  proof: string;
  idCheck: string;
  perWeek: string;
  since: string;
  status?: { tone?: 'positive' | 'warning' | 'info'; text: string };
};

const senders: Sender[] = [
  { name: 'Halden Pharmacy', proof: 'Photo, signature', idCheck: 'Prescription items', perWeek: '1,240', since: '2 Sep 2026', status: { tone: 'info', text: 'Editing' } },
  { name: 'Corvo Wine Club', proof: 'Signature', idCheck: 'Every parcel (18+)', perWeek: '610', since: '14 Jul 2026', status: { tone: 'positive', text: 'Active' } },
  { name: 'Brightmoor Home', proof: 'Photo', idCheck: 'None', perWeek: '3,905', since: '1 Jun 2026', status: { tone: 'positive', text: 'Active' } },
  { name: 'Ferrow Electronics', proof: 'Photo, signature', idCheck: 'None', perWeek: '2,118', since: '20 Oct 2026', status: { tone: 'positive', text: 'Active' } },
  { name: 'Leaf & Lantern Books', proof: 'Photo', idCheck: 'None', perWeek: '870', since: '3 Mar 2026', status: { tone: 'warning', text: 'Starts 25 Nov' } },
  { name: 'Northgate Vape Supply', proof: 'Photo, signature', idCheck: 'Every parcel (18+)', perWeek: '452', since: '9 Aug 2026', status: { tone: 'positive', text: 'Active' } },
];

export default function PodRules() {
  return (
    <AppShell nav={nav}>
      <PageHeader
        title="Proof rules"
        actions={<>
          <Button variant="secondary">Discard changes</Button>
          <Button variant="primary">Save rules for Halden Pharmacy</Button>
        </>}
      />

      <Banner>
        <p>Drivers see the proof a sender requires when they scan the parcel. New rules apply to deliveries from their start date; parcels already on a van keep the rules they left the depot with.</p>
      </Banner>

      <Section title="Senders" titleId="senders">
        <ToggleGroup
          label="Filter senders"
          items={[
            { label: 'All', count: 6, selected: true },
            { label: 'ID check', count: 3 },
            { label: 'Change scheduled', count: 1 },
          ]}
        />
        <Table columns={[
          { label: 'Sender' },
          { label: 'Proof required' },
          { label: 'ID check' },
          { label: 'Parcels a week', numeric: true },
          { label: 'Rules since' },
          { label: 'Status' },
          { label: 'Actions' },
        ]}>
          {senders.map(s => (
            <Tr key={s.name}>
              <Td><strong>{s.name}</strong></Td>
              <Td>{s.proof}</Td>
              <Td>{s.idCheck}</Td>
              <Td numeric>{s.perWeek}</Td>
              <Td>{s.since}</Td>
              <Td>{s.status ? <Badge tone={s.status.tone}>{s.status.text}</Badge> : null}</Td>
              <Td><Button variant="tertiary" aria-label={`Edit rules for ${s.name}`}>Edit</Button></Td>
            </Tr>
          ))}
        </Table>
      </Section>

      <Section title="Proof for Halden Pharmacy" titleId="proof">
        <Card>
          <Stack>
            <Checkbox label="Photo of the parcel where it was left" defaultChecked />
            <Checkbox label="Signature from the person who takes the parcel" defaultChecked />
            <Checkbox label="ID check for age-restricted and prescription items" defaultChecked />
            <Checkbox label="Allow a safe place when nobody answers" />
          </Stack>
          <Field
            id="id-check-scope"
            label="Items that need an ID check"
            options={['Prescription items only', 'Every parcel', 'Items flagged 18+ by the sender']}
            defaultValue="Prescription items only"
            hint="The driver checks the recipient's photo ID and enters the last four characters of the document number."
          />
          <Field
            id="id-fail"
            label="If the ID check fails"
            options={['Return the parcel to the depot', 'Try again on the next delivery day', 'Hold at the nearest pickup point']}
            defaultValue="Return the parcel to the depot"
          />
        </Card>
      </Section>

      <Section title="When the new rules start" titleId="start">
        <Card>
          <Field
            id="start-date"
            label="Start date"
            type="date"
            defaultValue="2026-11-18"
            hint="Earliest is tomorrow, 12 Nov. Drivers get the new rules on their app at 05:00 that day."
          />
          <List>
            <ListItem label="Current rules" value="Photo, signature, ID for prescription items" />
            <ListItem label="In use since" value="2 Sep 2026" />
            <ListItem label="Open disputes for this sender" value="2" />
          </List>
        </Card>
      </Section>

      <Section title="Example photo for drivers" titleId="example">
        <Card>
          <p>Drivers see this photo the first time they deliver for Halden Pharmacy, and again after any change to the rules. Show the parcel, the door and the house number in one frame.</p>
          <NewPart
            name="file-upload"
            className="x-upload"
            job="Upload one example photo and show the one in use"
            why="File upload is not built yet (rules, section 13), and no component holds a file and its preview"
          >
            <div className="x-upload__current">
              <div className="x-upload__preview" role="img" aria-label="Example photo: a parcel on a doorstep, with the door and the house number in view">
                <div className="x-upload__door"><span className="x-upload__parcel" /></div>
                <span className="x-upload__caption">No. 14, front door</span>
              </div>
              <div className="x-upload__meta">
                <span className="x-upload__name">halden-good-proof-doorstep.jpg</span>
                <span className="x-upload__detail">1.8 MB · 3024 × 2268 · uploaded 3 Nov 2026 by Inês Carvalho</span>
                <span className="x-upload__detail">Used on 1,180 deliveries since then</span>
              </div>
            </div>
            <label className="x-upload__drop" htmlFor="example-photo">
              <span className="x-upload__drop-title">Replace the example photo</span>
              <span>Drop a JPG or PNG here, or choose a file. Up to 10 MB, taken in landscape.</span>
              <input id="example-photo" type="file" accept="image/jpeg,image/png" />
            </label>
          </NewPart>
          <List>
            <ListItem label="Parcel and label in focus" value="Required" />
            <ListItem label="House number or door in view" value="Required" />
            <ListItem label="No faces, no car plates" value="Required" />
          </List>
          <p>The photo is shown to drivers only. Customers never see it.</p>
        </Card>
      </Section>
    </AppShell>
  );
}
