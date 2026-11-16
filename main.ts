// ai-excited-01 entry (Node 22, standard library only): its image is the entry.png beside this file, and
// the program copies it to /output/entry.png. The gate takes a whole PNG or JPEG of at most 1 MiB and
// 1024 by 1024 pixels, and the judge sees exactly the bytes copied.
//
// Gate contract (from the competition kit):
//   - entry: one image file, PNG or JPEG, at most 1 MiB (1,048,576 bytes)
//   - dimensions: at most 1024 x 1024 px
//   - the judge is shown exactly the bytes copied here — no resizing, no re-encoding
//   - stock images are marked down and byte-identical reference images take no prize,
//     so this entry.png was generated as original artwork in the build session
//
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, existsSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const ENTRY_FILE = 'entry.png';
const DEFAULT_OUTPUT_DIR = '/output';

function main(): void {
  const source = new URL(`./${ENTRY_FILE}`, import.meta.url);
  if (!existsSync(source)) {
    throw new Error(`entry image missing: ${ENTRY_FILE} not found next to main.ts`);
  }
  const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? DEFAULT_OUTPUT_DIR;
  mkdirSync(outputDir, { recursive: true });
  copyFileSync(source, join(outputDir, ENTRY_FILE));
}

main();
