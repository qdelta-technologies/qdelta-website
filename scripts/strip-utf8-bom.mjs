import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const BOM = Buffer.from([0xef, 0xbb, 0xbf]);
const ROOT = path.join(import.meta.dirname, "..", "src");
const EXT = new Set([".ts", ".tsx", ".css"]);

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await walk(full);
      continue;
    }
    if (!EXT.has(path.extname(entry.name))) continue;

    const buf = await readFile(full);
    if (buf.length < 3 || !buf.subarray(0, 3).equals(BOM)) continue;

    await writeFile(full, buf.subarray(3));
    console.log(`[strip-utf8-bom] ${path.relative(path.join(import.meta.dirname, ".."), full)}`);
  }
}

await walk(ROOT);
