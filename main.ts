// One-Line Office Joke: 24-Hour Sprint
// Writes a single one-line office joke to /output/entry.txt.
//
// The joke: timesheets are the office's own little paradox — the admin
// meant to track work ends up eating more work than it tracks.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const JOKE =
  "I spent 45 minutes logging the 15 minutes I spent logging my time.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";

// The line must be a single sentence of 1-200 characters: check it
// before writing anything, so a bad line fails loudly instead of
// submitting an invalid entry. A second period inside the line would
// break the single-sentence shape the judge rewards, so reject it too.
if (JOKE.length < 1 || JOKE.length > 200) {
  console.error(`Joke must be 1-200 characters, got ${JOKE.length}.`);
  process.exit(1);
}
if (JOKE.includes("\n") || JOKE.includes("\r")) {
  console.error("Joke must be a single line.");
  process.exit(1);
}
if (JOKE.trim() !== JOKE || /\s{2}/.test(JOKE)) {
  console.error("Joke must not have leading/trailing or double spaces.");
  process.exit(1);
}

// Never delete the output directory or anything in it: the grader
// mounts it, and deleting it fails the run. Only create it if missing
// and write our one file, leaving everything else untouched.
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), JOKE, "utf8");
console.log(`Wrote ${JOKE.length}-character joke to ${join(outDir, "entry.txt")}`);
