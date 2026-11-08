// Sends triage items to the team's tracker. Here the tracker is GitHub Issues with the label "triage":
// one issue per new part. A part seen again (another screen or pull request) updates its issue:
// it adds the occurrence and the count, and keeps the decision the owner already ticked.
// It also leaves one comment on the pull request that lists what went to triage.
// The same items.json can go to Jira, Linear, Notion or Shortcut with another sender like this one.
// Usage (in CI): node harness/triage-to-issues.mjs triage-out
// Needs GITHUB_TOKEN, GITHUB_REPOSITORY, PR_NUMBER, PR_AUTHOR, PR_URL.
import fs from 'node:fs';
import path from 'node:path';

const dir = process.argv[2] || 'triage-out';
const { GITHUB_TOKEN: token, GITHUB_REPOSITORY: repo, PR_NUMBER: pr, PR_AUTHOR: author, PR_URL: prUrl } = process.env;
const items = JSON.parse(fs.readFileSync(path.join(dir, 'items.json'), 'utf8'));
const api = async (method, p, body) => {
  const r = await fetch(`https://api.github.com/repos/${repo}${p}`, { method, headers: { authorization: `Bearer ${token}`, accept: 'application/vnd.github+json', 'content-type': 'application/json' }, body: body && JSON.stringify(body) });
  if (!r.ok && r.status !== 404 && r.status !== 422) throw new Error(`${method} ${p}: ${r.status} ${await r.text()}`);
  return r.status === 204 ? null : r.json().then(j => ({ status: r.status, ...j }));
};

const DECISIONS = [
  'Replaced by an existing component',
  'Updates the component it refines',
  'Becomes a component',
  'Waits until it appears again',
];
const MARK = '<!-- triage-data ';
const today = new Date().toISOString().slice(0, 10);
const PICS = 'triage-pictures';

// Pictures live on their own branch, so the issue can show them.
const main = await api('GET', '');
if ((await api('GET', `/git/ref/heads/${PICS}`)).status === 404) {
  const head = await api('GET', `/git/ref/heads/${main.default_branch}`);
  await api('POST', '/git/refs', { ref: `refs/heads/${PICS}`, sha: head.object.sha });
}
await api('POST', '/labels', { name: 'triage', color: 'efebe4', description: 'A new part waiting for the design system owner' });

const open = [];
for (let page = 1; ; page++) {
  const batch = await fetch(`https://api.github.com/repos/${repo}/issues?labels=triage&state=all&per_page=100&page=${page}`, { headers: { authorization: `Bearer ${token}` } }).then(r => r.json());
  open.push(...batch);
  if (batch.length < 100) break;
}

const render = (it, data, ticked) => [
  `**${it.job}**`,
  '',
  `![${it.name}](https://raw.githubusercontent.com/${repo}/${PICS}/${encodeURIComponent(it.name)}.png?${data.picture})`,
  '',
  `| | |`, `|---|---|`,
  `| What it is | \`${it.name}\`${it.base ? `, refines \`${it.base}\`` : ', a new part'} |`,
  `| Why the AI made it | ${it.why} |`,
  `| First seen | ${data.first} |`,
  `| Times seen | ${data.occ.length} |`,
  '',
  '### Where it appears',
  '| Screen | File | Pull request | Who | Date |', '|---|---|---|---|---|',
  ...data.occ.map(o => `| ${o.screen} | \`${o.file}\` | [#${o.pr}](${o.prUrl}) | [${o.who}](https://github.com/${o.who}) | ${o.date} |`),
  '',
  '### Code',
  '```html', it.code, '```',
  '',
  '### Decision (the design system owner)',
  ...DECISIONS.map(d => `- [${ticked.has(d) ? 'x' : ' '}] ${d}`),
  '',
  `${MARK}${JSON.stringify(data)} -->`,
].join('\n');

const summary = [];
for (const it of items) {
  const title = `New part: ${it.name}`;
  const issue = open.find(i => i.title === title && !i.pull_request);
  const prev = issue && issue.body.includes(MARK) ? JSON.parse(issue.body.split(MARK)[1].split(' -->')[0]) : null;
  const data = prev || { first: today, occ: [] };
  const ticked = new Set(issue ? DECISIONS.filter(d => issue.body.includes(`- [x] ${d}`)) : []);
  let added = 0;
  for (const o of it.occurrences) {
    if (!data.occ.some(x => x.screen === o.screen && x.pr === pr)) { data.occ.push({ ...o, pr, prUrl, who: author, date: today }); added++; }
  }
  // Upload the picture (first time, or a newer look of the part)
  const pic = fs.readFileSync(path.join(dir, it.picture)).toString('base64');
  const existing = await api('GET', `/contents/${encodeURIComponent(it.name)}.png?ref=${PICS}`);
  const put = await api('PUT', `/contents/${encodeURIComponent(it.name)}.png`, { message: `Triage picture: ${it.name}`, content: pic, branch: PICS, ...(existing.sha ? { sha: existing.sha } : {}) });
  data.picture = put.content ? put.content.sha.slice(0, 7) : (data.picture || '');
  const body = render(it, data, ticked);
  let num;
  if (!issue) {
    num = (await api('POST', '/issues', { title, body, labels: ['triage'] })).number;
    summary.push(`- #${num} \`${it.name}\`: new in triage`);
  } else {
    num = issue.number;
    await api('PATCH', `/issues/${num}`, { body, ...(issue.state === 'closed' && added ? { state: 'open' } : {}) });
    summary.push(`- #${num} \`${it.name}\`: seen again, ${data.occ.length} times in all`);
  }
}

// One comment on the pull request, updated on every push
if (pr) {
  const tag = '<!-- triage-summary -->';
  const text = `${tag}\n**Triage.** ${items.length ? `${items.length} new part${items.length === 1 ? '' : 's'} labelled by the AI went to the triage list. The design system owner decides; this pull request does not wait.\n\n${summary.join('\n')}` : 'No new parts in this pull request.'}`;
  const comments = await fetch(`https://api.github.com/repos/${repo}/issues/${pr}/comments?per_page=100`, { headers: { authorization: `Bearer ${token}` } }).then(r => r.json());
  const mine = comments.find(c => c.body.startsWith(tag));
  if (mine) await api('PATCH', `/issues/comments/${mine.id}`, { body: text });
  else await api('POST', `/issues/${pr}/comments`, { body: text });
}
console.log(summary.join('\n') || 'triage: nothing to send');
