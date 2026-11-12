import {
  DetailPage, NavRail, Badge, Button, Section, Stack, Card, List, ListItem, Stat, Field, Avatar, Row, NewPart,
} from '../src';

export const title = 'Proof of delivery TLV-48213 — Tolvane';

export const css = `
.x-photo { display: flex; flex-direction: column; gap: var(--s2); }
.x-photo__frame { position: relative; border-radius: var(--radius); overflow: hidden; background: var(--surface-sunken); border: var(--border); }
.x-photo__frame svg { display: block; width: 100%; height: auto; }
.x-photo__wall { fill: var(--line); }
.x-photo__brick { fill: none; stroke: var(--surface-sunken); stroke-width: 2; }
.x-photo__door { fill: var(--muted); }
.x-photo__panel { fill: none; stroke: var(--text); stroke-width: 3; }
.x-photo__handle { fill: var(--surface-sunken); }
.x-photo__step { fill: var(--surface-sunken); }
.x-photo__mat { fill: var(--text); }
.x-photo__box { fill: var(--surface); stroke: var(--text); stroke-width: 2; }
.x-photo__tape { fill: var(--line); }
.x-photo__label { fill: var(--surface-sunken); stroke: var(--text); stroke-width: 1.5; }
.x-photo__stamp { position: absolute; left: var(--s2); bottom: var(--s2); padding: var(--s1) var(--s2); border-radius: var(--radius); background: var(--ink); color: var(--on-accent); font: var(--type-small); font-variant-numeric: tabular-nums; }
.x-photo__caption { font: var(--type-small); color: var(--muted); }

.x-signature { display: flex; flex-direction: column; gap: var(--s2); }
.x-signature__pad { border: var(--border); border-radius: var(--radius); background: var(--surface); padding: var(--s4); }
.x-signature__pad svg { display: block; width: 100%; max-width: 420px; height: auto; margin: 0 auto; }
.x-signature__ink { fill: none; stroke: var(--ink); stroke-width: 2.5; stroke-linecap: round; stroke-linejoin: round; }
.x-signature__line { stroke: var(--line); stroke-width: 1.5; }
.x-signature__cross { stroke: var(--muted); stroke-width: 1.5; }
.x-signature__caption { font: var(--type-small); color: var(--muted); }

.x-distance { display: flex; flex-direction: column; gap: var(--s2); }
.x-distance svg { display: block; width: 100%; height: auto; border-radius: var(--radius); background: var(--surface-sunken); border: var(--border); }
.x-distance__street { fill: var(--surface); }
.x-distance__block { fill: var(--line); }
.x-distance__range { fill: none; stroke: var(--positive); stroke-width: 1.5; stroke-dasharray: 4 4; }
.x-distance__gap { stroke: var(--warning); stroke-width: 2; stroke-dasharray: 6 4; }
.x-distance__home { fill: var(--ink); }
.x-distance__driver { fill: var(--warning); stroke: var(--surface); stroke-width: 2; }
.x-distance__text { fill: var(--ink); font: var(--type-small); }
.x-distance__legend { display: flex; flex-wrap: wrap; gap: var(--s1) var(--s4); font: var(--type-small); color: var(--muted); }

.x-textarea-field { display: flex; flex-direction: column; gap: var(--s1); }
.x-textarea-field__label { font: var(--type-body-strong); color: var(--ink); }
.x-textarea-field__input { min-height: 120px; padding: var(--s2) var(--s3); border: var(--border); border-radius: var(--radius); background: var(--surface); font: var(--type-body); color: var(--ink); width: 100%; resize: vertical; }
.x-textarea-field__hint { font: var(--type-small); color: var(--muted); }
`;

