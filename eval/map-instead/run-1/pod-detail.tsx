import {
  DetailPage, NavRail, Badge, Button, Section, Card, Grid, Stat, List, ListItem,
  Banner, Field, NewPart,
} from '../src';

export const title = 'Proof of delivery TLV-48213 — Tolvane';

export const css = `
.x-photo { display: flex; flex-direction: column; gap: var(--s3); }
.x-photo__frame { position: relative; aspect-ratio: 4 / 3; background: var(--surface-sunken); border: var(--border); border-radius: var(--radius); overflow: hidden; }
.x-photo__frame svg { display: block; width: 100%; height: 100%; }
.x-photo__wall { fill: var(--line); }
.x-photo__ground { fill: var(--muted); opacity: .35; }
.x-photo__door { fill: var(--surface); stroke: var(--muted); stroke-width: 2; }
.x-photo__panel { fill: none; stroke: var(--line); stroke-width: 2; }
.x-photo__knob { fill: var(--muted); }
.x-photo__number { fill: var(--ink); font: var(--type-heading); }
.x-photo__mat { fill: var(--muted); opacity: .6; }
.x-photo__box { fill: var(--surface-sunken); stroke: var(--text); stroke-width: 2; }
.x-photo__tape { stroke: var(--muted); stroke-width: 4; }
.x-photo__label { fill: var(--surface); stroke: var(--text); stroke-width: 1.5; }
.x-photo__meta { font: var(--type-small); color: var(--muted); margin: 0; }

.x-signature { display: flex; flex-direction: column; gap: var(--s3); }
.x-signature__pad { background: var(--surface); border: var(--border); border-radius: var(--radius); padding: var(--s4); }
.x-signature__pad svg { display: block; width: 100%; height: auto; max-height: 120px; }
.x-signature__stroke { fill: none; stroke: var(--ink); stroke-width: 2.5; stroke-linecap: round; stroke-linejoin: round; }
.x-signature__base { stroke: var(--line); stroke-width: 1.5; }
.x-signature__meta { font: var(--type-small); color: var(--muted); margin: 0; }
`;

const nav = (
  <NavRail
    brand="Tolvane"
    items={[
      { label: 'Today', href: '#' },
      { label: 'Routes', href: '#' },
      { label: 'Drivers', href: '#', count: 24 },
      { label: 'Disputes', href: '#', count: 7, current: true },
      { label: 'Customers', href: '#' },
      { label: 'Settings', href: '#' },
    ]}
  />
);

const photo = (
  <NewPart
    name="pod-photo"
    className="x-photo"
    job="Show the photo the driver took at the door, with when and where it was taken"
    why="The system has no image or media component, and the screen may not load image files, so the photo is a drawn stand-in"
    as="figure"
  >
    <div className="x-photo__frame">
      <svg viewBox="0 0 400 300" role="img" aria-label="Photo taken at the door: a brown parcel on the doormat in front of a white front door numbered 14">
        <rect className="x-photo__wall" x="0" y="0" width="400" height="250" />
        <rect className="x-photo__ground" x="0" y="250" width="400" height="50" />
        <rect className="x-photo__door" x="130" y="40" width="140" height="210" />
        <rect className="x-photo__panel" x="148" y="60" width="104" height="70" />
        <rect className="x-photo__panel" x="148" y="146" width="104" height="88" />
        <circle className="x-photo__knob" cx="252" cy="150" r="6" />
        <text className="x-photo__number" x="200" y="30" textAnchor="middle">14</text>
        <rect className="x-photo__mat" x="120" y="250" width="160" height="22" />
        <rect className="x-photo__box" x="160" y="196" width="84" height="62" />
        <line className="x-photo__tape" x1="202" y1="196" x2="202" y2="258" />
        <rect className="x-photo__label" x="170" y="212" width="24" height="16" />
      </svg>
    </div>
    <figcaption className="x-photo__meta">Taken 14:32 on 10 Nov 2026 by Marco Ferreira · 1 of 1 photo · Parcel left on the doormat at the front door</figcaption>
  </NewPart>
);

