import {
  DetailPage, NavRail, Badge, Button, Banner, Section, Stack, Row, Grid, Card,
  List, ListItem, Stat, Avatar, Checkbox, NewPart,
} from '../src';

export const title = 'Delivery TLV-48213-07 proof — Tolvane';

export const css = `
.x-proof { margin: 0; display: flex; flex-direction: column; gap: var(--s3); }
.x-proof__frame { border: var(--border); border-radius: var(--radius); background: var(--surface-sunken); overflow: hidden; }
.x-proof__frame svg { display: block; width: 100%; height: auto; }
.x-proof__caption { display: flex; flex-direction: column; gap: var(--s1); font: var(--type-small); color: var(--muted); }
.x-proof__name { font: var(--type-body-strong); color: var(--ink); }
.x-photo__wall { fill: var(--line); }
.x-photo__door { fill: var(--muted); }
.x-photo__ground { fill: var(--surface-sunken); }
.x-photo__parcel { fill: var(--surface); stroke: var(--ink); stroke-width: 2; }
.x-photo__tape { stroke: var(--muted); stroke-width: 2; }
.x-photo__plate { fill: var(--surface); }
.x-photo__blur { fill: var(--line); }
.x-sign__pad { fill: var(--surface); }
.x-sign__line { stroke: var(--line); stroke-width: 2; stroke-dasharray: 6 6; }
.x-sign__ink { fill: none; stroke: var(--ink); stroke-width: 2.5; stroke-linecap: round; stroke-linejoin: round; }
.x-message { display: flex; flex-direction: column; gap: var(--s2); }
.x-message__label { font: var(--type-body-strong); color: var(--ink); }
.x-message__input { min-height: 160px; padding: var(--s2) var(--s3); border: var(--border); border-radius: var(--radius); background: var(--surface); font: var(--type-body); color: var(--ink); width: 100%; resize: vertical; }
.x-message__hint { font: var(--type-small); color: var(--muted); margin: 0; }
`;

const nav = (
  <NavRail
    brand="Tolvane"
    items={[
      { label: 'Today', href: '#' },
      { label: 'Deliveries', href: '#' },
      { label: 'Proof of delivery', href: '#', count: 6, current: true },
      { label: 'Drivers', href: '#', count: 24 },
      { label: 'Routes', href: '#' },
      { label: 'Customers', href: '#' },
    ]}
  />
);

const doorPhoto = (
  <NewPart
    name="proof-photo"
    className="x-proof"
    as="figure"
    job="Show the photo the driver took at the door, with when and where it was taken"
    why="The system has no image or media component, and the screen may not load image files, so the photo is drawn as a still"
  >
    <div className="x-proof__frame">
      <svg viewBox="0 0 320 220" role="img" aria-label="Photo at the door: a brown parcel on a doorstep in front of a grey door. The house number beside the door is out of frame.">
        <rect className="x-photo__wall" x="0" y="0" width="320" height="170" />
        <rect className="x-photo__door" x="104" y="24" width="112" height="146" />
        <rect className="x-photo__blur" x="226" y="56" width="40" height="22" />
        <rect className="x-photo__plate" x="198" y="88" width="10" height="20" />
        <rect className="x-photo__ground" x="0" y="170" width="320" height="50" />
        <rect className="x-photo__parcel" x="128" y="140" width="64" height="44" />
        <line className="x-photo__tape" x1="160" y1="140" x2="160" y2="184" />
      </svg>
    </div>
    <figcaption className="x-proof__caption">
      <span className="x-proof__name">Photo at the door</span>
      <span>Taken 14:02 on 11 Nov by Daniel Reyes</span>
      <span>Parcel on the doorstep. The house number is not in the photo.</span>
    </figcaption>
  </NewPart>
);

const signature = (
  <NewPart
    name="proof-signature"
    className="x-proof"
    as="figure"
    job="Show the signature the recipient drew on the driver's phone, with the name they gave"
    why="The system has no image or signature component"
  >
    <div className="x-proof__frame">
      <svg viewBox="0 0 320 220" role="img" aria-label="Signature: a short looped scrawl, readable as J. Okafor">
        <rect className="x-sign__pad" x="0" y="0" width="320" height="220" />
        <line className="x-sign__line" x1="32" y1="160" x2="288" y2="160" />
        <path className="x-sign__ink" d="M60 90 C 66 120, 62 150, 48 152 C 38 154, 36 140, 44 134 M84 128 c 4 -16, 24 -16, 22 2 c -2 16, -22 16, -22 -2 M120 140 l 6 -42 M118 120 c 14 -8, 22 -6, 18 8 c -2 8, 8 10, 14 0 M156 134 c 8 -18, 26 -14, 20 4 c -4 12, -20 8, -14 -6 M186 136 c 2 -22, 14 -30, 22 -24 c 6 6, -6 18, -10 24 c 10 -8, 20 -4, 18 6 M220 132 c 10 -14, 24 -10, 22 2 c -2 10, 8 10, 16 -2 c 4 -8, 10 -10, 18 -6" />
      </svg>
    </div>
    <figcaption className="x-proof__caption">
      <span className="x-proof__name">Recipient's signature</span>
      <span>Signed 14:03 on 11 Nov</span>
      <span>Name given: J. Okafor. The order is addressed to Amara Okafor.</span>
    </figcaption>
  </NewPart>
);

