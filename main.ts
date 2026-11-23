// The One-Line Laugh — entry program for make.fun.
//
// The whole entry is one funny line, at most 200 characters, on a
// subject of the writer's choosing. This program validates it against
// the gate (UTF-8 text, 1 to 200 characters, not only whitespace, a
// single sentence on one line) and writes it to /output/entry.txt,
// where the sealed scorer reads it and the house judge compares it
// against the other entries, two at a time.
//
// Runs on Node 22 with no dependencies and no network access.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

// The line: a smartwatch celebrates 10,000 steps, and the twist is
// that every one of them was a trip to the fridge during a single
// work call. The surprise lands at the end and still makes sense
// once it arrives; the everyday truth is one every remote worker
// recognises — the watch counts movement, not exercise — and every
// word earns its place: "congratulated" sets up the praise, "47
// trips" and "one work call" deliver the scale of the fraud, and
// "the fridge" is the punchline's destination. Nothing needs
// explaining, and the line has not been heard a hundred times before.
const LINE =
  "My smartwatch congratulated me on 10,000 steps today — it counted the 47 trips I made to the fridge during one work call.";

// The gate accepts UTF-8 text of 1 to 200 characters that is not only
// whitespace. A one-liner is a single sentence on one line, so the
// text must hold no line break and must not start or end with
// whitespace.
function validate(line: string): void {
  if (line.length < 1 || line.length > 200) {
    throw new Error(`one-liner must be 1..200 characters, got ${line.length}`);
  }
  if (line.trim().length === 0) {
    throw new Error("one-liner must not be only whitespace");
  }
  if (/\n/.test(line)) {
    throw new Error("one-liner must be a single line");
  }
  if (line !== line.trim()) {
    throw new Error("one-liner must not start or end with whitespace");
  }
  // It must stand alone as a single sentence: exactly one terminal
  // full stop, at the end, and no other sentence-ending punctuation
  // hiding a second sentence inside the line.
  if (!/\.$/.test(line)) {
    throw new Error("one-liner must end with a full stop");
  }
  if ((line.match(/\.\s/g) ?? []).length > 0) {
    throw new Error("one-liner must be a single sentence");
  }
  // The gate counts characters, but the leaderboard's Size column shows
  // bytes; keep the byte count in the same range so nothing surprises.
  const bytes = Buffer.byteLength(line, "utf8");
  if (bytes < 1 || bytes > 200) {
    throw new Error(`one-liner must be 1..200 bytes, got ${bytes}`);
  }
}

const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const outputPath = `${outputDir}/entry.txt`;

validate(LINE);
mkdirSync(outputDir, { recursive: true });
writeFileSync(outputPath, LINE, "utf8");

// Read the file back and confirm it holds exactly the line, byte for
// byte, so a stray newline or encoding slip can never reach the gate.
const written = readFileSync(outputPath, "utf8");
if (written !== LINE) {
  throw new Error("round-trip check failed: entry.txt differs from LINE");
}
console.log(`Wrote ${LINE.length} characters to ${outputPath}`);
