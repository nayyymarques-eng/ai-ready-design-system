import { DetailPage, NavRail, Badge, Banner, Button, Card, Field, List, ListItem, NewPart, Section, Stack, Stat } from '../src';

export const title = 'Proof of delivery TLV-48213';

export const css = `
.x-photo { position: relative; aspect-ratio: 4 / 3; border-radius: var(--radius); overflow: hidden; background: var(--line); }
.x-photo__wall { position: absolute; inset: 0 0 22% 0; background: var(--surface-sunken); }
.x-photo__door { position: absolute; left: 32%; width: 36%; top: 10%; bottom: 22%; background: var(--muted); border-radius: var(--radius) var(--radius) 0 0; }
.x-photo__panel { position: absolute; left: 14%; right: 14%; top: 8%; height: 34%; border: var(--border); border-radius: var(--radius); }
.x-photo__panel--low { top: auto; bottom: 8%; }
.x-photo__handle { position: absolute; right: 10%; top: 52%; width: 6%; aspect-ratio: 1; border-radius: var(--radius-pill); background: var(--line); }
.x-photo__step { position: absolute; left: 24%; right: 24%; bottom: 14%; height: 8%; background: var(--line); border-top: var(--border); }
.x-photo__parcel { position: absolute; left: 44%; width: 16%; bottom: 20%; aspect-ratio: 5 / 4; background: var(--tint-warning); border: 1px solid var(--warning); border-radius: var(--s1); }
.x-photo__tape { position: absolute; left: 42%; width: 16%; top: 0; bottom: 0; background: var(--warning); opacity: .35; }
.x-photo__stamp { position: absolute; left: var(--s3); bottom: var(--s3); padding: var(--s1) var(--s2); border-radius: var(--radius); background: var(--ink); color: var(--on-accent); font: var(--type-small); }
.x-signature { border: var(--border); border-radius: var(--radius); background: var(--surface); padding: var(--s4); }
.x-signature__ink { display: block; width: 100%; aspect-ratio: 4 / 1; fill: none; stroke: var(--ink); stroke-width: 2.5; stroke-linecap: round; stroke-linejoin: round; }
.x-signature__line { border-top: var(--border); padding-top: var(--s2); font: var(--type-small); color: var(--muted); }
.x-distance { display: flex; flex-direction: column; gap: var(--s2); }
.x-distance__track { position: relative; height: var(--s3); border-radius: var(--radius-pill); background: var(--surface-sunken); border: var(--border); }
.x-distance__ok { position: absolute; left: 0; top: 0; bottom: 0; width: 20%; border-radius: var(--radius-pill) 0 0 var(--radius-pill); background: var(--tint-positive); border-right: 2px solid var(--positive); }
.x-distance__mark { position: absolute; left: 72%; top: 50%; width: var(--s4); height: var(--s4); transform: translate(-50%, -50%); border-radius: var(--radius-pill); background: var(--critical); border: 2px solid var(--surface); }
.x-distance__scale { position: relative; height: var(--s5); font: var(--type-small); color: var(--muted); }
.x-distance__tick { position: absolute; top: 0; white-space: nowrap; }
.x-distance__tick--start { left: 0; }
.x-distance__tick--limit { left: 20%; transform: translateX(-50%); }
.x-distance__tick--end { right: 0; }
.x-textarea { display: flex; flex-direction: column; gap: var(--s1); }
.x-textarea__label { font: var(--type-body-strong); color: var(--ink); }
.x-textarea__input { min-height: calc(var(--s8) * 2); padding: var(--s2) var(--s3); border: var(--border); border-radius: var(--radius); background: var(--surface); font: var(--type-body); color: var(--ink); width: 100%; resize: vertical; }
.x-textarea__hint { font: var(--type-small); color: var(--muted); }
`;

const nav = (
  <NavRail
    brand="Tolvane"
    items={[
      { label: 'Today', href: '#' },
      { label: 'Deliveries', href: '#' },
      { label: 'Proof of delivery', href: '#', count: 7, current: true },
      { label: 'Drivers', href: '#' },
      { label: 'Routes', href: '#' },
    ]}
  />
);

