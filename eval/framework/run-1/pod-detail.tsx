import {
  DetailPage, NavRail, Badge, Button, Banner, Card, Section, Row, Grid,
  List, ListItem, Stat, Avatar, Field, NewPart,
} from '../src';

export const title = 'Proof of delivery TLV-48213';

export const css = `
.x-photo { border-radius: var(--radius); overflow: hidden; }
.x-photo__img { display: block; width: 100%; height: auto; }
.x-photo__wall { fill: var(--surface-sunken); }
.x-photo__door { fill: var(--line); stroke: var(--muted); stroke-width: 2; }
.x-photo__panel { fill: none; stroke: var(--muted); stroke-width: 1.5; }
.x-photo__ground { fill: var(--line); }
.x-photo__parcel { fill: var(--surface); stroke: var(--ink); stroke-width: 2; }
.x-photo__tape { stroke: var(--muted); stroke-width: 2; }
.x-photo__number { fill: var(--ink); font: var(--type-body-strong); }
.x-photo__stamp { fill: var(--ink); font: var(--type-small); }
.x-signature__img { display: block; width: 100%; height: auto; }
.x-signature { overflow: hidden; background: var(--surface); border: var(--border); border-radius: var(--radius); }
.x-signature__line { stroke: var(--line); stroke-width: 1; }
.x-signature__ink { fill: none; stroke: var(--ink); stroke-width: 2.5; stroke-linecap: round; stroke-linejoin: round; }
.x-signature__cross { fill: var(--muted); font: var(--type-small); }
.x-message { display: flex; flex-direction: column; gap: var(--s2); }
.x-message__label { font: var(--type-body-strong); color: var(--ink); }
.x-message__input { width: 100%; min-height: 96px; padding: var(--s3); font: var(--type-body); color: var(--text); background: var(--surface); border: var(--border); border-radius: var(--radius); resize: vertical; }
.x-message__hint { font: var(--type-small); color: var(--muted); }
`;

const nav = (
  <NavRail
    brand="Tolvane"
    items={[
      { label: 'Today', href: '#today' },
      { label: 'Deliveries', href: '#deliveries' },
      { label: 'Proof of delivery', href: '#pod', count: 7, current: true },
      { label: 'Disputes', href: '#disputes', count: 3 },
      { label: 'Drivers', href: '#drivers' },
      { label: 'Settings', href: '#settings' },
    ]}
  />
);

const photo = (
  <NewPart
    name="pod-photo"
    job="Shows the photo the driver took at the door when handing over the parcel"
    why="No contract shows an image; the system has no media or image component"
    className="x-photo"
    role="img"
    aria-label="Photo at the door: a parcel on the doorstep of number 14, taken 12 Nov 2026 at 11:04"
  >
    <svg className="x-photo__img" viewBox="0 0 640 400" aria-hidden="true">
      <rect className="x-photo__wall" x="0" y="0" width="640" height="400" />
      <rect className="x-photo__door" x="230" y="40" width="180" height="300" rx="4" />
      <rect className="x-photo__panel" x="252" y="64" width="136" height="110" />
      <rect className="x-photo__panel" x="252" y="194" width="136" height="120" />
      <circle className="x-photo__tape" cx="390" cy="200" r="6" />
      <text className="x-photo__number" x="430" y="76">14</text>
      <rect className="x-photo__ground" x="0" y="340" width="640" height="60" />
      <rect className="x-photo__parcel" x="270" y="282" width="110" height="74" rx="3" />
      <line className="x-photo__tape" x1="325" y1="282" x2="325" y2="356" />
      <text className="x-photo__stamp" x="16" y="388">12/11/2026 11:04 · 38.7369, -9.1427</text>
    </svg>
  </NewPart>
);

const signature = (
  <NewPart
    name="pod-signature"
    job="Shows the signature the recipient drew on the driver's phone"
    why="No contract shows a drawn signature or any image"
    className="x-signature"
    role="img"
    aria-label="Recipient's signature, signed as M. Oliveira"
  >
    <svg className="x-signature__img" viewBox="0 0 640 180" aria-hidden="true">
      <line className="x-signature__line" x1="40" y1="140" x2="600" y2="140" />
      <text className="x-signature__cross" x="24" y="144">×</text>
      <path
        className="x-signature__ink"
        d="M70 120 C 90 60, 110 50, 115 110 C 120 70, 140 50, 150 115 C 160 90, 175 85, 180 112 M200 110 C 210 80, 240 70, 245 100 C 250 125, 215 130, 205 108 M265 112 L 280 60 M300 110 C 300 85, 330 85, 330 105 C 330 120, 300 125, 300 110 M345 112 C 355 90, 370 92, 372 112 M390 108 C 400 80, 430 80, 432 104 C 434 126, 398 128, 392 112 M450 110 C 470 90, 500 96, 520 118 C 540 100, 560 92, 590 96"
      />
    </svg>
  </NewPart>
);

