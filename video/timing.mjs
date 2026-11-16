// Baut aus den Sprachaufnahmen den Zeitplan (stage/timing.js) und die durchgehende Tonspur (build/narration.m4a).
import { SCENES } from './script.mjs';
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';

const LEAD = 0.55;   // Stille vor dem ersten Wort einer Szene
const TAIL = 1.5;    // Stille nach dem letzten Wort (Zeit für den Szenenwechsel)
const FPS = 30;

let t = 0;
const scenes = [];
for (const s of SCENES) {
  const meta = JSON.parse(fs.readFileSync(`audio/${s.id}.json`, 'utf8'));
  const audioDur = parseFloat(execFileSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', `audio/${s.id}.mp3`]).toString());
  const lead = s.lead ?? (s.id === 'intro' ? 1.2 : LEAD);
  const tail = s.tail ?? (s.id === 'outro' ? 3.0 : TAIL);
  // auf ganze Frames runden, damit Bild und Ton nicht auseinanderlaufen
  const dur = Math.ceil((lead + audioDur + tail) * FPS) / FPS;
  scenes.push({ id: s.id, task: s.task, label: s.label, start: +t.toFixed(4), dur: +dur.toFixed(4), audioAt: lead, audioDur: +audioDur.toFixed(3), chars: meta.chars, starts: meta.starts, ends: meta.ends });
  t += dur;
}
const total = +t.toFixed(4);
fs.writeFileSync('stage/timing.js', 'window.TIMING = ' + JSON.stringify({ fps: FPS, total, scenes }) + ';\n');
console.log(`Gesamtlänge: ${total.toFixed(2)} s (${(total / 60).toFixed(2)} min), ${Math.round(total * FPS)} Frames`);

if (!process.argv.includes('--no-audio')) {
  const args = ['-y', '-v', 'error'];
  for (const s of scenes) args.push('-i', `audio/${s.id}.mp3`);
  const parts = scenes.map((s, i) => `[${i}:a]aresample=44100,adelay=${Math.round(s.audioAt * 1000)}:all=1,apad=whole_dur=${s.dur},atrim=0:${s.dur},asetpts=N/SR/TB[a${i}]`);
  const filter = parts.join(';') + ';' + scenes.map((_, i) => `[a${i}]`).join('') + `concat=n=${scenes.length}:v=0:a=1,loudnorm=I=-16:TP=-1.5:LRA=11[out]`;
  args.push('-filter_complex', filter, '-map', '[out]', '-ar', '48000', '-ac', '1', '-c:a', 'aac', '-b:a', '96k', 'build/narration.m4a');
  execFileSync('ffmpeg', args, { stdio: 'inherit' });
  console.log('Tonspur: build/narration.m4a');
}
