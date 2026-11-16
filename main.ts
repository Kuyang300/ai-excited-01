// ai-excited-01 entry: copy entry.png into the make.fun output directory.
import { copyFileSync, existsSync, mkdirSync, statSync } from "node:fs";
import { join } from "node:path";

const ENTRY_NAME = "entry.png";
const MAX_BYTES = 1048576;
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

if (!existsSync(ENTRY_NAME)) {
  console.error(`error: ${ENTRY_NAME} not found in the current directory`);
  process.exit(1);
}

const entrySize = statSync(ENTRY_NAME).size;
if (entrySize > MAX_BYTES) {
  console.error(
    `error: ${ENTRY_NAME} is ${entrySize} bytes, which exceeds the 1 MiB limit (${MAX_BYTES} bytes)`
  );
  process.exit(1);
}

mkdirSync(outputDir, { recursive: true });
const copiedPath = join(outputDir, ENTRY_NAME);
copyFileSync(ENTRY_NAME, copiedPath);
console.log(`copied ${copiedPath} (${entrySize} bytes)`);