function DoorPhoto() {
  return (
    <NewPart
      name="pod-photo"
      job="Show the photo the driver took at the door, with the time and place stamped on it"
      why="The system has no image or photo component; the screen is static so the photo is a drawn stand-in"
      className="x-photo"
    >
      <div className="x-photo__frame">
        <svg viewBox="0 0 640 400" role="img" aria-label="Photo at the door: a brown parcel on a doormat in front of a dark front door. No house number is visible.">
          <rect className="x-photo__wall" x="0" y="0" width="640" height="400" />
          <path className="x-photo__brick" d="M0 60H640M0 120H640M0 180H640M0 240H640M0 300H640M80 0V60M240 0V60M400 0V60M560 0V60M160 60V120M480 60V120M80 120V180M560 120V180M160 180V240M480 180V240M80 240V300M560 240V300" />
          <rect className="x-photo__door" x="220" y="20" width="200" height="320" />
          <rect className="x-photo__panel" x="244" y="44" width="152" height="120" />
          <rect className="x-photo__panel" x="244" y="186" width="152" height="130" />
          <circle className="x-photo__handle" cx="396" cy="182" r="7" />
          <rect className="x-photo__step" x="170" y="340" width="300" height="60" />
          <rect className="x-photo__mat" x="230" y="326" width="180" height="22" rx="3" />
          <rect className="x-photo__box" x="262" y="262" width="118" height="78" />
          <rect className="x-photo__tape" x="312" y="262" width="18" height="78" />
          <rect className="x-photo__label" x="274" y="296" width="30" height="22" />
        </svg>
        <span className="x-photo__stamp">12 Nov 2026, 14:32 · 51.4532, −2.5871</span>
      </div>
      <p className="x-photo__caption">Taken by Daniel Osei with the Tolvane driver app. The house number is not in the frame.</p>
    </NewPart>
  );
}

function Signature() {
  return (
    <NewPart
      name="pod-signature"
      job="Show the recipient's signature as it was drawn on the driver's phone"
      why="The system has no image or signature component"
      className="x-signature"
    >
      <div className="x-signature__pad">
        <svg viewBox="0 0 420 140" role="img" aria-label="Handwritten signature reading J. Whitfield">
          <path className="x-signature__cross" d="M20 96l12 12M32 96l-12 12" />
          <line className="x-signature__line" x1="44" y1="108" x2="400" y2="108" />
          <path className="x-signature__ink" d="M70 40c14-6 22 2 18 22-4 26-14 44-30 42-12-2-12-16-2-20" />
          <circle className="x-signature__ink" cx="104" cy="96" r="1.5" />
          <path className="x-signature__ink" d="M128 46c4 20 6 40 10 52 6-22 12-38 18-46 2 18 4 34 10 46 8-24 16-46 26-60" />
          <path className="x-signature__ink" d="M196 30c-4 26-6 50-4 70 4-14 12-24 20-24 6 0 6 10 6 24" />
          <path className="x-signature__ink" d="M232 76v24M232 62v1" />
          <path className="x-signature__ink" d="M246 50c2 20 0 36 2 50M240 72h16" />
          <path className="x-signature__ink" d="M262 30c14 0 22 6 18 18-4 10-16 10-16 4 0-8 10-6 10 8 0 14-2 28 0 40" />
          <path className="x-signature__ink" d="M286 76v24M286 62v1" />
          <path className="x-signature__ink" d="M298 90c10 2 20-4 18-12-2-6-12-4-14 6-2 12 10 18 26 10" />
          <path className="x-signature__ink" d="M334 30c-2 24-2 48 0 70" />
          <path className="x-signature__ink" d="M370 76c-8-6-20 0-20 12 0 10 10 14 20 6M370 30c0 26 0 50 2 72 8-2 16-6 24-14" />
        </svg>
      </div>
      <p className="x-signature__caption">Signed on the driver's phone at 14:33, one minute after the photo.</p>
    </NewPart>
  );
}

function DistanceSketch() {
  return (
    <NewPart
      name="pod-distance"
      job="Show where the driver was against the delivery address and the allowed range when they marked it delivered"
      why="No map or location component exists; this is a schematic, not a real map"
      className="x-distance"
    >
      <svg viewBox="0 0 320 180" role="img" aria-label="Sketch: the driver's position is 140 metres east of the delivery address, outside the 50 metre range around it">
        <rect className="x-distance__block" x="0" y="0" width="320" height="180" />
        <rect className="x-distance__street" x="0" y="80" width="320" height="28" />
        <rect className="x-distance__street" x="196" y="0" width="24" height="180" />
        <circle className="x-distance__range" cx="70" cy="70" r="36" />
        <line className="x-distance__gap" x1="70" y1="70" x2="268" y2="94" />
        <path className="x-distance__home" d="M70 52l-12 10v16h24V62z" />
        <circle className="x-distance__driver" cx="268" cy="94" r="8" />
        <text className="x-distance__text" x="140" y="72">140 m</text>
      </svg>
      <div className="x-distance__legend">
        <span>Black house: 14 Alder Close</span>
        <span>Dashed circle: 50 m range</span>
        <span>Dot: driver at 14:32</span>
      </div>
    </NewPart>
  );
}

