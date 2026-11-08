import {
  AppShell, NavRail, PageHeader, Banner, Badge, Button, Card, Checkbox,
  Section, Stack, Row, Grid, List, ListItem, Stat, NewPart,
} from '../src';

export const title = 'Proof of delivery TLV-48213 — Tolvane';

export const css = `
.x-photo { display: flex; flex-direction: column; gap: var(--s2); margin: 0; }
.x-photo__frame { display: block; width: 100%; height: auto; border: var(--border); border-radius: var(--radius); background: var(--surface-sunken); }
.x-photo__caption { font: var(--type-small); color: var(--muted); }
.x-photo__wall { fill: var(--tint-warning); }
.x-photo__ground { fill: var(--line); }
.x-photo__door { fill: var(--surface); stroke: var(--muted); stroke-width: 2; }
.x-photo__panel { fill: none; stroke: var(--line); stroke-width: 2; }
.x-photo__handle { fill: var(--muted); }
.x-photo__number { fill: var(--ink); font: var(--type-body-strong); }
.x-photo__mat { fill: var(--muted); opacity: .35; }
.x-photo__parcel { fill: var(--tint-warning); stroke: var(--warning); stroke-width: 2; }
.x-photo__tape { stroke: var(--warning); stroke-width: 2; }
.x-photo__label { fill: var(--surface); stroke: var(--muted); stroke-width: 1; }
.x-photo__stamp { fill: var(--ink); font: var(--type-small); }

.x-signature { display: flex; flex-direction: column; gap: var(--s2); margin: 0; }
.x-signature__pad { display: block; width: 100%; height: auto; border: var(--border); border-radius: var(--radius); background: var(--surface); }
.x-signature__ink { fill: none; stroke: var(--ink); stroke-width: 2.5; stroke-linecap: round; stroke-linejoin: round; }
.x-signature__line { stroke: var(--line); stroke-width: 1; }
.x-signature__mark { fill: var(--muted); font: var(--type-small); }
.x-signature__caption { font: var(--type-small); color: var(--muted); }

.x-message { display: flex; flex-direction: column; gap: var(--s1); }
.x-message__label { font: var(--type-body-strong); color: var(--ink); }
.x-message__input { min-height: 96px; padding: var(--s2) var(--s3); border: var(--border); border-radius: var(--radius); background: var(--surface); font: var(--type-body); color: var(--ink); width: 100%; resize: vertical; }
.x-message__hint { font: var(--type-small); color: var(--muted); }
`;

const steps: { step: string; detail: string; time: string }[] = [
  { step: 'Picked up', detail: 'Leeds North depot, bay 4', time: 'Thu 6 Nov, 07:42' },
  { step: 'Out for delivery', detail: 'Route LN-12, stop 18 of 31', time: 'Thu 6 Nov, 08:15' },
  { step: 'Arrived near address', detail: 'Van parked on Harrow Road', time: 'Thu 6 Nov, 11:03' },
  { step: 'Photo taken', detail: 'Front door, parcel on mat', time: 'Thu 6 Nov, 11:05' },
  { step: 'Signature collected', detail: 'Signed by "J. Okafor"', time: 'Thu 6 Nov, 11:05' },
  { step: 'Marked delivered', detail: '38 m from the address', time: 'Thu 6 Nov, 11:06' },
];

