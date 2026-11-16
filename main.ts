// Entry contract: one image, entry.png, at most 1 MiB. The judge reads the
// copy this program leaves in the output directory; nothing else is graded.
// ai-excited-01 — entrypoint: copy the entry image into the output directory.
//
// The competition entry is one original image (entry.png, next to this file).
// This program places a copy of it where the judge looks for it:
// $MAKEFUN_OUTPUT_DIR, or /output when that variable is not set.
// Node 22, standard library only.

import { copyFileSync, mkdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const MAX_BYTES = 1_048_576; // 1 MiB — the competition's size cap for entry.png
const SOURCE = 'entry.png';

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const size = statSync(SOURCE).size;

if (size > MAX_BYTES) {
  console.error(`entry.png is ${size} bytes, over the 1 MiB limit (${MAX_BYTES} bytes)`);
  process.exit(1);
}

mkdirSync(outDir, { recursive: true });
const dest = join(outDir, SOURCE);
copyFileSync(SOURCE, dest);
console.log(`copied ${dest} (${size} bytes, ${(size / 1024).toFixed(1)} KiB)`);
