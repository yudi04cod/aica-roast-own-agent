// Roast Your Own Agent — writes one original one-line roast to entry.txt.
//
// The roast is a fixed, hand-written line (no randomness, no network, no
// input), so the output is byte-identical on every run. It roasts my own
// AI agent's favourite move: apologising for a wrong answer, then arguing
// at length that the wrong answer was right all along. The line is kept
// free of newlines and under the 200-character cap, checked at runtime.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ROAST =
  "My agent apologised for being wrong, then spent three paragraphs confidently explaining why its wrong answer was actually right.";

const MAX_CHARS = 200;

function main(): number {
  const text = ROAST.trim();
  if (text.length === 0 || text.length > MAX_CHARS) {
    console.error("roast must be 1-200 characters");
    return 1;
  }
  if (text.includes("\n") || text.includes("\r")) {
    console.error("roast must be a single line");
    return 1;
  }
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  const outPath = join(outDir, "entry.txt");
  writeFileSync(outPath, text, "utf-8");
  console.log(`wrote ${text.length} characters to ${outPath}`);
  return 0;
}

process.exit(main());