export default function PodDetail() {
  return (
    <AppShell
      nav={
        <NavRail
          brand="Tolvane"
          items={[
            { label: 'Today', href: '#' },
            { label: 'Deliveries', href: '#', count: 412 },
            { label: 'Proof of delivery', href: '#', count: 7, current: true },
            { label: 'Drivers', href: '#', count: 24 },
            { label: 'Routes', href: '#' },
            { label: 'Customers', href: '#' },
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
        <p>
          The customer disputed this delivery on Fri 7 Nov at 09:20: "Parcel never arrived, nobody at home signed for it."
          Review the proof below, then accept it or send it back to the driver.
        </p>
      </Banner>

      <Grid>
        <Section title="Photo at the door" titleId="photo">
          <Card>
            <NewPart
              name="pod-photo"
              className="x-photo"
              as="figure"
              job="Show the photo the driver took at the door"
              why="The system has no image or media component"
            >
              <svg className="x-photo__frame" viewBox="0 0 320 240" role="img" aria-label="Photo: a parcel on the doormat in front of a white front door numbered 14">
                <rect className="x-photo__wall" x="0" y="0" width="320" height="196" />
                <rect className="x-photo__ground" x="0" y="196" width="320" height="44" />
                <rect className="x-photo__door" x="104" y="28" width="112" height="168" />
                <rect className="x-photo__panel" x="120" y="46" width="80" height="56" />
                <rect className="x-photo__panel" x="120" y="114" width="80" height="64" />
                <circle className="x-photo__handle" cx="202" cy="110" r="4" />
                <text className="x-photo__number" x="160" y="22" textAnchor="middle">14</text>
                <rect className="x-photo__mat" x="92" y="198" width="136" height="20" />
                <rect className="x-photo__parcel" x="128" y="166" width="64" height="44" />
                <line className="x-photo__tape" x1="160" y1="166" x2="160" y2="210" />
                <rect className="x-photo__label" x="136" y="176" width="18" height="12" />
                <text className="x-photo__stamp" x="312" y="232" textAnchor="end">06/11 11:05</text>
              </svg>
              <figcaption className="x-photo__caption">Taken by Marek Novak, Thu 6 Nov at 11:05, 36 m from the address</figcaption>
            </NewPart>
            <List>
              <ListItem label="Parcel visible" value={<Badge tone="positive">Yes</Badge>} />
              <ListItem label="House number visible" value={<Badge tone="positive">Yes</Badge>} />
            </List>
          </Card>
        </Section>

        <Section title="Recipient's signature" titleId="signature">
          <Card>
            <NewPart
              name="pod-signature"
              className="x-signature"
              as="figure"
              job="Show the signature collected on the driver's phone"
              why="The system has no image or media component"
            >
              <svg className="x-signature__pad" viewBox="0 0 320 140" role="img" aria-label="Handwritten signature reading J. Okafor">
                <line className="x-signature__line" x1="24" y1="108" x2="296" y2="108" />
                <text className="x-signature__mark" x="24" y="128">Sign above</text>
                <path className="x-signature__ink" d="M58 52 C 62 74, 60 96, 46 100 C 36 103, 32 92, 40 86" />
                <path className="x-signature__ink" d="M70 98 l2 0" />
                <path className="x-signature__ink" d="M104 70 C 86 70, 84 100, 102 100 C 120 100, 122 70, 104 70" />
                <path className="x-signature__ink" d="M130 50 L 128 100 M 128 84 L 146 68 M 134 80 L 150 100" />
                <path className="x-signature__ink" d="M176 78 C 160 72, 156 100, 172 98 C 182 96, 184 80, 180 76 L 184 100" />
                <path className="x-signature__ink" d="M210 100 C 206 80, 208 54, 222 52 M 198 76 L 222 74" />
                <path className="x-signature__ink" d="M244 76 C 230 76, 230 100, 244 100 C 258 100, 258 76, 244 76" />
                <path className="x-signature__ink" d="M266 100 C 266 86, 270 76, 284 78" />
              </svg>
              <figcaption className="x-signature__caption">Collected on the driver's phone, Thu 6 Nov at 11:05</figcaption>
            </NewPart>
            <List>
              <ListItem label="Name typed by recipient" value="J. Okafor" />
              <ListItem label="Name on the order" value="Joy Okafor" />
            </List>
          </Card>
        </Section>

        <Section title="Location when marked delivered" titleId="location">
          <Card>
            <Row>
              <Stat label="Distance from the address" value="38 m" />
              <Badge tone="positive">Within 50 m limit</Badge>
            </Row>
            <List>
              <ListItem label="GPS accuracy" value="± 6 m" />
              <ListItem label="Marked delivered" value="Thu 6 Nov, 11:06" />
              <ListItem label="Address" value="14 Harrow Road, Leeds LS7 3QD" />
            </List>
          </Card>
        </Section>
      </Grid>

      <Grid>
        <Section title="Delivery steps" titleId="steps">
          <List>
            {steps.map(s => (
              <ListItem key={s.step} label={<span><strong>{s.step}</strong><br />{s.detail}</span>} value={s.time} />
            ))}
          </List>
        </Section>

        <Section title="Delivery details" titleId="details">
          <List>
            <ListItem label="Customer" value="Joy Okafor" />
            <ListItem label="Order" value="Brightwell Home, #BH-90317" />
            <ListItem label="Parcel" value="1 box, 4.2 kg" />
            <ListItem label="Driver" value="Marek Novak" />
            <ListItem label="Route" value="LN-12, stop 18 of 31" />
            <ListItem label="Delivery note" value="Leave on doorstep if out" />
          </List>
        </Section>
      </Grid>

      <Section title="Send back to the driver" titleId="send-back">
        <Card>
          <p>If the proof is not enough, send it back to Marek Novak. He sees your message in the driver app and can add proof until Mon 10 Nov, 18:00.</p>
          <Stack>
            <Checkbox label="Photo does not show the house number" />
            <Checkbox label="Signature name does not match the order" defaultChecked />
            <Checkbox label="Too far from the address" />
          </Stack>
          <NewPart
            name="message-field"
            className="x-message"
            base="field"
            job="Let the reviewer write a multi-line message to the driver"
            why="The field contract has only one-line inputs and selects; textarea is listed as not built"
          >
            <label className="x-message__label" htmlFor="driver-message">Message to the driver</label>
            <textarea
              className="x-message__input"
              id="driver-message"
              aria-describedby="driver-message-hint"
              defaultValue={'The customer says nobody signed for this parcel. The signature reads "J. Okafor" but no first name was given. Please confirm who you handed it to and add a photo of the parcel with the door number in frame, if you still have one.'}
            />
            <p className="x-message__hint" id="driver-message-hint">Say what is missing and what to send. The customer does not see this.</p>
          </NewPart>
          <Row>
            <Button variant="secondary">Send back to driver</Button>
          </Row>
        </Card>
      </Section>
    </AppShell>
  );
}