const main = (
  <>
    <Banner tone="warning">
      <p>Amara Okafor disputes this delivery: she says the parcel never arrived. She opened the dispute at 18:40 on 11 Nov. Reply to her by 13 Nov.</p>
    </Banner>

    <Section title="Proof from the door" titleId="proof">
      <Card>
        <Grid>
          {doorPhoto}
          {signature}
        </Grid>
      </Card>
    </Section>

    <Section title="Where the driver was" titleId="location">
      <Card>
        <Grid>
          <Stat label="Distance from the address" value="142 m" />
          <Stat label="GPS accuracy" value="± 9 m" />
        </Grid>
        <Row>
          <Badge tone="critical">Outside the 50 m limit</Badge>
          <span>Marked delivered at 14:03, 142 m north of 27 Larch Grove, near 9 Larch Grove.</span>
        </Row>
      </Card>
    </Section>

    <Section title="Send back to the driver" titleId="send-back">
      <Card>
        <Stack>
          <div role="group" aria-labelledby="missing-label">
            <Stack>
              <span id="missing-label">What is missing</span>
              <Checkbox label="The house number is not in the photo" defaultChecked />
              <Checkbox label="Marked delivered more than 50 m from the address" defaultChecked />
              <Checkbox label="The signature name does not match the recipient" />
              <Checkbox label="The parcel label is not in the photo" />
            </Stack>
          </div>
          <NewPart
            name="message-field"
            base="field"
            className="x-message"
            job="Write a message of several lines to the driver, saying what is missing from the proof"
            why="Textarea is listed as not built; field only has a one-line input or a select"
          >
            <label className="x-message__label" htmlFor="message">Message to Daniel Reyes</label>
            <textarea
              className="x-message__input"
              id="message"
              aria-describedby="message-hint"
              defaultValue="Hi Daniel, the customer at 27 Larch Grove says the parcel did not arrive. Your photo does not show the house number, and the delivery was marked 142 m from the address, near number 9. Please go back to number 9, check whether the parcel was left there, and send a photo that shows the door, the house number and the parcel label."
            />
            <p className="x-message__hint" id="message-hint">Sent to the driver's app when you choose Send back to driver. The proof stays open until he replies.</p>
          </NewPart>
        </Stack>
      </Card>
    </Section>
  </>
);

const aside = (
  <>
    <Section title="Delivery" titleId="delivery">
      <List>
        <ListItem label="Order" value="TLV-48213" />
        <ListItem label="Parcel" value="7 of 9, 2.4 kg" />
        <ListItem label="Recipient" value="Amara Okafor" />
        <ListItem label="Address" value="27 Larch Grove, Leeds LS6 3HW" />
        <ListItem label="Sender" value="Halden Home Goods" />
        <ListItem label="Service" value="Next day, signature required" />
      </List>
    </Section>

    <Section title="Driver" titleId="driver">
      <List>
        <ListItem>
          <Row>
            <Avatar initials="DR" />
            <span>Daniel Reyes</span>
          </Row>
          <strong>Route LS-14</strong>
        </ListItem>
        <ListItem label="Vehicle" value="Van YK72 RTD" />
        <ListItem label="Proofs sent back this month" value="1 of 212" />
      </List>
    </Section>

    <Section title="Steps" titleId="steps">
      <List>
        <ListItem label="Picked up at Northfield depot" value="07:42" />
        <ListItem label="Out for delivery" value="08:31" />
        <ListItem label="First attempt, no answer" value="11:16" />
        <ListItem label="Arrived near the address" value="13:58" />
        <ListItem label="Photo taken" value="14:02" />
        <ListItem label="Signature collected" value="14:03" />
        <ListItem label="Marked delivered" value="14:03" />
        <ListItem label="Dispute opened by customer" value="18:40" />
      </List>
    </Section>
  </>
);

export default function PodDetail() {
  return (
    <DetailPage
      nav={nav}
      title="Proof for delivery TLV-48213-07"
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