function SendBackMessage() {
  return (
    <NewPart
      name="textarea"
      base="field"
      job="Write the message the driver gets when the proof is sent back"
      why="Textarea is listed as not built (rules.md, section 13); a field only has an input or a select"
      className="x-textarea-field"
    >
      <label className="x-textarea-field__label" htmlFor="pod-message">Message to the driver</label>
      <textarea
        className="x-textarea-field__input"
        id="pod-message"
        aria-describedby="pod-message-hint"
        defaultValue={'Hi Daniel, the customer says this parcel never arrived. The photo does not show a house number, and the app placed you 140 m from 14 Alder Close when you marked it delivered. Can you confirm which door you left it at, and add a photo that shows the number?'}
      />
      <p className="x-textarea-field__hint" id="pod-message-hint">Sent to the driver app with Send back to driver. The delivery stays disputed until a new proof comes in.</p>
    </NewPart>
  );
}

export default function PodDetail() {
  return (
    <DetailPage
      nav={
        <NavRail
          brand="Tolvane"
          items={[
            { label: 'Today', href: '#' },
            { label: 'Deliveries', href: '#', count: 1284 },
            { label: 'Proof of delivery', href: '#', count: 7, current: true },
            { label: 'Drivers', href: '#', count: 42 },
            { label: 'Routes', href: '#' },
          ]}
        />
      }
      title="Proof of delivery TLV-48213"
      status={<Badge tone="warning">Disputed</Badge>}
      actions={
        <>
          <Button variant="secondary">Send back to driver</Button>
          <Button variant="primary">Accept proof</Button>
        </>
      }
      main={
        <>
          <Section title="Customer dispute" titleId="dispute">
            <Card>
              <p>Priya Raman reported on 13 Nov at 09:14: “Tracking says delivered yesterday afternoon, but there was nothing at my door when I got home at 18:00. Nobody here signed for it.”</p>
            </Card>
          </Section>

          <Section title="Photo at the door" titleId="photo">
            <Card>
              <DoorPhoto />
            </Card>
          </Section>

          <Section title="Signature" titleId="signature">
            <Card>
              <Signature />
              <List>
                <ListItem label="Signed by" value="J. Whitfield" />
                <ListItem label="Name on the order" value="Priya Raman" />
              </List>
            </Card>
          </Section>

          <Section title="Send back to driver" titleId="send-back">
            <Card>
              <Stack>
                <Field
                  id="pod-missing"
                  label="What is missing"
                  options={['House number not visible in photo', 'Signature does not match recipient', 'Too far from the address', 'Photo is blurred or too dark', 'Other']}
                  defaultValue="House number not visible in photo"
                />
                <SendBackMessage />
              </Stack>
            </Card>
          </Section>
        </>
      }
      aside={
        <>
          <Section title="Distance from the address" titleId="distance">
            <Card>
              <Row>
                <Stat label="When marked delivered" value="140 m" />
                <Badge tone="warning">Outside 50 m range</Badge>
              </Row>
              <DistanceSketch />
              <List>
                <ListItem label="Delivery address" value="14 Alder Close, Bristol BS6 7QT" />
                <ListItem label="GPS accuracy" value="± 9 m" />
                <ListItem label="Allowed range" value="50 m" />
              </List>
            </Card>
          </Section>

          <Section title="Delivery" titleId="delivery">
            <List>
              <ListItem label="Order" value="TLV-48213" />
              <ListItem label="Parcel" value="1 box, 2.4 kg" />
              <ListItem label="Customer" value="Priya Raman" />
              <ListItem label="Driver">
                <strong>
                  <Row><Avatar initials="DO" />Daniel Osei</Row>
                </strong>
              </ListItem>
              <ListItem label="Route" value="BS-North 3, stop 17 of 31" />
              <ListItem label="Dispute opened" value="13 Nov, 09:14" />
            </List>
          </Section>

          <Section title="Steps" titleId="steps">
            <List>
              <ListItem label="Picked up at Avonmouth depot" value="12 Nov, 08:05" />
              <ListItem label="Loaded on van BX24 KFT" value="08:21" />
              <ListItem label="Out for delivery" value="08:40" />
              <ListItem label="Arrived near address" value="14:30" />
              <ListItem label="Photo taken" value="14:32" />
              <ListItem label="Signature collected" value="14:33" />
              <ListItem label="Marked delivered" value="14:33" />
            </List>
          </Section>
        </>
      }
    />
  );
}
