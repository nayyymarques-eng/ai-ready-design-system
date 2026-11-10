import {
  Badge,
  Banner,
  Button,
  Card,
  Checkbox,
  Field,
  FormPage,
  NavRail,
  NewPart,
  Row,
  Section,
  Stack,
  Table,
  Td,
  Tr,
} from '../src';

export const title = 'Proof rules — Tolvane';

export const css = `
.x-upload { display: flex; flex-wrap: wrap; gap: var(--s4); align-items: flex-start; }
.x-upload__preview { flex: 1 1 calc(var(--s8) * 4); max-width: calc(var(--s8) * 5); margin: 0; display: flex; flex-direction: column; gap: var(--s2); }
.x-upload__frame { display: block; width: 100%; height: auto; border: var(--border); border-radius: var(--radius); background: var(--surface-sunken); }
.x-upload__caption { font: var(--type-small); color: var(--muted); }
.x-upload__meta { flex: 1 1 calc(var(--s8) * 3); min-width: 0; display: flex; flex-direction: column; gap: var(--s3); }
.x-upload__name { font: var(--type-body-strong); color: var(--ink); overflow-wrap: anywhere; margin: 0; }
.x-upload__detail { font: var(--type-small); color: var(--muted); margin: 0; }
.x-upload__drop { border: 1px dashed var(--line); border-radius: var(--radius); padding: var(--s3) var(--s4); font: var(--type-small); color: var(--text); margin: 0; }
.x-upload__tips { margin: 0; padding-left: var(--s4); font: var(--type-small); color: var(--text); display: flex; flex-direction: column; gap: var(--s1); }
.x-photo__wall { fill: var(--line); }
.x-photo__step { fill: var(--muted); }
.x-photo__door { fill: var(--surface); stroke: var(--muted); stroke-width: 2; }
.x-photo__detail { fill: var(--muted); }
.x-photo__parcel { fill: var(--tint-warning); stroke: var(--warning); stroke-width: 2; }
.x-photo__tape { fill: var(--warning); }
.x-photo__label { fill: var(--surface); stroke: var(--warning); stroke-width: 1; }
.x-photo__number { fill: var(--ink); font: var(--type-heading); }
`;

const nav = (
  <NavRail
    brand="Tolvane"
    items={[
      { label: 'Today', href: '#' },
      { label: 'Deliveries', href: '#', count: 1284 },
      { label: 'Disputes', href: '#', count: 7 },
      { label: 'Drivers', href: '#', count: 42 },
      { label: 'Proof rules', href: '#', current: true },
      { label: 'Settings', href: '#' },
    ]}
  />
);

type Sender = { name: string; proof: string; since: string; disputes: number; status?: 'editing' | 'scheduled' };

const senders: Sender[] = [
  { name: 'Halden Pharmacy', proof: 'Photo, signature', since: '12 Mar 2026', disputes: 4, status: 'editing' },
  { name: 'Brightwater Wines', proof: 'Photo, signature, ID check', since: '3 Jan 2026', disputes: 2 },
  { name: 'Northgate Books', proof: 'Photo', since: '18 Aug 2025', disputes: 0 },
  { name: 'Kestrel Outdoor', proof: 'Photo, signature', since: '1 Dec 2026', disputes: 1, status: 'scheduled' },
  { name: 'Marlow & Finch Tea', proof: 'Photo', since: '9 Jun 2025', disputes: 0 },
  { name: 'Vape Depot Leeds', proof: 'Photo, signature, ID check', since: '27 Feb 2026', disputes: 3 },
];

function ExamplePhoto() {
  return (
    <svg className="x-upload__frame" viewBox="0 0 320 240" role="img" aria-label="Example photo: a parcel on the doorstep, in front of the closed front door, with the house number 14 visible">
      <rect className="x-photo__wall" x="0" y="0" width="320" height="240" />
      <rect className="x-photo__door" x="96" y="24" width="128" height="176" />
      <rect className="x-photo__detail" x="200" y="112" width="10" height="4" />
      <rect className="x-photo__detail" x="140" y="72" width="40" height="6" />
      <rect className="x-photo__label" x="236" y="40" width="40" height="28" />
      <text className="x-photo__number" x="256" y="60" textAnchor="middle">14</text>
      <rect className="x-photo__step" x="64" y="200" width="192" height="40" />
      <rect className="x-photo__parcel" x="122" y="146" width="76" height="56" />
      <rect className="x-photo__tape" x="156" y="146" width="8" height="56" />
      <rect className="x-photo__label" x="130" y="168" width="20" height="14" />
    </svg>
  );
}

