import {
  DetailPage, NavRail, Badge, Banner, Button, Card, Section, Stack, Row, Grid,
  List, ListItem, Stat, Avatar, NewPart, Field, Checkbox,
} from '../src';

export const title = 'Proof of delivery TLV-48213 · Tolvane';

export const css = `
.x-photo { display: flex; flex-direction: column; gap: var(--s3); margin: 0; }
.x-photo__scene { position: relative; width: 100%; aspect-ratio: 4 / 3; background: var(--line); border-radius: var(--radius); overflow: hidden; }
.x-photo__wall { position: absolute; inset: 0 0 18% 0; background: var(--surface-sunken); }
.x-photo__door { position: absolute; left: 30%; width: 34%; top: 8%; bottom: 18%; background: var(--muted); border-radius: var(--radius) var(--radius) 0 0; }
.x-photo__number { position: absolute; top: var(--s4); left: 0; right: 0; text-align: center; font: var(--type-heading); color: var(--surface); }
.x-photo__handle { position: absolute; right: 12%; top: 52%; width: var(--s2); height: var(--s2); border-radius: var(--radius-pill); background: var(--surface); }
.x-photo__step { position: absolute; left: 22%; width: 50%; bottom: 12%; height: 6%; background: var(--text); }
.x-photo__parcel { position: absolute; left: 36%; width: 18%; bottom: 18%; height: 16%; background: var(--tint-warning); border: 1px solid var(--warning); border-radius: var(--s1); }
.x-photo__stamp { position: absolute; left: var(--s3); bottom: var(--s3); padding: var(--s1) var(--s2); border-radius: var(--radius); background: var(--ink); color: var(--surface); font: var(--type-small); }
.x-photo__caption { font: var(--type-small); color: var(--muted); }
.x-signature { display: flex; flex-direction: column; gap: var(--s3); }
.x-signature__pad { background: var(--surface-sunken); border: var(--border); border-radius: var(--radius); padding: var(--s4); }
.x-signature__pad svg { display: block; width: 100%; height: auto; max-height: 140px; }
.x-signature__stroke { fill: none; stroke: var(--ink); stroke-width: 2.5; stroke-linecap: round; stroke-linejoin: round; }
.x-signature__line { stroke: var(--line); stroke-width: 1; }
.x-signature__caption { font: var(--type-small); color: var(--muted); }
`;

const nav = (
  <NavRail
    brand="Tolvane"
    items={[
      { label: 'Today', href: '#' },
      { label: 'Deliveries', href: '#' },
      { label: 'Proof of delivery', href: '#', count: 7, current: true },
      { label: 'Drivers', href: '#', count: 24 },
      { label: 'Routes', href: '#' },
      { label: 'Depots', href: '#' },
    ]}
  />
);

