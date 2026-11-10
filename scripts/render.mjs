// Renders React screens to static HTML so the harness can score them.
// Usage: node scripts/render.mjs <folder or .tsx file> [...]
// Each <folder>/<name>.tsx default-exports the screen. It may also export
// `title` (the page title) and `css` (styles for its own x- classes).
// Writes <folder>/<name>.html next to it, linking tokens.css then components.css.
import { build } from 'esbuild';
import { readdirSync, writeFileSync, mkdtempSync, rmSync, statSync } from 'node:fs';
import { join, resolve, relative, dirname, sep } from 'node:path';
import { tmpdir } from 'node:os';
import { pathToFileURL, fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');

// Renders every target (a folder or a .tsx file) and returns how many screens failed.
export async function render(folders) {
const out = mkdtempSync(join(tmpdir(), 'render-'));
let failed = 0;
for (const target of folders) {
  const isFile = statSync(target).isFile();
  const dir = isFile ? dirname(resolve(target)) : resolve(target);
  const files = isFile ? [resolve(target).slice(dir.length + 1)] : readdirSync(dir).filter(f => f.endsWith('.tsx')).sort();
  for (const file of files) {
    const name = file.replace(/\.tsx$/, '');
    try {
      const outfile = join(out, `${relative(root, dir).replace(/[\\/]/g, '_')}_${name}.mjs`);
      await build({ entryPoints: [join(dir, file)], outfile, bundle: true, platform: 'node', format: 'esm', jsx: 'automatic', logLevel: 'silent', nodePaths: [join(root, 'node_modules')] });
      const mod = await import(pathToFileURL(outfile).href);
      const { renderToStaticMarkup } = await import(pathToFileURL(join(root, 'node_modules/react-dom/server.node.js')).href);
      const { createElement } = await import(pathToFileURL(join(root, 'node_modules/react/index.js')).href);
      const body = renderToStaticMarkup(createElement(mod.default));
      const up = relative(dir, root).split('\\').join('/') || '.';
      const html = `<!doctype html>\n<html lang="en-GB">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1">\n<title>${mod.title ?? name}</title>\n<link rel="stylesheet" href="${up}/tokens.css">\n<link rel="stylesheet" href="${up}/components.css">\n${mod.css ? `<style>\n${mod.css}\n</style>\n` : ''}</head>\n<body>\n${body}\n</body>\n</html>\n`;
      writeFileSync(join(dir, `${name}.html`), html);
      console.log(`  ${relative(root, join(dir, name))}.html`);
    } catch (e) {
      failed++;
      console.log(`  ${relative(root, join(dir, file))}: ${String(e.message).split('\n')[0]}`);
    }
  }
}
rmSync(out, { recursive: true, force: true });
return failed;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  // A path from the command line must stay inside this repository.
  const inRepo = p => { const r = resolve(root, p); if (r !== root && !r.startsWith(root + sep)) { console.error(`${p} is outside this repository`); process.exit(1); } return r; };
  const folders = process.argv.slice(2).map(inRepo);
  if (!folders.length) { console.error('Usage: node scripts/render.mjs <folder> [...]'); process.exit(1); }
  process.exit((await render(folders)) ? 1 : 0);
}
