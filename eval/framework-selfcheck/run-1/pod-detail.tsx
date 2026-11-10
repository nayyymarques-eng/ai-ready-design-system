import { DetailPage, NavRail, Badge, Banner, Button, Card, Section, Stack, List, ListItem, Stat, NewPart } from '../src';

export const title = 'Proof of delivery TLV-48213';

export const css = `
.x-photo { display: flex; flex-direction: column; gap: var(--s2); margin: 0; }
.x-photo__frame { display: block; width: 100%; height: auto; border-radius: var(--radius); background: var(--surface-sunken); }
.x-photo__wall { fill: var(--surface-sunken); }
.x-photo__door { fill: var(--line); stroke: var(--muted); stroke-width: 2; }
.x-photo__detail { fill: none; stroke: var(--muted); stroke-width: 2; }
.x-photo__number { fill: var(--ink); font: var(--type-heading); }
.x-photo__step { fill: var(--line); }
.x-photo__parcel { fill: var(--surface); stroke: var(--ink); stroke-width: 2; }
.x-photo__tape { fill: none; stroke: var(--muted); stroke-width: 2; }
.x-photo__label { fill: var(--ink); }
.x-photo__caption { font: var(--type-small); color: var(--muted); }
.x-signature { display: flex; flex-direction: column; gap: var(--s2); margin: 0; }
.x-signature__pad { display: block; width: 100%; height: auto; background: var(--surface); border: var(--border); border-radius: var(--radius); }
.x-signature__ink { fill: none; stroke: var(--ink); stroke-width: 2.5; stroke-linecap: round; stroke-linejoin: round; }
.x-signature__line { stroke: var(--line); stroke-width: 1; }
.x-signature__caption { font: var(--type-small); color: var(--muted); }
.x-message { display: flex; flex-direction: column; gap: var(--s1); }
.x-message__label { font: var(--type-body-strong); color: var(--ink); }
.x-message__input { width: 100%; min-height: 120px; padding: var(--s2) var(--s3); border: var(--border); border-radius: var(--radius); background: var(--surface); font: var(--type-body); color: var(--ink); resize: vertical; }
.x-message__hint { font: var(--type-small); color: var(--muted); }
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

function DoorPhoto() {
  return (
    <NewPart
      name="pod-photo"
      as="figure"
      className="x-photo"
      job="Show the photo the driver took at the door"
      why="The system has no image or media component"
    >
      <svg className="x-photo__frame" viewBox="0 0 640 400" role="img" aria-label="Photo: a brown parcel on the doorstep of a green front door, house number 14">
        <rect className="x-photo__wall" x="0" y="0" width="640" height="400" />
        <rect className="x-photo__door" x="220" y="40" width="200" height="300" rx="4" />
        <rect className="x-photo__detail" x="245" y="70" width="150" height="100" rx="2" />
        <rect className="x-photo__detail" x="245" y="190" width="150" height="120" rx="2" />
        <circle className="x-photo__detail" cx="395" cy="200" r="7" />
        <text className="x-photo__number" x="460" y="80">14</text>
        <rect className="x-photo__step" x="180" y="340" width="280" height="24" rx="2" />
        <rect className="x-photo__parcel" x="270" y="270" width="110" height="70" rx="3" />
        <path className="x-photo__tape" d="M325 270 V340 M270 300 H380" />
        <rect className="x-photo__label" x="340" y="310" width="30" height="18" rx="2" />
      </svg>
      <figcaption className="x-photo__caption">Taken 9 Nov, 14:07 by Rui Almeida. Parcel left on the doorstep at the front door, label facing up.</figcaption>
    </NewPart>
  );
}

function SignatureImage() {
  return (
    <NewPart
      name="pod-signature"
      as="figure"
      className="x-signature"
      job="Show the recipient's signature as drawn on the driver's phone"
      why="The system has no image or signature component"
    >
      <svg className="x-signature__pad" viewBox="0 0 640 180" role="img" aria-label="Signature of M. Ferreira">
        <line className="x-signature__line" x1="40" y1="140" x2="600" y2="140" />
        <path className="x-signature__ink" d="M70 120 C80 60, 95 50, 100 110 C104 70, 118 55, 125 115 C130 85, 140 80, 150 112 C165 90, 175 95, 180 105 C200 70, 230 60, 220 110 C215 130, 245 95, 260 100 C280 104, 290 80, 300 95 C315 115, 330 85, 345 100 C360 112, 380 70, 395 92 C410 110, 430 96, 450 98 C480 100, 520 86, 560 80" />
        <path className="x-signature__ink" d="M110 135 C200 128, 330 126, 470 120" />
      </svg>
      <figcaption className="x-signature__caption">Signed on the driver's phone at 14:08.</figcaption>
    </NewPart>
  );
}

function SendBackMessage() {
  return (
    <NewPart
      name="message-field"
      base="field"
      className="x-message"
      job="A multi-line message to the driver, sent with Send back to driver"
      why="Textarea is listed as not built in the rules"
    >
      <label className="x-message__label" htmlFor="message">Message to the driver</label>
      <textarea
        className="x-message__input"
        id="message"
        aria-describedby="message-hint"
        defaultValue="The photo shows the parcel on a doorstep, but the customer says it is not their door. Please add a photo that shows the house number and the parcel together, and the name of the person who signed."
      />
      <p className="x-message__hint" id="message-hint">Rui sees this in the driver app with the delivery. Say what is missing.</p>
    </NewPart>
  );
}

export default function PodDetail() {
  return (
    <DetailPage
      nav={nav}
      title="Delivery TLV-48213"
      status={<Badge tone="warning">Disputed</Badge>}
      actions={
        <>
          <Button variant="secondary">Send back to driver</Button>
          <Button variant="primary">Accept proof</Button>
        </>
      }
      main={
        <>
          <Banner tone="warning">
            <p>Marta Ferreira disputed this delivery on 9 Nov at 19:42: "I was home all afternoon and nothing was left at my door." Review the proof and reply by 11 Nov.</p>
          </Banner>
          <Section title="Photo at the door" titleId="photo">
            <Card>
              <DoorPhoto />
            </Card>
          </Section>
          <Section title="Signature" titleId="signature">
            <Card>
              <SignatureImage />
              <List>
                <ListItem label="Signed by" value="M. Ferreira" />
                <ListItem label="Relationship" value="Recipient" />
              </List>
            </Card>
          </Section>
          <Section title="Send back to driver" titleId="send-back">
            <Card>
              <SendBackMessage />
            </Card>
          </Section>
        </>
      }
      aside={
        <>
          <Section title="Location check" titleId="location">
            <Card>
              <Stack>
                <Stat label="Distance from address when marked delivered" value="38 m" />
                <List>
                  <ListItem label="Allowed distance" value="100 m" />
                  <ListItem label="GPS accuracy" value="± 12 m" />
                  <ListItem label="Result"><Badge tone="positive">Within range</Badge></ListItem>
                </List>
              </Stack>
            </Card>
          </Section>
          <Section title="Delivery" titleId="delivery">
            <List>
              <ListItem label="Customer" value="Marta Ferreira" />
              <ListItem label="Address" value="Rua das Flores 14, 4050-262 Porto" />
              <ListItem label="Parcel" value="1 box, 2.4 kg" />
              <ListItem label="Driver" value="Rui Almeida" />
              <ListItem label="Route" value="Porto Centro 3" />
              <ListItem label="Vehicle" value="Van 27-QX-81" />
            </List>
          </Section>
          <Section title="Steps" titleId="steps">
            <List>
              <ListItem label="Picked up at Maia depot" value="9 Nov, 08:12" />
              <ListItem label="Loaded on van" value="9 Nov, 08:31" />
              <ListItem label="Out for delivery" value="9 Nov, 09:05" />
              <ListItem label="Arrived at address" value="9 Nov, 14:05" />
              <ListItem label="Photo and signature taken" value="9 Nov, 14:08" />
              <ListItem label="Marked delivered" value="9 Nov, 14:08" />
            </List>
          </Section>
        </>
      }
    />
  );
}