const main = (
  <>
    <Banner tone="warning">
      <p>
        The customer disputes this delivery: "Nothing was left at my door on Tuesday." Opened by Hannah Leclerc on
        12 Nov at 09:14. Reply due by 14 Nov.
      </p>
    </Banner>

    <Section title="Photo at the door" titleId="photo">
      <Card>
        <NewPart
          as="figure"
          name="pod-photo"
          className="x-photo"
          job="Show the photo the driver took at the door, with its time stamp"
          why="The system has no image or media component"
        >
          <div className="x-photo__scene" role="img" aria-label="Brown parcel on the doorstep of a grey front door with the number 14, taken 11 Nov at 14:31">
            <div className="x-photo__wall" />
            <div className="x-photo__door">
              <span className="x-photo__number" aria-hidden="true">14</span>
              <span className="x-photo__handle" />
            </div>
            <div className="x-photo__step" />
            <div className="x-photo__parcel" />
            <span className="x-photo__stamp" aria-hidden="true">11 Nov 2026, 14:31</span>
          </div>
          <figcaption className="x-photo__caption">
            Parcel on the doorstep of 14 Aldwick Road. The house number is visible on the door.
          </figcaption>
        </NewPart>
        <List>
          <ListItem label="Taken" value="11 Nov 2026, 14:31" />
          <ListItem label="Taken by" value="Tomasz Wilk" />
          <ListItem label="Parcel label in photo" value={<Badge tone="warning">Not readable</Badge>} />
        </List>
      </Card>
    </Section>

    <Grid>
      <Section title="Signature" titleId="signature">
        <Card>
          <NewPart
            name="pod-signature"
            className="x-signature"
            job="Show the recipient's signature as it was drawn on the driver's phone"
            why="The system has no image or media component"
          >
            <div className="x-signature__pad">
              <svg viewBox="0 0 300 110" role="img" aria-label="Handwritten signature, M. Okafor">
                <line className="x-signature__line" x1="10" y1="88" x2="290" y2="88" />
                <path className="x-signature__stroke" d="M22 74 C 30 30, 38 24, 42 60 C 46 30, 56 22, 60 70 C 66 52, 72 48, 80 62 C 84 70, 92 64, 96 54" />
                <path className="x-signature__stroke" d="M108 66 C 112 58, 126 52, 128 62 C 130 74, 112 76, 110 66 C 120 56, 140 50, 146 60 L 150 40 L 152 68 C 160 52, 168 56, 172 66 C 178 50, 190 52, 194 64 C 200 56, 206 54, 212 60 C 220 70, 236 46, 252 52 C 262 56, 270 50, 278 44" />
              </svg>
            </div>
            <p className="x-signature__caption">Signed on the driver's phone at 14:31</p>
          </NewPart>
          <List>
            <ListItem label="Name given" value="M. Okafor" />
            <ListItem label="Relationship" value="Neighbour at no. 16" />
          </List>
        </Card>
      </Section>

      <Section title="Distance from the address" titleId="distance">
        <Card>
          <Stat label="When marked delivered" value="38 m" />
          <List>
            <ListItem label="Allowed distance" value="50 m" />
            <ListItem label="GPS accuracy" value="± 6 m" />
            <ListItem label="Result" value={<Badge tone="positive">Within range</Badge>} />
          </List>
        </Card>
      </Section>
    </Grid>

    <Section title="If you send it back" titleId="send-back">
      <Card>
        <p>Tick what is missing and write to the driver. Send back to driver, at the top of the page, sends this message to the driver app.</p>
        <Stack>
          <Checkbox label="Parcel label not readable in the photo" defaultChecked />
          <Checkbox label="Signature missing or unclear" />
          <Checkbox label="Too far from the address" />
          <Field
            id="send-back-message"
            label="Message to Tomasz Wilk"
            defaultValue="Please add a close photo of the parcel label left with the neighbour at no. 16."
            hint="The driver sees this with the proof and adds to it"
          />
        </Stack>
      </Card>
    </Section>
  </>
);

const steps: [string, string][] = [
  ['Picked up at Leeds South depot', '11 Nov, 07:48'],
  ['Loaded on van YK72 RPZ', '11 Nov, 08:02'],
  ['Out for delivery, stop 31 of 42', '11 Nov, 08:15'],
  ['Arrived on Aldwick Road', '11 Nov, 14:29'],
  ['Photo taken', '11 Nov, 14:31'],
  ['Signature collected', '11 Nov, 14:31'],
  ['Marked delivered', '11 Nov, 14:32'],
  ['Customer opened a dispute', '12 Nov, 09:14'],
];

const aside = (
  <>
    <Section title="Delivery" titleId="delivery">
      <List>
        <ListItem label="Parcel" value="TLV-48213" />
        <ListItem label="Recipient" value="Hannah Leclerc" />
        <ListItem label="Address" value="14 Aldwick Road, Leeds LS8 2QT" />
        <ListItem label="Instructions" value="Leave with a neighbour if out" />
        <ListItem label="Route" value="LS-South 07" />
      </List>
    </Section>

    <Section title="Driver" titleId="driver">
      <List>
        <ListItem>
          <Row><Avatar initials="TW" /><span>Tomasz Wilk</span></Row>
          <strong>07700 900418</strong>
        </ListItem>
        <ListItem label="Proofs sent back, last 30 days" value="1" />
      </List>
    </Section>

    <Section title="Steps" titleId="steps">
      <List>
        {steps.map(([step, time]) => <ListItem key={step} label={step} value={time} />)}
      </List>
    </Section>
  </>
);

export default function PodDetail() {
  return (
    <DetailPage
        nav={nav}
        title="Proof of delivery TLV-48213"
        status={<Badge tone="warning">Disputed</Badge>}
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
