import {
  AppShell,
  NavRail,
  PageHeader,
  Badge,
  Button,
  Banner,
  Section,
  Row,
  Grid,
  Card,
  List,
  ListItem,
  Stat,
  Avatar,
  NewPart,
} from '../src';

export const title = 'Proof of delivery TLV-48213';

export const css = `
.x-photo { margin: 0; display: flex; flex-direction: column; gap: var(--s3); }
.x-photo__frame { display: block; width: 100%; height: auto; aspect-ratio: 4 / 3; border-radius: var(--radius); background: var(--surface-sunken); border: var(--border); }
.x-photo__wall { fill: var(--line); }
.x-photo__ground { fill: var(--surface-sunken); }
.x-photo__door { fill: var(--muted); }
.x-photo__detail { fill: none; stroke: var(--surface); stroke-width: 3; }
.x-photo__handle { fill: var(--surface); }
.x-photo__number { fill: var(--surface); font: var(--type-heading); }
.x-photo__box { fill: var(--tint-warning); stroke: var(--warning); stroke-width: 3; }
.x-photo__tape { fill: var(--warning); }
.x-photo__stamp { fill: var(--ink); opacity: .72; }
.x-photo__stamp-text { fill: var(--on-accent); font: var(--type-small); }
.x-photo__caption { font: var(--type-small); color: var(--muted); }

.x-signature { margin: 0; display: flex; flex-direction: column; gap: var(--s3); }
.x-signature__pad { display: block; width: 100%; height: auto; aspect-ratio: 4 / 3; border-radius: var(--radius); background: var(--surface); border: var(--border); }
.x-signature__line { stroke: var(--line); stroke-width: 2; }
.x-signature__ink { fill: none; stroke: var(--ink); stroke-width: 3; stroke-linecap: round; stroke-linejoin: round; }
.x-signature__mark { fill: var(--muted); font: var(--type-small); }
.x-signature__caption { font: var(--type-small); color: var(--muted); }

.x-message { display: flex; flex-direction: column; gap: var(--s1); }
.x-message__label { font: var(--type-body-strong); color: var(--ink); }
.x-message__input { width: 100%; min-height: 120px; padding: var(--s2) var(--s3); border: var(--border); border-radius: var(--radius); background: var(--surface); font: var(--type-body); color: var(--ink); resize: vertical; }
.x-message__hint { font: var(--type-small); color: var(--muted); }
`;

const steps: { step: string; detail: string; time: string; tone?: 'positive' | 'warning' }[] = [
  { step: 'Picked up', detail: 'Lisbon North depot, bay 4', time: 'Thu 6 Nov, 08:14' },
  { step: 'Loaded on van', detail: 'Van 12 (AL-27-QX), route L-07', time: 'Thu 6 Nov, 08:41' },
  { step: 'Out for delivery', detail: 'Stop 19 of 34', time: 'Thu 6 Nov, 09:02' },
  { step: 'Arrived near address', detail: 'Driver checked in 18 m from the door', time: 'Thu 6 Nov, 14:29' },
  { step: 'Photo taken', detail: 'Front door, parcel on the step', time: 'Thu 6 Nov, 14:31' },
  { step: 'Signature collected', detail: 'Signed by R. Ribeiro', time: 'Thu 6 Nov, 14:32' },
  { step: 'Marked delivered', detail: 'Handed to a household member', time: 'Thu 6 Nov, 14:32', tone: 'positive' },
  { step: 'Disputed by customer', detail: 'Reported as not received', time: 'Fri 7 Nov, 09:12', tone: 'warning' },
];

function DoorPhoto() {
  return (
    <NewPart
      name="pod-photo"
      as="figure"
      className="x-photo"
      job="Show the photo the driver took at the door, with when and where it was taken"
      why="The system has no image or media component; drawn as a schematic because the screen allows no image files"
    >
      <svg className="x-photo__frame" viewBox="0 0 400 300" role="img" aria-label="Photo at the door: a parcel on the step in front of a dark front door marked 27">
        <rect className="x-photo__wall" x="0" y="0" width="400" height="240" />
        <rect className="x-photo__ground" x="0" y="240" width="400" height="60" />
        <rect className="x-photo__door" x="140" y="40" width="120" height="200" />
        <rect className="x-photo__detail" x="156" y="58" width="88" height="70" />
        <rect className="x-photo__detail" x="156" y="142" width="88" height="80" />
        <circle className="x-photo__handle" cx="244" cy="140" r="6" />
        <text className="x-photo__number" x="200" y="100" textAnchor="middle">27</text>
        <rect className="x-photo__box" x="168" y="206" width="72" height="54" />
        <rect className="x-photo__tape" x="200" y="206" width="8" height="54" />
        <rect className="x-photo__stamp" x="12" y="264" width="214" height="26" rx="4" />
        <text className="x-photo__stamp-text" x="22" y="282">06 Nov 14:31 · 38.7369, -9.1427</text>
      </svg>
      <figcaption className="x-photo__caption">Taken by Tiago Mendes on Thu 6 Nov at 14:31, 18 m from the address.</figcaption>
    </NewPart>
  );
}

