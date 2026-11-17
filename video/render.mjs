// Rendert das Video Bild für Bild (headless Chromium) und mischt die Tonspur dazu.
//   node render.mjs -p altklausur                     -> out/<Dateiname aus META.out>
//   node render.mjs -p altklausur --from 60 --to 75   -> Ausschnitt (Sekunden), z. B. zur Vorschau
//   node render.mjs -p altklausur --workers 4 --crf 20
import { createRequire } from 'node:module';
import { spawn, execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
const require = createRequire(import.meta.url);
const { chromium } = require('playwright');

const arg = (n, d) => { const i = process.argv.indexOf(n); return i < 0 ? d : process.argv[i + 1]; };
const P = arg('-p', 'altklausur'), CH = `build/${P}/chunks`;
const sb = {}; vm.runInNewContext(fs.readFileSync(`projects/${P}/timing.js`, 'utf8').replace('window.TIMING', 'TIMING'), sb);
const { fps, total } = sb.TIMING;
const from = parseFloat(arg('--from', '0')), to = Math.min(total, parseFloat(arg('--to', String(total))));
const workers = parseInt(arg('--workers', '4')), crf = arg('--crf', '22');
const out = arg('--out', from === 0 && to === total ? `out/${sb.TIMING.out}` : `out/${P}_ausschnitt_${from}-${to}.mp4`);
const f0 = Math.round(from * fps), f1 = Math.round(to * fps), n = f1 - f0;
fs.mkdirSync('out', { recursive: true }); fs.mkdirSync(CH, { recursive: true });
for (const f of fs.readdirSync(CH)) fs.rmSync(`${CH}/${f}`);

const url = 'file://' + path.resolve('stage/index.html') + '?p=' + P;
const browser = await chromium.launch({ args: ['--disable-gpu', '--force-color-profile=srgb'] });
let done = 0; const t0 = Date.now();
const tick = setInterval(() => {
  const el = (Date.now() - t0) / 1000, rate = done / el;
  process.stdout.write(`\r${done}/${n} Bilder · ${rate.toFixed(1)}/s · noch ca. ${rate ? Math.round((n - done) / rate / 60 * 10) / 10 : '?'} min   `);
}, 2000);

async function work(k) {
  const a = f0 + Math.floor((n * k) / workers), b = f0 + Math.floor((n * (k + 1)) / workers);
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: 1 });
  page.on('pageerror', e => { console.error('\nSeitenfehler:', e); process.exitCode = 1; });
  await page.goto(url);
  await page.waitForFunction('document.documentElement.classList.contains("ready") || window.BOOT_ERROR', null, { timeout: 60000 });
  const err = await page.evaluate('window.BOOT_ERROR || null'); if (err) throw new Error(err);
  const chunk = `${CH}/c${String(k).padStart(2, '0')}.mp4`;
  const ff = spawn('ffmpeg', ['-y', '-v', 'error', '-f', 'image2pipe', '-c:v', 'mjpeg', '-framerate', String(fps), '-i', '-',
    '-vf', 'scale=in_range=full:out_range=tv:out_color_matrix=bt709,format=yuv420p', '-c:v', 'libx264', '-preset', 'medium', '-crf', crf,
    '-colorspace', 'bt709', '-color_primaries', 'bt709', '-color_trc', 'bt709', '-g', String(fps * 10), '-r', String(fps), chunk], { stdio: ['pipe', 'inherit', 'inherit'] });
  const closed = new Promise((res, rej) => ff.on('close', c => (c === 0 ? res() : rej(new Error('ffmpeg ' + c)))));
  const cdp = await page.context().newCDPSession(page);
  // Anlauf: vom Beginn der laufenden Szene bis zum ersten Bild durchspielen, damit ein Teilstück genauso aussieht wie im Durchlauf
  const sc = sb.TIMING.scenes.filter(s => s.start <= a / fps).pop();
  for (let x = sc.start; x < a / fps; x += 0.1) await page.evaluate(t => window.seek(t), x);
  for (let f = a; f < b; f++) {
    await page.evaluate(t => window.seek(t), f / fps);
    const { data } = await cdp.send('Page.captureScreenshot', { format: 'jpeg', quality: 96, optimizeForSpeed: true });
    const buf = Buffer.from(data, 'base64');
    if (!ff.stdin.write(buf)) await new Promise(r => ff.stdin.once('drain', r));
    done++;
  }
  ff.stdin.end(); await closed; await page.close();
  return chunk;
}
const chunks = await Promise.all([...Array(workers)].map((_, k) => work(k)));
clearInterval(tick); await browser.close();
console.log(`\n${n} Bilder in ${((Date.now() - t0) / 1000).toFixed(0)} s`);

fs.writeFileSync(`${CH}/list.txt`, chunks.map(c => `file '${path.resolve(c)}'`).join('\n'));
execFileSync('ffmpeg', ['-y', '-v', 'error', '-f', 'concat', '-safe', '0', '-i', `${CH}/list.txt`,
  '-ss', String(from), '-t', String(to - from), '-i', `build/${P}/narration.m4a`,
  '-map', '0:v', '-map', '1:a', '-c:v', 'copy', '-c:a', 'copy', '-shortest', '-movflags', '+faststart',
  '-metadata', `title=${sb.TIMING.title}`, '-metadata', 'language=deu', out], { stdio: 'inherit' });
console.log('fertig:', out, (fs.statSync(out).size / 1e6).toFixed(1) + ' MB');