const signature = (
  <NewPart
    name="pod-signature"
    className="x-signature"
    job="Show the recipient's signature as it was drawn on the driver's phone"
    why="The system has no component for a captured signature, and the screen may not load image files"
    as="figure"
  >
    <div className="x-signature__pad">
      <svg viewBox="0 0 360 110" role="img" aria-label="Signature of the recipient, a handwritten scrawl reading roughly 'H. Okafor'">
        <line className="x-signature__base" x1="12" y1="92" x2="348" y2="92" />
        <path className="x-signature__stroke" d="M28 78 C 34 50, 40 30, 44 22 C 46 40, 44 64, 42 82 M30 56 C 46 52, 62 50, 76 50 M78 22 C 76 46, 74 66, 72 84 M96 80 a2 2 0 1 0 0.1 0" />
        <path className="x-signature__stroke" d="M126 60 C 112 40, 140 32, 150 52 C 158 74, 128 86, 122 66 C 118 52, 140 44, 160 58 C 170 66, 172 40, 176 28 C 178 50, 176 70, 178 82 C 184 64, 196 56, 204 70 M182 66 C 190 72, 196 80, 206 84" />
        <path className="x-signature__stroke" d="M214 54 C 202 70, 214 86, 228 74 C 238 62, 226 46, 214 54 M246 56 C 244 70, 244 80, 246 84 C 248 66, 256 54, 268 56 M270 40 C 276 36, 284 36, 288 40" />
        <path className="x-signature__stroke" d="M292 72 C 300 66, 316 62, 340 58" />
      </svg>
    </div>
    <figcaption className="x-signature__meta">Signed 14:31 on 10 Nov 2026 · Printed name: Helen Okafor</figcaption>
  </NewPart>
);

const main = (
  <>
    <Banner tone="warning">
      <p>The customer says this parcel never arrived (dispute D-1187, opened 11 Nov 2026 at 09:05). Check the proof below, then accept it or send it back to the driver.</p>
    </Banner>

    <Section title="Photo at the door" titleId="photo">
      <Card>{photo}</Card>
    </Section>

    <Section title="Recipient's signature" titleId="signature">
      <Card>{signature}</Card>
    </Section>

    <Section title="Where the driver was" titleId="location">
      <Card>
        <Grid>
          <Stat label="Distance from the address when marked delivered" value="38 m" />
          <Stat label="Allowed distance" value="100 m" />
        </Grid>
        <List>
          <ListItem label="Result" value={<Badge tone="positive">Within range</Badge>} />
          <ListItem label="Delivery address" value="14 Larkfield Road, Leeds LS6 2QA" />
          <ListItem label="Driver's position" value="53.8195° N, 1.5764° W" />
          <ListItem label="GPS accuracy" value="± 6 m" />
          <ListItem label="Marked delivered" value="14:32, 10 Nov 2026" />
        </List>
      </Card>
    </Section>

    <Section title="Message to the driver" titleId="message">
      <Card>
        <Field
          id="send-back-message"
          label="What is missing"
          defaultValue="The house number isn't readable in the photo. Please add a photo that shows the parcel and the door number."
          hint="Sent to Marco Ferreira's driver app when you send the proof back. The dispute stays open until he replies."
        />
      </Card>
    </Section>
  </>
);

const aside = (
  <>
    <Section title="Delivery" titleId="delivery">
      <List>
        <ListItem label="Tracking number" value="TLV-48213" />
        <ListItem label="Customer" value="Northwind Home Goods" />
        <ListItem label="Recipient" value="Helen Okafor" />
        <ListItem label="Driver" value="Marco Ferreira" />
        <ListItem label="Route" value="LS-07, stop 18 of 42" />
        <ListItem label="Parcel" value="1 box, 2.4 kg" />
      </List>
    </Section>

    <Section title="Steps" titleId="steps">
      <List>
        <ListItem label="Picked up at Leeds depot" value="07:48" />
        <ListItem label="Loaded on van YK72 RFO" value="08:05" />
        <ListItem label="Out for delivery" value="08:21" />
        <ListItem label="Arrived at the address" value="14:29" />
        <ListItem label="Signature taken" value="14:31" />
        <ListItem label="Photo taken" value="14:32" />
        <ListItem label="Marked delivered" value="14:32" />
      </List>
    </Section>

    <Section title="Dispute" titleId="dispute">
      <List>
        <ListItem label="Reference" value="D-1187" />
        <ListItem label="Opened" value="09:05, 11 Nov 2026" />
        <ListItem label="Reason" value="Not received" />
        <ListItem label="Raised by" value="Northwind Home Goods" />
      </List>
    </Section>
  </>
);

export default function PodDetail() {
  return (
    <DetailPage
      nav={nav}
      title="Proof of delivery TLV-48213"
      status={<Badge tone="warning">Needs review</Badge>}
      actions={
        <>
          <Button variant="secondary">Send back to driver</Button>
          <Button variant="primary">Accept proof</Button>
        </>
      }
      main={main}
      aside={aside}
    />
  );
}