const sendBackMessage = (
  <Section title="If you send it back" titleId="send-back">
    <Card>
      <Field id="missing" label="What is missing" options={['Photo does not show the door number', 'Signature is missing or unreadable', 'Marked delivered too far from the address', 'Other']} defaultValue="Marked delivered too far from the address" />
      <NewPart
        name="message-input"
        job="A multi-line message to the driver saying what is missing"
        why="The system has no textarea (rules.md, Not built)"
        base="field"
        className="x-message"
      >
        <label className="x-message__label" htmlFor="send-back-message">Message to the driver</label>
        <textarea
          className="x-message__input"
          id="send-back-message"
          name="message"
          aria-describedby="send-back-message-hint"
          defaultValue="You marked this delivered 212 m from 14 Rua das Flores. Please tell us where you left the parcel, and add a photo that shows the door number."
        />
        <p className="x-message__hint" id="send-back-message-hint">Sent with "Send back to driver". Ricardo sees it in the driver app with the delivery.</p>
      </NewPart>
    </Card>
  </Section>
);

export default function PodDetail() {
  return (
    <DetailPage
        nav={nav}
        title="Proof of delivery TLV-48213"
        status={<Badge tone="warning">Awaiting review</Badge>}
        actions={
          <>
            <Button variant="secondary">Send back to driver</Button>
            <Button variant="primary">Accept proof</Button>
          </>
        }
        main={
          <>
            <Banner tone="warning">
              The customer disputes this delivery: "I was home all morning and nobody came to the door." Opened 12 Nov at 14:20.
            </Banner>

            <Section title="Photo at the door" titleId="photo">
              <Card>
                {photo}
                <List>
                  <ListItem label="Taken" value="12 Nov 2026, 11:04" />
                  <ListItem label="Left at" value="Front door, on the step" />
                </List>
              </Card>
            </Section>

            <Section title="Signature" titleId="signature">
              <Card>
                {signature}
                <List>
                  <ListItem label="Signed by" value="M. Oliveira" />
                  <ListItem label="Signed" value="12 Nov 2026, 11:05" />
                </List>
              </Card>
            </Section>

            <Section title="Distance from the address" titleId="distance">
              <Card>
                <Row>
                  <Badge tone="critical">Outside the allowed distance</Badge>
                </Row>
                <Grid>
                  <Stat label="When marked delivered" value="212 m" />
                  <Stat label="Allowed distance" value="50 m" />
                  <Stat label="GPS accuracy" value="±15 m" />
                </Grid>
                <List>
                  <ListItem label="Address" value="14 Rua das Flores, 1200-195 Lisboa" />
                  <ListItem label="Driver's position" value="Rua do Século 31, 38.7369, -9.1427" />
                </List>
              </Card>
            </Section>

            {sendBackMessage}
          </>
        }
        aside={
          <>
            <Section title="Delivery" titleId="delivery">
              <Card>
                <List>
                  <ListItem label="Order" value="ORD-772041" />
                  <ListItem label="Customer" value="Marta Oliveira" />
                  <ListItem label="Parcel" value="1 box, 2.4 kg" />
                  <ListItem label="Route" value="LIS-07, stop 18 of 34" />
                  <ListItem label="Vehicle" value="Van 22-RT-81" />
                </List>
              </Card>
            </Section>

            <Section title="Driver" titleId="driver">
              <Card>
                <List>
                  <ListItem label={<Row><Avatar initials="RS" /><span>Ricardo Santos</span></Row>} value="Since 2023" />
                  <ListItem label="Proofs sent back, 30 days" value="2 of 412" />
                </List>
              </Card>
            </Section>

            <Section title="Steps" titleId="steps">
              <Card>
                <List>
                  <ListItem label="Picked up at Lisboa depot" value="07:42" />
                  <ListItem label="Out for delivery" value="08:15" />
                  <ListItem label="Arrived near the address" value="11:01" />
                  <ListItem label="Photo taken" value="11:04" />
                  <ListItem label="Signature collected" value="11:05" />
                  <ListItem label="Marked delivered" value="11:05" />
                  <ListItem label="Customer opened a dispute" value="14:20" />
                </List>
              </Card>
            </Section>
          </>
        }
    />
  );
}
