import { AppShell, NavRail, PageHeader, Badge, Banner, Button, Card, Field, Grid, List, ListItem, NewPart, Section, Stack, Stat } from '../src';

export const title = 'Proof of delivery TLV-48213 — Tolvane';

export const css = `
.x-photo { display: flex; flex-direction: column; gap: var(--s2); }
.x-photo__frame { aspect-ratio: 4 / 3; width: 100%; border-radius: var(--radius); background: var(--surface-sunken); border: var(--border); color: var(--muted); overflow: hidden; }
.x-photo__frame svg { display: block; width: 100%; height: 100%; }
.x-photo__wall { fill: var(--surface-sunken); }
.x-photo__door { fill: var(--surface); stroke: currentColor; }
.x-photo__step { fill: var(--line); }
.x-photo__parcel { fill: var(--tint-warning); stroke: var(--warning); }
.x-photo__tape { stroke: var(--warning); }
.x-photo__number { fill: var(--ink); font: var(--type-body-strong); }
.x-photo__meta { font: var(--type-small); color: var(--muted); }

.x-signature { display: flex; flex-direction: column; gap: var(--s2); }
.x-signature__pad { aspect-ratio: 4 / 3; width: 100%; border-radius: var(--radius); background: var(--surface); border: var(--border); color: var(--ink); }
.x-signature__pad svg { display: block; width: 100%; height: 100%; }
.x-signature__ink { fill: none; stroke: currentColor; stroke-linecap: round; stroke-linejoin: round; }
.x-signature__line { stroke: var(--line); }
.x-signature__cross { stroke: var(--muted); }
.x-signature__meta { font: var(--type-small); color: var(--muted); }

.x-message { display: flex; flex-direction: column; gap: var(--s1); }
.x-message__label { font: var(--type-body-strong); color: var(--ink); }
.x-message__input { min-height: 120px; padding: var(--s2) var(--s3); border: var(--border); border-radius: var(--radius); background: var(--surface); font: var(--type-body); color: var(--ink); width: 100%; resize: vertical; }
.x-message__hint { font: var(--type-small); color: var(--muted); }

.x-step { display: flex; flex-direction: column; }
.x-step__name { font: var(--type-body-strong); color: var(--ink); }
.x-step__where { font: var(--type-small); color: var(--muted); }
`;

const steps = [
  { name: 'Picked up', where: 'Theale depot, bay 4, scanned by Marek Nowak', time: '06:58' },
  { name: 'Out for delivery', where: 'Route RG-12, stop 31 of 64', time: '07:24' },
  { name: 'Arrived at stop', where: 'Van parked on Alder Close', time: '17:36' },
  { name: 'Photo taken', where: '38 m from the address', time: '17:40' },
  { name: 'Signature collected', where: 'Signed as R. Shah', time: '17:41' },
  { name: 'Marked delivered', where: '38 m from the address, GPS accuracy ±9 m', time: '17:42' },
];

function Step({ name, where }: { name: string; where: string }) {
  return <span className="x-step"><span className="x-step__name">{name}</span><span className="x-step__where">{where}</span></span>;
}

