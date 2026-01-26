#!/usr/bin/env node
/**
 * Converts MP4 videos in public/projects_media/ to WebM (VP9).
 * Videos are muted in the app, so audio is stripped to save space.
 * Run: node scripts/convert-videos-to-webm.mjs
 *
 * Encoding can take several minutes (VP9 is CPU-intensive).
 */

import { spawn } from 'child_process';
import { readdir, stat } from 'fs/promises';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import ffmpegPath from 'ffmpeg-static';

const __dirname = dirname(fileURLToPath(import.meta.url));
const MEDIA_DIR = join(__dirname, '..', 'public', 'projects_media');

const VP9_CRF = 35;  // 0–63, lower = better quality. 35 ≈ good balance.
const CPU_USED = 2;  // 0–5, higher = faster encode, slightly larger.

function runFfmpeg(args) {
  return new Promise((resolve, reject) => {
    const proc = spawn(ffmpegPath, args, { stdio: ['ignore', 'pipe', 'pipe'] });
    let stderr = '';
    proc.stderr?.on('data', (d) => { stderr += d.toString(); });
    proc.on('close', (code) => {
      if (code === 0) resolve();
      else reject(new Error(`ffmpeg exit ${code}: ${stderr.slice(-500)}`));
    });
  });
}

async function convert(mp4Path) {
  const base = mp4Path.replace(/\.mp4$/i, '');
  const webmPath = `${base}.webm`;
  const before = (await stat(mp4Path)).size;
  const args = [
    '-i', mp4Path,
    '-c:v', 'libvpx-vp9',
    '-crf', String(VP9_CRF),
    '-b:v', '0',
    '-row-mt', '1',
    '-cpu-used', String(CPU_USED),
    '-an',
    '-y',
    webmPath,
  ];
  await runFfmpeg(args);
  const after = (await stat(webmPath)).size;
  const pct = ((1 - after / before) * 100).toFixed(1);
  const name = mp4Path.replace(MEDIA_DIR + '/', '');
  console.log(`${name} → ${name.replace('.mp4', '.webm')}  (${(before / 1024 / 1024).toFixed(1)}MB → ${(after / 1024 / 1024).toFixed(1)}MB, -${pct}%)`);
}

async function main() {
  const files = await readdir(MEDIA_DIR);
  const mp4s = files.filter((f) => /\.mp4$/i.test(f)).sort();
  if (!mp4s.length) {
    console.log('No MP4 files in public/projects_media/.');
    return;
  }
  console.log(`Converting ${mp4s.length} MP4(s) to WebM (VP9 CRF ${VP9_CRF})...\n`);
  for (const f of mp4s) {
    await convert(join(MEDIA_DIR, f));
  }
  console.log('\nDone. Update <video> to use <source type="video/webm"> with MP4 fallback.');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
