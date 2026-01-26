#!/usr/bin/env node
/**
 * Converts PNG/JPEG images in public/ to WebP format.
 * Run: node scripts/convert-to-webp.mjs
 */

import sharp from 'sharp';
import { readdir, stat } from 'fs/promises';
import { join, extname } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PUBLIC = join(__dirname, '..', 'public');

const RASTER_EXTS = ['.png', '.jpg', '.jpeg'];
const WEBP_Q = 85;

async function* walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = join(dir, e.name);
    if (e.isDirectory()) {
      yield* walk(full);
    } else if (e.isFile() && RASTER_EXTS.includes(extname(e.name).toLowerCase())) {
      yield full;
    }
  }
}

async function convert(path) {
  const out = path.replace(/\.(png|jpe?g)$/i, '.webp');
  const before = (await stat(path)).size;
  await sharp(path)
    .webp({ quality: WEBP_Q })
    .toFile(out);
  const after = (await stat(out)).size;
  const pct = ((1 - after / before) * 100).toFixed(1);
  console.log(`${path.replace(PUBLIC + '/', '')} → ${out.replace(PUBLIC + '/', '')}  (${(before/1024).toFixed(0)}KB → ${(after/1024).toFixed(0)}KB, -${pct}%)`);
}

async function main() {
  console.log('Converting images to WebP (quality %d)...\n', WEBP_Q);
  for await (const p of walk(PUBLIC)) {
    await convert(p);
  }
  console.log('\nDone. Update component imports to use .webp files.');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
