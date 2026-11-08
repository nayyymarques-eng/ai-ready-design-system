// An example screen: components from the system, and one new part labelled for triage.
import { AppShell, NavRail, PageHeader, Section, Card, Stack, List, ListItem, Badge, Button, NewPart } from '../src';

export const title = 'Delivery TL-48213';
export const css = `.x-signature { height: 96px; border: var(--border); border-radius: var(--radius); display: flex; align-items: end; padding: var(--s3); font: var(--type-small); color: var(--muted); }`;

export default function Example() {
  return (
    <AppShell nav={<NavRail brand="Tolvane" items={[{ label: 'Proof to review', href: '#', count: 12, current: true }, { label: 'Drivers', href: '#' }]} />}>
      <PageHeader title="Delivery TL-48213" status={<Badge tone="warning">Disputed</Badge>} actions={<><Button variant="secondary">Send back to driver</Button><Button variant="primary">Accept proof</Button></>} />
      <Section title="Proof" titleId="proof">
        <Card>
          <Stack>
            <List>
              <ListItem label="Recipient" value="Marta Vidal" />
              <ListItem label="Marked delivered" value="14:32, 6 Nov" />
            </List>
            <NewPart name="signature" job="Shows the recipient's signature" why="No component shows a drawn signature" className="x-signature">Signed by Marta Vidal</NewPart>
          </Stack>
        </Card>
      </Section>
    </AppShell>
  );
}
