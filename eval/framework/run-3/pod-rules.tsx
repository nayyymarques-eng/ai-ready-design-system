// Template: form page (TPL-01). The job is editing one sender's proof rules and saving them together,
// so Save sits in the page header and every group of fields sits in its own card. The senders table
// comes first so the team sees every sender's rules and which one is being edited.
// Not built in the system: file upload (rules §13), so the example photo is a new part (CMP-03).
import {
  FormPage, NavRail, Button, Section, Stack, Row, Card, Field, Checkbox,
  Table, Tr, Td, Badge, Banner, NewPart, List, ListItem,
} from '../src';

export const title = 'Proof rules · Tolvane';

export const css = `
.x-upload { display: flex; gap: var(--s4); align-items: flex-start; flex-wrap: wrap; }
.x-upload__preview { flex: none; width: 160px; height: 120px; border-radius: var(--radius); background: var(--surface-sunken); border: var(--border); position: relative; overflow: hidden; }
.x-upload__door { position: absolute; left: var(--s6); top: var(--s3); bottom: 0; width: 64px; background: var(--line); border-radius: var(--radius) var(--radius) 0 0; }
.x-upload__parcel { position: absolute; left: var(--s7); bottom: var(--s2); width: 48px; height: 32px; background: var(--muted); border-radius: var(--radius); }
.x-upload__number { position: absolute; right: var(--s3); top: var(--s3); font: var(--type-small); color: var(--ink); background: var(--surface); border-radius: var(--radius); padding: 0 var(--s1); }
.x-upload__body { flex: 1; min-width: 200px; display: flex; flex-direction: column; gap: var(--s2); }
.x-upload__name { font: var(--type-body-strong); color: var(--ink); margin: 0; overflow-wrap: anywhere; }
.x-upload__meta { font: var(--type-small); color: var(--muted); margin: 0; }
.x-upload__drop { border: 1px dashed var(--line); border-radius: var(--radius); padding: var(--s4); font: var(--type-small); color: var(--muted); margin: 0; }
`;

const senders = [
  { name: 'Velloway Wines', photo: true, signature: true, id: '18+', since: '2 Sep 2026', disputes: 7, editing: true },
  { name: 'Tarnwick Pharmacy', photo: true, signature: true, id: '18+', since: '14 Jul 2026', disputes: 3 },
  { name: 'Zarvik Electronics', photo: true, signature: true, id: null, since: '1 Oct 2026', disputes: 11 },
  { name: 'Pellbray Vape Supply', photo: true, signature: true, id: '18+', since: '20 Aug 2026', disputes: 2 },
  { name: 'Quorrin Books', photo: true, signature: false, id: null, since: '5 Jun 2026', disputes: 1 },
  { name: 'Lindqvale Home', photo: true, signature: false, id: null, since: '5 Jun 2026', disputes: 4 },
];

const req = (on: boolean) => (on ? 'Required' : 'Not required');

export default function PodRules() {
  return (
    <FormPage
      nav={<NavRail brand="Tolvane" items={[
        { label: 'Today', href: '#' },
        { label: 'Routes', href: '#', count: 38 },
        { label: 'Drivers', href: '#', count: 64 },
        { label: 'Disputes', href: '#', count: 12 },
        { label: 'Proof rules', href: '#', current: true },
        { label: 'Senders', href: '#' },
      ]} />}
      title="Proof rules"
      actions={<><Button variant="secondary">Discard changes</Button><Button variant="primary">Save rules</Button></>}
    >
      <Banner tone="warning">
        <p>You are editing Velloway Wines. 214 deliveries are booked before the start date and keep the current rules.</p>
      </Banner>

      <Section title="Senders" titleId="senders">
        <Table columns={[
          { label: 'Sender' }, { label: 'Photo' }, { label: 'Signature' }, { label: 'ID check' },
          { label: 'Rules since' }, { label: 'Disputes, 30 days', numeric: true }, { label: 'Rules' },
        ]}>
          {senders.map(s => (
            <Tr key={s.name}>
              <Td>{s.name}</Td>
              <Td>{req(s.photo)}</Td>
              <Td>{req(s.signature)}</Td>
              <Td>{s.id ? `Age ${s.id}` : 'None'}</Td>
              <Td>{s.since}</Td>
              <Td numeric>{s.disputes}</Td>
              <Td>{s.editing ? <Badge tone="warning">Editing</Badge> : <Button variant="ghost">Edit</Button>}</Td>
            </Tr>
          ))}
        </Table>
      </Section>

      <Section title="Rules for Velloway Wines" titleId="rules">
        <Card>
          <Stack>
            <Checkbox label="Photo of the parcel where it was left" defaultChecked />
            <Checkbox label="Signature from the person who takes the parcel" defaultChecked />
            <Checkbox label="ID check for age-restricted items" defaultChecked />
          </Stack>
          <Field id="min-age" label="Minimum age" options={['18', '21']} defaultValue="18" hint="Drivers scan or read the date of birth on a photo ID. The ID number is never stored." />
          <Field id="no-id" label="If no one can show ID" options={['Return parcel to depot', 'Try again next working day', 'Leave with a neighbour who shows ID']} defaultValue="Return parcel to depot" />
          <Field id="safe-place" label="Leave in a safe place" options={['Never', 'Only items without an ID check', 'Always']} defaultValue="Never" hint="With an ID check required, a safe place is never allowed." />
        </Card>
      </Section>

      <Section title="Start date" titleId="start">
        <Card>
          <Field id="start-date" label="New rules start on" type="date" defaultValue="2026-11-16" hint="From the first route that day. Deliveries already out for delivery keep the current rules." />
          <List>
            <ListItem label="Current rules" value="Photo, signature, ID 18+" />
            <ListItem label="In use since" value="2 Sep 2026" />
            <ListItem label="Deliveries booked before 16 Nov" value="214" />
          </List>
        </Card>
      </Section>

      <Section title="Example photo" titleId="photo">
        <Card>
          <NewPart
            name="file-upload"
            className="x-upload"
            job="Upload one example photo and show what is uploaded"
            why="File upload is listed as not built in the rules (§13)"
          >
            <div className="x-upload__preview" role="img" aria-label="Example photo: parcel on the doorstep, front door and house number in view">
              <div className="x-upload__door" />
              <div className="x-upload__parcel" />
              <span className="x-upload__number">14</span>
            </div>
            <div className="x-upload__body">
              <p className="x-upload__name">northgate-doorstep-example.jpg</p>
              <p className="x-upload__meta">1.8 MB · uploaded by Ines Carvalho on 4 Nov 2026</p>
              <p className="x-upload__meta">Drivers see this photo before their first Velloway Wines stop of the day.</p>
              <Row>
                <Button variant="secondary">Replace photo</Button>
                <Button variant="ghost">Remove</Button>
              </Row>
              <p className="x-upload__drop">Or drop a JPG or PNG here, up to 10 MB.</p>
            </div>
          </NewPart>
          <List>
            <ListItem label="A good proof photo shows" value="The parcel, the door and the house number" />
            <ListItem label="It never shows" value="A person's face or the inside of the home" />
          </List>
        </Card>
      </Section>
    </FormPage>
  );
}