export default function PodRules() {
  return (
    <FormPage
      nav={nav}
      title="Proof rules"
      actions={
        <>
          <Button variant="secondary">Discard changes</Button>
          <Button variant="primary">Save rules for Halden Pharmacy</Button>
        </>
      }
    >
      <Banner>
        <p>
          You are editing Halden Pharmacy. Until the start date, drivers keep collecting the current proof: a photo
          and a signature.
        </p>
      </Banner>

      <Section title="Senders" titleId="senders">
        <Table
          columns={[
            { label: 'Sender' },
            { label: 'Proof required' },
            { label: 'Rules since' },
            { label: 'Disputes (30d)', numeric: true },
            { label: 'Status' },
          ]}
        >
          {senders.map(s => (
            <Tr key={s.name}>
              <Td>{s.name}</Td>
              <Td>{s.proof}</Td>
              <Td>{s.since}</Td>
              <Td numeric>{s.disputes}</Td>
              <Td>
                {s.status === 'editing' ? (
                  <Badge tone="info">Editing</Badge>
                ) : s.status === 'scheduled' ? (
                  <Badge tone="warning">Scheduled</Badge>
                ) : (
                  <Badge tone="positive">Active</Badge>
                )}
              </Td>
            </Tr>
          ))}
        </Table>
      </Section>

      <Section title="Halden Pharmacy: proof at handover" titleId="proof">
        <Card>
          <Stack>
            <Checkbox label="Photo of the parcel where it was left" defaultChecked />
            <Checkbox label="Customer signature on the driver's phone" defaultChecked />
            <Checkbox label="ID check for age-restricted items (over 18)" defaultChecked />
          </Stack>
          <p>
            Halden sends some medicines that may only go to an adult. With the ID check on, the driver scans the
            customer's ID for those parcels and records the year of birth only, not the ID number.
          </p>
          <Field
            id="not-home"
            label="If nobody is home"
            options={['Bring the parcel back to the depot', 'Leave with a neighbour, with a photo', 'Leave in a safe place, with a photo']}
            defaultValue="Bring the parcel back to the depot"
            hint="Parcels that need a signature or an ID check always come back to the depot."
          />
        </Card>
      </Section>

      <Section title="Start date" titleId="start">
        <Card>
          <Field
            id="start-date"
            label="New rules start on"
            type="date"
            defaultValue="2026-12-01"
            hint="Applies to every Halden Pharmacy delivery scheduled on or after this date. Deliveries already on a route keep the current rules."
          />
        </Card>
      </Section>

      <Section title="Example proof photo" titleId="photo">
        <Card>
          <p>Drivers see this photo in the app before their first Halden Pharmacy stop of the day.</p>
          <NewPart
            name="file-upload"
            className="x-upload"
            job="Show the uploaded example photo and let the team replace or remove it"
            why="The system has no file upload component (rules.md, not built)"
          >
            <figure className="x-upload__preview">
              <ExamplePhoto />
              <figcaption className="x-upload__caption">Parcel on the step, door and house number in frame</figcaption>
            </figure>
            <div className="x-upload__meta">
              <p className="x-upload__name">halden-doorstep-example.jpg</p>
              <p className="x-upload__detail">1.8 MB, uploaded 4 Nov 2026 by Marta Lindqvist</p>
              <ul className="x-upload__tips">
                <li>The whole parcel and its label are in frame</li>
                <li>The front door or house number shows where it was left</li>
                <li>Taken in daylight or with the flash on, not blurred</li>
              </ul>
              <Row>
                <Button variant="secondary">Replace photo</Button>
                <Button variant="tertiary">Remove</Button>
              </Row>
              <p className="x-upload__drop">Or drop a new photo here. JPG or PNG, up to 10 MB.</p>
            </div>
          </NewPart>
        </Card>
      </Section>
    </FormPage>
  );
}
