// Render a set of review stills (one bundle, many frames) and a contact sheet.
// Usage: node scripts/stills.mjs 1.5 3.4 6.0 ...   (seconds)
import {bundle} from '@remotion/bundler';
import {renderStill, selectComposition} from '@remotion/renderer';
import path from 'node:path';
import fs from 'node:fs';

const secs = process.argv.slice(2).map(Number);
const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const outDir = path.join(root, 'out', 'stills');
fs.mkdirSync(outDir, {recursive: true});

const serveUrl = await bundle({entryPoint: path.join(root, 'src', 'index.ts')});
const browserExecutable = process.env.REMOTION_BROWSER || null;
const chromiumOptions = {gl: 'swangle'};
const composition = await selectComposition({serveUrl, id: 'FootprintAR', browserExecutable, chromiumOptions});

for (const s of secs) {
  const frame = Math.round(s * 30);
  const output = path.join(outDir, `f${String(frame).padStart(4, '0')}.png`);
  await renderStill({composition, serveUrl, frame, output, browserExecutable, chromiumOptions, imageFormat: 'png'});
  console.log('rendered', s, output);
}
