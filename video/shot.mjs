// Einzelbilder und Kontaktbögen zur Kontrolle.
//   node shot.mjs a1a:12.5 'a1a:@Endprodukte' 'a1a:@Endprodukte+1.5' 300      -> build/shots/*.png (1920×1080)
//   node shot.mjs --sheet a2a [--n 16]                                       -> build/shots/sheet_a2a.png
//   node shot.mjs --sheet a2a --from 20 --to 40 --n 12                       -> Ausschnitt der Szene (Sekunden ab Szenenbeginn)
// Angaben:  <sekunde>  |  <szene>:<sekunde ab Szenenbeginn>  |  <szene>:@<Textstelle>[+/-Sekunden]
// Mit --nodebug ohne die rote Kontrollzeile (Szenenzeit und gerade gesprochener Text).
import { createRequire } from 'node:module';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
const require = createRequire(import.meta.url);
const { chromium } = require('playwright');

const args = process.argv.slice(2);
const flag = n => { const i = args.indexOf(n); if (i < 0) return null; const v = args[i + 1]; args.splice(i, 2); return v; };
const has = n => { const i = args.indexOf(n); if (i < 0) return false; args.splice(i, 1); return true; };
const sheet = flag('--sheet'), n = parseInt(flag('--n') || '16'), from = flag('--from'), to = flag('--to');
const nodebug = has('--nodebug'), all = has('--all');
const sb = {}; vm.runInNewContext(fs.readFileSync('stage/timing.js', 'utf8').replace('window.TIMING', 'TIMING'), sb);
const TIMING = sb.TIMING;
const scene = id => { const s = TIMING.scenes.find(s => s.id === id); if (!s) throw new Error('Szene unbekannt: ' + id); return s; };

function resolve(spec) {
  if (/^[\d.]+$/.test(spec)) return { t: parseFloat(spec), name: `t${spec}` };
  const [id, rest] = [spec.slice(0, spec.indexOf(':')), spec.slice(spec.indexOf(':') + 1)];
  const s = scene(id);
  if (rest.startsWith('@')) {
    const m = rest.slice(1).match(/^(.*?)([+-][\d.]+)?$/);
    const i = s.chars.indexOf(m[1]); if (i < 0) throw new Error(`Textstelle nicht gefunden: ${m[1]}`);
    const lt = s.audioAt + s.starts[i] + parseFloat(m[2] || '0');
    return { t: s.start + lt, name: `${id}_${lt.toFixed(1)}`, id };
  }
  return { t: s.start + parseFloat(rest), name: `${id}_${parseFloat(rest).toFixed(1)}`, id };
}

let shots = [];
if (sheet) {
  const s = scene(sheet), a = from ? parseFloat(from) : 0.6, b = to ? parseFloat(to) : s.dur - 0.5;
  for (let i = 0; i < n; i++) { const lt = a + ((b - a) * i) / (n - 1); shots.push({ t: s.start + lt, name: `${sheet}_${lt.toFixed(1)}`, id: sheet, lt }); }
} else shots = args.map(resolve);

fs.mkdirSync('build/shots', { recursive: true });
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: 1 });
const errs = [];
page.on('pageerror', e => errs.push(String(e)));
page.on('console', m => { if (m.type() === 'error' && !/ERR_FILE_NOT_FOUND/.test(m.text())) errs.push(m.text()); });
const ids = [...new Set(shots.map(s => s.id).filter(Boolean))];
const q = [nodebug ? '' : 'debug=1', !all && ids.length && ids.length === shots.filter(s => s.id).length ? 'only=' + ids.join(',') : ''].filter(Boolean).join('&');
await page.goto('file://' + path.resolve('stage/index.html') + (q ? '?' + q : ''));
await page.waitForFunction('document.documentElement.classList.contains("ready") || window.BOOT_ERROR', null, { timeout: 30000 });
const bootErr = await page.evaluate('window.BOOT_ERROR || null');
if (bootErr) { console.error('FEHLER beim Aufbau:\n' + bootErr); await browser.close(); process.exit(1); }

const bufs = [];
for (const s of shots) {
  await page.evaluate(t => window.seek(t), s.t);
  const buf = await page.screenshot({ type: sheet ? 'jpeg' : 'png', quality: sheet ? 88 : undefined });
  if (sheet) bufs.push(buf);
  else { const f = `build/shots/${s.name}.png`; fs.writeFileSync(f, buf); console.log(f); }
}
if (sheet) {
  const cols = 4, tw = 640, th = 360, rows = Math.ceil(bufs.length / cols);
  const p2 = await browser.newPage({ viewport: { width: cols * tw, height: rows * th }, deviceScaleFactor: 1 });
  await p2.setContent(`<body style="margin:0;background:#111;display:grid;grid-template-columns:repeat(${cols},${tw}px)">${bufs.map(b => `<img width="${tw}" height="${th}" src="data:image/jpeg;base64,${b.toString('base64')}">`).join('')}</body>`);
  const f = `build/shots/sheet_${sheet}${from ? `_${from}-${to}` : ''}.png`;
  await p2.screenshot({ path: f });
  console.log(f);
}
if (errs.length) console.error('Konsole:\n' + [...new Set(errs)].join('\n'));
await browser.close();