function SignaturePad() {
  return (
    <NewPart
      name="pod-signature"
      as="figure"
      className="x-signature"
      job="Show the signature the recipient drew on the driver's phone"
      why="The system has no image or signature component; the signature is redrawn as a vector stroke"
    >
      <svg className="x-signature__pad" viewBox="0 0 400 300" role="img" aria-label="Signature of R. Ribeiro">
        <path
          className="x-signature__ink"
          d="M48 186 C 62 120, 92 96, 98 132 C 104 170, 70 200, 82 176 C 96 148, 128 150, 122 186 C 140 160, 152 150, 164 176 C 172 194, 186 150, 198 160 C 210 172, 206 196, 222 178 C 238 160, 246 138, 252 164 C 258 190, 276 170, 290 156 C 304 144, 316 168, 332 160 C 344 154, 352 148, 360 150"
        />
        <path className="x-signature__ink" d="M118 210 C 180 204, 260 202, 340 206" />
        <line className="x-signature__line" x1="32" y1="236" x2="368" y2="236" />
        <text className="x-signature__mark" x="32" y="262">Sign above the line</text>
      </svg>
      <figcaption className="x-signature__caption">Signed by R. Ribeiro on Thu 6 Nov at 14:32. The order is addressed to Ana Ribeiro.</figcaption>
    </NewPart>
  );
}

function SendBack() {
  return (
    <Card>
      <NewPart
        name="pod-message"
        className="x-message"
        job="Write a message to the driver saying what is missing from the proof"
        why="Textarea is listed as not built; a field holds one line only"
      >
        <label className="x-message__label" htmlFor="driver-message">Message to the driver</label>
        <textarea
          className="x-message__input"
          id="driver-message"
          name="driver-message"
          aria-describedby="driver-message-hint"
          defaultValue="The photo shows the parcel on the step but no one receiving it. Please tell us who R. Ribeiro is and how they are related to Ana Ribeiro. Next time, take the photo as you hand the parcel over."
        />
        <p className="x-message__hint" id="driver-message-hint">Tiago Mendes sees this in the driver app and can reply with a note or a new photo. The customer does not see it.</p>
      </NewPart>
      <Row>
        <Button variant="secondary">Send back to driver</Button>
      </Row>
    </Card>
  );
}

export default function PodDetail() {
  return (
    <AppShell
      nav={
        <NavRail
          brand="Tolvane"
          items={[
            { label: 'Today', href: '#' },
            { label: 'Routes', href: '#', count: 18 },
            { label: 'Drivers', href: '#', count: 24 },
            { label: 'Proof of delivery', href: '#', count: 7, current: true },
            { label: 'Customers', href: '#' },
            { label: 'Settings', href: '#' },
          ]}
        />
      }
    >
      <PageHeader
        title="Proof for delivery TLV-48213"
        status={<Badge tone="warning">Disputed</Badge>}
        actions={<Button variant="primary">Accept proof</Button>}
      />

      <Banner tone="warning">
        <p>Ana Ribeiro disputed this delivery on Fri 7 Nov at 09:12: "I was not home and never received the parcel." Review the proof, then accept it or send it back to the driver.</p>
      </Banner>

      <Section title="Delivery" titleId="delivery">
        <List>
          <ListItem label="Order" value="TLV-48213 · 1 parcel, 2.4 kg" />
          <ListItem label="Recipient" value="Ana Ribeiro" />
          <ListItem label="Address" value="Rua de Arroios 27, 1150-054 Lisboa" />
          <ListItem label="Driver">
            <Row>
              <Avatar initials="TM" label="Tiago Mendes" />
              <strong>Tiago Mendes · van 12</strong>
            </Row>
          </ListItem>
          <ListItem label="Marked delivered" value="Thu 6 Nov, 14:32" />
        </List>
      </Section>

      <Grid>
        <Section title="Photo at the door" titleId="photo">
          <Card>
            <DoorPhoto />
          </Card>
        </Section>
        <Section title="Signature" titleId="signature">
          <Card>
            <SignaturePad />
          </Card>
        </Section>
        <Section title="Driver's location" titleId="location">
          <Card>
            <Stat label="Distance from the address when marked delivered" value="18 m" />
            <List>
              <ListItem label="Allowed distance" value="Up to 50 m" />
              <ListItem label="Check">
                <Badge tone="positive">Within limit</Badge>
              </ListItem>
              <ListItem label="GPS accuracy" value="± 6 m" />
              <ListItem label="Time at the address" value="3 min" />
            </List>
          </Card>
        </Section>
      </Grid>

      <Section title="Delivery steps" titleId="steps">
        <List>
          {steps.map(s => (
            <ListItem
              key={s.step}
              label={
                <span>
                  <strong>{s.step}</strong>{' '}
                  {s.tone ? <Badge tone={s.tone}>{s.tone === 'positive' ? 'Delivered' : 'Disputed'}</Badge> : null}
                  <br />
                  {s.detail}
                </span>
              }
              value={s.time}
            />
          ))}
        </List>
      </Section>

      <Section title="Send back to the driver" titleId="send-back">
        <SendBack />
      </Section>
    </AppShell>
  );
}