const main = (
  <>
    <Banner tone="warning">
      <p>
        The customer, Hannah Okafor, says the parcel never arrived. Dispute opened 12 Nov at 09:14. Accept the proof or send it
        back to the driver by 13 Nov, 17:00.
      </p>
    </Banner>

    <Section title="Photo at the door" titleId="photo">
      <Card>
        <Stack>
          <NewPart
            name="pod-photo"
            job="Shows the photo the driver took at the door"
            why="The system has no image or media component"
            className="x-photo"
            role="img"
            aria-label="Photo from the driver: a parcel on the front step of a grey door. The house number is not in the frame."
          >
            <div className="x-photo__wall" />
            <div className="x-photo__door">
              <div className="x-photo__panel" />
              <div className="x-photo__panel x-photo__panel--low" />
              <div className="x-photo__handle" />
            </div>
            <div className="x-photo__step" />
            <div className="x-photo__parcel"><div className="x-photo__tape" /></div>
            <span className="x-photo__stamp">11 Nov 2026, 14:32 · 53.8072, −1.5619</span>
          </NewPart>
          <List>
            <ListItem label="Taken" value="11 Nov 2026, 14:32" />
            <ListItem label="Where the parcel was left" value="Front step" />
            <ListItem label="House number visible">
              <Badge tone="critical">No</Badge>
            </ListItem>
          </List>
        </Stack>
      </Card>
    </Section>

    <Section title="Recipient's signature" titleId="signature">
      <Card>
        <Stack>
          <NewPart
            name="pod-signature"
            job="Shows the signature the recipient drew on the driver's phone"
            why="The system has no image or signature component"
            className="x-signature"
            role="img"
            aria-label="Signature, a short handwritten J followed by Okafor"
          >
            <svg className="x-signature__ink" viewBox="0 0 400 100" aria-hidden="true">
              <path d="M40 30 C 60 20, 70 25, 62 55 C 56 80, 30 82, 26 66" />
              <path d="M90 60 C 80 40, 115 35, 112 58 C 110 75, 88 75, 90 60 Z" />
              <path d="M130 30 L 128 78 M 128 60 C 140 50, 150 48, 158 44 M 134 62 L 160 80" />
              <path d="M170 62 C 180 48, 198 50, 196 66 C 194 78, 178 76, 182 64 C 186 56, 200 70, 206 76" />
              <path d="M220 20 C 216 50, 212 70, 214 80 M 214 50 C 226 46, 238 44, 234 30" />
              <path d="M246 60 C 254 48, 270 50, 268 64 C 266 78, 250 76, 252 64 C 256 56, 270 72, 280 78" />
              <path d="M292 52 L 296 72 C 300 80, 312 70, 318 54 L 322 82 C 330 70, 350 62, 372 56" />
            </svg>
            <div className="x-signature__line">Signed 11 Nov 2026, 14:33</div>
          </NewPart>
          <List>
            <ListItem label="Name typed by the recipient" value="J. Okafor" />
            <ListItem label="Customer on the order" value="Hannah Okafor" />
            <ListItem label="Driver's note" value="Handed to a family member at the door" />
          </List>
        </Stack>
      </Card>
    </Section>

    <Section title="Distance from the address" titleId="distance">
      <Card>
        <Stack>
          <Stat label="Driver's distance from the address when marked delivered" value="180 m" />
          <NewPart
            name="pod-distance"
            job="Shows the driver's distance from the address against the 50 m limit"
            why="Progress is for how far a task is towards done, not a distance against a limit"
            className="x-distance"
            role="img"
            aria-label="180 metres from the address, on a scale of 0 to 250 metres. The limit is 50 metres."
          >
            <div className="x-distance__track">
              <div className="x-distance__ok" />
              <div className="x-distance__mark" />
            </div>
            <div className="x-distance__scale">
              <span className="x-distance__tick x-distance__tick--start">0 m</span>
              <span className="x-distance__tick x-distance__tick--limit">Limit 50 m</span>
              <span className="x-distance__tick x-distance__tick--end">250 m</span>
            </div>
          </NewPart>
          <List>
            <ListItem label="Against the 50 m limit">
              <Badge tone="critical">Outside limit</Badge>
            </ListItem>
            <ListItem label="GPS accuracy" value="± 12 m" />
            <ListItem label="Position when marked delivered" value="Corner of Grove Lane and Ash Road" />
          </List>
        </Stack>
      </Card>
    </Section>

    <Section title="Message to the driver" titleId="message">
      <Card>
        <Stack>
          <Field
            id="missing"
            label="What is missing"
            options={['House number in the photo', 'Signature from the customer', 'Delivery closer to the address', 'Something else']}
            defaultValue="House number in the photo"
          />
          <NewPart
            name="textarea"
            base="field"
            job="A message of several lines to the driver"
            why="Textarea is not built in the system yet (rules, section 13)"
            className="x-textarea"
          >
            <label className="x-textarea__label" htmlFor="message-text">Message</label>
            <textarea
              className="x-textarea__input"
              id="message-text"
              aria-describedby="message-hint"
              defaultValue="Hi Marek, the photo for 14 Grove Lane doesn't show the house number and you marked it delivered 180 m away. Please add a photo with the number in frame, or tell us where you left the parcel."
            />
            <p className="x-textarea__hint" id="message-hint">Marek sees this in the driver app with the delivery. Sent with Send back to driver.</p>
          </NewPart>
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
          <ListItem label="Recipient" value="Hannah Okafor" />
          <ListItem label="Address" value="14 Grove Lane, Leeds LS6 2AP" />
          <ListItem label="Driver" value="Marek Nowak" />
          <ListItem label="Van" value="YK72 HDF" />
          <ListItem label="Route" value="Leeds North 3" />
          <ListItem label="Parcel" value="1 box, 2.4 kg" />
        </List>
      </Card>
    </Section>

    <Section title="Steps" titleId="steps">
      <Card>
        <List>
          <ListItem label="Picked up at Leeds depot" value="11 Nov, 07:52" />
          <ListItem label="Out for delivery" value="11 Nov, 08:40" />
          <ListItem label="Arrived near the address" value="11 Nov, 14:29" />
          <ListItem label="Photo taken" value="11 Nov, 14:32" />
          <ListItem label="Signature collected" value="11 Nov, 14:33" />
          <ListItem label="Marked delivered" value="11 Nov, 14:34" />
          <ListItem label="Dispute opened by the customer" value="12 Nov, 09:14" />
        </List>
      </Card>
    </Section>
  </>
);

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
      main={main}
      aside={aside}
    />
  );
}
