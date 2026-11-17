// Erzeugt pro Szene eine Sprachaufnahme über ElevenLabs (mit Zeichen-Zeitmarken).
// Ergebnisse werden in projects/<projekt>/audio/ zwischengespeichert; unveränderter Text kostet keine Zeichen erneut.
//   node tts.mjs <projekt>          -> fehlende Szenen erzeugen (Projekt = Ordner unter projects/)
//   node tts.mjs <projekt> --dry    -> nur anzeigen, was erzeugt würde
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';

const KEY = process.env.ELEVENLABS_API_KEY || 'dummy';
const dry = process.argv.includes('--dry');
const P = process.argv.slice(2).find(a => !a.startsWith('-'));
if (!P) { console.error('Projekt fehlt: node tts.mjs <projekt>'); process.exit(1); }
const { SCENES, VOICE } = await import(`./projects/${P}/script.mjs`);
const DIR = `projects/${P}/audio`;
fs.mkdirSync(DIR, { recursive: true });

const hashOf = text => createHash('sha256').update(JSON.stringify([text, VOICE])).digest('hex').slice(0, 16);

let spent = 0;
for (let i = 0; i < SCENES.length; i++) {
  const s = SCENES[i];
  const meta = `${DIR}/${s.id}.json`, mp3 = `${DIR}/${s.id}.mp3`;
  const h = hashOf(s.text);
  if (fs.existsSync(meta) && fs.existsSync(mp3) && JSON.parse(fs.readFileSync(meta, 'utf8')).hash === h) continue;
  console.log(`${dry ? '[dry] ' : ''}${s.id}: ${s.text.length} Zeichen`);
  spent += s.text.length;
  if (dry) continue;

  const body = {
    text: s.text,
    model_id: VOICE.model_id,
    voice_settings: VOICE.voice_settings,
    previous_text: i > 0 ? SCENES[i - 1].text.slice(-300) : undefined,
    next_text: i < SCENES.length - 1 ? SCENES[i + 1].text.slice(0, 300) : undefined,
  };
  fs.writeFileSync(`${DIR}/.req.json`, JSON.stringify(body));
  const out = execFileSync('curl', ['-sS', '--fail-with-body', '-X', 'POST',
    `https://api.elevenlabs.io/v1/text-to-speech/${VOICE.voice_id}/with-timestamps?output_format=mp3_44100_128`,
    '-H', `xi-api-key: ${KEY}`, '-H', 'Content-Type: application/json', '-d', `@${DIR}/.req.json`],
    { maxBuffer: 1 << 28 });
  const r = JSON.parse(out.toString('utf8'));
  if (!r.audio_base64) throw new Error(`${s.id}: ${out.toString('utf8').slice(0, 400)}`);
  fs.writeFileSync(mp3, Buffer.from(r.audio_base64, 'base64'));
  const a = r.alignment;
  fs.writeFileSync(meta, JSON.stringify({
    hash: h, text: s.text, chars: a.characters.join(''),
    starts: a.character_start_times_seconds.map(x => +x.toFixed(3)),
    ends: a.character_end_times_seconds.map(x => +x.toFixed(3)),
  }));
}
fs.rmSync(`${DIR}/.req.json`, { force: true });
console.log(`${dry ? 'würde verbrauchen' : 'verbraucht'}: ${spent} Zeichen`);
