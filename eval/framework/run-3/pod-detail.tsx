import {
  DetailPage, NavRail, Badge, Banner, Button, Card, Section, Stack, Grid,
  List, ListItem, Stat, Field, NewPart,
} from '../src';

export const title = 'Proof of delivery TLV-48213 — Tolvane';

export const css = `
.x-pod-photo { display: block; border: var(--border); border-radius: var(--radius); overflow: hidden; background: var(--surface-sunken); }
.x-pod-photo svg { display: block; width: 100%; height: auto; }
.x-pod-photo .x-wall { fill: var(--line); }
.x-pod-photo .x-door { fill: var(--surface); stroke: var(--muted); stroke-width: 2; }
.x-pod-photo .x-ground { fill: var(--muted); opacity: .35; }
.x-pod-photo .x-parcel { fill: var(--tint-warning); stroke: var(--warning); stroke-width: 2; }
.x-pod-photo .x-tape { stroke: var(--warning); stroke-width: 2; }
.x-pod-photo .x-knob { fill: var(--muted); }
.x-pod-caption { font: var(--type-small); color: var(--muted); margin: var(--s2) 0 0; }
.x-pod-signature { display: block; border: var(--border); border-radius: var(--radius); background: var(--surface); padding: var(--s4); color: var(--ink); }
.x-pod-signature svg { display: block; width: 100%; height: auto; max-height: 120px; }
.x-pod-signature .x-stroke { fill: none; stroke: currentColor; stroke-width: 2.5; stroke-linecap: round; stroke-linejoin: round; }
.x-pod-signature .x-baseline { stroke: var(--line); stroke-width: 1; stroke-dasharray: 4 4; }
`;

const nav = (
  <NavRail
    brand="Tolvane"
    items={[
      { label: 'Today', href: '#' },
      { label: 'Routes', href: '#' },
      { label: 'Drivers', href: '#' },
      { label: 'Proof of delivery', href: '#', count: 7, current: true },
      { label: 'Customers', href: '#' },
      { label: 'Settings', href: '#' },
    ]}
  />
);

const photo = (
  <NewPart
    name="pod-photo"
    className="x-pod-photo"
    job="Show the photo the driver took at the door"
    why="The system has no image or media component, and the screen may not load image files"
    as="figure"
    role="img"
    aria-label="Photo taken at the door: a parcel on the doorstep in front of a closed front door"
  >
    <svg viewBox="0 0 400 240" aria-hidden="true">
      <rect className="x-wall" x="0" y="0" width="400" height="200" />
      <rect className="x-door" x="150" y="40" width="100" height="160" />
      <circle className="x-knob" cx="236" cy="124" r="4" />
      <rect className="x-ground" x="0" y="200" width="400" height="40" />
      <rect className="x-parcel" x="170" y="168" width="60" height="40" />
      <line className="x-tape" x1="200" y1="168" x2="200" y2="208" />
    </svg>
  </NewPart>
);

const signature = (
  <NewPart
    name="pod-signature"
    className="x-pod-signature"
    job="Show the signature the recipient drew on the driver's phone"
    why="The system has no image or media component, and the screen may not load image files"
    as="figure"
    role="img"
    aria-label="Recipient's signature, signed as M. Okafor"
  >
    <svg viewBox="0 0 400 110" aria-hidden="true">
      <line className="x-baseline" x1="10" y1="90" x2="390" y2="90" />
      <path className="x-stroke" d="M30 80 C40 30, 55 20, 60 75 C64 40, 80 30, 88 78 C95 55, 110 52, 118 70 C126 85, 140 60, 150 62 C162 64, 158 82, 172 76 C190 66, 200 40, 214 58 C226 74, 240 70, 252 52 C262 38, 270 70, 284 66 C300 60, 320 54, 360 48" />
      <path className="x-stroke" d="M120 30 L132 34" />
    </svg>
  </NewPart>
);

const main = (
  <>
    <Banner tone="warning">
      <p>The customer disputes this delivery: "Parcel not received". Dispute opened 5 Nov 2026 at 09:12. Reply due by 8 Nov 2026, 18:00.</p>
    </Banner>

    <Section title="Photo at the door" titleId="photo">
      <Card>
        {photo}
        <p className="x-pod-caption">Taken 4 Nov 2026, 14:37 by Rui Fernandes. The house number is not in the photo.</p>
      </Card>
    </Section>

    <Section title="Signature" titleId="signature">
      <Card>
        <Stack>
          {signature}
          <List>
            <ListItem label="Signed as" value="M. Okafor" />
            <ListItem label="Relationship" value="Neighbour, flat 2B" />
            <ListItem label="Signed at" value="4 Nov 2026, 14:36" />
          </List>
        </Stack>
      </Card>
    </Section>

    <Section title="Location when marked delivered" titleId="location">
      <Grid>
        <Card>
          <Stat label="Distance from the address" value="38 m" />
        </Card>
        <Card>
          <Stat label="GPS accuracy" value="± 12 m" />
        </Card>
      </Grid>
      <Card>
        <List>
          <ListItem label="Allowed distance" value="Up to 50 m" />
          <ListItem label="Result" value={<Badge tone="positive">Within range</Badge>} />
          <ListItem label="Position recorded" value="4 Nov 2026, 14:37" />
        </List>
      </Card>
    </Section>

    <Section title="If you send it back" titleId="send-back">
      <Card>
        <Stack>
          <Field id="missing" label="What is missing" options={['House number not visible in the photo', 'Signature unclear', 'Recipient name missing', 'Other']} defaultValue="House number not visible in the photo" />
          <Field id="message" label="Message to the driver" defaultValue="Please add a photo that shows the parcel and the house number, 21 Rua das Flores." hint="Rui sees this in the driver app with the delivery. Send it with Send back to driver." />
        </Stack>
      </Card>
    </Section>
  </>
);

const aside = (
  <>
    <Section title="Delivery" titleId="delivery">
      <Card>
        <List>
          <ListItem label="Tracking number" value="TLV-48213" />
          <ListItem label="Customer" value="Ana Costa" />
          <ListItem label="Address" value="21 Rua das Flores, flat 3A, Porto" />
          <ListItem label="Driver" value="Rui Fernandes" />
          <ListItem label="Route" value="Porto North 07" />
          <ListItem label="Parcel" value="1 box, 2.4 kg" />
        </List>
      </Card>
    </Section>

    <Section title="Steps" titleId="steps">
      <Card>
        <List>
          <ListItem label="Picked up, Porto depot" value="4 Nov, 08:05" />
          <ListItem label="Out for delivery" value="4 Nov, 08:42" />
          <ListItem label="Arrived near address" value="4 Nov, 14:31" />
          <ListItem label="Signature collected" value="4 Nov, 14:36" />
          <ListItem label="Photo taken" value="4 Nov, 14:37" />
          <ListItem label="Marked delivered" value="4 Nov, 14:37" />
        </List>
      </Card>
    </Section>
  </>
);

export default function PodDetail() {
  return (
    <DetailPage
      nav={nav}
      title="Proof of delivery TLV-48213"
      status={<Badge tone="warning">Disputed</Badge>}
      actions={<>
        <Button variant="secondary">Send back to driver</Button>
        <Button variant="primary">Accept proof</Button>
      </>}
      main={main}
      aside={aside}
    />
  );
}