export default function PodDetail() {
  return (
    <AppShell
      nav={
        <NavRail
          brand="Tolvane"
          items={[
            { label: 'Deliveries', href: '#' },
            { label: 'Disputes', href: '#', count: 7, current: true },
            { label: 'Drivers', href: '#', count: 42 },
            { label: 'Routes', href: '#' },
            { label: 'Reports', href: '#' },
          ]}
        />
      }
    >
      <PageHeader
        title="Proof of delivery TLV-48213"
        status={<Badge tone="warning">Disputed</Badge>}
        actions={<Button variant="primary">Accept proof</Button>}
      />

      <Banner tone="warning">
        <p>Priya Shah says the parcel never arrived. She opened the dispute on 12 Nov at 09:14, and she is waiting for an answer by 14 Nov.</p>
      </Banner>

      <Grid>
        <Section title="Photo at the door" titleId="photo">
          <Card>
            <NewPart
              name="pod-photo"
              className="x-photo"
              job="Shows the photo the driver took at the door"
              why="The system has no image or media component"
              role="img"
              aria-label="Photo taken by the driver: a brown parcel on the doorstep of a white front door numbered 14"
            >
              <div className="x-photo__frame">
                <svg viewBox="0 0 320 240" aria-hidden="true">
                  <rect className="x-photo__wall" x="0" y="0" width="320" height="240" />
                  <rect className="x-photo__door" x="110" y="28" width="100" height="180" strokeWidth="2" />
                  <rect className="x-photo__door" x="124" y="44" width="72" height="56" strokeWidth="1.5" />
                  <rect className="x-photo__door" x="124" y="112" width="72" height="80" strokeWidth="1.5" />
                  <circle cx="198" cy="122" r="4" fill="currentColor" />
                  <text className="x-photo__number" x="160" y="20" textAnchor="middle">14</text>
                  <rect className="x-photo__step" x="90" y="208" width="140" height="14" />
                  <rect className="x-photo__parcel" x="138" y="172" width="54" height="36" strokeWidth="1.5" />
                  <line className="x-photo__tape" x1="165" y1="172" x2="165" y2="208" strokeWidth="2" />
                </svg>
              </div>
              <p className="x-photo__meta">Taken 11 Nov 2026 at 17:40 by Marek Nowak. Parcel left on the doorstep of no. 14.</p>
            </NewPart>
          </Card>
        </Section>

        <Section title="Signature" titleId="signature">
          <Card>
            <NewPart
              name="pod-signature"
              className="x-signature"
              job="Shows the recipient's signature captured on the driver's phone"
              why="The system has no image or signature component"
              role="img"
              aria-label="Handwritten signature reading R. Shah"
            >
              <div className="x-signature__pad">
                <svg viewBox="0 0 320 240" aria-hidden="true">
                  <line className="x-signature__line" x1="32" y1="176" x2="288" y2="176" strokeWidth="1" />
                  <path className="x-signature__cross" d="M36 160 l12 12 M48 160 l-12 12" strokeWidth="1.5" fill="none" />
                  <path className="x-signature__ink" strokeWidth="2.5" d="M70 168 C 74 120, 82 96, 92 104 C 104 114, 84 138, 76 142 C 92 146, 104 160, 116 170 M128 166 a 3 3 0 1 0 0.1 0" />
                  <path className="x-signature__ink" strokeWidth="2.5" d="M160 132 C 146 124, 140 140, 156 146 C 172 152, 168 170, 148 166 M176 108 C 176 130, 174 152, 176 168 C 180 150, 196 146, 200 168 M214 154 C 206 150, 204 168, 214 166 C 222 164, 222 150, 218 152 C 220 160, 224 168, 232 166 M246 112 C 244 136, 244 156, 246 168 C 250 152, 266 148, 268 166 C 270 170, 278 168, 286 160" />
                </svg>
              </div>
              <p className="x-signature__meta">Signed as R. Shah on 11 Nov 2026 at 17:41. The account holder is Priya Shah.</p>
            </NewPart>
          </Card>
        </Section>
      </Grid>

      <Section title="Distance from the address" titleId="distance">
        <Card>
          <Grid>
            <Stat label="Distance when marked delivered" value="38 m" />
            <Stat label="GPS accuracy" value="±9 m" />
            <Stat label="Allowed distance" value="100 m" />
          </Grid>
          <List>
            <ListItem label="Delivery address" value="14 Alder Close, Reading RG4 7QL" />
            <ListItem label="Driver position" value="51.4782, -0.9634" />
            <ListItem label="Distance check" value={<Badge tone="positive">Within range</Badge>} />
          </List>
        </Card>
      </Section>

      <Section title="Delivery steps" titleId="steps">
        <List>
          {steps.map(s => (
            <ListItem key={s.name} label={<Step name={s.name} where={s.where} />} value={s.time} />
          ))}
        </List>
      </Section>

      <Section title="Delivery details" titleId="details">
        <List>
          <ListItem label="Tracking number" value="TLV-48213-UK" />
          <ListItem label="Customer" value="Priya Shah" />
          <ListItem label="Delivery date" value="11 Nov 2026" />
          <ListItem label="Driver" value="Marek Nowak" />
          <ListItem label="Vehicle" value="Van RG-12, LK71 XWT" />
          <ListItem label="Parcel" value="1 box, 2.4 kg" />
        </List>
      </Section>

      <Section title="Send back to driver" titleId="send-back">
        <Card>
          <Stack>
            <p>If the proof does not settle the dispute, send it back to Marek Nowak. He gets your message on his phone and the delivery stays disputed until he replies.</p>
            <Field
              id="missing"
              label="What is missing"
              options={[
                'The signature name does not match the customer',
                'The photo does not show the house number clearly',
                'The parcel is not visible in the photo',
                'The driver was too far from the address',
                'Something else',
              ]}
              defaultValue="The signature name does not match the customer"
            />
            <NewPart
              name="message-field"
              base="field"
              className="x-message"
              job="A multi-line message to the driver"
              why="The system has no textarea; Field only renders an input or a select"
            >
              <label className="x-message__label" htmlFor="message">Message to the driver</label>
              <textarea
                className="x-message__input"
                id="message"
                aria-describedby="message-note"
                defaultValue="The parcel was signed for as R. Shah, but the customer is Priya Shah and says she has not received it. Who took the parcel at the door? Please add their full name and how they are related to the customer."
              />
              <p className="x-message__hint" id="message-note">Marek sees this message with the photo and signature.</p>
            </NewPart>
            <div>
              <Button variant="secondary">Send back to driver</Button>
            </div>
          </Stack>
        </Card>
      </Section>
    </AppShell>
  );
}
